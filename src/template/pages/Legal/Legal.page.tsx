import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { dispatch } from '@src/core/Configs/StoreConfiguration';
import LegalController from '@src/logic/Legal/controller/Legal.controller';
import { scrollToTop } from '@src/shared/utils/engine.service';
import LegalsContainer from '@src/template/containers/Legal/LegalsContainer';

import Styles from './styles/Legal.style';

function LegalPage(): ReactElement {
  const { id } = useParams();

  useEffect(() => {
    id && dispatch(LegalController.getLegalsForLegalConditions(id));
    scrollToTop();
  }, [id]);

  return (
    <Styles.MainContainer>
      <LegalsContainer />
    </Styles.MainContainer>
  );
}

export default LegalPage;
