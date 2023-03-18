import axios from "axios";
import ProjectLists from "./projects-list.component";
import Navbar from "../navbarguest.component";
import leftarrow from "../images/left-arrow.png";
import { Link } from "react-router-dom";
import { Component } from "react";

const ActivityInformation = (props) => {
    return (
        <div className="w-9/12 mx-auto bg-pink rounded-lg shadow">
            <div className="p-8">
                {/* topic */}
                <div className="pb-4">
                    <p className="text-30px text-red-it">{props.actName}</p>
                </div>

                {/* date */}
                <div className="pb-4">
                    <p className="text-20px text-navy bold pb-4">● Date</p>

                    <div className="flex mx-4 text-navy">
                        {/* start date */}
                        <div className="flex items-center mr-6">
                            <p className="text-16px bold mr-4">Start Date : </p>
                            <p className="text-base text-navy">
                                {props.startTime.toISOString().substring(0, 10)}
                            </p>
                        </div>

                        {/* end date */}
                        <div className="flex items-center">
                            <p className="text-16px bold mr-4">Due Date : </p>
                            <p className="text-base text-navy">
                                {props.endTime.toISOString().substring(0, 10)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* description */}
                <div className="pb-4">
                    <p className="text-20px text-navy bold pb-1">● Description</p>
                    <div
                        className="text-16px text-navy mx-auto overflow"
                        dangerouslySetInnerHTML={{ __html: props.descript }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default class activityId extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actName: "",
            actDescription: "",
            virtualMoney: "",
            unitMoney: "",
            startTime: new Date(),
            endTime: new Date(),
        };
    }

    componentDidMount() {
        const arr = window.location.href.split("/");
        // const nameArr = window.location.href.split("/");
        // const name = nameArr[nameArr.length - 1];

        axios
            .get("http://localhost:5000/activity/" + arr[arr.length - 1])
            .then((response) => {
                this.setState({
                    actName: response.data.actName,
                    actDescription: response.data.actDescription,
                    // virtualMoney: response.data.virtualMoney,
                    unitMoney: response.data.unitMoney,
                    startTime: new Date(response.data.startTime),
                    endTime: new Date(response.data.endTime),
                });
                window.localStorage.setItem("endAct",response.data.endTime)
                // console.log(window.localStorage.getItem("guestVirtualMoney").length);

                if (window.localStorage.getItem("guestVirtualMoney")) {
                    this.setState({
                        virtualMoney: window.localStorage.getItem("guestVirtualMoney"),
                    });
                } else {
                    this.setState({
                        virtualMoney: response.data.virtualMoney,
                    });

                    console.log(response.data.virtualMoney);
                    window.localStorage.setItem(
                        "guestVirtualMoney",
                        response.data.virtualMoney
                    );
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // getVirtual() {
    //   let virtualMoney = this.state.virtualMoney;
    //   var findVirtual = Boolean(window.localStorage.getItem("guestVirtualMoney"));
    //   if (findVirtual) {
    //     return window.localStorage.guestVirtualMoney;
    //   } else {
    //     window.localStorage.setItem("guestVirtualMoney", virtualMoney);
    //     return virtualMoney;
    //   }
    // }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("guestName")} />
                </header>

                <div className="items-center justify-center pb-12">

                    {/* topic */}
                    <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                        <Link to="/" className="">
                            <img src={leftarrow} alt="left arrow" className="images-18px" />
                        </Link>
                        <p className="flex text-30px justify-center">
                            Activity Details
                        </p>
                    </div>

                    {/* info container */}
                    <div className="div">
                        <ActivityInformation
                            actName={this.state.actName}
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            descript={this.state.actDescription}
                            myname={window.localStorage.getItem("guestName")}
                            // funcGetVirtual={this.getVirtual()}
                            unitMoney={this.state.unitMoney}
                        />

                    </div>

                    <div className="w-9/12 mx-auto items-center justify-center py-9">
                        <p className="text-30px text-navy ">Project List</p>
                    </div>

                    <ProjectLists />
                </div>
            </main>
        );
    }
}
