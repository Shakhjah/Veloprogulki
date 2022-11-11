const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ data, userName }) {
  // console.log('▶ ⇛ data', data);
  return (
    <Layout>
      <div className="about_content">
        <div className="about_map">
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
        </div>
        <div className="about_road">
          <div className="text_content">
            <p>
              Длина маршрута:
              {' '}
              {data.distanse}
            </p>
            <p>
              Населенный пункт:
              {' '}
              {data.city}
            </p>
            <p>
              Название маршрута:
              {' '}
              {data.title}
            </p>
            <p>
              Автор:
              {' '}
              {data.User.dataValues.name}
            </p>
            <p>Рейтинг: 4,7</p>
          </div>
          <div className="qrcode">
            <img src="http://api.qrserver.com/v1/create-qr-code/?data=[ВСТАВИТЬ СВОИ ДАННЫЕ]&size=322x322" alt="123" />
          </div>

        </div>

      </div>
      <div className="about_comment">
        <div className="view_comment">
          1
        </div>
        <div className="add_comment">
          <input type="text" />
        </div>
      </div>
    </Layout>
  );
};
