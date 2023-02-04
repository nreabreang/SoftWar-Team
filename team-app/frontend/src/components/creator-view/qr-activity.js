import { saveAs } from "file-saver";

export default function GenerateQR(props) {
  const urls = props.urls;
  const actName = props.actName;
  const openAPI = `http://api.qrserver.com/v1/create-qr-code/?data=${urls}&size=256x256`;

  const downloadQR = () => {
    saveAs(openAPI, `${actName}.png`);
  };
  return (
    <div className="font-bold text-xl my-4">
      <img
        alt={actName}
        src={openAPI}
        width="100"
        height="100"
        className="border-2 bg-red-500 rounded-md"
      />
      <div className="flex justify-center mt-2 text-red-50">
        <button onClick={downloadQR} className="text-base flex justify-center hover:text-gray-900 underline uppercase">
          Download
        </button>
      </div>

      {/* <p>{actName}</p> */}
    </div>
  );
}
