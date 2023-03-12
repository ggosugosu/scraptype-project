import { useMutation, useQuery } from '@apollo/client';
import { ButtonPositive } from 'components/Button';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import {
  CREATE_IMAGE_FONT,
  CREATE_WEB_FONT,
  DELETE_FONT,
  GET_FONT_BY_FONT_ID,
  UPDATE_IMAGE_FONT,
  UPDATE_WEB_FONT,
} from 'features/Admin/Font/Form/gql';
import ImageFont from 'features/Admin/Font/Form/ImageFont';
import { DeleteFontBtnStyle } from 'features/Admin/Font/Form/style';
import WebFont from 'features/Admin/Font/Form/WebFont';
import { NextRouter, useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

type Props = {
  font_id: string;
};

type FormData = {
  name: string;
  corporation: string;
  description: string;
  isWebFont: boolean;
  webFont: WebFontData;
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
  name: '',
  corporation: '',
  description: '',
  isWebFont: true,
  webFont: {source: ''},
};

const completeFunc = (router: NextRouter) => {
  alert('정상적으로 처리되었습니다!');
  router.push('/admin/font');
};

const failFunc = () => alert('오류가 발생했습니다. 잠시 후 다시 시도하세요.');

export const DeleteFontButton = ({font_id}: Props) => {
  const router = useRouter();
  const [deleteFont] = useMutation(DELETE_FONT);

  // create 일 때는 보이지 않음.
  const handleClick = useCallback(async () => {
    const confirmed = confirm('삭제하시겠습니까? 삭제는 되돌릴 수 없어용');
    if (!confirmed) return;

    await deleteFont({
      variables: {font_id: Number(font_id)},
      onCompleted: (data) => {
        if (data) {
          completeFunc(router);
        }
      },
      onError: () => {
        alert('정상적이지 않은 접근 방식입니다. 관리자에게 문의 주세욤');
      },
    });
  }, []);
  return (
    <DeleteFontBtnStyle onClick={handleClick}>폰트 삭제</DeleteFontBtnStyle>
  );
};
const FontForm = ({font_id}: Props) => {
  const router = useRouter();
  const {data} = useQuery(GET_FONT_BY_FONT_ID, {
    variables: {font_id: Number(font_id)},
  });
  const isCreate = useMemo(() => font_id === 'create', [font_id]);
  const [formData, setFormData] = useState<FormData>(initFontForm);
  const [createWebFont] = useMutation(CREATE_WEB_FONT);
  const [updateWebFont] = useMutation(UPDATE_WEB_FONT);
  const [createImageFont] = useMutation(CREATE_IMAGE_FONT);
  const [updateImageFont] = useMutation(UPDATE_IMAGE_FONT);

  useEffect(() => {
    if (isCreate || !data) return;
    const font = data.getFontByFontId;
    console.log(JSON.stringify(font));

    setFormData({
      name: font?.name,
      corporation: font?.corporation,
      description: font?.description,
      isWebFont: font?.is_web_font,
      webFont: font?.webFont,
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
    else if (formData.isWebFont && !formData.webFont.source)
      return alert('font-face를 입력하세요.');
    

    const fontFormat = {
      name: formData.name,
      description: formData.description,
      corporation: formData.corporation,
      is_web_font: formData.isWebFont,
    };

    if (isCreate) {
      formData.isWebFont
        ? createWebFont({
          variables: {...fontFormat, source: formData.webFont.source},
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
            ...fontFormat,
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
          variables: {
            ...fontFormat,
            font_id: Number(font_id),
            source: formData.webFont.source,
          },
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
            font_id: Number(font_id),
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
        <Grid gap={'36px 22px'} padding={'36px 24px'}>
          <GridLayout>
            <label htmlFor="name">
              Font name<span className="required"> *</span>
            </label>
            <InputText
              id="name"
              placeholder="text"
              value={formData.name}
              onChange={handleTextChange}
            />
          </GridLayout>
          <GridLayout>
            <label htmlFor="corporation">
              Corporation<span className="required"> *</span>
            </label>
            <InputText
              id="corporation"
              placeholder="text"
              value={formData.corporation}
              onChange={handleTextChange}
            />
          </GridLayout>
          <GridLayout row={'1 / span 2'} column={'2 / span 1'}>
            <label htmlFor="description">Memo</label>
            <InputTextArea
              id="description"
              placeholder="text"
              value={formData.description}
              onChange={handleTextChange}
            />
          </GridLayout>
        </Grid>
        <GridDivider />
        <Grid gap={'36px 22px'} padding={'36px 24px'}>
          <GridLayout column={'span 2'}>
            <label>
              어떤 유형의 폰트를 추가하시겠습니까?
              <span className="required"> *</span>
            </label>
            <Radio>
              <input
                type="radio"
                name="isWebFont"
                id="webFont"
                value="true"
                checked={formData.isWebFont}
                onClick={() => handleIsWebFont(true)}
              />
              <label htmlFor="webFont">웹 폰트</label>
            </Radio>
            <Radio>
              <input
                type="radio"
                name="isWebFont"
                id="imageFont"
                value="false"
                checked={!formData.isWebFont}
                onClick={() => handleIsWebFont(false)}
              />
              <label htmlFor="imageFont">이미지 폰트</label>
            </Radio>
          </GridLayout>
        </Grid>
        <GridDivider />
        {formData.isWebFont ? (
          <WebFont
            data={formData.webFont}
            onSubmit={(data) =>
              handleFormData({...formData, isWebFont: true, webFont: data})
            }
          />
        ) : (
          <ImageFont
            fontId={font_id}
            onSubmit={() =>
              handleFormData({...formData, isWebFont: false})
            }
          />
        )}
        <GridDivider />
        <Grid template={'1fr'} padding={'36px 24px 56px 24px'}>
          <ButtonPositive type="submit" enabled={true} text={'폰트 추가'} />
        </Grid>
      </Form>
    </section>
  );
};

export default FontForm;
