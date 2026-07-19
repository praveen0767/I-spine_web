# Editorial update plan (Political Insights)

## Information gathered
- `app/components/Articles.tsx` renders the Editorial section (“Political Insights”) using `featuredArticle` and `secondaryArticles` from `app/data/articles.ts`.
- `featuredArticle` is the one with `featured: true`. All others are shown in the stacked/right side.
- `app/insights/[slug]/page.tsx` uses `articles` from `app/data/articles.ts` and renders `article.content`, `article.img`, `title`, etc.
- Source docx available: `Articles/Article 5.docx`.

## Plan
1. Add a new article entry for Article 5 into `app/data/articles.ts`.
   - Set it to `featured: true`.
   - Set its `img` to the primary image from `Articles/` (to be determined).
   - Mark the currently featured article as `featured: false` so it becomes secondary.
2. Convert the full text from `Articles/Article 5.docx` into the `content` field (template uses backticks).
3. Ensure the “secondary” article(s) now include the previously featured one.
4. Validate TypeScript type correctness and that the slug page route works.

## Dependent files to edit
- `app/data/articles.ts`

## Followup steps
- Run the Next.js dev build/lint (if configured) to ensure no TS errors.
- Manually open `/` and `/insights/<slug>` to confirm Featured/Secondary placement.

