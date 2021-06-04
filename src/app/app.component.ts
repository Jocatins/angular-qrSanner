import {
  Component,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
  OnInit,
} from '@angular/core';

import { QrScannerComponent } from 'angular2-qrscanner';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild(QrScannerComponent, { static: true })
  qrScannerComponent: QrScannerComponent;
  title = 'dropdown';
  dataGotten = [];

  // dropdownList = [];
  // selectedItems = [];

  // dropdownSettings: IDropdownSettings;

  ngOnInit() {}
  ngAfterViewInit() {
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      console.log(devices);
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let chosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            chosenDev = dev;
            break;
          }
        }
        if (chosenDev) {
          this.qrScannerComponent.chooseCamera.next(chosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });
    this.qrScannerComponent.capturedQr.subscribe((result) => {
      this.dataGotten = result;
      console.log(result);
    });

    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' },
    // ];
    // this.dropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true,
    // };
  }
  // onItemSelect(item: any) {
  //   console.log(item);
  // }
  // onSelectAll(items: any) {
  //   console.log(items);
  // }
}
