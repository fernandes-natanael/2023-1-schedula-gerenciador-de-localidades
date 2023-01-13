import { Injectable } from '@nestjs/common';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';

@Injectable()
export class WorkstationsService {
  create(createWorkstationDto: CreateWorkstationDto) {
    return 'This action adds a new workstation';
  }

  findAll() {
    return `This action returns all workstations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workstation`;
  }

  update(id: number, updateWorkstationDto: UpdateWorkstationDto) {
    return `This action updates a #${id} workstation`;
  }

  remove(id: number) {
    return `This action removes a #${id} workstation`;
  }
}
