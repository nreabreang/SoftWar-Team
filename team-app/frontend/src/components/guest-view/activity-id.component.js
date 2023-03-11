import axios from "axios";
// import GenerateQR from "../creator-view/qr-activity";
import ProjectLists from "./projects-list.component";
const { Component } = require("react");

// const ActivityList = (props) => (
//   <div class="m-4 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
//     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//       {props.activity.actName}
//     </h5>

//     <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
//       <h5 className="font-bold">Description</h5>
//       {props.activity.actDescription}
//     </p>
//     <h5 className="font-bold">Date</h5>
//     <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
//       {props.activity.date.substring(0, 10)}
//     </p>
//   </div>
// );

const ActivityInformation = (props) => {
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
        {/* <div> */}
        {/* profile */}
        {/* <div className="text-20px bold mr-2 mb-2 border-2 text-center rounded-full p-2">
						Profile
					</div>
					<div className="text-white mr-2 px-2 text-center">
						<p className="text-16px bold">Name : </p>
						<p className="text-16px italic underline">
							{props.myname}
						</p>
					</div>
					<div className="text-white mr-2 px-2 text-center">
						<p className="font-bold text-lg">Virtual Money</p>
						<p className="text-base font-light text-white border-2 rounded-lg p-2 mt-2">
							Value : {props.funcGetVirtual}
							<p>Unit : {props.unitMoney}</p>
						</p>
					</div>
				</div> */}
      </div>

      <div className="line" />

      <div className="des-container">
        {/* description */}
        <div className="block">
          <p className="text-20px bold">DESCRIPTION : </p>
          <p className="text-20px italic overflow-hidden break-words" dangerouslySetInnerHTML={{__html:props.descript}}></p>
        </div>
      </div>
    </div>
    // <div className="flex justify-center">
    // 	<div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
    // 		<p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
    // 			<h5 className="font-bold">Activity Name</h5>
    // 			{props.actName}
    // 		</p>

    // 		<p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
    // 			<h5 className="font-bold">Date</h5>
    // 			{props.date.toISOString().substring(0, 10)}
    // 		</p>

    // 		<p class="mb-3 font-medium text-gray-700 w-52 dark:text-gray-400 break-words">
    // 			<h5 className="font-bold ">Description</h5>
    // 			<p className="break-words">{props.descript}</p>
    // 		</p>
    // 	</div>
    // 	{/* <GenerateQR urls={window.location.href} actName={this.state.actName} /> */}
    // 	<div className="m-4 grid content-center font-semibold ">
    // 		<div className="text-white mr-2 mb-2 border-2 text-center rounded-full p-2">
    // 			Profile
    // 		</div>
    // 		<div className="text-white mr-2 px-2 text-center">
    // 			<p className="font-bold text-lg">Your name</p>
    // 			<p className="text-base font-light italic underline">
    // 				{props.myname}
    // 			</p>
    // 		</div>
    // 	</div>
    // 	<div className="m-4 grid content-center font-semibold ">
    // 		<div className="text-white mr-2 px-2 text-center">
    // 			<p className="font-bold text-lg">Virtual Money</p>
    // 			<p className="text-base font-light text-white border-2 rounded-lg p-2 mt-2">
    // 				Value : {props.funcGetVirtual}
    // 				<p>Unit : {props.unitMoney}</p>
    // 			</p>
    // 		</div>
    // 	</div>
    // </div>
  );
};

export default class activityId extends Component {
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
    // const nameArr = window.location.href.split("/");
    // const name = nameArr[nameArr.length - 1];

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
  }

  getVirtual() {
    let virtualMoney = this.state.virtualMoney;
    var findVirtual = window.localStorage.getItem("guestVirtualMoney");
    if (findVirtual) {
      return window.localStorage.guestVirtualMoney;
    } else {
      window.localStorage.setItem("guestVirtualMoney", virtualMoney);
      return virtualMoney;
    }
    // var data1 = []
    // axios.get("http://localhost:5000/guest/getName/"+getNameJa).then((res)=>data1.push(res.data)).catch((err)=>console.log("Error: "+err))
    // if(data1.virtualMoney){
    //   return data1.virtualMoney;
    // }else{
    //   console.log(false)
    //   const data = {username:getNameJa,virtualMoney:virtualMoney};
    //   axios.post("http://localhost:5000/guest/add/virtual",data)
    //   return virtualMoney
    // }
    // return virtualMoney;
  }

  render() {
    return (
      <main>
        <div className="flex header-container">
          <p className="text-36px">Activity : {this.state.actName}</p>

          <div className=" justify-center grid content-center">
            <div className="m-4   text-blue-900 font-semibold justify-end border-b-2 border-red-400 pb-2 ">
              <div className="flex justify-start">
                <p className="mr-2">Name:</p>
                <div>{window.localStorage.getItem("guestName")}</div>
              </div>
              <div className="flex justify-start">
                <p className="mr-2">Virtual Money:</p>
                {/* <div> {window.localStorage.guestVirtualMoney}</div> */}
                <div>{this.getVirtual()}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="div">
          <ActivityInformation
            actName={this.state.actName}
            date={this.state.date}
            descript={this.state.actDescription}
            myname={window.localStorage.getItem("guestName")}
            funcGetVirtual={this.getVirtual()}
            unitMoney={this.state.unitMoney}
          />
          <ProjectLists />
        </div>
      </main>
    );
  }
}
