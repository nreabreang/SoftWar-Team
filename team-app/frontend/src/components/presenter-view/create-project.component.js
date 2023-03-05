import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

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
      members:[],
      nameMember:"",
      emailMember:"",
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
  }

  onchangeNameMember(e){
    this.setState({
      nameMember:e.target.value,
    })
  }

  onchangeEmailMember(e){
    this.setState({
      emailMember:e.target.value,
    })
  }

  onAddEvent(e){
    e.preventDefault()
    if(this.state.nameMember !== "" && this.state.emailMember !== ""){
      const data = {
        name:this.state.nameMember,email:this.state.emailMember
      }
      this.setState({
        members:[...this.state.members,data],
        nameMember:"",
        emailMember:"",
      })
    }else{
      Swal.fire({
        title:"Cannot add this email & username",
        showConfirmButton:true,
      })
    }
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

  deleteMember(element){
    const index = this.state.members.indexOf(element)
    this.state.members.splice(index,1)
  }

  renderInputTag(){
    return this.state.members.map((x)=>{
      return (<div className="flex justify-center gap-2">
        <p>{x.name}</p><p>{x.email}</p><button onClick={()=>this.deleteMember(x)}>Del</button>
      </div>)
    })
  }

  sendForm(e) {
    e.preventDefault();

    const reqData = {
      projectName: this.state.projectName,
      description: this.state.description,
      idActivity: window.localStorage.getItem("idActivity"),
      members:this.state.members,
    };

    axios.post("http://localhost:5000/project/add", reqData).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Created Project Successfully",
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location =
              "./presenterActivityId/" +
              window.localStorage.getItem("idActivity");
          }
        });
      }
    });

    this.setState({
      projectName: "",
      description: "",
      idActivity: "",
    });
  }

  render() {
    return (
      <main>
        <div className="flex header-container">
          <p className="text-36px">Create Project</p>
        </div>

        <form onSubmit={this.sendForm}>
          {/* input activity name */}
          <div className="input-container w-1/2 mx-auto">
            <label className="">Project Name</label>
            <input
              className="input w-full"
              id="projectName"
              name="projectName"
              type="text"
              value={this.state.projectName}
              onChange={this.onchangeProjectName}
              placeholder="Enter your Project Name"
            />
          </div>

          <div className="my-4">
            <div className="input-container w-1/2 mx-auto">
              <label>Project Description</label>
              <ReactQuill
                theme="snow"
                className="input w-full"
                value={this.state.description}
                onChange={this.onchangeDescription}
                modules={this.modules}
                formats={this.formats}
                placeholder="Enter your Project Description "
              />
            </div>
          </div>
          {this.renderInputTag()}
              <div>
                <input type="text" onChange={this.onchangeNameMember} autoComplete="off" value={this.state.nameMember}/>
                <input type="text" onChange={this.onchangeEmailMember} autoComplete="off" value={this.state.emailMember}/>
                <button onClick={this.onAddEvent}>Add</button>
              </div>
          <div className="container justify-end new">
            <input type="submit" value="Submit" className="button-navy" />
          </div>
        </form>
      </main>
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
