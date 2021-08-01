import { NativescriptMhtPrinterCommon } from './common';

export declare class NativescriptMhtPrinter extends NativescriptMhtPrinterCommon {
	requestLocationPermission(): Promise<boolean>;
	enable(): Promise<boolean>;
	isBluetoothEnabled(): Promise<boolean>;
	printServiceLabel(port: string, serviceId: string, labelNumber: string, clientName: string): Promise<boolean>;
	printClientLabel(port: string, serviceId: string, clientUrl: string, clientName: string, clientPhone: string, clientEmail: string, clientPass: string): Promise<boolean>;
	printProductLabel(port: string, sku: string, price: string, brand: string, model: string): Promise<boolean>;
	printText(port: string, text: string): Promise<boolean>;
}
