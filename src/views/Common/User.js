import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { userDetail, userPlaylist } from '../../api/user';
import UserHeader from '../../components/user/UserHeader';
import RecommendSection from '../../components/discovery/RecommendSection';

class User extends Component {
    constructor() {
        super()
        this.state = {
            profile: {},
            lavel: 0,
            createList: [],
            collectList: [],
            loading: true
        }
    }

    componentDidMount() {
        const uid = this.props.match.params.id;
        // 获取用户详情
        const userDetailPromise = userDetail(uid).then(result => {
            this.setState({
                profile: result.data.profile,
                level: result.data.level
            })
        }).catch(err => {
            console.log(err);
            if (err.response.status === 404) {
                this.props.history.push('/404');
            }
        });
        // 获取用户歌单
        userDetailPromise.then(()=> {
            return userPlaylist(uid)
        }).then(result => {
            let { createList, collectList } = this.handlePlaylist(result.data.playlist);
            this.setState({
                createList,
                collectList,
                loading: false
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handlePlaylist = (playlists) => {
        const createList = [];
        const collectList = [];
        playlists.forEach(playlist => {
            playlist.creator.userId === this.state.profile.userId
            ? createList.push(playlist)
            : collectList.push(playlist)
        })
        return {createList, collectList};
    }

    render() {
        const { profile, level, createList, collectList, loading } = this.state;
        const { nickname } = profile;
        return (
            <Fragment>
                <UserHeader level={level} {...profile}></UserHeader>
                {
                    loading
                    ? null
                    : <Fragment>
                        <RecommendSection
                            padding="0px 70px"
                            imgProp="coverImgUrl"
                            title={`${nickname}创建的歌单®️`}
                            column={4}
                            pagination={{ pageSize: 8, simple: true }}
                            list={createList}
                            type="playlist">
                        </RecommendSection>
                        {
                            collectList.length > 0
                            ? <RecommendSection
                                padding="0px 70px"
                                imgProp="coverImgUrl"
                                title={`${nickname}收藏的歌单®️`}
                                column={4}
                                pagination={{ pageSize: 4, simple: true }}
                                list={collectList}
                                type="playlist">
                            </RecommendSection>
                            : ''
                        }
                    </Fragment>
                }
            </Fragment>
        )
    }
}

export default withRouter(User);