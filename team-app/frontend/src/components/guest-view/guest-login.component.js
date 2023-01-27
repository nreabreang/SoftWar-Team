import axios from "axios";
import { Component } from "react";



export default class guestLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username : [],
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

    axios
      .post("http://localhost:5000/guest/add", guestInfo)
      .then((res) => console.log(res.data))
      .catch((err)=>alert("You cannot use this Username !"))
        // window.location = "";
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
                className="mt-2 rounded-md"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="">
              <input type="submit" value="Submit" className="p-2 rounded-md bg-red-400 text-white"/>
            </div>
          </div>
        </form>
        
      </div>
    );
  }
}
