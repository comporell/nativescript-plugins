import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptSmsReceiver } from '@demo/shared';
import {} from '@comporell/nativescript-sms-receiver';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptSmsReceiver {}
