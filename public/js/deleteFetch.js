const posts = document.querySelector('.pidor');
posts.addEventListener('click', async (e) => {
  if (e.target.dataset.post === 'delete') {
    const { id } = e.target;
    const response = await fetch('/personal/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.status === 200) {
      const ch = document.getElementById(`${id}`);
      posts.removeChild(ch);
    } else {
      console.log(error);
    }
  }
});