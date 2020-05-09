import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgRendererComponent } from './img-renderer.component';

describe('ImgRendererComponent', () => {
  let component: ImgRendererComponent;
  let fixture: ComponentFixture<ImgRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
