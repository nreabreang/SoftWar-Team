import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";

const Project = (props) =>{
    const des = "Description: "+ props.projectDescription
    return(
        <div className="flex flex-col bg-white p-3 m-4" >
            <h1 className=" text-[20px]">Name Project: {props.projectName}</h1>
            {/* <p className="text-[16px]">ข้อมูล: {props.projectDescription}</p> */}
            <div dangerouslySetInnerHTML={{__html:des}}></div>
            <p>สมาชิก: </p>
            <div>
                <Link to={"/projectList/"+ props.projectID} >See</Link>
            </div>
        </div>
    )
}

export default class ProjectLists extends Component{
    constructor(props){
        super(props)

        this.deleteProject = this.deleteProject.bind(this)
        this.state={
            projects:[],
        }
    };

    componentDidMount(){
        axios.get("http://localhost:5000/project/")
        .then((res)=>{
            this.setState({projects: res.data})
            
        })
        .catch((err)=>console.log(err))
    };  


    deleteProject(id){
        axios.post('http://localhost:5000/project/delete/'+id)
        window.location = "/project/"
        this.setState({
            projects:this.state.projects.filter((val)=>val.id !== id)
        })
    };

    updateProject(id,data){
        axios.post("http://localhost:5000/project/update/"+id,data)
        
    }

    showProjectList(){
        return this.state.projects.map((resdata,index)=>{
            return(
                    <Project
                    projectID = {resdata._id}
                    projectName={resdata.projectName}
                    projectDescription={resdata.description}
                    deleteProject={this.deleteProject}
                    updateProject={this.updateProject}
                    />
            )
        })
    }

    render(){
        return(
            <div className="grid grid-cols-1 md:grid-cols-4">
                {this.showProjectList()}
            </div>
        )
    }
};