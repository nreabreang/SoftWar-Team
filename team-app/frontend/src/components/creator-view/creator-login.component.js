import { Component } from "react";
import { Link } from "react-router-dom";

export default class creatorLogin extends Component {
  render() {
    return (
      <div>
        <div className="flex justify-center">Creator Login</div>
        <div className="flex justify-center">
          <Link to="/activityList" className="bg-blue-400 rounded-md p-2 mt-4">
            Login
          </Link>
        </div>
      </div>
    );
  }
}
