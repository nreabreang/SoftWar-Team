import React, { Component } from "react";
import "./footer.component.css";
import "./Styles.css";
import copyright from "./images/copyright.png";

export default class footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer">
          <img src={copyright} alt="copyright" className="w-3 h-3" />
          <p className="text-12px">2023 - SOFTWAR TEAM</p>
        </div>
      </footer>
    );
  }
}
