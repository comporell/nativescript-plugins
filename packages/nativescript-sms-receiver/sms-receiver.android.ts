import { AndroidApplication } from '@nativescript/core';
import * as application from '@nativescript/core/application';

let apiInstance: SmsReceiver;

export class SmsReceiver {
  private onSMSReceiverStarted: Function = null;
  private onSMSReceiverFailed: Function = null;
  private onSMSReceived: Function = null;
  private onSMSReceiverTimeOut: Function = null;
  private smsReceiver: any = null;

  constructor() {
    let scope = this;
    let SmsReceiverCallbackListener = java.lang.Object['extend']({
      interfaces: [com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver.OTPReceiveListener],
      onSMSReceiverStarted: function () {
        if (scope.onSMSReceiverStarted != null) {
          scope.onSMSReceiverStarted();
        }
      },
      onSMSReceiverFailed: function (exception) {
        if (scope.onSMSReceiverFailed != null) {
          scope.onSMSReceiverFailed(exception);
        }
      },
      onSMSReceived: function (message) {
        if (scope.onSMSReceived != null) {
          scope.onSMSReceived(message);
        }
      },
      onSMSReceiverTimeOut: function () {
        if (scope.onSMSReceiverTimeOut != null) {
          scope.onSMSReceiverTimeOut();
        }
      },
    });
    let smsReceiverCallback = new SmsReceiverCallbackListener();

    this.smsReceiver = new com.pravinkumarputta.smsreceiver.SMSReceiver(application.android.context, smsReceiverCallback);
  }

  static getInstance(): SmsReceiver {
    if (apiInstance != null) {
      return apiInstance;
    }
    apiInstance = new SmsReceiver();
    return apiInstance;
  }

  registerListeners(onSMSReceiverStarted: Function, onSMSReceiverFailed: Function, onSMSReceived: Function, onSMSReceiverTimeOut: Function) {
    this.onSMSReceiverStarted = onSMSReceiverStarted;
    this.onSMSReceiverFailed = onSMSReceiverFailed;
    this.onSMSReceived = onSMSReceived;
    this.onSMSReceiverTimeOut = onSMSReceiverTimeOut;
  }

  deregisterListeners() {
    this.onSMSReceiverStarted = null;
    this.onSMSReceiverFailed = null;
    this.onSMSReceived = null;
    this.onSMSReceiverTimeOut = null;
  }

  startReceiver() {
    this.smsReceiver.startSmsListener();
  }

  getHashString(): string {
    return com.pravinkumarputta.smsreceiver.SMSReceiver.getHashKey(application.android.context);
  }

  requestForPhoneNumber(callback: Function) {
    // registering onActivityResult callback
    let resultEvent = null;
    let activityResultEvent = function (args) {
      // args.requestCode, args.resultCode, args.intent
      let phoneNumber = com.pravinkumarputta.smsreceiver.SMSReceiver.getPhoneNumberFromResult(args.requestCode, args.resultCode, args.intent);
      application.android.off(AndroidApplication.activityResultEvent, resultEvent);
      callback(phoneNumber);
    };
    resultEvent = application.android.on(AndroidApplication.activityResultEvent, activityResultEvent.bind(this));

    // calling request
    com.pravinkumarputta.smsreceiver.SMSReceiver.requestForPhoneNumber(application.android.foregroundActivity);
  }
}
