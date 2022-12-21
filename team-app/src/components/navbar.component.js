import React, { Component, component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  render() {
    return (
      <nav className="">
        <Link to="/" className="">
          ExcerTracker
        </Link>
        <div className="">
          <ul className="">
            <li className="">
              <Link to="/" className="">
                Exercises
              </Link>
            </li>
            <li className="">
              <Link to="/create" className="">
                Create Exercise Log
              </Link>
            </li>
            <li className="">
              <Link to="/user" className="">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
