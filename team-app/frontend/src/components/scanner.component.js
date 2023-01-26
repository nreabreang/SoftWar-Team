import { Component } from "react";
import QrReader from 'react-qr-scanner'

export default class scannerCode extends Component{
    constructor(props){
        super(props)

        this.state={
            delay:100,
            result:'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    };

    handleScan(data){
        console.log(data)
        this.setState({
            result:data,
        })
    };

    onHandleError(err){
        console.error("Error: "+err)
    };

    render(){
        const preview = {
            height:500,
            width:500
        }

    return(
        <div>
            <QrReader
                delay={this.state.delay}
                style={preview}
                onError={this.onHandleError}
                onScan={this.handleScan}
                // legacyMode={true}
            />
            {/* <p>{this.state.result}</p>            */}
        </div>
    )  
    }
}