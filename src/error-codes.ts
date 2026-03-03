/**
 * Map of Convoso API error codes to human-readable descriptions.
 *
 * Some codes are context-dependent (e.g. 6004 may mean "Unknown Campaign ID"
 * or "Invalid phone number format" depending on the endpoint). Descriptions
 * here reflect the most common interpretation.
 */
export const CONVOSO_ERROR_CODES = {
  4001: 'Missing required field',
  4002: 'Field must be numeric',
  6000: 'Invalid phone number',
  6001: 'Record not found',
  6002: 'No such list',
  6003: 'Missing required name',
  6004: 'Unknown or invalid ID',
  6005: 'Missing required user(s)',
  6006: 'Invalid user or phone',
  6007: 'Missing required field or duplicate entry',
  6008: 'Invalid or duplicate phone number',
  6009: 'Phone number already exists',
  6012: 'User is not logged in',
  6023: 'Required fields are missing',
  6026: 'Invalid campaign ID or country code',
  6031: 'Invalid date format',
  6032: 'Missing call log ID',
  6033: 'No such call log',
  6036: 'Either revenue or return must have a value',
  6041: 'Invalid queue ID',
  6042: 'Invalid list ID',
  6046: 'List name too short (min 10 characters)',
  6050: 'Invalid status',
  6056: 'Missing or invalid ID value',
  6057: 'Invalid reason provided',
  6058: 'Invalid purpose provided',
  6059: 'Combination already exists or update failed',
  6060: 'Invalid or missing call log / status ID',
  6061: 'Not found or invalid abbreviation',
  6062: 'Invalid final option or extra field validation error',
  6063: 'Missing or invalid reached option',
  6064: 'Missing or invalid success option',
  6065: 'Missing or invalid DNC option',
  6066: 'Missing or invalid callback option',
  6067: 'Missing or invalid contact option',
  6068: 'Missing or invalid voicemail option',
  6069: 'Only custom statuses can be modified',
  6070: 'Invalid lead or callback ID',
  6071: 'Record not found or option cannot be empty',
  6072: 'Invalid timezone or option cannot be empty',
  6073: 'Invalid callback ID or option cannot be empty',
  6074: 'Callback not found or option cannot be empty',
  6075: 'Callback option cannot be empty',
  6076: 'Contact option cannot be empty',
  6077: 'Voicemail option cannot be empty',
  6078: 'Invalid HEX color (do not include #)',
  6079: 'Invalid email address',
  6080: 'Invalid status value or missing purpose field',
  6081: 'List name must be unique',
  6090: 'Invalid criteria key',
  7231: 'Invalid offset value',
  7258: 'Invalid limit value',
} as const;

export type ConvosoErrorCode = keyof typeof CONVOSO_ERROR_CODES;

/** Look up the description for a Convoso API error code. */
export function getErrorDescription(code: number): string | undefined {
  return (CONVOSO_ERROR_CODES as Record<number, string>)[code];
}
