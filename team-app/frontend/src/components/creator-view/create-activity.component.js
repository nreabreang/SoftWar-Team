import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./create-activity.component.css";
import "../Styles.css";
import date from "../images/calendar.png";
import Swal from "sweetalert2"

export default class CreateActivity extends Component {
	constructor(props) {
		super(props);

		this.onChangeActName = this.onChangeActName.bind(this);
		this.onChangeActDescription = this.onChangeActDescription.bind(this);
		this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
		this.onChangeUnitMoney = this.onChangeUnitMoney.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			actName: "",
			actDescription: "",
			virtualMoney: "",
			unitMoney: "",
			email:"",
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		// this.setState({actName:"test"});
	}

	onChangeActName(e) {
		//    const data = axios.get("http://localhost:5000/activity/")
		//    const res = data.then((res)=>res.data);

		this.setState({
			actName: e.target.value,
		});
	}

	onChangeActDescription(e) {
		this.setState({
			actDescription: e.target.value,
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

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const emails =  window.localStorage.activityEmail
		const activity = {
			actName: this.state.actName,
			actDescription: this.state.actDescription,
			virtualMoney: this.state.virtualMoney,
			unitMoney: this.state.unitMoney,
			email:emails,
			date: this.state.date,
		};

		console.log(activity);

		axios
			.post("http://localhost:5000/activity/add", activity)
			.then((res) => {
				if (res.status === 200) {
					Swal.fire('Activity Added !').then((result) => {
						window.location = "/activityList";
					});
				} else {
					// alert("Cannot create this Activity !")
					Swal.fire("Cannot create this Activity !")
				}
				//relocation to homepage
			})
			.catch((err) => {
				if (err) {
					// Swal.fire("Cannot use this Activity Name!")
					Swal.fire("Cannot create this Activity !")
				}
			});
	}


	render() {
		return (
			<main>
				<div className="header-container">
					<p className="text-36px">Create Activity</p>
				</div>

				<form onSubmit={this.onSubmit}>
					<div className="create-activity
									xs:grid-cols-1
									sm:grid-cols-1
									md:grid-cols-1
									lg:grid-cols-2
									xl:grid-cols-2
									2xl:grid-cols-2">

						<div className="flex justify-center">

							<div className="w-9/12">

								{/* input activity name */}
								<div className="input-container w-full">
									<label className="">Activity Name</label>
									<input
										className="input w-full"
										id="actName"
										name="actName"
										type="text"
										value={this.state.actName}
										onChange={this.onChangeActName}
										placeholder="Enter Activity Name"
									/>
								</div>

								{/* input virtual money and unit */}
								<div className="flex">
									{/* virtual money container */}
									<div className="input-container w-full">
										<label className="">Virtual Money</label>
										<input
											className="input w-full"
											id="virtualMoney"
											name="virtualMoney"
											type="text"
											value={this.state.virtualMoney}
											onChange={this.onChangeVirtualMoney}
											placeholder="Enter Virtual Money"
										/>
									</div>

									{/* unit container */}
									<div class="input-container w-1/3">
										<label className="" for="grid-last-name">
											Unit
										</label>
										<input
											className="input w-full"
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

								{/* input date */}
								<div className="input-container w-full">
									<label className="">DATE</label>

									<DatePicker
										className="input w-full"
										selected={this.state.date}
										onChange={this.onChangeDate}
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-center">
							<div className="w-9/12">
								{/* input description */}
								<div className="input-container w-full">
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
								</div>

								<div className="container justify-end">
									<input
										type="submit"
										value="Submitted"
										className="button-navy"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</main>

			//
			//       </div>
			//     </div>
			//   </form>
			// </div>
		);
	}
}
