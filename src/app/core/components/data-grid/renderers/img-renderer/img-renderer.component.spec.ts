import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgRendererComponent } from './img-renderer.component';

describe('ImgRendererComponent', () => {
  let component: ImgRendererComponent;
  let fixture: ComponentFixture<ImgRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgRendererComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgRendererComponent);
    component = fixture.componentInstance;
    component.agInit({
      data: {
        thumbnail: 'exampleUrl',
        description: 'description',
      },
    });
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render image', () => {
    const image = fixture.debugElement.nativeElement.querySelector('img[src="exampleUrl"]');

    expect(image).toBeTruthy();
  });
});
