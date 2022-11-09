const React = require('react');
const Layout = require('./Layout');

module.exports = function Personal (props) {
    return (
    <Layout>

      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
                <button name="personalMy" type="button" className="btn btn-secondary">Мои маршруты</button>
                <button name="personalAdd" type="button" className="btn btn-secondary">Добавить маршрут</button>

      <div className="container_personal">
        <div className="row map-wrap">
          <div className="map-block">
            <div id="map" />
          </div>
          <div className="map-block">
            <div id="map2" />
          </div>
        </div>
      </div>
        <div>
        <button type="submit" name="map-save" id="mapSaveId">Сохранить маршрут</button>
        </div>

      <script defer src="js/map.js" />


    </Layout>
    )
}