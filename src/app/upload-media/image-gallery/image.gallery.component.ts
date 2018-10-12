import { Lightbox, LightboxConfig } from 'angular2-lightbox';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-gallery',
    templateUrl: './image.gallery.component.html'
})

export class ImageGallery {

    @Input() totalImages: Array<any> = new Array<any>();
    _albums: Array<any> = new Array<any>();

    constructor(private _lightbox: Lightbox) {
        console.log('child Images', this.totalImages);
        console.log('Images', this._albums);
    }

    ngOnInit() {

        for (let i = 0; i <= this.totalImages.length - 1; i++) {
            const src = this.totalImages[i].src;
            const thumb = this.totalImages[i].thumb;
            const album = {
                src: src,
                thumb: thumb
            };

            this._albums.push(album);
        }
        console.log('child images array', this.totalImages);
    }


    open(index: number) {
        // override the default config on second parameter
        this._lightbox.open(this._albums, index, { wrapAround: true, showImageNumberLabel: true });
    }
}
