import { Module } from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { WorkstationsController } from './workstations.controller';

@Module({
  controllers: [WorkstationsController],
  providers: [WorkstationsService]
})
export class WorkstationsModule {}
