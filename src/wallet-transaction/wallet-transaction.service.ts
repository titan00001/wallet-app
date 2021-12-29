import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  WalletTransaction,
  WalletTransactionDocument,
} from './schema/wallet-transaction.schema';

@Injectable()
export class WalletTransactionService {
  constructor(
    @InjectModel(WalletTransaction.name)
    private readonly model: Model<WalletTransactionDocument>,
  ) {}

  async addTransaction(transactionData) {
    return await new this.model({ ...transactionData }).save();
  }

  async getTransaction(userId) {
    return await this.model.find({ userId });
  }
}
