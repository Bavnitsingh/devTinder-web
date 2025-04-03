const UserCard = ({ user }) => {
  const { firstName, lastName, age, photoUrl, about, gender } = user;
  return (
    <div className="flex justify-center" style={{ padding: "30px" }}>
      <div
        className="max-w-sm rounded overflow-hidden shadow-lg"
        style={{ borderRadius: "10px", background: "black" }}
      >
        <img
          style={{ width: "350px", height: "300px" }}
          src={user.photoUrl}
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4" >
          <div className="font-bold text-xl mb-2" style={{ padding: "10px" }}>
            {firstName + " " + lastName}
          </div>
        </div>
        <div className="px-6 pt-4 pb-2" style={{ padding: "10px" }}>
          <div className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {age && gender && <p>{age + " , " + gender}</p>} <p>{about}</p>
          </div>

          <div style={{margin:"10px"}}>
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
