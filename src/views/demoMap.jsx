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
          <div className="map-block">
            <div id="map2" />
          </div>
        </div>
        <button type="submit" name="map-save" id="mapSaveId">Сохранить маршрут</button>
      </div>

      <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" id="toast">
        <div className="toast-header">
          <img src="..." className="rounded mr-2" alt="..." />
          <strong className="mr-auto">Bootstrap</strong>
          <small>11 mins ago</small>
          <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="toast-body">
          Hello, world! This is a toast message.
        </div>
      </div>

      <script defer src="js/map.js" />
    </Layout>
  );
};
