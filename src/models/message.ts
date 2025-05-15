import mongoose, { Schema, model, Document } from 'mongoose';




interface IMessage extends Document {
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: Date; 
  updatedAt?: Date;
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: String, required: true },
  receiverId: { type: String, required: true },
  content: { type: String, required: true },
},
{timestamps: true},
);

const Message = mongoose.models.Message || model<IMessage>('Message', messageSchema);

export default Message;

