const val = document.getElementById('signInForm');

val.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(signInForm);
  const data = Object.fromEntries(formData);
  console.log(formData);
  console.log('data ====>>>', data);
  try {
    console.log('asd');
  } catch (error) {
    console.log(error);
  }
});

// signUpModal
