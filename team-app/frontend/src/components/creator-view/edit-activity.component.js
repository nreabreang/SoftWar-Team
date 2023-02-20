import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles.css"

export default class EditActivity extends Component {
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
			date: new Date(),
		};
	}



	componentDidMount() {
		console.log(this.props);
		const arr = window.location.href.split('/');
		console.log(arr);
		axios
			.get("http://localhost:5000/activity/" + arr[arr.length - 1])
			.then((response) => {
				this.setState({
					actName: response.data.actName,
					actDescription: response.data.actDescription,
					virtualMoney: response.data.virtualMoney,
					unitMoney: response.data.unitMoney,
					date: new Date(response.data.date),
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

		const activity = {
			actName: this.state.actName,
			actDescription: this.state.actDescription,
			virtualMoney: this.state.virtualMoney,
			date: this.state.date,
		};

		console.log(activity);
		const arr = window.location.href.split('/');
		axios
			.post("http://localhost:5000/activity/update/" + arr[arr.length - 1], activity)
			.then((res) => console.log(res.data));

		window.location = "/activityList"; //relocation to homepage
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
									xl:grid-cols-2">

						<div className="flex justify-center">
							<div className="w-9/12">
								{/* input activity name */}
								<div className="w-full">
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
									<div className="w-full">
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
								<div className="input-container w-full md md:mb-0">
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
								<div className="input-container w-full md md:mb-0">
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
										value="Submit"
										className="button-navy"
									/>
								</div>
							</div>
						</div>
					</div>
				</form>
			</main>
		);
	}
}
