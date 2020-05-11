import { Component, OnDestroy } from '@angular/core';
import { IToolPanel, IToolPanelParams } from 'ag-grid-community';
import { selectableColumnDefs } from '../column-defs/selectable-columns-def';
import { defaultColumnDefs } from '../column-defs/default-columns-def';
import { DataGridService } from '../data-grid.service';

@Component({
  selector: 'app-tool-panel',
  templateUrl: './tool-panel.component.html',
  styleUrls: ['./tool-panel.component.scss'],
})
export class ToolPanelComponent implements IToolPanel, OnDestroy {

  public selectedRows = 0;
  public totalRows = 0;
  public readonly selectableColumnDefs = selectableColumnDefs;
  public readonly defaultColumnDefs = defaultColumnDefs;

  private params: IToolPanelParams;
  private readonly modelUpdateListener = this.setTotalRows.bind(this);
  private readonly rowSelectListener = this.setTotalSelectedRows.bind(this);

  get isSelectionEnabled(): boolean {
    return this.dataGridService.isSelectionEnabled;
  }

  constructor(private dataGridService: DataGridService) {}

  public agInit(params: IToolPanelParams): void {
    this.params = params;

    this.params.api.addEventListener(
      'modelUpdated',
      this.modelUpdateListener,
    );
    this.params.api.addEventListener(
      'rowSelected',
      this.rowSelectListener,
    );
  }

  public switchSelectionMode(): void {
    if (this.dataGridService.isSelectionEnabled) {
      this.params.api.deselectAll();
    }

    this.dataGridService.toggleSelectionMode();
    this.dataGridService.isSelectionEnabled
      ? this.params.api.setColumnDefs(this.selectableColumnDefs)
      : this.params.api.setColumnDefs(this.defaultColumnDefs);
  }

  public refresh(): void {}

  public ngOnDestroy(): void {
    this.params.api.removeEventListener(
      'modelUpdated',
      this.modelUpdateListener,
    );
    this.params.api.removeEventListener(
      'rowSelected',
      this.rowSelectListener,
    );
  }

  private setTotalRows(): void {
    this.totalRows = this.params.api.getDisplayedRowCount();
  }

  private setTotalSelectedRows(): void {
    this.selectedRows = this.params.api.getSelectedRows().length;
  }
}
