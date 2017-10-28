import React from 'react';
import Header from './component/header.js';
import Player from './page/Player.js';
import MusicList from './page/musiclist.js';
import { MUSIC_LIST } from './config/music_list.js';
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router';
import Pubsub from 'pubsub-js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST
        };  
    }

    playMusic(musicItem) {
        $('#player').jPlayer('setMedia', {
                    mp3: musicItem.file
                }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        });
    }

    playNextMusic(type = "next") {
        let currentMusicItemIndex = this.state.musicList.indexOf(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if (type === "next") {
            newIndex = (currentMusicItemIndex + 1) % musicListLength;
        } else {
            newIndex = (currentMusicItemIndex -1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNextMusic();
        });

        Pubsub.subscribe('DELETE_MUSIC', (meg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter((item) => {
                    return item !== musicItem;
                })
            });
        });
        Pubsub.subscribe('PLAY_MUSIC', (meg, musicItem) => {
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('PLAY_PREV', (meg, musicItem) => {
            this.playNextMusic('prev');
        });
        Pubsub.subscribe('PLAY_NEXT', (meg, musicItem) => {
            this.playNextMusic();
        });
    }

    componentWillUnmount() {
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
         $('#player').bind($.jPlayer.event.ended);
    }
    
    render() {
        return (
            <div>
                <Header/>
               { React.cloneElement(this.props.children, this.state) }
            </div>
        );
    }
}


class Root extends React.Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}></IndexRoute>
                    <Route path="/list" component={MusicList}></Route>
                </Route>
            </Router>
        );
    }
}

export default Root;