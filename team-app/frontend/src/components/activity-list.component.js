import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Activity = (props) => (
  <tr>
    <td>{props.activity.actName}</td>
    <td>{props.activity.actDescription}</td>
    <td>{props.activity.virtualMoney}</td>
    <td>{props.activity.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.activity._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteActivity(props.activity._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.deleteActivity = this.deleteActivity.bind(this);

    this.state = {
      activity: [],
      qr: [],
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

  renderQR() {
    const arr = window.location.href.split("/");
    axios
      .get("http://localhost:3000/activity/" + arr[arr.length - 1])
      .then((res) =>
        console.log(res),
      );

     
    // const Qr =
    //   "http://api.qrserver.com/v1/create-qr-code/?data=http://localhost:3000/activity/" +
    //   this.qr +
    //   "&size=[60]x[60]";

    return (
      <div>
        <h3>
          <img id="id" alt="" src=""></img>
        </h3>
      </div>
    );
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
      <div className="pl-4">
        <h3 className="pl-4">Activity</h3>
        <table className="table">
          <thead>
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Virtual Money</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>{this.activityList()}</tbody>
        </table>
        <div>{this.renderQR()}</div>
      </div>
    );
  }
}
