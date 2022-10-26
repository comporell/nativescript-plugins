/// <reference path="android-declarations.d.ts"/>

declare module com {
  export module pravinkumarputta {
    export module smsreceiver {
      export class AppSignatureHelper {
        public static class: java.lang.Class<com.pravinkumarputta.smsreceiver.AppSignatureHelper>;
        public static TAG: string;
        public static NUM_HASHED_BYTES: number;
        public static NUM_BASE64_CHAR: number;
        public getAppSignatures(): java.util.ArrayList<string>;
        public constructor(param0: globalAndroid.content.Context);
      }
    }
  }
}

declare module com {
  export module pravinkumarputta {
    export module smsreceiver {
      export class BuildConfig {
        public static class: java.lang.Class<com.pravinkumarputta.smsreceiver.BuildConfig>;
        public static DEBUG: boolean;
        public static LIBRARY_PACKAGE_NAME: string;
        public static BUILD_TYPE: string;
        public constructor();
      }
    }
  }
}

declare module com {
  export module pravinkumarputta {
    export module smsreceiver {
      export class SMSBroadcastReceiver {
        public static class: java.lang.Class<com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver>;
        public static initOTPListener(param0: com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver.OTPReceiveListener): void;
        public onReceive(param0: globalAndroid.content.Context, param1: globalAndroid.content.Intent): void;
        public constructor();
      }
      export module SMSBroadcastReceiver {
        export class OTPReceiveListener {
          public static class: java.lang.Class<com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver.OTPReceiveListener>;
          /**
           * Constructs a new instance of the com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver$OTPReceiveListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onSMSReceiverStarted(): void; onSMSReceiverFailed(param0: java.lang.Exception): void; onSMSReceived(param0: string): void; onSMSReceiverTimeOut(): void });
          public constructor();
          public onSMSReceived(param0: string): void;
          public onSMSReceiverStarted(): void;
          public onSMSReceiverTimeOut(): void;
          public onSMSReceiverFailed(param0: java.lang.Exception): void;
        }
      }
    }
  }
}

declare module com {
  export module pravinkumarputta {
    export module smsreceiver {
      export class SMSReceiver {
        public static class: java.lang.Class<com.pravinkumarputta.smsreceiver.SMSReceiver>;
        public static getHashKey(param0: globalAndroid.content.Context): string;
        public static requestForPhoneNumber(param0: globalAndroid.app.Activity): void;
        public startSmsListener(): void;
        public static getPhoneNumberFromResult(param0: number, param1: number, param2: globalAndroid.content.Intent): string;
        public constructor(param0: globalAndroid.content.Context, param1: com.pravinkumarputta.smsreceiver.SMSBroadcastReceiver.OTPReceiveListener);
      }
    }
  }
}

//Generics information:
