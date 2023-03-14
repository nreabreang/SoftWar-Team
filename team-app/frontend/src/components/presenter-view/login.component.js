import { Component } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";

export default class presenterLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        // const previousPath = document.referrer;
        // let arr = previousPath.split("/");
        // const index = arr[arr.length - 1];
        // let code = encodeNumber(index);
        // var code = window.localStorage.getItem("ActCode");
        // console.log("Code : ", code);
        // window.localStorage.setItem("actCode", code);
        // console.log("prevPath :", window.localStorage.getItem("actCode"));
    }
    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;
        console.log(email, password);

        fetch("http://localhost:5000/presenterUsers/login-presenter", {
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
                console.log(data, "presenterReg");
                if (data.status === "ok") {
                    Swal.fire({
                        title: "Login Successfully",
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.localStorage.setItem("token", data.data);
                            window.localStorage.setItem("PresenterFirstName", data.firstn)
                            window.localStorage.setItem("PresenterLastName", data.lastn)
                            window.localStorage.setItem("PresenterEmail", data.email)
                            var code = window.localStorage.getItem("ActCode");
                            console.log("Code : ", code);
                            axios.get("http://localhost:5000/activity/name/" + code).then((res) => {
                                if (res.status === 200 && res.data.length) {
                                    window.location = "/presenterActivityId/" + res.data[0]._id;
                                }
                                // let i;
                                // for (i = 0; i < res.data.length; i++) {
                                //   console.log(code)
                                //   console.log(encodeNumber(res.data[i].actName + res.data[i].date))
                                //   if (
                                //     code ===
                                //     encodeNumber(res.data[i].actName + res.data[i].date)
                                //   ) {
                                //     window.location = "/presenterActivityId/" + res.data[i]._id;
                                //     break;
                                //   } else {
                                //   }
                                // }

                            });
                            // console.log(window.localStorage.getItem("token"));
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Not found !",
                        text: "Something went wrong!",
                        showCancelButton: false,
                    });
                }
            })
    }
    render() {
        return (
            <main>
                <div className="flex px-14 pt-12 items-center w-11/12 mx-auto">
                    <Link to={"/access/" + window.localStorage.ActCode}>
                        <p className="text-48px text-navy bold goback">GARLICWAK</p>
                    </Link>
                </div>

                <div className="grid justify-center p-14 w-11/12 mx-auto
                                xs:grid-cols-1
                                sm:grid-cols-1
                                md:grid-cols-1
                                lg:grid-cols-2
                                xl:grid-cols-2
                                2xl:grid-cols-2">

                    {/* col1 */}
                    <div className="bg-pink p-14 text-red-it rounded-l-lg w-full shadow">
                        <p className="text-24px bold">be a presenter in</p>
                        <p className="text-45px text-navy py-4">GARLICWAK?</p>
                        <p className="text-24px">You must log in first!</p>
                    </div>

                    {/* col2 */}
                    <div className="bg-white p-14 text-navy rounded-r-lg w-full shadow">
                        <p className="text-30px bold pb-2">Log In</p>
                        <div className="border-b-2 border-red-it w-10"></div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="justify-center">

                                {/* input email */}
                                <div className="w-full">

                                    {/* <label className="text-18px text-navy bold">
                                        Activity Name
                                    </label> */}
                                    <input required
                                        className="input my-8 px-6 pt-4 w-full"
                                        // id="actName"
                                        // name="actName"
                                        type="text"
                                        // value={this.state.actName}
                                        onChange={(e) =>
                                            this.setState({ email: e.target.value })
                                        }
                                        placeholder="Enter Your Email Address"
                                        autoComplete="off"

                                    />
                                </div>

                                {/* input password */}
                                <div className="w-full">

                                    {/* <label className="text-18px text-navy bold">
                                        Activity Name
                                    </label> */}
                                    <input
                                        className="input my-8 px-6 pt-4 w-full"
                                        // id="actName"
                                        // name="actName"
                                        type="password"
                                        // value={this.state.actName}
                                        onChange={(e) =>
                                            this.setState({ password: e.target.value })
                                        }
                                        placeholder="Enter Your Password"
                                        autoComplete="off"
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

                        {/* sign up */}
                        <div className="justify-center text-center text-16px
                                        xs:block
                                        sm:block
                                        md:flex
                                        lg:flex
                                        xl:flex
                                        2xl:flex">
                            <p className="text-navy mr-2">Don't have an account yet?</p>
                            <a href="/presenterSignup" className="button-redit-liner text-16px bold">
                                Sign-up now!
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
