import axios from "axios";
import { Component } from "react";

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
      storeVirtualMoney: "",
      ILike: "",
      IWish: "",
      Quest: "",
      Idea: "",
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

    axios
      .post("http://localhost:5000/feedback/add", data)
      .then(() => console.log("Success"))
      .catch((err) => console.log("Error: " + err));

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
    window.location = "";
  }

  render() {
    return (
      <div className=" bg-white flex  flex-col m-4 p-4 rounded-md">
        <div>
          <label htmlFor="" className="text-red-500">
            Project Name :{" "}
          </label>
          {this.state.projectName}
        </div>
        <div className="my-2 text-red-500 underline">Description</div>
        <div className="rounded-md border-2 border-red-300 p-2 border-collapse flex ">
          <div
            dangerouslySetInnerHTML={{
              __html: this.state.description,
            }}
            className="my-2 text-grey-500 overflow-x-auto w-2/3 "
          ></div>
        </div>
        <div>{this.showCommentAll}</div>
        <div className="">
          <form onSubmit={this.onSubmitAction}>
            <div className="my-4 border-red-200 border-2 rounded-md p-2">
              <label className="text-red-500">Give Virtual Money :</label>
              <input
                className="mx-2  text-red-500 border-red-200 border-2 rounded-md px-2"
                type="number"
                onChange={(e) => this.virtualMoneyOnChange(e.target.value)}
              />
            </div>
            <div className="mb-4 rounded-md border-2 border-red-300 p-2">
              <div className="mb-2 text-red-500">Give Comment</div>
              <input
                type="text"
                placeholder="I like ..."
                id="ILike"
                name="ILike"
                value={this.state.ILike}
                onChange={this.commentILikeOnChange}
              />
              <input
                type="text"
                placeholder="I wish ..."
                id="IWish"
                name="IWish"
                value={this.state.IWish}
                onChange={this.commentIWishOnChange}
              />
              <input
                type="text"
                placeholder="Question?"
                id="Question"
                name="Question"
                value={this.state.Quest}
                onChange={this.commentQuestionOnChange}
              />
              <input
                type="text"
                placeholder="Idea?"
                id="Ideas"
                name="Ideas"
                value={this.state.Idea}
                onChange={this.commentIdeaOnChange}
              />
            </div>
            <button type="submit" className=" bg-green-400 p-2 rounded-md text-white mb-2" >Submit</button>
          </form>
          <Feedback />
        </div>
      </div>
    );
  }
}

const TaskComment = (props) => {
  return (
    <div className="flex justify-between m-4">
      <label>{/* virtualMoney: <div>{props.moneyVir}</div> */}</label>
      <label>
        I like:
        <div>{props.letComments.iLike}</div>
      </label>
      <label>
        I wish: <div>{props.letComments.iWish}</div>
      </label>
      <label>
        Question: <div>{props.letComments.iQuest}</div>
      </label>
      <label>
        Idea: <div>{props.letComments.iDea}</div>
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

  showLengthOfList() {
    return this.state.feedBacks.map((data, index) => {
      return (
        <TaskComment letComments={data.comments} moneyVir={data.virtualMoney} />
      );
    });
    // const arr2 =  arr.then((data)=>data.map((fete)=>fete))
    // const sum =  moneyAll.reduce((correct,data)=>correct + Number(data),0)
  }

  showCalculateVirtual() {
    return this.state.feedBacks.reduce(
      (corr, data) => corr + Number(data.virtualMoney),
      0
    );
  }

  render() {
    return (
      <div>
        <label>{this.showCalculateVirtual()}</label>
        <div>{this.showLengthOfList()}</div>
      </div>
    );
  }
}
