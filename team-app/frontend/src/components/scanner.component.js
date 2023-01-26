import { Component } from "react";
import QrReader from "react-qr-scanner";

export default class scannerCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delay: 10,
      result: "No result",
    };

    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data) {
    this.setState({
      result: data,
    });

    const test = Object(data);

    // console.log("fff" + test.split(","));
    console.log("QR URL : " + test.text);
    if(test!==null){
        window.location = test.text;
    }
   

  }

  onHandleError(err) {
    console.error("Error: " + err);
  }

  render() {
    const preview = {
      height: 500,
      width: 500,
    };

    return (
      <div>
        <QrReader
          delay={this.state.delay}
          style={preview}
          onError={this.onHandleError}
          onScan={this.handleScan}
          // legacyMode={true}
        />

        {/* <p>test : {this.state.result.split(",")}</p>            */}
      </div>
    );
  }
}
