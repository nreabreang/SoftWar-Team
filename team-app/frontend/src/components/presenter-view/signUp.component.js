import { Component } from "react";
import Swal from "sweetalert2";
import "./signUP.component.css";
import "../Styles.css"

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
                Swal.fire({
                    title: "Sign-Up Successfully",
                    showConfirmButton: true,
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "/presenterLogin";
                    }
                });
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
                        <p className="text-24px bold">Are you a new</p>
                        <p className="text-45px text-navy py-4">PRESENTER?</p>
                        <p className="text-24px">Let's get you Sign-up</p>
                    </div>

                    {/* col2 */}
                    <div className="bg-white p-14 text-navy rounded-r-lg w-full shadow">
                        <p className="text-30px bold pb-2">Sign-Up</p>
                        <div className="border-b-2 border-red-it w-16"></div>

                        <form onSubmit={this.handleSubmit}>
                            <div className="justify-center">

                                {/* input first name */}
                                <div className="w-full">

                                    {/* <label className="text-18px text-navy bold">
                                        Activity Name
                                    </label> */}
                                    <input required
                                        className="input my-8 px-6 pt-4 w-full"
                                        // id="actName"
                                        // name="actName"
                                        type="name"
                                        // value={this.state.actName}
                                        onChange={(e) =>
                                            this.setState({ fname: e.target.value })
                                        }
                                        placeholder="Enter Your First Name"
                                        autoComplete="off"
                                    />
                                </div>

                                {/* input last name */}
                                <div className="w-full">

                                    {/* <label className="text-18px text-navy bold">
                                        Activity Name
                                    </label> */}
                                    <input required
                                        className="input my-8 px-6 pt-4 w-full"
                                        // id="actName"
                                        // name="actName"
                                        type="surname"
                                        // value={this.state.actName}
                                        onChange={(e) =>
                                            this.setState({ lname: e.target.value })
                                        }
                                        placeholder="Enter Your Last Name"
                                        autoComplete="off"
                                    />
                                </div>

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
                            <p className="text-navy mr-2">Already have an account?</p>
                            <a href="/presenterLogin" className="button-redit-liner text-16px bold">
                                Login now!
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            // <div class="h-screen  bg-white">
            // <div className="px-40  bg-white ">
            //     <div className="row" class="flex w-auto shadow mt-10 ">

            //         <div className="column bg-FAE7E7 shadow" >
            //             <div class="center">
            //                 <br></br> <br></br><br></br> <br></br><br></br>
            //                 <div className="text-36px">Are you a new</div>
            //                 <div className="text-48px color-E22637">PRESENTERs?</div>
            //                 <br></br>
            //                 <div className="text-24px">&nbsp; Let's get you Sign up</div>
            //             </div>
            //         </div>

            //         <div className="column " >
            //             <div class="vl"></div>
            //             <div class="forms">
            //                 <div class="form-content">
            //                     <div class="signup-form">
            //                         <div class="title">Sign Up</div>
            //                         <form onSubmit={this.handleSubmit}>
            //                             <div class="input-boxes">
            //                                 <div class="input-box">
            //                                     <input
            //                                         type="name"
            //                                         placeholder="Enter your First name" required
            //                                         onChange={(e) => this.setState({ fname: e.target.value })}></input>
            //                                 </div>

            //                                 <div class="input-box">
            //                                     <input type="surname" placeholder="Enter your Last name" required
            //                                         onChange={(e) => this.setState({ lname: e.target.value })}></input>
            //                                 </div>

            //                                 <div class="input-box">
            //                                     <input type="text" placeholder="Enter your email" required
            //                                         onChange={(e) => this.setState({ email: e.target.value })}></input>
            //                                 </div>

            //                                 <div class="input-box">
            //                                     <input type="password" placeholder="Enter your password" required
            //                                         onChange={(e) => this.setState({ password: e.target.value })}></input>
            //                                 </div>

            //                                 <div class="button input-box">
            //                                     <input type="submit" value="Submit"></input>
            //                                 </div>
            //                                 <div class="text sign-up-text">Already have an account?&nbsp;<a className="underline text-blue-400" href="/presenterLogin">Login now</a></div>
            //                             </div>
            //                         </form>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // </div>

        );
    }
}
