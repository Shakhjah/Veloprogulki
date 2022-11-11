const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ dataMap, usName }) {
  return (
    <Layout userName={usName}>
      <div>In ABOUT Views</div>
    </Layout>
  );
};
