import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import './create-activity.component.css';
import '../styles.css'
import date from '../images/calendar.png';

export default class CreateActivity extends Component {
    constructor(props) {
        super(props);

        this.onChangeActName = this.onChangeActName.bind(this);
        this.onChangeActDescription = this.onChangeActDescription.bind(this);
        this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
        this.onChangeUnitMoney = this.onChangeUnitMoney.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            actName: "",
            actDescription: "",
            virtualMoney: "",
            unitMoney: "",
            date: new Date(),
            users: [],
        };
    }

    componentDidMount() {
        // this.setState({actName:"test"});
    }

    onChangeActName(e) {
        this.setState({
            actName: e.target.value,
        });
    }

    onChangeActDescription(e) {
        this.setState({
            actDescription: e.target.value,
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

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const activity = {
            actName: this.state.actName,
            actDescription: this.state.actDescription,
            virtualMoney: this.state.virtualMoney,
            unitMoney: this.state.unitMoney,
            date: this.state.date,
        };

        console.log(activity);

        axios
            .post("http://localhost:5000/activity/add", activity)
            .then((res) => console.log(res.data));

        window.location = "/activityList"; //relocation to homepage
    }

    render() {
        return (

            <main>
                <div className="create-activity-header">
                    <p className="text-36px">Create Activity</p>
                </div>

                <div className="create-activity">

                    <form onSubmit={this.onSubmit}>

                        <div className="flex justify-center">
                            <div>

                                {/* input activity name */}
                                <div className="m-5">
                                    <label className="lable-container">Activity Name</label>
                                    <input required
                                        type="text"
                                        id="actName"
                                        name="actName" value={this.state.actName}
                                        onChange={this.onChangeActName}
                                        placeholder="Activity Name" className="input"></input>
                                </div>

                                {/* input description */}
                                <div className="m-5">
                                    <label className="lable-container">Description</label>
                                    <textarea
                                        rows="5"
                                        required
                                        id="actDes"
                                        name="actDes"
                                        value={this.state.actDescription}
                                        onChange={this.onChangeActDescription}
                                        placeholder="Description" className="input" />
                                </div>

                                {/* input date */}
                                <div class="m-5">
                                    <label className="lable-container">Date</label>

                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}
                                        placeholder="Select a Date"
                                        className="input icon"
                                    />



                                </div>

                                {/* <div className="m-5">
                                    <label className="lable-container">Date</label>

                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.onChangeDate}
                                        className="input"
                                    />

                                    <div className="absolute">
                                        <img src={date} className="images-icon" />
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </form>
                </div >

            </main >

            // <div className="flex justify-center font-semibold font-sans">
            //   <form className="w-full max-w-sm" onSubmit={this.onSubmit}>
            //     <div>
            //       <div className="">
            //         <label>Activity Name</label>
            //         <div>
            //           <input
            //              required
            //                  type="text"
            //                  id="actName"
            //                  name="actName"
            //                  className="mb-4 mt-2 border-2 border-red-400 rounded-md"
            //                  value={this.state.actName}
            //                  onChange={this.onChangeActName}
            //                     />
            //         </div>
            //       </div>
            //       <div className=" my-2 items-stretch">
            //         <label className="self-center">Description</label>
            //         <div>
            //           <textarea
            //             required
            //             id="actDes"
            //             name="actDes"
            //             className="mb-4 mt-2 border-2 border-red-400 rounded-md"
            //             value={this.state.actDescription}
            //             onChange={this.onChangeActDescription}
            //           />
            //         </div>
            //       </div>
            //       <div className="">
            //         <label htmlFor="virtualMoney">Virtual Money</label>
            //         <div>
            //           <input
            //             required
            //             id="virtualMoney"
            //             name="virtualMoney"
            //             className="mb-4  mt-2 rounded-md border-2 border-red-400"
            //             value={this.state.virtualMoney}
            //             onChange={this.onChangeVirtualMoney}
            //           ></input>
            //         </div>
            //       </div>

            //       <div className="">
            //         <label htmlFor="unitMoney">Money Unit</label>
            //         <div>
            //           <input
            //             required
            //             id="unitMoney"
            //             name="unitMoney"
            //             className="mb-4 mt-2 rounded-md border-2 border-red-400"
            //             value={this.state.unitMoney}
            //             onChange={this.onChangeUnitMoney}
            //           ></input>
            //         </div>
            //       </div>

            //       <div className="">
            //         <label>Date</label>

            //         <DatePicker
            //           selected={this.state.date}
            //           onChange={this.onChangeDate}
            //           className="rounded-md p-2 mt-2 mb-4 border-2 border-red-400"
            //         />
            //       </div>

            //       <div className="mt-2">
            //         <input
            //           type="submit"
            //           value="Submit"
            //           className="p-2 mb-4 px-8 rounded-xl bg-red-500 text-gray-200"
            //         />
            //       </div>
            //     </div>
            //   </form>
            // </div>
        );
    }
}
