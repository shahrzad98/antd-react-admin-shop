import { Skeleton } from 'antd';
import React, { ReactElement } from 'react';

import Styles from './styles/ProductSkeleton.style';

export default function ProductSkeleton(): ReactElement {
  return (
    <Styles.MainContainer>
      <div className="image">
        <Skeleton.Image />
      </div>

      <div className="content">
        <Skeleton paragraph={{ rows: 5 }} />
      </div>
    </Styles.MainContainer>
  );
}
