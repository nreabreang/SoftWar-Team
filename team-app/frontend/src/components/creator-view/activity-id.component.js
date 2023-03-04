import { Buffer } from "buffer";
import axios from "axios";
import GenerateQR from "./qr-activity";
import CreatorProjectLists from "./project-list.component";
import { Link } from "react-router-dom";
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
            <div className="text text-lg font-sans font-semibold ">
              <Link
                to="/result"
                className="border-2 bg-green-300 mx-auto p-2 rounded-md"
              >
                View result
              </Link>
            </div>
          </div>

          {/* col2 */}
          <div className="">
            {/* <div className="">
							<p className="text-20px bold text-center">Joining!</p>
						</div> */}

            <div className="join-container justity-center w-max mx-auto">
              <div className="mx-8 text-left">
                <p className="text-20px bold mb-4">Joining!</p>
                <p className="text-16px bold">ACCESS CODE: </p>
                <div className="text-16px">
                  AAAAAAAA
                  {/* {encodeNumber(props.activity.actName)} */}
                </div>
              </div>

              <div className="border-r-2 border-dark my-2"></div>

              <div className="items-center my-auto mx-8">
                {/* qrcode */}
                <GenerateQR urls={props.urls} actName={props.actName} />
              </div>
            </div>
          </div>
        </div>

        <div className="line" />

        <div className="des-container mt-4">
          <div className="block">
            <p className="text-20px bold">DESCRIPTION : </p>
            <p className="text-20px italic m4  break-words">{props.descript}</p>
          </div>
        </div>
      </div>
    </div>
    // <div className="id-container text-navy">

    // </div>
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
        <header>
          <div className="grid grid-cols-2 navbar my-8 items-center">
            <Link to="/" className="">
              <p className="text-16px bold text-navy">GARLICWAK</p>
            </Link>

            <div className="container justify-end">
              <p className="text-16px bold text-red-it">
                {window.localStorage.getItem("name")}
              </p>
            </div>
          </div>

          <div className="line-horizon px-12 mx-12"></div>
        </header>

        {/* topic */}
        <div className="grid grid-cols-2 px-12 py-8 items-center">
          <p className="text-30px text-left text-navy break-words">
            Activity Description
          </p>
        </div>

        {/* info container */}
        <div className="">
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
