import { Component } from "react";
import Swal from "sweetalert2";
import "./signUP.component.css";
import "../Styles.css"

export default class presenterSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { fname, lname, email, password } = this.state;

    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/presenterUsers/presenterReg", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Sign-Up Successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location = "/presenterLogin";
          }
        });
      });
  }

  render() {
    return (
      // <div class="h-screen  bg-white">
        <div className="px-40  bg-white ">
          <div className="row" class="flex w-auto shadow mt-10 ">

          <div className="column bg-FAE7E7 shadow" >
          <div class="center">
          <br></br> <br></br><br></br> <br></br><br></br>
            <div className="text-36px">Are you a new</div>
            <div className="text-48px color-E22637">PRESENTERs?</div>
            <br></br>
            <div className="text-24px">&nbsp; Let's get you Sign up</div>
          </div>
          </div>

          <div className="column " >
          <div class="vl"></div>
          <div class="forms">
          <div class="form-content"> 
            <div class="signup-form">
              <div class="title">Sign Up</div>
        <form onSubmit={this.handleSubmit}>
          <div class="input-boxes">
                <div class="input-box">
                  <input 
                  type="name" 
                  placeholder="Enter your First name" required
                  onChange={(e) => this.setState({ fname: e.target.value })}></input>
                </div>

                <div class="input-box">
                  <input type="surname" placeholder="Enter your Last name" required
                  onChange={(e) => this.setState({ lname: e.target.value })}></input>
                </div>
            
                <div class="input-box">
                  <input type="text" placeholder="Enter your email" required
                  onChange={(e) => this.setState({ email: e.target.value })}></input>
                </div>

            <div class="input-box">
                  <input type="password" placeholder="Enter your password" required
                  onChange={(e) => this.setState({ password: e.target.value })}></input>
                </div>

                <div class="button input-box">
                  <input type="submit" value="Submit"></input>
                </div>
                <div class="text sign-up-text">Already have an account?&nbsp;<a className="underline text-blue-400" href="/presenterLogin">Login now</a></div>
            </div>
        </form>
            </div>
              </div>
          </div>
          </div>
          </div>
          </div>
      // </div>
          
    );
  }
}
