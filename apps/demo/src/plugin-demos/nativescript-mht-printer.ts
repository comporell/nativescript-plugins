import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedNativescriptMhtPrinter } from '@demo/shared';
import {} from '@comporell/nativescript-mht-printer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedNativescriptMhtPrinter {}
