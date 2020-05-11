import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DataGridComponent } from './data-grid.component';
import { YoutubeDataService } from '../../services/youtube-data.service';
import { API_URL_TOKEN } from '../../services/api.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const mock = {
  pageInfo: {
    totalResults: 100,
    resultsPerPage: 50,
  },
  items: [
    {
      id: {
        kind: 'string',
        videoId: 'string',
      },
      snippet: {
        publishedAt: '2020-05-08T18:41:14.000Z',
        channelId: 'string',
        title: 'string',
        description: 'string',
        thumbnails: {
          default: {
            url: 'string',
            width: 1,
            height: 1,
          },
          medium: {
            url: 'string',
            width: 1,
            height: 1,
          },
          high: {
            url: 'string',
            width: 1,
            height: 1,
          },
        },
      },
    },
  ],
  nextPageToken: 'asdas',
};

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridComponent],
      providers: [
        {
          provide: YoutubeDataService,
          useValue: {
            getVideos: () => of(mock)
              .pipe(delay(200)),
          },
        },
        {
          provide: API_URL_TOKEN,
          useValue: 'testUrl',
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data', fakeAsync(() => {
    let data;
    component.fetchVideos$.subscribe(value => data = value);

    expect(data).toBeUndefined();

    tick(200);

    expect(data).toEqual(mock);
  }));

  it('should map data', fakeAsync(() => {
    let data;
    component.videos$.subscribe(value => data = value);

    expect(data).toBeUndefined();

    tick(200);

    expect(data).toEqual([{
      description: 'string',
      publishedAt: 'Fri May 08 2020',
      title: 'string',
      videoId: 'string',
      thumbnail: 'string',
    }]);
  }));
});
