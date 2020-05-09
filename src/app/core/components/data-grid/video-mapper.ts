import { IVideoModel } from '../../models/video.model';
import { IGridVideoModel } from '../../models/grid-video.model';

export class VideoMapper {
  public static mapToTableModel(
    {
      id: { videoId },
      snippet: {
        thumbnails: { default: { url } },
        title,
        publishedAt,
        description,
      },
    }: IVideoModel): IGridVideoModel {
    return {
      description,
      publishedAt,
      title,
      videoId,
      thumbnail: url,
    };
  }
}
