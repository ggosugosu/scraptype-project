import React, { useRef, useState } from 'react';

export const enum UploadType {
  UNIT = 'unit',
  TITLE = 'title',
  DETAIL_DESKTOP = 'detail_desktop',
  DETAIL_MOBILE = 'detail_mobile'
};

type ImageUploaderProps = {
  fontId: string;
  type: UploadType;
}

function ImageUploader({fontId, type}: ImageUploaderProps) {
  const [image, setImage] = useState<Blob>();
  const [createObjectURL, setCreateObjectURL] = useState<string>(`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${fontId}_${type}.png`);
  const [isLoading, setLoading] = useState<boolean>(false);

  const uploadToClient = async (event) => {
    setLoading(true);
    if (event.target.files && event.target.files[0]) {
      const file: Blob = event.target.files[0];

      await uploadToServer(file);
      setLoading(false);

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
    }
    setLoading(false);
  };

  const uploadToServer = async (file: Blob) => {
    if (!file) {
      return;
    }

    const body = new FormData();
    body.append("id", fontId);
    body.append("file", file);
    body.append("type", type);

    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });

    alert(response.status);
  };

  return (
    <div>
      <h4>Select Image</h4>
      <input type="file" name="myImage" onChange={uploadToClient}/>
      <div>
        {
          isLoading ? <Loading/> : <img src={createObjectURL} onError={() => setCreateObjectURL('')}/>
        }
      </div>
    </div>
  );
}

const Loading = () => {
  return <span>자동 저장 중...</span>
}

export default ImageUploader;