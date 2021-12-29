import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly model: Model<WalletDocument>,
  ) {}

  // find or create wallet
  async getWallet(userId: string) {
    let wallet = await this.model.findOne({ userId: userId });
    if (wallet === null) {
      // create a wallet
      wallet = await new this.model({
        userId,
        credits_total: 100,
        credits_remaining: 100,
        credits_used: 0,
      }).save();
    }
    return wallet;
  }

  async addCredits(userId: string, amount: number, transactionData: any) {
    let wallet = await this.getWallet(userId);

    wallet.credits_total += amount;
    wallet.credits_remaining += amount;

    wallet = await this.model.findOneAndUpdate({ userId }, wallet);

    return wallet;
  }

  async withdrawCredits(userId: string, amount: number, transactionData: any) {
    let wallet = await this.getWallet(userId);

    if (wallet.credits_remaining < amount) {
      return 'Insufficient Balance';
    }

    wallet.credits_remaining -= amount;
    wallet.credits_used += amount;

    wallet = await this.model.findOneAndUpdate({ userId }, wallet);

    return wallet;
  }

  async updateProperties() {
    return 'update properties';
  }
}
