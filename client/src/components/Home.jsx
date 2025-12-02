import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [msg, setMsg] = useState("");

  const getRes = () => {
    axios
      .get("https://games-library-app.onrender.com")
      .then((res) => setMsg(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRes();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{msg}</h1>
      <Link
        to="/game"
        style={{
          display: "block",
          fontSize: "23px",
          textAlign: "center",
          textDecoration: "none",
        }}
      >
        Games Library
      </Link>
    </div>
  );
}
