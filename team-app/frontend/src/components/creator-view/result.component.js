import axios from "axios";
import React, { Component } from "react";
import Chart from "./Chart";
import { Link } from "react-router-dom";

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
          window.localStorage.getItem("idAct")
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
          borderColor: "#000",
          borderWidth: "10px",
        },
      ],
    };

    return (
      <div>
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
        <div className="flex justify-center mt-8 text-xl font-bold">
          SUMMARIZED
        </div>
        <div className="mx-80 mt-4">
          <Chart data={data} options={options} />
        </div>
        <div className="flex justify-center mt-4">
          <Link to='/ResultTable' className="bg-gray-300 p-2 rounded-md hover:bg-green-300 text-white">All Project</Link>
        </div>
      </div>
    );
  }
}
