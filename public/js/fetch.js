const val = document.getElementById('signInForm');
const reg = document.getElementById('signUpForm');

val.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(val);
  const data = Object.fromEntries(formData);
  console.log(formData);
  console.log('data ====>>>', data);
  try {
    console.log('asd');
  } catch (error) {
    console.log(error);
  }
});

reg.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(reg);
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch('/auth/signUp', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('result===>>>>', result);
  } catch (error) {
    console.log(error);
  }
});
