import axios from "axios";
import { Component } from "react";

const Project = (props) =>{
    return(
        <div className="flex flex-col bg-white p-3 ">
            <h1 className=" text-[20px]">ชื่อ: {props.projectName}</h1>
            <p className="text-[16px]">ข้อมูล: {props.projectDescription}</p>
            <div dangerouslySetInnerHTML={{__html:props.projectDescription}}></div>
            <p>สมาชิก: </p>
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
                    <Project
                    projectName={resdata.projectName}
                    projectDescription={resdata.description}
                    />
            )
        })
    }

    render(){
        return(
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
                {this.showProjectList()}
            </div>
        )
    }
};