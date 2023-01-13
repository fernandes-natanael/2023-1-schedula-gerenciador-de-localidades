import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';

@Controller('workstations')
export class WorkstationsController {
  constructor(private readonly workstationsService: WorkstationsService) {}

  @Post()
  create(@Body() createWorkstationDto: CreateWorkstationDto) {
    return this.workstationsService.create(createWorkstationDto);
  }

  @Get()
  findAll() {
    return this.workstationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workstationsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkstationDto: UpdateWorkstationDto,
  ) {
    return this.workstationsService.update(+id, updateWorkstationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workstationsService.remove(+id);
  }
}
