import { changeSong, showPlayer, setIsPlay, setSongs, setUser } from './action';
import { songUrl } from '../api/song';
import { message } from 'antd';

export function mapDispatchToProps(dispatch) {
    const onChangeSong = async (id) => {
        const song = await songUrl(id).then(result => result.data.data[0]).catch(err => console.log(err))
        // 歌曲权限不足时，URL为空
        if (!song || !song.url) {
            message.warning('此歌曲无权播放╮(￣▽￣"")╭')
            return false
        }
        dispatch(changeSong(song));
        return true;
    }

    const onSetSongs = (songs) => {
        dispatch(setSongs(songs));
        onChangeSong(songs[0].id);
    }

    const onChangeShowStatus = (status) => {
        dispatch(showPlayer(!status))
    }

    const onPauseOrPlay = (status) => {
        dispatch(setIsPlay(status))
    }

    const onSetUser = (status) => {
        dispatch(setUser(status))
    }

    return {
        // 当前播放歌曲
        onChangeSong,
        // 设置播放列表
        onSetSongs,
        //  展示歌曲列表
        onChangeShowStatus,
        // 播放或暂停
        onPauseOrPlay,
        // 用户登录或注销
        onSetUser
    }
}

export function mapStateToProps(state) {
    return {
        showStatus: state.showStatus, 
        song: state.song,
        songs: state.songs,
        isPlay: state.isPlay,
        user: state.user
    }
}