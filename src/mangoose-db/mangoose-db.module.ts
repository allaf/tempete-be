import { Module } from '@nestjs/common';
import { mangoProviders } from './mango.providers';

@Module({
  providers: [...mangoProviders],
  exports: [...mangoProviders],
})
export class MangooseDbModule {}
