import { Component } from "react";

export default class presenterDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presenterUserData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/presenterUsers/presenterUserData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data.fname, data.data.lname);
        this.setState({ presenterUserData: data.data });
      });
  }

  render() {
    return (
      <div className="bg-white rounded-md p-4 mb-2">
        <div className="flex justify-between font-medium text-white mb-2">
          <div className="grid content-center text-red-400 text-2xl font-semibold">
            Dashboard
          </div>

          <div className="flex justify-end text-white p-2 border-collapse rounded-md bg-red-400">
            <div className="text  flex justify-end m-2">
              <p>Name :</p>
              <p className="mx-2"> {this.state.presenterUserData.fname} </p>
              <p>{this.state.presenterUserData.lname}</p>
            </div>
            <div className="text  flex justify-end m-2">
              <p>Email :</p>
              <p className="mx-2"> {this.state.presenterUserData.email} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
