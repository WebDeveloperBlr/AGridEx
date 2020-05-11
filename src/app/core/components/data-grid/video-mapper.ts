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
      publishedAt: new Date(publishedAt).toDateString(),
      title,
      videoId,
      thumbnail: url,
    };
  }
}
