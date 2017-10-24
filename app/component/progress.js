import React from 'react';

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.changeProgress = this.changeProgress.bind(this);
    }
    
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }

    render() {
        return (
            <div className="components-progress" onClick={this.changeProgress} ref="progressBar">
                <div className="progress" style={{width:`${this.props.progress}%`}}></div>
            </div>
        );
    }
}

export default Progress;