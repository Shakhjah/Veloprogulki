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

        <div className="container-fluid add-road">
          <div className="row map-wrap">
            <div className="col-8">
              <div className="map-block">
                <div id="mapAddId" />
              </div>
            </div>
            <div className="block-addMap">
              <form id="addMapForm" action="/" method="post">
                <input name="addMap-userId" value={userId} hidden />
                <label>
                  <p>
                    Название маршрута
                  </p>
                  <input className="form-control" type="text" name="addMap-title" placeholde="Текст" />
                </label>
              </form>
              <button className="btn btn-primary" type="submit" name="map-save" id="mapSaveId">Сохранить маршрут</button>
              <div id="noChoiseId" className="no-choise red-text" hidden>Вы ничего не выбрали</div>
            </div>

          </div>
        </div>

        <script defer src="js/mapAdd.js" />
      </div>
    </Layout>
  );
};
