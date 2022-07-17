import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

export default function AddFont() {
  const [font, setFont] = useState<string>('');
  const [corporation, setCorporation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isWebFont, setIsWebFont] = useState<boolean>(true);

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };
  const handleCorporationChange = (e) => {
    setCorporation(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFontType = (isWebFont: boolean) => {
    setIsWebFont(isWebFont);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };
  return (
    <Form isGrey={true} onSubmit={handleSubmit}>
      <Grid gap={`36px 22px`} padding={`36px 24px`}>
        <GridLayout>
          <label htmlFor="name">
            Font name<span className="required"> *</span>
          </label>
          <InputText id="name" placeholder="text" value={font} onChange={handleFontChange} />
        </GridLayout>
        <GridLayout>
          <label>
            Corporation<span className="required"> *</span>
          </label>
          <InputText placeholder="text" value={corporation} onChange={handleCorporationChange} />
        </GridLayout>
        <GridLayout row={`1 / span 2`} column={`2 / span 1`}>
          <label htmlFor="description">Memo</label>
          <InputTextArea id="description" placeholder="text" value={description} onChange={handleDescriptionChange} />
        </GridLayout>
      </Grid>
      <GridDivider />
      <Grid gap={`36px 22px`} padding={`36px 24px`}>
        <GridLayout column={`span 2`}>
          <label>
            어떤 유형의 폰트를 추가하시겠습니까?<span className="required"> *</span>
          </label>
          <Radio>
            <input type="radio" name="fontType" id="webFont" value="true" defaultChecked={true} checked={isWebFont} onClick={() => handleFontType(true)} />
            <label htmlFor="webFont">웹 폰트</label>
          </Radio>
          <Radio>
            <input type="radio" name="fontType" id="imageFont" value="false" checked={!isWebFont} onClick={() => handleFontType(false)} />
            <label htmlFor="imageFont">이미지 폰트</label>
          </Radio>
        </GridLayout>
      </Grid>
      <GridDivider />
      {isWebFont ? <WebFont /> : <ImageFont />}
      <GridDivider />
      <Grid template={`1fr`} padding={`36px 24px 56px 24px`}>
        <ButtonPositive enabled={true} text={`폰트 추가`} onClick={() => {}} />
      </Grid>
    </Form>
  );
}

const WebFont = () => {
  const [fontFace, setFontFace] = useState<string>();

  const handleFontFaceChange = (e) => {
    setFontFace(e.target.value);
  };

  return (
    <Grid gap={`36px 22px`} padding={`36px 24px`}>
      <GridLayout column={`1 / span 2`}>
        <label>
          Font face <span className="required"> *</span>
        </label>
        <InputTextArea id="fontFace" placeholder="text" value={fontFace} height={`188px`} onChange={handleFontFaceChange} />
      </GridLayout>
    </Grid>
  );
};

type ImageFontItem = {
  name: string;
  description: string;
  value: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ImageFont = () => {
  const [unit, setUnit] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [detailP, setDetailP] = useState<string>();
  const [detailM, setDetailM] = useState<string>();

  const handleChange = useCallback((e, func: React.Dispatch<React.SetStateAction<string | undefined>>) => {
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
