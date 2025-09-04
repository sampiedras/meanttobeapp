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
  id: string;
  name: string;
}

export interface IDriveEntity {
  id: string;
  name: string;
  gsiPk1Drive: string;
}

export interface IDriveEntityResponse {
  pk: string;
  sk: string;
  name: string;
  gsiPk1Drive: string;
}
export interface ITypeDriveEntityResponse {
  pk: string;
  sk: string;
  name: string;
}

export type DriveType = {
  name: string;
  driveId: string;
  title?: string;
};

export type UserDriveByUserType = {
  pk: string;
  sk: string;
  name: string;
  drives: DriveType[];
};
