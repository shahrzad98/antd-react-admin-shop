import { HeartFilled, HeartTwoTone } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import FavoriteController from '@src/logic/Favorite/controller/Favorite.controller';
import FavoriteSelector from '@src/logic/Favorite/store/Favorite.selector';

type LikeProps = { variationId: number };

export const Favorite: React.FC<LikeProps> = ({ variationId }) => {
  const dispatch = useDispatch();
  const { items: favorites } = useSelector(FavoriteSelector.getAllFavorites);
  const isFavorite = favorites.length > 0 ? !!favorites.find((fav) => fav?.product_id === variationId) : false;

  const toggleActive = () => {
    if (isFavorite) {
      dispatch(FavoriteController.removeProductFromFavorites(variationId));
    } else {
      dispatch(FavoriteController.addProductToFavorites(variationId));
    }
  };

  return (
    <LikeButton onClick={toggleActive}>
      <Like>
        {isFavorite ? <HeartFilled style={{ color: '#EA2027' }} /> : <HeartTwoTone twoToneColor={'#EA2027'} />}
      </Like>
    </LikeButton>
  );
};

const Like = styled.div`
  font-size: 2.5em;
`;

const LikeButton = styled.button`
  padding: 0;
  background-color: transparent;
  margin-left: 20px;
  border: 0;
  outline: 0;
  cursor: pointer;
`;
