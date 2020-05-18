window.addEventListener('load', function() {
  var banner = document.querySelector('.banner');
  // ul
  var ul = banner.querySelector('ul');
  // li的宽度
  var liW = ul.children[0].clientWidth;
  // 小圆点
  var ol = banner.querySelector('ol');
  // 中间变量 
  index = 0;
  var item = null;

 
  // 自动播放
  item = setInterval(function(){
    index++;
    var ulS = -index * liW;
    ul.style.transition = 'all .3s'
    ul.style.transform = 'translateX('+ ulS +'px)';
  }, 2000)


  // 过渡后触发
  ul.addEventListener('transitionend', function() {

    if (index >= 4) {
      index = 0;
      var ulS = -index * liW;
      ul.style.transition = 'none';
      ul.style.transform = 'translateX('+ ulS +'px)';
    } else if (index < 0) {
      index = 3;
      var ulS = -index * liW;
      ul.style.transition = 'none';
      ul.style.transform = 'translateX('+ ulS +'px)';
    }

    // 修改 ol 的样式
    ol.querySelector('.default').classList.remove('default');
    ol.children[index].classList.add('default');
  })

  // 鼠标点击初始值
  var initial = 0;
  // 鼠标移动
  var moveX = 0;

  // 手指触摸时
  ul.addEventListener('touchstart', function(e) {
    initial = e.targetTouches[0].pageX;
    clearInterval(item);
    console.log(index);
  })
  // 手指移动时
  ul.addEventListener('touchmove', function(e) {
    // 鼠标移动的距离
    moveX = e.targetTouches[0].pageX - initial;
    var ulS =  -index * liW + moveX;
    ul.style.transition = 'all .3s';
    ul.style.transform = 'translateX('+ ulS +'px)';
  })
  // 手指松开时
  ul.addEventListener('touchend', function() {
    // 判断，当ul移动 li 的一半时，就进行翻页
    if (Math.abs(moveX) >= liW / 2) {
      if (moveX > 0) {  // 右
        index--;
      } else {  // 左
        index++
      }
      var ulS = -index * liW;
      ul.style.transition = 'all .3s';
      ul.style.transform = 'translateX('+ ulS +'px)';
    } else {
      var ulS = -index * liW;
      ul.style.transition = 'all .3s';
      ul.style.transform = 'translateX('+ ulS +'px)';
    }
    clearInterval(item);
    item = setInterval(function(){
      index++;
      var ulS = -index * liW;
      ul.style.transition = 'all .3s'
      ul.style.transform = 'translateX('+ ulS +'px)';
      console.log(index);
    }, 2000)
  })


  // 回到顶部
  var nav = document.querySelector('nav');
  var goBock = document.querySelector('.go_bock');

  // 侦听 window 的滚动
  window.addEventListener('scroll', function() {
    // 如果 window 卷去的大小 >= nav的 offsetTop 就显示 回到顶部
    if (this.window.pageYOffset >= nav.offsetTop) {
      goBock.style.display = 'block';
    } else {
      goBock.style.display = 'none';
    }
  })
  // 点击回到顶部
  goBock.addEventListener('click', function() {
    goTop(window, 0);
  })

}) 