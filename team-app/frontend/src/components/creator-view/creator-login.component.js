import { Component } from "react";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import axios from "axios";
import "../Styles.css";

const encodeNumber = (str) => {
  const code = Buffer.from(str, "utf-8")
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
  return code;
};

export default class creatorLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <main>
        <div className="flex header-container">
          <p className="text-36px">Log in to your account</p>
        </div>

        <div className="flex justify-center">
          <div className="w-9/12">
            <form onSubmit={this.handleSubmit}>
              {/* input username*/}
              <div className="input-container w-1/2 mx-auto">
                <label className="">Username</label>
                <input
                  className="input w-full"
                  id="actName"
                  name="actName"
                  type="text"
                  required
                  onChange={(e) => this.setState({ username: e.target.value })}
                  // value={this.state.actName}
                  // onChange={this.onChangeActName}
                  // placeholder="Enter Activity Name"
                />
              </div>

              {/* input password */}
              <div className="input-container w-1/2 mx-auto">
                <label className="">Password</label>
                <input
                  className="input w-full"
                  id="actName"
                  name="actName"
                  type="text"
                  required
                  onChange={(e) => this.setState({ password: e.target.value })}
                  // value={this.state.actName}
                  // onChange={this.onChangeActName}
                  // placeholder="Enter Activity Name"
                />
              </div>

              <div className="container p-4 flex justify-center">
                <input
                  type="submit"
                  value="Login"
                  className="button-navy mx-auto"
                />
              </div>

              <div className="line w-1/2 new" />

              <div className="container p-4 flex justify-center">
                <input
                  type="submit"
                  value="G-mail"
                  className="button-navy mx-auto"
                />
              </div>

              <div className="container flex justify-center">
                <p className="text-14px justify-center">
                  Don't have account yet?
                </p>
                <a href="/creatorSignup" className="button-lightpink-liner">
                  Sign-up
                </a>
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}
