import React, { Component } from 'react';
import { Icon, IconButton, Divider } from '@material-ui/core';

import '../../styles/pages/MusicPlay.css';

class MusicPlay extends Component {
    render() {
        return (
            <div className="MusicPlay">
                <div className="vertical-pane pane1">
                    <IconButton className="icon-button" title="Home">
                        <Icon>home</Icon>
                    </IconButton>
                    <IconButton className="icon-button" title="Library">
                        <Icon>library_music</Icon>
                    </IconButton>
                    <IconButton className="icon-button" title="Playlist">
                        <Icon>queue_music</Icon>
                    </IconButton>
                </div>
                <div className="vertical-pane pane2"></div>
            </div>
        );
    }
}

export default MusicPlay;