const val = document.getElementById('signInForm');
const reg = document.getElementById('signUpModal')

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

reg.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(signUpModal);
  const data = Object.fromEntries(formData);
  console.log('=======>', data);
  try {
    console.log('Hello')
  } catch (error) {  
  console.log(error);         
  }
})


