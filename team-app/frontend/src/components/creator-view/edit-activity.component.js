import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import leftarrow from "../images/left-arrow.png";

export default class EditActivity extends Component {
    constructor(props) {
        super(props);
        this.onChangeActName = this.onChangeActName.bind(this);
        this.onChangeActDescription = this.onChangeActDescription.bind(this);
        this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
        this.onChangeUnitMoney = this.onChangeUnitMoney.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            actName: "",
            actDescription: "",
            virtualMoney: "",
            unitMoney: "",
            startTime: "",
            endTime: "",
        };
    }

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            // ['clean']
        ],
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    componentDidMount() {
        // console.log(this.props);
        const arr = window.location.href.split("/");
        // console.log(arr);
        axios
            .get("http://localhost:5000/activity/" + arr[arr.length - 1])
            .then((response) => {
                // const arr1 = response.data.startTime.split(":00.000Z")
                // const arr2 = response.data.endTime.split(":00.000Z")
                const offset = new Date().getTimezoneOffset() * 60000;
                this.setState({
                    actName: response.data.actName,
                    actDescription: response.data.actDescription,
                    virtualMoney: response.data.virtualMoney,
                    unitMoney: response.data.unitMoney,
                    startTime: new Date(new Date(response.data.startTime) - offset)
                        .toISOString()
                        .substring(0, 16),
                    endTime: new Date(new Date(response.data.endTime) - offset)
                        .toISOString()
                        .substring(0, 16),
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        // this.setState({actName:"test"});
    }

    onChangeActName(e) {
        this.setState({
            actName: e.target.value,
        });
    }

    onChangeActDescription(e) {
        this.setState({
            actDescription: e,
        });
    }

    onChangeVirtualMoney(e) {
        this.setState({
            virtualMoney: e.target.value,
        });
    }

    onChangeUnitMoney(e) {
        this.setState({
            unitMoney: e.target.value,
        });
    }

    onChangeStartTime(e) {
        this.setState({
            startTime: e.target.value,
        });
    }

    onChangeEndTime(e) {
        this.setState({
            endTime: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(new Date(this.state.startTime).getTime())
        // console.log(>= new Date(this.state.endTime).getTime)
        if (
            new Date(this.state.startTime).getTime() >=
            new Date(this.state.endTime).getTime()
        ) {
            Swal.fire({
                title: "Cannot use date.",
                showConfirmButton: true,
            });
        } else {
            const activity = {
                actName: this.state.actName,
                actDescription: this.state.actDescription,
                virtualMoney: this.state.virtualMoney,
                unitMoney: this.state.unitMoney,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
            };

            console.log(activity);
            const arr = window.location.href.split("/");
            axios
                .post(
                    "http://localhost:5000/activity/update/" + arr[arr.length - 1],
                    activity
                )
                .then((res) => {
                    Swal.fire({
                        title: "Added",
                        showConfirmButton: true,
                    }).then(() => {
                        window.location = "/activityList"; //relocation to homepage
                    });
                });
        }
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.name} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                    <Link to="/" className="">
                        <img src={leftarrow} alt="left arrow" className="images-18px" />
                    </Link>
                    <p className="flex text-30px justify-center">
                        Create Activity
                    </p>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div className="grid gap-0 w-9/12 mx-auto text-navy
										lg:grid-cols-2
                                        lg:gap-16
                                    ">
                        {/* col1 */}
                        <div className="justify-center">

                            {/* input activity name */}
                            <div className="w-full">
                                {/* <label className="text-18px bold">Activity Name</label> */}
                                <label className="text-20px text-navy bold">
                                    Activity Name
                                </label>
                                <input
                                    className="input mt-4 mb-8 w-full"
                                    id="actName"
                                    name="actName"
                                    type="text"
                                    value={this.state.actName}
                                    onChange={this.onChangeActName}
                                    placeholder="Enter Activity Name"
                                />
                            </div>

                            {/* bullet point for choose virtual money */}
                            <div className="pb-6 text-16px bold">
                                <div className="flex items-center w-full">
                                    <div className="w-full">
                                        <div className="flex items-center">
                                            <input
                                                id="horizontal-list-radio-license"
                                                type="radio"
                                                value="10000"
                                                name="list-radio"
                                                className="w-4 h-4 text-red-it bg-white-pink border-navy focus:ring-red-it focus:ring-2"
                                                onClick={(e) => this.setState({
                                                    virtualMoney: "10000",
                                                    unitMoney: "unit"
                                                })}
                                            />
                                            <label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Default Virtual Money</label>

                                            <input
                                                id="horizontal-list-radio-license"
                                                type="radio"
                                                value="Unit"
                                                name="list-radio"
                                                className="w-4 h-4 text-red-it bg-white-pink border-navy focus:ring-red-it focus:ring-2"
                                                onClick={(e) => this.setState({
                                                    virtualMoney: "",
                                                    unitMoney: ""
                                                })}
                                            />
                                            <label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Customize Virtual Money</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* input activity name */}
                            <div className="w-full">

                                {/* grid1 */}
                                <div className="grid grid-cols-2 gap-2">
                                    <label className="text-20px text-navy bold">
                                        Virtual Money / Guest
                                    </label>

                                    <label className="text-20px text-navy bold" for="grid-last-name">
                                        Unit
                                    </label>
                                </div>

                                {/* grid2 */}
                                <div className="grid grid-cols-2 gap-2">

                                    {/* virtual money container */}
                                    <div className="flex w-full">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            id="virtualMoney"
                                            name="virtualMoney"
                                            type="text"
                                            value={this.state.virtualMoney}
                                            onChange={this.onChangeVirtualMoney}
                                            placeholder="Enter Virtual Money"
                                        />
                                    </div>

                                    {/* unit container */}
                                    <div class="w-full">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            required
                                            id="unitMoney"
                                            name="unitMoney"
                                            type="text"
                                            value={this.state.unitMoney}
                                            onChange={this.onChangeUnitMoney}
                                            placeholder="Enter Unit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* col2 */}
                        <div className="justify-center">

                            <div className="pb-8">
                                <label className="text-20px bold text-navy">Date and Time</label>
                            </div>


                            {/* input date */}
                            <div className="w-full pl-6">
                                <label className="text-16px bold text-navy">Start</label>

                                <input type="datetime-local"
                                    selected={this.state.startTime}
                                    value={this.state.startTime}
                                    onChange={this.onChangeStartTime}
                                    className="input mt-4 mb-8 w-full"></input>
                            </div>

                            <div className="w-full pl-6">
                                <label className="text-16px bold text-navy">End</label>

                                <input type="datetime-local"
                                    selected={this.state.endTime}
                                    value={this.state.endTime}
                                    onChange={this.onChangeEndTime}
                                    className="input mt-4 mb-8 w-full"></input>
                            </div>
                        </div>
                    </div>

                    {/* description */}
                    <div className="justify-center w-9/12 mx-auto">
                        <label className="text-20px bold text-navy">Description</label>
                        <ReactQuill
                            theme="snow"
                            className="mt-4 mb-8"
                            id="actName"
                            name="actName"
                            value={this.state.actDescription}
                            onChange={this.onChangeActDescription}
                            modules={this.modules}
                            formats={this.formats}
                            placeholder="Put your Activity Description here"
                        />
                    </div>

                    <div className="flex container justify-end my-8 mx-auto w-9/12">
                        <input
                            type="submit"
                            value="Create Activity"
                            className="button red p-2 w-48"
                        />
                    </div>
                </form>
            </main>
        );
    }
}
