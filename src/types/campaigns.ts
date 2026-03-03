export interface CampaignRecord {
  /** Unique campaign ID */
  id: string;
  /** Campaign name */
  name: string;
  /** Campaign status: Y (active) or N (inactive) */
  status: string;
  /** Last call date object with date and timezone info */
  last_call_date: Record<string, unknown>;
}

export interface CampaignSearchResponse {
  /** Array of campaign objects */
  data: CampaignRecord[];
}

export interface CampaignStatusParams {
  /** ID of the campaign to update */
  campaign_id: string;
  /** Status: true (active) or false (inactive) */
  status: boolean;
}

export interface CampaignStatusResponse {
  /** Success status of the operation */
  success: boolean;
}
