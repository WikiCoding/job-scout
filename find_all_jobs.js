const db = require('./db/database');

const findAllJobs = async (req, res) => {
  try {
    const queryString = 'SELECT * FROM jobs_table ORDER BY company';

    const result = await db.query(queryString);

    res.send(result.rows);
  } catch (err) {
    res.send(err)
  }
}

module.exports = findAllJobs;