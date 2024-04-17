import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { colorPalette } from "../utils/colors";
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
  // const [skills, setSkills] = useState(user?.skills || []);
  const [editMode, setEditMode] = useState(false);

  // if the user cancel the changes, the form will be reset to the original values.
  useEffect(() => {
    if (!editMode) {
      setName(user?.name || "");
      setAddress(user?.address || "");
      setPhonenumber(user?.phonenumber || "");
      setCity(user?.city);
      setCountry(user?.country || "");
      setProfilePicture(user?.profilepicture);
      // setSkills(user?.skills || []);
    }
  }, [editMode]);

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

  useEffect(() => {
    handleSubmit(); // saves the profile picture to the database
  }, [profilepicture]);

  const handleButtonClick = () => {
    imageInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const UPDATE_PROFILE_URL =
      BACKEND_URL + `/${user?.role?.toLowerCase()}s/${user?.id}`;
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
        // skills,
      }),
    };

    try {
      const response = await fetch(UPDATE_PROFILE_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "No Server Response");
      }

      setUser((prevData) => ({ ...prevData, ...data }));
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="px-sd py-tb flex-grow flex flex-col lg:flex-row justify-around items-center gap-7 lg:gap-0">
      <div className="lg:self-start flex flex-col justify-center items-center gap-2">
        <div>
          {profilepicture ? (
            <div>
              <img
                src={profilepicture}
                className="w-[200px] h-[200px] rounded-full object-cover shadow-md border-1 border-white"
                alt="profile-picture"
              />
            </div>
          ) : (
            <div className="w-[200px] h-[200px] bg-gray-300 rounded-full flex justify-center items-center text-white text-[3rem] border">
              {user?.name[0]}
            </div>
          )}
        </div>
        <h3 className="uppercase text-[1rem] font-medium">{user?.name}</h3>
        <h4 className="uppercase text-[1rem] font-medium">
          Role: {user?.role}
        </h4>
        <div>
          <input
            type="file"
            accept="image/*,.pdf"
            ref={imageInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Button
            onClick={handleButtonClick}
            text="Change Profile Picture"
            bg_clr="bg-[#FEC601]"
            font_size="text-[12px]"
            font_weight="font-semibold"
            border_radius="rounded-3xl"
            px="px-[10px]"
          />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="min-w-[60%] max-w-screen-md lg:self-start grid gap-5 md:max-w-none md:basis-[30%]"
      >
        <div className="relative">
          <label
            htmlFor="username"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="username"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            disabled={!editMode}
            aria-describedby="username"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="email"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="email"
            value={email}
            disabled
            aria-describedby="emailnote"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="address"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            Address
          </label>
          <input
            type="text"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            disabled={!editMode}
            aria-describedby="address"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="phone"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            Phone Number
          </label>
          <input
            type="tel"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="phone"
            onChange={(e) => setPhonenumber(e.target.value)}
            value={phonenumber}
            disabled={!editMode}
            aria-describedby="phone"
          />
        </div>
        <div className="relative">
          <label
            htmlFor="city"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            City
          </label>
          <input
            type="text"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="city"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            disabled={!editMode}
            aria-describedby="city"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="country"
            className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
          >
            Country
          </label>
          <input
            type="text"
            className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none"
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            disabled={!editMode}
            aria-describedby="country"
          />
        </div>

        {/* The skills field will only be rendered when the user is an employee
        {user?.role === "Employee" && (
          <div className="relative">
            <div>
              <label
                htmlFor="Skills"
                className="w-[95%] flex justify-between items-center absolute left-4 top-2 text-gray-500 pointer-events-none"
              >
                Skills
              </label>
              <select
                className="absolute right-4  top-2"
                disabled={!editMode}
                onChange={(e) => {
                  const selectedSkill = e.target.value;
                  if (!skills.includes(selectedSkill)) {
                    setSkills((prev) => [...prev, selectedSkill]);
                  }
                  e.target.value = "";
                }}
              >
                <option value="" disabled selected>
                  -Select-
                </option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React">React</option>
                <option value="Node.js">Node.js</option>
                <option value="Express">Express</option>
                <option value="MongoDB">MongoDB</option>
                <option value="SQL">SQL</option>
              </select>
            </div>

            <div className="w-full px-md pt-[2.5em] pb-sm border border-gray-300 rounded-lg outline-none flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor:
                      colorPalette[
                        Math.floor(Math.random() * colorPalette.length)
                      ],
                  }}
                  className="relative text-black px-md py-sm mx-1 rounded-lg"
                >
                  {skill}
                  <FontAwesomeIcon
                    icon={editMode ? faTimes : ""}
                    className="absolute top-0 right-0.5 cursor-pointer"
                    onClick={() =>
                      setSkills((prev) => prev.filter((_, i) => i !== index))
                    }
                  />
                </span>
              ))}
            </div>
          </div>
        )} */}

        {editMode ? (
          <div className="flex gap-3 items-center justify-center">
            <div className="max-w-fit mt-4">
              <Button
                type="submit"
                text="Save Changes"
                bg_clr="bg-primary"
                font_size="text-[12px]"
                font_weight="font-semibold"
                px="px-[10px]"
              />
            </div>
            <div className="max-w-fit mt-4">
              <Button
                text="Cancel Changes"
                bg_clr="bg-secondary"
                font_size="text-[12px]"
                font_weight="font-semibold"
                px="px-[10px]"
                onClick={() => setEditMode(false)}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-fit justify-self-center mt-4">
            <Button
              text="Edit Profile"
              bg_clr="bg-primary"
              font_size="text-[12px]"
              font_weight="font-semibold"
              px="px-[10px]"
              onClick={() => setEditMode(true)}
            />
          </div>
        )}
      </form>
    </section>
  );
}
