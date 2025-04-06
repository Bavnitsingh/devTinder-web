import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { _id,firstName, lastName, age, photoUrl, about, gender, skills } = user;
  const [, setError] = useState("");
  const dispatch = useDispatch();
  const handleSendRequest = async (status,userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/"+status+"/"+userId,{},{withCredentials:true}
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      setError(error?.response?.data)
    }
  }
  
  return (
    <div
      className="flex justify-center"
      style={{ width: "400px", margin: "50px" }}
    >
      <div
        className="rounded overflow-hidden shadow-lg"
        style={{ borderRadius: "10px", background: "black" }}
      >
        <div className="image-container">
          <img src={photoUrl} alt="Sunset in the mountains" />
        </div>
        <div style={{ padding: "10px", fontSize: "20px", fontWeight: "bold" }}>
          {firstName + " " + lastName}
        </div>

        <div className="px-6 pt-4 pb-2" style={{ padding: "10px" }}>
          <div className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {(age || gender) && (
              <p>
                {age ? age : ""} {age && gender ? ", " : ""}{" "}
                {gender ? gender : ""}
              </p>
            )}
          </div>
          <div className="text-gray-300 overflow-hidden">
            <p className="break-words whitespace-normal">{about}</p>
          </div>

          <div>{skills.join(", ")}</div>
          <div style={{ margin: "10px" }}>
            <button
              className="btn btn-soft btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-soft btn-info"
              style={{ margin: "10px" }}
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
