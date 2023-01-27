import axios from "axios";
import { Component } from "react";

const Projects = (props) =>{
    return(
        <div>

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
                <div>

                </div>
            )
        })
    }

    render(){
        return(
            <div>
                {this.showProjectList()}
            </div>
        )
    }
};