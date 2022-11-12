const React = require('react');
const Layout = require('./Layout');

module.exports = function (props) {
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />

      <div className="container">
        <div className="row map-wrap">
          <div className="map-block">
            <div id="map" />
          </div>
          {/* <div className="map-block">
            <div id="map2" />
          </div> */}
          <div className="map-block">
            <div id="map3" />
          </div>
        </div>
        <button type="submit" name="map-save" id="mapSaveId">Сохранить маршрут</button>
      </div>

      <script defer src="js/map2.js" />
      <script defer src="js/map3.js" />
    </Layout>
  );
};
// ee11c971-3558-49d6-8fae-209f13ccaf25

// https://geocode-maps.yandex.ru/1.x/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&geocode=37.611347,55.760241
// https://geocode-maps.yandex.ru/1.x/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&geocode=37.589648851918376,55.757984716213045
