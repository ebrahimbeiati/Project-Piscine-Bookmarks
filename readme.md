# Shared Bookmarks

A small web app that allows users to save, view, and share bookmarks with descriptions. Users can like bookmarks, copy URLs to the clipboard, and add new bookmarks. Data is persisted per user using the provided storage functions.

---

## Features

- Drop-down to select a user and display their bookmarks.
- Reverse chronological order for bookmarks.
- Each bookmark displays:
  - Title (link to the URL)
  - Description
  - Creation timestamp
  - Copy URL button
  - Like counter (persisted across sessions)
- Accessible form for adding new bookmarks (URL, title, description).
- Full accessibility compliance (tested with Lighthouse).

---

## Setup

### Clone the repository:

    -- git clone (https://github.com/Farah-Stu/Project-Piscine-Bookmarks.git)
cd Project-Piscine-Bookmarks
## Install dependencies:
    -npm install
Serve the project over HTTP (required for ES Modules):

npx http-server
Open the URL provided by the server in your browser.

## Usage
- Select a user from the drop-down to view their bookmarks.

- Add new bookmarks using the form.

- Click the heart button to like a bookmark; likes persist between sessions.

- Click "Copy URL" to copy the bookmark link to your clipboard.

## Testing
This project includes unit tests for non-trivial utility functions.

Run tests with:

- npm test
Current tests include:

incrementLikes: ensures likes increment correctly, defaults to 1 if undefined, and original object is not mutated.


## Tech Stack
- HTML, CSS, JavaScript (ES Modules)

- Jest for unit testing

- LocalStorage for user data persistence

- storage.js provided for managing user/bookmark data

## Requirements Covered
- User selection drop-down with at least 5 users.

- Display bookmarks or a message if none exist.

- Reverse chronological order for bookmarks.

- Title, description, creation timestamp displayed.

- Copy URL and like buttons for each bookmark.

- Accessible form for adding bookmarks.

- Unit tests for non-trivial functions.

- Website scores 100% for accessibility in Lighthouse.

## Notes
No authentication implemented (not required).
Form and buttons are keyboard-accessible.

Serve the project over HTTP; opening via file:// will not work due to module imports.

