import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletModule } from './wallet/wallet.module';
import { WalletTransactionModule } from './wallet-transaction/wallet-transaction.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-wallet'),
    WalletModule,
    WalletTransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
