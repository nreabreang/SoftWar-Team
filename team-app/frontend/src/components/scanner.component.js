import React from "react";
import { QrReader } from "react-qr-reader";
import { Component } from "react";

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
      <div>
        <div className="flex justify-center mt-8 text-xl font-semibold  text-red-500">
          Scan QR Code
        </div>
        <div className="flex justify-center">
          <QrReader
            className="border-2 px-8 mt-8 mb-5 rounded-md border-red-400"
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
            containerStyle={{ width: "25%" }}
          />
        </div>
        <div className="flex justify-center">
          <a href={this.state.data} className="text-center">
            {/* {this.state.data} */}
          </a>
        </div>
      </div>
    );
  }
}

export default QRScanner;
