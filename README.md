# Kiya App Setup Guide

## Installation

To install the necessary packages for both the server and client, navigate to the `server` and `client` directories respectively and run `npm install`.

```bash
cd Kiya/server
npm install
cd ../client
npm install

## Running the Application

# To start the application, run npm start in both the server and client directories.

cd Kiya/server
npm start
cd ../client
npm start

## Sign up and Sign In

# An example of an employee data

{
  "_id": "65e410067c6772c6d594318b",
  "employeeID": 92532,
  "name": "Geo",
  "address": "380 Valentin Villages",
  "department": "Data Science",
  "designation": "Project Manager",
  "skills": ["Node.js", "JavaScript", "Ruby"],
  "linesOfCode": 1274,
  "trainingPrograms": 2,
  "createdAt": "2024-03-03T05:52:06.148Z",
  "updatedAt": "2024-03-03T05:52:06.148Z"
}

# An example of an employers data

{
  "_id": "65e34c694bd1bf60bac7f66f",
  "employerid": "25100226",
  "name": "Adil Rafiq",
  "address": "LUMS Lahore",
  "department": "Data Science",
  "designation": "Manager",
  "profilepicture": "data:image/jpeg;base64,/9j/4QEKRXhpZgAATU0AKgAAAAgABQEAAAQAAAABAAAHgAE…",
  "datastarted": "2024-02-27T19:00:00.000+00:00",
  "city": "Lahore",
  "country": "Pakistan",
  "datestarted": "2024-03-02T22:35:58.989+00:00",
  "phonenumber": "0123456"
}

## Importance of Pre-Existing Data

# It is crucial for HR to upload data into the database before users can sign up. This pre-existing data includes both employers and employees. It is required for the signup process to work correctly, as users need to select an employer during the signup process.

# Having this data populated ensures that the Kiya app functions correctly and that users can sign up and access the platform with the correct permissions and access levels.

## Completed Use Cases

## 1. Sign up/ Sign in

### Navigation
Users can navigate to the sign-up and sign-in pages by clicking on the "Sign Up" or "Sign In" links in the home page of the application.

## 2. User Profile Updation

### Navigation
Once signed in, the user can access their profiles by selecting dashboard and then selecting profile, allowing them to make changes to their profile.

## 3. Backend (CRUD Operations)

## 4. Feedback Form

Once signed in, the user can access the feedback form by selecting dashboard and then selecting employee feedback form, giving them access to the form, where they may search up a particular employee they wish to give feedback to. Once the employee is selected, and they click on give feedback, they will be navigated to a feedback form page, where they may type in their comments and assign a numerical rating.
