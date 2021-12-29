import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletTransactionDocument = WalletTransaction & Document;

@Schema()
export class WalletTransaction {
  @Prop({ required: true })
  userId: string;
  
  @Prop()
  credit: boolean = false;

  @Prop()
  debit: boolean = false;

  @Prop({ required: true })
  amount: number = 0;

  @Prop({ type: {} })
  metadata: any;

  @Prop({ default: Date })
  created: string;
}

export const WalletTransactionSchema =
  SchemaFactory.createForClass(WalletTransaction);
