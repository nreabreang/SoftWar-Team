import QRCode from 'react-qr-code'

export default function GenerateQR(props){
    const urls = props.urls
    return(
        <div className="">
            <QRCode 
                value={urls}
            />
        </div>
    );
}