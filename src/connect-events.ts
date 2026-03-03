// ---------------------------------------------------------------------------
// Convoso Connect — Workflow Event & Action Types
// ---------------------------------------------------------------------------

/**
 * Workflow event trigger types in Convoso Connect.
 *
 * These define *when* a workflow fires. Multiple events on a single workflow
 * use AND logic — all must match. For OR logic, create separate workflows.
 */
export const CONNECT_WORKFLOW_EVENTS = {
  DISPOSITION: 'Agent sets a specific call disposition',
  CALL_COUNT: 'Lead has been called a specific number of times (or within a range)',
  CALL_TYPE: 'Call was inbound, outbound, manual, etc.',
  CALLBACK: 'A callback was scheduled for the lead',
  HOPPER_EXPIRED: "Lead's hopper slot expired without being called",
  LEAD_ACTION: 'A specific action was taken on the lead record',
  LEAD_FIELDS_AND_CALL_DATA: 'Lead field values match specified criteria',
  LEAD_STATUS: "Lead's status changes to or from a specific value",
  REDISPOSITION: 'Lead is re-dispositioned after initial setting',
  SUBMITTED_BY: 'Filters by who submitted or created the lead',
  TERM_REASON: 'Call ended with a specific termination reason',
} as const;

/** Union of all Convoso Connect workflow event trigger types. */
export type ConnectWorkflowEvent = keyof typeof CONNECT_WORKFLOW_EVENTS;

/**
 * Workflow action types in Convoso Connect.
 *
 * These define *what* happens when a workflow fires. Multiple actions
 * can exist in a single Action Set with independent scheduling.
 *
 * The `INTEGRATION` action label is displayed as "Integration" (not
 * "Convoso Connect") in the Convoso UI — this is a common source of confusion.
 */
export const CONNECT_WORKFLOW_ACTIONS = {
  INTEGRATION: 'Fire an HTTP request to an external endpoint (Convoso Connect)',
  EMAIL: 'Send a templated email to the lead',
  MOVE: 'Move the lead to a different list',
  STATUS: "Change the lead's status / disposition code",
  SMS: 'Send an SMS message (requires WA Advanced Mode)',
  VB: 'Trigger a voice broadcast to the lead',
  FIELD: 'Update a lead field value (supports math, timestamps, field-to-field)',
  CALLBACK: 'Schedule a system-generated callback',
  CALLBACK_UPDATE: 'Modify or remove an existing scheduled callback',
  HOPPER: 'Place the lead back in the dialer hopper',
  DNC: "Add the lead's phone number(s) to the Do Not Call list",
  REVENUE: 'Log a revenue dollar amount to the call log',
} as const;

/** Union of all Convoso Connect workflow action types. */
export type ConnectWorkflowAction = keyof typeof CONNECT_WORKFLOW_ACTIONS;
