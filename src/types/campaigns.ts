export interface CampaignRecord {
  id: string;
  name: string;
  status: string;
  last_call_date: Record<string, unknown>;
}

export interface CampaignSearchResponse {
  data: CampaignRecord[];
}

export interface CampaignStatusParams {
  campaign_id: string;
  status: boolean;
}

export interface CampaignStatusResponse {
  success: boolean;
}
