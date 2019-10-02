define(['jquery'], function($) {
  return {
    getEventData: function() {},
    create: function(ev) {
      var elem = document.createElement('div');
      elem.id = `event-${ev.id}`;
      elem.classList.add('event__item');

      var ttl = `<span class="event__item-ttl">${ev.title}</span>`;
      var elemPrice = `<span class="event__item-price">${ev.price} &#8381;</span>`;
      var desc = `<div class="event__item-desc">${ev.details}</div>`;
      $(elem).html(ttl + elemPrice + desc);

      return elem;
    }
  };
});
