import { Component } from "react";
import Scanner from "../scanner.component";

export default class guestEnter extends Component{
    render(){
        return(
            <div>
                <div className="flex justify-center text-2xl">Scan and Code</div>
                <div className="flex justify-center mt-8">
                <div className="flex p-8 bg-white ">
          <Scanner width={256} height={256} />
        </div>
                </div>
            </div>
        );
    }
}