import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles.css";
import "../list.component.css"
import rightarrow from "../images/right-arrow.png"

const Project = (props) => {
    const des = props.projectDescription
    return (
        <div className="list-container w-96 text-navy mb-auto mr-auto">

            {/* header */}
            <div className="list-header-container text-20px bold my-3 mx-6">
                <div className="block ellipsis w-9/12">{props.projectName}</div>
            </div>
            {/* <div>Edit</div>
            <div>Delete</div> */}
            {props.projectShowButton(window.localStorage.PresenterEmail,props.deleteProjectThis(props.projectID),props.projectMember)}
            {props.projectShowButton(window.localStorage.PresenterEmail,props.editProject(props.projectID),props.projectMember)}
            {/* description */}
            <div className="mt-2">

            <div className="line border-red-it" />

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
    </div>
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

    showButton(email,func,member){
        if(member.find(elemental => elemental.email === email)){
            return func;
        }else{
            return;
        }
    }

    buttonEdit(id){
        return(<div>
            <Link to={"/editProj/"+id}>
                <p>Edit</p>
            </Link>
        </div>)
    }

    buttonDelete(id){
        return(<div>
            <button
                onClick={(e)=>{
                    axios.delete('http://localhost:5000/project/delete/' + id)
                    window.location.reload()
                }}
            >Delete</button>
        </div>)
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
                {/* <div className="header-container flex justify-center">
                    <p className="text-30px bold px-12 py-8 text-navy">Project Dashboard</p>
                </div>

                <div className="w-full mx-auto mb-8">
                    <div className="show-container
                                    xs:grid-cols-1
                                    sm:grid-cols-2
                                    md:grid-cols-2
                                    lg:grid-cols-2
                                    xl:grid-cols-3">{this.showProjectList()}</div>
                </div> */}
            </main>
        )
    }
};
