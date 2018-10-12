import { Component, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';

@Component({
    selector: 'video-player',
    templateUrl: './video.component.html'
})


export class VideoModule {
    preload = 'auto';
    // api: VgAPI;
    myVideo = 'http://static.videogular.com/assets/videos/videogular.mp4';
    // myVideo: string = "http://static.videogular.com/assets/audios/videogular.mp3";
    constructor() { }

    // onPlayerReady(api: VgAPI) {
    //     console.log('api', api)
    //     this.api = api;



    // this.api.getDefaultMedia().subscriptions.ended.subscribe(
    //     () => {
    //         // Set the video to the beginning
    //         this.api.getDefaultMedia().currentTime = 0;
    //     }
    // );
    //    }

}
