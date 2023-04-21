const findJobsBtn = document.querySelector('#job-updates-btn');
const allLoadedJobs = document.querySelector('#all-jobs-btn');
const url = 'https://job-scout.onrender.com'
//const url = 'http://localhost:5000';
const allJobs = document.querySelector('.all_jobs');


findJobsBtn.addEventListener('click', async () => {
  findJobsBtn.setAttribute('disabled', '');
  allLoadedJobs.setAttribute('disabled', '');
  findJobsBtn.innerHTML = "Please wait, I'm working my magic✨";
  allJobs.innerHTML = '';

  let data = '';
  const response = await fetch(`${url}/jobs/find`, {
    method: 'GET'
  })

  data = await response.json();

  if (data.length > 0) {
    data.forEach(item => {
      const jobCompany = document.createElement('h2');
      const urlCompany = document.createElement('div');

      jobCompany.innerHTML = item.company[0];
      urlCompany.innerHTML = `<hr /><a href=${item.url}>${item.company[0]} Careers Link</a>`;

      item.newJobs.forEach(job => {
        const jobEl = document.createElement('li');

        jobEl.innerHTML = job;

        jobCompany.appendChild(jobEl);
      })

      allJobs.appendChild(urlCompany);
      allJobs.appendChild(jobCompany);

    })

    findJobsBtn.innerHTML = 'Find Job Updates';
    findJobsBtn.removeAttribute('disabled');
    allLoadedJobs.removeAttribute('disabled');
  }
  else {
    allJobs.innerHTML = '<div><h1>No new jobs for today</h1></div>';
    findJobsBtn.innerHTML = 'Find Job Updates';
    findJobsBtn.removeAttribute('disabled');
  }
})


allLoadedJobs.addEventListener('click', async () => {
  allLoadedJobs.setAttribute('disabled', '');
  allLoadedJobs.innerHTML = 'Loading from Database...';
  allJobs.innerHTML = '';

  const response = await fetch(`${url}/jobs/all`, {
    method: 'GET'
  })

  data = await response.json();

  if (data.length > 0) {
    data.forEach(item => {
      const jobCompany = document.createElement('h2');
      const urlCompany = document.createElement('div');

      jobCompany.innerHTML = item.company;
      urlCompany.innerHTML = `<hr /><a href=${item.url}>${item.company} Careers Link</a>`;

      item.jobs.forEach(job => {
        const jobEl = document.createElement('li');
        jobEl.innerHTML = job;

        jobCompany.appendChild(jobEl);
      })

      allJobs.appendChild(urlCompany);
      allJobs.appendChild(jobCompany);

      allLoadedJobs.innerHTML = 'Show me all loaded Jobs';
      allLoadedJobs.removeAttribute('disabled');
    })
  }
  else {
    allJobs.innerHTML = 'Could not find jobs.';
    allLoadedJobs.innerHTML = 'Show me all loaded Jobs';
    allLoadedJobs.removeAttribute('disabled');
  }
})
