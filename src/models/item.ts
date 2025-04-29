import { Schema, model, models, Document, Types } from 'mongoose';

export type Image=  {
  thumb: string,
  url: string,
}

export interface ItemDocument extends Document {
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId: string;
  images: Image[];
}

export interface LeanItem {
  _id: Types.ObjectId;
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId: Types.ObjectId;
  images: Image[];
}


const ImageSchema = new Schema<Image>(
  {
    thumb: { type: String, required: true },
    url: { type: String, required: true },
  },
  {_id: false},
)

const ItemSchema = new Schema<ItemDocument>(
  {
    itemTitle: { type: String, required: true },
    itemDescription: { type: String, required: true },
    subcategoryKey: { type: String, required: true },
    userId: { type: String, required: true },
    images: { type: [ImageSchema], default: []},
    
  },
  { timestamps: true }
);

const Item = models.Item || model<ItemDocument>('Item', ItemSchema);

export default Item;
