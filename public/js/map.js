ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    searchControlProvider: 'yandex#search',
  });
  // Получение ссылки на панель.
  const control = myMap.controls.get('routeButtonControl');
  console.log('▶ ⇛ controlMY', control);
  control.routePanel.state.set({
    type: 'bicycle',
  });
  // Получение мультимаршрута.
  const multiRoutePromise = control.routePanel.getRouteAsync();
  multiRoutePromise.then((multiRoute) => {
    // Подписка на событие обновления мультимаршрута.
    multiRoute.model.events.add('requestsuccess', () => {
      // Получение ссылки на активный маршрут.
      const activeRoute = multiRoute.getActiveRoute();
      // Когда панель добавляется на карту, она
      // создает маршрут с изначально пустой геометрией.
      // Только когда пользователь выберет начальную и конечную точки,
      // маршрут будет перестроен с непустой геометрией.
      // Поэтому для избежания ошибки нужно добавить проверку,
      // что маршрут не пустой.
      if (activeRoute) {
        multiRoute.options.set({
          // ----- Настройка вида
          // Цвет метки начальной точки.
          wayPointStartIconFillColor: 'red',
          // Цвет метки конечной точки.
          wayPointFinishIconFillColor: 'blue',
          // Внешний вид линии активного маршрута.
          routeActiveStrokeWidth: 8,
          routeActiveStrokeStyle: 'solid',
          routeActiveStrokeColor: '#002233',
          // Внешний вид линий альтернативных маршрутов.
          routeStrokeStyle: 'dot',
          routeStrokeWidth: 3,
          boundsAutoApply: true,
        });
        // Вывод информации об активном маршруте.
        console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
        console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);
      }
    });
  }, (err) => {
    console.log(err);
  });

  control.routePanel.options.set({
    types: {
      bicycle: true,
      pedestrian: true,
      masstransit: false,
    },
    routeStrokeColor: '00FF00',
  });

  // Создаем кнопку, с помощью которой пользователи смогут
  //  менять местами начальную и конечную точки маршрута.
  const switchPointsButton = new ymaps.control.Button({
    data: { content: 'Поменять местами точки А и В', title: 'Поменять точки местами' },
    options: { selectOnClick: false, maxWidth: 160 },
  });
  // Объявляем обработчик для кнопки.
  switchPointsButton.events.add('click', (event) => {
    // Меняет местами начальную и конечную точки маршрута.
    control.routePanel.switchPoints();
  });
  myMap.controls.add(switchPointsButton);

  // my button Сохранить маршрут
  const mapSaveButton = document.getElementById('mapSaveId');
  ymaps.domEvent.manager.add(mapSaveButton, 'click', async (event) => {
    // event.preventDefault();
    let activeRoute = control.routePanel.state.get({});
    console.log('▶ ⇛ activeRoute', activeRoute);
    console.log('▶ ⇛ FROM', activeRoute.from);
    console.log('▶ ⇛ TO', activeRoute.to);
    console.log('▶ ⇛ TYPE', activeRoute.type);
    // Создаем маршрут из полученных координат для получения данных
    const multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: [
        activeRoute.from,
        activeRoute.to,
      ],
      params: {
        // Тип маршрутизации - пешеходная маршрутизация.
        routingMode: 'bicycle',
      },
    }, {
      boundsAutoApply: true,
    });
    //-------------------------
    //-------------------------
    // Подписка на событие обновления данных маршрута.
    multiRoute.model.events.add('requestsuccess', () => {
      // Получение ссылки на активный маршрут.
      activeRoute = multiRoute.getActiveRoute();
      // Вывод информации о маршруте.
      console.log(`Длина3: ${activeRoute.properties.get('distance').text}`);
      console.log(`Время прохождения3: ${activeRoute.properties.get('duration').text}`);
      console.log('▶ ⇛ FROM333', activeRoute.from);
      console.log('▶ ⇛ TO333', activeRoute.to);
      // -------------------- Формируем обьект для отправки на сервер с картой

      // Для автомобильных маршрутов можно вывести
      // информацию о перекрытых участках.
      if (activeRoute.properties.get('blocked')) {
        console.log('На маршруте имеются участки с перекрытыми дорогами.');
      }
    });
  });
});

// ----------------------------------- 2 карта
function init() {
  // Задаём точки мультимаршрута.
  const pointA = [55.85810611088341, 38.440435433879074];
  const pointB = [55.88341498860973, 38.45050623291407];
  // Создаем мультимаршрут.
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: [
      pointA,
      pointB,
    ],
    params: {
      // Тип маршрутизации - пешеходная маршрутизация.
      routingMode: 'bicycle',
    },
  }, {
    // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
    boundsAutoApply: true,
  });
  // ----- Настройка вида
  multiRoute.options.set({
    // Цвет метки начальной точки.
    wayPointStartIconFillColor: 'red',
    // Цвет метки конечной точки.
    wayPointFinishIconFillColor: 'blue',
    // Внешний вид линии активного маршрута.
    routeActiveStrokeWidth: 8,
    routeActiveStrokeStyle: 'solid',
    routeActiveStrokeColor: '#002233',
    // Внешний вид линий альтернативных маршрутов.
    routeStrokeStyle: 'dot',
    routeStrokeWidth: 3,
    boundsAutoApply: true,
  });

  // Включение режима редактирования.
  // multiRoute.editor.start();
  // А вот так можно отключить режим редактирования.
  // multiRoute.editor.stop();
  //---------------------------
  // Создаем кнопку. Поменять местами.
  const changePointsButton = new ymaps.control.Button({
    data: { content: 'Поменять местами точки А и В' },
    options: { selectOnClick: true },
  });

  // Объявляем обработчики для кнопки.
  changePointsButton.events.add('select', () => {
    multiRoute.model.setReferencePoints([pointB, pointA]);
  });

  changePointsButton.events.add('deselect', () => {
    multiRoute.model.setReferencePoints([pointA, pointB]);
  });

  // Создаем карту с добавленной на нее кнопкой.
  const myMap = new ymaps.Map('map2', {
    center: pointA,
    zoom: 12,
    controls: [changePointsButton],
  }, {
    buttonMaxWidth: 300,
  });

  // console.log('▶ ⇛ zoom', myMap._zoom);
  // Получение инфо о маршруте
  multiRoute.model.events.add('requestsuccess', () => {
    // Получение ссылки на активный маршрут.
    const activeRoute = multiRoute.getActiveRoute();
    // Вывод информации о маршруте.
    // console.log(`distance-MAP-2: ${activeRoute.properties.get('distance').text}`);
    // console.log(`Time-MAP-2: ${activeRoute.properties.get('duration').text}`);
    // console.log(activeRoute);
    //----------------------
    const activeRoutePaths = activeRoute.getPaths();
    // console.log('▶ ⇛ activeRoutePaths', activeRoutePaths);
    //----------------------
    // Для автомобильных маршрутов можно вывести
    // информацию о перекрытых участках.
    if (activeRoute.properties.get('blocked')) {
      console.log('На маршруте имеются участки с перекрытыми дорогами.');
    }
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);

// https://api.geotree.ru/address.php?key=7mAEh31NHvpF&lat=55.85810611088341&lon=38.440435433879074&types=place
// https://api.geotree.ru/address.php?key=7mAEh31NHvpF&lat=55.89259179257202&lon=37.44131121542615&types=place
// 55.89259179257202, 37.44131121542615

// https://static-maps.yandex.ru/1.x/?ll=37.44131121542615,55.89259179257202&spn=0.1,0.1&l=map&pt=37.44131121542615,55.89259179257202
// https://static-maps.yandex.ru/1.x/?ll=55.79876910241722,37.539981486535005~55.75628533403617,37.509463920051545&spn=0.1,0.1&l=map&pt=37.44131121542615,55.89259179257202

// 55.75628533403617,37.509463920051545
// 55.79876910241722,37.539981486535005

// https://static-maps.yandex.ru/1.x/?ll=37.539981486535005,55.79876910241722&spn=0.1,0.1&l=map&pt=37.509463920051545,55.75628533403617&pt=37.539981486535005,55.79876910241722

// https://static-maps.yandex.ru/1.x/?ll=37.539981486535005,55.79876910241722&spn=0.1,0.1&l=map&pt=37.539981486535005,55.79876910241722,org~37.509463920051545,55.75628533403617,org
// https://static-maps.yandex.ru/1.x/?ll=37.539981486535005,55.79876910241722&spn=0.1,0.1&l=map&pt=37.539981486535005,55.79876910241722,org~37.509463920051545,55.75628533403617,org&pl=37.539981486535005,55.79876910241722,37.509463920051545,55.75628533403617
// https://static-maps.yandex.ru/1.x/?ll=37.539981486535005,55.79876910241722&l=map&pt=37.539981486535005,55.79876910241722,org~37.509463920051545,55.75628533403617,org&pl=37.539981486535005,55.79876910241722,37.509463920051545,55.75628533403617

// intent://maps.yandex.ru/?z=14&ll=37.19202049999994,55.98413958437002&l=map&rtext=55.96876622138302,37.18155253145688~55.984166690571904,37.19528544161313&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000#Intent;scheme=http;package=ru.yandex.yandexmaps;S.browser_fallback_url=https://yandex.ru/maps/?z=14&ll=37.19202049999994,55.98413958437002&l=map&rtext=55.96876622138302,37.18155253145688~55.984166690571904,37.19528544161313&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end
// intent://maps.yandex.ru/?z=15&ll=37.48819349999998,55.759552072768464&l=map&rtext=55.767835378298585,37.48676645967953~55.75525276485352,37.4898563644647&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000#Intent;scheme=http;package=ru.yandex.yandexmaps;S.browser_fallback_url=https://yandex.ru/maps/?z=15&ll=37.48819349999998,55.759552072768464&l=map&rtext=55.767835378298585,37.48676645967953~55.75525276485352,37.4898563644647&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end
// intent://maps.yandex.ru/?z=15&ll=37.48819349999998,55.759552072768464&l=map&rtext=55.767835378298585,37.48676645967953~55.75525276485352,37.4898563644647&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000#Intent;scheme=http;package=ru.yandex.yandexmaps

// https://yandex.ru/maps/?z=15&ll=37.48819349999998,55.759552072768464&l=map&rtext=55.767835378298585,37.48676645967953~55.75525276485352,37.4898563644647&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end
// https://yandex.ru/maps/?ll=55.78581991120715,37.39494987696253&l=map&rtext=37.39494987696253,55.78581991120715~55.78581991120715,37.39494987696253,43.70110222071254&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end

// intent://maps.yandex.ru/?z=7&ll=40.55733800000003,56.21412150951421&l=map&rtext=55.78581991120715,37.39494987696253~56.42432087202024,43.70110222071254&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000#Intent;scheme=http;package=ru.yandex.yandexmaps;S.browser_fallback_url=

// https://yandex.ru/maps/?z=7&l=map&rtext=55.78581991120715,37.39494987696253~56.42432087202024,43.70110222071254&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end
// [55.78581991120715,37.39494987696253]
// [56.42432087202024,43.70110222071254]

// [56.11591438441894,40.35450590449432]
// [56.14369845639928,40.41883705809757]
// https://yandex.ru/maps/?z=7&l=map&rtext=56.11591438441894,40.35450590449432~56.14369845639928,40.41883705809757&rtn=0&rtt=bc&rtm=atm&source=jsapi_2_1_79&from=api-maps&utm_source=api-maps&utm_medium=localhost:3000;end
const myToast = document.getElementById('toast');
const toast = new bootstrap.Toast(myToast);
// toast.show();

// var toastElList = [].slice.call(document.querySelectorAll('.toast'))
// var toastList = toastElList.map(function(toastEl)
