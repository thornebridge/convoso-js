import { BaseResource } from './base.js';
import type { RevenueUpdateParams, RevenueUpdateResponse } from '../types/revenue.js';

export class RevenueResource extends BaseResource {
  async update(params: RevenueUpdateParams): Promise<RevenueUpdateResponse> {
    return this.http.post('/revenue/update', params);
  }
}
