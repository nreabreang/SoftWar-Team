import axios from 'axios'
import { Component } from 'react'

export default function GenerateQR(props){
    const getUrls = props.url
    const pixels = 500
    axios.get(`https://api.qrserver.com/v1/create-qr-code/?data=${getUrls}&size=${pixels}x${pixels}`)
    var urls = `https://api.qrserver.com/v1/create-qr-code/?data=${getUrls}&size=${pixels}x${pixels}`

    return(
        <div className="QR-config">
            <img src={urls} alt="" />
        </div>
    );
}