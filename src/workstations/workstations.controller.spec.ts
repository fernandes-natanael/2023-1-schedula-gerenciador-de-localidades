import { UpdateWorkstationDto } from './dto/update-workstation.dto';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { WorkstationsController } from './workstations.controller';
import { WorkstationsService } from './workstations.service';
import { v4 as uuid } from 'uuid';
import { CacheModule } from '@nestjs/common';
import { DeleteWorkstationDto } from './dto/delete-workstation.dto';

describe('WorkstationsController', () => {
  let controller: WorkstationsController;
  let service: WorkstationsService;

  const mockUuid = uuid();

  const mockCreateWorkstationDto: CreateWorkstationDto = {
    name: 'mockStation',
    city_id: mockUuid,
    phone: '9999999999',
    ip: '127.0.0.0',
    gateway: 'mockGate',
    parent_workstation_id: null,
    child_workstation_ids: null,
  };

  const mockUpdateWorkstationDto: UpdateWorkstationDto = {
    name: 'updatedMockStation',
    city_id: mockUuid,
    phone: '9999999999',
    ip: '127.0.0.0',
    gateway: 'mockGate',
    parent_workstation_id: null,
    child_workstation_ids: null,
  };

  const mockDeleteWorkstationDto: DeleteWorkstationDto = {
    '0': ['1', '2', '3'],
    '4': ['5', '6', '7'],
  };

  const mockWorkstationEntityList = [{ ...mockCreateWorkstationDto }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkstationsController],
      providers: [
        {
          provide: WorkstationsService,
          useValue: {
            createWorkstation: jest
              .fn()
              .mockResolvedValue(mockCreateWorkstationDto),
            findAll: jest.fn().mockResolvedValue(mockWorkstationEntityList),
            findWorkstation: jest
              .fn()
              .mockResolvedValue(mockWorkstationEntityList[0]),
            updateWorkstation: jest
              .fn()
              .mockResolvedValue(mockUpdateWorkstationDto),
            deleteWorkstation: jest
              .fn()
              .mockResolvedValue('Deletado com sucesso'),
          },
        },
      ],
      imports: [CacheModule.register()],
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
  });

  describe('findWorkstation', () => {
    it('should return a workstation entity successfully', async () => {
      const id = mockUuid;

      const result = await controller.findOne(id);

      expect(result).toEqual(mockWorkstationEntityList[0]);

      expect(service.findWorkstation).toHaveBeenCalledTimes(1);
    });
  });

  describe('createWorkstation', () => {
    it('should create a workstation entity successfully', async () => {
      const result = await controller.createWork(mockCreateWorkstationDto);

      expect(result).toEqual(mockCreateWorkstationDto);

      expect(service.createWorkstation).toHaveBeenCalledTimes(1);

      expect(service.createWorkstation).toHaveBeenCalledWith(
        mockCreateWorkstationDto,
      );
    });
  });

  describe('updateWorkstation', () => {
    it('should update a workstation entity succesfully', async () => {
      const id = mockUuid;

      const result = await controller.updateWork(id, mockUpdateWorkstationDto);

      expect(result).toEqual(mockUpdateWorkstationDto);

      expect(service.updateWorkstation).toHaveBeenCalledTimes(1);

      expect(service.updateWorkstation).toHaveBeenCalledWith(
        id,
        mockUpdateWorkstationDto,
      );
    });
  });

  describe('deleteWorkstation', () => {
    it('should delete a workstation entity succesfully', async () => {
      const id = mockUuid;

      const result = await controller.deleteWorksta(
        id,
        mockDeleteWorkstationDto,
      );

      expect(result).toMatch('Deletado com sucesso');

      expect(service.deleteWorkstation).toHaveBeenCalledTimes(1);

      expect(service.deleteWorkstation).toHaveBeenCalledWith(
        id,
        mockDeleteWorkstationDto,
      );
    });
  });
});
