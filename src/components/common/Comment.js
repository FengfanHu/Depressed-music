import React from 'react';
import { Link } from 'react-router-dom';
import { List, Comment } from 'antd';

function CommentList(props) {
    const { title, comments } = props;

    const handleTime = (time) => {
        const publishTime = new Date(time);
        const currentTime = new Date(Date.now());
        let result = publishTime.toLocaleDateString();
        if (result === currentTime.toLocaleDateString()) {
            result = `${publishTime.getHours()}:${publishTime.getMinutes()}`
        }
        return result
    }

    const createComment = (comment) => {
        return (
            <Comment
                key={ comment.commentId ? comment.commentId : comment.beRepliedCommentId }
                author={<Link to={`/user/${comment.user.userId}`}>{comment.user.nickname}</Link>}
                avatar={comment.user.avatarUrl}
                content={comment.content}
                datetime={comment.time ? handleTime(comment.time) : ''}
                children= {
                    comment.beReplied && comment.beReplied.length > 0
                    ? comment.beReplied.map(reply => createComment(reply))
                    : ''
                }
                />
        )
    }

    return (
        <List
            header={title}
            itemLayout="horizontal"
            dataSource={comments}
            pagination={{ pageSize: 5, simple: true }}
            renderItem={comment => (
            <li>
                { createComment(comment) }
            </li>
            )}
        />
    )
}

export default CommentList;