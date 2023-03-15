import axios from "axios";
import PresenterProjectList from "./project-list.component";
import Navbar from "../navbar.component"
import leftarrow from "../images/left-arrow.png";
import { Link } from "react-router-dom";
import { Component } from "react";

const ActivityInfo = (props) => {
    const url = window.location.href.split("/");
    window.localStorage.setItem("idActivity", url[url.length - 1]);
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
                            <p className="text-base text-navy">{props.startTime.toISOString().substring(0, 10)}</p>
                        </div>

                        {/* end date */}
                        <div className="flex items-center">
                            <p className="text-16px bold mr-4">Due Date : </p>
                            <p className="text-base text-navy">{props.endTime.toISOString().substring(0, 10)}</p>
                        </div>
                    </div>
                </div>

                {/* description */}
                <div className="pb-4">
                    <p className="text-20px text-navy bold pb-1">● Description</p>
                    <div className="text-16px text-navy mx-auto overflow"
                        dangerouslySetInnerHTML={{ __html: props.descript }}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default class presenterActivityId extends Component {
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
                    endTime: new Date(response.data.endTime),
                });
                // console.log("res :",response.data.actName);
                window.localStorage.setItem("endTime",response.data.endTime)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    showButtonAdd(){
        if(new Date().getTime() <= new Date(this.state.endTime).getTime()){
            return(<div className="flex container justify-end">
            <a href="/createProject" className="button red px-4 py-2 w-48 text-18x ">
                Add Project +
            </a>
        </div>)
        }else{
            return(<div>
                <p className="text-18x">Time Out</p>
            </div>);
        }
    }

    render() {
        return (
            <main className="">

                <header>
                    <Navbar name={window.localStorage.PresenterFirstName + " " + window.localStorage.PresenterLastName} />
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
                        <ActivityInfo
                            urls={window.location.href}
                            actName={this.state.actName}
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            descript={this.state.actDescription}
                            presenter={this.state.presenterUserData}
                        />
                    </div>

                    <div className="w-9/12 mx-auto items-center justify-center py-9
                                    grid grid-cols-2">
                        <p className="text-30px text-navy ">Project List</p>
                        {this.showButtonAdd()}
                    </div>
                    
                    {/* <CreatorProjectLists /> */}
                    <PresenterProjectList />

                </div>
            </main>
        );
    }
}
