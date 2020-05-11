import { CustomHeaderComponent } from '../custom-header/custom-header.component';

export const defaultColumnDefs = [
  {
    headerName: '',
    field: 'thumbnails',
    cellRenderer: 'imgRenderer',
    cellClass: 'img-renderer-column',
    headerComponentFramework: CustomHeaderComponent,
    width: 60,
  },
  {
    headerName: 'Published on',
    field: 'publishedAt',
    flex: 1,
  },
  {
    headerName: 'Video Title',
    field: 'title',
    cellRenderer: 'linkRenderer',
    flex: 1,
  },
  {
    headerName: 'Description',
    field: 'description',
    flex: 1,
  },
];
