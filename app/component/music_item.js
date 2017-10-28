import React from 'react';
import Pubsub from 'pubsub-js';


class MusicItem extends React.Component {
    constructor(props) {
        super(props);
        this.playMusic = this.playMusic.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
    }

    playMusic(e) {
        e.stopPropagation();
        Pubsub.publish('PLAY_MUSIC', this.props.musicItem);
    }

    deleteMusic(e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', this.props.musicItem);
    }

    render() {
        let musicItem = this.props.musicItem;
        return (
              <li onClick={this.playMusic} className={`row components-music-item ${this.props.focus ? ' focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.author}</p>
                <p onClick={this.deleteMusic} className="-col-auto delete"></p>
              </li>
            );
    }
}

export default MusicItem;