import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true, index: true, unique: true })
  userId: string;

  @Prop({ required: true })
  credits_total: number;

  @Prop({ required: true })
  credits_remaining: number;

  @Prop({ required: true })
  credits_used: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
