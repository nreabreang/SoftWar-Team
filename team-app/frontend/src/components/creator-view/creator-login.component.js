import { Component } from "react";
import Swal from "sweetalert2";
import "../Styles.css";

export default class creatorLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { email, password } = this.state;
        // console.log('handleSubmit email=' + email + ' password=' + password);
        if (window.localStorage.getItem("activityEmail")) { // check email in localstorage
            window.localStorage.removeItem("activityEmail"); // remove old email
            window.localStorage.setItem("activityEmail", email)
        } else {
            window.localStorage.setItem("activityEmail", email)
        }

        fetch("http://localhost:5000/creatorUsers/login-creator", {
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
                // console.log(data, "creatorReg");
                if (data.status === "ok") {
                    Swal.fire({
                        title: "Login Successfully",
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.localStorage.setItem("token", data.data);

                            window.location = "/activitylist/";
                            // var code = window.localStorage.getItem("ActCode");
                            // console.log("Codell : ", code);
                        }
                    });
                } else if (data.status === "error") {
                    Swal.fire({
                        title: "Login Failed",
                        showConfirmButton: true,
                    });
                }
            });
    }
    render() {
        return (
            <main>
                <div className="flex px-14 pt-12 items-center w-11/12 mx-auto">
                    <a href="/"><p className="text-48px text-navy bold goback">GARLICWAK</p></a>
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
                        <p className="text-24px bold">Want to create a</p>
                        <p className="text-45px text-navy py-4">NEW ACTIVITY?</p>
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
                            <a href="/creatorSignup" className="button-redit-liner text-16px bold">
                                Sign-up now!
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}
