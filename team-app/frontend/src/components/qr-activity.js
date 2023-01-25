import QRCode from 'react-qr-code'

export default function GenerateQR(props){
    const urls = props
    return(
        <div classname="">
            <QRCode 
                values={urls}
            />
            <a href={urls} download='qrcode.png'>Download</a>
        </div>
    );
}