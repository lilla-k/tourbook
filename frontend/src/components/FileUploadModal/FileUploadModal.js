import { useState } from 'react';
import './FileUploadModal.css';

function FileUploadModal() {

    const [file, setFile] = useState("");

    function chooseFileHandler(e) {
        if (e.target.files) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }
        console.log(e.target.files)
        console.log(URL.createObjectURL(e.target.files[0]));
    }


    return (
        <div>
            <input type="file" onChange={chooseFileHandler} />
            <img src="file" />

        </div>
    )

}

export default FileUploadModal;