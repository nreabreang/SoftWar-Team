import axios from "axios";
import { Component } from "react";

const Project = (props) =>{
    return(
        <div className=" bg-white">
            <h1 className=" text-[20px]">{props.projectName}</h1>
            <p className="text-[16px]">{props.projectDescription}</p>
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
            console.log(this.state.projects)
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

    showProjectList(){
        return this.state.projects.map((resdata,index)=>{
            return(
                <div className="bg-sky-500">
                    <Project
                    projectName={resdata.projectName}
                    projectDescription={resdata.description}
                    />
                </div>
            )
        })
    }

    render(){
        return(
            <div className="flex ">
                {this.showProjectList()}
            </div>
        )
    }
};