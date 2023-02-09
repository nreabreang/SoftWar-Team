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
  <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <div className="text text-xl">Activity Name</div>
    <a href="#">
      <h5 class="mb-2 font-medium text-base italic border-2 rounded-md py-2 px-4 w-52 tracking-tight text-gray-900 dark:text-white">
        {props.activity.actName}
      </h5>
    </a>
    {/* <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      <h5 className="font-bold">Description</h5>
      {props.activity.actDescription}
    </p> */}
    <h5 className="mt-4">Date</h5>
    <p class=" font-medium text-base text-gray-700 dark:text-gray-400 italic border-2 rounded-md py-2 px-4 w-52">
      {props.activity.date.substring(0, 10)}
    </p>
    <div className="mb-4 mt-4">
      <p>Access Code</p>
      <div className="font-medium text-base italic border-2 rounded-md py-2 px-4 w-52 text-gray-700">
        {encodeNumber(props.activity.actName)}
      </div>
    </div>

    <div className="flex justify-end">
      <Link
        to={"/creatorActivityList/" + props.activity._id}
        className="font-normal text-lg underline italic"
      >
        See Project
      </Link>
    </div>

    <div className="font-sans flex justify-center mt-2">
      {/* Link to each Activity */}

      <div>
        <Link
          to={"/edit/" + props.activity._id}
          className="text-blue-500 font-normal underline py-2 w-52 my-2"
        >
          Edit
        </Link>
      </div>

      <div>
        <a
          className="m-2 text-red-500 font-normal underline  py-2 px-2 w-52 my-2"
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
      <div className="pl-4 font-medium text-xl">
        <div className="flex justify-center">
        <h3 className="pl-4 flex justify-center font-sans font-semibold text-4xl text-white">
          Activity Dashboard
        </h3>
        <a href="/createActivity" className="mx-4 border-2 p-2 rounded-full border-blue-400 text-white">Add +</a>
        </div>
        <div className="flex justify-auto m-4 p-4 grid grid-cols-4 gap-4">{this.activityList()}</div>
        <div></div>
      </div>
    );
  }
}
