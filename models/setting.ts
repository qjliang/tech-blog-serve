import { Schema, model, models, Model } from 'mongoose';
import { ISetting } from '../types/schema';

export const defaultSetting = {
  blogName: 'iBlog',
  blogSlogan: '',
  blogLogo: 'data:image/png;base64,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',
  recordInfo: '',
  showBlogIntro: true,
  blogIntro: '',
  postPageSize: 10,
  enablePreview: true,
  showLicense: true,
  enableComments: true,
  commentPageSize: 20,
  enableStatistics: false,
  statisticsKey: ''
} as ISetting;

export class Setting {
    private _model: Model<ISetting>;

    constructor () {
      const schema = new Schema<ISetting>({
        blogName: { type: String },
        blogSlogan: { type: String },
        blogLogo: { type: String },
        recordInfo: { type: String },
        showBlogIntro: { type: Boolean },
        blogIntro: { type: String },
        postPageSize: { type: Number },
        enablePreview: { type: Boolean },
        showLicense: { type: Boolean },
        enableComments: { type: Boolean },
        commentPageSize: { type: Number },
        enableStatistics: { type: Boolean },
        statisticsKey: { type: String }
      });

      // 初始化默认系统设置
      schema.statics.initData = () => {
        this.model.exists({}).then(exist => {
          if (!exist) {
            this.model.create(defaultSetting);
          }
        });
      };

      if (models.setting) {
        this._model = models.setting;
      } else {
        this._model = model<ISetting>('setting', schema, 'setting');
      }
    }

    public get model (): Model<ISetting> {
      return this._model;
    }
}
