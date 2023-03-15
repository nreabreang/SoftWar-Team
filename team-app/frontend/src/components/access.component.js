import { Component } from "react";
import "./Styles.css";
import "./presenter-view/signUP.component.css";


export default class access extends Component {

    componentDidMount() {

        const arr = window.location.href.split("/");
        console.log("url : ", arr[arr.length - 1]);
        const index = arr[arr.length - 1];
        window.localStorage.setItem("ActCode", index);
        // console.log("hh : ",window.localStorage.getItem("ActName"));
    }

    render() {
        return (
            <main>
                <div className="flex px-14 pt-24 items-center">
                    <a href="/"><p className="text-48px text-navy bold goback">GARLICWAK</p></a>
                </div>

                <div className="flex justify-center grid-cols-2 gap-8 p-14">

                    {/* col1 */}
                    <div className="bg-pink px-8 py-14 text-red-it rounded-lg">
                        <p className="text-20px bold">be the</p>
                        <p className="text-48px text-navy py-4">PRESENTER</p>
                        <p className="text-20px bold">add your Project to Activity and get your feedbacks back!</p>

                        <a href="/presenterLogin" className="flex container justify-left pt-8">
                            <p className="button red light p-2 w-60">Sign-In as PRESENTER</p>
                        </a>
                    </div>

                    {/* col2 */}
                    <div className="bg-pink px-8 py-14 text-navy rounded-lg">
                        <p className="text-20px bold">be the</p>
                        <p className="text-48px text-red-it bold py-4">GUEST</p>
                        <p className="text-20px text-navy bold">give Virtual Money and express your opinion on the Project!</p>

                        <a href="/guestLogin" className="flex container justify-left pt-8">
                            <p className="button red light p-2 w-60">Sign-In as GUEST</p>
                        </a>
                    </div>
                </div>

                {/* <div className="relative">

                    <div className="absolute inset-0 h-screen flex justify-center items-center">

                        
                    </div>
                </div> */}


                {/* <div className="m-auto h-screen">
                    <div class=" flex justify-center grid-cols-2 m-auto items-center">

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
                </div> */}

            </main>
        );
    }
}
