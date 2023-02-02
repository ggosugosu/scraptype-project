import React, { useState } from 'react';

const enum UploadType {
  UNIT = 'unit',
  TITLE = 'title',
  DETAIL_DESKTOP = 'detail_desktop',
  DETAIL_MOBILE = 'detail_mobile'
}

function Index(props) {
  const [image, setImage] = useState<Blob>();
  const [createObjectURL, setCreateObjectURL] = useState<string>();

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file: Blob = event.target.files[0];
      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
  };

  const uploadToServer = async (event) => {
    if (!image) {
      return;
    }
    const body = new FormData();
    console.log("file", image)

    body.append("file", image);
    body.append("type", UploadType.TITLE);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
    alert(response.status);
  };

  return (
    <div>
      <form>
        <img src={createObjectURL}/>
        <h4>Select Image</h4>
        <input type="file" name="myImage" onChange={uploadToClient}/>
        <button
          className="btn btn-primary"
          type="button"
          onClick={uploadToServer}
        >
          Send to server
        </button>
      </form>
    </div>
  );
}

export default Index;