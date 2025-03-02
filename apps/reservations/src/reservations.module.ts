import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsModule as ReservationsModuleResource } from './reservations/reservations.module';
@Module({
  imports: [ReservationsModuleResource],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule { }
