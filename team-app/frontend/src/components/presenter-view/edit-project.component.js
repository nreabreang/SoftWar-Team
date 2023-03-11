import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";

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
            return (<div>
                <p>{x.name}</p>
                <p>{x.email}</p>
                <button onClick={(e) => {
                    this.deleteMember(x)
                }}>Dele</button>
            </div>)
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
            <div>
                <form onSubmit={this.onAddEvent}>
                    <div>Project Name</div>
                    <input type="text" value={this.state.projectName} onChange={this.onChangeProjectName} />
                    <div>Description</div>
                    <ReactQuill
                        value={this.state.projectDescript}
                        onChange={this.onChangeProjectDescript}
                    />
                    <div>Members</div>
                    {this.showAllMembers()}
                    <input type="text" onChange={this.onChangeName} autoComplete="off" value={this.state.name} />
                    <input type="text" onChange={this.onChangeEmail} autoComplete="off" value={this.state.email} />
                    <button onClick={this.addMember}>Add</button>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}