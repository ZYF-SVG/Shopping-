// 缓步动画
function goTop(obj, target, callback) {
	clearInterval(obj.items);

	obj.items = setInterval(function() {
		var change = (target - window.pageYOffset) / 10;

		change = change > 0 ? Math.ceil(change) : Math.floor(change);

		if (window.pageYOffset == target) { 
			clearInterval(obj.items);
			if (callback) { 
				callback();
			}
		} else {
			// obj.style.left = obj.offsetLeft + change + 'px';
			window.scroll(0, window.pageYOffset + change)
		}

	}, 35);
}