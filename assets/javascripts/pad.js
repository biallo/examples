(function() {
  $('#box').on('mousemove', handleMove);
  $('.box-holder').on('mouseleave', hideBtn);

  function handleMove(e) {

    var target = e.target;
    
    if (!$(target).hasClass('component-block')) {
      var parents = $(target).parents();
      for (var i = 0; i < parents.length; i++) {
        if ($(parents[i]).hasClass('component-block')) {
          target = parents[i];
          break;
        }
      }
    }

    var pageX = e.pageX,
        wiw = window.innerWidth,
        tow = target.offsetWidth;

    // 根据鼠标的水平位置，决定是否显示按钮
    if (pageX < (wiw / 2 - tow / 3)) {

      var pageY = e.pageY,
          tot = target.offsetTop,
          toh = target.offsetHeight,
          btnTop = 0,
          componentId;

      // 根据鼠标的垂直位置，决定按钮出现的位置
      if (toh > 240) {
        if (pageY < tot + 120) {
          btnTop = tot;
          componentId = $(target).attr('id');
        } else if (pageY > tot + toh - 120) {
          btnTop = tot + toh;
          componentId = $(target).next().attr('id');
        }
      } else {
        if (pageY < (tot + (toh / 2))) {
          btnTop = tot;
          componentId = $(target).attr('id');
        } else {
          btnTop = tot + toh;
          componentId = $(target).next().attr('id');
        }
      }

      showBtn(btnTop - 15, componentId);
    } else {
      hideBtn();
    }    
  }

  function showBtn(btnTop, componentId) {
    $('.btn-left')
      .css('top', btnTop)
      .data('componentId', componentId)
      .addClass('btn-show');
  }

  function hideBtn() {
    $('.btn-left')
      .data('componentId', '')
      .removeClass('btn-show');
  }

  $('.btn-left').on('click', function() {
    console.log($(this).data('componentId'));
  });
})();
