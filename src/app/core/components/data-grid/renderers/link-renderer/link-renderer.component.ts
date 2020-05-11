import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { youtubeVideoLinkFactory } from '../../youtube-video-link.factory';

@Component({
  selector: 'app-link-renderer',
  templateUrl: './link-renderer.component.html',
})
export class LinkRendererComponent implements ICellRendererAngularComp {
  public params: any;
  public readonly linkFactory = youtubeVideoLinkFactory;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }
}
