import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Affix, Row, Col, Layout, message, Button, Tooltip, Slider, Image } from 'antd';
import { StepBackwardFilled, StepForwardFilled, PlayCircleOutlined,
    UnorderedListOutlined, PauseOutlined, SoundOutlined } from '@ant-design/icons';
import './Player.scss';
import { mapDispatchToProps } from '../../redux/dispatch';

const { Footer } = Layout;

class Player extends Component {
    constructor() {
        super()
        this.audio = createRef();
        this.state = {
            volume: 0.5,
            showVolume: false,
            duration: 0,
            currentTime: 0,
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
            this.setState({
                duration: audio.duration
            });
            onPauseOrPlay(true);
        }
        // timeupdate Event
        audio.ontimeupdate = () => {
            this.setState({
                currentTime: audio.currentTime
            });
        }
    }

    onStepSong =  (currentSongId, next=true) => {
        // * 赋值则递归调用，否则进行初始化操作
        if (!currentSongId) {
            currentSongId = this.props.songs.findIndex((item) => item.id === this.props.song.id);            
        }
        const step = next ? 1 : -1;
        const nextSong = this.props.songs[currentSongId+step];
        // 超出数组边界
        if (!nextSong) return message.info('没歌放了喔(⊙_⊙)');
        this.props.onChangeSong(nextSong.id)
            .then(res => {
                // * 无权播放歌曲 继续播放下一首/上一首
                if (!res) this.onStepSong(++currentSongId, next);
            })
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
            audio.volume = val;
            this.setState({ volume: val });
        }
    }

    onChangeTime = (val) => {
        const audio = this.audio.current;
        if (audio) {
            audio.currentTime = val;
            this.setState({ currentTime: val });
        }
    }

    render() {
        const { song, songs, showStatus, isPlay, onChangeShowStatus } = this.props;
        const currentSong = songs.find(item => item.id === song.id);
        const { currentTime, duration, volume, showVolume } = this.state;
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
                            <Row align="middle">
                                <Col span={3}>
                                    <Image src={currentSong ? currentSong.img : ''} className="image"></Image>
                                </Col>
                                <Col span={20}>
                                    <span>{currentSong ? currentSong.name : ''}</span>
                                    <Slider
                                        min={0}
                                        max={duration}
                                        value={currentTime}
                                        step={0.01}
                                        style={{ margin: 0 }}
                                        tooltipVisible={false}
                                        onChange={(val) => this.onChangeTime(val)}></Slider>
                                </Col>
                            </Row>
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
                                onClick={() => this.setState({ showVolume: !this.state.showVolume })}
                                shape="circle-outline"
                                icon={<SoundOutlined />}
                                type="text"
                            ></Button>
                        </Col>
                        <Col span={2}>
                            {/* 音量 */}
                            <Slider
                                style={{ display: showVolume ? 'block' : 'none' }}
                                onChange={(val) => this.onChangeVolume(val)}
                                value={volume}
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);