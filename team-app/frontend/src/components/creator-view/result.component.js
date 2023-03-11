import axios from "axios";
import React, { Component } from "react";
import Chart from "./Chart";

const options = {
  Response: true,
};

export default class result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVirtualMoney: [],
      projectName: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/project/activity/" +
          window.localStorage.getItem("idAct")
      )
      .then((response) => {
        const dataAsArray = Object.values(response.data);
        const newArray = [];
        for (let i = 0; i < dataAsArray.length; i++) {
          newArray.push(
            dataAsArray[i].totalVirtualMoney,
            dataAsArray[i].projectName
          ); // Replace "propertyName" with the actual name of the property you want to store
        }

        console.log(newArray);
        newArray.sort(function(a, b) {
          //use to allocate value from bigger to less
          return b - a;
        });

        const arr = [];
        const arr2 = [];
        arr.push(newArray[0]);
        arr2.push(newArray[1]);
        arr.push(newArray[2]);
        arr2.push(newArray[3]);
        arr.push(newArray[4]);
        arr2.push(newArray[5]);
        this.setState({
          totalVirtualMoney: arr,
          projectName: arr2,
        });
      })
      .catch((err) => console.log(err));

    console.log(this.state.totalVirtualMoney);
  }

  render() {
    const { totalVirtualMoney, projectName } = this.state;
    console.log(totalVirtualMoney);
    const labels = [projectName[0], projectName[1], projectName[2]];

    const data = {
      labels,
      datasets: [
        {
          label: "Virtual Money",
          data: totalVirtualMoney.sort(function(a, b) {
            //use to allocate value from bigger to less
            return b - a;
          }),
          backgroundColor: ["#2196F3", "#4CAF50", "#FFC107"],
        },
      ],
    };

    return (
      <div>
        <div className="flex justify-center mt-8 text-xl font-bold">
          SUMMARIZED
        </div>
        <div className="mx-80 mt-4">
          <Chart data={data} options={options} />
        </div>
      </div>
    );
  }
}
