import { useQuery } from '@apollo/client';
import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { GET_FONT_BY_FONT_ID } from './gql';
import ImageFont from './ImageFont';
import WebFont from './WebFont';

type Props = {
  font_id: string;
};

type FormData = {
  name: string;
  corporation: string;
  description: string;
  isWebFont: boolean;
  webFont: WebFont;
  imageFont: ImageFont;
};

type WebFont = {
  source: string;
};

type ImageFont = {
  title: string;
  unit: string;
  detailMob: string;
  detailPc: string;
};

const initFontForm: FormData = {
  name: ``,
  corporation: ``,
  description: ``,
  isWebFont: true,
  webFont: { source: `` },
  imageFont: { title: ``, unit: ``, detailMob: ``, detailPc: `` },
};

const FontForm = ({ font_id }: Props) => {
  const { data } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id: Number(font_id) } });
  const isCreate = useMemo(() => font_id === 'create', [font_id]);
  const [formData, setFormData] = useState<FormData>(initFontForm);

  useEffect(() => {
    if (isCreate) return;
    const font = data?.getFontByFontId;
    const imageFont = font?.imageFont ?? ``;
    setFormData({
      name: font?.name,
      corporation: font?.corporation,
      description: font?.description,
      isWebFont: font?.isWebFont,
      webFont: font?.webFont?.source ?? ``,
      imageFont: { title: imageFont.title, unit: imageFont.unit, detailMob: imageFont.detail_mobile, detailPc: imageFont.detail_pc },
    });
  }, [data]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleIsWebFont = (isWebFont: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isWebFont,
    }));
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <section>
      <Form isGrey={true} onSubmit={handleSubmit}>
        <Grid gap={`36px 22px`} padding={`36px 24px`}>
          <GridLayout>
            <label htmlFor="name">
              Font name<span className="required"> *</span>
            </label>
            <InputText id="name" placeholder="text" value={formData.name} onChange={handleTextChange} />
          </GridLayout>
          <GridLayout>
            <label htmlFor="corporation">
              Corporation<span className="required"> *</span>
            </label>
            <InputText id="corporation" placeholder="text" value={formData.corporation} onChange={handleTextChange} />
          </GridLayout>
          <GridLayout row={`1 / span 2`} column={`2 / span 1`}>
            <label htmlFor="description">Memo</label>
            <InputTextArea id="description" placeholder="text" value={formData.description} onChange={handleTextChange} />
          </GridLayout>
        </Grid>
        <GridDivider />
        <Grid gap={`36px 22px`} padding={`36px 24px`}>
          <GridLayout column={`span 2`}>
            <label>
              어떤 유형의 폰트를 추가하시겠습니까?<span className="required"> *</span>
            </label>
            <Radio>
              <input type="radio" name="isWebFont" id="webFont" value="true" checked={formData.isWebFont} onClick={() => handleIsWebFont(true)} />
              <label htmlFor="webFont">웹 폰트</label>
            </Radio>
            <Radio>
              <input type="radio" name="isWebFont" id="imageFont" value="false" checked={!formData.isWebFont} onClick={() => handleIsWebFont(false)} />
              <label htmlFor="imageFont">이미지 폰트</label>
            </Radio>
          </GridLayout>
        </Grid>
        <GridDivider />
        {formData.isWebFont ? <WebFont /> : <ImageFont />}
        <GridDivider />
        <Grid template={`1fr`} padding={`36px 24px 56px 24px`}>
          <ButtonPositive enabled={true} text={`폰트 추가`} onClick={() => {}} />
        </Grid>
      </Form>
    </section>
  );
};

export default FontForm;
