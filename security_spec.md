# Security Specification: Portfolio Firestore Rules

## 1. Data Invariants
1. **Strict Shape & Key Allowlist**: Every `/contact_messages/{messageId}` document must contain exactly `['fullName', 'email', 'subject', 'message', 'createdAt']`—no extra shadow fields (`isAdmin`, `verified`, etc.) are permitted.
2. **Boundary & Format Integrity**:
   - `messageId`: string matching `^[a-zA-Z0-9_\\-]+$`, length `1..128`.
   - `fullName`: string, length `2..80`.
   - `email`: string, length `5..120`, matching `^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$`.
   - `subject`: string, length `2..120`.
   - `message`: string, length `5..2000`.
   - `createdAt`: timestamp strictly equal to `request.time`.
3. **PII Isolation & Immutability**: Contact messages contain sender PII (`email`, `fullName`, `message`). Public or arbitrary signed-in users cannot `get`, `list`, `update`, or `delete` any document. Only the verified portfolio owner (`giridharan0204@gmail.com` with `email_verified == true`) can `get`, `list`, or `delete` submissions. All updates are strictly denied (`allow update: if false;`).

## 2. The "Dirty Dozen" Attack Payloads (Must All Return PERMISSION_DENIED)
1. **Unauthenticated Read (`get`)**: Attempt `get(/contact_messages/msg_1)` without auth -> Denied.
2. **Unauthenticated List (`list`)**: Attempt `list(/contact_messages)` without auth -> Denied.
3. **Non-Admin Signed-In Read (`get`)**: Authenticated user with different email reads `/contact_messages/msg_1` -> Denied.
4. **Non-Admin Signed-In List (`list`)**: Authenticated user with different email lists `/contact_messages` -> Denied.
5. **Email Spoof Attack (Unverified Email)**: User with `email == 'giridharan0204@gmail.com'` and `email_verified == false` reads `/contact_messages/msg_1` -> Denied.
6. **Shadow Field Injection**: Create `/contact_messages/msg_2` with valid required fields plus `isAdmin: true` -> Denied (`keys().hasOnly(...)`).
7. **Missing Required Field**: Create `/contact_messages/msg_3` missing `message` -> Denied (`keys().hasAll(...)`).
8. **ID Poisoning**: Create `/contact_messages/bad id with spaces and 200 chars...` -> Denied (`isValidId(messageId)`).
9. **Denial-of-Wallet Oversized String**: Create `/contact_messages/msg_4` with `message` > 2000 chars -> Denied (`size() <= 2000`).
10. **Client-Spoofed Timestamp**: Create `/contact_messages/msg_5` with client-provided `createdAt` instead of `request.time` -> Denied (`createdAt == request.time`).
11. **Invalid Email Format**: Create `/contact_messages/msg_6` with `email: "not-an-email"` -> Denied (`matches(...)`).
12. **Tampering / Update Attempt**: Attempt `update(/contact_messages/msg_1, { message: "hacked" })` even by authenticated user -> Denied (`allow update: if false;`).
