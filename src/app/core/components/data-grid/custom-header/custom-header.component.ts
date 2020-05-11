import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { DataGridService } from '../data-grid.service';

@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
})
export class CustomHeaderComponent implements IHeaderAngularComp {
  public params: IHeaderParams;

  get isSelectionEnabled(): boolean {
    return this.dataGridService.isSelectionEnabled;
  }

  get isAllItemsSelected(): boolean {
    return this.params.api.getDisplayedRowCount() === this.params.api.getSelectedRows().length;
  }

  constructor(private dataGridService: DataGridService) {}

  public agInit(params: IHeaderParams) {
    this.params = params;
  }

  public handleGlobalSelection(isChecked): void {
    isChecked ? this.params.api.selectAll() : this.params.api.deselectAll();
  }
}
