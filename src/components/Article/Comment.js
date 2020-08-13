import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

const Comment = props => {
  const comment = props.comment;
  var result = sentiment.analyze('Cats are stupid.');
  console.dir(result);
  const show = props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author">
          <img src={comment.author.image} className="comment-author-img" alt={comment.author.username} />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.author.username}`}
          className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <span>
      {(() => {
        if (sentiment.analyze(comment.body).score>0) {
          return (
            <span className="date-posted">Positive</span>
          )
        } else if (sentiment.analyze(comment.body).score<0) {
          return (
            <span className="date-posted">Negative</span>
          )
        } else {
          return (
            <div>Neutral</div>
          )
        }
      })()}
    </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;