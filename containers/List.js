define(['ListItem', 'EventsData', 'jquery'], function(ListItem, EventsData, $) {
  var getData = function() {
    return JSON.parse(localStorage.events);
  };

  var getEventFav = function(id) {
    var event = JSON.parse(localStorage.events)[id];
    return !event.fav;
  };

  var changeEventsArr = function(id) {
    var events = JSON.parse(localStorage.events);
    var updatedEvents = events.reduce(function(accum, el) {
      if (el.id === +id) el.fav = !el.fav;
      accum.push(el);
      return accum;
    }, []);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  var changeFavBtnStyle = function(btn, status) {
    if (status) {
      btn.classList.add('list__item-fav');
      btn.classList.remove('list__item-unfav');
      $(btn).text('В избранном');
    } else {
      btn.classList.add('list__item-unfav');
      btn.classList.remove('list__item-fav');
      $(btn).text('В избранное');
    }
  };

  return {
    wrapper: $('<div/>', {
      class: 'list'
    }),
    data: localStorage.events ? getData() : EventsData.events,
    checkState: function() {
      if (!localStorage.events) {
        var data = this.data;
        localStorage.setItem('events', JSON.stringify(data));
      }
    },
    changeFavState: function() {
      // * изменение статуса "Избранное" и стиля кнопки
      var id = this.id.substr(-1, 1);
      var fav = getEventFav(id);

      changeFavBtnStyle(this, fav);
      changeEventsArr(id);
    },
    cleanList: function() {
      $(this.wrapper).empty();
    },
    renderListItems: function(data) {
      var self = this;
      this.cleanList();

      data.forEach(function(item) {
        var elem = new ListItem(item);
        self.wrapper.append(elem.create());
      });

      $('.list__item-btn').click(self.changeFavState);
    },
    init: function() {
      $('#root').append(this.wrapper);
      this.checkState();
      this.renderListItems(this.data);
    }
  };
});
