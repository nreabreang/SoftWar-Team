import axios from "axios";
import Swire from "sweetalert2";
import { Component } from "react";
// import user from '../images/user.png'

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
        <div>
          <div>{x.name}</div>
          <div>{x.email}</div>
        </div>
      );
    });
  }

  render() {
    return (
      <div className=" bg-white flex mx-auto w-3/4 m-4  flex-col p-4 rounded-md">
        <div className="text text-xl font-bold flex justify-center my-4 ">
          <label htmlFor="" className="text-red-500 mr-2">
            Project Name :{" "}
          </label>
          {this.state.projectName}
        </div>
        <div>
          <button onClick={(e) => window.history.back()}>Go Back</button>
        </div>
        <div className="my-2 text-red-500  font-semibold">Description</div>
        <div className="rounded-md border-2 border-red-300 p-2 border-collapse flex ">
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.description,
            }}
            className="my-2 text-grey-500 overflow-x-auto p-2"
          ></div>
          <div>
            Member:
            {this.showMembers()}
          </div>
        </div>
        <div>{this.showCommentAll}</div>
        <div className="">
          <p className="mx-4 mt-4 mb-2 text-base font-semibold text-red-400">
            Comments
          </p>
          <Feedback />
          <form onSubmit={this.onSubmitAction}>
            <div className="my-4  border-red-300 border-2 rounded-md p-2">
              <label className="text-red-500  font-semibold">
                Give Virtual Money :
              </label>
              <input
                className="mx-2  text-red-500 border-red-200 border-2 rounded-md px-2"
                type="number"
                min="0"
                onChange={(e) => this.virtualMoneyOnChange(e.target.value)}
              />
            </div>
            <div className="mb-4 rounded-md border-2 border-red-300 p-2">
              <div className="mb-2 text-red-500  font-semibold">
                Give Comment
              </div>
              <input
                type="text"
                placeholder="I like ..."
                id="ILike"
                name="ILike"
                value={this.state.ILike}
                required
                onChange={this.commentILikeOnChange}
              />
              <input
                type="text"
                placeholder="I wish ..."
                id="IWish"
                name="IWish"
                value={this.state.IWish}
                required
                onChange={this.commentIWishOnChange}
              />
              <input
                type="text"
                placeholder="Question?"
                id="Question"
                name="Question"
                value={this.state.Quest}
                required
                onChange={this.commentQuestionOnChange}
              />
              <input
                type="text"
                placeholder="Idea?"
                id="Ideas"
                name="Ideas"
                required
                value={this.state.Idea}
                onChange={this.commentIdeaOnChange}
              />
            </div>
            <button
              type="submit"
              className=" bg-green-400 p-2 rounded-md text-white mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const TaskComment = (props) => {
  return (
    <div className="mx-4 mb-4 flex justify-start text-lg break-words overflow-auto rounded-md p-2 border-2 pl-4 text-gray-500">
      <label>{/* virtualMoney: <div>{props.moneyVir}</div> */}</label>
      {/* <label className=" flex mr-8 justify-start rounded-full">
        <img src={user} alt='user' className="w-14"></img>
      </label> */}
      <label className=" flex mr-11 justify-start my-auto ">
        I like :<div className="ml-2">{props.letComments.iLike}</div>
      </label>
      <label className="mr-11 flex justify-start my-auto">
        I wish : <div className="ml-2">{props.letComments.iWish}</div>
      </label>
      <label className="mr-11 flex justify-start my-auto">
        Question : <div className="ml-2">{props.letComments.iQuest}</div>
      </label>
      <label className="mr-11 flex justify-start my-auto">
        Idea : <div className="ml-2">{props.letComments.iDea}</div>
      </label>
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
      <div>
        {/* <label>{this.showCalculateVirtual()}</label> */}
        <div>{this.showLengthOfList()}</div>
      </div>
    );
  }
}
