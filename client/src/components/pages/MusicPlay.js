import React, { Component } from 'react';

import '../../styles/pages/MusicPlay.css';

class MusicPlay extends Component {
    render() {
        return (
            <div className="MusicPlay">
                <div className="vertical-pane pane1"></div>
                <div className="vertical-pane pane2"></div>
            </div>
        );
    }
}

export default MusicPlay;