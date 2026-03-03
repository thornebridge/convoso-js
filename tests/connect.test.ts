import { describe, expect, it } from 'vitest';
import { parseConnectPayload } from '../src/connect.js';
import type { ConnectPayload } from '../src/types/connect.js';

describe('parseConnectPayload', () => {
  it('returns a typed payload from a valid object', () => {
    const body = {
      phone_number: '5551234567',
      first_name: 'Jane',
      last_name: 'Doe',
      status: 'SALE',
      call_log_id: '12345',
    };

    const payload: ConnectPayload = parseConnectPayload(body);
    expect(payload.phone_number).toBe('5551234567');
    expect(payload.first_name).toBe('Jane');
    expect(payload.status).toBe('SALE');
    expect(payload.call_log_id).toBe('12345');
  });

  it('handles partial payloads (only mapped fields)', () => {
    const body = { phone_number: '5559876543', list_id: '100' };
    const payload = parseConnectPayload(body);
    expect(payload.phone_number).toBe('5559876543');
    expect(payload.first_name).toBeUndefined();
  });

  it('handles an empty object', () => {
    const payload = parseConnectPayload({});
    expect(payload).toEqual({});
  });

  it('preserves extra/unknown fields from the adaptor', () => {
    const body = { phone_number: '5551234567', custom_crm_field: 'abc' };
    const payload = parseConnectPayload(body);
    expect(payload['custom_crm_field']).toBe('abc');
  });

  it('throws TypeError for null', () => {
    expect(() => parseConnectPayload(null)).toThrow(TypeError);
    expect(() => parseConnectPayload(null)).toThrow('null');
  });

  it('throws TypeError for undefined', () => {
    expect(() => parseConnectPayload(undefined)).toThrow(TypeError);
    expect(() => parseConnectPayload(undefined)).toThrow('undefined');
  });

  it('throws TypeError for a string', () => {
    expect(() => parseConnectPayload('not an object')).toThrow(TypeError);
    expect(() => parseConnectPayload('not an object')).toThrow('string');
  });

  it('throws TypeError for a number', () => {
    expect(() => parseConnectPayload(42)).toThrow(TypeError);
    expect(() => parseConnectPayload(42)).toThrow('number');
  });

  it('throws TypeError for an array', () => {
    expect(() => parseConnectPayload([1, 2, 3])).toThrow(TypeError);
  });

  it('includes all lead fields in the type', () => {
    const body: ConnectPayload = {
      id: '1',
      remote_id: 'ext-1',
      user_id: '10',
      source_id: '5',
      status: 'NEW',
      called_count: 3,
      phone_number: '5551234567',
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      city: 'Denver',
      state: 'CO',
      postal_code: '80202',
    };

    const payload = parseConnectPayload(body);
    expect(payload.id).toBe('1');
    expect(payload.city).toBe('Denver');
  });

  it('includes all call log fields in the type', () => {
    const body: ConnectPayload = {
      call_log_id: '999',
      campaign_id: '50',
      campaign_name: 'Main Outbound',
      length_in_sec: 120,
      call_type: 'Outbound',
      term_reason: 'AGENT',
      recording: 'https://recordings.example.com/call-999.mp3',
    };

    const payload = parseConnectPayload(body);
    expect(payload.length_in_sec).toBe(120);
    expect(payload.campaign_name).toBe('Main Outbound');
  });

  it('includes extra fields in the type', () => {
    const body: ConnectPayload = {
      agent_full_name: 'John Smith',
      agent_email: 'john@example.com',
      custom_field_1: 'Notes value',
      custom_field_10: 'Last custom',
    };

    const payload = parseConnectPayload(body);
    expect(payload.agent_full_name).toBe('John Smith');
    expect(payload.custom_field_10).toBe('Last custom');
  });
});
