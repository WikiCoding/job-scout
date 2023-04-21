const Company = require('./companies');
const db = require('./db/database');

const findJobs = (req, res) => {
  const newJobs = [];
  const data = [];

  const getData = async () => {
    const queryString = 'SELECT * FROM jobs_table';

    const result = await db.query(queryString);

    if (result.rows.length > 0) {
      result.rows.forEach(item => {
        item.jobs.forEach(job => {
          data.push(job);
        })
      })
    }
  }

  getData();

  setTimeout(() => {
    const farfetch = new Company('farfetch');
    const loadedFarfetchJobs = farfetch.readUrl('https://farfetchgroupcareers.com/jobs?locations=PT+Portugal%2C+Flexible+Office+Location&locations=PT+Porto%2C+Portugal',
      '.styles-sc-1htfc9h-4');
    const farfetchNewJobs = farfetch.compareData(loadedFarfetchJobs, data);
    farfetchNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const criticalManufacturing = new Company('critical manufacturing');
    const loadedCriticalManufJobs = criticalManufacturing.readUrl('https://careers.criticalmanufacturing.com/#jobs', '.styles--3TJHk span');
    const criticalManufacturingNewJobs = criticalManufacturing.compareData(loadedCriticalManufJobs, data);
    criticalManufacturingNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const vwds = new Company('volkswagen digital solutions');
    const loadedVwdsJobs = vwds.readUrl('https://www.vwds.pt/careers/', '.job-card__role');
    const vwdsNewJobs = vwds.compareData(loadedVwdsJobs, data);
    vwdsNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const criticalSoftware = new Company('critical software');
    const loadedCriticalSoftJobs = criticalSoftware.readUrl('https://criticalsoftware.com/en/careers/join-us', '.openings__ItemTitle-sc-1lmyhyr-7')
    const criticalSoftwareNewJobs = criticalSoftware.compareData(loadedCriticalSoftJobs, data);
    criticalSoftwareNewJobs.then(data => newJobs.push(data)).catch(console.error);
  }, 4_000)

  // inside setTimeout function to avoid MaxListenersExceededWarning due too many async requests happening at the same period of time
  setTimeout(() => {
    const blip = new Company('blip');
    const loadedBlipJobs = blip.readUrl('https://www.blip.pt/jobs/', '.stretched-link');
    const blipNewJobs = blip.compareData(loadedBlipJobs, data);
    blipNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const ctw = new Company('ctw');
    const loadedCtwJobs = ctw.readUrl('https://join.criticaltechworks.com/en-GB/jobs?utm_campaign=widget&utm_content=jobs&utm_medium=web', '.text-block-base-link');
    const ctwNewJobs = ctw.compareData(loadedCtwJobs, data);
    ctwNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const infraspeak = new Company('infraspeak');
    const loadedInfraspeakJobs = infraspeak.readUrl('https://careers.infraspeak.com/jobs', '.text-block-base-link');
    const infraspeakNewJobs = infraspeak.compareData(loadedInfraspeakJobs, data);
    infraspeakNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const swordJobs = async () => {
      const sword = new Company('sword');
      const loadedSwordJobs = await sword.readUrl('https://jobs.lever.co/swordhealth', '.posting-title h5');

      // removing the Physical Therapist roles
      const filteredJobs = []
      loadedSwordJobs.forEach(job => {
        if (!job.startsWith('Physical Therapist')) {
          filteredJobs.push(job)
        }
      })

      const swordNewJobs = await sword.compareData(filteredJobs, data);
      newJobs.push(swordNewJobs);
    }

    swordJobs();
  }, 8_000)

  setTimeout(() => {
    const mindera = new Company('mindera');
    const loadedMinderaJobs = mindera.readUrl('https://mindera.com/jobs?locations=Porto%2CRemote', '.css-t0k281 p');
    const minderaNewJobs = mindera.compareData(loadedMinderaJobs, data);
    minderaNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const sovos = new Company('sovos');
    const loadedSovosJobs = sovos.readUrl('https://recruit.hirebridge.com/v3/jobs/list.aspx?cid=6875&jobgroup=1002', 'a');
    const sovosNewJobs = sovos.compareData(loadedSovosJobs, data);
    sovosNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const inetum = new Company('inetum');
    const loadedInteumJobs = inetum.readUrl('https://www.inetum.com/en/jobs?f%5B0%5D=region%3A1075', '.card-title');
    const inetumNewJobs = inetum.compareData(loadedInteumJobs, data);
    inetumNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const natixis = new Company('natixis');
    const loadedNatixisJobs = natixis.readUrl('https://careers.smartrecruiters.com/NatixisInPortugal/', '.details-title');
    const natixisNewJobs = natixis.compareData(loadedNatixisJobs, data);
    natixisNewJobs.then(data => newJobs.push(data)).catch(console.error);

    const mercedes = new Company('mercedes');
    const loadedMercedesJobs = mercedes.readUrl('https://www.mercedes-benz.io/jobs/?categories=Software+Engineering&locations=Portugal', '.job-list__job__name a');
    const mercedesNewJobs = mercedes.compareData(loadedMercedesJobs, data);
    mercedesNewJobs.then(data => newJobs.push(data)).catch(console.error);

  }, 11_000)

  //waiting for the scrapping to completed and add data to the empty array
  setTimeout(() => {
    if (newJobs.length > 0) {

      const filteredNewJobs = []
      newJobs.forEach(newJob => {
        if (newJob.newJobs[0] !== 'No new jobs today') {
          filteredNewJobs.push(newJob);
        }
      })

      if (filteredNewJobs.length === 0) {
        res.send({
          company: ['Could not find new jobs today'],
          newJobs: [''],
        })
      } else {
        res.send(filteredNewJobs)
      }
    } else {
      alert('There was a server error, please try again in a bit.');
      return
    }
  }, 30_000);
}

module.exports = findJobs;