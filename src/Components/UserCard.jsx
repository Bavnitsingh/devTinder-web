// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  // eslint-disable-next-line react/prop-types
  const { firstName, lastName, age, photoUrl, about, gender ,skills} = user;
  return (
    <div
      className="flex justify-center"
      style={{ width: "400px", margin: "10px" }}
    >
      <div
        className="rounded overflow-hidden shadow-lg"
        style={{ borderRadius: "10px", background: "black" }}
      >
        <div className="image-container">
          <img src={photoUrl} alt="Sunset in the mountains" />
        </div>
        <div className="px-6 py-4">
          <div style={{ padding: "10px" }}>
            {firstName + " " + lastName}
          </div>
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
            <button className="btn btn-soft btn-error">Ignore</button>

            <button
              className="btn btn-soft btn-info"
              style={{ margin: "10px" }}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
