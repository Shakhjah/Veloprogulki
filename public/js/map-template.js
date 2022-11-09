// Создаём макет содержимого.
// const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//   '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>',
// );

const myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
  hintContent: 'Собственный значок метки с контентом',
  balloonContent: 'А эта — новогодняя',
  iconContent: '12',
}, {
  // Опции.
  // Необходимо указать данный тип макета.
  iconLayout: 'default#imageWithContent',
  // Своё изображение иконки метки.
  iconImageHref: 'images/ball.png',
  // Размеры метки.
  iconImageSize: [48, 48],
  // Смещение левого верхнего угла иконки относительно
  // её "ножки" (точки привязки).
  iconImageOffset: [-24, -24],
  // Смещение слоя с содержимым относительно слоя с картинкой.
  iconContentOffset: [15, 15],
  // Макет содержимого.
  iconContentLayout: MyIconContentLayout,
});

// Зададим состояние панели для построения машрутов.
control.routePanel.state.set({
  // Тип маршрутизации.
  type: 'masstransit',
  // Выключим возможность задавать пункт отправления в поле ввода.
  fromEnabled: false,
  // Адрес или координаты пункта отправления.
  from: 'Москва, Льва Толстого 16',
  // Включим возможность задавать пункт назначения в поле ввода.
  toEnabled: true,
  // Адрес или координаты пункта назначения.
  // to: 'Петербург'
});

// Зададим опции панели для построения машрутов.
control.routePanel.options.set({
  // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
  allowSwitch: false,
  // Включим определение адреса по координатам клика.
  // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
  reverseGeocoding: true,
  // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
  types: { masstransit: true, pedestrian: true, taxi: true },
});

const multiRoute = new ymaps.multiRouter.MultiRoute({
  referencePoints: [
    'метро Смоленская',
    'метро Арбатская',
  ],
  params: {
    // Тип маршрута: на общественном транспорте.
    routingMode: 'bicycle',
  },
}, {
  // Автоматически устанавливать границы карты так,
  // чтобы маршрут был виден целиком.
  boundsAutoApply: true,
});

// multiRoute.editor.start();

// myMap.geoObjects.add(multiRoute);// Добавили маршрут на карту
// // my
// myMap.geoObjects
//   .add(myPlacemark);
