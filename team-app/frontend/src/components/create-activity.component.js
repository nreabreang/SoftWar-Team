import React, { Component } from "react";

export default class CreateActivity extends Component {
  constructor(props) {
    super(props);

    // this.onChangeUsername = this.onChangeUsername.bind(this);
    // this.onChangeDescription = this.onChangeDescription.bind(this);
    // this.onChangeDuration = this.onChangeDuration.bind(this);
    // this.onChangeDate = this.onChangeDate.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);

    this.onChangeActName = this.onChangeActName.bind(this);
    this.onChangeActDescription = this.onChangeActDescription.bind(this);
    this.onChangeVirtualMoney = this.onChangeVirtualMoney.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // this.state = {
    //   username: "",
    //   description: "",
    //   duration: "",
    //   date: new Date(),
    //   users: [],
    // };

    this.state = {
      actName: "",
      actDescription: "",
      virtualMoney: [],
      date: new Date(),
      users: [],
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     users: ["test user"],
  //     username: "test user",
  //   });
  // }
  componentDidMount() {
    this.setState({
      users: ["test user"],
      actName: "test activity name",
    });
  }

  // onChangeUsername(e) {
  //   this.setState({
  //     username: e.target.value,
  //   });
  // }

  // onChangeDescription(e) {
  //   this.setState({
  //     description: e.target.value,
  //   });
  // }

  // onChangeDuration(e) {
  //   this.setState({
  //     duration: e.target.value,
  //   });
  // }

  // onChangeDate(date) {
  //   this.setState({
  //     date: date,
  //   });
  // }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const exercise = {
  //     username: this.state.username,
  //     description: this.state.description,
  //     duration: this.state.duration,
  //     date: this.state.date,
  //   };

  //   console.log(exercise);

  //   window.location = "/"; //relocation to homepage
  // }

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

    window.location = "/"; //relocation to homepage
  }

  render() {
    return (
      <div>
        <form class="w-full max-w-sm" onSubmit={this.onSubmit}>
          <div>
            <div className="mx-8">
              <label>Activity Name</label>
              <input
                type="text"
                id="actName"
                name="actName"
                className="m-4 border-2 border-black"
              />
            </div>
            <div className="mx-8 my-4 flex items-stretch">
              <label className="self-center">Description</label>
              <textarea
                id="actDes"
                name="actDes"
                className="m-4 border-2 border-black"
              />
            </div>
            <div className="mx-8">
              <label for="virtualMoney">Virtual Money:</label>
              <select id="virtualMoney" name="virtualMoney" className="m-4">
                <option value="dolls">dolls</option>
                <option value="gold chocolate">gold chocolate</option>
              </select>
            </div>
            <div className="mx-8">
              <label>Date : </label>
              <input
                type="date"
                id="actDate"
                name="actDate"
                className="m-4 border-2 border-black"
              />
            </div>
            <div className="mx-8">
              <input type="submit" value="Submit" className="p-4 rounded-xl px-8"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
