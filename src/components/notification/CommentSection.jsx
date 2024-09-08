import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getReviewComment, postReviewComment } from '../../apis/reviewapis';

const CommentSection = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (reviewId) {
      getComments(reviewId);
    }
  }, [reviewId]);

  const getComments = async (id) => {
    try {
      const response = await getReviewComment(id);
      setComments(response);
    } catch (error) {
      console.error('Error in getReviewComment:', {
        message: error.message,
        response: error.response ? error.response.data : null,
        stack: error.stack
      });
      throw error;
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const postComment = async (id, data) => {
    try {
      await postReviewComment(id, data);
      getComments(id);
    } catch (error) {
      console.error('Error in postReviewComment:', {
        message: error.message,
        response: error.response ? error.response.data : null,
        stack: error.stack
      });
      throw error;
    }
  }

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newCommentObject = {
        content: newComment,
        parent: null,
      };
      try {
        await postComment(reviewId, newCommentObject);
        setNewComment('');
      } catch (error) {
        console.error('Error posting comment:', {
          message: error.message,
          response: error.response ? error.response.data : null,
          stack: error.stack
        });
      }
    }
  };

  return (
    <CommentContainer>
      {comments.map((comment) => (
        <Comment key={comment.id}>
          <Author>{comment.author_name}</Author>
          <Content>{comment.content}</Content>
          <Date>{comment.created_at}</Date>
        </Comment>
      ))}
      <CommentInputContainer>
        <CommentInput
          value={newComment}
          onChange={handleCommentChange}
          placeholder="휴알유가 더 따뜻해지는 댓글을 남겨주세요!"
        />
        <SubmitButton onClick={handleCommentSubmit}>올리기</SubmitButton>
      </CommentInputContainer>
    </CommentContainer>
  );
};

export default CommentSection;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const Author = styled.div`
  font-weight: bold;
  color: #0073e6;
`;

const Content = styled.div`
  margin: 5px 0;
`;

const Date = styled.div`
  font-size: 0.8em;
  color: #888;
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #0073e6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
