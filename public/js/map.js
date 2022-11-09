ymaps.ready(() => {
  const myMap = new ymaps.Map('map', {
    center: [55.751574, 37.573856],
    zoom: 12,
    controls: ['zoomControl', 'routeButtonControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  const control = myMap.controls.get('routeButtonControl');
  control.routePanel.state.set({
    type: 'bicycle',
  });

  control.routePanel.options.set({
    types: {
      bicycle: true,
      pedestrian: true,
      masstransit: false,
    },
    routeStrokeColor: '00FF00',
  });

  // Создаем кнопку, с помощью которой пользователи смогут менять местами начальную и конечную точки маршрута.
  const switchPointsButton = new ymaps.control.Button({
    data: { content: 'Поменять местами', title: 'Поменять точки местами' },
    options: { selectOnClick: false, maxWidth: 160 },
  });
  // // Объявляем обработчик для кнопки.
  // switchPointsButton.events.add('click', (event) => {
  //   // Меняет местами начальную и конечную точки маршрута.
  //   control.routePanel.switchPoints();
  // });
  // myMap.controls.add(switchPointsButton);

  // my button Сохранить маршрут
  const mapSaveButton = document.getElementById('mapSaveId');
  ymaps.domEvent.manager.add(mapSaveButton, 'click', (event) => {
    // event.preventDefault();
    const activeRoute = control.routePanel.state.get({});
    console.log('▶ ⇛ activeRoute', activeRoute);
    console.log('▶ ⇛ FROM', activeRoute.from);
    console.log('▶ ⇛ TO', activeRoute.to);
    console.log('▶ ⇛ TYPE', activeRoute.type);
  });
});

// ------------------- 2 MAP
// ymaps.ready(() => {
//   const myMap = new ymaps.Map('map2', {
//     center: 'auto',
//     zoom: 12,
//     controls: ['zoomControl'], // Элементы управления
//     behaviors: ['drag', 'multiTouch', 'scrollZoom'],
//   }, {
//     searchControlProvider: 'yandex#search',
//   });

//   // const control = myMap.controls.get('routeButtonControl');
//   // control.routePanel.state.set({
//   //   type: 'bicycle',
//   // });

//   // control.routePanel.options.set({
//   //   types: {
//   //     bicycle: true,
//   //     pedestrian: true,
//   //     masstransit: false,
//   //   },
//   //   routeStrokeColor: '00FF00',
//   // });

//   const multiRoute = new ymaps.multiRouter.MultiRoute({
//     referencePoints: [
//       [55.85810611088341, 38.440435433879074],
//       [55.88341498860973, 38.45050623291407],
//     ],
//     params: {
//       // Тип маршрутизации
//       routingMode: 'bicycle',
//     },
//   }, {
//     // Опция editorDrawOver запрещает ставить точки поверх объектов карты
//     // (в режиме добавления новых точек). Это нужно для того,
//     // чтобы пользователи могли создавать промежуточные
//     // точки по линии маршрута.
//     editorDrawOver: true,
//     // Опция editorMidPointsType задает тип промежуточных точек,
//     // которые будут создаваться на маршруте.
//     // "via" - будут создаваться транзитные точки;
//     // "way" - путевые точки.
//     editorMidPointsType: 'via',
//   });
//   // Добавление маршрута на карту.
//   myMap.geoObjects.add(multiRoute);
// });

function init() {
  // Задаём точки мультимаршрута.
  const pointA = [55.85810611088341, 38.440435433879074];
  const pointB = [55.88341498860973, 38.45050623291407];
  /**
       * Создаем мультимаршрут.
       */
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

  // Создаем кнопку.
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
  const geo = ymaps.geocode('Moscow');
  geo.then(
    (res) => {
      // Выведем в консоль данные, полученные в результате геокодирования объекта.
      console.log('GEO', res.geoObjects.get(0).properties.get('metaDataProperty').getAll());
    },
    (err) => {
      // Обработка ошибки.
    },
  );
  geo.then((res) => console.log('RES', res));
  // Получение инфо о маршруте
  multiRoute.model.events.add('requestsuccess', () => {
    // Получение ссылки на активный маршрут.
    const activeRoute = multiRoute.getActiveRoute();
    console.log('▶ ⇛ activeRoute', activeRoute.getCountry());

    // console.log('▶ ⇛ geo', geo);
    // Вывод информации о маршруте.
    console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
    console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);
    // Для автомобильных маршрутов можно вывести
    // информацию о перекрытых участках.
    console.log('На маршруте имеются участки с перекрытыми дорогами.');
  });

  // const myGeocoder = ymaps.geocode('Moscow');
  // myGeocoder.then(
  //   (res) => {
  //     // map.geoObjects.add(res.geoObjects);
  //     // Выведем в консоль данные, полученные в результате геокодирования объекта.
  //     console.log('GEO', res.geoObjects.get(0).getLocalities('Moscow'));
  //     // console.log(res.geoObjects.get(0).getLocalities());
  //   },
  // )
  //   .catch((err) => console.log);
  // myMap.getAdministrativeAreas('Moscow');

  // const geoCoder = ymaps.geocode('Moscow');
  // geoCoder.then((result) => {
  //   console.log(result.geoObjects.get(0).getLocalities());
  // });
  // Получение инфо о маршруте
  //   multiRoute.model.properties('requestsuccess', () => {
  //     // Получение ссылки на активный маршрут.
  //     const activeRoute = multiRoute.getActiveRoute();
  //     // Вывод информации о маршруте.
  //     console.log(`activeRoute: ${activeRoute.propertiesЪ}`);
  //     console.log(activeRoute);
  //     // Для автомобильных маршрутов можно вывести
  //     // информацию о перекрытых участках.
  //     if (activeRoute.properties.get('blocked')) {
  //       console.log('На маршруте имеются участки с перекрытыми дорогами.');
  //     }
  //   });

  //   // Добавляем мультимаршрут на карту.
  //   myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);

// https://geocode-maps.yandex.ru/1.x/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&geocode=[55.85810611088341, 38.440435433879074]
// https://geocode-maps.yandex.ru/1.x/?apikey=ee11c971-3558-49d6-8fae-209f13ccaf25&geocode=55.8581,38.4404
