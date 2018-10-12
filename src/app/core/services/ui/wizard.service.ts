import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class WizardService {

    onStepChange = new Subject<number>();


    constructor() { }

    StepChanged(currentIndex , oldIndex) {
        this.onStepChange.next(currentIndex);
    }



}
