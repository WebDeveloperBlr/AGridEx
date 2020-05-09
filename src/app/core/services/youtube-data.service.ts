import { ApiService, IApiResponse } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IVideoModel } from '../models/video.model';
import { HttpParams } from '@angular/common/http';
import { APP_CONFIG } from '../constants/app.config';

@Injectable({ providedIn: 'root' })
export class YoutubeDataService {
  private readonly GET_VIDEOS_URL = '/search';

  constructor(public apiService: ApiService) {}

  public getVideos(): Observable<IApiResponse<IVideoModel>> {
    return this.apiService.get<IVideoModel>(this.GET_VIDEOS_URL, {
      params: new HttpParams({ fromObject: { part: 'snippet', key: APP_CONFIG.apiKey, type: 'video', maxResults: '50' } }),
      observe: 'body',
      responseType: 'json',
    });
  }
}
