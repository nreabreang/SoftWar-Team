import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default class createProject extends Component {
  constructor(props) {
    super(props);

    this.onchangeProjectName = this.onchangeProjectName.bind(this);
    this.onchangeDescription = this.onchangeDescription.bind(this);
    this.sendForm = this.sendForm.bind(this);

    this.state = {
      projectName: "",
      description: "",
    };
  }

  componentDidMount() {
    // this.setState({actName:"test"});
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

  sendForm(e) {
    e.preventDefault();

    const reqData = {
      projectName: this.state.projectName,
      description: this.state.description,
    };

    axios
      .post("http://localhost:5000/project/add", reqData)
      .then((res) => console.log(res.data), alert("Successfully"));

    this.setState({
        projectName:'',
        description:''
    })
  }

  render() {
    return (
      <div className="flex justify-center">
        <form onSubmit={this.sendForm}>
          <div>
            <div className="my-4">
              <label className="text-[24px]">Project Name.</label>
              <div>
                <input
                  type="text"
                  required
                  id="projectName"
                  name="projectName"
                  placeholder=""
                  value={this.state.projectName}
                  onChange={this.onchangeProjectName}
                />
              </div>
            </div>

            <div className="my-4">
              <label>Project Description</label>
              <div>
                <ReactQuill
                  theme="snow"
                  className="mt-2"
                  value={this.state.description}
                  onChange={this.onchangeDescription}
                />
                {/* <input type="text"
                                    id="Description" 
                                    name="Description"
                                    placeholder=""
                                    value={this.state.description}
                                    onChange={this.onchangeDescription}
                                /> */}
              </div>
            </div>

            <div className="">
              <input
                type="submit"
                value="Submit"
                className="p-2 rounded-md bg-red-400"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
