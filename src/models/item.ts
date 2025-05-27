import { Schema, model, models, Document, Types } from 'mongoose';

export type Image=  {
  thumbnail: string;
  presignedUrl: Image[];
  thumb: string,
  url: string,
}

export type Video = {
  file: boolean;
  thumb: string,
  url: string,
}

export interface ItemDocument extends Document {
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId?: string;
  images: Image[];
  videos: Video[];
}

export interface LeanItem {
  _id: Types.ObjectId;
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId?: string;
  images: Image[];
  videos: Video[]; 
}


const ImageSchema = new Schema<Image>(
  {
    thumb: { type: String, required: true },
    url: { type: String, required: true },
  },
  {_id: false},
)


const VideoSchema = new Schema<Video>(
  {
    thumb: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);


const ItemSchema = new Schema<ItemDocument>(
  {
    itemTitle: { type: String, required: true },
    itemDescription: { type: String, required: true },
    subcategoryKey: { type: String, required: true },
    userId: { type: String, required: false },
    images: { type: [ImageSchema], default: []},
    videos: { type: [VideoSchema], default: [] },
    
  },
  { timestamps: true }
);

const Item = models.Item || model<ItemDocument>('Item', ItemSchema);

export default Item;
