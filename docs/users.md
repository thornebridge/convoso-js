# Users API

User profile and recording management.

## Endpoints

### Users Search—API

Retrieve user profiles.

**Endpoint:** `POST /users/search`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| user | string | No | Comma-delimited users to search by email, First Name, or Last Name |
| limit | integer | No | Results per page (default 20) |
| offset | integer | No | Pagination offset (default 0) |

#### Request Examples

```
POST https://api.convoso.com/v1/users/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com
```

```
POST https://api.convoso.com/v1/users/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com,john.doe@company.com
```

```
POST https://api.convoso.com/v1/users/search
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com&limit=50&offset=0
```

#### Response Example

```json
[
  {
    "id": "12345",
    "acl_access_profile": "agent",
    "email": "jane.smith@company.com",
    "first_name": "Jane",
    "last_name": "Smith",
    "user_level": "agent",
    "queue_override": "N",
    "allow_queue_selection": true,
    "allow_callbacks": true,
    "callback_types_allowed": "system,personal",
    "allow_transfers": true,
    "status": "active",
    "local_gmt": "-7.00",
    "connection_type": "softphone",
    "extension": [
      "1001",
      "1002"
    ],
    "last_login": "2026-03-03 16:30:00"
  },
  {
    "id": "12346",
    "acl_access_profile": "supervisor",
    "email": "john.doe@company.com",
    "first_name": "John",
    "last_name": "Doe",
    "user_level": "supervisor",
    "queue_override": "Y",
    "allow_queue_selection": true,
    "allow_callbacks": true,
    "callback_types_allowed": "system,personal",
    "allow_transfers": true,
    "status": "active",
    "local_gmt": "-6.00",
    "connection_type": "desk_phone",
    "extension": [
      "2001"
    ],
    "last_login": "2026-03-03 17:00:00"
  }
]
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| id | string | User ID |
| acl_access_profile | string | Access control profile |
| email | string | Email address |
| first_name | string | First name |
| last_name | string | Last name |
| user_level | string | User privilege level (agent, supervisor, admin) |
| queue_override | string | Can override queue assignments: Y or N |
| allow_queue_selection | boolean | Can select own queues |
| allow_callbacks | boolean | Can manage callbacks |
| callback_types_allowed | string | Allowed callback types |
| allow_transfers | boolean | Can transfer calls |
| status | string | User status (active, inactive, suspended) |
| local_gmt | string | Local GMT offset (e.g., -7.00) |
| connection_type | string | Connection type (softphone, VoIP, desk_phone) |
| extension | array | Array of assigned phone extensions |
| last_login | string | Timestamp of last login |

#### User Levels

| Level | Description |
|-------|-------------|
| agent | Standard agent |
| supervisor | Team lead/supervisor |
| manager | Department manager |
| admin | System administrator |

#### Connection Types

| Type | Description |
|------|-------------|
| softphone | Software-based phone client |
| VoIP | VoIP phone system |
| desk_phone | Physical desk phone |
| mobile | Mobile app |
| IM | Instant messaging |

#### Access Profiles

| Profile | Permissions |
|---------|-------------|
| agent | Basic calling functions |
| supervisor | Agent monitoring, reporting |
| manager | Full campaign management |
| admin | System configuration |

#### Filtering Examples

**Single user:**
```
POST /users/search
- user: jane.smith@company.com
```

**Multiple users:**
```
POST /users/search
- user: jane.smith@company.com,john.doe@company.com,bob.jones@company.com
```

**With pagination:**
```
POST /users/search
- user: jane.smith@company.com
- limit: 50
- offset: 0
```

#### Callback Types

| Type | Description |
|------|-------------|
| system | System-managed callbacks |
| personal | Personal/agent-owned callbacks |

#### Common Queries

**Find active agents:**
```
POST /users/search
- user: [email]
→ Check status field for "active"
```

**Find supervisors:**
```
POST /users/search
- user: [email]
→ Check user_level field for "supervisor"
```

**Find users without transfers:**
```
POST /users/search
- user: [email]
→ Check allow_transfers field for false
```

---

### Users—Recordings

Get recordings for a user.

**Endpoint:** `POST /users/recordings`

**Authentication:** Required (auth_token)

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| auth_token | string | Yes | Authentication token |
| user | string | Yes | Comma-delimited user emails |
| start_time | string | No | Start time (YYYY-MM-DD HH:MM:SS) |
| end_time | string | No | End time (YYYY-MM-DD HH:MM:SS) |
| limit | integer | No | Results per page (default 20) |
| offset | integer | No | Pagination offset (default 0) |

#### Request Examples

```
POST https://api.convoso.com/v1/users/recordings
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com
```

```
POST https://api.convoso.com/v1/users/recordings
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com&start_time=2026-03-01%2008:00:00&end_time=2026-03-03%2017:00:00
```

```
POST https://api.convoso.com/v1/users/recordings
Content-Type: application/x-www-form-urlencoded

auth_token=abc123&user=jane.smith@company.com,john.doe@company.com&limit=100
```

#### Response Example

```json
{
  "entries": [
    {
      "recording_id": "rec123",
      "lead_id": "12345",
      "start_time": "2026-03-03 14:30:00",
      "end_time": "2026-03-03 14:35:00",
      "seconds": 300,
      "url": "https://convoso.com/recording/rec123.mp3"
    },
    {
      "recording_id": "rec124",
      "lead_id": "12346",
      "start_time": "2026-03-03 14:40:00",
      "end_time": "2026-03-03 14:47:00",
      "seconds": 420,
      "url": "https://convoso.com/recording/rec124.mp3"
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| entries | array | Array of recording objects |

**Recording Object:**

| Field | Type | Description |
|-------|------|-------------|
| recording_id | string | Unique recording ID |
| lead_id | string | Associated lead ID |
| start_time | string | Recording start timestamp |
| end_time | string | Recording end timestamp |
| seconds | integer | Duration in seconds |
| url | string | Recording URL for playback/download |

#### Filtering Examples

**All recordings for user:**
```
POST /users/recordings
- user: jane.smith@company.com
```

**Recordings with date range:**
```
POST /users/recordings
- user: jane.smith@company.com
- start_time: 2026-03-01 08:00:00
- end_time: 2026-03-03 17:00:00
```

**Multiple users:**
```
POST /users/recordings
- user: jane.smith@company.com,john.doe@company.com
```

**Paginated results:**
```
POST /users/recordings
- user: jane.smith@company.com
- limit: 50
- offset: 0
```

#### Recording Duration

Duration in seconds can be converted:
- 300 seconds = 5 minutes
- 600 seconds = 10 minutes
- 3600 seconds = 1 hour

#### Recording Access

The returned URL allows:
- Playback in browser
- Download for local storage
- Sharing (if public URL)
- QA/Quality assurance review
- Compliance auditing
- Training purposes

#### Use Cases

1. **Quality Assurance:** Review agent call recordings
2. **Compliance:** Maintain recording audit trail
3. **Training:** Use for agent training and coaching
4. **Dispute Resolution:** Listen to recorded calls
5. **Performance Review:** Include in performance evaluations
6. **Coaching:** Provide feedback based on recordings
7. **Legal/Compliance:** Generate compliance reports

#### Recording Retention

- Availability depends on account settings
- Typical retention: 30-90 days
- Archived recordings may be retrieved separately
- Contact support for extended retention needs
- Consider compliance requirements (healthcare, finance, etc.)

---

## User Workflow Examples

### Get All Agents

```python
import requests

# Get list of all agent emails first (from your directory)
agent_emails = ['agent1@company.com', 'agent2@company.com', 'agent3@company.com']

response = requests.post(
    'https://api.convoso.com/v1/users/search',
    data={
        'auth_token': token,
        'user': ','.join(agent_emails)
    }
).json()

for user in response:
    print(f"{user['first_name']} {user['last_name']} ({user['email']})")
    print(f"  Status: {user['status']}")
    print(f"  Extensions: {', '.join(user['extension'])}")
```

### Get User Recordings for QA

```python
import requests

response = requests.post(
    'https://api.convoso.com/v1/users/recordings',
    data={
        'auth_token': token,
        'user': 'jane.smith@company.com',
        'start_time': '2026-03-01 08:00:00',
        'end_time': '2026-03-03 17:00:00'
    }
).json()

for recording in response['entries']:
    duration = f"{recording['seconds']}s ({recording['seconds'] // 60}:{recording['seconds'] % 60:02d})"
    print(f"Recording {recording['recording_id']}: {duration}")
    print(f"  URL: {recording['url']}")
    print(f"  Lead: {recording['lead_id']}")
```

### Check Agent Permissions

```python
import requests

response = requests.post(
    'https://api.convoso.com/v1/users/search',
    data={
        'auth_token': token,
        'user': 'jane.smith@company.com'
    }
).json()

user = response[0]

print(f"User: {user['first_name']} {user['last_name']}")
print(f"Level: {user['user_level']}")
print(f"Can select queues: {user['allow_queue_selection']}")
print(f"Can manage callbacks: {user['allow_callbacks']}")
print(f"Can transfer: {user['allow_transfers']}")
```

---

## Error Handling

**Users Search:**

| Code | Issue |
|------|-------|
| 6005 | Missing users |
| 7231 | Invalid offset value |

**Users Recordings:**

| Code | Issue |
|------|-------|
| 6005 | Missing users |
| 7231 | Invalid offset value |

---

## Performance Notes

- User searches are fast (typically <500ms)
- Recording queries may be slower for large date ranges
- Use pagination for large result sets
- Cache user information when possible
- Consider rate limits for frequent queries

---

## Security Considerations

1. **Email Protection:** Don't log user emails in plain text
2. **Recording URLs:** Treat URLs as sensitive (may expire)
3. **Access Control:** Verify user permissions before sharing recordings
4. **Compliance:** Ensure recording access follows legal requirements
5. **Data Retention:** Follow company data retention policies

---

## Related Endpoints

- [Agent Monitor API](./agent-monitor.md) - Real-time agent status
- [Call Logs API](./call-logs.md) - Call and recording details
- [Agent Performance API](./agent-performance.md) - User performance metrics

---

**Last Updated:** 2026-03-03
