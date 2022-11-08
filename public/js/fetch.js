const val = document.getElementById('signInForm');// Форма войти
const reg = document.getElementById('signUpForm');// Форма регистрации
const authOne = document.getElementById('authOne'); // Блок Войти и Регистрация
const authTwo = document.getElementById('authTwo'); // Блок Личный кабинет и Выход
const signInmodal = document.getElementById('signInModal');
const signUpmodal = document.getElementById('signUpModal');

(async function () {
  try {
    const response = await fetch('/auth/sess', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log('▶ ⇛ FRONT RUN SCRIPT', result);
    // Если есть куки
    if (result) {
      authTwo.removeAttribute('hidden', true);
    } else { // Если нет куки
      authOne.removeAttribute('hidden', true);
    }
  } catch (error) {
    console.log(error);
  }
}());

//
val.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(val);
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch('/auth/signIn', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('▶ ⇛ result FRONT', result);
    if (result?.user) {
      const inModal = bootstrap.Modal.getOrCreateInstance(signInmodal);
      inModal.hide();
      authTwo.removeAttribute('hidden');
      authOne.setAttribute('hidden', true);
    }
    if (result?.answer) {
      const addMessage = val.querySelector('.modal-body');
      const divMessage = document.createElement('div');
      divMessage.innerHTML = `${result?.answer}`;
      divMessage.classList.add('red-text');
      addMessage.append(divMessage);
      val.reset();// Очистить все поля
    }
    console.log('▶ ⇛ result', result);
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
    if (result?.answer) {
      // Создаем элемент "такой пользователь существует"
      const addMessage = reg.querySelector('.modal-body');
      const divMessage = document.createElement('div');
      divMessage.innerHTML = `${result?.answer}`;
      divMessage.classList.add('red-text');
      addMessage.append(divMessage);
      reg.reset();// Очистить все поля
    }
    // Если вернули имя созданного юзера
    if (result?.user) {
      const upModal = bootstrap.Modal.getOrCreateInstance(signUpmodal);
      upModal.hide();
      authTwo.removeAttribute('hidden');
      authOne.setAttribute('hidden', true);
    }
  } catch (error) {
    console.log(error);
  }
});
