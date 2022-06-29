import InputText from 'components/InputText';
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
  return (
    <>
      <Row>
        <Column>
          <label>
            Font name<span>*</span>
          </label>
          <InputText placeholder="text" value={font} width={'fit-content'} onChange={handleFontChange} />
          <label>
            Corporation<span>*</span>
          </label>
          <InputText placeholder="text" value={corporation} width={'fit-content'} onChange={handleCorporationChange} />
        </Column>

        <Column>
          <label>Memo</label>
          <InputText placeholder="text" value={description} width={'fit-content'} onChange={handleDescriptionChange} />
        </Column>
      </Row>
    </>
  );
}
