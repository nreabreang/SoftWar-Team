import React, { Component } from "react";
import "./footer.component.css";
import "./Styles.css";
import copyright from "./images/copyright.png";

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer text-base font-medium">
          <img src={copyright} alt="copyright" className="w-3 h-3 mr-1" />
          <p className="">2023 - SOFTWAR TEAM |</p>
          <a
            className="mx-1 text-red-400 hover:text-gray-700 hover:underline"
            href="https://softwarteam.notion.site/SoftWar-Team-857879d5ff3e4f9b992106f56d4fc144"
          >
            ABOUT
          </a>
        </div>
      </footer>
    );
  }
}
