const React = require('react');
const Layout = require('./Layout');

module.exports = function (props) {
  return (
    <Layout>
      <div className="allPublic">
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
          </div>
          <button type="submit" name="map-save" id="mapSaveId">Сохранить маршрут</button>
        </div>

        <script defer src="js/mapAdd.js" />
      </div>
    </Layout>
  );
};
