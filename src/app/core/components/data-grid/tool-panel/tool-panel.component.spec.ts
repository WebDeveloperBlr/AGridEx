import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolPanelComponent } from './tool-panel.component';
import { DataGridService } from '../data-grid.service';
import createSpy = jasmine.createSpy;

describe('ToolPanelComponent', () => {
  let component: ToolPanelComponent;
  let fixture: ComponentFixture<ToolPanelComponent>;
  let toggleSelectionSpy;
  let parameters;
  const events: any = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolPanelComponent],
      providers: [
        DataGridService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolPanelComponent);
    component = fixture.componentInstance;
    toggleSelectionSpy = spyOn(fixture.componentRef.injector.get(DataGridService), 'toggleSelectionMode');
    parameters = {
      api: {
        addEventListener: (name, fn) => events[name] = fn,
        removeEventListener: createSpy(),
        deselectAll: createSpy(),
        selectAll: createSpy(),
        setColumnDefs: createSpy(),
        getDisplayedRowCount: () => 1231244,
        getSelectedRows: () => ({ length: 434235 }),
      },
    };

    component.agInit(parameters);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch selection mode', () => {
    expect(component.switchSelectionMode());

    expect(toggleSelectionSpy).toHaveBeenCalled();
    expect(parameters.api.deselectAll).not.toHaveBeenCalled();
  });

  it('should set total row on model update', () => {
    expect(component.totalRows).toEqual(0);

    events.modelUpdated();

    expect(component.totalRows).toEqual(1231244);
  });

  it('should set total selected rows on selection update', () => {
    expect(component.selectedRows).toEqual(0);

    events.rowSelected();

    expect(component.selectedRows).toEqual(434235);
  });

  it('should deselect rows if selection is turned off', () => {
    const gridService = fixture.componentRef.injector.get(DataGridService);

    gridService.isSelectionEnabled = true;
    component.switchSelectionMode();

    expect(parameters.api.deselectAll).toHaveBeenCalled();
  });

  it('should remove model change listener', () => {
    component.ngOnDestroy();

    expect(parameters.api.removeEventListener).toHaveBeenCalledWith('modelUpdated', events.modelUpdated);
  });

  it('should remove selection change listener', () => {
    component.ngOnDestroy();

    expect(parameters.api.removeEventListener).toHaveBeenCalledWith('rowSelected', events.rowSelected);
  });
});
