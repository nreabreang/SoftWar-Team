import axios from "axios";
import CreatorProjectLists from "../creator-view/project-list.component";
import Navbar from "../navbar.component"
// const { Component } = require("react");
import { Component } from "react";

const ActivityInfo = (props) => {
    const url = window.location.href.split("/");
    window.localStorage.setItem("idActivity", url[url.length - 1]);
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
            startTime: new Date(),
            endTime: new Date(),
            presenterUserData: [],
        };
    }

    componentDidMount() {
        fetch("http://localhost:5000/presenterUsers/presenterUserData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data.fname, data.data.lname);
                this.setState({ presenterUserData: data.data });
            });

        const arr = window.location.href.split("/");
        // console.log(arr[arr.length - 1]);

        axios
            .get("http://localhost:5000/presenterUsers/")
            .then((res) => {
                console.log("fff : ", res);
            })
            .catch((err) => {
                console.log("ddd");
            });

        axios
            .get("http://localhost:5000/activity/" + arr[arr.length - 1])
            .then((response) => {
                this.setState({
                    actName: response.data.actName,
                    actDescription: response.data.actDescription,
                    virtualMoney: response.data.virtualMoney,
                    unitMoney: response.data.unitMoney,
                    startTime: new Date(response.data.startTime),
                    endTime:new Date(response.data.endTime),
                });
                // console.log("res :",response.data.actName);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showButtonAdd(){
        if(new Date().getTime() <= new Date(this.state.endTime).getTime()){
            return(<div className="container justify-end">
            <a href="/createProject" className="button red px-4 py-2 w-48 text-18x ">
                Add Project +
            </a>
        </div>)
        }else{
            return;
        }
    }

    render() {
        return (
            <main className="">
                
                <header>
					<Navbar name={window.localStorage.PresenterFirstName + " " + window.localStorage.PresenterLastName} />
				</header>

                {/* topic */}
                <div className=" px-12 py-12 mx-12 items-center justify-center ">
                    <div className="items-center justify-center">
                    <p className="text-30px text-center text-navy pb-10">
                        Activity Details
                    </p>
                </div>
                

                {/* info container */}
                <div className="div">
                    <ActivityInfo
                        urls={window.location.href}
                        actName={this.state.actName}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        descript={this.state.actDescription}
                        presenter={this.state.presenterUserData}
                    />
                    <div className=" mx-28 items-center justify-center grid grid-cols-2  py-8 pt-16">
                        <p className="text-30px text-navy ">Project List</p> 
                        {this.showButtonAdd()}
                    </div>
                </div>
                    <CreatorProjectLists />
                </div>

				<div className="px-12 pb-12 flex w-full">
					<div className="show-container mx-auto
									xs:grid-cols-2
									sm:grid-cols-2
									md:grid-cols-2
									lg:grid-cols-3
									xl:grid-cols-4
									2xl:grid-cols-4">
					</div>
				</div>

            </main>
        );
    }
}
