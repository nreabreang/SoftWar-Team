import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './Styles.css';
import downarrow from "./images/down-arrow-red.png";

export default class navbar extends Component {
    render() {
        return (
            <header>
                <div className="grid grid-cols-2 navbar my-8 items-center">
                    <Link to="/" className="">
                        <p className="text-16px bold text-navy">GARLICWAK</p>
                    </Link>

                    <div class="flex items-center justify-end">

                        {/* account container */}
                        <div class="relative inline-block dropdown">

                            <button class="container inline-flex justify-center w-full py-2">
                                <p className="text-16px bold text-red-it mr-2">
                                    {this.props.name}
                                </p>
                                <img src={downarrow} alt="" className="images-16px" />
                            </button>

                            {/* dropdown container */}
                            <div class="opacity-0 invisible dropdown-menu transition-all duration-300">
                                <div class="absolute right-0 w-56 mt-2 rounded-lg bg-pink">

                                    <div class="justify-center items-center w-full px-4 py-2">
                                        <p className="text-14px text-navy bold mr-2">Total virtual money :</p>
                                        <p className="text-16px text-red-it bold text-center">{window.localStorage.guestVirtualMoney}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="line-horizon px-12 mx-12"></div>
            </header>
        );
    }
}
