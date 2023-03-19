import AddSVG from 'assets/images/ic_add.svg';
import ArchiveBarcodeSVG from 'assets/images/ic_archive_barcode.svg';
import { black, white } from 'common/colors';
import { ImageContainer, ImageEmptyUploader, InputFileContainer } from 'components/ImageUploader/style';
import { fill } from 'lodash-es';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

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
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
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
    body.append('contentType', `image/${getAcceptExtension(type)}`);
    console.log('body', body);

    await fetch('/api/upload', {
      method: 'POST',
      body
    });
  };

  return (
    <div>
      <h4 className={'hidden'}>이미지 선택</h4>
      <InputFileContainer ref={uploaderRef} type="file" name="myImage" onChange={uploadToClient}
                          onError={() => {
                            setError(true);
                          }}
                          accept={`image/${getAcceptExtension(type)}`} />
      <div>
        {
          error ? <ImageEmptyUploader onClick={() => {
              uploaderRef?.current?.click();
            }}>
              {
                isLoading ? <Loading /> :
                  <Image alt="button-add" src={AddSVG} width="36" height="36" className={'filter_main'} />
              }
            </ImageEmptyUploader> :
            <ImageContainer>
              <Image alt={'image'} src={createObjectURL} fill />
            </ImageContainer>
        }
      </div>
    </div>
  );
}

const Loading = () => {
  return <span>자동 저장 중...</span>;
};


export default ImageUploader;