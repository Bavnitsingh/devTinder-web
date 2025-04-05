import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [ setError] = useState("");
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (err) {
      setError(err?.response?.data || "Something went Wrong");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    connections && (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // 3 cards per row
          gap: "20px", // Gap between cards
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <span role="img" aria-label="connections">
            👨‍💻
          </span>
          Connections
        </h1>
        {connections.map((connection) => {
          const { _id,firstName, lastName, about, skills, photoUrl, age, gender } =
            connection;
          return (
            <div key={_id}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #E2E8F0", // Tailwind's border-slate-200
                borderRadius: "0.5rem", // Tailwind's rounded-lg (8px)
                marginTop: "1.5rem", // Tailwind's my-6 (24px top and bottom)
                marginBottom: "1.5rem",
                width: "24rem", // Tailwind's w-96 (384px)
              }}
            >
              <div
                className="flex justify-center"
                style={{ margin: "10px", borderRadius: "5px", padding: "10px" }}
              >
                <img
                  style={{
                    width: "200px",
                    height: "200px",
                     borderRadius: "40px",
                  }}
                  src={photoUrl}
                  alt="profile-picture"
                />
              </div>
              <div className="p-6 text-center" style={{ padding: "10px" }}>
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                  {firstName} {lastName}
                </h4>

                <p>
                  {about}
                </p>
                <div className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {(age || gender) && (
                    <p>
                      {age ? age : ""} {age && gender ? ", " : ""}{" "}
                      {gender ? gender : ""}
                    </p>
                  )}
                </div>
                <div className="flex justify-center p-6 pt-2 gap-7">
                  {skills.join(" , ")}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};

export default Connections;
