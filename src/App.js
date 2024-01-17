import axios from "axios";
import "./App.css";
import { useState } from "react";
import swal from "sweetalert2";

function App() {
  const [img, setImg] = useState("");
  const [uploadparcentage, setUploadparcentage] = useState(0);

  const handleChange = (img) => {
    let image = document.getElementById("preview");
    if (img.type === "image/png" || img.type === "image/jpeg") {
      setImg(img);
      image.src = URL.createObjectURL(img);
    } else {
      alert("plz upload img file");
    }
  };

  // uplaod file api

  const uploadfile = () => {
    const formData = new FormData();
    formData.append("files", img);

    axios.post("http://localhost:1337/api/upload", formData, {
      onUploadProgress: (progressEvent) => {
        let progress = parseInt(
          Math.round(progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(progress);
        setUploadparcentage(progress);
        if(progress===100){
          swal("Good job!", "You clicked the button!", "success");
          setUploadparcentage(0)
        }
      }
    });
    
  };

  return (
    <>
      <label for="images" class="drop-container" id="dropcontainer">
        <span class="drop-title">Drop files here</span>
        <input
          type="file"
          id="ImgInp"
          accept="image/*"
          name="files"
          required
          onChange={(e) => handleChange(e.target.files[0])}
        />
      </label>
      <label>
        <textarea class="form-control w-100 mt-5"></textarea>
      </label>
      <div>
        <img id="preview" alt="your preview" src=""></img>
      </div>
      <button value="upload" onClick={uploadfile}>
        upload
      </button>
      {uploadparcentage > 0 && (
        <div className="progress w-50 ">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: uploadparcentage + "%" }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      )}
    </>
  );
}
export default App;
