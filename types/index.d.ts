export interface ModelBase {
  id?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface Project extends ModelBase {
  name?: string;
  overview?: string;
  startDate?: Date;
  endDate?: Date;
  image?: string;
  ownerId?: string;
}

export interface UserBase extends ModelBase {
  username?: string;
  email?: string;
  image?: string;
  roles?: string[];
}

export interface User extends UserBase {
  userProfile?: UserProfile;
}

export interface UserProfile extends ModelBase {
  realm?: string;
  gender?: string;
  birth?: Date;
  belongTo?: string;
  introduction?: string;
  url?: string;
  userId?: string;
}

export interface Sensor {
  type: string;
  refreshRate: number | string;
}

export interface SensorSetting {
  isProvidedProfile: boolean;
  sensors: Sensor[];
}

export interface Interval {
  length: number;
  entity: string;
  dayOfWeek?: string[];
}

export interface Period {
  from: string;
  to: string;
}

export interface PeriodOfTime {
  interval: Interval;
  period: Period;
}

export interface SpatiotemporalSetting {
  location: any;
  area: any;
  periods: PeriodOfTime[];
}

export interface NewProjectValues {
  name: string;
  overview: string;
  startDate: Date | string;
  endDate: Date | string;
  image: string;
  sensorSetting: SensorSetting;
  spatiotemporalSetting: SpatiotemporalSetting;
}

export interface SensingData {
  id: string;
  originalname: string;
  size: 1340374;
  updatedAt: Date | string;
  createdAt: Date | string;
  ownerId: string;
  projectId: string;
}
