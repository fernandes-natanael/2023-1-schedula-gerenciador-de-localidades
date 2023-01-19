import { IsNotEmpty } from 'class-validator';

export class CreateWorkstationDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city_id: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  ip: string;

  @IsNotEmpty()
  gateway: string;

  @IsNotEmpty()
  is_regional: boolean;

  parent_workstation_id: string;
  child_workstation_ids: string[];
}
