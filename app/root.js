import React from 'react';
import Header from './component/header.js';
import Player from './page/Player.js';
import MusicList from './page/musiclist.js';
import { MUSIC_LIST } from './config/music_list.js';
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router';

class App extends React.Component {
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