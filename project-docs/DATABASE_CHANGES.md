# Database Changes


/*
------------------------------------------------------
Added: 2026-05-25
Change ID: AMS-M03-EMP-010

Purpose:
Store employee profile image URL.

Risk:
LOW
------------------------------------------------------
*/

ALTER TABLE employees

ADD COLUMN profile_image TEXT;