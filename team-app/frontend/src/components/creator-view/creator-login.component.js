import { Component } from "react";
import { Link } from "react-router-dom";

export default class creatorLogin extends Component {
  render() {
    return (
      <div>
        <div className="flex justify-center">Get started</div>
        <form action="/users/log-in" method="post" name="form1">
          <div class="grid grid-cols-3 gap-0">

            <div></div>

            <div class="mt-12 mb-8">
              <input
                type="text"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                placeholder="Username"
              />
            </div>

            <div></div>

            <div></div>
            <div class="mt-1/2 mb-20">
              <input
                type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-full transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

                placeholder="Password"
              />
            </div>
            <div></div>

            <div></div>

            <div class="grid grid-cols-3">
              <div></div>

              <button
                type="submit"
                class="px-8 py-4 bg-blue-500 text-white font-bold text-base leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Login
              </button>


            </div>
            <div></div>
            <div></div>
            <div class="mt-6 mb-6">Don't have account yet?</div>
            <div></div>
            <div></div>

            <div class=" mt-6 mb-6 grid grid-cols-3">
              <div></div>

              <button
                type="button"
                class="px-8 py-4 bg-blue-500 text-white font-bold text-base leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Sign-up
              </button>

              <div></div>
            </div>
            <div></div>
            <div></div>
            
            <div class="mt-6 mb-6">
              __________________________&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Or&nbsp;&nbsp;&nbsp;&nbsp;   __________________________
            </div>
            <div></div>

            <div></div>
            <div class=" mt-6 mb-6 grid grid-cols-3">
              <div></div>

              <button
                type="button"
                class="px-8 py-4 bg-blue-500 text-white font-bold text-base leading-snug uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Gmail
              </button>

              <div></div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
