import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles.css";
// import date from "../images/calendar.png";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// import { DatePicker } from "@y0c/react-datepicker";
// import { useState } from "react";


export default class EditActivity extends Component {
	constructor(props) {
		super(props);
		this.onChangeActName = this.onChangeActName.bind(this);
		this.onChangeActDescription = this.onChangeActDescription.bind(this);
		this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
		this.onChangeUnitMoney = this.onChangeUnitMoney.bind(this);
		this.onChangeStartTime = this.onChangeStartTime.bind(this);
		this.onChangeEndTime = this.onChangeEndTime.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			actName: "",
			actDescription: "",
			virtualMoney: "",
			unitMoney: "",
			startTime: new Date(),
			endTime: new Date(),
		};


	}

	componentDidMount() {
		// console.log(this.props);
		const arr = window.location.href.split('/');
		// console.log(arr);
		axios
			.get("http://localhost:5000/activity/" + arr[arr.length - 1])
			.then((response) => {
				const arr1 = response.data.startTime.split(":00.000Z")
				const arr2 = response.data.endTime.split(":00.000Z")
				console.log(response.data)
				this.setState({
					actName: response.data.actName,
					actDescription: response.data.actDescription,
					virtualMoney: response.data.virtualMoney,
					unitMoney: response.data.unitMoney,
					startTime: arr1[0],
					endTime: arr2[0],
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		// this.setState({actName:"test"});
	}

	onChangeActName(e) {
		this.setState({
			actName: e.target.value,
		});
	}

	onChangeActDescription(e) {
		this.setState({
			actDescription: e,
		});
	}

	onChangeVirtualMoney(e) {
		this.setState({
			virtualMoney: e.target.value,
		});
	}

	onChangeUnitMoney(e) {
		this.setState({
			unitMoney: e.target.value,
		});
	}

	onChangeStartTime(e) {
		this.setState({
			startTime: e.target.value,
		});
	}

	onChangeEndTime(e) {
		this.setState({
			endTime: e.target.value,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		// console.log(new Date(this.state.startTime).getTime())
		// console.log(>= new Date(this.state.endTime).getTime)
		if(new Date(this.state.startTime).getTime() >= new Date(this.state.endTime).getTime()){
				Swal.fire({
					title:"Cannot use date.",
					showConfirmButton:true
				})
		}else{
			const activity = {
				actName: this.state.actName,
				actDescription: this.state.actDescription,
				virtualMoney: this.state.virtualMoney,
				unitMoney: this.state.unitMoney,
				startTime: this.state.startTime,
				endTime: this.state.endTime,
			};
	
			console.log(activity);
			const arr = window.location.href.split('/');
			axios
				.post("http://localhost:5000/activity/update/" + arr[arr.length - 1], activity)
				.then((res) => console.log(res.data));
	
			window.location = "/activityList"; //relocation to homepage
		}
	}

	render() {
		return (
			<main>
				{/* header */}
				    <header>
					<div className="grid grid-cols-2 navbar my-8 items-center">
						<Link to="/" className="">
							<p className="text-16px bold text-navy">GARLICWAK</p>
						</Link>

						<div className="container justify-end">
							<p className="text-16px bold text-red-it">
								{window.localStorage.getItem("name")}</p>
						</div>
					</div>

					<div className="line-horizon px-12 mx-12"></div>
				</header>

				<div className="p-12">
					<p className="text-30px text-navy text-center">Edit Activity</p>
				</div>

				<form onSubmit={this.onSubmit}>
					<div className="grid grid-cols-2 w-9/12 gap-16 mx-auto
										xs:grid-cols-1
										sm:grid-cols-1
										md:grid-cols-1
										lg:grid-cols-2
										xl:grid-cols-2
										2xl:grid-cols-2"
					>

						{/* col1 */}
						<div className="justify-center">
							{/* input activity name */}
							<div className="w-full">
								{/* <label className="text-18px bold">Activity Name</label> */}
								<label className="text-18px text-navy bold">
									ACTIVITY NAME
								</label>
								<input
									className="input mt-4 mb-8 w-full"
									id="actName"
									name="actName"
									type="text"
									value={this.state.actName}
									onChange={this.onChangeActName}
									placeholder="Enter Activity Name"
								/>
							</div>

							{/* input virtual money and unit */}
							<div className="grid grid-cols-2 gap-4">
								{/* virtual money container */}
								<div className="w-full">
									<label className="text-18px text-navy bold">
										VIRTUAL MONEY / GUEST
									</label>
								</div>
							</div>
							<input
								className="input mt-4 mb-8 w-full"
								id="virtualMoney"
								name="virtualMoney"
								type="text"
								value={this.state.virtualMoney}
								onChange={this.onChangeVirtualMoney}
								placeholder="Enter Virtual Money"
							/>


							{/* unit container */}
							<div class="w-full">
								<label className="text-18px bold text-navy" for="grid-last-name">
									UNIT
								</label>
								<input
									className="input mt-4 mb-8 w-full"
									required
									id="unitMoney"
									name="unitMoney"
									type="text"
									value={this.state.unitMoney}
									onChange={this.onChangeUnitMoney}
									placeholder="Enter Unit"
								/>
							</div>


							{/* input Start Time */}
							<div className="w-full grid">
								<label className="text-18px bold text-navy">Start Time</label>

								<input
									type="datetime-local"
									value={this.state.startTime}
									selected={this.state.startTime}
									onChange={this.onChangeStartTime}
									className="input mt-4 mb-8 w-full"
								></input>
							</div>
						</div>
						{/* col2 */}
						<div className="justify-center">

							{/* input End Time */}
							<div className="w-full grid">
								<label className="text-18px bold text-navy">End Time</label>

								<input
									type="datetime-local"
									value={this.state.endTime}
									selected={this.state.endTime}
									onChange={this.onChangeEndTime}
									className="input mt-4 mb-8 w-full"
								></input>
							</div>
						</div>
						{/* col2 */}
						<div className="justify-center">

							{/* input description */}

							{/* <div className="w-9/12"> */}
							{/* <div className="input-container w-full md md:mb-0">
									<label className="">Description</label>
									<textarea
										rows="7"
										required
										id="actName"
										name="actName"
										value={this.state.actDescription}
										onChange={this.onChangeActDescription}
										placeholder="Description"
										className="input w-full"
									/>
								</div> */}


							<div className="justify-center w-full mx-auto">
								<label className="text-18px bold text-navy">DESCRIPTION</label>
								<div>
									<ReactQuill
										theme="snow"
										className="mt-4 mb-8"
										required
										// value="Joe"
										value={this.state.actDescription}
										onChange={this.onChangeActDescription}
										modules={this.modules}
										formats={this.formats}
										placeholder="Enter your Activity Description here"
									/>
								</div>

								{/* <textarea
								</div> */}
						
								{/* <textarea
							rows="7"
							required
							id="actName"
							name="actName"
							value={this.state.actDescription}
							onChange={this.onChangeActDescription}
							placeholder="Description"
							className="input w-full"
								/> */}


							</div>

						</div>
					</div>

					<div className="container justify-end my-8 mx-auto w-9/12">
						<input
							type="submit"
							value="Submit"
							className="button red p-2 w-48"></input>
					</div>
				</form>
			</main>
		);
	}
}
