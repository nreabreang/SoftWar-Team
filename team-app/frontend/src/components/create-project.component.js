import axios from "axios"
import { Component } from "react"

export default class createProject extends Component{
    constructor(props){
        super(props)
        this.state={
            nameProject:"",
            projectDescription:"",
        }
        this.onchangeNameProject = this.onchangeNameProject.bind(this)
        this.onchangeProjectDescription = this.onchangeProjectDescription.bind(this)
        this.sendForm = this.sendForm.bind(this)
    }

    onchangeNameProject(data){
        this.setState({
            nameProject:data.target.value
        })
    }

    onchangeProjectDescription(data){
        this.setState({
            projectDescription:data.target.value
        })
    }

    sendForm(e){
        e.preventDefault()
        const reqData = {
            projName:this.state.nameProject,
            descript:this.state.projectDescription
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
                                    id="nameProject"
                                    name="nameProject"
                                    placeholder="Obtimal substructure"
                                    onChange={this.onchangeNameProject}
                                />
                            </div>
                        </div>

                        <div className="">
                            <label >Project Description</label>
                            <div>
                                <input type="text"
                                    id="projectDescription" 
                                    name="projectDescription"
                                    placeholder="obtimal subproblem"
                                    onChange={this.onchangeProjectDescription}
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