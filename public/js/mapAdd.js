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
    console.log('▶ ⇛ IN-BUTTON-activeRoute', activeRoute);
    console.log('▶ ⇛ IN-BUTTON-FROM', activeRoute.from);
    console.log('▶ ⇛ IN-BUTTON-TO', activeRoute.to);
    console.log('▶ ⇛ IN-BUTTON-TYPE', activeRoute.type);
    const routeObj = {
      from: activeRoute.from,
      to: activeRoute.to,
      type: activeRoute.type,
      distanse: '',
      city: '',
    };
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
    multiRoute.model.events.add('requestsuccess', async () => {
      // Получение ссылки на активный маршрут.
      activeRoute = multiRoute.getActiveRoute();
      // Вывод информации о маршруте.
      console.log(`ACTION-PATH-Длина: ${activeRoute.properties.get('distance').text}`);
      // console.log(`ACTION-PATH-GET: ${activeRoute.properties.get()}`);
      // console.log(`ACTION-PATH-Время прохождения: ${activeRoute.properties.get('duration').text}`);
      // console.log('ACTION-PATH-▶ ⇛ FROM', activeRoute.from);
      // console.log('ACTION-PATH- TO', activeRoute.to);
      // console.log('ACTION', activeRoute);
      routeObj.distanse = activeRoute.properties.get('distance').text;
      // Получаем город
      const link = `https://api.geotree.ru/address.php?key=7mAEh31NHvpF&lat=${routeObj.from[0]}&lon=${routeObj.from[1]}&types=place`;
      const reqCity = await fetch(link);
      const resCity = await reqCity.json();
      routeObj.city = resCity[0].value;
      console.log('▶ ⇛ routeObj.city', routeObj.city);

      const reqMapAdd = await fetch('/addroad', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeObj),

      });
      const result = await reqMapAdd.text();

      // -------------------- Формируем обьект для отправки на сервер с картой
      // Для автомобильных маршрутов можно вывести
      // информацию о перекрытых участках.
      if (activeRoute.properties.get('blocked')) {
        console.log('На маршруте имеются участки с перекрытыми дорогами.');
      }
    });
  });
});
