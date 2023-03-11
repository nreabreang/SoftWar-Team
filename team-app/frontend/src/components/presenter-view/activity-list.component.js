import axios from "axios";
import CreatorProjectLists from "../creator-view/project-list.component";
// import Navbar from "../navbar.component"
// const { Component } = require("react");
import { Component } from "react";

const ActivityInfo = (props) => {
    const url = window.location.href.split("/");
    window.localStorage.setItem("idActivity", url[url.length - 1]);
    console.log(props.fname);
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
                                {props.date.toISOString().substring(0, 10)}
                            </p>
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
            date: new Date(),
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
                    date: new Date(response.data.date),
                });
                // console.log("res :",response.data.actName);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <main>
                {/* <header>
					<Navbar name={window.localStorage.PresenterFirstName + " " + window.localStorage.PresenterLastName} />
				</header> */}

                {/* topic */}
                <div className="grid grid-cols-2 px-12 py-8 items-center">
                    <p className="text-30px text-left text-navy">
                        Activity Description
                    </p>

                    <div className="container justify-end">
						<a href="/createProject" className="button red px-4 py-2 w-48 text-18x">
							Add Project +
						</a>
					</div>
                </div>

                {/* info container */}
                <div className="div">
                    <ActivityInfo
                        urls={window.location.href}
                        actName={this.state.actName}
                        date={this.state.date}
                        descript={this.state.actDescription}
                        presenter={this.state.presenterUserData}
                    />
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
