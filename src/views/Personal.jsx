const React = require('react');
const Layout = require('./Layout');

module.exports = function Personal({ findCard }) {
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <script
        defer
        src="/js/deleteFetch.js"
      >
      </script>
      <div className="pidor">
        { findCard?.map((el) =>
        (<div className="content_lk" id={el.id} key={el.id} >
        {' '}
        <div className="mapDiv">1</div>
        {' '}
        <div className="text_content">
          <p>Длина маршрута: {el.distanse}</p>
          <p>Населенный пункт: {el.city}</p>
          <p>Название маршрута: {el.title}</p>
          <p>Автор: Василий Петров</p>
          <p>Рейтинг: 4,7</p>
        </div>
        <div className="btn_content">
          <a href="#">Редактировать</a>
          
          <button id={el.id} data-post='delete'>delete</button>
          
        </div>
      </div>)) }
        
      </div>
      <script defer src="js/map.js" />
    </Layout>
  );
};
