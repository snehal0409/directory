import { Schema, model, models, Document, Types } from 'mongoose';

export interface ItemDocument extends Document {
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId: string;
}

export interface LeanItem {
  _id: Types.ObjectId;
  itemTitle: string;
  itemDescription: string;
  subcategoryKey: string;
  userId: Types.ObjectId;

}


const ItemSchema = new Schema<ItemDocument>(
  {
    itemTitle: { type: String, required: true },
    itemDescription: { type: String, required: true },
    subcategoryKey: { type: String, required: true },
    userId: { type: String, required: true },
    
  },
  { timestamps: true }
);

const Item = models.Item || model<ItemDocument>('Item', ItemSchema);

export default Item;
