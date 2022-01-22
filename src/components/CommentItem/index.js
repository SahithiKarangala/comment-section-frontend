import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachCommentContent, onLikedComment, onDelete} = props
  const {
    id,
    commenterName,
    commentContent,
    isLiked,
    date,
    initialClassName,
  } = eachCommentContent
  const like = isLiked ? 'liked' : 'not-liked'
  const time = formatDistanceToNow(date)

  const likedImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const clickLike = () => {
    onLikedComment(id)
  }

  const deleteThisComment = () => {
    onDelete(id)
  }

  return (
    <li className="each-list-container">
      <div className="comment-header">
        <div className={`comment-initial-container ${initialClassName}`}>
          <p className="comment-initial">{commenterName[0]}</p>
        </div>

        <p className="commenter-name">{commenterName}</p>
        <p className="time-of-comment">{time}</p>
      </div>
      <p className="comment-content">{commentContent}</p>
      <div className="like-delete-container">
        <button type="button" className="buttons" onClick={clickLike}>
          <img src={likedImgUrl} alt="like" />
          <p className={like}>Like</p>
        </button>
        <button
          type="button"
          className="buttons"
          onClick={deleteThisComment}
          testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
