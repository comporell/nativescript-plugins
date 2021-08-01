import { NativescriptMhtPrinterCommon } from './common';
import TSCActivity = com.example.tscdll.TSCActivity;
import Bitmap = android.graphics.Bitmap;
import Canvas = android.graphics.Canvas;
import Paint = android.graphics.Paint;
import Rect = android.graphics.Rect;
import Color = android.graphics.Color;
import TextPaint = android.text.TextPaint;
import Typeface = android.graphics.Typeface;
import FileOutputStream = java.io.FileOutputStream;
import Environment = android.os.Environment;
import File = java.io.File;
import Path = android.graphics.Path;
import * as utils from '@nativescript/core/utils';
import * as application from '@nativescript/core/application';

const ACCESS_LOCATION_PERMISSION_REQUEST_CODE = 222;
const ACTION_REQUEST_ENABLE_BLUETOOTH_REQUEST_CODE = 223;

declare let global: any;

const AppPackageName = useAndroidX() ? global.androidx.core.app : android.support.v4.app;
const LocationPermission = useAndroidX() ? android.Manifest.permission.ACCESS_FINE_LOCATION : android.Manifest.permission.ACCESS_COARSE_LOCATION;

function useAndroidX() {
	return global.androidx && global.androidx.appcompat;
}

export class NativescriptMhtPrinter extends NativescriptMhtPrinterCommon {
	private bluetoothManager: android.bluetooth.BluetoothManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.BLUETOOTH_SERVICE);
	private adapter: android.bluetooth.BluetoothAdapter = this.bluetoothManager.getAdapter();

	private drawCenterCanvas(canvas: Canvas, paint: Paint, text: string) {
		let r: Rect = new Rect();
		canvas.getClipBounds(r);
		let cHeight: number = r.height();
		let cWidth: number = r.width();
		paint.setTextAlign(Paint.Align.LEFT);
		paint.getTextBounds(text, 0, text.length, r);
		let x: number = cWidth / 2 - r.width() / 2 - r.left;
		let y: number = cHeight / 2 + r.height() / 2 - r.bottom;
		canvas.drawText(text, x, y, paint);
	}

	private drawCenterHorizontal(canvas: Canvas, paint: Paint, vertical: number, text: string) {
		let r: Rect = new Rect();
		canvas.getClipBounds(r);
		let cWidth: number = r.width();
		paint.setTextAlign(Paint.Align.LEFT);
		paint.getTextBounds(text, 0, text.length, r);
		let x: number = cWidth / 2 - r.width() / 2 - r.left;
		canvas.drawText(text, x, vertical, paint);
	}

	private drawCenterHorizontalOffset(canvas: Canvas, paint: Paint, vertical: number, text: string, offset: number) {
		let r: Rect = new Rect();
		canvas.getClipBounds(r);
		let cWidth: number = r.width();
		paint.setTextAlign(Paint.Align.LEFT);
		paint.getTextBounds(text, 0, text.length, r);
		let x: number = cWidth / 2 - r.width() / 2 - r.left;
		canvas.drawText(text, x + offset, vertical, paint);
	}

	private saveBitmapToSD(bitmap: Bitmap): boolean {
		try {
			let sd: File = Environment.getExternalStorageDirectory();
			let dest = new File(sd, 'nativescript-mht-printer.png');
			let out: FileOutputStream = new FileOutputStream(dest);
			bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
			out.flush();
			out.close();
		} catch (e) {
			console.log(e);
			return false;
		}
		return true;
	}

	private drawArrow(canvas: Canvas, paint: Paint, x: number, y: number) {
		let mPath: Path = new Path();
		mPath.moveTo(x, y + 20);
		mPath.lineTo(x + 10, y + 20);
		mPath.lineTo(x + 10, y + 10);
		mPath.lineTo(x + 20, y + 25);
		mPath.lineTo(x + 10, y + 40);
		mPath.lineTo(x + 10, y + 30);
		mPath.lineTo(x, y + 30);
		mPath.lineTo(x, y + 20);
		mPath.close();
		canvas.drawPath(mPath, paint);
	}

	private _isEnabled() {
		return this.adapter && this.adapter.isEnabled();
	}

	private _getContext() {
		//noinspection JSUnresolvedVariable,JSUnresolvedFunction
		const ctx = java.lang.Class.forName('android.app.AppGlobals')
			.getMethod('getInitialApplication', null)
			.invoke(null, null);
		if (ctx) {
			return ctx;
		}

		//noinspection JSUnresolvedVariable,JSUnresolvedFunction
		return java.lang.Class.forName('android.app.ActivityThread')
			.getMethod('currentApplication', null)
			.invoke(null, null);
	}

	private _getActivity() {
		const activity = application.android.foregroundActivity || application.android.startActivity;
		if (activity === null) {
			// Throw this off into the future since an activity is not available....
			setTimeout(() => {
				this._getActivity();
			}, 250);
			return;
		} else {
			return activity;
		}
	}

	public requestLocationPermission(callback?: () => void): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const permissionCb = (args: application.AndroidActivityRequestPermissionsEventData) => {
				if (args.requestCode === ACCESS_LOCATION_PERMISSION_REQUEST_CODE) {
					application.android.off(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb);

					for (let i = 0; i < args.permissions.length; i++) {
						if (args.grantResults[i] === android.content.pm.PackageManager.PERMISSION_DENIED) {
							reject('Permission denied');
							return;
						}
					}

					if (callback) {
						callback();
					}
					resolve(true);
				}
			};

			// grab the permission dialog result
			application.android.on(application.AndroidApplication.activityRequestPermissionsEvent, permissionCb);

			// invoke the permission dialog
			AppPackageName.ActivityCompat.requestPermissions(this._getActivity(), [LocationPermission], ACCESS_LOCATION_PERMISSION_REQUEST_CODE);
		});
	}

	public enable(): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				// activityResult event
				const onBluetoothEnableResult = (args: application.AndroidActivityResultEventData) => {
					if (args.requestCode === ACTION_REQUEST_ENABLE_BLUETOOTH_REQUEST_CODE) {
						try {
							// remove the event listener
							application.android.off(application.AndroidApplication.activityResultEvent, onBluetoothEnableResult);

							// RESULT_OK = -1
							if (args.resultCode === android.app.Activity.RESULT_OK) {
								resolve(true);
							} else {
								resolve(false);
							}
						} catch (ex) {
							application.android.off(application.AndroidApplication.activityResultEvent, onBluetoothEnableResult);
							reject(ex);
							return;
						}
					} else {
						application.android.off(application.AndroidApplication.activityResultEvent, onBluetoothEnableResult);
						resolve(false);
						return;
					}
				};

				// set the onBluetoothEnableResult for the intent
				application.android.on(application.AndroidApplication.activityResultEvent, onBluetoothEnableResult);

				// create the intent to start the bluetooth enable request
				const intent = new android.content.Intent(android.bluetooth.BluetoothAdapter.ACTION_REQUEST_ENABLE);
				const activity = application.android.foregroundActivity || application.android.startActivity;
				activity.startActivityForResult(intent, ACTION_REQUEST_ENABLE_BLUETOOTH_REQUEST_CODE);
			} catch (ex) {
				reject(ex);
			}
		});
	}

	public isBluetoothEnabled() {
		return new Promise((resolve, reject) => {
			try {
				resolve(this._isEnabled());
			} catch (ex) {
				reject(ex);
			}
		});
	}

	public printServiceLabel(port: string, serviceId: string, labelNumber: string, clientName: string): Promise<boolean> {
		if (!port || !serviceId || !labelNumber || !clientName) {
			return new Promise<boolean>(resolve => {
				resolve(false);
			});
		}

		let serviceBitmap: Bitmap = Bitmap.createBitmap(180, 180, Bitmap.Config.ARGB_8888);
		let canvas: Canvas = new Canvas(serviceBitmap);

		canvas.rotate(180, 90, 90);
		canvas.drawRGB(255, 255, 255);

		let tpServiceId = new TextPaint();
		let tpLabelNumber = new TextPaint();
		let tpClientName = new TextPaint();
		let linePaint = new Paint(Color.BLACK);
		canvas.drawLine(20, 0, 20, 180, linePaint);

		tpServiceId.setAntiAlias(false);
		tpServiceId.setTextSize(40);
		tpServiceId.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
		tpServiceId.setColor(Color.BLACK);

		tpLabelNumber.setAntiAlias(false);
		tpLabelNumber.setTextSize(40);
		tpLabelNumber.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD_ITALIC));
		tpLabelNumber.setColor(Color.BLACK);

		tpClientName.setAntiAlias(false);
		tpClientName.setTextSize(14);
		tpClientName.setColor(Color.BLACK);

		this.drawArrow(canvas, linePaint, 0, 0);
		this.drawArrow(canvas, linePaint, 0, 70);
		this.drawArrow(canvas, linePaint, 0, 140);
		this.drawCenterHorizontalOffset(canvas, tpServiceId, 40, serviceId, 10);
		this.drawCenterHorizontalOffset(canvas, tpLabelNumber, 100, '#' + labelNumber, 10);
		this.drawCenterHorizontalOffset(canvas, tpClientName, 170, clientName, 10);
		canvas.save();

		//this.saveBitmapToSD(serviceBitmap);

		return new Promise<boolean>(resolve => {
			let tscActivity = new TSCActivity();

			tscActivity.openport(port);
			tscActivity.sendcommand('SIZE 58 mm, 25 mm\r\n');
			//TscDll.sendcommand("GAP 3 mm, 0 mm\r\n");//Gap media
			tscActivity.clearbuffer();
			tscActivity.sendcommand('SPEED 4\r\n');
			tscActivity.sendcommand('CODEPAGE UTF-8\r\n');
			tscActivity.sendcommandUTF8('DENSITY 4\r\n');
			tscActivity.sendcommandUTF8('DIRECTION 1\r\n');
			tscActivity.sendbitmap(180, 0, serviceBitmap);
			tscActivity.qrcode(180, 180, 'M', '8', 'A', '180', 'M1', 'S7', serviceId);
			tscActivity.printlabel(1, 1);
			let res = tscActivity.closeport(1000);
			if (res == '1') {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}

	public printClientLabel(port: string, serviceId: string, clientUrl: string, clientName: string, clientPhone: string, clientEmail: string, clientPass: string): Promise<boolean> {
		if (!port || !serviceId || !clientUrl || !clientName || !clientPhone || !clientEmail || !clientPass) {
			return new Promise<boolean>(resolve => {
				resolve(false);
			});
		}

		let productBitmap: Bitmap = Bitmap.createBitmap(180, 180, Bitmap.Config.ARGB_8888);
		let canvas: Canvas = new Canvas(productBitmap);
		canvas.drawRGB(255, 255, 255);
		let tpServiceId = new TextPaint();
		let tpClient = new TextPaint();

		tpServiceId.setAntiAlias(false);
		tpServiceId.setTextSize(40);
		tpServiceId.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
		tpServiceId.setColor(Color.BLACK);

		tpClient.setAntiAlias(false);
		tpClient.setTextSize(20);
		tpClient.setColor(Color.BLACK);

		this.drawCenterHorizontal(canvas, tpServiceId, 40, serviceId);
		this.drawCenterHorizontal(canvas, tpClient, 80, clientName);
		this.drawCenterHorizontal(canvas, tpClient, 110, clientPhone);
		this.drawCenterHorizontal(canvas, tpClient, 140, clientEmail);
		this.drawCenterHorizontal(canvas, tpClient, 170, clientPass);
		canvas.save();

		//this.saveBitmapToSD(productBitmap);

		return new Promise<boolean>(resolve => {
			let tscActivity = new TSCActivity();

			tscActivity.openport(port);
			tscActivity.sendcommand('SIZE 58 mm, 25 mm\r\n');
			//TscDll.sendcommand("GAP 3 mm, 0 mm\r\n");//Gap media
			tscActivity.clearbuffer();
			tscActivity.sendcommand('SPEED 4\r\n');
			tscActivity.sendcommand('CODEPAGE UTF-8\r\n');
			tscActivity.sendcommandUTF8('DENSITY 4\r\n');
			tscActivity.sendcommandUTF8('DIRECTION 1\r\n');
			tscActivity.sendbitmap(180, 0, productBitmap);
			tscActivity.qrcode(10, 10, 'M', '2', 'A', '0', 'M1', 'S7', clientUrl);
			tscActivity.printlabel(1, 1);
			let res = tscActivity.closeport(1000);
			if (res == '1') {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}

	public printProductLabel(port: string, sku: string, price: string, brand: string, model: string): Promise<boolean> {
		if (!port || !sku || !price || !brand || !model) {
			return new Promise<boolean>(resolve => {
				resolve(false);
			});
		}

		let productBitmap: Bitmap = Bitmap.createBitmap(180, 180, Bitmap.Config.ARGB_8888);
		let canvas: Canvas = new Canvas(productBitmap);
		canvas.drawRGB(255, 255, 255);
		let tpSKU = new TextPaint();
		let tpBrand = new TextPaint();
		let tpPrice = new TextPaint();

		tpSKU.setAntiAlias(false);
		tpSKU.setTextSize(40);
		tpSKU.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
		tpSKU.setColor(Color.BLACK);

		tpPrice.setAntiAlias(false);
		tpPrice.setTextSize(30);
		tpPrice.setColor(Color.BLACK);

		tpBrand.setAntiAlias(false);
		tpBrand.setTextSize(20);
		tpBrand.setColor(Color.BLACK);

		this.drawCenterHorizontal(canvas, tpSKU, 40, sku);
		this.drawCenterHorizontal(canvas, tpPrice, 100, price);
		this.drawCenterHorizontal(canvas, tpBrand, 140, brand.toUpperCase());
		this.drawCenterHorizontal(canvas, tpBrand, 170, model.toUpperCase());
		canvas.save();

		//this.saveBitmapToSD(productBitmap);

		return new Promise<boolean>(resolve => {
			let tscActivity = new TSCActivity();

			tscActivity.openport(port);
			tscActivity.sendcommand('SIZE 58 mm, 25 mm\r\n');
			//TscDll.sendcommand("GAP 3 mm, 0 mm\r\n");//Gap media
			tscActivity.clearbuffer();
			tscActivity.sendcommand('SPEED 4\r\n');
			tscActivity.sendcommand('CODEPAGE UTF-8\r\n');
			tscActivity.sendcommandUTF8('DENSITY 4\r\n');
			tscActivity.sendcommandUTF8('DIRECTION 1\r\n');
			tscActivity.sendbitmap(180, 0, productBitmap);
			tscActivity.qrcode(10, 10, 'M', '8', 'A', '0', 'M1', 'S7', sku);
			tscActivity.printlabel(1, 1);
			let res = tscActivity.closeport(1000);
			if (res == '1') {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}

	public printText(port: string, text: string): Promise<boolean> {
		if (!port || !text) {
			return new Promise<boolean>(resolve => {
				resolve(false);
			});
		}

		let textBitmap: Bitmap = Bitmap.createBitmap(180, 180, Bitmap.Config.ARGB_8888);
		let canvas: Canvas = new Canvas(textBitmap);
		let tpText = new TextPaint();

		tpText.setAntiAlias(false);
		tpText.setTextSize(40);
		tpText.setTypeface(Typeface.create(Typeface.DEFAULT, Typeface.BOLD));
		tpText.setColor(Color.BLACK);

		canvas.drawRGB(255, 255, 255);
		//canvas.drawRGB(0,0,0);
		this.drawCenterHorizontal(canvas, tpText, 100, text);

		canvas.save();

		//this.saveBitmapToSD(imageBitmap);

		return new Promise<boolean>(resolve => {
			let tscActivity = new TSCActivity();

			tscActivity.openport(port);
			tscActivity.sendcommand('SIZE 58 mm, 25 mm\r\n');
			//TscDll.sendcommand("GAP 2 mm, 0 mm\r\n");//Gap media
			tscActivity.clearbuffer();
			tscActivity.sendcommand('SPEED 4\r\n');
			tscActivity.sendcommand('DENSITY 4\r\n');
			tscActivity.sendcommand('DIRECTION 1\r\n');
			tscActivity.sendcommand('CODEPAGE UTF-8\r\n');
			tscActivity.sendbitmap(0, 0, textBitmap);
			tscActivity.printlabel(1, 1);
			let res = tscActivity.closeport(1000);
			if (res == '1') {
				resolve(true);
			} else {
				resolve(false);
			}
		});
	}
}
