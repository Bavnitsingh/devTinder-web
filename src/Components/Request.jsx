import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const [, setError] = useState(""); // fixed unused state variable error
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No Connection Request Found</h1>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Connection Requests</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "10px",
          marginBottom: "100px",
        }}
      >
        {requests.map((request) => {
          const { firstName, lastName, about, skills, photoUrl, age, gender } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="card bg-base-300"
              style={{ width: "400px", height: "500px" }}
            >
                <figure className="rounded-full">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    style={{
                      height: "200px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </figure>
             
              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName} ({gender}, {age})
                </h2>
                <p>{about}</p>
                <p>
                  <strong>Skills:</strong> {skills?.join(", ")}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-success">Accept</button>
                  <button className="btn btn-error">Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Request;
