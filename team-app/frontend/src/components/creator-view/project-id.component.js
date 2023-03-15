import axios from "axios";
import { Component } from "react";
import "./project-id.component.css";
import "../Styles.css";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import like from "../images/heart.png";
import wish from "../images/christmas-star.png";
import ques from "../images/question-mark.png";
import idea from "../images/idea.png";
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
            return (
                <div className="flex text-16px bold">
                    <p className="text-red-it mx-4">|</p>
                    <div className="">{x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>
                </div>
            )
        })
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                    <Link to={"/creatorActivityList/"+window.localStorage.idAct} className="">
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

                {/* {this.showButton(window.localStorage.PresenterEmail, this.buttonEdit())}
                {this.showButton(window.localStorage.PresenterEmail, this.buttonDelete())} */}

                <Feedback />
            </main>


        );
    }
}

const TaskComment = (props) => {
    return (
        <div className="">
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
            <div className="items-center justify-center pb-12">

                {/* topic */}
                <div className="w-9/12 mx-auto items-center justify-center py-9">
                    <p className="text-30px text-navy ">Feedbacks</p>
                </div>

                <div className="flex w-9/12 mx-auto text-navy pb-8">
                    <p className="text-20px text-left bold mr-2">● Total Virtual Money : </p>

                    <div className="text-20px text-red-it mr-2">
                        {this.showCalculateVirtual()}
                    </div>
                    <p className="text-20px text-left">credits</p>
                </div>


                <div className="w-9/12 mx-auto text-navy">
                    <div className="text-20px bold">● Comments</div>

                    <div className="text-16px text-navy mx-auto overflow">
                        {this.showLengthOfList()}
                    </div>
                </div>
            </div>
        );
    }
}
