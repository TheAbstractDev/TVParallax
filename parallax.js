var w = $(window).width();
var h = $(window).height();

$('body').css({
  '-webkit-transform-style': 'preserve-3d',
  '-moz-transform-style': 'preserve-3d',
  'transform-style': 'preserve-3d',
  '-webkit-transform': 'perspective(800px)',
  '-moz-transform': 'perspective(800px)',
  'transform': 'perspective(800px)'
});

function parallax (element, velocity, shine) {
  velocity = typeof velocity !== 'undefined' ? velocity : 10;
  shine = typeof shine !== 'undefined' ? shine : true;

  if (shine) {
    element.prepend('<div class="shine"></div>');
    $('.shine').css({
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'z-index': 100
    });
  }

  element.on('mousemove', function(e) {
    var offsetX = 0.5 - e.pageX / w;
    var offsetY = 0.5 - e.pageY / h;
    var dy = e.pageY - h / 2;
    var dx = e.pageX - w / 2;
    var rad = Math.atan2(dy, dx);
    var angle = rad * 180 / Math.PI - 90;

    if ($('.shine')) {$('.shine').css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255, 0.5) 0%,rgba(255,255,255, 0.1) 80%)');}

    transform = 'translateY(' + -offsetX * velocity + 'px) rotateX(' + (-offsetY * velocity) + 'deg) rotateY(' + (offsetX * (velocity * 2)) + 'deg)'; //poster transform
    if (angle < 0) {
      angle = angle + 360;
    }
    element.css('transform', transform);
  })

  element.on('mouseleave', function (e) {
    $(this).css('transform', 'translateY(0) rotateX(0) rotateY(0)');
    $('.shine').css('background', 'none');
  });
}