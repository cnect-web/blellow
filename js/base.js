var ECL = (function (exports) {
  'use strict';

  // Query helper
  var queryAll = function queryAll(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return [].slice.call(context.querySelectorAll(selector));
  };

  // Heavily inspired by the accordion component from https://github.com/frend/frend.co

  /**
   * @param {object} options Object containing configuration overrides
   */
  var accordions = function accordions() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-accordion' : _ref$selector,
        _ref$headerSelector = _ref.headerSelector,
        headerSelector = _ref$headerSelector === undefined ? '.ecl-accordion__header' : _ref$headerSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set accordion element NodeLists
    var accordionContainers = queryAll(selector);

    // ACTIONS
    function hidePanel(target) {
      // get panel
      var activePanel = document.getElementById(target.getAttribute('aria-controls'));

      target.setAttribute('aria-expanded', 'false');

      // toggle aria-hidden
      activePanel.setAttribute('aria-hidden', 'true');
    }

    function showPanel(target) {
      // get panel
      var activePanel = document.getElementById(target.getAttribute('aria-controls'));

      // set attributes on header
      target.setAttribute('tabindex', 0);
      target.setAttribute('aria-expanded', 'true');

      // toggle aria-hidden and set height on panel
      activePanel.setAttribute('aria-hidden', 'false');
    }

    function togglePanel(target) {
      // close target panel if already active
      if (target.getAttribute('aria-expanded') === 'true') {
        hidePanel(target);
        return;
      }

      showPanel(target);
    }

    function giveHeaderFocus(headerSet, i) {
      // set active focus
      headerSet[i].focus();
    }

    // EVENTS
    function eventHeaderClick(e) {
      togglePanel(e.currentTarget);
    }

    function eventHeaderKeydown(e) {
      // collect header targets, and their prev/next
      var currentHeader = e.currentTarget;
      var isModifierKey = e.metaKey || e.altKey;
      // get context of accordion container and its children
      var thisContainer = currentHeader.parentNode.parentNode;
      var theseHeaders = queryAll(headerSelector, thisContainer);
      var currentHeaderIndex = [].indexOf.call(theseHeaders, currentHeader);

      // don't catch key events when ⌘ or Alt modifier is present
      if (isModifierKey) return;

      // catch enter/space, left/right and up/down arrow key events
      // if new panel show it, if next/prev move focus
      switch (e.keyCode) {
        case 13:
        case 32:
          togglePanel(currentHeader);
          e.preventDefault();
          break;
        case 37:
        case 38:
          {
            var previousHeaderIndex = currentHeaderIndex === 0 ? theseHeaders.length - 1 : currentHeaderIndex - 1;
            giveHeaderFocus(theseHeaders, previousHeaderIndex);
            e.preventDefault();
            break;
          }
        case 39:
        case 40:
          {
            var nextHeaderIndex = currentHeaderIndex < theseHeaders.length - 1 ? currentHeaderIndex + 1 : 0;
            giveHeaderFocus(theseHeaders, nextHeaderIndex);
            e.preventDefault();
            break;
          }
        default:
          break;
      }
    }

    // BIND EVENTS
    function bindAccordionEvents(accordionContainer) {
      var accordionHeaders = queryAll(headerSelector, accordionContainer);
      // bind all accordion header click and keydown events
      accordionHeaders.forEach(function (accordionHeader) {
        accordionHeader.addEventListener('click', eventHeaderClick);
        accordionHeader.addEventListener('keydown', eventHeaderKeydown);
      });
    }

    // UNBIND EVENTS
    function unbindAccordionEvents(accordionContainer) {
      var accordionHeaders = queryAll(headerSelector, accordionContainer);
      // unbind all accordion header click and keydown events
      accordionHeaders.forEach(function (accordionHeader) {
        accordionHeader.removeEventListener('click', eventHeaderClick);
        accordionHeader.removeEventListener('keydown', eventHeaderKeydown);
      });
    }

    // DESTROY
    function destroy() {
      accordionContainers.forEach(function (accordionContainer) {
        unbindAccordionEvents(accordionContainer);
      });
    }

    // INIT
    function init() {
      if (accordionContainers.length) {
        accordionContainers.forEach(function (accordionContainer) {
          bindAccordionEvents(accordionContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="npm" -o ./`
   * Copyright jQuery Foundation and other contributors <https://jquery.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   */

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  /** Detect free variable `self`. */
  var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objectToString = objectProto.toString;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */
  var now = function now() {
    return root.Date.now();
  };

  /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          result = wait - timeSinceLastCall;

      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    return !!value && (type == 'object' || type == 'function');
  }

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
  }

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }

  /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var lodash_debounce = debounce;

  /**
   * @param {object} options Object containing configuration overrides
   */
  var initBreadcrumb = function initBreadcrumb() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$breadcrumbSelect = _ref.breadcrumbSelector,
        breadcrumbSelector = _ref$breadcrumbSelect === undefined ? '.ecl-breadcrumb' : _ref$breadcrumbSelect,
        _ref$expandButtonSele = _ref.expandButtonSelector,
        expandButtonSelector = _ref$expandButtonSele === undefined ? '.ecl-breadcrumb__expand-btn' : _ref$expandButtonSele,
        _ref$segmentSelector = _ref.segmentSelector,
        segmentSelector = _ref$segmentSelector === undefined ? '.ecl-breadcrumb__segment' : _ref$segmentSelector,
        _ref$segmentFirstSele = _ref.segmentFirstSelector,
        segmentFirstSelector = _ref$segmentFirstSele === undefined ? '.ecl-breadcrumb__segment--first' : _ref$segmentFirstSele,
        _ref$segmentVisibleSe = _ref.segmentVisibleSelector,
        segmentVisibleSelector = _ref$segmentVisibleSe === undefined ? '.ecl-breadcrumb__segment:not(.ecl-breadcrumb__segment--first):not(.ecl-breadcrumb__segment--ellipsis):not(.ecl-breadcrumb__segment--last):not([aria-hidden="true"])' : _ref$segmentVisibleSe,
        _ref$segmentHiddenSel = _ref.segmentHiddenSelector,
        segmentHiddenSelector = _ref$segmentHiddenSel === undefined ? '.ecl-breadcrumb__segment[aria-hidden="true"]:not(.ecl-breadcrumb__segment--ellipsis)' : _ref$segmentHiddenSel,
        _ref$ellipsisSelector = _ref.ellipsisSelector,
        ellipsisSelector = _ref$ellipsisSelector === undefined ? '.ecl-breadcrumb__segment--ellipsis' : _ref$ellipsisSelector;

    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // ACTIONS
    function initEllipsis(breadcrumbContainer) {
      // add ellipsis to DOM
      var breadcrumbFirst = queryAll(segmentFirstSelector, breadcrumbContainer);
      breadcrumbFirst.forEach(function (segment) {
        var ellipsis = document.createElement('a');
        // we can't add multipls classes at once, because... IE
        ellipsis.classList.add('ecl-link');
        ellipsis.classList.add('ecl-link--inverted');
        ellipsis.classList.add('ecl-link--standalone');
        ellipsis.classList.add('ecl-breadcrumb__link');
        ellipsis.classList.add('ecl-breadcrumb__expand-btn');
        ellipsis.setAttribute('href', '#');
        ellipsis.innerHTML = '…';

        var listItem = document.createElement('li');
        listItem.classList.add('ecl-breadcrumb__segment');
        listItem.classList.add('ecl-breadcrumb__segment--ellipsis');
        listItem.classList.add('ecl-u-aria');
        listItem.setAttribute('aria-hidden', 'true');

        listItem.appendChild(ellipsis);
        segment.parentNode.insertBefore(listItem, segment.nextSibling);
      });
    }

    function toggleEllipsis(breadcrumbContainer) {
      // get hidden segments
      var breadcrumbHiddenSegments = queryAll(segmentHiddenSelector, breadcrumbContainer);
      var hidden = breadcrumbHiddenSegments.length > 0 ? 'false' : 'true';

      // display ellipsis when needed
      var breadcrumbEllipsis = queryAll(ellipsisSelector, breadcrumbContainer);
      breadcrumbEllipsis.forEach(function (ellipsis) {
        ellipsis.setAttribute('aria-hidden', hidden);
      });
    }

    function breadcrumbIsTooLarge(breadcrumbContainer) {
      // get wrapper width
      var wrapperWidth = Math.floor(breadcrumbContainer.getBoundingClientRect().width);

      // get displayed segments
      var breadcrumbSegments = queryAll(segmentSelector, breadcrumbContainer);

      // get segments width
      var segmentWidth = 0;
      breadcrumbSegments.forEach(function (breadcrumbSegment) {
        segmentWidth += Math.ceil(breadcrumbSegment.getBoundingClientRect().width);
      });

      return segmentWidth >= wrapperWidth;
    }

    function hideSegment(breadcrumbContainer) {
      // get visible segments
      var breadcrumbVisibleSegments = queryAll(segmentVisibleSelector, breadcrumbContainer);

      // hide segments if needed
      // we do not hide the last two segments
      if (breadcrumbVisibleSegments.length > 1) {
        breadcrumbVisibleSegments[0].setAttribute('aria-hidden', 'true');

        // check if there is another segment to be hidden
        if (breadcrumbIsTooLarge(breadcrumbContainer)) {
          hideSegment(breadcrumbContainer);
        }
      }
    }

    function showSegment(breadcrumbContainer) {
      // get hidden segments
      var breadcrumbHiddenSegments = queryAll(segmentHiddenSelector, breadcrumbContainer);

      // show segments if there is enough space
      if (breadcrumbHiddenSegments.length > 0) {
        breadcrumbHiddenSegments[breadcrumbHiddenSegments.length - 1].setAttribute('aria-hidden', 'false');

        if (breadcrumbIsTooLarge(breadcrumbContainer)) {
          // breadcrumb is too large, we hide the last segment
          hideSegment(breadcrumbContainer);
        } else {
          // check if there is another segment to be displayed
          showSegment(breadcrumbContainer);
        }
      }
    }

    // EVENTS
    function eventExpandClick(e, breadcrumbContainer) {
      e.preventDefault();
      // display all segments
      var breadcrumbSegments = queryAll(segmentSelector, breadcrumbContainer);
      breadcrumbSegments.forEach(function (breadcrumbSegment) {
        breadcrumbSegment.setAttribute('aria-hidden', 'false');
      });

      // hide ellipsis once expanded
      var target = e.currentTarget;
      target.parentElement.setAttribute('aria-hidden', 'true');
    }

    function eventResize(breadcrumbContainer) {
      // check if there are segments to be hidden or shown
      if (breadcrumbIsTooLarge(breadcrumbContainer)) {
        hideSegment(breadcrumbContainer);
      } else {
        showSegment(breadcrumbContainer);
      }
      toggleEllipsis(breadcrumbContainer);
    }

    // SETUP
    var breadcrumbContainers = queryAll(breadcrumbSelector);

    // BIND EVENTS
    function bindBreadcrumbEvents(breadcrumbContainer) {
      var expands = queryAll(expandButtonSelector, breadcrumbContainer);

      // bind click event for expand
      expands.forEach(function (expand) {
        expand.addEventListener('click', function (e) {
          return eventExpandClick(e, breadcrumbContainer);
        });
      });

      // bind resize event to check breadcrumb width
      window.addEventListener('resize', lodash_debounce(function () {
        breadcrumbContainers.forEach(eventResize);
      }, 100, { maxWait: 300 }));
    }

    // UNBIND EVENTS
    function unbindBreadcrumbEvents(breadcrumbContainer) {
      var expands = queryAll(expandButtonSelector, breadcrumbContainer);
      // unbind click event for expand
      expands.forEach(function (expand) {
        expand.removeEventListener('click', function (e) {
          return eventExpandClick(e, breadcrumbContainer);
        });
      });

      // unbind resize event to check breadcrumb width
      window.removeEventListener('resize', lodash_debounce(function () {
        breadcrumbContainers.forEach(eventResize);
      }, 100, { maxWait: 300 }));
    }

    // DESTROY
    function destroy() {
      if (breadcrumbContainers.length) {
        breadcrumbContainers.forEach(function (breadcrumbContainer) {
          unbindBreadcrumbEvents(breadcrumbContainer);
        });
      }
    }

    // INIT
    function init() {
      if (breadcrumbContainers.length) {
        breadcrumbContainers.forEach(function (breadcrumbContainer) {
          initEllipsis(breadcrumbContainer);
          bindBreadcrumbEvents(breadcrumbContainer);

          // trigger resize event once
          eventResize(breadcrumbContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * @param {object} options Object containing configuration overrides
   */
  var carousels = function carousels() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selectorId = _ref.selectorId,
        selectorId = _ref$selectorId === undefined ? 'ecl-carousel' : _ref$selectorId;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window)) {
      return null;
    }

    // SETUP
    var currentSlide = 0;
    var carousel = document.getElementById(selectorId);
    var slides = queryAll('.ecl-carousel__item', carousel);
    var list = carousel.querySelector('.ecl-carousel__list');

    function getListItemWidth() {
      return carousel.querySelector('.ecl-carousel__item').offsetWidth;
    }

    function goToSlide(n) {
      slides[currentSlide].classList.remove('ecl-carousel__item--showing');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('ecl-carousel__item--showing');
    }

    function setOffset() {
      var itemWidth = getListItemWidth();
      var tr = 'translate3d(' + -currentSlide * itemWidth + 'px, 0, 0)';

      list.style.MozTransform = tr; /* FF */
      list.style.msTransform = tr; /* IE (9+) */
      list.style.OTransform = tr; /* Opera */
      list.style.WebkitTransform = tr; /* Safari + Chrome */
      list.style.transform = tr;
    }

    function announceCurrentSlide() {
      carousel.querySelector('.ecl-carousel__meta-slide').textContent = currentSlide + 1 + ' / ' + slides.length;
    }

    function showImageInformation() {
      // Reset/Hide all.
      var infoAreas = queryAll('[data-image]');
      // If anything is visible.
      if (infoAreas) {
        // eslint-disable-next-line
        infoAreas.forEach(function (area) {
          return area.style.display = 'none';
        });
      }

      carousel.querySelector('[data-image="' + currentSlide + '"]').style.display = 'block';
    }

    function previousSlide() {
      goToSlide(currentSlide - 1);
      setOffset();
      announceCurrentSlide();
      showImageInformation();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
      setOffset();
      announceCurrentSlide();
      showImageInformation();
    }

    // Attach controls to a carousel.
    function addCarouselControls() {
      var navControls = document.createElement('ul');

      navControls.className = 'ecl-carousel__controls ecl-list--unstyled';

      navControls.innerHTML = '\n      <li>\n        <button type="button" class="ecl-icon ecl-icon--left ecl-carousel__button ecl-carousel__button--previous">\n          <span class="ecl-u-sr-only">Previous</span></button>\n      </li>\n      <li>\n        <button type="button" class="ecl-icon ecl-icon--right ecl-carousel__button ecl-carousel__button--next">\n          <span class="ecl-u-sr-only">Next</span>\n        </button>\n      </li>\n    ';

      navControls.querySelector('.ecl-carousel__button--previous', '.ecl-carousel__controls').addEventListener('click', previousSlide);

      navControls.querySelector('.ecl-carousel__button--next', '.ecl-carousel__controls').addEventListener('click', nextSlide);

      carousel.querySelector('.ecl-carousel__list-wrapper').appendChild(navControls);
    }

    function removeCarouselControls() {
      var controls = carousel.querySelector('.ecl-carousel__controls');
      carousel.querySelector('.ecl-carousel__list-wrapper').removeChild(controls);
    }

    function addLiveRegion() {
      var liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.classList.add('ecl-carousel__meta-slide');
      carousel.querySelector('.ecl-carousel__live-region').appendChild(liveRegion);
    }

    function removeLiveRegion() {
      var liveRegion = carousel.querySelector('.ecl-carousel__meta-slide');
      carousel.querySelector('.ecl-carousel__live-region').removeChild(liveRegion);
    }

    var debounceCb = function debounceCb() {
      return lodash_debounce(function () {
        setOffset();
      }, 100, { maxWait: 300 })();
    };

    // INIT
    function init() {
      addCarouselControls();
      addLiveRegion();
      goToSlide(0);
      announceCurrentSlide();
      showImageInformation();

      // Re-align on resize.
      window.addEventListener('resize', debounceCb);
    }

    // DESTROY
    function destroy() {
      removeCarouselControls();
      removeLiveRegion();
      window.removeEventListener('resize', debounceCb);
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * Contextual navigation scripts
   */

  var expandContextualNav = function expandContextualNav(contextualNav, button) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$classToRemove = _ref.classToRemove,
        classToRemove = _ref$classToRemove === undefined ? 'ecl-context-nav__item--over-limit' : _ref$classToRemove,
        _ref$hiddenElementsSe = _ref.hiddenElementsSelector,
        hiddenElementsSelector = _ref$hiddenElementsSe === undefined ? '.ecl-context-nav__item--over-limit' : _ref$hiddenElementsSe,
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context;

    if (!contextualNav) {
      return;
    }

    var hiddenElements = queryAll(hiddenElementsSelector, context);

    // Remove extra class
    hiddenElements.forEach(function (element) {
      element.classList.remove(classToRemove);
    });

    // Remove buttton
    button.parentNode.removeChild(button);
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var contextualNavs = function contextualNavs() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === undefined ? '.ecl-context-nav' : _ref2$selector,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === undefined ? '.ecl-context-nav__more' : _ref2$buttonSelector,
        _ref2$hiddenElementsS = _ref2.hiddenElementsSelector,
        hiddenElementsSelector = _ref2$hiddenElementsS === undefined ? '.ecl-context-nav__item--over-limit' : _ref2$hiddenElementsS,
        _ref2$classToRemove = _ref2.classToRemove,
        classToRemove = _ref2$classToRemove === undefined ? 'ecl-context-nav__item--over-limit' : _ref2$classToRemove,
        _ref2$context = _ref2.context,
        context = _ref2$context === undefined ? document : _ref2$context;

    var nodesArray = queryAll(selector, context);

    nodesArray.forEach(function (node) {
      var button = context.querySelector(buttonSelector);

      if (button) {
        button.addEventListener('click', function () {
          return expandContextualNav(node, button, {
            classToRemove: classToRemove,
            hiddenElementsSelector: hiddenElementsSelector
          });
        });
      }
    });
  };

  /**
   * `Node#contains()` polyfill.
   *
   * See: http://compatibility.shwups-cms.ch/en/polyfills/?&id=1
   *
   * @param {Node} node
   * @param {Node} other
   * @return {Boolean}
   * @public
   */

  function contains(node, other) {
    // eslint-disable-next-line no-bitwise
    return node === other || !!(node.compareDocumentPosition(other) & 16);
  }

  var dropdown = function dropdown(selector) {
    var dropdownsArray = Array.prototype.slice.call(document.querySelectorAll(selector));

    document.addEventListener('click', function (event) {
      dropdownsArray.forEach(function (dropdownSelection) {
        var isInside = contains(dropdownSelection, event.target);

        if (!isInside) {
          var dropdownButton = document.querySelector(selector + ' > [aria-expanded=true]');
          var dropdownBody = document.querySelector(selector + ' > [aria-hidden=false]');
          // If the body of the dropdown is visible, then toggle.
          if (dropdownBody) {
            dropdownButton.setAttribute('aria-expanded', false);
            dropdownBody.setAttribute('aria-hidden', true);
          }
        }
      });
    });
  };

  /**
   * @param {object} options Object containing configuration overrides
   *
   * Available options:
   * - options.triggerElementsSelector - any selector to which event listeners
   * are attached. When clicked on any element with such a selector, a dialog opens.
   *
   * - options.dialogWindowId - id of target dialog window. Defaults to `ecl-dialog`.
   *
   * - options.dialogOverlayId - id of target dialog window. Defaults to `ecl-overlay`.
   * Overlay element is created in the document if not provided by the user.
   */
  var dialogs = function dialogs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$triggerElementsS = _ref.triggerElementsSelector,
        triggerElementsSelector = _ref$triggerElementsS === undefined ? '[data-ecl-dialog]' : _ref$triggerElementsS,
        _ref$dialogWindowId = _ref.dialogWindowId,
        dialogWindowId = _ref$dialogWindowId === undefined ? 'ecl-dialog' : _ref$dialogWindowId,
        _ref$dialogOverlayId = _ref.dialogOverlayId,
        dialogOverlayId = _ref$dialogOverlayId === undefined ? 'ecl-overlay' : _ref$dialogOverlayId;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window)) {
      return null;
    }

    // SETUP
    var triggerElements = queryAll(triggerElementsSelector);
    var dialogWindow = document.getElementById(dialogWindowId);
    var dialogOverlay = document.getElementById(dialogOverlayId);

    // Create an overlay element if the user does not supply one.
    if (!dialogOverlay) {
      var element = document.createElement('div');
      element.setAttribute('id', 'ecl-overlay');
      element.setAttribute('class', 'ecl-dialog__overlay');
      element.setAttribute('aria-hidden', 'true');
      document.body.appendChild(element);
      dialogOverlay = element;
    }

    // What we can focus on in the modal.
    var focusableElements = [].slice.call(queryAll('\n        a[href],\n        area[href],\n        input:not([disabled]),\n        select:not([disabled]),\n        textarea:not([disabled]),\n        button:not([disabled]),\n        [tabindex="0"]\n      ', dialogWindow));

    // Use this variable to return focus on element after dialog being closed.
    var focusedElBeforeOpen = null;

    // Specific elements to take care when openning and closing the dialog.
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    // EVENTS
    // Hide dialog and overlay elements.
    function close(event) {
      event.preventDefault();
      dialogWindow.setAttribute('aria-hidden', true);
      dialogOverlay.setAttribute('aria-hidden', true);

      if (focusedElBeforeOpen) {
        focusedElBeforeOpen.focus();
      }

      document.querySelector('body').classList.remove('ecl-u-disablescroll');
    }

    // Keyboard behaviors.
    function handleKeyDown(e) {
      var KEY_TAB = 9;
      var KEY_ESC = 27;

      function handleBackwardTab() {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      }

      function handleForwardTab() {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }

      switch (e.keyCode) {
        // Keep tabbing in the scope of the dialog.
        case KEY_TAB:
          if (focusableElements.length === 1) {
            e.preventDefault();
            break;
          }
          if (e.shiftKey) {
            handleBackwardTab();
          } else {
            handleForwardTab();
          }
          break;
        case KEY_ESC:
          close();
          break;
        default:
          break;
      }
    }

    // Show dialog and overlay elements.
    function open(event) {
      event.preventDefault();
      dialogWindow.setAttribute('aria-hidden', false);
      dialogOverlay.setAttribute('aria-hidden', false);

      // This is the element to have the focus after closing the dialog.
      // Usually the element which triggered the dialog.
      focusedElBeforeOpen = document.activeElement;

      // Focus on the first element in the dialog.
      firstFocusableElement.focus();

      // Close dialog when clicked out of the dialog window.
      dialogOverlay.addEventListener('click', close);

      // Handle tabbing, esc and keyboard in the dialog window.
      dialogWindow.addEventListener('keydown', handleKeyDown);

      document.querySelector('body').classList.add('ecl-u-disablescroll');
    }

    // BIND EVENTS
    function bindDialogEvents(elements) {
      elements.forEach(function (element) {
        return element.addEventListener('click', open);
      });

      // const closeButtons = document.querySelectorAll('.ecl-dialog__dismiss');
      queryAll('.ecl-dialog__dismiss').forEach(function (button) {
        button.addEventListener('click', close);
      });
    }

    // UNBIND EVENTS
    function unbindDialogEvents(elements) {
      elements.forEach(function (element) {
        return element.removeEventListener('click', open);
      });

      // const closeButtons = document.querySelectorAll('.ecl-dialog__dismiss');
      queryAll('.ecl-dialog__dismiss').forEach(function (button) {
        button.removeEventListener('click', close);
      });
    }

    // DESTROY
    function destroy() {
      unbindDialogEvents(triggerElements);
    }

    // INIT
    function init() {
      if (triggerElements.length) {
        bindDialogEvents(triggerElements);
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /* eslint-disable no-param-reassign */

  var toggleExpandable = function toggleExpandable(toggleElement) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context,
        _ref$forceClose = _ref.forceClose,
        forceClose = _ref$forceClose === undefined ? false : _ref$forceClose,
        _ref$closeSiblings = _ref.closeSiblings,
        closeSiblings = _ref$closeSiblings === undefined ? false : _ref$closeSiblings,
        _ref$siblingsSelector = _ref.siblingsSelector,
        siblingsSelector = _ref$siblingsSelector === undefined ? '[aria-controls][aria-expanded]' : _ref$siblingsSelector;

    if (!toggleElement) {
      return;
    }

    // Get target element
    var target = document.getElementById(toggleElement.getAttribute('aria-controls'));

    // Exit if no target found
    if (!target) {
      return;
    }

    // Get current status
    var isExpanded = forceClose === true || toggleElement.getAttribute('aria-expanded') === 'true';

    // Toggle the expandable/collapsible
    toggleElement.setAttribute('aria-expanded', !isExpanded);
    target.setAttribute('aria-hidden', isExpanded);

    // Toggle label if possible
    if (!isExpanded && toggleElement.hasAttribute('data-label-expanded')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-expanded');
    } else if (isExpanded && toggleElement.hasAttribute('data-label-collapsed')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-collapsed');
    }

    // Close siblings if requested
    if (closeSiblings === true) {
      var siblingsArray = Array.prototype.slice.call(context.querySelectorAll(siblingsSelector)).filter(function (sibling) {
        return sibling !== toggleElement;
      });

      siblingsArray.forEach(function (sibling) {
        toggleExpandable(sibling, {
          context: context,
          forceClose: true
        });
      });
    }
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var initExpandables = function initExpandables(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    // Exit if no selector was provided
    if (!selector) return;

    var nodesArray = Array.prototype.slice.call(context.querySelectorAll(selector));

    nodesArray.forEach(function (node) {
      return node.addEventListener('click', function (e) {
        toggleExpandable(node, { context: context });
        e.preventDefault();
      });
    });
  };

  /**
   * File uploads related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var fileUploads = function fileUploads() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-file-upload' : _ref$selector,
        _ref$inputSelector = _ref.inputSelector,
        inputSelector = _ref$inputSelector === undefined ? '.ecl-file-upload__input' : _ref$inputSelector,
        _ref$valueSelector = _ref.valueSelector,
        valueSelector = _ref$valueSelector === undefined ? '.ecl-file-upload__value' : _ref$valueSelector,
        _ref$browseSelector = _ref.browseSelector,
        browseSelector = _ref$browseSelector === undefined ? '.ecl-file-upload__browse' : _ref$browseSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set file upload element NodeLists
    var fileUploadContainers = queryAll(selector);

    // ACTIONS
    function updateFileName(element, files) {
      if (files.length === 0) return;

      var filename = '';

      for (var i = 0; i < files.length; i += 1) {
        var file = files[i];
        if ('name' in file) {
          if (i > 0) {
            filename += ', ';
          }
          filename += file.name;
        }
      }

      // Show the selected filename in the field.
      var messageElement = element;
      messageElement.innerHTML = filename;
    }

    // EVENTS
    function eventValueChange(e) {
      if ('files' in e.target) {
        var fileUploadElements = queryAll(valueSelector, e.target.parentNode);

        fileUploadElements.forEach(function (fileUploadElement) {
          updateFileName(fileUploadElement, e.target.files);
        });
      }
    }

    function eventBrowseKeydown(e) {
      // collect header targets, and their prev/next
      var isModifierKey = e.metaKey || e.altKey;

      var inputElements = queryAll(inputSelector, e.target.parentNode);

      inputElements.forEach(function (inputElement) {
        // don't catch key events when ⌘ or Alt modifier is present
        if (isModifierKey) return;

        // catch enter/space, left/right and up/down arrow key events
        // if new panel show it, if next/prev move focus
        switch (e.keyCode) {
          case 13:
          case 32:
            e.preventDefault();
            inputElement.click();
            break;
          default:
            break;
        }
      });
    }

    // BIND EVENTS
    function bindFileUploadEvents(fileUploadContainer) {
      // bind all file upload change events
      var fileUploadInputs = queryAll(inputSelector, fileUploadContainer);
      fileUploadInputs.forEach(function (fileUploadInput) {
        fileUploadInput.addEventListener('change', eventValueChange);
      });

      // bind all file upload keydown events
      var fileUploadBrowses = queryAll(browseSelector, fileUploadContainer);
      fileUploadBrowses.forEach(function (fileUploadBrowse) {
        fileUploadBrowse.addEventListener('keydown', eventBrowseKeydown);
      });
    }

    // UNBIND EVENTS
    function unbindFileUploadEvents(fileUploadContainer) {
      var fileUploadInputs = queryAll(inputSelector, fileUploadContainer);
      // unbind all file upload change events
      fileUploadInputs.forEach(function (fileUploadInput) {
        fileUploadInput.removeEventListener('change', eventValueChange);
      });

      var fileUploadBrowses = queryAll(browseSelector, fileUploadContainer);
      // bind all file upload keydown events
      fileUploadBrowses.forEach(function (fileUploadBrowse) {
        fileUploadBrowse.removeEventListener('keydown', eventBrowseKeydown);
      });
    }

    // DESTROY
    function destroy() {
      fileUploadContainers.forEach(function (fileUploadContainer) {
        unbindFileUploadEvents(fileUploadContainer);
      });
    }

    // INIT
    function init() {
      if (fileUploadContainers.length) {
        fileUploadContainers.forEach(function (fileUploadContainer) {
          bindFileUploadEvents(fileUploadContainer);
        });
      }
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var eclLangSelectPages = function eclLangSelectPages() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-lang-select-page' : _ref$selector,
        _ref$toggleClass = _ref.toggleClass,
        toggleClass = _ref$toggleClass === undefined ? 'ecl-lang-select-page--dropdown' : _ref$toggleClass,
        _ref$listSelector = _ref.listSelector,
        listSelector = _ref$listSelector === undefined ? '.ecl-lang-select-page__list' : _ref$listSelector,
        _ref$dropdownSelector = _ref.dropdownSelector,
        dropdownSelector = _ref$dropdownSelector === undefined ? '.ecl-lang-select-page__dropdown' : _ref$dropdownSelector,
        _ref$dropdownOnChange = _ref.dropdownOnChange,
        dropdownOnChange = _ref$dropdownOnChange === undefined ? undefined : _ref$dropdownOnChange;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    var langSelectPagesContainers = queryAll(selector);

    function toggle(lsp) {
      if (!lsp) return null;

      var list = queryAll(listSelector, lsp)[0];

      if (!lsp.classList.contains(toggleClass)) {
        if (list && list.offsetLeft + list.offsetWidth > lsp.offsetWidth) {
          lsp.classList.add(toggleClass);
        }
      } else {
        var dropdown = queryAll(dropdownSelector, lsp)[0];
        if (dropdown.offsetLeft + list.offsetWidth < lsp.offsetWidth) {
          lsp.classList.remove(toggleClass);
        }
      }

      return true;
    }

    function init() {
      // On load
      langSelectPagesContainers.forEach(function (lsp) {
        toggle(lsp);

        if (dropdownOnChange) {
          var dropdown = queryAll(dropdownSelector, lsp)[0];

          if (dropdown) {
            dropdown.addEventListener('change', dropdownOnChange);
          }
        }
      });

      window.addEventListener('resize', lodash_debounce(function () {
        langSelectPagesContainers.forEach(toggle);
      }, 100, { maxWait: 300 }));
    }

    return init();
  };

  /*
   * Messages behavior
   */

  // Dismiss a selected message.
  function dismissMessage(message) {
    if (message && message.parentNode !== null) {
      message.parentNode.removeChild(message);
    }
  }

  // Helper method to automatically attach the event listener to all the messages on page load
  function initMessages() {
    var selectorClass = 'ecl-message__dismiss';

    var messages = Array.prototype.slice.call(document.getElementsByClassName(selectorClass));

    messages.forEach(function (message) {
      return message.addEventListener('click', function () {
        return dismissMessage(message.parentElement);
      });
    });
  }

  /*
   * Messages behavior
   */

  var stickyfill = createCommonjsModule(function (module) {
  (function (window, document) {

          /*
           * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
           *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
           *    of the polyfill, but the API will remain functional to avoid breaking things.
           */

          var _createClass = function () {
              function defineProperties(target, props) {
                  for (var i = 0; i < props.length; i++) {
                      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
                  }
              }return function (Constructor, protoProps, staticProps) {
                  if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
              };
          }();

          function _classCallCheck(instance, Constructor) {
              if (!(instance instanceof Constructor)) {
                  throw new TypeError("Cannot call a class as a function");
              }
          }

          var seppuku = false;

          // The polyfill cant’t function properly without `getComputedStyle`.
          if (!window.getComputedStyle) seppuku = true;
          // Dont’t get in a way if the browser supports `position: sticky` natively.
          else {
                  var testNode = document.createElement('div');

                  if (['', '-webkit-', '-moz-', '-ms-'].some(function (prefix) {
                      try {
                          testNode.style.position = prefix + 'sticky';
                      } catch (e) {}

                      return testNode.style.position != '';
                  })) seppuku = true;
              }

          /*
           * 2. “Global” vars used across the polyfill
           */

          // Check if Shadow Root constructor exists to make further checks simpler
          var shadowRootExists = typeof ShadowRoot !== 'undefined';

          // Last saved scroll position
          var scroll = {
              top: null,
              left: null
          };

          // Array of created Sticky instances
          var stickies = [];

          /*
           * 3. Utility functions
           */
          function extend(targetObj, sourceObject) {
              for (var key in sourceObject) {
                  if (sourceObject.hasOwnProperty(key)) {
                      targetObj[key] = sourceObject[key];
                  }
              }
          }

          function parseNumeric(val) {
              return parseFloat(val) || 0;
          }

          function getDocOffsetTop(node) {
              var docOffsetTop = 0;

              while (node) {
                  docOffsetTop += node.offsetTop;
                  node = node.offsetParent;
              }

              return docOffsetTop;
          }

          /*
           * 4. Sticky class
           */

          var Sticky = function () {
              function Sticky(node) {
                  _classCallCheck(this, Sticky);

                  if (!(node instanceof HTMLElement)) throw new Error('First argument must be HTMLElement');
                  if (stickies.some(function (sticky) {
                      return sticky._node === node;
                  })) throw new Error('Stickyfill is already applied to this node');

                  this._node = node;
                  this._stickyMode = null;
                  this._active = false;

                  stickies.push(this);

                  this.refresh();
              }

              _createClass(Sticky, [{
                  key: 'refresh',
                  value: function refresh() {
                      if (seppuku || this._removed) return;
                      if (this._active) this._deactivate();

                      var node = this._node;

                      /*
                       * 1. Save node computed props
                       */
                      var nodeComputedStyle = getComputedStyle(node);
                      var nodeComputedProps = {
                          top: nodeComputedStyle.top,
                          display: nodeComputedStyle.display,
                          marginTop: nodeComputedStyle.marginTop,
                          marginBottom: nodeComputedStyle.marginBottom,
                          marginLeft: nodeComputedStyle.marginLeft,
                          marginRight: nodeComputedStyle.marginRight,
                          cssFloat: nodeComputedStyle.cssFloat
                      };

                      /*
                       * 2. Check if the node can be activated
                       */
                      if (isNaN(parseFloat(nodeComputedProps.top)) || nodeComputedProps.display == 'table-cell' || nodeComputedProps.display == 'none') return;

                      this._active = true;

                      /*
                       * 3. Get necessary node parameters
                       */
                      var referenceNode = node.parentNode;
                      var parentNode = shadowRootExists && referenceNode instanceof ShadowRoot ? referenceNode.host : referenceNode;
                      var nodeWinOffset = node.getBoundingClientRect();
                      var parentWinOffset = parentNode.getBoundingClientRect();
                      var parentComputedStyle = getComputedStyle(parentNode);

                      this._parent = {
                          node: parentNode,
                          styles: {
                              position: parentNode.style.position
                          },
                          offsetHeight: parentNode.offsetHeight
                      };
                      this._offsetToWindow = {
                          left: nodeWinOffset.left,
                          right: document.documentElement.clientWidth - nodeWinOffset.right
                      };
                      this._offsetToParent = {
                          top: nodeWinOffset.top - parentWinOffset.top - parseNumeric(parentComputedStyle.borderTopWidth),
                          left: nodeWinOffset.left - parentWinOffset.left - parseNumeric(parentComputedStyle.borderLeftWidth),
                          right: -nodeWinOffset.right + parentWinOffset.right - parseNumeric(parentComputedStyle.borderRightWidth)
                      };
                      this._styles = {
                          position: node.style.position,
                          top: node.style.top,
                          bottom: node.style.bottom,
                          left: node.style.left,
                          right: node.style.right,
                          width: node.style.width,
                          marginTop: node.style.marginTop,
                          marginLeft: node.style.marginLeft,
                          marginRight: node.style.marginRight
                      };

                      var nodeTopValue = parseNumeric(nodeComputedProps.top);
                      this._limits = {
                          start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
                          end: parentWinOffset.top + window.pageYOffset + parentNode.offsetHeight - parseNumeric(parentComputedStyle.borderBottomWidth) - node.offsetHeight - nodeTopValue - parseNumeric(nodeComputedProps.marginBottom)
                      };

                      /*
                       * 4. Ensure that the node will be positioned relatively to the parent node
                       */
                      var parentPosition = parentComputedStyle.position;

                      if (parentPosition != 'absolute' && parentPosition != 'relative') {
                          parentNode.style.position = 'relative';
                      }

                      /*
                       * 5. Recalc node position.
                       *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
                       */
                      this._recalcPosition();

                      /*
                       * 6. Create a clone
                       */
                      var clone = this._clone = {};
                      clone.node = document.createElement('div');

                      // Apply styles to the clone
                      extend(clone.node.style, {
                          width: nodeWinOffset.right - nodeWinOffset.left + 'px',
                          height: nodeWinOffset.bottom - nodeWinOffset.top + 'px',
                          marginTop: nodeComputedProps.marginTop,
                          marginBottom: nodeComputedProps.marginBottom,
                          marginLeft: nodeComputedProps.marginLeft,
                          marginRight: nodeComputedProps.marginRight,
                          cssFloat: nodeComputedProps.cssFloat,
                          padding: 0,
                          border: 0,
                          borderSpacing: 0,
                          fontSize: '1em',
                          position: 'static'
                      });

                      referenceNode.insertBefore(clone.node, node);
                      clone.docOffsetTop = getDocOffsetTop(clone.node);
                  }
              }, {
                  key: '_recalcPosition',
                  value: function _recalcPosition() {
                      if (!this._active || this._removed) return;

                      var stickyMode = scroll.top <= this._limits.start ? 'start' : scroll.top >= this._limits.end ? 'end' : 'middle';

                      if (this._stickyMode == stickyMode) return;

                      switch (stickyMode) {
                          case 'start':
                              extend(this._node.style, {
                                  position: 'absolute',
                                  left: this._offsetToParent.left + 'px',
                                  right: this._offsetToParent.right + 'px',
                                  top: this._offsetToParent.top + 'px',
                                  bottom: 'auto',
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0,
                                  marginTop: 0
                              });
                              break;

                          case 'middle':
                              extend(this._node.style, {
                                  position: 'fixed',
                                  left: this._offsetToWindow.left + 'px',
                                  right: this._offsetToWindow.right + 'px',
                                  top: this._styles.top,
                                  bottom: 'auto',
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0,
                                  marginTop: 0
                              });
                              break;

                          case 'end':
                              extend(this._node.style, {
                                  position: 'absolute',
                                  left: this._offsetToParent.left + 'px',
                                  right: this._offsetToParent.right + 'px',
                                  top: 'auto',
                                  bottom: 0,
                                  width: 'auto',
                                  marginLeft: 0,
                                  marginRight: 0
                              });
                              break;
                      }

                      this._stickyMode = stickyMode;
                  }
              }, {
                  key: '_fastCheck',
                  value: function _fastCheck() {
                      if (!this._active || this._removed) return;

                      if (Math.abs(getDocOffsetTop(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) this.refresh();
                  }
              }, {
                  key: '_deactivate',
                  value: function _deactivate() {
                      var _this = this;

                      if (!this._active || this._removed) return;

                      this._clone.node.parentNode.removeChild(this._clone.node);
                      delete this._clone;

                      extend(this._node.style, this._styles);
                      delete this._styles;

                      // Check whether element’s parent node is used by other stickies.
                      // If not, restore parent node’s styles.
                      if (!stickies.some(function (sticky) {
                          return sticky !== _this && sticky._parent && sticky._parent.node === _this._parent.node;
                      })) {
                          extend(this._parent.node.style, this._parent.styles);
                      }
                      delete this._parent;

                      this._stickyMode = null;
                      this._active = false;

                      delete this._offsetToWindow;
                      delete this._offsetToParent;
                      delete this._limits;
                  }
              }, {
                  key: 'remove',
                  value: function remove() {
                      var _this2 = this;

                      this._deactivate();

                      stickies.some(function (sticky, index) {
                          if (sticky._node === _this2._node) {
                              stickies.splice(index, 1);
                              return true;
                          }
                      });

                      this._removed = true;
                  }
              }]);

              return Sticky;
          }();

          /*
           * 5. Stickyfill API
           */

          var Stickyfill = {
              stickies: stickies,
              Sticky: Sticky,

              addOne: function addOne(node) {
                  // Check whether it’s a node
                  if (!(node instanceof HTMLElement)) {
                      // Maybe it’s a node list of some sort?
                      // Take first node from the list then
                      if (node.length && node[0]) node = node[0];else return;
                  }

                  // Check if Stickyfill is already applied to the node
                  // and return existing sticky
                  for (var i = 0; i < stickies.length; i++) {
                      if (stickies[i]._node === node) return stickies[i];
                  }

                  // Create and return new sticky
                  return new Sticky(node);
              },
              add: function add(nodeList) {
                  // If it’s a node make an array of one node
                  if (nodeList instanceof HTMLElement) nodeList = [nodeList];
                  // Check if the argument is an iterable of some sort
                  if (!nodeList.length) return;

                  // Add every element as a sticky and return an array of created Sticky instances
                  var addedStickies = [];

                  var _loop = function _loop(i) {
                      var node = nodeList[i];

                      // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
                      // correlation with input list
                      if (!(node instanceof HTMLElement)) {
                          addedStickies.push(void 0);
                          return 'continue';
                      }

                      // If Stickyfill is already applied to the node
                      // add existing sticky
                      if (stickies.some(function (sticky) {
                          if (sticky._node === node) {
                              addedStickies.push(sticky);
                              return true;
                          }
                      })) return 'continue';

                      // Create and add new sticky
                      addedStickies.push(new Sticky(node));
                  };

                  for (var i = 0; i < nodeList.length; i++) {
                      var _ret = _loop(i);

                      if (_ret === 'continue') continue;
                  }

                  return addedStickies;
              },
              refreshAll: function refreshAll() {
                  stickies.forEach(function (sticky) {
                      return sticky.refresh();
                  });
              },
              removeOne: function removeOne(node) {
                  // Check whether it’s a node
                  if (!(node instanceof HTMLElement)) {
                      // Maybe it’s a node list of some sort?
                      // Take first node from the list then
                      if (node.length && node[0]) node = node[0];else return;
                  }

                  // Remove the stickies bound to the nodes in the list
                  stickies.some(function (sticky) {
                      if (sticky._node === node) {
                          sticky.remove();
                          return true;
                      }
                  });
              },
              remove: function remove(nodeList) {
                  // If it’s a node make an array of one node
                  if (nodeList instanceof HTMLElement) nodeList = [nodeList];
                  // Check if the argument is an iterable of some sort
                  if (!nodeList.length) return;

                  // Remove the stickies bound to the nodes in the list

                  var _loop2 = function _loop2(i) {
                      var node = nodeList[i];

                      stickies.some(function (sticky) {
                          if (sticky._node === node) {
                              sticky.remove();
                              return true;
                          }
                      });
                  };

                  for (var i = 0; i < nodeList.length; i++) {
                      _loop2(i);
                  }
              },
              removeAll: function removeAll() {
                  while (stickies.length) {
                      stickies[0].remove();
                  }
              }
          };

          /*
           * 6. Setup events (unless the polyfill was disabled)
           */
          function init() {
              // Watch for scroll position changes and trigger recalc/refresh if needed
              function checkScroll() {
                  if (window.pageXOffset != scroll.left) {
                      scroll.top = window.pageYOffset;
                      scroll.left = window.pageXOffset;

                      Stickyfill.refreshAll();
                  } else if (window.pageYOffset != scroll.top) {
                      scroll.top = window.pageYOffset;
                      scroll.left = window.pageXOffset;

                      // recalc position for all stickies
                      stickies.forEach(function (sticky) {
                          return sticky._recalcPosition();
                      });
                  }
              }

              checkScroll();
              window.addEventListener('scroll', checkScroll);

              // Watch for window resizes and device orientation changes and trigger refresh
              window.addEventListener('resize', Stickyfill.refreshAll);
              window.addEventListener('orientationchange', Stickyfill.refreshAll);

              //Fast dirty check for layout changes every 500ms
              var fastCheckTimer = void 0;

              function startFastCheckTimer() {
                  fastCheckTimer = setInterval(function () {
                      stickies.forEach(function (sticky) {
                          return sticky._fastCheck();
                      });
                  }, 500);
              }

              function stopFastCheckTimer() {
                  clearInterval(fastCheckTimer);
              }

              var docHiddenKey = void 0;
              var visibilityChangeEventName = void 0;

              if ('hidden' in document) {
                  docHiddenKey = 'hidden';
                  visibilityChangeEventName = 'visibilitychange';
              } else if ('webkitHidden' in document) {
                  docHiddenKey = 'webkitHidden';
                  visibilityChangeEventName = 'webkitvisibilitychange';
              }

              if (visibilityChangeEventName) {
                  if (!document[docHiddenKey]) startFastCheckTimer();

                  document.addEventListener(visibilityChangeEventName, function () {
                      if (document[docHiddenKey]) {
                          stopFastCheckTimer();
                      } else {
                          startFastCheckTimer();
                      }
                  });
              } else startFastCheckTimer();
          }

          if (!seppuku) init();

          /*
           * 7. Expose Stickyfill
           */
          if ('object' != 'undefined' && module.exports) {
              module.exports = Stickyfill;
          } else {
              window.Stickyfill = Stickyfill;
          }
      })(window, document);
  });

  var gumshoe_min = createCommonjsModule(function (module, exports) {
    /*! gumshoejs v3.5.0 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/gumshoe */
    !function (e, t) {
      "function" == typeof undefined && undefined.amd ? undefined([], t(e)) : module.exports = t(e);
    }("undefined" != typeof commonjsGlobal ? commonjsGlobal : commonjsGlobal.window || commonjsGlobal.global, function (e) {
      var t,
          n,
          o,
          r,
          a,
          c,
          i,
          l = {},
          s = "querySelector" in document && "addEventListener" in e && "classList" in document.createElement("_"),
          u = [],
          f = { selector: "[data-gumshoe] a", selectorHeader: "[data-gumshoe-header]", container: e, offset: 0, activeClass: "active", scrollDelay: !1, callback: function callback() {} },
          d = function d(e, t, n) {
        if ("[object Object]" === Object.prototype.toString.call(e)) for (var o in e) {
          Object.prototype.hasOwnProperty.call(e, o) && t.call(n, e[o], o, e);
        } else for (var r = 0, a = e.length; r < a; r++) {
          t.call(n, e[r], r, e);
        }
      },
          v = function v() {
        var e = {},
            t = !1,
            n = 0,
            o = arguments.length;"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], n++);for (; n < o; n++) {
          var r = arguments[n];!function (n) {
            for (var o in n) {
              Object.prototype.hasOwnProperty.call(n, o) && (t && "[object Object]" === Object.prototype.toString.call(n[o]) ? e[o] = v(!0, e[o], n[o]) : e[o] = n[o]);
            }
          }(r);
        }return e;
      },
          m = function m(e) {
        return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight);
      },
          g = function g() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      },
          h = function h(e) {
        var n = 0;if (e.offsetParent) do {
          n += e.offsetTop, e = e.offsetParent;
        } while (e);else n = e.offsetTop;return n = n - a - t.offset, n >= 0 ? n : 0;
      },
          p = function p(t) {
        var n = t.getBoundingClientRect();return n.top >= 0 && n.left >= 0 && n.bottom <= (e.innerHeight || document.documentElement.clientHeight) && n.right <= (e.innerWidth || document.documentElement.clientWidth);
      },
          y = function y() {
        u.sort(function (e, t) {
          return e.distance > t.distance ? -1 : e.distance < t.distance ? 1 : 0;
        });
      };l.setDistances = function () {
        o = g(), a = r ? m(r) + h(r) : 0, d(u, function (e) {
          e.distance = h(e.target);
        }), y();
      };var b = function b() {
        var e = document.querySelectorAll(t.selector);d(e, function (e) {
          if (e.hash) {
            var t = document.querySelector(e.hash);t && u.push({ nav: e, target: t, parent: "li" === e.parentNode.tagName.toLowerCase() ? e.parentNode : null, distance: 0 });
          }
        });
      },
          H = function H() {
        c && (c.nav.classList.remove(t.activeClass), c.parent && c.parent.classList.remove(t.activeClass));
      },
          C = function C(e) {
        H(), e.nav.classList.add(t.activeClass), e.parent && e.parent.classList.add(t.activeClass), t.callback(e), c = { nav: e.nav, parent: e.parent };
      };l.getCurrentNav = function () {
        var n = e.pageYOffset;if (e.innerHeight + n >= o && p(u[0].target)) return C(u[0]), u[0];for (var r = 0, a = u.length; r < a; r++) {
          var c = u[r];if (c.distance <= n) return C(c), c;
        }H(), t.callback();
      };var L = function L() {
        d(u, function (e) {
          e.nav.classList.contains(t.activeClass) && (c = { nav: e.nav, parent: e.parent });
        });
      };l.destroy = function () {
        t && (t.container.removeEventListener("resize", j, !1), t.container.removeEventListener("scroll", j, !1), u = [], t = null, n = null, o = null, r = null, a = null, c = null, i = null);
      };var E = function E(e) {
        window.clearTimeout(n), n = setTimeout(function () {
          l.setDistances(), l.getCurrentNav();
        }, 66);
      },
          j = function j(e) {
        n || (n = setTimeout(function () {
          n = null, "scroll" === e.type && l.getCurrentNav(), "resize" === e.type && (l.setDistances(), l.getCurrentNav());
        }, 66));
      };return l.init = function (e) {
        s && (l.destroy(), t = v(f, e || {}), r = document.querySelector(t.selectorHeader), b(), 0 !== u.length && (L(), l.setDistances(), l.getCurrentNav(), t.container.addEventListener("resize", j, !1), t.scrollDelay ? t.container.addEventListener("scroll", E, !1) : t.container.addEventListener("scroll", j, !1)));
      }, l;
    });
  });

  /* eslint-disable no-param-reassign */

  var toggleExpandable$1 = function toggleExpandable(toggleElement) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$context = _ref.context,
        context = _ref$context === undefined ? document : _ref$context,
        _ref$forceClose = _ref.forceClose,
        forceClose = _ref$forceClose === undefined ? false : _ref$forceClose,
        _ref$closeSiblings = _ref.closeSiblings,
        closeSiblings = _ref$closeSiblings === undefined ? false : _ref$closeSiblings,
        _ref$siblingsSelector = _ref.siblingsSelector,
        siblingsSelector = _ref$siblingsSelector === undefined ? '[aria-controls][aria-expanded]' : _ref$siblingsSelector;

    if (!toggleElement) {
      return;
    }

    // Get target element
    var target = document.getElementById(toggleElement.getAttribute('aria-controls'));

    // Exit if no target found
    if (!target) {
      return;
    }

    // Get current status
    var isExpanded = forceClose === true || toggleElement.getAttribute('aria-expanded') === 'true';

    // Toggle the expandable/collapsible
    toggleElement.setAttribute('aria-expanded', !isExpanded);
    target.setAttribute('aria-hidden', isExpanded);

    // Toggle label if possible
    if (!isExpanded && toggleElement.hasAttribute('data-label-expanded')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-expanded');
    } else if (isExpanded && toggleElement.hasAttribute('data-label-collapsed')) {
      toggleElement.innerHTML = toggleElement.getAttribute('data-label-collapsed');
    }

    // Close siblings if requested
    if (closeSiblings === true) {
      var siblingsArray = Array.prototype.slice.call(context.querySelectorAll(siblingsSelector)).filter(function (sibling) {
        return sibling !== toggleElement;
      });

      siblingsArray.forEach(function (sibling) {
        toggleExpandable(sibling, {
          context: context,
          forceClose: true
        });
      });
    }
  };

  /**
   * Navigation inpage related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var navigationInpages = function navigationInpages() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$stickySelector = _ref.stickySelector,
        stickySelector = _ref$stickySelector === undefined ? '.ecl-inpage-navigation' : _ref$stickySelector,
        _ref$spySelector = _ref.spySelector,
        spySelector = _ref$spySelector === undefined ? '.ecl-inpage-navigation__link' : _ref$spySelector,
        _ref$spyClass = _ref.spyClass,
        spyClass = _ref$spyClass === undefined ? 'ecl-inpage-navigation__link--is-active' : _ref$spyClass,
        _ref$spyActiveContain = _ref.spyActiveContainer,
        spyActiveContainer = _ref$spyActiveContain === undefined ? 'ecl-inpage-navigation--visible' : _ref$spyActiveContain,
        _ref$spyTrigger = _ref.spyTrigger,
        spyTrigger = _ref$spyTrigger === undefined ? '.ecl-inpage-navigation__trigger' : _ref$spyTrigger,
        _ref$spyOffset = _ref.spyOffset,
        spyOffset = _ref$spyOffset === undefined ? 20 : _ref$spyOffset,
        _ref$toggleSelector = _ref.toggleSelector,
        toggleSelector = _ref$toggleSelector === undefined ? '.ecl-inpage-navigation__trigger' : _ref$toggleSelector,
        _ref$linksSelector = _ref.linksSelector,
        linksSelector = _ref$linksSelector === undefined ? '.ecl-inpage-navigation__link' : _ref$linksSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    var stickyInstance = void 0;

    // ACTIONS
    function initSticky(element) {
      stickyInstance = new stickyfill.Sticky(element);
    }

    function destroySticky() {
      if (stickyInstance) {
        stickyInstance.remove();
      }
    }

    function initScrollSpy(inpageNavElement) {
      gumshoe_min.init({
        selector: spySelector,
        activeClass: spyClass,
        offset: spyOffset,
        callback: function callback(nav) {
          var navigationTitle = document.querySelector(spyTrigger);

          if (!nav) {
            inpageNavElement.classList.remove(spyActiveContainer);
            navigationTitle.innerHTML = '';
          } else {
            inpageNavElement.classList.add(spyActiveContainer);
            navigationTitle.innerHTML = nav.nav.innerHTML;
          }
        }
      });
    }

    function destroyScrollSpy() {
      gumshoe_min.destroy();
    }

    // Init
    function init() {
      var inpageNavElement = document.querySelector(stickySelector);
      var toggleElement = inpageNavElement.querySelector(toggleSelector);
      var navLinks = queryAll(linksSelector, inpageNavElement);

      initSticky(inpageNavElement);
      initScrollSpy(inpageNavElement);

      toggleElement.addEventListener('click', function (e) {
        toggleExpandable$1(toggleElement, { context: inpageNavElement });
        e.preventDefault();
      });

      navLinks.forEach(function (link) {
        return link.addEventListener('click', function () {
          toggleExpandable$1(toggleElement, {
            context: inpageNavElement,
            forceClose: true
          });
        });
      });
    }

    // Destroy
    function destroy() {
      destroyScrollSpy();
      destroySticky();
    }

    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  var onClick = function onClick(node, menu) {
    return function (e) {
      if (node && node.hasAttribute('aria-haspopup')) {
        var hasPopup = node.getAttribute('aria-haspopup');
        if (hasPopup === '' || hasPopup === 'true') {
          e.preventDefault();

          toggleExpandable$1(node, {
            context: menu,
            closeSiblings: true
          });
        }
      }
    };
  };

  var onKeydown = function onKeydown(node, menu) {
    return function (e) {
      var currentTab = node.parentElement;
      var previousTabItem = currentTab.previousElementSibling || currentTab.parentElement.lastElementChild;
      var nextTabItem = currentTab.nextElementSibling || currentTab.parentElement.firstElementChild;

      // don't catch key events when ⌘ or Alt modifier is present
      if (e.metaKey || e.altKey) return;

      // catch left/right and up/down arrow key events
      // if new next/prev tab available, show it by passing tab anchor to showTab method
      switch (e.keyCode) {
        // ENTER or SPACE
        case 13:
        case 32:
          onClick(e.currentTarget, menu)(e);
          break;
        // ARROWS LEFT and UP
        case 37:
        case 38:
          e.preventDefault();
          previousTabItem.querySelector('a').focus();
          break;
        // ARROWS RIGHT and DOWN
        case 39:
        case 40:
          e.preventDefault();
          nextTabItem.querySelector('a').focus();
          break;
        default:
          break;
      }
    };
  };

  var megamenu = function megamenu() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-navigation-menu' : _ref$selector,
        _ref$toggleSelector = _ref.toggleSelector,
        toggleSelector = _ref$toggleSelector === undefined ? '.ecl-navigation-menu__toggle' : _ref$toggleSelector,
        _ref$listSelector = _ref.listSelector,
        listSelector = _ref$listSelector === undefined ? '.ecl-navigation-menu__root' : _ref$listSelector,
        _ref$linkSelector = _ref.linkSelector,
        linkSelector = _ref$linkSelector === undefined ? '.ecl-navigation-menu__link' : _ref$linkSelector;

    var megamenusArray = queryAll(selector);

    megamenusArray.forEach(function (menu) {
      // Make the toggle expandable
      var toggle = menu.querySelector(toggleSelector);
      if (toggle) {
        toggle.addEventListener('click', function () {
          return toggleExpandable$1(toggle, { context: menu });
        });
      }

      // Get the list of links
      var list = menu.querySelector(listSelector);

      // Get expandables within the list
      var nodesArray = queryAll(linkSelector, list);

      nodesArray.forEach(function (node) {
        node.addEventListener('click', onClick(node, list));
        node.addEventListener('keydown', onKeydown(node, list));
      });
    });
  };

  /**
    stickybits - Stickybits is a lightweight alternative to `position: sticky` polyfills
    @version v3.3.2
    @link https://github.com/dollarshaveclub/stickybits#readme
    @author Jeff Wainwright <yowainwright@gmail.com> (https://jeffry.in)
    @license MIT
  **/
  /*
    STICKYBITS 💉
    --------
    > a lightweight alternative to `position: sticky` polyfills 🍬
    --------
    - each method is documented above it our view the readme
    - Stickybits does not manage polymorphic functionality (position like properties)
    * polymorphic functionality: (in the context of describing Stickybits)
      means making things like `position: sticky` be loosely supported with position fixed.
      It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
    --------
    defaults 🔌
    --------
    - version = `package.json` version
    - userAgent = viewer browser agent
    - target = DOM element selector
    - noStyles = boolean
    - offset = number
    - parentClass = 'string'
    - scrollEl = window || DOM element selector
    - stickyClass = 'string'
    - stuckClass = 'string'
    - useStickyClasses = boolean
    - verticalPosition = 'string'
    --------
    props🔌
    --------
    - p = props {object}
    --------
    instance note
    --------
    - stickybits parent methods return this
    - stickybits instance methods return an instance item
    --------
    nomenclature
    --------
    - target => el => e
    - props => o || p
    - instance => item => it
    --------
    methods
    --------
    - .definePosition = defines sticky or fixed
    - .addInstance = an array of objects for each Stickybits Target
    - .getClosestParent = gets the parent for non-window scroll
    - .getOffsetTop = gets the element offsetTop from the top level of the DOM
    - .computeScrollOffsets = computes scroll position
    - .toggleClasses = older browser toggler
    - .manageState = manages sticky state
    - .removeClass = older browser support class remover
    - .removeInstance = removes an instance
    - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
  */
  var Stickybits =
  /*#__PURE__*/
  function () {
    function Stickybits(target, obj) {
      var o = typeof obj !== 'undefined' ? obj : {};
      this.version = '3.3.2';
      this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || 'js-stickybit-parent',
        scrollEl: document.querySelector(o.scrollEl) || window,
        stickyClass: o.stickyClass || 'js-is-sticky',
        stuckClass: o.stuckClass || 'js-is-stuck',
        stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
        useStickyClasses: o.useStickyClasses || false,
        verticalPosition: o.verticalPosition || 'top'
      };
      var p = this.props;
      /*
        define positionVal
        ----
        -  uses a computed (`.definePosition()`)
        -  defined the position
      */

      p.positionVal = this.definePosition() || 'fixed';
      var vp = p.verticalPosition;
      var ns = p.noStyles;
      var pv = p.positionVal;
      this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in this.els)) this.els = [this.els];
      this.instances = [];

      for (var i = 0; i < this.els.length; i += 1) {
        var el = this.els[i];
        var styles = el.style; // set vertical position

        styles[vp] = vp === 'top' && !ns ? p.stickyBitStickyOffset + "px" : '';
        styles.position = pv !== 'fixed' ? pv : '';

        if (pv === 'fixed' || p.useStickyClasses) {
          var instance = this.addInstance(el, p); // instances are an array of objects

          this.instances.push(instance);
        }
      }

      return this;
    }
    /*
      setStickyPosition ✔️
      --------
      —  most basic thing stickybits does
      => checks to see if position sticky is supported
      => defined the position to be used
      => stickybits works accordingly
    */

    var _proto = Stickybits.prototype;

    _proto.definePosition = function definePosition() {
      var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
      var test = document.head.style;

      for (var i = 0; i < prefix.length; i += 1) {
        test.position = prefix[i] + "sticky";
      }

      var stickyProp = test.position ? test.position : 'fixed';
      test.position = '';
      return stickyProp;
    };
    /*
      addInstance ✔️
      --------
      — manages instances of items
      - takes in an el and props
      - returns an item object
      ---
      - target = el
      - o = {object} = props
        - scrollEl = 'string'
        - verticalPosition = number
        - off = boolean
        - parentClass = 'string'
        - stickyClass = 'string'
        - stuckClass = 'string'
      ---
      - defined later
        - parent = dom element
        - state = 'string'
        - offset = number
        - stickyStart = number
        - stickyStop = number
      - returns an instance object
    */

    _proto.addInstance = function addInstance(el, props) {
      var _this = this;

      var item = {
        el: el,
        parent: el.parentNode,
        props: props
      };
      this.isWin = this.props.scrollEl === window;
      var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
      this.computeScrollOffsets(item);
      item.parent.className += " " + props.parentClass;
      item.state = 'default';

      item.stateContainer = function () {
        return _this.manageState(item);
      };

      se.addEventListener('scroll', item.stateContainer);
      return item;
    };
    /*
      --------
      getParent 👨‍
      --------
      - a helper function that gets the target element's parent selected el
      - only used for non `window` scroll elements
      - supports older browsers
    */

    _proto.getClosestParent = function getClosestParent(el, match) {
      // p = parent element
      var p = match;
      var e = el;
      if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent

      while (e.parentElement !== p) {
        e = e.parentElement;
      } // return parent element


      return p;
    };
    /*
      --------
      getOffsetTop
      --------
      - a helper function that gets the offsetTop of the element
      - from the top level of the DOM
    */

    _proto.getOffsetTop = function getOffsetTop(el) {
      var offsetTop = 0;

      do {
        offsetTop = el.offsetTop + offsetTop;
      } while (el = el.offsetParent);

      return offsetTop;
    };
    /*
      computeScrollOffsets 📊
      ---
      computeScrollOffsets for Stickybits
      - defines
        - offset
        - start
        - stop
    */

    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === 'fixed';
      var isBottom = p.verticalPosition !== 'bottom';
      var scrollElOffset = isCustom ? this.getOffsetTop(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getOffsetTop(parent) - scrollElOffset : this.getOffsetTop(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      it.offset = scrollElOffset + p.stickyBitStickyOffset;
      it.stickyStart = isBottom ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isBottom ? stickyStart + parent.offsetHeight - (it.el.offsetHeight + it.offset) : stickyStart + parent.offsetHeight;
      return it;
    };
    /*
      toggleClasses ⚖️
      ---
      toggles classes (for older browser support)
      r = removed class
      a = added class
    */

    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(' ');
      if (a && cArray.indexOf(a) === -1) cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1) cArray.splice(rItem, 1);
      e.className = cArray.join(' ');
    };
    /*
      manageState 📝
      ---
      - defines the state
        - normal
        - sticky
        - stuck
    */

    _proto.manageState = function manageState(item) {
      // cache object
      var it = item;
      var e = it.el;
      var p = it.props;
      var state = it.state;
      var start = it.stickyStart;
      var change = it.stickyChange;
      var stop = it.stickyStop;
      var stl = e.style; // cache props

      var ns = p.noStyles;
      var pv = p.positionVal;
      var se = p.scrollEl;
      var sticky = p.stickyClass;
      var stickyChange = p.stickyChangeClass;
      var stuck = p.stuckClass;
      var vp = p.verticalPosition;
      /*
        requestAnimationFrame
        ---
        - use rAF
        - or stub rAF
      */

      var rAFStub = function rAFDummy(f) {
        f();
      };

      var rAF = !this.isWin ? rAFStub : window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || rAFStub;
      /*
        define scroll vars
        ---
        - scroll
        - notSticky
        - isSticky
        - isStuck
      */

      var tC = this.toggleClasses;
      var scroll = this.isWin ? window.scrollY || window.pageYOffset : se.scrollTop;
      var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
      var isSticky = scroll <= start && state === 'sticky';
      var isStuck = scroll >= stop && state === 'sticky';
      /*
        Unnamed arrow functions within this block
        ---
        - help wanted or discussion
        - view test.stickybits.js
          - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
      */

      if (notSticky) {
        it.state = 'sticky';
        rAF(function () {
          tC(e, stuck, sticky);
          stl.position = pv;
          if (ns) return;
          stl.bottom = '';
          stl[vp] = p.stickyBitStickyOffset + "px";
        });
      } else if (isSticky) {
        it.state = 'default';
        rAF(function () {
          tC(e, sticky);
          if (pv === 'fixed') stl.position = '';
        });
      } else if (isStuck) {
        it.state = 'stuck';
        rAF(function () {
          tC(e, sticky, stuck);
          if (pv !== 'fixed' || ns) return;
          stl.top = '';
          stl.bottom = '0';
          stl.position = 'absolute';
        });
      }

      var isStickyChange = scroll >= change && scroll <= stop;
      var isNotStickyChange = scroll < change || scroll > stop;
      var stub = 'stub'; // a stub css class to remove

      if (isNotStickyChange) {
        rAF(function () {
          tC(e, stickyChange);
        });
      } else if (isStickyChange) {
        rAF(function () {
          tC(e, stub, stickyChange);
        });
      }

      return it;
    };

    _proto.update = function update() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        this.computeScrollOffsets(instance);
      }

      return this;
    };
    /*
      removes an instance 👋
      --------
      - cleanup instance
    */

    _proto.removeInstance = function removeInstance(instance) {
      var e = instance.el;
      var p = instance.props;
      var tC = this.toggleClasses;
      e.style.position = '';
      e.style[p.verticalPosition] = '';
      tC(e, p.stickyClass);
      tC(e, p.stuckClass);
      tC(e.parentNode, p.parentClass);
    };
    /*
      cleanup 🛁
      --------
      - cleans up each instance
      - clears instance
    */

    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
        this.removeInstance(instance);
      }

      this.manageState = false;
      this.instances = [];
    };

    return Stickybits;
  }();
  /*
    export
    --------
    exports StickBits to be used 🏁
  */

  function stickybits(target, o) {
    return new Stickybits(target, o);
  }

  /**
   * Side navigation related behaviors.
   */

  /**
   * @param {object} options Object containing configuration overrides
   */
  var navigationSide = function navigationSide() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$stickySelector = _ref.stickySelector,
        stickySelector = _ref$stickySelector === undefined ? '.ecl-side-navigation__toggle' : _ref$stickySelector,
        _ref$activeSelector = _ref.activeSelector,
        activeSelector = _ref$activeSelector === undefined ? '.ecl-side-navigation__link--active' : _ref$activeSelector;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // ACTIONS
    function initSticky() {
      // init sticky menu
      // eslint-disable-next-line no-undef
      stickybits(stickySelector, { useStickyClasses: true });
    }

    function scrollToTop() {
      var toggle = document.getElementsByClassName(stickySelector.substring(1))[0];

      if (toggle) {
        toggle.addEventListener('click', function (e) {
          if (e.target.getAttribute('aria-expanded') === 'false') {
            e.target.scrollIntoView();
          }
        });
      }
    }

    function unfoldToActive() {
      var active = document.getElementsByClassName(activeSelector.substring(1))[0];

      // Browse parents
      if (active) {
        var node = active;
        while (node) {
          node = node.parentNode;

          // Check if parent is an expandable menu item
          if (node.matches('.ecl-side-navigation__group')) {
            var link = node.previousElementSibling;
            if (link.matches('.ecl-side-navigation__link')) {
              link.setAttribute('aria-expanded', 'true');
            }
          }

          // No need to check outside of menu
          if (node.matches('.ecl-side-navigation')) {
            break;
          }
        }
      }
    }

    // INIT
    function init() {
      initSticky();
      scrollToTop();
      unfoldToActive();
    }

    init();

    // REVEAL API
    return {
      init: init
    };
  };

  /**
   * Tables related behaviors.
   */

  /* eslint-disable no-unexpected-multiline */

  function eclTables() {
    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var tables = elements || document.getElementsByClassName('ecl-table--responsive');
    [].forEach.call(tables, function (table) {
      var headerText = [];
      var textColspan = '';
      var ci = 0;
      var cn = [];

      // The rows in a table body.
      var tableRows = table.querySelectorAll('tbody tr');

      // The headers in a table.
      var headers = table.querySelectorAll('thead tr th');

      // The number of main headers.
      var headFirst = table.querySelectorAll('thead tr')[0].querySelectorAll('th').length - 1;

      // Number of cells per row.
      var cellPerRow = table.querySelectorAll('tbody tr')[0].querySelectorAll('td').length;

      // Position of the eventual colspan element.
      var colspanIndex = -1;

      // Build the array with all the "labels"
      // Also get position of the eventual colspan element
      for (var i = 0; i < headers.length; i += 1) {
        if (headers[i].getAttribute('colspan')) {
          colspanIndex = i;
        }

        headerText[i] = [];
        headerText[i] = headers[i].textContent;
      }

      // If we have a colspan, we have to prepare the data for it.
      if (colspanIndex !== -1) {
        textColspan = headerText.splice(colspanIndex, 1);
        ci = colspanIndex;
        cn = table.querySelectorAll('th[colspan]')[0].getAttribute('colspan');

        for (var c = 0; c < cn; c += 1) {
          headerText.splice(ci + c, 0, headerText[headFirst + c]);
          headerText.splice(headFirst + 1 + c, 1);
        }
      }

      // For every row, set the attributes we use to make this happen.
      [].forEach.call(tableRows, function (row) {
        for (var j = 0; j < cellPerRow; j += 1) {
          if (headerText[j] === '' || headerText[j] === '\xA0') {
            row.querySelectorAll('td')[j].setAttribute('class', 'ecl-table__heading');
          } else {
            row.querySelectorAll('td')[j].setAttribute('data-th', headerText[j]);
          }

          if (colspanIndex !== -1) {
            var cell = row.querySelectorAll('td')[colspanIndex];
            cell.setAttribute('class', 'ecl-table__group-label');
            cell.setAttribute('data-th-group', textColspan);

            for (var _c = 1; _c < cn; _c += 1) {
              row.querySelectorAll('td')[colspanIndex + _c].setAttribute('class', 'ecl-table__group_element');
            }
          }
        }
      });
    });
  }

  // Heavily inspired by the tab component from https://github.com/frend/frend.co

  /**
   * @param {object} options Object containing configuration overrides
   */
  var tabs = function tabs() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$selector = _ref.selector,
        selector = _ref$selector === undefined ? '.ecl-tabs' : _ref$selector,
        _ref$tablistSelector = _ref.tablistSelector,
        tablistSelector = _ref$tablistSelector === undefined ? '.ecl-tabs__tablist' : _ref$tablistSelector,
        _ref$tabpanelSelector = _ref.tabpanelSelector,
        tabpanelSelector = _ref$tabpanelSelector === undefined ? '.ecl-tabs__tabpanel' : _ref$tabpanelSelector,
        _ref$tabelementsSelec = _ref.tabelementsSelector,
        tabelementsSelector = _ref$tabelementsSelec === undefined ? tablistSelector + ' li' : _ref$tabelementsSelec;

    // SUPPORTS
    if (!('querySelector' in document) || !('addEventListener' in window) || !document.documentElement.classList) return null;

    // SETUP
    // set tab element NodeList
    var tabContainers = queryAll(selector);

    // ACTIONS
    function showTab(target) {
      var giveFocus = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var siblingTabs = queryAll(tablistSelector + ' li', target.parentElement.parentElement);
      var siblingTabpanels = queryAll(tabpanelSelector, target.parentElement.parentElement);

      // set inactives
      siblingTabs.forEach(function (tab) {
        tab.setAttribute('tabindex', -1);
        tab.removeAttribute('aria-selected');
      });

      siblingTabpanels.forEach(function (tabpanel) {
        tabpanel.setAttribute('aria-hidden', 'true');
      });

      // set actives and focus
      target.setAttribute('tabindex', 0);
      target.setAttribute('aria-selected', 'true');
      if (giveFocus) target.focus();
      document.getElementById(target.getAttribute('aria-controls')).removeAttribute('aria-hidden');
    }

    // EVENTS
    function eventTabClick(e) {
      showTab(e.currentTarget);
      e.preventDefault(); // look into remove id/settimeout/reinstate id as an alternative to preventDefault
    }

    function eventTabKeydown(e) {
      // collect tab targets, and their parents' prev/next (or first/last)
      var currentTab = e.currentTarget;
      var previousTabItem = currentTab.previousElementSibling || currentTab.parentElement.lastElementChild;
      var nextTabItem = currentTab.nextElementSibling || currentTab.parentElement.firstElementChild;

      // don't catch key events when ⌘ or Alt modifier is present
      if (e.metaKey || e.altKey) return;

      // catch left/right and up/down arrow key events
      // if new next/prev tab available, show it by passing tab anchor to showTab method
      switch (e.keyCode) {
        case 37:
        case 38:
          showTab(previousTabItem);
          e.preventDefault();
          break;
        case 39:
        case 40:
          showTab(nextTabItem);
          e.preventDefault();
          break;
        default:
          break;
      }
    }

    // BINDINGS
    function bindTabsEvents(tabContainer) {
      var tabsElements = queryAll(tabelementsSelector, tabContainer);
      // bind all tab click and keydown events
      tabsElements.forEach(function (tab) {
        tab.addEventListener('click', eventTabClick);
        tab.addEventListener('keydown', eventTabKeydown);
      });
    }

    function unbindTabsEvents(tabContainer) {
      var tabsElements = queryAll(tabelementsSelector, tabContainer);
      // unbind all tab click and keydown events
      tabsElements.forEach(function (tab) {
        tab.removeEventListener('click', eventTabClick);
        tab.removeEventListener('keydown', eventTabKeydown);
      });
    }

    // DESTROY
    function destroy() {
      tabContainers.forEach(unbindTabsEvents);
    }

    // INIT
    function init() {
      tabContainers.forEach(bindTabsEvents);
    }

    // Automatically init
    init();

    // REVEAL API
    return {
      init: init,
      destroy: destroy
    };
  };

  /**
   * Timeline
   */

  var expandTimeline = function expandTimeline(timeline, button) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref$classToRemove = _ref.classToRemove,
        classToRemove = _ref$classToRemove === undefined ? 'ecl-timeline__item--over-limit' : _ref$classToRemove,
        _ref$hiddenElementsSe = _ref.hiddenElementsSelector,
        hiddenElementsSelector = _ref$hiddenElementsSe === undefined ? '.ecl-timeline__item--over-limit' : _ref$hiddenElementsSe;

    if (!timeline) {
      return;
    }

    var hiddenElements = Array.prototype.slice.call(timeline.querySelectorAll(hiddenElementsSelector));

    // Remove extra class
    hiddenElements.forEach(function (element) {
      element.classList.remove(classToRemove);
    });

    // Remove buttton
    button.parentNode.removeChild(button);
  };

  // Helper method to automatically attach the event listener to all the expandables on page load
  var timelines = function timelines() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$selector = _ref2.selector,
        selector = _ref2$selector === undefined ? '.ecl-timeline' : _ref2$selector,
        _ref2$buttonSelector = _ref2.buttonSelector,
        buttonSelector = _ref2$buttonSelector === undefined ? '.ecl-timeline__button' : _ref2$buttonSelector,
        _ref2$hiddenElementsS = _ref2.hiddenElementsSelector,
        hiddenElementsSelector = _ref2$hiddenElementsS === undefined ? '.ecl-timeline__item--over-limit' : _ref2$hiddenElementsS,
        _ref2$classToRemove = _ref2.classToRemove,
        classToRemove = _ref2$classToRemove === undefined ? 'ecl-timeline__item--over-limit' : _ref2$classToRemove,
        _ref2$context = _ref2.context,
        context = _ref2$context === undefined ? document : _ref2$context;

    var nodesArray = Array.prototype.slice.call(context.querySelectorAll(selector));

    nodesArray.forEach(function (node) {
      var button = context.querySelector(buttonSelector);

      if (button) {
        button.addEventListener('click', function () {
          return expandTimeline(node, button, { classToRemove: classToRemove, hiddenElementsSelector: hiddenElementsSelector });
        });
      }
    });
  };

  /**
   * Timeline
   */

  // Export components

  exports.accordions = accordions;
  exports.initBreadcrumb = initBreadcrumb;
  exports.carousels = carousels;
  exports.contextualNavs = contextualNavs;
  exports.dropdown = dropdown;
  exports.dialogs = dialogs;
  exports.toggleExpandable = toggleExpandable;
  exports.initExpandables = initExpandables;
  exports.fileUploads = fileUploads;
  exports.eclLangSelectPages = eclLangSelectPages;
  exports.initMessages = initMessages;
  exports.navigationInpages = navigationInpages;
  exports.megamenu = megamenu;
  exports.navigationSide = navigationSide;
  exports.eclTables = eclTables;
  exports.tabs = tabs;
  exports.timelines = timelines;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbi9lYy1jb21wb25lbnQtYWNjb3JkaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWJyZWFkY3J1bWIvZ2VuZXJpYy1jb21wb25lbnQtYnJlYWRjcnVtYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2L2VjLWNvbXBvbmVudC1jb250ZXh0LW5hdi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1kcm9wZG93bi9lYy1jb21wb25lbnQtZHJvcGRvd24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9nZW5lcmljLWNvbXBvbmVudC1kaWFsb2cvZ2VuZXJpYy1jb21wb25lbnQtZGlhbG9nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUvZWMtY29tcG9uZW50LWV4cGFuZGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbWVzc2FnZS9nZW5lcmljLWNvbXBvbmVudC1tZXNzYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UvZWMtY29tcG9uZW50LW1lc3NhZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RpY2t5ZmlsbGpzL2Rpc3Qvc3RpY2t5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9ndW1zaG9lanMvZGlzdC9qcy9ndW1zaG9lLm1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51L2dlbmVyaWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdGlja3liaXRzL2Rpc3Qvc3RpY2t5Yml0cy5lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbi9nZW5lcmljLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGFibGUvZWMtY29tcG9uZW50LXRhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LXRhYi9lYy1jb21wb25lbnQtdGFiLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUvZWMtY29tcG9uZW50LXRpbWVsaW5lLmpzIiwiLi4vc2Fzcy9lYy1jdXN0b20tcHJlc2V0L2VjLXByZXNldC1mdWxsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFF1ZXJ5IGhlbHBlclxuZXhwb3J0IGNvbnN0IHF1ZXJ5QWxsID0gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpID0+XG4gIFtdLnNsaWNlLmNhbGwoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG5cbmV4cG9ydCBkZWZhdWx0IHF1ZXJ5QWxsO1xuIiwiLy8gSGVhdmlseSBpbnNwaXJlZCBieSB0aGUgYWNjb3JkaW9uIGNvbXBvbmVudCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mcmVuZC9mcmVuZC5jb1xuXG5pbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGFjY29yZGlvbnMgPSAoe1xuICBzZWxlY3Rvcjogc2VsZWN0b3IgPSAnLmVjbC1hY2NvcmRpb24nLFxuICBoZWFkZXJTZWxlY3RvcjogaGVhZGVyU2VsZWN0b3IgPSAnLmVjbC1hY2NvcmRpb25fX2hlYWRlcicsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gU0VUVVBcbiAgLy8gc2V0IGFjY29yZGlvbiBlbGVtZW50IE5vZGVMaXN0c1xuICBjb25zdCBhY2NvcmRpb25Db250YWluZXJzID0gcXVlcnlBbGwoc2VsZWN0b3IpO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaGlkZVBhbmVsKHRhcmdldCkge1xuICAgIC8vIGdldCBwYW5lbFxuICAgIGNvbnN0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICApO1xuXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuXG4gICAgLy8gdG9nZ2xlIGFyaWEtaGlkZGVuXG4gICAgYWN0aXZlUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93UGFuZWwodGFyZ2V0KSB7XG4gICAgLy8gZ2V0IHBhbmVsXG4gICAgY29uc3QgYWN0aXZlUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKVxuICAgICk7XG5cbiAgICAvLyBzZXQgYXR0cmlidXRlcyBvbiBoZWFkZXJcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuXG4gICAgLy8gdG9nZ2xlIGFyaWEtaGlkZGVuIGFuZCBzZXQgaGVpZ2h0IG9uIHBhbmVsXG4gICAgYWN0aXZlUGFuZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlUGFuZWwodGFyZ2V0KSB7XG4gICAgLy8gY2xvc2UgdGFyZ2V0IHBhbmVsIGlmIGFscmVhZHkgYWN0aXZlXG4gICAgaWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnKSB7XG4gICAgICBoaWRlUGFuZWwodGFyZ2V0KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzaG93UGFuZWwodGFyZ2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdpdmVIZWFkZXJGb2N1cyhoZWFkZXJTZXQsIGkpIHtcbiAgICAvLyBzZXQgYWN0aXZlIGZvY3VzXG4gICAgaGVhZGVyU2V0W2ldLmZvY3VzKCk7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRIZWFkZXJDbGljayhlKSB7XG4gICAgdG9nZ2xlUGFuZWwoZS5jdXJyZW50VGFyZ2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50SGVhZGVyS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCBoZWFkZXIgdGFyZ2V0cywgYW5kIHRoZWlyIHByZXYvbmV4dFxuICAgIGNvbnN0IGN1cnJlbnRIZWFkZXIgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgaXNNb2RpZmllcktleSA9IGUubWV0YUtleSB8fCBlLmFsdEtleTtcbiAgICAvLyBnZXQgY29udGV4dCBvZiBhY2NvcmRpb24gY29udGFpbmVyIGFuZCBpdHMgY2hpbGRyZW5cbiAgICBjb25zdCB0aGlzQ29udGFpbmVyID0gY3VycmVudEhlYWRlci5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgY29uc3QgdGhlc2VIZWFkZXJzID0gcXVlcnlBbGwoaGVhZGVyU2VsZWN0b3IsIHRoaXNDb250YWluZXIpO1xuICAgIGNvbnN0IGN1cnJlbnRIZWFkZXJJbmRleCA9IFtdLmluZGV4T2YuY2FsbCh0aGVzZUhlYWRlcnMsIGN1cnJlbnRIZWFkZXIpO1xuXG4gICAgLy8gZG9uJ3QgY2F0Y2gga2V5IGV2ZW50cyB3aGVuIOKMmCBvciBBbHQgbW9kaWZpZXIgaXMgcHJlc2VudFxuICAgIGlmIChpc01vZGlmaWVyS2V5KSByZXR1cm47XG5cbiAgICAvLyBjYXRjaCBlbnRlci9zcGFjZSwgbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gICAgLy8gaWYgbmV3IHBhbmVsIHNob3cgaXQsIGlmIG5leHQvcHJldiBtb3ZlIGZvY3VzXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMTM6XG4gICAgICBjYXNlIDMyOlxuICAgICAgICB0b2dnbGVQYW5lbChjdXJyZW50SGVhZGVyKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzc6XG4gICAgICBjYXNlIDM4OiB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzSGVhZGVySW5kZXggPVxuICAgICAgICAgIGN1cnJlbnRIZWFkZXJJbmRleCA9PT0gMFxuICAgICAgICAgICAgPyB0aGVzZUhlYWRlcnMubGVuZ3RoIC0gMVxuICAgICAgICAgICAgOiBjdXJyZW50SGVhZGVySW5kZXggLSAxO1xuICAgICAgICBnaXZlSGVhZGVyRm9jdXModGhlc2VIZWFkZXJzLCBwcmV2aW91c0hlYWRlckluZGV4KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgMzk6XG4gICAgICBjYXNlIDQwOiB7XG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXJJbmRleCA9XG4gICAgICAgICAgY3VycmVudEhlYWRlckluZGV4IDwgdGhlc2VIZWFkZXJzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgID8gY3VycmVudEhlYWRlckluZGV4ICsgMVxuICAgICAgICAgICAgOiAwO1xuICAgICAgICBnaXZlSGVhZGVyRm9jdXModGhlc2VIZWFkZXJzLCBuZXh0SGVhZGVySW5kZXgpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpIHtcbiAgICBjb25zdCBhY2NvcmRpb25IZWFkZXJzID0gcXVlcnlBbGwoaGVhZGVyU2VsZWN0b3IsIGFjY29yZGlvbkNvbnRhaW5lcik7XG4gICAgLy8gYmluZCBhbGwgYWNjb3JkaW9uIGhlYWRlciBjbGljayBhbmQga2V5ZG93biBldmVudHNcbiAgICBhY2NvcmRpb25IZWFkZXJzLmZvckVhY2goYWNjb3JkaW9uSGVhZGVyID0+IHtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50SGVhZGVyQ2xpY2spO1xuICAgICAgYWNjb3JkaW9uSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEhlYWRlcktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKSB7XG4gICAgY29uc3QgYWNjb3JkaW9uSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCBhY2NvcmRpb25Db250YWluZXIpO1xuICAgIC8vIHVuYmluZCBhbGwgYWNjb3JkaW9uIGhlYWRlciBjbGljayBhbmQga2V5ZG93biBldmVudHNcbiAgICBhY2NvcmRpb25IZWFkZXJzLmZvckVhY2goYWNjb3JkaW9uSGVhZGVyID0+IHtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50SGVhZGVyQ2xpY2spO1xuICAgICAgYWNjb3JkaW9uSGVhZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEhlYWRlcktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGFjY29yZGlvbkNvbnRhaW5lcnMuZm9yRWFjaChhY2NvcmRpb25Db250YWluZXIgPT4ge1xuICAgICAgdW5iaW5kQWNjb3JkaW9uRXZlbnRzKGFjY29yZGlvbkNvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGFjY29yZGlvbkNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICBhY2NvcmRpb25Db250YWluZXJzLmZvckVhY2goYWNjb3JkaW9uQ29udGFpbmVyID0+IHtcbiAgICAgICAgYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgYWNjb3JkaW9ucztcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgYFR5cGVFcnJvcmAgbWVzc2FnZSBmb3IgXCJGdW5jdGlvbnNcIiBtZXRob2RzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGluaXRCcmVhZGNydW1iID0gKHtcbiAgYnJlYWRjcnVtYlNlbGVjdG9yOiBicmVhZGNydW1iU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iJyxcbiAgZXhwYW5kQnV0dG9uU2VsZWN0b3I6IGV4cGFuZEJ1dHRvblNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fZXhwYW5kLWJ0bicsXG4gIHNlZ21lbnRTZWxlY3Rvcjogc2VnbWVudFNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudCcsXG4gIHNlZ21lbnRGaXJzdFNlbGVjdG9yOiBzZWdtZW50Rmlyc3RTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWZpcnN0JyxcbiAgc2VnbWVudFZpc2libGVTZWxlY3Rvcjogc2VnbWVudFZpc2libGVTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQ6bm90KC5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZmlyc3QpOm5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWVsbGlwc2lzKTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1sYXN0KTpub3QoW2FyaWEtaGlkZGVuPVwidHJ1ZVwiXSknLFxuICBzZWdtZW50SGlkZGVuU2VsZWN0b3I6IHNlZ21lbnRIaWRkZW5TZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnRbYXJpYS1oaWRkZW49XCJ0cnVlXCJdOm5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWVsbGlwc2lzKScsXG4gIGVsbGlwc2lzU2VsZWN0b3I6IGVsbGlwc2lzU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcycsXG59ID0ge30pID0+IHtcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBpbml0RWxsaXBzaXMoYnJlYWRjcnVtYkNvbnRhaW5lcikge1xuICAgIC8vIGFkZCBlbGxpcHNpcyB0byBET01cbiAgICBjb25zdCBicmVhZGNydW1iRmlyc3QgPSBxdWVyeUFsbChzZWdtZW50Rmlyc3RTZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgYnJlYWRjcnVtYkZpcnN0LmZvckVhY2goc2VnbWVudCA9PiB7XG4gICAgICBjb25zdCBlbGxpcHNpcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIC8vIHdlIGNhbid0IGFkZCBtdWx0aXBscyBjbGFzc2VzIGF0IG9uY2UsIGJlY2F1c2UuLi4gSUVcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1saW5rJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluay0taW52ZXJ0ZWQnKTtcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1saW5rLS1zdGFuZGFsb25lJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtYnJlYWRjcnVtYl9fbGluaycpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX2V4cGFuZC1idG4nKTtcbiAgICAgIGVsbGlwc2lzLnNldEF0dHJpYnV0ZSgnaHJlZicsICcjJyk7XG4gICAgICBlbGxpcHNpcy5pbm5lckhUTUwgPSAn4oCmJztcblxuICAgICAgY29uc3QgbGlzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQnKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcycpO1xuICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnZWNsLXUtYXJpYScpO1xuICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIGxpc3RJdGVtLmFwcGVuZENoaWxkKGVsbGlwc2lzKTtcbiAgICAgIHNlZ21lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobGlzdEl0ZW0sIHNlZ21lbnQubmV4dFNpYmxpbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlRWxsaXBzaXMoYnJlYWRjcnVtYkNvbnRhaW5lcikge1xuICAgIC8vIGdldCBoaWRkZW4gc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMgPSBxdWVyeUFsbChcbiAgICAgIHNlZ21lbnRIaWRkZW5TZWxlY3RvcixcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJcbiAgICApO1xuICAgIGNvbnN0IGhpZGRlbiA9IGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cy5sZW5ndGggPiAwID8gJ2ZhbHNlJyA6ICd0cnVlJztcblxuICAgIC8vIGRpc3BsYXkgZWxsaXBzaXMgd2hlbiBuZWVkZWRcbiAgICBjb25zdCBicmVhZGNydW1iRWxsaXBzaXMgPSBxdWVyeUFsbChlbGxpcHNpc1NlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICBicmVhZGNydW1iRWxsaXBzaXMuZm9yRWFjaChlbGxpcHNpcyA9PiB7XG4gICAgICBlbGxpcHNpcy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaGlkZGVuKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJyZWFkY3J1bWJJc1Rvb0xhcmdlKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgd3JhcHBlciB3aWR0aFxuICAgIGNvbnN0IHdyYXBwZXJXaWR0aCA9IE1hdGguZmxvb3IoXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgKTtcblxuICAgIC8vIGdldCBkaXNwbGF5ZWQgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iU2VnbWVudHMgPSBxdWVyeUFsbChzZWdtZW50U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuXG4gICAgLy8gZ2V0IHNlZ21lbnRzIHdpZHRoXG4gICAgbGV0IHNlZ21lbnRXaWR0aCA9IDA7XG4gICAgYnJlYWRjcnVtYlNlZ21lbnRzLmZvckVhY2goYnJlYWRjcnVtYlNlZ21lbnQgPT4ge1xuICAgICAgc2VnbWVudFdpZHRoICs9IE1hdGguY2VpbChcbiAgICAgICAgYnJlYWRjcnVtYlNlZ21lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc2VnbWVudFdpZHRoID49IHdyYXBwZXJXaWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgdmlzaWJsZSBzZWdtZW50c1xuICAgIGNvbnN0IGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHMgPSBxdWVyeUFsbChcbiAgICAgIHNlZ21lbnRWaXNpYmxlU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcblxuICAgIC8vIGhpZGUgc2VnbWVudHMgaWYgbmVlZGVkXG4gICAgLy8gd2UgZG8gbm90IGhpZGUgdGhlIGxhc3QgdHdvIHNlZ21lbnRzXG4gICAgaWYgKGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgYnJlYWRjcnVtYlZpc2libGVTZWdtZW50c1swXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBzZWdtZW50IHRvIGJlIGhpZGRlblxuICAgICAgaWYgKGJyZWFkY3J1bWJJc1Rvb0xhcmdlKGJyZWFkY3J1bWJDb250YWluZXIpKSB7XG4gICAgICAgIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgaGlkZGVuIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50SGlkZGVuU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcblxuICAgIC8vIHNob3cgc2VnbWVudHMgaWYgdGhlcmUgaXMgZW5vdWdoIHNwYWNlXG4gICAgaWYgKGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBicmVhZGNydW1iSGlkZGVuU2VnbWVudHNbXG4gICAgICAgIGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cy5sZW5ndGggLSAxXG4gICAgICBdLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgaWYgKGJyZWFkY3J1bWJJc1Rvb0xhcmdlKGJyZWFkY3J1bWJDb250YWluZXIpKSB7XG4gICAgICAgIC8vIGJyZWFkY3J1bWIgaXMgdG9vIGxhcmdlLCB3ZSBoaWRlIHRoZSBsYXN0IHNlZ21lbnRcbiAgICAgICAgaGlkZVNlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBpcyBhbm90aGVyIHNlZ21lbnQgdG8gYmUgZGlzcGxheWVkXG4gICAgICAgIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEVWRU5UU1xuICBmdW5jdGlvbiBldmVudEV4cGFuZENsaWNrKGUsIGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gZGlzcGxheSBhbGwgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iU2VnbWVudHMgPSBxdWVyeUFsbChzZWdtZW50U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIGJyZWFkY3J1bWJTZWdtZW50cy5mb3JFYWNoKGJyZWFkY3J1bWJTZWdtZW50ID0+IHtcbiAgICAgIGJyZWFkY3J1bWJTZWdtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICB9KTtcblxuICAgIC8vIGhpZGUgZWxsaXBzaXMgb25jZSBleHBhbmRlZFxuICAgIGNvbnN0IHRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcbiAgICB0YXJnZXQucGFyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50UmVzaXplKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgc2VnbWVudHMgdG8gYmUgaGlkZGVuIG9yIHNob3duXG4gICAgaWYgKGJyZWFkY3J1bWJJc1Rvb0xhcmdlKGJyZWFkY3J1bWJDb250YWluZXIpKSB7XG4gICAgICBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1NlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgfVxuICAgIHRvZ2dsZUVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICB9XG5cbiAgLy8gU0VUVVBcbiAgY29uc3QgYnJlYWRjcnVtYkNvbnRhaW5lcnMgPSBxdWVyeUFsbChicmVhZGNydW1iU2VsZWN0b3IpO1xuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBjb25zdCBleHBhbmRzID0gcXVlcnlBbGwoZXhwYW5kQnV0dG9uU2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuXG4gICAgLy8gYmluZCBjbGljayBldmVudCBmb3IgZXhwYW5kXG4gICAgZXhwYW5kcy5mb3JFYWNoKGV4cGFuZCA9PiB7XG4gICAgICBleHBhbmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+XG4gICAgICAgIGV2ZW50RXhwYW5kQ2xpY2soZSwgYnJlYWRjcnVtYkNvbnRhaW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIHJlc2l6ZSBldmVudCB0byBjaGVjayBicmVhZGNydW1iIHdpZHRoXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncmVzaXplJyxcbiAgICAgIGRlYm91bmNlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lcnMuZm9yRWFjaChldmVudFJlc2l6ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIDEwMCxcbiAgICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcikge1xuICAgIGNvbnN0IGV4cGFuZHMgPSBxdWVyeUFsbChleHBhbmRCdXR0b25TZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGNsaWNrIGV2ZW50IGZvciBleHBhbmRcbiAgICBleHBhbmRzLmZvckVhY2goZXhwYW5kID0+IHtcbiAgICAgIGV4cGFuZC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT5cbiAgICAgICAgZXZlbnRFeHBhbmRDbGljayhlLCBicmVhZGNydW1iQ29udGFpbmVyKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIC8vIHVuYmluZCByZXNpemUgZXZlbnQgdG8gY2hlY2sgYnJlYWRjcnVtYiB3aWR0aFxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goZXZlbnRSZXNpemUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChicmVhZGNydW1iQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goYnJlYWRjcnVtYkNvbnRhaW5lciA9PiB7XG4gICAgICAgIHVuYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGJyZWFkY3J1bWJDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lcnMuZm9yRWFjaChicmVhZGNydW1iQ29udGFpbmVyID0+IHtcbiAgICAgICAgaW5pdEVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgICBiaW5kQnJlYWRjcnVtYkV2ZW50cyhicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgICAgICAvLyB0cmlnZ2VyIHJlc2l6ZSBldmVudCBvbmNlXG4gICAgICAgIGV2ZW50UmVzaXplKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgaW5pdEJyZWFkY3J1bWI7XG4iLCJpbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tJztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBjYXJvdXNlbHMgPSAoeyBzZWxlY3RvcklkOiBzZWxlY3RvcklkID0gJ2VjbC1jYXJvdXNlbCcgfSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmICghKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHwgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gU0VUVVBcbiAgbGV0IGN1cnJlbnRTbGlkZSA9IDA7XG4gIGNvbnN0IGNhcm91c2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3JJZCk7XG4gIGNvbnN0IHNsaWRlcyA9IHF1ZXJ5QWxsKCcuZWNsLWNhcm91c2VsX19pdGVtJywgY2Fyb3VzZWwpO1xuICBjb25zdCBsaXN0ID0gY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGlzdCcpO1xuXG4gIGZ1bmN0aW9uIGdldExpc3RJdGVtV2lkdGgoKSB7XG4gICAgcmV0dXJuIGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2l0ZW0nKS5vZmZzZXRXaWR0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdvVG9TbGlkZShuKSB7XG4gICAgc2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LnJlbW92ZSgnZWNsLWNhcm91c2VsX19pdGVtLS1zaG93aW5nJyk7XG4gICAgY3VycmVudFNsaWRlID0gKG4gKyBzbGlkZXMubGVuZ3RoKSAlIHNsaWRlcy5sZW5ndGg7XG4gICAgc2xpZGVzW2N1cnJlbnRTbGlkZV0uY2xhc3NMaXN0LmFkZCgnZWNsLWNhcm91c2VsX19pdGVtLS1zaG93aW5nJyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgaXRlbVdpZHRoID0gZ2V0TGlzdEl0ZW1XaWR0aCgpO1xuICAgIGNvbnN0IHRyID0gYHRyYW5zbGF0ZTNkKCR7LWN1cnJlbnRTbGlkZSAqIGl0ZW1XaWR0aH1weCwgMCwgMClgO1xuXG4gICAgbGlzdC5zdHlsZS5Nb3pUcmFuc2Zvcm0gPSB0cjsgLyogRkYgKi9cbiAgICBsaXN0LnN0eWxlLm1zVHJhbnNmb3JtID0gdHI7IC8qIElFICg5KykgKi9cbiAgICBsaXN0LnN0eWxlLk9UcmFuc2Zvcm0gPSB0cjsgLyogT3BlcmEgKi9cbiAgICBsaXN0LnN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHRyOyAvKiBTYWZhcmkgKyBDaHJvbWUgKi9cbiAgICBsaXN0LnN0eWxlLnRyYW5zZm9ybSA9IHRyO1xuICB9XG5cbiAgZnVuY3Rpb24gYW5ub3VuY2VDdXJyZW50U2xpZGUoKSB7XG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihcbiAgICAgICcuZWNsLWNhcm91c2VsX19tZXRhLXNsaWRlJ1xuICAgICkudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50U2xpZGUgKyAxfSAvICR7c2xpZGVzLmxlbmd0aH1gO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd0ltYWdlSW5mb3JtYXRpb24oKSB7XG4gICAgLy8gUmVzZXQvSGlkZSBhbGwuXG4gICAgY29uc3QgaW5mb0FyZWFzID0gcXVlcnlBbGwoJ1tkYXRhLWltYWdlXScpO1xuICAgIC8vIElmIGFueXRoaW5nIGlzIHZpc2libGUuXG4gICAgaWYgKGluZm9BcmVhcykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBpbmZvQXJlYXMuZm9yRWFjaChhcmVhID0+IChhcmVhLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpKTtcbiAgICB9XG5cbiAgICBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbWFnZT1cIiR7Y3VycmVudFNsaWRlfVwiXWApLnN0eWxlLmRpc3BsYXkgPVxuICAgICAgJ2Jsb2NrJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXZpb3VzU2xpZGUoKSB7XG4gICAgZ29Ub1NsaWRlKGN1cnJlbnRTbGlkZSAtIDEpO1xuICAgIHNldE9mZnNldCgpO1xuICAgIGFubm91bmNlQ3VycmVudFNsaWRlKCk7XG4gICAgc2hvd0ltYWdlSW5mb3JtYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICBnb1RvU2xpZGUoY3VycmVudFNsaWRlICsgMSk7XG4gICAgc2V0T2Zmc2V0KCk7XG4gICAgYW5ub3VuY2VDdXJyZW50U2xpZGUoKTtcbiAgICBzaG93SW1hZ2VJbmZvcm1hdGlvbigpO1xuICB9XG5cbiAgLy8gQXR0YWNoIGNvbnRyb2xzIHRvIGEgY2Fyb3VzZWwuXG4gIGZ1bmN0aW9uIGFkZENhcm91c2VsQ29udHJvbHMoKSB7XG4gICAgY29uc3QgbmF2Q29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuXG4gICAgbmF2Q29udHJvbHMuY2xhc3NOYW1lID0gJ2VjbC1jYXJvdXNlbF9fY29udHJvbHMgZWNsLWxpc3QtLXVuc3R5bGVkJztcblxuICAgIG5hdkNvbnRyb2xzLmlubmVySFRNTCA9IGBcbiAgICAgIDxsaT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJlY2wtaWNvbiBlY2wtaWNvbi0tbGVmdCBlY2wtY2Fyb3VzZWxfX2J1dHRvbiBlY2wtY2Fyb3VzZWxfX2J1dHRvbi0tcHJldmlvdXNcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImVjbC11LXNyLW9ubHlcIj5QcmV2aW91czwvc3Bhbj48L2J1dHRvbj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGk+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZWNsLWljb24gZWNsLWljb24tLXJpZ2h0IGVjbC1jYXJvdXNlbF9fYnV0dG9uIGVjbC1jYXJvdXNlbF9fYnV0dG9uLS1uZXh0XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJlY2wtdS1zci1vbmx5XCI+TmV4dDwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2xpPlxuICAgIGA7XG5cbiAgICBuYXZDb250cm9sc1xuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuZWNsLWNhcm91c2VsX19idXR0b24tLXByZXZpb3VzJyxcbiAgICAgICAgJy5lY2wtY2Fyb3VzZWxfX2NvbnRyb2xzJ1xuICAgICAgKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJldmlvdXNTbGlkZSk7XG5cbiAgICBuYXZDb250cm9sc1xuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2J1dHRvbi0tbmV4dCcsICcuZWNsLWNhcm91c2VsX19jb250cm9scycpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXh0U2xpZGUpO1xuXG4gICAgY2Fyb3VzZWxcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXN0LXdyYXBwZXInKVxuICAgICAgLmFwcGVuZENoaWxkKG5hdkNvbnRyb2xzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNhcm91c2VsQ29udHJvbHMoKSB7XG4gICAgY29uc3QgY29udHJvbHMgPSBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19jb250cm9scycpO1xuICAgIGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3Qtd3JhcHBlcicpLnJlbW92ZUNoaWxkKGNvbnRyb2xzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZExpdmVSZWdpb24oKSB7XG4gICAgY29uc3QgbGl2ZVJlZ2lvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGxpdmVSZWdpb24uc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCAncG9saXRlJyk7XG4gICAgbGl2ZVJlZ2lvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtYXRvbWljJywgJ3RydWUnKTtcbiAgICBsaXZlUmVnaW9uLmNsYXNzTGlzdC5hZGQoJ2VjbC1jYXJvdXNlbF9fbWV0YS1zbGlkZScpO1xuICAgIGNhcm91c2VsXG4gICAgICAucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGl2ZS1yZWdpb24nKVxuICAgICAgLmFwcGVuZENoaWxkKGxpdmVSZWdpb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTGl2ZVJlZ2lvbigpIHtcbiAgICBjb25zdCBsaXZlUmVnaW9uID0gY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbWV0YS1zbGlkZScpO1xuICAgIGNhcm91c2VsXG4gICAgICAucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGl2ZS1yZWdpb24nKVxuICAgICAgLnJlbW92ZUNoaWxkKGxpdmVSZWdpb24pO1xuICB9XG5cbiAgY29uc3QgZGVib3VuY2VDYiA9ICgpID0+XG4gICAgZGVib3VuY2UoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHNldE9mZnNldCgpO1xuICAgICAgfSxcbiAgICAgIDEwMCxcbiAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICApKCk7XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGFkZENhcm91c2VsQ29udHJvbHMoKTtcbiAgICBhZGRMaXZlUmVnaW9uKCk7XG4gICAgZ29Ub1NsaWRlKDApO1xuICAgIGFubm91bmNlQ3VycmVudFNsaWRlKCk7XG4gICAgc2hvd0ltYWdlSW5mb3JtYXRpb24oKTtcblxuICAgIC8vIFJlLWFsaWduIG9uIHJlc2l6ZS5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VDYik7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgcmVtb3ZlQ2Fyb3VzZWxDb250cm9scygpO1xuICAgIHJlbW92ZUxpdmVSZWdpb24oKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VDYik7XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjYXJvdXNlbHM7XG4iLCIvKipcbiAqIENvbnRleHR1YWwgbmF2aWdhdGlvbiBzY3JpcHRzXG4gKi9cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5jb25zdCBleHBhbmRDb250ZXh0dWFsTmF2ID0gKFxuICBjb250ZXh0dWFsTmF2LFxuICBidXR0b24sXG4gIHtcbiAgICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC1jb250ZXh0LW5hdl9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghY29udGV4dHVhbE5hdikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gcXVlcnlBbGwoaGlkZGVuRWxlbWVudHNTZWxlY3RvciwgY29udGV4dCk7XG5cbiAgLy8gUmVtb3ZlIGV4dHJhIGNsYXNzXG4gIGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzVG9SZW1vdmUpO1xuICB9KTtcblxuICAvLyBSZW1vdmUgYnV0dHRvblxuICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b24pO1xufTtcblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBleHBhbmRhYmxlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBjb25zdCBjb250ZXh0dWFsTmF2cyA9ICh7XG4gIHNlbGVjdG9yID0gJy5lY2wtY29udGV4dC1uYXYnLFxuICBidXR0b25TZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19tb3JlJyxcbiAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtY29udGV4dC1uYXZfX2l0ZW0tLW92ZXItbGltaXQnLFxuICBjb250ZXh0ID0gZG9jdW1lbnQsXG59ID0ge30pID0+IHtcbiAgY29uc3Qgbm9kZXNBcnJheSA9IHF1ZXJ5QWxsKHNlbGVjdG9yLCBjb250ZXh0KTtcblxuICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKGJ1dHRvblNlbGVjdG9yKTtcblxuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIGV4cGFuZENvbnRleHR1YWxOYXYobm9kZSwgYnV0dG9uLCB7XG4gICAgICAgICAgY2xhc3NUb1JlbW92ZSxcbiAgICAgICAgICBoaWRkZW5FbGVtZW50c1NlbGVjdG9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGV4dHVhbE5hdnM7XG4iLCIvKipcbiAqIGBOb2RlI2NvbnRhaW5zKClgIHBvbHlmaWxsLlxuICpcbiAqIFNlZTogaHR0cDovL2NvbXBhdGliaWxpdHkuc2h3dXBzLWNtcy5jaC9lbi9wb2x5ZmlsbHMvPyZpZD0xXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcGFyYW0ge05vZGV9IG90aGVyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIG90aGVyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiBub2RlID09PSBvdGhlciB8fCAhIShub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG90aGVyKSAmIDE2KTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duID0gc2VsZWN0b3IgPT4ge1xuICBjb25zdCBkcm9wZG93bnNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZHJvcGRvd25zQXJyYXkuZm9yRWFjaChkcm9wZG93blNlbGVjdGlvbiA9PiB7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGNvbnRhaW5zKGRyb3Bkb3duU2VsZWN0aW9uLCBldmVudC50YXJnZXQpO1xuXG4gICAgICBpZiAoIWlzSW5zaWRlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1leHBhbmRlZD10cnVlXWBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZHJvcGRvd25Cb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1oaWRkZW49ZmFsc2VdYFxuICAgICAgICApO1xuICAgICAgICAvLyBJZiB0aGUgYm9keSBvZiB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZSwgdGhlbiB0b2dnbGUuXG4gICAgICAgIGlmIChkcm9wZG93bkJvZHkpIHtcbiAgICAgICAgICBkcm9wZG93bkJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgZHJvcGRvd25Cb2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRyb3Bkb3duO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqXG4gKiBBdmFpbGFibGUgb3B0aW9uczpcbiAqIC0gb3B0aW9ucy50cmlnZ2VyRWxlbWVudHNTZWxlY3RvciAtIGFueSBzZWxlY3RvciB0byB3aGljaCBldmVudCBsaXN0ZW5lcnNcbiAqIGFyZSBhdHRhY2hlZC4gV2hlbiBjbGlja2VkIG9uIGFueSBlbGVtZW50IHdpdGggc3VjaCBhIHNlbGVjdG9yLCBhIGRpYWxvZyBvcGVucy5cbiAqXG4gKiAtIG9wdGlvbnMuZGlhbG9nV2luZG93SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1kaWFsb2dgLlxuICpcbiAqIC0gb3B0aW9ucy5kaWFsb2dPdmVybGF5SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1vdmVybGF5YC5cbiAqIE92ZXJsYXkgZWxlbWVudCBpcyBjcmVhdGVkIGluIHRoZSBkb2N1bWVudCBpZiBub3QgcHJvdmlkZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBkaWFsb2dzID0gKHtcbiAgdHJpZ2dlckVsZW1lbnRzU2VsZWN0b3I6IHRyaWdnZXJFbGVtZW50c1NlbGVjdG9yID0gJ1tkYXRhLWVjbC1kaWFsb2ddJyxcbiAgZGlhbG9nV2luZG93SWQ6IGRpYWxvZ1dpbmRvd0lkID0gJ2VjbC1kaWFsb2cnLFxuICBkaWFsb2dPdmVybGF5SWQ6IGRpYWxvZ092ZXJsYXlJZCA9ICdlY2wtb3ZlcmxheScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKCEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fCAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTRVRVUFxuICBjb25zdCB0cmlnZ2VyRWxlbWVudHMgPSBxdWVyeUFsbCh0cmlnZ2VyRWxlbWVudHNTZWxlY3Rvcik7XG4gIGNvbnN0IGRpYWxvZ1dpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1dpbmRvd0lkKTtcbiAgbGV0IGRpYWxvZ092ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dPdmVybGF5SWQpO1xuXG4gIC8vIENyZWF0ZSBhbiBvdmVybGF5IGVsZW1lbnQgaWYgdGhlIHVzZXIgZG9lcyBub3Qgc3VwcGx5IG9uZS5cbiAgaWYgKCFkaWFsb2dPdmVybGF5KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdlY2wtb3ZlcmxheScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlY2wtZGlhbG9nX19vdmVybGF5Jyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIGRpYWxvZ092ZXJsYXkgPSBlbGVtZW50O1xuICB9XG5cbiAgLy8gV2hhdCB3ZSBjYW4gZm9jdXMgb24gaW4gdGhlIG1vZGFsLlxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgcXVlcnlBbGwoXG4gICAgICBgXG4gICAgICAgIGFbaHJlZl0sXG4gICAgICAgIGFyZWFbaHJlZl0sXG4gICAgICAgIGlucHV0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBidXR0b246bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBbdGFiaW5kZXg9XCIwXCJdXG4gICAgICBgLFxuICAgICAgZGlhbG9nV2luZG93XG4gICAgKVxuICApO1xuXG4gIC8vIFVzZSB0aGlzIHZhcmlhYmxlIHRvIHJldHVybiBmb2N1cyBvbiBlbGVtZW50IGFmdGVyIGRpYWxvZyBiZWluZyBjbG9zZWQuXG4gIGxldCBmb2N1c2VkRWxCZWZvcmVPcGVuID0gbnVsbDtcblxuICAvLyBTcGVjaWZpYyBlbGVtZW50cyB0byB0YWtlIGNhcmUgd2hlbiBvcGVubmluZyBhbmQgY2xvc2luZyB0aGUgZGlhbG9nLlxuICBjb25zdCBmaXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgY29uc3QgbGFzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblxuICAvLyBFVkVOVFNcbiAgLy8gSGlkZSBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkaWFsb2dXaW5kb3cuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgaWYgKGZvY3VzZWRFbEJlZm9yZU9wZW4pIHtcbiAgICAgIGZvY3VzZWRFbEJlZm9yZU9wZW4uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gS2V5Ym9hcmQgYmVoYXZpb3JzLlxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBjb25zdCBLRVlfVEFCID0gOTtcbiAgICBjb25zdCBLRVlfRVNDID0gMjc7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCYWNrd2FyZFRhYigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcndhcmRUYWIoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgLy8gS2VlcCB0YWJiaW5nIGluIHRoZSBzY29wZSBvZiB0aGUgZGlhbG9nLlxuICAgICAgY2FzZSBLRVlfVEFCOlxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaGFuZGxlQmFja3dhcmRUYWIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVGb3J3YXJkVGFiKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9FU0M6XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdyBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIG9wZW4oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRpYWxvZ1dpbmRvdy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblxuICAgIC8vIFRoaXMgaXMgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZm9jdXMgYWZ0ZXIgY2xvc2luZyB0aGUgZGlhbG9nLlxuICAgIC8vIFVzdWFsbHkgdGhlIGVsZW1lbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSBkaWFsb2cuXG4gICAgZm9jdXNlZEVsQmVmb3JlT3BlbiA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBGb2N1cyBvbiB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgZGlhbG9nLlxuICAgIGZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgLy8gQ2xvc2UgZGlhbG9nIHdoZW4gY2xpY2tlZCBvdXQgb2YgdGhlIGRpYWxvZyB3aW5kb3cuXG4gICAgZGlhbG9nT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlKTtcblxuICAgIC8vIEhhbmRsZSB0YWJiaW5nLCBlc2MgYW5kIGtleWJvYXJkIGluIHRoZSBkaWFsb2cgd2luZG93LlxuICAgIGRpYWxvZ1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kRGlhbG9nRXZlbnRzKHRyaWdnZXJFbGVtZW50cyk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKHRyaWdnZXJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGJpbmREaWFsb2dFdmVudHModHJpZ2dlckVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBkaWFsb2dzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUV4cGFuZGFibGUgPSAoXG4gIHRvZ2dsZUVsZW1lbnQsXG4gIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gICAgZm9yY2VDbG9zZSA9IGZhbHNlLFxuICAgIGNsb3NlU2libGluZ3MgPSBmYWxzZSxcbiAgICBzaWJsaW5nc1NlbGVjdG9yID0gJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdG9nZ2xlRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICk7XG5cbiAgLy8gRXhpdCBpZiBubyB0YXJnZXQgZm91bmRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBzdGF0dXNcbiAgY29uc3QgaXNFeHBhbmRlZCA9XG4gICAgZm9yY2VDbG9zZSA9PT0gdHJ1ZSB8fFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcblxuICAvLyBUb2dnbGUgdGhlIGV4cGFuZGFibGUvY29sbGFwc2libGVcbiAgdG9nZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaXNFeHBhbmRlZCk7XG5cbiAgLy8gVG9nZ2xlIGxhYmVsIGlmIHBvc3NpYmxlXG4gIGlmICghaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpO1xuICB9IGVsc2UgaWYgKGlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtY29sbGFwc2VkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2RhdGEtbGFiZWwtY29sbGFwc2VkJ1xuICAgICk7XG4gIH1cblxuICAvLyBDbG9zZSBzaWJsaW5ncyBpZiByZXF1ZXN0ZWRcbiAgaWYgKGNsb3NlU2libGluZ3MgPT09IHRydWUpIHtcbiAgICBjb25zdCBzaWJsaW5nc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2libGluZ3NTZWxlY3RvcikpXG4gICAgICAuZmlsdGVyKHNpYmxpbmcgPT4gc2libGluZyAhPT0gdG9nZ2xlRWxlbWVudCk7XG5cbiAgICBzaWJsaW5nc0FycmF5LmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHNpYmxpbmcsIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IGluaXRFeHBhbmRhYmxlcyA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PiB7XG4gIC8vIEV4aXQgaWYgbm8gc2VsZWN0b3Igd2FzIHByb3ZpZGVkXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7IGNvbnRleHQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcbn07XG4iLCIvKipcbiAqIEZpbGUgdXBsb2FkcyByZWxhdGVkIGJlaGF2aW9ycy5cbiAqL1xuXG5pbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGZpbGVVcGxvYWRzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWQnLFxuICBpbnB1dFNlbGVjdG9yOiBpbnB1dFNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWRfX2lucHV0JyxcbiAgdmFsdWVTZWxlY3RvcjogdmFsdWVTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX192YWx1ZScsXG4gIGJyb3dzZVNlbGVjdG9yOiBicm93c2VTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX19icm93c2UnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBmaWxlIHVwbG9hZCBlbGVtZW50IE5vZGVMaXN0c1xuICBjb25zdCBmaWxlVXBsb2FkQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpbGVOYW1lKGVsZW1lbnQsIGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG4gICAgICBpZiAoJ25hbWUnIGluIGZpbGUpIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgZmlsZW5hbWUgKz0gJywgJztcbiAgICAgICAgfVxuICAgICAgICBmaWxlbmFtZSArPSBmaWxlLm5hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2hvdyB0aGUgc2VsZWN0ZWQgZmlsZW5hbWUgaW4gdGhlIGZpZWxkLlxuICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSBmaWxlbmFtZTtcbiAgfVxuXG4gIC8vIEVWRU5UU1xuICBmdW5jdGlvbiBldmVudFZhbHVlQ2hhbmdlKGUpIHtcbiAgICBpZiAoJ2ZpbGVzJyBpbiBlLnRhcmdldCkge1xuICAgICAgY29uc3QgZmlsZVVwbG9hZEVsZW1lbnRzID0gcXVlcnlBbGwodmFsdWVTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICAgIGZpbGVVcGxvYWRFbGVtZW50cy5mb3JFYWNoKGZpbGVVcGxvYWRFbGVtZW50ID0+IHtcbiAgICAgICAgdXBkYXRlRmlsZU5hbWUoZmlsZVVwbG9hZEVsZW1lbnQsIGUudGFyZ2V0LmZpbGVzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50QnJvd3NlS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCBoZWFkZXIgdGFyZ2V0cywgYW5kIHRoZWlyIHByZXYvbmV4dFxuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICBpbnB1dEVsZW1lbnRzLmZvckVhY2goaW5wdXRFbGVtZW50ID0+IHtcbiAgICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICAgIGlmIChpc01vZGlmaWVyS2V5KSByZXR1cm47XG5cbiAgICAgIC8vIGNhdGNoIGVudGVyL3NwYWNlLCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kRmlsZVVwbG9hZEV2ZW50cyhmaWxlVXBsb2FkQ29udGFpbmVyKSB7XG4gICAgLy8gYmluZCBhbGwgZmlsZSB1cGxvYWQgY2hhbmdlIGV2ZW50c1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgY29uc3QgZmlsZVVwbG9hZEJyb3dzZXMgPSBxdWVyeUFsbChicm93c2VTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcikge1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGZpbGUgdXBsb2FkIGNoYW5nZSBldmVudHNcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGZpbGVVcGxvYWRCcm93c2VzID0gcXVlcnlBbGwoYnJvd3NlU2VsZWN0b3IsIGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGZpbGVVcGxvYWRDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgICAgYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBmaWxlVXBsb2FkcztcbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5leHBvcnQgY29uc3QgZWNsTGFuZ1NlbGVjdFBhZ2VzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZScsXG4gIHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyA9ICdlY2wtbGFuZy1zZWxlY3QtcGFnZS0tZHJvcGRvd24nLFxuICBsaXN0U2VsZWN0b3I6IGxpc3RTZWxlY3RvciA9ICcuZWNsLWxhbmctc2VsZWN0LXBhZ2VfX2xpc3QnLFxuICBkcm9wZG93blNlbGVjdG9yOiBkcm9wZG93blNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZV9fZHJvcGRvd24nLFxuICBkcm9wZG93bk9uQ2hhbmdlOiBkcm9wZG93bk9uQ2hhbmdlID0gdW5kZWZpbmVkLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGxzcCkge1xuICAgIGlmICghbHNwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGxpc3QgPSBxdWVyeUFsbChsaXN0U2VsZWN0b3IsIGxzcClbMF07XG5cbiAgICBpZiAoIWxzcC5jbGFzc0xpc3QuY29udGFpbnModG9nZ2xlQ2xhc3MpKSB7XG4gICAgICBpZiAobGlzdCAmJiBsaXN0Lm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoID4gbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcGRvd24gPSBxdWVyeUFsbChkcm9wZG93blNlbGVjdG9yLCBsc3ApWzBdO1xuICAgICAgaWYgKGRyb3Bkb3duLm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoIDwgbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QucmVtb3ZlKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gT24gbG9hZFxuICAgIGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMuZm9yRWFjaChsc3AgPT4ge1xuICAgICAgdG9nZ2xlKGxzcCk7XG5cbiAgICAgIGlmIChkcm9wZG93bk9uQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gcXVlcnlBbGwoZHJvcGRvd25TZWxlY3RvciwgbHNwKVswXTtcblxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcbiAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkcm9wZG93bk9uQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncmVzaXplJyxcbiAgICAgIGRlYm91bmNlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGFuZ1NlbGVjdFBhZ2VzQ29udGFpbmVycy5mb3JFYWNoKHRvZ2dsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIDEwMCxcbiAgICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gaW5pdCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWNsTGFuZ1NlbGVjdFBhZ2VzO1xuIiwiLypcbiAqIE1lc3NhZ2VzIGJlaGF2aW9yXG4gKi9cblxuLy8gRGlzbWlzcyBhIHNlbGVjdGVkIG1lc3NhZ2UuXG5mdW5jdGlvbiBkaXNtaXNzTWVzc2FnZShtZXNzYWdlKSB7XG4gIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIG1lc3NhZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtZXNzYWdlKTtcbiAgfVxufVxuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIG1lc3NhZ2VzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXNzYWdlcygpIHtcbiAgY29uc3Qgc2VsZWN0b3JDbGFzcyA9ICdlY2wtbWVzc2FnZV9fZGlzbWlzcyc7XG5cbiAgY29uc3QgbWVzc2FnZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yQ2xhc3MpXG4gICk7XG5cbiAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+XG4gICAgbWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBkaXNtaXNzTWVzc2FnZShtZXNzYWdlLnBhcmVudEVsZW1lbnQpXG4gICAgKVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0TWVzc2FnZXM7XG4iLCIvKlxuICogTWVzc2FnZXMgYmVoYXZpb3JcbiAqL1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LW1lc3NhZ2UnO1xuIiwiLyohXHJcbiAgKiBTdGlja3lmaWxsIOKAkyBgcG9zaXRpb246IHN0aWNreWAgcG9seWZpbGxcclxuICAqIHYuIDIuMC41IHwgaHR0cHM6Ly9naXRodWIuY29tL3dpbGRkZWVyL3N0aWNreWZpbGxcclxuICAqIE1JVCBMaWNlbnNlXHJcbiAgKi9cclxuXHJcbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogMS4gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5IG9yIGlzIHRvbyBvbGQgdG8gcnVuIHRoZSBwb2x5ZmlsbC5cclxuICAgICAqICAgIElmIGVpdGhlciBvZiB0aGVzZSBpcyB0aGUgY2FzZSBzZXQgYHNlcHB1a3VgIGZsYWcuIEl0IHdpbGwgYmUgY2hlY2tlZCBsYXRlciB0byBkaXNhYmxlIGtleSBmZWF0dXJlc1xyXG4gICAgICogICAgb2YgdGhlIHBvbHlmaWxsLCBidXQgdGhlIEFQSSB3aWxsIHJlbWFpbiBmdW5jdGlvbmFsIHRvIGF2b2lkIGJyZWFraW5nIHRoaW5ncy5cclxuICAgICAqL1xyXG4gICAgXHJcbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG4gICAgXHJcbiAgICB2YXIgc2VwcHVrdSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICAvLyBUaGUgcG9seWZpbGwgY2FudOKAmXQgZnVuY3Rpb24gcHJvcGVybHkgd2l0aG91dCBgZ2V0Q29tcHV0ZWRTdHlsZWAuXHJcbiAgICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSBzZXBwdWt1ID0gdHJ1ZTtcclxuICAgIC8vIERvbnTigJl0IGdldCBpbiBhIHdheSBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyBgcG9zaXRpb246IHN0aWNreWAgbmF0aXZlbHkuXHJcbiAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRlc3ROb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKFsnJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXS5zb21lKGZ1bmN0aW9uIChwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVzdE5vZGUuc3R5bGUucG9zaXRpb24gPSBwcmVmaXggKyAnc3RpY2t5JztcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXN0Tm9kZS5zdHlsZS5wb3NpdGlvbiAhPSAnJztcclxuICAgICAgICAgICAgfSkpIHNlcHB1a3UgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDIuIOKAnEdsb2JhbOKAnSB2YXJzIHVzZWQgYWNyb3NzIHRoZSBwb2x5ZmlsbFxyXG4gICAgICovXHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIFNoYWRvdyBSb290IGNvbnN0cnVjdG9yIGV4aXN0cyB0byBtYWtlIGZ1cnRoZXIgY2hlY2tzIHNpbXBsZXJcclxuICAgIHZhciBzaGFkb3dSb290RXhpc3RzID0gdHlwZW9mIFNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgXHJcbiAgICAvLyBMYXN0IHNhdmVkIHNjcm9sbCBwb3NpdGlvblxyXG4gICAgdmFyIHNjcm9sbCA9IHtcclxuICAgICAgICB0b3A6IG51bGwsXHJcbiAgICAgICAgbGVmdDogbnVsbFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLy8gQXJyYXkgb2YgY3JlYXRlZCBTdGlja3kgaW5zdGFuY2VzXHJcbiAgICB2YXIgc3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDMuIFV0aWxpdHkgZnVuY3Rpb25zXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRPYmosIHNvdXJjZU9iamVjdCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRPYmpba2V5XSA9IHNvdXJjZU9iamVjdFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwYXJzZU51bWVyaWModmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKSB8fCAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXREb2NPZmZzZXRUb3Aobm9kZSkge1xyXG4gICAgICAgIHZhciBkb2NPZmZzZXRUb3AgPSAwO1xyXG4gICAgXHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgZG9jT2Zmc2V0VG9wICs9IG5vZGUub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGRvY09mZnNldFRvcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDQuIFN0aWNreSBjbGFzc1xyXG4gICAgICovXHJcbiAgICBcclxuICAgIHZhciBTdGlja3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU3RpY2t5KG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0aWNreSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIEhUTUxFbGVtZW50Jyk7XHJcbiAgICAgICAgICAgIGlmIChzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kuX25vZGUgPT09IG5vZGU7XHJcbiAgICAgICAgICAgIH0pKSB0aHJvdyBuZXcgRXJyb3IoJ1N0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoaXMgbm9kZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgc3RpY2tpZXMucHVzaCh0aGlzKTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfY3JlYXRlQ2xhc3MoU3RpY2t5LCBbe1xyXG4gICAgICAgICAgICBrZXk6ICdyZWZyZXNoJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwcHVrdSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB0aGlzLl9kZWFjdGl2YXRlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5fbm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDEuIFNhdmUgbm9kZSBjb21wdXRlZCBwcm9wc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZUNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVDb21wdXRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogbm9kZUNvbXB1dGVkU3R5bGUudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vZGVDb21wdXRlZFN0eWxlLmRpc3BsYXksXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBub2RlQ29tcHV0ZWRTdHlsZS5tYXJnaW5Ub3AsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiBub2RlQ29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgY3NzRmxvYXQ6IG5vZGVDb21wdXRlZFN0eWxlLmNzc0Zsb2F0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogMi4gQ2hlY2sgaWYgdGhlIG5vZGUgY2FuIGJlIGFjdGl2YXRlZFxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4ocGFyc2VGbG9hdChub2RlQ29tcHV0ZWRQcm9wcy50b3ApKSB8fCBub2RlQ29tcHV0ZWRQcm9wcy5kaXNwbGF5ID09ICd0YWJsZS1jZWxsJyB8fCBub2RlQ29tcHV0ZWRQcm9wcy5kaXNwbGF5ID09ICdub25lJykgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogMy4gR2V0IG5lY2Vzc2FyeSBub2RlIHBhcmFtZXRlcnNcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlZmVyZW5jZU5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IHNoYWRvd1Jvb3RFeGlzdHMgJiYgcmVmZXJlbmNlTm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QgPyByZWZlcmVuY2VOb2RlLmhvc3QgOiByZWZlcmVuY2VOb2RlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVXaW5PZmZzZXQgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudFdpbk9mZnNldCA9IHBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocGFyZW50Tm9kZSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlOiBwYXJlbnROb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogcGFyZW50Tm9kZS5zdHlsZS5wb3NpdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0SGVpZ2h0OiBwYXJlbnROb2RlLm9mZnNldEhlaWdodFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldFRvV2luZG93ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG5vZGVXaW5PZmZzZXQubGVmdCxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC0gbm9kZVdpbk9mZnNldC5yaWdodFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29mZnNldFRvUGFyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogbm9kZVdpbk9mZnNldC50b3AgLSBwYXJlbnRXaW5PZmZzZXQudG9wIC0gcGFyc2VOdW1lcmljKHBhcmVudENvbXB1dGVkU3R5bGUuYm9yZGVyVG9wV2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IG5vZGVXaW5PZmZzZXQubGVmdCAtIHBhcmVudFdpbk9mZnNldC5sZWZ0IC0gcGFyc2VOdW1lcmljKHBhcmVudENvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoKSxcclxuICAgICAgICAgICAgICAgICAgICByaWdodDogLW5vZGVXaW5PZmZzZXQucmlnaHQgKyBwYXJlbnRXaW5PZmZzZXQucmlnaHQgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbm9kZS5zdHlsZS5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IG5vZGUuc3R5bGUudG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogbm9kZS5zdHlsZS5ib3R0b20sXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbm9kZS5zdHlsZS5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBub2RlLnN0eWxlLnJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBub2RlLnN0eWxlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZS5zdHlsZS5tYXJnaW5Ub3AsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogbm9kZS5zdHlsZS5tYXJnaW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBub2RlLnN0eWxlLm1hcmdpblJpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVRvcFZhbHVlID0gcGFyc2VOdW1lcmljKG5vZGVDb21wdXRlZFByb3BzLnRvcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW1pdHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG5vZGVXaW5PZmZzZXQudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gbm9kZVRvcFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGVuZDogcGFyZW50V2luT2Zmc2V0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCArIHBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0IC0gcGFyc2VOdW1lcmljKHBhcmVudENvbXB1dGVkU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpIC0gbm9kZS5vZmZzZXRIZWlnaHQgLSBub2RlVG9wVmFsdWUgLSBwYXJzZU51bWVyaWMobm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luQm90dG9tKVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDQuIEVuc3VyZSB0aGF0IHRoZSBub2RlIHdpbGwgYmUgcG9zaXRpb25lZCByZWxhdGl2ZWx5IHRvIHRoZSBwYXJlbnQgbm9kZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50UG9zaXRpb24gPSBwYXJlbnRDb21wdXRlZFN0eWxlLnBvc2l0aW9uO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyZW50UG9zaXRpb24gIT0gJ2Fic29sdXRlJyAmJiBwYXJlbnRQb3NpdGlvbiAhPSAncmVsYXRpdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA1LiBSZWNhbGMgbm9kZSBwb3NpdGlvbi5cclxuICAgICAgICAgICAgICAgICAqICAgIEl04oCZcyBpbXBvcnRhbnQgdG8gZG8gdGhpcyBiZWZvcmUgY2xvbmUgaW5qZWN0aW9uIHRvIGF2b2lkIHNjcm9sbGluZyBidWcgaW4gQ2hyb21lLlxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNhbGNQb3NpdGlvbigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogNi4gQ3JlYXRlIGEgY2xvbmVcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb25lID0gdGhpcy5fY2xvbmUgPSB7fTtcclxuICAgICAgICAgICAgICAgIGNsb25lLm5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgc3R5bGVzIHRvIHRoZSBjbG9uZVxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKGNsb25lLm5vZGUuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbm9kZVdpbk9mZnNldC5yaWdodCAtIG5vZGVXaW5PZmZzZXQubGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBub2RlV2luT2Zmc2V0LmJvdHRvbSAtIG5vZGVXaW5PZmZzZXQudG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpblRvcCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpbkJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5MZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiBub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5SaWdodCxcclxuICAgICAgICAgICAgICAgICAgICBjc3NGbG9hdDogbm9kZUNvbXB1dGVkUHJvcHMuY3NzRmxvYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyU3BhY2luZzogMCxcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogJzFlbScsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdzdGF0aWMnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlTm9kZS5pbnNlcnRCZWZvcmUoY2xvbmUubm9kZSwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICBjbG9uZS5kb2NPZmZzZXRUb3AgPSBnZXREb2NPZmZzZXRUb3AoY2xvbmUubm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ19yZWNhbGNQb3NpdGlvbicsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVjYWxjUG9zaXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBzdGlja3lNb2RlID0gc2Nyb2xsLnRvcCA8PSB0aGlzLl9saW1pdHMuc3RhcnQgPyAnc3RhcnQnIDogc2Nyb2xsLnRvcCA+PSB0aGlzLl9saW1pdHMuZW5kID8gJ2VuZCcgOiAnbWlkZGxlJztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0aWNreU1vZGUgPT0gc3RpY2t5TW9kZSkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0aWNreU1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9ub2RlLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuX29mZnNldFRvUGFyZW50LmxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuX29mZnNldFRvUGFyZW50LnJpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQudG9wICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdtaWRkbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fbm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLl9vZmZzZXRUb1dpbmRvdy5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLl9vZmZzZXRUb1dpbmRvdy5yaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHRoaXMuX3N0eWxlcy50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZW5kJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQubGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQucmlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3R0b206IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RpY2t5TW9kZSA9IHN0aWNreU1vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ19mYXN0Q2hlY2snLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2Zhc3RDaGVjaygpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlIHx8IHRoaXMuX3JlbW92ZWQpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGdldERvY09mZnNldFRvcCh0aGlzLl9jbG9uZS5ub2RlKSAtIHRoaXMuX2Nsb25lLmRvY09mZnNldFRvcCkgPiAxIHx8IE1hdGguYWJzKHRoaXMuX3BhcmVudC5ub2RlLm9mZnNldEhlaWdodCAtIHRoaXMuX3BhcmVudC5vZmZzZXRIZWlnaHQpID4gMSkgdGhpcy5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ19kZWFjdGl2YXRlJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9kZWFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUgfHwgdGhpcy5fcmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG9uZS5ub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fY2xvbmUubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fY2xvbmU7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9ub2RlLnN0eWxlLCB0aGlzLl9zdHlsZXMpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3N0eWxlcztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciBlbGVtZW504oCZcyBwYXJlbnQgbm9kZSBpcyB1c2VkIGJ5IG90aGVyIHN0aWNraWVzLlxyXG4gICAgICAgICAgICAgICAgLy8gSWYgbm90LCByZXN0b3JlIHBhcmVudCBub2Rl4oCZcyBzdHlsZXMuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kgIT09IF90aGlzICYmIHN0aWNreS5fcGFyZW50ICYmIHN0aWNreS5fcGFyZW50Lm5vZGUgPT09IF90aGlzLl9wYXJlbnQubm9kZTtcclxuICAgICAgICAgICAgICAgIH0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX3BhcmVudC5ub2RlLnN0eWxlLCB0aGlzLl9wYXJlbnQuc3R5bGVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wYXJlbnQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0aWNreU1vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vZmZzZXRUb1dpbmRvdztcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vZmZzZXRUb1BhcmVudDtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9saW1pdHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIGtleTogJ3JlbW92ZScsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVhY3RpdmF0ZSgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3ksIGluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0aWNreS5fbm9kZSA9PT0gX3RoaXMyLl9ub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0aWNraWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dKTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBTdGlja3k7XHJcbiAgICB9KCk7XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiA1LiBTdGlja3lmaWxsIEFQSVxyXG4gICAgICovXHJcbiAgICBcclxuICAgIFxyXG4gICAgdmFyIFN0aWNreWZpbGwgPSB7XHJcbiAgICAgICAgc3RpY2tpZXM6IHN0aWNraWVzLFxyXG4gICAgICAgIFN0aWNreTogU3RpY2t5LFxyXG4gICAgXHJcbiAgICAgICAgYWRkT25lOiBmdW5jdGlvbiBhZGRPbmUobm9kZSkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGl04oCZcyBhIG5vZGVcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWF5YmUgaXTigJlzIGEgbm9kZSBsaXN0IG9mIHNvbWUgc29ydD9cclxuICAgICAgICAgICAgICAgIC8vIFRha2UgZmlyc3Qgbm9kZSBmcm9tIHRoZSBsaXN0IHRoZW5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmxlbmd0aCAmJiBub2RlWzBdKSBub2RlID0gbm9kZVswXTtlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIFN0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoZSBub2RlXHJcbiAgICAgICAgICAgIC8vIGFuZCByZXR1cm4gZXhpc3Rpbmcgc3RpY2t5XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja2llc1tpXS5fbm9kZSA9PT0gbm9kZSkgcmV0dXJuIHN0aWNraWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gbmV3IHN0aWNreVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0aWNreShub2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIElmIGl04oCZcyBhIG5vZGUgbWFrZSBhbiBhcnJheSBvZiBvbmUgbm9kZVxyXG4gICAgICAgICAgICBpZiAobm9kZUxpc3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgbm9kZUxpc3QgPSBbbm9kZUxpc3RdO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYXJndW1lbnQgaXMgYW4gaXRlcmFibGUgb2Ygc29tZSBzb3J0XHJcbiAgICAgICAgICAgIGlmICghbm9kZUxpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQWRkIGV2ZXJ5IGVsZW1lbnQgYXMgYSBzdGlja3kgYW5kIHJldHVybiBhbiBhcnJheSBvZiBjcmVhdGVkIFN0aWNreSBpbnN0YW5jZXNcclxuICAgICAgICAgICAgdmFyIGFkZGVkU3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdOKAmXMgbm90IGFuIEhUTUxFbGVtZW50IOKAkyBjcmVhdGUgYW4gZW1wdHkgZWxlbWVudCB0byBwcmVzZXJ2ZSAxLXRvLTFcclxuICAgICAgICAgICAgICAgIC8vIGNvcnJlbGF0aW9uIHdpdGggaW5wdXQgbGlzdFxyXG4gICAgICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkU3RpY2tpZXMucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnY29udGludWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBTdGlja3lmaWxsIGlzIGFscmVhZHkgYXBwbGllZCB0byB0aGUgbm9kZVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGV4aXN0aW5nIHN0aWNreVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKHN0aWNreSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSByZXR1cm4gJ2NvbnRpbnVlJztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgbmV3IHN0aWNreVxyXG4gICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKG5ldyBTdGlja3kobm9kZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcmV0ID0gX2xvb3AoaSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChfcmV0ID09PSAnY29udGludWUnKSBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIHJldHVybiBhZGRlZFN0aWNraWVzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVmcmVzaEFsbDogZnVuY3Rpb24gcmVmcmVzaEFsbCgpIHtcclxuICAgICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW1vdmVPbmU6IGZ1bmN0aW9uIHJlbW92ZU9uZShub2RlKSB7XHJcbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgaXTigJlzIGEgbm9kZVxyXG4gICAgICAgICAgICBpZiAoIShub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXliZSBpdOKAmXMgYSBub2RlIGxpc3Qgb2Ygc29tZSBzb3J0P1xyXG4gICAgICAgICAgICAgICAgLy8gVGFrZSBmaXJzdCBub2RlIGZyb20gdGhlIGxpc3QgdGhlblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubGVuZ3RoICYmIG5vZGVbMF0pIG5vZGUgPSBub2RlWzBdO2Vsc2UgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzdGlja2llcyBib3VuZCB0byB0aGUgbm9kZXMgaW4gdGhlIGxpc3RcclxuICAgICAgICAgICAgc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Ll9ub2RlID09PSBub2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RpY2t5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIElmIGl04oCZcyBhIG5vZGUgbWFrZSBhbiBhcnJheSBvZiBvbmUgbm9kZVxyXG4gICAgICAgICAgICBpZiAobm9kZUxpc3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgbm9kZUxpc3QgPSBbbm9kZUxpc3RdO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYXJndW1lbnQgaXMgYW4gaXRlcmFibGUgb2Ygc29tZSBzb3J0XHJcbiAgICAgICAgICAgIGlmICghbm9kZUxpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzdGlja2llcyBib3VuZCB0byB0aGUgbm9kZXMgaW4gdGhlIGxpc3RcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgX2xvb3AyID0gZnVuY3Rpb24gX2xvb3AyKGkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gbm9kZUxpc3RbaV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2t5LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9vcDIoaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZUFsbDogZnVuY3Rpb24gcmVtb3ZlQWxsKCkge1xyXG4gICAgICAgICAgICB3aGlsZSAoc3RpY2tpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBzdGlja2llc1swXS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiA2LiBTZXR1cCBldmVudHMgKHVubGVzcyB0aGUgcG9seWZpbGwgd2FzIGRpc2FibGVkKVxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIC8vIFdhdGNoIGZvciBzY3JvbGwgcG9zaXRpb24gY2hhbmdlcyBhbmQgdHJpZ2dlciByZWNhbGMvcmVmcmVzaCBpZiBuZWVkZWRcclxuICAgICAgICBmdW5jdGlvbiBjaGVja1Njcm9sbCgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5wYWdlWE9mZnNldCAhPSBzY3JvbGwubGVmdCkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLnRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgICAgIHNjcm9sbC5sZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBTdGlja3lmaWxsLnJlZnJlc2hBbGwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cucGFnZVlPZmZzZXQgIT0gc2Nyb2xsLnRvcCkge1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLnRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgICAgIHNjcm9sbC5sZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyByZWNhbGMgcG9zaXRpb24gZm9yIGFsbCBzdGlja2llc1xyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreS5fcmVjYWxjUG9zaXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY2hlY2tTY3JvbGwoKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tTY3JvbGwpO1xyXG4gICAgXHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIHdpbmRvdyByZXNpemVzIGFuZCBkZXZpY2Ugb3JpZW50YXRpb24gY2hhbmdlcyBhbmQgdHJpZ2dlciByZWZyZXNoXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIFN0aWNreWZpbGwucmVmcmVzaEFsbCk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgU3RpY2t5ZmlsbC5yZWZyZXNoQWxsKTtcclxuICAgIFxyXG4gICAgICAgIC8vRmFzdCBkaXJ0eSBjaGVjayBmb3IgbGF5b3V0IGNoYW5nZXMgZXZlcnkgNTAwbXNcclxuICAgICAgICB2YXIgZmFzdENoZWNrVGltZXIgPSB2b2lkIDA7XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBzdGFydEZhc3RDaGVja1RpbWVyKCkge1xyXG4gICAgICAgICAgICBmYXN0Q2hlY2tUaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzLmZvckVhY2goZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kuX2Zhc3RDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcEZhc3RDaGVja1RpbWVyKCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGZhc3RDaGVja1RpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICB2YXIgZG9jSGlkZGVuS2V5ID0gdm9pZCAwO1xyXG4gICAgICAgIHZhciB2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lID0gdm9pZCAwO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCdoaWRkZW4nIGluIGRvY3VtZW50KSB7XHJcbiAgICAgICAgICAgIGRvY0hpZGRlbktleSA9ICdoaWRkZW4nO1xyXG4gICAgICAgICAgICB2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJ3dlYmtpdEhpZGRlbicgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgZG9jSGlkZGVuS2V5ID0gJ3dlYmtpdEhpZGRlbic7XHJcbiAgICAgICAgICAgIHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUgPSAnd2Via2l0dmlzaWJpbGl0eWNoYW5nZSc7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYgKHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFkb2N1bWVudFtkb2NIaWRkZW5LZXldKSBzdGFydEZhc3RDaGVja1RpbWVyKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnRbZG9jSGlkZGVuS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3BGYXN0Q2hlY2tUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydEZhc3RDaGVja1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBzdGFydEZhc3RDaGVja1RpbWVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGlmICghc2VwcHVrdSkgaW5pdCgpO1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogNy4gRXhwb3NlIFN0aWNreWZpbGxcclxuICAgICAqL1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgIT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFN0aWNreWZpbGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy5TdGlja3lmaWxsID0gU3RpY2t5ZmlsbDtcclxuICAgIH1cclxuICAgIFxyXG59KSh3aW5kb3csIGRvY3VtZW50KTsiLCIvKiEgZ3Vtc2hvZWpzIHYzLjUuMCB8IChjKSAyMDE3IENocmlzIEZlcmRpbmFuZGkgfCBNSVQgTGljZW5zZSB8IGh0dHA6Ly9naXRodWIuY29tL2NmZXJkaW5hbmRpL2d1bXNob2UgKi9cbiEoZnVuY3Rpb24oZSx0KXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFtdLHQoZSkpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPXQoZSk6ZS5ndW1zaG9lPXQoZSl9KShcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDp0aGlzLndpbmRvd3x8dGhpcy5nbG9iYWwsKGZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO3ZhciB0LG4sbyxyLGEsYyxpLGw9e30scz1cInF1ZXJ5U2VsZWN0b3JcImluIGRvY3VtZW50JiZcImFkZEV2ZW50TGlzdGVuZXJcImluIGUmJlwiY2xhc3NMaXN0XCJpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSx1PVtdLGY9e3NlbGVjdG9yOlwiW2RhdGEtZ3Vtc2hvZV0gYVwiLHNlbGVjdG9ySGVhZGVyOlwiW2RhdGEtZ3Vtc2hvZS1oZWFkZXJdXCIsY29udGFpbmVyOmUsb2Zmc2V0OjAsYWN0aXZlQ2xhc3M6XCJhY3RpdmVcIixzY3JvbGxEZWxheTohMSxjYWxsYmFjazpmdW5jdGlvbigpe319LGQ9ZnVuY3Rpb24oZSx0LG4pe2lmKFwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpZm9yKHZhciBvIGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsbykmJnQuY2FsbChuLGVbb10sbyxlKTtlbHNlIGZvcih2YXIgcj0wLGE9ZS5sZW5ndGg7cjxhO3IrKyl0LmNhbGwobixlW3JdLHIsZSl9LHY9ZnVuY3Rpb24oKXt2YXIgZT17fSx0PSExLG49MCxvPWFyZ3VtZW50cy5sZW5ndGg7XCJbb2JqZWN0IEJvb2xlYW5dXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnRzWzBdKSYmKHQ9YXJndW1lbnRzWzBdLG4rKyk7Zm9yKDtuPG87bisrKXt2YXIgcj1hcmd1bWVudHNbbl07IShmdW5jdGlvbihuKXtmb3IodmFyIG8gaW4gbilPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobixvKSYmKHQmJlwiW29iamVjdCBPYmplY3RdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobltvXSk/ZVtvXT12KCEwLGVbb10sbltvXSk6ZVtvXT1uW29dKX0pKHIpfXJldHVybiBlfSxtPWZ1bmN0aW9uKGUpe3JldHVybiBNYXRoLm1heChlLnNjcm9sbEhlaWdodCxlLm9mZnNldEhlaWdodCxlLmNsaWVudEhlaWdodCl9LGc9ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0LGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpfSxoPWZ1bmN0aW9uKGUpe3ZhciBuPTA7aWYoZS5vZmZzZXRQYXJlbnQpZG97bis9ZS5vZmZzZXRUb3AsZT1lLm9mZnNldFBhcmVudH13aGlsZShlKTtlbHNlIG49ZS5vZmZzZXRUb3A7cmV0dXJuIG49bi1hLXQub2Zmc2V0LG4+PTA/bjowfSxwPWZ1bmN0aW9uKHQpe3ZhciBuPXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJuIG4udG9wPj0wJiZuLmxlZnQ+PTAmJm4uYm90dG9tPD0oZS5pbm5lckhlaWdodHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkmJm4ucmlnaHQ8PShlLmlubmVyV2lkdGh8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCl9LHk9ZnVuY3Rpb24oKXt1LnNvcnQoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuZGlzdGFuY2U+dC5kaXN0YW5jZT8tMTplLmRpc3RhbmNlPHQuZGlzdGFuY2U/MTowfSkpfTtsLnNldERpc3RhbmNlcz1mdW5jdGlvbigpe289ZygpLGE9cj9tKHIpK2gocik6MCxkKHUsKGZ1bmN0aW9uKGUpe2UuZGlzdGFuY2U9aChlLnRhcmdldCl9KSkseSgpfTt2YXIgYj1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodC5zZWxlY3Rvcik7ZChlLChmdW5jdGlvbihlKXtpZihlLmhhc2gpe3ZhciB0PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZS5oYXNoKTt0JiZ1LnB1c2goe25hdjplLHRhcmdldDp0LHBhcmVudDpcImxpXCI9PT1lLnBhcmVudE5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpP2UucGFyZW50Tm9kZTpudWxsLGRpc3RhbmNlOjB9KX19KSl9LEg9ZnVuY3Rpb24oKXtjJiYoYy5uYXYuY2xhc3NMaXN0LnJlbW92ZSh0LmFjdGl2ZUNsYXNzKSxjLnBhcmVudCYmYy5wYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSh0LmFjdGl2ZUNsYXNzKSl9LEM9ZnVuY3Rpb24oZSl7SCgpLGUubmF2LmNsYXNzTGlzdC5hZGQodC5hY3RpdmVDbGFzcyksZS5wYXJlbnQmJmUucGFyZW50LmNsYXNzTGlzdC5hZGQodC5hY3RpdmVDbGFzcyksdC5jYWxsYmFjayhlKSxjPXtuYXY6ZS5uYXYscGFyZW50OmUucGFyZW50fX07bC5nZXRDdXJyZW50TmF2PWZ1bmN0aW9uKCl7dmFyIG49ZS5wYWdlWU9mZnNldDtpZihlLmlubmVySGVpZ2h0K24+PW8mJnAodVswXS50YXJnZXQpKXJldHVybiBDKHVbMF0pLHVbMF07Zm9yKHZhciByPTAsYT11Lmxlbmd0aDtyPGE7cisrKXt2YXIgYz11W3JdO2lmKGMuZGlzdGFuY2U8PW4pcmV0dXJuIEMoYyksY31IKCksdC5jYWxsYmFjaygpfTt2YXIgTD1mdW5jdGlvbigpe2QodSwoZnVuY3Rpb24oZSl7ZS5uYXYuY2xhc3NMaXN0LmNvbnRhaW5zKHQuYWN0aXZlQ2xhc3MpJiYoYz17bmF2OmUubmF2LHBhcmVudDplLnBhcmVudH0pfSkpfTtsLmRlc3Ryb3k9ZnVuY3Rpb24oKXt0JiYodC5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGosITEpLHQuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixqLCExKSx1PVtdLHQ9bnVsbCxuPW51bGwsbz1udWxsLHI9bnVsbCxhPW51bGwsYz1udWxsLGk9bnVsbCl9O3ZhciBFPWZ1bmN0aW9uKGUpe3dpbmRvdy5jbGVhclRpbWVvdXQobiksbj1zZXRUaW1lb3V0KChmdW5jdGlvbigpe2wuc2V0RGlzdGFuY2VzKCksbC5nZXRDdXJyZW50TmF2KCl9KSw2Nil9LGo9ZnVuY3Rpb24oZSl7bnx8KG49c2V0VGltZW91dCgoZnVuY3Rpb24oKXtuPW51bGwsXCJzY3JvbGxcIj09PWUudHlwZSYmbC5nZXRDdXJyZW50TmF2KCksXCJyZXNpemVcIj09PWUudHlwZSYmKGwuc2V0RGlzdGFuY2VzKCksbC5nZXRDdXJyZW50TmF2KCkpfSksNjYpKX07cmV0dXJuIGwuaW5pdD1mdW5jdGlvbihlKXtzJiYobC5kZXN0cm95KCksdD12KGYsZXx8e30pLHI9ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0LnNlbGVjdG9ySGVhZGVyKSxiKCksMCE9PXUubGVuZ3RoJiYoTCgpLGwuc2V0RGlzdGFuY2VzKCksbC5nZXRDdXJyZW50TmF2KCksdC5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGosITEpLHQuc2Nyb2xsRGVsYXk/dC5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLEUsITEpOnQuY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixqLCExKSkpfSxsfSkpOyIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmV4cG9ydCBjb25zdCB0b2dnbGVFeHBhbmRhYmxlID0gKFxuICB0b2dnbGVFbGVtZW50LFxuICB7XG4gICAgY29udGV4dCA9IGRvY3VtZW50LFxuICAgIGZvcmNlQ2xvc2UgPSBmYWxzZSxcbiAgICBjbG9zZVNpYmxpbmdzID0gZmFsc2UsXG4gICAgc2libGluZ3NTZWxlY3RvciA9ICdbYXJpYS1jb250cm9sc11bYXJpYS1leHBhbmRlZF0nLFxuICB9ID0ge31cbikgPT4ge1xuICBpZiAoIXRvZ2dsZUVsZW1lbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgdGFyZ2V0IGVsZW1lbnRcbiAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKVxuICApO1xuXG4gIC8vIEV4aXQgaWYgbm8gdGFyZ2V0IGZvdW5kXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IGN1cnJlbnQgc3RhdHVzXG4gIGNvbnN0IGlzRXhwYW5kZWQgPVxuICAgIGZvcmNlQ2xvc2UgPT09IHRydWUgfHxcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcpID09PSAndHJ1ZSc7XG5cbiAgLy8gVG9nZ2xlIHRoZSBleHBhbmRhYmxlL2NvbGxhcHNpYmxlXG4gIHRvZ2dsZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgIWlzRXhwYW5kZWQpO1xuICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGlzRXhwYW5kZWQpO1xuXG4gIC8vIFRvZ2dsZSBsYWJlbCBpZiBwb3NzaWJsZVxuICBpZiAoIWlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtZXhwYW5kZWQnKSkge1xuICAgIHRvZ2dsZUVsZW1lbnQuaW5uZXJIVE1MID0gdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtZXhwYW5kZWQnKTtcbiAgfSBlbHNlIGlmIChpc0V4cGFuZGVkICYmIHRvZ2dsZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsLWNvbGxhcHNlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZShcbiAgICAgICdkYXRhLWxhYmVsLWNvbGxhcHNlZCdcbiAgICApO1xuICB9XG5cbiAgLy8gQ2xvc2Ugc2libGluZ3MgaWYgcmVxdWVzdGVkXG4gIGlmIChjbG9zZVNpYmxpbmdzID09PSB0cnVlKSB7XG4gICAgY29uc3Qgc2libGluZ3NBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuICAgICAgLmNhbGwoY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNpYmxpbmdzU2VsZWN0b3IpKVxuICAgICAgLmZpbHRlcihzaWJsaW5nID0+IHNpYmxpbmcgIT09IHRvZ2dsZUVsZW1lbnQpO1xuXG4gICAgc2libGluZ3NBcnJheS5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShzaWJsaW5nLCB7XG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZvcmNlQ2xvc2U6IHRydWUsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufTtcblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBleHBhbmRhYmxlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBjb25zdCBpbml0RXhwYW5kYWJsZXMgPSAoc2VsZWN0b3IsIGNvbnRleHQgPSBkb2N1bWVudCkgPT4ge1xuICAvLyBFeGl0IGlmIG5vIHNlbGVjdG9yIHdhcyBwcm92aWRlZFxuICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG5cbiAgY29uc3Qgbm9kZXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilcbiAgKTtcblxuICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PlxuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUobm9kZSwgeyBjb250ZXh0IH0pO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pXG4gICk7XG59O1xuIiwiLyoqXG4gKiBOYXZpZ2F0aW9uIGlucGFnZSByZWxhdGVkIGJlaGF2aW9ycy5cbiAqL1xuXG5pbXBvcnQgU3RpY2t5ZmlsbCBmcm9tICdzdGlja3lmaWxsanMnO1xuaW1wb3J0IGd1bXNob2UgZnJvbSAnZ3Vtc2hvZWpzJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuaW1wb3J0IHsgdG9nZ2xlRXhwYW5kYWJsZSB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG5hdmlnYXRpb25JbnBhZ2VzID0gKHtcbiAgc3RpY2t5U2VsZWN0b3I6IHN0aWNreVNlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb24nLFxuICBzcHlTZWxlY3Rvcjogc3B5U2VsZWN0b3IgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fbGluaycsXG4gIHNweUNsYXNzOiBzcHlDbGFzcyA9ICdlY2wtaW5wYWdlLW5hdmlnYXRpb25fX2xpbmstLWlzLWFjdGl2ZScsXG4gIHNweUFjdGl2ZUNvbnRhaW5lcjogc3B5QWN0aXZlQ29udGFpbmVyID0gJ2VjbC1pbnBhZ2UtbmF2aWdhdGlvbi0tdmlzaWJsZScsXG4gIHNweVRyaWdnZXI6IHNweVRyaWdnZXIgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fdHJpZ2dlcicsXG4gIHNweU9mZnNldDogc3B5T2Zmc2V0ID0gMjAsXG4gIHRvZ2dsZVNlbGVjdG9yOiB0b2dnbGVTZWxlY3RvciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX190cmlnZ2VyJyxcbiAgbGlua3NTZWxlY3RvcjogbGlua3NTZWxlY3RvciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX19saW5rJyxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICBsZXQgc3RpY2t5SW5zdGFuY2U7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBpbml0U3RpY2t5KGVsZW1lbnQpIHtcbiAgICBzdGlja3lJbnN0YW5jZSA9IG5ldyBTdGlja3lmaWxsLlN0aWNreShlbGVtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3lTdGlja3koKSB7XG4gICAgaWYgKHN0aWNreUluc3RhbmNlKSB7XG4gICAgICBzdGlja3lJbnN0YW5jZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0U2Nyb2xsU3B5KGlucGFnZU5hdkVsZW1lbnQpIHtcbiAgICBndW1zaG9lLmluaXQoe1xuICAgICAgc2VsZWN0b3I6IHNweVNlbGVjdG9yLFxuICAgICAgYWN0aXZlQ2xhc3M6IHNweUNsYXNzLFxuICAgICAgb2Zmc2V0OiBzcHlPZmZzZXQsXG4gICAgICBjYWxsYmFjayhuYXYpIHtcbiAgICAgICAgY29uc3QgbmF2aWdhdGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzcHlUcmlnZ2VyKTtcblxuICAgICAgICBpZiAoIW5hdikge1xuICAgICAgICAgIGlucGFnZU5hdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzcHlBY3RpdmVDb250YWluZXIpO1xuICAgICAgICAgIG5hdmlnYXRpb25UaXRsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnBhZ2VOYXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoc3B5QWN0aXZlQ29udGFpbmVyKTtcbiAgICAgICAgICBuYXZpZ2F0aW9uVGl0bGUuaW5uZXJIVE1MID0gbmF2Lm5hdi5pbm5lckhUTUw7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95U2Nyb2xsU3B5KCkge1xuICAgIGd1bXNob2UuZGVzdHJveSgpO1xuICB9XG5cbiAgLy8gSW5pdFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IGlucGFnZU5hdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0aWNreVNlbGVjdG9yKTtcbiAgICBjb25zdCB0b2dnbGVFbGVtZW50ID0gaW5wYWdlTmF2RWxlbWVudC5xdWVyeVNlbGVjdG9yKHRvZ2dsZVNlbGVjdG9yKTtcbiAgICBjb25zdCBuYXZMaW5rcyA9IHF1ZXJ5QWxsKGxpbmtzU2VsZWN0b3IsIGlucGFnZU5hdkVsZW1lbnQpO1xuXG4gICAgaW5pdFN0aWNreShpbnBhZ2VOYXZFbGVtZW50KTtcbiAgICBpbml0U2Nyb2xsU3B5KGlucGFnZU5hdkVsZW1lbnQpO1xuXG4gICAgdG9nZ2xlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZSh0b2dnbGVFbGVtZW50LCB7IGNvbnRleHQ6IGlucGFnZU5hdkVsZW1lbnQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICBuYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT5cbiAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZUV4cGFuZGFibGUodG9nZ2xlRWxlbWVudCwge1xuICAgICAgICAgIGNvbnRleHQ6IGlucGFnZU5hdkVsZW1lbnQsXG4gICAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvLyBEZXN0cm95XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZGVzdHJveVNjcm9sbFNweSgpO1xuICAgIGRlc3Ryb3lTdGlja3koKTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbmF2aWdhdGlvbklucGFnZXM7XG4iLCJpbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tJztcbmltcG9ydCB7IHRvZ2dsZUV4cGFuZGFibGUgfSBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUnO1xuXG5jb25zdCBvbkNsaWNrID0gKG5vZGUsIG1lbnUpID0+IGUgPT4ge1xuICBpZiAobm9kZSAmJiBub2RlLmhhc0F0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcpKSB7XG4gICAgY29uc3QgaGFzUG9wdXAgPSBub2RlLmdldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcpO1xuICAgIGlmIChoYXNQb3B1cCA9PT0gJycgfHwgaGFzUG9wdXAgPT09ICd0cnVlJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKG5vZGUsIHtcbiAgICAgICAgY29udGV4dDogbWVudSxcbiAgICAgICAgY2xvc2VTaWJsaW5nczogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3Qgb25LZXlkb3duID0gKG5vZGUsIG1lbnUpID0+IGUgPT4ge1xuICBjb25zdCBjdXJyZW50VGFiID0gbm9kZS5wYXJlbnRFbGVtZW50O1xuICBjb25zdCBwcmV2aW91c1RhYkl0ZW0gPVxuICAgIGN1cnJlbnRUYWIucHJldmlvdXNFbGVtZW50U2libGluZyB8fFxuICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xuICBjb25zdCBuZXh0VGFiSXRlbSA9XG4gICAgY3VycmVudFRhYi5uZXh0RWxlbWVudFNpYmxpbmcgfHwgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuXG4gIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgaWYgKGUubWV0YUtleSB8fCBlLmFsdEtleSkgcmV0dXJuO1xuXG4gIC8vIGNhdGNoIGxlZnQvcmlnaHQgYW5kIHVwL2Rvd24gYXJyb3cga2V5IGV2ZW50c1xuICAvLyBpZiBuZXcgbmV4dC9wcmV2IHRhYiBhdmFpbGFibGUsIHNob3cgaXQgYnkgcGFzc2luZyB0YWIgYW5jaG9yIHRvIHNob3dUYWIgbWV0aG9kXG4gIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgLy8gRU5URVIgb3IgU1BBQ0VcbiAgICBjYXNlIDEzOlxuICAgIGNhc2UgMzI6XG4gICAgICBvbkNsaWNrKGUuY3VycmVudFRhcmdldCwgbWVudSkoZSk7XG4gICAgICBicmVhaztcbiAgICAvLyBBUlJPV1MgTEVGVCBhbmQgVVBcbiAgICBjYXNlIDM3OlxuICAgIGNhc2UgMzg6XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBwcmV2aW91c1RhYkl0ZW0ucXVlcnlTZWxlY3RvcignYScpLmZvY3VzKCk7XG4gICAgICBicmVhaztcbiAgICAvLyBBUlJPV1MgUklHSFQgYW5kIERPV05cbiAgICBjYXNlIDM5OlxuICAgIGNhc2UgNDA6XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBuZXh0VGFiSXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuZm9jdXMoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1lZ2FtZW51ID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51JyxcbiAgdG9nZ2xlU2VsZWN0b3I6IHRvZ2dsZVNlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51X190b2dnbGUnLFxuICBsaXN0U2VsZWN0b3I6IGxpc3RTZWxlY3RvciA9ICcuZWNsLW5hdmlnYXRpb24tbWVudV9fcm9vdCcsXG4gIGxpbmtTZWxlY3RvcjogbGlua1NlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51X19saW5rJyxcbn0gPSB7fSkgPT4ge1xuICBjb25zdCBtZWdhbWVudXNBcnJheSA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICBtZWdhbWVudXNBcnJheS5mb3JFYWNoKG1lbnUgPT4ge1xuICAgIC8vIE1ha2UgdGhlIHRvZ2dsZSBleHBhbmRhYmxlXG4gICAgY29uc3QgdG9nZ2xlID0gbWVudS5xdWVyeVNlbGVjdG9yKHRvZ2dsZVNlbGVjdG9yKTtcbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICB0b2dnbGVFeHBhbmRhYmxlKHRvZ2dsZSwgeyBjb250ZXh0OiBtZW51IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEdldCB0aGUgbGlzdCBvZiBsaW5rc1xuICAgIGNvbnN0IGxpc3QgPSBtZW51LnF1ZXJ5U2VsZWN0b3IobGlzdFNlbGVjdG9yKTtcblxuICAgIC8vIEdldCBleHBhbmRhYmxlcyB3aXRoaW4gdGhlIGxpc3RcbiAgICBjb25zdCBub2Rlc0FycmF5ID0gcXVlcnlBbGwobGlua1NlbGVjdG9yLCBsaXN0KTtcblxuICAgIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKG5vZGUsIGxpc3QpKTtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5ZG93bihub2RlLCBsaXN0KSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbWVnYW1lbnU7XG4iLCIvKipcbiAgc3RpY2t5Yml0cyAtIFN0aWNreWJpdHMgaXMgYSBsaWdodHdlaWdodCBhbHRlcm5hdGl2ZSB0byBgcG9zaXRpb246IHN0aWNreWAgcG9seWZpbGxzXG4gIEB2ZXJzaW9uIHYzLjMuMlxuICBAbGluayBodHRwczovL2dpdGh1Yi5jb20vZG9sbGFyc2hhdmVjbHViL3N0aWNreWJpdHMjcmVhZG1lXG4gIEBhdXRob3IgSmVmZiBXYWlud3JpZ2h0IDx5b3dhaW53cmlnaHRAZ21haWwuY29tPiAoaHR0cHM6Ly9qZWZmcnkuaW4pXG4gIEBsaWNlbnNlIE1JVFxuKiovXG4vKlxuICBTVElDS1lCSVRTIPCfkolcbiAgLS0tLS0tLS1cbiAgPiBhIGxpZ2h0d2VpZ2h0IGFsdGVybmF0aXZlIHRvIGBwb3NpdGlvbjogc3RpY2t5YCBwb2x5ZmlsbHMg8J+NrFxuICAtLS0tLS0tLVxuICAtIGVhY2ggbWV0aG9kIGlzIGRvY3VtZW50ZWQgYWJvdmUgaXQgb3VyIHZpZXcgdGhlIHJlYWRtZVxuICAtIFN0aWNreWJpdHMgZG9lcyBub3QgbWFuYWdlIHBvbHltb3JwaGljIGZ1bmN0aW9uYWxpdHkgKHBvc2l0aW9uIGxpa2UgcHJvcGVydGllcylcbiAgKiBwb2x5bW9ycGhpYyBmdW5jdGlvbmFsaXR5OiAoaW4gdGhlIGNvbnRleHQgb2YgZGVzY3JpYmluZyBTdGlja3liaXRzKVxuICAgIG1lYW5zIG1ha2luZyB0aGluZ3MgbGlrZSBgcG9zaXRpb246IHN0aWNreWAgYmUgbG9vc2VseSBzdXBwb3J0ZWQgd2l0aCBwb3NpdGlvbiBmaXhlZC5cbiAgICBJdCBhbHNvIG1lYW5zIHRoYXQgZmVhdHVyZXMgbGlrZSBgdXNlU3RpY2t5Q2xhc3Nlc2AgdGFrZXMgb24gc3R5bGVzIGxpa2UgYHBvc2l0aW9uOiBmaXhlZGAuXG4gIC0tLS0tLS0tXG4gIGRlZmF1bHRzIPCflIxcbiAgLS0tLS0tLS1cbiAgLSB2ZXJzaW9uID0gYHBhY2thZ2UuanNvbmAgdmVyc2lvblxuICAtIHVzZXJBZ2VudCA9IHZpZXdlciBicm93c2VyIGFnZW50XG4gIC0gdGFyZ2V0ID0gRE9NIGVsZW1lbnQgc2VsZWN0b3JcbiAgLSBub1N0eWxlcyA9IGJvb2xlYW5cbiAgLSBvZmZzZXQgPSBudW1iZXJcbiAgLSBwYXJlbnRDbGFzcyA9ICdzdHJpbmcnXG4gIC0gc2Nyb2xsRWwgPSB3aW5kb3cgfHwgRE9NIGVsZW1lbnQgc2VsZWN0b3JcbiAgLSBzdGlja3lDbGFzcyA9ICdzdHJpbmcnXG4gIC0gc3R1Y2tDbGFzcyA9ICdzdHJpbmcnXG4gIC0gdXNlU3RpY2t5Q2xhc3NlcyA9IGJvb2xlYW5cbiAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gJ3N0cmluZydcbiAgLS0tLS0tLS1cbiAgcHJvcHPwn5SMXG4gIC0tLS0tLS0tXG4gIC0gcCA9IHByb3BzIHtvYmplY3R9XG4gIC0tLS0tLS0tXG4gIGluc3RhbmNlIG5vdGVcbiAgLS0tLS0tLS1cbiAgLSBzdGlja3liaXRzIHBhcmVudCBtZXRob2RzIHJldHVybiB0aGlzXG4gIC0gc3RpY2t5Yml0cyBpbnN0YW5jZSBtZXRob2RzIHJldHVybiBhbiBpbnN0YW5jZSBpdGVtXG4gIC0tLS0tLS0tXG4gIG5vbWVuY2xhdHVyZVxuICAtLS0tLS0tLVxuICAtIHRhcmdldCA9PiBlbCA9PiBlXG4gIC0gcHJvcHMgPT4gbyB8fCBwXG4gIC0gaW5zdGFuY2UgPT4gaXRlbSA9PiBpdFxuICAtLS0tLS0tLVxuICBtZXRob2RzXG4gIC0tLS0tLS0tXG4gIC0gLmRlZmluZVBvc2l0aW9uID0gZGVmaW5lcyBzdGlja3kgb3IgZml4ZWRcbiAgLSAuYWRkSW5zdGFuY2UgPSBhbiBhcnJheSBvZiBvYmplY3RzIGZvciBlYWNoIFN0aWNreWJpdHMgVGFyZ2V0XG4gIC0gLmdldENsb3Nlc3RQYXJlbnQgPSBnZXRzIHRoZSBwYXJlbnQgZm9yIG5vbi13aW5kb3cgc2Nyb2xsXG4gIC0gLmdldE9mZnNldFRvcCA9IGdldHMgdGhlIGVsZW1lbnQgb2Zmc2V0VG9wIGZyb20gdGhlIHRvcCBsZXZlbCBvZiB0aGUgRE9NXG4gIC0gLmNvbXB1dGVTY3JvbGxPZmZzZXRzID0gY29tcHV0ZXMgc2Nyb2xsIHBvc2l0aW9uXG4gIC0gLnRvZ2dsZUNsYXNzZXMgPSBvbGRlciBicm93c2VyIHRvZ2dsZXJcbiAgLSAubWFuYWdlU3RhdGUgPSBtYW5hZ2VzIHN0aWNreSBzdGF0ZVxuICAtIC5yZW1vdmVDbGFzcyA9IG9sZGVyIGJyb3dzZXIgc3VwcG9ydCBjbGFzcyByZW1vdmVyXG4gIC0gLnJlbW92ZUluc3RhbmNlID0gcmVtb3ZlcyBhbiBpbnN0YW5jZVxuICAtIC5jbGVhbnVwID0gcmVtb3ZlcyBhbGwgU3RpY2t5Yml0cyBpbnN0YW5jZXMgYW5kIGNsZWFucyB1cCBkb20gZnJvbSBzdGlja3liaXRzXG4qL1xudmFyIFN0aWNreWJpdHMgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdGlja3liaXRzKHRhcmdldCwgb2JqKSB7XG4gICAgdmFyIG8gPSB0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyA/IG9iaiA6IHt9O1xuICAgIHRoaXMudmVyc2lvbiA9ICczLjMuMic7XG4gICAgdGhpcy51c2VyQWdlbnQgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCB8fCAnbm8gYHVzZXJBZ2VudGAgcHJvdmlkZWQgYnkgdGhlIGJyb3dzZXInO1xuICAgIHRoaXMucHJvcHMgPSB7XG4gICAgICBjdXN0b21TdGlja3lDaGFuZ2VOdW1iZXI6IG8uY3VzdG9tU3RpY2t5Q2hhbmdlTnVtYmVyIHx8IG51bGwsXG4gICAgICBub1N0eWxlczogby5ub1N0eWxlcyB8fCBmYWxzZSxcbiAgICAgIHN0aWNreUJpdFN0aWNreU9mZnNldDogby5zdGlja3lCaXRTdGlja3lPZmZzZXQgfHwgMCxcbiAgICAgIHBhcmVudENsYXNzOiBvLnBhcmVudENsYXNzIHx8ICdqcy1zdGlja3liaXQtcGFyZW50JyxcbiAgICAgIHNjcm9sbEVsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG8uc2Nyb2xsRWwpIHx8IHdpbmRvdyxcbiAgICAgIHN0aWNreUNsYXNzOiBvLnN0aWNreUNsYXNzIHx8ICdqcy1pcy1zdGlja3knLFxuICAgICAgc3R1Y2tDbGFzczogby5zdHVja0NsYXNzIHx8ICdqcy1pcy1zdHVjaycsXG4gICAgICBzdGlja3lDaGFuZ2VDbGFzczogby5zdGlja3lDaGFuZ2VDbGFzcyB8fCAnanMtaXMtc3RpY2t5LS1jaGFuZ2UnLFxuICAgICAgdXNlU3RpY2t5Q2xhc3Nlczogby51c2VTdGlja3lDbGFzc2VzIHx8IGZhbHNlLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogby52ZXJ0aWNhbFBvc2l0aW9uIHx8ICd0b3AnXG4gICAgfTtcbiAgICB2YXIgcCA9IHRoaXMucHJvcHM7XG4gICAgLypcbiAgICAgIGRlZmluZSBwb3NpdGlvblZhbFxuICAgICAgLS0tLVxuICAgICAgLSAgdXNlcyBhIGNvbXB1dGVkIChgLmRlZmluZVBvc2l0aW9uKClgKVxuICAgICAgLSAgZGVmaW5lZCB0aGUgcG9zaXRpb25cbiAgICAqL1xuXG4gICAgcC5wb3NpdGlvblZhbCA9IHRoaXMuZGVmaW5lUG9zaXRpb24oKSB8fCAnZml4ZWQnO1xuICAgIHZhciB2cCA9IHAudmVydGljYWxQb3NpdGlvbjtcbiAgICB2YXIgbnMgPSBwLm5vU3R5bGVzO1xuICAgIHZhciBwdiA9IHAucG9zaXRpb25WYWw7XG4gICAgdGhpcy5lbHMgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KSA6IHRhcmdldDtcbiAgICBpZiAoISgnbGVuZ3RoJyBpbiB0aGlzLmVscykpIHRoaXMuZWxzID0gW3RoaXMuZWxzXTtcbiAgICB0aGlzLmluc3RhbmNlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIGVsID0gdGhpcy5lbHNbaV07XG4gICAgICB2YXIgc3R5bGVzID0gZWwuc3R5bGU7IC8vIHNldCB2ZXJ0aWNhbCBwb3NpdGlvblxuXG4gICAgICBzdHlsZXNbdnBdID0gdnAgPT09ICd0b3AnICYmICFucyA/IHAuc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiIDogJyc7XG4gICAgICBzdHlsZXMucG9zaXRpb24gPSBwdiAhPT0gJ2ZpeGVkJyA/IHB2IDogJyc7XG5cbiAgICAgIGlmIChwdiA9PT0gJ2ZpeGVkJyB8fCBwLnVzZVN0aWNreUNsYXNzZXMpIHtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy5hZGRJbnN0YW5jZShlbCwgcCk7IC8vIGluc3RhbmNlcyBhcmUgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuXG4gICAgICAgIHRoaXMuaW5zdGFuY2VzLnB1c2goaW5zdGFuY2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qXG4gICAgc2V0U3RpY2t5UG9zaXRpb24g4pyU77iPXG4gICAgLS0tLS0tLS1cbiAgICDigJQgIG1vc3QgYmFzaWMgdGhpbmcgc3RpY2t5Yml0cyBkb2VzXG4gICAgPT4gY2hlY2tzIHRvIHNlZSBpZiBwb3NpdGlvbiBzdGlja3kgaXMgc3VwcG9ydGVkXG4gICAgPT4gZGVmaW5lZCB0aGUgcG9zaXRpb24gdG8gYmUgdXNlZFxuICAgID0+IHN0aWNreWJpdHMgd29ya3MgYWNjb3JkaW5nbHlcbiAgKi9cblxuXG4gIHZhciBfcHJvdG8gPSBTdGlja3liaXRzLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZGVmaW5lUG9zaXRpb24gPSBmdW5jdGlvbiBkZWZpbmVQb3NpdGlvbigpIHtcbiAgICB2YXIgcHJlZml4ID0gWycnLCAnLW8tJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXTtcbiAgICB2YXIgdGVzdCA9IGRvY3VtZW50LmhlYWQuc3R5bGU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGVzdC5wb3NpdGlvbiA9IHByZWZpeFtpXSArIFwic3RpY2t5XCI7XG4gICAgfVxuXG4gICAgdmFyIHN0aWNreVByb3AgPSB0ZXN0LnBvc2l0aW9uID8gdGVzdC5wb3NpdGlvbiA6ICdmaXhlZCc7XG4gICAgdGVzdC5wb3NpdGlvbiA9ICcnO1xuICAgIHJldHVybiBzdGlja3lQcm9wO1xuICB9O1xuICAvKlxuICAgIGFkZEluc3RhbmNlIOKclO+4j1xuICAgIC0tLS0tLS0tXG4gICAg4oCUIG1hbmFnZXMgaW5zdGFuY2VzIG9mIGl0ZW1zXG4gICAgLSB0YWtlcyBpbiBhbiBlbCBhbmQgcHJvcHNcbiAgICAtIHJldHVybnMgYW4gaXRlbSBvYmplY3RcbiAgICAtLS1cbiAgICAtIHRhcmdldCA9IGVsXG4gICAgLSBvID0ge29iamVjdH0gPSBwcm9wc1xuICAgICAgLSBzY3JvbGxFbCA9ICdzdHJpbmcnXG4gICAgICAtIHZlcnRpY2FsUG9zaXRpb24gPSBudW1iZXJcbiAgICAgIC0gb2ZmID0gYm9vbGVhblxuICAgICAgLSBwYXJlbnRDbGFzcyA9ICdzdHJpbmcnXG4gICAgICAtIHN0aWNreUNsYXNzID0gJ3N0cmluZydcbiAgICAgIC0gc3R1Y2tDbGFzcyA9ICdzdHJpbmcnXG4gICAgLS0tXG4gICAgLSBkZWZpbmVkIGxhdGVyXG4gICAgICAtIHBhcmVudCA9IGRvbSBlbGVtZW50XG4gICAgICAtIHN0YXRlID0gJ3N0cmluZydcbiAgICAgIC0gb2Zmc2V0ID0gbnVtYmVyXG4gICAgICAtIHN0aWNreVN0YXJ0ID0gbnVtYmVyXG4gICAgICAtIHN0aWNreVN0b3AgPSBudW1iZXJcbiAgICAtIHJldHVybnMgYW4gaW5zdGFuY2Ugb2JqZWN0XG4gICovXG5cblxuICBfcHJvdG8uYWRkSW5zdGFuY2UgPSBmdW5jdGlvbiBhZGRJbnN0YW5jZShlbCwgcHJvcHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICBlbDogZWwsXG4gICAgICBwYXJlbnQ6IGVsLnBhcmVudE5vZGUsXG4gICAgICBwcm9wczogcHJvcHNcbiAgICB9O1xuICAgIHRoaXMuaXNXaW4gPSB0aGlzLnByb3BzLnNjcm9sbEVsID09PSB3aW5kb3c7XG4gICAgdmFyIHNlID0gdGhpcy5pc1dpbiA/IHdpbmRvdyA6IHRoaXMuZ2V0Q2xvc2VzdFBhcmVudChpdGVtLmVsLCBpdGVtLnByb3BzLnNjcm9sbEVsKTtcbiAgICB0aGlzLmNvbXB1dGVTY3JvbGxPZmZzZXRzKGl0ZW0pO1xuICAgIGl0ZW0ucGFyZW50LmNsYXNzTmFtZSArPSBcIiBcIiArIHByb3BzLnBhcmVudENsYXNzO1xuICAgIGl0ZW0uc3RhdGUgPSAnZGVmYXVsdCc7XG5cbiAgICBpdGVtLnN0YXRlQ29udGFpbmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIF90aGlzLm1hbmFnZVN0YXRlKGl0ZW0pO1xuICAgIH07XG5cbiAgICBzZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpdGVtLnN0YXRlQ29udGFpbmVyKTtcbiAgICByZXR1cm4gaXRlbTtcbiAgfTtcbiAgLypcbiAgICAtLS0tLS0tLVxuICAgIGdldFBhcmVudCDwn5Go4oCNXG4gICAgLS0tLS0tLS1cbiAgICAtIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgdGFyZ2V0IGVsZW1lbnQncyBwYXJlbnQgc2VsZWN0ZWQgZWxcbiAgICAtIG9ubHkgdXNlZCBmb3Igbm9uIGB3aW5kb3dgIHNjcm9sbCBlbGVtZW50c1xuICAgIC0gc3VwcG9ydHMgb2xkZXIgYnJvd3NlcnNcbiAgKi9cblxuXG4gIF9wcm90by5nZXRDbG9zZXN0UGFyZW50ID0gZnVuY3Rpb24gZ2V0Q2xvc2VzdFBhcmVudChlbCwgbWF0Y2gpIHtcbiAgICAvLyBwID0gcGFyZW50IGVsZW1lbnRcbiAgICB2YXIgcCA9IG1hdGNoO1xuICAgIHZhciBlID0gZWw7XG4gICAgaWYgKGUucGFyZW50RWxlbWVudCA9PT0gcCkgcmV0dXJuIHA7IC8vIHRyYXZlcnNlIHVwIHRoZSBkb20gdHJlZSB1bnRpbCB3ZSBnZXQgdG8gdGhlIHBhcmVudFxuXG4gICAgd2hpbGUgKGUucGFyZW50RWxlbWVudCAhPT0gcCkge1xuICAgICAgZSA9IGUucGFyZW50RWxlbWVudDtcbiAgICB9IC8vIHJldHVybiBwYXJlbnQgZWxlbWVudFxuXG5cbiAgICByZXR1cm4gcDtcbiAgfTtcbiAgLypcbiAgICAtLS0tLS0tLVxuICAgIGdldE9mZnNldFRvcFxuICAgIC0tLS0tLS0tXG4gICAgLSBhIGhlbHBlciBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIG9mZnNldFRvcCBvZiB0aGUgZWxlbWVudFxuICAgIC0gZnJvbSB0aGUgdG9wIGxldmVsIG9mIHRoZSBET01cbiAgKi9cblxuXG4gIF9wcm90by5nZXRPZmZzZXRUb3AgPSBmdW5jdGlvbiBnZXRPZmZzZXRUb3AoZWwpIHtcbiAgICB2YXIgb2Zmc2V0VG9wID0gMDtcblxuICAgIGRvIHtcbiAgICAgIG9mZnNldFRvcCA9IGVsLm9mZnNldFRvcCArIG9mZnNldFRvcDtcbiAgICB9IHdoaWxlIChlbCA9IGVsLm9mZnNldFBhcmVudCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0VG9wO1xuICB9O1xuICAvKlxuICAgIGNvbXB1dGVTY3JvbGxPZmZzZXRzIPCfk4pcbiAgICAtLS1cbiAgICBjb21wdXRlU2Nyb2xsT2Zmc2V0cyBmb3IgU3RpY2t5Yml0c1xuICAgIC0gZGVmaW5lc1xuICAgICAgLSBvZmZzZXRcbiAgICAgIC0gc3RhcnRcbiAgICAgIC0gc3RvcFxuICAqL1xuXG5cbiAgX3Byb3RvLmNvbXB1dGVTY3JvbGxPZmZzZXRzID0gZnVuY3Rpb24gY29tcHV0ZVNjcm9sbE9mZnNldHMoaXRlbSkge1xuICAgIHZhciBpdCA9IGl0ZW07XG4gICAgdmFyIHAgPSBpdC5wcm9wcztcbiAgICB2YXIgZWwgPSBpdC5lbDtcbiAgICB2YXIgcGFyZW50ID0gaXQucGFyZW50O1xuICAgIHZhciBpc0N1c3RvbSA9ICF0aGlzLmlzV2luICYmIHAucG9zaXRpb25WYWwgPT09ICdmaXhlZCc7XG4gICAgdmFyIGlzQm90dG9tID0gcC52ZXJ0aWNhbFBvc2l0aW9uICE9PSAnYm90dG9tJztcbiAgICB2YXIgc2Nyb2xsRWxPZmZzZXQgPSBpc0N1c3RvbSA/IHRoaXMuZ2V0T2Zmc2V0VG9wKHAuc2Nyb2xsRWwpIDogMDtcbiAgICB2YXIgc3RpY2t5U3RhcnQgPSBpc0N1c3RvbSA/IHRoaXMuZ2V0T2Zmc2V0VG9wKHBhcmVudCkgLSBzY3JvbGxFbE9mZnNldCA6IHRoaXMuZ2V0T2Zmc2V0VG9wKHBhcmVudCk7XG4gICAgdmFyIHN0aWNreUNoYW5nZU9mZnNldCA9IHAuY3VzdG9tU3RpY2t5Q2hhbmdlTnVtYmVyICE9PSBudWxsID8gcC5jdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIgOiBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgaXQub2Zmc2V0ID0gc2Nyb2xsRWxPZmZzZXQgKyBwLnN0aWNreUJpdFN0aWNreU9mZnNldDtcbiAgICBpdC5zdGlja3lTdGFydCA9IGlzQm90dG9tID8gc3RpY2t5U3RhcnQgLSBpdC5vZmZzZXQgOiAwO1xuICAgIGl0LnN0aWNreUNoYW5nZSA9IGl0LnN0aWNreVN0YXJ0ICsgc3RpY2t5Q2hhbmdlT2Zmc2V0O1xuICAgIGl0LnN0aWNreVN0b3AgPSBpc0JvdHRvbSA/IHN0aWNreVN0YXJ0ICsgcGFyZW50Lm9mZnNldEhlaWdodCAtIChpdC5lbC5vZmZzZXRIZWlnaHQgKyBpdC5vZmZzZXQpIDogc3RpY2t5U3RhcnQgKyBwYXJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgIHJldHVybiBpdDtcbiAgfTtcbiAgLypcbiAgICB0b2dnbGVDbGFzc2VzIOKalu+4j1xuICAgIC0tLVxuICAgIHRvZ2dsZXMgY2xhc3NlcyAoZm9yIG9sZGVyIGJyb3dzZXIgc3VwcG9ydClcbiAgICByID0gcmVtb3ZlZCBjbGFzc1xuICAgIGEgPSBhZGRlZCBjbGFzc1xuICAqL1xuXG5cbiAgX3Byb3RvLnRvZ2dsZUNsYXNzZXMgPSBmdW5jdGlvbiB0b2dnbGVDbGFzc2VzKGVsLCByLCBhKSB7XG4gICAgdmFyIGUgPSBlbDtcbiAgICB2YXIgY0FycmF5ID0gZS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICBpZiAoYSAmJiBjQXJyYXkuaW5kZXhPZihhKSA9PT0gLTEpIGNBcnJheS5wdXNoKGEpO1xuICAgIHZhciBySXRlbSA9IGNBcnJheS5pbmRleE9mKHIpO1xuICAgIGlmIChySXRlbSAhPT0gLTEpIGNBcnJheS5zcGxpY2Uockl0ZW0sIDEpO1xuICAgIGUuY2xhc3NOYW1lID0gY0FycmF5LmpvaW4oJyAnKTtcbiAgfTtcbiAgLypcbiAgICBtYW5hZ2VTdGF0ZSDwn5OdXG4gICAgLS0tXG4gICAgLSBkZWZpbmVzIHRoZSBzdGF0ZVxuICAgICAgLSBub3JtYWxcbiAgICAgIC0gc3RpY2t5XG4gICAgICAtIHN0dWNrXG4gICovXG5cblxuICBfcHJvdG8ubWFuYWdlU3RhdGUgPSBmdW5jdGlvbiBtYW5hZ2VTdGF0ZShpdGVtKSB7XG4gICAgLy8gY2FjaGUgb2JqZWN0XG4gICAgdmFyIGl0ID0gaXRlbTtcbiAgICB2YXIgZSA9IGl0LmVsO1xuICAgIHZhciBwID0gaXQucHJvcHM7XG4gICAgdmFyIHN0YXRlID0gaXQuc3RhdGU7XG4gICAgdmFyIHN0YXJ0ID0gaXQuc3RpY2t5U3RhcnQ7XG4gICAgdmFyIGNoYW5nZSA9IGl0LnN0aWNreUNoYW5nZTtcbiAgICB2YXIgc3RvcCA9IGl0LnN0aWNreVN0b3A7XG4gICAgdmFyIHN0bCA9IGUuc3R5bGU7IC8vIGNhY2hlIHByb3BzXG5cbiAgICB2YXIgbnMgPSBwLm5vU3R5bGVzO1xuICAgIHZhciBwdiA9IHAucG9zaXRpb25WYWw7XG4gICAgdmFyIHNlID0gcC5zY3JvbGxFbDtcbiAgICB2YXIgc3RpY2t5ID0gcC5zdGlja3lDbGFzcztcbiAgICB2YXIgc3RpY2t5Q2hhbmdlID0gcC5zdGlja3lDaGFuZ2VDbGFzcztcbiAgICB2YXIgc3R1Y2sgPSBwLnN0dWNrQ2xhc3M7XG4gICAgdmFyIHZwID0gcC52ZXJ0aWNhbFBvc2l0aW9uO1xuICAgIC8qXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgIC0tLVxuICAgICAgLSB1c2UgckFGXG4gICAgICAtIG9yIHN0dWIgckFGXG4gICAgKi9cblxuICAgIHZhciByQUZTdHViID0gZnVuY3Rpb24gckFGRHVtbXkoZikge1xuICAgICAgZigpO1xuICAgIH07XG5cbiAgICB2YXIgckFGID0gIXRoaXMuaXNXaW4gPyByQUZTdHViIDogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJBRlN0dWI7XG4gICAgLypcbiAgICAgIGRlZmluZSBzY3JvbGwgdmFyc1xuICAgICAgLS0tXG4gICAgICAtIHNjcm9sbFxuICAgICAgLSBub3RTdGlja3lcbiAgICAgIC0gaXNTdGlja3lcbiAgICAgIC0gaXNTdHVja1xuICAgICovXG5cbiAgICB2YXIgdEMgPSB0aGlzLnRvZ2dsZUNsYXNzZXM7XG4gICAgdmFyIHNjcm9sbCA9IHRoaXMuaXNXaW4gPyB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQgOiBzZS5zY3JvbGxUb3A7XG4gICAgdmFyIG5vdFN0aWNreSA9IHNjcm9sbCA+IHN0YXJ0ICYmIHNjcm9sbCA8IHN0b3AgJiYgKHN0YXRlID09PSAnZGVmYXVsdCcgfHwgc3RhdGUgPT09ICdzdHVjaycpO1xuICAgIHZhciBpc1N0aWNreSA9IHNjcm9sbCA8PSBzdGFydCAmJiBzdGF0ZSA9PT0gJ3N0aWNreSc7XG4gICAgdmFyIGlzU3R1Y2sgPSBzY3JvbGwgPj0gc3RvcCAmJiBzdGF0ZSA9PT0gJ3N0aWNreSc7XG4gICAgLypcbiAgICAgIFVubmFtZWQgYXJyb3cgZnVuY3Rpb25zIHdpdGhpbiB0aGlzIGJsb2NrXG4gICAgICAtLS1cbiAgICAgIC0gaGVscCB3YW50ZWQgb3IgZGlzY3Vzc2lvblxuICAgICAgLSB2aWV3IHRlc3Quc3RpY2t5Yml0cy5qc1xuICAgICAgICAtIGBzdGlja3liaXRzIC5tYW5hZ2VTdGF0ZSAgYHBvc2l0aW9uOiBmaXhlZGAgaW50ZXJmYWNlYCBmb3IgbW9yZSBhd2FyZW5lc3Mg8J+RgFxuICAgICovXG5cbiAgICBpZiAobm90U3RpY2t5KSB7XG4gICAgICBpdC5zdGF0ZSA9ICdzdGlja3knO1xuICAgICAgckFGKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdEMoZSwgc3R1Y2ssIHN0aWNreSk7XG4gICAgICAgIHN0bC5wb3NpdGlvbiA9IHB2O1xuICAgICAgICBpZiAobnMpIHJldHVybjtcbiAgICAgICAgc3RsLmJvdHRvbSA9ICcnO1xuICAgICAgICBzdGxbdnBdID0gcC5zdGlja3lCaXRTdGlja3lPZmZzZXQgKyBcInB4XCI7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3RpY2t5KSB7XG4gICAgICBpdC5zdGF0ZSA9ICdkZWZhdWx0JztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreSk7XG4gICAgICAgIGlmIChwdiA9PT0gJ2ZpeGVkJykgc3RsLnBvc2l0aW9uID0gJyc7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3R1Y2spIHtcbiAgICAgIGl0LnN0YXRlID0gJ3N0dWNrJztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreSwgc3R1Y2spO1xuICAgICAgICBpZiAocHYgIT09ICdmaXhlZCcgfHwgbnMpIHJldHVybjtcbiAgICAgICAgc3RsLnRvcCA9ICcnO1xuICAgICAgICBzdGwuYm90dG9tID0gJzAnO1xuICAgICAgICBzdGwucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3RpY2t5Q2hhbmdlID0gc2Nyb2xsID49IGNoYW5nZSAmJiBzY3JvbGwgPD0gc3RvcDtcbiAgICB2YXIgaXNOb3RTdGlja3lDaGFuZ2UgPSBzY3JvbGwgPCBjaGFuZ2UgfHwgc2Nyb2xsID4gc3RvcDtcbiAgICB2YXIgc3R1YiA9ICdzdHViJzsgLy8gYSBzdHViIGNzcyBjbGFzcyB0byByZW1vdmVcblxuICAgIGlmIChpc05vdFN0aWNreUNoYW5nZSkge1xuICAgICAgckFGKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdEMoZSwgc3RpY2t5Q2hhbmdlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNTdGlja3lDaGFuZ2UpIHtcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0dWIsIHN0aWNreUNoYW5nZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXQ7XG4gIH07XG5cbiAgX3Byb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5zdGFuY2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlc1tpXTtcbiAgICAgIHRoaXMuY29tcHV0ZVNjcm9sbE9mZnNldHMoaW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICAvKlxuICAgIHJlbW92ZXMgYW4gaW5zdGFuY2Ug8J+Ri1xuICAgIC0tLS0tLS0tXG4gICAgLSBjbGVhbnVwIGluc3RhbmNlXG4gICovXG5cblxuICBfcHJvdG8ucmVtb3ZlSW5zdGFuY2UgPSBmdW5jdGlvbiByZW1vdmVJbnN0YW5jZShpbnN0YW5jZSkge1xuICAgIHZhciBlID0gaW5zdGFuY2UuZWw7XG4gICAgdmFyIHAgPSBpbnN0YW5jZS5wcm9wcztcbiAgICB2YXIgdEMgPSB0aGlzLnRvZ2dsZUNsYXNzZXM7XG4gICAgZS5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICAgIGUuc3R5bGVbcC52ZXJ0aWNhbFBvc2l0aW9uXSA9ICcnO1xuICAgIHRDKGUsIHAuc3RpY2t5Q2xhc3MpO1xuICAgIHRDKGUsIHAuc3R1Y2tDbGFzcyk7XG4gICAgdEMoZS5wYXJlbnROb2RlLCBwLnBhcmVudENsYXNzKTtcbiAgfTtcbiAgLypcbiAgICBjbGVhbnVwIPCfm4FcbiAgICAtLS0tLS0tLVxuICAgIC0gY2xlYW5zIHVwIGVhY2ggaW5zdGFuY2VcbiAgICAtIGNsZWFycyBpbnN0YW5jZVxuICAqL1xuXG5cbiAgX3Byb3RvLmNsZWFudXAgPSBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnN0YW5jZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzW2ldO1xuICAgICAgaW5zdGFuY2UucHJvcHMuc2Nyb2xsRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2Uuc3RhdGVDb250YWluZXIpO1xuICAgICAgdGhpcy5yZW1vdmVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgdGhpcy5tYW5hZ2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIFN0aWNreWJpdHM7XG59KCk7XG4vKlxuICBleHBvcnRcbiAgLS0tLS0tLS1cbiAgZXhwb3J0cyBTdGlja0JpdHMgdG8gYmUgdXNlZCDwn4+BXG4qL1xuXG5cbmZ1bmN0aW9uIHN0aWNreWJpdHModGFyZ2V0LCBvKSB7XG4gIHJldHVybiBuZXcgU3RpY2t5Yml0cyh0YXJnZXQsIG8pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGlja3liaXRzO1xuIiwiLyoqXG4gKiBTaWRlIG5hdmlnYXRpb24gcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IHN0aWNreWJpdHMgZnJvbSAnc3RpY2t5Yml0cyc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG5hdmlnYXRpb25TaWRlID0gKHtcbiAgc3RpY2t5U2VsZWN0b3I6IHN0aWNreVNlbGVjdG9yID0gJy5lY2wtc2lkZS1uYXZpZ2F0aW9uX190b2dnbGUnLFxuICBhY3RpdmVTZWxlY3RvcjogYWN0aXZlU2VsZWN0b3IgPSAnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmstLWFjdGl2ZScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBpbml0U3RpY2t5KCkge1xuICAgIC8vIGluaXQgc3RpY2t5IG1lbnVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzdGlja3liaXRzKHN0aWNreVNlbGVjdG9yLCB7IHVzZVN0aWNreUNsYXNzZXM6IHRydWUgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgc3RpY2t5U2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICBlLnRhcmdldC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmZvbGRUb0FjdGl2ZSgpIHtcbiAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgYWN0aXZlU2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIC8vIEJyb3dzZSBwYXJlbnRzXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgbGV0IG5vZGUgPSBhY3RpdmU7XG4gICAgICBjb25zdCBlbHMgPSBbXTtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGVscy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHBhcmVudCBpcyBhbiBleHBhbmRhYmxlIG1lbnUgaXRlbVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCcuZWNsLXNpZGUtbmF2aWdhdGlvbl9fZ3JvdXAnKSkge1xuICAgICAgICAgIGNvbnN0IGxpbmsgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgaWYgKGxpbmsubWF0Y2hlcygnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmsnKSkge1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgb3V0c2lkZSBvZiBtZW51XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoJy5lY2wtc2lkZS1uYXZpZ2F0aW9uJykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0U3RpY2t5KCk7XG4gICAgc2Nyb2xsVG9Ub3AoKTtcbiAgICB1bmZvbGRUb0FjdGl2ZSgpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IG5hdmlnYXRpb25TaWRlO1xuIiwiLyoqXG4gKiBUYWJsZXMgcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVjbFRhYmxlcyhlbGVtZW50cyA9IG51bGwpIHtcbiAgY29uc3QgdGFibGVzID1cbiAgICBlbGVtZW50cyB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlY2wtdGFibGUtLXJlc3BvbnNpdmUnKTtcbiAgW10uZm9yRWFjaC5jYWxsKHRhYmxlcywgdGFibGUgPT4ge1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBbXTtcbiAgICBsZXQgdGV4dENvbHNwYW4gPSAnJztcbiAgICBsZXQgY2kgPSAwO1xuICAgIGxldCBjbiA9IFtdO1xuXG4gICAgLy8gVGhlIHJvd3MgaW4gYSB0YWJsZSBib2R5LlxuICAgIGNvbnN0IHRhYmxlUm93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XG5cbiAgICAvLyBUaGUgaGVhZGVycyBpbiBhIHRhYmxlLlxuICAgIGNvbnN0IGhlYWRlcnMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZCB0ciB0aCcpO1xuXG4gICAgLy8gVGhlIG51bWJlciBvZiBtYWluIGhlYWRlcnMuXG4gICAgY29uc3QgaGVhZEZpcnN0ID1cbiAgICAgIHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoZWFkIHRyJylbMF0ucXVlcnlTZWxlY3RvckFsbCgndGgnKS5sZW5ndGggLSAxO1xuXG4gICAgLy8gTnVtYmVyIG9mIGNlbGxzIHBlciByb3cuXG4gICAgY29uc3QgY2VsbFBlclJvdyA9IHRhYmxlXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKVswXVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoO1xuXG4gICAgLy8gUG9zaXRpb24gb2YgdGhlIGV2ZW50dWFsIGNvbHNwYW4gZWxlbWVudC5cbiAgICBsZXQgY29sc3BhbkluZGV4ID0gLTE7XG5cbiAgICAvLyBCdWlsZCB0aGUgYXJyYXkgd2l0aCBhbGwgdGhlIFwibGFiZWxzXCJcbiAgICAvLyBBbHNvIGdldCBwb3NpdGlvbiBvZiB0aGUgZXZlbnR1YWwgY29sc3BhbiBlbGVtZW50XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoaGVhZGVyc1tpXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSkge1xuICAgICAgICBjb2xzcGFuSW5kZXggPSBpO1xuICAgICAgfVxuXG4gICAgICBoZWFkZXJUZXh0W2ldID0gW107XG4gICAgICBoZWFkZXJUZXh0W2ldID0gaGVhZGVyc1tpXS50ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBoYXZlIGEgY29sc3Bhbiwgd2UgaGF2ZSB0byBwcmVwYXJlIHRoZSBkYXRhIGZvciBpdC5cbiAgICBpZiAoY29sc3BhbkluZGV4ICE9PSAtMSkge1xuICAgICAgdGV4dENvbHNwYW4gPSBoZWFkZXJUZXh0LnNwbGljZShjb2xzcGFuSW5kZXgsIDEpO1xuICAgICAgY2kgPSBjb2xzcGFuSW5kZXg7XG4gICAgICBjbiA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoW2NvbHNwYW5dJylbMF0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJyk7XG5cbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY247IGMgKz0gMSkge1xuICAgICAgICBoZWFkZXJUZXh0LnNwbGljZShjaSArIGMsIDAsIGhlYWRlclRleHRbaGVhZEZpcnN0ICsgY10pO1xuICAgICAgICBoZWFkZXJUZXh0LnNwbGljZShoZWFkRmlyc3QgKyAxICsgYywgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIGV2ZXJ5IHJvdywgc2V0IHRoZSBhdHRyaWJ1dGVzIHdlIHVzZSB0byBtYWtlIHRoaXMgaGFwcGVuLlxuICAgIFtdLmZvckVhY2guY2FsbCh0YWJsZVJvd3MsIHJvdyA9PiB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNlbGxQZXJSb3c7IGogKz0gMSkge1xuICAgICAgICBpZiAoaGVhZGVyVGV4dFtqXSA9PT0gJycgfHwgaGVhZGVyVGV4dFtqXSA9PT0gJ1xcdTAwYTAnKSB7XG4gICAgICAgICAgcm93XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgndGQnKVxuICAgICAgICAgICAgW2pdLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZWNsLXRhYmxlX19oZWFkaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbal0uc2V0QXR0cmlidXRlKCdkYXRhLXRoJywgaGVhZGVyVGV4dFtqXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sc3BhbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVtjb2xzcGFuSW5kZXhdO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlY2wtdGFibGVfX2dyb3VwLWxhYmVsJyk7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGgtZ3JvdXAnLCB0ZXh0Q29sc3Bhbik7XG5cbiAgICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGNuOyBjICs9IDEpIHtcbiAgICAgICAgICAgIHJvd1xuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgndGQnKVxuICAgICAgICAgICAgICBbY29sc3BhbkluZGV4ICsgY10uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICAgJ2VjbC10YWJsZV9fZ3JvdXBfZWxlbWVudCdcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVjbFRhYmxlcztcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIHRhYiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCB0YWJzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtdGFicycsXG4gIHRhYmxpc3RTZWxlY3RvcjogdGFibGlzdFNlbGVjdG9yID0gJy5lY2wtdGFic19fdGFibGlzdCcsXG4gIHRhYnBhbmVsU2VsZWN0b3I6IHRhYnBhbmVsU2VsZWN0b3IgPSAnLmVjbC10YWJzX190YWJwYW5lbCcsXG4gIHRhYmVsZW1lbnRzU2VsZWN0b3I6IHRhYmVsZW1lbnRzU2VsZWN0b3IgPSBgJHt0YWJsaXN0U2VsZWN0b3J9IGxpYCxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBTRVRVUFxuICAvLyBzZXQgdGFiIGVsZW1lbnQgTm9kZUxpc3RcbiAgY29uc3QgdGFiQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHNob3dUYWIodGFyZ2V0LCBnaXZlRm9jdXMgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2libGluZ1RhYnMgPSBxdWVyeUFsbChcbiAgICAgIGAke3RhYmxpc3RTZWxlY3Rvcn0gbGlgLFxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICk7XG4gICAgY29uc3Qgc2libGluZ1RhYnBhbmVscyA9IHF1ZXJ5QWxsKFxuICAgICAgdGFicGFuZWxTZWxlY3RvcixcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICApO1xuXG4gICAgLy8gc2V0IGluYWN0aXZlc1xuICAgIHNpYmxpbmdUYWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgdGFiLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpO1xuICAgIH0pO1xuXG4gICAgc2libGluZ1RhYnBhbmVscy5mb3JFYWNoKHRhYnBhbmVsID0+IHtcbiAgICAgIHRhYnBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IGFjdGl2ZXMgYW5kIGZvY3VzXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICBpZiAoZ2l2ZUZvY3VzKSB0YXJnZXQuZm9jdXMoKTtcbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSlcbiAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRUYWJDbGljayhlKSB7XG4gICAgc2hvd1RhYihlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gbG9vayBpbnRvIHJlbW92ZSBpZC9zZXR0aW1lb3V0L3JlaW5zdGF0ZSBpZCBhcyBhbiBhbHRlcm5hdGl2ZSB0byBwcmV2ZW50RGVmYXVsdFxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRUYWJLZXlkb3duKGUpIHtcbiAgICAvLyBjb2xsZWN0IHRhYiB0YXJnZXRzLCBhbmQgdGhlaXIgcGFyZW50cycgcHJldi9uZXh0IChvciBmaXJzdC9sYXN0KVxuICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgcHJldmlvdXNUYWJJdGVtID1cbiAgICAgIGN1cnJlbnRUYWIucHJldmlvdXNFbGVtZW50U2libGluZyB8fFxuICAgICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgbmV4dFRhYkl0ZW0gPVxuICAgICAgY3VycmVudFRhYi5uZXh0RWxlbWVudFNpYmxpbmcgfHxcbiAgICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgICAvLyBjYXRjaCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAvLyBpZiBuZXcgbmV4dC9wcmV2IHRhYiBhdmFpbGFibGUsIHNob3cgaXQgYnkgcGFzc2luZyB0YWIgYW5jaG9yIHRvIHNob3dUYWIgbWV0aG9kXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICBjYXNlIDM4OlxuICAgICAgICBzaG93VGFiKHByZXZpb3VzVGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDpcbiAgICAgICAgc2hvd1RhYihuZXh0VGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBCSU5ESU5HU1xuICBmdW5jdGlvbiBiaW5kVGFic0V2ZW50cyh0YWJDb250YWluZXIpIHtcbiAgICBjb25zdCB0YWJzRWxlbWVudHMgPSBxdWVyeUFsbCh0YWJlbGVtZW50c1NlbGVjdG9yLCB0YWJDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIHRhYiBjbGljayBhbmQga2V5ZG93biBldmVudHNcbiAgICB0YWJzRWxlbWVudHMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRUYWJDbGljayk7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50VGFiS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmJpbmRUYWJzRXZlbnRzKHRhYkNvbnRhaW5lcikge1xuICAgIGNvbnN0IHRhYnNFbGVtZW50cyA9IHF1ZXJ5QWxsKHRhYmVsZW1lbnRzU2VsZWN0b3IsIHRhYkNvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGFsbCB0YWIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgdGFic0VsZW1lbnRzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50VGFiQ2xpY2spO1xuICAgICAgdGFiLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudFRhYktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRhYkNvbnRhaW5lcnMuZm9yRWFjaCh1bmJpbmRUYWJzRXZlbnRzKTtcbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2goYmluZFRhYnNFdmVudHMpO1xuICB9XG5cbiAgLy8gQXV0b21hdGljYWxseSBpbml0XG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IHRhYnM7XG4iLCIvKipcbiAqIFRpbWVsaW5lXG4gKi9cblxuY29uc3QgZXhwYW5kVGltZWxpbmUgPSAoXG4gIHRpbWVsaW5lLFxuICBidXR0b24sXG4gIHtcbiAgICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLXRpbWVsaW5lX19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgfSA9IHt9XG4pID0+IHtcbiAgaWYgKCF0aW1lbGluZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgdGltZWxpbmUucXVlcnlTZWxlY3RvckFsbChoaWRkZW5FbGVtZW50c1NlbGVjdG9yKVxuICApO1xuXG4gIC8vIFJlbW92ZSBleHRyYSBjbGFzc1xuICBoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1RvUmVtb3ZlKTtcbiAgfSk7XG5cbiAgLy8gUmVtb3ZlIGJ1dHR0b25cbiAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYnV0dG9uKTtcbn07XG5cbi8vIEhlbHBlciBtZXRob2QgdG8gYXV0b21hdGljYWxseSBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGFsbCB0aGUgZXhwYW5kYWJsZXMgb24gcGFnZSBsb2FkXG5leHBvcnQgY29uc3QgdGltZWxpbmVzID0gKHtcbiAgc2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZScsXG4gIGJ1dHRvblNlbGVjdG9yID0gJy5lY2wtdGltZWxpbmVfX2J1dHRvbicsXG4gIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIGNsYXNzVG9SZW1vdmUgPSAnZWNsLXRpbWVsaW5lX19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY29udGV4dCA9IGRvY3VtZW50LFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG5vZGVzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihidXR0b25TZWxlY3Rvcik7XG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICBleHBhbmRUaW1lbGluZShub2RlLCBidXR0b24sIHsgY2xhc3NUb1JlbW92ZSwgaGlkZGVuRWxlbWVudHNTZWxlY3RvciB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGltZWxpbmVzO1xuIiwiLyoqXG4gKiBUaW1lbGluZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUnO1xuIiwiLy8gRXhwb3J0IGNvbXBvbmVudHNcblxuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtYWNjb3JkaW9uJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWJyZWFkY3J1bWInO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtY2Fyb3VzZWwnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtY29udGV4dC1uYXYnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZHJvcGRvd24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZGlhbG9nJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZCc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtaW5wYWdlLW5hdmlnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51JztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbic7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC10YWJsZSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC10YWInO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUnO1xuIl0sIm5hbWVzIjpbInF1ZXJ5QWxsIiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZG9jdW1lbnQiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWNjb3JkaW9ucyIsImhlYWRlclNlbGVjdG9yIiwid2luZG93IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWNjb3JkaW9uQ29udGFpbmVycyIsImhpZGVQYW5lbCIsInRhcmdldCIsImFjdGl2ZVBhbmVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJzaG93UGFuZWwiLCJ0b2dnbGVQYW5lbCIsImdpdmVIZWFkZXJGb2N1cyIsImhlYWRlclNldCIsImkiLCJmb2N1cyIsImV2ZW50SGVhZGVyQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsImV2ZW50SGVhZGVyS2V5ZG93biIsImN1cnJlbnRIZWFkZXIiLCJpc01vZGlmaWVyS2V5IiwibWV0YUtleSIsImFsdEtleSIsInRoaXNDb250YWluZXIiLCJwYXJlbnROb2RlIiwidGhlc2VIZWFkZXJzIiwiY3VycmVudEhlYWRlckluZGV4IiwiaW5kZXhPZiIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInByZXZpb3VzSGVhZGVySW5kZXgiLCJsZW5ndGgiLCJuZXh0SGVhZGVySW5kZXgiLCJiaW5kQWNjb3JkaW9uRXZlbnRzIiwiYWNjb3JkaW9uQ29udGFpbmVyIiwiYWNjb3JkaW9uSGVhZGVycyIsImZvckVhY2giLCJhY2NvcmRpb25IZWFkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidW5iaW5kQWNjb3JkaW9uRXZlbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJpbml0IiwiRlVOQ19FUlJPUl9URVhUIiwiTkFOIiwic3ltYm9sVGFnIiwicmVUcmltIiwicmVJc0JhZEhleCIsInJlSXNCaW5hcnkiLCJyZUlzT2N0YWwiLCJmcmVlUGFyc2VJbnQiLCJwYXJzZUludCIsImZyZWVHbG9iYWwiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwib2JqZWN0UHJvdG8iLCJwcm90b3R5cGUiLCJvYmplY3RUb1N0cmluZyIsInRvU3RyaW5nIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsIm5hdGl2ZU1pbiIsIm1pbiIsIm5vdyIsIkRhdGUiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Iiwib3B0aW9ucyIsImxhc3RBcmdzIiwibGFzdFRoaXMiLCJtYXhXYWl0IiwicmVzdWx0IiwidGltZXJJZCIsImxhc3RDYWxsVGltZSIsImxhc3RJbnZva2VUaW1lIiwibGVhZGluZyIsIm1heGluZyIsInRyYWlsaW5nIiwiVHlwZUVycm9yIiwidG9OdW1iZXIiLCJpc09iamVjdCIsImludm9rZUZ1bmMiLCJ0aW1lIiwiYXJncyIsInRoaXNBcmciLCJ1bmRlZmluZWQiLCJhcHBseSIsImxlYWRpbmdFZGdlIiwic2V0VGltZW91dCIsInRpbWVyRXhwaXJlZCIsInJlbWFpbmluZ1dhaXQiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsInRpbWVTaW5jZUxhc3RJbnZva2UiLCJzaG91bGRJbnZva2UiLCJ0cmFpbGluZ0VkZ2UiLCJjYW5jZWwiLCJjbGVhclRpbWVvdXQiLCJmbHVzaCIsImRlYm91bmNlZCIsImlzSW52b2tpbmciLCJhcmd1bWVudHMiLCJ2YWx1ZSIsInR5cGUiLCJpc09iamVjdExpa2UiLCJpc1N5bWJvbCIsIm90aGVyIiwidmFsdWVPZiIsInJlcGxhY2UiLCJpc0JpbmFyeSIsInRlc3QiLCJpbml0QnJlYWRjcnVtYiIsImJyZWFkY3J1bWJTZWxlY3RvciIsImV4cGFuZEJ1dHRvblNlbGVjdG9yIiwic2VnbWVudFNlbGVjdG9yIiwic2VnbWVudEZpcnN0U2VsZWN0b3IiLCJzZWdtZW50VmlzaWJsZVNlbGVjdG9yIiwic2VnbWVudEhpZGRlblNlbGVjdG9yIiwiZWxsaXBzaXNTZWxlY3RvciIsImluaXRFbGxpcHNpcyIsImJyZWFkY3J1bWJDb250YWluZXIiLCJicmVhZGNydW1iRmlyc3QiLCJlbGxpcHNpcyIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpbm5lckhUTUwiLCJsaXN0SXRlbSIsImFwcGVuZENoaWxkIiwic2VnbWVudCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwidG9nZ2xlRWxsaXBzaXMiLCJicmVhZGNydW1iSGlkZGVuU2VnbWVudHMiLCJoaWRkZW4iLCJicmVhZGNydW1iRWxsaXBzaXMiLCJicmVhZGNydW1iSXNUb29MYXJnZSIsIndyYXBwZXJXaWR0aCIsImZsb29yIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJicmVhZGNydW1iU2VnbWVudHMiLCJzZWdtZW50V2lkdGgiLCJjZWlsIiwiYnJlYWRjcnVtYlNlZ21lbnQiLCJoaWRlU2VnbWVudCIsImJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHMiLCJzaG93U2VnbWVudCIsImV2ZW50RXhwYW5kQ2xpY2siLCJwYXJlbnRFbGVtZW50IiwiZXZlbnRSZXNpemUiLCJicmVhZGNydW1iQ29udGFpbmVycyIsImJpbmRCcmVhZGNydW1iRXZlbnRzIiwiZXhwYW5kcyIsImV4cGFuZCIsInVuYmluZEJyZWFkY3J1bWJFdmVudHMiLCJjYXJvdXNlbHMiLCJzZWxlY3RvcklkIiwiY3VycmVudFNsaWRlIiwiY2Fyb3VzZWwiLCJzbGlkZXMiLCJsaXN0IiwicXVlcnlTZWxlY3RvciIsImdldExpc3RJdGVtV2lkdGgiLCJvZmZzZXRXaWR0aCIsImdvVG9TbGlkZSIsIm4iLCJyZW1vdmUiLCJzZXRPZmZzZXQiLCJpdGVtV2lkdGgiLCJ0ciIsInN0eWxlIiwiTW96VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJPVHJhbnNmb3JtIiwiV2Via2l0VHJhbnNmb3JtIiwidHJhbnNmb3JtIiwiYW5ub3VuY2VDdXJyZW50U2xpZGUiLCJ0ZXh0Q29udGVudCIsInNob3dJbWFnZUluZm9ybWF0aW9uIiwiaW5mb0FyZWFzIiwiYXJlYSIsImRpc3BsYXkiLCJwcmV2aW91c1NsaWRlIiwibmV4dFNsaWRlIiwiYWRkQ2Fyb3VzZWxDb250cm9scyIsIm5hdkNvbnRyb2xzIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2Fyb3VzZWxDb250cm9scyIsImNvbnRyb2xzIiwicmVtb3ZlQ2hpbGQiLCJhZGRMaXZlUmVnaW9uIiwibGl2ZVJlZ2lvbiIsInJlbW92ZUxpdmVSZWdpb24iLCJkZWJvdW5jZUNiIiwiZXhwYW5kQ29udGV4dHVhbE5hdiIsImNvbnRleHR1YWxOYXYiLCJidXR0b24iLCJjbGFzc1RvUmVtb3ZlIiwiaGlkZGVuRWxlbWVudHNTZWxlY3RvciIsImhpZGRlbkVsZW1lbnRzIiwiZWxlbWVudCIsImNvbnRleHR1YWxOYXZzIiwiYnV0dG9uU2VsZWN0b3IiLCJub2Rlc0FycmF5Iiwibm9kZSIsImNvbnRhaW5zIiwiY29tcGFyZURvY3VtZW50UG9zaXRpb24iLCJkcm9wZG93biIsImRyb3Bkb3duc0FycmF5IiwiQXJyYXkiLCJpc0luc2lkZSIsImRyb3Bkb3duU2VsZWN0aW9uIiwiZXZlbnQiLCJkcm9wZG93bkJ1dHRvbiIsImRyb3Bkb3duQm9keSIsImRpYWxvZ3MiLCJ0cmlnZ2VyRWxlbWVudHNTZWxlY3RvciIsImRpYWxvZ1dpbmRvd0lkIiwiZGlhbG9nT3ZlcmxheUlkIiwidHJpZ2dlckVsZW1lbnRzIiwiZGlhbG9nV2luZG93IiwiZGlhbG9nT3ZlcmxheSIsImJvZHkiLCJmb2N1c2FibGVFbGVtZW50cyIsImZvY3VzZWRFbEJlZm9yZU9wZW4iLCJmaXJzdEZvY3VzYWJsZUVsZW1lbnQiLCJsYXN0Rm9jdXNhYmxlRWxlbWVudCIsImNsb3NlIiwiaGFuZGxlS2V5RG93biIsIktFWV9UQUIiLCJLRVlfRVNDIiwiaGFuZGxlQmFja3dhcmRUYWIiLCJhY3RpdmVFbGVtZW50IiwiaGFuZGxlRm9yd2FyZFRhYiIsInNoaWZ0S2V5Iiwib3BlbiIsImJpbmREaWFsb2dFdmVudHMiLCJlbGVtZW50cyIsInVuYmluZERpYWxvZ0V2ZW50cyIsInRvZ2dsZUV4cGFuZGFibGUiLCJ0b2dnbGVFbGVtZW50IiwiZm9yY2VDbG9zZSIsImNsb3NlU2libGluZ3MiLCJzaWJsaW5nc1NlbGVjdG9yIiwiaXNFeHBhbmRlZCIsImhhc0F0dHJpYnV0ZSIsInNpYmxpbmdzQXJyYXkiLCJmaWx0ZXIiLCJzaWJsaW5nIiwiaW5pdEV4cGFuZGFibGVzIiwiZmlsZVVwbG9hZHMiLCJpbnB1dFNlbGVjdG9yIiwidmFsdWVTZWxlY3RvciIsImJyb3dzZVNlbGVjdG9yIiwiZmlsZVVwbG9hZENvbnRhaW5lcnMiLCJ1cGRhdGVGaWxlTmFtZSIsImZpbGVzIiwiZmlsZW5hbWUiLCJmaWxlIiwibmFtZSIsIm1lc3NhZ2VFbGVtZW50IiwiZXZlbnRWYWx1ZUNoYW5nZSIsImZpbGVVcGxvYWRFbGVtZW50cyIsImZpbGVVcGxvYWRFbGVtZW50IiwiZXZlbnRCcm93c2VLZXlkb3duIiwiaW5wdXRFbGVtZW50cyIsImlucHV0RWxlbWVudCIsImNsaWNrIiwiYmluZEZpbGVVcGxvYWRFdmVudHMiLCJmaWxlVXBsb2FkQ29udGFpbmVyIiwiZmlsZVVwbG9hZElucHV0cyIsImZpbGVVcGxvYWRJbnB1dCIsImZpbGVVcGxvYWRCcm93c2VzIiwiZmlsZVVwbG9hZEJyb3dzZSIsInVuYmluZEZpbGVVcGxvYWRFdmVudHMiLCJlY2xMYW5nU2VsZWN0UGFnZXMiLCJ0b2dnbGVDbGFzcyIsImxpc3RTZWxlY3RvciIsImRyb3Bkb3duU2VsZWN0b3IiLCJkcm9wZG93bk9uQ2hhbmdlIiwibGFuZ1NlbGVjdFBhZ2VzQ29udGFpbmVycyIsInRvZ2dsZSIsImxzcCIsIm9mZnNldExlZnQiLCJkaXNtaXNzTWVzc2FnZSIsIm1lc3NhZ2UiLCJpbml0TWVzc2FnZXMiLCJzZWxlY3RvckNsYXNzIiwibWVzc2FnZXMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiX2NyZWF0ZUNsYXNzIiwiZGVmaW5lUHJvcGVydGllcyIsInByb3BzIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImRlZmluZVByb3BlcnR5Iiwia2V5IiwiQ29uc3RydWN0b3IiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsInNlcHB1a3UiLCJnZXRDb21wdXRlZFN0eWxlIiwidGVzdE5vZGUiLCJzb21lIiwicHJlZml4IiwicG9zaXRpb24iLCJzaGFkb3dSb290RXhpc3RzIiwiU2hhZG93Um9vdCIsInNjcm9sbCIsInRvcCIsImxlZnQiLCJzdGlja2llcyIsImV4dGVuZCIsInRhcmdldE9iaiIsInNvdXJjZU9iamVjdCIsImhhc093blByb3BlcnR5IiwicGFyc2VOdW1lcmljIiwidmFsIiwicGFyc2VGbG9hdCIsImdldERvY09mZnNldFRvcCIsImRvY09mZnNldFRvcCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsIlN0aWNreSIsIkhUTUxFbGVtZW50IiwiRXJyb3IiLCJzdGlja3kiLCJfbm9kZSIsIl9zdGlja3lNb2RlIiwiX2FjdGl2ZSIsInB1c2giLCJyZWZyZXNoIiwiX3JlbW92ZWQiLCJfZGVhY3RpdmF0ZSIsIm5vZGVDb21wdXRlZFN0eWxlIiwibm9kZUNvbXB1dGVkUHJvcHMiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJjc3NGbG9hdCIsImlzTmFOIiwicmVmZXJlbmNlTm9kZSIsImhvc3QiLCJub2RlV2luT2Zmc2V0IiwicGFyZW50V2luT2Zmc2V0IiwicGFyZW50Q29tcHV0ZWRTdHlsZSIsIl9wYXJlbnQiLCJzdHlsZXMiLCJvZmZzZXRIZWlnaHQiLCJfb2Zmc2V0VG9XaW5kb3ciLCJyaWdodCIsImNsaWVudFdpZHRoIiwiX29mZnNldFRvUGFyZW50IiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiX3N0eWxlcyIsImJvdHRvbSIsIm5vZGVUb3BWYWx1ZSIsIl9saW1pdHMiLCJzdGFydCIsInBhZ2VZT2Zmc2V0IiwiZW5kIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJwYXJlbnRQb3NpdGlvbiIsIl9yZWNhbGNQb3NpdGlvbiIsImNsb25lIiwiX2Nsb25lIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlciIsImJvcmRlclNwYWNpbmciLCJmb250U2l6ZSIsInN0aWNreU1vZGUiLCJfZmFzdENoZWNrIiwiYWJzIiwiX3RoaXMiLCJfdGhpczIiLCJpbmRleCIsInNwbGljZSIsIlN0aWNreWZpbGwiLCJhZGRPbmUiLCJub2RlTGlzdCIsImFkZGVkU3RpY2tpZXMiLCJfbG9vcCIsIl9yZXQiLCJyZWZyZXNoQWxsIiwicmVtb3ZlT25lIiwiX2xvb3AyIiwicmVtb3ZlQWxsIiwiY2hlY2tTY3JvbGwiLCJwYWdlWE9mZnNldCIsImZhc3RDaGVja1RpbWVyIiwic3RhcnRGYXN0Q2hlY2tUaW1lciIsInNldEludGVydmFsIiwic3RvcEZhc3RDaGVja1RpbWVyIiwiY2xlYXJJbnRlcnZhbCIsImRvY0hpZGRlbktleSIsInZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwidCIsImRlZmluZSIsImFtZCIsInRoaXMiLCJvIiwiciIsImEiLCJjIiwibCIsInMiLCJ1IiwiZiIsInNlbGVjdG9ySGVhZGVyIiwiY29udGFpbmVyIiwib2Zmc2V0IiwiYWN0aXZlQ2xhc3MiLCJzY3JvbGxEZWxheSIsImNhbGxiYWNrIiwiZCIsInYiLCJtIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZyIsImgiLCJwIiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwieSIsInNvcnQiLCJkaXN0YW5jZSIsInNldERpc3RhbmNlcyIsImIiLCJoYXNoIiwibmF2IiwicGFyZW50IiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiSCIsIkMiLCJnZXRDdXJyZW50TmF2IiwiTCIsImoiLCJFIiwibmF2aWdhdGlvbklucGFnZXMiLCJzdGlja3lTZWxlY3RvciIsInNweVNlbGVjdG9yIiwic3B5Q2xhc3MiLCJzcHlBY3RpdmVDb250YWluZXIiLCJzcHlUcmlnZ2VyIiwic3B5T2Zmc2V0IiwidG9nZ2xlU2VsZWN0b3IiLCJsaW5rc1NlbGVjdG9yIiwic3RpY2t5SW5zdGFuY2UiLCJpbml0U3RpY2t5IiwiZGVzdHJveVN0aWNreSIsImluaXRTY3JvbGxTcHkiLCJpbnBhZ2VOYXZFbGVtZW50IiwiZ3Vtc2hvZSIsIm5hdmlnYXRpb25UaXRsZSIsImRlc3Ryb3lTY3JvbGxTcHkiLCJuYXZMaW5rcyIsImxpbmsiLCJvbkNsaWNrIiwibWVudSIsImhhc1BvcHVwIiwib25LZXlkb3duIiwiY3VycmVudFRhYiIsInByZXZpb3VzVGFiSXRlbSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJsYXN0RWxlbWVudENoaWxkIiwibmV4dFRhYkl0ZW0iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm1lZ2FtZW51IiwibGlua1NlbGVjdG9yIiwibWVnYW1lbnVzQXJyYXkiLCJTdGlja3liaXRzIiwib2JqIiwidmVyc2lvbiIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsImN1c3RvbVN0aWNreUNoYW5nZU51bWJlciIsIm5vU3R5bGVzIiwic3RpY2t5Qml0U3RpY2t5T2Zmc2V0IiwicGFyZW50Q2xhc3MiLCJzY3JvbGxFbCIsInN0aWNreUNsYXNzIiwic3R1Y2tDbGFzcyIsInN0aWNreUNoYW5nZUNsYXNzIiwidXNlU3RpY2t5Q2xhc3NlcyIsInZlcnRpY2FsUG9zaXRpb24iLCJwb3NpdGlvblZhbCIsImRlZmluZVBvc2l0aW9uIiwidnAiLCJucyIsInB2IiwiZWxzIiwiaW5zdGFuY2VzIiwiZWwiLCJhZGRJbnN0YW5jZSIsIl9wcm90byIsImhlYWQiLCJzdGlja3lQcm9wIiwiaXRlbSIsImlzV2luIiwic2UiLCJnZXRDbG9zZXN0UGFyZW50IiwiY29tcHV0ZVNjcm9sbE9mZnNldHMiLCJzdGF0ZSIsInN0YXRlQ29udGFpbmVyIiwibWFuYWdlU3RhdGUiLCJtYXRjaCIsImdldE9mZnNldFRvcCIsIml0IiwiaXNDdXN0b20iLCJpc0JvdHRvbSIsInNjcm9sbEVsT2Zmc2V0Iiwic3RpY2t5U3RhcnQiLCJzdGlja3lDaGFuZ2VPZmZzZXQiLCJzdGlja3lDaGFuZ2UiLCJzdGlja3lTdG9wIiwidG9nZ2xlQ2xhc3NlcyIsImNBcnJheSIsInNwbGl0Iiwickl0ZW0iLCJqb2luIiwiY2hhbmdlIiwic3RvcCIsInN0bCIsInN0dWNrIiwickFGU3R1YiIsInJBRkR1bW15IiwickFGIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0QyIsInNjcm9sbFkiLCJzY3JvbGxUb3AiLCJub3RTdGlja3kiLCJpc1N0aWNreSIsImlzU3R1Y2siLCJpc1N0aWNreUNoYW5nZSIsImlzTm90U3RpY2t5Q2hhbmdlIiwic3R1YiIsInVwZGF0ZSIsInJlbW92ZUluc3RhbmNlIiwiY2xlYW51cCIsInN0aWNreWJpdHMiLCJuYXZpZ2F0aW9uU2lkZSIsImFjdGl2ZVNlbGVjdG9yIiwic2Nyb2xsVG9Ub3AiLCJzdWJzdHJpbmciLCJzY3JvbGxJbnRvVmlldyIsInVuZm9sZFRvQWN0aXZlIiwiYWN0aXZlIiwibWF0Y2hlcyIsImVjbFRhYmxlcyIsInRhYmxlcyIsImhlYWRlclRleHQiLCJ0ZXh0Q29sc3BhbiIsImNpIiwiY24iLCJ0YWJsZVJvd3MiLCJ0YWJsZSIsImhlYWRlcnMiLCJoZWFkRmlyc3QiLCJjZWxsUGVyUm93IiwiY29sc3BhbkluZGV4Iiwicm93IiwiY2VsbCIsInRhYnMiLCJ0YWJsaXN0U2VsZWN0b3IiLCJ0YWJwYW5lbFNlbGVjdG9yIiwidGFiZWxlbWVudHNTZWxlY3RvciIsInRhYkNvbnRhaW5lcnMiLCJzaG93VGFiIiwiZ2l2ZUZvY3VzIiwic2libGluZ1RhYnMiLCJzaWJsaW5nVGFicGFuZWxzIiwidGFiIiwicmVtb3ZlQXR0cmlidXRlIiwidGFicGFuZWwiLCJldmVudFRhYkNsaWNrIiwiZXZlbnRUYWJLZXlkb3duIiwiYmluZFRhYnNFdmVudHMiLCJ0YWJDb250YWluZXIiLCJ0YWJzRWxlbWVudHMiLCJ1bmJpbmRUYWJzRXZlbnRzIiwiZXhwYW5kVGltZWxpbmUiLCJ0aW1lbGluZSIsInRpbWVsaW5lcyJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7QUFDQSxFQUFPLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxRQUFEO0VBQUEsTUFBV0MsT0FBWCx1RUFBcUJDLFFBQXJCO0VBQUEsU0FDdEIsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQWNILFFBQVFJLGdCQUFSLENBQXlCTCxRQUF6QixDQUFkLENBRHNCO0VBQUEsQ0FBakI7O0VDRFA7O0VBSUE7OztBQUdBLE1BQWFNLGFBQWEsU0FBYkEsVUFBYSxHQUdmO0VBQUEsaUZBQVAsRUFBTztFQUFBLDJCQUZUTixRQUVTO0VBQUEsTUFGQ0EsUUFFRCxpQ0FGWSxnQkFFWjtFQUFBLGlDQURUTyxjQUNTO0VBQUEsTUFET0EsY0FDUCx1Q0FEd0Isd0JBQ3hCOztFQUNUO0VBQ0EsTUFDRSxFQUFFLG1CQUFtQkwsUUFBckIsS0FDQSxFQUFFLHNCQUFzQk0sTUFBeEIsQ0FEQSxJQUVBLENBQUNOLFNBQVNPLGVBQVQsQ0FBeUJDLFNBSDVCLEVBS0UsT0FBTyxJQUFQOztFQUVGO0VBQ0E7RUFDQSxNQUFNQyxzQkFBc0JaLFNBQVNDLFFBQVQsQ0FBNUI7O0VBRUE7RUFDQSxXQUFTWSxTQUFULENBQW1CQyxNQUFuQixFQUEyQjtFQUN6QjtFQUNBLFFBQU1DLGNBQWNaLFNBQVNhLGNBQVQsQ0FDbEJGLE9BQU9HLFlBQVAsQ0FBb0IsZUFBcEIsQ0FEa0IsQ0FBcEI7O0VBSUFILFdBQU9JLFlBQVAsQ0FBb0IsZUFBcEIsRUFBcUMsT0FBckM7O0VBRUE7RUFDQUgsZ0JBQVlHLFlBQVosQ0FBeUIsYUFBekIsRUFBd0MsTUFBeEM7RUFDRDs7RUFFRCxXQUFTQyxTQUFULENBQW1CTCxNQUFuQixFQUEyQjtFQUN6QjtFQUNBLFFBQU1DLGNBQWNaLFNBQVNhLGNBQVQsQ0FDbEJGLE9BQU9HLFlBQVAsQ0FBb0IsZUFBcEIsQ0FEa0IsQ0FBcEI7O0VBSUE7RUFDQUgsV0FBT0ksWUFBUCxDQUFvQixVQUFwQixFQUFnQyxDQUFoQztFQUNBSixXQUFPSSxZQUFQLENBQW9CLGVBQXBCLEVBQXFDLE1BQXJDOztFQUVBO0VBQ0FILGdCQUFZRyxZQUFaLENBQXlCLGFBQXpCLEVBQXdDLE9BQXhDO0VBQ0Q7O0VBRUQsV0FBU0UsV0FBVCxDQUFxQk4sTUFBckIsRUFBNkI7RUFDM0I7RUFDQSxRQUFJQSxPQUFPRyxZQUFQLENBQW9CLGVBQXBCLE1BQXlDLE1BQTdDLEVBQXFEO0VBQ25ESixnQkFBVUMsTUFBVjtFQUNBO0VBQ0Q7O0VBRURLLGNBQVVMLE1BQVY7RUFDRDs7RUFFRCxXQUFTTyxlQUFULENBQXlCQyxTQUF6QixFQUFvQ0MsQ0FBcEMsRUFBdUM7RUFDckM7RUFDQUQsY0FBVUMsQ0FBVixFQUFhQyxLQUFiO0VBQ0Q7O0VBRUQ7RUFDQSxXQUFTQyxnQkFBVCxDQUEwQkMsQ0FBMUIsRUFBNkI7RUFDM0JOLGdCQUFZTSxFQUFFQyxhQUFkO0VBQ0Q7O0VBRUQsV0FBU0Msa0JBQVQsQ0FBNEJGLENBQTVCLEVBQStCO0VBQzdCO0VBQ0EsUUFBTUcsZ0JBQWdCSCxFQUFFQyxhQUF4QjtFQUNBLFFBQU1HLGdCQUFnQkosRUFBRUssT0FBRixJQUFhTCxFQUFFTSxNQUFyQztFQUNBO0VBQ0EsUUFBTUMsZ0JBQWdCSixjQUFjSyxVQUFkLENBQXlCQSxVQUEvQztFQUNBLFFBQU1DLGVBQWVuQyxTQUFTUSxjQUFULEVBQXlCeUIsYUFBekIsQ0FBckI7RUFDQSxRQUFNRyxxQkFBcUIsR0FBR0MsT0FBSCxDQUFXaEMsSUFBWCxDQUFnQjhCLFlBQWhCLEVBQThCTixhQUE5QixDQUEzQjs7RUFFQTtFQUNBLFFBQUlDLGFBQUosRUFBbUI7O0VBRW5CO0VBQ0E7RUFDQSxZQUFRSixFQUFFWSxPQUFWO0VBQ0UsV0FBSyxFQUFMO0VBQ0EsV0FBSyxFQUFMO0VBQ0VsQixvQkFBWVMsYUFBWjtFQUNBSCxVQUFFYSxjQUFGO0VBQ0E7RUFDRixXQUFLLEVBQUw7RUFDQSxXQUFLLEVBQUw7RUFBUztFQUNQLGNBQU1DLHNCQUNKSix1QkFBdUIsQ0FBdkIsR0FDSUQsYUFBYU0sTUFBYixHQUFzQixDQUQxQixHQUVJTCxxQkFBcUIsQ0FIM0I7RUFJQWYsMEJBQWdCYyxZQUFoQixFQUE4QkssbUJBQTlCO0VBQ0FkLFlBQUVhLGNBQUY7RUFDQTtFQUNEO0VBQ0QsV0FBSyxFQUFMO0VBQ0EsV0FBSyxFQUFMO0VBQVM7RUFDUCxjQUFNRyxrQkFDSk4scUJBQXFCRCxhQUFhTSxNQUFiLEdBQXNCLENBQTNDLEdBQ0lMLHFCQUFxQixDQUR6QixHQUVJLENBSE47RUFJQWYsMEJBQWdCYyxZQUFoQixFQUE4Qk8sZUFBOUI7RUFDQWhCLFlBQUVhLGNBQUY7RUFDQTtFQUNEO0VBQ0Q7RUFDRTtFQTNCSjtFQTZCRDs7RUFFRDtFQUNBLFdBQVNJLG1CQUFULENBQTZCQyxrQkFBN0IsRUFBaUQ7RUFDL0MsUUFBTUMsbUJBQW1CN0MsU0FBU1EsY0FBVCxFQUF5Qm9DLGtCQUF6QixDQUF6QjtFQUNBO0VBQ0FDLHFCQUFpQkMsT0FBakIsQ0FBeUIsMkJBQW1CO0VBQzFDQyxzQkFBZ0JDLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQ3ZCLGdCQUExQztFQUNBc0Isc0JBQWdCQyxnQkFBaEIsQ0FBaUMsU0FBakMsRUFBNENwQixrQkFBNUM7RUFDRCxLQUhEO0VBSUQ7O0VBRUQ7RUFDQSxXQUFTcUIscUJBQVQsQ0FBK0JMLGtCQUEvQixFQUFtRDtFQUNqRCxRQUFNQyxtQkFBbUI3QyxTQUFTUSxjQUFULEVBQXlCb0Msa0JBQXpCLENBQXpCO0VBQ0E7RUFDQUMscUJBQWlCQyxPQUFqQixDQUF5QiwyQkFBbUI7RUFDMUNDLHNCQUFnQkcsbUJBQWhCLENBQW9DLE9BQXBDLEVBQTZDekIsZ0JBQTdDO0VBQ0FzQixzQkFBZ0JHLG1CQUFoQixDQUFvQyxTQUFwQyxFQUErQ3RCLGtCQUEvQztFQUNELEtBSEQ7RUFJRDs7RUFFRDtFQUNBLFdBQVN1QixPQUFULEdBQW1CO0VBQ2pCdkMsd0JBQW9Ca0MsT0FBcEIsQ0FBNEIsOEJBQXNCO0VBQ2hERyw0QkFBc0JMLGtCQUF0QjtFQUNELEtBRkQ7RUFHRDs7RUFFRDtFQUNBLFdBQVNRLElBQVQsR0FBZ0I7RUFDZCxRQUFJeEMsb0JBQW9CNkIsTUFBeEIsRUFBZ0M7RUFDOUI3QiwwQkFBb0JrQyxPQUFwQixDQUE0Qiw4QkFBc0I7RUFDaERILDRCQUFvQkMsa0JBQXBCO0VBQ0QsT0FGRDtFQUdEO0VBQ0Y7O0VBRURROztFQUVBO0VBQ0EsU0FBTztFQUNMQSxjQURLO0VBRUxEO0VBRkssR0FBUDtFQUlELENBdkpNOzs7Ozs7Ozs7Ozs7OztFQ1BQOzs7Ozs7Ozs7O0VBVUEsSUFBSUUsa0JBQWtCLHFCQUF0Qjs7O0VBR0EsSUFBSUMsTUFBTSxJQUFJLENBQWQ7OztFQUdBLElBQUlDLFlBQVksaUJBQWhCOzs7RUFHQSxJQUFJQyxTQUFTLFlBQWI7OztFQUdBLElBQUlDLGFBQWEsb0JBQWpCOzs7RUFHQSxJQUFJQyxhQUFhLFlBQWpCOzs7RUFHQSxJQUFJQyxZQUFZLGFBQWhCOzs7RUFHQSxJQUFJQyxlQUFlQyxRQUFuQjs7O0VBR0EsSUFBSUMsYUFBYUMsUUFBT0MsY0FBUCxLQUFpQixRQUFqQixJQUE2QkEsY0FBN0IsSUFBdUNBLGNBQUFBLENBQU9DLE1BQVBELEtBQWtCQyxNQUF6RCxJQUFtRUQsY0FBcEY7OztFQUdBLElBQUlFLFdBQVcsUUFBT0MsSUFBUCx5Q0FBT0EsSUFBUCxNQUFlLFFBQWYsSUFBMkJBLElBQTNCLElBQW1DQSxLQUFLRixNQUFMLEtBQWdCQSxNQUFuRCxJQUE2REUsSUFBNUU7OztFQUdBLElBQUlDLE9BQU9OLGNBQWNJLFFBQWQsSUFBMEJHLFNBQVMsYUFBVCxHQUFyQzs7O0VBR0EsSUFBSUMsY0FBY0wsT0FBT00sU0FBekI7Ozs7Ozs7RUFPQSxJQUFJQyxpQkFBaUJGLFlBQVlHLFFBQWpDOzs7RUFHQSxJQUFJQyxZQUFZQyxLQUFLQyxHQUFyQjtFQUFBLElBQ0lDLFlBQVlGLEtBQUtHLEdBRHJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtQkEsSUFBSUMsTUFBTSxTQUFOQSxHQUFNLEdBQVc7RUFDbkIsU0FBT1gsS0FBS1ksSUFBTCxDQUFVRCxHQUFWLEVBQVA7RUFDRCxDQUZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTBEQSxTQUFTRSxRQUFULENBQWtCQyxJQUFsQixFQUF3QkMsSUFBeEIsRUFBOEJDLE9BQTlCLEVBQXVDO0VBQ3JDLE1BQUlDLFFBQUo7RUFBQSxNQUNJQyxRQURKO0VBQUEsTUFFSUMsT0FGSjtFQUFBLE1BR0lDLE1BSEo7RUFBQSxNQUlJQyxPQUpKO0VBQUEsTUFLSUMsWUFMSjtFQUFBLE1BTUlDLGlCQUFpQixDQU5yQjtFQUFBLE1BT0lDLFVBQVUsS0FQZDtFQUFBLE1BUUlDLFNBQVMsS0FSYjtFQUFBLE1BU0lDLFdBQVcsSUFUZjs7RUFXQSxNQUFJLE9BQU9aLElBQVAsSUFBZSxVQUFuQixFQUErQjtFQUM3QixVQUFNLElBQUlhLFNBQUosQ0FBYzFDLGVBQWQsQ0FBTjtFQUNEO0VBQ0Q4QixTQUFPYSxTQUFTYixJQUFULEtBQWtCLENBQXpCO0VBQ0EsTUFBSWMsU0FBU2IsT0FBVCxDQUFKLEVBQXVCO0VBQ3JCUSxjQUFVLENBQUMsQ0FBQ1IsUUFBUVEsT0FBcEI7RUFDQUMsYUFBUyxhQUFhVCxPQUF0QjtFQUNBRyxjQUFVTSxTQUFTbkIsVUFBVXNCLFNBQVNaLFFBQVFHLE9BQWpCLEtBQTZCLENBQXZDLEVBQTBDSixJQUExQyxDQUFULEdBQTJESSxPQUFyRTtFQUNBTyxlQUFXLGNBQWNWLE9BQWQsR0FBd0IsQ0FBQyxDQUFDQSxRQUFRVSxRQUFsQyxHQUE2Q0EsUUFBeEQ7RUFDRDs7RUFFRCxXQUFTSSxVQUFULENBQW9CQyxJQUFwQixFQUEwQjtFQUN4QixRQUFJQyxPQUFPZixRQUFYO0VBQUEsUUFDSWdCLFVBQVVmLFFBRGQ7O0VBR0FELGVBQVdDLFdBQVdnQixTQUF0QjtFQUNBWCxxQkFBaUJRLElBQWpCO0VBQ0FYLGFBQVNOLEtBQUtxQixLQUFMLENBQVdGLE9BQVgsRUFBb0JELElBQXBCLENBQVQ7RUFDQSxXQUFPWixNQUFQO0VBQ0Q7O0VBRUQsV0FBU2dCLFdBQVQsQ0FBcUJMLElBQXJCLEVBQTJCOztFQUV6QlIscUJBQWlCUSxJQUFqQjs7RUFFQVYsY0FBVWdCLFdBQVdDLFlBQVgsRUFBeUJ2QixJQUF6QixDQUFWOztFQUVBLFdBQU9TLFVBQVVNLFdBQVdDLElBQVgsQ0FBVixHQUE2QlgsTUFBcEM7RUFDRDs7RUFFRCxXQUFTbUIsYUFBVCxDQUF1QlIsSUFBdkIsRUFBNkI7RUFDM0IsUUFBSVMsb0JBQW9CVCxPQUFPVCxZQUEvQjtFQUFBLFFBQ0ltQixzQkFBc0JWLE9BQU9SLGNBRGpDO0VBQUEsUUFFSUgsU0FBU0wsT0FBT3lCLGlCQUZwQjs7RUFJQSxXQUFPZixTQUFTaEIsVUFBVVcsTUFBVixFQUFrQkQsVUFBVXNCLG1CQUE1QixDQUFULEdBQTREckIsTUFBbkU7RUFDRDs7RUFFRCxXQUFTc0IsWUFBVCxDQUFzQlgsSUFBdEIsRUFBNEI7RUFDMUIsUUFBSVMsb0JBQW9CVCxPQUFPVCxZQUEvQjtFQUFBLFFBQ0ltQixzQkFBc0JWLE9BQU9SLGNBRGpDOzs7OztFQU1BLFdBQVFELGlCQUFpQlksU0FBakIsSUFBK0JNLHFCQUFxQnpCLElBQXBELElBQ0x5QixvQkFBb0IsQ0FEZixJQUNzQmYsVUFBVWdCLHVCQUF1QnRCLE9BRC9EO0VBRUQ7O0VBRUQsV0FBU21CLFlBQVQsR0FBd0I7RUFDdEIsUUFBSVAsT0FBT3BCLEtBQVg7RUFDQSxRQUFJK0IsYUFBYVgsSUFBYixDQUFKLEVBQXdCO0VBQ3RCLGFBQU9ZLGFBQWFaLElBQWIsQ0FBUDtFQUNEOztFQUVEVixjQUFVZ0IsV0FBV0MsWUFBWCxFQUF5QkMsY0FBY1IsSUFBZCxDQUF6QixDQUFWO0VBQ0Q7O0VBRUQsV0FBU1ksWUFBVCxDQUFzQlosSUFBdEIsRUFBNEI7RUFDMUJWLGNBQVVhLFNBQVY7Ozs7RUFJQSxRQUFJUixZQUFZVCxRQUFoQixFQUEwQjtFQUN4QixhQUFPYSxXQUFXQyxJQUFYLENBQVA7RUFDRDtFQUNEZCxlQUFXQyxXQUFXZ0IsU0FBdEI7RUFDQSxXQUFPZCxNQUFQO0VBQ0Q7O0VBRUQsV0FBU3dCLE1BQVQsR0FBa0I7RUFDaEIsUUFBSXZCLFlBQVlhLFNBQWhCLEVBQTJCO0VBQ3pCVyxtQkFBYXhCLE9BQWI7RUFDRDtFQUNERSxxQkFBaUIsQ0FBakI7RUFDQU4sZUFBV0ssZUFBZUosV0FBV0csVUFBVWEsU0FBL0M7RUFDRDs7RUFFRCxXQUFTWSxLQUFULEdBQWlCO0VBQ2YsV0FBT3pCLFlBQVlhLFNBQVosR0FBd0JkLE1BQXhCLEdBQWlDdUIsYUFBYWhDLEtBQWIsQ0FBeEM7RUFDRDs7RUFFRCxXQUFTb0MsU0FBVCxHQUFxQjtFQUNuQixRQUFJaEIsT0FBT3BCLEtBQVg7RUFBQSxRQUNJcUMsYUFBYU4sYUFBYVgsSUFBYixDQURqQjs7RUFHQWQsZUFBV2dDLFNBQVg7RUFDQS9CLGVBQVcsSUFBWDtFQUNBSSxtQkFBZVMsSUFBZjs7RUFFQSxRQUFJaUIsVUFBSixFQUFnQjtFQUNkLFVBQUkzQixZQUFZYSxTQUFoQixFQUEyQjtFQUN6QixlQUFPRSxZQUFZZCxZQUFaLENBQVA7RUFDRDtFQUNELFVBQUlHLE1BQUosRUFBWTs7RUFFVkosa0JBQVVnQixXQUFXQyxZQUFYLEVBQXlCdkIsSUFBekIsQ0FBVjtFQUNBLGVBQU9lLFdBQVdSLFlBQVgsQ0FBUDtFQUNEO0VBQ0Y7RUFDRCxRQUFJRCxZQUFZYSxTQUFoQixFQUEyQjtFQUN6QmIsZ0JBQVVnQixXQUFXQyxZQUFYLEVBQXlCdkIsSUFBekIsQ0FBVjtFQUNEO0VBQ0QsV0FBT0ssTUFBUDtFQUNEO0VBQ0QyQixZQUFVSCxNQUFWLEdBQW1CQSxNQUFuQjtFQUNBRyxZQUFVRCxLQUFWLEdBQWtCQSxLQUFsQjtFQUNBLFNBQU9DLFNBQVA7RUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMkJELFNBQVNsQixRQUFULENBQWtCcUIsS0FBbEIsRUFBeUI7RUFDdkIsTUFBSUMsY0FBY0QsS0FBZCx5Q0FBY0EsS0FBZCxDQUFKO0VBQ0EsU0FBTyxDQUFDLENBQUNBLEtBQUYsS0FBWUMsUUFBUSxRQUFSLElBQW9CQSxRQUFRLFVBQXhDLENBQVA7RUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEwQkQsU0FBU0MsWUFBVCxDQUFzQkYsS0FBdEIsRUFBNkI7RUFDM0IsU0FBTyxDQUFDLENBQUNBLEtBQUYsSUFBVyxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE1BQWdCLFFBQWxDO0VBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtQkQsU0FBU0csUUFBVCxDQUFrQkgsS0FBbEIsRUFBeUI7RUFDdkIsU0FBTyxRQUFPQSxLQUFQLHlDQUFPQSxLQUFQLE1BQWdCLFFBQWhCLElBQ0pFLGFBQWFGLEtBQWIsS0FBdUI5QyxlQUFlbkUsSUFBZixDQUFvQmlILEtBQXBCLEtBQThCL0QsU0FEeEQ7RUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXlCRCxTQUFTeUMsUUFBVCxDQUFrQnNCLEtBQWxCLEVBQXlCO0VBQ3ZCLE1BQUksT0FBT0EsS0FBUCxJQUFnQixRQUFwQixFQUE4QjtFQUM1QixXQUFPQSxLQUFQO0VBQ0Q7RUFDRCxNQUFJRyxTQUFTSCxLQUFULENBQUosRUFBcUI7RUFDbkIsV0FBT2hFLEdBQVA7RUFDRDtFQUNELE1BQUkyQyxTQUFTcUIsS0FBVCxDQUFKLEVBQXFCO0VBQ25CLFFBQUlJLFFBQVEsT0FBT0osTUFBTUssT0FBYixJQUF3QixVQUF4QixHQUFxQ0wsTUFBTUssT0FBTixFQUFyQyxHQUF1REwsS0FBbkU7RUFDQUEsWUFBUXJCLFNBQVN5QixLQUFULElBQW1CQSxRQUFRLEVBQTNCLEdBQWlDQSxLQUF6QztFQUNEO0VBQ0QsTUFBSSxPQUFPSixLQUFQLElBQWdCLFFBQXBCLEVBQThCO0VBQzVCLFdBQU9BLFVBQVUsQ0FBVixHQUFjQSxLQUFkLEdBQXNCLENBQUNBLEtBQTlCO0VBQ0Q7RUFDREEsVUFBUUEsTUFBTU0sT0FBTixDQUFjcEUsTUFBZCxFQUFzQixFQUF0QixDQUFSO0VBQ0EsTUFBSXFFLFdBQVduRSxXQUFXb0UsSUFBWCxDQUFnQlIsS0FBaEIsQ0FBZjtFQUNBLFNBQVFPLFlBQVlsRSxVQUFVbUUsSUFBVixDQUFlUixLQUFmLENBQWIsR0FDSDFELGFBQWEwRCxNQUFNbEgsS0FBTixDQUFZLENBQVosQ0FBYixFQUE2QnlILFdBQVcsQ0FBWCxHQUFlLENBQTVDLENBREcsR0FFRnBFLFdBQVdxRSxJQUFYLENBQWdCUixLQUFoQixJQUF5QmhFLEdBQXpCLEdBQStCLENBQUNnRSxLQUZyQztFQUdEOztFQUVELHNCQUFpQnJDLFFBQWpCOztFQ3JYQTs7O0FBR0EsTUFBYThDLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FRbkI7RUFBQSxpRkFBUCxFQUFPO0VBQUEsbUNBUFRDLGtCQU9TO0VBQUEsTUFQV0Esa0JBT1gseUNBUGdDLGlCQU9oQztFQUFBLG1DQU5UQyxvQkFNUztFQUFBLE1BTmFBLG9CQU1iLHlDQU5vQyw2QkFNcEM7RUFBQSxrQ0FMVEMsZUFLUztFQUFBLE1BTFFBLGVBS1Isd0NBTDBCLDBCQUsxQjtFQUFBLG1DQUpUQyxvQkFJUztFQUFBLE1BSmFBLG9CQUliLHlDQUpvQyxpQ0FJcEM7RUFBQSxtQ0FIVEMsc0JBR1M7RUFBQSxNQUhlQSxzQkFHZix5Q0FId0MscUtBR3hDO0VBQUEsbUNBRlRDLHFCQUVTO0VBQUEsTUFGY0EscUJBRWQseUNBRnNDLHNGQUV0QztFQUFBLG1DQURUQyxnQkFDUztFQUFBLE1BRFNBLGdCQUNULHlDQUQ0QixvQ0FDNUI7O0VBQ1QsTUFDRSxFQUFFLG1CQUFtQm5JLFFBQXJCLEtBQ0EsRUFBRSxzQkFBc0JNLE1BQXhCLENBREEsSUFFQSxDQUFDTixTQUFTTyxlQUFULENBQXlCQyxTQUg1QixFQUtFLE9BQU8sSUFBUDs7RUFFRjtFQUNBLFdBQVM0SCxZQUFULENBQXNCQyxtQkFBdEIsRUFBMkM7RUFDekM7RUFDQSxRQUFNQyxrQkFBa0J6SSxTQUFTbUksb0JBQVQsRUFBK0JLLG1CQUEvQixDQUF4QjtFQUNBQyxvQkFBZ0IzRixPQUFoQixDQUF3QixtQkFBVztFQUNqQyxVQUFNNEYsV0FBV3ZJLFNBQVN3SSxhQUFULENBQXVCLEdBQXZCLENBQWpCO0VBQ0E7RUFDQUQsZUFBUy9ILFNBQVQsQ0FBbUJpSSxHQUFuQixDQUF1QixVQUF2QjtFQUNBRixlQUFTL0gsU0FBVCxDQUFtQmlJLEdBQW5CLENBQXVCLG9CQUF2QjtFQUNBRixlQUFTL0gsU0FBVCxDQUFtQmlJLEdBQW5CLENBQXVCLHNCQUF2QjtFQUNBRixlQUFTL0gsU0FBVCxDQUFtQmlJLEdBQW5CLENBQXVCLHNCQUF2QjtFQUNBRixlQUFTL0gsU0FBVCxDQUFtQmlJLEdBQW5CLENBQXVCLDRCQUF2QjtFQUNBRixlQUFTeEgsWUFBVCxDQUFzQixNQUF0QixFQUE4QixHQUE5QjtFQUNBd0gsZUFBU0csU0FBVCxHQUFxQixHQUFyQjs7RUFFQSxVQUFNQyxXQUFXM0ksU0FBU3dJLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBakI7RUFDQUcsZUFBU25JLFNBQVQsQ0FBbUJpSSxHQUFuQixDQUF1Qix5QkFBdkI7RUFDQUUsZUFBU25JLFNBQVQsQ0FBbUJpSSxHQUFuQixDQUF1QixtQ0FBdkI7RUFDQUUsZUFBU25JLFNBQVQsQ0FBbUJpSSxHQUFuQixDQUF1QixZQUF2QjtFQUNBRSxlQUFTNUgsWUFBVCxDQUFzQixhQUF0QixFQUFxQyxNQUFyQzs7RUFFQTRILGVBQVNDLFdBQVQsQ0FBcUJMLFFBQXJCO0VBQ0FNLGNBQVE5RyxVQUFSLENBQW1CK0csWUFBbkIsQ0FBZ0NILFFBQWhDLEVBQTBDRSxRQUFRRSxXQUFsRDtFQUNELEtBbkJEO0VBb0JEOztFQUVELFdBQVNDLGNBQVQsQ0FBd0JYLG1CQUF4QixFQUE2QztFQUMzQztFQUNBLFFBQU1ZLDJCQUEyQnBKLFNBQy9CcUkscUJBRCtCLEVBRS9CRyxtQkFGK0IsQ0FBakM7RUFJQSxRQUFNYSxTQUFTRCx5QkFBeUIzRyxNQUF6QixHQUFrQyxDQUFsQyxHQUFzQyxPQUF0QyxHQUFnRCxNQUEvRDs7RUFFQTtFQUNBLFFBQU02RyxxQkFBcUJ0SixTQUFTc0ksZ0JBQVQsRUFBMkJFLG1CQUEzQixDQUEzQjtFQUNBYyx1QkFBbUJ4RyxPQUFuQixDQUEyQixvQkFBWTtFQUNyQzRGLGVBQVN4SCxZQUFULENBQXNCLGFBQXRCLEVBQXFDbUksTUFBckM7RUFDRCxLQUZEO0VBR0Q7O0VBRUQsV0FBU0Usb0JBQVQsQ0FBOEJmLG1CQUE5QixFQUFtRDtFQUNqRDtFQUNBLFFBQU1nQixlQUFlN0UsS0FBSzhFLEtBQUwsQ0FDbkJqQixvQkFBb0JrQixxQkFBcEIsR0FBNENDLEtBRHpCLENBQXJCOztFQUlBO0VBQ0EsUUFBTUMscUJBQXFCNUosU0FBU2tJLGVBQVQsRUFBMEJNLG1CQUExQixDQUEzQjs7RUFFQTtFQUNBLFFBQUlxQixlQUFlLENBQW5CO0VBQ0FELHVCQUFtQjlHLE9BQW5CLENBQTJCLDZCQUFxQjtFQUM5QytHLHNCQUFnQmxGLEtBQUttRixJQUFMLENBQ2RDLGtCQUFrQkwscUJBQWxCLEdBQTBDQyxLQUQ1QixDQUFoQjtFQUdELEtBSkQ7O0VBTUEsV0FBT0UsZ0JBQWdCTCxZQUF2QjtFQUNEOztFQUVELFdBQVNRLFdBQVQsQ0FBcUJ4QixtQkFBckIsRUFBMEM7RUFDeEM7RUFDQSxRQUFNeUIsNEJBQTRCakssU0FDaENvSSxzQkFEZ0MsRUFFaENJLG1CQUZnQyxDQUFsQzs7RUFLQTtFQUNBO0VBQ0EsUUFBSXlCLDBCQUEwQnhILE1BQTFCLEdBQW1DLENBQXZDLEVBQTBDO0VBQ3hDd0gsZ0NBQTBCLENBQTFCLEVBQTZCL0ksWUFBN0IsQ0FBMEMsYUFBMUMsRUFBeUQsTUFBekQ7O0VBRUE7RUFDQSxVQUFJcUkscUJBQXFCZixtQkFBckIsQ0FBSixFQUErQztFQUM3Q3dCLG9CQUFZeEIsbUJBQVo7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQsV0FBUzBCLFdBQVQsQ0FBcUIxQixtQkFBckIsRUFBMEM7RUFDeEM7RUFDQSxRQUFNWSwyQkFBMkJwSixTQUMvQnFJLHFCQUQrQixFQUUvQkcsbUJBRitCLENBQWpDOztFQUtBO0VBQ0EsUUFBSVkseUJBQXlCM0csTUFBekIsR0FBa0MsQ0FBdEMsRUFBeUM7RUFDdkMyRywrQkFDRUEseUJBQXlCM0csTUFBekIsR0FBa0MsQ0FEcEMsRUFFRXZCLFlBRkYsQ0FFZSxhQUZmLEVBRThCLE9BRjlCOztFQUlBLFVBQUlxSSxxQkFBcUJmLG1CQUFyQixDQUFKLEVBQStDO0VBQzdDO0VBQ0F3QixvQkFBWXhCLG1CQUFaO0VBQ0QsT0FIRCxNQUdPO0VBQ0w7RUFDQTBCLG9CQUFZMUIsbUJBQVo7RUFDRDtFQUNGO0VBQ0Y7O0VBRUQ7RUFDQSxXQUFTMkIsZ0JBQVQsQ0FBMEJ6SSxDQUExQixFQUE2QjhHLG1CQUE3QixFQUFrRDtFQUNoRDlHLE1BQUVhLGNBQUY7RUFDQTtFQUNBLFFBQU1xSCxxQkFBcUI1SixTQUFTa0ksZUFBVCxFQUEwQk0sbUJBQTFCLENBQTNCO0VBQ0FvQix1QkFBbUI5RyxPQUFuQixDQUEyQiw2QkFBcUI7RUFDOUNpSCx3QkFBa0I3SSxZQUFsQixDQUErQixhQUEvQixFQUE4QyxPQUE5QztFQUNELEtBRkQ7O0VBSUE7RUFDQSxRQUFNSixTQUFTWSxFQUFFQyxhQUFqQjtFQUNBYixXQUFPc0osYUFBUCxDQUFxQmxKLFlBQXJCLENBQWtDLGFBQWxDLEVBQWlELE1BQWpEO0VBQ0Q7O0VBRUQsV0FBU21KLFdBQVQsQ0FBcUI3QixtQkFBckIsRUFBMEM7RUFDeEM7RUFDQSxRQUFJZSxxQkFBcUJmLG1CQUFyQixDQUFKLEVBQStDO0VBQzdDd0Isa0JBQVl4QixtQkFBWjtFQUNELEtBRkQsTUFFTztFQUNMMEIsa0JBQVkxQixtQkFBWjtFQUNEO0VBQ0RXLG1CQUFlWCxtQkFBZjtFQUNEOztFQUVEO0VBQ0EsTUFBTThCLHVCQUF1QnRLLFNBQVNnSSxrQkFBVCxDQUE3Qjs7RUFFQTtFQUNBLFdBQVN1QyxvQkFBVCxDQUE4Qi9CLG1CQUE5QixFQUFtRDtFQUNqRCxRQUFNZ0MsVUFBVXhLLFNBQVNpSSxvQkFBVCxFQUErQk8sbUJBQS9CLENBQWhCOztFQUVBO0VBQ0FnQyxZQUFRMUgsT0FBUixDQUFnQixrQkFBVTtFQUN4QjJILGFBQU96SCxnQkFBUCxDQUF3QixPQUF4QixFQUFpQztFQUFBLGVBQy9CbUgsaUJBQWlCekksQ0FBakIsRUFBb0I4RyxtQkFBcEIsQ0FEK0I7RUFBQSxPQUFqQztFQUdELEtBSkQ7O0VBTUE7RUFDQS9ILFdBQU91QyxnQkFBUCxDQUNFLFFBREYsRUFFRWlDLGdCQUNFLFlBQU07RUFDSnFGLDJCQUFxQnhILE9BQXJCLENBQTZCdUgsV0FBN0I7RUFDRCxLQUhILEVBSUUsR0FKRixFQUtFLEVBQUU5RSxTQUFTLEdBQVgsRUFMRixDQUZGO0VBVUQ7O0VBRUQ7RUFDQSxXQUFTbUYsc0JBQVQsQ0FBZ0NsQyxtQkFBaEMsRUFBcUQ7RUFDbkQsUUFBTWdDLFVBQVV4SyxTQUFTaUksb0JBQVQsRUFBK0JPLG1CQUEvQixDQUFoQjtFQUNBO0VBQ0FnQyxZQUFRMUgsT0FBUixDQUFnQixrQkFBVTtFQUN4QjJILGFBQU92SCxtQkFBUCxDQUEyQixPQUEzQixFQUFvQztFQUFBLGVBQ2xDaUgsaUJBQWlCekksQ0FBakIsRUFBb0I4RyxtQkFBcEIsQ0FEa0M7RUFBQSxPQUFwQztFQUdELEtBSkQ7O0VBTUE7RUFDQS9ILFdBQU95QyxtQkFBUCxDQUNFLFFBREYsRUFFRStCLGdCQUNFLFlBQU07RUFDSnFGLDJCQUFxQnhILE9BQXJCLENBQTZCdUgsV0FBN0I7RUFDRCxLQUhILEVBSUUsR0FKRixFQUtFLEVBQUU5RSxTQUFTLEdBQVgsRUFMRixDQUZGO0VBVUQ7O0VBRUQ7RUFDQSxXQUFTcEMsT0FBVCxHQUFtQjtFQUNqQixRQUFJbUgscUJBQXFCN0gsTUFBekIsRUFBaUM7RUFDL0I2SCwyQkFBcUJ4SCxPQUFyQixDQUE2QiwrQkFBdUI7RUFDbEQ0SCwrQkFBdUJsQyxtQkFBdkI7RUFDRCxPQUZEO0VBR0Q7RUFDRjs7RUFFRDtFQUNBLFdBQVNwRixJQUFULEdBQWdCO0VBQ2QsUUFBSWtILHFCQUFxQjdILE1BQXpCLEVBQWlDO0VBQy9CNkgsMkJBQXFCeEgsT0FBckIsQ0FBNkIsK0JBQXVCO0VBQ2xEeUYscUJBQWFDLG1CQUFiO0VBQ0ErQiw2QkFBcUIvQixtQkFBckI7O0VBRUE7RUFDQTZCLG9CQUFZN0IsbUJBQVo7RUFDRCxPQU5EO0VBT0Q7RUFDRjs7RUFFRHBGOztFQUVBO0VBQ0EsU0FBTztFQUNMQSxjQURLO0VBRUxEO0VBRkssR0FBUDtFQUlELENBOU5NOztFQ0hQOzs7QUFHQSxNQUFhd0gsWUFBWSxTQUFaQSxTQUFZLEdBQXNEO0VBQUEsaUZBQVAsRUFBTztFQUFBLDZCQUFuREMsVUFBbUQ7RUFBQSxNQUF2Q0EsVUFBdUMsbUNBQTFCLGNBQTBCOztFQUM3RTtFQUNBLE1BQUksRUFBRSxtQkFBbUJ6SyxRQUFyQixLQUFrQyxFQUFFLHNCQUFzQk0sTUFBeEIsQ0FBdEMsRUFBdUU7RUFDckUsV0FBTyxJQUFQO0VBQ0Q7O0VBRUQ7RUFDQSxNQUFJb0ssZUFBZSxDQUFuQjtFQUNBLE1BQU1DLFdBQVczSyxTQUFTYSxjQUFULENBQXdCNEosVUFBeEIsQ0FBakI7RUFDQSxNQUFNRyxTQUFTL0ssU0FBUyxxQkFBVCxFQUFnQzhLLFFBQWhDLENBQWY7RUFDQSxNQUFNRSxPQUFPRixTQUFTRyxhQUFULENBQXVCLHFCQUF2QixDQUFiOztFQUVBLFdBQVNDLGdCQUFULEdBQTRCO0VBQzFCLFdBQU9KLFNBQVNHLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDRSxXQUFyRDtFQUNEOztFQUVELFdBQVNDLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXNCO0VBQ3BCTixXQUFPRixZQUFQLEVBQXFCbEssU0FBckIsQ0FBK0IySyxNQUEvQixDQUFzQyw2QkFBdEM7RUFDQVQsbUJBQWUsQ0FBQ1EsSUFBSU4sT0FBT3RJLE1BQVosSUFBc0JzSSxPQUFPdEksTUFBNUM7RUFDQXNJLFdBQU9GLFlBQVAsRUFBcUJsSyxTQUFyQixDQUErQmlJLEdBQS9CLENBQW1DLDZCQUFuQztFQUNEOztFQUVELFdBQVMyQyxTQUFULEdBQXFCO0VBQ25CLFFBQU1DLFlBQVlOLGtCQUFsQjtFQUNBLFFBQU1PLHNCQUFvQixDQUFDWixZQUFELEdBQWdCVyxTQUFwQyxjQUFOOztFQUVBUixTQUFLVSxLQUFMLENBQVdDLFlBQVgsR0FBMEJGLEVBQTFCLENBSm1CO0VBS25CVCxTQUFLVSxLQUFMLENBQVdFLFdBQVgsR0FBeUJILEVBQXpCLENBTG1CO0VBTW5CVCxTQUFLVSxLQUFMLENBQVdHLFVBQVgsR0FBd0JKLEVBQXhCLENBTm1CO0VBT25CVCxTQUFLVSxLQUFMLENBQVdJLGVBQVgsR0FBNkJMLEVBQTdCLENBUG1CO0VBUW5CVCxTQUFLVSxLQUFMLENBQVdLLFNBQVgsR0FBdUJOLEVBQXZCO0VBQ0Q7O0VBRUQsV0FBU08sb0JBQVQsR0FBZ0M7RUFDOUJsQixhQUFTRyxhQUFULENBQ0UsMkJBREYsRUFFRWdCLFdBRkYsR0FFbUJwQixlQUFlLENBRmxDLFdBRXlDRSxPQUFPdEksTUFGaEQ7RUFHRDs7RUFFRCxXQUFTeUosb0JBQVQsR0FBZ0M7RUFDOUI7RUFDQSxRQUFNQyxZQUFZbk0sU0FBUyxjQUFULENBQWxCO0VBQ0E7RUFDQSxRQUFJbU0sU0FBSixFQUFlO0VBQ2I7RUFDQUEsZ0JBQVVySixPQUFWLENBQWtCO0VBQUEsZUFBU3NKLEtBQUtWLEtBQUwsQ0FBV1csT0FBWCxHQUFxQixNQUE5QjtFQUFBLE9BQWxCO0VBQ0Q7O0VBRUR2QixhQUFTRyxhQUFULG1CQUF1Q0osWUFBdkMsU0FBeURhLEtBQXpELENBQStEVyxPQUEvRCxHQUNFLE9BREY7RUFFRDs7RUFFRCxXQUFTQyxhQUFULEdBQXlCO0VBQ3ZCbEIsY0FBVVAsZUFBZSxDQUF6QjtFQUNBVTtFQUNBUztFQUNBRTtFQUNEOztFQUVELFdBQVNLLFNBQVQsR0FBcUI7RUFDbkJuQixjQUFVUCxlQUFlLENBQXpCO0VBQ0FVO0VBQ0FTO0VBQ0FFO0VBQ0Q7O0VBRUQ7RUFDQSxXQUFTTSxtQkFBVCxHQUErQjtFQUM3QixRQUFNQyxjQUFjdE0sU0FBU3dJLGFBQVQsQ0FBdUIsSUFBdkIsQ0FBcEI7O0VBRUE4RCxnQkFBWUMsU0FBWixHQUF3QiwyQ0FBeEI7O0VBRUFELGdCQUFZNUQsU0FBWjs7RUFZQTRELGdCQUNHeEIsYUFESCxDQUVJLGlDQUZKLEVBR0kseUJBSEosRUFLR2pJLGdCQUxILENBS29CLE9BTHBCLEVBSzZCc0osYUFMN0I7O0VBT0FHLGdCQUNHeEIsYUFESCxDQUNpQiw2QkFEakIsRUFDZ0QseUJBRGhELEVBRUdqSSxnQkFGSCxDQUVvQixPQUZwQixFQUU2QnVKLFNBRjdCOztFQUlBekIsYUFDR0csYUFESCxDQUNpQiw2QkFEakIsRUFFR2xDLFdBRkgsQ0FFZTBELFdBRmY7RUFHRDs7RUFFRCxXQUFTRSxzQkFBVCxHQUFrQztFQUNoQyxRQUFNQyxXQUFXOUIsU0FBU0csYUFBVCxDQUF1Qix5QkFBdkIsQ0FBakI7RUFDQUgsYUFBU0csYUFBVCxDQUF1Qiw2QkFBdkIsRUFBc0Q0QixXQUF0RCxDQUFrRUQsUUFBbEU7RUFDRDs7RUFFRCxXQUFTRSxhQUFULEdBQXlCO0VBQ3ZCLFFBQU1DLGFBQWE1TSxTQUFTd0ksYUFBVCxDQUF1QixLQUF2QixDQUFuQjtFQUNBb0UsZUFBVzdMLFlBQVgsQ0FBd0IsV0FBeEIsRUFBcUMsUUFBckM7RUFDQTZMLGVBQVc3TCxZQUFYLENBQXdCLGFBQXhCLEVBQXVDLE1BQXZDO0VBQ0E2TCxlQUFXcE0sU0FBWCxDQUFxQmlJLEdBQXJCLENBQXlCLDBCQUF6QjtFQUNBa0MsYUFDR0csYUFESCxDQUNpQiw0QkFEakIsRUFFR2xDLFdBRkgsQ0FFZWdFLFVBRmY7RUFHRDs7RUFFRCxXQUFTQyxnQkFBVCxHQUE0QjtFQUMxQixRQUFNRCxhQUFhakMsU0FBU0csYUFBVCxDQUF1QiwyQkFBdkIsQ0FBbkI7RUFDQUgsYUFDR0csYUFESCxDQUNpQiw0QkFEakIsRUFFRzRCLFdBRkgsQ0FFZUUsVUFGZjtFQUdEOztFQUVELE1BQU1FLGFBQWEsU0FBYkEsVUFBYTtFQUFBLFdBQ2pCaEksZ0JBQ0UsWUFBTTtFQUNKc0c7RUFDRCxLQUhILEVBSUUsR0FKRixFQUtFLEVBQUVoRyxTQUFTLEdBQVgsRUFMRixHQURpQjtFQUFBLEdBQW5COztFQVNBO0VBQ0EsV0FBU25DLElBQVQsR0FBZ0I7RUFDZG9KO0VBQ0FNO0VBQ0ExQixjQUFVLENBQVY7RUFDQVk7RUFDQUU7O0VBRUE7RUFDQXpMLFdBQU91QyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQ2lLLFVBQWxDO0VBQ0Q7O0VBRUQ7RUFDQSxXQUFTOUosT0FBVCxHQUFtQjtFQUNqQndKO0VBQ0FLO0VBQ0F2TSxXQUFPeUMsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMrSixVQUFyQztFQUNEOztFQUVEN0o7O0VBRUE7RUFDQSxTQUFPO0VBQ0xBLGNBREs7RUFFTEQ7RUFGSyxHQUFQO0VBSUQsQ0E3Sk07O0VDTlA7Ozs7RUFNQSxJQUFNK0osc0JBQXNCLFNBQXRCQSxtQkFBc0IsQ0FDMUJDLGFBRDBCLEVBRTFCQyxNQUYwQixFQVF2QjtFQUFBLGlGQURDLEVBQ0Q7RUFBQSxnQ0FKREMsYUFJQztFQUFBLE1BSkRBLGFBSUMsc0NBSmUsbUNBSWY7RUFBQSxtQ0FIREMsc0JBR0M7RUFBQSxNQUhEQSxzQkFHQyx5Q0FId0Isb0NBR3hCO0VBQUEsMEJBRkRwTixPQUVDO0VBQUEsTUFGREEsT0FFQyxnQ0FGU0MsUUFFVDs7RUFDSCxNQUFJLENBQUNnTixhQUFMLEVBQW9CO0VBQ2xCO0VBQ0Q7O0VBRUQsTUFBTUksaUJBQWlCdk4sU0FBU3NOLHNCQUFULEVBQWlDcE4sT0FBakMsQ0FBdkI7O0VBRUE7RUFDQXFOLGlCQUFlekssT0FBZixDQUF1QixtQkFBVztFQUNoQzBLLFlBQVE3TSxTQUFSLENBQWtCMkssTUFBbEIsQ0FBeUIrQixhQUF6QjtFQUNELEdBRkQ7O0VBSUE7RUFDQUQsU0FBT2xMLFVBQVAsQ0FBa0IySyxXQUFsQixDQUE4Qk8sTUFBOUI7RUFDRCxDQXRCRDs7RUF3QkE7QUFDQSxNQUFhSyxpQkFBaUIsU0FBakJBLGNBQWlCLEdBTW5CO0VBQUEsa0ZBQVAsRUFBTztFQUFBLDZCQUxUeE4sUUFLUztFQUFBLE1BTFRBLFFBS1Msa0NBTEUsa0JBS0Y7RUFBQSxtQ0FKVHlOLGNBSVM7RUFBQSxNQUpUQSxjQUlTLHdDQUpRLHdCQUlSO0VBQUEsb0NBSFRKLHNCQUdTO0VBQUEsTUFIVEEsc0JBR1MseUNBSGdCLG9DQUdoQjtFQUFBLGtDQUZURCxhQUVTO0VBQUEsTUFGVEEsYUFFUyx1Q0FGTyxtQ0FFUDtFQUFBLDRCQURUbk4sT0FDUztFQUFBLE1BRFRBLE9BQ1MsaUNBRENDLFFBQ0Q7O0VBQ1QsTUFBTXdOLGFBQWEzTixTQUFTQyxRQUFULEVBQW1CQyxPQUFuQixDQUFuQjs7RUFFQXlOLGFBQVc3SyxPQUFYLENBQW1CLGdCQUFRO0VBQ3pCLFFBQU1zSyxTQUFTbE4sUUFBUStLLGFBQVIsQ0FBc0J5QyxjQUF0QixDQUFmOztFQUVBLFFBQUlOLE1BQUosRUFBWTtFQUNWQSxhQUFPcEssZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUM7RUFBQSxlQUMvQmtLLG9CQUFvQlUsSUFBcEIsRUFBMEJSLE1BQTFCLEVBQWtDO0VBQ2hDQyxzQ0FEZ0M7RUFFaENDO0VBRmdDLFNBQWxDLENBRCtCO0VBQUEsT0FBakM7RUFNRDtFQUNGLEdBWEQ7RUFZRCxDQXJCTTs7RUMvQlA7Ozs7Ozs7Ozs7O0VBV0EsU0FBU08sUUFBVCxDQUFrQkQsSUFBbEIsRUFBd0JsRyxLQUF4QixFQUErQjtFQUM3QjtFQUNBLFNBQU9rRyxTQUFTbEcsS0FBVCxJQUFrQixDQUFDLEVBQUVrRyxLQUFLRSx1QkFBTCxDQUE2QnBHLEtBQTdCLElBQXNDLEVBQXhDLENBQTFCO0VBQ0Q7O0FBRUQsTUFBYXFHLFdBQVcsU0FBWEEsUUFBVyxXQUFZO0VBQ2xDLE1BQU1DLGlCQUFpQkMsTUFBTTFKLFNBQU4sQ0FBZ0JuRSxLQUFoQixDQUFzQkMsSUFBdEIsQ0FDckJGLFNBQVNHLGdCQUFULENBQTBCTCxRQUExQixDQURxQixDQUF2Qjs7RUFJQUUsV0FBUzZDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLGlCQUFTO0VBQzFDZ0wsbUJBQWVsTCxPQUFmLENBQXVCLDZCQUFxQjtFQUMxQyxVQUFNb0wsV0FBV0wsU0FBU00saUJBQVQsRUFBNEJDLE1BQU10TixNQUFsQyxDQUFqQjs7RUFFQSxVQUFJLENBQUNvTixRQUFMLEVBQWU7RUFDYixZQUFNRyxpQkFBaUJsTyxTQUFTOEssYUFBVCxDQUNsQmhMLFFBRGtCLDZCQUF2QjtFQUdBLFlBQU1xTyxlQUFlbk8sU0FBUzhLLGFBQVQsQ0FDaEJoTCxRQURnQiw0QkFBckI7RUFHQTtFQUNBLFlBQUlxTyxZQUFKLEVBQWtCO0VBQ2hCRCx5QkFBZW5OLFlBQWYsQ0FBNEIsZUFBNUIsRUFBNkMsS0FBN0M7RUFDQW9OLHVCQUFhcE4sWUFBYixDQUEwQixhQUExQixFQUF5QyxJQUF6QztFQUNEO0VBQ0Y7RUFDRixLQWhCRDtFQWlCRCxHQWxCRDtFQW1CRCxDQXhCTTs7RUNkUDs7Ozs7Ozs7Ozs7O0FBWUEsTUFBYXFOLFVBQVUsU0FBVkEsT0FBVSxHQUlaO0VBQUEsaUZBQVAsRUFBTztFQUFBLG1DQUhUQyx1QkFHUztFQUFBLE1BSGdCQSx1QkFHaEIseUNBSDBDLG1CQUcxQztFQUFBLGlDQUZUQyxjQUVTO0VBQUEsTUFGT0EsY0FFUCx1Q0FGd0IsWUFFeEI7RUFBQSxrQ0FEVEMsZUFDUztFQUFBLE1BRFFBLGVBQ1Isd0NBRDBCLGFBQzFCOztFQUNUO0VBQ0EsTUFBSSxFQUFFLG1CQUFtQnZPLFFBQXJCLEtBQWtDLEVBQUUsc0JBQXNCTSxNQUF4QixDQUF0QyxFQUF1RTtFQUNyRSxXQUFPLElBQVA7RUFDRDs7RUFFRDtFQUNBLE1BQU1rTyxrQkFBa0IzTyxTQUFTd08sdUJBQVQsQ0FBeEI7RUFDQSxNQUFNSSxlQUFlek8sU0FBU2EsY0FBVCxDQUF3QnlOLGNBQXhCLENBQXJCO0VBQ0EsTUFBSUksZ0JBQWdCMU8sU0FBU2EsY0FBVCxDQUF3QjBOLGVBQXhCLENBQXBCOztFQUVBO0VBQ0EsTUFBSSxDQUFDRyxhQUFMLEVBQW9CO0VBQ2xCLFFBQU1yQixVQUFVck4sU0FBU3dJLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7RUFDQTZFLFlBQVF0TSxZQUFSLENBQXFCLElBQXJCLEVBQTJCLGFBQTNCO0VBQ0FzTSxZQUFRdE0sWUFBUixDQUFxQixPQUFyQixFQUE4QixxQkFBOUI7RUFDQXNNLFlBQVF0TSxZQUFSLENBQXFCLGFBQXJCLEVBQW9DLE1BQXBDO0VBQ0FmLGFBQVMyTyxJQUFULENBQWMvRixXQUFkLENBQTBCeUUsT0FBMUI7RUFDQXFCLG9CQUFnQnJCLE9BQWhCO0VBQ0Q7O0VBRUQ7RUFDQSxNQUFNdUIsb0JBQW9CLEdBQUczTyxLQUFILENBQVNDLElBQVQsQ0FDeEJMLHlOQVVFNE8sWUFWRixDQUR3QixDQUExQjs7RUFlQTtFQUNBLE1BQUlJLHNCQUFzQixJQUExQjs7RUFFQTtFQUNBLE1BQU1DLHdCQUF3QkYsa0JBQWtCLENBQWxCLENBQTlCO0VBQ0EsTUFBTUcsdUJBQXVCSCxrQkFBa0JBLGtCQUFrQnRNLE1BQWxCLEdBQTJCLENBQTdDLENBQTdCOztFQUVBO0VBQ0E7RUFDQSxXQUFTME0sS0FBVCxDQUFlZixLQUFmLEVBQXNCO0VBQ3BCQSxVQUFNN0wsY0FBTjtFQUNBcU0saUJBQWExTixZQUFiLENBQTBCLGFBQTFCLEVBQXlDLElBQXpDO0VBQ0EyTixrQkFBYzNOLFlBQWQsQ0FBMkIsYUFBM0IsRUFBMEMsSUFBMUM7O0VBRUEsUUFBSThOLG1CQUFKLEVBQXlCO0VBQ3ZCQSwwQkFBb0J4TixLQUFwQjtFQUNEOztFQUVEckIsYUFBUzhLLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0J0SyxTQUEvQixDQUF5QzJLLE1BQXpDLENBQWdELHFCQUFoRDtFQUNEOztFQUVEO0VBQ0EsV0FBUzhELGFBQVQsQ0FBdUIxTixDQUF2QixFQUEwQjtFQUN4QixRQUFNMk4sVUFBVSxDQUFoQjtFQUNBLFFBQU1DLFVBQVUsRUFBaEI7O0VBRUEsYUFBU0MsaUJBQVQsR0FBNkI7RUFDM0IsVUFBSXBQLFNBQVNxUCxhQUFULEtBQTJCUCxxQkFBL0IsRUFBc0Q7RUFDcER2TixVQUFFYSxjQUFGO0VBQ0EyTSw2QkFBcUIxTixLQUFyQjtFQUNEO0VBQ0Y7O0VBRUQsYUFBU2lPLGdCQUFULEdBQTRCO0VBQzFCLFVBQUl0UCxTQUFTcVAsYUFBVCxLQUEyQk4sb0JBQS9CLEVBQXFEO0VBQ25EeE4sVUFBRWEsY0FBRjtFQUNBME0sOEJBQXNCek4sS0FBdEI7RUFDRDtFQUNGOztFQUVELFlBQVFFLEVBQUVZLE9BQVY7RUFDRTtFQUNBLFdBQUsrTSxPQUFMO0VBQ0UsWUFBSU4sa0JBQWtCdE0sTUFBbEIsS0FBNkIsQ0FBakMsRUFBb0M7RUFDbENmLFlBQUVhLGNBQUY7RUFDQTtFQUNEO0VBQ0QsWUFBSWIsRUFBRWdPLFFBQU4sRUFBZ0I7RUFDZEg7RUFDRCxTQUZELE1BRU87RUFDTEU7RUFDRDtFQUNEO0VBQ0YsV0FBS0gsT0FBTDtFQUNFSDtFQUNBO0VBQ0Y7RUFDRTtFQWpCSjtFQW1CRDs7RUFFRDtFQUNBLFdBQVNRLElBQVQsQ0FBY3ZCLEtBQWQsRUFBcUI7RUFDbkJBLFVBQU03TCxjQUFOO0VBQ0FxTSxpQkFBYTFOLFlBQWIsQ0FBMEIsYUFBMUIsRUFBeUMsS0FBekM7RUFDQTJOLGtCQUFjM04sWUFBZCxDQUEyQixhQUEzQixFQUEwQyxLQUExQzs7RUFFQTtFQUNBO0VBQ0E4TiwwQkFBc0I3TyxTQUFTcVAsYUFBL0I7O0VBRUE7RUFDQVAsMEJBQXNCek4sS0FBdEI7O0VBRUE7RUFDQXFOLGtCQUFjN0wsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0NtTSxLQUF4Qzs7RUFFQTtFQUNBUCxpQkFBYTVMLGdCQUFiLENBQThCLFNBQTlCLEVBQXlDb00sYUFBekM7O0VBRUFqUCxhQUFTOEssYUFBVCxDQUF1QixNQUF2QixFQUErQnRLLFNBQS9CLENBQXlDaUksR0FBekMsQ0FBNkMscUJBQTdDO0VBQ0Q7O0VBRUQ7RUFDQSxXQUFTZ0gsZ0JBQVQsQ0FBMEJDLFFBQTFCLEVBQW9DO0VBQ2xDQSxhQUFTL00sT0FBVCxDQUFpQjtFQUFBLGFBQVcwSyxRQUFReEssZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MyTSxJQUFsQyxDQUFYO0VBQUEsS0FBakI7O0VBRUE7RUFDQTNQLGFBQVMsc0JBQVQsRUFBaUM4QyxPQUFqQyxDQUF5QyxrQkFBVTtFQUNqRHNLLGFBQU9wSyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQ21NLEtBQWpDO0VBQ0QsS0FGRDtFQUdEOztFQUVEO0VBQ0EsV0FBU1csa0JBQVQsQ0FBNEJELFFBQTVCLEVBQXNDO0VBQ3BDQSxhQUFTL00sT0FBVCxDQUFpQjtFQUFBLGFBQVcwSyxRQUFRdEssbUJBQVIsQ0FBNEIsT0FBNUIsRUFBcUN5TSxJQUFyQyxDQUFYO0VBQUEsS0FBakI7O0VBRUE7RUFDQTNQLGFBQVMsc0JBQVQsRUFBaUM4QyxPQUFqQyxDQUF5QyxrQkFBVTtFQUNqRHNLLGFBQU9sSyxtQkFBUCxDQUEyQixPQUEzQixFQUFvQ2lNLEtBQXBDO0VBQ0QsS0FGRDtFQUdEOztFQUVEO0VBQ0EsV0FBU2hNLE9BQVQsR0FBbUI7RUFDakIyTSx1QkFBbUJuQixlQUFuQjtFQUNEOztFQUVEO0VBQ0EsV0FBU3ZMLElBQVQsR0FBZ0I7RUFDZCxRQUFJdUwsZ0JBQWdCbE0sTUFBcEIsRUFBNEI7RUFDMUJtTix1QkFBaUJqQixlQUFqQjtFQUNEO0VBQ0Y7O0VBRUR2TDs7RUFFQTtFQUNBLFNBQU87RUFDTEEsY0FESztFQUVMRDtFQUZLLEdBQVA7RUFJRCxDQW5LTTs7RUNkUDs7QUFFQSxNQUFhNE0sbUJBQW1CLFNBQW5CQSxnQkFBbUIsQ0FDOUJDLGFBRDhCLEVBUTNCO0VBQUEsaUZBREMsRUFDRDtFQUFBLDBCQUxEOVAsT0FLQztFQUFBLE1BTERBLE9BS0MsZ0NBTFNDLFFBS1Q7RUFBQSw2QkFKRDhQLFVBSUM7RUFBQSxNQUpEQSxVQUlDLG1DQUpZLEtBSVo7RUFBQSxnQ0FIREMsYUFHQztFQUFBLE1BSERBLGFBR0Msc0NBSGUsS0FHZjtFQUFBLG1DQUZEQyxnQkFFQztFQUFBLE1BRkRBLGdCQUVDLHlDQUZrQixnQ0FFbEI7O0VBQ0gsTUFBSSxDQUFDSCxhQUFMLEVBQW9CO0VBQ2xCO0VBQ0Q7O0VBRUQ7RUFDQSxNQUFNbFAsU0FBU1gsU0FBU2EsY0FBVCxDQUNiZ1AsY0FBYy9PLFlBQWQsQ0FBMkIsZUFBM0IsQ0FEYSxDQUFmOztFQUlBO0VBQ0EsTUFBSSxDQUFDSCxNQUFMLEVBQWE7RUFDWDtFQUNEOztFQUVEO0VBQ0EsTUFBTXNQLGFBQ0pILGVBQWUsSUFBZixJQUNBRCxjQUFjL08sWUFBZCxDQUEyQixlQUEzQixNQUFnRCxNQUZsRDs7RUFJQTtFQUNBK08sZ0JBQWM5TyxZQUFkLENBQTJCLGVBQTNCLEVBQTRDLENBQUNrUCxVQUE3QztFQUNBdFAsU0FBT0ksWUFBUCxDQUFvQixhQUFwQixFQUFtQ2tQLFVBQW5DOztFQUVBO0VBQ0EsTUFBSSxDQUFDQSxVQUFELElBQWVKLGNBQWNLLFlBQWQsQ0FBMkIscUJBQTNCLENBQW5CLEVBQXNFO0VBQ3BFTCxrQkFBY25ILFNBQWQsR0FBMEJtSCxjQUFjL08sWUFBZCxDQUEyQixxQkFBM0IsQ0FBMUI7RUFDRCxHQUZELE1BRU8sSUFBSW1QLGNBQWNKLGNBQWNLLFlBQWQsQ0FBMkIsc0JBQTNCLENBQWxCLEVBQXNFO0VBQzNFTCxrQkFBY25ILFNBQWQsR0FBMEJtSCxjQUFjL08sWUFBZCxDQUN4QixzQkFEd0IsQ0FBMUI7RUFHRDs7RUFFRDtFQUNBLE1BQUlpUCxrQkFBa0IsSUFBdEIsRUFBNEI7RUFDMUIsUUFBTUksZ0JBQWdCckMsTUFBTTFKLFNBQU4sQ0FBZ0JuRSxLQUFoQixDQUNuQkMsSUFEbUIsQ0FDZEgsUUFBUUksZ0JBQVIsQ0FBeUI2UCxnQkFBekIsQ0FEYyxFQUVuQkksTUFGbUIsQ0FFWjtFQUFBLGFBQVdDLFlBQVlSLGFBQXZCO0VBQUEsS0FGWSxDQUF0Qjs7RUFJQU0sa0JBQWN4TixPQUFkLENBQXNCLG1CQUFXO0VBQy9CaU4sdUJBQWlCUyxPQUFqQixFQUEwQjtFQUN4QnRRLHdCQUR3QjtFQUV4QitQLG9CQUFZO0VBRlksT0FBMUI7RUFJRCxLQUxEO0VBTUQ7RUFDRixDQXRETTs7RUF3RFA7QUFDQSxNQUFhUSxrQkFBa0IsU0FBbEJBLGVBQWtCLENBQUN4USxRQUFELEVBQWtDO0VBQUEsTUFBdkJDLE9BQXVCLHVFQUFiQyxRQUFhOztFQUMvRDtFQUNBLE1BQUksQ0FBQ0YsUUFBTCxFQUFlOztFQUVmLE1BQU0wTixhQUFhTSxNQUFNMUosU0FBTixDQUFnQm5FLEtBQWhCLENBQXNCQyxJQUF0QixDQUNqQkgsUUFBUUksZ0JBQVIsQ0FBeUJMLFFBQXpCLENBRGlCLENBQW5COztFQUlBME4sYUFBVzdLLE9BQVgsQ0FBbUI7RUFBQSxXQUNqQjhLLEtBQUs1SyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixhQUFLO0VBQ2xDK00sdUJBQWlCbkMsSUFBakIsRUFBdUIsRUFBRTFOLGdCQUFGLEVBQXZCO0VBQ0F3QixRQUFFYSxjQUFGO0VBQ0QsS0FIRCxDQURpQjtFQUFBLEdBQW5CO0VBTUQsQ0FkTTs7RUMzRFA7Ozs7RUFNQTs7O0FBR0EsTUFBYW1PLGNBQWMsU0FBZEEsV0FBYyxHQUtoQjtFQUFBLGlGQUFQLEVBQU87RUFBQSwyQkFKVHpRLFFBSVM7RUFBQSxNQUpDQSxRQUlELGlDQUpZLGtCQUlaO0VBQUEsZ0NBSFQwUSxhQUdTO0VBQUEsTUFITUEsYUFHTixzQ0FIc0IseUJBR3RCO0VBQUEsZ0NBRlRDLGFBRVM7RUFBQSxNQUZNQSxhQUVOLHNDQUZzQix5QkFFdEI7RUFBQSxpQ0FEVEMsY0FDUztFQUFBLE1BRE9BLGNBQ1AsdUNBRHdCLDBCQUN4Qjs7RUFDVDtFQUNBLE1BQ0UsRUFBRSxtQkFBbUIxUSxRQUFyQixLQUNBLEVBQUUsc0JBQXNCTSxNQUF4QixDQURBLElBRUEsQ0FBQ04sU0FBU08sZUFBVCxDQUF5QkMsU0FINUIsRUFLRSxPQUFPLElBQVA7O0VBRUY7RUFDQTtFQUNBLE1BQU1tUSx1QkFBdUI5USxTQUFTQyxRQUFULENBQTdCOztFQUVBO0VBQ0EsV0FBUzhRLGNBQVQsQ0FBd0J2RCxPQUF4QixFQUFpQ3dELEtBQWpDLEVBQXdDO0VBQ3RDLFFBQUlBLE1BQU12TyxNQUFOLEtBQWlCLENBQXJCLEVBQXdCOztFQUV4QixRQUFJd08sV0FBVyxFQUFmOztFQUVBLFNBQUssSUFBSTFQLElBQUksQ0FBYixFQUFnQkEsSUFBSXlQLE1BQU12TyxNQUExQixFQUFrQ2xCLEtBQUssQ0FBdkMsRUFBMEM7RUFDeEMsVUFBTTJQLE9BQU9GLE1BQU16UCxDQUFOLENBQWI7RUFDQSxVQUFJLFVBQVUyUCxJQUFkLEVBQW9CO0VBQ2xCLFlBQUkzUCxJQUFJLENBQVIsRUFBVztFQUNUMFAsc0JBQVksSUFBWjtFQUNEO0VBQ0RBLG9CQUFZQyxLQUFLQyxJQUFqQjtFQUNEO0VBQ0Y7O0VBRUQ7RUFDQSxRQUFNQyxpQkFBaUI1RCxPQUF2QjtFQUNBNEQsbUJBQWV2SSxTQUFmLEdBQTJCb0ksUUFBM0I7RUFDRDs7RUFFRDtFQUNBLFdBQVNJLGdCQUFULENBQTBCM1AsQ0FBMUIsRUFBNkI7RUFDM0IsUUFBSSxXQUFXQSxFQUFFWixNQUFqQixFQUF5QjtFQUN2QixVQUFNd1EscUJBQXFCdFIsU0FBUzRRLGFBQVQsRUFBd0JsUCxFQUFFWixNQUFGLENBQVNvQixVQUFqQyxDQUEzQjs7RUFFQW9QLHlCQUFtQnhPLE9BQW5CLENBQTJCLDZCQUFxQjtFQUM5Q2lPLHVCQUFlUSxpQkFBZixFQUFrQzdQLEVBQUVaLE1BQUYsQ0FBU2tRLEtBQTNDO0VBQ0QsT0FGRDtFQUdEO0VBQ0Y7O0VBRUQsV0FBU1Esa0JBQVQsQ0FBNEI5UCxDQUE1QixFQUErQjtFQUM3QjtFQUNBLFFBQU1JLGdCQUFnQkosRUFBRUssT0FBRixJQUFhTCxFQUFFTSxNQUFyQzs7RUFFQSxRQUFNeVAsZ0JBQWdCelIsU0FBUzJRLGFBQVQsRUFBd0JqUCxFQUFFWixNQUFGLENBQVNvQixVQUFqQyxDQUF0Qjs7RUFFQXVQLGtCQUFjM08sT0FBZCxDQUFzQix3QkFBZ0I7RUFDcEM7RUFDQSxVQUFJaEIsYUFBSixFQUFtQjs7RUFFbkI7RUFDQTtFQUNBLGNBQVFKLEVBQUVZLE9BQVY7RUFDRSxhQUFLLEVBQUw7RUFDQSxhQUFLLEVBQUw7RUFDRVosWUFBRWEsY0FBRjtFQUNBbVAsdUJBQWFDLEtBQWI7RUFDQTtFQUNGO0VBQ0U7RUFQSjtFQVNELEtBZkQ7RUFnQkQ7O0VBRUQ7RUFDQSxXQUFTQyxvQkFBVCxDQUE4QkMsbUJBQTlCLEVBQW1EO0VBQ2pEO0VBQ0EsUUFBTUMsbUJBQW1COVIsU0FBUzJRLGFBQVQsRUFBd0JrQixtQkFBeEIsQ0FBekI7RUFDQUMscUJBQWlCaFAsT0FBakIsQ0FBeUIsMkJBQW1CO0VBQzFDaVAsc0JBQWdCL08sZ0JBQWhCLENBQWlDLFFBQWpDLEVBQTJDcU8sZ0JBQTNDO0VBQ0QsS0FGRDs7RUFJQTtFQUNBLFFBQU1XLG9CQUFvQmhTLFNBQVM2USxjQUFULEVBQXlCZ0IsbUJBQXpCLENBQTFCO0VBQ0FHLHNCQUFrQmxQLE9BQWxCLENBQTBCLDRCQUFvQjtFQUM1Q21QLHVCQUFpQmpQLGdCQUFqQixDQUFrQyxTQUFsQyxFQUE2Q3dPLGtCQUE3QztFQUNELEtBRkQ7RUFHRDs7RUFFRDtFQUNBLFdBQVNVLHNCQUFULENBQWdDTCxtQkFBaEMsRUFBcUQ7RUFDbkQsUUFBTUMsbUJBQW1COVIsU0FBUzJRLGFBQVQsRUFBd0JrQixtQkFBeEIsQ0FBekI7RUFDQTtFQUNBQyxxQkFBaUJoUCxPQUFqQixDQUF5QiwyQkFBbUI7RUFDMUNpUCxzQkFBZ0I3TyxtQkFBaEIsQ0FBb0MsUUFBcEMsRUFBOENtTyxnQkFBOUM7RUFDRCxLQUZEOztFQUlBLFFBQU1XLG9CQUFvQmhTLFNBQVM2USxjQUFULEVBQXlCZ0IsbUJBQXpCLENBQTFCO0VBQ0E7RUFDQUcsc0JBQWtCbFAsT0FBbEIsQ0FBMEIsNEJBQW9CO0VBQzVDbVAsdUJBQWlCL08sbUJBQWpCLENBQXFDLFNBQXJDLEVBQWdEc08sa0JBQWhEO0VBQ0QsS0FGRDtFQUdEOztFQUVEO0VBQ0EsV0FBU3JPLE9BQVQsR0FBbUI7RUFDakIyTix5QkFBcUJoTyxPQUFyQixDQUE2QiwrQkFBdUI7RUFDbERvUCw2QkFBdUJMLG1CQUF2QjtFQUNELEtBRkQ7RUFHRDs7RUFFRDtFQUNBLFdBQVN6TyxJQUFULEdBQWdCO0VBQ2QsUUFBSTBOLHFCQUFxQnJPLE1BQXpCLEVBQWlDO0VBQy9CcU8sMkJBQXFCaE8sT0FBckIsQ0FBNkIsK0JBQXVCO0VBQ2xEOE8sNkJBQXFCQyxtQkFBckI7RUFDRCxPQUZEO0VBR0Q7RUFDRjs7RUFFRHpPOztFQUVBO0VBQ0EsU0FBTztFQUNMQSxjQURLO0VBRUxEO0VBRkssR0FBUDtFQUlELENBL0hNOztNQ05NZ1AscUJBQXFCLFNBQXJCQSxrQkFBcUIsR0FNdkI7RUFBQSxpRkFBUCxFQUFPO0VBQUEsMkJBTFRsUyxRQUtTO0VBQUEsTUFMQ0EsUUFLRCxpQ0FMWSx1QkFLWjtFQUFBLDhCQUpUbVMsV0FJUztFQUFBLE1BSklBLFdBSUosb0NBSmtCLGdDQUlsQjtFQUFBLCtCQUhUQyxZQUdTO0VBQUEsTUFIS0EsWUFHTCxxQ0FIb0IsNkJBR3BCO0VBQUEsbUNBRlRDLGdCQUVTO0VBQUEsTUFGU0EsZ0JBRVQseUNBRjRCLGlDQUU1QjtFQUFBLG1DQURUQyxnQkFDUztFQUFBLE1BRFNBLGdCQUNULHlDQUQ0QmpNLFNBQzVCOztFQUNUO0VBQ0EsTUFDRSxFQUFFLG1CQUFtQm5HLFFBQXJCLEtBQ0EsRUFBRSxzQkFBc0JNLE1BQXhCLENBREEsSUFFQSxDQUFDTixTQUFTTyxlQUFULENBQXlCQyxTQUg1QixFQUtFLE9BQU8sSUFBUDs7RUFFRixNQUFNNlIsNEJBQTRCeFMsU0FBU0MsUUFBVCxDQUFsQzs7RUFFQSxXQUFTd1MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7RUFDbkIsUUFBSSxDQUFDQSxHQUFMLEVBQVUsT0FBTyxJQUFQOztFQUVWLFFBQU0xSCxPQUFPaEwsU0FBU3FTLFlBQVQsRUFBdUJLLEdBQXZCLEVBQTRCLENBQTVCLENBQWI7O0VBRUEsUUFBSSxDQUFDQSxJQUFJL1IsU0FBSixDQUFja04sUUFBZCxDQUF1QnVFLFdBQXZCLENBQUwsRUFBMEM7RUFDeEMsVUFBSXBILFFBQVFBLEtBQUsySCxVQUFMLEdBQWtCM0gsS0FBS0csV0FBdkIsR0FBcUN1SCxJQUFJdkgsV0FBckQsRUFBa0U7RUFDaEV1SCxZQUFJL1IsU0FBSixDQUFjaUksR0FBZCxDQUFrQndKLFdBQWxCO0VBQ0Q7RUFDRixLQUpELE1BSU87RUFDTCxVQUFNckUsV0FBVy9OLFNBQVNzUyxnQkFBVCxFQUEyQkksR0FBM0IsRUFBZ0MsQ0FBaEMsQ0FBakI7RUFDQSxVQUFJM0UsU0FBUzRFLFVBQVQsR0FBc0IzSCxLQUFLRyxXQUEzQixHQUF5Q3VILElBQUl2SCxXQUFqRCxFQUE4RDtFQUM1RHVILFlBQUkvUixTQUFKLENBQWMySyxNQUFkLENBQXFCOEcsV0FBckI7RUFDRDtFQUNGOztFQUVELFdBQU8sSUFBUDtFQUNEOztFQUVELFdBQVNoUCxJQUFULEdBQWdCO0VBQ2Q7RUFDQW9QLDhCQUEwQjFQLE9BQTFCLENBQWtDLGVBQU87RUFDdkMyUCxhQUFPQyxHQUFQOztFQUVBLFVBQUlILGdCQUFKLEVBQXNCO0VBQ3BCLFlBQU14RSxXQUFXL04sU0FBU3NTLGdCQUFULEVBQTJCSSxHQUEzQixFQUFnQyxDQUFoQyxDQUFqQjs7RUFFQSxZQUFJM0UsUUFBSixFQUFjO0VBQ1pBLG1CQUFTL0ssZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0N1UCxnQkFBcEM7RUFDRDtFQUNGO0VBQ0YsS0FWRDs7RUFZQTlSLFdBQU91QyxnQkFBUCxDQUNFLFFBREYsRUFFRWlDLGdCQUNFLFlBQU07RUFDSnVOLGdDQUEwQjFQLE9BQTFCLENBQWtDMlAsTUFBbEM7RUFDRCxLQUhILEVBSUUsR0FKRixFQUtFLEVBQUVsTixTQUFTLEdBQVgsRUFMRixDQUZGO0VBVUQ7O0VBRUQsU0FBT25DLE1BQVA7RUFDRCxDQS9ETTs7RUNIUDs7OztFQUlBO0VBQ0EsU0FBU3dQLGNBQVQsQ0FBd0JDLE9BQXhCLEVBQWlDO0VBQy9CLE1BQUlBLFdBQVdBLFFBQVEzUSxVQUFSLEtBQXVCLElBQXRDLEVBQTRDO0VBQzFDMlEsWUFBUTNRLFVBQVIsQ0FBbUIySyxXQUFuQixDQUErQmdHLE9BQS9CO0VBQ0Q7RUFDRjs7RUFFRDtBQUNBLEVBQU8sU0FBU0MsWUFBVCxHQUF3QjtFQUM3QixNQUFNQyxnQkFBZ0Isc0JBQXRCOztFQUVBLE1BQU1DLFdBQVcvRSxNQUFNMUosU0FBTixDQUFnQm5FLEtBQWhCLENBQXNCQyxJQUF0QixDQUNmRixTQUFTOFMsc0JBQVQsQ0FBZ0NGLGFBQWhDLENBRGUsQ0FBakI7O0VBSUFDLFdBQVNsUSxPQUFULENBQWlCO0VBQUEsV0FDZitQLFFBQVE3UCxnQkFBUixDQUF5QixPQUF6QixFQUFrQztFQUFBLGFBQ2hDNFAsZUFBZUMsUUFBUXpJLGFBQXZCLENBRGdDO0VBQUEsS0FBbEMsQ0FEZTtFQUFBLEdBQWpCO0VBS0Q7O0VDeEJEOzs7OztBQ0FBLEVBTUMsQ0FBQyxVQUFTM0osTUFBVCxFQUFpQk4sUUFBakIsRUFBMkI7QUFDekI7Ozs7Ozs7RUFRQSxZQUFJK1MsZUFBZSxZQUFZO0VBQUUscUJBQVNDLGdCQUFULENBQTBCclMsTUFBMUIsRUFBa0NzUyxLQUFsQyxFQUF5QztFQUFFLHFCQUFLLElBQUk3UixJQUFJLENBQWIsRUFBZ0JBLElBQUk2UixNQUFNM1EsTUFBMUIsRUFBa0NsQixHQUFsQyxFQUF1QztFQUFFLHdCQUFJOFIsYUFBYUQsTUFBTTdSLENBQU4sQ0FBakIsQ0FBMkI4UixXQUFXQyxVQUFYLEdBQXdCRCxXQUFXQyxVQUFYLElBQXlCLEtBQWpELENBQXdERCxXQUFXRSxZQUFYLEdBQTBCLElBQTFCLENBQWdDLElBQUksV0FBV0YsVUFBZixFQUEyQkEsV0FBV0csUUFBWCxHQUFzQixJQUF0QixDQUE0QnZQLE9BQU93UCxjQUFQLENBQXNCM1MsTUFBdEIsRUFBOEJ1UyxXQUFXSyxHQUF6QyxFQUE4Q0wsVUFBOUM7RUFBNEQ7RUFBRSxhQUFDLE9BQU8sVUFBVU0sV0FBVixFQUF1QkMsVUFBdkIsRUFBbUNDLFdBQW5DLEVBQWdEO0VBQUUsb0JBQUlELFVBQUosRUFBZ0JULGlCQUFpQlEsWUFBWXBQLFNBQTdCLEVBQXdDcVAsVUFBeEMsRUFBcUQsSUFBSUMsV0FBSixFQUFpQlYsaUJBQWlCUSxXQUFqQixFQUE4QkUsV0FBOUIsRUFBNEMsT0FBT0YsV0FBUDtFQUFxQixhQUFoTjtFQUFtTixTQUE5aEIsRUFBbkI7O0VBRUEsaUJBQVNHLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DSixXQUFuQyxFQUFnRDtFQUFFLGdCQUFJLEVBQUVJLG9CQUFvQkosV0FBdEIsQ0FBSixFQUF3QztFQUFFLHNCQUFNLElBQUk1TixTQUFKLENBQWMsbUNBQWQsQ0FBTjtFQUEyRDtFQUFFOztFQUV6SixZQUFJaU8sVUFBVSxLQUFkOzs7RUFHQSxZQUFJLENBQUN2VCxPQUFPd1QsZ0JBQVosRUFBOEJELFVBQVUsSUFBVjs7RUFBOUIsYUFFSztFQUNHLG9CQUFJRSxXQUFXL1QsU0FBU3dJLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZjs7RUFFQSxvQkFBSSxDQUFDLEVBQUQsRUFBSyxVQUFMLEVBQWlCLE9BQWpCLEVBQTBCLE1BQTFCLEVBQWtDd0wsSUFBbEMsQ0FBdUMsVUFBVUMsTUFBVixFQUFrQjtFQUN6RCx3QkFBSTtFQUNBRixpQ0FBU3hJLEtBQVQsQ0FBZTJJLFFBQWYsR0FBMEJELFNBQVMsUUFBbkM7RUFDSCxxQkFGRCxDQUVFLE9BQU8xUyxDQUFQLEVBQVU7O0VBRVosMkJBQU93UyxTQUFTeEksS0FBVCxDQUFlMkksUUFBZixJQUEyQixFQUFsQztFQUNILGlCQU5HLENBQUosRUFNSUwsVUFBVSxJQUFWO0VBQ1A7Ozs7Ozs7RUFPTCxZQUFJTSxtQkFBbUIsT0FBT0MsVUFBUCxLQUFzQixXQUE3Qzs7O0VBR0EsWUFBSUMsU0FBUztFQUNUQyxpQkFBSyxJQURJO0VBRVRDLGtCQUFNO0VBRkcsU0FBYjs7O0VBTUEsWUFBSUMsV0FBVyxFQUFmOzs7OztFQUtBLGlCQUFTQyxNQUFULENBQWdCQyxTQUFoQixFQUEyQkMsWUFBM0IsRUFBeUM7RUFDckMsaUJBQUssSUFBSXBCLEdBQVQsSUFBZ0JvQixZQUFoQixFQUE4QjtFQUMxQixvQkFBSUEsYUFBYUMsY0FBYixDQUE0QnJCLEdBQTVCLENBQUosRUFBc0M7RUFDbENtQiw4QkFBVW5CLEdBQVYsSUFBaUJvQixhQUFhcEIsR0FBYixDQUFqQjtFQUNIO0VBQ0o7RUFDSjs7RUFFRCxpQkFBU3NCLFlBQVQsQ0FBc0JDLEdBQXRCLEVBQTJCO0VBQ3ZCLG1CQUFPQyxXQUFXRCxHQUFYLEtBQW1CLENBQTFCO0VBQ0g7O0VBRUQsaUJBQVNFLGVBQVQsQ0FBeUJ2SCxJQUF6QixFQUErQjtFQUMzQixnQkFBSXdILGVBQWUsQ0FBbkI7O0VBRUEsbUJBQU94SCxJQUFQLEVBQWE7RUFDVHdILGdDQUFnQnhILEtBQUt5SCxTQUFyQjtFQUNBekgsdUJBQU9BLEtBQUswSCxZQUFaO0VBQ0g7O0VBRUQsbUJBQU9GLFlBQVA7RUFDSDs7Ozs7O0VBTUQsWUFBSUcsU0FBUyxZQUFZO0VBQ3JCLHFCQUFTQSxNQUFULENBQWdCM0gsSUFBaEIsRUFBc0I7RUFDbEJrRyxnQ0FBZ0IsSUFBaEIsRUFBc0J5QixNQUF0Qjs7RUFFQSxvQkFBSSxFQUFFM0gsZ0JBQWdCNEgsV0FBbEIsQ0FBSixFQUFvQyxNQUFNLElBQUlDLEtBQUosQ0FBVSxvQ0FBVixDQUFOO0VBQ3BDLG9CQUFJZCxTQUFTUixJQUFULENBQWMsVUFBVXVCLE1BQVYsRUFBa0I7RUFDaEMsMkJBQU9BLE9BQU9DLEtBQVAsS0FBaUIvSCxJQUF4QjtFQUNILGlCQUZHLENBQUosRUFFSSxNQUFNLElBQUk2SCxLQUFKLENBQVUsNENBQVYsQ0FBTjs7RUFFSixxQkFBS0UsS0FBTCxHQUFhL0gsSUFBYjtFQUNBLHFCQUFLZ0ksV0FBTCxHQUFtQixJQUFuQjtFQUNBLHFCQUFLQyxPQUFMLEdBQWUsS0FBZjs7RUFFQWxCLHlCQUFTbUIsSUFBVCxDQUFjLElBQWQ7O0VBRUEscUJBQUtDLE9BQUw7RUFDSDs7RUFFRDdDLHlCQUFhcUMsTUFBYixFQUFxQixDQUFDO0VBQ2xCN0IscUJBQUssU0FEYTtFQUVsQnBNLHVCQUFPLFNBQVN5TyxPQUFULEdBQW1CO0VBQ3RCLHdCQUFJL0IsV0FBVyxLQUFLZ0MsUUFBcEIsRUFBOEI7RUFDOUIsd0JBQUksS0FBS0gsT0FBVCxFQUFrQixLQUFLSSxXQUFMOztFQUVsQix3QkFBSXJJLE9BQU8sS0FBSytILEtBQWhCOzs7OztFQUtBLHdCQUFJTyxvQkFBb0JqQyxpQkFBaUJyRyxJQUFqQixDQUF4QjtFQUNBLHdCQUFJdUksb0JBQW9CO0VBQ3BCMUIsNkJBQUt5QixrQkFBa0J6QixHQURIO0VBRXBCcEksaUNBQVM2SixrQkFBa0I3SixPQUZQO0VBR3BCK0osbUNBQVdGLGtCQUFrQkUsU0FIVDtFQUlwQkMsc0NBQWNILGtCQUFrQkcsWUFKWjtFQUtwQkMsb0NBQVlKLGtCQUFrQkksVUFMVjtFQU1wQkMscUNBQWFMLGtCQUFrQkssV0FOWDtFQU9wQkMsa0NBQVVOLGtCQUFrQk07RUFQUixxQkFBeEI7Ozs7O0VBYUEsd0JBQUlDLE1BQU12QixXQUFXaUIsa0JBQWtCMUIsR0FBN0IsQ0FBTixLQUE0QzBCLGtCQUFrQjlKLE9BQWxCLElBQTZCLFlBQXpFLElBQXlGOEosa0JBQWtCOUosT0FBbEIsSUFBNkIsTUFBMUgsRUFBa0k7O0VBRWxJLHlCQUFLd0osT0FBTCxHQUFlLElBQWY7Ozs7O0VBS0Esd0JBQUlhLGdCQUFnQjlJLEtBQUsxTCxVQUF6QjtFQUNBLHdCQUFJQSxhQUFhb1Msb0JBQW9Cb0MseUJBQXlCbkMsVUFBN0MsR0FBMERtQyxjQUFjQyxJQUF4RSxHQUErRUQsYUFBaEc7RUFDQSx3QkFBSUUsZ0JBQWdCaEosS0FBS2xFLHFCQUFMLEVBQXBCO0VBQ0Esd0JBQUltTixrQkFBa0IzVSxXQUFXd0gscUJBQVgsRUFBdEI7RUFDQSx3QkFBSW9OLHNCQUFzQjdDLGlCQUFpQi9SLFVBQWpCLENBQTFCOztFQUVBLHlCQUFLNlUsT0FBTCxHQUFlO0VBQ1huSiw4QkFBTTFMLFVBREs7RUFFWDhVLGdDQUFRO0VBQ0ozQyxzQ0FBVW5TLFdBQVd3SixLQUFYLENBQWlCMkk7RUFEdkIseUJBRkc7RUFLWDRDLHNDQUFjL1UsV0FBVytVO0VBTGQscUJBQWY7RUFPQSx5QkFBS0MsZUFBTCxHQUF1QjtFQUNuQnhDLDhCQUFNa0MsY0FBY2xDLElBREQ7RUFFbkJ5QywrQkFBT2hYLFNBQVNPLGVBQVQsQ0FBeUIwVyxXQUF6QixHQUF1Q1IsY0FBY087RUFGekMscUJBQXZCO0VBSUEseUJBQUtFLGVBQUwsR0FBdUI7RUFDbkI1Qyw2QkFBS21DLGNBQWNuQyxHQUFkLEdBQW9Cb0MsZ0JBQWdCcEMsR0FBcEMsR0FBMENPLGFBQWE4QixvQkFBb0JRLGNBQWpDLENBRDVCO0VBRW5CNUMsOEJBQU1rQyxjQUFjbEMsSUFBZCxHQUFxQm1DLGdCQUFnQm5DLElBQXJDLEdBQTRDTSxhQUFhOEIsb0JBQW9CUyxlQUFqQyxDQUYvQjtFQUduQkosK0JBQU8sQ0FBQ1AsY0FBY08sS0FBZixHQUF1Qk4sZ0JBQWdCTSxLQUF2QyxHQUErQ25DLGFBQWE4QixvQkFBb0JVLGdCQUFqQztFQUhuQyxxQkFBdkI7RUFLQSx5QkFBS0MsT0FBTCxHQUFlO0VBQ1hwRCxrQ0FBVXpHLEtBQUtsQyxLQUFMLENBQVcySSxRQURWO0VBRVhJLDZCQUFLN0csS0FBS2xDLEtBQUwsQ0FBVytJLEdBRkw7RUFHWGlELGdDQUFROUosS0FBS2xDLEtBQUwsQ0FBV2dNLE1BSFI7RUFJWGhELDhCQUFNOUcsS0FBS2xDLEtBQUwsQ0FBV2dKLElBSk47RUFLWHlDLCtCQUFPdkosS0FBS2xDLEtBQUwsQ0FBV3lMLEtBTFA7RUFNWHhOLCtCQUFPaUUsS0FBS2xDLEtBQUwsQ0FBVy9CLEtBTlA7RUFPWHlNLG1DQUFXeEksS0FBS2xDLEtBQUwsQ0FBVzBLLFNBUFg7RUFRWEUsb0NBQVkxSSxLQUFLbEMsS0FBTCxDQUFXNEssVUFSWjtFQVNYQyxxQ0FBYTNJLEtBQUtsQyxLQUFMLENBQVc2SztFQVRiLHFCQUFmOztFQVlBLHdCQUFJb0IsZUFBZTNDLGFBQWFtQixrQkFBa0IxQixHQUEvQixDQUFuQjtFQUNBLHlCQUFLbUQsT0FBTCxHQUFlO0VBQ1hDLCtCQUFPakIsY0FBY25DLEdBQWQsR0FBb0JoVSxPQUFPcVgsV0FBM0IsR0FBeUNILFlBRHJDO0VBRVhJLDZCQUFLbEIsZ0JBQWdCcEMsR0FBaEIsR0FBc0JoVSxPQUFPcVgsV0FBN0IsR0FBMkM1VixXQUFXK1UsWUFBdEQsR0FBcUVqQyxhQUFhOEIsb0JBQW9Ca0IsaUJBQWpDLENBQXJFLEdBQTJIcEssS0FBS3FKLFlBQWhJLEdBQStJVSxZQUEvSSxHQUE4SjNDLGFBQWFtQixrQkFBa0JFLFlBQS9CO0VBRnhKLHFCQUFmOzs7OztFQVFBLHdCQUFJNEIsaUJBQWlCbkIsb0JBQW9CekMsUUFBekM7O0VBRUEsd0JBQUk0RCxrQkFBa0IsVUFBbEIsSUFBZ0NBLGtCQUFrQixVQUF0RCxFQUFrRTtFQUM5RC9WLG1DQUFXd0osS0FBWCxDQUFpQjJJLFFBQWpCLEdBQTRCLFVBQTVCO0VBQ0g7Ozs7OztFQU1ELHlCQUFLNkQsZUFBTDs7Ozs7RUFLQSx3QkFBSUMsUUFBUSxLQUFLQyxNQUFMLEdBQWMsRUFBMUI7RUFDQUQsMEJBQU12SyxJQUFOLEdBQWF6TixTQUFTd0ksYUFBVCxDQUF1QixLQUF2QixDQUFiOzs7RUFHQWlNLDJCQUFPdUQsTUFBTXZLLElBQU4sQ0FBV2xDLEtBQWxCLEVBQXlCO0VBQ3JCL0IsK0JBQU9pTixjQUFjTyxLQUFkLEdBQXNCUCxjQUFjbEMsSUFBcEMsR0FBMkMsSUFEN0I7RUFFckIyRCxnQ0FBUXpCLGNBQWNjLE1BQWQsR0FBdUJkLGNBQWNuQyxHQUFyQyxHQUEyQyxJQUY5QjtFQUdyQjJCLG1DQUFXRCxrQkFBa0JDLFNBSFI7RUFJckJDLHNDQUFjRixrQkFBa0JFLFlBSlg7RUFLckJDLG9DQUFZSCxrQkFBa0JHLFVBTFQ7RUFNckJDLHFDQUFhSixrQkFBa0JJLFdBTlY7RUFPckJDLGtDQUFVTCxrQkFBa0JLLFFBUFA7RUFRckI4QixpQ0FBUyxDQVJZO0VBU3JCQyxnQ0FBUSxDQVRhO0VBVXJCQyx1Q0FBZSxDQVZNO0VBV3JCQyxrQ0FBVSxLQVhXO0VBWXJCcEUsa0NBQVU7RUFaVyxxQkFBekI7O0VBZUFxQyxrQ0FBY3pOLFlBQWQsQ0FBMkJrUCxNQUFNdkssSUFBakMsRUFBdUNBLElBQXZDO0VBQ0F1SywwQkFBTS9DLFlBQU4sR0FBcUJELGdCQUFnQmdELE1BQU12SyxJQUF0QixDQUFyQjtFQUNIO0VBL0dpQixhQUFELEVBZ0hsQjtFQUNDOEYscUJBQUssaUJBRE47RUFFQ3BNLHVCQUFPLFNBQVM0USxlQUFULEdBQTJCO0VBQzlCLHdCQUFJLENBQUMsS0FBS3JDLE9BQU4sSUFBaUIsS0FBS0csUUFBMUIsRUFBb0M7O0VBRXBDLHdCQUFJMEMsYUFBYWxFLE9BQU9DLEdBQVAsSUFBYyxLQUFLbUQsT0FBTCxDQUFhQyxLQUEzQixHQUFtQyxPQUFuQyxHQUE2Q3JELE9BQU9DLEdBQVAsSUFBYyxLQUFLbUQsT0FBTCxDQUFhRyxHQUEzQixHQUFpQyxLQUFqQyxHQUF5QyxRQUF2Rzs7RUFFQSx3QkFBSSxLQUFLbkMsV0FBTCxJQUFvQjhDLFVBQXhCLEVBQW9DOztFQUVwQyw0QkFBUUEsVUFBUjtFQUNJLDZCQUFLLE9BQUw7RUFDSTlELG1DQUFPLEtBQUtlLEtBQUwsQ0FBV2pLLEtBQWxCLEVBQXlCO0VBQ3JCMkksMENBQVUsVUFEVztFQUVyQkssc0NBQU0sS0FBSzJDLGVBQUwsQ0FBcUIzQyxJQUFyQixHQUE0QixJQUZiO0VBR3JCeUMsdUNBQU8sS0FBS0UsZUFBTCxDQUFxQkYsS0FBckIsR0FBNkIsSUFIZjtFQUlyQjFDLHFDQUFLLEtBQUs0QyxlQUFMLENBQXFCNUMsR0FBckIsR0FBMkIsSUFKWDtFQUtyQmlELHdDQUFRLE1BTGE7RUFNckIvTix1Q0FBTyxNQU5jO0VBT3JCMk0sNENBQVksQ0FQUztFQVFyQkMsNkNBQWEsQ0FSUTtFQVNyQkgsMkNBQVc7RUFUVSw2QkFBekI7RUFXQTs7RUFFSiw2QkFBSyxRQUFMO0VBQ0l4QixtQ0FBTyxLQUFLZSxLQUFMLENBQVdqSyxLQUFsQixFQUF5QjtFQUNyQjJJLDBDQUFVLE9BRFc7RUFFckJLLHNDQUFNLEtBQUt3QyxlQUFMLENBQXFCeEMsSUFBckIsR0FBNEIsSUFGYjtFQUdyQnlDLHVDQUFPLEtBQUtELGVBQUwsQ0FBcUJDLEtBQXJCLEdBQTZCLElBSGY7RUFJckIxQyxxQ0FBSyxLQUFLZ0QsT0FBTCxDQUFhaEQsR0FKRztFQUtyQmlELHdDQUFRLE1BTGE7RUFNckIvTix1Q0FBTyxNQU5jO0VBT3JCMk0sNENBQVksQ0FQUztFQVFyQkMsNkNBQWEsQ0FSUTtFQVNyQkgsMkNBQVc7RUFUVSw2QkFBekI7RUFXQTs7RUFFSiw2QkFBSyxLQUFMO0VBQ0l4QixtQ0FBTyxLQUFLZSxLQUFMLENBQVdqSyxLQUFsQixFQUF5QjtFQUNyQjJJLDBDQUFVLFVBRFc7RUFFckJLLHNDQUFNLEtBQUsyQyxlQUFMLENBQXFCM0MsSUFBckIsR0FBNEIsSUFGYjtFQUdyQnlDLHVDQUFPLEtBQUtFLGVBQUwsQ0FBcUJGLEtBQXJCLEdBQTZCLElBSGY7RUFJckIxQyxxQ0FBSyxNQUpnQjtFQUtyQmlELHdDQUFRLENBTGE7RUFNckIvTix1Q0FBTyxNQU5jO0VBT3JCMk0sNENBQVksQ0FQUztFQVFyQkMsNkNBQWE7RUFSUSw2QkFBekI7RUFVQTtFQXhDUjs7RUEyQ0EseUJBQUtYLFdBQUwsR0FBbUI4QyxVQUFuQjtFQUNIO0VBckRGLGFBaEhrQixFQXNLbEI7RUFDQ2hGLHFCQUFLLFlBRE47RUFFQ3BNLHVCQUFPLFNBQVNxUixVQUFULEdBQXNCO0VBQ3pCLHdCQUFJLENBQUMsS0FBSzlDLE9BQU4sSUFBaUIsS0FBS0csUUFBMUIsRUFBb0M7O0VBRXBDLHdCQUFJclIsS0FBS2lVLEdBQUwsQ0FBU3pELGdCQUFnQixLQUFLaUQsTUFBTCxDQUFZeEssSUFBNUIsSUFBb0MsS0FBS3dLLE1BQUwsQ0FBWWhELFlBQXpELElBQXlFLENBQXpFLElBQThFelEsS0FBS2lVLEdBQUwsQ0FBUyxLQUFLN0IsT0FBTCxDQUFhbkosSUFBYixDQUFrQnFKLFlBQWxCLEdBQWlDLEtBQUtGLE9BQUwsQ0FBYUUsWUFBdkQsSUFBdUUsQ0FBekosRUFBNEosS0FBS2xCLE9BQUw7RUFDL0o7RUFORixhQXRLa0IsRUE2S2xCO0VBQ0NyQyxxQkFBSyxhQUROO0VBRUNwTSx1QkFBTyxTQUFTMk8sV0FBVCxHQUF1QjtFQUMxQix3QkFBSTRDLFFBQVEsSUFBWjs7RUFFQSx3QkFBSSxDQUFDLEtBQUtoRCxPQUFOLElBQWlCLEtBQUtHLFFBQTFCLEVBQW9DOztFQUVwQyx5QkFBS29DLE1BQUwsQ0FBWXhLLElBQVosQ0FBaUIxTCxVQUFqQixDQUE0QjJLLFdBQTVCLENBQXdDLEtBQUt1TCxNQUFMLENBQVl4SyxJQUFwRDtFQUNBLDJCQUFPLEtBQUt3SyxNQUFaOztFQUVBeEQsMkJBQU8sS0FBS2UsS0FBTCxDQUFXakssS0FBbEIsRUFBeUIsS0FBSytMLE9BQTlCO0VBQ0EsMkJBQU8sS0FBS0EsT0FBWjs7OztFQUlBLHdCQUFJLENBQUM5QyxTQUFTUixJQUFULENBQWMsVUFBVXVCLE1BQVYsRUFBa0I7RUFDakMsK0JBQU9BLFdBQVdtRCxLQUFYLElBQW9CbkQsT0FBT3FCLE9BQTNCLElBQXNDckIsT0FBT3FCLE9BQVAsQ0FBZW5KLElBQWYsS0FBd0JpTCxNQUFNOUIsT0FBTixDQUFjbkosSUFBbkY7RUFDSCxxQkFGSSxDQUFMLEVBRUk7RUFDQWdILCtCQUFPLEtBQUttQyxPQUFMLENBQWFuSixJQUFiLENBQWtCbEMsS0FBekIsRUFBZ0MsS0FBS3FMLE9BQUwsQ0FBYUMsTUFBN0M7RUFDSDtFQUNELDJCQUFPLEtBQUtELE9BQVo7O0VBRUEseUJBQUtuQixXQUFMLEdBQW1CLElBQW5CO0VBQ0EseUJBQUtDLE9BQUwsR0FBZSxLQUFmOztFQUVBLDJCQUFPLEtBQUtxQixlQUFaO0VBQ0EsMkJBQU8sS0FBS0csZUFBWjtFQUNBLDJCQUFPLEtBQUtPLE9BQVo7RUFDSDtFQTVCRixhQTdLa0IsRUEwTWxCO0VBQ0NsRSxxQkFBSyxRQUROO0VBRUNwTSx1QkFBTyxTQUFTZ0UsTUFBVCxHQUFrQjtFQUNyQix3QkFBSXdOLFNBQVMsSUFBYjs7RUFFQSx5QkFBSzdDLFdBQUw7O0VBRUF0Qiw2QkFBU1IsSUFBVCxDQUFjLFVBQVV1QixNQUFWLEVBQWtCcUQsS0FBbEIsRUFBeUI7RUFDbkMsNEJBQUlyRCxPQUFPQyxLQUFQLEtBQWlCbUQsT0FBT25ELEtBQTVCLEVBQW1DO0VBQy9CaEIscUNBQVNxRSxNQUFULENBQWdCRCxLQUFoQixFQUF1QixDQUF2QjtFQUNBLG1DQUFPLElBQVA7RUFDSDtFQUNKLHFCQUxEOztFQU9BLHlCQUFLL0MsUUFBTCxHQUFnQixJQUFoQjtFQUNIO0VBZkYsYUExTWtCLENBQXJCOztFQTROQSxtQkFBT1QsTUFBUDtFQUNILFNBL09ZLEVBQWI7Ozs7OztFQXNQQSxZQUFJMEQsYUFBYTtFQUNidEUsc0JBQVVBLFFBREc7RUFFYlksb0JBQVFBLE1BRks7O0VBSWIyRCxvQkFBUSxTQUFTQSxNQUFULENBQWdCdEwsSUFBaEIsRUFBc0I7O0VBRTFCLG9CQUFJLEVBQUVBLGdCQUFnQjRILFdBQWxCLENBQUosRUFBb0M7OztFQUdoQyx3QkFBSTVILEtBQUtuTCxNQUFMLElBQWVtTCxLQUFLLENBQUwsQ0FBbkIsRUFBNEJBLE9BQU9BLEtBQUssQ0FBTCxDQUFQLENBQTVCLEtBQWdEO0VBQ25EOzs7O0VBSUQscUJBQUssSUFBSXJNLElBQUksQ0FBYixFQUFnQkEsSUFBSW9ULFNBQVNsUyxNQUE3QixFQUFxQ2xCLEdBQXJDLEVBQTBDO0VBQ3RDLHdCQUFJb1QsU0FBU3BULENBQVQsRUFBWW9VLEtBQVosS0FBc0IvSCxJQUExQixFQUFnQyxPQUFPK0csU0FBU3BULENBQVQsQ0FBUDtFQUNuQzs7O0VBR0QsdUJBQU8sSUFBSWdVLE1BQUosQ0FBVzNILElBQVgsQ0FBUDtFQUNILGFBcEJZO0VBcUJiaEYsaUJBQUssU0FBU0EsR0FBVCxDQUFhdVEsUUFBYixFQUF1Qjs7RUFFeEIsb0JBQUlBLG9CQUFvQjNELFdBQXhCLEVBQXFDMkQsV0FBVyxDQUFDQSxRQUFELENBQVg7O0VBRXJDLG9CQUFJLENBQUNBLFNBQVMxVyxNQUFkLEVBQXNCOzs7RUFHdEIsb0JBQUkyVyxnQkFBZ0IsRUFBcEI7O0VBRUEsb0JBQUlDLFFBQVEsU0FBU0EsS0FBVCxDQUFlOVgsQ0FBZixFQUFrQjtFQUMxQix3QkFBSXFNLE9BQU91TCxTQUFTNVgsQ0FBVCxDQUFYOzs7O0VBSUEsd0JBQUksRUFBRXFNLGdCQUFnQjRILFdBQWxCLENBQUosRUFBb0M7RUFDaEM0RCxzQ0FBY3RELElBQWQsQ0FBbUIsS0FBSyxDQUF4QjtFQUNBLCtCQUFPLFVBQVA7RUFDSDs7OztFQUlELHdCQUFJbkIsU0FBU1IsSUFBVCxDQUFjLFVBQVV1QixNQUFWLEVBQWtCO0VBQ2hDLDRCQUFJQSxPQUFPQyxLQUFQLEtBQWlCL0gsSUFBckIsRUFBMkI7RUFDdkJ3TCwwQ0FBY3RELElBQWQsQ0FBbUJKLE1BQW5CO0VBQ0EsbUNBQU8sSUFBUDtFQUNIO0VBQ0oscUJBTEcsQ0FBSixFQUtJLE9BQU8sVUFBUDs7O0VBR0owRCxrQ0FBY3RELElBQWQsQ0FBbUIsSUFBSVAsTUFBSixDQUFXM0gsSUFBWCxDQUFuQjtFQUNILGlCQXJCRDs7RUF1QkEscUJBQUssSUFBSXJNLElBQUksQ0FBYixFQUFnQkEsSUFBSTRYLFNBQVMxVyxNQUE3QixFQUFxQ2xCLEdBQXJDLEVBQTBDO0VBQ3RDLHdCQUFJK1gsT0FBT0QsTUFBTTlYLENBQU4sQ0FBWDs7RUFFQSx3QkFBSStYLFNBQVMsVUFBYixFQUF5QjtFQUM1Qjs7RUFFRCx1QkFBT0YsYUFBUDtFQUNILGFBNURZO0VBNkRiRyx3QkFBWSxTQUFTQSxVQUFULEdBQXNCO0VBQzlCNUUseUJBQVM3UixPQUFULENBQWlCLFVBQVU0UyxNQUFWLEVBQWtCO0VBQy9CLDJCQUFPQSxPQUFPSyxPQUFQLEVBQVA7RUFDSCxpQkFGRDtFQUdILGFBakVZO0VBa0VieUQsdUJBQVcsU0FBU0EsU0FBVCxDQUFtQjVMLElBQW5CLEVBQXlCOztFQUVoQyxvQkFBSSxFQUFFQSxnQkFBZ0I0SCxXQUFsQixDQUFKLEVBQW9DOzs7RUFHaEMsd0JBQUk1SCxLQUFLbkwsTUFBTCxJQUFlbUwsS0FBSyxDQUFMLENBQW5CLEVBQTRCQSxPQUFPQSxLQUFLLENBQUwsQ0FBUCxDQUE1QixLQUFnRDtFQUNuRDs7O0VBR0QrRyx5QkFBU1IsSUFBVCxDQUFjLFVBQVV1QixNQUFWLEVBQWtCO0VBQzVCLHdCQUFJQSxPQUFPQyxLQUFQLEtBQWlCL0gsSUFBckIsRUFBMkI7RUFDdkI4SCwrQkFBT3BLLE1BQVA7RUFDQSwrQkFBTyxJQUFQO0VBQ0g7RUFDSixpQkFMRDtFQU1ILGFBakZZO0VBa0ZiQSxvQkFBUSxTQUFTQSxNQUFULENBQWdCNk4sUUFBaEIsRUFBMEI7O0VBRTlCLG9CQUFJQSxvQkFBb0IzRCxXQUF4QixFQUFxQzJELFdBQVcsQ0FBQ0EsUUFBRCxDQUFYOztFQUVyQyxvQkFBSSxDQUFDQSxTQUFTMVcsTUFBZCxFQUFzQjs7OztFQUl0QixvQkFBSWdYLFNBQVMsU0FBU0EsTUFBVCxDQUFnQmxZLENBQWhCLEVBQW1CO0VBQzVCLHdCQUFJcU0sT0FBT3VMLFNBQVM1WCxDQUFULENBQVg7O0VBRUFvVCw2QkFBU1IsSUFBVCxDQUFjLFVBQVV1QixNQUFWLEVBQWtCO0VBQzVCLDRCQUFJQSxPQUFPQyxLQUFQLEtBQWlCL0gsSUFBckIsRUFBMkI7RUFDdkI4SCxtQ0FBT3BLLE1BQVA7RUFDQSxtQ0FBTyxJQUFQO0VBQ0g7RUFDSixxQkFMRDtFQU1ILGlCQVREOztFQVdBLHFCQUFLLElBQUkvSixJQUFJLENBQWIsRUFBZ0JBLElBQUk0WCxTQUFTMVcsTUFBN0IsRUFBcUNsQixHQUFyQyxFQUEwQztFQUN0Q2tZLDJCQUFPbFksQ0FBUDtFQUNIO0VBQ0osYUF4R1k7RUF5R2JtWSx1QkFBVyxTQUFTQSxTQUFULEdBQXFCO0VBQzVCLHVCQUFPL0UsU0FBU2xTLE1BQWhCLEVBQXdCO0VBQ3BCa1MsNkJBQVMsQ0FBVCxFQUFZckosTUFBWjtFQUNIO0VBQ0o7RUE3R1ksU0FBakI7Ozs7O0VBbUhBLGlCQUFTbEksSUFBVCxHQUFnQjs7RUFFWixxQkFBU3VXLFdBQVQsR0FBdUI7RUFDbkIsb0JBQUlsWixPQUFPbVosV0FBUCxJQUFzQnBGLE9BQU9FLElBQWpDLEVBQXVDO0VBQ25DRiwyQkFBT0MsR0FBUCxHQUFhaFUsT0FBT3FYLFdBQXBCO0VBQ0F0RCwyQkFBT0UsSUFBUCxHQUFjalUsT0FBT21aLFdBQXJCOztFQUVBWCwrQkFBV00sVUFBWDtFQUNILGlCQUxELE1BS08sSUFBSTlZLE9BQU9xWCxXQUFQLElBQXNCdEQsT0FBT0MsR0FBakMsRUFBc0M7RUFDekNELDJCQUFPQyxHQUFQLEdBQWFoVSxPQUFPcVgsV0FBcEI7RUFDQXRELDJCQUFPRSxJQUFQLEdBQWNqVSxPQUFPbVosV0FBckI7OztFQUdBakYsNkJBQVM3UixPQUFULENBQWlCLFVBQVU0UyxNQUFWLEVBQWtCO0VBQy9CLCtCQUFPQSxPQUFPd0MsZUFBUCxFQUFQO0VBQ0gscUJBRkQ7RUFHSDtFQUNKOztFQUVEeUI7RUFDQWxaLG1CQUFPdUMsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MyVyxXQUFsQzs7O0VBR0FsWixtQkFBT3VDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDaVcsV0FBV00sVUFBN0M7RUFDQTlZLG1CQUFPdUMsZ0JBQVAsQ0FBd0IsbUJBQXhCLEVBQTZDaVcsV0FBV00sVUFBeEQ7OztFQUdBLGdCQUFJTSxpQkFBaUIsS0FBSyxDQUExQjs7RUFFQSxxQkFBU0MsbUJBQVQsR0FBK0I7RUFDM0JELGlDQUFpQkUsWUFBWSxZQUFZO0VBQ3JDcEYsNkJBQVM3UixPQUFULENBQWlCLFVBQVU0UyxNQUFWLEVBQWtCO0VBQy9CLCtCQUFPQSxPQUFPaUQsVUFBUCxFQUFQO0VBQ0gscUJBRkQ7RUFHSCxpQkFKZ0IsRUFJZCxHQUpjLENBQWpCO0VBS0g7O0VBRUQscUJBQVNxQixrQkFBVCxHQUE4QjtFQUMxQkMsOEJBQWNKLGNBQWQ7RUFDSDs7RUFFRCxnQkFBSUssZUFBZSxLQUFLLENBQXhCO0VBQ0EsZ0JBQUlDLDRCQUE0QixLQUFLLENBQXJDOztFQUVBLGdCQUFJLFlBQVloYSxRQUFoQixFQUEwQjtFQUN0QitaLCtCQUFlLFFBQWY7RUFDQUMsNENBQTRCLGtCQUE1QjtFQUNILGFBSEQsTUFHTyxJQUFJLGtCQUFrQmhhLFFBQXRCLEVBQWdDO0VBQ25DK1osK0JBQWUsY0FBZjtFQUNBQyw0Q0FBNEIsd0JBQTVCO0VBQ0g7O0VBRUQsZ0JBQUlBLHlCQUFKLEVBQStCO0VBQzNCLG9CQUFJLENBQUNoYSxTQUFTK1osWUFBVCxDQUFMLEVBQTZCSjs7RUFFN0IzWix5QkFBUzZDLGdCQUFULENBQTBCbVgseUJBQTFCLEVBQXFELFlBQVk7RUFDN0Qsd0JBQUloYSxTQUFTK1osWUFBVCxDQUFKLEVBQTRCO0VBQ3hCRjtFQUNILHFCQUZELE1BRU87RUFDSEY7RUFDSDtFQUNKLGlCQU5EO0VBT0gsYUFWRCxNQVVPQTtFQUNWOztFQUVELFlBQUksQ0FBQzlGLE9BQUwsRUFBYzVROzs7OztFQUtkLFlBQUksWUFBaUIsV0FBakIsSUFBZ0NnWCxPQUFPQyxPQUEzQyxFQUFvRDtFQUNoREQsMEJBQUEsR0FBaUJuQixVQUFqQjtFQUNILFNBRkQsTUFFTztFQUNIeFksbUJBQU93WSxVQUFQLEdBQW9CQSxVQUFwQjtFQUNIO0VBRUosS0FqZ0JBLEVBaWdCRXhZLE1BamdCRixFQWlnQlVOLFFBamdCVjs7OztFQ05EO0VBQ0EsR0FBRSxVQUFTdUIsQ0FBVCxFQUFXNFksQ0FBWCxFQUFhO0VBQUMsa0JBQVksT0FBT0MsU0FBbkIsSUFBMkJBLFVBQU9DLEdBQWxDLEdBQXNDRCxVQUFPLEVBQVBBLEVBQVVELEVBQUU1WSxDQUFGLENBQVY2WSxDQUF0QyxHQUFzRCxBQUF5QkgsY0FBQSxHQUFlRSxFQUFFNVksQ0FBRixDQUF4QyxBQUF0RDtFQUFrSCxHQUFqSSxDQUFtSSxlQUFhLE9BQU9zQyxjQUFwQixHQUEyQkEsY0FBM0IsR0FBa0N5VyxjQUFBQSxDQUFLaGEsTUFBTGdhLElBQWFBLGNBQUFBLENBQUt6VyxNQUF2TCxFQUErTCxVQUFTdEMsQ0FBVCxFQUFXO0FBQUMsRUFBYSxRQUFJNFksQ0FBSjtFQUFBLFFBQU1qUCxDQUFOO0VBQUEsUUFBUXFQLENBQVI7RUFBQSxRQUFVQyxDQUFWO0VBQUEsUUFBWUMsQ0FBWjtFQUFBLFFBQWNDLENBQWQ7RUFBQSxRQUFnQnRaLENBQWhCO0VBQUEsUUFBa0J1WixJQUFFLEVBQXBCO0VBQUEsUUFBdUJDLElBQUUsbUJBQWtCNWEsUUFBbEIsSUFBNEIsc0JBQXFCdUIsQ0FBakQsSUFBb0QsZUFBY3ZCLFNBQVN3SSxhQUFULENBQXVCLEdBQXZCLENBQTNGO0VBQUEsUUFBdUhxUyxJQUFFLEVBQXpIO0VBQUEsUUFBNEhDLElBQUUsRUFBQ2hiLFVBQVMsa0JBQVYsRUFBNkJpYixnQkFBZSx1QkFBNUMsRUFBb0VDLFdBQVV6WixDQUE5RSxFQUFnRjBaLFFBQU8sQ0FBdkYsRUFBeUZDLGFBQVksUUFBckcsRUFBOEdDLGFBQVksQ0FBQyxDQUEzSCxFQUE2SEMsVUFBUyxvQkFBVSxFQUFoSixFQUE5SDtFQUFBLFFBQWtSQyxJQUFFLFNBQUZBLENBQUUsQ0FBUzlaLENBQVQsRUFBVzRZLENBQVgsRUFBYWpQLENBQWIsRUFBZTtFQUFDLFVBQUcsc0JBQW9CcEgsT0FBT00sU0FBUCxDQUFpQkUsUUFBakIsQ0FBMEJwRSxJQUExQixDQUErQnFCLENBQS9CLENBQXZCLEVBQXlELEtBQUksSUFBSWdaLENBQVIsSUFBYWhaLENBQWI7RUFBZXVDLGVBQU9NLFNBQVAsQ0FBaUJ3USxjQUFqQixDQUFnQzFVLElBQWhDLENBQXFDcUIsQ0FBckMsRUFBdUNnWixDQUF2QyxLQUEyQ0osRUFBRWphLElBQUYsQ0FBT2dMLENBQVAsRUFBUzNKLEVBQUVnWixDQUFGLENBQVQsRUFBY0EsQ0FBZCxFQUFnQmhaLENBQWhCLENBQTNDO0VBQWYsT0FBekQsTUFBMkksS0FBSSxJQUFJaVosSUFBRSxDQUFOLEVBQVFDLElBQUVsWixFQUFFZSxNQUFoQixFQUF1QmtZLElBQUVDLENBQXpCLEVBQTJCRCxHQUEzQjtFQUErQkwsVUFBRWphLElBQUYsQ0FBT2dMLENBQVAsRUFBUzNKLEVBQUVpWixDQUFGLENBQVQsRUFBY0EsQ0FBZCxFQUFnQmpaLENBQWhCO0VBQS9CO0VBQWtELEtBQWplO0VBQUEsUUFBa2UrWixJQUFFLFNBQUZBLENBQUUsR0FBVTtFQUFDLFVBQUkvWixJQUFFLEVBQU47RUFBQSxVQUFTNFksSUFBRSxDQUFDLENBQVo7RUFBQSxVQUFjalAsSUFBRSxDQUFoQjtFQUFBLFVBQWtCcVAsSUFBRXJULFVBQVU1RSxNQUE5QixDQUFxQyx1QkFBcUJ3QixPQUFPTSxTQUFQLENBQWlCRSxRQUFqQixDQUEwQnBFLElBQTFCLENBQStCZ0gsVUFBVSxDQUFWLENBQS9CLENBQXJCLEtBQW9FaVQsSUFBRWpULFVBQVUsQ0FBVixDQUFGLEVBQWVnRSxHQUFuRixFQUF3RixPQUFLQSxJQUFFcVAsQ0FBUCxFQUFTclAsR0FBVCxFQUFhO0VBQUMsWUFBSXNQLElBQUV0VCxVQUFVZ0UsQ0FBVixDQUFOLENBQW1CLENBQUUsVUFBU0EsQ0FBVCxFQUFXO0VBQUMsZUFBSSxJQUFJcVAsQ0FBUixJQUFhclAsQ0FBYjtFQUFlcEgsbUJBQU9NLFNBQVAsQ0FBaUJ3USxjQUFqQixDQUFnQzFVLElBQWhDLENBQXFDZ0wsQ0FBckMsRUFBdUNxUCxDQUF2QyxNQUE0Q0osS0FBRyxzQkFBb0JyVyxPQUFPTSxTQUFQLENBQWlCRSxRQUFqQixDQUEwQnBFLElBQTFCLENBQStCZ0wsRUFBRXFQLENBQUYsQ0FBL0IsQ0FBdkIsR0FBNERoWixFQUFFZ1osQ0FBRixJQUFLZSxFQUFFLENBQUMsQ0FBSCxFQUFLL1osRUFBRWdaLENBQUYsQ0FBTCxFQUFVclAsRUFBRXFQLENBQUYsQ0FBVixDQUFqRSxHQUFpRmhaLEVBQUVnWixDQUFGLElBQUtyUCxFQUFFcVAsQ0FBRixDQUFsSTtFQUFmO0VBQXVKLFNBQXBLLENBQXNLQyxDQUF0SyxDQUFEO0VBQTBLLGNBQU9qWixDQUFQO0VBQVMsS0FBaDBCO0VBQUEsUUFBaTBCZ2EsSUFBRSxTQUFGQSxDQUFFLENBQVNoYSxDQUFULEVBQVc7RUFBQyxhQUFPaUQsS0FBS0MsR0FBTCxDQUFTbEQsRUFBRWlhLFlBQVgsRUFBd0JqYSxFQUFFdVYsWUFBMUIsRUFBdUN2VixFQUFFa2EsWUFBekMsQ0FBUDtFQUE4RCxLQUE3NEI7RUFBQSxRQUE4NEJDLElBQUUsU0FBRkEsQ0FBRSxHQUFVO0VBQUMsYUFBT2xYLEtBQUtDLEdBQUwsQ0FBU3pFLFNBQVMyTyxJQUFULENBQWM2TSxZQUF2QixFQUFvQ3hiLFNBQVNPLGVBQVQsQ0FBeUJpYixZQUE3RCxFQUEwRXhiLFNBQVMyTyxJQUFULENBQWNtSSxZQUF4RixFQUFxRzlXLFNBQVNPLGVBQVQsQ0FBeUJ1VyxZQUE5SCxFQUEySTlXLFNBQVMyTyxJQUFULENBQWM4TSxZQUF6SixFQUFzS3piLFNBQVNPLGVBQVQsQ0FBeUJrYixZQUEvTCxDQUFQO0VBQW9OLEtBQS9tQztFQUFBLFFBQWduQ0UsSUFBRSxTQUFGQSxDQUFFLENBQVNwYSxDQUFULEVBQVc7RUFBQyxVQUFJMkosSUFBRSxDQUFOLENBQVEsSUFBRzNKLEVBQUU0VCxZQUFMLEVBQWtCLEdBQUU7RUFBQ2pLLGFBQUczSixFQUFFMlQsU0FBTCxFQUFlM1QsSUFBRUEsRUFBRTRULFlBQW5CO0VBQWdDLE9BQW5DLFFBQXlDNVQsQ0FBekMsRUFBbEIsS0FBbUUySixJQUFFM0osRUFBRTJULFNBQUosQ0FBYyxPQUFPaEssSUFBRUEsSUFBRXVQLENBQUYsR0FBSU4sRUFBRWMsTUFBUixFQUFlL1AsS0FBRyxDQUFILEdBQUtBLENBQUwsR0FBTyxDQUE3QjtFQUErQixLQUF0dkM7RUFBQSxRQUF1dkMwUSxJQUFFLFNBQUZBLENBQUUsQ0FBU3pCLENBQVQsRUFBVztFQUFDLFVBQUlqUCxJQUFFaVAsRUFBRTVRLHFCQUFGLEVBQU4sQ0FBZ0MsT0FBTzJCLEVBQUVvSixHQUFGLElBQU8sQ0FBUCxJQUFVcEosRUFBRXFKLElBQUYsSUFBUSxDQUFsQixJQUFxQnJKLEVBQUVxTSxNQUFGLEtBQVdoVyxFQUFFc2EsV0FBRixJQUFlN2IsU0FBU08sZUFBVCxDQUF5QmtiLFlBQW5ELENBQXJCLElBQXVGdlEsRUFBRThMLEtBQUYsS0FBVXpWLEVBQUV1YSxVQUFGLElBQWM5YixTQUFTTyxlQUFULENBQXlCMFcsV0FBakQsQ0FBOUY7RUFBNEosS0FBajhDO0VBQUEsUUFBazhDOEUsSUFBRSxTQUFGQSxDQUFFLEdBQVU7RUFBQ2xCLFFBQUVtQixJQUFGLENBQVEsVUFBU3phLENBQVQsRUFBVzRZLENBQVgsRUFBYTtFQUFDLGVBQU81WSxFQUFFMGEsUUFBRixHQUFXOUIsRUFBRThCLFFBQWIsR0FBc0IsQ0FBQyxDQUF2QixHQUF5QjFhLEVBQUUwYSxRQUFGLEdBQVc5QixFQUFFOEIsUUFBYixHQUFzQixDQUF0QixHQUF3QixDQUF4RDtFQUEwRCxPQUFoRjtFQUFtRixLQUFsaUQsQ0FBbWlEdEIsRUFBRXVCLFlBQUYsR0FBZSxZQUFVO0VBQUMzQixVQUFFbUIsR0FBRixFQUFNakIsSUFBRUQsSUFBRWUsRUFBRWYsQ0FBRixJQUFLbUIsRUFBRW5CLENBQUYsQ0FBUCxHQUFZLENBQXBCLEVBQXNCYSxFQUFFUixDQUFGLEVBQUssVUFBU3RaLENBQVQsRUFBVztFQUFDQSxVQUFFMGEsUUFBRixHQUFXTixFQUFFcGEsRUFBRVosTUFBSixDQUFYO0VBQXVCLE9BQXhDLENBQXRCLEVBQWlFb2IsR0FBakU7RUFBcUUsS0FBL0YsQ0FBZ0csSUFBSUksSUFBRSxTQUFGQSxDQUFFLEdBQVU7RUFBQyxVQUFJNWEsSUFBRXZCLFNBQVNHLGdCQUFULENBQTBCZ2EsRUFBRXJhLFFBQTVCLENBQU4sQ0FBNEN1YixFQUFFOVosQ0FBRixFQUFLLFVBQVNBLENBQVQsRUFBVztFQUFDLFlBQUdBLEVBQUU2YSxJQUFMLEVBQVU7RUFBQyxjQUFJakMsSUFBRW5hLFNBQVM4SyxhQUFULENBQXVCdkosRUFBRTZhLElBQXpCLENBQU4sQ0FBcUNqQyxLQUFHVSxFQUFFbEYsSUFBRixDQUFPLEVBQUMwRyxLQUFJOWEsQ0FBTCxFQUFPWixRQUFPd1osQ0FBZCxFQUFnQm1DLFFBQU8sU0FBTy9hLEVBQUVRLFVBQUYsQ0FBYXdhLE9BQWIsQ0FBcUJDLFdBQXJCLEVBQVAsR0FBMENqYixFQUFFUSxVQUE1QyxHQUF1RCxJQUE5RSxFQUFtRmthLFVBQVMsQ0FBNUYsRUFBUCxDQUFIO0VBQTBHO0VBQUMsT0FBNUs7RUFBK0ssS0FBNU87RUFBQSxRQUE2T1EsSUFBRSxTQUFGQSxDQUFFLEdBQVU7RUFBQy9CLFlBQUlBLEVBQUUyQixHQUFGLENBQU03YixTQUFOLENBQWdCMkssTUFBaEIsQ0FBdUJnUCxFQUFFZSxXQUF6QixHQUFzQ1IsRUFBRTRCLE1BQUYsSUFBVTVCLEVBQUU0QixNQUFGLENBQVM5YixTQUFULENBQW1CMkssTUFBbkIsQ0FBMEJnUCxFQUFFZSxXQUE1QixDQUFwRDtFQUE4RixLQUF4VjtFQUFBLFFBQXlWd0IsSUFBRSxTQUFGQSxDQUFFLENBQVNuYixDQUFULEVBQVc7RUFBQ2tiLFdBQUlsYixFQUFFOGEsR0FBRixDQUFNN2IsU0FBTixDQUFnQmlJLEdBQWhCLENBQW9CMFIsRUFBRWUsV0FBdEIsQ0FBSixFQUF1QzNaLEVBQUUrYSxNQUFGLElBQVUvYSxFQUFFK2EsTUFBRixDQUFTOWIsU0FBVCxDQUFtQmlJLEdBQW5CLENBQXVCMFIsRUFBRWUsV0FBekIsQ0FBakQsRUFBdUZmLEVBQUVpQixRQUFGLENBQVc3WixDQUFYLENBQXZGLEVBQXFHbVosSUFBRSxFQUFDMkIsS0FBSTlhLEVBQUU4YSxHQUFQLEVBQVdDLFFBQU8vYSxFQUFFK2EsTUFBcEIsRUFBdkc7RUFBbUksS0FBMWUsQ0FBMmUzQixFQUFFZ0MsYUFBRixHQUFnQixZQUFVO0VBQUMsVUFBSXpSLElBQUUzSixFQUFFb1csV0FBUixDQUFvQixJQUFHcFcsRUFBRXNhLFdBQUYsR0FBYzNRLENBQWQsSUFBaUJxUCxDQUFqQixJQUFvQnFCLEVBQUVmLEVBQUUsQ0FBRixFQUFLbGEsTUFBUCxDQUF2QixFQUFzQyxPQUFPK2IsRUFBRTdCLEVBQUUsQ0FBRixDQUFGLEdBQVFBLEVBQUUsQ0FBRixDQUFmLENBQW9CLEtBQUksSUFBSUwsSUFBRSxDQUFOLEVBQVFDLElBQUVJLEVBQUV2WSxNQUFoQixFQUF1QmtZLElBQUVDLENBQXpCLEVBQTJCRCxHQUEzQixFQUErQjtFQUFDLFlBQUlFLElBQUVHLEVBQUVMLENBQUYsQ0FBTixDQUFXLElBQUdFLEVBQUV1QixRQUFGLElBQVkvUSxDQUFmLEVBQWlCLE9BQU93UixFQUFFaEMsQ0FBRixHQUFLQSxDQUFaO0VBQWMsWUFBSVAsRUFBRWlCLFFBQUYsRUFBSjtFQUFpQixLQUFwTSxDQUFxTSxJQUFJd0IsSUFBRSxTQUFGQSxDQUFFLEdBQVU7RUFBQ3ZCLFFBQUVSLENBQUYsRUFBSyxVQUFTdFosQ0FBVCxFQUFXO0VBQUNBLFVBQUU4YSxHQUFGLENBQU03YixTQUFOLENBQWdCa04sUUFBaEIsQ0FBeUJ5TSxFQUFFZSxXQUEzQixNQUEwQ1IsSUFBRSxFQUFDMkIsS0FBSTlhLEVBQUU4YSxHQUFQLEVBQVdDLFFBQU8vYSxFQUFFK2EsTUFBcEIsRUFBNUM7RUFBeUUsT0FBMUY7RUFBNkYsS0FBOUcsQ0FBK0czQixFQUFFM1gsT0FBRixHQUFVLFlBQVU7RUFBQ21YLFlBQUlBLEVBQUVhLFNBQUYsQ0FBWWpZLG1CQUFaLENBQWdDLFFBQWhDLEVBQXlDOFosQ0FBekMsRUFBMkMsQ0FBQyxDQUE1QyxHQUErQzFDLEVBQUVhLFNBQUYsQ0FBWWpZLG1CQUFaLENBQWdDLFFBQWhDLEVBQXlDOFosQ0FBekMsRUFBMkMsQ0FBQyxDQUE1QyxDQUEvQyxFQUE4RmhDLElBQUUsRUFBaEcsRUFBbUdWLElBQUUsSUFBckcsRUFBMEdqUCxJQUFFLElBQTVHLEVBQWlIcVAsSUFBRSxJQUFuSCxFQUF3SEMsSUFBRSxJQUExSCxFQUErSEMsSUFBRSxJQUFqSSxFQUFzSUMsSUFBRSxJQUF4SSxFQUE2SXRaLElBQUUsSUFBbko7RUFBeUosS0FBOUssQ0FBK0ssSUFBSTBiLElBQUUsU0FBRkEsQ0FBRSxDQUFTdmIsQ0FBVCxFQUFXO0VBQUNqQixhQUFPd0csWUFBUCxDQUFvQm9FLENBQXBCLEdBQXVCQSxJQUFFNUUsV0FBWSxZQUFVO0VBQUNxVSxVQUFFdUIsWUFBRixJQUFpQnZCLEVBQUVnQyxhQUFGLEVBQWpCO0VBQW1DLE9BQTFELEVBQTRELEVBQTVELENBQXpCO0VBQXlGLEtBQTNHO0VBQUEsUUFBNEdFLElBQUUsU0FBRkEsQ0FBRSxDQUFTdGIsQ0FBVCxFQUFXO0VBQUMySixZQUFJQSxJQUFFNUUsV0FBWSxZQUFVO0VBQUM0RSxZQUFFLElBQUYsRUFBTyxhQUFXM0osRUFBRTZGLElBQWIsSUFBbUJ1VCxFQUFFZ0MsYUFBRixFQUExQixFQUE0QyxhQUFXcGIsRUFBRTZGLElBQWIsS0FBb0J1VCxFQUFFdUIsWUFBRixJQUFpQnZCLEVBQUVnQyxhQUFGLEVBQXJDLENBQTVDO0VBQW9HLE9BQTNILEVBQTZILEVBQTdILENBQU47RUFBd0ksS0FBbFEsQ0FBbVEsT0FBT2hDLEVBQUUxWCxJQUFGLEdBQU8sVUFBUzFCLENBQVQsRUFBVztFQUFDcVosWUFBSUQsRUFBRTNYLE9BQUYsSUFBWW1YLElBQUVtQixFQUFFUixDQUFGLEVBQUl2WixLQUFHLEVBQVAsQ0FBZCxFQUF5QmlaLElBQUV4YSxTQUFTOEssYUFBVCxDQUF1QnFQLEVBQUVZLGNBQXpCLENBQTNCLEVBQW9Fb0IsR0FBcEUsRUFBd0UsTUFBSXRCLEVBQUV2WSxNQUFOLEtBQWVzYSxLQUFJakMsRUFBRXVCLFlBQUYsRUFBSixFQUFxQnZCLEVBQUVnQyxhQUFGLEVBQXJCLEVBQXVDeEMsRUFBRWEsU0FBRixDQUFZblksZ0JBQVosQ0FBNkIsUUFBN0IsRUFBc0NnYSxDQUF0QyxFQUF3QyxDQUFDLENBQXpDLENBQXZDLEVBQW1GMUMsRUFBRWdCLFdBQUYsR0FBY2hCLEVBQUVhLFNBQUYsQ0FBWW5ZLGdCQUFaLENBQTZCLFFBQTdCLEVBQXNDaWEsQ0FBdEMsRUFBd0MsQ0FBQyxDQUF6QyxDQUFkLEdBQTBEM0MsRUFBRWEsU0FBRixDQUFZblksZ0JBQVosQ0FBNkIsUUFBN0IsRUFBc0NnYSxDQUF0QyxFQUF3QyxDQUFDLENBQXpDLENBQTVKLENBQTVFO0VBQXNSLEtBQXpTLEVBQTBTbEMsQ0FBalQ7RUFBbVQsR0FBLzFHLENBQUQ7OztFQ0RBOztBQUVBLEVBQU8sSUFBTS9LLHFCQUFtQixTQUFuQkEsZ0JBQW1CLENBQzlCQyxhQUQ4QixFQVEzQjtFQUFBLGlGQURDLEVBQ0Q7RUFBQSwwQkFMRDlQLE9BS0M7RUFBQSxNQUxEQSxPQUtDLGdDQUxTQyxRQUtUO0VBQUEsNkJBSkQ4UCxVQUlDO0VBQUEsTUFKREEsVUFJQyxtQ0FKWSxLQUlaO0VBQUEsZ0NBSERDLGFBR0M7RUFBQSxNQUhEQSxhQUdDLHNDQUhlLEtBR2Y7RUFBQSxtQ0FGREMsZ0JBRUM7RUFBQSxNQUZEQSxnQkFFQyx5Q0FGa0IsZ0NBRWxCOztFQUNILE1BQUksQ0FBQ0gsYUFBTCxFQUFvQjtFQUNsQjtFQUNEOztFQUVEO0VBQ0EsTUFBTWxQLFNBQVNYLFNBQVNhLGNBQVQsQ0FDYmdQLGNBQWMvTyxZQUFkLENBQTJCLGVBQTNCLENBRGEsQ0FBZjs7RUFJQTtFQUNBLE1BQUksQ0FBQ0gsTUFBTCxFQUFhO0VBQ1g7RUFDRDs7RUFFRDtFQUNBLE1BQU1zUCxhQUNKSCxlQUFlLElBQWYsSUFDQUQsY0FBYy9PLFlBQWQsQ0FBMkIsZUFBM0IsTUFBZ0QsTUFGbEQ7O0VBSUE7RUFDQStPLGdCQUFjOU8sWUFBZCxDQUEyQixlQUEzQixFQUE0QyxDQUFDa1AsVUFBN0M7RUFDQXRQLFNBQU9JLFlBQVAsQ0FBb0IsYUFBcEIsRUFBbUNrUCxVQUFuQzs7RUFFQTtFQUNBLE1BQUksQ0FBQ0EsVUFBRCxJQUFlSixjQUFjSyxZQUFkLENBQTJCLHFCQUEzQixDQUFuQixFQUFzRTtFQUNwRUwsa0JBQWNuSCxTQUFkLEdBQTBCbUgsY0FBYy9PLFlBQWQsQ0FBMkIscUJBQTNCLENBQTFCO0VBQ0QsR0FGRCxNQUVPLElBQUltUCxjQUFjSixjQUFjSyxZQUFkLENBQTJCLHNCQUEzQixDQUFsQixFQUFzRTtFQUMzRUwsa0JBQWNuSCxTQUFkLEdBQTBCbUgsY0FBYy9PLFlBQWQsQ0FDeEIsc0JBRHdCLENBQTFCO0VBR0Q7O0VBRUQ7RUFDQSxNQUFJaVAsa0JBQWtCLElBQXRCLEVBQTRCO0VBQzFCLFFBQU1JLGdCQUFnQnJDLE1BQU0xSixTQUFOLENBQWdCbkUsS0FBaEIsQ0FDbkJDLElBRG1CLENBQ2RILFFBQVFJLGdCQUFSLENBQXlCNlAsZ0JBQXpCLENBRGMsRUFFbkJJLE1BRm1CLENBRVo7RUFBQSxhQUFXQyxZQUFZUixhQUF2QjtFQUFBLEtBRlksQ0FBdEI7O0VBSUFNLGtCQUFjeE4sT0FBZCxDQUFzQixtQkFBVztFQUMvQmlOLHVCQUFpQlMsT0FBakIsRUFBMEI7RUFDeEJ0USx3QkFEd0I7RUFFeEIrUCxvQkFBWTtFQUZZLE9BQTFCO0VBSUQsS0FMRDtFQU1EO0VBQ0YsQ0F0RE07O0VDRlA7Ozs7RUFTQTs7O0FBR0EsTUFBYWlOLG9CQUFvQixTQUFwQkEsaUJBQW9CLEdBU3RCO0VBQUEsaUZBQVAsRUFBTztFQUFBLGlDQVJUQyxjQVFTO0VBQUEsTUFST0EsY0FRUCx1Q0FSd0Isd0JBUXhCO0VBQUEsOEJBUFRDLFdBT1M7RUFBQSxNQVBJQSxXQU9KLG9DQVBrQiw4QkFPbEI7RUFBQSwyQkFOVEMsUUFNUztFQUFBLE1BTkNBLFFBTUQsaUNBTlksd0NBTVo7RUFBQSxtQ0FMVEMsa0JBS1M7RUFBQSxNQUxXQSxrQkFLWCx5Q0FMZ0MsZ0NBS2hDO0VBQUEsNkJBSlRDLFVBSVM7RUFBQSxNQUpHQSxVQUlILG1DQUpnQixpQ0FJaEI7RUFBQSw0QkFIVEMsU0FHUztFQUFBLE1BSEVBLFNBR0Ysa0NBSGMsRUFHZDtFQUFBLGlDQUZUQyxjQUVTO0VBQUEsTUFGT0EsY0FFUCx1Q0FGd0IsaUNBRXhCO0VBQUEsZ0NBRFRDLGFBQ1M7RUFBQSxNQURNQSxhQUNOLHNDQURzQiw4QkFDdEI7O0VBQ1Q7RUFDQSxNQUNFLEVBQUUsbUJBQW1CdmQsUUFBckIsS0FDQSxFQUFFLHNCQUFzQk0sTUFBeEIsQ0FEQSxJQUVBLENBQUNOLFNBQVNPLGVBQVQsQ0FBeUJDLFNBSDVCLEVBS0UsT0FBTyxJQUFQOztFQUVGLE1BQUlnZCx1QkFBSjs7RUFFQTtFQUNBLFdBQVNDLFVBQVQsQ0FBb0JwUSxPQUFwQixFQUE2QjtFQUMzQm1RLHFCQUFpQixJQUFJMUUsV0FBVzFELE1BQWYsQ0FBc0IvSCxPQUF0QixDQUFqQjtFQUNEOztFQUVELFdBQVNxUSxhQUFULEdBQXlCO0VBQ3ZCLFFBQUlGLGNBQUosRUFBb0I7RUFDbEJBLHFCQUFlclMsTUFBZjtFQUNEO0VBQ0Y7O0VBRUQsV0FBU3dTLGFBQVQsQ0FBdUJDLGdCQUF2QixFQUF5QztFQUN2Q0MsZ0JBQVE1YSxJQUFSLENBQWE7RUFDWG5ELGdCQUFVbWQsV0FEQztFQUVYL0IsbUJBQWFnQyxRQUZGO0VBR1hqQyxjQUFRb0MsU0FIRztFQUlYakMsY0FKVyxvQkFJRmlCLEdBSkUsRUFJRztFQUNaLFlBQU15QixrQkFBa0I5ZCxTQUFTOEssYUFBVCxDQUF1QnNTLFVBQXZCLENBQXhCOztFQUVBLFlBQUksQ0FBQ2YsR0FBTCxFQUFVO0VBQ1J1QiwyQkFBaUJwZCxTQUFqQixDQUEyQjJLLE1BQTNCLENBQWtDZ1Msa0JBQWxDO0VBQ0FXLDBCQUFnQnBWLFNBQWhCLEdBQTRCLEVBQTVCO0VBQ0QsU0FIRCxNQUdPO0VBQ0xrViwyQkFBaUJwZCxTQUFqQixDQUEyQmlJLEdBQTNCLENBQStCMFUsa0JBQS9CO0VBQ0FXLDBCQUFnQnBWLFNBQWhCLEdBQTRCMlQsSUFBSUEsR0FBSixDQUFRM1QsU0FBcEM7RUFDRDtFQUNGO0VBZFUsS0FBYjtFQWdCRDs7RUFFRCxXQUFTcVYsZ0JBQVQsR0FBNEI7RUFDMUJGLGdCQUFRN2EsT0FBUjtFQUNEOztFQUVEO0VBQ0EsV0FBU0MsSUFBVCxHQUFnQjtFQUNkLFFBQU0yYSxtQkFBbUI1ZCxTQUFTOEssYUFBVCxDQUF1QmtTLGNBQXZCLENBQXpCO0VBQ0EsUUFBTW5OLGdCQUFnQitOLGlCQUFpQjlTLGFBQWpCLENBQStCd1MsY0FBL0IsQ0FBdEI7RUFDQSxRQUFNVSxXQUFXbmUsU0FBUzBkLGFBQVQsRUFBd0JLLGdCQUF4QixDQUFqQjs7RUFFQUgsZUFBV0csZ0JBQVg7RUFDQUQsa0JBQWNDLGdCQUFkOztFQUVBL04sa0JBQWNoTixnQkFBZCxDQUErQixPQUEvQixFQUF3QyxhQUFLO0VBQzNDK00seUJBQWlCQyxhQUFqQixFQUFnQyxFQUFFOVAsU0FBUzZkLGdCQUFYLEVBQWhDO0VBQ0FyYyxRQUFFYSxjQUFGO0VBQ0QsS0FIRDs7RUFLQTRiLGFBQVNyYixPQUFULENBQWlCO0VBQUEsYUFDZnNiLEtBQUtwYixnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFNO0VBQ25DK00sMkJBQWlCQyxhQUFqQixFQUFnQztFQUM5QjlQLG1CQUFTNmQsZ0JBRHFCO0VBRTlCOU4sc0JBQVk7RUFGa0IsU0FBaEM7RUFJRCxPQUxELENBRGU7RUFBQSxLQUFqQjtFQVFEOztFQUVEO0VBQ0EsV0FBUzlNLE9BQVQsR0FBbUI7RUFDakIrYTtFQUNBTDtFQUNEOztFQUVEemE7O0VBRUE7RUFDQSxTQUFPO0VBQ0xBLGNBREs7RUFFTEQ7RUFGSyxHQUFQO0VBSUQsQ0EzRk07O0VDVFAsSUFBTWtiLFVBQVUsU0FBVkEsT0FBVSxDQUFDelEsSUFBRCxFQUFPMFEsSUFBUDtFQUFBLFNBQWdCLGFBQUs7RUFDbkMsUUFBSTFRLFFBQVFBLEtBQUt5QyxZQUFMLENBQWtCLGVBQWxCLENBQVosRUFBZ0Q7RUFDOUMsVUFBTWtPLFdBQVczUSxLQUFLM00sWUFBTCxDQUFrQixlQUFsQixDQUFqQjtFQUNBLFVBQUlzZCxhQUFhLEVBQWIsSUFBbUJBLGFBQWEsTUFBcEMsRUFBNEM7RUFDMUM3YyxVQUFFYSxjQUFGOztFQUVBd04sMkJBQWlCbkMsSUFBakIsRUFBdUI7RUFDckIxTixtQkFBU29lLElBRFk7RUFFckJwTyx5QkFBZTtFQUZNLFNBQXZCO0VBSUQ7RUFDRjtFQUNGLEdBWmU7RUFBQSxDQUFoQjs7RUFjQSxJQUFNc08sWUFBWSxTQUFaQSxTQUFZLENBQUM1USxJQUFELEVBQU8wUSxJQUFQO0VBQUEsU0FBZ0IsYUFBSztFQUNyQyxRQUFNRyxhQUFhN1EsS0FBS3hELGFBQXhCO0VBQ0EsUUFBTXNVLGtCQUNKRCxXQUFXRSxzQkFBWCxJQUNBRixXQUFXclUsYUFBWCxDQUF5QndVLGdCQUYzQjtFQUdBLFFBQU1DLGNBQ0pKLFdBQVdLLGtCQUFYLElBQWlDTCxXQUFXclUsYUFBWCxDQUF5QjJVLGlCQUQ1RDs7RUFHQTtFQUNBLFFBQUlyZCxFQUFFSyxPQUFGLElBQWFMLEVBQUVNLE1BQW5CLEVBQTJCOztFQUUzQjtFQUNBO0VBQ0EsWUFBUU4sRUFBRVksT0FBVjtFQUNFO0VBQ0EsV0FBSyxFQUFMO0VBQ0EsV0FBSyxFQUFMO0VBQ0UrYixnQkFBUTNjLEVBQUVDLGFBQVYsRUFBeUIyYyxJQUF6QixFQUErQjVjLENBQS9CO0VBQ0E7RUFDRjtFQUNBLFdBQUssRUFBTDtFQUNBLFdBQUssRUFBTDtFQUNFQSxVQUFFYSxjQUFGO0VBQ0FtYyx3QkFBZ0J6VCxhQUFoQixDQUE4QixHQUE5QixFQUFtQ3pKLEtBQW5DO0VBQ0E7RUFDRjtFQUNBLFdBQUssRUFBTDtFQUNBLFdBQUssRUFBTDtFQUNFRSxVQUFFYSxjQUFGO0VBQ0FzYyxvQkFBWTVULGFBQVosQ0FBMEIsR0FBMUIsRUFBK0J6SixLQUEvQjtFQUNBO0VBQ0Y7RUFDRTtFQW5CSjtFQXFCRCxHQWxDaUI7RUFBQSxDQUFsQjs7QUFvQ0EsTUFBYXdkLFdBQVcsU0FBWEEsUUFBVyxHQUtiO0VBQUEsaUZBQVAsRUFBTztFQUFBLDJCQUpUL2UsUUFJUztFQUFBLE1BSkNBLFFBSUQsaUNBSlksc0JBSVo7RUFBQSxpQ0FIVHdkLGNBR1M7RUFBQSxNQUhPQSxjQUdQLHVDQUh3Qiw4QkFHeEI7RUFBQSwrQkFGVHBMLFlBRVM7RUFBQSxNQUZLQSxZQUVMLHFDQUZvQiw0QkFFcEI7RUFBQSwrQkFEVDRNLFlBQ1M7RUFBQSxNQURLQSxZQUNMLHFDQURvQiw0QkFDcEI7O0VBQ1QsTUFBTUMsaUJBQWlCbGYsU0FBU0MsUUFBVCxDQUF2Qjs7RUFFQWlmLGlCQUFlcGMsT0FBZixDQUF1QixnQkFBUTtFQUM3QjtFQUNBLFFBQU0yUCxTQUFTNkwsS0FBS3JULGFBQUwsQ0FBbUJ3UyxjQUFuQixDQUFmO0VBQ0EsUUFBSWhMLE1BQUosRUFBWTtFQUNWQSxhQUFPelAsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUM7RUFBQSxlQUMvQitNLG1CQUFpQjBDLE1BQWpCLEVBQXlCLEVBQUV2UyxTQUFTb2UsSUFBWCxFQUF6QixDQUQrQjtFQUFBLE9BQWpDO0VBR0Q7O0VBRUQ7RUFDQSxRQUFNdFQsT0FBT3NULEtBQUtyVCxhQUFMLENBQW1Cb0gsWUFBbkIsQ0FBYjs7RUFFQTtFQUNBLFFBQU0xRSxhQUFhM04sU0FBU2lmLFlBQVQsRUFBdUJqVSxJQUF2QixDQUFuQjs7RUFFQTJDLGVBQVc3SyxPQUFYLENBQW1CLGdCQUFRO0VBQ3pCOEssV0FBSzVLLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCcWIsUUFBUXpRLElBQVIsRUFBYzVDLElBQWQsQ0FBL0I7RUFDQTRDLFdBQUs1SyxnQkFBTCxDQUFzQixTQUF0QixFQUFpQ3diLFVBQVU1USxJQUFWLEVBQWdCNUMsSUFBaEIsQ0FBakM7RUFDRCxLQUhEO0VBSUQsR0FuQkQ7RUFvQkQsQ0E1Qk07O0VDckRQOzs7Ozs7O0VBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcURBLElBQUltVTtFQUNKO0VBQ0EsWUFBWTtFQUNWLFdBQVNBLFVBQVQsQ0FBb0JyZSxNQUFwQixFQUE0QnNlLEdBQTVCLEVBQWlDO0VBQy9CLFFBQUkxRSxJQUFJLE9BQU8wRSxHQUFQLEtBQWUsV0FBZixHQUE2QkEsR0FBN0IsR0FBbUMsRUFBM0M7RUFDQSxTQUFLQyxPQUFMLEdBQWUsT0FBZjtFQUNBLFNBQUtDLFNBQUwsR0FBaUI3ZSxPQUFPOGUsU0FBUCxDQUFpQkQsU0FBakIsSUFBOEIsd0NBQS9DO0VBQ0EsU0FBS2xNLEtBQUwsR0FBYTtFQUNYb00sZ0NBQTBCOUUsRUFBRThFLHdCQUFGLElBQThCLElBRDdDO0VBRVhDLGdCQUFVL0UsRUFBRStFLFFBQUYsSUFBYyxLQUZiO0VBR1hDLDZCQUF1QmhGLEVBQUVnRixxQkFBRixJQUEyQixDQUh2QztFQUlYQyxtQkFBYWpGLEVBQUVpRixXQUFGLElBQWlCLHFCQUpuQjtFQUtYQyxnQkFBVXpmLFNBQVM4SyxhQUFULENBQXVCeVAsRUFBRWtGLFFBQXpCLEtBQXNDbmYsTUFMckM7RUFNWG9mLG1CQUFhbkYsRUFBRW1GLFdBQUYsSUFBaUIsY0FObkI7RUFPWEMsa0JBQVlwRixFQUFFb0YsVUFBRixJQUFnQixhQVBqQjtFQVFYQyx5QkFBbUJyRixFQUFFcUYsaUJBQUYsSUFBdUIsc0JBUi9CO0VBU1hDLHdCQUFrQnRGLEVBQUVzRixnQkFBRixJQUFzQixLQVQ3QjtFQVVYQyx3QkFBa0J2RixFQUFFdUYsZ0JBQUYsSUFBc0I7RUFWN0IsS0FBYjtFQVlBLFFBQUlsRSxJQUFJLEtBQUszSSxLQUFiO0VBQ0E7Ozs7Ozs7RUFPQTJJLE1BQUVtRSxXQUFGLEdBQWdCLEtBQUtDLGNBQUwsTUFBeUIsT0FBekM7RUFDQSxRQUFJQyxLQUFLckUsRUFBRWtFLGdCQUFYO0VBQ0EsUUFBSUksS0FBS3RFLEVBQUUwRCxRQUFYO0VBQ0EsUUFBSWEsS0FBS3ZFLEVBQUVtRSxXQUFYO0VBQ0EsU0FBS0ssR0FBTCxHQUFXLE9BQU96ZixNQUFQLEtBQWtCLFFBQWxCLEdBQTZCWCxTQUFTRyxnQkFBVCxDQUEwQlEsTUFBMUIsQ0FBN0IsR0FBaUVBLE1BQTVFO0VBQ0EsUUFBSSxFQUFFLFlBQVksS0FBS3lmLEdBQW5CLENBQUosRUFBNkIsS0FBS0EsR0FBTCxHQUFXLENBQUMsS0FBS0EsR0FBTixDQUFYO0VBQzdCLFNBQUtDLFNBQUwsR0FBaUIsRUFBakI7O0VBRUEsU0FBSyxJQUFJamYsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtnZixHQUFMLENBQVM5ZCxNQUE3QixFQUFxQ2xCLEtBQUssQ0FBMUMsRUFBNkM7RUFDM0MsVUFBSWtmLEtBQUssS0FBS0YsR0FBTCxDQUFTaGYsQ0FBVCxDQUFUO0VBQ0EsVUFBSXlWLFNBQVN5SixHQUFHL1UsS0FBaEIsQ0FGMkM7O0VBSTNDc0wsYUFBT29KLEVBQVAsSUFBYUEsT0FBTyxLQUFQLElBQWdCLENBQUNDLEVBQWpCLEdBQXNCdEUsRUFBRTJELHFCQUFGLEdBQTBCLElBQWhELEdBQXVELEVBQXBFO0VBQ0ExSSxhQUFPM0MsUUFBUCxHQUFrQmlNLE9BQU8sT0FBUCxHQUFpQkEsRUFBakIsR0FBc0IsRUFBeEM7O0VBRUEsVUFBSUEsT0FBTyxPQUFQLElBQWtCdkUsRUFBRWlFLGdCQUF4QixFQUEwQztFQUN4QyxZQUFJak0sV0FBVyxLQUFLMk0sV0FBTCxDQUFpQkQsRUFBakIsRUFBcUIxRSxDQUFyQixDQUFmLENBRHdDOztFQUd4QyxhQUFLeUUsU0FBTCxDQUFlMUssSUFBZixDQUFvQi9CLFFBQXBCO0VBQ0Q7RUFDRjs7RUFFRCxXQUFPLElBQVA7RUFDRDtFQUNEOzs7Ozs7Ozs7RUFVQSxNQUFJNE0sU0FBU3hCLFdBQVc1YSxTQUF4Qjs7RUFFQW9jLFNBQU9SLGNBQVAsR0FBd0IsU0FBU0EsY0FBVCxHQUEwQjtFQUNoRCxRQUFJL0wsU0FBUyxDQUFDLEVBQUQsRUFBSyxLQUFMLEVBQVksVUFBWixFQUF3QixPQUF4QixFQUFpQyxNQUFqQyxDQUFiO0VBQ0EsUUFBSXRNLE9BQU8zSCxTQUFTeWdCLElBQVQsQ0FBY2xWLEtBQXpCOztFQUVBLFNBQUssSUFBSW5LLElBQUksQ0FBYixFQUFnQkEsSUFBSTZTLE9BQU8zUixNQUEzQixFQUFtQ2xCLEtBQUssQ0FBeEMsRUFBMkM7RUFDekN1RyxXQUFLdU0sUUFBTCxHQUFnQkQsT0FBTzdTLENBQVAsSUFBWSxRQUE1QjtFQUNEOztFQUVELFFBQUlzZixhQUFhL1ksS0FBS3VNLFFBQUwsR0FBZ0J2TSxLQUFLdU0sUUFBckIsR0FBZ0MsT0FBakQ7RUFDQXZNLFNBQUt1TSxRQUFMLEdBQWdCLEVBQWhCO0VBQ0EsV0FBT3dNLFVBQVA7RUFDRCxHQVhEO0VBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEwQkFGLFNBQU9ELFdBQVAsR0FBcUIsU0FBU0EsV0FBVCxDQUFxQkQsRUFBckIsRUFBeUJyTixLQUF6QixFQUFnQztFQUNuRCxRQUFJeUYsUUFBUSxJQUFaOztFQUVBLFFBQUlpSSxPQUFPO0VBQ1RMLFVBQUlBLEVBREs7RUFFVGhFLGNBQVFnRSxHQUFHdmUsVUFGRjtFQUdUa1IsYUFBT0E7RUFIRSxLQUFYO0VBS0EsU0FBSzJOLEtBQUwsR0FBYSxLQUFLM04sS0FBTCxDQUFXd00sUUFBWCxLQUF3Qm5mLE1BQXJDO0VBQ0EsUUFBSXVnQixLQUFLLEtBQUtELEtBQUwsR0FBYXRnQixNQUFiLEdBQXNCLEtBQUt3Z0IsZ0JBQUwsQ0FBc0JILEtBQUtMLEVBQTNCLEVBQStCSyxLQUFLMU4sS0FBTCxDQUFXd00sUUFBMUMsQ0FBL0I7RUFDQSxTQUFLc0Isb0JBQUwsQ0FBMEJKLElBQTFCO0VBQ0FBLFNBQUtyRSxNQUFMLENBQVkvUCxTQUFaLElBQXlCLE1BQU0wRyxNQUFNdU0sV0FBckM7RUFDQW1CLFNBQUtLLEtBQUwsR0FBYSxTQUFiOztFQUVBTCxTQUFLTSxjQUFMLEdBQXNCLFlBQVk7RUFDaEMsYUFBT3ZJLE1BQU13SSxXQUFOLENBQWtCUCxJQUFsQixDQUFQO0VBQ0QsS0FGRDs7RUFJQUUsT0FBR2hlLGdCQUFILENBQW9CLFFBQXBCLEVBQThCOGQsS0FBS00sY0FBbkM7RUFDQSxXQUFPTixJQUFQO0VBQ0QsR0FwQkQ7RUFxQkE7Ozs7Ozs7OztFQVVBSCxTQUFPTSxnQkFBUCxHQUEwQixTQUFTQSxnQkFBVCxDQUEwQlIsRUFBMUIsRUFBOEJhLEtBQTlCLEVBQXFDO0VBQzdEO0VBQ0EsUUFBSXZGLElBQUl1RixLQUFSO0VBQ0EsUUFBSTVmLElBQUkrZSxFQUFSO0VBQ0EsUUFBSS9lLEVBQUUwSSxhQUFGLEtBQW9CMlIsQ0FBeEIsRUFBMkIsT0FBT0EsQ0FBUCxDQUprQzs7RUFNN0QsV0FBT3JhLEVBQUUwSSxhQUFGLEtBQW9CMlIsQ0FBM0IsRUFBOEI7RUFDNUJyYSxVQUFJQSxFQUFFMEksYUFBTjtFQUNELEtBUjREOzs7RUFXN0QsV0FBTzJSLENBQVA7RUFDRCxHQVpEO0VBYUE7Ozs7Ozs7O0VBU0E0RSxTQUFPWSxZQUFQLEdBQXNCLFNBQVNBLFlBQVQsQ0FBc0JkLEVBQXRCLEVBQTBCO0VBQzlDLFFBQUlwTCxZQUFZLENBQWhCOztFQUVBLE9BQUc7RUFDREEsa0JBQVlvTCxHQUFHcEwsU0FBSCxHQUFlQSxTQUEzQjtFQUNELEtBRkQsUUFFU29MLEtBQUtBLEdBQUduTCxZQUZqQjs7RUFJQSxXQUFPRCxTQUFQO0VBQ0QsR0FSRDtFQVNBOzs7Ozs7Ozs7O0VBV0FzTCxTQUFPTyxvQkFBUCxHQUE4QixTQUFTQSxvQkFBVCxDQUE4QkosSUFBOUIsRUFBb0M7RUFDaEUsUUFBSVUsS0FBS1YsSUFBVDtFQUNBLFFBQUkvRSxJQUFJeUYsR0FBR3BPLEtBQVg7RUFDQSxRQUFJcU4sS0FBS2UsR0FBR2YsRUFBWjtFQUNBLFFBQUloRSxTQUFTK0UsR0FBRy9FLE1BQWhCO0VBQ0EsUUFBSWdGLFdBQVcsQ0FBQyxLQUFLVixLQUFOLElBQWVoRixFQUFFbUUsV0FBRixLQUFrQixPQUFoRDtFQUNBLFFBQUl3QixXQUFXM0YsRUFBRWtFLGdCQUFGLEtBQXVCLFFBQXRDO0VBQ0EsUUFBSTBCLGlCQUFpQkYsV0FBVyxLQUFLRixZQUFMLENBQWtCeEYsRUFBRTZELFFBQXBCLENBQVgsR0FBMkMsQ0FBaEU7RUFDQSxRQUFJZ0MsY0FBY0gsV0FBVyxLQUFLRixZQUFMLENBQWtCOUUsTUFBbEIsSUFBNEJrRixjQUF2QyxHQUF3RCxLQUFLSixZQUFMLENBQWtCOUUsTUFBbEIsQ0FBMUU7RUFDQSxRQUFJb0YscUJBQXFCOUYsRUFBRXlELHdCQUFGLEtBQStCLElBQS9CLEdBQXNDekQsRUFBRXlELHdCQUF4QyxHQUFtRWlCLEdBQUd4SixZQUEvRjtFQUNBdUssT0FBR3BHLE1BQUgsR0FBWXVHLGlCQUFpQjVGLEVBQUUyRCxxQkFBL0I7RUFDQThCLE9BQUdJLFdBQUgsR0FBaUJGLFdBQVdFLGNBQWNKLEdBQUdwRyxNQUE1QixHQUFxQyxDQUF0RDtFQUNBb0csT0FBR00sWUFBSCxHQUFrQk4sR0FBR0ksV0FBSCxHQUFpQkMsa0JBQW5DO0VBQ0FMLE9BQUdPLFVBQUgsR0FBZ0JMLFdBQVdFLGNBQWNuRixPQUFPeEYsWUFBckIsSUFBcUN1SyxHQUFHZixFQUFILENBQU14SixZQUFOLEdBQXFCdUssR0FBR3BHLE1BQTdELENBQVgsR0FBa0Z3RyxjQUFjbkYsT0FBT3hGLFlBQXZIO0VBQ0EsV0FBT3VLLEVBQVA7RUFDRCxHQWZEO0VBZ0JBOzs7Ozs7OztFQVNBYixTQUFPcUIsYUFBUCxHQUF1QixTQUFTQSxhQUFULENBQXVCdkIsRUFBdkIsRUFBMkI5RixDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUM7RUFDdEQsUUFBSWxaLElBQUkrZSxFQUFSO0VBQ0EsUUFBSXdCLFNBQVN2Z0IsRUFBRWdMLFNBQUYsQ0FBWXdWLEtBQVosQ0FBa0IsR0FBbEIsQ0FBYjtFQUNBLFFBQUl0SCxLQUFLcUgsT0FBTzVmLE9BQVAsQ0FBZXVZLENBQWYsTUFBc0IsQ0FBQyxDQUFoQyxFQUFtQ3FILE9BQU9uTSxJQUFQLENBQVk4RSxDQUFaO0VBQ25DLFFBQUl1SCxRQUFRRixPQUFPNWYsT0FBUCxDQUFlc1ksQ0FBZixDQUFaO0VBQ0EsUUFBSXdILFVBQVUsQ0FBQyxDQUFmLEVBQWtCRixPQUFPakosTUFBUCxDQUFjbUosS0FBZCxFQUFxQixDQUFyQjtFQUNsQnpnQixNQUFFZ0wsU0FBRixHQUFjdVYsT0FBT0csSUFBUCxDQUFZLEdBQVosQ0FBZDtFQUNELEdBUEQ7RUFRQTs7Ozs7Ozs7O0VBVUF6QixTQUFPVSxXQUFQLEdBQXFCLFNBQVNBLFdBQVQsQ0FBcUJQLElBQXJCLEVBQTJCO0VBQzlDO0VBQ0EsUUFBSVUsS0FBS1YsSUFBVDtFQUNBLFFBQUlwZixJQUFJOGYsR0FBR2YsRUFBWDtFQUNBLFFBQUkxRSxJQUFJeUYsR0FBR3BPLEtBQVg7RUFDQSxRQUFJK04sUUFBUUssR0FBR0wsS0FBZjtFQUNBLFFBQUl0SixRQUFRMkosR0FBR0ksV0FBZjtFQUNBLFFBQUlTLFNBQVNiLEdBQUdNLFlBQWhCO0VBQ0EsUUFBSVEsT0FBT2QsR0FBR08sVUFBZDtFQUNBLFFBQUlRLE1BQU03Z0IsRUFBRWdLLEtBQVosQ0FUOEM7O0VBVzlDLFFBQUkyVSxLQUFLdEUsRUFBRTBELFFBQVg7RUFDQSxRQUFJYSxLQUFLdkUsRUFBRW1FLFdBQVg7RUFDQSxRQUFJYyxLQUFLakYsRUFBRTZELFFBQVg7RUFDQSxRQUFJbEssU0FBU3FHLEVBQUU4RCxXQUFmO0VBQ0EsUUFBSWlDLGVBQWUvRixFQUFFZ0UsaUJBQXJCO0VBQ0EsUUFBSXlDLFFBQVF6RyxFQUFFK0QsVUFBZDtFQUNBLFFBQUlNLEtBQUtyRSxFQUFFa0UsZ0JBQVg7RUFDQTs7Ozs7OztFQU9BLFFBQUl3QyxVQUFVLFNBQVNDLFFBQVQsQ0FBa0J6SCxDQUFsQixFQUFxQjtFQUNqQ0E7RUFDRCxLQUZEOztFQUlBLFFBQUkwSCxNQUFNLENBQUMsS0FBSzVCLEtBQU4sR0FBYzBCLE9BQWQsR0FBd0JoaUIsT0FBT21pQixxQkFBUCxJQUFnQ25pQixPQUFPb2lCLHdCQUF2QyxJQUFtRXBpQixPQUFPcWlCLDJCQUExRSxJQUF5R3JpQixPQUFPc2lCLHVCQUFoSCxJQUEySU4sT0FBN0s7RUFDQTs7Ozs7Ozs7O0VBU0EsUUFBSU8sS0FBSyxLQUFLaEIsYUFBZDtFQUNBLFFBQUl4TixTQUFTLEtBQUt1TSxLQUFMLEdBQWF0Z0IsT0FBT3dpQixPQUFQLElBQWtCeGlCLE9BQU9xWCxXQUF0QyxHQUFvRGtKLEdBQUdrQyxTQUFwRTtFQUNBLFFBQUlDLFlBQVkzTyxTQUFTcUQsS0FBVCxJQUFrQnJELFNBQVM4TixJQUEzQixLQUFvQ25CLFVBQVUsU0FBVixJQUF1QkEsVUFBVSxPQUFyRSxDQUFoQjtFQUNBLFFBQUlpQyxXQUFXNU8sVUFBVXFELEtBQVYsSUFBbUJzSixVQUFVLFFBQTVDO0VBQ0EsUUFBSWtDLFVBQVU3TyxVQUFVOE4sSUFBVixJQUFrQm5CLFVBQVUsUUFBMUM7RUFDQTs7Ozs7Ozs7RUFRQSxRQUFJZ0MsU0FBSixFQUFlO0VBQ2IzQixTQUFHTCxLQUFILEdBQVcsUUFBWDtFQUNBd0IsVUFBSSxZQUFZO0VBQ2RLLFdBQUd0aEIsQ0FBSCxFQUFNOGdCLEtBQU4sRUFBYTlNLE1BQWI7RUFDQTZNLFlBQUlsTyxRQUFKLEdBQWVpTSxFQUFmO0VBQ0EsWUFBSUQsRUFBSixFQUFRO0VBQ1JrQyxZQUFJN0ssTUFBSixHQUFhLEVBQWI7RUFDQTZLLFlBQUluQyxFQUFKLElBQVVyRSxFQUFFMkQscUJBQUYsR0FBMEIsSUFBcEM7RUFDRCxPQU5EO0VBT0QsS0FURCxNQVNPLElBQUkwRCxRQUFKLEVBQWM7RUFDbkI1QixTQUFHTCxLQUFILEdBQVcsU0FBWDtFQUNBd0IsVUFBSSxZQUFZO0VBQ2RLLFdBQUd0aEIsQ0FBSCxFQUFNZ1UsTUFBTjtFQUNBLFlBQUk0SyxPQUFPLE9BQVgsRUFBb0JpQyxJQUFJbE8sUUFBSixHQUFlLEVBQWY7RUFDckIsT0FIRDtFQUlELEtBTk0sTUFNQSxJQUFJZ1AsT0FBSixFQUFhO0VBQ2xCN0IsU0FBR0wsS0FBSCxHQUFXLE9BQVg7RUFDQXdCLFVBQUksWUFBWTtFQUNkSyxXQUFHdGhCLENBQUgsRUFBTWdVLE1BQU4sRUFBYzhNLEtBQWQ7RUFDQSxZQUFJbEMsT0FBTyxPQUFQLElBQWtCRCxFQUF0QixFQUEwQjtFQUMxQmtDLFlBQUk5TixHQUFKLEdBQVUsRUFBVjtFQUNBOE4sWUFBSTdLLE1BQUosR0FBYSxHQUFiO0VBQ0E2SyxZQUFJbE8sUUFBSixHQUFlLFVBQWY7RUFDRCxPQU5EO0VBT0Q7O0VBRUQsUUFBSWlQLGlCQUFpQjlPLFVBQVU2TixNQUFWLElBQW9CN04sVUFBVThOLElBQW5EO0VBQ0EsUUFBSWlCLG9CQUFvQi9PLFNBQVM2TixNQUFULElBQW1CN04sU0FBUzhOLElBQXBEO0VBQ0EsUUFBSWtCLE9BQU8sTUFBWCxDQWhGOEM7O0VBa0Y5QyxRQUFJRCxpQkFBSixFQUF1QjtFQUNyQlosVUFBSSxZQUFZO0VBQ2RLLFdBQUd0aEIsQ0FBSCxFQUFNb2dCLFlBQU47RUFDRCxPQUZEO0VBR0QsS0FKRCxNQUlPLElBQUl3QixjQUFKLEVBQW9CO0VBQ3pCWCxVQUFJLFlBQVk7RUFDZEssV0FBR3RoQixDQUFILEVBQU04aEIsSUFBTixFQUFZMUIsWUFBWjtFQUNELE9BRkQ7RUFHRDs7RUFFRCxXQUFPTixFQUFQO0VBQ0QsR0E3RkQ7O0VBK0ZBYixTQUFPOEMsTUFBUCxHQUFnQixTQUFTQSxNQUFULEdBQWtCO0VBQ2hDLFNBQUssSUFBSWxpQixJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS2lmLFNBQUwsQ0FBZS9kLE1BQW5DLEVBQTJDbEIsS0FBSyxDQUFoRCxFQUFtRDtFQUNqRCxVQUFJd1MsV0FBVyxLQUFLeU0sU0FBTCxDQUFlamYsQ0FBZixDQUFmO0VBQ0EsV0FBSzJmLG9CQUFMLENBQTBCbk4sUUFBMUI7RUFDRDs7RUFFRCxXQUFPLElBQVA7RUFDRCxHQVBEO0VBUUE7Ozs7OztFQU9BNE0sU0FBTytDLGNBQVAsR0FBd0IsU0FBU0EsY0FBVCxDQUF3QjNQLFFBQXhCLEVBQWtDO0VBQ3hELFFBQUlyUyxJQUFJcVMsU0FBUzBNLEVBQWpCO0VBQ0EsUUFBSTFFLElBQUloSSxTQUFTWCxLQUFqQjtFQUNBLFFBQUk0UCxLQUFLLEtBQUtoQixhQUFkO0VBQ0F0Z0IsTUFBRWdLLEtBQUYsQ0FBUTJJLFFBQVIsR0FBbUIsRUFBbkI7RUFDQTNTLE1BQUVnSyxLQUFGLENBQVFxUSxFQUFFa0UsZ0JBQVYsSUFBOEIsRUFBOUI7RUFDQStDLE9BQUd0aEIsQ0FBSCxFQUFNcWEsRUFBRThELFdBQVI7RUFDQW1ELE9BQUd0aEIsQ0FBSCxFQUFNcWEsRUFBRStELFVBQVI7RUFDQWtELE9BQUd0aEIsRUFBRVEsVUFBTCxFQUFpQjZaLEVBQUU0RCxXQUFuQjtFQUNELEdBVEQ7RUFVQTs7Ozs7OztFQVFBZ0IsU0FBT2dELE9BQVAsR0FBaUIsU0FBU0EsT0FBVCxHQUFtQjtFQUNsQyxTQUFLLElBQUlwaUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtpZixTQUFMLENBQWUvZCxNQUFuQyxFQUEyQ2xCLEtBQUssQ0FBaEQsRUFBbUQ7RUFDakQsVUFBSXdTLFdBQVcsS0FBS3lNLFNBQUwsQ0FBZWpmLENBQWYsQ0FBZjtFQUNBd1MsZUFBU1gsS0FBVCxDQUFld00sUUFBZixDQUF3QjFjLG1CQUF4QixDQUE0QyxRQUE1QyxFQUFzRDZRLFNBQVNxTixjQUEvRDtFQUNBLFdBQUtzQyxjQUFMLENBQW9CM1AsUUFBcEI7RUFDRDs7RUFFRCxTQUFLc04sV0FBTCxHQUFtQixLQUFuQjtFQUNBLFNBQUtiLFNBQUwsR0FBaUIsRUFBakI7RUFDRCxHQVREOztFQVdBLFNBQU9yQixVQUFQO0VBQ0QsQ0FuV0QsRUFGQTtFQXNXQTs7Ozs7O0VBT0EsU0FBU3lFLFVBQVQsQ0FBb0I5aUIsTUFBcEIsRUFBNEI0WixDQUE1QixFQUErQjtFQUM3QixTQUFPLElBQUl5RSxVQUFKLENBQWVyZSxNQUFmLEVBQXVCNFosQ0FBdkIsQ0FBUDtFQUNEOztFQzNhRDs7OztFQU1BOzs7QUFHQSxNQUFhbUosaUJBQWlCLFNBQWpCQSxjQUFpQixHQUduQjtFQUFBLGlGQUFQLEVBQU87RUFBQSxpQ0FGVDFHLGNBRVM7RUFBQSxNQUZPQSxjQUVQLHVDQUZ3Qiw4QkFFeEI7RUFBQSxpQ0FEVDJHLGNBQ1M7RUFBQSxNQURPQSxjQUNQLHVDQUR3QixvQ0FDeEI7O0VBQ1Q7RUFDQSxNQUNFLEVBQUUsbUJBQW1CM2pCLFFBQXJCLEtBQ0EsRUFBRSxzQkFBc0JNLE1BQXhCLENBREEsSUFFQSxDQUFDTixTQUFTTyxlQUFULENBQXlCQyxTQUg1QixFQUtFLE9BQU8sSUFBUDs7RUFFRjtFQUNBLFdBQVNpZCxVQUFULEdBQXNCO0VBQ3BCO0VBQ0E7RUFDQWdHLGVBQVd6RyxjQUFYLEVBQTJCLEVBQUU2QyxrQkFBa0IsSUFBcEIsRUFBM0I7RUFDRDs7RUFFRCxXQUFTK0QsV0FBVCxHQUF1QjtFQUNyQixRQUFNdFIsU0FBU3RTLFNBQVM4UyxzQkFBVCxDQUNia0ssZUFBZTZHLFNBQWYsQ0FBeUIsQ0FBekIsQ0FEYSxFQUViLENBRmEsQ0FBZjs7RUFJQSxRQUFJdlIsTUFBSixFQUFZO0VBQ1ZBLGFBQU96UCxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxhQUFLO0VBQ3BDLFlBQUl0QixFQUFFWixNQUFGLENBQVNHLFlBQVQsQ0FBc0IsZUFBdEIsTUFBMkMsT0FBL0MsRUFBd0Q7RUFDdERTLFlBQUVaLE1BQUYsQ0FBU21qQixjQUFUO0VBQ0Q7RUFDRixPQUpEO0VBS0Q7RUFDRjs7RUFFRCxXQUFTQyxjQUFULEdBQTBCO0VBQ3hCLFFBQU1DLFNBQVNoa0IsU0FBUzhTLHNCQUFULENBQ2I2USxlQUFlRSxTQUFmLENBQXlCLENBQXpCLENBRGEsRUFFYixDQUZhLENBQWY7O0VBSUE7RUFDQSxRQUFJRyxNQUFKLEVBQVk7RUFDVixVQUFJdlcsT0FBT3VXLE1BQVg7QUFDQSxFQUNBLGFBQU92VyxJQUFQLEVBQWE7QUFDWDJTLEVBQ0EzUyxlQUFPQSxLQUFLMUwsVUFBWjs7RUFFQTtFQUNBLFlBQUkwTCxLQUFLd1csT0FBTCxDQUFhLDZCQUFiLENBQUosRUFBaUQ7RUFDL0MsY0FBTWhHLE9BQU94USxLQUFLK1Esc0JBQWxCO0VBQ0EsY0FBSVAsS0FBS2dHLE9BQUwsQ0FBYSw0QkFBYixDQUFKLEVBQWdEO0VBQzlDaEcsaUJBQUtsZCxZQUFMLENBQWtCLGVBQWxCLEVBQW1DLE1BQW5DO0VBQ0Q7RUFDRjs7RUFFRDtFQUNBLFlBQUkwTSxLQUFLd1csT0FBTCxDQUFhLHNCQUFiLENBQUosRUFBMEM7RUFDeEM7RUFDRDtFQUNGO0VBQ0Y7RUFDRjs7RUFFRDtFQUNBLFdBQVNoaEIsSUFBVCxHQUFnQjtFQUNkd2E7RUFDQW1HO0VBQ0FHO0VBQ0Q7O0VBRUQ5Z0I7O0VBRUE7RUFDQSxTQUFPO0VBQ0xBO0VBREssR0FBUDtFQUdELENBM0VNOztFQ1RQOzs7O0VBSUE7O0FBRUEsRUFBTyxTQUFTaWhCLFNBQVQsR0FBb0M7RUFBQSxNQUFqQnhVLFFBQWlCLHVFQUFOLElBQU07O0VBQ3pDLE1BQU15VSxTQUNKelUsWUFBWTFQLFNBQVM4UyxzQkFBVCxDQUFnQyx1QkFBaEMsQ0FEZDtFQUVBLEtBQUduUSxPQUFILENBQVd6QyxJQUFYLENBQWdCaWtCLE1BQWhCLEVBQXdCLGlCQUFTO0VBQy9CLFFBQU1DLGFBQWEsRUFBbkI7RUFDQSxRQUFJQyxjQUFjLEVBQWxCO0VBQ0EsUUFBSUMsS0FBSyxDQUFUO0VBQ0EsUUFBSUMsS0FBSyxFQUFUOztFQUVBO0VBQ0EsUUFBTUMsWUFBWUMsTUFBTXRrQixnQkFBTixDQUF1QixVQUF2QixDQUFsQjs7RUFFQTtFQUNBLFFBQU11a0IsVUFBVUQsTUFBTXRrQixnQkFBTixDQUF1QixhQUF2QixDQUFoQjs7RUFFQTtFQUNBLFFBQU13a0IsWUFDSkYsTUFBTXRrQixnQkFBTixDQUF1QixVQUF2QixFQUFtQyxDQUFuQyxFQUFzQ0EsZ0JBQXRDLENBQXVELElBQXZELEVBQTZEbUMsTUFBN0QsR0FBc0UsQ0FEeEU7O0VBR0E7RUFDQSxRQUFNc2lCLGFBQWFILE1BQ2hCdGtCLGdCQURnQixDQUNDLFVBREQsRUFDYSxDQURiLEVBRWhCQSxnQkFGZ0IsQ0FFQyxJQUZELEVBRU9tQyxNQUYxQjs7RUFJQTtFQUNBLFFBQUl1aUIsZUFBZSxDQUFDLENBQXBCOztFQUVBO0VBQ0E7RUFDQSxTQUFLLElBQUl6akIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJc2pCLFFBQVFwaUIsTUFBNUIsRUFBb0NsQixLQUFLLENBQXpDLEVBQTRDO0VBQzFDLFVBQUlzakIsUUFBUXRqQixDQUFSLEVBQVdOLFlBQVgsQ0FBd0IsU0FBeEIsQ0FBSixFQUF3QztFQUN0QytqQix1QkFBZXpqQixDQUFmO0VBQ0Q7O0VBRURnakIsaUJBQVdoakIsQ0FBWCxJQUFnQixFQUFoQjtFQUNBZ2pCLGlCQUFXaGpCLENBQVgsSUFBZ0JzakIsUUFBUXRqQixDQUFSLEVBQVcwSyxXQUEzQjtFQUNEOztFQUVEO0VBQ0EsUUFBSStZLGlCQUFpQixDQUFDLENBQXRCLEVBQXlCO0VBQ3ZCUixvQkFBY0QsV0FBV3ZMLE1BQVgsQ0FBa0JnTSxZQUFsQixFQUFnQyxDQUFoQyxDQUFkO0VBQ0FQLFdBQUtPLFlBQUw7RUFDQU4sV0FBS0UsTUFBTXRrQixnQkFBTixDQUF1QixhQUF2QixFQUFzQyxDQUF0QyxFQUF5Q1csWUFBekMsQ0FBc0QsU0FBdEQsQ0FBTDs7RUFFQSxXQUFLLElBQUk0WixJQUFJLENBQWIsRUFBZ0JBLElBQUk2SixFQUFwQixFQUF3QjdKLEtBQUssQ0FBN0IsRUFBZ0M7RUFDOUIwSixtQkFBV3ZMLE1BQVgsQ0FBa0J5TCxLQUFLNUosQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIwSixXQUFXTyxZQUFZakssQ0FBdkIsQ0FBN0I7RUFDQTBKLG1CQUFXdkwsTUFBWCxDQUFrQjhMLFlBQVksQ0FBWixHQUFnQmpLLENBQWxDLEVBQXFDLENBQXJDO0VBQ0Q7RUFDRjs7RUFFRDtFQUNBLE9BQUcvWCxPQUFILENBQVd6QyxJQUFYLENBQWdCc2tCLFNBQWhCLEVBQTJCLGVBQU87RUFDaEMsV0FBSyxJQUFJM0gsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK0gsVUFBcEIsRUFBZ0MvSCxLQUFLLENBQXJDLEVBQXdDO0VBQ3RDLFlBQUl1SCxXQUFXdkgsQ0FBWCxNQUFrQixFQUFsQixJQUF3QnVILFdBQVd2SCxDQUFYLE1BQWtCLE1BQTlDLEVBQXdEO0VBQ3REaUksY0FDRzNrQixnQkFESCxDQUNvQixJQURwQixFQUVHMGMsQ0FGSCxFQUVNOWIsWUFGTixDQUVtQixPQUZuQixFQUU0QixvQkFGNUI7RUFHRCxTQUpELE1BSU87RUFDTCtqQixjQUFJM2tCLGdCQUFKLENBQXFCLElBQXJCLEVBQTJCMGMsQ0FBM0IsRUFBOEI5YixZQUE5QixDQUEyQyxTQUEzQyxFQUFzRHFqQixXQUFXdkgsQ0FBWCxDQUF0RDtFQUNEOztFQUVELFlBQUlnSSxpQkFBaUIsQ0FBQyxDQUF0QixFQUF5QjtFQUN2QixjQUFNRSxPQUFPRCxJQUFJM2tCLGdCQUFKLENBQXFCLElBQXJCLEVBQTJCMGtCLFlBQTNCLENBQWI7RUFDQUUsZUFBS2hrQixZQUFMLENBQWtCLE9BQWxCLEVBQTJCLHdCQUEzQjtFQUNBZ2tCLGVBQUtoa0IsWUFBTCxDQUFrQixlQUFsQixFQUFtQ3NqQixXQUFuQzs7RUFFQSxlQUFLLElBQUkzSixLQUFJLENBQWIsRUFBZ0JBLEtBQUk2SixFQUFwQixFQUF3QjdKLE1BQUssQ0FBN0IsRUFBZ0M7RUFDOUJvSyxnQkFDRzNrQixnQkFESCxDQUNvQixJQURwQixFQUVHMGtCLGVBQWVuSyxFQUZsQixFQUVxQjNaLFlBRnJCLENBR0ksT0FISixFQUlJLDBCQUpKO0VBTUQ7RUFDRjtFQUNGO0VBQ0YsS0F6QkQ7RUEwQkQsR0ExRUQ7RUEyRUQ7O0VDcEZEOztFQUlBOzs7QUFHQSxNQUFhaWtCLE9BQU8sU0FBUEEsSUFBTyxHQUtUO0VBQUEsaUZBQVAsRUFBTztFQUFBLDJCQUpUbGxCLFFBSVM7RUFBQSxNQUpDQSxRQUlELGlDQUpZLFdBSVo7RUFBQSxrQ0FIVG1sQixlQUdTO0VBQUEsTUFIUUEsZUFHUix3Q0FIMEIsb0JBRzFCO0VBQUEsbUNBRlRDLGdCQUVTO0VBQUEsTUFGU0EsZ0JBRVQseUNBRjRCLHFCQUU1QjtFQUFBLG1DQURUQyxtQkFDUztFQUFBLE1BRFlBLG1CQUNaLHlDQURxQ0YsZUFDckM7O0VBQ1Q7RUFDQSxNQUNFLEVBQUUsbUJBQW1CamxCLFFBQXJCLEtBQ0EsRUFBRSxzQkFBc0JNLE1BQXhCLENBREEsSUFFQSxDQUFDTixTQUFTTyxlQUFULENBQXlCQyxTQUg1QixFQUtFLE9BQU8sSUFBUDs7RUFFRjtFQUNBO0VBQ0EsTUFBTTRrQixnQkFBZ0J2bEIsU0FBU0MsUUFBVCxDQUF0Qjs7RUFFQTtFQUNBLFdBQVN1bEIsT0FBVCxDQUFpQjFrQixNQUFqQixFQUEyQztFQUFBLFFBQWxCMmtCLFNBQWtCLHVFQUFOLElBQU07O0VBQ3pDLFFBQU1DLGNBQWMxbEIsU0FDZm9sQixlQURlLFVBRWxCdGtCLE9BQU9zSixhQUFQLENBQXFCQSxhQUZILENBQXBCO0VBSUEsUUFBTXViLG1CQUFtQjNsQixTQUN2QnFsQixnQkFEdUIsRUFFdkJ2a0IsT0FBT3NKLGFBQVAsQ0FBcUJBLGFBRkUsQ0FBekI7O0VBS0E7RUFDQXNiLGdCQUFZNWlCLE9BQVosQ0FBb0IsZUFBTztFQUN6QjhpQixVQUFJMWtCLFlBQUosQ0FBaUIsVUFBakIsRUFBNkIsQ0FBQyxDQUE5QjtFQUNBMGtCLFVBQUlDLGVBQUosQ0FBb0IsZUFBcEI7RUFDRCxLQUhEOztFQUtBRixxQkFBaUI3aUIsT0FBakIsQ0FBeUIsb0JBQVk7RUFDbkNnakIsZUFBUzVrQixZQUFULENBQXNCLGFBQXRCLEVBQXFDLE1BQXJDO0VBQ0QsS0FGRDs7RUFJQTtFQUNBSixXQUFPSSxZQUFQLENBQW9CLFVBQXBCLEVBQWdDLENBQWhDO0VBQ0FKLFdBQU9JLFlBQVAsQ0FBb0IsZUFBcEIsRUFBcUMsTUFBckM7RUFDQSxRQUFJdWtCLFNBQUosRUFBZTNrQixPQUFPVSxLQUFQO0VBQ2ZyQixhQUNHYSxjQURILENBQ2tCRixPQUFPRyxZQUFQLENBQW9CLGVBQXBCLENBRGxCLEVBRUc0a0IsZUFGSCxDQUVtQixhQUZuQjtFQUdEOztFQUVEO0VBQ0EsV0FBU0UsYUFBVCxDQUF1QnJrQixDQUF2QixFQUEwQjtFQUN4QjhqQixZQUFROWpCLEVBQUVDLGFBQVY7RUFDQUQsTUFBRWEsY0FBRixHQUZ3QjtFQUd6Qjs7RUFFRCxXQUFTeWpCLGVBQVQsQ0FBeUJ0a0IsQ0FBekIsRUFBNEI7RUFDMUI7RUFDQSxRQUFNK2MsYUFBYS9jLEVBQUVDLGFBQXJCO0VBQ0EsUUFBTStjLGtCQUNKRCxXQUFXRSxzQkFBWCxJQUNBRixXQUFXclUsYUFBWCxDQUF5QndVLGdCQUYzQjtFQUdBLFFBQU1DLGNBQ0pKLFdBQVdLLGtCQUFYLElBQ0FMLFdBQVdyVSxhQUFYLENBQXlCMlUsaUJBRjNCOztFQUlBO0VBQ0EsUUFBSXJkLEVBQUVLLE9BQUYsSUFBYUwsRUFBRU0sTUFBbkIsRUFBMkI7O0VBRTNCO0VBQ0E7RUFDQSxZQUFRTixFQUFFWSxPQUFWO0VBQ0UsV0FBSyxFQUFMO0VBQ0EsV0FBSyxFQUFMO0VBQ0VrakIsZ0JBQVE5RyxlQUFSO0VBQ0FoZCxVQUFFYSxjQUFGO0VBQ0E7RUFDRixXQUFLLEVBQUw7RUFDQSxXQUFLLEVBQUw7RUFDRWlqQixnQkFBUTNHLFdBQVI7RUFDQW5kLFVBQUVhLGNBQUY7RUFDQTtFQUNGO0VBQ0U7RUFaSjtFQWNEOztFQUVEO0VBQ0EsV0FBUzBqQixjQUFULENBQXdCQyxZQUF4QixFQUFzQztFQUNwQyxRQUFNQyxlQUFlbm1CLFNBQVNzbEIsbUJBQVQsRUFBOEJZLFlBQTlCLENBQXJCO0VBQ0E7RUFDQUMsaUJBQWFyakIsT0FBYixDQUFxQixlQUFPO0VBQzFCOGlCLFVBQUk1aUIsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEIraUIsYUFBOUI7RUFDQUgsVUFBSTVpQixnQkFBSixDQUFxQixTQUFyQixFQUFnQ2dqQixlQUFoQztFQUNELEtBSEQ7RUFJRDs7RUFFRCxXQUFTSSxnQkFBVCxDQUEwQkYsWUFBMUIsRUFBd0M7RUFDdEMsUUFBTUMsZUFBZW5tQixTQUFTc2xCLG1CQUFULEVBQThCWSxZQUE5QixDQUFyQjtFQUNBO0VBQ0FDLGlCQUFhcmpCLE9BQWIsQ0FBcUIsZUFBTztFQUMxQjhpQixVQUFJMWlCLG1CQUFKLENBQXdCLE9BQXhCLEVBQWlDNmlCLGFBQWpDO0VBQ0FILFVBQUkxaUIsbUJBQUosQ0FBd0IsU0FBeEIsRUFBbUM4aUIsZUFBbkM7RUFDRCxLQUhEO0VBSUQ7O0VBRUQ7RUFDQSxXQUFTN2lCLE9BQVQsR0FBbUI7RUFDakJvaUIsa0JBQWN6aUIsT0FBZCxDQUFzQnNqQixnQkFBdEI7RUFDRDs7RUFFRDtFQUNBLFdBQVNoakIsSUFBVCxHQUFnQjtFQUNkbWlCLGtCQUFjemlCLE9BQWQsQ0FBc0JtakIsY0FBdEI7RUFDRDs7RUFFRDtFQUNBN2lCOztFQUVBO0VBQ0EsU0FBTztFQUNMQSxjQURLO0VBRUxEO0VBRkssR0FBUDtFQUlELENBMUhNOztFQ1BQOzs7O0VBSUEsSUFBTWtqQixpQkFBaUIsU0FBakJBLGNBQWlCLENBQ3JCQyxRQURxQixFQUVyQmxaLE1BRnFCLEVBT2xCO0VBQUEsaUZBREMsRUFDRDtFQUFBLGdDQUhEQyxhQUdDO0VBQUEsTUFIREEsYUFHQyxzQ0FIZSxnQ0FHZjtFQUFBLG1DQUZEQyxzQkFFQztFQUFBLE1BRkRBLHNCQUVDLHlDQUZ3QixpQ0FFeEI7O0VBQ0gsTUFBSSxDQUFDZ1osUUFBTCxFQUFlO0VBQ2I7RUFDRDs7RUFFRCxNQUFNL1ksaUJBQWlCVSxNQUFNMUosU0FBTixDQUFnQm5FLEtBQWhCLENBQXNCQyxJQUF0QixDQUNyQmltQixTQUFTaG1CLGdCQUFULENBQTBCZ04sc0JBQTFCLENBRHFCLENBQXZCOztFQUlBO0VBQ0FDLGlCQUFlekssT0FBZixDQUF1QixtQkFBVztFQUNoQzBLLFlBQVE3TSxTQUFSLENBQWtCMkssTUFBbEIsQ0FBeUIrQixhQUF6QjtFQUNELEdBRkQ7O0VBSUE7RUFDQUQsU0FBT2xMLFVBQVAsQ0FBa0IySyxXQUFsQixDQUE4Qk8sTUFBOUI7RUFDRCxDQXZCRDs7RUF5QkE7QUFDQSxNQUFhbVosWUFBWSxTQUFaQSxTQUFZLEdBTWQ7RUFBQSxrRkFBUCxFQUFPO0VBQUEsNkJBTFR0bUIsUUFLUztFQUFBLE1BTFRBLFFBS1Msa0NBTEUsZUFLRjtFQUFBLG1DQUpUeU4sY0FJUztFQUFBLE1BSlRBLGNBSVMsd0NBSlEsdUJBSVI7RUFBQSxvQ0FIVEosc0JBR1M7RUFBQSxNQUhUQSxzQkFHUyx5Q0FIZ0IsaUNBR2hCO0VBQUEsa0NBRlRELGFBRVM7RUFBQSxNQUZUQSxhQUVTLHVDQUZPLGdDQUVQO0VBQUEsNEJBRFRuTixPQUNTO0VBQUEsTUFEVEEsT0FDUyxpQ0FEQ0MsUUFDRDs7RUFDVCxNQUFNd04sYUFBYU0sTUFBTTFKLFNBQU4sQ0FBZ0JuRSxLQUFoQixDQUFzQkMsSUFBdEIsQ0FDakJILFFBQVFJLGdCQUFSLENBQXlCTCxRQUF6QixDQURpQixDQUFuQjs7RUFJQTBOLGFBQVc3SyxPQUFYLENBQW1CLGdCQUFRO0VBQ3pCLFFBQU1zSyxTQUFTbE4sUUFBUStLLGFBQVIsQ0FBc0J5QyxjQUF0QixDQUFmOztFQUVBLFFBQUlOLE1BQUosRUFBWTtFQUNWQSxhQUFPcEssZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUM7RUFBQSxlQUMvQnFqQixlQUFlelksSUFBZixFQUFxQlIsTUFBckIsRUFBNkIsRUFBRUMsNEJBQUYsRUFBaUJDLDhDQUFqQixFQUE3QixDQUQrQjtFQUFBLE9BQWpDO0VBR0Q7RUFDRixHQVJEO0VBU0QsQ0FwQk07O0VDOUJQOzs7O0VDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
