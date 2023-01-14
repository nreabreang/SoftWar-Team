import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="flex p-6 text-center font-mono font-medium">
        <div className="p-4">
          <Link to="/createActivity" className="">
            Create Activity
          </Link>
        </div>

        <div className="p-4">
          <Link to="/activityList">Activity List</Link>
        </div>
      </div>
    );
  }
}
