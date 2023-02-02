import { Component } from "react";
import Scanner from "../scanner.component";

const deCode = (code)=>{
    var decodeTeext = ""
    return decodeTeext
}

export default class guestEnter extends Component{

    constructor(props){
        super(props)
        this.state={
            input:""
        }

        this.changeInputText = this.changeInputText.bind(this)
    }

    changeInputText(e){
        this.setState({
            input:e
        })
        deCode(this.state.input)
    }

    changePage(){
        window.location = '/'
    }

    render(){
        return(
            <div>
                <div className="flex justify-center text-2xl">Scan and Code</div>
                <div className="flex justify-center mt-8">
                <div className="flex p-8 bg-white ">
          <Scanner width={256} height={256} />
                </div>
                </div>
                <div className="">
                    <input type="text" onChange={(e)=>this.changeInputText(e.currentTarget.value)}/>
                    <button onSubmit={this.changePage()}>Submit</button>
                </div>
            </div>
        );
    }
}