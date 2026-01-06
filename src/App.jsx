import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("waiting"); // waiting, ready, now
  const [message, setMessage] = useState("クリックしてスタート");
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    let timer;
    if (status === "ready") {
      const delay = Math.random() * 2000 + 1000; // 1〜3秒
      timer = setTimeout(() => {
        setStatus("now");
        setMessage("今だ！！！");
        setStartTime(Date.now());
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleClick = () => {
    if (status === "waiting") {
      setStatus("ready");
      setMessage("青になったらクリック！");
      setResult(null);
    } else if (status === "ready") {
      setMessage("早すぎ！");
      setStatus("waiting");
    } else if (status === "now") {
      const reaction = Date.now() - startTime;
      setResult(reaction);
      setMessage(`反応時間：${reaction} ms`);
      setStatus("waiting");
    }
  };

  const bgColor =
    status === "now" ? "#4A90E2" : status === "ready" ? "#E74C3C" : "#777";

  return (
    <div
      onClick={handleClick}
      style={{
        height: "100vh",
        backgroundColor: bgColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "32px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {message}
    </div>
  );
}

export default App;
