import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { TextArea } = Input;

export const CommentInput: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Form>
      <CommentInputContainer>
        <Form.Item noStyle name="description">
          <TextArea placeholder={t('Product.CommentPlaceholder')} bordered={false} rows={4} />
        </Form.Item>
        <SubmitButton loading={false} htmlType="submit">
          {t('Product.Submit')}
        </SubmitButton>
      </CommentInputContainer>
    </Form>
  );
};

const CommentInputContainer = styled.div`
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px 8px 20px;
`;

const SubmitButton = styled(Button)`
  align-self: flex-end;
  margin-left: 5px;
`;
