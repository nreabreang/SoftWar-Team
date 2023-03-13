import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './Styles.css';

export default class navbar extends Component {

    constructor(props) {
        super(props)
    }

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
                                <p className="text-16px bold text-red-it">
                                    {this.props.name}
                                </p>
                            </button>

                            {/* dropdown container */}
                            <div class="opacity-0 invisible dropdown-menu transition-all duration-300">
                                <div class="absolute right-0 w-56 mt-2 rounded-lg bg-pink">

                                    <div class="py-1">
                                        <button href="#" class="flex justify-between w-full px-4 py-2 text-14px text-navy bold"
                                            onClick={(e) => {
                                            localStorage.clear()
                                            window.history.back()
                                        }}>
                                            Log out |
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* <div class="opacity-0 invisible dropdown-menu origin-top-right">
                                <div class="absolute right-4 w-56 mt-2">
                                    <div className="bg-red-it rounded-lg">
                                        <button onClick={(e) => {
                                            localStorage.clear()
                                            window.history.back()
                                        }}>
                                            <p className="text-14px text-navy bold px-4 py-2">Log out |</p>

                                        </button>
                                    </div>

                                </div>
                            </div> */}

                        </div>
                    </div>


                </div>

                <div className="line-horizon px-12 mx-12"></div>


            </header>
        );
    }
}
