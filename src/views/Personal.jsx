const React = require('react');
const Layout = require('./Layout');

module.exports = function Personal({ dataMap }) {
  console.log('я тут ========>>>>', dataMap);
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div className="allPublic">
        {Array.isArray(dataMap) && (
          dataMap.map((el) => (
            <div className="content">
              <div className="mapDiv">1</div>
              <div className="text_content">
                <p>
                  Длина маршрута:
                  {' '}
                  {el.distanse}
                </p>
                <p>
                  Населенный пункт:
                  {' '}
                  {el.city}
                </p>
                <p>
                  Название маршрута:
                  {' '}
                  {el.title}
                </p>
                <p>
                  Автор:
                  {' '}
                  {el.User.dataValues.name}
                </p>
                <p>Рейтинг: 4,7</p>
              </div>
              <input type="text" id="from" name="from" value={el.mapFrom} hidden />
              <input type="text" id="to" name="to" value={el.mapTo} hidden />
              <div className="btn_content">
                <a href="#">Редактировать</a>
                <a href="#">Удалить</a>
              </div>
            </div>
          ))
        )}

      </div>
      <script defer src="js/map.js" />
    </Layout>
  );
};
