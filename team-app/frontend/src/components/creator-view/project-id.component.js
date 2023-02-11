import axios from "axios";
import { Component } from "react";

export default class projectID extends Component{
    constructor(props){
        super(props)

        this.state={
            projectName:"",
            description:"",
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
    
    }
    
    render(){
        return(
            <div className="m-2 bg-white flex  flex-col">
                <label htmlFor="">Project Name: </label>
                <div>{this.state.projectName}</div>
                <div dangerouslySetInnerHTML={{__html:"Description: " + this.state.description}}></div>
                <div>Comment</div>
                <div>{this.showCommentAll}</div>
                <div className="">

                <Feedback />
                
        </div>
            </div>
        )
    }
}

const TaskComment = (props)=>{
    return(
        <div>
            <label >virtualMoney: <div>{props.moneyVir}</div></label>
            <label >I like: <div>{props.letComments.iLike}</div></label>
            <label >I wish: <div>{props.letComments.iWish}</div></label>
            <label >Question: <div>{props.letComments.iQuest}</div></label>
            <label >Idea: <div>{props.letComments.iDea}</div></label>
        </div>
    )
}

class Feedback extends Component{
    constructor(props){
        super(props)
        this.state={
            feedBacks:[],
        }
    }

    componentDidMount(){
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/feedback/project/"+arr[arr.length-1])
        .then((resp)=>{
            this.setState({feedBacks:resp.data})
            console.log(resp.data)
        }).catch((err)=>console.log("Error: "+err))
    }

    showLenghtOfList(){
       return this.state.feedBacks.map((data,index)=>{
        return(
            <TaskComment 
            letComments={data.comments}
            moneyVir={data.virtualMoney}
            />
        )
       })
        // const arr2 =  arr.then((data)=>data.map((fete)=>fete))
        // const sum =  moneyAll.reduce((correct,data)=>correct + Number(data),0)
    }

    showCalculateVirtual(){
        return this.state.feedBacks.reduce((corr,data)=>corr+Number(data.virtualMoney),0)
    }

    render(){
        return(
            <div>
                <label >{this.showCalculateVirtual()}</label>
            <div>{this.showLenghtOfList()}</div>
            </div>
        )
    }
}