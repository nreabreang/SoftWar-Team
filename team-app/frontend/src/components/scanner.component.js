import React from "react";
import { QrReader } from "react-qr-reader";
import { Component } from "react";
import leftarrow from "./images/left-arrow.png";
import { Link } from "react-router-dom";

class QRScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
        };
    }

    handleScan = (data) => {
        console.log(data);
    };

    handleError = (err) => {
        console.error(err);
    };

    render() {
        return (
            <main>
                <header>
                    <div className="grid grid-cols-2 navbar my-8 items-center">
                        <Link to="/" className="">
                            <p className="text-16px bold text-navy">GARLICWAK</p>
                        </Link>
                    </div>

                    <div className="line-horizon px-12 mx-12"></div>
                </header>

                <div className="items-center justify-center pb-12">

                    {/* topic */}
                    <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                        <Link to="/" className="">
                            <img src={leftarrow} alt="left arrow" className="images-18px" />
                        </Link>
                        <p className="flex text-30px justify-center">
                            Scan QR Code
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <QrReader
                            className="bg-pink rounded-lg px-12"
                            videoStyle={{ with: "25%" }}
                            scanDelay={300}
                            onResult={(result, error) => {
                                if (result) {
                                    console.log(result);
                                    this.setState({
                                        data: result.text,
                                    });
                                    window.location.href = result;
                                }
                                if (!!error) {
                                    console.info(error);
                                }
                            }}
                            containerStyle={{ width: "30%" }}
                        />
                    </div>

                    <div className="justify-center pt-8">
                        <p className="text-center text-navy text-24px bold">Scan to Enter the Activity!</p>
                    </div>


                </div>
            </main>

            // <div>
            //     <div className="flex justify-center mt-8 text-xl font-semibold  text-red-500">
            //         Scan QR Code
            //     </div>
            //     <div className="flex justify-center">
            //         <QrReader
            //             className="border-2 px-8 mt-8 mb-5 rounded-md border-red-400"
            //             videoStyle={{ with: "25%" }}
            //             scanDelay={300}
            //             onResult={(result, error) => {
            //                 if (result) {
            //                     console.log(result);
            //                     this.setState({
            //                         data: result.text,
            //                     });
            //                     window.location.href = result;
            //                 }
            //                 if (!!error) {
            //                     console.info(error);
            //                 }
            //             }}
            //             containerStyle={{ width: "25%" }}
            //         />
            //     </div>
            //     <div className="flex justify-center">
            //         <a href={this.state.data} className="text-center">
            //             {/* {this.state.data} */}
            //         </a>
            //     </div>
            // </div>
        );
    }
}

export default QRScanner;
