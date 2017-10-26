import React from 'react';

class MusicItem extends React.Component {
    render() {
        let musicItem = this.props.musicItem;
        return (
              <li className={`row components-music-item ${this.props.focus ? ' focus' : ''}`}>
              <p><strong>{musicItem.title}</strong> - {musicItem.author}</p>
                <p className="-col-auto delete"></p>
              </li>
            );
    }
}

export default MusicItem;