import axios from "axios";
import { Link } from "react-router-dom";
import ProjectLists from "./projects-list.component";
import Navbar from "../navbarguest.component";
import leftarrow from "../images/left-arrow.png";
const { Component } = require("react");


// const ActivityList = (props) => (
//   <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//       {props.activity.actName}
//     </h5>

//     <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
//       <h5 className="font-bold">Description</h5>
//       {props.activity.actDescription}
//     </p>
//     <h5 className="font-bold">Date</h5>
//     <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
//       {props.activity.date.substring(0, 10)}
//     </p>
//   </div>
// );

const ActivityInformation = (props) => {
    return (
        <div className="w-9/12 mx-auto bg-pink rounded-lg shadow">

            <div className="p-8">

                {/* topic */}
                <div className="pb-4">
                    <p className="text-30px text-red-it">{props.actName}</p>
                </div>

                {/* description */}
                <div className="pb-4">
                    <p className="text-20px text-navy bold pb-1">● Description</p>
                    <div className="text-16px text-navy mx-auto overflow"
                        dangerouslySetInnerHTML={{ __html: props.descript }}>
                    </div>
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

        axios.get("http://localhost:5000/activity/" + arr[arr.length - 1]).then((response) => {
            this.setState({
                actName: response.data.actName,
                actDescription: response.data.actDescription,
                virtualMoney: response.data.virtualMoney,
                unitMoney: response.data.unitMoney,
                startTime: new Date(response.data.startTime),
                endTime: new Date(response.data.endTime)
            });
        })
            .catch(function (error) {
                console.log(error);
            });

    }

    // getVirtual() {
    //     let virtualMoney = this.state.virtualMoney;
    //     var findVirtual = window.localStorage.getItem("guestVirtualMoney");
    //     if (findVirtual) {
    //         return window.localStorage.guestVirtualMoney;
    //     } else {
    //         window.localStorage.setItem("guestVirtualMoney", virtualMoney);
    //         return virtualMoney;
    //     }}

    //     componentDidMount() {
    //         const arr = window.location.href.split("/");
    //         // const nameArr = window.location.href.split("/");
    //         // const name = nameArr[nameArr.length - 1];

    //         axios.get("http://localhost:5000/activity/" + arr[arr.length - 1]).then((response) => {
    //                 this.setState({
    //                     actName: response.data.actName,
    //                     actDescription: response.data.actDescription,
    //                     virtualMoney: response.data.virtualMoney,
    //                     unitMoney: response.data.unitMoney,
    //                     date: new Date(response.data.date),
    //                 });
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //         }


    getVirtual() {
        let virtualMoney = this.state.virtualMoney;
        var findVirtual = window.localStorage.getItem("guestVirtualMoney");
        if (findVirtual) {
            return window.localStorage.guestVirtualMoney;
        } else {
            window.localStorage.setItem("guestVirtualMoney", virtualMoney);
            return virtualMoney;
        }
        // var data1 = []
        // axios.get("http://localhost:5000/guest/getName/"+getNameJa).then((res)=>data1.push(res.data)).catch((err)=>console.log("Error: "+err))
        // if(data1.virtualMoney){
        //   return data1.virtualMoney;
        // }else{
        //   console.log(false)
        //   const data = {username:getNameJa,virtualMoney:virtualMoney};
        //   axios.post("http://localhost:5000/guest/add/virtual",data)
        //   return virtualMoney
        // }
        // return virtualMoney;
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("guestName")} />
                </header>

                <div className="items-center justify-center pb-12">

                    {/* topic */}
                    <div className="px-12 py-9 items-center">
                        <p className="text-30px text-center text-navy">Activity Details</p>
                    </div>

                    {/* info container */}
                    <div className="div">
                        <ActivityInformation
                            actName={this.state.actName}
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            descript={this.state.actDescription}
                            myname={window.localStorage.getItem("guestName")}
                            funcGetVirtual={this.getVirtual()}
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
