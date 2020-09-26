import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MVDetail } from '../../api/common';
import Section from '../../components/common/Section';
import { PlaySquareTwoTone } from '@ant-design/icons';

class Mv extends Component {
    constructor() {
        super()
        this.state = {
            mv: {}
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
    }

    render() {
        const { mv } = this.state;
        return (
            <Fragment>
                <Section icon={<PlaySquareTwoTone/>} title="MV" list={['mv']}>
                    <video controls autoPlay name="media" src={mv.url} width="100%"></video>
                </Section>
            </Fragment>
        )
    }
}

export default withRouter(Mv);