import React, { Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GenerateQR from "./qr-activity";

const Activity = (props) => (
  <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.activity.actName}
      </h5>
    </a>
    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      <h5 className="font-bold">Description</h5>
      {props.activity.actDescription}
    </p>
    <h5 className="font-bold">Date</h5>
    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      {props.activity.date.substring(0, 10)}
    </p>
    <div className="font-sans">
      <Link to={"/edit/" + props.activity._id} className="text-blue-500">
        Edit
      </Link>
      <a
        className="m-2 text-red-500"
        href="#"
        onClick={() => {
          props.deleteActivity(props.activity._id);
        }}
      >
        Delete
      </a>
    </div>
  </div>
);

export default class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.deleteActivity = this.deleteActivity.bind(this);

    this.state = {
      activity: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/activity/")
      .then((response) => {
        this.setState({ activity: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteActivity(id) {
    axios
      .delete("http://localhost:5000/activity/" + id)
      .then((res) => console.log(res.data));
    window.location = "/activityList";
    this.setState({
      activity: this.state.activity.filter((el) => el.id !== id),
    });
  }

  activityList() {
    return this.state.activity.map((currentactivity) => {
      return (
        <Activity
          activity={currentactivity}
          deleteActivity={this.deleteActivity}
          key={currentactivity._id}
        />
      );
    });
  } 

  showQRcode(){
    const idActivity = ""
    axios.get('http://localhost:5000/activity/').then((res)=>idActivity = res.data._id).catch((err)=>console.log("Error: "+err))
    const urls = 'http://localhost:3000/activity/' + idActivity
    console.log(urls)
    return(
      <GenerateQR url={urls} />
    )
  }

  render() {
    return (
      <div className="pl-4 font-sans font-bold text-xl">
        <h3 className="pl-4 flex justify-center">Activity</h3>
        <div className="flex justify-auto m-4 p-4">{this.activityList()}</div>
        <div>{this.showQRcode}</div>
      </div>
    );
  }
}
