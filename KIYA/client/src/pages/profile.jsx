import React, { useContext, useState, useRef } from "react";
import AuthContext from "../context/authcontext";
const BACKEND_URL = "http://localhost:8000"; // This is temp for development (Backend URL)
// Importing React, useContext, useState, useRef and AuthContext

// Defining the profile component
export default function Profile() {
  const imageInputRef = useRef(null);
  const { user, setUser } = useContext(AuthContext); // Accessing user data from AuthContext
  const [name, setName] = useState(user?.name || ""); // State for user's name
  const [email, setEmail] = useState(user?.email || ""); // State for user's email
  const [address, setAddress] = useState(user?.address || ""); // State for user's address
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber || ""); // State for user's phone number
  const [city, setCity] = useState(user?.city || ""); // State for user's city
  const [country, setCountry] = useState(user?.country || ""); // State for user's country
  const [profilepicture, setProfilePicture] = useState(
    user?.profilepicture || ""
  ); // State for user's profile picture
  const [skills, setSkills] = useState(user?.skills || []); // State for user's skills (can be multiple, hence list)

  // Function for uploading the profile picture
  const handleImageChange = (event) => {
    const file = event.target.files[0]; //Getting the uploaded image
    const reader = new FileReader(); //Object for reading the file
    reader.onload = (event) => {
      const binaryData = event.target.result;
      setProfilePicture(binaryData);
    }; // Callback function for when the file has been read
    reader.readAsDataURL(file);
  }; // Reading the file
  // Button to input click to call function for picture upload
  const handleButtonClick = () => {
    imageInputRef.current.click();
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // URL for updating user profile
    const UPDATE_PROFILE_URL =
      BACKEND_URL + `/${(user?.role).toLowerCase()}s/${user?.id}`;
    // Fetch request
      const requestOptions = {
      method: "PATCH",  // For updating data
      headers: { "Content-Type": "application/json" },  // Setting content type headers to JSON file format
      body: JSON.stringify({  // Converting user data to JSON string
        ...user,
        name,
        address,
        phonenumber,
        city,
        country,
        profilepicture,
        skills,
      }),
    };
    
    // Using try except for error handling
    try {
      const response = await fetch(UPDATE_PROFILE_URL, requestOptions); // Sending fetch request to update user profile
      const data = await response.json(); // Parsing the JSON type data

      // If response is not Okay, throw error
      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      //Update user context data with the new user data
      setUser((prevData) => ({ ...prevData, ...data }));
      setName("");
      setAddress("");
      setPhonenumber("");
      setCity("");
      setCountry("");
    } catch (error) { // If error found then this called, telling that error occurred
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section> 
      <h1>Edit Profile</h1>
      <div> {/* Div for profile display */}
        {profilepicture && (  // Checking if profile picture is available
          <div>
            <img
              //   src={URL.createObjectURL(profilepicture)}
              src={profilepicture}
              style={{
                // This is temp, will be replaced with tailwindcss
                borderRadius: "50%",
                width: "128px",
                height: "128px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                borderWidth: "4px",
                borderStyle: "solid",
                borderColor: "#fff",
              }}
              alt="profile-picture"
            />
          </div>
        )}
      </div>
      <h3 className="uppercase">{user?.name}</h3>
      <h4 className="uppercase">Role: {user?.role}</h4>
      <div>
        <input
          type="file"
          accept="image/*,.pdf"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <button onClick={handleButtonClick}>Change Profile Picture</button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Full Name:</label>
        <input
          type="text"
          id="username"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} disabled />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={phonenumber}
          required
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          value={city}
          required
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          value={country}
          required
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      
      {/* Displaying the skills form if user is an employee */}
      {user?.role === "Employee" && (
        <>
          <div>
            <h3>Skills</h3>
            <ul>
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <select
              onChange={(e) => setSkills((prev) => [...prev, e.target.value])}
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Node.js">Node.js</option>
              <option value="Express">Express</option>
              <option value="MongoDB">MongoDB</option>
              <option value="SQL">SQL</option>
            </select>
            <button type="submit">Add Skill</button>
          </form>
        </>
      )}
    </section>
  );
}
