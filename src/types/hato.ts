
export interface ScienceRoom {
  date: string;
  roomTable: ScienceRoomTable[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ScienceRoomTable {
  name: string;
  table: string[];
}
