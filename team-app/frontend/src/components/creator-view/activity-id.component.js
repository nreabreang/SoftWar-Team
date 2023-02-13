import axios from "axios";
import GenerateQR from "./qr-activity";
import CreatorProjectLists from "./project-list.component";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import rightarrow from "../images/right-arrow.png";
import "../Styles.css";
import "../list.component.css";

const ActivityList = (props) => (

	<div className="list-container">

		{/* header */}
		<div className="list-header-container text-24px bold">
			<div className="flex ellipsis w-3/4">
				{this.state.actName}
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
				<p className="text-16px italic ellipsis">{this.state.actDescription}</p>
			</div>

			{/* date */}
			<div className="items-container">
				<p className="text-16px bold">DATE : </p>
				<p className="text-16px italic">{this.state.date.toISOString().substring(0, 10)}</p>
			</div>

			{/* see project */}
			<div className="enter-container">
				<Link
					to={"/creatorActivityList/" + props.activity._id}
					className="text-14px underline italic">
					MORE
				</Link>

				<Link
					to={"/creatorActivityList/" + props.activity._id}>
					<img src={rightarrow} className="images-16px" />
				</Link>

			</div>
		</div>
	</div >

	/* <div className="div">
			  <div className="flex justify-center">
				<div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
				  <h5 class="mb-2 font-medium mx-4 tracking-tight text-gray-900 dark:text-white">
					<p className="font-bold">Project Name</p>
					{this.state.actName}
				  </h5>
				  <p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
					<h5 className="font-bold">Date</h5>
					{this.state.date.toISOString().substring(0, 10)}
				  </p>
	
				  <p class="mb-3 font-medium text-gray-700 dark:text-gray-400 " >
					<h5 className="font-bold">Description</h5>
					<div Style="word-wrap: break-word;white-space:pre-wrap;">{this.state.actDescription}</div>
				  </p>
	
				</div>
				<GenerateQR urls={window.location.href} actName={this.state.actName} />
			  </div>
			  <CreatorProjectLists />
			</div> */
);

export default class creatorActivityId extends Component {
	constructor(props) {
		super(props);
		this.state = {
			actName: "",
			actDescription: "",
			virtualMoney: "",
			unitMoney: "",
			date: new Date(),
		};
	}

	componentDidMount() {
		const arr = window.location.href.split("/");
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

	}

	render() {
		return (
			<main>
				<div className="header-container">
					<p className="text-36px">Activity - {this.state.actName}</p>
				</div>

				{/* <div className="px-32">
                    <div className="show-container">{this.activityList()}</div>
                </div> */}
			</main>
		);
	}
}
