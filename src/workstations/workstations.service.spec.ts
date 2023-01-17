import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CitiesService } from '../cities/cities.service';
import { Repository } from 'typeorm';
import { Workstation } from './entities/workstation.entity';
import { WorkstationsService } from './workstations.service';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';
import { HeadersOptions } from './dto/headers-options';
import { InternalServerErrorException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

describe('WorkstationsService', () => {
  let service: WorkstationsService;
  let repo: Repository<Workstation>;
  let citiesService: CitiesService;

  const mockUuid = uuid();

  const mockCity = {
    id: 'MockCityId',
    name: 'mockCity',
    state: 'MC',
  };

  const mockCityList = [{ ...mockCity }];

  const mockCreateWorkstationDto: CreateWorkstationDto = {
    name: 'mockStation',
    city_id: 'mockCityId',
    phone: '9999999999',
    ip:'127.0.0.0',
    gateway: 'mockGate',
    parent_workstation_id: null,
    child_workstation_ids: null,
  };

  const mockUpdateWorkstationDto: UpdateWorkstationDto = {
    name: 'updatedMockStation',
    city_id: 'mockCityId',
    phone: '9999999999',
    ip:'127.0.0.0',
    gateway: 'mockGate',
    parent_workstation_id: null,
    child_workstation_ids: null,
  };

  const mockCreateWorkstationEntity = {
    id: '25', 
    name: 'mockWork',
    city: mockCity,
    phone: '9999999999',
    ip: '127.0.0.0',
    parent_workstation: null,
    child_workstations: [],
    gateway: 'mockGate',
  }

  const mockUpdateWorkstationEntity = {
    id: '25',
    name: 'mockWork',
    city: mockCity,
    phone: '9999999999',
    ip: '127.0.0.0',
    parent_workstation: null,
    child_workstations: [],
    gateway: 'mockGate',
  }

  const mockHeaderOptions: HeadersOptions = {
    id: true,
    name: true,
    city: true,
    phone: true,
    ip: true,
    gateway: true,
    parent_workstation: true,
    child_workstations: true,
  }

  const mockWorkstationIdsList: string[] = ['25'];

  const mockWorkstationEntityList = [{ ...mockCreateWorkstationEntity }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkstationsService,
        {
          provide: getRepositoryToken(Workstation),
          useValue: {
            create: jest.fn().mockResolvedValue(mockCreateWorkstationEntity),
            find: jest.fn().mockResolvedValue(mockWorkstationEntityList),
            findOne: jest.fn().mockResolvedValue(mockWorkstationEntityList[0]),
            findOneBy: jest.fn().mockResolvedValue(mockWorkstationEntityList[0]),
            update: jest.fn().mockResolvedValue(mockUpdateWorkstationEntity),
            delete: jest.fn().mockResolvedValue('Deletado com sucesso'),
            save: jest.fn(),
          },
        },
        {
          provide: CitiesService,
          useValue: {
            createCity: jest.fn().mockResolvedValue(mockCity),
            findCities: jest.fn().mockResolvedValue(mockCityList),
            findCityById: jest.fn().mockResolvedValue(mockCityList[0]),
            updateCity: jest.fn(),
            deleteCity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkstationsService>(WorkstationsService);
    repo = module.get<Repository<Workstation>>(getRepositoryToken(Workstation));
    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
    expect(citiesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a workspace entity list successfully', async() =>{
      const result = await service.findAll(mockHeaderOptions);

      expect(result).toEqual(mockWorkstationEntityList);

      expect(repo.find).toHaveBeenCalledTimes(1);
    });

    it('should throw a internal server error', async() => {
      jest.spyOn(repo, 'find').mockRejectedValueOnce(new Error());

      expect(service.findAll).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findWorkstation', () => {
    it('should return a workstation entity successfully', async() => {
      const relations = ["parent_workstation", "child_workstations"];

      const result = await service.findWorkstation(mockUuid);

      expect(result).toEqual(mockWorkstationEntityList[0]);

      expect(repo.findOne).toHaveBeenCalledTimes(1);

      expect(repo.findOne).toHaveBeenCalledWith({relations: relations, where:{id: mockUuid}});
    });

    it('should throw a internal server error', async() => {
      jest.spyOn(repo, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.findWorkstation(mockUuid)).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('findOneOpt', () => {
    it('should return a workstation entity successfully', async() => {
      const {
        id,
        name,
        city,
        phone,
        ip,
        gateway,
        parent_workstation,
        child_workstations,
      } = mockHeaderOptions;

      const result = await service.findWorkstationOpt(mockUuid, mockHeaderOptions);

      expect(result).toEqual(mockWorkstationEntityList[0]);

      expect(repo.findOne).toHaveBeenCalledTimes(1);

      expect(repo.findOne).toHaveBeenCalledWith({relations: {city, parent_workstation, child_workstations} , select: {id, name, phone, ip, gateway}, where:{id: mockUuid}});

    });

    it('should throw a internal server error', async() =>{
      jest.spyOn(repo, 'findOne').mockRejectedValueOnce(new Error());

      expect(service.findWorkstationOpt(mockUuid, mockHeaderOptions)).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('createWorkstation', () =>{
    it('should create a workstation entity successfully', async() => {
      const result = await service.createWorkstation(mockCreateWorkstationDto);

      expect(result).toEqual(mockCreateWorkstationEntity);

      expect(repo.create).toHaveBeenCalledTimes(1);
    });

    it('should throw a internal server error', async() =>{
      jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error());

      expect(service.createWorkstation).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('updateWorkstation', () =>{
    it('should update a workstation entity successfully', async() =>{
      const result = await service.updateWorkstation(mockUuid, mockUpdateWorkstationDto);
      
      expect(result).toEqual(mockUpdateWorkstationEntity);

      expect(repo.findOneBy).toHaveBeenCalledTimes(2);

      expect(repo.save).toHaveBeenCalledTimes(1);
    })

    it('should throw a internal server error', async() =>{
      jest.spyOn(repo, 'save').mockRejectedValueOnce(new Error());

      expect(service.updateWorkstation(mockUuid, mockUpdateWorkstationDto)).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('deleteWorkstation', () => {
    it('should delete a workstation entity successfully', async() => {
      const result = await service.deleteWorkstation(mockUuid, {
        '25': ['25'],
      });

      expect(result).toEqual('Deletado com sucesso');
    });

    it('should throw a internal server error', async() =>{
      jest.spyOn(repo, 'delete').mockRejectedValueOnce(new Error());

      expect(
        service.deleteWorkstation(mockUuid, {
          '25': ['25'],
        }),
      ).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('UpdateChilds', () =>{
    it('should return a workstation entity list successfully', async() =>{
      const result = await service.updateChilds(mockWorkstationIdsList);

      expect(result).toEqual(mockWorkstationEntityList);
    });
  });
});
