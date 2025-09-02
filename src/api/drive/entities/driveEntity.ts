export interface DriveEntity {
  id: number;
  name: string;
  driveSections: DriveSectionEntity[];
}

export interface DriveSectionEntity {
  id: number;
  name: string;
  drive_id: number;
}

export interface IDriveTypeEntity {
  pk: string;
  sk: string;
  name: string;
}

export interface IDriveEntity {
  pk: string;
  sk: string;
  name: string;
  gsiPk1Drive: string;
}
