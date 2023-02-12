import { Component } from "react";

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
        console.log(data, "presenterReg");
      });
  }

  render() {
    return (
      <div className="flex justify-center">
        <form onSubmit={this.handleSubmit}>
          <div className="grid justify-center mb-4 text-gray-500 p-4 w-64 font-bold bg-red-50 rounded-lg">
            <div className="flex justify-center text-24px">Sign up</div>
            <div className="flex justify-center text-sm ">
              Let's get's you Sign Up
            </div>
            <div className="mt-4">
              <p>First name</p>
              <input
                type="name"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                placeholder="First name"
                onChange={(e) => this.setState({ fname: e.target.value })}
              ></input>
            </div>
            <div className="mt-4">
              <p>Last name</p>
              <input
                type="Surname"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                placeholder="Last name"
                onChange={(e) => this.setState({ lname: e.target.value })}
              ></input>
            </div>
            <div className="mt-4">
              <p>Email address</p>
              <input
                type="email"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                placeholder="example@email.com"
                onChange={(e) => this.setState({ email: e.target.value })}
              ></input>
            </div>
            <div className="mt-4">
              <p>Password</p>
              <input
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                placeholder="Password"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              ></input>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="p-2 rounded-lg bg-red-400 text-white"
              >
                Sign Up
              </button>
            </div>
            <div className="flex justify-end mt-4 text-xs">
              <p className=" mr-2 ">Already have an account?</p>{" "}
              <a className="underline text-blue-400" href="/presenterLogin">
                Log In
              </a>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
