import axios from "axios";
import React, { Component } from "react";
import Chart from "./Chart";

const labels = [
  "Project 1",
  "Project 2",
  "Project 3",
  "Project 4",
  "Project 5",
];

const data = {
  labels,
  datasets: [
    {
      label: "Virtual Money",
      data: [100, 200, 130, 400, 300],
      backgroundColor: ["#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#F44336"],
    },
  ],
};

const options = {};

export default class result extends Component {
  componentDidMount() {
    // console.log(window.localStorage.getItem("idAct"));
    const arr = [];
    axios
      .get(
        "http://localhost:5000/project/activity/" +
          window.localStorage.getItem("idAct")
      )
      .then((response) => {
        const mappedData = response.data.map((project) => {
          return {
            projectName: project.projectName,
            description: project.description,
            totalVirtualMoney: project.totalVirtualMoney,
          };
        });
        console.log(mappedData);
      })
      .catch((err) => err);
  }

  render() {
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
