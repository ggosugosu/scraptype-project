import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import InputTextArea from 'components/InputTextArea';
import { useState, useCallback, useMemo } from 'react';

type Props = {
  unit?: string;
  title?: string;
  detailP?: string;
  detailM?: string;
};

type ImageFontItem = {
  name: string;
  description: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const ImageFont = ({ unit: prevUnit, title: prevTitle, detailP: prevDetailP, detailM: prevDetailM }: Props) => {
  const [unit, setUnit] = useState<string>(prevUnit ?? ``);
  const [title, setTitle] = useState<string>(prevTitle ?? ``);
  const [detailP, setDetailP] = useState<string>(prevDetailP ?? ``);
  const [detailM, setDetailM] = useState<string>(prevDetailM ?? ``);

  const handleChange = useCallback((e, func: React.Dispatch<React.SetStateAction<string>>) => {
    func(e.target.value);
  }, []);

  const imageFontItems = useMemo(
    (): ImageFontItem[] => [
      {
        name: 'unit',
        description: '( Unit / 90 x 90 )',
        value: unit,
        setValue: setUnit,
      },
      {
        name: 'title',
        description: '( Title / Hug x 108 )',
        value: title,
        setValue: setTitle,
      },
      {
        name: 'detailP',
        description: '( Detail View Contents / PC / JPG )',
        value: detailP,
        setValue: setDetailP,
      },
      {
        name: 'detailM',
        description: '( Detail View Contents / MO / JPG )',
        value: detailM,
        setValue: setDetailM,
      },
    ],
    []
  );

  return (
    <Grid gap={`36px 22px`} padding={`36px 24px`}>
      {imageFontItems.map((item) => (
        <GridLayout key={item.name}>
          <label htmlFor={item.name}>
            Image link <span>{item.description}</span>
            <span className="required"> *</span>
          </label>
          <InputTextArea id={item.name} placeholder="text" value={item.value} height={`188px`} onChange={(e) => handleChange(e, item.setValue)} />
        </GridLayout>
      ))}
    </Grid>
  );
};

export default ImageFont;
