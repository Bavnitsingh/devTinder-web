import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);
  const sendMessage = () => {
    // Note we cannot use useeffect's socket Connection thats why we created here new socket connection
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loaded the connection should be made and joinChat event is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " " + lastName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);
  return (
    <div className="w-2/3 mx-auto border border-gray-600 rounded-xl shadow-lg bg-base-200 m-10 h-[70vh] flex flex-col">
      {/* Chat Header */}
      <h1 className="text-center text-2xl font-semibold p-4 border-b border-gray-500">
        Chat
      </h1>

      {/* Message Display Area */}
      <div
        className="flex-1 overflow-y-auto space-y-3"
        style={{ padding: "20px" }}
      >
        {messages.map((msg , index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {msg.firstName + " " + msg.lastName}
              </div>
              <div className="chat-bubble chat-bubble-info">{msg.text}</div>
            </div>
          );
        })}
      </div>

      {/* Chat Input */}
      <div
        className="  border-gray-500 flex items-center "
        style={{ padding: "5px" }}
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-box border border-gray-400 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-pink-500"
          style={{ padding: "5px" }}
        />
        <span>
          <button
            className="btn btn-soft btn-info"
            onClick={sendMessage}
            style={{ margin: "10px" }}
          >
            Send
          </button>
        </span>
      </div>
    </div>
  );
};

export default Chat;
