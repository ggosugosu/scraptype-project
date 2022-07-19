import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import InputTextArea from 'components/InputTextArea';
import { useState } from 'react';

type Props = {
  fontFace?: string;
};

const WebFont = ({ fontFace: prevFace }: Props) => {
  const [fontFace, setFontFace] = useState<string>(prevFace ?? ``);

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

export default WebFont;
