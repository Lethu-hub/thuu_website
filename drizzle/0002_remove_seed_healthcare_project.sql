-- Remove only the completely untouched example scaffold from databases seeded
-- before the portfolio was handed over. A project edited by its owner keeps the
-- same ID, so every original content field is checked before deleting it.
DELETE FROM "projects"
WHERE "id" = 'project_healthcare_warehousing'
  AND "title" = 'Healthcare Warehousing Analytics'
  AND "slug" = 'healthcare-warehousing-analytics'
  AND "summary" = 'A case-study framework for making inventory, fulfilment, and service-level decisions visible.'
  AND "domain_tags" = '["Healthcare", "Operations"]'::jsonb
  AND "tool_tags" = '["SQL", "Power BI", "Python"]'::jsonb
  AND "status" = 'draft'
  AND "featured" = 'false'
  AND "project_date" = DATE '2026-10-18'
  AND "hero_media_id" IS NULL
  AND "links" = '[]'::jsonb
  AND "blocks" = '[
    {"id":"block_problem","type":"markdown","markdown":"## The problem\n\nDescribe the operational question, who needed an answer, and why it mattered."},
    {"id":"block_data","type":"markdown","markdown":"## The data\n\nOutline the source systems, grain, quality checks, and any sensitive-data considerations."},
    {"id":"block_approach","type":"markdown","markdown":"## The approach\n\nExplain the logic, metrics, modelling choices, and dashboard design decisions."},
    {"id":"block_insights","type":"markdown","markdown":"## Insights\n\nShare the patterns that changed the conversation. Add screenshots, charts, or a walkthrough video below."},
    {"id":"block_impact","type":"markdown","markdown":"## Business impact\n\nConnect the work to decisions, outcomes, adoption, or the next best action."}
  ]'::jsonb;
