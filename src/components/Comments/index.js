import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onNameChange = event => {
    this.setState({name: event.target.value})
  }

  onCommentChange = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      commenterName: name,
      commentContent: comment,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onLikedThisComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  onDelete = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(each => id !== each.id),
    }))
  }

  render() {
    const {name, comment, commentsList} = this.state
    const noOfComments = commentsList.length

    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="main-heading">Comments</h1>
          <div className="form-and-image-container">
            <form className="form-container" onSubmit={this.onAddComment}>
              <p className="form-heading">
                Say something about 4.0 Technologies
              </p>
              <input
                value={name}
                placeholder="Your Name"
                className="input-name"
                onChange={this.onNameChange}
              />
              <textarea
                placeholder="Your Comment"
                value={comment}
                type=""
                rows="5"
                cols="20"
                className="input-comment"
                onChange={this.onCommentChange}
              />
              <button className="add-comment-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              className="comment-image"
              alt="comments"
            />
          </div>

          <hr />
          <div className="comment-section">
            <p className="comment-heading">
              <span className="comment-count">{noOfComments}</span>Comments
            </p>

            <ul className="comments-container">
              {commentsList.map(eachComment => (
                <CommentItem
                  key={eachComment.id}
                  eachCommentContent={eachComment}
                  onLikedComment={this.onLikedThisComment}
                  onDelete={this.onDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
