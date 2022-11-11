const addCommentButton = document.getElementById('addCommentId');
const addCommentForm = document.getElementById('addCommentIdForm');
const addCommentModal = document.getElementById('addCommentModal');
const textHeadForm = addCommentForm.querySelector('#commentTitleTextId');

addCommentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(addCommentForm);
  const data = Object.fromEntries(formData);
  try {
    const response = await fetch('/addcomment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    const closeFromTime = (text, classColor) => {
      // textHeadForm.classList.add(classColor);
      textHeadForm.className = classColor;
      textHeadForm.innerText = text;
      addCommentForm.reset();
      setTimeout(() => {
        textHeadForm.innerText = 'Комментарий';
        const upModal = bootstrap.Modal.getOrCreateInstance(addCommentModal);
        upModal.hide();
      }, 1800);
    };
    if (result?.answer) {
      const textForForm = result?.answer;
      const classColor = 'green-text';
      closeFromTime(textForForm, classColor);
    }
    if (result?.possibly) {
      const textForForm = result?.possibly;
      const classColor = 'red-text';
      closeFromTime(textForForm, classColor);
    }
    console.log('▶ ⇛ resultFROM SERVER', result);
  } catch (error) {
    console.log(error);
  }
});
