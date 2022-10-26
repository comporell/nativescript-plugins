import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativescriptSmsReceiverComponent } from './nativescript-sms-receiver.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: NativescriptSmsReceiverComponent }])],
  declarations: [NativescriptSmsReceiverComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NativescriptSmsReceiverModule {}
