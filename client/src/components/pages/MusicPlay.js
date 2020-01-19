import React, { Component } from 'react';
import { Icon, IconButton } from '@material-ui/core';

import '../../styles/pages/MusicPlay.css';

import audiofile from '../../assets/HappyNewYear-ABBA.mp3';

class MusicPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedTab: null,
            isPlaying: true,
            isMute: false
        };
        this.audio = new Audio(audiofile);
        // this.audio.play();
    }
    
    async menuExpand(e) {
        let currentElement = e.currentTarget.parentElement.childNodes[1];
        if (currentElement === document.getElementById("lib")) {
            if (this.state.expandedTab !== 'library') {
                document.getElementById("list").style.width = '0px';
                await this.setState(() => ({expandedTab: 'library'}));
            }
            else await this.setState(() => ({expandedTab: null}));
        }
        else {
            if (this.state.expandedTab !== 'playlist') {
                document.getElementById("lib").style.width = '0px';
                await this.setState(() => ({expandedTab: 'playlist'}));
            }
            else await this.setState(() => ({expandedTab: null}));
        }
        if (this.state.expandedTab !== null) currentElement.style.width = '200px';
        else currentElement.style.width = '0px';
    }

    audioToggle(e) {
        if (!this.state.isPlaying) {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "pause";
            this.audio.play();
        }
        else {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "play_arrow";
            this.audio.pause();
        }
        this.setState(() => ({isPlaying: !this.state.isPlaying}));
    }

    changeMute(e) {
        if (!this.state.isMute) {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "music_off";
            this.audio.muted = true;
        }
        else {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "music_note";
            this.audio.muted = false;
        }
        this.setState(() => ({isMute: !this.state.isMute}));
    }
    render() {
        return (
            <div className="MusicPlay">
                <div className="vertical-pane pane1">
                    <IconButton className="icon-button" title="Home">
                        <Icon>home</Icon>
                    </IconButton>
                    <div>
                        <IconButton className="icon-button" onClick={(e) => this.menuExpand(e)} title="Library">
                            <Icon>library_music</Icon>
                        </IconButton>
                        <div className="expand-container" id="lib">Library</div>
                    </div>
                    <div>
                        <IconButton className="icon-button" onClick={(e) => this.menuExpand(e)} title="Playlist">
                            <Icon>queue_music</Icon>
                        </IconButton>
                        <div className="expand-container" id="list">Playlist</div>
                    </div>
                </div>
                <div className="vertical-pane pane2">
                    <div className="vertical-pane pane3">
                        <div className="horizontal-pane pane 1">
                            <div className="lyrics"></div>
                        </div>
                        <div className="horizontal-pane pane2">
                            <div className="audio-wave"></div>
                            <div className="audio-control">
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">fast_rewind</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">skip_previous</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button" onClick={(e) => this.audioToggle(e)}>
                                    <Icon fontSize="large">pause</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">skip_next</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">fast_forward</Icon>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <div className="vertical-pane pane4">
                        <div className="songName">
                            <IconButton className="icon-button" onClick={(e) => this.changeMute(e)} style={{color: 'black', width: '40px', height: '40px'}} title="Home">
                                <Icon fontSize="large">music_note</Icon>
                            </IconButton>
                            Happy New Year - ABBA
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MusicPlay;