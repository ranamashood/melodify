import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsGateway } from './clients.gateway';

@Module({
  providers: [ClientsGateway, ClientsService],
})
export class ClientsModule {}
