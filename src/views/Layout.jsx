7. 
const React = require('react');

module.exports = function Layout({ children }) {
  return (
<html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <a href='/'>На главную</a>
        <a href='/form'>что угодно</a>
        <a href='/form2'>kek</a>

        {children}
      </body>
    </html>
  )};
