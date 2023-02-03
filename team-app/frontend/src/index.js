import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from 'react-dom/client'; 
// import { render } from "react-dom"; // <- This is the correct import statement for React version 17
import "./index.css";
import App from "./App";
// import Test from "./Test";

// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // const root = document.getElementById("root"); // <- This is the correct method call for React version 17
// // render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>,
// //   root
// // );
// // reportWebVitals();

// //Test
// const root = document.getElementById("root"); // <- This is the correct method call for React version 17
// render(
//   <React.StrictMode>
//     <Test />
//   </React.StrictMode>,
//   root
// );


// reportWebVitals();

//Test
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>
)

reportWebVitals();