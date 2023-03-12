import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Navbar from "../navbar.component";
import leftarrow from "../images/left-arrow.png";
import cross from "../images/cross.png";

export default class EditProject extends Component {
    constructor (props) {
        super(props)
        this.onChangeProjectDescript = this.onChangeProjectDescript.bind(this);
        this.onChangeProjectName = this.onChangeProjectName.bind(this);
        this.showAllMembers = this.showAllMembers.bind(this)
        this.deleteMember = this.deleteMember.bind(this)
        this.addMember = this.addMember.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onAddEvent = this.onAddEvent.bind(this)

        this.state = {
            idProj: "",
            projectName: "",
            projectDescript: "",
            members: [],
            name: "",
            email: "",
        }
    }

    componentDidMount() {
        const arr = window.location.href.split("/")
        axios.get("http://localhost:5000/project/" + arr[arr.length - 1]).then((res) => {
            this.setState({
                idProj: arr[arr.length - 1],
                projectName: res.data.projectName,
                projectDescript: res.data.description,
                members: res.data.members
            })
        })
    }

    onChangeName(data){
        this.setState({
            name:data.target.value
        })
    }

    onChangeEmail(data){
        this.setState({
            email:data.target.value
        })
    }

    onChangeProjectName(data) {
        this.setState({
            projectName: data.target.value
        })
    }

    onChangeProjectDescript(content,delta,source,editor) {
        console.log(editor.getHTML())
        this.setState({
            projectDescript: editor.getHTML()
        })
    }

    deleteMember(data) {
        // const search = this.state.members.find(x=>x === data)
        const index = this.state.members.indexOf(data)
        const copy = this.state.members
        copy.splice(index, 1)
        this.setState({
            members: copy
        })
    }

    showAllMembers() {
        return this.state.members.map((x) => {
            return (
                <div className="flex justify-left ml-8 pt-4">
                    <div className="">● {x.name}</div>
                    <p className="mx-1">—</p>
                    <div>{x.email}</div>

                    <div className="text-12px justify-left items-center pl-6 my-auto">
                        <img src={cross} className="images-16px" onClick={(e) => this.deleteMember(x)} />
                    </div>
                </div>
            // <div>
            //     <p>{x.name}</p>
            //     <p>{x.email}</p>
            //     <button onClick={(e) => {
            //         this.deleteMember(x)
            //     }}>Dele</button>
            // </div>
            )
        })
    }

    addMember(e) {
        e.preventDefault()
        if (this.state.name !== "" && this.state.email !== "") {
            const data = {
                name: this.state.name, email: this.state.email
            }

            this.setState({
                members: [...this.state.members, data],
                name: "",
                email: ""
            })
        } else{
            Swal.fire({
                title: "Cannot add this email & username",
                showConfirmButton: true,
            })
        }
    }

    onAddEvent(e) {
        e.preventDefault()
        const arr = window.location.href.split("/")
        console.log(this.state.members)
        const dataReq = {
            projectName: this.state.projectName,
            description: this.state.projectDescript,
            members: this.state.members,
        }

        if (this.state.members.length === 0) {
            Swal.fire({
                title: "You should be add 1 Member.",
                showConfirmButton: true
            })
        } else {
            axios.post("http://localhost:5000/project/update/" + this.state.idProj, dataReq).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Update Project Successfully",
                        showConfirmButton: true,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location = "http://localhost:3000/creatorprojectList/"+arr[arr.length - 1]
                        }
                    });
                }
            })
        }
    }

    render() {
        return (
            <main>
                <header>
                    <Navbar name={window.localStorage.getItem("name")} />
                </header>

                {/* topic */}
                <div className="px-12 py-8 items-center">

                    <p className="flex text-30px text-left text-navy">
                        <Link to="/ActivityList" className="flex">
                            <img src={leftarrow} className="images-18px mr-2 mt-1.5" />
                            Edit Project
                        </Link>

                    </p>
                </div>

                <form onSubmit={this.onAddEvent}>
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
                                <label className="text-20px bold" for="grid-last-name">Team Members</label>
                                {this.showAllMembers()}
                                <div className="grid grid-cols-5 gap-4 w-full">

                                    <div className="col-span-2">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            // id="memberName"
                                            // name="memberName"
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                            placeholder="Enter Member Name"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <input
                                            className="input mt-4 mb-8 w-full"
                                            // id="memberEmail"
                                            // name="memberEmail"
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            placeholder="Enter Email Name"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className="col-span-1 justify-center mx-auto pt-4">
                                        <input type="submit" value="Add" className="button red p-1 w-20" onClick={this.addMember} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* col2 */}
                        <div className="justify-center">
                            <div className="justify-center w-full mx-auto">
                                <label className="text-20px bold text-navy">Project Description</label>
                                <ReactQuill
                                    theme="snow"
                                    className="mt-4 mb-8"
                                    value={this.state.projectDescript}
                                    onChange={this.onChangeProjectDescript}
                                    // modules={this.modules}
                                    // formats={this.formats}
                                    placeholder="Enter your Project Description "
                                />
                            </div>
                        </div>

                    </div>

                    <div className="container justify-end my-8 mx-auto w-9/12">
                        <input type="submit" value="Submit" className="button red p-2 w-48" />
                    </div>

                </form>
            </main>
            // <div>
            //     <form onSubmit={this.onAddEvent}>
            //         <div>Project Name</div>
            //         <input type="text" value={this.state.projectName} onChange={this.onChangeProjectName} />
            //         <div>Description</div>
            //         <ReactQuill
            //             value={this.state.projectDescript}
            //             onChange={this.onChangeProjectDescript}
            //         />
            //         <div>Members</div>
            //         {this.showAllMembers()}
            //         <input type="text" onChange={this.onChangeName} autoComplete="off" value={this.state.name} />
            //         <input type="text" onChange={this.onChangeEmail} autoComplete="off" value={this.state.email} />
            //         <button onClick={this.addMember}>Add</button>

            //         <input type="submit" value="Submit" />
            //     </form>
            // </div>
        )
    }
}