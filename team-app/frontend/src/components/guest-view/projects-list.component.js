import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import rightarrow from "../images/right-arrow.png"


const Project = (props) => {
	const des = props.projectDescription;
	return (
		<div className="list-container bg-pink w-full h-full text-navy mb-auto mr-auto">

            {/* header */}
            <div className="list-header-container text-20px bold mt-4 mb-3 mx-6">
                <div className="block ellipsis w-9/12">{props.projectName}</div>
            </div>

            <div className="line border-red-it" />

            {/* description */}
            <div className="mt-3">

                {/* access code */}
                <div className="text-left px-4 m-2 my-4">
                    <p className="text-16px bold py-1">Description</p>
                    <div className="text-16px italic block ellipsis-des" dangerouslySetInnerHTML={{ __html: des }}></div>
                </div>

                {/* see project */}
                <div className="enter-container justify-end mb-2 mx-2">
                    <Link to={"/projectList/" + props.projectID}>
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
				<div className="flex w-9/12 mx-auto">
                    <div className="show-container mx-auto
                                xs:grid-cols-1
                                sm:grid-cols-1
                                md:grid-cols-3
                                lg:grid-cols-3
                                xl:grid-cols-3
                                2xl:grid-cols-3">

                        {/* show list of project */}
                        {this.showProjectList()}
                    </div>
                </div>
			</main>
		);
	}
}
