import { Buffer } from "buffer";
import axios from "axios";
import GenerateQR from "./qr-activity";
import CreatorProjectLists from "./project-list.component";
import "../id.component.css";
import "../Styles.css";
import "../list.component.css";
const { Component } = require("react");
// const Buffer = require("buffer");
// const Buffer = require('buffer')
// import { Buffer } from "buffer";

const encodeNumber = (str) => {
  const code = Buffer.from(str, "utf-8")
    .toString("base64")
    .slice(0, 8)
    .toLocaleUpperCase();
  return code;
};

const ActivityInfo = (props) => {
  return (
    <div className="id-container">
      <div className="info-container">
        {/* col1 */}
        <div>
          {/* date */}
          <div className="">
            <p className="text-20px bold">ACTIVITY NAME : </p>
            <p className="text-20px italic m4">
            {props.actName}
            </p>
          </div>

          {/* date */}
          <div className="">
            <p className="text-20px bold">DATE : </p>
            <p className="text-20px italic m4">
              {props.date.toISOString().substring(0, 10)}
            </p>
          </div>
        </div>

        {/* col2 */}
        <div className="">
          {/* qrcode */}
          <GenerateQR urls={props.urls} actName={props.actName} />
        </div>
      </div>

      <div className="line" />

      <div className="des-container">
        {/* description */}
        <div className="block">
          <p className="text-20px bold">DESCRIPTION : </p>
          <p className="text-20px italic m4 break-normal">{props.descript}</p>
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
    };
  }

  componentDidMount() {
    const arr = window.location.href.split("/");
    const access = arr[arr.length - 1];

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
      })
      .catch(function(error) {
        console.log(error);
      });

    window.localStorage.setItem("access", "http://localhost:3000/access/");
  }

  render() {
    return (
      <main>
        <div className="flex header-container">
          <p className="text-36px">Activity : {this.state.actName}</p>
        </div>
        <div className="div">
          <ActivityInfo
            urls={
              window.localStorage.getItem("access") +
              encodeNumber(this.state.actName)
            }
            actName={this.state.actName}
            date={this.state.date}
            descript={this.state.actDescription}
          />
          <CreatorProjectLists />
        </div>
      </main>
    );
  }
}
