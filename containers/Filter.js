define(['List', 'EventsData', 'jquery'], function(List, EventsData, $) {
  return {
    filterArr: [],
    pricesArr: [
      { all: 'Отсортировать по цене' },
      { 1000: 'до 1000 &#8381;' },
      { 2000: 'до 2000 &#8381;' },
      { 3000: 'до 3000 &#8381;' },
      { 4000: 'от 3000 &#8381;' }
    ],
    typesArr: [
      { all: 'Фильтровать по типу' },
      { concert: 'Концерт' },
      { exhibition: 'Выставка' }
    ],
    getData: function() {
      return JSON.parse(localStorage.getItem('events')) || EventsData.events;
    },
    cleanFilter: function() {
      this.filterArr = [];
      localStorage.setItem('filter', JSON.stringify([]));
    },
    filterByType: function(type) {
      var events = this.getData();
      if (type === 'all') return events;
      return events.filter(function(ev) {
        return ev.type === type;
      });
    },
    filterByPrice: function(price) {
      var events = this.getData();
      if (price === 'all') return events;
      return events.filter(function(ev) {
        return price <= 3000 ? ev.price <= price : ev.price >= price;
      });
    },
    showFavourite: function() {
      $('.filter-selector option[value="all"]').prop('selected', true);
      var events = this.getData();
      return events.filter(function(ev) {
        return ev.fav;
      });
    },
    renderOption: function(acc, el) {
      var key = Object.keys(el)[0];
      acc += `<option value="${key}">${el[key]}</option>`;
      return acc;
    },
    createSelector: function(type) {
      var options = '';
      switch (type) {
        case 'types':
          options = this.typesArr.reduce(this.renderOption, '');
          return `<select id='${type}-sel' class='filter-selector'>${options}</select>`;
        case 'prices':
          options = this.pricesArr.reduce(this.renderOption, '');
          return `<select id='${type}-sel' class='filter-selector'>${options}</select>`;
      }
    },
    render: function() {
      var self = this;

      var wrapper = '<div id="eventsFilter" class="events-filter"></div>';
      var filterTtl = '<div class="filter-title">Выбрать события:</div>';
      $('#root').append(wrapper);
      $('#eventsFilter').append(filterTtl);

      var typesSelector = this.createSelector('types');
      var pricesSelector = this.createSelector('prices');

      $('#eventsFilter').append(typesSelector);
      $('#eventsFilter').append(pricesSelector);

      $('#types-sel').change(function() {
        var types = self.filterByType(this.value);
        List.renderListItems(types);
      });

      $('#prices-sel').change(function() {
        var prices = self.filterByPrice(this.value);
        List.renderListItems(prices);
      });

      var favFilterBtn =
        '<button id="favFilterBtn" class="fav-filter-btn">Избранное</button>';
      $('#eventsFilter').append(favFilterBtn);

      $('#favFilterBtn').click(function() {
        var favList = self.showFavourite();
        List.renderListItems(favList);
      });

      var wholeListBtn =
        '<button id="wholeListBtn" class="whole-list-btn">Показать весь список</button>';
      $('#eventsFilter').append(wholeListBtn);

      $('#wholeListBtn').click(function() {
        var wholeList = self.getData();
        $('.filter-selector option[value="all"]').prop('selected', true);
        List.renderListItems(wholeList);
      });
    },
    init: function() {
      this.render();
      localStorage.setItem('filter', JSON.stringify([]));
    }
  };
});
