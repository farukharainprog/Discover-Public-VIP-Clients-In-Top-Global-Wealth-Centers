# Security Specification: GLOBAL VIP CLIENT FINDER

## 1. Data Invariants
1. A Lead document cannot be created or accessed by a user without matching `request.auth.uid == incoming().userId` or `resource.data.userId == request.auth.uid`, unless the user is an authorized Administrator (`farukharain962@gmail.com`).
2. An unauthenticated user cannot read, query, list, create, or alter any leads, profiles, or admin configurations.
3. Users cannot elevate their own role to 'admin' in `users/{userId}` or create documents in `admins/{adminId}`.
4. `config/{configId}` documents can only be modified by authorized administrators (`farukharain962@gmail.com`).
5. Lead documents cannot have an unbounded size or arbitrary unvalidated fields (prevent injection & wallet denial attacks).
6. String fields must enforce strict `.size()` constraints as defined in `firebase-blueprint.json`.

## 2. The Dirty Dozen Payloads (Designed to Break Identity, Integrity, and State)
1. **Payload 1 (Ghost Field Injection)**: Creating a lead with an arbitrary injected property `{ "userId": "user1", "isRootAdmin": true }`. Target: Must fail `hasOnly` / strict key check.
2. **Payload 2 (Identity Spoofing)**: User `userA` attempting to write a lead with `userId: "userB"`. Target: Must fail `incoming().userId == request.auth.uid`.
3. **Payload 3 (Admin Role Escalation)**: Regular user updating their own profile with `{ "role": "admin" }`. Target: Denied.
4. **Payload 4 (Config Poisoning)**: Non-admin trying to update `/config/global_settings`. Target: Denied.
5. **Payload 5 (Unauthenticated Query)**: Anonymous or unauthenticated scraper calling `getDocs(collection('leads'))`. Target: Denied.
6. **Payload 6 (Oversized Payload)**: Inserting a 500,000 character string into `businessName` or `description`. Target: Denied by `.size() <= 2000` checks.
7. **Payload 7 (Orphaned Write / Cross-User Leak)**: User `userA` querying list on `leads` where `userId == 'userB'`. Target: Denied by `resource.data.userId == request.auth.uid`.
8. **Payload 8 (Admins collection injection)**: Normal user writing directly to `/admins/{uid}`. Target: Denied.
9. **Payload 9 (Delete Tampering)**: User `userA` trying to delete a lead created by `userB`. Target: Denied.
10. **Payload 10 (Email Spoofing)**: Unverified email claiming admin privileges. Target: Denied by `request.auth.token.email_verified == true`.
11. **Payload 11 (Invalid Status State)**: Setting lead status to a forbidden string like `"hacked_status"`. Target: Denied by enum validation.
12. **Payload 12 (Corrupted ID Injection)**: Attempting to create a document with an ID containing malicious path traversal or characters. Target: Denied by `isValidId`.

## 3. Security Rules Matrix
- Global Catch-All: `match /{document=**} { allow read, write: if false; }`
- `/leads/{leadId}`: Read/Write restricted to document owner (`userId == request.auth.uid`) or Admin.
- `/users/{userId}`: Read by owner or Admin. Self-update restricted to safe fields (cannot alter role).
- `/config/{configId}`: Read by authenticated users; Write strictly by Admin.
- `/admins/{adminId}`: Read/Write strictly by Admin.
