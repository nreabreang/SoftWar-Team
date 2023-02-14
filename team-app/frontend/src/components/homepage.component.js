import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homepage.component.css";
import rightarrow from "./images/right-arrow.png";
import qr from "./images/qr-code - 1.png";
import "./homepage.component.css";
import "./Styles.css";
import axios from "axios";
import { Buffer } from "buffer";
import Swal from "sweetalert2";

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
      code: "",
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

    console.log(code.code.length);
    if (code.code.length < 8) {
      alert("Please Enter Code !");
    }

    axios.get("http://localhost:5000/activity/").then((res) => {
      // console.log(code.code);
      let i;
      for (i = 0; i < res.data.length; i++) {
        if (code.code === encodeNumber(res.data[i].actName)) {
          // isTrue = true;
          // resData = res.data[i].actName;
          // window.location = "/guestActivityList/" + res.data[i]._id;
          window.location = "/access/" + code.code;
          break;
        }
      }

      if (i >= res.data.length && code.code.length === 8) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Wrong Code",
          showConfirmButton: false,
          timer: 1500,
        });
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
            <Link to="/creatorLogin" className="button-navy">
              Create Activity
            </Link>
          </div>
        </div>

				<div className="button">
					<div className="container justify-center">
						<Link to="/creatorLogin" className="button-navy">
							Create Activity
						</Link>
					</div>
				</div>

				<div className="banner">
					<div className="banner-container text-18px">
						<p>For Guest Joining The Activity</p>
					</div>
				</div>

				<div className="container justify-center">

					<div className="joining-container
                          xs:block px-2.5
                          sm:block px-2.5
                          md:block px-8
                          lg:flex px-8
                          xl:flex px-8">

						<p className="text-20px">Joining an Activity</p>

            <form onSubmit={this.onEnterCode} className="flex items-center justify-center">
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
                  alt=""
                  src={rightarrow}
                  className="images-icon"
                  onClick={this.onEnterCode}
				  type='submit'
                />
              </div>

              <p className="text-20px">Or</p>

              <Link to="/scanner">
                <img src={qr} className="images-icon mx-2.5" alt="" />
              </Link>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
