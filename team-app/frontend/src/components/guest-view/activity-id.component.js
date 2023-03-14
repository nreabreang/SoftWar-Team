import axios from "axios";
import { Link } from "react-router-dom";
import ProjectLists from "./projects-list.component";
import Navbar from "../navbar.component";
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
        <div className="card-container mx-auto px-24 ">
            <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-navy" >
                <div class=" overflow-hidden rounded-lg shadow-lg  lg:max-w-none lg:flex bg-FAE7E7 py-6">
                    
                    <div class="flex-1 px-4 py-4  lg:p-12 " >
                    <h3 className="text-3xl font-semibold ml-2 color-E22637">{props.actName}</h3>
                        
                        {/* description */}
                        <div className="mt-6 ml-2">
                            <p className=" text-2xl font-bold text-navy">Description</p>
                            <p className="mt-2 text-base text-navy" dangerouslySetInnerHTML={{ __html: props.descript }}></p>
                        </div>


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

                    {/* topic */}
                    <div className="px-12 py-12 mx-12 items-center justify-center">
                    <div className="items-center justify-center">
                        <p className="text-30px text-center text-navy pb-10">
                            <Link to="/ActivityList" className="flex">
                                <img src={leftarrow} alt="" className="images-18px mr-2 mt-1.5" />Activity Details</Link>
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
                            funcGetVirtual={this.getVirtual()}
                            unitMoney={this.state.unitMoney}
                        />
                        <div className=" mx-28 items-center justify-center grid grid-cols-2  py-8 pt-16">
                        <p className="text-30px text-navy ">Project List</p> </div>
                        <ProjectLists />
                    </div></div>
                </main>
            );
        }
    
}
