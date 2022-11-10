const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ data, userName }) {
  console.log('▶ ⇛ data', data);
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div>In ABOUT Views</div>
      <input type="text" id="from" name="from" value={data.mapFrom} hidden />
      <input type="text" id="to" name="to" value={data.mapTo} hidden />
      <div className="container">
        <div className="row map-wrap">
          <div className="map-block">
            <div id="mapAbout" />
          </div>
          <div className="map-block">
            <div id="mapAbout" />
          </div>
        </div>
      </div>
      <script defer src="js/mapAbout.js" />
    </Layout>
  );
};
