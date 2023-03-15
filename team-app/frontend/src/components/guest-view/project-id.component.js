import axios from "axios";
import Swire from "sweetalert2";
import { Component } from "react";
import leftarrow from "../images/left-arrow.png";
import { Link } from "react-router-dom";
import Navbar from "../navbarguest.component";
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


    
    showMembers() {
        return this.state.members.map((x) => {
            return (
                <div className="flex text-16px bold">
                    <div className="">{x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>
                    <p className="text-red-it mx-4">|</p>
                </div>
            );
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
                Swire.fire({
                    title: "Give Virtual Money Successfully",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                }).then(() => {
                    axios
                        .post("http://localhost:5000/feedback/add", data)
                        .then(() => console.log("Success."))
                        .catch((err) => console.log("Error: " + err));
                    window.localStorage.guestVirtualMoney =
                        Number(window.localStorage.guestVirtualMoney) -
                        this.state.storeVirtualMoney;
                    this.setState({
                        feedBacks: [...this.state.feedBacks, data],
                        virtualMoney: "",
                        ILike: "",
                        IWish: "",
                        Quest: "",
                        Idea: "",
                    });
                });
            } else {
                //it over
                Swire.fire({
                    title: `Not enough Virtual Money : You have ${window.localStorage.guestVirtualMoney}`,
                    icon: "error",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                }
                ).then(() => {
                    this.setState({
                        storeVirtualMoney: "",
                        ILike: "",
                        IWish: "",
                        Quest: "",
                        Idea: "",
                    });
                    window.location.reload()
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

    showFormFeedback(){
        console.log(new Date(window.localStorage.endAct))
        if(new Date().getTime() >= new Date(window.localStorage.endAct)){
            return(
                <div>
                    EndTime
                </div>
            )
        }else{
            return(
                <div className="items-center justify-center">
                    <form onSubmit={this.onSubmitAction}>
                        {/* topic */}
                        <div className="w-9/12 mx-auto items-center justify-center pb-9">
                            <p className="text-30px text-navy">Give Feedbacks</p>
                        </div>

                        <div className="flex w-9/12 mx-auto text-navy pb-8">
                            <p className="text-20px text-left w-1/4 mr-4 pt-1 bold">
                                ● Give Virtual Money
                            </p>

                            <div className="items-center w-full">
                                <input
                                    className="input"
                                    // id="projectName"
                                    // name="projectName"
                                    type="number"
                                    value={this.state.virtualMoney}
                                    onChange={(e) => this.virtualMoneyOnChange(e.target.value)}
                                    placeholder="Enter Virtual Money"
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="w-9/12 mx-auto text-navy">
                            <div className="text-20px bold">● Give Comments</div>

                            <div className="flex">
                                <div className="pt-6 mr-4">
                                    <img src={like} alt="" className="images-20px" />
                                </div>

                                <input
                                    // required
                                    className="input mt-4 mb-8 w-full"
                                    id="ILike"
                                    name="ILike"
                                    type="text"
                                    value={this.state.ILike}
                                    onChange={this.commentILikeOnChange}
                                    placeholder="What do you like about this project?"
                                />
                            </div>

                            <div className="flex">
                                <div className="pt-6 mr-4">
                                    <img src={wish} alt="" className="images-20px" />
                                </div>

                                <input
                                    // required
                                    className="input mt-4 mb-8 w-full"
                                    id="IWish"
                                    name="IWish"
                                    type="text"
                                    value={this.state.IWish}
                                    onChange={this.commentIWishOnChange}
                                    placeholder="What do you wish about this project?"
                                />
                            </div>

                            <div className="flex">
                                <div className="pt-6 mr-4">
                                    <img src={ques} alt="" className="images-20px" />
                                </div>

                                <input
                                    // required
                                    className="input mt-4 mb-8 w-full"
                                    id="Question"
                                    name="Question"
                                    type="text"
                                    value={this.state.Quest}
                                    onChange={this.commentQuestionOnChange}
                                    placeholder="What questions would you like to ask about the project?"
                                />
                            </div>

                            <div className="flex">
                                <div className="pt-6 mr-4">
                                    <img src={idea} alt="" className="images-20px" />
                                </div>

                                <input
                                    // required
                                    className="input mt-4 mb-8 w-full"
                                    id="Ideas"
                                    name="Ideas"
                                    type="text"
                                    value={this.state.Idea}
                                    onChange={this.commentIdeaOnChange}
                                    placeholder="What ideas would you like to share about the project?"
                                />
                            </div>

                            <div className="flex container justify-end mx-auto pt-4 pb-12">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="button red p-2 w-48"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("guestName")} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                    <Link to={"/presenterActivityId/" + window.localStorage.ActId} className="">
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
                                {this.showMembers()}
                            </div>
                        </div>

                        {/* description */}
                        <div className="pb-4">
                            <p className="text-20px text-navy bold pb-1">● Description</p>
                            <div className="text-16px text-navy mx-auto overflow"
                                dangerouslySetInnerHTML={{
                                    __html: this.state.description,
                                }}>
                            </div>
                        </div>
                    </div>
                </div>

                <Feedback />
                {this.showFormFeedback()}
            </main>
        );
    }
}

const TaskComment = (props) => {
    return (
        <div>
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
            <div className="items-center justify-center pb-12">
                {/* topic */}
                <div className="w-9/12 mx-auto items-center justify-center py-9">
                    <p className="text-30px text-navy ">Feedbacks</p>
                </div>

                <div className="flex w-9/12 mx-auto text-navy pb-8">
                    <p className="text-20px text-left mr-2 bold">
                        ● Total Virtual Money :{" "}
                    </p>

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
