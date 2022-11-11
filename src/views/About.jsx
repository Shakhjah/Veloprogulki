const React = require('react');
const Layout = require('./Layout');

module.exports = function About({ data, userName }) {
  // const linkFrom = data.mapFrom.replaceAll('[,]', '');
  const linkFrom = (JSON.parse(data.mapFrom)).join(',');
  const linkTo = (JSON.parse(data.mapTo)).join(',');
  // console.log('▶ ⇛ linkFrom', linkFrom);
  // console.log('▶ ⇛ dataFROM', data.mapFrom);
  // console.log('▶ ⇛ data', data);
  return (
    <Layout>
      <script
        defer
        src="https://api-maps.yandex.ru/2.1/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&lang=ru_RU"
        type="text/javascript"
      />
      <div>In ABOUT Views</div>
      <input type="text" id="from" name="from" value={data.mapFrom} hidden />
      <input type="text" id="to" name="to" value={data.mapTo} hidden />
      <div className="container">
        <div className="row map-wrap">
          <div className="map-block">
            <div id="mapAbout" />
          </div>
        </div>
        <a href={`https://yandex.ru/maps/?z=7&l=map&rtext=${linkFrom}~${linkTo}&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end`}>Ссылка на карту</a>
      </div>
      <script defer src="js/mapAbout.js" />
    </Layout>
  );
};
