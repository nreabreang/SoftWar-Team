import axios from "axios";
import { Component } from "react";
import "./project-id.component.css";
import "../Styles.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import like from "../images/heart.png";
import wish from "../images/christmas-star.png";
// import ques from "../images/question-mark.png";
// import idea from "../images/idea.png";
import leftarrow from "../images/left-arrow.png";


export default class projectID extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            description: "",
            members: [],
        };
    }

    componentDidMount() {
        const arr = window.location.href.split("/");
        axios
            .get("http://localhost:5000/project/" + arr[arr.length - 1])
            .then((res) => {
                this.setState({
                    projectName: res.data.projectName,
                    description: res.data.description,
                    members: res.data.members,
                });
            });
    }

    showButton(email, func) {
        if (this.state.members.find(elemental => elemental.email === email)) {
            return func;
        } else {
            return;
        }
    }

    buttonEdit() {
        return (<div>Edit.</div>)
    }

    buttonDelete() {
        return (<div>
            <button onClick={(e) => {
                const arr = window.location.href.split("/")
                axios.delete("http://localhost:5000/project/delete/" + arr[arr.length - 1])
                window.history.back()
            }}>Delete</button>
        </div>)
    }

    renderMember() {
        return this.state.members.map((x) => {
            return (<div className="flex text-16px bold">
                <div className="">● {x.name}</div>
                <p className="mx-1">—</p>
                <div>{x.email}</div>
            </div>)
        })
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-2 px-12 py-8 items-center">
                    <p className="flex text-30px text-left text-navy">
                        <Link to="/" className="flex">
                            <img src={leftarrow} alt="left arrow" className="images-18px mr-2 mt-1.5" />
                            Project Description
                        </Link>
                    </p>
                </div>

                <div>
                    <div className="id-container text-navy">
                        <div className="info-container p-8">
                            {/* col1 */}
                            <div className="">
                                {/* date */}
                                <div className="mb-4">
                                    {/* <p className="text-20px bold mr-4">Activity Name : </p> */}
                                    <p className="text-24px text-left bold">{this.state.projectName}</p>
                                    <p className="text-18px bold py-4">Member : {this.renderMember()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="line" />

                        <div className="des-container mt-4">
                            <div className="block">
                                <p className="text-20px bold">DESCRIPTION : </p>
                                <p
                                    className="text-20px italic m4  break-words"
                                    dangerouslySetInnerHTML={{ __html: this.state.description }}
                                ></p>
                            </div>
                        </div>
                    </div>

                    {this.showButton(window.localStorage.PresenterEmail, this.buttonEdit())}
                    {this.showButton(window.localStorage.PresenterEmail, this.buttonDelete())}
                    <div className="w-9/12 mx-auto">
                        <Feedback />

                    </div>
                    <div className="line-horizon w-full" />
                </div>
            </main>


        );
    }
}

const TaskComment = (props) => {
    return (
        <div>
            <div className="grid grid-cols-2 p-8 w-full">

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
                            <img src={like} alt="like" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iQuest}</div>
                        </div>
                    </div>

                    <div className="">
                        <p>What ideas do you have for this project?</p>
                        <div className="flex">
                            <img src={wish} alt="wish" className="images-20px mr-4" />
                            <div className="text-16px bold">{props.letComments.iDea}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="line-horizon w-full" />
        </div>

    );
};

class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedBacks: [],
        };
    }

    showCalculateVirtual() {
        let total = this.state.feedBacks.reduce(
            (corr, data) => corr + Number(data.virtualMoney),
            0
        );

        return total;
    }

    componentDidMount() {
        const arr = window.location.href.split("/");
        axios
            .get("http://localhost:5000/feedback/project/" + arr[arr.length - 1])
            .then((resp) => {
                this.setState({ feedBacks: resp.data });
                console.log(resp.data);
            })
            .catch((err) => console.log("Error: " + err));
    }

    // componentDidUpdate() {
    //   const arr = window.location.href.split("/");
    //   axios
    //     .post(
    //       "http://localhost:5000/project/updateTotalVirtualMoney/" +
    //         arr[arr.length - 1],
    //       { totalVirtualMoney: this.showCalculateVirtual() }
    //     )
    //     .then((res) => console.log("Update total VP :", res.data))
    //     .catch((err) => console.log("Error: " + err));

    //   console.log(this.showCalculateVirtual());
    //   console.log("id :", arr[arr.length - 1]);
    // }

    showLengthOfList() {
        return this.state.feedBacks.map((data, index) => {
            return (
                <div>
                    <TaskComment
                        letComments={data.comments}
                        moneyVir={data.virtualMoney}
                    />
                </div>
            );
        });
        // const arr2 =  arr.then((data)=>data.map((fete)=>fete))
        // const sum =  moneyAll.reduce((correct,data)=>correct + Number(data),0)
    }

    render() {
        return (
            <div className="text-navy">
                <div className="px-12 py-8 items-center justify-left">
                    <p className="text-30px text-left">Feedbacks</p>

                    <div className="flex py-8 ml-8">
                        <p className="text-20px text-left mr-2">● Total Virtual Money : </p>

                        <div className="text-20px text-red-it mr-2">
                            {this.showCalculateVirtual()}
                        </div>
                        <p className="text-20px text-left">credits</p>
                    </div>

                    <div className="ml-8">
                        <div className="text-20px">● Comments</div>

                        <div className="">
                            {this.showCommentAll}
                            {this.showLengthOfList()}
                        </div>
                    </div>

                </div>




                {/* <div class="overview-boxes ">
                    <div class="m-4 rounded-md bg-white p-2">
                        <div class="right-side">
                            <div class="text-20px">Total Virtual Money</div>
                            <div class="text-24px underline">
                                {this.showCalculateVirtual()}
                            </div>
                          
                            <span class="text-20px">credits</span>{" "}
                           
                        </div>
                    </div>
                </div>

                <div class="overview-boxes ">
                    <div class="text rounded-md bg-white m-4 p-4">
                        <div class="right-side">
                            <div class="text-24px">Comment</div>
                            <div class="">
                                {this.showCommentAll}
                                <table>
                                    <tr>{this.showLengthOfList()}</tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}
