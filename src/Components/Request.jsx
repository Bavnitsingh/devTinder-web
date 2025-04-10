import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const [, setError] = useState("");
  const [loading, setLoading] = useState(true); // 👈 New loading state

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      setError(err?.res?.data || "Something went wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false); // ✅ Done loading
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔄 Show spinner while loading
  if (loading) {
    return (
      <center style={{ marginTop: "100px" }}>
        <span className="loading loading-spinner text-info loading-lg"></span>
      </center>
    );
  }

  // ❌ Show this after loading if no requests
  if (!requests || requests.length === 0) {
    return <h1 style={{ textAlign: "center" }}>No Connection Request Found</h1>;
  }

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Connection Requests</h1>
      <div
        className="px-8"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
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
              style={{ width: "300px", height: "720px", borderRadius: "10px" }}
            >
              <img src={photoUrl} alt={`${firstName} ${lastName}`} />

              <div className="card-body">
                <h2 className="card-title">
                  {firstName} {lastName} ({gender}, {age})
                </h2>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {about}
                </p>
                <p>
                  <strong>Skills:</strong> {skills?.join(", ")}
                </p>
                <div>
                  <button
                    className="btn btn-soft btn-error"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>

                  <button
                    className="btn btn-soft btn-info"
                    onClick={() => reviewRequest("accepted", request._id)}
                    style={{ margin: "10px" }}
                  >
                    Accept
                  </button>
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
