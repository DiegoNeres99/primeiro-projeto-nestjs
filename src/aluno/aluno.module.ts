import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from '../email/email.module'; //importacao para email
import { SchedulerModule } from 'src/agendamento/scheduler.module';

@Module({
  imports: [PrismaModule,EmailModule,SchedulerModule],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: []
})
export class AlunoModule {}