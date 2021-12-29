import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('/:id/addCredits')
  async addCredits(
    @Param('id') userId: string,
    @Body('amount') amount: number,
    @Body('transactionData') transactionData,
  ) {
    return await this.walletService.addCredits(userId, amount, transactionData);
  }

  @Post('/:id/withdrawCredits')
  async withdrawCredits(
    @Param('id') userId: string,
    @Body('amount') amount: number,
    @Body('transactionData') transactionData,
  ) {
    return await this.walletService.withdrawCredits(
      userId,
      amount,
      transactionData,
    );
  }

  @Get('/:id')
  async getWalletDetails(@Param('id') userId: string) {
    return await this.walletService.getWallet(userId);
  }

  @Get('/:id/transactions')
  async getWalletTransactions(@Param('id') userId: string) {
    return await this.walletService.getAllTransactions(userId);
  }
}
