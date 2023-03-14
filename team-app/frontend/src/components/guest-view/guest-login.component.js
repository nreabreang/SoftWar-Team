import axios from "axios";
import { Component } from "react";
import Swal from "sweetalert2";
import "../Styles.css";

export default class guestLogin extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: [],
    };
  }

  componentDidMount() {
    // axios.get("http://localhost:5000/activity/").then((res) => {
    // console.log(res.data[0].code);
    // });

    const previousPath = document.referrer;
    let arr = previousPath.split("/");
    const index = arr[arr.length - 1];
    console.log(index);

    axios
      .get(
        "http://localhost:5000/activity/name/" +
          window.localStorage.getItem("ActCode")
      )
      .then((res) => {
        // console.log(res.data[0]._id);
        window.localStorage.setItem("ActId", res.data[0]._id);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log(index);
    window.localStorage.removeItem("guestVirtualMoney");

    if (window.localStorage.getItem("guestName") === this.state.username) {
      window.location =
        "/guestActivityList/" + window.localStorage.getItem("ActId");
    } else if (window.localStorage.getItem("guestName")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please use your correct username",
      });
    } else {
      axios
        .post("http://localhost:5000/guest/add", guestInfo)
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your name has been saved",
              showConfirmButton: false,
              timer: 3000,
            }).then(
              (window.location =
                "/guestActivityList/" + window.localStorage.getItem("ActId"))
            );
          } else {
          }

          window.localStorage.setItem("guestName", this.state.username);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You cannot use this username !",
          });
        });
    }
  }

  render() {
    return (
      <div class=" flex justify-center mt-11 ">
        <div class="max-w-md mx-5  ">
          <div class="relative m-0 shadow-lg flex">
            <div class="mt-10 flex-no-shrink"></div>
            <div class="flex-1 card-block relative bg-FAE7E7">
              <div class="h-4 mb-3 bg-263159 "> </div>
              <div class="w-100 pt-10 p-12">
                <p class="text-3xl font-bold color-E22637 ml-3 text-center ">
                  Log in as GUEST
                </p>
                <p class="text-md ml-3 font-bold text-grey text-center block mt-6 mb-10 color-263159">
                  leave a comment and give your Virtual Money to your favorite
                  Projects!
                </p>

                <form className="flex justify-center" onSubmit={this.onSubmit}>
                  <div className="">
                    <div className="mb-2">
                      <label className="text-xl flex justify-center font-bold color-263159">
                        Username
                      </label>

                      <input
                        type="text"
                        required
                        id="guestName"
                        name="guestName"
                        className="h-8 text-center mt-2 rounded-xl"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                      />
                    </div>
                    <div class="flex justify-center">
                      <input
                        class="button-lightpink h-10 text-lg "
                        type="submit"
                        value="Submit"
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
              <div class="h-8 bg-263159"> </div>
            </div>
          </div>
        </div>
      </div>

      // <div>
      //   <form className="flex justify-center" onSubmit={this.onSubmit}>
      //     <div className="">
      //       <div className="mb-4">
      //         <label className="text-white text-2xl">Name</label>
      //         <br></br>
      //         <input
      //           type="text"
      //           required
      //           id="guestName"
      //           name="guestName"
      //           className="mt-2 rounded-md"
      //           value={this.state.username}
      //           onChange={this.onChangeUsername}
      //         />
      //       </div>
      //       <div className="">
      //         <input
      //           type="submit"
      //           value="Submit"
      //           className="p-2 rounded-md bg-red-400 text-white mb-6"
      //         />
      //       </div>
      //     </div>
      //   </form>
      // </div>
    );
  }
}
