const express = require('express');
const findJobs = require('./find_jobs');
const path = require('path');
const findAllJobs = require('./find_all_jobs');
const publicPath = path.join(__dirname, './public');
const app = express();
app.use(express.json());
app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(`${publicPath}/index.html`)
})

app.get('/jobs/find', findJobs);

app.get('/jobs/all', findAllJobs);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
})