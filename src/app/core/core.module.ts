import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { API_URL_TOKEN } from './services/api.service';
import { APP_CONFIG } from './constants/app.config';
import { ImgRendererComponent } from './components/data-grid/renderers/img-renderer/img-renderer.component';
import { LinkRendererComponent } from './components/data-grid/renderers/link-renderer/link-renderer.component';
import { ToolPanelComponent } from './components/data-grid/tool-panel/tool-panel.component';
import { CustomHeaderComponent } from './components/data-grid/custom-header/custom-header.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataGridComponent,
    ImgRendererComponent,
    LinkRendererComponent,
    ToolPanelComponent,
    CustomHeaderComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    FormsModule,
  ],
  exports: [DataGridComponent],
  providers: [{ provide: API_URL_TOKEN, useValue: APP_CONFIG.apiUrl }],
})
export class CoreModule {
}
