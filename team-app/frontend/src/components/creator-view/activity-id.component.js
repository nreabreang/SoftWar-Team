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
        <div>
            <div className="id-container text-navy">
                <div className="info-container p-8">
                    {/* col1 */}
                    <div className="">
                        {/* date */}
                        <div className="mb-4">
                            {/* <p className="text-20px bold mr-4">Activity Name : </p> */}
                            <p className="text-24px text-left bold">{props.actName}</p>
                        </div>

                        {/* date */}
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
                        <div className="text text-lg font-sans font-semibold ">
                            <Link
                                to="/CreatorResult"
                                className="border-2 bg-green-300 mx-auto p-2 rounded-md"
                            >
                                View result
                            </Link>
                        </div>
                    </div>

                    {/* col2 */}
                    <div className="">
                        {/* <div className="">
							<p className="text-20px bold text-center">Joining!</p>
						</div> */}

                        <div className="join-container justity-center w-max mx-auto">
                            <div className="mx-8 text-left">
                                <p className="text-20px bold mb-4">Joining!</p>
                                <p className="text-16px bold">ACCESS CODE: </p>
                                <div className="text-16px">
                                    {props.code}
                                </div>
                            </div>

                            <div className="border-r-2 border-dark my-2"></div>

                            <div className="items-center my-auto mx-8">
                                {/* qrcode */}
                                <GenerateQR urls={props.urls} actName={props.actName} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="line" />

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
