import { Schema, model, Document } from 'mongoose';




interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  content: string;
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
},
{timestamps: true},
);

const Message = model<IMessage>('Message', messageSchema);

export default Message;

