7.
const React = require('react');

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="style/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@600&display=swap" rel="stylesheet" />
        <title>Document</title>
      </head>
      <body>

        <a href='#'>Главная </a>
        <a href='#' hidden>Войти</a>
        <a href='#' hidden>Регистрация</a>
        <a href='#' hidden>Личный кабинет</a>
        <a href='#' hidden>Выйти</a>


        {children}
      </body>
    </html>
  )
};
