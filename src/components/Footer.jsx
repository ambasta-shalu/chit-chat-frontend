import React from "react";
import "../css/Footer.css";

function Footer() {
  const handleClick = function () {
    window.open("https://shalu-ambasta.vercel.app/", "_blank", "noopener");
  };

  return (
    <footer className="footer">
      <div className="footer__content">
        <p>
          Made with ReactJS <i className="f__text f__heart__symbol">&#10084;</i>{" "}
          by{" "}
          <span className="f__text dev__name nowrap" onClick={handleClick}>
            Shalu Ambasta
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
