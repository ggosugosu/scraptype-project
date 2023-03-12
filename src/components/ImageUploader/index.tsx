import { ImageContainer, InputFileContainer } from 'components/ImageUploader/style';
import React, { useState } from 'react';

export const enum UploadType {
  UNIT = 'unit',
  TITLE = 'title',
  DETAIL_DESKTOP = 'detail_desktop',
  DETAIL_MOBILE = 'detail_mobile'
};

const getExtension = (uploadType: UploadType) => {
  return uploadType === UploadType.UNIT ? 'svg' : 'jpeg';
};

const getAcceptExtension = (uploadType: UploadType) => {
  return uploadType === UploadType.UNIT ? 'svg+xml' : 'jpeg';
};

type ImageUploaderProps = {
  fontId: string;
  type: UploadType;
}

function ImageUploader({fontId, type}: ImageUploaderProps) {
  const [createObjectURL, setCreateObjectURL] = useState<string>(`${process.env.NEXT_PUBLIC_S3_CDN_URL}/${fontId}_${type}.${getExtension(type)}`);
  const [isLoading, setLoading] = useState<boolean>(false);

  const uploadToClient = async (event) => {
    setLoading(true);
    if (event.target.files && event.target.files[0]) {
      const file: Blob = event.target.files[0];

      const maxSize = 1 * 1024 * 1024;
      const fileSize = file.size;

      if (fileSize > maxSize) {
        alert('1MB 사이즈로만 추가 가능합니다. 늘리고 싶다면 담덕에게 문의');

        setLoading(false);
        return;
      }

      await uploadToServer(file);
      setLoading(false);

      setCreateObjectURL(URL.createObjectURL(file));
    }
    setLoading(false);
  };

  const uploadToServer = async (file: Blob) => {
    if (!file) {
      return;
    }

    const body = new FormData();
    body.append('id', fontId);
    body.append('file', file);
    body.append('type', type);
    body.append('extension', getExtension(type));
    console.log('body', body);

    await fetch('/api/upload', {
      method: 'POST',
      body
    });
  };

  return (
    <div>
      <h4 className={'hidden'}>이미지 선택</h4>
      <InputFileContainer type="file" name="myImage" onChange={uploadToClient}
                          accept={`image/${getAcceptExtension(type)}`} />
      <div>
        {
          isLoading ? <Loading /> : <ImageContainer src={createObjectURL} />

        }
      </div>
    </div>
  );
}

const Loading = () => {
  return <span>자동 저장 중...</span>;
};

export default ImageUploader;