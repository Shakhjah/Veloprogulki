7.
const React = require('react');
const Modal = require('./Modal')

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous" />
        <link rel="stylesheet" href="style/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap" rel="stylesheet" />
        <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous" />
        <title>Document</title>
      </head>
      <body>

        <a href='#'>Главная </a>
        <a href="/" data-bs-toggle="modal" data-bs-target="#signInModal">
          <div className="sign-in">Войти</div>
        </a>
        <a href="/" data-bs-toggle="modal" data-bs-target="#signUpModal">
          <div className="sign-up">Регистрация</div>
        </a>
        <a href='#' hidden>Личный кабинет</a>
        <a href='#' hidden>Выйти</a>


        {children}
        <Modal></Modal>
      </body>
    </html>
  )
};
