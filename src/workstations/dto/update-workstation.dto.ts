export class UpdateWorkstationDto {
  name: string;

  city_id: string;

  phone: string;

  ip: string;

  gateway: string;

  is_regional: boolean;

  parent_workstation_id: string;

  child_workstation_ids: string[];
}
