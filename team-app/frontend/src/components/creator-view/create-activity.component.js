import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles.css";
import { Buffer } from "buffer";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
// import calendar style
// You can customize style by copying asset folder.
// import "@y0c/react-datepicker/assets/styles/calendar_variable.scss";

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export default class CreateActivity extends Component {
    constructor(props) {
        super(props);

        this.onChangeActName = this.onChangeActName.bind(this);
        this.onChangeActDescription = this.onChangeActDescription.bind(this);
        this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
        this.onChangeUnitMoney = this.onChangeUnitMoney.bind(this);
        this.onChangeStartTime = this.onChangeStartTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEndTime = this.onChangeEndTime.bind(this)

        this.state = {
            actName: "",
            actDescription: "",
            virtualMoney: "",
            unitMoney: "",
            email: "",
            code: "",
            startTime: new Date(),
            endTime:new Date(),
            users: [],
        };
    }

    componentDidMount() {
        // this.setState({actName:"test"});
        // console.log(this.state.code);
    }

    onChangeActName(e) {
        //    const data = axios.get("http://localhost:5000/activity/")
        //    const res = data.then((res)=>res.data);

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
        const code = Buffer.from(makeid(8), "utf-8")
            .toString("base64")
            .slice(0, 8)
            .toLocaleUpperCase();

        console.log(code);
        this.setState({
            startTime: e.target.value,
            code: code,
        });
    }

    onChangeEndTime(e){
        this.setState({
            endTime:e.target.value,
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const emails = window.localStorage.activityEmail;
        console.log(this.state.startTime)
        if(new Date(this.state.startTime).getTime() >= new Date(this.state.endTime).getTime()){
            Swal.fire({
                title:"Connot use date.",
                showConfirmButton:true
            })            
            {this.setState({
                startTime:"",
                endTime:"",
            })}
        }else{
        const activity = {
            actName: this.state.actName,
            actDescription: this.state.actDescription,
            virtualMoney: this.state.virtualMoney,
            unitMoney: this.state.unitMoney,
            code: this.state.code,
            email: emails,
            startTime: this.state.startTime,
            endTime:this.state.endTime,
        };

        console.log(activity);

        axios
            .post("http://localhost:5000/activity/add", activity)
            .then((res) => {
                if (res.status === 200) {
                    Swal.fire("Activity Added !").then((result) => {
                        window.location = "/activityList";
                    });
                } else {
                    // alert("Cannot create this Activity !")
                    Swal.fire("Cannot create this Activity !");
                }
                //relocation to homepage
            })
            .catch((err) => {
                if (err) {
                    // Swal.fire("Cannot use this Activity Name!")
                    Swal.fire("Cannot create this Activity !");
                }
            });
        }
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.name} />
                </header>

                <div className="p-12">
                    <p className="text-30px text-navy text-center">Create Activity</p>
                </div>

                <form onSubmit={this.onSubmit}>
                    <div
                        className="grid grid-cols-2 w-9/12 gap-16 mx-auto
										xs:grid-cols-1
										sm:grid-cols-1
										md:grid-cols-1
										lg:grid-cols-2
										xl:grid-cols-2
										2xl:grid-cols-2"
                    >
                        {/* col1 */}
                        <div className="justify-center">
                            {/* input activity name */}
                            <div className="w-full">
                                {/* <label className="text-18px bold">Activity Name</label> */}
                                <label className="text-18px text-navy bold">
                                    ACTIVITY NAME
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
                                <ul className="flex items-center w-3/4">
                                    <li className="w-full">
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
                                            <label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Default VM</label>
                                        </div>
                                    </li>
                                    <li className="w-full">
                                        <div className="flex items-center">
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
                                            <label for="horizontal-list-radio-license" className="w-full pl-3 pt-1">Customize VM</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* input virtual money and unit grid*/}
                            <div className="grid grid-cols-2 gap-4">

                                {/* virtual money container */}
                                <div className="w-full">
                                    <label className="text-18px text-navy bold">
                                        VIRTUAL MONEY / GUEST
                                    </label>
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

                                </div>

                                {/* unit container */}
                                <div className="w-full">
                                    <label className="text-18px bold text-navy" for="grid-last-name">
                                        UNIT
                                    </label>

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

                            {/* input date */}
                            <div className="w-full grid">
                                <label className="text-18px bold text-navy">START TIME</label>

                                <input type="datetime-local"
                                    selected={this.state.startTime}
                                    value={this.state.startTime}
                                    onChange={this.onChangeStartTime}
                                    className="input mt-4 mb-8 w-full"></input>
                            </div>

                            <div className="w-full grid">
                                <label className="text-18px bold text-navy">END TIME</label>

                                <input type="datetime-local"
                                    selected={this.state.endTime}
                                    value={this.state.endTime}
                                    onChange={this.onChangeEndTime}
                                    className="input mt-4 mb-8 w-full"></input>
                            </div>
                        </div>

                        {/* col2 */}
                        <div className="justify-center">
                            <div className="w-full">
                                {/* <label className="text-18px bold">Activity Name</label> */}
                                <label className="text-18px text-navy bold">
                                    ADD COMMITTEE
                                </label>

                            </div>
                        </div>
                    </div>

                    {/* description */}
                    <div className="justify-center w-9/12 mx-auto">
                        <label className="text-18px bold text-navy">DESCRIPTION</label>
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

                    <div className="container justify-end my-8 mx-auto w-9/12">
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
