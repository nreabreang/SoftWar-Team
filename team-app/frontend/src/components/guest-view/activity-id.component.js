import axios from "axios";
import GenerateQR from "../creator-view/qr-activity";
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
    console.log(arr);

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

  render() {
    return (
      <div className="flex justify-center">
        <div class="m-4 p-6 flex justify-center bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h5 class="mb-2 text-2xl mx-4 font-bold tracking-tight text-gray-900 dark:text-white">
            <p>ชื่อกิจกรรม : {this.state.actName} </p>
          </h5>
          <p class="mb-3 mx-4 font-medium text-gray-700 dark:text-gray-400">
          <h5 className="font-bold">Date</h5>
            {this.state.date.toISOString().substring(0, 10)}
          </p>

          <p class="mb-3 font-medium text-gray-700 dark:text-gray-400">
            <h5 className="font-bold">Description</h5>
            {this.state.actDescription}
          </p>
          
        </div>
        <GenerateQR urls={window.location.href} actName={this.state.actName} />
      </div>
    );
  }
}
