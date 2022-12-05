export interface ModelBase {
  id?: string;
  updatedAt?: string | Date;
  createdAt?: string | Date;
}

export interface Sensor {
  type: string;
  refreshRate: number;
}

export interface Spatiotemporal {
  location: any;
  area: any;
  ble?: any; // 未実装
  wifi?: any; // 未実装
  periods: Period[];
}

export interface Period {
  interval: number;
  entity: 'day' | 'week';
  dayOfWeek: ('sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat')[];
  startTime: string;
  endTime: string;
}

export interface Project extends ModelBase {
  name: string;
  overview: string;
  startDate: string | Date;
  endDate: string | Date;
  image: string;
  sensors: Sensor[];
  spatiotemporal: Spatiotemporal;
  owner: string;
  members: string[];
}

export type NewProjectValues = Omit<
  Project,
  'id' | 'owner' | 'image' | 'members' | 'createdAt' | 'updatedAt'
>;

export interface User extends Omit<ModelBase, 'id'> {
  uid: string;
  name: string;
  email: string;
  picture: string;
  requesterInfo: RequesterInfo;
  allowRequest: boolean;
}

export interface RequesterInfo extends Omit<ModelBase, 'id'> {
  realm: string;
  gender: 'male' | 'female' | 'other';
  introduction: string;
  organization: string;
  url: string;
  birthDate: string | Date;
}

export interface Sensing extends ModelBase {
  originalname: string;
  size: number;
  ownerId: string;
  projectId: string;
}
