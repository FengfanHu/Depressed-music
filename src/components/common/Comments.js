import React from 'react';
import Comment from './Comment';
import Section from './Section';
import { MessageTwoTone } from '@ant-design/icons';

function Comments(props) {
    const { subTitle, comments, hotComments, padding } = props;

    return (
    <Section title="评论" subTitle={subTitle} icon={<MessageTwoTone />} list={comments} padding={padding ? padding : "0px 70px" }>
        {
            hotComments.length > 0
            ? <Comment title="热门评论" comments={hotComments}></Comment>
            : ''
        }
        <Comment title="最新评论" comments={comments}></Comment>
    </Section>
    )
}

export default Comments;