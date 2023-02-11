import { Component } from "react";


export default class presenterLogin extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <form>
          <div className="grid justify-center mb-4 text-gray-500 p-4 w-64 font-bold bg-red-50 rounded-lg">
            <div className="flex justify-center">Log in</div>
            <div className="mt-4">
              <p>Email address</p>
              <input
                type="text"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
              ></input>
            </div>
            <div className="mt-4">
              <p>Password</p>
              <input
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
                type="password"
              ></input>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Submit"
                className="p-2 rounded-lg bg-red-400 text-white"
              ></input>
            </div>
            <div className="flex justify-end mt-4 underline text-blue-400">
                <a href="/presenterSignup">Sign-Up</a></div>
          </div>
        </form>
      </div>
    );
  }
}
