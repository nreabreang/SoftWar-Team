import axios from "axios";
import { Component } from "react";

export default class projectID extends Component{
    constructor(props){
        super(props)
        this.state={
            projectName:"",
            description:""
        }
    }

    componentDidMount(){
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/project/"+arr[arr.length -1])
        .then((res)=>{
            this.setState({
                projectName:res.data.projectName,
                description:res.data.description
            })

        })
        .catch((err)=>console.log("Error: "+err))
    }

    render(){
        return(
            <div className="m-2 bg-white flex  justify-center">
                <div>{this.state.projectName}</div>
                <div dangerouslySetInnerHTML={{__html:"Description: " + this.state.description}}></div>
                <div>Comment</div>
            </div>
        )
    }
}