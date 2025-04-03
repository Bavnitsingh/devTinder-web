import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, skills, about, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-middle">
          <div className="alert alert-info">
            <span>Profile Updated Successfully</span>
          </div>
        </div>
      )}

      <div>
        <div className="flex justify-center" style={{ margin: "20px" }}>
          <div className="card bg-base-300 shadow-sm ">
            <div className="card-body" style={{ width: "500px" }}>
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label htmlFor="Firstname">First Name</label>
              <input
                type="text"
                value={firstName}
                className="justify-center"
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />

              <label htmlFor="Lastname">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="Age">Age</label>
              <input
                type="text"
                value={age}
                className="justify-center"
                onChange={(e) => setAge(e.target.value)}
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="gender">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "40px",
                  borderRadius: "5px",
                }}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
              <label htmlFor="about">About</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "80px", // Increased height for better usability
                  width: "94%", // Optional: Adjust width as needed
                  borderRadius: "5px",
                  resize: "vertical", // Allows users to resize the textarea vertically
                }}
                placeholder="Write something about yourself..."
              ></textarea>
              <label htmlFor="photoUrl">Photo Url</label>
              <input
                type="text"
                value={photoUrl}
                className="justify-center"
                onChange={(e) => setPhotoUrl(e.target.value)}
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
              <label htmlFor="Skills">Skills</label>
              <input
                type="text"
                value={skills.join(", ")} // Convert array to a string for display
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                } // Convert string to an array
                className="justify-center"
                style={{
                  padding: "10px",
                  margin: "5px",
                  height: "20px",
                  borderRadius: "5px",
                }}
              />
              <p style={{ color: "red" }}>{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-info" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <center>Your Card Preview is Below 👇 </center>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, skills, about }}
        />
      </div>
    </>
  );
};

export default EditProfile;
