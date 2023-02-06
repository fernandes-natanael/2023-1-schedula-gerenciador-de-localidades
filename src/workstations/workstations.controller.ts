import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';
import { Workstation } from './entities/workstation.entity';
import { DeleteWorkstationDto } from './dto/delete-workstation.dto';

@Controller('workstations')
@UseInterceptors(CacheInterceptor)
export class WorkstationsController {
  constructor(private readonly workService: WorkstationsService) {}

  // Rota para criação de um posto de trabalho
  @Post()
  async createWork(
    @Body() createWorkstationDto: CreateWorkstationDto,
  ): Promise<Workstation> {
    return await this.workService.createWorkstation(createWorkstationDto);
  }

  // Rota para obter todos os postos de trabalho cadastrados
  @Get()
  async findAll(): Promise<Workstation[]> {
    return await this.workService.findAll();
  }

  // Rota para obter um posto de trabalho cadastrado
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Workstation> {
    return await this.workService.findWorkstation(id);
  }

  // Rota para atualizar um posto de trabalho cadastrado
  @Put(':id')
  async updateWork(
    @Param('id') id: string,
    @Body() updateWorkstationDto: UpdateWorkstationDto,
  ): Promise<Workstation> {
    return await this.workService.updateWorkstation(id, updateWorkstationDto);
  }

  // Rota para excluir um posto de trabalho cadastrado
  @Post(':id')
  async deleteWorksta(
    @Param('id') id: string,
    @Body() deleteWorkstationDto: DeleteWorkstationDto,
  ): Promise<string> {
    return await this.workService.deleteWorkstation(id, deleteWorkstationDto);
  }
}
