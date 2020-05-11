import { Component } from '@angular/core';
import { YoutubeDataService } from '../../services/youtube-data.service';
import { Observable } from 'rxjs';
import { IVideoModel } from '../../models/video.model';
import { IApiResponse } from '../../services/api.service';
import { map, pluck, share } from 'rxjs/operators';
import { VideoMapper } from './video-mapper';
import { IGridVideoModel } from '../../models/grid-video.model';
import { ImgRendererComponent } from './renderers/img-renderer/img-renderer.component';
import { LinkRendererComponent } from './renderers/link-renderer/link-renderer.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { defaultColumnDefs } from './column-defs/default-columns-def';
import { DataGridService } from './data-grid.service';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { youtubeVideoLinkFactory } from './youtube-video-link.factory';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  providers: [DataGridService],
})
export class DataGridComponent {

  public fetchVideos$: Observable<IApiResponse<IVideoModel>> = this.dataService.getVideos()
    .pipe(share());
  public videos$: Observable<IGridVideoModel[]> = this.fetchVideos$
    .pipe(
      pluck<IApiResponse<IVideoModel>, IVideoModel[]>('items'),
      map<IVideoModel[], IGridVideoModel[]>(videos => videos.map(VideoMapper.mapToTableModel)),
    );

  public readonly defaultColDef = {
    editable: false,
    sortable: false,
    filter: false,
    resizable: false,
    enablePivot: false,
    enableRowGroup: false,
    menuTabs: [],
  };
  public rowSelection = 'multiple';
  public sideBar = {
    toolPanels: [
      {
        id: 'customToolbar',
        labelDefault: 'Tools panel',
        labelKey: 'customToolbar',
        iconKey: 'custom-stats',
        toolPanel: 'customToolbar',
      }
    ],
    defaultToolPanel: 'columns',
  };
  public readonly frameworkComponents = {
    imgRenderer: ImgRendererComponent,
    linkRenderer: LinkRendererComponent,
    customToolbar: ToolPanelComponent,
    customHeaderComponent: CustomHeaderComponent,
  };
  public readonly columnDefs = defaultColumnDefs;

  constructor(private dataService: YoutubeDataService) {}

  public getContextMenuItems(params) {
    return [
      'copy',
      'copyWithHeaders',
      'paste',
      'separator',
      {
        name: 'Open in new tab',
        action: () => window.open(youtubeVideoLinkFactory(params.node.data.videoId), '_blank'),
      },
    ];
  }
}
