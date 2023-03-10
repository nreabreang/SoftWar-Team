import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../list.component.css"
import "../Styles.css"
import rightarrow from "../images/right-arrow.png"

const ActivityList = (props) => (

	<div className="list-container w-72 text-navy mb-auto mr-auto">

		{/* header */}
		<div className="list-header-container text-20px bold my-3 mx-6">
			<div className="block ellipsis w-11/12">{props.activity.actName}</div>
		</div>

		<div className="line border-red-it" />

		{/* description */}
		<div className="mt-3">

			{/* access code */}
			<div className="items-container m-2 my-4">
				<p className="text-16px bold mr-2">DESCRIPTION: </p>
				<div className="text-16px ellipsis text-left" dangerouslySetInnerHTML={{__html:props.activity.actDescription}}>	
				</div>
			</div>

			{/* see project */}
			<div className="enter-container mb-4">

				<Link to={"/guestActivityList/" + props.activity._id}>
					<div className="flex items-center">
						<p className="text-12px bold mr-1">SEE PROJECT</p>
						<img src={rightarrow} className="images-16px" />
					</div>
				</Link>
			</div>
		</div>
	</div>

	// <div className="list-container mx-auto w-80">

	// 	{/* header */}
	// 	<div className="list-header-container text-24px bold">
	// 		<div className="flex ellipsis">
	// 			{props.activity.actName}
	// 		</div>
	// 	</div>

	// 	{/* description */}
	// 	<div className="mt-2">

	// 		{/* description head */}
	// 		<div className="items-container">
	// 			<p className="text-16px bold">DESCRIPTION</p>
	// 		</div>

	// 		<div className="line" />

	// 		{/* description */}
	// 		<div className="items-container">
	// 			<p className="text-16px italic ellipsis">{props.activity.actDescription}</p>
	// 		</div>

	// 		{/* date */}
	// 		<div className="items-container">
	// 			<p className="text-16px bold">DATE : </p>
	// 			<p className="text-16px italic">{props.activity.date.substring(0, 10)}</p>
	// 		</div>

	// 		{/* see project */}
	// 		<div className="enter-container">
	// 			<Link
	// 				to={"/guestActivityList/" + props.activity._id}
	// 				className="text-14px underline italic">
	// 				See project
	// 			</Link>

	// 			<Link
	// 				to={"/guestActivityList/" + props.activity._id}>
	// 				<img src={rightarrow} className="images-16px" />
	// 			</Link>

	// 		</div>
	// 	</div>
	// </div >

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
				<header>
					<div className="grid grid-cols-2 navbar my-8 items-center">
						<Link to="/" className="">
							<p className="text-16px bold text-navy">GARLICWAK</p>
						</Link>
					</div>

					<div className="line-horizon px-12 mx-12"></div>
				</header>

				<div className="grid grid-cols-2 p-12 items-center">

					<p className="text-30px text-left text-navy break-words">Activity Dashboard</p>

				</div>

				<div className="px-12 pb-12 flex w-full">
					<div className="show-container mx-auto
									xs:grid-cols-2
									sm:grid-cols-2
									md:grid-cols-2
									lg:grid-cols-3
									xl:grid-cols-4
									2xl:grid-cols-4">

						{/* show list of activity (for guest) */}
						{this.guestActivityList()}
					</div>
				</div>
			</main>
			// <main>

			// 	<div className="flex header-container">
			// 		<p className="text-36px">Activity Dashboard</p>
			// 	</div>

			// 	<div className="w-5/6 mx-auto">
			// 		<div className="show-container
			// 						xs:grid-cols-1
			// 						sm:grid-cols-2
			// 						md:grid-cols-2
			// 						lg:grid-cols-3
			// 						xl:grid-cols-3">{this.guestActivityList()}</div>
			// 	</div>

			// </main>
			// <div className="pl-4 font-sans font-bold text-xl">
			//   <h3 className="pl-4 flex justify-center">Activity</h3>
			//   <div className="flex justify-auto m-4 p-4">
			//     {this.guestActivityList()}
			//   </div>
			// </div>
		);
	}
}
