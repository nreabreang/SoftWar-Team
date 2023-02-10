import axios from "axios";
import { Component } from "react";

const encodeNumber = (str) => {
  return Buffer.from(str)
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
};

export default class guestLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const guestInfo = {
      username: this.state.username,
    };

    const previousPath = document.referrer;
    let arr = previousPath.split("/");
    const index = arr[arr.length - 1];

    axios.get("http://localhost:5000/activity/").then((res) => {
      // console.log(code.code);
      let i;
      for (i = 0; i < res.data.length; i++) {
        if (index === encodeNumber(res.data[i].actName)) {
          window.location = "/guestActivityList/" + res.data[i]._id;
          break;
        }
      }
    });

    axios
      .post("http://localhost:5000/guest/add", guestInfo)
      .then((res) => console.log("Guest Added !"))
      .catch((err) => alert("You cannot use this Username !"));
  }

  render() {
    return (
      <div>
        <form className="flex justify-center" onSubmit={this.onSubmit}>
          <div className="">
            <div className="mb-4">
              <label className="text-white text-2xl">Name</label>
              <br></br>
              <input
                type="text"
                required
                id="guestName"
                name="guestName"
                className="mt-2 rounded-md"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="">
              <input
                type="submit"
                value="Submit"
                className="p-2 rounded-md bg-red-400 text-white mb-6"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
