import React from "react";
import "../css/IndexPage.css";
import Logo from "../components/Logo";
import CHAT_GIF from "../assets/chat-gif.gif";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();

  const handleNewRoom = function () {
    navigate("/newroom");
  };

  const handleExistRoom = function () {
    navigate("/exroom");
  };

  return (
    <div className="index__page">
      <Logo />
      <div className="index__contents">
        <div className="index__banner__text">
          <h1>
            Now chat anonymously with <br /> anyone.
          </h1>
          <h3>
            Click <strong>Create Chat Room</strong> to get a room code you can
            send to people <br /> you want to chat with.
          </h3>
          <div className="index__btns">
            <button className="btn__new__chat" onClick={handleNewRoom}>
              Create Chat Room
            </button>
            <button className="btn__old__chat" onClick={handleExistRoom}>
              Join Chat Room
            </button>
          </div>
        </div>
        <div className="index__banner__img">
          <img src={CHAT_GIF} alt="Chat Banner" />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
