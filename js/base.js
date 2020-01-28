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

    function openSlide(n) {
      goToSlide(n);
      setOffset();
      announceCurrentSlide();
      showImageInformation();
    }

    function previousSlide() {
      openSlide(currentSlide - 1);
    }

    function nextSlide() {
      openSlide(currentSlide + 1);
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
      openSlide: openSlide,
      destroy: destroy
    };
  };

  /**
   * Context navigation scripts
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

          var isWindowDefined = typeof window !== 'undefined';

          // The polyfill can’t function properly without `window` or `window.getComputedStyle`.
          if (!isWindowDefined || !window.getComputedStyle) seppuku = true;
          // Dont’t get in a way if the browser supports `position: sticky` natively.
          else {
                  (function () {
                      var testNode = document.createElement('div');

                      if (['', '-webkit-', '-moz-', '-ms-'].some(function (prefix) {
                          try {
                              testNode.style.position = prefix + 'sticky';
                          } catch (e) {}

                          return testNode.style.position != '';
                      })) seppuku = true;
                  })();
              }

          /*
           * 2. “Global” vars used across the polyfill
           */
          var isInitialized = false;

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
                          position: nodeComputedStyle.position,
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
                       * 3. Check if the current node position is `sticky`. If it is, it means that the browser supports sticky positioning,
                       *    but the polyfill was force-enabled. We set the node’s position to `static` before continuing, so that the node
                       *    is in it’s initial position when we gather its params.
                       */
                      var originalPosition = node.style.position;
                      if (nodeComputedStyle.position == 'sticky' || nodeComputedStyle.position == '-webkit-sticky') node.style.position = 'static';

                      /*
                       * 4. Get necessary node parameters
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
                          position: originalPosition,
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
                       * 5. Ensure that the node will be positioned relatively to the parent node
                       */
                      var parentPosition = parentComputedStyle.position;

                      if (parentPosition != 'absolute' && parentPosition != 'relative') {
                          parentNode.style.position = 'relative';
                      }

                      /*
                       * 6. Recalc node position.
                       *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
                       */
                      this._recalcPosition();

                      /*
                       * 7. Create a clone
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

              forceSticky: function forceSticky() {
                  seppuku = false;
                  init();

                  this.refreshAll();
              },
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
                      var _ret2 = _loop(i);

                      if (_ret2 === 'continue') continue;
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
              if (isInitialized) {
                  return;
              }

              isInitialized = true;

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
          if (module.exports) {
              module.exports = Stickyfill;
          } else if (isWindowDefined) {
              window.Stickyfill = Stickyfill;
          }
      })(window, document);
  });

  var gumshoe_min = createCommonjsModule(function (module, exports) {
    /*! gumshoejs v3.5.0 | (c) 2017 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/gumshoe */
    !function (e, t) {
      module.exports = t(e);
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
    @version v3.6.6
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
    - scrollEl = window || DOM element selector || DOM element
    - stickyClass = 'string'
    - stuckClass = 'string'
    - useStickyClasses = boolean
    - useFixed = boolean
    - useGetBoundingClientRect = boolean
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
    - .getTopPosition = gets the element top pixel position from the viewport
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
      this.version = '3.6.6';
      this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser';
      this.props = {
        customStickyChangeNumber: o.customStickyChangeNumber || null,
        noStyles: o.noStyles || false,
        stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
        parentClass: o.parentClass || 'js-stickybit-parent',
        scrollEl: typeof o.scrollEl === 'string' ? document.querySelector(o.scrollEl) : o.scrollEl || window,
        stickyClass: o.stickyClass || 'js-is-sticky',
        stuckClass: o.stuckClass || 'js-is-stuck',
        stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
        useStickyClasses: o.useStickyClasses || false,
        useFixed: o.useFixed || false,
        useGetBoundingClientRect: o.useGetBoundingClientRect || false,
        verticalPosition: o.verticalPosition || 'top'
        /*
          define positionVal after the setting of props, because definePosition looks at the props.useFixed
          ----
          -  uses a computed (`.definePosition()`)
          -  defined the position
        */

      };
      this.props.positionVal = this.definePosition() || 'fixed';
      this.instances = [];
      var _this$props = this.props,
          positionVal = _this$props.positionVal,
          verticalPosition = _this$props.verticalPosition,
          noStyles = _this$props.noStyles,
          stickyBitStickyOffset = _this$props.stickyBitStickyOffset;
      var verticalPositionStyle = verticalPosition === 'top' && !noStyles ? stickyBitStickyOffset + "px" : '';
      var positionStyle = positionVal !== 'fixed' ? positionVal : '';
      this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
      if (!('length' in this.els)) this.els = [this.els];

      for (var i = 0; i < this.els.length; i++) {
        var el = this.els[i]; // set vertical position

        el.style[verticalPosition] = verticalPositionStyle;
        el.style.position = positionStyle; // instances are an array of objects

        this.instances.push(this.addInstance(el, this.props));
      }
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
      var stickyProp;

      if (this.props.useFixed) {
        stickyProp = 'fixed';
      } else {
        var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
        var test = document.head.style;

        for (var i = 0; i < prefix.length; i += 1) {
          test.position = prefix[i] + "sticky";
        }

        stickyProp = test.position ? test.position : 'fixed';
        test.position = '';
      }

      return stickyProp;
    }
    /*
      addInstance ✔️
      --------
      — manages instances of items
      - takes in an el and props
      - returns an item object
      ---
      - target = el
      - o = {object} = props
        - scrollEl = 'string' | object
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
    ;

    _proto.addInstance = function addInstance(el, props) {
      var _this = this;

      var item = {
        el: el,
        parent: el.parentNode,
        props: props
      };

      if (props.positionVal === 'fixed' || props.useStickyClasses) {
        this.isWin = this.props.scrollEl === window;
        var se = this.isWin ? window : this.getClosestParent(item.el, item.props.scrollEl);
        this.computeScrollOffsets(item);
        item.parent.className += " " + props.parentClass;
        item.state = 'default';

        item.stateContainer = function () {
          return _this.manageState(item);
        };

        se.addEventListener('scroll', item.stateContainer);
      }

      return item;
    }
    /*
      --------
      getParent 👨‍
      --------
      - a helper function that gets the target element's parent selected el
      - only used for non `window` scroll elements
      - supports older browsers
    */
    ;

    _proto.getClosestParent = function getClosestParent(el, match) {
      // p = parent element
      var p = match;
      var e = el;
      if (e.parentElement === p) return p; // traverse up the dom tree until we get to the parent

      while (e.parentElement !== p) {
        e = e.parentElement;
      } // return parent element


      return p;
    }
    /*
      --------
      getTopPosition
      --------
      - a helper function that gets the topPosition of a Stickybit element
      - from the top level of the DOM
    */
    ;

    _proto.getTopPosition = function getTopPosition(el) {
      if (this.props.useGetBoundingClientRect) {
        return el.getBoundingClientRect().top + (this.props.scrollEl.pageYOffset || document.documentElement.scrollTop);
      }

      var topPosition = 0;

      do {
        topPosition = el.offsetTop + topPosition;
      } while (el = el.offsetParent);

      return topPosition;
    }
    /*
      computeScrollOffsets 📊
      ---
      computeScrollOffsets for Stickybits
      - defines
        - offset
        - start
        - stop
    */
    ;

    _proto.computeScrollOffsets = function computeScrollOffsets(item) {
      var it = item;
      var p = it.props;
      var el = it.el;
      var parent = it.parent;
      var isCustom = !this.isWin && p.positionVal === 'fixed';
      var isTop = p.verticalPosition !== 'bottom';
      var scrollElOffset = isCustom ? this.getTopPosition(p.scrollEl) : 0;
      var stickyStart = isCustom ? this.getTopPosition(parent) - scrollElOffset : this.getTopPosition(parent);
      var stickyChangeOffset = p.customStickyChangeNumber !== null ? p.customStickyChangeNumber : el.offsetHeight;
      var parentBottom = stickyStart + parent.offsetHeight;
      it.offset = scrollElOffset + p.stickyBitStickyOffset;
      it.stickyStart = isTop ? stickyStart - it.offset : 0;
      it.stickyChange = it.stickyStart + stickyChangeOffset;
      it.stickyStop = isTop ? parentBottom - (el.offsetHeight + it.offset) : parentBottom - window.innerHeight;
    }
    /*
      toggleClasses ⚖️
      ---
      toggles classes (for older browser support)
      r = removed class
      a = added class
    */
    ;

    _proto.toggleClasses = function toggleClasses(el, r, a) {
      var e = el;
      var cArray = e.className.split(' ');
      if (a && cArray.indexOf(a) === -1) cArray.push(a);
      var rItem = cArray.indexOf(r);
      if (rItem !== -1) cArray.splice(rItem, 1);
      e.className = cArray.join(' ');
    }
    /*
      manageState 📝
      ---
      - defines the state
        - normal
        - sticky
        - stuck
    */
    ;

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
      var isTop = vp !== 'bottom';
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
      var isSticky = isTop && scroll <= start && (state === 'sticky' || state === 'stuck');
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
          tC(e, stuck);
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
      var isNotStickyChange = scroll < change / 2 || scroll > stop;
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
    };

    _proto.update = function update(updatedProps) {
      if (updatedProps === void 0) {
        updatedProps = null;
      }

      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];
        this.computeScrollOffsets(instance);

        if (updatedProps) {
          for (var updatedProp in updatedProps) {
            instance.props[updatedProp] = updatedProps[updatedProp];
          }
        }
      }

      return this;
    }
    /*
      removes an instance 👋
      --------
      - cleanup instance
    */
    ;

    _proto.removeInstance = function removeInstance(instance) {
      var e = instance.el;
      var p = instance.props;
      var tC = this.toggleClasses;
      e.style.position = '';
      e.style[p.verticalPosition] = '';
      tC(e, p.stickyClass);
      tC(e, p.stuckClass);
      tC(e.parentNode, p.parentClass);
    }
    /*
      cleanup 🛁
      --------
      - cleans up each instance
      - clears instance
    */
    ;

    _proto.cleanup = function cleanup() {
      for (var i = 0; i < this.instances.length; i += 1) {
        var instance = this.instances[i];

        if (instance.stateContainer) {
          instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer);
        }

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
   * `Node#contains()` polyfill.
   *
   * See: http://compatibility.shwups-cms.ch/en/polyfills/?&id=1
   *
   * @param {Node} node
   * @param {Node} other
   * @return {Boolean}
   * @public
   */

  function contains$1(node, other) {
    // eslint-disable-next-line no-bitwise
    return node === other || !!(node.compareDocumentPosition(other) & 16);
  }

  var siteHeaderDropdown = function siteHeaderDropdown(selector) {
    var dropdownsArray = Array.prototype.slice.call(document.querySelectorAll(selector));

    if (dropdownsArray.length > 0) {
      initExpandables(selector + ' [aria-expanded]');

      document.addEventListener('click', function (event) {
        dropdownsArray.forEach(function (dropdownSelection) {
          var buttons = Array.prototype.slice.call(dropdownSelection.querySelectorAll('[aria-expanded]'));

          buttons.forEach(function (button) {
            var target = document.getElementById(button.getAttribute('aria-controls'));

            var isInsideButton = contains$1(button, event.target);
            var isInsideTarget = contains$1(target, event.target);

            if (!isInsideButton && !isInsideTarget) {
              toggleExpandable(button, { forceClose: true });
            }
          });
        });
      });
    }
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
  exports.siteHeaderDropdown = siteHeaderDropdown;
  exports.eclTables = eclTables;
  exports.tabs = tabs;
  exports.timelines = timelines;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbi9lYy1jb21wb25lbnQtYWNjb3JkaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWJyZWFkY3J1bWIvZ2VuZXJpYy1jb21wb25lbnQtYnJlYWRjcnVtYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2L2VjLWNvbXBvbmVudC1jb250ZXh0LW5hdi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1kcm9wZG93bi9lYy1jb21wb25lbnQtZHJvcGRvd24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9nZW5lcmljLWNvbXBvbmVudC1kaWFsb2cvZ2VuZXJpYy1jb21wb25lbnQtZGlhbG9nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUvZWMtY29tcG9uZW50LWV4cGFuZGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbWVzc2FnZS9nZW5lcmljLWNvbXBvbmVudC1tZXNzYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UvZWMtY29tcG9uZW50LW1lc3NhZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RpY2t5ZmlsbGpzL2Rpc3Qvc3RpY2t5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9ndW1zaG9lanMvZGlzdC9qcy9ndW1zaG9lLm1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51L2dlbmVyaWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdGlja3liaXRzL2Rpc3Qvc3RpY2t5Yml0cy5lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbi9nZW5lcmljLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtc2l0ZS1oZWFkZXItc3RhbmRhcmRpc2VkL2VjLWNvbXBvbmVudC1zaXRlLWhlYWRlci1zdGFuZGFyZGlzZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGFibGUvZWMtY29tcG9uZW50LXRhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LXRhYi9lYy1jb21wb25lbnQtdGFiLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUvZWMtY29tcG9uZW50LXRpbWVsaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtcHJlc2V0LWZ1bGwvZWMtcHJlc2V0LWZ1bGwuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1wcmVzZXQtd2Vic2l0ZS9lYy1wcmVzZXQtd2Vic2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBRdWVyeSBoZWxwZXJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PlxuICBbXS5zbGljZS5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVyeUFsbDtcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIGFjY29yZGlvbiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBhY2NvcmRpb25zID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uJyxcbiAgaGVhZGVyU2VsZWN0b3I6IGhlYWRlclNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uX19oZWFkZXInLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBhY2NvcmRpb24gZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgYWNjb3JkaW9uQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGhpZGVQYW5lbCh0YXJnZXQpIHtcbiAgICAvLyBnZXQgcGFuZWxcbiAgICBjb25zdCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICAgKTtcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlblxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BhbmVsKHRhcmdldCkge1xuICAgIC8vIGdldCBwYW5lbFxuICAgIGNvbnN0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICApO1xuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXMgb24gaGVhZGVyXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlbiBhbmQgc2V0IGhlaWdodCBvbiBwYW5lbFxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVBhbmVsKHRhcmdldCkge1xuICAgIC8vIGNsb3NlIHRhcmdldCBwYW5lbCBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJykge1xuICAgICAgaGlkZVBhbmVsKHRhcmdldCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKHRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnaXZlSGVhZGVyRm9jdXMoaGVhZGVyU2V0LCBpKSB7XG4gICAgLy8gc2V0IGFjdGl2ZSBmb2N1c1xuICAgIGhlYWRlclNldFtpXS5mb2N1cygpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50SGVhZGVyQ2xpY2soZSkge1xuICAgIHRvZ2dsZVBhbmVsKGUuY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEhlYWRlcktleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBjdXJyZW50SGVhZGVyID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG4gICAgLy8gZ2V0IGNvbnRleHQgb2YgYWNjb3JkaW9uIGNvbnRhaW5lciBhbmQgaXRzIGNoaWxkcmVuXG4gICAgY29uc3QgdGhpc0NvbnRhaW5lciA9IGN1cnJlbnRIZWFkZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHRoZXNlSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCB0aGlzQ29udGFpbmVyKTtcbiAgICBjb25zdCBjdXJyZW50SGVhZGVySW5kZXggPSBbXS5pbmRleE9mLmNhbGwodGhlc2VIZWFkZXJzLCBjdXJyZW50SGVhZGVyKTtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggZW50ZXIvc3BhY2UsIGxlZnQvcmlnaHQgYW5kIHVwL2Rvd24gYXJyb3cga2V5IGV2ZW50c1xuICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDEzOlxuICAgICAgY2FzZSAzMjpcbiAgICAgICAgdG9nZ2xlUGFuZWwoY3VycmVudEhlYWRlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODoge1xuICAgICAgICBjb25zdCBwcmV2aW91c0hlYWRlckluZGV4ID1cbiAgICAgICAgICBjdXJyZW50SGVhZGVySW5kZXggPT09IDBcbiAgICAgICAgICAgID8gdGhlc2VIZWFkZXJzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogY3VycmVudEhlYWRlckluZGV4IC0gMTtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgcHJldmlvdXNIZWFkZXJJbmRleCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDoge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVySW5kZXggPVxuICAgICAgICAgIGN1cnJlbnRIZWFkZXJJbmRleCA8IHRoZXNlSGVhZGVycy5sZW5ndGggLSAxXG4gICAgICAgICAgICA/IGN1cnJlbnRIZWFkZXJJbmRleCArIDFcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgbmV4dEhlYWRlckluZGV4KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKSB7XG4gICAgY29uc3QgYWNjb3JkaW9uSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCBhY2NvcmRpb25Db250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVOQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gdW5iaW5kQWNjb3JkaW9uRXZlbnRzKGFjY29yZGlvbkNvbnRhaW5lcikge1xuICAgIGNvbnN0IGFjY29yZGlvbkhlYWRlcnMgPSBxdWVyeUFsbChoZWFkZXJTZWxlY3RvciwgYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBhY2NvcmRpb25Db250YWluZXJzLmZvckVhY2goYWNjb3JkaW9uQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChhY2NvcmRpb25Db250YWluZXJzLmxlbmd0aCkge1xuICAgICAgYWNjb3JkaW9uQ29udGFpbmVycy5mb3JFYWNoKGFjY29yZGlvbkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbnM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0QnJlYWRjcnVtYiA9ICh7XG4gIGJyZWFkY3J1bWJTZWxlY3RvcjogYnJlYWRjcnVtYlNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYicsXG4gIGV4cGFuZEJ1dHRvblNlbGVjdG9yOiBleHBhbmRCdXR0b25TZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX2V4cGFuZC1idG4nLFxuICBzZWdtZW50U2VsZWN0b3I6IHNlZ21lbnRTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQnLFxuICBzZWdtZW50Rmlyc3RTZWxlY3Rvcjogc2VnbWVudEZpcnN0U2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1maXJzdCcsXG4gIHNlZ21lbnRWaXNpYmxlU2VsZWN0b3I6IHNlZ21lbnRWaXNpYmxlU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50Om5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWZpcnN0KTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyk6bm90KC5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tbGFzdCk6bm90KFthcmlhLWhpZGRlbj1cInRydWVcIl0pJyxcbiAgc2VnbWVudEhpZGRlblNlbGVjdG9yOiBzZWdtZW50SGlkZGVuU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50W2FyaWEtaGlkZGVuPVwidHJ1ZVwiXTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyknLFxuICBlbGxpcHNpc1NlbGVjdG9yOiBlbGxpcHNpc1NlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnLFxufSA9IHt9KSA9PiB7XG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdEVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBhZGQgZWxsaXBzaXMgdG8gRE9NXG4gICAgY29uc3QgYnJlYWRjcnVtYkZpcnN0ID0gcXVlcnlBbGwoc2VnbWVudEZpcnN0U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIGJyZWFkY3J1bWJGaXJzdC5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgICAgY29uc3QgZWxsaXBzaXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAvLyB3ZSBjYW4ndCBhZGQgbXVsdGlwbHMgY2xhc3NlcyBhdCBvbmNlLCBiZWNhdXNlLi4uIElFXG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluaycpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWxpbmstLWludmVydGVkJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluay0tc3RhbmRhbG9uZScpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX2xpbmsnKTtcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19leHBhbmQtYnRuJyk7XG4gICAgICBlbGxpcHNpcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgZWxsaXBzaXMuaW5uZXJIVE1MID0gJ+KApic7XG5cbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19zZWdtZW50Jyk7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC11LWFyaWEnKTtcbiAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChlbGxpcHNpcyk7XG4gICAgICBzZWdtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBzZWdtZW50Lm5leHRTaWJsaW5nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgaGlkZGVuIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50SGlkZGVuU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcbiAgICBjb25zdCBoaWRkZW4gPSBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCA/ICdmYWxzZScgOiAndHJ1ZSc7XG5cbiAgICAvLyBkaXNwbGF5IGVsbGlwc2lzIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgYnJlYWRjcnVtYkVsbGlwc2lzID0gcXVlcnlBbGwoZWxsaXBzaXNTZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgYnJlYWRjcnVtYkVsbGlwc2lzLmZvckVhY2goZWxsaXBzaXMgPT4ge1xuICAgICAgZWxsaXBzaXMuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHdyYXBwZXIgd2lkdGhcbiAgICBjb25zdCB3cmFwcGVyV2lkdGggPSBNYXRoLmZsb29yKFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICk7XG5cbiAgICAvLyBnZXQgZGlzcGxheWVkIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGdldCBzZWdtZW50cyB3aWR0aFxuICAgIGxldCBzZWdtZW50V2lkdGggPSAwO1xuICAgIGJyZWFkY3J1bWJTZWdtZW50cy5mb3JFYWNoKGJyZWFkY3J1bWJTZWdtZW50ID0+IHtcbiAgICAgIHNlZ21lbnRXaWR0aCArPSBNYXRoLmNlaWwoXG4gICAgICAgIGJyZWFkY3J1bWJTZWdtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRXaWR0aCA+PSB3cmFwcGVyV2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHZpc2libGUgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50VmlzaWJsZVNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBoaWRlIHNlZ21lbnRzIGlmIG5lZWRlZFxuICAgIC8vIHdlIGRvIG5vdCBoaWRlIHRoZSBsYXN0IHR3byBzZWdtZW50c1xuICAgIGlmIChicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFub3RoZXIgc2VnbWVudCB0byBiZSBoaWRkZW5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IGhpZGRlbiBzZWdtZW50c1xuICAgIGNvbnN0IGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cyA9IHF1ZXJ5QWxsKFxuICAgICAgc2VnbWVudEhpZGRlblNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBzaG93IHNlZ21lbnRzIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZVxuICAgIGlmIChicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzW1xuICAgICAgICBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoIC0gMVxuICAgICAgXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICAvLyBicmVhZGNydW1iIGlzIHRvbyBsYXJnZSwgd2UgaGlkZSB0aGUgbGFzdCBzZWdtZW50XG4gICAgICAgIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBzZWdtZW50IHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRFeHBhbmRDbGljayhlLCBicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGRpc3BsYXkgYWxsIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICBicmVhZGNydW1iU2VnbWVudHMuZm9yRWFjaChicmVhZGNydW1iU2VnbWVudCA9PiB7XG4gICAgICBicmVhZGNydW1iU2VnbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIGVsbGlwc2lzIG9uY2UgZXhwYW5kZWRcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHNlZ21lbnRzIHRvIGJlIGhpZGRlbiBvciBzaG93blxuICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgaGlkZVNlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIH1cbiAgICB0b2dnbGVFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGNvbnN0IGJyZWFkY3J1bWJDb250YWluZXJzID0gcXVlcnlBbGwoYnJlYWRjcnVtYlNlbGVjdG9yKTtcblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kQnJlYWRjcnVtYkV2ZW50cyhicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgY29uc3QgZXhwYW5kcyA9IHF1ZXJ5QWxsKGV4cGFuZEJ1dHRvblNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGJpbmQgY2xpY2sgZXZlbnQgZm9yIGV4cGFuZFxuICAgIGV4cGFuZHMuZm9yRWFjaChleHBhbmQgPT4ge1xuICAgICAgZXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PlxuICAgICAgICBldmVudEV4cGFuZENsaWNrKGUsIGJyZWFkY3J1bWJDb250YWluZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gYmluZCByZXNpemUgZXZlbnQgdG8gY2hlY2sgYnJlYWRjcnVtYiB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goZXZlbnRSZXNpemUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBjb25zdCBleHBhbmRzID0gcXVlcnlBbGwoZXhwYW5kQnV0dG9uU2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBjbGljayBldmVudCBmb3IgZXhwYW5kXG4gICAgZXhwYW5kcy5mb3JFYWNoKGV4cGFuZCA9PiB7XG4gICAgICBleHBhbmQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+XG4gICAgICAgIGV2ZW50RXhwYW5kQ2xpY2soZSwgYnJlYWRjcnVtYkNvbnRhaW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyB1bmJpbmQgcmVzaXplIGV2ZW50IHRvIGNoZWNrIGJyZWFkY3J1bWIgd2lkdGhcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZXNpemUnLFxuICAgICAgZGVib3VuY2UoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGV2ZW50UmVzaXplKTtcbiAgICAgICAgfSxcbiAgICAgICAgMTAwLFxuICAgICAgICB7IG1heFdhaXQ6IDMwMCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoYnJlYWRjcnVtYkNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGJyZWFkY3J1bWJDb250YWluZXIgPT4ge1xuICAgICAgICB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChicmVhZGNydW1iQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goYnJlYWRjcnVtYkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGluaXRFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgICAgYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gdHJpZ2dlciByZXNpemUgZXZlbnQgb25jZVxuICAgICAgICBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGluaXRCcmVhZGNydW1iO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgY2Fyb3VzZWxzID0gKHsgc2VsZWN0b3JJZDogc2VsZWN0b3JJZCA9ICdlY2wtY2Fyb3VzZWwnIH0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8ICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGxldCBjdXJyZW50U2xpZGUgPSAwO1xuICBjb25zdCBjYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ySWQpO1xuICBjb25zdCBzbGlkZXMgPSBxdWVyeUFsbCgnLmVjbC1jYXJvdXNlbF9faXRlbScsIGNhcm91c2VsKTtcbiAgY29uc3QgbGlzdCA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3QnKTtcblxuICBmdW5jdGlvbiBnZXRMaXN0SXRlbVdpZHRoKCkge1xuICAgIHJldHVybiBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19pdGVtJykub2Zmc2V0V2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvU2xpZGUobikge1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5yZW1vdmUoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICAgIGN1cnJlbnRTbGlkZSA9IChuICsgc2xpZGVzLmxlbmd0aCkgJSBzbGlkZXMubGVuZ3RoO1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5hZGQoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IGl0ZW1XaWR0aCA9IGdldExpc3RJdGVtV2lkdGgoKTtcbiAgICBjb25zdCB0ciA9IGB0cmFuc2xhdGUzZCgkey1jdXJyZW50U2xpZGUgKiBpdGVtV2lkdGh9cHgsIDAsIDApYDtcblxuICAgIGxpc3Quc3R5bGUuTW96VHJhbnNmb3JtID0gdHI7IC8qIEZGICovXG4gICAgbGlzdC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyOyAvKiBJRSAoOSspICovXG4gICAgbGlzdC5zdHlsZS5PVHJhbnNmb3JtID0gdHI7IC8qIE9wZXJhICovXG4gICAgbGlzdC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSB0cjsgLyogU2FmYXJpICsgQ2hyb21lICovXG4gICAgbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSB0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFubm91bmNlQ3VycmVudFNsaWRlKCkge1xuICAgIGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmVjbC1jYXJvdXNlbF9fbWV0YS1zbGlkZSdcbiAgICApLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFNsaWRlICsgMX0gLyAke3NsaWRlcy5sZW5ndGh9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dJbWFnZUluZm9ybWF0aW9uKCkge1xuICAgIC8vIFJlc2V0L0hpZGUgYWxsLlxuICAgIGNvbnN0IGluZm9BcmVhcyA9IHF1ZXJ5QWxsKCdbZGF0YS1pbWFnZV0nKTtcbiAgICAvLyBJZiBhbnl0aGluZyBpcyB2aXNpYmxlLlxuICAgIGlmIChpbmZvQXJlYXMpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaW5mb0FyZWFzLmZvckVhY2goYXJlYSA9PiAoYXJlYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgfVxuXG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtaW1hZ2U9XCIke2N1cnJlbnRTbGlkZX1cIl1gKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICdibG9jayc7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuU2xpZGUobikge1xuICAgIGdvVG9TbGlkZShuKTtcbiAgICBzZXRPZmZzZXQoKTtcbiAgICBhbm5vdW5jZUN1cnJlbnRTbGlkZSgpO1xuICAgIHNob3dJbWFnZUluZm9ybWF0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1NsaWRlKCkge1xuICAgIG9wZW5TbGlkZShjdXJyZW50U2xpZGUgLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICBvcGVuU2xpZGUoY3VycmVudFNsaWRlICsgMSk7XG4gIH1cblxuICAvLyBBdHRhY2ggY29udHJvbHMgdG8gYSBjYXJvdXNlbC5cbiAgZnVuY3Rpb24gYWRkQ2Fyb3VzZWxDb250cm9scygpIHtcbiAgICBjb25zdCBuYXZDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBuYXZDb250cm9scy5jbGFzc05hbWUgPSAnZWNsLWNhcm91c2VsX19jb250cm9scyBlY2wtbGlzdC0tdW5zdHlsZWQnO1xuXG4gICAgbmF2Q29udHJvbHMuaW5uZXJIVE1MID0gYFxuICAgICAgPGxpPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImVjbC1pY29uIGVjbC1pY29uLS1sZWZ0IGVjbC1jYXJvdXNlbF9fYnV0dG9uIGVjbC1jYXJvdXNlbF9fYnV0dG9uLS1wcmV2aW91c1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWNsLXUtc3Itb25seVwiPlByZXZpb3VzPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgPC9saT5cbiAgICAgIDxsaT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJlY2wtaWNvbiBlY2wtaWNvbi0tcmlnaHQgZWNsLWNhcm91c2VsX19idXR0b24gZWNsLWNhcm91c2VsX19idXR0b24tLW5leHRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImVjbC11LXNyLW9ubHlcIj5OZXh0PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbGk+XG4gICAgYDtcblxuICAgIG5hdkNvbnRyb2xzXG4gICAgICAucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5lY2wtY2Fyb3VzZWxfX2J1dHRvbi0tcHJldmlvdXMnLFxuICAgICAgICAnLmVjbC1jYXJvdXNlbF9fY29udHJvbHMnXG4gICAgICApXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2aW91c1NsaWRlKTtcblxuICAgIG5hdkNvbnRyb2xzXG4gICAgICAucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fYnV0dG9uLS1uZXh0JywgJy5lY2wtY2Fyb3VzZWxfX2NvbnRyb2xzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRTbGlkZSk7XG5cbiAgICBjYXJvdXNlbFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3Qtd3JhcHBlcicpXG4gICAgICAuYXBwZW5kQ2hpbGQobmF2Q29udHJvbHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2Fyb3VzZWxDb250cm9scygpIHtcbiAgICBjb25zdCBjb250cm9scyA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2NvbnRyb2xzJyk7XG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGlzdC13cmFwcGVyJykucmVtb3ZlQ2hpbGQoY29udHJvbHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTGl2ZVJlZ2lvbigpIHtcbiAgICBjb25zdCBsaXZlUmVnaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGl2ZVJlZ2lvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICBsaXZlUmVnaW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1hdG9taWMnLCAndHJ1ZScpO1xuICAgIGxpdmVSZWdpb24uY2xhc3NMaXN0LmFkZCgnZWNsLWNhcm91c2VsX19tZXRhLXNsaWRlJyk7XG4gICAgY2Fyb3VzZWxcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXZlLXJlZ2lvbicpXG4gICAgICAuYXBwZW5kQ2hpbGQobGl2ZVJlZ2lvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXZlUmVnaW9uKCkge1xuICAgIGNvbnN0IGxpdmVSZWdpb24gPSBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19tZXRhLXNsaWRlJyk7XG4gICAgY2Fyb3VzZWxcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXZlLXJlZ2lvbicpXG4gICAgICAucmVtb3ZlQ2hpbGQobGl2ZVJlZ2lvbik7XG4gIH1cblxuICBjb25zdCBkZWJvdW5jZUNiID0gKCkgPT5cbiAgICBkZWJvdW5jZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgc2V0T2Zmc2V0KCk7XG4gICAgICB9LFxuICAgICAgMTAwLFxuICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICkoKTtcblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgYWRkQ2Fyb3VzZWxDb250cm9scygpO1xuICAgIGFkZExpdmVSZWdpb24oKTtcbiAgICBnb1RvU2xpZGUoMCk7XG4gICAgYW5ub3VuY2VDdXJyZW50U2xpZGUoKTtcbiAgICBzaG93SW1hZ2VJbmZvcm1hdGlvbigpO1xuXG4gICAgLy8gUmUtYWxpZ24gb24gcmVzaXplLlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZUNiKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICByZW1vdmVDYXJvdXNlbENvbnRyb2xzKCk7XG4gICAgcmVtb3ZlTGl2ZVJlZ2lvbigpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZUNiKTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBvcGVuU2xpZGUsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjYXJvdXNlbHM7XG4iLCIvKipcbiAqIENvbnRleHQgbmF2aWdhdGlvbiBzY3JpcHRzXG4gKi9cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5jb25zdCBleHBhbmRDb250ZXh0dWFsTmF2ID0gKFxuICBjb250ZXh0dWFsTmF2LFxuICBidXR0b24sXG4gIHtcbiAgICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC1jb250ZXh0LW5hdl9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghY29udGV4dHVhbE5hdikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gcXVlcnlBbGwoaGlkZGVuRWxlbWVudHNTZWxlY3RvciwgY29udGV4dCk7XG5cbiAgLy8gUmVtb3ZlIGV4dHJhIGNsYXNzXG4gIGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzVG9SZW1vdmUpO1xuICB9KTtcblxuICAvLyBSZW1vdmUgYnV0dHRvblxuICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b24pO1xufTtcblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBleHBhbmRhYmxlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBjb25zdCBjb250ZXh0dWFsTmF2cyA9ICh7XG4gIHNlbGVjdG9yID0gJy5lY2wtY29udGV4dC1uYXYnLFxuICBidXR0b25TZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19tb3JlJyxcbiAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtY29udGV4dC1uYXZfX2l0ZW0tLW92ZXItbGltaXQnLFxuICBjb250ZXh0ID0gZG9jdW1lbnQsXG59ID0ge30pID0+IHtcbiAgY29uc3Qgbm9kZXNBcnJheSA9IHF1ZXJ5QWxsKHNlbGVjdG9yLCBjb250ZXh0KTtcblxuICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKGJ1dHRvblNlbGVjdG9yKTtcblxuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIGV4cGFuZENvbnRleHR1YWxOYXYobm9kZSwgYnV0dG9uLCB7XG4gICAgICAgICAgY2xhc3NUb1JlbW92ZSxcbiAgICAgICAgICBoaWRkZW5FbGVtZW50c1NlbGVjdG9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGV4dHVhbE5hdnM7XG4iLCIvKipcbiAqIGBOb2RlI2NvbnRhaW5zKClgIHBvbHlmaWxsLlxuICpcbiAqIFNlZTogaHR0cDovL2NvbXBhdGliaWxpdHkuc2h3dXBzLWNtcy5jaC9lbi9wb2x5ZmlsbHMvPyZpZD0xXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcGFyYW0ge05vZGV9IG90aGVyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIG90aGVyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiBub2RlID09PSBvdGhlciB8fCAhIShub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG90aGVyKSAmIDE2KTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duID0gc2VsZWN0b3IgPT4ge1xuICBjb25zdCBkcm9wZG93bnNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZHJvcGRvd25zQXJyYXkuZm9yRWFjaChkcm9wZG93blNlbGVjdGlvbiA9PiB7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGNvbnRhaW5zKGRyb3Bkb3duU2VsZWN0aW9uLCBldmVudC50YXJnZXQpO1xuXG4gICAgICBpZiAoIWlzSW5zaWRlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1leHBhbmRlZD10cnVlXWBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZHJvcGRvd25Cb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1oaWRkZW49ZmFsc2VdYFxuICAgICAgICApO1xuICAgICAgICAvLyBJZiB0aGUgYm9keSBvZiB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZSwgdGhlbiB0b2dnbGUuXG4gICAgICAgIGlmIChkcm9wZG93bkJvZHkpIHtcbiAgICAgICAgICBkcm9wZG93bkJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgZHJvcGRvd25Cb2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRyb3Bkb3duO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqXG4gKiBBdmFpbGFibGUgb3B0aW9uczpcbiAqIC0gb3B0aW9ucy50cmlnZ2VyRWxlbWVudHNTZWxlY3RvciAtIGFueSBzZWxlY3RvciB0byB3aGljaCBldmVudCBsaXN0ZW5lcnNcbiAqIGFyZSBhdHRhY2hlZC4gV2hlbiBjbGlja2VkIG9uIGFueSBlbGVtZW50IHdpdGggc3VjaCBhIHNlbGVjdG9yLCBhIGRpYWxvZyBvcGVucy5cbiAqXG4gKiAtIG9wdGlvbnMuZGlhbG9nV2luZG93SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1kaWFsb2dgLlxuICpcbiAqIC0gb3B0aW9ucy5kaWFsb2dPdmVybGF5SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1vdmVybGF5YC5cbiAqIE92ZXJsYXkgZWxlbWVudCBpcyBjcmVhdGVkIGluIHRoZSBkb2N1bWVudCBpZiBub3QgcHJvdmlkZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBkaWFsb2dzID0gKHtcbiAgdHJpZ2dlckVsZW1lbnRzU2VsZWN0b3I6IHRyaWdnZXJFbGVtZW50c1NlbGVjdG9yID0gJ1tkYXRhLWVjbC1kaWFsb2ddJyxcbiAgZGlhbG9nV2luZG93SWQ6IGRpYWxvZ1dpbmRvd0lkID0gJ2VjbC1kaWFsb2cnLFxuICBkaWFsb2dPdmVybGF5SWQ6IGRpYWxvZ092ZXJsYXlJZCA9ICdlY2wtb3ZlcmxheScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKCEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fCAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTRVRVUFxuICBjb25zdCB0cmlnZ2VyRWxlbWVudHMgPSBxdWVyeUFsbCh0cmlnZ2VyRWxlbWVudHNTZWxlY3Rvcik7XG4gIGNvbnN0IGRpYWxvZ1dpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1dpbmRvd0lkKTtcbiAgbGV0IGRpYWxvZ092ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dPdmVybGF5SWQpO1xuXG4gIC8vIENyZWF0ZSBhbiBvdmVybGF5IGVsZW1lbnQgaWYgdGhlIHVzZXIgZG9lcyBub3Qgc3VwcGx5IG9uZS5cbiAgaWYgKCFkaWFsb2dPdmVybGF5KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdlY2wtb3ZlcmxheScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlY2wtZGlhbG9nX19vdmVybGF5Jyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIGRpYWxvZ092ZXJsYXkgPSBlbGVtZW50O1xuICB9XG5cbiAgLy8gV2hhdCB3ZSBjYW4gZm9jdXMgb24gaW4gdGhlIG1vZGFsLlxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgcXVlcnlBbGwoXG4gICAgICBgXG4gICAgICAgIGFbaHJlZl0sXG4gICAgICAgIGFyZWFbaHJlZl0sXG4gICAgICAgIGlucHV0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBidXR0b246bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBbdGFiaW5kZXg9XCIwXCJdXG4gICAgICBgLFxuICAgICAgZGlhbG9nV2luZG93XG4gICAgKVxuICApO1xuXG4gIC8vIFVzZSB0aGlzIHZhcmlhYmxlIHRvIHJldHVybiBmb2N1cyBvbiBlbGVtZW50IGFmdGVyIGRpYWxvZyBiZWluZyBjbG9zZWQuXG4gIGxldCBmb2N1c2VkRWxCZWZvcmVPcGVuID0gbnVsbDtcblxuICAvLyBTcGVjaWZpYyBlbGVtZW50cyB0byB0YWtlIGNhcmUgd2hlbiBvcGVubmluZyBhbmQgY2xvc2luZyB0aGUgZGlhbG9nLlxuICBjb25zdCBmaXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgY29uc3QgbGFzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblxuICAvLyBFVkVOVFNcbiAgLy8gSGlkZSBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkaWFsb2dXaW5kb3cuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgaWYgKGZvY3VzZWRFbEJlZm9yZU9wZW4pIHtcbiAgICAgIGZvY3VzZWRFbEJlZm9yZU9wZW4uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gS2V5Ym9hcmQgYmVoYXZpb3JzLlxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBjb25zdCBLRVlfVEFCID0gOTtcbiAgICBjb25zdCBLRVlfRVNDID0gMjc7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCYWNrd2FyZFRhYigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcndhcmRUYWIoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgLy8gS2VlcCB0YWJiaW5nIGluIHRoZSBzY29wZSBvZiB0aGUgZGlhbG9nLlxuICAgICAgY2FzZSBLRVlfVEFCOlxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaGFuZGxlQmFja3dhcmRUYWIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVGb3J3YXJkVGFiKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9FU0M6XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdyBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIG9wZW4oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRpYWxvZ1dpbmRvdy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblxuICAgIC8vIFRoaXMgaXMgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZm9jdXMgYWZ0ZXIgY2xvc2luZyB0aGUgZGlhbG9nLlxuICAgIC8vIFVzdWFsbHkgdGhlIGVsZW1lbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSBkaWFsb2cuXG4gICAgZm9jdXNlZEVsQmVmb3JlT3BlbiA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBGb2N1cyBvbiB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgZGlhbG9nLlxuICAgIGZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgLy8gQ2xvc2UgZGlhbG9nIHdoZW4gY2xpY2tlZCBvdXQgb2YgdGhlIGRpYWxvZyB3aW5kb3cuXG4gICAgZGlhbG9nT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlKTtcblxuICAgIC8vIEhhbmRsZSB0YWJiaW5nLCBlc2MgYW5kIGtleWJvYXJkIGluIHRoZSBkaWFsb2cgd2luZG93LlxuICAgIGRpYWxvZ1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kRGlhbG9nRXZlbnRzKHRyaWdnZXJFbGVtZW50cyk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKHRyaWdnZXJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGJpbmREaWFsb2dFdmVudHModHJpZ2dlckVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBkaWFsb2dzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUV4cGFuZGFibGUgPSAoXG4gIHRvZ2dsZUVsZW1lbnQsXG4gIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gICAgZm9yY2VDbG9zZSA9IGZhbHNlLFxuICAgIGNsb3NlU2libGluZ3MgPSBmYWxzZSxcbiAgICBzaWJsaW5nc1NlbGVjdG9yID0gJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdG9nZ2xlRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICk7XG5cbiAgLy8gRXhpdCBpZiBubyB0YXJnZXQgZm91bmRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBzdGF0dXNcbiAgY29uc3QgaXNFeHBhbmRlZCA9XG4gICAgZm9yY2VDbG9zZSA9PT0gdHJ1ZSB8fFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcblxuICAvLyBUb2dnbGUgdGhlIGV4cGFuZGFibGUvY29sbGFwc2libGVcbiAgdG9nZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaXNFeHBhbmRlZCk7XG5cbiAgLy8gVG9nZ2xlIGxhYmVsIGlmIHBvc3NpYmxlXG4gIGlmICghaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpO1xuICB9IGVsc2UgaWYgKGlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtY29sbGFwc2VkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2RhdGEtbGFiZWwtY29sbGFwc2VkJ1xuICAgICk7XG4gIH1cblxuICAvLyBDbG9zZSBzaWJsaW5ncyBpZiByZXF1ZXN0ZWRcbiAgaWYgKGNsb3NlU2libGluZ3MgPT09IHRydWUpIHtcbiAgICBjb25zdCBzaWJsaW5nc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2libGluZ3NTZWxlY3RvcikpXG4gICAgICAuZmlsdGVyKHNpYmxpbmcgPT4gc2libGluZyAhPT0gdG9nZ2xlRWxlbWVudCk7XG5cbiAgICBzaWJsaW5nc0FycmF5LmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHNpYmxpbmcsIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IGluaXRFeHBhbmRhYmxlcyA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PiB7XG4gIC8vIEV4aXQgaWYgbm8gc2VsZWN0b3Igd2FzIHByb3ZpZGVkXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7IGNvbnRleHQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcbn07XG4iLCIvKipcbiAqIEZpbGUgdXBsb2FkcyByZWxhdGVkIGJlaGF2aW9ycy5cbiAqL1xuXG5pbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGZpbGVVcGxvYWRzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWQnLFxuICBpbnB1dFNlbGVjdG9yOiBpbnB1dFNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWRfX2lucHV0JyxcbiAgdmFsdWVTZWxlY3RvcjogdmFsdWVTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX192YWx1ZScsXG4gIGJyb3dzZVNlbGVjdG9yOiBicm93c2VTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX19icm93c2UnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBmaWxlIHVwbG9hZCBlbGVtZW50IE5vZGVMaXN0c1xuICBjb25zdCBmaWxlVXBsb2FkQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpbGVOYW1lKGVsZW1lbnQsIGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG4gICAgICBpZiAoJ25hbWUnIGluIGZpbGUpIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgZmlsZW5hbWUgKz0gJywgJztcbiAgICAgICAgfVxuICAgICAgICBmaWxlbmFtZSArPSBmaWxlLm5hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2hvdyB0aGUgc2VsZWN0ZWQgZmlsZW5hbWUgaW4gdGhlIGZpZWxkLlxuICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSBmaWxlbmFtZTtcbiAgfVxuXG4gIC8vIEVWRU5UU1xuICBmdW5jdGlvbiBldmVudFZhbHVlQ2hhbmdlKGUpIHtcbiAgICBpZiAoJ2ZpbGVzJyBpbiBlLnRhcmdldCkge1xuICAgICAgY29uc3QgZmlsZVVwbG9hZEVsZW1lbnRzID0gcXVlcnlBbGwodmFsdWVTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICAgIGZpbGVVcGxvYWRFbGVtZW50cy5mb3JFYWNoKGZpbGVVcGxvYWRFbGVtZW50ID0+IHtcbiAgICAgICAgdXBkYXRlRmlsZU5hbWUoZmlsZVVwbG9hZEVsZW1lbnQsIGUudGFyZ2V0LmZpbGVzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50QnJvd3NlS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCBoZWFkZXIgdGFyZ2V0cywgYW5kIHRoZWlyIHByZXYvbmV4dFxuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICBpbnB1dEVsZW1lbnRzLmZvckVhY2goaW5wdXRFbGVtZW50ID0+IHtcbiAgICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICAgIGlmIChpc01vZGlmaWVyS2V5KSByZXR1cm47XG5cbiAgICAgIC8vIGNhdGNoIGVudGVyL3NwYWNlLCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kRmlsZVVwbG9hZEV2ZW50cyhmaWxlVXBsb2FkQ29udGFpbmVyKSB7XG4gICAgLy8gYmluZCBhbGwgZmlsZSB1cGxvYWQgY2hhbmdlIGV2ZW50c1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgY29uc3QgZmlsZVVwbG9hZEJyb3dzZXMgPSBxdWVyeUFsbChicm93c2VTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcikge1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGZpbGUgdXBsb2FkIGNoYW5nZSBldmVudHNcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGZpbGVVcGxvYWRCcm93c2VzID0gcXVlcnlBbGwoYnJvd3NlU2VsZWN0b3IsIGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGZpbGVVcGxvYWRDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgICAgYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBmaWxlVXBsb2FkcztcbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5leHBvcnQgY29uc3QgZWNsTGFuZ1NlbGVjdFBhZ2VzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZScsXG4gIHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyA9ICdlY2wtbGFuZy1zZWxlY3QtcGFnZS0tZHJvcGRvd24nLFxuICBsaXN0U2VsZWN0b3I6IGxpc3RTZWxlY3RvciA9ICcuZWNsLWxhbmctc2VsZWN0LXBhZ2VfX2xpc3QnLFxuICBkcm9wZG93blNlbGVjdG9yOiBkcm9wZG93blNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZV9fZHJvcGRvd24nLFxuICBkcm9wZG93bk9uQ2hhbmdlOiBkcm9wZG93bk9uQ2hhbmdlID0gdW5kZWZpbmVkLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGxzcCkge1xuICAgIGlmICghbHNwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGxpc3QgPSBxdWVyeUFsbChsaXN0U2VsZWN0b3IsIGxzcClbMF07XG5cbiAgICBpZiAoIWxzcC5jbGFzc0xpc3QuY29udGFpbnModG9nZ2xlQ2xhc3MpKSB7XG4gICAgICBpZiAobGlzdCAmJiBsaXN0Lm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoID4gbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcGRvd24gPSBxdWVyeUFsbChkcm9wZG93blNlbGVjdG9yLCBsc3ApWzBdO1xuICAgICAgaWYgKGRyb3Bkb3duLm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoIDwgbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QucmVtb3ZlKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gT24gbG9hZFxuICAgIGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMuZm9yRWFjaChsc3AgPT4ge1xuICAgICAgdG9nZ2xlKGxzcCk7XG5cbiAgICAgIGlmIChkcm9wZG93bk9uQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gcXVlcnlBbGwoZHJvcGRvd25TZWxlY3RvciwgbHNwKVswXTtcblxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcbiAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkcm9wZG93bk9uQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncmVzaXplJyxcbiAgICAgIGRlYm91bmNlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGFuZ1NlbGVjdFBhZ2VzQ29udGFpbmVycy5mb3JFYWNoKHRvZ2dsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIDEwMCxcbiAgICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gaW5pdCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWNsTGFuZ1NlbGVjdFBhZ2VzO1xuIiwiLypcbiAqIE1lc3NhZ2VzIGJlaGF2aW9yXG4gKi9cblxuLy8gRGlzbWlzcyBhIHNlbGVjdGVkIG1lc3NhZ2UuXG5mdW5jdGlvbiBkaXNtaXNzTWVzc2FnZShtZXNzYWdlKSB7XG4gIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIG1lc3NhZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtZXNzYWdlKTtcbiAgfVxufVxuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIG1lc3NhZ2VzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXNzYWdlcygpIHtcbiAgY29uc3Qgc2VsZWN0b3JDbGFzcyA9ICdlY2wtbWVzc2FnZV9fZGlzbWlzcyc7XG5cbiAgY29uc3QgbWVzc2FnZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yQ2xhc3MpXG4gICk7XG5cbiAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+XG4gICAgbWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBkaXNtaXNzTWVzc2FnZShtZXNzYWdlLnBhcmVudEVsZW1lbnQpXG4gICAgKVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0TWVzc2FnZXM7XG4iLCIvKlxuICogTWVzc2FnZXMgYmVoYXZpb3JcbiAqL1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LW1lc3NhZ2UnO1xuIiwiLyohXHJcbiAgKiBTdGlja3lmaWxsIOKAkyBgcG9zaXRpb246IHN0aWNreWAgcG9seWZpbGxcclxuICAqIHYuIDIuMS4wIHwgaHR0cHM6Ly9naXRodWIuY29tL3dpbGRkZWVyL3N0aWNreWZpbGxcclxuICAqIE1JVCBMaWNlbnNlXHJcbiAgKi9cclxuXHJcbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogMS4gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5IG9yIGlzIHRvbyBvbGQgdG8gcnVuIHRoZSBwb2x5ZmlsbC5cclxuICAgICAqICAgIElmIGVpdGhlciBvZiB0aGVzZSBpcyB0aGUgY2FzZSBzZXQgYHNlcHB1a3VgIGZsYWcuIEl0IHdpbGwgYmUgY2hlY2tlZCBsYXRlciB0byBkaXNhYmxlIGtleSBmZWF0dXJlc1xyXG4gICAgICogICAgb2YgdGhlIHBvbHlmaWxsLCBidXQgdGhlIEFQSSB3aWxsIHJlbWFpbiBmdW5jdGlvbmFsIHRvIGF2b2lkIGJyZWFraW5nIHRoaW5ncy5cclxuICAgICAqL1xyXG4gICAgXHJcbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG4gICAgXHJcbiAgICB2YXIgc2VwcHVrdSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB2YXIgaXNXaW5kb3dEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICBcclxuICAgIC8vIFRoZSBwb2x5ZmlsbCBjYW7igJl0IGZ1bmN0aW9uIHByb3Blcmx5IHdpdGhvdXQgYHdpbmRvd2Agb3IgYHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlYC5cclxuICAgIGlmICghaXNXaW5kb3dEZWZpbmVkIHx8ICF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgc2VwcHVrdSA9IHRydWU7XHJcbiAgICAvLyBEb2504oCZdCBnZXQgaW4gYSB3YXkgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5LlxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKFsnJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXS5zb21lKGZ1bmN0aW9uIChwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0Tm9kZS5zdHlsZS5wb3NpdGlvbiA9IHByZWZpeCArICdzdGlja3knO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVzdE5vZGUuc3R5bGUucG9zaXRpb24gIT0gJyc7XHJcbiAgICAgICAgICAgICAgICB9KSkgc2VwcHVrdSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogMi4g4oCcR2xvYmFs4oCdIHZhcnMgdXNlZCBhY3Jvc3MgdGhlIHBvbHlmaWxsXHJcbiAgICAgKi9cclxuICAgIHZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIFNoYWRvdyBSb290IGNvbnN0cnVjdG9yIGV4aXN0cyB0byBtYWtlIGZ1cnRoZXIgY2hlY2tzIHNpbXBsZXJcclxuICAgIHZhciBzaGFkb3dSb290RXhpc3RzID0gdHlwZW9mIFNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgXHJcbiAgICAvLyBMYXN0IHNhdmVkIHNjcm9sbCBwb3NpdGlvblxyXG4gICAgdmFyIHNjcm9sbCA9IHtcclxuICAgICAgICB0b3A6IG51bGwsXHJcbiAgICAgICAgbGVmdDogbnVsbFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLy8gQXJyYXkgb2YgY3JlYXRlZCBTdGlja3kgaW5zdGFuY2VzXHJcbiAgICB2YXIgc3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDMuIFV0aWxpdHkgZnVuY3Rpb25zXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRPYmosIHNvdXJjZU9iamVjdCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRPYmpba2V5XSA9IHNvdXJjZU9iamVjdFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwYXJzZU51bWVyaWModmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKSB8fCAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXREb2NPZmZzZXRUb3Aobm9kZSkge1xyXG4gICAgICAgIHZhciBkb2NPZmZzZXRUb3AgPSAwO1xyXG4gICAgXHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgZG9jT2Zmc2V0VG9wICs9IG5vZGUub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGRvY09mZnNldFRvcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDQuIFN0aWNreSBjbGFzc1xyXG4gICAgICovXHJcbiAgICBcclxuICAgIHZhciBTdGlja3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU3RpY2t5KG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0aWNreSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIEhUTUxFbGVtZW50Jyk7XHJcbiAgICAgICAgICAgIGlmIChzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kuX25vZGUgPT09IG5vZGU7XHJcbiAgICAgICAgICAgIH0pKSB0aHJvdyBuZXcgRXJyb3IoJ1N0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoaXMgbm9kZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgc3RpY2tpZXMucHVzaCh0aGlzKTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfY3JlYXRlQ2xhc3MoU3RpY2t5LCBbe1xyXG4gICAgICAgICAgICBrZXk6ICdyZWZyZXNoJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwcHVrdSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB0aGlzLl9kZWFjdGl2YXRlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5fbm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDEuIFNhdmUgbm9kZSBjb21wdXRlZCBwcm9wc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZUNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVDb21wdXRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IG5vZGVDb21wdXRlZFN0eWxlLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0Zsb2F0OiBub2RlQ29tcHV0ZWRTdHlsZS5jc3NGbG9hdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDIuIENoZWNrIGlmIHRoZSBub2RlIGNhbiBiZSBhY3RpdmF0ZWRcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlRmxvYXQobm9kZUNvbXB1dGVkUHJvcHMudG9wKSkgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAndGFibGUtY2VsbCcgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAnbm9uZScpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDMuIENoZWNrIGlmIHRoZSBjdXJyZW50IG5vZGUgcG9zaXRpb24gaXMgYHN0aWNreWAuIElmIGl0IGlzLCBpdCBtZWFucyB0aGF0IHRoZSBicm93c2VyIHN1cHBvcnRzIHN0aWNreSBwb3NpdGlvbmluZyxcclxuICAgICAgICAgICAgICAgICAqICAgIGJ1dCB0aGUgcG9seWZpbGwgd2FzIGZvcmNlLWVuYWJsZWQuIFdlIHNldCB0aGUgbm9kZeKAmXMgcG9zaXRpb24gdG8gYHN0YXRpY2AgYmVmb3JlIGNvbnRpbnVpbmcsIHNvIHRoYXQgdGhlIG5vZGVcclxuICAgICAgICAgICAgICAgICAqICAgIGlzIGluIGl04oCZcyBpbml0aWFsIHBvc2l0aW9uIHdoZW4gd2UgZ2F0aGVyIGl0cyBwYXJhbXMuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFBvc2l0aW9uID0gbm9kZS5zdHlsZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbiA9PSAnc3RpY2t5JyB8fCBub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbiA9PSAnLXdlYmtpdC1zdGlja3knKSBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA0LiBHZXQgbmVjZXNzYXJ5IG5vZGUgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnROb2RlID0gc2hhZG93Um9vdEV4aXN0cyAmJiByZWZlcmVuY2VOb2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IHJlZmVyZW5jZU5vZGUuaG9zdCA6IHJlZmVyZW5jZU5vZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVdpbk9mZnNldCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50V2luT2Zmc2V0ID0gcGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnROb2RlKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwYXJlbnROb2RlLnN0eWxlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQ6IHBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2Zmc2V0VG9XaW5kb3cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbm9kZVdpbk9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBub2RlV2luT2Zmc2V0LnJpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2Zmc2V0VG9QYXJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBub2RlV2luT2Zmc2V0LnRvcCAtIHBhcmVudFdpbk9mZnNldC50b3AgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbm9kZVdpbk9mZnNldC5sZWZ0IC0gcGFyZW50V2luT2Zmc2V0LmxlZnQgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAtbm9kZVdpbk9mZnNldC5yaWdodCArIHBhcmVudFdpbk9mZnNldC5yaWdodCAtIHBhcnNlTnVtZXJpYyhwYXJlbnRDb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcmlnaW5hbFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogbm9kZS5zdHlsZS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBub2RlLnN0eWxlLmJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBub2RlLnN0eWxlLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IG5vZGUuc3R5bGUucmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGUuc3R5bGUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBub2RlLnN0eWxlLm1hcmdpblRvcCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBub2RlLnN0eWxlLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGUuc3R5bGUubWFyZ2luUmlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBub2RlVG9wVmFsdWUgPSBwYXJzZU51bWVyaWMobm9kZUNvbXB1dGVkUHJvcHMudG9wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbWl0cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogbm9kZVdpbk9mZnNldC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBub2RlVG9wVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBwYXJlbnRXaW5PZmZzZXQudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0ICsgcGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgLSBub2RlLm9mZnNldEhlaWdodCAtIG5vZGVUb3BWYWx1ZSAtIHBhcnNlTnVtZXJpYyhub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5Cb3R0b20pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogNS4gRW5zdXJlIHRoYXQgdGhlIG5vZGUgd2lsbCBiZSBwb3NpdGlvbmVkIHJlbGF0aXZlbHkgdG8gdGhlIHBhcmVudCBub2RlXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRQb3NpdGlvbiA9IHBhcmVudENvbXB1dGVkU3R5bGUucG9zaXRpb247XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbiAhPSAnYWJzb2x1dGUnICYmIHBhcmVudFBvc2l0aW9uICE9ICdyZWxhdGl2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDYuIFJlY2FsYyBub2RlIHBvc2l0aW9uLlxyXG4gICAgICAgICAgICAgICAgICogICAgSXTigJlzIGltcG9ydGFudCB0byBkbyB0aGlzIGJlZm9yZSBjbG9uZSBpbmplY3Rpb24gdG8gYXZvaWQgc2Nyb2xsaW5nIGJ1ZyBpbiBDaHJvbWUuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2FsY1Bvc2l0aW9uKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA3LiBDcmVhdGUgYSBjbG9uZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLl9jbG9uZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2xvbmUubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBzdHlsZXMgdG8gdGhlIGNsb25lXHJcbiAgICAgICAgICAgICAgICBleHRlbmQoY2xvbmUubm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBub2RlV2luT2Zmc2V0LnJpZ2h0IC0gbm9kZVdpbk9mZnNldC5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5vZGVXaW5PZmZzZXQuYm90dG9tIC0gbm9kZVdpbk9mZnNldC50b3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luQm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpblJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0Zsb2F0OiBub2RlQ29tcHV0ZWRQcm9wcy5jc3NGbG9hdCxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMCxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJTcGFjaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3N0YXRpYydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VOb2RlLmluc2VydEJlZm9yZShjbG9uZS5ub2RlLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIGNsb25lLmRvY09mZnNldFRvcCA9IGdldERvY09mZnNldFRvcChjbG9uZS5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX3JlY2FsY1Bvc2l0aW9uJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWNhbGNQb3NpdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlIHx8IHRoaXMuX3JlbW92ZWQpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHN0aWNreU1vZGUgPSBzY3JvbGwudG9wIDw9IHRoaXMuX2xpbWl0cy5zdGFydCA/ICdzdGFydCcgOiBzY3JvbGwudG9wID49IHRoaXMuX2xpbWl0cy5lbmQgPyAnZW5kJyA6ICdtaWRkbGUnO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RpY2t5TW9kZSA9PSBzdGlja3lNb2RlKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RpY2t5TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQubGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQucmlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLl9vZmZzZXRUb1BhcmVudC50b3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9ub2RlLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuX29mZnNldFRvV2luZG93LmxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuX29mZnNldFRvV2luZG93LnJpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5fc3R5bGVzLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fbm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5yaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gc3RpY2t5TW9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX2Zhc3RDaGVjaycsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZmFzdENoZWNrKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUgfHwgdGhpcy5fcmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZ2V0RG9jT2Zmc2V0VG9wKHRoaXMuX2Nsb25lLm5vZGUpIC0gdGhpcy5fY2xvbmUuZG9jT2Zmc2V0VG9wKSA+IDEgfHwgTWF0aC5hYnModGhpcy5fcGFyZW50Lm5vZGUub2Zmc2V0SGVpZ2h0IC0gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgPiAxKSB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX2RlYWN0aXZhdGUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2RlYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb25lLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9jbG9uZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jbG9uZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHRoaXMuX3N0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc3R5bGVzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGVsZW1lbnTigJlzIHBhcmVudCBub2RlIGlzIHVzZWQgYnkgb3RoZXIgc3RpY2tpZXMuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBub3QsIHJlc3RvcmUgcGFyZW50IG5vZGXigJlzIHN0eWxlcy5cclxuICAgICAgICAgICAgICAgIGlmICghc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreSAhPT0gX3RoaXMgJiYgc3RpY2t5Ll9wYXJlbnQgJiYgc3RpY2t5Ll9wYXJlbnQubm9kZSA9PT0gX3RoaXMuX3BhcmVudC5ub2RlO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fcGFyZW50Lm5vZGUuc3R5bGUsIHRoaXMuX3BhcmVudC5zdHlsZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3BhcmVudDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RpY2t5TW9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29mZnNldFRvV2luZG93O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29mZnNldFRvUGFyZW50O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpbWl0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncmVtb3ZlJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWFjdGl2YXRlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Ll9ub2RlID09PSBfdGhpczIuX25vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2tpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV0pO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIFN0aWNreTtcclxuICAgIH0oKTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDUuIFN0aWNreWZpbGwgQVBJXHJcbiAgICAgKi9cclxuICAgIFxyXG4gICAgXHJcbiAgICB2YXIgU3RpY2t5ZmlsbCA9IHtcclxuICAgICAgICBzdGlja2llczogc3RpY2tpZXMsXHJcbiAgICAgICAgU3RpY2t5OiBTdGlja3ksXHJcbiAgICBcclxuICAgICAgICBmb3JjZVN0aWNreTogZnVuY3Rpb24gZm9yY2VTdGlja3koKSB7XHJcbiAgICAgICAgICAgIHNlcHB1a3UgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkT25lOiBmdW5jdGlvbiBhZGRPbmUobm9kZSkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGl04oCZcyBhIG5vZGVcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWF5YmUgaXTigJlzIGEgbm9kZSBsaXN0IG9mIHNvbWUgc29ydD9cclxuICAgICAgICAgICAgICAgIC8vIFRha2UgZmlyc3Qgbm9kZSBmcm9tIHRoZSBsaXN0IHRoZW5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmxlbmd0aCAmJiBub2RlWzBdKSBub2RlID0gbm9kZVswXTtlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIFN0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoZSBub2RlXHJcbiAgICAgICAgICAgIC8vIGFuZCByZXR1cm4gZXhpc3Rpbmcgc3RpY2t5XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja2llc1tpXS5fbm9kZSA9PT0gbm9kZSkgcmV0dXJuIHN0aWNraWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gbmV3IHN0aWNreVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0aWNreShub2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIElmIGl04oCZcyBhIG5vZGUgbWFrZSBhbiBhcnJheSBvZiBvbmUgbm9kZVxyXG4gICAgICAgICAgICBpZiAobm9kZUxpc3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgbm9kZUxpc3QgPSBbbm9kZUxpc3RdO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYXJndW1lbnQgaXMgYW4gaXRlcmFibGUgb2Ygc29tZSBzb3J0XHJcbiAgICAgICAgICAgIGlmICghbm9kZUxpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQWRkIGV2ZXJ5IGVsZW1lbnQgYXMgYSBzdGlja3kgYW5kIHJldHVybiBhbiBhcnJheSBvZiBjcmVhdGVkIFN0aWNreSBpbnN0YW5jZXNcclxuICAgICAgICAgICAgdmFyIGFkZGVkU3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdOKAmXMgbm90IGFuIEhUTUxFbGVtZW50IOKAkyBjcmVhdGUgYW4gZW1wdHkgZWxlbWVudCB0byBwcmVzZXJ2ZSAxLXRvLTFcclxuICAgICAgICAgICAgICAgIC8vIGNvcnJlbGF0aW9uIHdpdGggaW5wdXQgbGlzdFxyXG4gICAgICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkU3RpY2tpZXMucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnY29udGludWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBTdGlja3lmaWxsIGlzIGFscmVhZHkgYXBwbGllZCB0byB0aGUgbm9kZVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGV4aXN0aW5nIHN0aWNreVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKHN0aWNreSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSByZXR1cm4gJ2NvbnRpbnVlJztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgbmV3IHN0aWNreVxyXG4gICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKG5ldyBTdGlja3kobm9kZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcmV0MiA9IF9sb29wKGkpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoX3JldDIgPT09ICdjb250aW51ZScpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGFkZGVkU3RpY2tpZXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWZyZXNoQWxsOiBmdW5jdGlvbiByZWZyZXNoQWxsKCkge1xyXG4gICAgICAgICAgICBzdGlja2llcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZU9uZTogZnVuY3Rpb24gcmVtb3ZlT25lKG5vZGUpIHtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciBpdOKAmXMgYSBub2RlXHJcbiAgICAgICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1heWJlIGl04oCZcyBhIG5vZGUgbGlzdCBvZiBzb21lIHNvcnQ/XHJcbiAgICAgICAgICAgICAgICAvLyBUYWtlIGZpcnN0IG5vZGUgZnJvbSB0aGUgbGlzdCB0aGVuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgbm9kZVswXSkgbm9kZSA9IG5vZGVbMF07ZWxzZSByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHN0aWNraWVzIGJvdW5kIHRvIHRoZSBub2RlcyBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICBzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGlja3kucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgLy8gSWYgaXTigJlzIGEgbm9kZSBtYWtlIGFuIGFycmF5IG9mIG9uZSBub2RlXHJcbiAgICAgICAgICAgIGlmIChub2RlTGlzdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBub2RlTGlzdCA9IFtub2RlTGlzdF07XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBpdGVyYWJsZSBvZiBzb21lIHNvcnRcclxuICAgICAgICAgICAgaWYgKCFub2RlTGlzdC5sZW5ndGgpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHN0aWNraWVzIGJvdW5kIHRvIHRoZSBub2RlcyBpbiB0aGUgbGlzdFxyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBfbG9vcDIgPSBmdW5jdGlvbiBfbG9vcDIoaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2RlTGlzdFtpXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0aWNreS5fbm9kZSA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3kucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIF9sb29wMihpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQWxsOiBmdW5jdGlvbiByZW1vdmVBbGwoKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGlja2llcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzWzBdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDYuIFNldHVwIGV2ZW50cyAodW5sZXNzIHRoZSBwb2x5ZmlsbCB3YXMgZGlzYWJsZWQpXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIHNjcm9sbCBwb3NpdGlvbiBjaGFuZ2VzIGFuZCB0cmlnZ2VyIHJlY2FsYy9yZWZyZXNoIGlmIG5lZWRlZFxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VYT2Zmc2V0ICE9IHNjcm9sbC5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIFN0aWNreWZpbGwucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCAhPSBzY3JvbGwudG9wKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIHJlY2FsYyBwb3NpdGlvbiBmb3IgYWxsIHN0aWNraWVzXHJcbiAgICAgICAgICAgICAgICBzdGlja2llcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5Ll9yZWNhbGNQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjaGVja1Njcm9sbCgpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja1Njcm9sbCk7XHJcbiAgICBcclxuICAgICAgICAvLyBXYXRjaCBmb3Igd2luZG93IHJlc2l6ZXMgYW5kIGRldmljZSBvcmllbnRhdGlvbiBjaGFuZ2VzIGFuZCB0cmlnZ2VyIHJlZnJlc2hcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgU3RpY2t5ZmlsbC5yZWZyZXNoQWxsKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBTdGlja3lmaWxsLnJlZnJlc2hBbGwpO1xyXG4gICAgXHJcbiAgICAgICAgLy9GYXN0IGRpcnR5IGNoZWNrIGZvciBsYXlvdXQgY2hhbmdlcyBldmVyeSA1MDBtc1xyXG4gICAgICAgIHZhciBmYXN0Q2hlY2tUaW1lciA9IHZvaWQgMDtcclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0RmFzdENoZWNrVGltZXIoKSB7XHJcbiAgICAgICAgICAgIGZhc3RDaGVja1RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreS5fZmFzdENoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBzdG9wRmFzdENoZWNrVGltZXIoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZmFzdENoZWNrVGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHZhciBkb2NIaWRkZW5LZXkgPSB2b2lkIDA7XHJcbiAgICAgICAgdmFyIHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUgPSB2b2lkIDA7XHJcbiAgICBcclxuICAgICAgICBpZiAoJ2hpZGRlbicgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgZG9jSGlkZGVuS2V5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICAgIHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICgnd2Via2l0SGlkZGVuJyBpbiBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICBkb2NIaWRkZW5LZXkgPSAnd2Via2l0SGlkZGVuJztcclxuICAgICAgICAgICAgdmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAodmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50W2RvY0hpZGRlbktleV0pIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudFtkb2NIaWRkZW5LZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcEZhc3RDaGVja1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCFzZXBwdWt1KSBpbml0KCk7XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiA3LiBFeHBvc2UgU3RpY2t5ZmlsbFxyXG4gICAgICovXHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gU3RpY2t5ZmlsbDtcclxuICAgIH0gZWxzZSBpZiAoaXNXaW5kb3dEZWZpbmVkKSB7XHJcbiAgICAgICAgd2luZG93LlN0aWNreWZpbGwgPSBTdGlja3lmaWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8qISBndW1zaG9lanMgdjMuNS4wIHwgKGMpIDIwMTcgQ2hyaXMgRmVyZGluYW5kaSB8IE1JVCBMaWNlbnNlIHwgaHR0cDovL2dpdGh1Yi5jb20vY2ZlcmRpbmFuZGkvZ3Vtc2hvZSAqL1xuIShmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdChlKSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dChlKTplLmd1bXNob2U9dChlKX0pKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOnRoaXMud2luZG93fHx0aGlzLmdsb2JhbCwoZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQsbixvLHIsYSxjLGksbD17fSxzPVwicXVlcnlTZWxlY3RvclwiaW4gZG9jdW1lbnQmJlwiYWRkRXZlbnRMaXN0ZW5lclwiaW4gZSYmXCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpLHU9W10sZj17c2VsZWN0b3I6XCJbZGF0YS1ndW1zaG9lXSBhXCIsc2VsZWN0b3JIZWFkZXI6XCJbZGF0YS1ndW1zaG9lLWhlYWRlcl1cIixjb250YWluZXI6ZSxvZmZzZXQ6MCxhY3RpdmVDbGFzczpcImFjdGl2ZVwiLHNjcm9sbERlbGF5OiExLGNhbGxiYWNrOmZ1bmN0aW9uKCl7fX0sZD1mdW5jdGlvbihlLHQsbil7aWYoXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlmb3IodmFyIG8gaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxvKSYmdC5jYWxsKG4sZVtvXSxvLGUpO2Vsc2UgZm9yKHZhciByPTAsYT1lLmxlbmd0aDtyPGE7cisrKXQuY2FsbChuLGVbcl0scixlKX0sdj1mdW5jdGlvbigpe3ZhciBlPXt9LHQ9ITEsbj0wLG89YXJndW1lbnRzLmxlbmd0aDtcIltvYmplY3QgQm9vbGVhbl1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHNbMF0pJiYodD1hcmd1bWVudHNbMF0sbisrKTtmb3IoO248bztuKyspe3ZhciByPWFyZ3VtZW50c1tuXTshKGZ1bmN0aW9uKG4pe2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYodCYmXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuW29dKT9lW29dPXYoITAsZVtvXSxuW29dKTplW29dPW5bb10pfSkocil9cmV0dXJuIGV9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIE1hdGgubWF4KGUuc2Nyb2xsSGVpZ2h0LGUub2Zmc2V0SGVpZ2h0LGUuY2xpZW50SGVpZ2h0KX0sZz1mdW5jdGlvbigpe3JldHVybiBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCl9LGg9ZnVuY3Rpb24oZSl7dmFyIG49MDtpZihlLm9mZnNldFBhcmVudClkb3tuKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50fXdoaWxlKGUpO2Vsc2Ugbj1lLm9mZnNldFRvcDtyZXR1cm4gbj1uLWEtdC5vZmZzZXQsbj49MD9uOjB9LHA9ZnVuY3Rpb24odCl7dmFyIG49dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyZXR1cm4gbi50b3A+PTAmJm4ubGVmdD49MCYmbi5ib3R0b208PShlLmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSYmbi5yaWdodDw9KGUuaW5uZXJXaWR0aHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKX0seT1mdW5jdGlvbigpe3Uuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5kaXN0YW5jZT50LmRpc3RhbmNlPy0xOmUuZGlzdGFuY2U8dC5kaXN0YW5jZT8xOjB9KSl9O2wuc2V0RGlzdGFuY2VzPWZ1bmN0aW9uKCl7bz1nKCksYT1yP20ocikraChyKTowLGQodSwoZnVuY3Rpb24oZSl7ZS5kaXN0YW5jZT1oKGUudGFyZ2V0KX0pKSx5KCl9O3ZhciBiPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0LnNlbGVjdG9yKTtkKGUsKGZ1bmN0aW9uKGUpe2lmKGUuaGFzaCl7dmFyIHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLmhhc2gpO3QmJnUucHVzaCh7bmF2OmUsdGFyZ2V0OnQscGFyZW50OlwibGlcIj09PWUucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk/ZS5wYXJlbnROb2RlOm51bGwsZGlzdGFuY2U6MH0pfX0pKX0sSD1mdW5jdGlvbigpe2MmJihjLm5hdi5jbGFzc0xpc3QucmVtb3ZlKHQuYWN0aXZlQ2xhc3MpLGMucGFyZW50JiZjLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHQuYWN0aXZlQ2xhc3MpKX0sQz1mdW5jdGlvbihlKXtIKCksZS5uYXYuY2xhc3NMaXN0LmFkZCh0LmFjdGl2ZUNsYXNzKSxlLnBhcmVudCYmZS5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0LmFjdGl2ZUNsYXNzKSx0LmNhbGxiYWNrKGUpLGM9e25hdjplLm5hdixwYXJlbnQ6ZS5wYXJlbnR9fTtsLmdldEN1cnJlbnROYXY9ZnVuY3Rpb24oKXt2YXIgbj1lLnBhZ2VZT2Zmc2V0O2lmKGUuaW5uZXJIZWlnaHQrbj49byYmcCh1WzBdLnRhcmdldCkpcmV0dXJuIEModVswXSksdVswXTtmb3IodmFyIHI9MCxhPXUubGVuZ3RoO3I8YTtyKyspe3ZhciBjPXVbcl07aWYoYy5kaXN0YW5jZTw9bilyZXR1cm4gQyhjKSxjfUgoKSx0LmNhbGxiYWNrKCl9O3ZhciBMPWZ1bmN0aW9uKCl7ZCh1LChmdW5jdGlvbihlKXtlLm5hdi5jbGFzc0xpc3QuY29udGFpbnModC5hY3RpdmVDbGFzcykmJihjPXtuYXY6ZS5uYXYscGFyZW50OmUucGFyZW50fSl9KSl9O2wuZGVzdHJveT1mdW5jdGlvbigpe3QmJih0LmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsaiwhMSksdC5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGosITEpLHU9W10sdD1udWxsLG49bnVsbCxvPW51bGwscj1udWxsLGE9bnVsbCxjPW51bGwsaT1udWxsKX07dmFyIEU9ZnVuY3Rpb24oZSl7d2luZG93LmNsZWFyVGltZW91dChuKSxuPXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7bC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKX0pLDY2KX0saj1mdW5jdGlvbihlKXtufHwobj1zZXRUaW1lb3V0KChmdW5jdGlvbigpe249bnVsbCxcInNjcm9sbFwiPT09ZS50eXBlJiZsLmdldEN1cnJlbnROYXYoKSxcInJlc2l6ZVwiPT09ZS50eXBlJiYobC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKSl9KSw2NikpfTtyZXR1cm4gbC5pbml0PWZ1bmN0aW9uKGUpe3MmJihsLmRlc3Ryb3koKSx0PXYoZixlfHx7fSkscj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQuc2VsZWN0b3JIZWFkZXIpLGIoKSwwIT09dS5sZW5ndGgmJihMKCksbC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKSx0LmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsaiwhMSksdC5zY3JvbGxEZWxheT90LmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsRSwhMSk6dC5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGosITEpKSl9LGx9KSk7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUV4cGFuZGFibGUgPSAoXG4gIHRvZ2dsZUVsZW1lbnQsXG4gIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gICAgZm9yY2VDbG9zZSA9IGZhbHNlLFxuICAgIGNsb3NlU2libGluZ3MgPSBmYWxzZSxcbiAgICBzaWJsaW5nc1NlbGVjdG9yID0gJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdG9nZ2xlRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICk7XG5cbiAgLy8gRXhpdCBpZiBubyB0YXJnZXQgZm91bmRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBzdGF0dXNcbiAgY29uc3QgaXNFeHBhbmRlZCA9XG4gICAgZm9yY2VDbG9zZSA9PT0gdHJ1ZSB8fFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcblxuICAvLyBUb2dnbGUgdGhlIGV4cGFuZGFibGUvY29sbGFwc2libGVcbiAgdG9nZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaXNFeHBhbmRlZCk7XG5cbiAgLy8gVG9nZ2xlIGxhYmVsIGlmIHBvc3NpYmxlXG4gIGlmICghaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpO1xuICB9IGVsc2UgaWYgKGlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtY29sbGFwc2VkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2RhdGEtbGFiZWwtY29sbGFwc2VkJ1xuICAgICk7XG4gIH1cblxuICAvLyBDbG9zZSBzaWJsaW5ncyBpZiByZXF1ZXN0ZWRcbiAgaWYgKGNsb3NlU2libGluZ3MgPT09IHRydWUpIHtcbiAgICBjb25zdCBzaWJsaW5nc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2libGluZ3NTZWxlY3RvcikpXG4gICAgICAuZmlsdGVyKHNpYmxpbmcgPT4gc2libGluZyAhPT0gdG9nZ2xlRWxlbWVudCk7XG5cbiAgICBzaWJsaW5nc0FycmF5LmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHNpYmxpbmcsIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IGluaXRFeHBhbmRhYmxlcyA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PiB7XG4gIC8vIEV4aXQgaWYgbm8gc2VsZWN0b3Igd2FzIHByb3ZpZGVkXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7IGNvbnRleHQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcbn07XG4iLCIvKipcbiAqIE5hdmlnYXRpb24gaW5wYWdlIHJlbGF0ZWQgYmVoYXZpb3JzLlxuICovXG5cbmltcG9ydCBTdGlja3lmaWxsIGZyb20gJ3N0aWNreWZpbGxqcyc7XG5pbXBvcnQgZ3Vtc2hvZSBmcm9tICdndW1zaG9lanMnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgeyB0b2dnbGVFeHBhbmRhYmxlIH0gZnJvbSAnQGVjbC9nZW5lcmljLWNvbXBvbmVudC1leHBhbmRhYmxlJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgbmF2aWdhdGlvbklucGFnZXMgPSAoe1xuICBzdGlja3lTZWxlY3Rvcjogc3RpY2t5U2VsZWN0b3IgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbicsXG4gIHNweVNlbGVjdG9yOiBzcHlTZWxlY3RvciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX19saW5rJyxcbiAgc3B5Q2xhc3M6IHNweUNsYXNzID0gJ2VjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fbGluay0taXMtYWN0aXZlJyxcbiAgc3B5QWN0aXZlQ29udGFpbmVyOiBzcHlBY3RpdmVDb250YWluZXIgPSAnZWNsLWlucGFnZS1uYXZpZ2F0aW9uLS12aXNpYmxlJyxcbiAgc3B5VHJpZ2dlcjogc3B5VHJpZ2dlciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX190cmlnZ2VyJyxcbiAgc3B5T2Zmc2V0OiBzcHlPZmZzZXQgPSAyMCxcbiAgdG9nZ2xlU2VsZWN0b3I6IHRvZ2dsZVNlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX3RyaWdnZXInLFxuICBsaW5rc1NlbGVjdG9yOiBsaW5rc1NlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX2xpbmsnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBzdGlja3lJbnN0YW5jZTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGluaXRTdGlja3koZWxlbWVudCkge1xuICAgIHN0aWNreUluc3RhbmNlID0gbmV3IFN0aWNreWZpbGwuU3RpY2t5KGVsZW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveVN0aWNreSgpIHtcbiAgICBpZiAoc3RpY2t5SW5zdGFuY2UpIHtcbiAgICAgIHN0aWNreUluc3RhbmNlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTY3JvbGxTcHkoaW5wYWdlTmF2RWxlbWVudCkge1xuICAgIGd1bXNob2UuaW5pdCh7XG4gICAgICBzZWxlY3Rvcjogc3B5U2VsZWN0b3IsXG4gICAgICBhY3RpdmVDbGFzczogc3B5Q2xhc3MsXG4gICAgICBvZmZzZXQ6IHNweU9mZnNldCxcbiAgICAgIGNhbGxiYWNrKG5hdikge1xuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNweVRyaWdnZXIpO1xuXG4gICAgICAgIGlmICghbmF2KSB7XG4gICAgICAgICAgaW5wYWdlTmF2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNweUFjdGl2ZUNvbnRhaW5lcik7XG4gICAgICAgICAgbmF2aWdhdGlvblRpdGxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlucGFnZU5hdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChzcHlBY3RpdmVDb250YWluZXIpO1xuICAgICAgICAgIG5hdmlnYXRpb25UaXRsZS5pbm5lckhUTUwgPSBuYXYubmF2LmlubmVySFRNTDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3lTY3JvbGxTcHkoKSB7XG4gICAgZ3Vtc2hvZS5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBJbml0XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgaW5wYWdlTmF2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RpY2t5U2VsZWN0b3IpO1xuICAgIGNvbnN0IHRvZ2dsZUVsZW1lbnQgPSBpbnBhZ2VOYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGNvbnN0IG5hdkxpbmtzID0gcXVlcnlBbGwobGlua3NTZWxlY3RvciwgaW5wYWdlTmF2RWxlbWVudCk7XG5cbiAgICBpbml0U3RpY2t5KGlucGFnZU5hdkVsZW1lbnQpO1xuICAgIGluaXRTY3JvbGxTcHkoaW5wYWdlTmF2RWxlbWVudCk7XG5cbiAgICB0b2dnbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHRvZ2dsZUVsZW1lbnQsIHsgY29udGV4dDogaW5wYWdlTmF2RWxlbWVudCB9KTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PlxuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlRXhwYW5kYWJsZSh0b2dnbGVFbGVtZW50LCB7XG4gICAgICAgICAgY29udGV4dDogaW5wYWdlTmF2RWxlbWVudCxcbiAgICAgICAgICBmb3JjZUNsb3NlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIERlc3Ryb3lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBkZXN0cm95U2Nyb2xsU3B5KCk7XG4gICAgZGVzdHJveVN0aWNreSgpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBuYXZpZ2F0aW9uSW5wYWdlcztcbiIsImltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuaW1wb3J0IHsgdG9nZ2xlRXhwYW5kYWJsZSB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZSc7XG5cbmNvbnN0IG9uQ2xpY2sgPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGlmIChub2RlICYmIG5vZGUuaGFzQXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJykpIHtcbiAgICBjb25zdCBoYXNQb3B1cCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJyk7XG4gICAgaWYgKGhhc1BvcHVwID09PSAnJyB8fCBoYXNQb3B1cCA9PT0gJ3RydWUnKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUobm9kZSwge1xuICAgICAgICBjb250ZXh0OiBtZW51LFxuICAgICAgICBjbG9zZVNpYmxpbmdzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBvbktleWRvd24gPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRUYWIgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IHByZXZpb3VzVGFiSXRlbSA9XG4gICAgY3VycmVudFRhYi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8XG4gICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0IG5leHRUYWJJdGVtID1cbiAgICBjdXJyZW50VGFiLm5leHRFbGVtZW50U2libGluZyB8fCBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgLy8gZG9uJ3QgY2F0Y2gga2V5IGV2ZW50cyB3aGVuIOKMmCBvciBBbHQgbW9kaWZpZXIgaXMgcHJlc2VudFxuICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgLy8gY2F0Y2ggbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gIC8vIGlmIG5ldyBuZXh0L3ByZXYgdGFiIGF2YWlsYWJsZSwgc2hvdyBpdCBieSBwYXNzaW5nIHRhYiBhbmNob3IgdG8gc2hvd1RhYiBtZXRob2RcbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAvLyBFTlRFUiBvciBTUEFDRVxuICAgIGNhc2UgMTM6XG4gICAgY2FzZSAzMjpcbiAgICAgIG9uQ2xpY2soZS5jdXJyZW50VGFyZ2V0LCBtZW51KShlKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBMRUZUIGFuZCBVUFxuICAgIGNhc2UgMzc6XG4gICAgY2FzZSAzODpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZpb3VzVGFiSXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuZm9jdXMoKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBSSUdIVCBhbmQgRE9XTlxuICAgIGNhc2UgMzk6XG4gICAgY2FzZSA0MDpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG5leHRUYWJJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5mb2N1cygpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWVnYW1lbnUgPSAoe1xuICBzZWxlY3Rvcjogc2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnUnLFxuICB0b2dnbGVTZWxlY3RvcjogdG9nZ2xlU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX3RvZ2dsZScsXG4gIGxpc3RTZWxlY3RvcjogbGlzdFNlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51X19yb290JyxcbiAgbGlua1NlbGVjdG9yOiBsaW5rU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX2xpbmsnLFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG1lZ2FtZW51c0FycmF5ID0gcXVlcnlBbGwoc2VsZWN0b3IpO1xuXG4gIG1lZ2FtZW51c0FycmF5LmZvckVhY2gobWVudSA9PiB7XG4gICAgLy8gTWFrZSB0aGUgdG9nZ2xlIGV4cGFuZGFibGVcbiAgICBjb25zdCB0b2dnbGUgPSBtZW51LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIHRvZ2dsZUV4cGFuZGFibGUodG9nZ2xlLCB7IGNvbnRleHQ6IG1lbnUgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBsaXN0IG9mIGxpbmtzXG4gICAgY29uc3QgbGlzdCA9IG1lbnUucXVlcnlTZWxlY3RvcihsaXN0U2VsZWN0b3IpO1xuXG4gICAgLy8gR2V0IGV4cGFuZGFibGVzIHdpdGhpbiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGVzQXJyYXkgPSBxdWVyeUFsbChsaW5rU2VsZWN0b3IsIGxpc3QpO1xuXG4gICAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2sobm9kZSwgbGlzdCkpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKG5vZGUsIGxpc3QpKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZWdhbWVudTtcbiIsIi8qKlxuICBzdGlja3liaXRzIC0gU3RpY2t5Yml0cyBpcyBhIGxpZ2h0d2VpZ2h0IGFsdGVybmF0aXZlIHRvIGBwb3NpdGlvbjogc3RpY2t5YCBwb2x5ZmlsbHNcbiAgQHZlcnNpb24gdjMuNi42XG4gIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xsYXJzaGF2ZWNsdWIvc3RpY2t5Yml0cyNyZWFkbWVcbiAgQGF1dGhvciBKZWZmIFdhaW53cmlnaHQgPHlvd2FpbndyaWdodEBnbWFpbC5jb20+IChodHRwczovL2plZmZyeS5pbilcbiAgQGxpY2Vuc2UgTUlUXG4qKi9cbi8qXG4gIFNUSUNLWUJJVFMg8J+SiVxuICAtLS0tLS0tLVxuICA+IGEgbGlnaHR3ZWlnaHQgYWx0ZXJuYXRpdmUgdG8gYHBvc2l0aW9uOiBzdGlja3lgIHBvbHlmaWxscyDwn42sXG4gIC0tLS0tLS0tXG4gIC0gZWFjaCBtZXRob2QgaXMgZG9jdW1lbnRlZCBhYm92ZSBpdCBvdXIgdmlldyB0aGUgcmVhZG1lXG4gIC0gU3RpY2t5Yml0cyBkb2VzIG5vdCBtYW5hZ2UgcG9seW1vcnBoaWMgZnVuY3Rpb25hbGl0eSAocG9zaXRpb24gbGlrZSBwcm9wZXJ0aWVzKVxuICAqIHBvbHltb3JwaGljIGZ1bmN0aW9uYWxpdHk6IChpbiB0aGUgY29udGV4dCBvZiBkZXNjcmliaW5nIFN0aWNreWJpdHMpXG4gICAgbWVhbnMgbWFraW5nIHRoaW5ncyBsaWtlIGBwb3NpdGlvbjogc3RpY2t5YCBiZSBsb29zZWx5IHN1cHBvcnRlZCB3aXRoIHBvc2l0aW9uIGZpeGVkLlxuICAgIEl0IGFsc28gbWVhbnMgdGhhdCBmZWF0dXJlcyBsaWtlIGB1c2VTdGlja3lDbGFzc2VzYCB0YWtlcyBvbiBzdHlsZXMgbGlrZSBgcG9zaXRpb246IGZpeGVkYC5cbiAgLS0tLS0tLS1cbiAgZGVmYXVsdHMg8J+UjFxuICAtLS0tLS0tLVxuICAtIHZlcnNpb24gPSBgcGFja2FnZS5qc29uYCB2ZXJzaW9uXG4gIC0gdXNlckFnZW50ID0gdmlld2VyIGJyb3dzZXIgYWdlbnRcbiAgLSB0YXJnZXQgPSBET00gZWxlbWVudCBzZWxlY3RvclxuICAtIG5vU3R5bGVzID0gYm9vbGVhblxuICAtIG9mZnNldCA9IG51bWJlclxuICAtIHBhcmVudENsYXNzID0gJ3N0cmluZydcbiAgLSBzY3JvbGxFbCA9IHdpbmRvdyB8fCBET00gZWxlbWVudCBzZWxlY3RvciB8fCBET00gZWxlbWVudFxuICAtIHN0aWNreUNsYXNzID0gJ3N0cmluZydcbiAgLSBzdHVja0NsYXNzID0gJ3N0cmluZydcbiAgLSB1c2VTdGlja3lDbGFzc2VzID0gYm9vbGVhblxuICAtIHVzZUZpeGVkID0gYm9vbGVhblxuICAtIHVzZUdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGJvb2xlYW5cbiAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gJ3N0cmluZydcbiAgLS0tLS0tLS1cbiAgcHJvcHPwn5SMXG4gIC0tLS0tLS0tXG4gIC0gcCA9IHByb3BzIHtvYmplY3R9XG4gIC0tLS0tLS0tXG4gIGluc3RhbmNlIG5vdGVcbiAgLS0tLS0tLS1cbiAgLSBzdGlja3liaXRzIHBhcmVudCBtZXRob2RzIHJldHVybiB0aGlzXG4gIC0gc3RpY2t5Yml0cyBpbnN0YW5jZSBtZXRob2RzIHJldHVybiBhbiBpbnN0YW5jZSBpdGVtXG4gIC0tLS0tLS0tXG4gIG5vbWVuY2xhdHVyZVxuICAtLS0tLS0tLVxuICAtIHRhcmdldCA9PiBlbCA9PiBlXG4gIC0gcHJvcHMgPT4gbyB8fCBwXG4gIC0gaW5zdGFuY2UgPT4gaXRlbSA9PiBpdFxuICAtLS0tLS0tLVxuICBtZXRob2RzXG4gIC0tLS0tLS0tXG4gIC0gLmRlZmluZVBvc2l0aW9uID0gZGVmaW5lcyBzdGlja3kgb3IgZml4ZWRcbiAgLSAuYWRkSW5zdGFuY2UgPSBhbiBhcnJheSBvZiBvYmplY3RzIGZvciBlYWNoIFN0aWNreWJpdHMgVGFyZ2V0XG4gIC0gLmdldENsb3Nlc3RQYXJlbnQgPSBnZXRzIHRoZSBwYXJlbnQgZm9yIG5vbi13aW5kb3cgc2Nyb2xsXG4gIC0gLmdldFRvcFBvc2l0aW9uID0gZ2V0cyB0aGUgZWxlbWVudCB0b3AgcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgdmlld3BvcnRcbiAgLSAuY29tcHV0ZVNjcm9sbE9mZnNldHMgPSBjb21wdXRlcyBzY3JvbGwgcG9zaXRpb25cbiAgLSAudG9nZ2xlQ2xhc3NlcyA9IG9sZGVyIGJyb3dzZXIgdG9nZ2xlclxuICAtIC5tYW5hZ2VTdGF0ZSA9IG1hbmFnZXMgc3RpY2t5IHN0YXRlXG4gIC0gLnJlbW92ZUNsYXNzID0gb2xkZXIgYnJvd3NlciBzdXBwb3J0IGNsYXNzIHJlbW92ZXJcbiAgLSAucmVtb3ZlSW5zdGFuY2UgPSByZW1vdmVzIGFuIGluc3RhbmNlXG4gIC0gLmNsZWFudXAgPSByZW1vdmVzIGFsbCBTdGlja3liaXRzIGluc3RhbmNlcyBhbmQgY2xlYW5zIHVwIGRvbSBmcm9tIHN0aWNreWJpdHNcbiovXG52YXIgU3RpY2t5Yml0cyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0aWNreWJpdHModGFyZ2V0LCBvYmopIHtcbiAgICB2YXIgbyA9IHR5cGVvZiBvYmogIT09ICd1bmRlZmluZWQnID8gb2JqIDoge307XG4gICAgdGhpcy52ZXJzaW9uID0gJzMuNi42JztcbiAgICB0aGlzLnVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50IHx8ICdubyBgdXNlckFnZW50YCBwcm92aWRlZCBieSB0aGUgYnJvd3Nlcic7XG4gICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgIGN1c3RvbVN0aWNreUNoYW5nZU51bWJlcjogby5jdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIgfHwgbnVsbCxcbiAgICAgIG5vU3R5bGVzOiBvLm5vU3R5bGVzIHx8IGZhbHNlLFxuICAgICAgc3RpY2t5Qml0U3RpY2t5T2Zmc2V0OiBvLnN0aWNreUJpdFN0aWNreU9mZnNldCB8fCAwLFxuICAgICAgcGFyZW50Q2xhc3M6IG8ucGFyZW50Q2xhc3MgfHwgJ2pzLXN0aWNreWJpdC1wYXJlbnQnLFxuICAgICAgc2Nyb2xsRWw6IHR5cGVvZiBvLnNjcm9sbEVsID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioby5zY3JvbGxFbCkgOiBvLnNjcm9sbEVsIHx8IHdpbmRvdyxcbiAgICAgIHN0aWNreUNsYXNzOiBvLnN0aWNreUNsYXNzIHx8ICdqcy1pcy1zdGlja3knLFxuICAgICAgc3R1Y2tDbGFzczogby5zdHVja0NsYXNzIHx8ICdqcy1pcy1zdHVjaycsXG4gICAgICBzdGlja3lDaGFuZ2VDbGFzczogby5zdGlja3lDaGFuZ2VDbGFzcyB8fCAnanMtaXMtc3RpY2t5LS1jaGFuZ2UnLFxuICAgICAgdXNlU3RpY2t5Q2xhc3Nlczogby51c2VTdGlja3lDbGFzc2VzIHx8IGZhbHNlLFxuICAgICAgdXNlRml4ZWQ6IG8udXNlRml4ZWQgfHwgZmFsc2UsXG4gICAgICB1c2VHZXRCb3VuZGluZ0NsaWVudFJlY3Q6IG8udXNlR2V0Qm91bmRpbmdDbGllbnRSZWN0IHx8IGZhbHNlLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogby52ZXJ0aWNhbFBvc2l0aW9uIHx8ICd0b3AnXG4gICAgICAvKlxuICAgICAgICBkZWZpbmUgcG9zaXRpb25WYWwgYWZ0ZXIgdGhlIHNldHRpbmcgb2YgcHJvcHMsIGJlY2F1c2UgZGVmaW5lUG9zaXRpb24gbG9va3MgYXQgdGhlIHByb3BzLnVzZUZpeGVkXG4gICAgICAgIC0tLS1cbiAgICAgICAgLSAgdXNlcyBhIGNvbXB1dGVkIChgLmRlZmluZVBvc2l0aW9uKClgKVxuICAgICAgICAtICBkZWZpbmVkIHRoZSBwb3NpdGlvblxuICAgICAgKi9cblxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvblZhbCA9IHRoaXMuZGVmaW5lUG9zaXRpb24oKSB8fCAnZml4ZWQnO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgcG9zaXRpb25WYWwgPSBfdGhpcyRwcm9wcy5wb3NpdGlvblZhbCxcbiAgICAgICAgdmVydGljYWxQb3NpdGlvbiA9IF90aGlzJHByb3BzLnZlcnRpY2FsUG9zaXRpb24sXG4gICAgICAgIG5vU3R5bGVzID0gX3RoaXMkcHJvcHMubm9TdHlsZXMsXG4gICAgICAgIHN0aWNreUJpdFN0aWNreU9mZnNldCA9IF90aGlzJHByb3BzLnN0aWNreUJpdFN0aWNreU9mZnNldDtcbiAgICB2YXIgdmVydGljYWxQb3NpdGlvblN0eWxlID0gdmVydGljYWxQb3NpdGlvbiA9PT0gJ3RvcCcgJiYgIW5vU3R5bGVzID8gc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiIDogJyc7XG4gICAgdmFyIHBvc2l0aW9uU3R5bGUgPSBwb3NpdGlvblZhbCAhPT0gJ2ZpeGVkJyA/IHBvc2l0aW9uVmFsIDogJyc7XG4gICAgdGhpcy5lbHMgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KSA6IHRhcmdldDtcbiAgICBpZiAoISgnbGVuZ3RoJyBpbiB0aGlzLmVscykpIHRoaXMuZWxzID0gW3RoaXMuZWxzXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWxzW2ldOyAvLyBzZXQgdmVydGljYWwgcG9zaXRpb25cblxuICAgICAgZWwuc3R5bGVbdmVydGljYWxQb3NpdGlvbl0gPSB2ZXJ0aWNhbFBvc2l0aW9uU3R5bGU7XG4gICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uU3R5bGU7IC8vIGluc3RhbmNlcyBhcmUgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuXG4gICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKHRoaXMuYWRkSW5zdGFuY2UoZWwsIHRoaXMucHJvcHMpKTtcbiAgICB9XG4gIH1cbiAgLypcbiAgICBzZXRTdGlja3lQb3NpdGlvbiDinJTvuI9cbiAgICAtLS0tLS0tLVxuICAgIOKAlCAgbW9zdCBiYXNpYyB0aGluZyBzdGlja3liaXRzIGRvZXNcbiAgICA9PiBjaGVja3MgdG8gc2VlIGlmIHBvc2l0aW9uIHN0aWNreSBpcyBzdXBwb3J0ZWRcbiAgICA9PiBkZWZpbmVkIHRoZSBwb3NpdGlvbiB0byBiZSB1c2VkXG4gICAgPT4gc3RpY2t5Yml0cyB3b3JrcyBhY2NvcmRpbmdseVxuICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IFN0aWNreWJpdHMucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZWZpbmVQb3NpdGlvbiA9IGZ1bmN0aW9uIGRlZmluZVBvc2l0aW9uKCkge1xuICAgIHZhciBzdGlja3lQcm9wO1xuXG4gICAgaWYgKHRoaXMucHJvcHMudXNlRml4ZWQpIHtcbiAgICAgIHN0aWNreVByb3AgPSAnZml4ZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gWycnLCAnLW8tJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXTtcbiAgICAgIHZhciB0ZXN0ID0gZG9jdW1lbnQuaGVhZC5zdHlsZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGVzdC5wb3NpdGlvbiA9IHByZWZpeFtpXSArIFwic3RpY2t5XCI7XG4gICAgICB9XG5cbiAgICAgIHN0aWNreVByb3AgPSB0ZXN0LnBvc2l0aW9uID8gdGVzdC5wb3NpdGlvbiA6ICdmaXhlZCc7XG4gICAgICB0ZXN0LnBvc2l0aW9uID0gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0aWNreVByb3A7XG4gIH1cbiAgLypcbiAgICBhZGRJbnN0YW5jZSDinJTvuI9cbiAgICAtLS0tLS0tLVxuICAgIOKAlCBtYW5hZ2VzIGluc3RhbmNlcyBvZiBpdGVtc1xuICAgIC0gdGFrZXMgaW4gYW4gZWwgYW5kIHByb3BzXG4gICAgLSByZXR1cm5zIGFuIGl0ZW0gb2JqZWN0XG4gICAgLS0tXG4gICAgLSB0YXJnZXQgPSBlbFxuICAgIC0gbyA9IHtvYmplY3R9ID0gcHJvcHNcbiAgICAgIC0gc2Nyb2xsRWwgPSAnc3RyaW5nJyB8IG9iamVjdFxuICAgICAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gbnVtYmVyXG4gICAgICAtIG9mZiA9IGJvb2xlYW5cbiAgICAgIC0gcGFyZW50Q2xhc3MgPSAnc3RyaW5nJ1xuICAgICAgLSBzdGlja3lDbGFzcyA9ICdzdHJpbmcnXG4gICAgICAtIHN0dWNrQ2xhc3MgPSAnc3RyaW5nJ1xuICAgIC0tLVxuICAgIC0gZGVmaW5lZCBsYXRlclxuICAgICAgLSBwYXJlbnQgPSBkb20gZWxlbWVudFxuICAgICAgLSBzdGF0ZSA9ICdzdHJpbmcnXG4gICAgICAtIG9mZnNldCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdGFydCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdG9wID0gbnVtYmVyXG4gICAgLSByZXR1cm5zIGFuIGluc3RhbmNlIG9iamVjdFxuICAqL1xuICA7XG5cbiAgX3Byb3RvLmFkZEluc3RhbmNlID0gZnVuY3Rpb24gYWRkSW5zdGFuY2UoZWwsIHByb3BzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWw6IGVsLFxuICAgICAgcGFyZW50OiBlbC5wYXJlbnROb2RlLFxuICAgICAgcHJvcHM6IHByb3BzXG4gICAgfTtcblxuICAgIGlmIChwcm9wcy5wb3NpdGlvblZhbCA9PT0gJ2ZpeGVkJyB8fCBwcm9wcy51c2VTdGlja3lDbGFzc2VzKSB7XG4gICAgICB0aGlzLmlzV2luID0gdGhpcy5wcm9wcy5zY3JvbGxFbCA9PT0gd2luZG93O1xuICAgICAgdmFyIHNlID0gdGhpcy5pc1dpbiA/IHdpbmRvdyA6IHRoaXMuZ2V0Q2xvc2VzdFBhcmVudChpdGVtLmVsLCBpdGVtLnByb3BzLnNjcm9sbEVsKTtcbiAgICAgIHRoaXMuY29tcHV0ZVNjcm9sbE9mZnNldHMoaXRlbSk7XG4gICAgICBpdGVtLnBhcmVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBwcm9wcy5wYXJlbnRDbGFzcztcbiAgICAgIGl0ZW0uc3RhdGUgPSAnZGVmYXVsdCc7XG5cbiAgICAgIGl0ZW0uc3RhdGVDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tYW5hZ2VTdGF0ZShpdGVtKTtcbiAgICAgIH07XG5cbiAgICAgIHNlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGl0ZW0uc3RhdGVDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG4gIC8qXG4gICAgLS0tLS0tLS1cbiAgICBnZXRQYXJlbnQg8J+RqOKAjVxuICAgIC0tLS0tLS0tXG4gICAgLSBhIGhlbHBlciBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHRhcmdldCBlbGVtZW50J3MgcGFyZW50IHNlbGVjdGVkIGVsXG4gICAgLSBvbmx5IHVzZWQgZm9yIG5vbiBgd2luZG93YCBzY3JvbGwgZWxlbWVudHNcbiAgICAtIHN1cHBvcnRzIG9sZGVyIGJyb3dzZXJzXG4gICovXG4gIDtcblxuICBfcHJvdG8uZ2V0Q2xvc2VzdFBhcmVudCA9IGZ1bmN0aW9uIGdldENsb3Nlc3RQYXJlbnQoZWwsIG1hdGNoKSB7XG4gICAgLy8gcCA9IHBhcmVudCBlbGVtZW50XG4gICAgdmFyIHAgPSBtYXRjaDtcbiAgICB2YXIgZSA9IGVsO1xuICAgIGlmIChlLnBhcmVudEVsZW1lbnQgPT09IHApIHJldHVybiBwOyAvLyB0cmF2ZXJzZSB1cCB0aGUgZG9tIHRyZWUgdW50aWwgd2UgZ2V0IHRvIHRoZSBwYXJlbnRcblxuICAgIHdoaWxlIChlLnBhcmVudEVsZW1lbnQgIT09IHApIHtcbiAgICAgIGUgPSBlLnBhcmVudEVsZW1lbnQ7XG4gICAgfSAvLyByZXR1cm4gcGFyZW50IGVsZW1lbnRcblxuXG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgLypcbiAgICAtLS0tLS0tLVxuICAgIGdldFRvcFBvc2l0aW9uXG4gICAgLS0tLS0tLS1cbiAgICAtIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgdG9wUG9zaXRpb24gb2YgYSBTdGlja3liaXQgZWxlbWVudFxuICAgIC0gZnJvbSB0aGUgdG9wIGxldmVsIG9mIHRoZSBET01cbiAgKi9cbiAgO1xuXG4gIF9wcm90by5nZXRUb3BQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFRvcFBvc2l0aW9uKGVsKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXNlR2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMucHJvcHMuc2Nyb2xsRWwucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgfVxuXG4gICAgdmFyIHRvcFBvc2l0aW9uID0gMDtcblxuICAgIGRvIHtcbiAgICAgIHRvcFBvc2l0aW9uID0gZWwub2Zmc2V0VG9wICsgdG9wUG9zaXRpb247XG4gICAgfSB3aGlsZSAoZWwgPSBlbC5vZmZzZXRQYXJlbnQpO1xuXG4gICAgcmV0dXJuIHRvcFBvc2l0aW9uO1xuICB9XG4gIC8qXG4gICAgY29tcHV0ZVNjcm9sbE9mZnNldHMg8J+TilxuICAgIC0tLVxuICAgIGNvbXB1dGVTY3JvbGxPZmZzZXRzIGZvciBTdGlja3liaXRzXG4gICAgLSBkZWZpbmVzXG4gICAgICAtIG9mZnNldFxuICAgICAgLSBzdGFydFxuICAgICAgLSBzdG9wXG4gICovXG4gIDtcblxuICBfcHJvdG8uY29tcHV0ZVNjcm9sbE9mZnNldHMgPSBmdW5jdGlvbiBjb21wdXRlU2Nyb2xsT2Zmc2V0cyhpdGVtKSB7XG4gICAgdmFyIGl0ID0gaXRlbTtcbiAgICB2YXIgcCA9IGl0LnByb3BzO1xuICAgIHZhciBlbCA9IGl0LmVsO1xuICAgIHZhciBwYXJlbnQgPSBpdC5wYXJlbnQ7XG4gICAgdmFyIGlzQ3VzdG9tID0gIXRoaXMuaXNXaW4gJiYgcC5wb3NpdGlvblZhbCA9PT0gJ2ZpeGVkJztcbiAgICB2YXIgaXNUb3AgPSBwLnZlcnRpY2FsUG9zaXRpb24gIT09ICdib3R0b20nO1xuICAgIHZhciBzY3JvbGxFbE9mZnNldCA9IGlzQ3VzdG9tID8gdGhpcy5nZXRUb3BQb3NpdGlvbihwLnNjcm9sbEVsKSA6IDA7XG4gICAgdmFyIHN0aWNreVN0YXJ0ID0gaXNDdXN0b20gPyB0aGlzLmdldFRvcFBvc2l0aW9uKHBhcmVudCkgLSBzY3JvbGxFbE9mZnNldCA6IHRoaXMuZ2V0VG9wUG9zaXRpb24ocGFyZW50KTtcbiAgICB2YXIgc3RpY2t5Q2hhbmdlT2Zmc2V0ID0gcC5jdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIgIT09IG51bGwgPyBwLmN1c3RvbVN0aWNreUNoYW5nZU51bWJlciA6IGVsLm9mZnNldEhlaWdodDtcbiAgICB2YXIgcGFyZW50Qm90dG9tID0gc3RpY2t5U3RhcnQgKyBwYXJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGl0Lm9mZnNldCA9IHNjcm9sbEVsT2Zmc2V0ICsgcC5zdGlja3lCaXRTdGlja3lPZmZzZXQ7XG4gICAgaXQuc3RpY2t5U3RhcnQgPSBpc1RvcCA/IHN0aWNreVN0YXJ0IC0gaXQub2Zmc2V0IDogMDtcbiAgICBpdC5zdGlja3lDaGFuZ2UgPSBpdC5zdGlja3lTdGFydCArIHN0aWNreUNoYW5nZU9mZnNldDtcbiAgICBpdC5zdGlja3lTdG9wID0gaXNUb3AgPyBwYXJlbnRCb3R0b20gLSAoZWwub2Zmc2V0SGVpZ2h0ICsgaXQub2Zmc2V0KSA6IHBhcmVudEJvdHRvbSAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuICAvKlxuICAgIHRvZ2dsZUNsYXNzZXMg4pqW77iPXG4gICAgLS0tXG4gICAgdG9nZ2xlcyBjbGFzc2VzIChmb3Igb2xkZXIgYnJvd3NlciBzdXBwb3J0KVxuICAgIHIgPSByZW1vdmVkIGNsYXNzXG4gICAgYSA9IGFkZGVkIGNsYXNzXG4gICovXG4gIDtcblxuICBfcHJvdG8udG9nZ2xlQ2xhc3NlcyA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzZXMoZWwsIHIsIGEpIHtcbiAgICB2YXIgZSA9IGVsO1xuICAgIHZhciBjQXJyYXkgPSBlLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGlmIChhICYmIGNBcnJheS5pbmRleE9mKGEpID09PSAtMSkgY0FycmF5LnB1c2goYSk7XG4gICAgdmFyIHJJdGVtID0gY0FycmF5LmluZGV4T2Yocik7XG4gICAgaWYgKHJJdGVtICE9PSAtMSkgY0FycmF5LnNwbGljZShySXRlbSwgMSk7XG4gICAgZS5jbGFzc05hbWUgPSBjQXJyYXkuam9pbignICcpO1xuICB9XG4gIC8qXG4gICAgbWFuYWdlU3RhdGUg8J+TnVxuICAgIC0tLVxuICAgIC0gZGVmaW5lcyB0aGUgc3RhdGVcbiAgICAgIC0gbm9ybWFsXG4gICAgICAtIHN0aWNreVxuICAgICAgLSBzdHVja1xuICAqL1xuICA7XG5cbiAgX3Byb3RvLm1hbmFnZVN0YXRlID0gZnVuY3Rpb24gbWFuYWdlU3RhdGUoaXRlbSkge1xuICAgIC8vIGNhY2hlIG9iamVjdFxuICAgIHZhciBpdCA9IGl0ZW07XG4gICAgdmFyIGUgPSBpdC5lbDtcbiAgICB2YXIgcCA9IGl0LnByb3BzO1xuICAgIHZhciBzdGF0ZSA9IGl0LnN0YXRlO1xuICAgIHZhciBzdGFydCA9IGl0LnN0aWNreVN0YXJ0O1xuICAgIHZhciBjaGFuZ2UgPSBpdC5zdGlja3lDaGFuZ2U7XG4gICAgdmFyIHN0b3AgPSBpdC5zdGlja3lTdG9wO1xuICAgIHZhciBzdGwgPSBlLnN0eWxlOyAvLyBjYWNoZSBwcm9wc1xuXG4gICAgdmFyIG5zID0gcC5ub1N0eWxlcztcbiAgICB2YXIgcHYgPSBwLnBvc2l0aW9uVmFsO1xuICAgIHZhciBzZSA9IHAuc2Nyb2xsRWw7XG4gICAgdmFyIHN0aWNreSA9IHAuc3RpY2t5Q2xhc3M7XG4gICAgdmFyIHN0aWNreUNoYW5nZSA9IHAuc3RpY2t5Q2hhbmdlQ2xhc3M7XG4gICAgdmFyIHN0dWNrID0gcC5zdHVja0NsYXNzO1xuICAgIHZhciB2cCA9IHAudmVydGljYWxQb3NpdGlvbjtcbiAgICB2YXIgaXNUb3AgPSB2cCAhPT0gJ2JvdHRvbSc7XG4gICAgLypcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgLS0tXG4gICAgICAtIHVzZSByQUZcbiAgICAgIC0gb3Igc3R1YiByQUZcbiAgICAqL1xuXG4gICAgdmFyIHJBRlN0dWIgPSBmdW5jdGlvbiByQUZEdW1teShmKSB7XG4gICAgICBmKCk7XG4gICAgfTtcblxuICAgIHZhciByQUYgPSAhdGhpcy5pc1dpbiA/IHJBRlN0dWIgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgckFGU3R1YjtcbiAgICAvKlxuICAgICAgZGVmaW5lIHNjcm9sbCB2YXJzXG4gICAgICAtLS1cbiAgICAgIC0gc2Nyb2xsXG4gICAgICAtIG5vdFN0aWNreVxuICAgICAgLSBpc1N0aWNreVxuICAgICAgLSBpc1N0dWNrXG4gICAgKi9cblxuICAgIHZhciB0QyA9IHRoaXMudG9nZ2xlQ2xhc3NlcztcbiAgICB2YXIgc2Nyb2xsID0gdGhpcy5pc1dpbiA/IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCA6IHNlLnNjcm9sbFRvcDtcbiAgICB2YXIgbm90U3RpY2t5ID0gc2Nyb2xsID4gc3RhcnQgJiYgc2Nyb2xsIDwgc3RvcCAmJiAoc3RhdGUgPT09ICdkZWZhdWx0JyB8fCBzdGF0ZSA9PT0gJ3N0dWNrJyk7XG4gICAgdmFyIGlzU3RpY2t5ID0gaXNUb3AgJiYgc2Nyb2xsIDw9IHN0YXJ0ICYmIChzdGF0ZSA9PT0gJ3N0aWNreScgfHwgc3RhdGUgPT09ICdzdHVjaycpO1xuICAgIHZhciBpc1N0dWNrID0gc2Nyb2xsID49IHN0b3AgJiYgc3RhdGUgPT09ICdzdGlja3knO1xuICAgIC8qXG4gICAgICBVbm5hbWVkIGFycm93IGZ1bmN0aW9ucyB3aXRoaW4gdGhpcyBibG9ja1xuICAgICAgLS0tXG4gICAgICAtIGhlbHAgd2FudGVkIG9yIGRpc2N1c3Npb25cbiAgICAgIC0gdmlldyB0ZXN0LnN0aWNreWJpdHMuanNcbiAgICAgICAgLSBgc3RpY2t5Yml0cyAubWFuYWdlU3RhdGUgIGBwb3NpdGlvbjogZml4ZWRgIGludGVyZmFjZWAgZm9yIG1vcmUgYXdhcmVuZXNzIPCfkYBcbiAgICAqL1xuXG4gICAgaWYgKG5vdFN0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnc3RpY2t5JztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0dWNrLCBzdGlja3kpO1xuICAgICAgICBzdGwucG9zaXRpb24gPSBwdjtcbiAgICAgICAgaWYgKG5zKSByZXR1cm47XG4gICAgICAgIHN0bC5ib3R0b20gPSAnJztcbiAgICAgICAgc3RsW3ZwXSA9IHAuc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc1N0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdGlja3kpO1xuICAgICAgICB0QyhlLCBzdHVjayk7XG4gICAgICAgIGlmIChwdiA9PT0gJ2ZpeGVkJykgc3RsLnBvc2l0aW9uID0gJyc7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3R1Y2spIHtcbiAgICAgIGl0LnN0YXRlID0gJ3N0dWNrJztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreSwgc3R1Y2spO1xuICAgICAgICBpZiAocHYgIT09ICdmaXhlZCcgfHwgbnMpIHJldHVybjtcbiAgICAgICAgc3RsLnRvcCA9ICcnO1xuICAgICAgICBzdGwuYm90dG9tID0gJzAnO1xuICAgICAgICBzdGwucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3RpY2t5Q2hhbmdlID0gc2Nyb2xsID49IGNoYW5nZSAmJiBzY3JvbGwgPD0gc3RvcDtcbiAgICB2YXIgaXNOb3RTdGlja3lDaGFuZ2UgPSBzY3JvbGwgPCBjaGFuZ2UgLyAyIHx8IHNjcm9sbCA+IHN0b3A7XG4gICAgdmFyIHN0dWIgPSAnc3R1Yic7IC8vIGEgc3R1YiBjc3MgY2xhc3MgdG8gcmVtb3ZlXG5cbiAgICBpZiAoaXNOb3RTdGlja3lDaGFuZ2UpIHtcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreUNoYW5nZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3RpY2t5Q2hhbmdlKSB7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdHViLCBzdGlja3lDaGFuZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodXBkYXRlZFByb3BzKSB7XG4gICAgaWYgKHVwZGF0ZWRQcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICB1cGRhdGVkUHJvcHMgPSBudWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnN0YW5jZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzW2ldO1xuICAgICAgdGhpcy5jb21wdXRlU2Nyb2xsT2Zmc2V0cyhpbnN0YW5jZSk7XG5cbiAgICAgIGlmICh1cGRhdGVkUHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgdXBkYXRlZFByb3AgaW4gdXBkYXRlZFByb3BzKSB7XG4gICAgICAgICAgaW5zdGFuY2UucHJvcHNbdXBkYXRlZFByb3BdID0gdXBkYXRlZFByb3BzW3VwZGF0ZWRQcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qXG4gICAgcmVtb3ZlcyBhbiBpbnN0YW5jZSDwn5GLXG4gICAgLS0tLS0tLS1cbiAgICAtIGNsZWFudXAgaW5zdGFuY2VcbiAgKi9cbiAgO1xuXG4gIF9wcm90by5yZW1vdmVJbnN0YW5jZSA9IGZ1bmN0aW9uIHJlbW92ZUluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgdmFyIGUgPSBpbnN0YW5jZS5lbDtcbiAgICB2YXIgcCA9IGluc3RhbmNlLnByb3BzO1xuICAgIHZhciB0QyA9IHRoaXMudG9nZ2xlQ2xhc3NlcztcbiAgICBlLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgZS5zdHlsZVtwLnZlcnRpY2FsUG9zaXRpb25dID0gJyc7XG4gICAgdEMoZSwgcC5zdGlja3lDbGFzcyk7XG4gICAgdEMoZSwgcC5zdHVja0NsYXNzKTtcbiAgICB0QyhlLnBhcmVudE5vZGUsIHAucGFyZW50Q2xhc3MpO1xuICB9XG4gIC8qXG4gICAgY2xlYW51cCDwn5uBXG4gICAgLS0tLS0tLS1cbiAgICAtIGNsZWFucyB1cCBlYWNoIGluc3RhbmNlXG4gICAgLSBjbGVhcnMgaW5zdGFuY2VcbiAgKi9cbiAgO1xuXG4gIF9wcm90by5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5zdGFuY2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlc1tpXTtcblxuICAgICAgaWYgKGluc3RhbmNlLnN0YXRlQ29udGFpbmVyKSB7XG4gICAgICAgIGluc3RhbmNlLnByb3BzLnNjcm9sbEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnN0YXRlQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW1vdmVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgdGhpcy5tYW5hZ2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIFN0aWNreWJpdHM7XG59KCk7XG4vKlxuICBleHBvcnRcbiAgLS0tLS0tLS1cbiAgZXhwb3J0cyBTdGlja0JpdHMgdG8gYmUgdXNlZCDwn4+BXG4qL1xuXG5cbmZ1bmN0aW9uIHN0aWNreWJpdHModGFyZ2V0LCBvKSB7XG4gIHJldHVybiBuZXcgU3RpY2t5Yml0cyh0YXJnZXQsIG8pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGlja3liaXRzO1xuIiwiLyoqXG4gKiBTaWRlIG5hdmlnYXRpb24gcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IHN0aWNreWJpdHMgZnJvbSAnc3RpY2t5Yml0cyc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG5hdmlnYXRpb25TaWRlID0gKHtcbiAgc3RpY2t5U2VsZWN0b3I6IHN0aWNreVNlbGVjdG9yID0gJy5lY2wtc2lkZS1uYXZpZ2F0aW9uX190b2dnbGUnLFxuICBhY3RpdmVTZWxlY3RvcjogYWN0aXZlU2VsZWN0b3IgPSAnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmstLWFjdGl2ZScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBpbml0U3RpY2t5KCkge1xuICAgIC8vIGluaXQgc3RpY2t5IG1lbnVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzdGlja3liaXRzKHN0aWNreVNlbGVjdG9yLCB7IHVzZVN0aWNreUNsYXNzZXM6IHRydWUgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgc3RpY2t5U2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICBlLnRhcmdldC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmZvbGRUb0FjdGl2ZSgpIHtcbiAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgYWN0aXZlU2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIC8vIEJyb3dzZSBwYXJlbnRzXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgbGV0IG5vZGUgPSBhY3RpdmU7XG4gICAgICBjb25zdCBlbHMgPSBbXTtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGVscy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHBhcmVudCBpcyBhbiBleHBhbmRhYmxlIG1lbnUgaXRlbVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCcuZWNsLXNpZGUtbmF2aWdhdGlvbl9fZ3JvdXAnKSkge1xuICAgICAgICAgIGNvbnN0IGxpbmsgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgaWYgKGxpbmsubWF0Y2hlcygnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmsnKSkge1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgb3V0c2lkZSBvZiBtZW51XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoJy5lY2wtc2lkZS1uYXZpZ2F0aW9uJykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0U3RpY2t5KCk7XG4gICAgc2Nyb2xsVG9Ub3AoKTtcbiAgICB1bmZvbGRUb0FjdGl2ZSgpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IG5hdmlnYXRpb25TaWRlO1xuIiwiLyoqXG4gKiBgTm9kZSNjb250YWlucygpYCBwb2x5ZmlsbC5cbiAqXG4gKiBTZWU6IGh0dHA6Ly9jb21wYXRpYmlsaXR5LnNod3Vwcy1jbXMuY2gvZW4vcG9seWZpbGxzLz8maWQ9MVxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZVxuICogQHBhcmFtIHtOb2RlfSBvdGhlclxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBwdWJsaWNcbiAqL1xuaW1wb3J0IHtcbiAgaW5pdEV4cGFuZGFibGVzLFxuICB0b2dnbGVFeHBhbmRhYmxlLFxufSBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1leHBhbmRhYmxlJztcblxuZnVuY3Rpb24gY29udGFpbnMobm9kZSwgb3RoZXIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgcmV0dXJuIG5vZGUgPT09IG90aGVyIHx8ICEhKG5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24ob3RoZXIpICYgMTYpO1xufVxuXG5leHBvcnQgY29uc3Qgc2l0ZUhlYWRlckRyb3Bkb3duID0gc2VsZWN0b3IgPT4ge1xuICBjb25zdCBkcm9wZG93bnNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgaWYgKGRyb3Bkb3duc0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICBpbml0RXhwYW5kYWJsZXMoYCR7c2VsZWN0b3J9IFthcmlhLWV4cGFuZGVkXWApO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICBkcm9wZG93bnNBcnJheS5mb3JFYWNoKGRyb3Bkb3duU2VsZWN0aW9uID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9ucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgICAgICAgIGRyb3Bkb3duU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJ1thcmlhLWV4cGFuZGVkXScpXG4gICAgICAgICk7XG5cbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICAgICAgICBidXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3QgaXNJbnNpZGVCdXR0b24gPSBjb250YWlucyhidXR0b24sIGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgY29uc3QgaXNJbnNpZGVUYXJnZXQgPSBjb250YWlucyh0YXJnZXQsIGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgICBpZiAoIWlzSW5zaWRlQnV0dG9uICYmICFpc0luc2lkZVRhcmdldCkge1xuICAgICAgICAgICAgdG9nZ2xlRXhwYW5kYWJsZShidXR0b24sIHsgZm9yY2VDbG9zZTogdHJ1ZSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNpdGVIZWFkZXJEcm9wZG93bjtcbiIsIi8qKlxuICogVGFibGVzIHJlbGF0ZWQgYmVoYXZpb3JzLlxuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZXhwZWN0ZWQtbXVsdGlsaW5lICovXG5cbmV4cG9ydCBmdW5jdGlvbiBlY2xUYWJsZXMoZWxlbWVudHMgPSBudWxsKSB7XG4gIGNvbnN0IHRhYmxlcyA9XG4gICAgZWxlbWVudHMgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZWNsLXRhYmxlLS1yZXNwb25zaXZlJyk7XG4gIFtdLmZvckVhY2guY2FsbCh0YWJsZXMsIHRhYmxlID0+IHtcbiAgICBjb25zdCBoZWFkZXJUZXh0ID0gW107XG4gICAgbGV0IHRleHRDb2xzcGFuID0gJyc7XG4gICAgbGV0IGNpID0gMDtcbiAgICBsZXQgY24gPSBbXTtcblxuICAgIC8vIFRoZSByb3dzIGluIGEgdGFibGUgYm9keS5cbiAgICBjb25zdCB0YWJsZVJvd3MgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSB0cicpO1xuXG4gICAgLy8gVGhlIGhlYWRlcnMgaW4gYSB0YWJsZS5cbiAgICBjb25zdCBoZWFkZXJzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGhlYWQgdHIgdGgnKTtcblxuICAgIC8vIFRoZSBudW1iZXIgb2YgbWFpbiBoZWFkZXJzLlxuICAgIGNvbnN0IGhlYWRGaXJzdCA9XG4gICAgICB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZCB0cicpWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoJykubGVuZ3RoIC0gMTtcblxuICAgIC8vIE51bWJlciBvZiBjZWxscyBwZXIgcm93LlxuICAgIGNvbnN0IGNlbGxQZXJSb3cgPSB0YWJsZVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJylbMF1cbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpLmxlbmd0aDtcblxuICAgIC8vIFBvc2l0aW9uIG9mIHRoZSBldmVudHVhbCBjb2xzcGFuIGVsZW1lbnQuXG4gICAgbGV0IGNvbHNwYW5JbmRleCA9IC0xO1xuXG4gICAgLy8gQnVpbGQgdGhlIGFycmF5IHdpdGggYWxsIHRoZSBcImxhYmVsc1wiXG4gICAgLy8gQWxzbyBnZXQgcG9zaXRpb24gb2YgdGhlIGV2ZW50dWFsIGNvbHNwYW4gZWxlbWVudFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGhlYWRlcnNbaV0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJykpIHtcbiAgICAgICAgY29sc3BhbkluZGV4ID0gaTtcbiAgICAgIH1cblxuICAgICAgaGVhZGVyVGV4dFtpXSA9IFtdO1xuICAgICAgaGVhZGVyVGV4dFtpXSA9IGhlYWRlcnNbaV0udGV4dENvbnRlbnQ7XG4gICAgfVxuXG4gICAgLy8gSWYgd2UgaGF2ZSBhIGNvbHNwYW4sIHdlIGhhdmUgdG8gcHJlcGFyZSB0aGUgZGF0YSBmb3IgaXQuXG4gICAgaWYgKGNvbHNwYW5JbmRleCAhPT0gLTEpIHtcbiAgICAgIHRleHRDb2xzcGFuID0gaGVhZGVyVGV4dC5zcGxpY2UoY29sc3BhbkluZGV4LCAxKTtcbiAgICAgIGNpID0gY29sc3BhbkluZGV4O1xuICAgICAgY24gPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aFtjb2xzcGFuXScpWzBdLmdldEF0dHJpYnV0ZSgnY29sc3BhbicpO1xuXG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGNuOyBjICs9IDEpIHtcbiAgICAgICAgaGVhZGVyVGV4dC5zcGxpY2UoY2kgKyBjLCAwLCBoZWFkZXJUZXh0W2hlYWRGaXJzdCArIGNdKTtcbiAgICAgICAgaGVhZGVyVGV4dC5zcGxpY2UoaGVhZEZpcnN0ICsgMSArIGMsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZvciBldmVyeSByb3csIHNldCB0aGUgYXR0cmlidXRlcyB3ZSB1c2UgdG8gbWFrZSB0aGlzIGhhcHBlbi5cbiAgICBbXS5mb3JFYWNoLmNhbGwodGFibGVSb3dzLCByb3cgPT4ge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjZWxsUGVyUm93OyBqICs9IDEpIHtcbiAgICAgICAgaWYgKGhlYWRlclRleHRbal0gPT09ICcnIHx8IGhlYWRlclRleHRbal0gPT09ICdcXHUwMGEwJykge1xuICAgICAgICAgIHJvd1xuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylcbiAgICAgICAgICAgIFtqXS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2VjbC10YWJsZV9faGVhZGluZycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJvdy5xdWVyeVNlbGVjdG9yQWxsKCd0ZCcpW2pdLnNldEF0dHJpYnV0ZSgnZGF0YS10aCcsIGhlYWRlclRleHRbal0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbHNwYW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb25zdCBjZWxsID0gcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbY29sc3BhbkluZGV4XTtcbiAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZWNsLXRhYmxlX19ncm91cC1sYWJlbCcpO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdkYXRhLXRoLWdyb3VwJywgdGV4dENvbHNwYW4pO1xuXG4gICAgICAgICAgZm9yIChsZXQgYyA9IDE7IGMgPCBjbjsgYyArPSAxKSB7XG4gICAgICAgICAgICByb3dcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylcbiAgICAgICAgICAgICAgW2NvbHNwYW5JbmRleCArIGNdLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAnY2xhc3MnLFxuICAgICAgICAgICAgICAgICdlY2wtdGFibGVfX2dyb3VwX2VsZW1lbnQnXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBlY2xUYWJsZXM7XG4iLCIvLyBIZWF2aWx5IGluc3BpcmVkIGJ5IHRoZSB0YWIgY29tcG9uZW50IGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2ZyZW5kL2ZyZW5kLmNvXG5cbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9lYy1iYXNlL2hlbHBlcnMvZG9tJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgdGFicyA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLXRhYnMnLFxuICB0YWJsaXN0U2VsZWN0b3I6IHRhYmxpc3RTZWxlY3RvciA9ICcuZWNsLXRhYnNfX3RhYmxpc3QnLFxuICB0YWJwYW5lbFNlbGVjdG9yOiB0YWJwYW5lbFNlbGVjdG9yID0gJy5lY2wtdGFic19fdGFicGFuZWwnLFxuICB0YWJlbGVtZW50c1NlbGVjdG9yOiB0YWJlbGVtZW50c1NlbGVjdG9yID0gYCR7dGFibGlzdFNlbGVjdG9yfSBsaWAsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gU0VUVVBcbiAgLy8gc2V0IHRhYiBlbGVtZW50IE5vZGVMaXN0XG4gIGNvbnN0IHRhYkNvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBzaG93VGFiKHRhcmdldCwgZ2l2ZUZvY3VzID0gdHJ1ZSkge1xuICAgIGNvbnN0IHNpYmxpbmdUYWJzID0gcXVlcnlBbGwoXG4gICAgICBgJHt0YWJsaXN0U2VsZWN0b3J9IGxpYCxcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICApO1xuICAgIGNvbnN0IHNpYmxpbmdUYWJwYW5lbHMgPSBxdWVyeUFsbChcbiAgICAgIHRhYnBhbmVsU2VsZWN0b3IsXG4gICAgICB0YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgKTtcblxuICAgIC8vIHNldCBpbmFjdGl2ZXNcbiAgICBzaWJsaW5nVGFicy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICB0YWIuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgICAgIHRhYi5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICB9KTtcblxuICAgIHNpYmxpbmdUYWJwYW5lbHMuZm9yRWFjaCh0YWJwYW5lbCA9PiB7XG4gICAgICB0YWJwYW5lbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICB9KTtcblxuICAgIC8vIHNldCBhY3RpdmVzIGFuZCBmb2N1c1xuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICd0cnVlJyk7XG4gICAgaWYgKGdpdmVGb2N1cykgdGFyZ2V0LmZvY3VzKCk7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5nZXRFbGVtZW50QnlJZCh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpXG4gICAgICAucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50VGFiQ2xpY2soZSkge1xuICAgIHNob3dUYWIoZS5jdXJyZW50VGFyZ2V0KTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGxvb2sgaW50byByZW1vdmUgaWQvc2V0dGltZW91dC9yZWluc3RhdGUgaWQgYXMgYW4gYWx0ZXJuYXRpdmUgdG8gcHJldmVudERlZmF1bHRcbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50VGFiS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCB0YWIgdGFyZ2V0cywgYW5kIHRoZWlyIHBhcmVudHMnIHByZXYvbmV4dCAob3IgZmlyc3QvbGFzdClcbiAgICBjb25zdCBjdXJyZW50VGFiID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHByZXZpb3VzVGFiSXRlbSA9XG4gICAgICBjdXJyZW50VGFiLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgfHxcbiAgICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IG5leHRUYWJJdGVtID1cbiAgICAgIGN1cnJlbnRUYWIubmV4dEVsZW1lbnRTaWJsaW5nIHx8XG4gICAgICBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICAvLyBkb24ndCBjYXRjaCBrZXkgZXZlbnRzIHdoZW4g4oyYIG9yIEFsdCBtb2RpZmllciBpcyBwcmVzZW50XG4gICAgaWYgKGUubWV0YUtleSB8fCBlLmFsdEtleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gICAgLy8gaWYgbmV3IG5leHQvcHJldiB0YWIgYXZhaWxhYmxlLCBzaG93IGl0IGJ5IHBhc3NpbmcgdGFiIGFuY2hvciB0byBzaG93VGFiIG1ldGhvZFxuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODpcbiAgICAgICAgc2hvd1RhYihwcmV2aW91c1RhYkl0ZW0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOTpcbiAgICAgIGNhc2UgNDA6XG4gICAgICAgIHNob3dUYWIobmV4dFRhYkl0ZW0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gQklORElOR1NcbiAgZnVuY3Rpb24gYmluZFRhYnNFdmVudHModGFiQ29udGFpbmVyKSB7XG4gICAgY29uc3QgdGFic0VsZW1lbnRzID0gcXVlcnlBbGwodGFiZWxlbWVudHNTZWxlY3RvciwgdGFiQ29udGFpbmVyKTtcbiAgICAvLyBiaW5kIGFsbCB0YWIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgdGFic0VsZW1lbnRzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50VGFiQ2xpY2spO1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudFRhYktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5iaW5kVGFic0V2ZW50cyh0YWJDb250YWluZXIpIHtcbiAgICBjb25zdCB0YWJzRWxlbWVudHMgPSBxdWVyeUFsbCh0YWJlbGVtZW50c1NlbGVjdG9yLCB0YWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBhbGwgdGFiIGNsaWNrIGFuZCBrZXlkb3duIGV2ZW50c1xuICAgIHRhYnNFbGVtZW50cy5mb3JFYWNoKHRhYiA9PiB7XG4gICAgICB0YWIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudFRhYkNsaWNrKTtcbiAgICAgIHRhYi5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRUYWJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2godW5iaW5kVGFic0V2ZW50cyk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGFiQ29udGFpbmVycy5mb3JFYWNoKGJpbmRUYWJzRXZlbnRzKTtcbiAgfVxuXG4gIC8vIEF1dG9tYXRpY2FsbHkgaW5pdFxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCB0YWJzO1xuIiwiLyoqXG4gKiBUaW1lbGluZVxuICovXG5cbmNvbnN0IGV4cGFuZFRpbWVsaW5lID0gKFxuICB0aW1lbGluZSxcbiAgYnV0dG9uLFxuICB7XG4gICAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtdGltZWxpbmVfX2l0ZW0tLW92ZXItbGltaXQnLFxuICAgIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdGltZWxpbmUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBoaWRkZW5FbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIHRpbWVsaW5lLnF1ZXJ5U2VsZWN0b3JBbGwoaGlkZGVuRWxlbWVudHNTZWxlY3RvcilcbiAgKTtcblxuICAvLyBSZW1vdmUgZXh0cmEgY2xhc3NcbiAgaGlkZGVuRWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NUb1JlbW92ZSk7XG4gIH0pO1xuXG4gIC8vIFJlbW92ZSBidXR0dG9uXG4gIGJ1dHRvbi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJ1dHRvbik7XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IHRpbWVsaW5lcyA9ICh7XG4gIHNlbGVjdG9yID0gJy5lY2wtdGltZWxpbmUnLFxuICBidXR0b25TZWxlY3RvciA9ICcuZWNsLXRpbWVsaW5lX19idXR0b24nLFxuICBoaWRkZW5FbGVtZW50c1NlbGVjdG9yID0gJy5lY2wtdGltZWxpbmVfX2l0ZW0tLW92ZXItbGltaXQnLFxuICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIGNvbnRleHQgPSBkb2N1bWVudCxcbn0gPSB7fSkgPT4ge1xuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+IHtcbiAgICBjb25zdCBidXR0b24gPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3IoYnV0dG9uU2VsZWN0b3IpO1xuXG4gICAgaWYgKGJ1dHRvbikge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgZXhwYW5kVGltZWxpbmUobm9kZSwgYnV0dG9uLCB7IGNsYXNzVG9SZW1vdmUsIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgfSlcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRpbWVsaW5lcztcbiIsIi8qKlxuICogVGltZWxpbmVcbiAqL1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LXRpbWVsaW5lJztcbiIsIi8vIEV4cG9ydCBjb21wb25lbnRzXG5cbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbic7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1icmVhZGNydW1iJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWNhcm91c2VsJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2JztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWRyb3Bkb3duJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWRpYWxvZyc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1leHBhbmRhYmxlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWZvcm0tZmlsZS11cGxvYWQnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtbGFuZy1zZWxlY3QtcGFnZSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1tZXNzYWdlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtc2l0ZS1oZWFkZXItc3RhbmRhcmRpc2VkJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LXRhYmxlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LXRhYic7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC10aW1lbGluZSc7XG4iLCIvLyBFeHBvcnQgY29tcG9uZW50c1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLXByZXNldC1mdWxsJztcbiJdLCJuYW1lcyI6WyJxdWVyeUFsbCIsInNlbGVjdG9yIiwiY29udGV4dCIsImRvY3VtZW50Iiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsImFjY29yZGlvbnMiLCJoZWFkZXJTZWxlY3RvciIsIndpbmRvdyIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsImFjY29yZGlvbkNvbnRhaW5lcnMiLCJoaWRlUGFuZWwiLCJ0YXJnZXQiLCJhY3RpdmVQYW5lbCIsImdldEVsZW1lbnRCeUlkIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwic2hvd1BhbmVsIiwidG9nZ2xlUGFuZWwiLCJnaXZlSGVhZGVyRm9jdXMiLCJoZWFkZXJTZXQiLCJpIiwiZm9jdXMiLCJldmVudEhlYWRlckNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJldmVudEhlYWRlcktleWRvd24iLCJjdXJyZW50SGVhZGVyIiwiaXNNb2RpZmllcktleSIsIm1ldGFLZXkiLCJhbHRLZXkiLCJ0aGlzQ29udGFpbmVyIiwicGFyZW50Tm9kZSIsInRoZXNlSGVhZGVycyIsImN1cnJlbnRIZWFkZXJJbmRleCIsImluZGV4T2YiLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJwcmV2aW91c0hlYWRlckluZGV4IiwibGVuZ3RoIiwibmV4dEhlYWRlckluZGV4IiwiYmluZEFjY29yZGlvbkV2ZW50cyIsImFjY29yZGlvbkNvbnRhaW5lciIsImFjY29yZGlvbkhlYWRlcnMiLCJmb3JFYWNoIiwiYWNjb3JkaW9uSGVhZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInVuYmluZEFjY29yZGlvbkV2ZW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJkZXN0cm95IiwiaW5pdCIsIkZVTkNfRVJST1JfVEVYVCIsIk5BTiIsInN5bWJvbFRhZyIsInJlVHJpbSIsInJlSXNCYWRIZXgiLCJyZUlzQmluYXJ5IiwicmVJc09jdGFsIiwiZnJlZVBhcnNlSW50IiwicGFyc2VJbnQiLCJmcmVlR2xvYmFsIiwiYmFiZWxIZWxwZXJzLnR5cGVvZiIsImdsb2JhbCIsIk9iamVjdCIsImZyZWVTZWxmIiwic2VsZiIsInJvb3QiLCJGdW5jdGlvbiIsIm9iamVjdFByb3RvIiwicHJvdG90eXBlIiwib2JqZWN0VG9TdHJpbmciLCJ0b1N0cmluZyIsIm5hdGl2ZU1heCIsIk1hdGgiLCJtYXgiLCJuYXRpdmVNaW4iLCJtaW4iLCJub3ciLCJEYXRlIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdCIsIm9wdGlvbnMiLCJsYXN0QXJncyIsImxhc3RUaGlzIiwibWF4V2FpdCIsInJlc3VsdCIsInRpbWVySWQiLCJsYXN0Q2FsbFRpbWUiLCJsYXN0SW52b2tlVGltZSIsImxlYWRpbmciLCJtYXhpbmciLCJ0cmFpbGluZyIsIlR5cGVFcnJvciIsInRvTnVtYmVyIiwiaXNPYmplY3QiLCJpbnZva2VGdW5jIiwidGltZSIsImFyZ3MiLCJ0aGlzQXJnIiwidW5kZWZpbmVkIiwiYXBwbHkiLCJsZWFkaW5nRWRnZSIsInNldFRpbWVvdXQiLCJ0aW1lckV4cGlyZWQiLCJyZW1haW5pbmdXYWl0IiwidGltZVNpbmNlTGFzdENhbGwiLCJ0aW1lU2luY2VMYXN0SW52b2tlIiwic2hvdWxkSW52b2tlIiwidHJhaWxpbmdFZGdlIiwiY2FuY2VsIiwiY2xlYXJUaW1lb3V0IiwiZmx1c2giLCJkZWJvdW5jZWQiLCJpc0ludm9raW5nIiwiYXJndW1lbnRzIiwidmFsdWUiLCJ0eXBlIiwiaXNPYmplY3RMaWtlIiwiaXNTeW1ib2wiLCJvdGhlciIsInZhbHVlT2YiLCJyZXBsYWNlIiwiaXNCaW5hcnkiLCJ0ZXN0IiwiaW5pdEJyZWFkY3J1bWIiLCJicmVhZGNydW1iU2VsZWN0b3IiLCJleHBhbmRCdXR0b25TZWxlY3RvciIsInNlZ21lbnRTZWxlY3RvciIsInNlZ21lbnRGaXJzdFNlbGVjdG9yIiwic2VnbWVudFZpc2libGVTZWxlY3RvciIsInNlZ21lbnRIaWRkZW5TZWxlY3RvciIsImVsbGlwc2lzU2VsZWN0b3IiLCJpbml0RWxsaXBzaXMiLCJicmVhZGNydW1iQ29udGFpbmVyIiwiYnJlYWRjcnVtYkZpcnN0IiwiZWxsaXBzaXMiLCJjcmVhdGVFbGVtZW50IiwiYWRkIiwiaW5uZXJIVE1MIiwibGlzdEl0ZW0iLCJhcHBlbmRDaGlsZCIsInNlZ21lbnQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsInRvZ2dsZUVsbGlwc2lzIiwiYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzIiwiaGlkZGVuIiwiYnJlYWRjcnVtYkVsbGlwc2lzIiwiYnJlYWRjcnVtYklzVG9vTGFyZ2UiLCJ3cmFwcGVyV2lkdGgiLCJmbG9vciIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiYnJlYWRjcnVtYlNlZ21lbnRzIiwic2VnbWVudFdpZHRoIiwiY2VpbCIsImJyZWFkY3J1bWJTZWdtZW50IiwiaGlkZVNlZ21lbnQiLCJicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzIiwic2hvd1NlZ21lbnQiLCJldmVudEV4cGFuZENsaWNrIiwicGFyZW50RWxlbWVudCIsImV2ZW50UmVzaXplIiwiYnJlYWRjcnVtYkNvbnRhaW5lcnMiLCJiaW5kQnJlYWRjcnVtYkV2ZW50cyIsImV4cGFuZHMiLCJleHBhbmQiLCJ1bmJpbmRCcmVhZGNydW1iRXZlbnRzIiwiY2Fyb3VzZWxzIiwic2VsZWN0b3JJZCIsImN1cnJlbnRTbGlkZSIsImNhcm91c2VsIiwic2xpZGVzIiwibGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJnZXRMaXN0SXRlbVdpZHRoIiwib2Zmc2V0V2lkdGgiLCJnb1RvU2xpZGUiLCJuIiwicmVtb3ZlIiwic2V0T2Zmc2V0IiwiaXRlbVdpZHRoIiwidHIiLCJzdHlsZSIsIk1velRyYW5zZm9ybSIsIm1zVHJhbnNmb3JtIiwiT1RyYW5zZm9ybSIsIldlYmtpdFRyYW5zZm9ybSIsInRyYW5zZm9ybSIsImFubm91bmNlQ3VycmVudFNsaWRlIiwidGV4dENvbnRlbnQiLCJzaG93SW1hZ2VJbmZvcm1hdGlvbiIsImluZm9BcmVhcyIsImFyZWEiLCJkaXNwbGF5Iiwib3BlblNsaWRlIiwicHJldmlvdXNTbGlkZSIsIm5leHRTbGlkZSIsImFkZENhcm91c2VsQ29udHJvbHMiLCJuYXZDb250cm9scyIsImNsYXNzTmFtZSIsInJlbW92ZUNhcm91c2VsQ29udHJvbHMiLCJjb250cm9scyIsInJlbW92ZUNoaWxkIiwiYWRkTGl2ZVJlZ2lvbiIsImxpdmVSZWdpb24iLCJyZW1vdmVMaXZlUmVnaW9uIiwiZGVib3VuY2VDYiIsImV4cGFuZENvbnRleHR1YWxOYXYiLCJjb250ZXh0dWFsTmF2IiwiYnV0dG9uIiwiY2xhc3NUb1JlbW92ZSIsImhpZGRlbkVsZW1lbnRzU2VsZWN0b3IiLCJoaWRkZW5FbGVtZW50cyIsImVsZW1lbnQiLCJjb250ZXh0dWFsTmF2cyIsImJ1dHRvblNlbGVjdG9yIiwibm9kZXNBcnJheSIsIm5vZGUiLCJjb250YWlucyIsImNvbXBhcmVEb2N1bWVudFBvc2l0aW9uIiwiZHJvcGRvd24iLCJkcm9wZG93bnNBcnJheSIsIkFycmF5IiwiaXNJbnNpZGUiLCJkcm9wZG93blNlbGVjdGlvbiIsImV2ZW50IiwiZHJvcGRvd25CdXR0b24iLCJkcm9wZG93bkJvZHkiLCJkaWFsb2dzIiwidHJpZ2dlckVsZW1lbnRzU2VsZWN0b3IiLCJkaWFsb2dXaW5kb3dJZCIsImRpYWxvZ092ZXJsYXlJZCIsInRyaWdnZXJFbGVtZW50cyIsImRpYWxvZ1dpbmRvdyIsImRpYWxvZ092ZXJsYXkiLCJib2R5IiwiZm9jdXNhYmxlRWxlbWVudHMiLCJmb2N1c2VkRWxCZWZvcmVPcGVuIiwiZmlyc3RGb2N1c2FibGVFbGVtZW50IiwibGFzdEZvY3VzYWJsZUVsZW1lbnQiLCJjbG9zZSIsImhhbmRsZUtleURvd24iLCJLRVlfVEFCIiwiS0VZX0VTQyIsImhhbmRsZUJhY2t3YXJkVGFiIiwiYWN0aXZlRWxlbWVudCIsImhhbmRsZUZvcndhcmRUYWIiLCJzaGlmdEtleSIsIm9wZW4iLCJiaW5kRGlhbG9nRXZlbnRzIiwiZWxlbWVudHMiLCJ1bmJpbmREaWFsb2dFdmVudHMiLCJ0b2dnbGVFeHBhbmRhYmxlIiwidG9nZ2xlRWxlbWVudCIsImZvcmNlQ2xvc2UiLCJjbG9zZVNpYmxpbmdzIiwic2libGluZ3NTZWxlY3RvciIsImlzRXhwYW5kZWQiLCJoYXNBdHRyaWJ1dGUiLCJzaWJsaW5nc0FycmF5IiwiZmlsdGVyIiwic2libGluZyIsImluaXRFeHBhbmRhYmxlcyIsImZpbGVVcGxvYWRzIiwiaW5wdXRTZWxlY3RvciIsInZhbHVlU2VsZWN0b3IiLCJicm93c2VTZWxlY3RvciIsImZpbGVVcGxvYWRDb250YWluZXJzIiwidXBkYXRlRmlsZU5hbWUiLCJmaWxlcyIsImZpbGVuYW1lIiwiZmlsZSIsIm5hbWUiLCJtZXNzYWdlRWxlbWVudCIsImV2ZW50VmFsdWVDaGFuZ2UiLCJmaWxlVXBsb2FkRWxlbWVudHMiLCJmaWxlVXBsb2FkRWxlbWVudCIsImV2ZW50QnJvd3NlS2V5ZG93biIsImlucHV0RWxlbWVudHMiLCJpbnB1dEVsZW1lbnQiLCJjbGljayIsImJpbmRGaWxlVXBsb2FkRXZlbnRzIiwiZmlsZVVwbG9hZENvbnRhaW5lciIsImZpbGVVcGxvYWRJbnB1dHMiLCJmaWxlVXBsb2FkSW5wdXQiLCJmaWxlVXBsb2FkQnJvd3NlcyIsImZpbGVVcGxvYWRCcm93c2UiLCJ1bmJpbmRGaWxlVXBsb2FkRXZlbnRzIiwiZWNsTGFuZ1NlbGVjdFBhZ2VzIiwidG9nZ2xlQ2xhc3MiLCJsaXN0U2VsZWN0b3IiLCJkcm9wZG93blNlbGVjdG9yIiwiZHJvcGRvd25PbkNoYW5nZSIsImxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMiLCJ0b2dnbGUiLCJsc3AiLCJvZmZzZXRMZWZ0IiwiZGlzbWlzc01lc3NhZ2UiLCJtZXNzYWdlIiwiaW5pdE1lc3NhZ2VzIiwic2VsZWN0b3JDbGFzcyIsIm1lc3NhZ2VzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9jcmVhdGVDbGFzcyIsImRlZmluZVByb3BlcnRpZXMiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsImtleSIsIkNvbnN0cnVjdG9yIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJzZXBwdWt1IiwiaXNXaW5kb3dEZWZpbmVkIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInRlc3ROb2RlIiwic29tZSIsInByZWZpeCIsInBvc2l0aW9uIiwiaXNJbml0aWFsaXplZCIsInNoYWRvd1Jvb3RFeGlzdHMiLCJTaGFkb3dSb290Iiwic2Nyb2xsIiwidG9wIiwibGVmdCIsInN0aWNraWVzIiwiZXh0ZW5kIiwidGFyZ2V0T2JqIiwic291cmNlT2JqZWN0IiwiaGFzT3duUHJvcGVydHkiLCJwYXJzZU51bWVyaWMiLCJ2YWwiLCJwYXJzZUZsb2F0IiwiZ2V0RG9jT2Zmc2V0VG9wIiwiZG9jT2Zmc2V0VG9wIiwib2Zmc2V0VG9wIiwib2Zmc2V0UGFyZW50IiwiU3RpY2t5IiwiSFRNTEVsZW1lbnQiLCJFcnJvciIsInN0aWNreSIsIl9ub2RlIiwiX3N0aWNreU1vZGUiLCJfYWN0aXZlIiwicHVzaCIsInJlZnJlc2giLCJfcmVtb3ZlZCIsIl9kZWFjdGl2YXRlIiwibm9kZUNvbXB1dGVkU3R5bGUiLCJub2RlQ29tcHV0ZWRQcm9wcyIsIm1hcmdpblRvcCIsIm1hcmdpbkJvdHRvbSIsIm1hcmdpbkxlZnQiLCJtYXJnaW5SaWdodCIsImNzc0Zsb2F0IiwiaXNOYU4iLCJvcmlnaW5hbFBvc2l0aW9uIiwicmVmZXJlbmNlTm9kZSIsImhvc3QiLCJub2RlV2luT2Zmc2V0IiwicGFyZW50V2luT2Zmc2V0IiwicGFyZW50Q29tcHV0ZWRTdHlsZSIsIl9wYXJlbnQiLCJzdHlsZXMiLCJvZmZzZXRIZWlnaHQiLCJfb2Zmc2V0VG9XaW5kb3ciLCJyaWdodCIsImNsaWVudFdpZHRoIiwiX29mZnNldFRvUGFyZW50IiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwiX3N0eWxlcyIsImJvdHRvbSIsIm5vZGVUb3BWYWx1ZSIsIl9saW1pdHMiLCJzdGFydCIsInBhZ2VZT2Zmc2V0IiwiZW5kIiwiYm9yZGVyQm90dG9tV2lkdGgiLCJwYXJlbnRQb3NpdGlvbiIsIl9yZWNhbGNQb3NpdGlvbiIsImNsb25lIiwiX2Nsb25lIiwiaGVpZ2h0IiwicGFkZGluZyIsImJvcmRlciIsImJvcmRlclNwYWNpbmciLCJmb250U2l6ZSIsInN0aWNreU1vZGUiLCJfZmFzdENoZWNrIiwiYWJzIiwiX3RoaXMiLCJfdGhpczIiLCJpbmRleCIsInNwbGljZSIsIlN0aWNreWZpbGwiLCJmb3JjZVN0aWNreSIsInJlZnJlc2hBbGwiLCJhZGRPbmUiLCJub2RlTGlzdCIsImFkZGVkU3RpY2tpZXMiLCJfbG9vcCIsIl9yZXQyIiwicmVtb3ZlT25lIiwiX2xvb3AyIiwicmVtb3ZlQWxsIiwiY2hlY2tTY3JvbGwiLCJwYWdlWE9mZnNldCIsImZhc3RDaGVja1RpbWVyIiwic3RhcnRGYXN0Q2hlY2tUaW1lciIsInNldEludGVydmFsIiwic3RvcEZhc3RDaGVja1RpbWVyIiwiY2xlYXJJbnRlcnZhbCIsImRvY0hpZGRlbktleSIsInZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwidCIsInRoaXMiLCJvIiwiciIsImEiLCJjIiwibCIsInMiLCJ1IiwiZiIsInNlbGVjdG9ySGVhZGVyIiwiY29udGFpbmVyIiwib2Zmc2V0IiwiYWN0aXZlQ2xhc3MiLCJzY3JvbGxEZWxheSIsImNhbGxiYWNrIiwiZCIsInYiLCJtIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiZyIsImgiLCJwIiwiaW5uZXJIZWlnaHQiLCJpbm5lcldpZHRoIiwieSIsInNvcnQiLCJkaXN0YW5jZSIsInNldERpc3RhbmNlcyIsImIiLCJoYXNoIiwibmF2IiwicGFyZW50IiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwiSCIsIkMiLCJnZXRDdXJyZW50TmF2IiwiTCIsImoiLCJFIiwibmF2aWdhdGlvbklucGFnZXMiLCJzdGlja3lTZWxlY3RvciIsInNweVNlbGVjdG9yIiwic3B5Q2xhc3MiLCJzcHlBY3RpdmVDb250YWluZXIiLCJzcHlUcmlnZ2VyIiwic3B5T2Zmc2V0IiwidG9nZ2xlU2VsZWN0b3IiLCJsaW5rc1NlbGVjdG9yIiwic3RpY2t5SW5zdGFuY2UiLCJpbml0U3RpY2t5IiwiZGVzdHJveVN0aWNreSIsImluaXRTY3JvbGxTcHkiLCJpbnBhZ2VOYXZFbGVtZW50IiwiZ3Vtc2hvZSIsIm5hdmlnYXRpb25UaXRsZSIsImRlc3Ryb3lTY3JvbGxTcHkiLCJuYXZMaW5rcyIsImxpbmsiLCJvbkNsaWNrIiwibWVudSIsImhhc1BvcHVwIiwib25LZXlkb3duIiwiY3VycmVudFRhYiIsInByZXZpb3VzVGFiSXRlbSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJsYXN0RWxlbWVudENoaWxkIiwibmV4dFRhYkl0ZW0iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJmaXJzdEVsZW1lbnRDaGlsZCIsIm1lZ2FtZW51IiwibGlua1NlbGVjdG9yIiwibWVnYW1lbnVzQXJyYXkiLCJTdGlja3liaXRzIiwib2JqIiwidmVyc2lvbiIsInVzZXJBZ2VudCIsIm5hdmlnYXRvciIsImN1c3RvbVN0aWNreUNoYW5nZU51bWJlciIsIm5vU3R5bGVzIiwic3RpY2t5Qml0U3RpY2t5T2Zmc2V0IiwicGFyZW50Q2xhc3MiLCJzY3JvbGxFbCIsInN0aWNreUNsYXNzIiwic3R1Y2tDbGFzcyIsInN0aWNreUNoYW5nZUNsYXNzIiwidXNlU3RpY2t5Q2xhc3NlcyIsInVzZUZpeGVkIiwidXNlR2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidmVydGljYWxQb3NpdGlvbiIsInBvc2l0aW9uVmFsIiwiZGVmaW5lUG9zaXRpb24iLCJpbnN0YW5jZXMiLCJfdGhpcyRwcm9wcyIsInZlcnRpY2FsUG9zaXRpb25TdHlsZSIsInBvc2l0aW9uU3R5bGUiLCJlbHMiLCJlbCIsImFkZEluc3RhbmNlIiwiX3Byb3RvIiwic3RpY2t5UHJvcCIsImhlYWQiLCJpdGVtIiwiaXNXaW4iLCJzZSIsImdldENsb3Nlc3RQYXJlbnQiLCJjb21wdXRlU2Nyb2xsT2Zmc2V0cyIsInN0YXRlIiwic3RhdGVDb250YWluZXIiLCJtYW5hZ2VTdGF0ZSIsIm1hdGNoIiwiZ2V0VG9wUG9zaXRpb24iLCJzY3JvbGxUb3AiLCJ0b3BQb3NpdGlvbiIsIml0IiwiaXNDdXN0b20iLCJpc1RvcCIsInNjcm9sbEVsT2Zmc2V0Iiwic3RpY2t5U3RhcnQiLCJzdGlja3lDaGFuZ2VPZmZzZXQiLCJwYXJlbnRCb3R0b20iLCJzdGlja3lDaGFuZ2UiLCJzdGlja3lTdG9wIiwidG9nZ2xlQ2xhc3NlcyIsImNBcnJheSIsInNwbGl0Iiwickl0ZW0iLCJqb2luIiwiY2hhbmdlIiwic3RvcCIsInN0bCIsIm5zIiwicHYiLCJzdHVjayIsInZwIiwickFGU3R1YiIsInJBRkR1bW15IiwickFGIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0QyIsInNjcm9sbFkiLCJub3RTdGlja3kiLCJpc1N0aWNreSIsImlzU3R1Y2siLCJpc1N0aWNreUNoYW5nZSIsImlzTm90U3RpY2t5Q2hhbmdlIiwic3R1YiIsInVwZGF0ZSIsInVwZGF0ZWRQcm9wcyIsInVwZGF0ZWRQcm9wIiwicmVtb3ZlSW5zdGFuY2UiLCJjbGVhbnVwIiwic3RpY2t5Yml0cyIsIm5hdmlnYXRpb25TaWRlIiwiYWN0aXZlU2VsZWN0b3IiLCJzY3JvbGxUb1RvcCIsInN1YnN0cmluZyIsInNjcm9sbEludG9WaWV3IiwidW5mb2xkVG9BY3RpdmUiLCJhY3RpdmUiLCJtYXRjaGVzIiwic2l0ZUhlYWRlckRyb3Bkb3duIiwiYnV0dG9ucyIsImlzSW5zaWRlQnV0dG9uIiwiaXNJbnNpZGVUYXJnZXQiLCJlY2xUYWJsZXMiLCJ0YWJsZXMiLCJoZWFkZXJUZXh0IiwidGV4dENvbHNwYW4iLCJjaSIsImNuIiwidGFibGVSb3dzIiwidGFibGUiLCJoZWFkZXJzIiwiaGVhZEZpcnN0IiwiY2VsbFBlclJvdyIsImNvbHNwYW5JbmRleCIsInJvdyIsImNlbGwiLCJ0YWJzIiwidGFibGlzdFNlbGVjdG9yIiwidGFicGFuZWxTZWxlY3RvciIsInRhYmVsZW1lbnRzU2VsZWN0b3IiLCJ0YWJDb250YWluZXJzIiwic2hvd1RhYiIsImdpdmVGb2N1cyIsInNpYmxpbmdUYWJzIiwic2libGluZ1RhYnBhbmVscyIsInRhYiIsInJlbW92ZUF0dHJpYnV0ZSIsInRhYnBhbmVsIiwiZXZlbnRUYWJDbGljayIsImV2ZW50VGFiS2V5ZG93biIsImJpbmRUYWJzRXZlbnRzIiwidGFiQ29udGFpbmVyIiwidGFic0VsZW1lbnRzIiwidW5iaW5kVGFic0V2ZW50cyIsImV4cGFuZFRpbWVsaW5lIiwidGltZWxpbmUiLCJ0aW1lbGluZXMiXSwibWFwcGluZ3MiOiI7OztFQUFBO0FBQ0EsRUFBTyxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRDtFQUFBLE1BQVdDLE9BQVgsdUVBQXFCQyxRQUFyQjtFQUFBLFNBQ3RCLEdBQUdDLEtBQUgsQ0FBU0MsSUFBVCxDQUFjSCxRQUFRSSxnQkFBUixDQUF5QkwsUUFBekIsQ0FBZCxDQURzQjtFQUFBLENBQWpCOztFQ0RQOztFQUlBOzs7QUFHQSxNQUFhTSxhQUFhLFNBQWJBLFVBQWEsR0FHZjtFQUFBLGlGQUFQLEVBQU87RUFBQSwyQkFGVE4sUUFFUztFQUFBLE1BRkNBLFFBRUQsaUNBRlksZ0JBRVo7RUFBQSxpQ0FEVE8sY0FDUztFQUFBLE1BRE9BLGNBQ1AsdUNBRHdCLHdCQUN4Qjs7RUFDVDtFQUNBLE1BQ0UsRUFBRSxtQkFBbUJMLFFBQXJCLEtBQ0EsRUFBRSxzQkFBc0JNLE1BQXhCLENBREEsSUFFQSxDQUFDTixTQUFTTyxlQUFULENBQXlCQyxTQUg1QixFQUtFLE9BQU8sSUFBUDs7RUFFRjtFQUNBO0VBQ0EsTUFBTUMsc0JBQXNCWixTQUFTQyxRQUFULENBQTVCOztFQUVBO0VBQ0EsV0FBU1ksU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkI7RUFDekI7RUFDQSxRQUFNQyxjQUFjWixTQUFTYSxjQUFULENBQ2xCRixPQUFPRyxZQUFQLENBQW9CLGVBQXBCLENBRGtCLENBQXBCOztFQUlBSCxXQUFPSSxZQUFQLENBQW9CLGVBQXBCLEVB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
