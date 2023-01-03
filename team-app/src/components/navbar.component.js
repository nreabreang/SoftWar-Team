import React, { Component} from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div class="flex p-6 text-center font-mono font-medium">
        <div className="p-4">
          <Link to="/" className="">
            ExcerTracker
          </Link>
        </div>
        
        <div className="p-4">
          <Link to="/" className="">
            Exercises
          </Link>
        </div>

        <div className="p-4">
          <Link to="/create" className="">
            Create Exercise Log
          </Link>
        </div>

        <div className="p-4">
          <Link to="/user" className="">
            Create User
          </Link>
        </div>
      </div>
    );
  }
}
