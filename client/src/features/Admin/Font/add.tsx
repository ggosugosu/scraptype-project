import { grey_150 } from 'common/colors';
import Form from 'components/Form';
import Grid from 'components/Grid';
import { GridDivider, GridLayout } from 'components/Grid/style';
import InputText from 'components/InputText';
import InputTextArea from 'components/InputTextArea';
import Radio from 'components/Radio';
import React, { useState } from 'react';
import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  flex-flow: column wrap;
  flex: 1 1 50%;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default function AddFont() {
  const [font, setFont] = useState<string>('');
  const [corporation, setCorporation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };
  const handleCorporationChange = (e) => {
    setCorporation(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };
  return (
    <Form isGrey={true} onSubmit={handleSubmit}>
      <Grid gap={`36px 22px`} padding={`36px 24px`}>
        <GridLayout>
          <label htmlFor="name">
            Font name<span>*</span>
          </label>
          <InputText id="name" placeholder="text" value={font} onChange={handleFontChange} />
        </GridLayout>
        <GridLayout>
          <label>
            Corporation<span>*</span>
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
        <GridLayout>
          <Radio>
            <input type="radio" name="fontType" id="webFont" value="web" defaultChecked={true}/>
            <label htmlFor="webFont">
              웹 폰트
            </label>
          </Radio>
          <Radio>
            <input type="radio" name="fontType" id="imageFont" value="image" />
            <label htmlFor="imageFont">
              이미지 폰트
            </label>
          </Radio>
        </GridLayout>
      </Grid>
    </Form>
  );
}
