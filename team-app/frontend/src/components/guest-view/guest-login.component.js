import axios from "axios";
import { Component } from "react";
import { Buffer } from "buffer";
import Swal from "sweetalert2";

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

    axios
      .post("http://localhost:5000/guest/add", guestInfo)
      .then(
        (res) =>
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your name has been saved",
            showConfirmButton: false,
            timer: 1500,
          }),

        axios.get("http://localhost:5000/activity/").then((res) => {
          let i;
          for (i = 0; i < res.data.length; i++) {
            if (index === encodeNumber(res.data[i].actName)) {
              window.location = "/guestActivityList/" + res.data[i]._id;
              break;
            } else {
            }
          }
        })
      )
      .catch((err) => error(), console.log("test"));
    // alert("You cannot use this Username !")

    function error() {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You cannot use this Username !",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
    }
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
