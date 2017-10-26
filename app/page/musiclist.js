import React from 'react';
import MusicItem from '../component/music_item.js';

class MusicList extends React.Component {

    render() {
        let musicItemList = this.props.musicList.map((item) => {
            return (
                    <MusicItem key={item.id} musicItem={item} focus={item === this.props.currentMusicItem} >
                    </MusicItem>
                );
        });

        return (
                <ul>
                  { musicItemList }
                </ul>
            );
    }
}

export default MusicList;