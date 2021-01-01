export interface ICommunityServiceInfo {
  id: number;
  readyPercent: number;
  membersCount: number;
}
export interface ICommunitySubscribe {
  id: number;
  name: string;
  email: string;
  tariff: string;
}
export interface ICommunityReadiness {
  id: number;
  email: string;
}