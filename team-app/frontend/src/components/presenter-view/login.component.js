import { Component } from "react";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import axios from "axios";

const encodeNumber = (str) => {
  const code = Buffer.from(str, "utf-8")
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
  return code;
};

export default class presenterLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // const previousPath = document.referrer;
    // let arr = previousPath.split("/");
    // const index = arr[arr.length - 1];
    // let code = encodeNumber(index);
    // var code = window.localStorage.getItem("ActCode");
    // console.log("Code : ", code);
    // window.localStorage.setItem("actCode", code);
    // console.log("prevPath :", window.localStorage.getItem("actCode"));
  }
  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    console.log(email, password);

    fetch("http://localhost:5000/presenterUsers/login-presenter", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "presenterReg");
        if (data.status === "ok") {
          Swal.fire({
            title: "Login Successfully",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.localStorage.setItem("token", data.data);

              var code = window.localStorage.getItem("ActCode");
              console.log("Codell : ", code);
              axios.get("http://localhost:5000/activity/").then((res) => {
                let i;
                for (i = 0; i < res.data.length; i++) {
                  if (code === encodeNumber(res.data[i].actName)) {
                    window.location = "/presenterActivityId/" + res.data[i]._id;
                    break;
                  } else {
                  }
                }
              });
              // console.log(window.localStorage.getItem("token"));
            }
          });
        }
      });
  }
  render() {
    return (
      <div className="flex justify-center">
        <form onSubmit={this.handleSubmit}>
          <div className="grid justify-center mb-4 text-gray-500 p-4 w-64 font-bold bg-red-50 rounded-lg">
            <div className="flex justify-center">Log in</div>
            <div className="mt-4">
              <p>Email address</p>
              <input
                placeholder="example@email.com"
                type="text"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                onChange={(e) => this.setState({ email: e.target.value })}
              ></input>
            </div>
            <div className="mt-4">
              <p>Password</p>
              <input
                placeholder="password"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              ></input>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Submit"
                className="p-2 rounded-lg bg-red-400 text-white"
              ></input>
            </div>
            <div className="flex justify-end mt-4 text-xs">
              <p className=" mr-2 ">Don't have an account yet?</p>{" "}
              <a className="underline text-blue-400" href="/presenterSignup">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
