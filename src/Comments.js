import React from 'react'
import Comment from './Comment'

// Pure-functions: good practice when you stateless component.
const Comments = ({ comments }) => {
    const keys = Object.keys(comments);
    return (
        <div className="clearedbox">
            { 
                keys.map( key => <Comment key={key} node={comments[key]} />) 
            }
        </div>
    )
}

export default Comments