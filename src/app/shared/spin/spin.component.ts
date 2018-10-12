import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UIService } from "../../core/services/ui/ui.service";

@Component({
    selector: 'spinner',
    moduleId: module.id,
    templateUrl: 'spin.component.html'
})
export class SpinComponent implements OnInit, OnDestroy {

    @Input() visible: boolean;
    // @Input() visibility: boolean;
    // visible = false;
    // visible = this.visibility ? this.visibility : false;

    constructor(private _uiService: UIService) {
    }

    ngOnInit(): void {
        // this._uiService.spinnerStatus.subscribe(
        //     (show) => { this.visible = show }
        // );
    }

    ngOnDestroy(): void {
        // this._uiService.spinnerStatus.unsubscribe();
    }
}