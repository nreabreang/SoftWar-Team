import axios from "axios";
import { Link } from "react-router-dom";
import CreatorProjectLists from "../creator-view/project-list.component";
const { Component } = require("react");
const ActivityInfo = (props) => {
  const url = window.location.href.split("/");
  window.localStorage.setItem("idActivity", url[url.length - 1]);
  return (
    <div className="flex justify-center">
      <div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 font-medium mx-4 tracking-tight text-gray-900 dark:text-white">
          <p className="font-bold">Activity Name</p>
          {props.actName}
        </h5>
        <p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
          <h5 className="font-bold">Date</h5>
          {props.date.toISOString().substring(0, 10)}
        </p>

        <p class="mb-3 font-medium text-gray-700 dark:text-gray-400 ">
          <h5 className="font-bold">Description</h5>
          <div Style="word-wrap: break-word;white-space:pre-wrap;">
            {props.descript}
          </div>
        </p>
      </div>
      {/* <GenerateQR urls={props.urls} actName={props.actName} /> */}
      <div className="grid content-center">
        <Link to="/createProject">
          <button className=" bg-white rounded-md p-2 text-red-600">
            Add Project
          </button>
        </Link>
      </div>
    </div>
  );
};

export default class creatorActivityId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actName: "",
      actDescription: "",
      virtualMoney: "",
      unitMoney: "",
      date: new Date(),
    };
  }

  componentDidMount() {
    const arr = window.location.href.split("/");
    console.log(arr[arr.length - 1]);

    axios
      .get("http://localhost:5000/activity/" + arr[arr.length - 1])
      .then((response) => {
        this.setState({
          actName: response.data.actName,
          actDescription: response.data.actDescription,
          virtualMoney: response.data.virtualMoney,
          unitMoney: response.data.unitMoney,
          date: new Date(response.data.date),
        });
        // console.log("res :",response.data.actName);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="div">
        <ActivityInfo
          urls={window.location.href}
          actName={this.state.actName}
          date={this.state.date}
          descript={this.state.actDescription}
        />
        <CreatorProjectLists />
      </div>
    );
  }
}
