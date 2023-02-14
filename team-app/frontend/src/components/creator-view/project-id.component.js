import axios from "axios";
import { Component } from "react";

export default class projectID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      description: "",
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

  render() {
    return (
      <div className="m-2 bg-white flex  flex-col">
        <label htmlFor="">Project Name: </label>
        <div>{this.state.projectName}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: "Description: " + this.state.description,
          }}
        ></div>
        <div>Comment</div>
        <div>{this.showCommentAll}</div>
        <div className="">
          <Feedback />
        </div>
      </div>
    );
  }
}

const TaskComment = (props) => {
  return (
    <div className="flex justify-between mx-8 my-2">
      {/* <label >virtualMoney: <div>{props.moneyVir}</div></label> */}
      <label className="">
        <div className="flex justify-start">
          <p className="mx-2">I like : </p>
          {props.letComments.iLike}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <p className="mx-2">I wish : </p>
          {props.letComments.iWish}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <p className="mx-2">Question : </p>
          {props.letComments.iQuest}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <p className="mx-2">Idea : </p>
          {props.letComments.iDea}
        </div>
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
        console.log(resp.data);
      })
      .catch((err) => console.log("Error: " + err));
  }

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
