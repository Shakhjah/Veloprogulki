// console.log('пришел я сюда');
// posts.addEventListener('click', async (e) => {
//   if (e.target.dataset.post === 'delete') {
//     const { id } = e.target;
//     const response = await fetch('/personal', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id,
//       }),
//     });
//     if (response.status === 200) {
//       const ch = document.getElementById(`${id}`);
//       posts.removeChild();
//     } else {
//       console.log(error);
//     }
//   }
// });
const btnDelete = document.querySelectorAll('.delete_btn');

for (let i = 0; i <= btnDelete.length; i++) {
  btnDelete[i].addEventListener('click', async (event) => {
    try {
      event.preventDefault();
      // console.log(event.target);
      const { id } = event.target;
      const response = await fetch('/personal', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        }),
      });
      const result = await response.json();
      const container = document.querySelector('.allPublic');
      const findContent = document.querySelector(`.content${id}`);
      container.removeChild(findContent);
    } catch (error) {
      console.log(error);
    }
  });
}
