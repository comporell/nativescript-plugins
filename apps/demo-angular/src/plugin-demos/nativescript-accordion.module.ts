import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptAccordionComponent } from './nativescript-accordion.component';
import { AccordionModule } from '@comporell/nativescript-accordion/angular';

@NgModule({
  imports: [NativeScriptCommonModule, AccordionModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptAccordionComponent }])],
  declarations: [NativescriptAccordionComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptAccordionModule {}
