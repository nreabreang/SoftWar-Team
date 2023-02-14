import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../list.component.css"
import "../Styles.css"
import rightarrow from "../images/right-arrow.png"

const ActivityList = (props) => (

	<div className="list-container">

		{/* header */}
		<div className="list-header-container text-24px bold">
			<div className="flex ellipsis">
				{props.activity.actName}
			</div>
		</div>

		{/* description */}
		<div className="mt-2">

			{/* description head */}
			<div className="items-container">
				<p className="text-16px bold">DESCRIPTION</p>
			</div>

			<div className="line" />

			{/* description */}
			<div className="items-container">
				<p className="text-16px italic ellipsis">{props.activity.actDescription}</p>
			</div>

			{/* date */}
			<div className="items-container">
				<p className="text-16px bold">DATE : </p>
				<p className="text-16px italic">{props.activity.date.substring(0, 10)}</p>
			</div>

			{/* see project */}
			<div className="enter-container">
				<Link
					to={"/guestActivityList/" + props.activity._id}
					className="text-14px underline italic">
					MORE
				</Link>

				<Link
					to={"/guestActivityList/" + props.activity._id}>
					<img src={rightarrow} className="images-16px" />
				</Link>

			</div>
		</div>
	</div >

);

export default class guestActivityList extends Component {
	constructor(props) {
		super(props);
		this.deleteActivity = this.deleteActivity.bind(this);

		this.state = {
			activity: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/activity/")
			.then((response) => {
				this.setState({ activity: response.data });
			})
			.catch((error) => {
				console.log(error);
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

	guestActivityList() {
		return this.state.activity.map((currentactivity) => {
			return (
				<ActivityList
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

				<div className="flex header-container">
					<p className="text-36px">Activity Dashboard</p>
				</div>

				<div className="w-5/6 mx-auto">
					<div className="show-container
									xs:grid-cols-1
									sm:grid-cols-2
									md:grid-cols-2
									lg:grid-cols-3
									xl:grid-cols-3">{this.guestActivityList()}</div>
				</div>

			</main>
			// <div className="pl-4 font-sans font-bold text-xl">
			//   <h3 className="pl-4 flex justify-center">Activity</h3>
			//   <div className="flex justify-auto m-4 p-4">
			//     {this.guestActivityList()}
			//   </div>
			// </div>
		);
	}
}
