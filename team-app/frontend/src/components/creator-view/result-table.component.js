import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import '../Styles.css'
import Navbar from "../navbar.component";
import leftarrow from "../images/left-arrow.png";

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
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                <div className="items-center justify-center pb-12">

                    {/* topic */}
                    <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                        <Link to="/CreatorResult" className="">
                            <img src={leftarrow} alt="left arrow" className="images-18px" />
                        </Link>
                        <p className="flex text-30px justify-center">
                            Summarized Table
                        </p>
                    </div>

                    <div className="w-8/12 mx-auto">
                        <table
                            id="resultTable"
                            className="text-14px text-navy"
                            ref={(el) => (this.el = el)}>

                            <thead>
                                <tr className="text-16px text-red-it">
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
            </main>
        );
    }
}
