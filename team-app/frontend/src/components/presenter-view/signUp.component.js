import { Component } from "react";


export default class presenterSignup extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <form className=" ">
          <div className="grid justify-center mb-4 text-gray-500 p-4 w-64 font-bold bg-red-50 rounded-lg">
            <div className="flex justify-center text-24px">Sign up</div>
            <div className="flex justify-center text-sm ">Let's get's you Sign Up</div>
            <div className="mt-4">
              <p>First name</p>
              <input
                type="name"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300" placeholder="First name"
              ></input>
            </div>
            <div className="mt-4">
              <p>Last name</p>
              <input
                type="Surname"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300" placeholder="Last name"
              ></input>
            </div>
            <div className="mt-4">
              <p>Email address</p>
              <input
                type="email"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300" placeholder="example@email.com"
              ></input>
            </div>
            <div className="mt-4">
              <p>Password</p>
              <input
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300" placeholder="Password"
                type="password"
              ></input>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Sign Up"
                className="p-2 rounded-lg bg-red-400 text-white"
              ></input>
            </div>
            <div className="flex justify-end mt-4 text-xs">
                <p className=" mr-2 ">Already have an account?</p> <a className="underline text-blue-400" href="/presenterLogin">Log In</a></div>
          </div>
        </form>
      </div>
    );
  }
}
