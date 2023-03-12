import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles.css";
import "../list.component.css"
import rightarrow from "../images/right-arrow.png"
import del from "../images/delete.png";
import edit from "../images/edit-1.png";
import Swal from "sweetalert2";

const Project = (props) => {
    const des = props.projectDescription

    return (
        <div className="list-container w-96 text-navy mb-auto mr-auto">

            {/* header */}
            <div className="list-header-container text-20px bold my-3 mx-6">
                <div className="block ellipsis w-9/12">{props.projectName}</div>

                <div className="flex">
                    {props.projectShowButton(window.localStorage.PresenterEmail, props.editProject(props.projectID), props.projectMember)}
                    {props.projectShowButton(window.localStorage.PresenterEmail, props.deleteProjectThis(props.projectID), props.projectMember)}
                </div>
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

                <Link to={"/creatorprojectList/" + props.projectID}>
                    <div className="enter-container mt-4 justify-end">
                        <p className="text-14px underline italic mr-2">MORE</p>
                        <img src={rightarrow} alt="right Arrow" className="images-16px" />
                    </div>
                </Link>
            </div>
        </div >
    )
}

export default class CreatorProjectLists extends Component {
    constructor(props) {
        super(props)

        // this.deleteProject = this.deleteProject.bind(this)
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

    showButton(email, func, member) {
        if (member.find(elemental => elemental.email === email)) {
            return func;
        } else {
            return;
        }
    }

    buttonEdit(id) {
        return (
            <Link to={"/editProj/" + id}>
                <img src={edit} alt="edit" className="images-16px mx-2" />
            </Link>
        )
    }

    buttonDelete(id) {
        return (
            <button
                onClick={(e) => {
                    Swal.fire({
                        title: "Do you want delete it?",
                        confirmButtonText: "Yes,delete it",
                        showCancelButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.delete('http://localhost:5000/project/delete/' + id)
                            window.location.reload()
                        }
                    })

                }}
            >
                <img src={del} alt="del" className="images-16px" />
            </button>
            )
    }

            showProjectList() {
        return this.state.projects.map((resdata, index) => {
            return (
            <Project
                projectID={resdata._id}
                projectName={resdata.projectName}
                projectDescription={resdata.description}
                projectMember={resdata.members}
                projectShowButton={this.showButton}
                deleteProjectThis={this.buttonDelete}
                editProject={this.buttonEdit}
                updateProject={this.updateProject}
            />
            )
        })
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
            )
    }
};
