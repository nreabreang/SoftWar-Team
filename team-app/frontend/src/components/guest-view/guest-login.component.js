import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
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
        // window.localStorage.removeItem("guestVirtualMoney");

        if (window.localStorage.getItem("guestName") === this.state.username) {
            window.location =
                "/guestActivityList/" + window.localStorage.getItem("ActId");
        } else if (window.localStorage.getItem("guestName")) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect Username !",
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
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
            <main>
                <div className="flex px-14 pt-12 items-center w-11/12 mx-auto">
                    <Link to={"/access/" + window.localStorage.ActCode}>
                        <p className="text-48px text-navy bold goback">GARLICWAK</p>
                    </Link>
                </div>

                <div
                    className="grid justify-center p-14 w-11/12 mx-auto
                                xs:grid-cols-1
                                sm:grid-cols-1
                                md:grid-cols-1
                                lg:grid-cols-2
                                xl:grid-cols-2
                                2xl:grid-cols-2"
                >
                    {/* col1 */}
                    <div className="bg-pink p-14 text-red-it rounded-l-lg w-full shadow">
                        <p className="text-45px text-navy pb-4">Log in as GUEST</p>
                        <p className="text-20px">
                            leave a comment and give your Virtual Money to your favorite
                            Projects!
                        </p>
                    </div>

                    {/* col2 */}
                    <div className="bg-white p-14 text-navy rounded-r-lg w-full shadow">
                        <p className="text-30px bold pb-2">Username</p>
                        <div className="border-b-2 border-red-it w-16"></div>

                        <form onSubmit={this.onSubmit}>
                            <div className="justify-center">
                                {/* input username */}
                                <div className="w-full">
                                    {/* <label className="text-18px text-navy bold">
                                        Activity Name
                                    </label> */}
                                    <input
                                        required
                                        className="input my-8 px-6 pt-4 w-full"
                                        id="guestName"
                                        name="guestName"
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        placeholder="Enter Your Username"
                                    />
                                </div>
                            </div>

                            <div className="container justify-end my-8 mx-auto w-full">
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="button red p-2 w-full"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        );
    }
}
