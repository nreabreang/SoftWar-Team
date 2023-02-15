import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";



const Project = (props) => {
	const des = props.projectDescription;
	return (
		<main>
			<div className="list-container
							xs: w-80
							sm: w-80
							md: w-80
							lg: w-80
							xl: w-120">

				{/* header */}
				<div className="list-header-container text-24px bold">
					<div className="flex ellipsis">
						Project Name: {props.projectName}
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
					<div className="items-container my-2 mx-2">
						<dl className="">
							<div className=" break-words">

								<div className="text-16px text-left overflow-x-auto h-32"
									dangerouslySetInnerHTML={{ __html: des }}
								></div>
							</div>
						</dl>
					</div>
					{/* <div className="items-container">
						<p className="text-16px italic ellipsis">{props.projectDescription}</p>
						<div className="text-16px ellipsis break-words" dangerouslySetInnerHTML={{ __html: des }}></div>
					</div> */}

					{/* see project */}

					<Link to={"/guestprojectList/" + props.projectID}>
						<div className="enter-container">
							<p className="text-14px underline italic">MORE</p>
							{/* <img src={rightarrow} className="images-16px" /> */}
						</div>
					</Link>

				</div>


			</div >
		</main>
		// <main className="border-2 rounded-md my-2 border-white">
		// 	<div className="overflow-hidden flex flex-col bg-white p-4 m-4 shadow rounded-md sm:rounded-lg">
		// 		<h1 className=" text-2xl my-2 font-semibold text-red-400">
		// 			Project Name: {props.projectName}
		// 		</h1>
		// 		<div className=" border-gray-200 "></div>
		// 		<div className="flex justify-start mt-4">
		// 			<dl className="">
		// 				<div className="p-4 bg-white sm:grid sm:grid-cols-3 rounded-md w-80 mx-auto  border-2 break-words">
		// 					<dt className="text-sm text-red-400 font-semibold border-b-2 mb-4">Description</dt>
		// 					<div className="my-1"></div>
		// 					<div
		// 						className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0 overflow-x-auto h-32"
		// 						dangerouslySetInnerHTML={{ __html: des }}
		// 					></div>
		// 				</div>
		// 			</dl>
		// 		</div>
		// 		<div className="mt-4 text-white">
		// 			<Link
		// 				to={"/projectList/" + props.projectID}
		// 				className="underline text-red-400"
		// 			>
		// 				See Project
		// 			</Link>
		// 		</div>
		// 	</div>
		// </main>
	);
};

export default class ProjectLists extends Component {
	constructor(props) {
		super(props);

		this.deleteProject = this.deleteProject.bind(this);
		this.state = {
			projects: [],
		};
	}

	componentDidMount() {
		const arr = window.location.href.split("/");
		axios
			.get("http://localhost:5000/project/activity/" + arr[arr.length - 1])
			.then((res) => {
				this.setState({ projects: res.data });
			})
			.catch((err) => console.log(err));
	}

	deleteProject(id) {
		axios.post("http://localhost:5000/project/delete/" + id);
		window.location = "/project/";
		this.setState({
			projects: this.state.projects.filter((val) => val.id !== id),
		});
	}

	updateProject(id, data) {
		axios.post("http://localhost:5000/project/update/" + id, data);
	}

	showProjectList() {
		return this.state.projects.map((resdata, index) => {
			return (
				<Project
					projectID={resdata._id}
					projectName={resdata.projectName}
					projectDescription={resdata.description}
					deleteProject={this.deleteProject}
					updateProject={this.updateProject}
				/>
			);
		});
	}

	render() {
		return (
			<main>
				<div className="flex header-container">
					<p className="text-30px bold ">Project Dashboard</p>
				</div>

				<div className="w-9/12 mx-auto">
					<div className="show-container
                                    xs:grid-cols-1
                                    sm:grid-cols-1
                                    md:grid-cols-1
                                    lg:grid-cols-2
                                    xl:grid-cols-2">{this.showProjectList()}</div>
				</div>

				{/* <div className="grid grid-cols-1 md:grid-cols-4 m-4">
					{this.showProjectList()}
				</div> */}
			</main>

		);
	}
}
