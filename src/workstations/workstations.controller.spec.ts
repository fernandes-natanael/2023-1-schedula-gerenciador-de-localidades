import { UpdateWorkstationDto } from './dto/update-workstation.dto';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkstationsController } from './workstations.controller';
import { WorkstationsService } from './workstations.service';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common';

describe('WorkstationsController', () => {
  let controller: WorkstationsController;
  let service: WorkstationsService;

  const mockUuid = uuid();

  const mockCreateWorkstationDto: CreateWorkstationDto = {
    nome: 'mockStation',
  };

  const mockUpdateWorkstationDto: UpdateWorkstationDto = {
    nome: 'mockStation',
  };

  const mockWorkstationEntityList = [{ ...mockCreateWorkstationDto }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkstationsController],
      providers: [
        {
          provide: WorkstationsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(mockWorkstationEntityList),
            findOne: jest.fn().mockResolvedValue(mockWorkstationEntityList[0]),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WorkstationsController>(WorkstationsController);
    service = module.get<WorkstationsService>(WorkstationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a workstation list entity successfully', async () => {
      const result = await controller.findAll();

      expect(result).toEqual(mockWorkstationEntityList);

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exception', () => {
      jest.spyOn(service, 'findAll').mockResolvedValueOnce([]);

      expect(controller.findAll).rejects.toThrowError(NotFoundException);
    });
  });

  describe('findOneById', () => {
    it('should return a workstation entity successfully', async () => {
      const id = mockUuid;

      const result = await controller.findOne(id);

      expect(result).toEqual(mockWorkstationEntityList[0]);
    });
  });
});
