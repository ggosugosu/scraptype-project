import { useQuery } from '@apollo/client';
import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import { useEffect, useMemo, useState } from 'react';
import { GET_FONT_BY_FONT_ID } from './gql';
import ImageFont from './ImageFont';
import WebFont from './WebFont';

type Props = {
  font_id: string;
};

type FormData = {
  name: string;
  corporation?: string;
  description?: string;
  isWebFont: boolean;
  webFontData: WebFontData;
  imageFontData: ImageFontData;
};

type WebFontData = {
  source: string
}

type ImageFontData = {
  title: string;
  unit: string;
  detailMob: string;
  detailPc: string;
}

const FontForm = ({ font_id }: Props) => {
  const { data } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id: Number(font_id) } });
  const isCreate = useMemo(() => font_id === 'create', [font_id]);
  const [font, setFont] = useState<string>('');
  const [corporation, setCorporation] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isWebFont, setIsWebFont] = useState<boolean>(true);

  useEffect(() => {
    if (isCreate) return;
    setFont(data?.getFontByFontId.name);
    setCorporation(data?.getFontByFontId.corportation);
    setDescription(data?.getFontByFontId.description);
    setIsWebFont(data?.getFontByFontId.isWebFont);
  }, [data]);

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
    <section>
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
              <input type="radio" name="fontType" id="webFont" value="true" checked={isWebFont} onChange={() => handleFontType(true)} />
              <label htmlFor="webFont">웹 폰트</label>
            </Radio>
            <Radio>
              <input type="radio" name="fontType" id="imageFont" value="false" checked={!isWebFont} onChange={() => handleFontType(false)} />
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
    </section>
  );
};

export default FontForm;
