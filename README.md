Fitnotes-Server
Live at: https://salty-basin-04383.herokuapp.com/

API DOCUMENTATION:
/api/auth/login POST takes in a user_name and a password value, it will send back an auth token
/api/auth/register POST takes in a user_name, password, and user_email value. It will send back an id, user_name, and user_email

/api/metrics GET is a protected endpoint. It doesnt take in anything, and will send back an array of metric objects that the user has access to.
/api/metrics/ POST is a protected endpoint. It takes in an id, metric_name, and measurment_type. It will send back the same.

/api/progress-points POST is a protected endpoint. It takes in an id, metric_id, and value. It will return an object with the same, plus created_at and updated_at timestamps
/api/progress-points/:metricId is a protected endpoint. It takes the metricId in the params, and returns an array of objects with all of a users progress points for that metric. They will have an id, metric_id, created_at, updated_at, and value keys.

SUMMARY
This is a server for the fitnotes client. The app allows a user to upload progress points for various metrics, both starter metrics and user generated ones, and see them displayed over time as a graph. It allows a user to register and login so that they see only their data.

![Fitnotes-Home](/images/Fitnotes-Home.PNG)

TECHNOLOGY
When building this server, knex, postgress, express, javascript, chai, mocha, nodemon, bcrypt, and json web token were used.
