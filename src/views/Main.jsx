const React = require('react');
const Layout = require('./Layout');

module.exports = function ({ dataMap }) {
  // console.log('▶ ⇛ Allmaps', dataMap);
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
            <div id="content">
              <div className="mapDiv">
                <img src={`https://static-maps.yandex.ru/1.x/?spn=0.1,0.1&l=map&pt=${JSON.parse(el.mapFrom)[1]},${JSON.parse(el.mapFrom)[0]},org~${JSON.parse(el.mapTo)[1]},${JSON.parse(el.mapTo)[0]},org`} />
              </div>
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
              <div className="btn_content">
                <button className="btn btn-primary"><a href={`/about?id=${el.id}`}>Подробнее</a></button>
                {/* <a href={`/about?id=${el.id}`}>Подробнее</a> */}
              </div>
            </div>
          ))
        )}
      </div>
      <script defer src="js/map.js" />
    </Layout>
  );
};
