import * as tf from '@tensorflow/tfjs-node';

// Generate dummy data
const generateData = (numExamples) => {
    const data = [];
    for (let i = 0; i < numExamples; i++) {
        const coding = Math.floor(Math.random() * 100);
        const communication = Math.floor(Math.random() * 100);
        const leadership = Math.floor(Math.random() * 100);
        const problemSolving = Math.floor(Math.random() * 100);

        // More stringent rule: promote if coding > 75, leadership > 70, communication > 65, and problem solving > 60
        const promoted = (coding > 75 && leadership > 70 && communication > 65 && problemSolving > 60) ? 1 : 0;
        data.push({coding, communication, leadership, problemSolving, promoted});
    }
    return data;
}

const data = generateData(1000);
const xs = data.map(item => [item.coding, item.communication, item.leadership, item.problemSolving]);
const ys = data.map(item => item.promoted);

const xsTensor = tf.tensor2d(xs);
const ysTensor = tf.tensor1d(ys);

const [xsTrain, xsTest] = tf.split(xsTensor, 2);
const [ysTrain, ysTest] = tf.split(ysTensor, 2);

const model = tf.sequential();
model.add(tf.layers.dense({inputShape: [4], units: 1, activation: 'sigmoid'})); // Only one layer

model.compile({
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
});

// Train the model and save it
async function trainAndSaveModel() {
    await model.fit(xsTrain, ysTrain, {
        epochs: 50,
        validationData: [xsTest, ysTest],
        shuffle: true
    });
    console.log("Training complete.");

    // Save the model to the filesystem in Node.js
    await model.save('file://my-promotion-model');
    console.log("Model saved to the file system.");

    // Evaluate the model
    const result = await model.evaluate(xsTest, ysTest);
    console.log("Evaluation result:", result);

    // Log weights for each feature after training
    const weights = model.getWeights()[0].dataSync();
    console.log("Feature weights:", weights);
}

trainAndSaveModel();