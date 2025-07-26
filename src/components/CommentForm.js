import React, { useState } from 'react';
import { createComment } from '../api';

const CommentForm = ({ postName, userName, onCommentAdded }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment({ text, postName, userName });
    setText('');
    onCommentAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Add a comment</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;