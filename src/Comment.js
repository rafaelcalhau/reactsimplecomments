import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

import CommentSignature from './CommentSignature'

// Pure-functions: good practice when you stateless component.
const Comment = ({ node }) => {
    let comment = '-'
    let email = '-'

    if (node !== undefined && node.comment) {
        comment = node.comment
    }

    if (node !== undefined && node.email) {
        email = node.email
    }

    return (
        <Card className="fluid comment">
            <Card.Content>
                <Icon disabled name="angle right" />
                { comment }
                { 
                    email !== '-' && <CommentSignature email={email} />
                } 
            </Card.Content>
        </Card>
    )
}

export default Comment