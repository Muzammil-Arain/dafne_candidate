export let steps = [
    {
      name: 'Work Experience/History',
      submited: true,
      id: 1
    },
    {
      name: 'Education',
      submited: false,
      id: 2
    },
    {
      name: 'Passport & Work Visa',
      submited: false,
      id: 3
    },
    {
      name: 'Language',
      submited: false,
      id: 4
    },
    {
      name: 'Skills',
      submited: false,
      id: 5
    },
    {
      name: 'Valid License & Certificates',
      submited: false,
      id: 6
    },
  ];
  export const dateFormet = 'MMM Do YY';
  export const dateFormetchange = 'YYYY-MM-D';
  export const progressSteps = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
  export const progressTextSteps = ['10%', '20%', '30%', '40%', '50%', '60%'];
  
  export const changeSteps = (selectedId) => {
    const update = steps.map((val) => {
      if (selectedId == val.id) {
        return { ...val, submited: true }
      } else {
        return val
      }
  
    })
    steps = update
  }