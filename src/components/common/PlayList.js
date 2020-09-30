import React, { Component } from 'react';
import { List, Affix } from 'antd';
import { connect } from 'react-redux';
import './PlayList.scss';

class PlayList extends Component {

    render() {
        const { showStatus, song, songs } = this.props;
        return (
            <div className="playlist-affix">
                <Affix offsetTop={16}>
                    <List
                        className="list"
                        style={{ display: showStatus ? 'block' : 'none' }}
                        header="歌曲列表"
                        split={false}
                        size="small" dataSource={ songs } renderItem={
                        item => 
                        <List.Item key={item.id} className={ song.id === item.id ? 'active' : '' }>
                            { item.name }
                        </List.Item>
                    }>
                    </List>
                </Affix>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        showStatus: state.showStatus,
        song: state.song,
        songs: state.songs
    }
}

export default connect(mapStateToProps, null)(PlayList);