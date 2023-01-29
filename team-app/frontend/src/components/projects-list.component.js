import axios from "axios";
import { Component } from "react";

const Projects = (props) =>{
    return(
        <div className="">
            <h1 className=" text-[20px]">{this.props.projectName}</h1>
            <p className="text-[16px]">{this.props.projectDescription}</p>
            <p className="text-[16px]">{this.props.projectComments}</p>
        </div>
    )
}

export default class projectList extends Component{
    constructor(props){
        super(props);
        this.setProjectList = this.setProjectList.bind(this)
        this.state={
            projects:[],
        }
    };
    
    componentDidMount(){
        axios.get('http://localhost:5000/project/').then((res)=>this.setState({
            projects:res.data
        })).catch((err)=>console.log(err))
    };


    deleteProject(id){
        axios.post('http://localhost:5000/project/delete/'+id)

        window.location = "/project/"
        this.setState({
            projects:this.state.projects.filter((val)=>val.id != id)
        })
    };

    showProjectList(){
        return this.state.projects.map((resdata)=>{
            return(
                <div className="bg-sky-500">
                    <Projects
                    projectName={resdata.projectName}
                    projectDescription={resdata.description}
                    projectComments={resdata.comments}
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