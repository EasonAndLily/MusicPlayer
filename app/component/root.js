import React from 'react';
import Header from './header.js';
import Progress from './progress.js';

let duration = null;
class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: '1'
        }
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
       $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute
            });
       });

    }

    componentWillMount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }
    
    progressChangeHandler(progress) {
        $("#player").jPlayer('play', duration * progress);
    }

    render() {
        return (
            <div>
                <Header/>
                <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler}>

                </Progress>
            </div>
        );
    }
}

export default Root;