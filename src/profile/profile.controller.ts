import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('api/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  async getAll() {
    return this.profileService.getAll();
  }

  @Get('/:profileLogin')
  getByLogin(@Param('profileLogin') login: string) {
    return this.profileService.getByLogin(login);
  }
}
