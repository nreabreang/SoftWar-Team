import axios from "axios";
import { Component } from "react";
import "./project-id.component.css";
import "../Styles.css";

export default class projectID extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      description: "",
      members:[],
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
          members:res.data.members,
        });
      });
  }

  showButton(email,func){
    if(this.state.members.find(elemental => elemental.email == email)){
      return func;
    }else{
      return;
    }
  }

  buttonEdit(){
    return (<div>Edit.</div>)
  }

  buttonDelete(){
    return(<div>
      <button onClick={(e)=>{
        const arr = window.location.href.split("/")
        axios.delete("http://localhost:5000/project/delete/"+arr[arr.length-1])
        window.history.back()
      }}>Delete</button>
    </div>)
  }

  renderMember(){
    return this.state.members.map((x)=>{
      return(<div>
        <div>{x.name}</div><div>{x.email}</div>
      </div>)
    })
  }

  render() {
    return (
      <div class="centered-div ">
        <section class="text rounded-md bg-red-200 m-4 p-4">
          <div class=" home-content">
            <div class="overview-boxes ">
              <div class="rounded bg-white p-4 m-4">
                <div class="right-side">
                  <div class="w-32 flex justify-start text-2xl m-4 border-b">
                    {this.state.projectName}
                  </div>
                  <div class="text-2xl m-4">
                    {" "}
                    Description :
                    <div
                      class=" w-120 text-lg m-4"
                      dangerouslySetInnerHTML={{
                        __html: this.state.description,
                      }}
                    ></div>
                  </div>Member:
                      {this.renderMember()} {/*ต้องปรับเปลี่ยน*/}
                </div>
              </div>
            </div>
              {this.showButton(window.localStorage.PresenterEmail,this.buttonEdit())}
              {this.showButton(window.localStorage.PresenterEmail,this.buttonDelete())}
            {/* <div class="line-1"></div> */}
            <div className="">
              <Feedback />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const TaskComment = (props) => {
  return (
    <div>
      <div className="flex justify-between mx-8 my-2">
        {/* <label >virtualMoney: <div>{props.moneyVir}</div></label> */}
        <label className="">
          <div className="flex justify-start mr-8">
            <div className="mx-2">I like : </div>
            <p className="italic">{props.letComments.iLike}</p>
          </div>
        </label>
        <label>
          <div className="flex justify-start mr-8">
            <div className="mx-2">I wish : </div>
            <p className="italic">{props.letComments.iWish}</p>
          </div>
        </label>
        <label>
          <div className="flex justify-start mr-8">
            <div className="mx-2">Question : </div>
            <p className="italic">{props.letComments.iQuest}</p>
          </div>
        </label>
        <label>
          <div className="flex justify-start">
            <div className="mx-2">Idea : </div>
            <p className="italic">{props.letComments.iDea}</p>
          </div>
        </label>
      </div>{" "}
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
        <div class="overview-boxes ">
          <div class="m-4 rounded-md bg-white p-2">
            <div class="right-side">
              <div class="text-20px">Total Virtual Money</div>
              <div class="text-24px underline">
                {this.showCalculateVirtual()}
              </div>
              {/* <label>{this.showCalculateVirtual()}</label> */}
              <span class="text-20px">credits</span>{" "}
              {/*Please make it work, get VM unit form Activity Cretor */}
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
                  {/* <tr className="flex justify-between">
                    <th className="">I like</th>
                    <th>I wish</th>
                    <th>I Question</th>
                    <th>Idea</th>
                  </tr> */}
                  <tr>{this.showLengthOfList()}</tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
