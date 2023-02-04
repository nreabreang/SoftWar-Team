import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homepage.component.css";
import rightarrow from "./images/right-arrow.png";
import qr from "./images/qr-code - 1.png";
import "./homepage.component.css";
import "./Styles.css";
import axios from "axios";
import { Buffer } from "buffer";

const encodeNumber = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
};

export default class homepage extends Component {
  constructor(props) {
    super(props);

    this.onChangeCode = this.onChangeCode.bind(this);
    this.onEnterCode = this.onEnterCode.bind(this);

    this.state = {
      code: "#",
    };
  }

  componentDidMount() {}

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

  onEnterCode(e) {
    const code = {
      code: this.state.code,
    };

    // console.log(code);

    axios.get("http://localhost:5000/activity/").then((res) => {
      let isTrue = true;
      //   console.log(res.data[0].actName);
      let resData;
      for (let i = 0; i < res.data.length; i++) {
        // console.log(encodeNumber(res.data[i].actName));
        if (code.code === encodeNumber(res.data[i].actName)) {
          isTrue = true;
          resData = res.data[i].actName;
          window.location = "/guestActivityList/" + res.data[i]._id;
          break;
        } else {
          isTrue = false;
        }
      }

      if (isTrue) {
        console.log("can res", resData);
      } else {
        console.log("not res");
      }
    });
  }

  render() {
    return (
      <main>
        <div className="banner">
          <div className="banner-container">
            <p className="text-36px">Welcome</p>
            <p className="text-20px">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              dignissimos non quis illo provident officiis inventore esse,
              dolorum nam deserunt, dolor odio earum! Veniam nostrum sequi
              voluptas, a expedita optio?
            </p>
          </div>
        </div>

        <div className="button">
          <div className="container">
            <Link to="/createActivity" className="button-navy">
              Get Started!
            </Link>
            <Link to="/guestLogin" className="button-lightpink">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="banner">
          <div className="banner-container text-18px">
            <p>For Guest Joining The Activity</p>
          </div>
        </div>

        <div className="container">
          <div className="joining-container">
            <p className="text-20px">Joining an Activity</p>

            <label for="inputCode"></label>
            <input
              onChange={this.onChangeCode}
              type="text"
              placeholder="Enter Code"
              minlength="8"
              maxlength="8"
              className="input-code"
            ></input>

            <div className="icon-container">
              <img
                src={rightarrow}
                className="images-icon"
                onClick={this.onEnterCode}
              />
            </div>

            <p className="text-20px">Or</p>

            <Link to="/guestLogin">
              <img src={qr} className="images-icon mx-2.5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }
}
