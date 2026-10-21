-- Remove the Phase 1 example project from databases that were seeded before
-- the portfolio was handed over for the owner's own work.
DELETE FROM "projects"
WHERE "id" = 'project_healthcare_warehousing';
