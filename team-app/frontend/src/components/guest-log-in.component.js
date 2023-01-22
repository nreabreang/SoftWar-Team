import Comments from "../../../backend/models/comment.model";

export default class GuestLogIn extends Comments{


    render(){
        <div className="background">
            <input type="text" id="guestname" />
            <button >Submit</button>
        </div>
    }
}