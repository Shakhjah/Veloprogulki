const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ data, userName, userSession }) {
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
            <img src="https://api.qrserver.com/v1/create-qr-code/?data=https://yandex.ru/maps/213/moscow/?from=api-maps&ll=37.619000%2C55.780094&mode=routes&rtext=55.777691%2C37.582096~55.775950%2C37.655910&rtt=bc&ruri=~&source=jsapi_2_1_79&utm_medium=localhost%3A3000%3Bend&utm_source=api-maps&z=14&amp;size=322x322" alt="" title="" />
          </div>
          <a href={linkQr}>Ссылка на карту</a>

        </div>

      </div>

      <div className="about_comment">
        <button className="btn btn-primary" type="submit" name="map-save" id="mapSaveId">Комментарии</button>
      </div>
      {(userSession && (
        <div className="about_comment_add">
          <button className="btn btn-primary" type="submit" name="map-save" id="mapSaveId">Добавить Комментарий</button>
        </div>
      ))}

      <script defer src="js/mapAbout.js" />
    </Layout>
  );
};
