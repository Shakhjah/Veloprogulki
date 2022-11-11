const addCommentButton = document.getElementById('addCommentId');
const addCommentForm = document.getElementById('addCommentIdForm');

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
  } catch (error) {
    console.log(error);
  }
});
console.log('▶ ⇛ addCommentButton', addCommentButton);
console.log('▶ ⇛ addCommentButton', addCommentButton);
