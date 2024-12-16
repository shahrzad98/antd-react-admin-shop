import { Comment as AntComment, CommentProps, List, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Avatar from 'antd/lib/avatar/avatar';

import AuthSelector from '@src/core/Authentication/service/Auth.Selector';
import { AppVariation } from '@src/model/Variation.model';
import { getVariationComments } from '@src/service/Product.service';

import { CommentInput } from './CommentInput';

const { TabPane } = Tabs;

export const VariationDescription: React.FC<{ variation: AppVariation }> = ({ variation }) => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const isAuthenticated = useSelector(AuthSelector.isAuthenticated);

  useEffect(() => {
    if (variation) {
      handleComments();
    }
  }, [variation]);

  const handleComments = () => {
    getVariationComments(variation.id).then((data) => {
      const newComments: CommentProps[] = data.map((cm) => ({
        content: cm.description,
        author: cm.user.username,
        datetime: cm.created_at,
        avatar: <Avatar>{String(cm.user.username).charAt(0).toUpperCase()}</Avatar>,
      }));
      setComments(newComments);
    });
  };

  return (
    <Tabs defaultActiveKey="2">
      {comments.length !== 0 && (
        <TabPane tab="Review" key="1">
          {isAuthenticated && false && <CommentInput />}

          <List
            dataSource={comments}
            className="comment-list"
            itemLayout="horizontal"
            renderItem={(item: CommentProps) => (
              <li>
                <AntComment
                  actions={item.actions}
                  author={item.author}
                  avatar={item.avatar}
                  content={item.content}
                  datetime={item.datetime}
                />
              </li>
            )}
          />
        </TabPane>
      )}

      <TabPane tab={t('Product.Field.Description')} key="2">
        <div dangerouslySetInnerHTML={{ __html: variation.description || '' }} />
      </TabPane>
      <TabPane tab={t('Product.Field.TechnicalData')} key="3">
        <div dangerouslySetInnerHTML={{ __html: variation.technicalData || '' }} />
      </TabPane>
    </Tabs>
  );
};
