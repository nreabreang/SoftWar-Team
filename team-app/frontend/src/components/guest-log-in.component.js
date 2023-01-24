import Comments from "../../../backend/models/comment.model";
import DatePicker from 'react-datepicker'
import axios from "axios";

export default class GuestLogIn extends Comments{

    constructor(props){
        super(props);
        this.onChangeGuestName = this.onChangeGuestName.bind(this)
        this.onChangeDate = this.onChangeDate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            guestName :"",
            date : new Date(),
        }
    }

    onChangeGuestName(e){
        this.setState({
            guestName:e.target.value,
        });
    }

    onChangeDate(e){
        this.setState({
            date:e.target.value,
        })
    }

    onSubmit(e){
        e.preventDefault();

        const guestInfo = {
            guestName: this.state.guestName,
            date: this.state.date
        }

        axios.post("",guestInfo)
        .then((resp)=>console.log(resp.data))
        .catch((err)=>console.log("Error: "+err))
    }

    render(){
        return(
            <div>
                <form className="" onSubmit={this.onSubmit}> 
                    <div className="">
                        <div className="">
                            <label >Input Username</label>
                            <input type="text" 
                                required
                                id="guestName"
                                name="guestName"
                                className=""
                                value={this.state.guestName}
                                onChange={this.onChangeGuestName}
                            />
                        </div>
                        <div className="">
                            <label >Date</label>
                            <DatePicker 
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                        <div className="">
                            <input 
                            type="submit"
                            value="submit" 
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}