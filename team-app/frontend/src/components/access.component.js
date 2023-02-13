import { Component } from "react";

export default class access extends Component {

  componentDidMount(){
    
    const arr = window.location.href.split("/");
    console.log("url : ",arr[arr.length-1]);
    const index = arr[arr.length - 1];
    window.localStorage.setItem("ActCode",index);
    // console.log("hh : ",window.localStorage.getItem("ActName"));
  }
  
  render() {
    return (
      <div>
        <p className="font-normal text-3xl text-white text-center p-2 my-2">
          Enter to the Activity
        </p>
        <div className="text-lg text-white my-2 flex justify-center p-2">
          <a href="/presenterLogin" className="border-2 border-white rounded-full p-2 m-2">Presenter</a>
          <a href="/guestLogin" className="border-2 border-white rounded-full p-2 m-2">Guest</a>
        </div>
      </div>
    );
  }
}
