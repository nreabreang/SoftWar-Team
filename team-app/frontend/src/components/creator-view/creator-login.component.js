import { Component } from "react";
import Swal from "sweetalert2";
import { Buffer } from "buffer";
import axios from "axios";
import "../Styles.css"

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
  
  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    console.log('handleSubmit email=' + email + ' password=' + password);
    if(window.localStorage.getItem("activityEmail")){
      window.localStorage.removeItem("activityEmail");
      window.localStorage.setItem("activityEmail",email)
    }else{
      window.localStorage.setItem("activityEmail",email)
    }

    fetch("http://localhost:5000/creatorUsers/login-creator", {
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
        console.log(data, "creatorReg");
        if (data.status === "ok") {
          Swal.fire({
            title: "Login Successfully",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.localStorage.setItem("token", data.data);

              window.location = "/activitylist/"
              var code = window.localStorage.getItem("ActCode");
              console.log("Codell : ", code);
              // axios.get("http://localhost:5000/activity/").then((res) => {
              //   let i;
              //   for (i = 0; i < res.data.length; i++) {
              //     if (code === encodeNumber(res.data[i].actName)) {
              //       // window.location = "/creatorActivityId/" + res.data[i]._id;
              //       break;
              //     } else {
              //     }
              //   }
              // });
              // console.log(window.localStorage.getItem("token"));
            }
          });
        } else if (data.status === "error"){
          Swal.fire({
            title: "Login Failed",
            showConfirmButton: true,
          })
        }
      });
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
							<label className="">Email</label>
							<input
								className="input w-full"
								type="text"
                required onChange={(e) => this.setState({ email: e.target.value })}
							/>
						</div>

						{/* input password */}
						<div className="input-container w-1/2 mx-auto">
							<label className="">Password</label>
							<input
								className="input w-full"
								type="password"
                required onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</div>

						<div className="container p-4 flex justify-center">
							<input
								type="submit"
								value="Login"
								className="button-navy mx-auto"
							/>
						</div>

						{/* <div className="line w-1/2 new" /> */}

						{/* <div className="container p-4 flex justify-center">
							<input
								type="submit"
								value="G-mail"
								className="button-navy mx-auto"
							/>
						</div> */}

						<div className="container flex justify-center pb-4">
							<p className="text-14px justify-center ">Don't have account yet?</p>
							<a href="/creatorSignup" className="button-lightpink-liner">Sign-up</a>
						</div>
            </form>
					</div>
          
				</div>

			</main>

		);
	}
}
