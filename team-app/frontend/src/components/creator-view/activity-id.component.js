import axios from "axios";
import GenerateQR from "./qr-activity";
import CreatorProjectLists from "./project-list.component";
import { Link } from "react-router-dom";
import "../id.component.css";
import "../Styles.css";
import "../list.component.css";
import Navbar from "../navbar.component";
// import leftarrow from "../images/left-arrow.png";
// import del from "../images/delete.png";
// import edit from "../images/edit-1.png";
import rightarrow from "../images/right-arrow.png";
// import Swal from "sweetalert2";
const { Component } = require("react");


const ActivityInfo = (props) => {
    return (
        <div className="w-9/12 mx-auto bg-pink rounded-lg shadow">

            <div className="grid grid-cols-2 px-8 pt-8">

                {/* col1 */}
                <div>
                    {/* topic */}
                    <div className="pb-4">
                        <p className="text-30px text-red-it">{props.actName}</p>
                    </div>

                    <div className="pb-4">

                        <p className="text-20px text-navy bold pb-4">● Date</p>

                        <div className="flex mx-4 text-navy">

                            {/* start date */}
                            <div className="flex items-center mr-6">
                                <p className="text-16px bold mr-4">Start Date : </p>
                                <p className="text-base text-navy">{props.startTime.toISOString().substring(0, 10)}</p>
                            </div>

                            {/* end date */}
                            <div className="flex items-center">
                                <p className="text-16px bold mr-4">Due Date : </p>
                                <p className="text-base text-navy">{props.endTime.toISOString().substring(0, 10)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* col2 */}
                <div className="header-id m-auto mx-12">

                    <div className="grid text-16px text-navy bold justify-center px-8 grid-cols-2">
                        <div className="items-center m-auto">
                            <p className="m-auto">Access Code : </p>
                            <p className="text-red-it">{props.code}</p>
                        </div>

                        <div className="items-center m-auto">
                            {/* qrcode */}
                            <GenerateQR urls={props.urls} actName={props.actName} />
                        </div>
                    </div>
                </div>
            </div>

            {/* description */}
            <div className="px-8 pb-8">
                <p className="text-20px text-navy bold pb-1">● Description</p>
                <div className="text-16px text-navy mx-auto overflow"
                    dangerouslySetInnerHTML={{ __html: props.descript }}>
                </div>
            </div>

            <Link to={"/CreatorResult"} className=" flex justify-center items-center ml-8">
                <p className=" text-16px bold ml-2">View Result</p>
                <img src={rightarrow} alt="right arrow" className="images-20px mx-2" />
            </Link>


            {/* <div className="flex justify-start">
                             
                        <div className="flex mt-6 ml-2">
                            <p className="text-18px bold mr-4">Start Date : </p>
                            <p className="mt-1 text-base text-navy">{props.startTime.toISOString().substring(0, 10)}</p>
                        </div>

                        
                        <div className="flex mt-6 ml-4">
                            <p className="text-18px bold mr-4">Due Date : </p>
                            <p className="mt-1  text-base text-navy">{props.endTime.toISOString().substring(0, 10)}</p>
                        </div>
                        </div>
                        <div className="flex mt-6 ml-2">
                             <p className="text-18px bold mr-4">Audit Committee : </p>
                             <p className="text-18px italic"></p>
                        </div>
                       </div> */}
        </div >
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
            endTime: new Date(),
        };
    }

    componentDidMount() { //check
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
                    endTime: new Date(response.data.endTime)
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

                <div className="items-center justify-center pb-12">

                    {/* topic */}
                    <div className="px-12 py-9 items-center">
                        <p className="text-30px text-center text-navy">Activity Details</p>
                    </div>

                    {/* info container */}
                    <div className="div">
                        <ActivityInfo
                            urls={
                                window.localStorage.getItem("access") +
                                this.state.code
                            }
                            actName={this.state.actName}
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            code={this.state.code}
                            descript={this.state.actDescription}
                        />

                    </div>

                    <div className="w-9/12 mx-auto items-center justify-center py-9">
                        <p className="text-30px text-navy ">Project List</p>
                    </div>

                    <CreatorProjectLists />
                </div>
            </main>
        );
    }
}
