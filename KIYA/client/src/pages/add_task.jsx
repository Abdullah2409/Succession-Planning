import React, { useState } from "react";
// import { backendUrl } from "../utils/backendurl";
// const BACKEND_URL = backendUrl;

const CreateTaskPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    employerid: "", // Assuming you have a way to get the employer's id
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "employerid" ? parseInt(value, 10) : value; // Parse employerid to number
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const response = await fetch(" http://localhost:8000/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error creating task");
      }
      const data = await response.json();
      console.log("Task created successfully:", data);
      // Optionally redirect to another page after successful task creation
    } catch (error) {
      console.error("Error creating task:", error);
    }
    // Reset form fields
    setFormData({
      title: "",
      description: "",
      deadline: "",
      employerid: "",
    });
  };

  return (
    <div className="p-md bg-[#F7F7F7] col-span-3 self-stretch border border-gray-300 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <label htmlFor="description" className="font-semibold">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <label htmlFor="deadline" className="font-semibold">
          Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <label htmlFor="employerid" className="font-semibold">
          Employer ID:
        </label>
        <input
          type="text"
          id="employerid"
          name="employerid"
          value={formData.employerid}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
        />

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition duration-300 ease-in-out"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
