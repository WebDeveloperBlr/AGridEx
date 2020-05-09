import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-img-renderer',
  templateUrl: './img-renderer.component.html',
  styleUrls: ['./img-renderer.component.scss'],
})
export class ImgRendererComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
