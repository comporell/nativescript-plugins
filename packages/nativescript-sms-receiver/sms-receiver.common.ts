import { Observable } from '@nativescript/core';
import * as application from '@nativescript/core/application';
import { Dialogs } from '@nativescript/core';

export class Common extends Observable {
  public message: string;

  constructor() {
    super();
    this.message = Utils.SUCCESS_MSG();
  }

  public greet() {
    return 'Hello, NS';
  }
}

export class Utils {
  public static SUCCESS_MSG(): string {
    let msg = `Your plugin is working on ${application.android ? 'Android' : 'iOS'}.`;

    setTimeout(() => {
      Dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
    }, 2000);

    return msg;
  }
}
