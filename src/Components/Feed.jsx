import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed && feed.length > 0) return; // ✅ Fix
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);
  
   if (!feed || feed.length === 0) {
     return (
       <center>
         <h1>No New User Found</h1>
       </center>
     ); // ✅ Handle missing data
   }

   return (
     <div className="flex justify-center" >
       <UserCard user={feed[0]} />
     </div> 
   );
};

export default Feed;
