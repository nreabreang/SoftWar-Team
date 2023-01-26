import { Component } from "react";
import QRScanner from 'react-qr-scanner'

export default class scannerCode extends Component{
    constructor(props){
        super(props)

        this.state={
            delay:75,
            result:"No result"
        }

        this.handleScan = this.handleScan.bind(this)
    };

    handleScan(data){
        this.setState({
            result:data
        })
    };

    onHandleError(err){
        console.log("Error: "+err)
    };

    render(){
        const preview = {
            height:500,
            width:500
        }

    return(
        <div>
            <QRScanner 
                delay={this.state.delay}
                style={preview}
                onError={this.onHandleError}
                onScan={this.handleScan}
                legacyMode={true}
            />
            <div>{this.state.result}</div>           
        </div>
    )  
    }
}