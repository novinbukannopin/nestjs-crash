export interface PayloadTypes {
  email: string;
  userId: number;
  artistId?: number;
}

export type Enable2FA = {
  secret: string;
}