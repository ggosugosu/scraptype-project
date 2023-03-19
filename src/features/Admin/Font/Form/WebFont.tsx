import Grid from 'components/Grid';
import { GridLayout } from 'components/Grid/style';
import InputTextArea from 'components/InputTextArea';
import { useEffect, useState } from 'react';
import { WebFontData } from 'features/Admin/Font/Form/FontForm';

type Props = {
  data: WebFontData;
  onSubmit: (data: WebFontData) => void;
};

const WebFont = ({data, onSubmit}: Props) => {
  const [formData, setFormData] = useState<WebFontData>(data);

  const handleFontFaceChange = (e) => {
    setFormData({source: e.target.value});
  };

  useEffect(() => {
    formData && onSubmit(formData);
  }, [formData]);

  return (
    <Grid gap={'36px 22px'} padding={'36px 24px'}>
      <GridLayout column={'1 / span 2'}>
        <label>
          Font face <span className="required"> *</span>
        </label>
        <InputTextArea id="fontFace" placeholder="text" value={data?.source || formData?.source} height={'188px'}
                       onChange={handleFontFaceChange} />
      </GridLayout>
    </Grid>
  );
};

export default WebFont;
