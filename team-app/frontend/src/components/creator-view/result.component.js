import axios from "axios";
import React, { Component } from "react";
import Chart from "./Chart";

const options = {
  plugins: {
    title: {
      display: true,
      text: "Top 3 Projects",
    },
    legend: {
      display: false,
      position: "bottom",
    },
    Response: true,
  },
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
          window.localStorage.getItem("idActivity")
      )
      .then((response) => {
        const dataAsArray = Object.values(response.data);
        const virtualMoneyArr = [];
        const projectNameArr = [];

        // console.log(dataAsArray);
        for (let i = 0; i < dataAsArray.length; i++) {
          virtualMoneyArr.push(dataAsArray[i].totalVirtualMoney); // Replace "propertyName" with the actual name of the property you want to store
          projectNameArr.push(dataAsArray[i].projectName);
        }

        const nestedArray = projectNameArr.map((item, index) => [
          item,
          virtualMoneyArr[index],
        ]);

        // console.log(nestedArray);
        nestedArray.sort((a, b) => b[1] - a[1]);
        console.log(nestedArray);
        const vmArr = [];
        const pnArr = [];
        vmArr.push(nestedArray[0][1]);
        vmArr.push(nestedArray[1][1]);
        vmArr.push(nestedArray[2][1]);

        pnArr.push(nestedArray[0][0]);
        pnArr.push(nestedArray[1][0]);
        pnArr.push(nestedArray[2][0]);
        console.log(vmArr);
        console.log(pnArr);
        this.setState({
          totalVirtualMoney: vmArr,
          projectName: pnArr,
        });
      })
      .catch((err) => console.log(err));

    // console.log(this.state.totalVirtualMoney);
  }

  render() {
    const { totalVirtualMoney, projectName } = this.state;
    // console.log(totalVirtualMoney);
    const labels = projectName;

    const data = {
      labels,
      datasets: [
        {
          anchor: "end",
          align: "top",
          // formatter: Math.round,
          font: {
            weight: "bold",
            size: 16,
          },
          data: totalVirtualMoney,
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
