import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptMhtPrinter } from '@demo/shared';
import {} from '@comporell/nativescript-mht-printer';

@Component({
	selector: 'demo-nativescript-mht-printer',
	templateUrl: 'nativescript-mht-printer.component.html'
})
export class NativescriptMhtPrinterComponent {
	demoShared: DemoSharedNativescriptMhtPrinter;

	constructor(private _ngZone: NgZone) {}

	ngOnInit() {
		this.demoShared = new DemoSharedNativescriptMhtPrinter();
	}
}
