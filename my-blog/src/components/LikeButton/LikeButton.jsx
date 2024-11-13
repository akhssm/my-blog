// src/components/LikeButton/LikeButton.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './LikeButton.css';

function LikeButton({ initialLikes, onLikeChange }) {
  const savedLikes = localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : initialLikes;
  const savedIsLiked = localStorage.getItem('isLiked') ? JSON.parse(localStorage.getItem('isLiked')) : false;
  const [likes, setLikes] = useState(savedLikes);
  const [isLiked, setIsLiked] = useState(savedIsLiked);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
    localStorage.setItem('isLiked', JSON.stringify(isLiked));
  }, [likes, isLiked]);

  const handleLikeClick = () => {
    setIsLiked(prevIsLiked => {
      const newIsLiked = !prevIsLiked;
      setLikes(prevLikes => {
        const newLikes = prevIsLiked ? prevLikes - 1 : prevLikes + 1;
        onLikeChange?.(newLikes);
        return newLikes;
      });
      return newIsLiked;
    });
  };

  return (
    <button 
      className={`like-button ${isLiked ? 'like-button--liked' : ''}`}
      onClick={handleLikeClick}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <span className="like-button__icon">
        {isLiked ? '❤️' : '🤍'}
      </span>
      <span className="like-button__count">{likes}</span>
    </button>
  );
}

LikeButton.propTypes = {
  initialLikes: PropTypes.number.isRequired,
  onLikeChange: PropTypes.func
};

export default LikeButton;
