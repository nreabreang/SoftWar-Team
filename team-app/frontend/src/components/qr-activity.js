import QRCode from 'react-qr-code'

export default function GenerateQR(props){
    const urls = props.urls
    return(
        <div className="">
            <QRCode 
                value={urls}
                size={64}
                //style={{width:"",height:"",maxWidth:"",maxHeight:""}} //other choice
                //level=''  option => 'L'=Low , 'M'=mediam , 'Q'=Quality, 'H'=height
            />
            <a href={urls} download="qrcode.png">Download</a>
        </div>
    );
}