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
        <div className="card-container mx-auto px-24 ">
            <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-navy " >
                <div class=" overflow-hidden rounded-lg shadow-lg  lg:max-w-none lg:flex bg-FAE7E7 py-6 ">
                   
                    {/* edit & delete tab */}
                        
                        {/* edit icon */}
                                <Link to={"/edit/"} className="p-8">
                                    <img src={edit} alt="edit" className="images-20px mx-auto absolute inset-y-4 right-20" />
                                </Link>
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
                            <img src={del} alt="del" className="images-20px absolute inset-y-4 right-12" />
                        </button>
                                                        
                    <div className="grid grid-cols-2">
                    <div class="flex-1 px-4 py-4  lg:p-12 ml-12" >
                    <h3 className="text-3xl font-semibold ml-2 color-E22637">{props.actName}</h3>
                        {/* description */}
                        <div className="mt-6 ml-2">
                            <p className=" text-2xl font-bold text-navy">Description</p>
                            <p className="mt-2 text-base text-navy" dangerouslySetInnerHTML={{ __html: props.descript }}></p>
                        </div>

                        {/* <div class="mt-6">
                            <div class="flex items-center">
                                <h4 class="flex-shrink-0 pr-4 text-sm font-semibold tracking-wider text-navy uppercase"></h4>
                                <div class="flex-1 border-t border-red-500"></div>
                            </div>
                        </div> */}

                        <div className="flex justify-start">
                             {/*start date */}
                        <div className="flex mt-6 ml-2">
                            <p className="text-18px bold mr-4">Start Date : </p>
                            <p className="mt-1 text-base text-navy">{props.startTime.toISOString().substring(0, 10)}</p>
                        </div>

                        {/*end date */}
                        <div className="flex mt-6 ml-4">
                            <p className="text-18px bold mr-4">Due Date : </p>
                            <p className="mt-1  text-base text-navy">{props.endTime.toISOString().substring(0, 10)}</p>
                        </div>
                        </div>
                        <div className="flex mt-6 ml-2">
                             <p className="text-18px bold mr-4">Audit Committee : </p>
                             <p className="text-18px italic"></p>
                        </div>
                       </div>
                
                {/* column 2 */}
                     <div className="text-center items-center justify-center mr-8">
                     <div className=" w-full h-full ">

                        <div className="flex text-16px justify-center mt-8">
                             <p className="text-16px bold mr-2">ACCESS CODE : </p>
                             {props.code}
                         </div>
                         <div className="items-center my-auto mx-8">
                             {/* qrcode */}
                             <GenerateQR urls={props.urls} actName={props.actName} />
                         </div>
                            {/* view result icon */}
                            <Link to={"/CreatorResult"} className=" flex justify-center items-center ml-8">
                                <p className=" text-16px bold ml-2">View Result</p>
                                <img src={rightarrow} alt="right arrow" className="images-20px mx-2" />
                            </Link>
                     </div>
                     </div> 
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
            endTime: new Date(),
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

                {/* topic */}
                <div className=" px-12 py-12 mx-12 items-center justify-center ">
                <div className="items-center justify-center">
                    <p className="text-30px text-center text-navy pb-10">
                        <Link to="/ActivityList" className="flex">
                            <img src={leftarrow} className="images-18px mr-2 mt-1.5 " />
                            <p className="text-30px text-center text-navy ">Activity Details</p>
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
                    <div className=" mx-28 items-center justify-center grid grid-cols-2  py-8 pt-16">
                        <p className="text-30px text-navy ">Project List</p> </div>
                    <CreatorProjectLists />
                </div></div>                
            </main>
        );
    }
}
