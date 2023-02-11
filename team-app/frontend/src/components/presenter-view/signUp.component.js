import { Component } from "react";


export default class presenterSignup extends Component {
  render() {
    return (
      <div className="flex justify-center">
        <form>
          <div className="grid justify-center mb-4 text-gray-500 p-4 w-64 font-bold bg-red-50 rounded-lg">
            <div className="flex justify-center">Sign up</div>
            <div className="mt-4">
              <p>Firstname</p>
              <input
                type="name"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
              ></input>
            </div>
            <div className="mt-4">
              <p>Lastname</p>
              <input
                type="Surname"
                className="mt-2 text-black p-1 rounded-md border-2 border-red-300"
              ></input>
            </div>
            <div className="mt-4">
              <p>Email address</p>
              <input
                type="email"
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
                value="Sign Up"
                className="p-2 rounded-lg bg-red-400 text-white"
              ></input>
            </div>
            <div className="flex justify-end mt-4 text-xs">
                <p className=" mr-2 ">Already have an account?</p> <a className="underline text-blue-400" href="/presenterLogin">Log In</a></div>
          </div>
        </form>
      </div>
//     <div className="bg-white"> 
//     <form>
//     <h3>Sign Up</h3>

//     <div className="mb-3">
//       <label>First name</label>
//       <input
//         type="text"
//         className="form-control"
//         placeholder="First name"
//       />
//     </div>

//     <div className="mb-3">
//       <label>Last name</label>
//       <input type="text" className="form-control" placeholder="Last name" />
//     </div>

//     <div className="mb-3">
//       <label>Email address</label>
//       <input
//         type="email"
//         className="form-control"
//         placeholder="Enter email"
//       />
//     </div>

//     <div className="mb-3">
//       <label>Password</label>
//       <input
//         type="password"
//         className="form-control"
//         placeholder="Enter password"
//       />
//     </div>

//     <div className="d-grid">
//       <button type="submit" className="btn btn-primary">
//         Sign Up
//       </button>
//     </div>
//     <p className="forgot-password text-right">
//       Already registered <a href="/sign-in">sign in?</a>
//     </p>
//   </form>
// </div>
    );
  }
}
