export const selectableColumnDefs = [
  {
    headerName: '',
    field: 'thumbnails',
    cellRenderer: 'imgRenderer',
    cellClass: 'img-renderer-column',
    width: 120,
    checkboxSelection: true,
    headerComponent: 'customHeaderComponent',
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
