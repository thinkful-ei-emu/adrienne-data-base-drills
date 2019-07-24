BEGIN;

INSERT INTO blogful_articles (title, date_published, content)
VALUES
  ('Blog 1', now() - '21 days'::INTERVAL, 'This is a blog'),
  ('Blog 2', now() - '19 days'::INTERVAL, 'This is a blog'),
  ('Blog 3', now() - '17 days'::INTERVAL, 'This is a blog'),
  ('Blog 4', now() - '15 days'::INTERVAL, 'This is a blog'),
  ('Blog 5', now() - '13 days'::INTERVAL, 'This is a blog'),
  ('Blog 6', now() - '13 days'::INTERVAL, 'This is a blog'),
  ('Blog 7', now() - '21 days'::INTERVAL, 'This is a blog'),
  ('Blog 8', now() - '11 days'::INTERVAL, 'This is a blog'),
  ('Blog 9', now() - '11 days'::INTERVAL, 'This is a blog'),
  ('Blog 10', now() - '8 days'::INTERVAL, 'This is a blog'),
  ('Blog 11', now() - '8 days'::INTERVAL, 'This is a blog'),
  ('Blog 12', now() - '8 days'::INTERVAL, 'This is a blog'),
  ('Blog 13', now() - '7 days'::INTERVAL, 'This is a blog'),
  ('Blog 14', now() - '7 days'::INTERVAL, 'This is a blog'),
  ('Blog 15', now() - '5 days'::INTERVAL, 'This is a blog'),
  ('Blog 16', now() - '5 days'::INTERVAL, 'This is a blog'),
  ('Blog 17', now() - '5 days'::INTERVAL, 'This is a blog'),
  ('Blog 18', now() - '3 days'::INTERVAL, 'This is a blog'),
  ('Blog 19', now() - '2 days'::INTERVAL, 'This is a blog'),
  ('Blog 20', now() - '1 days'::INTERVAL, 'This is a blog');

COMMIT;