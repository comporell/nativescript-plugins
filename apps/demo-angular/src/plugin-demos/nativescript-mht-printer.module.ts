import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptMhtPrinterComponent } from './nativescript-mht-printer.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptMhtPrinterComponent }])],
	declarations: [NativescriptMhtPrinterComponent],
	schemas: [NO_ERRORS_SCHEMA]
})
export class NativescriptMhtPrinterModule {}
