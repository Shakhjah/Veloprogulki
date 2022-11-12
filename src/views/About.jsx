const React = require('react');
const Layout = require('./Layout');
const ModalAddComment = require('./ModalAddComment');

module.exports = function About({
  data, userSessionId, codeJson, linkQr,
}) {
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

            <img src={codeJson} style={{ width: '320px' }} alt="" title="" />

          </div>
          <a href={linkQr}>Ссылка на карту</a>

        </div>

      </div>

      <div className="about_comment">
        <button className="btn btn-primary" type="submit" name="map-save" id="mapSaveId">Комментарии</button>
      </div>
      {(userSessionId && (
        <div className="about_comment_add">
          <button className="btn btn-primary" type="submit" name="map-save" id="addCommentId" data-bs-toggle="modal" data-bs-target="#addCommentModal">Добавить Комментарий</button>
        </div>
      ))}

      <script defer src="js/mapAbout.js" />
      <script defer src="js/addComment.js" />
      <ModalAddComment userId={userSessionId} routeId={data.id} />
    </Layout>
  );
};
