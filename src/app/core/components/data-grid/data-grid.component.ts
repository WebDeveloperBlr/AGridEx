import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { YoutubeDataService } from '../../services/youtube-data.service';
import { Observable } from 'rxjs';
import { IVideoModel } from '../../models/video.model';
import { IApiResponse } from '../../services/api.service';
import { map, mapTo, pluck, share } from 'rxjs/operators';
import { VideoMapper } from './video-mapper';
import { IGridVideoModel } from '../../models/grid-video.model';
import { ImgRendererComponent } from './renderers/img-renderer/img-renderer.component';
import { LinkRendererComponent } from './renderers/link-renderer/link-renderer.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {

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
    flex: 1,
    minWidth: 100,
    filter: false,
    resizable: true,
    enablePivot: false,
    enableRowGroup: false,
    headerCheckboxSelection: this.isFirstColumn,
    checkboxSelection: this.isFirstColumn,
  };
  public readonly gridOptions: GridOptions = {};
  public rowSelection = 'multiple';
  public rowMultiSelectWithClick = true;
  public sideBar = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressSideButtons: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
          contractColumnSelection: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  };
  public rowGroupPanelShow = 'always';
  public readonly fremeworkComponents = {
    imgRenderer: ImgRendererComponent,
    linkRenderer: LinkRendererComponent,
  };
  public readonly columnDefs = [
    {
      headerName: '',
      field: 'thumbnails',
      cellRenderer: 'imgRenderer',
    },
    {
      headerName: 'Published on',
      field: 'publishedAt',
    },
    {
      headerName: 'Video Title',
      field: 'title',
      cellRenderer: 'linkRenderer',
    },
    {
      headerName: 'Description',
      field: 'description',
    },
  ];

  constructor(private dataService: YoutubeDataService) {
  }

  ngOnInit(): void {
  }

  public isFirstColumn(params) {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
  }
}
