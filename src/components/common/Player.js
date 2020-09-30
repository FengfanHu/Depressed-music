import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { changeSong, showPlayer, setIsPlay } from '../../redux/action';
import { songUrl } from '../../api/song';
import { Affix, Row, Col, Layout, message, Button, Tooltip, Slider } from 'antd';
import { StepBackwardFilled, StepForwardFilled, PlayCircleOutlined,
    UnorderedListOutlined, PauseOutlined, SoundOutlined } from '@ant-design/icons';
import './Player.scss';

const { Footer } = Layout;

class Player extends Component {
    constructor() {
        super()
        this.audio = createRef();
        this.state = {
            volume: 0.5
        }
    }

    componentDidMount() {
        let audio = this.audio.current;
        const { onPauseOrPlay } = this.props;

        // 结束-自动播放下一首
        audio.onended = () => {
            this.onStepSong();
        }
        // 暂停
        audio.onpause = () => {
            onPauseOrPlay(false);
        }
        // 播放
        audio.onplay = () => {
            onPauseOrPlay(true);
        }
    }

    onStepSong = (next=true) => {
        const step = next ? 1 : -1;
        const currentSongId = this.props.songs.findIndex((item) => item.id === this.props.song.id);
        const nextSong = this.props.songs[currentSongId+step];
        nextSong ? this.props.onChangeSong(nextSong.id) : message.info('没歌放了喔(⊙_⊙)');
    }

    // 暂停
    onPause = () => {
        this.audio.current.pause();
    }

    // 播放
    onPlay = () => {
        this.audio.current.play();
    }

    // 音量
    onChangeVolume = (val) => {
        const audio = this.audio.current;
        if (audio) {
            this.audio.current.volume = val;
            this.setState({ volume: val });
        }
    }

    render() {
        const { song, showStatus, isPlay, onChangeShowStatus } = this.props;
        return (
            <Affix offsetBottom={0}>
                <Footer className="player-warp">
                    <Row justify="start" align="middle" style={{ height: '100%' }}>
                        <audio
                            ref={this.audio}
                            src={song.url}
                            autoPlay></audio>
                        <Col span={3} offset={1}>
                            <div className="player-btn-group">
                                <StepBackwardFilled onClick={()=> this.onStepSong(false)}/>
                                    { 
                                        isPlay
                                        ? <PauseOutlined className="play" onClick={this.onPause} />
                                        : <PlayCircleOutlined className="play" onClick={this.onPlay} />
                                    }
                                <StepForwardFilled onClick={()=> this.onStepSong()}/>
                            </div>
                        </Col>
                        <Col span={15}>
                            <Slider></Slider>
                        </Col>
                        <Col>
                            <Tooltip title="播放列表">
                                <Button
                                    onClick={() => onChangeShowStatus(showStatus)}
                                    shape="circle-outline"
                                    icon={<UnorderedListOutlined />}
                                    type="text"></Button>
                            </Tooltip>
                            <Button 
                                shape="circle-outline"
                                icon={<SoundOutlined />}
                                type="text"
                            ></Button>
                        </Col>
                        <Col span={2}>
                            <Slider
                                onChange={(val) => this.onChangeVolume(val)}
                                value={this.state.volume}
                                min={0}
                                max={1}
                                step={0.1}
                                tooltipVisible={false}></Slider>
                        </Col>
                    </Row>
                </Footer>
            </Affix>
        )
    }

}

function mapStateToProps(state) {
    return {
        showStatus: state.showStatus, 
        song: state.song,
        songs: state.songs,
        isPlay: state.isPlay
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onChangeSong: async (id) => {
            const song = await songUrl(id).then(result => result.data.data[0]).catch(err => console.log(err))
            dispatch(changeSong(song))
        },
        onChangeShowStatus: (status) => {
            dispatch(showPlayer(!status))
        },
        onPauseOrPlay: (status) => {
            dispatch(setIsPlay(status))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);