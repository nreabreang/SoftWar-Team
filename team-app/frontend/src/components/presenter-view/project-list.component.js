import { Component } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import del from "../images/bin.png";
import edit from "../images/edit-2.png";
import Swal from "sweetalert2";
import '../list.component.css';
import '../Styles.css'
import rightarrow from "../images/right-arrow.png"

const Project = (props) =>{
    const des = props.projectDescription

    return (
        <div className="list-container bg-pink w-full h-full text-navy mb-auto mr-auto">

            {/* header */}
            <div className="list-header-container text-20px bold mt-4 mb-3 mx-6 ">
                <div className="block ellipsis w-9/12 pt-2">{props.projectName}</div>
                <div className="flex">
                    {props.projectShowButton(window.localStorage.PresenterEmail,props.editProject(props.projectID),props.projectMember)}
                    {props.projectShowButton(window.localStorage.PresenterEmail,props.deleteProjectThis(props.projectID),props.projectMember)}
                </div>
            </div>

            <div className="line border-red-it" />

            {/* description */}
            <div className="mt-3">
                <div className="text-left px-4 m-2 my-4">
                    <p className="text-16px bold py-1">Description</p>
                    <div className="text-16px italic block ellipsis-des" dangerouslySetInnerHTML={{ __html: des }}></div>
                </div>

                {/* see project */}
                <div className="enter-container justify-end mb-2 mx-2">
                    <Link to={"/presenterProjectID/" + props.projectID}>
                        <div className="flex items-center justify-end pb-4">
                            <p className="text-14px underline bold mr-2">See Project</p>
                            <img src={rightarrow} alt="right arrow" className="images-14px" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default class presenterProjectList extends Component{
    constructor(props){
        super(props)

        this.state={
            projects:[],
        }
    }

    componentDidMount(){
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/project/activity/" + arr[arr.length - 1])
            .then((res) => {
                this.setState({ projects: res.data })
            })
            .catch((err) => console.log(err))

    }

    deleteProject(id) {
        axios.delete('http://localhost:5000/project/delete/' + id)
        // window.location = "/project/"
        this.setState({
            projects: this.state.projects.filter((val) => val.id !== id)
        })
    };

    showButton(email, func , member){
        if(member.find(data=> data.email === email)){
            return func;
        }else{
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

    showProjectList(){
        return this.state.projects.map((resdata)=>{
            return(
                <Project 
                projectID={resdata._id}
                projectName={resdata.projectName}
                projectDescription={resdata.description}
                projectMember={resdata.members}
                projectShowButton={this.showButton}
                deleteProjectThis={this.buttonDelete}
                editProject={this.buttonEdit}
                // updateProject={this.updateProject}
                />
            )
        })
    }

    render(){
        return(
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