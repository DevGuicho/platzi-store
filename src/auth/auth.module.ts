import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategie } from './strategies/local.strategie';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategie],
})
export class AuthModule {}
