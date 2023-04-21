const puppeteer = require("puppeteer");
const db = require('./db/database');
require("dotenv").config();

class Company {
  constructor(name) {
    this.name = name;
    this.newAvailableJobs = [];
    this.jobs = [];
    this.addedJob = {};
    this.url = '';
  }


  async readUrl(url, selector) {
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    })
    const page = await browser.newPage();

    this.url = url;

    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    await page.waitForSelector(selector, { timeout: 5_000 }); // to avoid running $$eval before the selector is loaded

    this.jobs = await page.$$eval(selector, (elements) => {
      return elements.map(x => x.innerHTML)
    })

    await browser.close()

    return this.jobs
  }

  async compareData(readUrl, data) {
    const jobsFromSite = await readUrl;

    if (jobsFromSite.length > 0) {
      this.newAvailableJobs = jobsFromSite.filter(job => !data.includes(job))
    } else {
      return console.log('no jobs data');
    }

    if (this.newAvailableJobs.length > 0) {
      this.addedJob = {
        company: [this.name],
        newJobs: this.newAvailableJobs,
        foundAt: new Date(Date.now()),
        url: this.url
      }

      const saveAllJobs = async () => {
        try {
          await db.query('DELETE FROM jobs_table WHERE company=$1', [this.name]);
          const querySave = 'INSERT INTO jobs_table (company, jobs, found_at, url) VALUES ($1,$2,$3, $4)';
          await db.query(querySave, [this.name, jobsFromSite, new Date(Date.now()), this.url]);
        } catch (err) {
          console.log(err);
        }
      }

      saveAllJobs()
    } else {
      this.addedJob = {
        company: [this.name],
        newJobs: ['No new jobs today'],
        foundAt: new Date(Date.now()),
        url: this.url
      }
    }

    return this.addedJob;
  }
}

module.exports = Company;
