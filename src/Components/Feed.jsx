import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getFeed = async () => {
    if (feed && feed.length > 0) {
      setLoading(false); 
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setLoading(false); // 👈 done loading
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading) {
    return (
      <center>
        <span className="loading loading-spinner text-info loading-lg"></span>
      </center>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <center>
        <h1>No New User Found</h1>
      </center>
    );
  }

  return (
    <div className="flex justify-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
