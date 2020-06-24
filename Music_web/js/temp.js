// 歌曲播放器---------------------------------------------------------------------

let audio = document.getElementById('main-audio'); // 获取AudioDom节点
let musicLength = document.getElementById('audio-length-total');

audio.load(); //因为source标签不能直接更改路径，所以整个audio标签必须重新加载一次
let playPromise = audio.play();
if (playPromise !== undefined) {
	playPromise.then(() => {
		audio.play();
	}).catch(() => {});
};

audio.oncanplay = function() {
	console.log("音乐时长", audio.duration);
	musicLength.innerHTML = formatTime(transTime(audio.duration));
	// 获取歌曲总时长并转换为时分秒格式
};


let rootUrl = 'img/';
let picture = document.getElementById('album-pic');
let musicName = document.getElementById('musicName');
let volumeCtrl = document.getElementById('volume');
let isPlaying = true;
let songs = ['music01.mp3', 'music02.mp3', 'music03.mp3'];
let songNames = ['The Fall of The Artist - Hanson', '末世情人 - Hanson', '忧伤的听见 - Hanson'];
let pictures = ['albumpic01.png', 'albumpic02.png', 'albumpic03.jpg']
let looppics = ['loop.png', 'loopone.png', 'random.png']
let i = 0;
let v = 1;
let ctrl = document.getElementById('podcast-play')
audio.src = rootUrl + songs[i];
picture.src = rootUrl + pictures[i];
musicName.innerHTML = songNames[i];

audio.addEventListener('ended', function() {
	if (i < songs.length - 1 && m == 1) {
		i++;
		audio.src = rootUrl + songs[i];
		audio.play();
	} else if (i >= songs.length - 1 && m == 1) {
		i = 0;
		audio.src = rootUrl + songs[i];
		audio.play()
	} else if (i < songs.length - 1 && m == 2) {
		audio.src = rootUrl + songs[i];
		audio.play();
	} else if (i >= songs.length - 1 && m == 2) {
		i = i - 1;
		audio.src = rootUrl + songs[i];
		audio.play();
	} else if (m == 3) {
		shufflePlay()
		audio.src = rootUrl + songs[i]
		audio.play()
	};
}, false);

picture.addEventListener('change', function() {
	i++
	picture.src = rootUrl + pictures[i] //换专辑图地址
}, false);

musicName.addEventListener('change', function() {
	i++
	musicName.innerHTML = songNames[i]; //换歌曲名称
}, false);


// 随机播放
function shuffle() {
	i = Math.floor(Math.random() * songs.length);
	return i;
};

function shufflePlay() {
	let j = i;
	for (i = shuffle(); i < songs.length; i = shuffle()) {
		if (i == j) {

		} else {
			break;
			return i;
		};
	};
};

// 下一首
function nextMusic() {
	if (i < songs.length - 1 && m == 1) {
		i++;
		audio.src = rootUrl + songs[i];
		picture.src = rootUrl + pictures[i];
		musicName.innerHTML = songNames[i];
		audio.play();
	} else if (i >= songs.length - 1 && m == 1) {
		i = 0;
		audio.src = rootUrl + songs[i];
		picture.src = rootUrl + pictures[i];
		musicName.innerHTML = songNames[i];
		audio.play();
	} else if (i < songs.length - 1 && m == 2) {
		audio.src = rootUrl + songs[i];
		picture.src = rootUrl + pictures[i];
		musicName.innerHTML = songNames[i];
		audio.play();
	} else if (i >= songs.length - 1 && m == 2) {
		i = i - 1;
		audio.src = rootUrl + songs[i];
		picture.src = rootUrl + pictures[i];
		musicName.innerHTML = songNames[i];
		audio.play();
	} else if (m == 3) {
		shufflePlay();
		audio.src = rootUrl + songs[i];
		picture.src = rootUrl + pictures[i];
		musicName.innerHTML = songNames[i];
		audio.play();
	};
	// 播放淡入效果
	var t = setInterval(function() {
		if (v >= volumeCtrl.value / 100) {
			v = volumeCtrl.value / 100;
			audio.volume = v;
		} else {
			v += 0.1;
			console.log('淡入' + v);
			if (v <= volumeCtrl.value / 100) {
				audio.volume = v;
			} else {
				clearInterval(t);
			}
		}
	}, 100);

	console.log('正在播放第' + (i + 1) + '首');
	ctrl.innerHTML = '<i class="las la-pause-circle"></i>';
};

// 上一首
function lastMusic() {
	i > 0 ? --i : i = songs.length - 1;
	audio.src = rootUrl + songs[i];
	picture.src = rootUrl + pictures[i];
	musicName.innerHTML = songNames[i];
	var v = 0;
	var t = setInterval(function() {
		v += 0.1;
		console.log('淡入' + v);
		if (v <= volumeCtrl.value / 100) {
			audio.volume = v;
		} else {
			clearInterval(t);
		}
	}, 100);
	audio.play();
	console.log('正在播放第' + (i + 1) + '首');
	ctrl.innerHTML = '<i class="las la-pause-circle"></i>';
};


function playMusic() {
	var v = volumeCtrl.value / 100;
	if (!audio.paused) {
		// 暂停淡出效果
		var t = setInterval(function() {
			v -= 0.1;
			console.log('淡出' + v);
			if (v > 0) {
				audio.volume = v;
			} else {
				clearInterval(t);
				audio.pause();
			}
		}, 100);
		ctrl.innerHTML = '<i class="las la-play-circle"></i>';
	} else {
		// 播放淡入效果
		var v = 0;
		var t = setInterval(function() {
			v += 0.1;
			console.log('淡入' + v);
			if (v <= volumeCtrl.value / 100) {
				audio.volume = v;
			} else {
				clearInterval(t);
			}
		}, 100);
		audio.play();
		ctrl.innerHTML = '<i class="las la-pause-circle"></i>';
		console.log('正在播放第' + (i + 1) + '首');
	};
};
// 静音按钮------------------------------------------

function mute() {
	console.log(audio.muted);
	if (audio.muted) {
		audio.muted = false;
		audio.volume = volumeCtrl.value / 100;
		volumemute.src = rootUrl + volumepics[vm];
		document.getElementById('volume').removeAttribute('disabled');
	} else {
		audio.muted = true;
		volumemute.src = rootUrl + volumepics[0];
		document.getElementById('volume').setAttribute('disabled', 'disabled')
	};
};


let volumemute = document.getElementById('volumemute');
var volumepics = ['volumemute.png', 'volume30.png', 'volume50.png', 'volume80.png']
var vm = 3;
volumemute.src = rootUrl + volumepics[vm];
console.log(volumemute.src);
volumemute.addEventListener('change', function() {
	vm++
	volumemute.src = rootUrl + volumepics[vm];
}, false);

function volumeway() {
	if (audio.volume <= 0) {
		vm = 0;
		volumemute.src = rootUrl + volumepics[vm];
	} else if (audio.volume <= 0.3) {
		vm = 1;
		volumemute.src = rootUrl + volumepics[vm];
	} else if (audio.volume <= 0.6) {
		vm = 2;
		volumemute.src = rootUrl + volumepics[vm];
	} else {
		vm = 3;
		volumemute.src = rootUrl + volumepics[vm];
	};
	console.log(vm);
};

// 音量控制条------------------------------------------

volumeCtrl.oninput = function() {
	audio.volume = this.value / this.max;
}
volumeCtrl.oninput()

$.fn.RangeSlider = function(cfg) {
	this.sliderCfg = {
		min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
		max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
		step: cfg && Number(cfg.step) ? cfg.step : 1,
		callback: cfg && cfg.callback ? cfg.callback : null
	};

	var $input = $(this);
	var min = this.sliderCfg.min;
	var max = this.sliderCfg.max;
	var step = this.sliderCfg.step;
	var callback = this.sliderCfg.callback;

	$input.attr('min', min)
		.attr('max', max)
		.attr('step', step);

	$input.bind("input", function(e) {
		$input.attr('value', this.value);
		$input.css('background-size', this.value + '% 100%');

		if ($.isFunction(callback)) {
			callback(this);
		}
	});
};

$('input').RangeSlider({
	min: 0,
	max: 100,
	step: 1,
	value: 100,
});

// 音频进度条------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
	// 设置音频文件名显示宽度
	var element = document.querySelector('.audio-right');
	var maxWidth = window.getComputedStyle(element, null).width;
	document.querySelector('.audio-right p').style.maxWidth = maxWidth;

	// 初始化音频控制事件
	initAudioEvent();
}, false);

function initAudioEvent() {
	var audio = document.getElementById('main-audio');

	// 监听音频播放时间并更新进度条
	audio.addEventListener('timeupdate', function() {
		updateProgress(audio);
	}, false);

	// 监听播放完成事件
	audio.addEventListener('ended', function() {
		audioEnded();
	}, false);

	// 点击进度条跳到指定点播放
	// PS：此处不要用click，否则下面的拖动进度点事件有可能在此处触发，此时e.offsetX的值非常小，会导致进度条弹回开始处（简直不能忍！！）
	var progressBarBg = document.getElementById('progressBarBg');
	progressBarBg.addEventListener('mousedown', function(event) {
		// 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
		if (!audio.paused || audio.currentTime != 0) {
			var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''));
			var rate = event.offsetX / pgsWidth;
			audio.currentTime = audio.duration * rate;
			updateProgress(audio);
		}
	}, false);

	// 拖动进度点调节进度
	dragProgressDotEvent(audio);
}

/**
 * 鼠标拖动进度点时可以调节进度
 * @param {*} audio
 */
function dragProgressDotEvent(audio) {
	var dot = document.getElementById('progressDot');

	var position = {
		oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
		oriX: 0, // 移动开始时的x坐标
		maxLeft: 0, // 向左最大可拖动距离
		maxRight: 0 // 向右最大可拖动距离
	};
	var flag = false; // 标记是否拖动开始

	// 鼠标按下时
	dot.addEventListener('mousedown', down, false);
	dot.addEventListener('touchstart', down, false);

	// 开始拖动
	document.addEventListener('mousemove', move, false);
	document.addEventListener('touchmove', move, false);

	// 拖动结束
	document.addEventListener('mouseup', end, false);
	document.addEventListener('touchend', end, false);

	function down(event) {
		if (!audio.paused || audio.currentTime != 0) { // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
			flag = true;

			position.oriOffestLeft = dot.offsetLeft;
			position.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
			position.maxLeft = position.oriOffestLeft; // 向左最大可拖动距离
			position.maxRight = document.getElementById('progressBarBg').offsetWidth - position.oriOffestLeft; // 向右最大可拖动距离

			// 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
			if (event && event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}

			// 禁止事件冒泡
			if (event && event.stopPropagation) {
				event.stopPropagation();
			} else {
				window.event.cancelBubble = true;
			}
		}
	}

	function move(event) {
		if (flag) {
			var clientX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件
			var length = clientX - position.oriX;
			if (length > position.maxRight) {
				length = position.maxRight;
			} else if (length < -position.maxLeft) {
				length = -position.maxLeft;
			}
			var progressBarBg = document.getElementById('progressBarBg');
			var pgsWidth = parseFloat(window.getComputedStyle(progressBarBg, null).width.replace('px', ''));
			var rate = (position.oriOffestLeft + length) / pgsWidth;
			audio.currentTime = audio.duration * rate;
			updateProgress(audio);
		}
	}

	function end() {
		flag = false;
	}
}

/**
 * 更新进度条与当前播放时间
 * @param {object} audio - audio对象
 */
function updateProgress(audio) {
	var value = audio.currentTime / audio.duration;
	document.getElementById('progressBar').style.width = value * 100 + '%';
	document.getElementById('progressDot').style.left = value * 100 + '%';
	document.getElementById('audioCurTime').innerText = transTime(audio.currentTime);
}

/**
 * 播放完成时把进度调回开始的位置
 */
function audioEnded() {
	document.getElementById('progressBar').style.width = 0;
	document.getElementById('progressDot').style.left = 0;
	document.getElementById('audioCurTime').innerText = transTime(0);
	let pic = pictures[i];
	let songName = songNames[i];
	if (i >= pictures.length) {
		i = 0;
	} else {
		picture.src = rootUrl + pic;
		musicName.innerHTML = songName;
	};
};

/**
 * 音频播放时间换算
 * @param {number} value - 音频当前播放时间，单位秒
 */
function transTime(value) {
	var time = "";
	var h = parseInt(value / 3600);
	value %= 3600;
	var m = parseInt(value / 60);
	var s = parseInt(value % 60);
	if (h > 0) {
		time = formatTime(h + ":" + m + ":" + s);
	} else {
		time = formatTime(m + ":" + s);
	}

	return time;
}

/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param {string} value - 形如 h:m:s 的字符串 
 */
function formatTime(value) {
	var time = "";
	var s = value.split(':');
	var i = 0;
	for (; i < s.length - 1; i++) {
		time += s[i].length == 1 ? ("0" + s[i]) : s[i];
		time += ":";
	}
	time += s[i].length == 1 ? ("0" + s[i]) : s[i];

	return time;
}

// 歌曲模式
var m = 1;
var looppic = document.getElementById('looppic');


function changMode(text) {
	++m;
	if (m > 3) {
		m = 1;
	};

	switch (m) {
		case 1:
			looppic.src = rootUrl + looppics[0];
			return m;
			break;
		case 2:
			looppic.src = rootUrl + looppics[1];
			return m;
			break;
		case 3:
			looppic.src = rootUrl + looppics[2];
			return m;
			break;
	};
	return m;
};


function modetest() {
	console.log(m);
};

// 歌词滚动------------------------------------------------------
$(function() {
	function parseLyric(text) {
		//按行分割歌词
		let lyricArr = text.split('\n');
		//console.log(lyricArr)//0: "[ti:七里香]" "[ar:周杰伦]"...
		let result = []; //新建一个数组存放最后结果
		//遍历分割后的歌词数组，将格式化后的时间节点，歌词填充到result数组
		for (l = 0; l < lyricArr.length; l++) {
			let playTimeArr = lyricArr[l].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g); //正则匹配播放时间
			let lineLyric = "";
			if (lyricArr[l].split(playTimeArr).length > 0) {
				lineLyric = lyricArr[l].split(playTimeArr);
			}

			if (playTimeArr != null) {
				for (let j = 0; j < playTimeArr.length; j++) {
					let time = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":");
					//数组填充
					result.push({
						time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
						content: String(lineLyric).substr(1)
					});
				}
			}


		}
		return result;
	}

	// 这里请按照格式放入相应歌词--开始
	// 格式可能看着很复杂,其实是根据lrc歌词文件换句前加入\n 换行符,然后删除多余空行.即可!
	let text =
		"[ar:梦涵][ti:17岁]\n[00:00.00]\n[00:00.52]17岁 - 梦涵\n[00:01.13]作词：刘德华、徐继宗\n[00:02.30]作曲：徐继宗\n[00:03.30]钻芒博客：www.zmki.cn\n[00:17.71]十七岁那日不要脸\n[00:21.05]参加了挑战\n[00:23.73]明星也有训练班\n[00:26.52]短短一年太新鲜\n[00:29.31]记得四哥发哥都已见过面\n[00:35.81]后来\n[00:36.92]荣升主角太突然\n[00:41.89]廿九岁颁奖的晚宴\n[00:45.12]Fans太疯癫\n[00:47.75]来听我唱段情歌\n[00:50.43]一曲歌词太经典\n[00:53.37]我的震音假音\n[00:57.07]早已太熟练然而情歌\n[01:01.58]总唱不厌\n[01:05.38]喜欢我别遮脸\n[01:08.72]任由途人发现\n[01:11.25]尽管唱\n[01:12.72]用心把这情绪歌中染\n[01:19.56]唱情歌\n[01:22.54]齐齐来一遍无时无刻\n[01:27.05]都记住掌声响遍天\n[01:31.15]来唱情歌由从头再一遍\n[01:37.13]如情浓有点泪流\n[01:39.77]难避免音阶起跌拍子改变\n[01:46.60]每首歌\n[01:47.85]是每张脸\n[02:00.94]喜欢我\n[02:02.32]别遮脸\n[02:04.29]任由途人发现尽管唱\n[02:08.29]用心把这情绪歌声中渲染\n[02:13.61]唱情歌齐齐来一遍\n[02:19.74]无时无刻\n[02:21.05]都记住掌声响遍天\n[02:25.15]来唱情歌由从头再一遍\n[02:31.18]如情浓有点泪流\n[02:33.81]难避免音阶起跌拍子改变\n[02:40.70]年月变但我未变\n[02:44.12]唱情歌齐齐来一遍\n[02:49.64]无时无刻\n[02:51.11]都记住掌声响遍天\n[02:55.11]来唱情歌由从头再一遍\n[03:01.24]如情浓有点泪流\n[03:03.77]难避免音阶起跌拍子改变\n[03:10.83]每首歌是每张脸\n[03:20.86]如今我四十看从前\n[03:24.15]沙哑了声线\n[03:26.83]回忆我冀望那掌声\n[03:29.77]都依然到今天那首潮水\n[03:34.63]忘情水\n[03:36.10]不再经典仍长埋你的心中\n[03:42.94]从未变";
	// 这里请按照格式放入相应歌词--结束
	let audio = document.getElementById('main-audio');

	let result = parseLyric(text); //执行lyc解析


	// 把生成的数据显示到界面上去
	let $ul = $("<ul></ul>");
	for (let l = 0; l < result.length; l++) {
		let $li = $("<li></li>").text(result[l].content);
		$ul.append($li);
	}
	$(".lyrics-bg").append($ul);

	let lineNo = 0; // 当前行歌词
	let preLine = 1; // 当播放6行后开始滚动歌词
	let lineHeight = -15; // 每次滚动的距离

	// 滚动播放 歌词高亮  增加类名active
	function highLight() {
		let $li = $("li");
		$li.eq(lineNo).addClass("active").siblings().removeClass("active");
		if (lineNo > preLine) {
			$ul.stop(true, true).animate({
				top: (lineNo - preLine) * lineHeight
			});
		}
	}

	highLight();

	// 播放的时候不断渲染
	audio.addEventListener("timeupdate", function() {
		if (lineNo == result.length) return;
		if ($("li").eq(0).hasClass("active")) {
			$("ul").css("top", "0");
		}
		lineNo = getLineNo(audio.currentTime);
		highLight();
		lineNo++;
	});

	// 当快进或者倒退的时候，找到最近的后面那个result[i].time
	function getLineNo(currentTime) {
		if (currentTime >= parseFloat(result[lineNo].time)) {
			// 快进
			for (let l = result.length - 1; l >= lineNo; l--) {
				if (currentTime >= parseFloat(result[l].time)) {
					return l;
				}
			}
		} else {
			// 后退
			for (let l = 0; l <= lineNo; l++) {
				if (currentTime <= parseFloat(result[l].time)) {
					return l - 1;
				}
			}
		}
	}

	function recall() {
		lineNo = 0;
		$("ul").css("top", "0");
		highLight();
	};

	//播放结束自动回到开头
	audio.addEventListener("ended", function() {
		recall();
	});
});
