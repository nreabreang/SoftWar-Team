import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";

const encodeNumber = (str) => {
  const code = Buffer.from(str)
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
  return <div>{code}</div>;
};

const Activity = (props) => (
  <div class="m-4 max-w-sm p-6 bg-white border font-mono border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div className="text text-xl font-mono">Activity Name</div>
    <a href="#">
      <h5 class="mb-2 text-2xl font-medium italic border-2 rounded-md py-2 px-4 w-52 my-2 tracking-tight text-gray-900 dark:text-white">
        {props.activity.actName}
      </h5>
    </a>
    {/* <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      <h5 className="font-bold">Description</h5>
      {props.activity.actDescription}
    </p> */}
    <h5 className="font-bold">Date</h5>
    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400 italic border-2 rounded-md py-2 px-4 w-52 my-2">
      {props.activity.date.substring(0, 10)}
    </p>
    <div className="mb-4">
      <p>Code Number</p>
      <div className="font-medium italic border-2 rounded-md py-2 px-4 w-52 my-2 text-base font-sans  text-gray-700">
        {encodeNumber(props.activity.actName)}
      </div>
    </div>

    <div className="flex justify-center">
      <Link
        to={"/creatorActivityList/" + props.activity._id}
        className="font-sans bg-blue-500 text-white rounded-md p-2 text-xs"
      >
        See Project
      </Link>
    </div>

    <div className="font-sans flex justify-center mt-8">
      {/* Link to each Activity */}

      <div>
        <Link
          to={"/edit/" + props.activity._id}
          className="text-blue-500 font-medium italic border-2 rounded-md py-2 px-4 w-52 my-2"
        >
          Edit
        </Link>
      </div>

      <div>
        <a
          className="m-2 text-red-500 font-medium italic border-2 rounded-md py-2 px-4 w-52 my-2"
          href="#"
          onClick={() => {
            props.deleteActivity(props.activity._id);
          }}
        >
          Delete
        </a>
      </div>
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

  render() {
    return (
      <div className="pl-4 font-sans font-bold text-xl">
        <h3 className="pl-4 flex justify-center">Activity</h3>
        <div className="flex justify-auto m-4 p-4">{this.activityList()}</div>
        <div></div>
      </div>
    );
  }
}
