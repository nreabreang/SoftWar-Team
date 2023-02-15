import axios from "axios";
import { Component } from "react";
import "./project-id.component.css"
import "../Styles.css"

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
      <div class="centered-div ">
      <section class="home-section ">
      <div class = " home-content">
   
      <div class="overview-boxes " >
        <div class="box">
          <div class="right-side">
          <div class="text-24px">{this.state.projectName}</div>
             <div class="text-24px"> Description:<div class="text-16px" dangerouslySetInnerHTML={{__html: this.state.description,}}></div></div>
          </div>
        </div>
      </div>

      <div class="line-1"></div>
      
      
        <div className="">
          <Feedback />
        </div></div>
      </section>
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
          <div className="mx-2">I like : </div>
          {props.letComments.iLike}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <div className="mx-2">I wish : </div>
          {props.letComments.iWish}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <div className="mx-2">Question : </div>
          {props.letComments.iQuest}
        </div>
      </label>
      <label>
        <div className="flex justify-start">
          <div className="mx-2">Idea : </div>
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
<div class="overview-boxes " >
      <div class="vmbox">
          <div class="right-side">
            <div class="text-20px">Total Virtual Money</div>
            <div class="text-24px">{this.showCalculateVirtual()}</div>

            {/* <label>{this.showCalculateVirtual()}</label> */}

              <span class="text-20px">credits</span>
            </div>
          </div>
        </div>
        
        <div class="overview-boxes " >
        <div class="box">
          <div class="right-side">
        <div class="text-24px">Comment</div>
        <div class="text-20px flex">{this.showCommentAll}
        <div>{this.showLengthOfList()}</div>
        </div></div></div></div>

        
        
      </div>
    );
  }
}
