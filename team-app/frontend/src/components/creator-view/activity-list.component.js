import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import "../list.component.css";
import "../Styles.css";
import rightarrow from "../images/right-arrow.png";
import del from "../images/delete.png";
import edit from "../images/edit-1.png";
import Swal from "sweetalert2";

const encodeNumber = (str) => {
  const code = Buffer.from(str, "utf-8")
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
  return <div>{code}</div>;
};

const Activity = (props) => (
  <div className="list-container mx-auto w-80">
    {/* header */}
    <div className="list-header-container text-24px bold ">
      <div className="flex ellipsis w-3/4">{props.activity.actName}</div>

      <div className="flex">
        {/* edit icon */}
        <Link to={"/edit/" + props.activity._id}>
          <img src={edit} className="images-20px mx-1" />
        </Link>

        {/* delete icon */}
        <a
          href="#"
          onClick={() => {
            Swal.fire({
              title: "Do you want to delete the Activity?",
              showCancelButton: true,
              confirmButtonText: "Confirm",
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire("Deleted!", "", "success").then((result) => {
                  props.deleteActivity(props.activity._id);
                });
              }
            });
          }}
        >
          <img src={del} className="images-20px" />
        </a>
      </div>
    </div>

    {/* description */}
    <div className="mt-4">
      {/* date */}
      <div className="items-container">
        <p className="text-16px bold">DATE: </p>
        <p className="text-16px italic">
          {props.activity.date.substring(0, 10)}
        </p>
      </div>

      {/* access code */}
      <div className="items-container">
        <p className="text-16px bold">ACCESS CODE: </p>
        <div className="text-16px italic">
          {encodeNumber(props.activity.actName)}
        </div>
      </div>

      {/* see project */}
      <div className="enter-container">
        <Link
          to={"/creatorActivityList/" + props.activity._id}
          className="text-14px underline italic"
        >
          See Project
        </Link>

        <Link to={"/creatorActivityList/" + props.activity._id}>
          <img src={rightarrow} className="images-16px" />
        </Link>
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
    const emails = window.localStorage.getItem("activityEmail");
    axios
      .get("http://localhost:5000/activity/getbyemail/" + emails)
      .then((response) => {
        this.setState({ activity: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    // const listName = [];
    axios
      .get("http://localhost:5000/creatorUsers/creatorUserbyemail/" + emails)
      .then((res) => {
        window.localStorage.setItem(
          "name",
          res.data[0].fname + " " + res.data[0].lname
        );
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
      <main>
        <div className="flex header-container">
          <p className="text-36px">Activity Dashboard</p>
          <a href="/createActivity" className="button-navy small">
            Add +
          </a>

          <div className=" justify-center grid content-center">
            <div className="m-4   text-blue-900 font-semibold justify-end border-b-2 border-red-400 pb-2 ">
              <div className="flex justify-start">
                <p className="mr-2">Name :</p>
                <div>{window.localStorage.getItem("name")}</div>
              </div>
              <div className="flex justify-start">
                <p className="mr-2">Email :</p>
                <div> {window.localStorage.getItem("activityEmail")}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-5/6 mx-auto">
          <div
            className="show-container
                          xs:grid-cols-1
						  sm:grid-cols-2
						  md:grid-cols-2
						  lg:grid-cols-3
						  xl:grid-cols-3"
          >
            {this.activityList()}
          </div>
        </div>
      </main>
    );
  }
}
