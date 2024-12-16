import { Button, Col, Form, Input, Row, Space, Tooltip, Typography } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MainSelector from '@src/logic/Main/store/Main.selector';
import SocialMediaSelector from '@src/logic/SocialMedia/store/SocialMedia.selector';
import { InlineSvg } from '@src/shared/components';

import Styles from './Footer.style';

type PolicyType = { title: string; link: string };

export default function Footer(): ReactElement {
  const { t } = useTranslation();
  const { item: config } = useSelector(MainSelector.getConfigsData);
  const { items: socialMedias, isPending } = useSelector(SocialMediaSelector.getSocialMedias);

  const [isFocused, setIsFocused] = useState(false);

  const isNewsletterBoxHidden = true;

  const Policies: PolicyType[] = [
    {
      title: t('Footer.ReturnPolicy'),
      link: '/legals/returns_and_replacements',
    },
    {
      title: t('Footer.Terms'),
      link: '/legals/term_conditions',
    },
    {
      title: t('Footer.LegalDisclosure'),
      link: '/legals/legal_disclosure',
    },
    {
      title: t('Footer.PrivacyPolicy'),
      link: '/legals/privacy_policy',
    },
    {
      title: t('Footer.ReturnForms'),
      link: '/legals/return_forms',
    },
    {
      title: t('Footer.DeliveryPolicy'),
      link: '/legals/delivery_policy',
    },
    {
      title: t('Footer.PaymentPolicy'),
      link: '/legals/payment_policy',
    },
  ];

  return (
    <Styles.MainContainer>
      <div className="title">
        <Typography.Title>Cleafin</Typography.Title>
      </div>
      <div className="pictures">
        <Row>
          {Array.from(new Array(5)).map((_, index) => (
            <Col key={`footer-image${index}`}>
              <img src={`/assets/images/footer/pic${index + 1}.png`} alt={`Footer-Image-${index + 1}`} />
            </Col>
          ))}
        </Row>
      </div>

      {!isNewsletterBoxHidden && (
        <div className="news-letter">
          <InlineSvg src="/global/news-letter.svg" width={53} height={53} />
          <Typography.Title className="news-letter-big-title">First Know Special Offers</Typography.Title>
          <Typography.Title className="news-letter-big-title-hint">Enter Email</Typography.Title>
          <Form style={{ marginTop: 30 }}>
            <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
              <Input
                className="news-letter-input"
                placeholder="E-Mail Adresse"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                suffix={
                  <Button type={'text'} htmlType="submit" className={isFocused ? 'news-letter-active' : ''}>
                    <span>Subscribe</span>
                  </Button>
                }
              />
            </Form.Item>
          </Form>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column-reverse' }}>
        <Row style={{ width: '80%', marginTop: '24px', marginBottom: '64px' }} gutter={[32, 16]}>
          <Col xs={{ span: 24, order: 3 }} md={{ span: 6, order: 1 }}>
            <div style={{ marginBottom: 16 }}>
              <img src={`/assets/images/footer/logo.png`} width={172} height={86} />
            </div>

            <Typography.Text>
              {config?.saleSystem.company_name} - {config?.saleSystem.partner}
            </Typography.Text>
            <br />
            <Typography.Text>
              {config?.saleSystem.street} - {config?.saleSystem.house_number}
            </Typography.Text>
            <br />
            <Typography.Text>
              {config?.saleSystem.postal_code} - {config?.saleSystem.city}
            </Typography.Text>
            <br />
            <Typography.Text>{config?.saleSystem.country}</Typography.Text>
            <br />
            <Typography.Text>
              <a style={{ color: 'white' }} href={'tel:' + config?.saleSystem.phone}>
                {config?.saleSystem.phone}
              </a>
              <br />
              <a style={{ color: 'white' }} href={'mailto:' + config?.saleSystem.email}>
                {config?.saleSystem.email}
              </a>
            </Typography.Text>
            <br />
            <br />
            <Space style={{ marginTop: '4px' }}>
              {!isPending &&
                socialMedias.map(({ url, name, icon_url }, index) => (
                  <Tooltip key={`social-${index}`} title={name}>
                    <a href={url} target={'_blank'} referrerPolicy="no-referrer">
                      <img src={icon_url} width={32} />
                    </a>
                  </Tooltip>
                ))}
            </Space>
          </Col>

          <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} style={{ marginTop: '32px' }}>
            <Link to="/">
              <Typography.Text>{t('Footer.Start')}</Typography.Text>
            </Link>
            <br />
            <Link to="/category">
              <Typography.Text>{t('Footer.AllProducts')}</Typography.Text>
            </Link>
            <br />
            <Link to="/category?ids=58">
              <Typography.Text>{t('Footer.CleafinOffers')}</Typography.Text>
            </Link>
            <br />
            <Link to="/category">
              <Typography.Text>{t('Footer.ProductWorld')}</Typography.Text>
            </Link>
          </Col>

          <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 3 }} style={{ marginTop: '32px' }}>
            {Policies.map((policy, index) => (
              <div key={`policy-${index}`}>
                <Link to={policy.link}>
                  <Typography.Text>{policy.title}</Typography.Text>
                </Link>
              </div>
            ))}
          </Col>
          <Col xs={{ span: 24, order: 4 }} md={{ span: 6, order: 4 }} style={{ marginTop: '32px' }}>
            <div className="impression">
              <Typography.Text>
                {localStorage.getItem('lang') === 'en' ? 'English' : 'Deutsch'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography.Text>
            </div>
            <Space>
              <img src={`/assets/images/footer/s1-image.png`} width={64} style={{ marginTop: '24px' }} />
              <img src={`/assets/images/footer/s2-image.png`} width={64} style={{ marginTop: '24px' }} />
              <img src={`/assets/images/footer/s3-image.png`} width={64} style={{ marginTop: '24px' }} />
            </Space>
          </Col>
        </Row>
      </div>
    </Styles.MainContainer>
  );
}
