import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import Axios from "axios";

import "./App.css";

const UploadComponent = (props) => (
  <form>
    <label>
      AWS S3 file Upload URL:
      <br />
      <input
        id="urlInput"
        type="text"
        width="148"
        height="148"
        onChange={props.onUrlChange}
        value={props.url}
      ></input>
    </label>
    <ImageUploader
      key="image-uploader"
      withIcon={true}
      singleImage={true}
      withPreview={true}
      label="Maximum size file: 10MB"
      buttonText="Choose an image"
      onChange={props.onImage}
      imgExtension={[".jpg", ".png", ".jpeg"]}
      maxFileSize={10242880}
    ></ImageUploader>
  </form>
);

const App = () => {
  const [progress, setProgress] = useState("getUpload");
  const [url, setImageURL] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");

  const onUrlChange = (e) => {
    setImageURL(e.target.value);
  };

  const onImage = async (failedImages, successImages) => {
    if (!url) {
      console.log("missing Url");
      setErrorMessage("missing a url to upload to");
      setProgress("uploadError");
      return;
    }

    setProgress("uploading");

    try {
      console.log("successImages", successImages);
      const parts = successImages[0].split(";");
      const mime = parts[0].split(":")[1];
      const name = parts[1].split("=")[1];
      const data = parts[2];
      const res = await Axios.post(url, { mime, name, image: data });

      setImageURL(res.data.imageURL);
      setProgress("uploaded");
    } catch (error) {
      console.log("error in upload", error);
      setErrorMessage(error.message);
      setProgress("uploadError");
    }
  };

  const content = () => {
    switch (progress) {
      case "getUpload":
        return (
          <UploadComponent
            onUrlChange={onUrlChange}
            onImage={onImage}
            url={url}
          />
        );
      case "uploading":
        return <h2>Uploading....</h2>;
      case "uploaded":
        return (
          <div>
            {url} <br /> <img src={url} alt="uploaded" />
          </div>
        );
      case "uploadError":
        return (
          <>
            <div>Error message = {errorMessage}</div>
            <UploadComponent
              onUrlChange={onUrlChange}
              onImage={onImage}
              url={url}
            />
          </>
        );
    }
  };

  return (
    <div style={{ backgroundColor: "grey" }} className="App">
      <br />
      <br />
      <h1>AWS Serverless Image Upload</h1>
      <br />
      <br />
      {content()}
    </div>
  );
};

export default App;
