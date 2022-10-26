import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nativescript-accordion', loadChildren: () => import('./plugin-demos/nativescript-accordion.module').then((m) => m.NativescriptAccordionModule) },
  { path: 'nativescript-mht-printer', loadChildren: () => import('./plugin-demos/nativescript-mht-printer.module').then((m) => m.NativescriptMhtPrinterModule) },
  { path: 'nativescript-sms-receiver', loadChildren: () => import('./plugin-demos/nativescript-sms-receiver.module').then((m) => m.NativescriptSmsReceiverModule) },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
