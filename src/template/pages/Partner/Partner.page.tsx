import { Template } from '@src/model/Template.model';
import TemplateService from '@src/service/Template.service';
import { Loader } from '@src/shared/components';
import React, { useEffect, useState } from 'react';

import Styles from './styles/Partner.style';

const HomePage: React.FC = () => {
  const [isPending, setPending] = useState<boolean>(false);
  const [partner, setPartner] = useState<Template>();

  useEffect(() => {
    setPending(true);
    // TODO: Use Controller Instead
    TemplateService.getCustomTemplate('partner_page')
      .then((partner) => setPartner(partner))
      .finally(() => setPending(false));
  }, []);

  if (isPending) return <Loader />;
  return (
    <Styles.Container>
      <div dangerouslySetInnerHTML={{ __html: partner?.body ?? '' }}></div>
    </Styles.Container>
  );
};

export default HomePage;
