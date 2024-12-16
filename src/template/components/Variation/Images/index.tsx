import { ArrowLeftOutlined, ArrowRightOutlined, PlayCircleFilled } from '@ant-design/icons';
import { Image } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';
import 'swiper/swiper.scss';

import { ProductVariationFiles } from '@src/model/Variation.model';

type Props = { images: ProductVariationFiles[]; onChange: (id: number) => void };

export const VariationImages: React.FC<Props> = ({ images = [], onChange }) => {
  const swiperRef = useRef(null);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [wholeImages, setWholeImages] = useState<ProductVariationFiles[]>(images);

  const params = {
    slidesPerView: 4,
    spaceBetween: 30,
    centeredSlides: true,
  };

  useEffect(() => {
    if (images) {
      setWholeImages(images);
      setActiveImage(images[0]);
    }
  }, [images]);

  const handleClick = (image: ProductVariationFiles) => {
    setActiveImage(image);
    onChange(image.variationId);
  };

  const ImageOrVideoRenderer: React.FC<{ image: ProductVariationFiles }> = ({ image }) => {
    switch (image.type) {
      case 'media':
        return (
          <video autoPlay controls style={{ height: 'auto' }}>
            <source src={image.link} type="video/mp4"></source>
            Your browser does not support the video tag.
          </video>
        );
      case 'youtube':
        return (
          <iframe
            style={{ width: '100%', height: '100%' }}
            src={'https://www.youtube.com/embed/' + image.link.split('v=')[1] + '?autoplay=1'}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          />
        );

      default:
        return <Image src={image.link} alt={image.title} preview={{ mask: false }} />;
    }
  };

  return (
    <MainContainer>
      <ImageContainer>
        <div className="phone-slider">
          <Swiper>
            {wholeImages.map((image, index) => (
              <div className="phone-image" key={`product-image-${index}`}>
                <ImageOrVideoRenderer image={image} />
              </div>
            ))}
          </Swiper>
        </div>
        <div className="main-image">
          <ImageOrVideoRenderer image={activeImage} />
        </div>

        {images.length !== 0 && (
          <div className="image-slider">
            <div className="actions">
              <div className="prev" onClick={() => (swiperRef as any).current.swiper.slidePrev()}>
                <ArrowLeftOutlined style={{ fontSize: '24px' }} />
              </div>
              <div className="next" onClick={() => (swiperRef as any).current.swiper.slideNext()}>
                <ArrowRightOutlined style={{ fontSize: '24px' }} />
              </div>
            </div>

            <Swiper ref={swiperRef} {...params}>
              {wholeImages.map((image, index) => (
                <div className="single-slide" key={`product-image-${index}`} onClick={() => handleClick(image)}>
                  {image.type === 'media' || image.type === 'youtube' ? (
                    <PlayCircleFilled />
                  ) : (
                    <img src={image.link} alt={image.title} />
                  )}
                  <img src={image.link} alt={image.title} />
                </div>
              ))}
            </Swiper>
          </div>
        )}
      </ImageContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div``;

const ImageContainer = styled.div`
  flex: 1 1 auto;

  & .main-image {
    border: 1px solid #b8bed3;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;

    @media (max-width: 640px) {
      display: none;
    }

    & video,
    & iframe {
      width: 100%;
    }

    & .ant-image {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      & img {
        width: 95%;
        height: 95%;
        object-fit: contain;
      }
    }
  }

  & .phone-slider {
    display: none;
    border: 1px solid #b8bed3;
    margin-bottom: 16px;

    @media (max-width: 640px) {
      display: block;
    }

    & .phone-image {
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 640px) {
        height: 350px;
      }

      @media (max-width: 330px) {
        height: 250px;
      }

      & img {
        width: 80%;
        height: 80%;
        object-fit: contain;
      }
    }
  }

  & .image-slider {
    position: relative;
    padding: 32px 0;

    @media (max-width: 640px) {
      display: none;
    }

    & .single-slide {
      height: 90px;
      position: relative;
      border: 1px solid #b8bed3;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      overflow: hidden;

      & img {
        width: 95%;
        height: 95%;
        object-fit: contain;
      }
    }

    & .actions {
      & .prev,
      & .next {
        width: 50px;
        height: 90px;
        display: flex;
        opacity: 0.4;
        cursor: pointer;
        z-index: 3;
        position: absolute;
        align-items: center;
        justify-content: center;
      }

      & .next {
        color: #fff;
        right: 0;
        border-radius: 0 4px 4px 0;
        background: ${(props) => props.theme.colors.secondary};
      }

      & .prev {
        color: #fff;
        left: 0;
        border-radius: 4px 0 0 4px;
        background: ${(props) => props.theme.colors.secondary};
      }
    }
  }
`;
