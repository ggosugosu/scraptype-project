import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import InputTextArea from 'components/InputTextArea';
import { useEffect, useMemo, useState } from 'react';
import { ImageFontData } from './FontForm';

type Props = {
  data: ImageFontData;
  onSubmit: (data: ImageFontData) => void;
};

type ImageFontItem = {
  name: string;
  description: string;
  value: string | undefined;
};

const ImageFont = ({ data, onSubmit }: Props) => {
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
        name: 'unit',
        description: '( Unit / 90 x 90 )',
        value: formData?.unit,
      },
      {
        name: 'title',
        description: '( Title / Hug x 108 )',
        value: formData?.title,
      },
      {
        name: 'detailPc',
        description: '( Detail View Contents / PC / JPG )',
        value: formData?.detailPc,
      },
      {
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
          <InputTextArea id={item.name} placeholder="text" value={data[item.name] || item.value} height={`188px`} onChange={(e) => handleChange(e)} />
        </GridLayout>
      ))}
    </Grid>
  );
};

export default ImageFont;
