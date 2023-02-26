import React, { ReactNode } from 'react';
import { RadioStyle } from 'components/Radio/style';

type Props = {
  children?: ReactNode;
};
export default function Radio({children}: Props) {
  return <RadioStyle>{children}</RadioStyle>;
}
