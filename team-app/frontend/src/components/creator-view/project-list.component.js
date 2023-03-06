import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles.css";
import "../list.component.css"
import rightarrow from "../images/right-arrow.png"

const Project = (props) => {
    const des = props.projectDescription
    return (
        <div className="list-container mx-auto
                        xs:w-80
                        sm:w-80
                        md:w-72
                        lg:w-100
                        xl:w-80">

            {/* header */}
            <div className="list-header-container text-24px bold">
                <div className="flex ellipsis">
                    {props.projectName}
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
                    {/* <p className="text-16px italic ellipsis">{props.projectDescription}</p> */}
                    <div className="text-16px ellipsis break-words" dangerouslySetInnerHTML={{ __html : des }}></div>
                </div>
            {/* <button onClick={(e)=>{props.deleteProject(props.projectID)
                    window.location.reload()
            }}>Delete</button> */}
                {/* see project */}

                <Link to={"/creatorprojectList/" + props.projectID}>
                    <div className="enter-container">
                        <p className="text-14px underline italic">MORE</p>
                        <img src={rightarrow} className="images-16px" />
                    </div>
                </Link>

            </div>


        </div >

        /* <div className="overflow-hidden flex flex-col bg-white p-3 m-4 shadow sm:rounded-lg" >
            <h1 className=" text-20px">Project Name: {props.projectName}</h1>
            <div className="border-t border-gray-200"></div>
            <p className="text-16px">ข้อมูล: {props.projectDescription}</p>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 ">
                        <dt className="text-sm font-medium text-gray-500">Description</dt>
                        <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" dangerouslySetInnerHTML={{ __html: des }}></div>
                    </div></dl></div>
            <Link to={"/creatorprojectList/" + props.projectID} >See</Link>
        </div> */

    )
}

export default class CreatorProjectLists extends Component {
    constructor(props) {
        super(props)

        this.deleteProject = this.deleteProject.bind(this)
        this.state = {
            projects: [],
        }
    };

    componentDidMount() {
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/project/activity/" + arr[arr.length - 1])
            .then((res) => {
                this.setState({ projects: res.data })
            })
            .catch((err) => console.log(err))
    };


    deleteProject(id) {
        axios.delete('http://localhost:5000/project/delete/' + id)
        // window.location = "/project/"
        this.setState({
            projects: this.state.projects.filter((val) => val.id !== id)
        })
    };

    updateProject(id, data) {
        axios.post("http://localhost:5000/project/update/" + id, data)

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
            )
        })
    }

    render() {
        return (
            <main>
                <div className="header-container flex justify-center">
                    <p className="text-30px bold mt-8">Project Dashboard</p>
                </div>

                <div className="w-9/12 mx-auto">
                    <div className="show-container
                                    xs:grid-cols-1
                                    sm:grid-cols-2
                                    md:grid-cols-2
                                    lg:grid-cols-2
                                    xl:grid-cols-3">{this.showProjectList()}</div>
                </div>
            </main>
        )
    }
};
