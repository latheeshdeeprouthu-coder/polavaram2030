# Eventora — Firebase Event Management

A responsive event management web app built with Bootstrap 5, vanilla JavaScript, Firebase Authentication and Cloud Firestore.

## Features
- Student sign-up and sign-in with client-side form validation.
- Duplicate email prevention through Firebase Authentication.
- Duplicate roll-number prevention through a Firestore transaction.
- Manually provisioned admin accounts (no public admin sign-up).
- Admin dashboard, event creation/deletion, student directory.
- Student dashboard, event search, event registration and registration list.
- Responsive layout, animated cards, category artwork, toasts and dashboard stats.

## 1. Configure Firebase
1. Open https://console.firebase.google.com/ and select project `polavaram2026`.
2. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
3. In **Build → Firestore Database**, create a database.
4. Open **Firestore → Rules**, paste `firestore.rules` and replace `REPLACE_WITH_YOUR_ADMIN_UID` with the actual admin UID. Publish the rules.
5. In Firebase **Authentication → Users**, click **Add user** and manually create the admin email/password. There is no admin sign-up in this app.
6. Copy the admin user's **UID**. Replace `REPLACE_WITH_YOUR_ADMIN_UID` in `firebase-config.js` inside `ADMIN_UIDS` with that UID. If you have multiple admins, add each UID to both the JS list and Firestore rules list.
7. Ensure the Firebase web app config in `firebase-config.js` matches your project.

## 2. Run the app
Because Firebase Authentication requires a web origin, run it from a local web server rather than opening `index.html` as a file.

### Option A: VS Code Live Server
- Extract the ZIP.
- Open the folder in VS Code.
- Install/enable **Live Server**.
- Right-click `index.html` → **Open with Live Server**.

### Option B: Python
Run this from the project directory:
```bash
python -m http.server 5500
```
Then visit http://localhost:5500.

Add `localhost` and your deployed domain under **Authentication → Settings → Authorized domains** if needed.

## 3. Important security notes
- Firebase web config and API key identify the project; they are not admin credentials. Security must be enforced by Firestore rules.
- Never put an admin password in JavaScript or HTML.
- Admin access is based on the manually-created Firebase Authentication UID, mirrored in Firestore rules.
- Roll numbers are claimed transactionally in `rollNumbers`; the rule prevents ordinary clients from overwriting existing claims.
- This starter uses client-side registration-capacity checking. For high-stakes events or heavy concurrent traffic, enforce capacity with a trusted Cloud Function/server transaction. Client-side checks alone cannot guarantee strict seat limits.
- Firebase email uniqueness is enforced by Firebase Authentication. If sign-up profile creation fails after Auth account creation, the app attempts to remove the newly-created account; if this cleanup fails, delete the orphaned account manually in Firebase Authentication.
- Before production use, add email verification, password reset, App Check, stronger abuse protection, and test rules using the Firebase Emulator Suite.

## Firestore collections
- `students/{uid}` — student profile.
- `rollNumbers/{normalizedRoll}` — unique roll-number claim.
- `events/{eventId}` — event details.
- `registrations/{eventId_uid}` — one registration per student per event.

## Troubleshooting
- **Permission denied:** confirm Firestore rules were published and admin UID matches in both files.
- **Firebase auth/unauthorized-domain:** add the current host in Authentication → Settings → Authorized domains.
- **No events appear:** sign in and publish an event with the admin account.
- **Email already in use:** sign in with the existing account or delete the test account from Authentication → Users.
