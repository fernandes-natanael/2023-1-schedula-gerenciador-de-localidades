export class UpdateWorkstationDto {
  name: string;

  city_id: string;

  phone: string;

  ip: string;

  gateway: string;

  parent_workstation_id: string;

  child_workstation_ids: string[];
}
