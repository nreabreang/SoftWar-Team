import { Component } from "react";
import "./Styles.css"
import "./presenter-view/signUP.component.css"


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
      <main class="h-100%">
      <div class=" flex justify-center grid-cols-2  mt-11 ">

  <div class="max-w-md mx-5  ">
      <div class='relative m-0 shadow-lg flex'>
        <div class='mt-10 flex-no-shrink'>
        </div>
        <div class='flex-1 card-block relative bg-FAE7E7'>
        <div class="h-6 mb-3 bg-263159"> </div>
          <div class="w-100 pt-12 p-12">
            
            <h4 class='text-3xl ml-3 mb-3 font-bold color-E22637'>be The</h4>
            <p class="text-5xl font-bold color-263159 ml-3 mb-3 ">PRESENTER</p>
            <p class="text-md ml-3 font-bold color-E22637 block mt-6">add your Project to Activity and get your feedbacks back! </p>
            <div class="h-20">              
            </div>
            <a class="button-lightpink color-E22637 m-0 h-10 text-l " href="/presenterLogin"
            >Log in as PRESENTER</a>
            <div class="h-6 "> </div>  
          </div>
          <div class="h-7 bg-263159"> </div>
        </div>
      </div></div>

  
      <div class="max-w-md mx-5  ">
      <div class='relative m-0 shadow-lg flex'>
        <div class='mt-10 flex-no-shrink'>
        </div>
        <div class='flex-1 card-block relative bg-FAE7E7'>
        <div class="h-6 mb-3 bg-E22637"> </div>
          <div class="w-100 pt-12 p-12">
            
            <h4 class='text-3xl ml-3 mb-3 font-bold color-263159'>be The</h4>
            <p class="text-5xl font-bold color-E22637 ml-3 mb-3 ">GUEST</p>
            <p class="text-md ml-3 font-bold text-grey block mt-6 color-263159">give Virtual Money and express your opinion on the Project! </p>
            <div class="h-20">              
            </div>
            <a class="button-lightpink color-263159 m-0 h-10 text-l " href="/guestLogin"
            >Log in as GUEST</a>
            <div class="h-6 "> </div>  
          </div>
          <div class="h-7 bg-E22637"> </div>
        </div>
      </div></div>
</div>

      {/* // <div>
      //   <p className="font-normal text-3xl text-black text-center p-2 my-2">
      //     Enter to the Activity
      //   </p>
      //   <div className="text-lg text-white my-2 flex justify-center p-2">
      //     <a href="/presenterLogin" className="border-2 border-white rounded-full p-2 m-2">Presenter</a>
      //     {/* <a href="/creatorLogin" className="border-2 border-white rounded-full p-2 m-2">Creator</a> */}
      {/* //     <a href="/guestLogin" className="border-2 border-white rounded-full p-2 m-2">Guest</a> */}
 

      </main>
    );
  }
}
