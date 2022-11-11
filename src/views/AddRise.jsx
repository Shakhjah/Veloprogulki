const React = require('react');
const Layout = require('./Layout');

module.exports = function ({ userName, userId }) {
  console.log('IN ADDRISE VIEWS', userName, userId);
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
          <div className="block-field">
            <form id="addMapForm" action="/" method="post">
              <input name="addMap-userId" value={userId} hidden />
              <input type="text" name="addMap-title" />
              {/* <input type="text" name="addMap-body" /> */}
            </form>
          </div>
        </div>

        <script defer src="js/mapAdd.js" />
      </div>
    </Layout>
  );
};
