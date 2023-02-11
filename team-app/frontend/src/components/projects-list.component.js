import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./Styles.css";



const Project = (props) =>{
    const des = props.projectDescription
    return(
    
        <div className="overflow-hidden flex flex-col bg-white p-3 m-4 shadow sm:rounded-lg" >
            <h1 className=" text-20px">Project Name: {props.projectName}</h1>
            <div className="border-t border-gray-200"></div>
            {/* <p className="text-16px">ข้อมูล: {props.projectDescription}</p> */}
            <div className="border-t border-gray-200">
            <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 ">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0" dangerouslySetInnerHTML={{__html:des}}></div>
            </div></dl></div>
                <Link to={"/projectList/"+ props.projectID} >See</Link>
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
        // const arr = window.location.href.split("/")
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