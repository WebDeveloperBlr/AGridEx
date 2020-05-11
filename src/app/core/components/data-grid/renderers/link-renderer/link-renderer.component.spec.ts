import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRendererComponent } from './link-renderer.component';

describe('LinkRendererComponent', () => {
  let component: LinkRendererComponent;
  let fixture: ComponentFixture<LinkRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LinkRendererComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRendererComponent);
    component = fixture.componentInstance;
    component.agInit({
      data: {
        videoId: 'testId',
        title: 'testTitle',
      },
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render youtube link', () => {
    const link = fixture.debugElement.nativeElement
      .querySelector('a[href="https://www.youtube.com/watch?v=testId"][target="_blank"]');

    expect(link).toBeTruthy();
  });

  it('should render link title', () => {
    const link = fixture.debugElement.nativeElement
      .querySelector('a[href="https://www.youtube.com/watch?v=testId"][target="_blank"]');

    expect(link.innerHTML.trim()).toEqual('testTitle');
  });
});
