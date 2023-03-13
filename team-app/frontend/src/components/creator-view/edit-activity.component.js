import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles.css";
// import date from "../images/calendar.png";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import Navbar from "../navbar.component";


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
			startTime: "",
			endTime: "",
		};


	}

	componentDidMount() {
		// console.log(this.props);
		const arr = window.location.href.split('/');
		// console.log(arr);
		axios
			.get("http://localhost:5000/activity/" + arr[arr.length - 1])
			.then((response) => {
				// const arr1 = response.data.startTime.split(":00.000Z")
				// const arr2 = response.data.endTime.split(":00.000Z")
				const offset = (new Date()).getTimezoneOffset()*60000
				this.setState({
					actName: response.data.actName,
					actDescription: response.data.actDescription,
					virtualMoney: response.data.virtualMoney,
					unitMoney: response.data.unitMoney,
					startTime: new Date((new Date(response.data.startTime)) - offset).toISOString().substring(0, 16),
					endTime: new Date((new Date(response.data.endTime)) - offset).toISOString().substring(0, 16),
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
		if (new Date(this.state.startTime).getTime() >= new Date(this.state.endTime).getTime()) {
			Swal.fire({
				title: "Cannot use date.",
				showConfirmButton: true
			})
		} else {
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
					<Navbar name={window.localStorage.name} />
				</header>

				{/* topic */}
				<div className="px-12 py-8 items-center">
					<p className="text-30px text-center text-navy">Edit Activity</p>
				</div>

				<form onSubmit={this.onSubmit}>
					<div className="grid grid-cols-2 w-9/12 gap-16 mx-auto text-navy
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
									Activity Name
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

							{/* bullet point for choose virtual money */}
							<div className="pb-6 text-16px bold">
								<ul className="flex items-center w-3/4">
									<li className="w-full">
										<div className="flex items-center">
											<input
												id="horizontal-list-radio-license"
												type="radio"
												value="10000"
												name="list-radio"
												className="w-4 h-4 text-red-it bg-white-pink border-navy focus:ring-red-it focus:ring-2"
												onClick={(e) => this.setState({
													virtualMoney: "10000",
													unitMoney: "unit"
												})}
											/>
											<label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Default VM</label>
										</div>
									</li>
									<li className="w-full">
										<div className="flex items-center">
											<input
												id="horizontal-list-radio-license"
												type="radio"
												value="Unit"
												name="list-radio"
												className="w-4 h-4 text-red-it bg-white-pink border-navy focus:ring-red-it focus:ring-2"
												onClick={(e) => this.setState({
													virtualMoney: "",
													unitMoney: ""
												})}
											/>
											<label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Customize VM</label>
										</div>
									</li>
								</ul>
							</div>

							{/* input virtual money and unit grid*/}
							<div className="grid grid-cols-2 gap-4">

								{/* virtual money container */}
								<div className="w-full">
									<label className="text-18px text-navy bold">
										Virtual Money / Guest
									</label>
									{/* virtual money container */}
									<div className="flex w-full">
										<input
											className="input mt-4 mb-8 w-full"
											id="virtualMoney"
											name="virtualMoney"
											type="text"
											value={this.state.virtualMoney}
											onChange={this.onChangeVirtualMoney}
											placeholder="Enter Virtual Money"
										/>

									</div>

								</div>

								{/* unit container */}
								<div className="w-full">
									<label className="text-18px bold text-navy" for="grid-last-name">
										Unit
									</label>

									{/* unit container */}
									<div class="w-full">
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
								</div>
							</div>

							{/* input date */}
							<div className="w-full grid">
								<label className="text-18px bold text-navy">Start Time</label>

								<input type="datetime-local"
									selected={this.state.startTime}
									value={this.state.startTime}
									onChange={this.onChangeStartTime}
									className="input mt-4 mb-8 w-full"></input>
							</div>

							<div className="w-full grid">
								<label className="text-18px bold text-navy">End Time</label>

								<input type="datetime-local"
									selected={this.state.endTime}
									value={this.state.endTime}
									onChange={this.onChangeEndTime}
									className="input mt-4 mb-8 w-full"></input>
							</div>
						</div>

						{/* col2 */}
						<div className="justify-center">
							<div className="w-full">
								{/* <label className="text-18px bold">Activity Name</label> */}
								<label className="text-18px text-navy bold">
									Add Committee
								</label>

							</div>
						</div>
					</div>

					{/* description */}
					<div className="justify-center w-9/12 mx-auto">
						<label className="text-18px bold text-navy">DESCRIPTION</label>
						<ReactQuill
							theme="snow"
							className="mt-4 mb-8"
							id="actName"
							name="actName"
							value={this.state.actDescription}
							onChange={this.onChangeActDescription}
							modules={this.modules}
							formats={this.formats}
							placeholder="Put your Activity Description here"
						/>
					</div>

					<div className="container justify-end my-8 mx-auto w-9/12">
						<input
							type="submit"
							value="Edit Activity"
							className="button red p-2 w-48"
						/>
					</div>
				</form>
			</main>
		);
	}
}
