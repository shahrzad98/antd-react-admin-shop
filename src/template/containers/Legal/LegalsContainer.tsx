import { Skeleton } from 'antd';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import LegalSelector from '@src/logic/Legal/store/Legal.selector';

import Styles from './styles/LegalContainer.style';

function LegalsContainer(): ReactElement {
  const { item: legal, isPending } = useSelector(LegalSelector.getLegal);

  const render = (child: JSX.Element) => {
    if (!isPending && legal) return child;
    else return <Skeleton paragraph={{ rows: 6 }} />;
  };

  return render(
    <Styles.MainContainer>
      <div dangerouslySetInnerHTML={{ __html: legal?.description || '' }} />
    </Styles.MainContainer>,
  );
}

export default LegalsContainer;
