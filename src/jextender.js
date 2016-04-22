/**
 * Copyright 2015 Vin Wong @ vinexs.com (BSD licenses)
 *
 * Version: 1.0.8
 * Last Update: 2016-03-11
 */
/* 
 *
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. All advertising materials mentioning features or use of this software
 *    must display the following acknowledgement:
 *    This product includes software developed by the <organization>.
 * 4. Neither the name of the <organization> nor the
 *    names of its contributors may be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY <COPYRIGHT HOLDER> ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


/** Extend window prototype */
window.get = function(url, data, name) {
	if (!isset(name)) {
		name = '_blank';
	}
	window.open(url + (url.indexOf('?') >= 0 ? '&' :'?' ) + $.param(data), name);
}
window.post = function(url, data, name) {
	if (!isset(data)) {
		data = {};
	}
	if (!isset(name)) {
		name = '_blank';
	}
	var $form = $('<form style="display:none;"/>').attr({
		target: name,
		method: 'post',
		action: url
	});
	for (var i in data) {
		$form.append('<input type="hidden" name="'+ i +'" value="'+ data[i] +'" />');
	}
	$form.appendTo('body').submit().remove();
};
window.isSet = window.isset = function(obj) {
	return (typeof( obj ) != 'undefined');
};

if (!window.console) {
	console = $.console;
}
if (!window.JSON) {
	JSON = {
		stringify: function(obj) {
			return $.object(obj).stringify;
		},
		parse: function(str) {
			return jQuery.parseJSON(str);
		}
	};
}

/** Extend number prototype */
Number.prototype.numberFormat = function(afterDecimal, splitPoint) {
	if (!isset(afterDecimal)) {
		afterDecimal = 0;
	}
	if (!isset(splitPoint)) {
		splitPoint = ',';
	}
	if (isNaN(this)) {
		return 0;
	}
	var num = this.toFixed(afterDecimal).toString().split('.');
	return num[0].replace(new RegExp('\\B(?=(?:\\d{3})+(?!\\d))', 'g'), splitPoint)+((afterDecimal <= 0) ? '' : '.'+num[1]);
};
Number.prototype.parseNumber = function() {
	return this;
};
Number.prototype.round = function(length) {
	if (!isset(length) || length == 0) {
		return Math.round(this);
	}
	if (length > 0) {
		return parseFloat(this.toFixed(length));
	}
	var lng = Math.pow(10, Math.abs(length));
	return Math.round(this / lng) * lng;
};
Number.prototype.isInteger = function() {
	return String(this).search(new RegExp('^\\s*(\\+|-)?\\d+\\s*$')) != -1 ;
};
Number.prototype.isNumber = function() {
	return true;
}
Number.prototype.isEmpty = function() {
	return this == 0 ;
};
Number.prototype.escape = function(){
	return this;
};

/** Extend string prototype */
String.prototype.parseNumber = function() {
	return parseFloat(this.replace(new RegExp(',','g'),''));
};
String.prototype.parseBoolean = function() {
	return (this=='true')? true : false;
};
String.prototype.parseParam = function() {
	var data = {};
	var part = this.replace(new RegExp('\\+','g'), '%20').split('&');
	for (var i = 0; i < part.length; i++) {
		var val = part[i].split('=');
		if (!isset(val[1])) {
			val.push(null);
			data[val[0]] = val[1]; 
			continue;
		}
		val[1] = decodeURIComponent(val[1]);
		if (val[0].endsWith('[]')) {
			var arrayName = val[0].replace('[]', '');
			if (!isset(data[arrayName])) {
				data[arrayName] = [val[1]];
			} else {
				data[arrayName].push(dval[1]);
			}
			continue;
		}
		data[val[0]] = val[1]; 
	}
	return data;
};
String.prototype.trim = function(pos) {
	if (isset(pos)) {
		return (pos == 'L')? this.replace(new RegExp('(^\\s*)', 'g'), '') : this.replace(new RegExp('(\\s*$)', 'g'), '');
	}
	return this.replace(new RegExp('(^\\s*)|(\\s*$)', 'g'), '');
};
String.prototype.isInteger = function() {
	return new RegExp('^\\+?(0|[1-9]\\d*)$', 'i').test(this);
};
String.prototype.isNumber = function() {
	return !isNaN(parseFloat(this)) && isFinite(this);
}
String.prototype.isHtml = function() {
	return new RegExp('<[a-z][\\s\\S]*>', 'i').test(this);
};
String.prototype.isEmail = function() {
	return String(this.trim()).search(new RegExp('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9-_]+(\\.[a-z0-9-_]+)*(\\.[a-z]{2,})$', 'i')) != -1;
};
String.prototype.isURL = function() {
	return String(this).search(new RegExp('^(?:https?:\\/\\/)?(?:[a-z0-9-]+\\.)*[a-z0-9-]{2,}(?:\\.[a-z0-9]{2,})+(?:\\/?|$)', 'i')) != -1
};
String.prototype.isSecureURL = function() {
	return String(this).search(new RegExp('^(?:https:\\/\\/)?(?:[a-z0-9-]+\\.)*[a-z0-9-]{2,}(?:\\.[a-z0-9]{2,})+(?:\\/?|$)', 'i')) != -1
};
String.prototype.leftPad = function(len, word) {
	if (!isset(word)) {
		word='0';
	}
	return (new Array(Math.max(0, len - this.length + 1))).join(word).concat(this);
};
String.prototype.rightPad = function(len, word) {	
	if (!isset(word)) {
		word='0';
	}
	return this.concat((new Array(Math.max(0, len - this.length + 1))).join(word));
};
String.prototype.replaceAll = String.prototype.supplant = function(target, replacement) {
	return this.replace(new RegExp(target, 'g'), replacement);
};
String.prototype.stripTags = function() {
	return this.replace(new RegExp('<[^>]+>', 'gi'), '');
};
String.prototype.contains = String.prototype.includes = function(str) {
	return this.indexOf(str) > -1;
};
String.prototype.startsWith = function(str) {
	return this.slice(0, str.length) == str;
};
String.prototype.endsWith = function(str) {
	return this.slice(-str.length) == str;
};
String.prototype.codeToStatement = function() {
	if (this.length == 0) {
		return '';
	}
	return (this.slice(0,1).toUpperCase() + this.slice(1)).split('_').join(' ');
};
String.prototype.addChar = function(divideLength, character) {
	if (!isset(divideLength)) {
		divideLength=8;
	}
	if (!isset(character)) {
		character=' ';
	}
	var reg1 = new RegExp('[\x21-\x3b\x3d\x3f-\x7E]{'+ (divideLength+1) +',}(?![^<]*>|</)','g');
	var reg2 = new RegExp('[\x21-\x3b\x3d\x3f-\x7E]{1,'+ divideLength +'}','g');
	var result = this;
	var matches = result.match(reg1);
	for (var i in matches) {
		var m = matches[i].toString();
		result = result.replace(m, m.match(reg2).join(character));
	}
	return result;
};
String.prototype.addSoftHyphen = function(divideLength) {
	return this.addChar(divideLength, '&#173;');
};
String.prototype.addZeroWidthSpace = function(divideLength) {
	return this.addChar(divideLength, '&#8203;');
};
String.prototype.isEmpty = function() {
	return (this.trim().length == 0);
};
String.prototype.toDate = function() {
	return new Date(this);
};
String.prototype.dateFormat = function(format) {
	return this.toDate.format(format);
};
String.prototype.escape = function() {
	return this.replace(new RegExp('([.*+?\^${}()|\[\]\/\\])','g'), '\\$1');
};

/** Extend boolean prototype */
Boolean.prototype.parseBoolean = function() {
	return (this)? true : false;
};
Boolean.prototype.parseNumber = function() {
	return (this)? 1 : 0;
};
Boolean.prototype.isEmpty = function() {
	return (this == false);
};

/** Extend date prototype */
Date.prototype.format = function(format) {
	var zeroPadding = function(n) {
		return (n < 10)? '0' + n.toString() : n;
	};
	var date = this, fn={};
	fn.Y = function(){ return date.getFullYear(); };
	fn.y = function(){ return zeroPadding(fn.Y() %100); };
	fn.n = function(){ return date.getMonth(); };
	fn.m = function(){ return zeroPadding(fn.n() + 1); };
	fn.j = function(){ return date.getDate(); };
	fn.d = function(){ return zeroPadding(fn.j()); };
	fn.H = function(){ return date.getHours(); };
	fn.G = function(){ return zeroPadding(fn.H()); };
	fn.g = function(){ return fn.G() % 12 || 12; };
	fn.h = function(){ return zeroPadding(fn.g() ); };
	fn.a = function(){ return (fn.G() < 12)? 'am': 'pm'; };
	fn.i = function(){ return zeroPadding(date.getMinutes()); };
	fn.s = function(){ return zeroPadding(date.getSeconds()); };
	fn.w = function(){ return date.getDay(); };
	return format.replace( new RegExp('\\w','g'), function(w, s) {
		return fn[w]? fn[w]().toString() : s;
	});
};
Date.prototype.adjust = function(srt) {
	if (code = srt.match(new RegExp('(\-*\d+)\s+(\w+)','i'))) {
		var unit = code[2].toLowerCase();
		var number = parseInt( code[1] );
		var unitSet = {
			second:{ set:'setSeconds', get:'getSeconds' },
			minute:{ set:'setMinutes', get:'getMinutes' },
			hour:{ set:'setHours', get:'getHours' },
			day:{ set:'setDate', get:'getDate' },
			month:{ set:'setMonth', get:'getMonth' },
			year:{ set:'setFullYear', get:'getFullYear' },
		};
		return new Date(new Date(this)[unitSet[unit].set](this[unitSet[unit].get]() + number));
	}
	return this;
};

/** Extend array prototype */
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}
Array.prototype.inArray = function(obj) {
	return (this.indexOf(obj) > -1);
};
Array.prototype.unique = function() {
	var unique = [];
	for (var i = 0; i < this.length; i++) {
        if (!unique.inArray(this[i])) {
            unique.push(this[i]);
        }
    }
    return unique;
};
Array.prototype.escapeBlank = function() {
	var array = [];
	for (var i = 0; i < this.length; i++) {
		var trimed = this[i].trim();
        if (trimed.length > 0) {
            array.push(trimed);
        }
    }
    return array;
};
Array.prototype.clear = function() {
	return this.length = 0;
};
Array.prototype.isEmpty = function() {
	return this.length == 0;
};

(function(jQuery){
		
	/** Extend jQuery expression test */
	jQuery.extend(jQuery.expr[':'], {
		
		appeared: function(el, index, meta) {			
			var $els = $(el)
			var tolerance = 0;
			if (!$els.is(':visible')) {
				return false;
			}
			if (isset(meta[3])) {
				tolerance = parseInt(meta[3]);
			}
			var $window = $(window);
			var windowLeft = $window.scrollLeft();
			var windowTop = $window.scrollTop();
			var appeared = true;
			$els.each(function(i,o){
				var $el = $(o);
				var offset = $el.offset()
				var adjustTop = offset.top - tolerance;
				if (adjustTop + $el.height() < windowTop || 
				adjustTop - ($el.data('appear-top-offset') || 0) > windowTop + $window.height() ||
				offset.left + $el.width() < windowLeft ||
				offset.left - ($el.data('appear-left-offset') || 0) > windowLeft + $window.width()) {
					appeared = false;
				}
			});
			return appeared;
		}
		
	});

	/** Extend jQuery object function */
	jQuery.fn.extend({

		appear: function(fn, tolerance) {
			this.unbind('appeared').bind('appeared', fn).attr('data-appear', 0);
			if (isset(tolerance)) {
				this.attr('data-appear-lerance', tolerance);
			}
			if (!jQuery.appear.monitoring) {
				jQuery.appear.monitoring = true;
				jQuery.appear.monitor();
			}
			return this;
		},
		
		fileDroppable: function(opt){
			opt = $.extend({
				fileDrag: function(type){},
				fileDrop: function(e, files){}
			}, isset(opt)? opt: {});
			var onFileDrag = function(e) {
				e.stopPropagation();
				e.preventDefault();
				opt.fileDrag(e.type);
			};
			this.each(function(i,obj){
				obj.addEventListener('dragover', onFileDrag, false);
				obj.addEventListener('dragleave', onFileDrag, false);
				obj.addEventListener('drop', function(e){
					onFileDrag(e);
					var files = e.target.files || e.dataTransfer.files;
					opt.fileDrop(e, files);
				}, false);
			});
		},
		
		hasAttr: function(attrName){
			return this.is('['+ attrName+ ']');			
		},
		
		href: function(opt) {
			opt = $.extend({
				url: function($obj){
					return $obj.attr('data-href') || '#';
				},
				clickDelay: 5000
			}, isset(opt)? opt: {});
			this.mousedown(function(e){
				e.preventDefault();
				var $obj = $(this);
				$obj.attr('data-as-href', 'down');
				setTimeout(function(){
					$obj.removeAttr('data-as-href');
				}, opt.clickDelay);
			});
			this.mouseup(function(e){
				e.preventDefault();
				var $obj = $(this);
				if ($obj.attr('data-as-href') != 'down') {
					return false;
				}
				$obj.removeAttr('data-as-href');
				switch (e.which) {
					case 1:
						location.href = opt.url($obj);
						break;
					case 2:
						window.open(opt.url($obj), '_blank');
						break;
				}
			});
		},
	
		isEmpty:function() {
			if (this.length == 0) { return true; }
			var val = (this.is('input') || this.is('select') || this.is('textarea'))? this.val(): this.html();
			if (val ==null || val.length == 0) { return true; }
			var placeholder = this.attr('placeholder');
			if (isSet(placeholder) && val == placeholder ){ return true; }
			return false;
		},

		loadDataSrc: function(){
			var blankImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
			var fn = function(e, el) {
				var $el = $(el || this);
				var url = $el.attr('data-src');
				if (!url) {
					return;
				}
				$('<img/>').on('load', function(){
					$el.attr('src', url).removeAttr('data-src data-appear data-appear-lerance');
				}).attr('src', url);
			};
			return this.each(function(){
				var $this = $(this);
				if ($this.is('img') && !$this.attr('src')) {
					$this.attr('src', blankImg);
				}
				if ($this.is(':appeared') || $this.is(':appeared(300)')) {
					fn(null, this);
				}else{
					$this.appear(fn, 300);
				}
			});	
		},
		
		serializeObject: function() {
			var obj = {};
			var $inputs = this;
			var putToObj = function(name, val) {
				if (isset(obj[name])) {
					if (typeof obj[name] != 'object') {					
						var newVal = [obj[name]];
						obj[name] = newVal;
					}
					return obj[name].push(val);
				}
				obj[name] = val;
			};			
			if ($inputs.is('form')) {
				$inputs = $input.find(':input');
			}
			$inputs.each(function(){
				var $input = $(this);
				if (!$input.hasAttr('name')) {
					return;
				}
				if ($input.is('[type=checkbox]')) {
					if ($input.is(':checked')) {
						putToObj($input.attr('name'), $input.val());
					}
				} else {
					putToObj($input.attr('name'), $input.val());
				}
			});
			return obj;
		},
		
		tidyGrid: function() {
			var pool = {};
			return this.each(function() {
				var $block = $(this);
				var offset = $block.offset(), width = $block.width();
				var x = offset.left, y = Math.ceil(offset.top);
				var affect = [], maxY = 0;
				for (var p in pool) {
					if (x <= p && p < x + width) {
						affect.push(p);
						maxY = Math.max(maxY, pool[p]);
					}
				}
				if (affect.length == 0) {
					pool[x] = Math.ceil(y + $block.height() + parseInt($block.css('margin-bottom')));
				} else {
					if (y > maxY) {
						$block.css('margin-top', '-'+( y - maxY )+'px');
					}
					var newY = Math.ceil($block.offset().top + $block.height() + parseInt($block.css('margin-bottom')));
					for (var a in affect) {
						pool[affect[a]] = newY;
					}
				}
			});
		}

	});

	/** Extend jQuery function */
	jQuery.extend({
		
		// Assume replace with custom layout code.
		alert: function(str, opt) {
			opt = $.extend({
				close: function(e){}
			}, isset(opt)? opt: {});
			alert($.lang(str));
			opt.close();
		},
		
		appear: {
			sensitive: 50,
			monitoring: false,
			monitor: function() {
				$(window).on('scroll resize', function() {
					var docTop = $(document).scrollTop();
					$('body [data-appear]').each(function(i,o){
						var $el = $(o);
						var tolerance = parseInt( $el.attr('data-appear-lerance') || 0 );
						if ($el.is(':appeared('+ tolerance +')')) {						
							var lastTriggerDocTop = $el.attr('data-appear') | 0;
							if (docTop > lastTriggerDocTop + jQuery.appear.sensitive || docTop < lastTriggerDocTop - jQuery.appear.sensitive) {
								$el.attr('data-appear', docTop).trigger('appeared', $el.get(0));
							}
						}						
					});
				});
			}
		},

		browser: (function() {
			var info = {
				version: 0		
			};
			var userAgent = (navigator.userAgent)? navigator.userAgent.toLowerCase() : navigator.vendor.toLowerCase();
			var match = (new RegExp('(opera|opr)(?:.*version|)[ \\/]([\\w.]+)')).exec( userAgent ) ||
						(new RegExp('(chrome)[ \\/]([\\w.]+)')).exec(userAgent) ||
						(new RegExp('(safari)[ \\/]([\\w.]+)')).exec(userAgent) ||
						(new RegExp('(webkit)[ \\/]([\\w.]+)')).exec(userAgent) ||
						(new RegExp('(msie|trident) ([\\w.]+)')).exec(userAgent) ||
						userAgent.indexOf('compatible') < 0 && (new RegExp('(mozilla)(?:.*? rv:([\\w.]+)|)')).exec(userAgent) ||
						[];
			if (match.length == 0 || match[1] == '' || match[2] == '') {
				return;
			}
			if (match[1]) {
				info[ match[1] ] = true;
				info.version = match[2];
			}
			if (info.opr) {
				info.opera = true;
			}
			if (info.safari || info.chrome) {
				info.webkit = true;
			}
			if (info.trident) {
				info.msie = true;
			}
			if (new RegExp('mobile|android|armv|webos|iphone|ipad|ipod|blackberry|iemobile|mini', 'i').test(userAgent)) {
				info.mobile = true;
			}
			return info;
		})(),
		
		// Assume replace with custom layout code.
		confirm: function(str, opt) {
			opt = $.extend({
				confirm: function(e){},
				cancel: function(e){}
			}, isset(opt)? opt: {});
			if (confirm($.lang(str))) {
				opt.confirm();
			}else{
				opt.cancel();
			}
		},
		
		console: (function() {
			var fn = function() {
				$('#console').css('display','block');
			};
			fn.makeConsole = function() {
				if ($('#console').length > 0) {
					return;
				}
				$('html').append($('<div />', {
					id: 'console',
					css:{
						'position': 'fixed',
						'display': 'none',
						'bottom': 0,
						'width': '100%',
						'height': '300px',
						'overflow': 'auto',
						'font-size': '13px',
						'background-color': 'rgba(0, 0, 0, 0.3)'
				}}));
			};
			fn.addMsg = function(act, msg) {
				fn.makeConsole();
				if (!isset(msg[0])) {
					return;
				}
				msg = msg.join(' ');
				var color = {
					debug: '0389FF',
					log: 'FFF',
					error: 'CF1111',
					info: '7EDC64'
				};
				$('#console').append('<div style="width:100%;color:#'+color[act]+';">'+ msg +'</div>').scrollTop($('#console').height());
			};
			fn.debug = function() {
				fn.addMsg('debug', Array.prototype.slice.call(arguments));
			};
			fn.log = function() {
				fn.addMsg('log', Array.prototype.slice.call(arguments));
			};
			fn.error = function() {
				fn.addMsg('error', Array.prototype.slice.call(arguments));
			};
			fn.info = function() {
				fn.addMsg('info', Array.prototype.slice.call(arguments));
			};
			fn.clear = function() {
				$('#console').html('');
			};
			fn.toggle = function() {
				$('#console').toggle();
			};
			return fn;
		})(),
		
		cookie: (function() {
			var fn = function(name, value, opt) {
				if (isset(value)) {
					if (value == null) {
						return this.cookie.remove(name, opt);
					} else {
						return this.cookie.set(name, value, opt);
					}
				}
				return this.cookie.get(name);
			};
			fn.get = function(name) {
				var match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name.escape() + '=([^;]*)'));
				return match? match[1] : null;
			};
			fn.add = fn.set = function(name, value, opt) {
				opt = $.extend({
					path: '/',
					domain: location.hostname,
					secure: false
				}, isset(opt)? opt: {});
				var expires = '';
				if (isset(opt.expires)) {
					if (typeof opt.expires === 'number') {
						expires = ';expires='+ new Date( (opt.expires===Infinity)? 'Fri, 31 Dec 9999 23:59:59 UTC': (new Date()).getTime()+(opt.expires * 1000) );
					} else if (typeof expires === 'string') {
						expires = ';expires='+ new Date( opt.expires );
					}
				}
				document.cookie = name.escape() +'='+ value.escape() + expires +';path='+ opt.path +';domain='+opt.domain+((opt.secure)? ';secure': '');
			};
			fn.remove = fn.expired = function(name, opt) {
				if (fn.get(name) == null) {
					return false;
				}
				opt = $.extend({
					path: '/',
					domain: location.hostname,
					secure: false
				}, isset(opt)? opt: {});
				document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path='+ opt.path +';domain='+ opt.domain;
			}
			return fn;
		})(),

		getStyleSheet: function(url, callback) {
			if (typeof callback != 'function') {
				callback = function(){};
			}
			if ($('link[type="text/css"][href="'+ url +'"]').length == 0) {
				$('<link type="text/css" rel="stylesheet" href="'+ url +'" />').on('load', function(){
					callback();
				}).appendTo('head');
			} else {
				callback();
			}
		},

		/* getScript: function(url, callback){}, // jQuery already has this function. */

		getResource: function(urls, callback) {
			if (typeof callback != 'function') {
				callback = function(){};
			}
			var js = [] , css =[], total = urls.length, cnt = 0;
			var checkQueue = function() {
				cnt++; 
				if (cnt == total) {
					callback();
				}
			};
			for (var i=0; i < urls.length; i++) {
				var type = urls[i].match(new RegExp('\.([0-9a-z]+)(?:[\?#]|$)', 'i'));
				if (type == null) {
					continue;
				}
				switch (type[1]) {
					case 'css': 
						$.getStyleSheet(urls[i], checkQueue);
						break;
					case 'js': 
						$.getScript(urls[i], checkQueue);
						break;
				}
			}
		},

		lang: (function() {
			var fn = function(str, val) {
				var typeStr = typeof(str);
				if (typeStr == 'undefined') {
					return '';
				}
				if (typeStr == 'object') {
					for (var i in str) {
						this.lang.text[i] = str[i];
					}
					return this;
				}
				if (typeof(val) != 'undefined') {
					this.lang.text[str] = val;
					return this;
				}
				return isset(this.lang.text[str]) ? this.lang.text[str] : ( str.isHtml()? str : str.codeToStatement() );
			};
			fn.text = [];
			return fn;
		})(),
		
		object: function(obj) {
			if (typeof(obj) != 'object') {
				return false;
			}
			var getKeys = function(obj){
				var keys = [];
				for(var i in obj){
					if (obj.hasOwnProperty(i)) {
						keys.push(i);
					}
				}
				return keys;
			};
			var sort = function(obj) {
				var keys = [], k, i, len, out = {};
				for (k in obj) {
					if (obj.hasOwnProperty(k)) {
						keys.push(k);
					}
				}
				keys.sort();
				len = keys.length;
				for (i=0; i<len; i++) {
					k = keys[i];
					switch (typeof obj[k] ) {
						case "object":
							out[k] = sort(obj[k]);
							break;
						default:
							out[k] = obj[k];
					}
				}
				return out;
			};
			var stringify = function(obj, ndeep) {
				if (obj == null) {
					return String(obj);
				}
				switch (typeof obj) {
					case "string":
						return '"'+obj+'"';
					case "function":
						return null;
					case "object":
						var keyArray = [], keys = getKeys(obj), i, r;
						if ( Array.isArray(obj) ) {
							for (i=0; i<keys.length; i++) {
								r = stringify(obj[ keys[i] ], (ndeep||1)+1) 
								keyArray.push( (r==null)? "null" : r );
							}
							return '[' + keyArray.join(',') + ']';
						}else{
							for (i=0; i<keys.length; i++) {
								r = stringify(obj[ keys[i] ], (ndeep||1)+1);
								if (r != null) {
									keyArray.push( '"'+ keys[i] + '":' + r );
								}
							}
							return '{' + keyArray.join(',') + '}';
						}
					default:
						return obj.toString();
				}
			};
			var keys = getKeys(obj);
			return {
				keys: keys,
				clone: function() {
					return $.extend(true, {}, obj);
				},
				isEmpty: function() {
					return (keys.length == 0);
				},
				sort: function() {
					return sort(obj);
				},
				toString: function() {
					return stringify(obj);
				},
				stringify: function() {
					return stringify(obj);
				},
				compare: function( otherObj ){
					return (stringify(obj) == stringify(otherObj));
				}
			};
		},
		
		pagination: (function() {
			var fn = function(pageCurrent, pageTotal){
				var pageArray = [];
				var pageStart = (pageCurrent - 5 > 1) ? pageCurrent - 5 : 2;
				var pageEnd = (pageCurrent + 5 < pageTotal - 1) ? pageCurrent + 5 : pageTotal - 1 ;
				pageArray.push({page: 1, display: 1, current: (pageCurrent == 1)});
				if (pageCurrent - 6 > 1) {
					pageArray.push({page: null, display: '...'});
				}
				for (var n = pageStart ; n <= pageEnd ; n++) {
					pageArray.push({ page: n, display: n, current: (n == pageCurrent) });
				}
				if (pageCurrent + 5 < pageTotal - 1) {
					pageArray.push({page: null, display: '...'});
				}
				pageArray.push({page: pageTotal, display: pageTotal, current: (pageCurrent == pageTotal)});
				return pageArray;
			};
			return fn;
		})(),
		
		pajax: (function() {
			var fn = function(opt) {
				opt = isset(opt)?opt:{};
				if (!isset(opt.url) || opt.url == '' || opt.success || opt.beforeSend || opt.error) {
					console.error("Setting object missing necessary variable or contains unexpected variable.");
					return;
				}
				if (!isset(history.pushState)) {
					location.href = opt.url;
					return;
				}
				opt = $.extend({
					url: '',
					type: 'GET',
					data: {},
					headers: { 'X-PAJAX': 1 },
					dataType: 'html',
					beforeSend: function(jqXHR, settings) {
						jQuery.pajax.beforeSend(jqXHR, settings);
					},
					success: function(data, textStatus, jqXHR) {
						jQuery.pajax.success(data, textStatus, jqXHR);
					},
					error: function(jqXHR, textStatus, errorThrown) { 
						jQuery.pajax.error(jqXHR, textStatus, errorThrown);
					},
					skipPush: false
				}, opt);
				if (!jQuery.pajax.popstateChanged) {
					window.onpopstate = function(e) {
						jQuery.pajax.popstate(e);
					};
					jQuery.pajax.popstateChanged = true;
				}
				if (opt.type == 'GET') {
					opt.data['x-pajax'] = true;
				} else {
					opt.url+= ( opt.url.split('?').length > 1 ? '&':'?' )+ 'x-pajax=true';
				}
				$.ajax( opt );
				if (opt.skipPush == false) {
					history.pushState({
						setting: {
							url: opt.url,
							dataType: opt.dataType,
							data: opt.data,
							headers: opt.headers
						}
					}, $('title').text(), opt.url);
				}
			};
			fn.popstateChanged = false;
			fn.popstate = function(e){
				if (e.state == null) {
					// # Handle the first history of this website.
					return jQuery.pajax({
						url: location.pathname,
						headers: { 'X-PAJAX': 1 },
						skipPush: true
					});
				}
				if (isset(e.state.setting)) {
					e.state.setting.skipPush = true;
					jQuery.pajax( e.state.setting );
				}
			};
			fn.beforeSend = function(jqXHR, settings) {};
			fn.success = function(data, textStatus, jqXHR) {
				console.log({
					data: data,
					textStatus: textStatus,
					jqXHR: jqXHR
				});
			};
			fn.error = function(jqXHR, textStatus, errorThrown) { 
				if (jqXHR.status != 0) {
					console.log({
						jqXHR: jqXHR,
						textStatus: textStatus,
						errorThrown: errorThrown
					});
				}
			};
			return fn;
		})(),
		
		palette: (function() {
			var fn = function( color ) {
				var type = null;
				var colorSet = {red:0, green:0, blue:0, alpha: 1};
				if (color.match(new RegExp('\\#([A-F0-9]{6})','i'))){
					type = 'HEX';
					colorSet.red = parseInt(color.substr(1,2) ,16);
					colorSet.green = parseInt(color.substr(3,2) ,16);
					colorSet.blue = parseInt(color.substr(5,2) ,16);
				} else if (color.match(new RegExp('\\#([A-F0-9]{3})','i'))) {	
					type = 'HEX';
					colorSet.red = parseInt(color.substr(1,1)+''+color.substr(1,1) ,16);
					colorSet.green = parseInt(color.substr(2,1)+''+color.substr(2,1) ,16);
					colorSet.blue = parseInt(color.substr(3,1)+''+color.substr(3,1) ,16);
				} else if (r = color.match(new RegExp('rgb\\((\\d+)\\s*\\,\\s*(\\d+)\\s*\\,\\s*(\\d+)\\)','i'))) {
					type = 'RGB';
					colorSet.red = parseInt(r[1]);
					colorSet.green = parseInt(r[2]);
					colorSet.blue = parseInt(r[3]);
				} else if (r = color.match(new RegExp('rgba\\((\\d+)\\s*\\,\\s*(\\d+)\\s*\\,\\s*(\\d+)\\,\\s*([0-9\\.]+)\\s*\\)','i'))) {
					type = 'RGBA';
					colorSet.red = parseInt(r[1]);
					colorSet.green = parseInt(r[2]);
					colorSet.blue = parseInt(r[3]);
					colorSet.alpha = parseFloat(r[4]);
				}
				return {
					color: colorSet,
					darken: function(percentage) {
						var p = parseInt(percentage)/100;
						return jQuery.palette.toColorCode(type, parseInt(colorSet.red * (1-p)), parseInt(colorSet.green * (1-p)), parseInt(colorSet.blue * (1-p)));
					},
					lighten: function(percentage) {
						var p = parseInt(percentage)/100;
						return jQuery.palette.toColorCode(type, parseInt(colorSet.red * (1+p)), parseInt(colorSet.green * (1+p)), parseInt(colorSet.blue * (1+p)));
					}
				};
			};
			fn.toColorCode = function(type, red, green, blue, alpha) {
				switch (type) {
					case 'HEX':
						return '#'+ red.toString(16) + green.toString(16) + blue.toString(16);
					case 'RGB':
						return 'rgb('+ red +', '+ green +', '+ blue +')';
					case 'RGBA':
						return 'rgba('+ red +', '+ green +', '+ blue +', '+ alpha +')';
				}
			};
			return fn;
		})(),
		
		placeholder: (function() {
			var fn = function( inputs ) {
				var $inputs = $(inputs);
				$inputs.each(function(index, obj) {
					var $input = $(obj);
					obj.editValue = obj.value;
					$input.attr('data-color', $input.css('color'))
						.on('focus.placeholder', jQuery.placeholder.focus)
						.on('blur.placeholder', jQuery.placeholder.blur)
						.on('keyup.placeholder', jQuery.placeholder.keyup)
						.trigger('blur.placeholder');
				});
				if (!jQuery.placeholder.ajaxEventHandled) {
					jQuery.placeholder.handleAjaxEvent();
					jQuery.placeholder.ajaxEventHandled = true;
				}
				return $inputs;
			};
			fn.ajaxEventHandled = false;
			fn.focus = function(e){
				var $input = $(this);
				if ($input.val() =='') {
					$input.val('').css('color', $input.attr('data-color'));
				}
			};
			fn.blur = function(e){
				var $input = $(this);
				if (this.editValue=='') {
					$input.val($input.attr('placeholder')).css('color', '#AAA');
				}
			};
			fn.keyup = function(e){
				this.editValue = this.value;
			};
			fn.handleAjaxEvent = function(){
				$(document).ajaxComplete(function(event, request, settings) {
					$.placeholder($('body :input[placeholder]:not([data-color])'));
				});
			};
			return fn;
		})(),
				
		window: (function(){
			var fn = function(url, opt) {
				return this.window.get(url, opt);
			};
			fn.get = function(url, opt) {
				opt = $.extend({
					name: '_blank',
					data: {}
				}, opt);
				var urlObj = $('<a />').attr('href', url).get(0);
				var urlData = [];
				for (var name in data) {
					urlData.push(name +'='+data[name]);
				}
				var query = (urlObj.search != '')? '?'+urlData.join('&') : urlObj.search +'&'+ urlData.join('&');	
				window.open(urlObj.origin + urlObj.pathname + query, opt.name);
				return [url, opt];
			};
			fn.post = function(url, opt) {
				opt = $.extend({
					name: '_blank',
					data: {}
				}, opt);
				var $form = $('<form style="display: none;"/>').attr({
					target: opt.name,
					method: 'post',
					action: url
				});
				for (var i in opt.data) {
					$form.append('<input type="hidden" name="'+ i +'" value="'+ opt.data[i] +'" />');
				}
				$form.appendTo('body').submit().remove();
				return [url, opt];
			};
			return fn;
		})()
		
	});

	jQuery.ajaxSetup({cache: true});
	
	/** If browser don't support placeholder feature */
	if (!('placeholder' in document.createElement('input'))) {
		
		$.placeholder($(':input[placeholder]'));
	
		jQuery.valHooks['textarea'] = jQuery.valHooks['text'] = {
			get: function(elem) {
				var ret = elem.value;
				if (typeof elem.editValue == 'string') {
					ret = elem.editValue;
				}
				return typeof ret === "string" ? ret.replace(/\r/g, "") : ret == null ? "" : ret;
			}
		};
		
	}

})(jQuery);
