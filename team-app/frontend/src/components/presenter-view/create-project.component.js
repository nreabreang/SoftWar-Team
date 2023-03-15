import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import leftarrow from "../images/left-arrow.png";
import cross from "../images/cross.png";

export default class createProject extends Component {
    constructor(props) {
        super(props);
        this.onchangeProjectName = this.onchangeProjectName.bind(this);
        this.onchangeDescription = this.onchangeDescription.bind(this);
        this.sendForm = this.sendForm.bind(this);
        this.onchangeNameMember = this.onchangeNameMember.bind(this);
        this.onchangeEmailMember = this.onchangeEmailMember.bind(this);
        this.onAddEvent = this.onAddEvent.bind(this);

        this.state = {
            projectName: "",
            description: "",
            idActivity: "",
            members: [],
            nameMember: "",
            emailMember: "",
        };
    }

    modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            // ['clean']
        ],
    };

    formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
    ];

    componentDidMount() {
        // this.setState({actName:"test"});
        console.log("test id : ", window.localStorage.getItem("idActivity"));
        const data = {
            name:
                String(window.localStorage.PresenterFirstName) +
                " " +
                String(window.localStorage.PresenterLastName),
            email: String(window.localStorage.PresenterEmail),
        };

        this.setState({
            members: [data],
        });
    }

    onchangeNameMember(e) {
        this.setState({
            nameMember: e.target.value,
        });
    }

    onchangeEmailMember(e) {
        this.setState({
            emailMember: e.target.value,
        });
    }

    onAddEvent(e) {
        e.preventDefault();
        if (this.state.nameMember !== "" && this.state.emailMember !== "") {
            const data = {
                name: this.state.nameMember,
                email: this.state.emailMember,
            };
            this.setState({
                members: [...this.state.members, data],
                nameMember: "",
                emailMember: "",
            });
        } else {
            Swal.fire({
                title: "Cannot add this email & username",
                showConfirmButton: true,
            });
        }
        this.setState({
            nameMember: "",
            emailMember: "",
        });
    }

    onchangeProjectName(data) {
        this.setState({
            projectName: data.target.value,
        });
    }

    onchangeDescription = (content, delta, source, editor) => {
        this.setState({
            description: editor.getHTML(),
        });
    };

    deleteMember(element) {
        const index = this.state.members.indexOf(element);
        const copy = this.state.members;
        copy.splice(index, 1);
        this.setState({
            members: copy,
        });
    }

    renderInputTag() {
        return this.state.members.map((x) => {
            return (
                <div className="flex justify-left ml-8 pt-4">
                    <div className="">● {x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>

                    <div className="text-12px justify-left items-center pl-6 my-auto">
                        <img
                            src={cross}
                            alt=""
                            className="images-16px"
                            onClick={() => this.deleteMember(x)}
                        />
                    </div>
                </div>
            );
        });
    }

    sendForm(e) {
        e.preventDefault();

        if (this.state.members.length === 0) {
            Swal.fire({
                title: "You should be add 1 Member.",
                showConfirmButton: true,
            });
        } else {
            const reqData = {
                projectName: this.state.projectName,
                description: this.state.description,
                idActivity: window.localStorage.getItem("idActivity"),
                members: this.state.members,
            };

            Swal.fire({
                title: "Created Project Successfully",
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("http://localhost:5000/project/add", reqData);
                    window.location =
                        "./presenterActivityId/" +
                        window.localStorage.getItem("idActivity");
                }
            });
        }
        // this.setState({
        //   projectName: "",
        //   description: "",
        //   idActivity: "",
        // });
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="grid grid-cols-3 px-12 py-8 items-center text-navy">
                    <Link to="/ActivityList" className="">
                        <img src={leftarrow} alt="left arrow" className="images-18px" />
                    </Link>
                    <p className="flex text-30px justify-center">
                        Create Project
                    </p>
                </div>

                <form onSubmit={this.sendForm}>
                    <div className="mx-auto w-9/12 jusstify-center text-navy">
                        <div className="justify-center">
                            {/* input activity name */}
                            <div className="w-full">
                                <label className="text-20px bold">Project Name</label>
                                <input
                                    className="input mt-4 mb-8 w-full"
                                    id="projectName"
                                    name="projectName"
                                    type="text"
                                    value={this.state.projectName}
                                    onChange={this.onchangeProjectName}
                                    placeholder="Enter your Project Name"
                                />
                            </div>

                            {/* input activity name */}
                            <div className="w-full">
                                <label className="text-20px bold" for="grid-last-name">
                                    Team Members
                                </label>
                                {this.renderInputTag()}
                                <div className="grid grid-cols-5 gap-4 w-full">
                                    <div className="col-span-2">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            // id="memberName"
                                            // name="memberName"
                                            type="text"
                                            value={this.state.nameMember}
                                            onChange={this.onchangeNameMember}
                                            placeholder="Enter Member Name"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            // id="memberEmail"
                                            // name="memberEmail"
                                            type="email"
                                            value={this.state.emailMember}
                                            onChange={this.onchangeEmailMember}
                                            placeholder="Enter Email"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-span-1 justify-center mx-auto pt-4">
                                        <input
                                            type="submit"
                                            value="Add"
                                            className="button red p-1 w-20"
                                            onClick={this.onAddEvent}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div >

                        {/* col2 */}
                        < div className="justify-center" >
                            <div className="justify-center w-full mx-auto">
                                <label className="text-20px bold text-navy">
                                    Project Description
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    className="mt-4 mb-8"
                                    value={this.state.description}
                                    onChange={this.onchangeDescription}
                                    modules={this.modules}
                                    formats={this.formats}
                                    placeholder="Enter your Project Description "
                                />
                            </div>
                        </div >
                    </div >

                    <div className="flex container justify-end my-8 mx-auto w-9/12">
                        <input
                            type="submit"
                            value="Submit"
                            className="button red p-2 w-48"
                        />
                    </div>
                </form >
            </main >

            
            // <div className="flex justify-center">
            //   <form onSubmit={this.sendForm}>
            //     <div className="text-base font-semibold text-black my-2">
            //       <div className="my-4">
            //         <label className="text-[24px]">Project Name.</label>
            //         <div>
            //           <input
            //           className="mt-2 italic p-2 border rounded-lg"
            //             type="text"
            //             required
            //             id="projectName"
            //             name="projectName"
            //             placeholder="Put your Project Name"
            //             value={this.state.projectName}
            //             onChange={this.onchangeProjectName}
            //           />
            //         </div>
            //       </div>

            //       <div className="my-4">
            //         <label>Project Description</label>
            //         <div className="">
            //           <ReactQuill
            //             theme="snow"
            //             className="my-2 bg-gray-100 border-red-500 "
            //             value={this.state.description}
            //             onChange={this.onchangeDescription}
            //             modules={this.modules}
            //             formats={this.formats}
            //             placeholder="Put your Project Description here"

            //           />
            //         </div>
            //       </div>

            //       <div className="">
            //         <input
            //           type="submit"
            //           value="Submit"
            //           className="p-2 rounded-md bg-red-400"
            //         />
            //       </div>
            //     </div>
            //   </form>

            // </div>
        );
    }
}
