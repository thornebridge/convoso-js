export interface StatusSearchParams {
  query: string;
}

export interface StatusRecord {
  status: string;
  name: string;
  final: string;
  reached: string;
  success: string;
  dnc: string;
  callback: string;
  contact: string;
  voicemail: string;
  hex_color: string;
}

export interface StatusSearchResponse {
  data: StatusRecord[];
}

export interface StatusInsertParams {
  status: string;
  name: string;
  final: string;
  reached: string;
  success: string;
  dnc: string;
  callback: string;
  contact: string;
  voicemail: string;
  hex_color?: string;
}

export interface StatusInsertResponse {
  success: boolean;
  code: number;
  data: { new: string; status: string };
}

export interface StatusUpdateParams {
  status: string;
  name?: string;
  hex_color?: string;
  final?: string;
  reached?: string;
  success?: string;
  dnc?: string;
  callback?: string;
  contact?: string;
  voicemail?: string;
}

export interface StatusUpdateResponse {
  success: boolean;
  data: { status: string };
}
