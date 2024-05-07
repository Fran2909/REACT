import "./App.css";
import Counter from "./components/Counter";
import Indicator from "./components/Indicator";
import { useState, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:2101");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setCount(data.count);
      setIsOn(data.isOn);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <div className="flex justify-center p-10">
        <div className="p-7  max-w-[600px]  bg-amber-100 rounded-xl shadow-2xl shadow-amber-200 flex flex-col justify-center space-x-20 ">
          <p className="text-center italic  font-bold text-3xl text-neutral-700">
            DASHBOARD
          </p>
          <div className="p-5 flex items-center w-full max-w-full space-x-24 justify-center">
            <Counter count={count}></Counter>
            <Indicator isOn={isOn}></Indicator>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
