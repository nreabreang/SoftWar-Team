import axios from "axios";
import { Link } from "react-router-dom";
import CreatorProjectLists from "../creator-view/project-list.component";
const { Component } = require("react");

const ActivityInfo = (props) => {
  const url = window.location.href.split("/");
  window.localStorage.setItem("idActivity", url[url.length - 1]);
  console.log(props.fname);
  return (
    <div className="id-container">
      <div className="info-container">
        {/* col1 */}
        <div>
          {/* date */}
          <div className="">
            <p className="text-20px bold">ACTIVITY NAME : </p>
            <p className="text-20px italic m4">{props.actName}</p>
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
        <div className="">{/* qrcode */}</div>
      </div>

      <div className="line" />

      <div className="des-container">
        {/* description */}
        <div className="block">
          <p className="text-20px bold">DESCRIPTION : </p>
          <p className="text-20px italic  break-words" dangerouslySetInnerHTML={{__html:props.descript}}></p>
        </div>
      </div>
    </div>

    // <div>
    //   <div>
    //     <div className="flex justify-end text-white mx-4">
    //       <div className="grid content-center mx-4">
    //         <div className="rounded-md border-2 p-2">
    //           <div className="flex justify-start">
    //             <div className="mr-2">{props.presenter.fname}</div>
    //             <div>{props.presenter.lname}</div>
    //           </div>
    //           <div className="flex justify-start">
    //             <label>Email :</label>
    //             <p className="mx-2">{props.presenter.email}</p>
    //           </div>
    //         </div>
    //         <div className="flex justify-end"></div>
    //       </div>
    //       <a href="" className="grid content-center underline">
    //         Log out
    //       </a>
    //     </div>
    //   </div>
    //   <div className="flex justify-center text-red-400">
    //     <div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    //       <h5 class="mb-2 font-medium mx-4 tracking-tight  dark:text-white">
    //         <p className="font-bold">Activity Name</p>
    //         <p className="text text-blue-900 mt-4 border-l p-2 font-extrabold">
    //           {props.actName}
    //         </p>
    //       </h5>
    //       <p class="mb-3 mx-4 font-medium  dark:text-gray-400">
    //         <h5 className="font-bold">Date</h5>
    //         <p className="text text-blue-900 mt-4 border-l p-2">
    //           {props.date.toISOString().substring(0, 10)}
    //         </p>
    //       </p>

    //       <p class="mb-3 font-medium  dark:text-gray-400 ">
    //         <h5 className="font-bold">Description</h5>
    //         <div
    //           Style="word-wrap: break-word;white-space:pre-wrap;"
    //           className="w-52 overflow-auto"
    //         >
    //           <p className="text text-blue-900 mt-4 border-l p-2">
    //             {props.descript}
    //           </p>
    //         </div>
    //       </p>
    //     </div>
    //     {/* <GenerateQR urls={props.urls} actName={props.actName} /> */}
    //     <div className="grid content-center">
    //       <Link to="/createProject">
    //         <button className=" p-1 border-b text-white hover:text-gray-300 hover:border-gray-300">
    //           Add Project
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    //       <p class="mb-3 font-medium  dark:text-gray-400 ">
    //         <h5 className="font-bold">Description</h5>
    //         <div
    //           Style="word-wrap: break-word;white-space:pre-wrap;"
    //           className=" overflow-auto"
    //         >
    //           <p className="text text-blue-900 mt-4 border-l p-2 overflow-auto w-72 h-32">
    //             {props.descript}
    //           </p>
    //         </div>
    //       </p>
    //     </div>
    //     {/* <GenerateQR urls={props.urls} actName={props.actName} /> */}
    //     <div className="grid content-center">
    //       <Link to="/createProject">
    //         <button className=" p-1 border-b text-white hover:text-gray-300 hover:border-gray-300">
    //           Add Project
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
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
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <main>
        <div className="flex justify-center">
          <div className="flex header-container">
            <p className=" text-2xl font-semibold">
              Activity : {this.state.actName}
            </p>
          </div>

          <div className="grid content-center">
            <Link to="/createProject">
              <button className=" p-2 border-b bg-green-400 rounded-md hover:bg-red-300 font-semibold text-white hover:text-gray-300 hover:border-gray-300">
                + Add Project
              </button>
            </Link>
          </div>
        </div>

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
      </main>
    );
  }
}
