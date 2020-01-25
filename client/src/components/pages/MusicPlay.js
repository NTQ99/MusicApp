import React, { Component } from 'react';
import { Icon, IconButton } from '@material-ui/core';

import '../../styles/pages/MusicPlay.css';

import audiofile from '../../assets/HappyNewYear-ABBA.mp3';
import progressCircleImg from '../../assets/progress-circle.png';
import dotControlImg from '../../assets/dot-control.png';

class MusicPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedTab: null,
            audioDuration: 0,
            audioProgress: 0,
            audioStatus: 'Playing...',
            isMute: false
        };
        this.audio = new Audio(audiofile);
        this.audio.play();
    }

    componentDidMount() {
        let timer;
        this.audio.addEventListener("playing", () => {
            this.setState({audioDuration: Math.round(this.audio.duration)});
            document.getElementById("dotControl").style.bottom = "-70px";
            document.getElementById("dotControl").style.marginLeft = "0";
            document.getElementById("dotControl").style.animation = "rotate120deg " + Math.round(this.audio.duration) + "s 1 linear";
            timer = setInterval(() => this.setState({audioProgress: this.state.audioProgress + 1}), 1000);
        });
        this.audio.addEventListener("pause", () => {
            clearInterval(timer);
            if (document.getElementById("playBtn").childNodes[0].childNodes[0].innerHTML === "pause") {
                document.getElementById("playBtn").childNodes[0].childNodes[0].innerHTML = "play_arrow";
                this.setState({audioProgress: 0, audioStatus: 'Paused'});
                document.getElementById("audioStatus").style.fontStyle = "normal";
                document.getElementById("dotControl").style.bottom = "38.5px";
                document.getElementById("dotControl").style.marginLeft = "-191.5px";
                document.getElementById("dotControl").style.animation = "none";
            }
        });
        this.audio.addEventListener(this.state.audioProgress > this.state.audioDuration, () => {
            clearInterval(timer);
        });
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
        if (this.state.audioStatus === 'Paused') {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "pause";
            this.audio.play();
            this.setState(() => ({audioStatus: 'Playing...'}));
            document.getElementById("audioStatus").style.fontStyle = "italic";
            document.getElementById("dotControl").style.animationPlayState = "running";
            
        }
        else {
            e.currentTarget.childNodes[0].childNodes[0].innerHTML = "play_arrow";
            this.audio.pause();
            this.setState(() => ({audioStatus: 'Paused'}));
            document.getElementById("audioStatus").style.fontStyle = "normal";
            document.getElementById("dotControl").style.animationPlayState = "paused";
        }
    }

    getTimeProgress() {
        let mm = Math.round(this.state.audioProgress / 60);
        let ss = this.state.audioProgress % 60;
        if (mm < 10) mm = '0' + mm;
        if (ss < 10) ss = '0' + ss;
        return mm + ':' + ss;
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
                        <div className="horizontal-pane pane1">
                            <div className="lyrics">...</div>
                        </div>
                        <div className="horizontal-pane pane2">
                            <div className="audio-wave">
                                <div className="audio-progress" style={{fontFamily: 'Lucida Handwriting'}}>{this.getTimeProgress()}</div>
                            </div>
                        </div>
                        <div className="horizontal-pane pane3">
                            <img src={progressCircleImg} style={{position: 'absolute', bottom: '-290px'}} alt="" width="450"/>
                            <img src={dotControlImg} className="audio-dot-control" id="dotControl" alt="" />
                            <div className="audio-status" id="audioStatus">{this.state.audioStatus}</div>
                            <div className="audio-control">
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">fast_rewind</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button">
                                    <Icon fontSize="large">skip_previous</Icon>
                                </IconButton>
                                <IconButton className="audio-icon-button" id="playBtn" onClick={(e) => this.audioToggle(e)}>
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
                            <IconButton className="icon-button" onClick={(e) => this.changeMute(e)} style={{color: 'black', width: '40px', height: '40px'}} title="Mute">
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