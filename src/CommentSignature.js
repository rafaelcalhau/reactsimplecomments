import React from 'react'

const CommentSignature = ({ email }) => {
    return (
        <div className="sentBy">
            <small className="grey">Sent by { email || '...' }</small>
        </div>
    )
}

export default CommentSignature