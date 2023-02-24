import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import ImageUploader, { UploadType } from "components/ImageUploader";
import InputTextArea from 'components/InputTextArea';
import { useEffect, useMemo, useState } from 'react';
import { ImageFontData } from './FontForm';

type Props = {
  fontId: string;
  data: ImageFontData;
  onSubmit: (data: ImageFontData) => void;
};

type ImageFontItem = {
  type: UploadType;
  name: string;
  description: string;
  value: string | undefined;
};

const ImageFont = ({fontId, data, onSubmit}: Props) => {
  const [formData, setFormData] = useState<ImageFontData>(data);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const imageFontItems = useMemo(
    (): ImageFontItem[] => [
      {
        type: UploadType.UNIT,
        name: 'unit',
        description: '( Unit / 90 x 90 )',
        value: formData?.unit,
      },
      {
        type: UploadType.TITLE,
        name: 'title',
        description: '( Title / Hug x 108 )',
        value: formData?.title,
      },
      {
        type: UploadType.DETAIL_DESKTOP,
        name: 'detailPc',
        description: '( Detail View Contents / PC / JPG )',
        value: formData?.detailPc,
      },
      {
        type: UploadType.DETAIL_MOBILE,
        name: 'detailMob',
        description: '( Detail View Contents / MO / JPG )',
        value: formData?.detailMob,
      },
    ],
    [formData]
  );

  useEffect(() => {
    formData && onSubmit(formData);
  }, [formData]);

  return (
    <Grid gap={`36px 22px`} padding={`36px 24px`}>
      {imageFontItems.map((item) => (
        <GridLayout key={item.name}>
          <label htmlFor={item.name}>
            Image link <span>{item.description}</span>
            <span className="required"> *</span>
          </label>
          <ImageUploader fontId={fontId} type={item.type}/>
        </GridLayout>
      ))}
    </Grid>
  );
};

export default ImageFont;
