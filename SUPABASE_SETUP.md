# Supabase Connection Steps

This file explains how to connect your existing Supabase project to this app and use it to fetch and post data.

Your app already has the client dependency installed:

- `@supabase/supabase-js`

Your app already has a browser client file:

- [utils/supabase.ts](/V:/vtslforge/Projects/Txtnok/utils/supabase.ts:1)

Your environment file already contains:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

That means the basic client connection is already in place. What remains is:

1. Create your table in Supabase.
2. Allow reads and writes with RLS policies.
3. Import the `supabase` client where needed.
4. Use `.select()` to fetch data.
5. Use `.insert()` or `.upsert()` to post data.

## 1. Confirm your client setup

Your current client file is:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);
```

This is correct for client-side browser access.

Important:

- `NEXT_PUBLIC_*` variables are exposed to the browser.
- Use the publishable/anon key on the frontend.
- Do not use the service role key in client components.

## 2. Create a table in Supabase

Go to your Supabase dashboard:

1. Open your project.
2. Open `Table Editor`.
3. Create a table.

For this app, a simple starter table could be `notes`.

Suggested columns:

- `id` -> `uuid`, primary key, default `gen_random_uuid()`
- `slug` -> `text`, unique
- `content` -> `text`
- `created_at` -> `timestamp with time zone`, default `now()`

Equivalent SQL:

```sql
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  content text,
  created_at timestamptz default now()
);
```

## 3. Enable RLS and add policies

If RLS is enabled and no policies exist, your frontend requests will fail even if the keys are correct.

For initial testing, you can use open policies like this:

```sql
alter table public.notes enable row level security;

create policy "Allow public read notes"
on public.notes
for select
to public
using (true);

create policy "Allow public insert notes"
on public.notes
for insert
to public
with check (true);

create policy "Allow public update notes"
on public.notes
for update
to public
using (true)
with check (true);
```

Use stricter auth-based policies later if users will have accounts.

## 4. Fetch data from Supabase

Import the client into the page or component where you want the data.

Example fetch:

```ts
import { supabase } from "@/utils/supabase";

const { data, error } = await supabase
  .from("notes")
  .select("*")
  .order("created_at", { ascending: false });

if (error) {
  console.error(error.message);
} else {
  console.log(data);
}
```

If you want to fetch a single record by slug:

```ts
const { data, error } = await supabase
  .from("notes")
  .select("*")
  .eq("slug", "my-note")
  .single();
```

In your app, a likely use case is:

- save editor content into `notes.content`
- open `/some-slug`
- use that slug to fetch the matching row from Supabase

## 5. Post data to Supabase

To insert a new row:

```ts
const { data, error } = await supabase
  .from("notes")
  .insert([
    {
      slug: "my-note",
      content: "Hello from Txtnok",
    },
  ])
  .select();
```

To update an existing row by slug:

```ts
const { data, error } = await supabase
  .from("notes")
  .update({
    content: "Updated text",
  })
  .eq("slug", "my-note")
  .select();
```

To create or update in one call, use `upsert`:

```ts
const { data, error } = await supabase
  .from("notes")
  .upsert({
    slug: "my-note",
    content: "Latest text",
  }, {
    onConflict: "slug",
  })
  .select();
```

## 6. Where this fits in your current app

Current files:

- [app/page.tsx](/V:/vtslforge/Projects/Txtnok/app/page.tsx:1)
- [app/[slug]/page.tsx](/V:/vtslforge/Projects/Txtnok/app/[slug]/page.tsx:1)

Recommended flow for this project:

1. In `app/page.tsx`, when the user clicks `share` or submits the form, save the editor text to Supabase.
2. Generate a `slug` for that text entry.
3. Store `{ slug, content }` in the `notes` table.
4. In `app/[slug]/page.tsx`, read the route param.
5. Query Supabase with `.eq("slug", params.slug).single()`.
6. Show the returned `content` in the editor or page.

## 7. Typical connection checklist

If data is not loading or posting, check these in order:

1. `.env` contains the correct project URL.
2. `.env` contains the correct publishable key.
3. The table name in code matches the table name in Supabase exactly.
4. RLS is enabled and policies allow the operation.
5. You restarted the Next.js dev server after changing `.env`.
6. You are importing the same `supabase` client from `utils/supabase.ts`.
7. The query does not fail with `.single()` because no row exists.

## 8. One practical rule

Frontend code:

- use `NEXT_PUBLIC_SUPABASE_URL`
- use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Backend-only code:

- use service role key only in secure server code
- never expose it in client components

## 9. What you should do next

In order:

1. Create the `notes` table in Supabase.
2. Add the RLS policies.
3. Test a manual insert from the Supabase dashboard.
4. Connect `app/page.tsx` to `.insert()` or `.upsert()`.
5. Connect `app/[slug]/page.tsx` to `.select()` by slug.

If you want, the next step can be to wire your exact `share` flow so:

- typing text on `/`
- clicking `share`
- saving into Supabase
- opening a generated `/slug` page

with your current UI structure.
