import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  const [ws, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:2101");

    ws.onmessage = (event) => {
      console.log("Ricevuto messaggio", event.data);
      const data = JSON.parse(event.data);

      setCount(data.count);
      setIsOn(data.isOn);
    };

    ws.onopen = () => {
      console.log("Connesso al server");
    };

    ws.onclose = () => {
      console.log("Disconnesso dal server");
    };

    setSocket(ws);

    return () => {
      if (ws && ws.readyState === ws.OPEN) {
        ws.close();
      }
    };
  }, []);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const toggleSwitch = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  const handleSubmit = () => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ count, isOn }));
    } else {
      console.log("La connessione WebSocket non è aperta o non esiste!");
    }
  };

  const imageUrl = isOn
    ? "https://t3.ftcdn.net/jpg/05/35/93/24/360_F_535932485_u430DXvoSGUn4Remf8f8oDP9wOb76eWZ.webp"
    : "https://t4.ftcdn.net/jpg/05/35/93/25/360_F_535932503_CaLoPwuMeB0pyCGwnKK6VSHlNyuHEVhF.png";

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-xl w-full h- max-w-xs scale-95">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          FORM CLIENT
        </div>
        <div className="w-full bg-gray-200 my-3 h-px"></div>
        <div className="flex flex-col gap-4 px-0 py-4">
          <div className="flex justify-between items-center bg-gray-200 rounded-3xl">
            <button
              type="button"
              onClick={handleDecrement}
              className="px-4 py-2 italic bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none scale-75 active:scale-[.70]"
            >
              -
            </button>
            <span className="text-xl">{count}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="px-4 py-2 italic bg-green-500 text-white rounded-full hover:bg-green-700 focus:outline-none scale-75 active:scale-[.70]"
            >
              +
            </button>
          </div>
          <div className="items-center">
            <button type="button" onClick={toggleSwitch} className="scale-75">
              <img
                src={imageUrl}
                alt=""
                className="w-32 hover:scale-105 active:scale-100"
              />
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full px-4 py-2 italic font-bold flex flex-row gap-2 justify-center text-blue-700 bg-white  border border-blue-700  hover:bg-blue-700 hover:text-white focus:outline-none active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
