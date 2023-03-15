import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { Buffer } from "buffer";
import "../list.component.css";
import "../Styles.css";
import rightarrow from "../images/right-arrow.png";
import del from "../images/bin.png";
import edit from "../images/edit-2.png";
import Swal from "sweetalert2";
import Navbar from "../navbar.component"
import leftarrow from "../images/left-arrow.png";

// const encodeNumber = (str) => {
// 	const code = Buffer.from(str, "utf-8")
// 		.toString("base64")
// 		.slice(0, 8)
// 		.toLocaleUpperCase();
// 	return <div>{code}</div>;
// };

const Activity = (props) => {
	return (
		<div className="list-container bg-pink w-full h-full text-navy mb-auto mr-auto">

			{/* header */}
			<div className="list-header-container text-20px bold mt-4 mb-3 mx-6">
				<div className="block ellipsis w-9/12">{props.activity.actName}</div>

				<div className="flex">
					{/* edit icon */}
					<Link to={"/edit/" + props.activity._id}>
						<img src={edit} alt="edit" className="images-16px mx-2" />
					</Link>

					{/* delete icon */}
					<button
						href="#"
						onClick={() => {
							Swal.fire({
								title: "Do you want to delete the Activity?",
								showCancelButton: true,
								confirmButtonText: "Confirm",
							}).then((result) => {
								/* Read more about isConfirmed, isDenied below */
								if (result.isConfirmed) {
									Swal.fire("Deleted!", "", "success").then((result) => {
										props.deleteActivity(props.activity._id);
									});
								}
							});
						}}
					>
						<img src={del} alt="del" className="images-16px" />
					</button>
				</div>
			</div>

			<div className="line border-red-it" />

			{/* description */}
			<div className="mt-3">

				{/* access code */}
				<div className="flex px-4 m-2 my-4">
					<p className="text-16px bold mr-1">Access Code :</p>
					<div className="text-16px italic mr-4">
						{props.activity.code}
					</div>
				</div>

				{/* access code */}
				<div className="flex px-4 items-center m-2">
					<p className="text-16px bold mr-1">Date :</p>
					<p className="text-14px mr-2">
						{props.activity.startTime.substr(0, 10)}
					</p>
					<p className="text-14px mr-2">
						to
					</p>
					<p className="text-14px">
						{props.activity.endTime.substr(0, 10)}
					</p>
				</div>

				{/* see project */}
				<div className="enter-container justify-end mb-2 mx-2">
					<Link to={"/creatorActivityList/" + props.activity._id}>
						<div className="flex items-center justify-end pb-4">
							<p className="text-14px underline bold mr-2">See Project</p>
							<img src={rightarrow} alt="right arrow" className="images-14px" />
						</div>
					</Link>
				</div>

				<div className="mx-4">

				</div>
			</div>
		</div>
	)
};

export default class ActivityList extends Component {
	constructor(props) {
		super(props);
		this.deleteActivity = this.deleteActivity.bind(this);

		this.state = {
			activity: [],
			name: "",
		};
	}

	componentDidMount() {
		const emails = window.localStorage.getItem("activityEmail");
		axios
			.get("http://localhost:5000/activity/getbyemail/" + emails)
			.then((response) => {
				this.setState({ activity: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
		// const listName = [];
		axios
			.get("http://localhost:5000/creatorUsers/creatorUserbyemail/" + emails)
			.then((res) => {
				window.localStorage.setItem(
					"name",
					res.data[0].fname + " " + res.data[0].lname
				);
				this.setState({
					name: res.data[0].fname + " " + res.data[0].lname,
				})
			});
	}

	deleteActivity(id) {
		axios
			.delete("http://localhost:5000/activity/" + id)
			.then((res) => console.log(res.data));
		window.location = "/activityList";
		this.setState({
			activity: this.state.activity.filter((el) => el.id !== id),
		});
	}

	activityList() {
		return this.state.activity.map((currentactivity) => {
			return (
				<Activity
					activity={currentactivity}

					deleteActivity={this.deleteActivity}
					key={currentactivity._id}
				/>
			);
		});
	}

	render() {
		return (
			<main>
				<header>
					<Navbar name={this.state.name} />
				</header>

				<div className="grid px-12 py-8 items-center
								sm:grid-cols-2">

					<Link to="/" className="flex">
						<div className="pt-1 pr-2">
							<img src={leftarrow} alt="left arrow" className="images-18px" />
						</div>
						<p className="text-30px text-left text-navy">Activity Dashboard</p>
					</Link>

					<div className="flex container justify-center pt-4
									sm:justify-end
									sm:pt-0
					">
						<a href="/createActivity" className="button red px-4 py-2 w-48 text-18x">
							Add Activity +
						</a>
					</div>
				</div>

				<div className="flex w-full mx-auto">
					<div className="show-container mx-auto
									sm:grid-cols-2
									md:grid-cols-2
									lg:grid-cols-3
									xl:grid-cols-4
									2xl:grid-cols-5">

						{/* show list of activity */}
						{this.activityList()}
					</div>
				</div>
			</main>
		);
	}
}