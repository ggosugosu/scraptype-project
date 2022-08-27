import { useMutation, useQuery } from '@apollo/client';
import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import { NextRouter, useRouter } from 'next/router';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { CREATE_IMAGE_FONT, CREATE_WEB_FONT, GET_FONT_BY_FONT_ID, UPDATE_IMAGE_FONT, UPDATE_WEB_FONT } from './gql';
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
  webFont: WebFontData;
  imageFont: ImageFontData;
};

export type WebFontData = {
  source: string;
};

export type ImageFontData = {
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

const completeFunc = (router: NextRouter) => {
  alert('정상적으로 추가되었습니다!');
  router.push(`/admin/font`);
};

const failFunc = () => alert('오류가 발생했습니다. 잠시 후 다시 시도하세요.');

const FontForm = ({ font_id }: Props) => {
  const router = useRouter();
  const { data } = useQuery(GET_FONT_BY_FONT_ID, { variables: { font_id: Number(font_id) } });
  const isCreate = useMemo(() => font_id === 'create', [font_id]);
  const [formData, setFormData] = useState<FormData>(initFontForm);
  const [createWebFont] = useMutation(CREATE_WEB_FONT);
  const [updateWebFont] = useMutation(UPDATE_WEB_FONT);
  const [createImageFont] = useMutation(CREATE_IMAGE_FONT);
  const [updateImageFont] = useMutation(UPDATE_IMAGE_FONT);

  useEffect(() => {
    if (isCreate || !data) return;
    const font = data.getFontByFontId;
    const imageFont = font?.imageFont ?? ``;
    console.log(JSON.stringify(font));

    setFormData({
      name: font?.name,
      corporation: font?.corporation,
      description: font?.description,
      isWebFont: font?.is_web_font,
      webFont: font?.webFont,
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

  const handleFormData = (data: FormData) => {
    setFormData(data);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const confirmed = confirm('정보를 저장하시겠습니까?');
    if (!confirmed) return;

    // TODO: alert 대신 view로 수정
    if (formData.name === '') return alert('폰트 이름을 입력하세요.');
    else if (formData.corporation === '') return alert('폰트사를 입력하세요.');

    const fontFormat = {
      name: formData.name,
      description: formData.description,
      corporation: formData.corporation,
      is_web_font: formData.isWebFont,
    };

    console.log(JSON.stringify({ ...fontFormat, source: formData.webFont.source }));

    if (isCreate) {
      formData.isWebFont
        ? createWebFont({
            variables: { ...fontFormat, source: formData.webFont.source },
            onCompleted: (data) => {
              if (data) {
                completeFunc(router);
              }
            },
            onError: (error) => {
              console.log(error.message);
            },
          })
        : createImageFont({
            variables: {
              ...fontFormat,
              title: formData.imageFont.title,
              unit: formData.imageFont.unit,
              detail_mobile: formData.imageFont.detailMob,
              detail_pc: formData.imageFont.detailPc,
            },
            onCompleted: (data) => {
              if (data) {
                completeFunc(router);
              }
            },
          });
    } else {
      formData.isWebFont
        ? updateWebFont({
            variables: { ...fontFormat, font_id, source: formData.webFont.source },
            onCompleted: (data) => {
              if (data) {
                completeFunc(router);
              } else {
                failFunc;
              }
            },
          })
        : updateImageFont({
            variables: {
              ...fontFormat,
              font_id,
              title: formData.imageFont.title,
              unit: formData.imageFont.unit,
              detail_mobile: formData.imageFont.detailMob,
              detail_pc: formData.imageFont.detailPc,
            },
            onCompleted: (data) => {
              if (data) {
                completeFunc(router);
              } else {
                failFunc;
              }
            },
          });
    }
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
        {formData.isWebFont ? (
          <WebFont data={formData.webFont} onSubmit={(data) => handleFormData({ ...formData, isWebFont: true, webFont: data })} />
        ) : (
          <ImageFont data={formData.imageFont} onSubmit={(data) => handleFormData({ ...formData, isWebFont: false, imageFont: data })} />
        )}
        <GridDivider />
        <Grid template={`1fr`} padding={`36px 24px 56px 24px`}>
          <ButtonPositive enabled={true} text={`폰트 추가`} onClick={() => {}} />
        </Grid>
      </Form>
    </section>
  );
};

export default FontForm;
