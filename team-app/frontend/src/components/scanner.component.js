import { Component } from "react";
import QrReader from 'modern-react-qr-reader'

export default class scannerCode extends Component{
    constructor(props){
        super(props);
        this.state={
            result:"",
        }
        
        this.handleScan = this.handleScan.bind(this)
        this.handleError = this.handleError.bind(this)
    };

    handleScan(data){
            if(data){
                this.setState({
                    result:data,
                })
                window.location=data
                
                while(this.state.result === data){}
            }
    };

    handleError(err){
        console.error("Error: "+err)
    };

    render(){
        const preview = {
            height:this.props.height,
            width:this.props.width
        }

    return(
        <div>
            <QrReader
                delay={300}
                style={preview}
                onError={this.handleError}
                onScan={this.handleScan}
                // legacyMode={true}
            />
            {/* <p>{this.state.result}</p>            */}
        </div>
    )  
    }
   
}
