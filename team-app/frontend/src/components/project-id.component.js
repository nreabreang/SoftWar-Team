import axios from "axios";
import { Component } from "react";

export default class projectID extends Component{
    constructor(props){
        super(props)
        this.state={
            projectName:"",
            description:"",
            comensts:[]
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

    virtualMoneyOnChange(number){
        console.log(number)
    }

    commentILikeOnChange(texts){
        console.log(texts)
    }

    commentIWishOnChange(texts){
        console.log(texts)
    }

    commentQuestionOnChange(texts){
        console.log(texts)
    }

    commentIdeaOnChange(texts){
        console.log(texts)
    }

    onSubmitAction(){
        axios.post().then().catch()
    }

    render(){
        return(
            <div className="m-2 bg-white flex  flex-col">
                <div>{this.state.projectName}</div>
                <div dangerouslySetInnerHTML={{__html:"Description: " + this.state.description}}></div>
                <div>Comment</div>
                <form action="" onSubmit={this.onSubmitAction}>
                    <div className="">
                    <p>Virtual Money</p>
                    <input type="number" onChange={(e)=>this.virtualMoneyOnChange(e.target.value)}/>
                </div>
                <div className="">
                    <input type="text" placeholder="I like ..." id="ILike" name="ILike" onChange={(e)=>this.commentILikeOnChange(e.target.value)}/>
                    <input type="text" placeholder="I wish ..." id="IWish" name="IWish" onChange={(e)=>this.commentIWishOnChange(e.target.value)}/>
                    <input type="text" placeholder="Question?" id="Question" name="Question" onChange={(e)=>this.commentQuestionOnChange(e.target.value)}/>
                    <input type="text" placeholder="Idea?" id="Ideas" name="Ideas" onChange={(e)=>this.commentIdeaOnChange(e.target.value)}/>
                </div>
                <input type="submit" value="Submit"/>
                </form>
                
            </div>
        )
    }
}