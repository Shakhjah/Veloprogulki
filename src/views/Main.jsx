const React = require('react');
const Layout = require('./Layout');

module.exports = function (props) {
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div className="allPublic">
        <div className="content">
          {' '}
          <div className="mapDiv">1</div>
          {' '}
          <div className="text_content">
            <p>Длина маршрута</p>
            <p>Населенный пункт: Москва</p>
            <p>Название маршрута: Мой маршрут №1</p>
            <p>Автор: Василий Петров</p>
            <p>Рейтинг: 4,7</p>
          </div>
        </div>
        <div className="content">
          {' '}
          <div className="mapDiv">1</div>
          {' '}
          <div className="text_content">
            <p>Длина маршрута</p>
            <p>Населенный пункт: Москва</p>
            <p>Название маршрута: Мой маршрут №1</p>
            <p>Автор: Василий Петров</p>
            <p>Рейтинг: 4,7</p>
          </div>
        </div>
        <div className="content">
          {' '}
          <div className="mapDiv">1</div>
          {' '}
          <div className="text_content">
            <p>Длина маршрута</p>
            <p>Населенный пункт: Москва</p>
            <p>Название маршрута: Мой маршрут №1</p>
            <p>Автор: Василий Петров</p>
            <p>Рейтинг: 4,7</p>
          </div>
        </div>
        <div className="content">
          {' '}
          <div className="mapDiv">1</div>
          {' '}
          <div className="text_content">
            <p>Длина маршрута</p>
            <p>Населенный пункт: Москва</p>
            <p>Название маршрута: Мой маршрут №1</p>
            <p>Автор: Василий Петров</p>
            <p>Рейтинг: 4,7</p>
          </div>
        </div>
      </div>
      <script defer src="js/map.js" />
    </Layout>
  );
};
