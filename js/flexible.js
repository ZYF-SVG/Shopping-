(function flexible (window, document) {  // 创建一个 立即执行函数，里面的变量都是局部变量，不会影响到其他的 js 文件；
  // 获取到 HTML 根目录
  var docEl = document.documentElement
  // 获取 dpr 物理像素比，如果有就设置为获取到的，没有就设置为 1
  var dpr = window.devicePixelRatio || 1

  // adjust body font size； 设置 body 的字体大小
  function setBodyFontSize () {
    // 判断有没有 body，如果有就
    if (document.body) {
      // 根据物理像素比 设置 body字体大小， 如果 dpr 为1，那 body 的大小为 12 px；
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {  // 如果没有就，等页面的主要元素加载后 再执行函数；
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10 设置 html 的字体大小，
  function setRemUnit () {
    var rem = docEl.clientWidth / 10  // 获取HTML的宽度，然后 划分为 10 等份；
    docEl.style.fontSize = rem + 'px' // 1rem = html 字体大小；
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)  // 窗口大小发送改变时，就触发事件，从新计算 thml 字体大小
  window.addEventListener('pageshow', function (e) {  // 页面重新加载就触发事件 和 load 不一样， 不理会 缓存数据
    // persisted 判断页面是否是从缓存中拿取的，如果 true，就 计算 rem 大小；
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports  兼容浏览器 0.5 像素写法；
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
