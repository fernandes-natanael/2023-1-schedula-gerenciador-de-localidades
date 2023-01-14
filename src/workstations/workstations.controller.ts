import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  CacheInterceptor,
  Headers,
  Req,
} from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';
import { Workstation } from './entities/workstation.entity';
import { HeadersOptions } from './dto/headers-options';
import { request } from 'http';

@Controller('workstations')
@UseInterceptors(CacheInterceptor)
export class WorkstationsController {
  constructor(private readonly workService: WorkstationsService) {}

  @Post()
  async createWork(
    @Body() createWorkstationDto: CreateWorkstationDto,
  ): Promise<Workstation> {
    return await this.workService.createWorkstation(createWorkstationDto);
  }

  @Get()
  async findAll(
    @Req() request: Request,
  ): Promise<Workstation[]> {
    const options = JSON.parse(JSON.stringify(request.headers['options']));
    return await this.workService.findAll(options);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<Workstation> {
    const options = JSON.parse(JSON.stringify(request.headers['options']));
    return await this.workService.findWorkstationOpt(id, options);
  }

  @Put(':id')
  async updateWork(
    @Param('id') id: string,
    @Body() updateWorkstationDto: UpdateWorkstationDto,
  ): Promise<Workstation> {
    return await this.workService.updateWorkstation(id, updateWorkstationDto);
  }

  @Delete(':id')
  async deleteWork(@Param('id') id: string): Promise<string> {
    return await this.workService.deleteWorkstation(id);
  }
}
