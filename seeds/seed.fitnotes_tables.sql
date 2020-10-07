BEGIN;

TRUNCATE
progress_points,
metrics,
users;

INSERT INTO users (id, user_name, password, user_email)
VALUES
('98b4b1ca-08aa-11eb-adc1-0242ac120002', 'user1', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user1@email.com'),
('98b4b756-08aa-11eb-adc1-0242ac120002', 'user2', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user2@email.com'),
('98b4b8a0-08aa-11eb-adc1-0242ac120002', 'user3', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user3@email.com'),
('98b4b990-08aa-11eb-adc1-0242ac120002', 'user4', '$2a$12$sUV6ymCw7cvjlTB7n1eSEOe6ZNWLisph..F/tG2JvTcdReky3kss6', 'user4@email.com');


INSERT INTO metrics (id, metric_name, measurement_type, user_id)
VALUES
('98b4ba58-08aa-11eb-adc1-0242ac120002', 'weight', 'lbs', '98b4b1ca-08aa-11eb-adc1-0242ac120002'),
('98b4bcce-08aa-11eb-adc1-0242ac120002', 'bodyfat', 'percentage', '98b4b1ca-08aa-11eb-adc1-0242ac120002'),
('98b4bda0-08aa-11eb-adc1-0242ac120002', 'walking', 'miles', '98b4b756-08aa-11eb-adc1-0242ac120002');


INSERT INTO progress_points(id, metric_id, user_id, value)
VALUES
('98b4be5e-08aa-11eb-adc1-0242ac120002', '98b4ba58-08aa-11eb-adc1-0242ac120002', '98b4b1ca-08aa-11eb-adc1-0242ac120002', 5),
('98b4bf1c-08aa-11eb-adc1-0242ac120002', '98b4bcce-08aa-11eb-adc1-0242ac120002', '98b4b756-08aa-11eb-adc1-0242ac120002', 6),
('ffa2d1fe-08ab-11eb-adc1-0242ac120002', '98b4bda0-08aa-11eb-adc1-0242ac120002', '98b4b8a0-08aa-11eb-adc1-0242ac120002', 7);

COMMIT;