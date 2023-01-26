import {saveAs} from 'file-saver'

export default function GenerateQR(props){
    const urls = props.urls
    const actName = props.actName
    const openAPI = `http://api.qrserver.com/v1/create-qr-code/?data=${urls}&size=256x256`

    const downloadQR = ()=>{
        saveAs(openAPI,'qrcode.png')
    }
    return(
        <div className="">
            <label >Scane or Code</label>
            <img src={openAPI} width="100" height="100" />
            <button onClick={downloadQR} >Download</button>
            {/* <p>{actName}</p> */}
        </div>
    );
}