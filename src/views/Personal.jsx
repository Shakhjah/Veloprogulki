const React = require('react');
const Layout = require('./Layout');

module.exports = function Personal({ dataMap, text }) {
  return (
    <Layout>
      <script defer src="/js/deleteFetch.js" />
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div className="perconal-count">
        <p>
          Вы добавили
          {' '}
          {dataMap.length}
          {' '}
          {text}
          .
        </p>
      </div>
      <div className="allPublic">
        {Array.isArray(dataMap) && (
          dataMap.map((el) => (
<<<<<<< HEAD
            // <div className="content">
            //   <div className="mapDiv">
            //     <img src={`https://static-maps.yandex.ru/1.x/?spn=0.1,0.1&l=map&pt=${JSON.parse(el.mapFrom)[1]},${JSON.parse(el.mapFrom)[0]},org~${JSON.parse(el.mapTo)[1]},${JSON.parse(el.mapTo)[0]},org`} />
            //   </div>
            <div id="content" className={`content${el.id}`}>
              <div className="mapDiv">1</div>
=======

            <div id="content" className={`content${el.id}`}>

              <div className="mapDiv">
                <img src={`https://static-maps.yandex.ru/1.x/?spn=0.1,0.1&l=map&pt=${JSON.parse(el.mapFrom)[1]},${JSON.parse(el.mapFrom)[0]},org~${JSON.parse(el.mapTo)[1]},${JSON.parse(el.mapTo)[0]},org`} />
              </div>
>>>>>>> dd980d351e61272d490593ec2bd0bb6583d92b49
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
                {/* <a href="#">Редактировать</a> */}
                <button id={el.id} className="btn btn-primary">Удалить</button>
              </div>
            </div>
          ))
        )}

      </div>
      <script defer src="js/map.js" />
    </Layout>
  );
};
