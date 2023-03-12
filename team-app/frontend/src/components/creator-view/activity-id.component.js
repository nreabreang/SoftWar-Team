import { Buffer } from "buffer";
import axios from "axios";
import GenerateQR from "./qr-activity";
import CreatorProjectLists from "./project-list.component";
import { Link } from "react-router-dom";
import "../id.component.css";
import "../Styles.css";
import "../list.component.css";
import Navbar from "../navbar.component";
import leftarrow from "../images/left-arrow.png";
import del from "../images/delete.png";
import edit from "../images/edit-1.png";
import rightarrow from "../images/right-arrow.png";
import Swal from "sweetalert2";
const { Component } = require("react");

const encodeNumber = (str) => {
    const code = Buffer.from(str, "utf-8")
        .toString("base64")
        .slice(0, 8)
        .toLocaleUpperCase();
    return code;
};

const ActivityInfo = (props) => {
    return (
        <div className="w-9/12 mx-auto">
            <div className="flex mx-auto">

                {/* col1 */}
                <div className="w-full w-4/5 mr-8">

                    <div className="header-id w-full">
                        <p className="text-24px bold py-2">{props.actName}</p>
                    </div>

                    <div className="header-id mt-8 p-4 h-full">
                        <div className="flex mb-4">
                            <p className="text-18px bold mr-4">Date : </p>
                            <p className="text-18px italic">
                                {props.startTime.toISOString().substring(0, 10)}
                            </p>
                        </div>
                        {/* date */}
                        <div className="flex mb-4">
                            <p className="text-18px bold mr-4">Date : </p>
                            <p className="text-18px italic">
                                {props.endTime.toISOString().substring(0, 10)}
                            </p>
                        </div>

                        <div className="flex mb-4">
                            <p className="text-18px bold mr-4">Committee : </p>
                            <p className="text-18px italic">

                            </p>
                        </div>
                    </div>
                </div>

                {/* col2 */}
                <div className="w-3/5 text-center items-center justify-center mr-8">
                    <div className="m-auto w-full h-full header-id ">

                        <div className="flex text-16px justify-center">
                            <p className="text-16px bold mr-2">ACCESS CODE : </p>
                            {props.code}
                        </div>

                        <div className="items-center my-auto mx-8">
                            {/* qrcode */}
                            <GenerateQR urls={props.urls} actName={props.actName} />
                        </div>
                    </div>
                </div>

                {/* col3 */}
                <div className="w-24 text-center items-center justify-center mx-auto">

                    <div className="w-full header-id">

                        {/* edit icon */}
                        <div>
                            <Link to={"/edit/"} className="p-8">
                                <img src={edit} alt="edit" className="images-20px mx-auto" />
                            </Link>
                        </div>

                        {/* delete icon */}
                        <button
                            href="#"
                            onClick={() => {
                                Swal.fire({
                                    title: "Do you want to delete the Activity?",
                                    showCancelButton: true,
                                    confirmButtonText: "Confirm",
                                }).then((result) => {
                                    /* Read more about isConfirmed, isDenied below */
                                    if (result.isConfirmed) {
                                        Swal.fire("Deleted!", "", "success").then((result) => {
                                            props.deleteActivity(props.activity._id);
                                        });
                                    }
                                });
                            }}
                        >
                            <img src={del} alt="del" className="images-20px" />
                        </button>

                        {/* view result icon */}
                        <Link to={"/edit/"} className="p-8">
                            <img src={rightarrow} alt="right arrow" className="images-20px mx-auto" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="des-container mt-4">
                <div className="block">
                    <p className="text-20px bold">DESCRIPTION : </p>
                    <p
                        className="text-20px italic m4  break-words"
                        dangerouslySetInnerHTML={{ __html: props.descript }}
                    ></p>
                </div>
            </div>
        </div>
    );
};

export default class creatorActivityId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actName: "",
            actDescription: "",
            virtualMoney: "",
            unitMoney: "",
            code: "",
            startTime: new Date(),
            endTime:new Date(),
        };
    }

    componentDidMount() {
        const arr = window.location.href.split("/");
        const access = arr[arr.length - 1];
        window.localStorage.setItem("idAct", access);
        console.log("hh", window.localStorage.getItem("idAct"));
        axios
            .get("http://localhost:5000/activity/" + access)
            .then((response) => {
                this.setState({
                    actName: response.data.actName,
                    actDescription: response.data.actDescription,
                    virtualMoney: response.data.virtualMoney,
                    unitMoney: response.data.unitMoney,
                    code: response.data.code,
                    startTime: new Date(response.data.startTime),
                    endTime:new Date(response.data.endTime)
                });
            })
            .catch(function (error) {
                console.log(error);
            });

        window.localStorage.setItem("access", "http://localhost:3000/access/");
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="px-12 py-8 items-center">

                    <p className="flex text-30px text-left text-navy">
                        <Link to="/ActivityList" className="flex">
                            <img src={leftarrow} className="images-18px mr-2 mt-1.5" />
                            Activity Description
                        </Link>

                    </p>
                </div>

                {/* info container */}
                <div className="">
                    <ActivityInfo
                        urls={
                            window.localStorage.getItem("access") +
                            encodeNumber(this.state.actName)
                        }
                        actName={this.state.actName}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        code={this.state.code}
                        descript={this.state.actDescription}
                    />
                    <CreatorProjectLists />
                </div>
            </main>
        );
    }
}
