import React from 'react';
import Header from './component/header.js';
import Player from './page/Player.js';
import MusicList from './page/musiclist.js';
import { MUSIC_LIST } from './config/music_list.js';

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST
        };  
    }

    componentDidMount() {
        $('#player').jPlayer({
            ready: function() {
                $(this).jPlayer('setMedia', {
                    mp3: 'http://fs.w.kugou.com/201710232132/9ccd0356b4c21e751977344a285b2b27/G004/M01/10/13/RA0DAFS4YtWAFSkBAEUB6UDnWrU223.mp3'

                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    componentWillMount() {
    }
    
    render() {
        return (
            <div>
                <Header/>
                <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}/>
                <Player currentMusicItem={this.state.currentMusicItem}/>
            </div>
        );
    }
}

export default Root;