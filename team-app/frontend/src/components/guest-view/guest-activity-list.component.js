import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ActivityList = (props) => (
  <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {props.activity.actName}
    </h5>

    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400 break-words">
      <h5 className="font-bold">Description</h5>
      {props.activity.actDescription}
    </p>
    <h5 className="font-bold">Date</h5>
    <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
      {props.activity.date.substring(0, 10)}
    </p>
    <div className="flex justify-center">
      <Link
        to={"/guestActivityList/" + props.activity._id}
        className="font-sans bg-blue-500 text-white rounded-md p-2 text-xs"
      >
        See Project
      </Link>
    </div>
  </div>
);

export default class guestActivityList extends Component {
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

  guestActivityList() {
    return this.state.activity.map((currentactivity) => {
      return (
        <ActivityList
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
        <div className="flex justify-auto m-4 p-4">
          {this.guestActivityList()}
        </div>
      </div>
    );
  }
}
