import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VariationController from '@logic/Product/controller/Variation.Controller';
import ProductSelector from '@logic/Product/store/Product.selector';
import TemplateController from '@logic/Template/controller/Template.controller';

import BeforeAfter from '../../components/BeforeAfterBox/BeforeAfter';
import HeroHeader from '../../components/HeroHeader/HeroHeader';
import LandingText from '../../containers/Home/LandingText';
import ProductSlider from '../../containers/Home/ProductSlider';
import Styles from './styles/Home.style';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { items: variations, isPending } = useSelector(ProductSelector.getMainVariations);

  useEffect(() => {
    dispatch(TemplateController.getTemplatesForLanding());
    dispatch(VariationController.getVariationsForMainSlider());
  }, []);

  return (
    <Styles.Container>
      <HeroHeader />

      <LandingText />

      <BeforeAfter />

      <ProductSlider isPending={isPending} variations={variations} />

      {/* <Row>
        <Col xs={24} sm={24} md={12}>
          <Link to={'/category'}>
            <img
              width="100%"
              height="100%"
              alt="first-suggestion"
              src={require('@src/assets/images/temp/mainFirstSuggestion.png')}
            />
          </Link>
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Link to={'/category'}>
            <img
              width="100%"
              height="100%"
              alt="second-suggestion"
              src={require('@src/assets/images/temp/mainSecondSuggestion.png')}
            />
          </Link>
        </Col>
      </Row> */}
    </Styles.Container>
  );
};

export default HomePage;
