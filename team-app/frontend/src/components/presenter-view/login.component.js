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
              console.log("Code : ", code);
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
      <div class="h-screen">
        <div className="px-24 ">
          <div className="row" class="flex justify-center w-auto bg-white">
            <div className="column bg-FAE7E7">
              <div class="center">
                <br></br> <br></br>
                <br></br>
                <div className="text-36px">be a presenter in</div>
                <div className="text-48px">GARLICWAK?</div>
                <br></br>
                <div className="text-24px">&nbsp;You must log in first!</div>
              </div>
            </div>

            <div className="column">
              <div class="vl"></div>
              <div class="forms">
                <div class="form-content">
                  <div class="signup-form">
                    <div class="title">Log In</div>
                    <form onSubmit={this.handleSubmit}>
                      <div class="input-boxes">
                        <div class="input-box">
                          <input
                            type="text"
                            placeholder="Enter your email"
                            required
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          ></input>
                        </div>

                        <div class="input-box">
                          <input
                            type="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) =>
                              this.setState({ password: e.target.value })
                            }
                          ></input>
                        </div>

                        <div class="button input-box">
                          <input type="submit" value="Sumbit"></input>
                        </div>
                        <div class="text sign-up-text">
                          Don't have an account yet?&nbsp;
                          <a
                            className="underline text-blue-400"
                            href="/presenterSignup"
                          >
                            Sign up now
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}