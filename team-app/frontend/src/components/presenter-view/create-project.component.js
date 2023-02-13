import axios from "axios";
import { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Styles.css"

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
			projectName: "",
			description: "",
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
					<div className="input-container mx-96">
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
						<div className="input-container mx-96">
							<label>Project Description</label>
							<ReactQuill
								theme="snow"
								className="input w-full"
								value={this.state.description}
								onChange={this.onchangeDescription}
								modules={this.modules}
								formats={this.formats}
								placeholder="Put your Project Description here"
							/>
						</div>
					</div>

					<div className="justify-end mx-96">
						<input
							type="submit"
							value="Submitted"
							className="button-navy"
						/>
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
