import axios from "axios"
import { Component } from "react"

export default class createProject extends Component{
    constructor(props){
        super(props)
        this.state={
            projectName:"",
            description:"",
        }
        this.onchangeProjectName = this.onchangeProjectName.bind(this)
        this.onchangeDescription = this.onchangeDescription.bind(this)
        this.sendForm = this.sendForm.bind(this)
    }

    onchangeProjectName(data){
        this.setState({
            projectName:data.target.value
        })
    }

    onchangeDescription(data){
        this.setState({
            description:data.target.value
        })
    }

    sendForm(e){
        e.preventDefault()
        const reqData = {
            projectName:this.state.nameProject,
            description:this.state.projectDescription
        }
        axios.post("http://localhost:5000/project/add",reqData)
        .then((res)=>console.log(res.data))
    }

    render(){
        return(
            <div className="flex flex-col">
                <form  onSubmit={this.sendForm}>
                    <div>
                        <div className="">
                            <label className="text-[24px]">Project Name.</label>
                            <div>
                                <input type="text" 
                                    required
                                    id="projectName"
                                    name="projectName"
                                    placeholder=""
                                    onChange={this.onchangeProjectName}
                                />
                            </div>
                        </div>

                        <div className="">
                            <label >Project Description</label>
                            <div>
                                <input type="text"
                                    id="Description" 
                                    name="Description"
                                    placeholder=""
                                    onChange={this.onchangeDescription}
                                />
                            </div>
                        </div>

                        <div className="">
                            <input type="submit" value="Submit" className="text-[20px]" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}