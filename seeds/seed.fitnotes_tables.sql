BEGIN;

TRUNCATE
progress_points,
metrics,
users;

INSERT INTO users (id, user_name, password, user_email)
VALUES
('uuid1', 'user1', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user1@email.com'),
('uuid2', 'user2', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user2@email.com'),
('uuid3', 'user3', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user3@email.com'),
('uuid4', 'user4', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user4@email.com');


INSERT INTO metrics (id, metric_name, measurement_type, user_id)
VALUES
('uuid5', 'weight', 'lbs', 'uuid1'),
('uuid6', 'bodyfat', 'percentage', 'uuid1'),
('uuid7', 'walking', 'miles', 'uuid2');


INSERT INTO progress_points(id, metric_id, user_id, value)
VALUES
('uuid10', 'uuid5', 'uuid1', 5),
('uuid8', 'uuid6', 'uuid2', 6),
('uuid9', 'uuid7', 'uuid3', 7);

COMMIT;