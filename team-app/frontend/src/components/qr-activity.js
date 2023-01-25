import QRCode from 'react-qr-code'

export default function GenerateQR(props){
    const urls = props.urls
    console.log(urls)
    return(
        <div className="">
            <QRCode 
                value={urls}
            />
            <a href={urls} download="qrcode.png">Download</a>
        </div>
    );
}