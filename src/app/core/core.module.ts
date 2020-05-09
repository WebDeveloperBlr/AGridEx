import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { API_URL_TOKEN } from './services/api.service';
import { APP_CONFIG } from './constants/app.config';
import { ImgRendererComponent } from './components/data-grid/renderers/img-renderer/img-renderer.component';
import { LinkRendererComponent } from './components/data-grid/renderers/link-renderer/link-renderer.component';

@NgModule({
  declarations: [DataGridComponent, ImgRendererComponent, LinkRendererComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
  ],
  exports: [DataGridComponent],
  providers: [{ provide: API_URL_TOKEN, useValue: APP_CONFIG.apiUrl }],
})
export class CoreModule {
}
