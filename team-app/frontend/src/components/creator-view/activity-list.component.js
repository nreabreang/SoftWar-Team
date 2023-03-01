import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import "../list.component.css";
import Navbar from "../navbar.component";
import "../Styles.css";
import rightarrow from "../images/right-arrow.png";
import del from "../images/delete.png";
import edit from "../images/edit-1.png";
import Swal from "sweetalert2";

const encodeNumber = (str) => {
	const code = Buffer.from(str, "utf-8")
		.toString("base64")
		.slice(0, 8)
		.toLocaleUpperCase();
	return <div>{code}</div>;
};

const Activity = (props) => (
	<div className="list-container w-72 text-navy mb-auto mr-auto">

		{/* header */}
		<div className="list-header-container text-20px bold my-3 mx-6">
			<div className="block ellipsis w-9/12">{props.activity.actName}</div>

			<div className="flex">
				{/* edit icon */}
				<Link to={"/edit/" + props.activity._id}>
					<img src={edit} className="images-16px mx-2" />
				</Link>

				{/* delete icon */}
				<a
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
					<img src={del} className="images-16px" />
				</a>
			</div>
		</div>

		<div className="line border-red-it" />

		{/* description */}
		<div className="mt-3">

			{/* access code */}
			<div className="items-container m-2 my-4">
				<p className="text-16px bold mr-2">ACCESS CODE: </p>
				<div className="text-16px italic mr-4">
					{encodeNumber(props.activity.actName + props.activity.date)}
				</div>
			</div>

			{/* see project */}
			<div className="enter-container mb-4">

				{/* date */}
				<div className="items-container mx-2 my-2">
					{/* <p className="text-16px bold mr-2">DATE: </p> */}
					<p className="text-14px mr-4">
						{props.activity.date.substring(0, 10)}
					</p>
				</div>

				<Link to={"/creatorActivityList/" + props.activity._id}>
					<div className="flex items-center">
						<p className="text-12px bold mr-1">SEE PROJECT</p>
						<img src={rightarrow} className="images-16px" />
					</div>
				</Link>
			</div>
		</div>
	</div>
);

export default class ActivityList extends Component {
	constructor(props) {
		super(props);
		this.deleteActivity = this.deleteActivity.bind(this);

		this.state = {
			activity: [],
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

				<div className="grid grid-cols-2 px-12 py-8 items-center">

					<p className="text-30px text-left text-navy">Activity Dashboard</p>

					<div className="container justify-end">
						<a href="/createActivity" className="button red px-4 py-2 w-48 text-18x">
							Add Activity +
						</a>
					</div>
				</div>

				<div className="px-12 pb-12 flex w-full">
					<div className="show-container mx-auto
									xs:grid-cols-2
									sm:grid-cols-2
									md:grid-cols-2
									lg:grid-cols-3
									xl:grid-cols-4
									2xl:grid-cols-4">

						{/* show list of activity */}
						{this.activityList()}
					</div>
				</div>
			</main>
		);
	}
}
