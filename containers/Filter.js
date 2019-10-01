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
          return `<select id='${type}-sel'>${options}</select>`;
        case 'prices':
          options = this.pricesArr.reduce(this.renderOption, '');
          return `<select id='${type}-sel'>${options}</select>`;
      }
    },
    render: function() {
      var self = this;
      var typesSelector = this.createSelector('types');
      var pricesSelector = this.createSelector('prices');

      $('#root').append(typesSelector);
      $('#root').append(pricesSelector);

      $('#types-sel').change(function() {
        var types = self.filterByType(this.value);
        List.renderListItems(types);
      });

      $('#prices-sel').change(function() {
        var prices = self.filterByPrice(this.value);
        List.renderListItems(prices);
      });
    },
    init: function() {
      this.render();
      localStorage.setItem('filter', JSON.stringify([]));
    }
  };
});
