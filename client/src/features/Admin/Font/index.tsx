import React, { useState } from 'react';
import AddFont from './add';
import EditFont from './edit';

export default function AdminFont() {
  const [isAddFont, setIsAddFont] = useState<boolean>(true);

  const handleClicked = (isAddFont: boolean) => setIsAddFont(isAddFont);
  return (
    <>
      <div>
        <button onClick={() => handleClicked(true)}>add font</button>
        <button onClick={() => handleClicked(false)}>edit font</button>
      </div>
      {isAddFont ? <AddFont /> : <EditFont />}
    </>
  );
}
