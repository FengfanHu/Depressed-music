import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MVDetail, MVComments } from '../../api/mv';
import Section from '../../components/common/Section';
import Comments from '../../components/common/Comments';
import { PlaySquareTwoTone } from '@ant-design/icons';

class Mv extends Component {
    constructor() {
        super()
        this.state = {
            mv: {},
            hotComments: [],
            comments: [],
            commentCount: 0
        }
    }

    componentDidMount() {
        const mvId = this.props.match.params.id;
        MVDetail(mvId).then(result => {
            this.setState({
                mv: result.data.data
            })
        }).catch(err => {
            console.log(err);
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        });
        // 评论
        MVComments(mvId).then(result => {
            this.setState({
                hotComments: result.data.hotComments,
                comments: result.data.comments,
                commentCount: result.data.total
            })
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { mv, commentCount, comments, hotComments } = this.state;
        return (
            <Fragment>
                <Section icon={<PlaySquareTwoTone/>} title="MV" list={['mv']}>
                    <video controls autoPlay name="media" src={mv.url} width="100%"></video>
                </Section>
                <Comments
                    padding="0px 40px"
                    subTitle={`共${commentCount}条评论`} list={comments}
                    comments={comments} hotComments={hotComments} />
            </Fragment>
        )
    }
}

export default withRouter(Mv);