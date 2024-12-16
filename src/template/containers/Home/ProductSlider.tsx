import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import React, { useRef } from 'react';
import Swiper, { ReactIdSwiperProps } from 'react-id-swiper';
import styled from 'styled-components';
import 'swiper/swiper.scss';

import { AppVariation } from '@src/model/Variation.model';
import { CardSkelton } from '@src/template/components/CardSkelton';
import { VariationCard } from '@src/template/components/Variation/Card';

const carouselParams: ReactIdSwiperProps = {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 16,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 16,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
};

type Props = {
  isPending: boolean;
  variations: AppVariation[];
};

export default function ProductSlider({ isPending, variations }: Props): JSX.Element {
  const swiperRef = useRef(null);

  return (
    <Row>
      <Col span={24}>
        <Container isEmpty={variations.length === 0 && !isPending}>
          {isPending ? (
            <Swiper {...carouselParams} ref={swiperRef}>
              {[1, 2, 3, 4].map((_, index) => (
                <div key={`slider-${index}`}>
                  <CardSkelton isVariation />
                </div>
              ))}
            </Swiper>
          ) : (
            <Slider>
              <div className="actions">
                <div className="prev" onClick={() => (swiperRef as any).current.swiper.slidePrev()}>
                  <ArrowLeftOutlined style={{ fontSize: '24px' }} />
                </div>
                <div className="next" onClick={() => (swiperRef as any).current.swiper.slideNext()}>
                  <ArrowRightOutlined style={{ fontSize: '24px' }} />
                </div>
              </div>

              <Swiper {...carouselParams} ref={swiperRef}>
                {variations.map((variation) => (
                  <div key={`Product-${variation.id}`}>
                    <VariationCard variation={variation} />
                  </div>
                ))}
              </Swiper>
            </Slider>
          )}
        </Container>
      </Col>
    </Row>
  );
}

const Container = styled.div<{ isEmpty: boolean }>`
  width: 100%;
  margin: 0 auto;
  max-width: 1300px;
  position: relative;
  padding: ${(props) => (props.isEmpty ? '0' : '48px 24px')};
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  padding: 0 32px;

  & .actions {
    top: 50%;
    width: calc(100% + 64px);
    height: 100%;
    right: -32px;
    display: flex;
    position: absolute;
    transform: translateY(-50%);
    justify-content: space-between;

    @media (max-width: 640px) {
      display: none;
    }

    & .prev,
    & .next {
      width: 60px;
      height: 100%;
      display: flex;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;
