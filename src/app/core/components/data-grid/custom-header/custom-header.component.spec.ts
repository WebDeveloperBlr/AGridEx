import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomHeaderComponent } from './custom-header.component';
import { DataGridService } from '../data-grid.service';
import createSpy = jasmine.createSpy;

describe('CustomHeaderComponent', () => {
  let component: CustomHeaderComponent;
  let fixture: ComponentFixture<CustomHeaderComponent>;
  let dataGridService;
  let parameters;

  beforeEach(async(() => {
    dataGridService = jasmine.createSpyObj(['toggleSelectionMode']);
    dataGridService.isSelectionEnabled = false;

    TestBed.configureTestingModule({
      declarations: [CustomHeaderComponent],
      providers: [{
        provide: DataGridService,
        useValue: dataGridService,
      }],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    parameters = {
      api: {
        selectAll: createSpy(),
        deselectAll: createSpy(),
      },
    };
    fixture = TestBed.createComponent(CustomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.agInit(parameters);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize ag parameters', () => {
    expect(component.params).toEqual(parameters);
  });

  it('should select all rows', () => {
    component.handleGlobalSelection(true);

    expect(parameters.api.selectAll).toHaveBeenCalled();
  });

  it('should unselect all rows', () => {
    component.handleGlobalSelection(false);

    expect(parameters.api.deselectAll).toHaveBeenCalled();
  });
});
