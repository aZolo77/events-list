define(['components/ListItem.js', 'db/listData.js', 'jquery'], function(
  ListItem,
  EventsData,
  $
) {
  var getData = function() {
    return JSON.parse(localStorage.events);
  };

  var findEvent = function(id) {
    var event = JSON.parse(localStorage.events)[id];
    console.log(event);
  };

  return {
    wrapper: $('<div/>', {
      class: 'list'
    }),
    data: localStorage.events ? getData() : EventsData.events,
    checkState: function() {
      if (!localStorage.events) {
        var data = this.data;
        data.push({ timestamp: new Date().getTime() });
        localStorage.setItem('events', JSON.stringify(data));
      }
    },
    changeFavState: function() {
      // * изменение статуса "Избранное"
      var className = this.classList[1];
      var id = className.substr(-1, 1);
      var event = findEvent(id);
      // $(`.${className}`)
      //   .css({
      //     backgroundColor: '#ffffff',
      //     color: '#555555',
      //     'box-shadow': '0 0 2px #cccccc'
      //   })
      //   .text('Удалить из избранного');
    },
    renderListItems: function() {
      var self = this;
      this.data.forEach(function(item, id) {
        if (item.timestamp) return;
        var elem = new ListItem(item);
        // console.log(elem);
        self.wrapper.append(elem.create());

        $(`.list__item-fav${id}`).click(self.changeFavState);
      });
    },
    init: function() {
      $('#root').append(this.wrapper);
      this.checkState();
      this.renderListItems();
    }
  };
});
