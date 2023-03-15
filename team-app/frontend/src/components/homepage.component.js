import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homepage.component.css";
import rightarrowpink from "./images/right-arrow-pink.png";
import welcome from "./images/welcom-png.png";
// import welcomePng from "./images/welcompng.png"
import qr from "./images/qr-code - 1.png";
import "./homepage.component.css";
import "./Styles.css";
import axios from "axios";
// import { Buffer } from "buffer";
import Swal from "sweetalert2";
// import { DatePicker } from "@y0c/react-datepicker";
// import calendar style
// You can customize style by copying asset folder.
// import "@y0c/react-datepicker/assets/styles/calendar.scss";

// const encodeNumber = (str) => {
// 	return Buffer.from(str)
// 		.toString("base64")
// 		.slice(0, 8)
// 		.toLocaleUpperCase();
// };

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
		// const code = {
		// 	code: this.state.code,
		// };
		// axios.get("http://localhost:5000/activity/").then((res) => {
		// 	let i;
		// 	for (i = 0; i < res.data.length; i++) {
		// 		console.log(encodeNumber(res.data[i].actName + res.data[i].date));
		// 		if (
		// 			code.code === encodeNumber(res.data[i].actName + res.data[i].date)
		// 		) {
		// 			// isTrue = true;
		// 			// resData = res.data[i].actName;
		// 			// window.location = "/guestActivityList/" + res.data[i]._id;
		// 			window.location = "./access/" + code.code;
		// 			break;
		// 		}
		// 	}

		// 	if (i >= res.data.length && code.code.length === 8) {
		// 		Swal.fire({
		// 			position: "top",
		// 			icon: "error",
		// 			title: "Wrong Code",
		// 			showConfirmButton: false,
		// 			timer: 1500,
		// 		});
		// 	}
		// });
	}

	onChangeCode(e) {
		this.setState({
			code: e.target.value,
		});
	}

	onEnterCode(e) {
		e.preventDefault()
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
					})
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

		// axios.get("http://localhost:5000/activity/").then((res) => {
		// 	console.log(res.data);
		// 	let i;
		// 	for (i = 0; i < res.data.length; i++) {
		// 		console.log(encodeNumber(res.data[i].actName + res.data[i].date));
		// 		if (
		// 			code.code === encodeNumber(res.data[i].actName + res.data[i].date)
		// 		) {
		// 			// isTrue = true;
		// 			// resData = res.data[i].actName;
		// 			// window.location = "/guestActivityList/" + res.data[i]._id;
		// 			// window.location = "./access/" + code.code;
		// 			break;
		// 		}
		// 	}

		// 	if (i >= res.data.length && code.code.length === 8) {
		// 		Swal.fire({
		// 			position: "top",
		// 			icon: "error",
		// 			title: "Wrong Code",
		// 			showConfirmButton: false,
		// 			timer: 1500,
		// 		});
		// 	}
		// });
	}

	render() {
		return (
			<main>
				{/* <div className="navbar-container right gap-2">
					<Link to="/createActivity" className="text-16px bold">
						Create Activity
					</Link>
					<Link to="/activityList" className="text-16px bold">
						Creator Activity View
					</Link>
					<Link to="/guestActivityList" className="text-16px bold">
						Guest Activity View
					</Link>
					<Link to="/createProject" className="text-16px">
						Presenter View
					</Link>
				</div> */}

				<div className="banner">
					{/* creator side */}
					<div className="block banner-container left">


						<div className="flex pt-12  mx-auto">
							<a href="/"><p className="text-48px text-navy bold goback">GARLICWAK</p></a>
						</div>


						<div className="pt-8">
							<p className="text-36px my-8 text-navy">Be Activity Creator!</p>
							<p className="text-18px text-navy">
								Create, Organize and Invite people to join your Activity!
							</p>

							<div className="flex container justify-start my-8">
								<Link
									to="/creatorLogin"
									className="button red p-2 w-48 text-18x">
									Get Started!
								</Link>
							</div>

							<div className="text-right ">
								<p className="text-36px my-8 text-navy">Join Activity!</p>
								<p className="text-18px text-navy pl-20 pb-6">
									Be a Presenter and add your project into Activity! or Be a guest, explore projects and give them feedbacks!
								</p>

								<div className="block container justify-end text-navy
												xs:block
												sm:block
												md:block
												lg:flex
												xl:flex
												2xl:flex">

									<form
										onSubmit={this.onEnterCode}
										className="flex items-center justify-center">
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

										{/* <div className="line-vertical" /> */}



									</form>
									<div className="flex justify-center items-center
													xs:justify-center
													sm:justify-center
													md:justify-center
													lg:justify-start
													xl:justify-start
													2xl:justify-start">
										<p className="text-20px bold mx-4">OR</p>

										<Link to="/scanner">
											<img src={qr} className="images-20px ml-2.5" alt="" />
										</Link>
									</div>
								</div>
							</div>
						</div>


					</div>
					{/* presenter and guest side */}
					<div className="banner-container right flex justify-center">
						<img src={welcome} />
					</div>
				</div>
			</main>
		);
	}
}
