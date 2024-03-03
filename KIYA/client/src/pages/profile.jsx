import React, { useContext, useState, useRef } from "react";
import AuthContext from "../context/authcontext";
const BACKEND_URL = "http://localhost:8000"; // This is temp for development (Backend URL), will be replaced with production URL.

// This component is used to display the user's profile and provide the functionality to edit the profile.
export default function Profile() {
  const imageInputRef = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [profilepicture, setProfilePicture] = useState(
    user?.profilepicture || ""
  );
  const [skills, setSkills] = useState(user?.skills || []);

  /* This function will trigger the file input click 
  and the user will be able to select the profile picture from the file system. 
  */
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    /* below code is for converting the image to base64 format 
    since the backend is expecting the image in base64 format. */
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      setProfilePicture(binaryData);
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const UPDATE_PROFILE_URL =
      BACKEND_URL + `/${(user?.role).toLowerCase()}s/${user?.id}`;
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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

    try {
      const response = await fetch(UPDATE_PROFILE_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      setUser((prevData) => ({ ...prevData, ...data }));
      setName("");
      setAddress("");
      setPhonenumber("");
      setCity("");
      setCountry("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section>
      <h1>Edit Profile</h1>
      <div>
        {profilepicture && (
          <div>
            <img
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

      {/* The skills field will only be rendered when the user is an employee */}
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
