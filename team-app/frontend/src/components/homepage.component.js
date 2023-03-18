import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homepage.component.css";
import rightarrowpink from "./images/right-arrow-pink.png";
import welcome from "./images/welcom-png.png";
// import welcomePng from "./images/welcompng.png"
import qr from "./images/qr-code-pink.png";
import Footer from "./footer.component";
import "./homepage.component.css";
import "./Styles.css";
import axios from "axios";
// import { Buffer } from "buffer";
import Swal from "sweetalert2";
// import { DatePicker } from "@y0c/react-datepicker";
// import calendar style
// You can customize style by copying asset folder.
// import "@y0c/react-datepicker/assets/styles/calendar.scss";

export default class homepage extends Component {
  constructor(props) {
    super(props);

    this.onChangeCode = this.onChangeCode.bind(this);
    this.onEnterCode = this.onEnterCode.bind(this);

    this.state = {
      code: "",
    };
  }

  componentDidMount() {
    // Swal.fire({
    //   title: "Welcome to our website !",
    //   html: `We're a team of passionate developers who love building beautiful and functional web applications.
	//   <br><br><a href="https://softwarteam.notion.site/SoftWar-Team-857879d5ff3e4f9b992106f56d4fc144">Learn more about us</a>.`,
    //   icon: "info",
    //   confirmButtonText: "Continue",
    // });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

  onEnterCode(e) {
    e.preventDefault();
    const code = {
      code: this.state.code,
    };

    console.log(code.code.length);
    if (code.code.length < 8) {
      alert("Please Enter Code !");
    }

    axios
      .get("http://localhost:5000/activity/name/" + code.code)
      .then((res) => {
        // console.log(res.data.length)
        if (res.status === 200 && res.data.length) {
          window.location = "./access/" + code.code;
        } else {
          Swal.fire({
            position: "top",
            icon: "error",
            title: "Wrong Code",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) =>
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Wrong Code",
          showConfirmButton: false,
          timer: 1500,
        })
      );
  }

  render() {
    return (
      <main>
        <div
          className="grid banner
								lg:grid-cols-2
								"
        >
          {/* creator side */}
          <div className="block banner-container left">
            <div className="flex pt-12  mx-auto">
              <a href="/">
                <p className="text-48px text-navy bold goback">GARLICWAK</p>
              </a>
            </div>

            <div className="pt-8">
              <p className="text-36px my-8 text-navy">Be Activity Creator!</p>
              <p className="text-18px text-navy">
                Create, Organize and Invite people to join your Activity!
              </p>

              <div className="flex container justify-start my-8">
                <Link
                  to="/creatorLogin"
                  className="button red p-2 w-48 text-18x"
                >
                  Get Started!
                </Link>
              </div>

              <div className="text-right">
                <p className="text-36px my-8 text-navy">Join Activity!</p>
                <p className="text-18px text-navy pl-20 pb-6 mx-auto">
                  Be a Presenter and add your project into Activity! or Be a
                  guest, explore projects and give them feedbacks!
                </p>

                <div
                  className="flex container justify-end mt-4 mb-8
												"
                >
                  <form onSubmit={this.onEnterCode} className="flex">
                    <div className="flex justify-end">
                      {/* col1 */}
                      <div class="flex relative w-full">
                        <input
                          onChange={this.onChangeCode}
                          type="text"
                          placeholder="Enter Code"
                          maxLength="8"
                          autoComplete="off"
                          className="input-code text-light-pink h-11 w-72 px-6"
                        />

                        <button
                          type="submit"
                          class="absolute top-0 right-0 p-2.5"
                        >
                          <img
                            alt=""
                            type="submit"
                            src={rightarrowpink}
                            className="images-20px"
                          />
                        </button>
                      </div>
                    </div>

                    {/* col2
										<div className="flex items-center text-navy">
											<p className="text-18px bold mx-3">OR</p>

											<Link to="/scanner">
												<div className="bg-red-it p-1.5 rounded-lg">
													<img src={qr} className="images-25px" alt="" />
												</div>
											</Link>
										</div> */}
                  </form>

                  {/* <form onSubmit={this.onEnterCode}>
										<input
											onChange={this.onChangeCode}
											type="text"
											placeholder="Enter Code"
											maxLength="8"
											autoComplete="off"
											className="inputcode text-light-pink"
										></input>

										<button type="submit">
											<img
												alt=""
												src={rightarrowpink}
												className="images-20px"
												// onClick={this.onEnterCode}
												type="submit"
											/>
										</button>
									</form> */}

                  {/* <form
										onSubmit={this.onEnterCode}
										className="absolute flex items-center justify-center">
										<input
											onChange={this.onChangeCode}
											type="text"
											placeholder="Enter Code"
											maxLength="8"
											autoComplete="off"
											className="input-code text-light-pink"
										></input>

										<div className="icon-container">
											<button type="submit">
												<img
													alt=""
													src={rightarrowpink}
													className="images-20px"
													// onClick={this.onEnterCode}
													type="submit"
												/>
											</button>
										</div>

									
										
									</form> */}
                </div>

                <div
                  className="flex container justify-center text-navy 
												lg:justify-end"
                ></div>
              </div>
            </div>
          </div>
          {/* presenter and guest side */}
          <div className="banner-container right flex justify-center">
            <img src={welcome} alt="" />
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}
