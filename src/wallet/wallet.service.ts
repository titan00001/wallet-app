import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './schema/wallet.schema';
import { WalletTransactionService } from 'src/wallet-transaction/wallet-transaction.service';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly model: Model<WalletDocument>,
    private readonly transactionService: WalletTransactionService,
  ) {}

  // find or create wallet
  async getWallet(userId: string) {
    const initialCredit = 100;

    let wallet = await this.model.findOne({ userId: userId });
    if (wallet === null) {
      // create a wallet
      wallet = await new this.model({
        userId,
        credits_total: initialCredit,
        credits_remaining: initialCredit,
        credits_used: 0,
      }).save();

      const transaction = {
        userId,
        credit: true,
        debit: false,
        amount: initialCredit,
        metadata: {
          message: 'Wallet activated',
        },
      };

      await this.updateProperties(transaction);
    }

    return wallet;
  }

  async addCredits(userId: string, amount: number, transactionData: any) {
    let wallet = await this.getWallet(userId);

    wallet.credits_total += amount;
    wallet.credits_remaining += amount;

    wallet = await this.model.findOneAndUpdate({ userId }, wallet, {
      returnDocument: 'after',
    });

    const transaction = {
      userId,
      credit: true,
      debit: false,
      amount: amount,
      metadata: transactionData,
    };

    await this.updateProperties(transaction);

    return wallet;
  }

  async withdrawCredits(userId: string, amount: number, transactionData: any) {
    let wallet = await this.getWallet(userId);

    if (wallet.credits_remaining < amount) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Insufficient Credts',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    wallet.credits_remaining -= amount;
    wallet.credits_used += amount;

    wallet = await this.model.findOneAndUpdate({ userId }, wallet, {
      returnDocument: 'after',
    });

    const transaction = {
      userId,
      credit: false,
      debit: true,
      amount: amount,
      metadata: transactionData,
    };

    await this.updateProperties(transaction);

    return wallet;
  }

  async updateProperties(transactionData) {
    return await this.transactionService.addTransaction(transactionData);
  }

  async getAllTransactions(userId) {
    return await this.transactionService.getTransaction(userId);
  }
}
