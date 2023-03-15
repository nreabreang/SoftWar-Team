import { Component } from "react";
import "../Styles.css";
import "../creator-view/project-id.component.css";
import { Link } from "react-router-dom";
import axios from "axios";
import like from "../images/heart.png";
import wish from "../images/christmas-star.png";
import ques from "../images/question-mark.png";
import idea from "../images/idea.png";
import leftarrow from "../images/left-arrow.png";
import Navbar from "../navbar.component";

export default class PresenterProjectId extends Component{
    constructor(props){
        super(props)
        this.state={
            projectName:"",
            description:"",
            members:[],
        }
    }

    componentDidMount(){
        const arr = window.location.href.split("/");
        axios.get("http://localhost:5000/project/" + arr[arr.length - 1]).then((resp)=>{
            this.setState({
                projectName:resp.data.projectName,
                description:resp.data.description,
                members:resp.data.members,
            })
        })
    }

    renderMember() {
        return this.state.members.map((x,index) => {
            return (
                <div className="flex text-16px bold" key={index.toString()}>
                    <p className="text-red-it mx-4">|</p>
                    <div className="">{x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>
                </div>
            )
        })
    }



    render(){
        return(
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                    <Link to={"/presenterActivityId/"+window.localStorage.idActivity} className="">
                        <img src={leftarrow} alt="left arrow" className="images-18px" />
                    </Link>
                    <p className="flex text-30px justify-center">
                        Project Details
                    </p>
                </div>

                <div className="w-9/12 mx-auto bg-pink rounded-lg shadow">

                    <div className="p-8">

                        {/* topic */}
                        <div className="pb-4">
                            <p className="text-30px text-red-it">{this.state.projectName}</p>
                        </div>

                        {/* members */}
                        <div className="pb-4">
                            <p className="text-20px text-navy bold pb-4">● Members</p>
                            <div className="text-navy ml-4">
                                {this.renderMember()}
                            </div>
                        </div>

                        {/* description */}
                        <div className="pb-4">
                            <p className="text-20px text-navy bold pb-1">● Description</p>
                            <div className="text-16px text-navy mx-auto overflow"
                                dangerouslySetInnerHTML={{ __html: this.state.description }}>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <Feedback /> */}
                <PresenterFeedBack />
            </main>
        )
    }
}

const PresenterTaskComment = (props) => {
    return (
        <div className="" key={props.key}>
            <div className="grid grid-cols-2 px-8 w-full">

                {/* col1 */}
                <div>
                    <div className="mb-4">
                        <p>What do you like about the project?</p>
                        <div className="flex">
                            <img src={like} alt="like" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iLike}</div>
                        </div>
                    </div>

                    <div className="">
                        <p>What do you wish about the project?</p>
                        <div className="flex">
                            <img src={wish} alt="wish" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iWish}</div>
                        </div>
                    </div>
                </div>

                {/* col 2 */}
                <div>
                    <div className="mb-4">
                        <p>What questions do you have about this project?</p>
                        <div className="flex">
                            <img src={ques} alt="like" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iQuest}</div>
                        </div>
                    </div>

                    <div className="">
                        <p>What ideas do you have for this project?</p>
                        <div className="flex">
                            <img src={idea} alt="wish" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iDea}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="line-horizon w-full my-8" />
        </div>
    );
};

class PresenterFeedBack extends Component{
    constructor(props){
        super(props)
        this.state={
            feedbacks:[],
        }
    }

    componentDidMount(){
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/feedback/project/" + arr[arr.length - 1]).then((resp)=>{
            this.setState({
                feedbacks:resp.data
            })
        }).catch((err) => console.log("Error: " + err));
    }

    showComment() {
        return this.state.feedbacks.map((data, index) => {
            return (
                <div>
                    <PresenterTaskComment
                        key={index}
                        letComments={data.comments}
                        moneyVir={data.virtualMoney}
                    />
                </div>
            );
        });
    }

    showCalculateVirtual() {
        let total = this.state.feedbacks.reduce(
            (corr, data) => corr + Number(data.virtualMoney),
            0
        );
        return total;
    }

    showVirtualMoney(){
        if(new Date().getTime() >= new Date(window.localStorage.endTime).getTime()){
            return(
                <div className="flex w-9/12 mx-auto text-navy pb-8">
                    <p className="text-20px text-left bold mr-2">● Total Virtual Money : </p>

                    <div className="text-20px text-red-it mr-2">
                        {this.showCalculateVirtual()}
                    </div>
                    <p className="text-20px text-left">credits</p>
                </div>
            )
        }else{
            return;
        }
    }

    render(){
        return(
            <div className="items-center justify-center pb-12">

                {/* topic */}
                <div className="w-9/12 mx-auto items-center justify-center py-9">
                    <p className="text-30px text-navy ">Feedbacks</p>
                </div>

                {/* <div className="flex w-9/12 mx-auto text-navy pb-8">
                    <p className="text-20px text-left bold mr-2">● Total Virtual Money : </p>

                    <div className="text-20px text-red-it mr-2">
                    </div>
                    <p className="text-20px text-left">credits</p>
                </div> */}
                {this.showVirtualMoney()}


                <div className="w-9/12 mx-auto text-navy">
                    <div className="text-20px bold">● Comments</div>

                    <div className="text-16px text-navy mx-auto overflow">
                        {this.showComment()}
                    </div>
                </div>
            </div>
        )
    }
}