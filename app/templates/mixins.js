/**
 * Helper functions
 * @module mixins
 */
_.mixin({
	capitalize: function(string) {
		return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
	},
	camelize: function(string) {
		return string.replace (/(?:^|[-_])(\w)/g, function (_, c) {
			return c ? c.toUpperCase () : '';
		});
	},
	extract: function( string, regex, n ) {
		/**
		 * Matches the string against the passed regex
		 * and the returns the group specified by _n_
		 *
		 * E.g.
		 *     ('hi @boo and @adam').extract(/@(\w+)/g, 1);
		 *       => ['boo', 'adam']
		 *
		 * If the regex is global then an array is returned
		 * otherwise just the matched group is returned.
		 **/

		n = n === undefined ? 0 : n;

		if ( !regex.global ) {
			return string.match(regex)[n] || '';
		}

		var match,
			extracted = [];

		while ( (match = regex.exec(string)) ) {
			extracted[extracted.length] = match[n] || '';
		}

		return extracted;
	},
	wrap: function( string, width, brk, cut ) {
		/**
		 * Wraps the string.
		 * E.g.
		 * "the dog realllly wet".wrap(4, '<br/>')
		 *  => "the <br/>dog <br/>realllly <br/>wet"
		 **/

		brk = brk || '\n';
		width = width || 75;
		cut = cut || false;

		if (!string) { return string; }

		var regex = '.{1,' +width+ '}(\\s|$)' + (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');

		return string.match( new RegExp(regex, 'g') ).join( brk );
	},
	replaceAll: function (string, a, d) {
		return string.split(a).join(d);
	},
	/**
	 * Convert string to Initial Caps
	 * @param {string} str The string to be converted
	 */
	convertCase: function (str) {
		return str.toLowerCase().replace( /(^| )(\w)/g, function(x){return x.toUpperCase();} );
	},
	sorter: function (collection, sort) {
		var by = function (name, minor) {
			return function (o, p) {
				var a, b;
				if (typeof o === 'object' && typeof p === 'object' && o && p) {
					a = o[name];
					b = p[name];
					if (a === b) {
						return typeof minor === 'function' ? minor(o, p) : o;
					}
					if (typeof a === typeof b) {
						return a < b ? -1 : 1;
					}
					return typeof a < typeof b ? -1 : 1;
				} else {
					throw {
						name: 'Error',
						message: 'Expected an object when sorting by ' + name
					};
				}
			}
		};
		if (collection.sort === undefined) {
			collection = _.toArray(collection);
		}

		return collection.sort(by(sort));
	},
	/**
	 * Replace linebreaks with <br>
	 * @param {string} str The string to be replaced
	 */
	nl2br: function (str) {
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
	},
	/**
	 * Capitalize the first letter of the string
	 * @param {string} str The string to be changed
	 */
	ucfirst: function (str) {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// *     example 1: ucfirst('kevin van zonneveld');
		// *     returns 1: 'Kevin van zonneveld'
		str += '';
		var f = str.charAt(0).toUpperCase();
		return f + str.substr(1);
	},
	/**
	 * Returns the first word in a string like first name
	 * @param {string} str The string to be sliced
	 */
	slice: function (str) {
		return str.split(' ').slice(0,1);
	},
	/**
	 * Format Date
	 * @param {string} dateString The object to be formatted
	 * @param {string|null} separator The string used to format the date
	 */
	formatDate: function(dateString, separator) {
		if (!dateString) return false;
		var pvt = {};
		pvt.dateObj = new Date(dateString * 1000);
		pvt.dateArr = [];
		separator = separator || '.';

		pvt.dateArr.push((pvt.dateObj.getDate() < 10 ? '0' : '') + pvt.dateObj.getDate());
		pvt.month = pvt.dateObj.getMonth() + 1;
		pvt.dateArr.push((pvt.month < 10 ? '0' : '') + pvt.month);
		pvt.dateArr.push(pvt.dateObj.getFullYear());

		return pvt.dateArr.join(separator);
	},
	/**
	 * Truncate string
	 * @param {string} str The string to be shortened
	 * @param {number|null} maxLength The maximum lenght
	 * @param {string|null} suffix The string to add if truncated
	 */
	truncate: function(str, maxLength, suffix) {
		suffix = suffix ? suffix : ' ...';
		maxLength = maxLength ? maxLength : 100;
		if(str.length > maxLength) {
			str = str.substring(0, maxLength + 1);
			str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
			str = str + suffix;
		}
		return str;
	},
	/**
	 * Returns if the element is in view
	 * @param {object} elem The element to be measured
	 */
	inView: function (elem) {
		var docViewTop = $(window).scrollTop(),
			docViewBottom = docViewTop + $(window).height(),
			elemTop = $(elem).offset().top,
			elemBottom = elemTop + $(elem).outerHeight();

		return ((elemTop >= docViewTop) && (elemBottom <= docViewBottom));
	},
	/**
	 * Returns zero if the var is undefined else the var
	 * @param {number} item The element to be measured
	 */
	zero: function (item) {
		return typeof(item) === 'undefined' ? 0 : item;
	},
	/**
	 * Check if a version string is greater than required
	 * @param {string} used Version string (1.4.10)
	 * @param {string} required Version string (1.4.7)
	 */
	compareVersion: function(used, required) {
		var expr = /\d+/g, places = Math.max(used.split(expr).length, required.split(expr).length);
		function convert(s) {
			var place = Math.pow(100, places), total = 0;
			s.replace(expr,
				function (n) {
					total += n * place;
					place /= 100;
				}
			);
			return total;
		}

		return convert(used) >= convert(required);
	}
});