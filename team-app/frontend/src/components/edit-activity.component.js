import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export default class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.onChangeActName = this.onChangeActName.bind(this);
    this.onChangeActDescription = this.onChangeActDescription.bind(this);
    this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      actName: "",
      actDescription: "",
      virtualMoney: "",
      date: new Date(),
    };
  }

  

  componentDidMount() {
    console.log(this.props);
    axios
      .get("http://localhost:5000/activity/"+this.props.match.params.id)
      .then((response) => {
        this.setState({
          actName: response.data.actName,
          actDescription: response.data.actDescription,
          virtualMoney: response.data.virtualMoney,
          date: new Date(response.data.date),
        });
      })
      .catch(function(error) {
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
      actDescription: e.target.value,
    });
  }

  onChangeVirtualMoney(e) {
    this.setState({
      virtualMoney: e.target.value,
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
      date: this.state.date,
    };

    console.log(activity);

    
    axios
      .post("http://localhost:5000/activity/update/"+this.props.match.params.id, activity)
      .then((res) => console.log(res.data));

    window.location = "/activityList"; //relocation to homepage
  }

  render() {
    return (
      <div>
        <h3 className="p-8">Edit Activity</h3>
        <form className="w-full max-w-sm" onSubmit={this.onSubmit}>
          <div>
            <div className="mx-8">
              <label>Activity Name</label>
              <input
                required
                type="text"
                id="actName"
                name="actName"
                className="m-4 border-2 border-black"
                value={this.state.actName}
                onChange={this.onChangeActName}
              />
            </div>
            <div className="mx-8 my-4 flex items-stretch">
              <label className="self-center">Description</label>
              <textarea
                required
                id="actDes"
                name="actDes"
                className="m-4 border-2 border-black"
                value={this.state.actDescription}
                onChange={this.onChangeActDescription}
              />
            </div>
            <div className="mx-8">
              <label htmlFor="virtualMoney">Virtual Money:</label>
              <select
                required
                id="virtualMoney"
                name="virtualMoney"
                className="m-4"
                value={this.state.virtualMoney}
                onChange={this.onChangeVirtualMoney}
              >
                <option value="dolls" required>
                  dolls
                </option>
                <option value="gold chocolate" required>
                  gold chocolate
                </option>
              </select>
            </div>
            <div className="mx-8">
              <label>Date : </label>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <div className="mx-8">
              <input
                type="submit"
                value="Submit"
                className="p-4 rounded-xl px-8"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
