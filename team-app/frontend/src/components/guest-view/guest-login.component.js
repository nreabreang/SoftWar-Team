import axios from "axios";
import { Component } from "react";

export default class guestLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeGuestName = this.onChangeGuestName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      guestName: "",
    };
  }

  onChangeGuestName(e) {
    this.setState({
      guestName: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const guestInfo = {
      guestName: this.state.guestName,
    };

    axios
      .post("http://localhost:5000/guest/add", guestInfo)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error: " + err));
  }

  render() {
    return (
      <div>
        <form className="flex justify-center" onSubmit={this.onSubmit}>
          <div className="">
            <div className="mb-4">
              <label>Username</label>
              <br></br>
              <input
                type="text"
                required
                id="guestName"
                name="guestName"
                className=""
                value={this.state.guestName}
                onChange={this.onChangeGuestName}
              />
            </div>
            <div className="">
              <input type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
