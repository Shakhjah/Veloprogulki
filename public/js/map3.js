async function init() {
  const { geolocation } = ymaps;

  const position = await geolocation.get({
    provider: 'yandex',
    mapStateAutoApply: true,
  });

  console.log('▶ ⇛ position', position);

  const myMap = new ymaps.Map('map3', {
    center: position.geoObjects?.position || [55, 34],
    zoom: 12,
    controls: ['routePanelControl'], // Элементы управления
    behaviors: ['drag', 'multiTouch', 'scrollZoom'],
  }, {
    buttonMaxWidth: 300,
  });
  // Получение ссылки на панель.
  const control = myMap.controls.get('routePanelControl');
  control.routePanel.state.set({
    type: 'bicycle',
  });
  // geolocation.get({
  //   provider: 'yandex',
  //   mapStateAutoApply: true,
  // }).then((result) => {
  //   myMap.geoObjects.add(result.geoObjects);
  // });

  // // Сравним положение, вычисленное по ip пользователя и
  // // положение, вычисленное средствами браузера.
  // geolocation.get({
  //   provider: 'yandex',
  //   mapStateAutoApply: true,
  // }).then((result) => {
  //   // Красным цветом пометим положение, вычисленное через ip.
  //   result.geoObjects.options.set('preset', 'islands#redCircleIcon');
  //   result.geoObjects.get(0).properties.set({
  //     balloonContentBody: 'Мое местоположение',
  //   });
  //   myMap.geoObjects.add(result.geoObjects);
  // });

  //     myMap.geoObjects.add({result.geoObjects})
  //     // Добавление местоположения на карту.
  //     console.log('▶ ⇛ result.geoObjects', result.geoObjects);
  //   },
  //   (err) => {
  //     console.log(`Ошибка: ${err}`);
  //   },
  // );
  // result.geoObjects

  // Создание мультимаршрута.
  const multiRoute = new ymaps.multiRouter.MultiRoute({
    referencePoints: ['Москва', 'Тверь'],
  }, {
    // Тип промежуточных точек, которые могут быть добавлены при редактировании.
    editorMidPointsType: 'via',
    // В режиме добавления новых путевых точек запрещаем ставить точки поверх объектов карты.
    editorDrawOver: false,
  });

  const buttonEditor = new ymaps.control.Button({
    data: { content: 'Режим редактирования' },
  });

  buttonEditor.events.add('select', () => {
    /**
       * Включение режима редактирования.
       * В качестве опций может быть передан объект с полями:
       * addWayPoints - разрешает добавление новых путевых точек при клике на карту. Значение по умолчанию: false.
       * dragWayPoints - разрешает перетаскивание уже существующих путевых точек. Значение по умолчанию: true.
       * removeWayPoints - разрешает удаление путевых точек при двойном клике по ним. Значение по умолчанию: false.
       * dragViaPoints - разрешает перетаскивание уже существующих транзитных точек. Значение по умолчанию: true.
       * removeViaPoints - разрешает удаление транзитных точек при двойном клике по ним. Значение по умолчанию: true.
       * addMidPoints - разрешает добавление промежуточных транзитных или путевых точек посредством перетаскивания маркера, появляющегося при наведении курсора мыши на активный маршрут. Тип добавляемых точек задается опцией midPointsType. Значение по умолчанию: true
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml#editor
       */
    multiRoute.editor.start({
      addWayPoints: true,
      removeWayPoints: true,
    });
  });

  buttonEditor.events.add('deselect', () => {
    // Выключение режима редактирования.
    multiRoute.editor.stop();
  });

  // Создаем карту с добавленной на нее кнопкой.
  // const myMap = new ymaps.Map('map', {
  //   center: [56.399625, 36.71120],
  //   zoom: 7,
  //   controls: [buttonEditor],
  // }, {
  //   buttonMaxWidth: 300,
  // });

  // // Добавляем мультимаршрут на карту.
  // myMap.geoObjects.add(multiRoute);
}

ymaps.ready(init);
//----------------------
// ymaps.ready(function () {
//   var map;
//   ymaps.geolocation.get().then(function (res) {
//       var mapContainer = $('#map'),
//           bounds = res.geoObjects.get(0).properties.get('boundedBy'),
//           // Рассчитываем видимую область для текущей положения пользователя.
//           mapState = ymaps.util.bounds.getCenterAndZoom(
//               bounds,
//               [mapContainer.width(), mapContainer.height()]
//           );
//       createMap(mapState);
//   }, function (e) {
//       // Если местоположение невозможно получить, то просто создаем карту.
//       createMap({
//           center: [55.751574, 37.573856],
//           zoom: 2
//       });
//   });

//   function createMap (state) {
//       map = new ymaps.Map('map', state);
//   }
// });
