import { Component, NgZone } from '@angular/core';
import { DemoSharedNativescriptSmsReceiver } from '@demo/shared';
import { SmsReceiver } from '@comporell/nativescript-sms-receiver';

@Component({
  selector: 'demo-nativescript-sms-receiver',
  templateUrl: 'nativescript-sms-receiver.component.html',
})
export class NativescriptSmsReceiverComponent {
  demoShared: DemoSharedNativescriptSmsReceiver;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedNativescriptSmsReceiver();

    SmsReceiver.getInstance().registerListeners(
      (started) => {
        console.log('ListeningSMS');
        console.log(started);
      },
      (exception) => {
        console.log('exception');
        console.log(exception);
      },
      (message) => {
        console.log('message');
        console.log(message);
      },
      (timeout) => {
        console.log('timeout');
        console.log(timeout);
      }
    );

    // start sms receiver for single message
    SmsReceiver.getInstance().startReceiver();
  }
}
