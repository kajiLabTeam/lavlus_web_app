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
