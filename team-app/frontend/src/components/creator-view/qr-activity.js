import { saveAs } from "file-saver";
import "../Styles.css"

export default function GenerateQR(props) {
	const urls = props.urls;
	const actName = props.actName;
	const openAPI = `http://api.qrserver.com/v1/create-qr-code/?data=${urls}&size=256x256`;

	const downloadQR = () => {
		saveAs(openAPI, `${actName}.png`);
	};
	return (
		<div className="justify-center font-bold text-xl my-4">
			<img
				alt={actName}
				src={openAPI}
				width="100"
				height="100"
				className="rounded-md mx-auto"
			/>

			<div className="flex justify-center mt-2">
				<button onClick={downloadQR} className="text-16px bold flex justify-center text-light-pink hover:text-light-pink uppercase">
					Download
				</button>
			</div>

			{/* <p>{actName}</p> */}
		</div>
	);
}
