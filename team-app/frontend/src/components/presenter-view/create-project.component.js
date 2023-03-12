import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

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
    const copy = this.state.members
    copy.splice(index,1)
    this.setState({
      members:copy
    })
  }

  renderInputTag(){
    return this.state.members.map((x)=>{
      return (<div className="flex justify-center">
        <div className="p-3 mb-8 w-1/2 text-16px text-navy border-0 border-b border-blue-900 mr-4">{x.name}</div>
        <div className="p-3 mb-8 w-1/2 text-16px text-navy border-0 border-b border-blue-900 mr-4">{x.email}</div>
        <button className="button red p-2 h-10 w-24" onClick={()=>this.deleteMember(x)}>Delete</button>
      </div>)
    })
  }

  sendForm(e) {
    e.preventDefault();

    if(this.state.members.length === 0){
        Swal.fire({
          title:"You should be add 1 Member.",
          showConfirmButton:true
        })
    }else{
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
					<div className="grid grid-cols-2 navbar my-8 items-center">
						<Link to="/" className="">
							<p className="text-16px bold text-navy">GARLICWAK</p>
						</Link>
						<div className="container justify-end">
							{/* <p className="text-16px bold text-red-it">
								{window.localStorage.getItem("name")}</p> */}
						</div>
					</div>
					<div className="line-horizon px-12 mx-12"></div>
				</header>

        <div className="p-12">
          <p className="text-30px text-navy text-center">Create Project</p>
        </div>

        <form onSubmit={this.sendForm}>
        <div
            className="grid grid-cols-2 w-9/12 gap-16 mx-auto
										xs:grid-cols-1
										sm:grid-cols-1
										md:grid-cols-1
										lg:grid-cols-2
										xl:grid-cols-2
										2xl:grid-cols-2"
          >
          {/* col1 */}
          {/* input activity name */}
          <div className="justify-center">
          <div className="w-full">
            <label className="text-18px text-navy bold">Project Name</label>
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

          {/* add team member*/}
          <div class="w-full">
                <label
                  className="text-18px bold text-navy"
                  for="grid-last-name"
                >
                  Team Member
                </label>
                <div className="mt-2 mb-8 w-full">
                {this.renderInputTag()}
              <div>
                <input className="border-0 border-b border-blue-900 mr-4" placeholder="Member Name" type="text" onChange={this.onchangeNameMember} autoComplete="off" value={this.state.nameMember}/>
                <input className="border-0 border-b border-blue-900 mr-4 " placeholder="Member Email" type="text" onChange={this.onchangeEmailMember} autoComplete="off" value={this.state.emailMember}/>
                <button className="button red p-2 h-10 w-20 ml-4" onClick={this.onAddEvent}>Add</button>
              </div></div>
              </div>
        </div>

          {/* col2 */}
          <div className="justify-center">
          <div className="justify-center w-full mx-auto">
              <label className="text-18px bold text-navy">Project Description</label>
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
          </div></div>

          <div className="container justify-end my-8 mx-auto w-9/12">
            <input type="submit" value="Submit" className="button red p-2 w-48" />
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
