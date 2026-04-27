# Txtnok

Txtnok is a simple text sharing app.

Its job is very small:

- you write text
- you give that text a custom URL
- the app saves it
- anyone with that URL can open and read it later

## Why This App Exists

This project is made for quickly sharing plain text without creating a full document system.

Instead of sending long messages directly, you can:

1. open the app
2. paste or write your text
3. save it with your own slug
4. share that link

Example:

If you save text with the slug `meeting-notes`, the app will make it available at:

```text
/meeting-notes
```

## What The App Does

### On the home page

The home page is the writing screen.

- You type or paste text into the big editor.
- The `share` button opens a small form.
- In that form, you enter the custom URL slug you want.
- When you submit, the app saves your text with that slug.

### When a slug is opened

If someone visits a route like:

```text
/meeting-notes
```

the app checks Supabase for saved text under that slug and shows it in read-only mode.

If no data exists for that slug, the app shows an error message.

## How To Use It

### Save text

1. Open the app homepage.
2. Write or paste your text into the editor.
3. Click `share`.
4. Enter a slug such as `notes`, `todo`, or `project-update`.
5. Submit the form.

Your text is now saved under that slug.

### Read saved text

Open the saved path in the browser:

```text
/your-slug
```

Example:

```text
/notes
```

That page shows the saved text for `notes`.

## Important Behavior

- If you save again with the same slug, the old text is replaced with the new text.
- The slug acts like the public address for the text.
- The slug page is read-only.
- The app is focused only on plain text sharing.

## In Simple Words

Txtnok works like a tiny paste/link tool.

Write something, save it with your own short name, and open that name later to read the content.
