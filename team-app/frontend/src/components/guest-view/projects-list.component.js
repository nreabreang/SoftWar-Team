import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles.css";

const Project = (props) => {
  const des = props.projectDescription;
  return (
    <main className="border-2 rounded-md my-2 border-white">
      <div className="overflow-hidden flex flex-col bg-white p-4 m-4 shadow rounded-md sm:rounded-lg">
        <h1 className=" text-2xl my-2 font-semibold text-red-400">
          Project Name: {props.projectName}
        </h1>
        <div className=" border-gray-200 "></div>
        <div className="flex justify-start mt-4">
          <dl className="">
            <div className="p-4 bg-white sm:grid sm:grid-cols-3 rounded-md w-80 mx-auto  border-2 break-words">
              <dt className="text-sm text-red-400 font-semibold border-b-2 mb-4">Description</dt>
              <div className="my-1"></div>
              <div
                className=" text-sm text-gray-900 sm:col-span-2 sm:mt-0 overflow-x-auto h-32"
                dangerouslySetInnerHTML={{ __html: des }}
              ></div>
            </div>
          </dl>
        </div>
        <div className="mt-4 text-white">
          <Link
            to={"/projectList/" + props.projectID}
            className="underline text-red-400"
          >
            See Project
          </Link>
        </div>
      </div>
    </main>
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
      <div className="grid grid-cols-1 md:grid-cols-4 m-4">
        {this.showProjectList()}
      </div>
    );
  }
}
