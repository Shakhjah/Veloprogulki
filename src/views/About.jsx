const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ data, userName }) {
  const linkFrom = (JSON.parse(data.mapFrom)).join(',');
  const linkTo = (JSON.parse(data.mapTo)).join(',');
  const linkQr = `https://yandex.ru/maps/?z=7&l=map&rtext=${linkFrom}~${linkTo}&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end`;
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div className="about_content">
        <div className="about_map">
          <input type="text" id="from" name="from" value={data.mapFrom} hidden />
          <input type="text" id="to" name="to" value={data.mapTo} hidden />
          <div className="container">
            <div className="row map-wrap">
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
            <img src={'https://api.qrserver.com/v1/create-qr-code/?data=привет&amp;size=322x322'} alt="asd" title="asd" />
          </div>
          <a href={linkQr}>Ссылка на карту</a>

        </div>

      </div>
      <div className="about_comment">
        123
      </div>
      <script defer src="js/mapAbout.js" />
    </Layout>
  );
};
