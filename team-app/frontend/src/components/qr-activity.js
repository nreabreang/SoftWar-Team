import QRCode from 'react-qr-code'
import {saveAs} from 'file-saver'

export default function GenerateQR(props){
    const urls = props.urls
    const actName = props.actName

    const downloadQR = ()=>{
        saveAs(urls,'qrcode.png')
    }
    return(
        <div className="">
            <label >Scane or Code</label>
            <QRCode 
                value={urls}
                size={64}
                //style={{width:"",height:"",maxWidth:"",maxHeight:""}} //other choice
                //level=''  option => 'L'=Low , 'M'=mediam , 'Q'=Quality, 'H'=height
            />
            <button onClick={downloadQR()} >Download</button>
            <p>{actName}</p>
        </div>
    );
}