import React from 'react';

import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import ImageUploader, { UploadType } from 'components/ImageUploader';
import { ImageFontData } from 'features/Admin/Font/Form/FontForm';

type Props = {
  fontId: string;
  onSubmit: (data: ImageFontData) => void;
};

type ImageFontItem = {
  type: UploadType;
  name: string;
  description: string;
};

const ImageFont = ({fontId}: Props) => {
  const imageFontItems: ImageFontItem[] =
    [
      {
        type: UploadType.UNIT,
        name: 'Unit',
        description: '( 90 x 90 / 1MB / SVG)',
      },
      {
        type: UploadType.TITLE,
        name: 'Title',
        description: '(Hug x 108 / 1MB / JPEG)',
      },
      {
        type: UploadType.DETAIL_DESKTOP,
        name: 'Detail View Contents - PC',
        description: '( PC / 1MB / JPEG )',
      },
      {
        type: UploadType.DETAIL_MOBILE,
        name: 'Detail View Contents - Mobile',
        description: '( MOBILE / 1MB / JPEG )',
      },
    ];

  return (
    <Grid gap={'36px 22px'} padding={'36px 24px'}>
      {imageFontItems.map((item) => (
        <GridLayout key={item.name}>
          <label htmlFor={item.name}>
            {item.name} <span>{item.description}</span>
            <span className="required"> *</span>
          </label>
          <ImageUploader fontId={fontId} type={item.type} />
        </GridLayout>
      ))}
    </Grid>
  );
};

export default ImageFont;
