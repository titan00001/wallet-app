import { Module } from '@nestjs/common';
import {
  WalletTransaction,
  WalletTransactionSchema,
} from './schema/wallet-transaction.schema';
import { WalletTransactionService } from './wallet-transaction.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletTransaction.name, schema: WalletTransactionSchema },
    ]),
  ],
  providers: [WalletTransactionService],
  exports: [WalletTransactionService],
})
export class WalletTransactionModule {}
