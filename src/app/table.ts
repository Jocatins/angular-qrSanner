import { Component, OnInit, ViewChild } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { BatchService } from 'app/shared/services/batch.service';
import { Batch } from 'app/shared/model/batch.model';
import { Router } from '@angular/router';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ITransactionDetail } from 'app/shared/model/trans-detail.model';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'jhi-online-applications',
  templateUrl: './online-applications.component.html',
  styleUrls: ['online-applications.component.scss'],
})
export class OnlineApplicationsComponent implements OnInit {
  public resourceUrl = SERVER_API_URL + 'api/batches';
  fullbatches: ITransactionDetail[];
  data: ITransactionDetail[];
  collectionSize: number;
  batches: Batch[];
  predicate: any;
  reverse: boolean;

  page = 1;
  pageSize = 5;
  // batch: Batch[];
  dropdownList = [];
  selectedItems = [];
  selectedIds = [];

  dropdownSettings: IDropdownSettings;
  dropdownSettings1: IDropdownSettings;
  dropdownSettings2: IDropdownSettings;
  dropdownSettings3: IDropdownSettings;
  dropdownSettings4: IDropdownSettings;
  dropdownSettings5: IDropdownSettings;
  dropdownSettings6: IDropdownSettings;

  displayColumns: string[] = [
    'createDate',
    'createdBy',
    'status',
    'transactionNumber',
    'transactionType',
    'party',
    'id',
  ];

  dataSource = new MatTableDataSource<any>(); // new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  positionFilter = new FormControl();
  nameFilter = new FormControl();

  constructor(protected batchService: BatchService, private router: Router) {}

  ngOnInit(): void {
    this.batchService.getAllBatchesEmbelish().subscribe((batchTran) => {
      this.fullbatches = batchTran.body;
      // this.collectionSize = this.fullbatches.length;
      this.data = batchTran.body;
      this.dataSource.data = this.fullbatches;
      this.dataSource.paginator = this.paginator;

      // this.refreshBatch();
    });

    this.positionFilter.valueChanges.subscribe((positionFilterValue) => {
      this.dataSource.data = this.filterOptions(
        positionFilterValue,
        this.nameFilter.value
      );
    });
    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.dataSource.data = this.filterOptions(
        this.positionFilter.value,
        nameFilterValue
      );
    });

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'createDate',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'id',
      textField: 'createdBy',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'id',
      textField: 'status',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings3 = {
      singleSelection: true,
      idField: 'id',
      textField: 'transactionNumber',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings4 = {
      singleSelection: false,
      idField: 'id',
      textField: 'transactionType',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings5 = {
      singleSelection: true,
      idField: 'id',
      textField: 'party',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettings6 = {
      singleSelection: true,
      idField: 'id',
      textField: 'id',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    this.selectedIds.push(item.id);
    this.resetTable();
  }
  onSelectAll() {
    this.selectedIds = this.data.map((x) => x.id);
    this.resetTable();
  }
  onDeSelectAll() {
    this.selectedIds = [];
    this.fullbatches = [...this.data];
  }
  onItemDeSelect(item: any) {
    this.selectedIds.splice(this.selectedIds.indexOf(item.id), 1);
    if (this.selectedIds.length > 0) {
      this.resetTable();
    } else {
      this.fullbatches = [...this.data];
    }
  }
  resetTable() {
    this.fullbatches = [
      ...this.data.filter((x) => this.selectedIds.includes(x.id)),
    ];
  }

  filterOptions(
    positionValue: string[],
    nameValue: string[]
  ): ITransactionDetail[] {
    if ((!positionValue || positionValue.length === 0) && !nameValue) {
      return this.data;
    }
    const filtered = this.data.filter((periodicElement) => {
      return (
        (nameValue
          ? periodicElement.transactionType
              .toLowerCase()
              .includes(nameValue.toString().toLowerCase())
          : false) ||
        (positionValue
          ? positionValue.includes(periodicElement.id + '')
          : false)
      );
    });
    return filtered;
  }
  viewBatch(batchId: number) {
    this.router.navigate(['/application-summary', batchId]);
  }
}
