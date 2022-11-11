require('@babel/register');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const renderTemplate = (reactComponent, properties = {}, response) => {
  const reactEl = React.createElement(reactComponent, properties);
  const html = ReactDOMServer.renderToStaticMarkup(reactEl);
  response.write('<!DOCTYPE html>');
  response.end(html);
};

module.exports = renderTemplate;
