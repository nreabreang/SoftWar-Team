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
	constructor (props) {
		super(props);

    this.onChangeCode = this.onChangeCode.bind(this);
    this.onEnterCode = this.onEnterCode.bind(this);

    this.state = {
      code: "",
    };
  }

	componentDidMount() {
		// const data = {acrName:"Act 2"}
		// axios.get("http://localhost:5000/activity/name/"+data.acrName,{params:data}
		// 	).then((resp)=>console.log(resp.data))

		// const test = Buffer.from("QWN0IDE=",'base64').toString('ascii')
	}

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

	async onEnterCode(e) {
		e.preventDefault()
		const code = {
			code: this.state.code,
		};
		if (code.code.length < 8) {
			alert("Please Enter Code !");
		}
		const data = Buffer.from(code.code, 'base64').toString('ascii')
		let checkLoader = await axios.get("http://localhost:5000/activity/name/" + data, { params: { actName: data } })
		console.log(checkLoader.data)
		if (checkLoader.data) {
			// window.location = "./access/" + code.code;
		} else {
			Swal.fire({
				position: "top",
				icon: "error",
				title: "Wrong Code",
				showConfirmButton: false,
				timer: 1500,
			});
		}
		// axios.get("http://localhost:5000/activity/").then((res) => {
		//   console.log(res.data);
		//   let i;
		//   for (i = 0; i < res.data.length; i++) {
		//     if (code.code === encodeNumber(res.data[i].actName)) {
		//       // isTrue = true;
		//       // resData = res.data[i].actName;
		//       // window.location = "/guestActivityList/" + res.data[i]._id;
		//       window.location = "./access/" + code.code;
		//       break;
		//     }
		//   }

		// 		if (i >= res.data.length && code.code.length === 8) {
		// 			Swal.fire({
		// 				position: "top",
		// 				icon: "error",
		// 				title: "Wrong Code",
		// 				showConfirmButton: false,
		// 				timer: 1500,
		// 			});
		// 		}
		// 	});
	}

  render() {
    return (
      <main>
        <div className="banner">
          {/* creator side */}
          <div className="banner-container left">
            <p className="text-48px">Creator!</p>
            <p className="text-20px">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              dignissimos non quis illo provident officiis inventore esse,
              dolorum nam deserunt, dolor odio earum! Veniam nostrum sequi
              voluptas, a expedita optio?
            </p>

            <div className="button my-8">
              <div className="container justify-start">
                <Link to="/creatorLogin" className="button-navy">
                  Get Started!
                </Link>
              </div>
            </div>
          </div>

          {/* presenter and guest side */}
          <div className="banner-container right">
            <p className="text-48px">Welcome</p>
            <p className="text-20px">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
              dignissimos non quis illo provident officiis inventore esse,
              dolorum nam deserunt, dolor odio earum! Veniam nostrum sequi
              voluptas, a expedita optio?
            </p>

            <p className="text-20px">Joining an Activity</p>

            <div className="container justify-start">
              <div className="">
                <form
                  onSubmit={this.onEnterCode}
                  className="flex items-center justify-center"
                >
                  <input
                    onChange={this.onChangeCode}
                    type="text"
                    placeholder="Enter Code"
                    maxLength="8"
                    className="input-code"
                  ></input>

                  <div className="icon-container">
                    <button type="submit">
                      <img
                        alt=""
                        src={rightarrow}
                        className="images-icon"
                        // onClick={this.onEnterCode}
                        type="submit"
                      />
                    </button>
                  </div>

                  <div className="line-vertical" />

                  <p className="text-20px">OR</p>

                  <Link to="/scanner">
                    <img src={qr} className="images-icon mx-2.5" alt="" />
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
