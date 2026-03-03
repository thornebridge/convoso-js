import { BaseResource } from './base.js';
import type {
  CampaignSearchResponse,
  CampaignStatusParams,
  CampaignStatusResponse,
} from '../types/campaigns.js';

export class CampaignsResource extends BaseResource {
  async search(): Promise<CampaignSearchResponse> {
    return this.http.post('/campaigns/search');
  }

  async status(params: CampaignStatusParams): Promise<CampaignStatusResponse> {
    return this.http.post('/campaigns/status', params);
  }
}
