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

const ActivityInformation = (props)=>{
  return(
    <div className="flex justify-center">
    <div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
        <h5 className="font-bold">Project' Name</h5>
        {props.actName}
      </p>

      <p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
        <h5 className="font-bold">Date</h5>
        {props.date.toISOString().substring(0, 10)}
      </p>

      <p class="mb-3 font-medium text-gray-700 w-52 dark:text-gray-400 break-words">
        <h5 className="font-bold ">Description</h5>
        <p className="break-words">{props.descript}</p>
      </p>
    </div>
    {/* <GenerateQR urls={window.location.href} actName={this.state.actName} /> */}
    <div className="m-4 grid content-center font-semibold ">
      <div className="text-white mr-2 mb-2 border-2 text-center rounded-full p-2">
        Profile
      </div>
      <div className="text-white mr-2 px-2 text-center">
        <p className="font-bold text-lg">Your name</p>
        <p className="text-base font-light italic underline">
          {props.myname}
        </p>
      </div>
    </div>
    <div className="m-4 grid content-center font-semibold ">
      <div className="text-white mr-2 px-2 text-center">
        <p className="font-bold text-lg">Virtual Money</p>
        <p className="text-base font-light text-white border-2 rounded-lg p-2 mt-2">
          Value : {props.funcGetVirtual}<p>Unit : {props.unitMoney}</p>
        </p>
      </div>
    </div>
  </div>
  )
}

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

  name() {
    const nameArr = window.location.href.split("/");
    const name = nameArr[nameArr.length - 1];
    console.log("username : ", nameArr[5]);
    return name;
  }

  componentDidMount() {
    const arr = window.location.href.split("/");
    // console.log(arr);
    // window.location = "/"
    // console.log("ggg:",arr);

    axios
      .get("http://localhost:5000/activity/" + arr[arr.length - 2])
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
    // let valueVir = document.cookie.split("=")
    // if(valueVir[valueVir.length-1]){
    //   return valueVir[valueVir.length-1]
    // }else{
    //   document.cookie = `virtualmoney=${virtualMoney}`  
    // }
    const name = {username:this.name()}
    window.localStorage.setItem("name",name)
    var data1
    axios.get("http://localhost:5000/guest/getName/"+name).then((res)=>data1 = res).catch((err)=>console.log("Error: "+err))
    if(data1.virtualMoney){
      return data1.virtualMoney;
    }else{
      const data = {username:this.name(),virtualMoney:virtualMoney};
      axios.post("http://localhost:5000/guest/add/virtual",data)
      return virtualMoney
    }
    //return virtualMoney;
  }

  render() {
    return (
      <div className="div">
        <ActivityInformation actName={this.state.actName} 
          date={this.state.date} 
          descript={this.state.actDescription} 
          myname={this.name()}
          funcGetVirtual={this.getVirtual()}
          unitMoney={this.state.unitMoney} 
        />
        <ProjectLists />
      </div>
    );
  }
}
