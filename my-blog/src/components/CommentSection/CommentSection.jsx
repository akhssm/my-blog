// src/components/CommentSection/CommentSection.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import './CommentSection.css';

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingComment, setEditingComment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setComments(prevComments => [...prevComments, {
      id: Date.now(),
      text: newComment,
      timestamp: new Date().toISOString()
    }]);
    setNewComment('');
  };

  const handleEdit = (commentId) => {
    const commentToEdit = comments.find(comment => comment.id === commentId);
    setEditingComment(commentToEdit);
    setNewComment(commentToEdit.text);
  };

  const handleUpdateComment = (e) => {
    e.preventDefault();
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === editingComment.id
          ? { ...comment, text: newComment }
          : comment
      )
    );
    setEditingComment(null);
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <button 
        className="comment-section__toggle"
        onClick={() => setIsExpanded(prev => !prev)}
      >
        {isExpanded ? 'Hide' : 'Show'} Comments ({comments.length})
      </button>

      {isExpanded && (
        <>
          <form onSubmit={editingComment ? handleUpdateComment : handleSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-form__input"
              rows="3"
            />
            <button 
              type="submit" 
              disabled={!newComment.trim()}
              className="comment-form__submit"
            >
              {editingComment ? 'Update Comment' : 'Post Comment'}
            </button>
          </form>

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <p className="comment__text">{comment.text}</p>
                <span className="comment__timestamp">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
                <button onClick={() => handleEdit(comment.id)} className="comment__edit-button">Edit</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.number.isRequired
};

export default CommentSection;
