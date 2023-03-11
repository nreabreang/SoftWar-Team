import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import '../Styles.css'

export default class ResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/project/activity/" +
          window.localStorage.getItem("idAct")
      )
      .then((response) => {
        this.setState({ data: response.data }, () => {
          // Initialize DataTables after setting the state
          $(this.el).DataTable({
            "paging": true
          });
        });
      });
  }

  componentWillUnmount() {
    // Destroy DataTables before unmounting the component
    $(this.el).DataTable().destroy(true);
  }

  render() {
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
        <div className="mt-8 text-3xl text-gray-700 font-bold flex justify-center ">
          <p className="p-2">Result Table</p>
        </div>
        <div className="mx-52 my-8">
          <div className="flex justify-between">
            <table
              id="resultTable"
              className="display bg-gray-300"
              ref={(el) => (this.el = el)}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Total Virtual Money</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((value) => (
                  <tr key={value._id}>
                    <td>{value.projectName}</td>
                    <td>{value.totalVirtualMoney}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
