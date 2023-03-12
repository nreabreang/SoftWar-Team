import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import rightarrow from "../images/right-arrow.png"


const Project = (props) => {
	const des = props.projectDescription;
	return (
		<div className="list-container w-96 text-navy mb-auto mr-auto">

			{/* header */}
			<div className="list-header-container text-20px bold my-3 mx-6">
				<div className="block ellipsis w-9/12">{props.projectName}</div>
			</div>

			<div className="line border-red-it" />

			{/* description */}
			<div className="my-3 mx-2">
				{/* description head */}
				<div className="items-container">
					<p className="text-16px bold mr-1 mb-2">DESCRIPTION</p>

				</div>

				{/* description */}
				<div className="items-container ml-4">
					<div className="text-16px block ellipsis" dangerouslySetInnerHTML={{ __html: des }}></div>
				</div>

				{/* see project */}

				<Link to={"/projectList/" + props.projectID}>
					<div className="enter-container mt-4 justify-end">
						<p className="text-14px underline italic mr-2">MORE</p>
						<img src={rightarrow} alt="right Arrow" className="images-16px" />
					</div>
				</Link>
			</div>
		</div>
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
				<div className="px-12 py-8 items-center justify-center">

					<p className="text-30px text-center text-navy">Project Dashboard</p>
				</div>

				<div className="px-12 pb-12 flex w-full">
					<div className="show-container mx-auto
							xs:grid-cols-2
							sm:grid-cols-2
							md:grid-cols-2
							lg:grid-cols-3
							xl:grid-cols-3
							2xl:grid-cols-3">

						{/* show list of project */}
						{this.showProjectList()}
					</div>
				</div>
			</main>
			// <main>
			// 	<div className="flex header-container">
			// 		<p className="text-30px bold ">Project Dashboard</p>
			// 	</div>

			// 	<div className="w-9/12 mx-auto">
			// 		<div className="show-container
			//                         xs:grid-cols-1
			//                         sm:grid-cols-1
			//                         md:grid-cols-1
			//                         lg:grid-cols-2
			//                         xl:grid-cols-2">{this.showProjectList()}</div>
			// 	</div>

			// 	{/* <div className="grid grid-cols-1 md:grid-cols-4 m-4">
			// 		{this.showProjectList()}
			// 	</div> */}
			// </main>

		);
	}
}
