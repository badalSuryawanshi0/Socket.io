import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messagelog, setMessagelog] = useState([]);
  console.log(message);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("messageB", (data) => {
      setMessagelog((prevdata) => [...prevdata, data]);
      console.log(messagelog);
    });

    socketRef.current.on("id", (data) => {
      console.log(data);
    });
  }, []);
  function handleOnclick(e) {
    e.preventDefault();
    console.log(message);
    socketRef.current.emit("message", message, (ack) => {
      console.log(ack);
    });
    setMessage("");
  }
  return (
    <div className="relative flex flex-col h-screen w-full justify-center items-center bg-gradient-to-tl from-slate-200  to-slate-400  overflow-y-hidden">
      <div className="space-y-5 bg-slate-300 rounded-lg h-[70%] w-[50%] overflow-y-auto p-5 ">
        {console.log(messagelog)}

        {messagelog.length > 0 &&
          messagelog.map((text, index) => (
            <div key={index} className="flex text-lg font-mono  rounded-xl">
              - {text}
            </div>
          ))}
      </div>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2  -translate-y-1/2 items-center ">
        <form onSubmit={handleOnclick} className=" space-x-2 ">
          <input
            className=" text-center  border rounded-xl p-1.5 border-gray-500"
            type="text"
            placeholder="Enter the text"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-blue-400 rounded-xl p-1.5 " type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default App;
