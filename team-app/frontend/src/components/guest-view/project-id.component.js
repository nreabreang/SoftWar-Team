import axios from "axios";
import Swire from "sweetalert2";
import { Component } from "react";
import leftarrow from "../images/left-arrow.png";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import like from "../images/heart.png";
import wish from "../images/christmas-star.png";
import ques from "../images/question-mark.png";
import idea from "../images/idea.png";

export default class projectID extends Component {
    constructor(props) {
        super(props);
        this.commentILikeOnChange = this.commentILikeOnChange.bind(this);
        this.commentIWishOnChange = this.commentIWishOnChange.bind(this);
        this.commentQuestionOnChange = this.commentQuestionOnChange.bind(this);
        this.commentIdeaOnChange = this.commentIdeaOnChange.bind(this);
        this.virtualMoneyOnChange = this.virtualMoneyOnChange.bind(this);
        this.onSubmitAction = this.onSubmitAction.bind(this);

        this.state = {
            projectName: "",
            description: "",
            members: [],
            storeVirtualMoney: "",
            ILike: "",
            IWish: "",
            Quest: "",
            Idea: "",
            feedBacks: [],
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

    virtualMoneyOnChange(number) {
        this.setState({
            storeVirtualMoney: number,
        });
    }

    commentILikeOnChange(texts) {
        this.setState({
            ILike: texts.target.value,
        });
    }

    commentIWishOnChange(texts) {
        this.setState({
            IWish: texts.target.value,
        });
    }

    commentQuestionOnChange(texts) {
        this.setState({
            Quest: texts.target.value,
        });
    }

    commentIdeaOnChange(texts) {
        this.setState({
            Idea: texts.target.value,
        });
    }

    onSubmitAction(e) {
        e.preventDefault();
        const arr = window.location.href.split("/");
        const test = {
            iLike: this.state.ILike,
            iWish: this.state.IWish,
            iQuest: this.state.Quest,
            iDea: this.state.Idea,
        };
        const data = {
            virtualMoney: this.state.storeVirtualMoney,
            comments: test,
            idProject: arr[arr.length - 1],
        };
        console.log(data);
        var findVirtualMoney = window.localStorage.getItem("guestVirtualMoney");
        if (findVirtualMoney) {
            var calculate =
                Number(window.localStorage.guestVirtualMoney) -
                Number(this.state.storeVirtualMoney);
            if (calculate >= 0) {
                //not over
                Swire.fire("Done !").then(() => {
                    // axios.post("http://localhost:5000/feedback/add", data)
                    // .then(() => console.log("Success"))
                    // .catch((err) => console.log("Error: " + err));
                    axios
                        .post("http://localhost:5000/feedback/add", data)
                        .then(() => console.log("Success."))
                        .catch((err) => console.log("Error: " + err));
                    window.localStorage.guestVirtualMoney =
                        Number(window.localStorage.guestVirtualMoney) -
                        this.state.storeVirtualMoney;
                    window.location = "";
                });
            } else {
                //it over
                Swire.fire(
                    `Cannot You have ${window.localStorage.guestVirtualMoney}`
                ).then(() => {
                    this.setState({
                        storeVirtualMoney: "",
                        ILike: "",
                        IWish: "",
                        Quest: "",
                        Idea: "",
                    });
                    window.location = "";
                });
            }
        } else {
            //it not login
        }
        // let getCookies = document.cookie.split("=");
        // let calculate = Number(getCookies[getCookies.length-1])-Number(this.state.storeVirtualMoney)
        // if(calculate<0){
        //     this.setState({
        //         storeVirtualMoney:"",
        //         ILike:"",
        //         IWish:"",
        //         Quest:"",
        //         Idea:"",
        //     })
        // }else{
        //     document.cookie = `virtualmoney=${calculate}`
        // }
    }

    showMembers() {
        return this.state.members.map((x) => {
            return (
                <div className="flex text-16px bold">
                    <div className="">● {x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("guestName")} />
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
                                    <p className="text-18px bold py-4">Member : {this.showMembers()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="line" />

                        <div className="des-container mt-4">
                            <div className="block">
                                <p className="text-20px bold">DESCRIPTION : </p>
                                <p
                                    className="text-20px italic m4  break-words"
                                    dangerouslySetInnerHTML={{
                                        __html: this.state.description,
                                    }}
                                ></p>
                            </div>
                        </div>
                    </div>

                    {/* {this.showButton(window.localStorage.PresenterEmail, this.buttonEdit())}
                    {this.showButton(window.localStorage.PresenterEmail, this.buttonDelete())} */}
                    <div className="w-9/12 mx-auto text-navy">
                        <Feedback />

                        <form onSubmit={this.onSubmitAction}>

                            <div className="text-navy">

                                {/* give feedbacks */}
                                <div className="px-12 pt-8 items-center justify-left">
                                    <p className="text-30px text-left">Give Feedbacks</p>

                                    {/* give virtual money */}
                                    <div className="pt-8 ml-8">
                                        <p className="text-20px text-left bold mr-2">● Give Virtual Money</p>
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            // id="projectName"
                                            // name="projectName"
                                            type="number"
                                            // value={this.state.projectName}
                                            onChange={(e) => this.virtualMoneyOnChange(e.target.value)}
                                            placeholder="Enter Virtual Money"
                                            min="0"
                                        />
                                    </div>

                                    <div className="ml-8">
                                        <p className="text-20px text-left bold mr-2">● Give Comments</p>
                                        <input required
                                            className="input mt-4 mb-8 w-full"
                                            id="ILike"
                                            name="ILike"
                                            type="text"
                                            value={this.state.ILike}
                                            onChange={this.commentILikeOnChange}
                                            placeholder="What do you like about this project?"
                                        />

                                        <input required
                                            className="input mt-4 mb-8 w-full"
                                            id="IWish"
                                            name="IWish"
                                            type="text"
                                            value={this.state.IWish}
                                            onChange={this.commentIWishOnChange}
                                            placeholder="What do you wish about this project?"
                                        />

                                        <input required
                                            className="input mt-4 mb-8 w-full"
                                            id="Question"
                                            name="Question"
                                            type="text"
                                            value={this.state.Quest}
                                            onChange={this.commentQuestionOnChange}
                                            placeholder="What questions would you like to ask about the project?"
                                        />

                                        <input required
                                            className="input mt-4 mb-8 w-full"
                                            id="Ideas"
                                            name="Ideas"
                                            type="text"
                                            value={this.state.Idea}
                                            onChange={this.commentIdeaOnChange}
                                            placeholder="What ideas would you like to share about the project?"
                                        />

                                    </div>
                                </div>

                                <div className="container justify-end mx-auto px-12 pt-4 pb-12">
                                    <input type="submit" value="Submit" className="button red p-2 w-48" />
                                </div>
                            </div>


                        </form>
                    </div>
                </div>



            </main>

            // <div className=" bg-white flex mx-auto w-3/4 m-4  flex-col p-4 rounded-md">
            //     <div className="text text-xl font-bold flex justify-center my-4 ">
            //         <label htmlFor="" className="text-red-500 mr-2">
            //             Project Name :{" "}
            //         </label>
            //         {this.state.projectName}
            //     </div>
            //     <div>
            //         <button onClick={(e) => window.history.back()}>Go Back</button>
            //     </div>
            //     <div className="my-2 text-red-500  font-semibold">Description</div>
            //     <div className="rounded-md border-2 border-red-300 p-2 border-collapse flex ">
            //         <div
            //             dangerouslySetInnerHTML={{
            //                 __html: this.state.description,
            //             }}
            //             className="my-2 text-grey-500 overflow-x-auto p-2"
            //         ></div>
            //         <div>
            //             Member:
            //             {this.showMembers()}
            //         </div>
            //     </div>
            //     <div>{this.showCommentAll}</div>
            //     <div className="">
            //         <p className="mx-4 mt-4 mb-2 text-base font-semibold text-red-400">
            //             Comments
            //         </p>
            //         <Feedback />
            //         <form onSubmit={this.onSubmitAction}>
            //             <div className="my-4  border-red-300 border-2 rounded-md p-2">
            //                 <label className="text-red-500  font-semibold">
            //                     Give Virtual Money :
            //                 </label>
            //                 <input
            //                     className="mx-2  text-red-500 border-red-200 border-2 rounded-md px-2"
            //                     type="number"
            //                     min="0"
            //                     onChange={(e) => this.virtualMoneyOnChange(e.target.value)}
            //                 />
            //             </div>
            //             <div className="mb-4 rounded-md border-2 border-red-300 p-2">
            //                 <div className="mb-2 text-red-500  font-semibold">
            //                     Give Comment
            //                 </div>
            //                 <input
            //                     type="text"
            //                     placeholder="I like ..."
            //                     id="ILike"
            //                     name="ILike"
            //                     value={this.state.ILike}
            //                     required
            //                     onChange={this.commentILikeOnChange}
            //                 />
            //                 <input
            //                     type="text"
            //                     placeholder="I wish ..."
            //                     id="IWish"
            //                     name="IWish"
            //                     value={this.state.IWish}
            //                     required
            //                     onChange={this.commentIWishOnChange}
            //                 />
            //                 <input
            //                     type="text"
            //                     placeholder="Question?"
            //                     id="Question"
            //                     name="Question"
            //                     value={this.state.Quest}
            //                     required
            //                     onChange={this.commentQuestionOnChange}
            //                 />
            //                 <input
            //                     type="text"
            //                     placeholder="Idea?"
            //                     id="Ideas"
            //                     name="Ideas"
            //                     required
            //                     value={this.state.Idea}
            //                     onChange={this.commentIdeaOnChange}
            //                 />
            //             </div>
            //             <button
            //                 type="submit"
            //                 className=" bg-green-400 p-2 rounded-md text-white mb-2"
            //             >
            //                 Submit
            //             </button>
            //         </form>
            //     </div>
            // </div>
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

    componentDidMount() {
        const arr = window.location.href.split("/");
        axios
            .get("http://localhost:5000/feedback/project/" + arr[arr.length - 1])
            .then((resp) => {
                this.setState({ feedBacks: resp.data });
            })
            .catch((err) => console.log("Error: " + err));
    }

    showCalculateVirtual() {
        let total = this.state.feedBacks.reduce(
            (corr, data) => corr + Number(data.virtualMoney),
            0
        );

        return total;
    }

    componentDidUpdate() {
        const arr = window.location.href.split("/");
        axios
            .post(
                "http://localhost:5000/project/updateTotalVirtualMoney/" +
                arr[arr.length - 1],
                { totalVirtualMoney: this.showCalculateVirtual() }
            )
            .then((res) => console.log("Update total VP :", res.data))
            .catch((err) => console.log("Error: " + err));

        console.log(this.showCalculateVirtual());
        console.log("id :", arr[arr.length - 1]);
    }

    showLengthOfList() {
        return this.state.feedBacks.map((data, index) => {
            return (
                <TaskComment letComments={data.comments} moneyVir={data.virtualMoney} />
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

                    <div className="flex py-6 ml-8">
                        <p className="text-20px text-left bold mr-2">● Total Virtual Money : </p>

                        <div className="text-20px text-red-it mr-2">
                            {this.showCalculateVirtual()}
                        </div>
                        <p className="text-20px text-left">credits</p>
                    </div>

                    <div className="ml-8">
                        <div className="text-20px bold">● Comments</div>

                        <div className="">
                            {this.showCommentAll}
                            {this.showLengthOfList()}
                        </div>
                    </div>

                </div>
            </div>
            // <div>
            //     {/* <label>{this.showCalculateVirtual()}</label> */}
            //     <div>{this.showLengthOfList()}</div>
            // </div>
        );
    }
}
