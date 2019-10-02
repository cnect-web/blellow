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
  exports.eclTables = eclTables;
  exports.tabs = tabs;
  exports.timelines = timelines;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbi9lYy1jb21wb25lbnQtYWNjb3JkaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWJyZWFkY3J1bWIvZ2VuZXJpYy1jb21wb25lbnQtYnJlYWRjcnVtYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsL2dlbmVyaWMtY29tcG9uZW50LWNhcm91c2VsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWNvbnRleHQtbmF2L2VjLWNvbXBvbmVudC1jb250ZXh0LW5hdi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1kcm9wZG93bi9lYy1jb21wb25lbnQtZHJvcGRvd24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9nZW5lcmljLWNvbXBvbmVudC1kaWFsb2cvZ2VuZXJpYy1jb21wb25lbnQtZGlhbG9nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUvZWMtY29tcG9uZW50LWV4cGFuZGFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbWVzc2FnZS9nZW5lcmljLWNvbXBvbmVudC1tZXNzYWdlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UvZWMtY29tcG9uZW50LW1lc3NhZ2UuanMiLCIuLi9ub2RlX21vZHVsZXMvc3RpY2t5ZmlsbGpzL2Rpc3Qvc3RpY2t5ZmlsbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9ndW1zaG9lanMvZGlzdC9qcy9ndW1zaG9lLm1pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWV4cGFuZGFibGUvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uL2dlbmVyaWMtY29tcG9uZW50LWlucGFnZS1uYXZpZ2F0aW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51L2dlbmVyaWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zdGlja3liaXRzL2Rpc3Qvc3RpY2t5Yml0cy5lcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbi9nZW5lcmljLWNvbXBvbmVudC1zaWRlLW5hdmlnYXRpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGFibGUvZWMtY29tcG9uZW50LXRhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LXRhYi9lYy1jb21wb25lbnQtdGFiLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUvZWMtY29tcG9uZW50LXRpbWVsaW5lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtcHJlc2V0LWZ1bGwvZWMtcHJlc2V0LWZ1bGwuanMiLCIuLi9ub2RlX21vZHVsZXMvQGVjbC9lYy1wcmVzZXQtd2Vic2l0ZS9lYy1wcmVzZXQtd2Vic2l0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBRdWVyeSBoZWxwZXJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PlxuICBbXS5zbGljZS5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVyeUFsbDtcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIGFjY29yZGlvbiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBhY2NvcmRpb25zID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uJyxcbiAgaGVhZGVyU2VsZWN0b3I6IGhlYWRlclNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uX19oZWFkZXInLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBhY2NvcmRpb24gZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgYWNjb3JkaW9uQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGhpZGVQYW5lbCh0YXJnZXQpIHtcbiAgICAvLyBnZXQgcGFuZWxcbiAgICBjb25zdCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICAgKTtcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlblxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BhbmVsKHRhcmdldCkge1xuICAgIC8vIGdldCBwYW5lbFxuICAgIGNvbnN0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICApO1xuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXMgb24gaGVhZGVyXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlbiBhbmQgc2V0IGhlaWdodCBvbiBwYW5lbFxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVBhbmVsKHRhcmdldCkge1xuICAgIC8vIGNsb3NlIHRhcmdldCBwYW5lbCBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJykge1xuICAgICAgaGlkZVBhbmVsKHRhcmdldCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKHRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnaXZlSGVhZGVyRm9jdXMoaGVhZGVyU2V0LCBpKSB7XG4gICAgLy8gc2V0IGFjdGl2ZSBmb2N1c1xuICAgIGhlYWRlclNldFtpXS5mb2N1cygpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50SGVhZGVyQ2xpY2soZSkge1xuICAgIHRvZ2dsZVBhbmVsKGUuY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEhlYWRlcktleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBjdXJyZW50SGVhZGVyID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG4gICAgLy8gZ2V0IGNvbnRleHQgb2YgYWNjb3JkaW9uIGNvbnRhaW5lciBhbmQgaXRzIGNoaWxkcmVuXG4gICAgY29uc3QgdGhpc0NvbnRhaW5lciA9IGN1cnJlbnRIZWFkZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHRoZXNlSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCB0aGlzQ29udGFpbmVyKTtcbiAgICBjb25zdCBjdXJyZW50SGVhZGVySW5kZXggPSBbXS5pbmRleE9mLmNhbGwodGhlc2VIZWFkZXJzLCBjdXJyZW50SGVhZGVyKTtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggZW50ZXIvc3BhY2UsIGxlZnQvcmlnaHQgYW5kIHVwL2Rvd24gYXJyb3cga2V5IGV2ZW50c1xuICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDEzOlxuICAgICAgY2FzZSAzMjpcbiAgICAgICAgdG9nZ2xlUGFuZWwoY3VycmVudEhlYWRlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODoge1xuICAgICAgICBjb25zdCBwcmV2aW91c0hlYWRlckluZGV4ID1cbiAgICAgICAgICBjdXJyZW50SGVhZGVySW5kZXggPT09IDBcbiAgICAgICAgICAgID8gdGhlc2VIZWFkZXJzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogY3VycmVudEhlYWRlckluZGV4IC0gMTtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgcHJldmlvdXNIZWFkZXJJbmRleCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDoge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVySW5kZXggPVxuICAgICAgICAgIGN1cnJlbnRIZWFkZXJJbmRleCA8IHRoZXNlSGVhZGVycy5sZW5ndGggLSAxXG4gICAgICAgICAgICA/IGN1cnJlbnRIZWFkZXJJbmRleCArIDFcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgbmV4dEhlYWRlckluZGV4KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKSB7XG4gICAgY29uc3QgYWNjb3JkaW9uSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCBhY2NvcmRpb25Db250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVOQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gdW5iaW5kQWNjb3JkaW9uRXZlbnRzKGFjY29yZGlvbkNvbnRhaW5lcikge1xuICAgIGNvbnN0IGFjY29yZGlvbkhlYWRlcnMgPSBxdWVyeUFsbChoZWFkZXJTZWxlY3RvciwgYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBhY2NvcmRpb25Db250YWluZXJzLmZvckVhY2goYWNjb3JkaW9uQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChhY2NvcmRpb25Db250YWluZXJzLmxlbmd0aCkge1xuICAgICAgYWNjb3JkaW9uQ29udGFpbmVycy5mb3JFYWNoKGFjY29yZGlvbkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbnM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0QnJlYWRjcnVtYiA9ICh7XG4gIGJyZWFkY3J1bWJTZWxlY3RvcjogYnJlYWRjcnVtYlNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYicsXG4gIGV4cGFuZEJ1dHRvblNlbGVjdG9yOiBleHBhbmRCdXR0b25TZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX2V4cGFuZC1idG4nLFxuICBzZWdtZW50U2VsZWN0b3I6IHNlZ21lbnRTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQnLFxuICBzZWdtZW50Rmlyc3RTZWxlY3Rvcjogc2VnbWVudEZpcnN0U2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1maXJzdCcsXG4gIHNlZ21lbnRWaXNpYmxlU2VsZWN0b3I6IHNlZ21lbnRWaXNpYmxlU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50Om5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWZpcnN0KTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyk6bm90KC5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tbGFzdCk6bm90KFthcmlhLWhpZGRlbj1cInRydWVcIl0pJyxcbiAgc2VnbWVudEhpZGRlblNlbGVjdG9yOiBzZWdtZW50SGlkZGVuU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50W2FyaWEtaGlkZGVuPVwidHJ1ZVwiXTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyknLFxuICBlbGxpcHNpc1NlbGVjdG9yOiBlbGxpcHNpc1NlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnLFxufSA9IHt9KSA9PiB7XG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdEVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBhZGQgZWxsaXBzaXMgdG8gRE9NXG4gICAgY29uc3QgYnJlYWRjcnVtYkZpcnN0ID0gcXVlcnlBbGwoc2VnbWVudEZpcnN0U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIGJyZWFkY3J1bWJGaXJzdC5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgICAgY29uc3QgZWxsaXBzaXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAvLyB3ZSBjYW4ndCBhZGQgbXVsdGlwbHMgY2xhc3NlcyBhdCBvbmNlLCBiZWNhdXNlLi4uIElFXG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluaycpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWxpbmstLWludmVydGVkJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluay0tc3RhbmRhbG9uZScpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX2xpbmsnKTtcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19leHBhbmQtYnRuJyk7XG4gICAgICBlbGxpcHNpcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgZWxsaXBzaXMuaW5uZXJIVE1MID0gJ+KApic7XG5cbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19zZWdtZW50Jyk7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC11LWFyaWEnKTtcbiAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChlbGxpcHNpcyk7XG4gICAgICBzZWdtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBzZWdtZW50Lm5leHRTaWJsaW5nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgaGlkZGVuIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50SGlkZGVuU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcbiAgICBjb25zdCBoaWRkZW4gPSBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCA/ICdmYWxzZScgOiAndHJ1ZSc7XG5cbiAgICAvLyBkaXNwbGF5IGVsbGlwc2lzIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgYnJlYWRjcnVtYkVsbGlwc2lzID0gcXVlcnlBbGwoZWxsaXBzaXNTZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgYnJlYWRjcnVtYkVsbGlwc2lzLmZvckVhY2goZWxsaXBzaXMgPT4ge1xuICAgICAgZWxsaXBzaXMuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHdyYXBwZXIgd2lkdGhcbiAgICBjb25zdCB3cmFwcGVyV2lkdGggPSBNYXRoLmZsb29yKFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICk7XG5cbiAgICAvLyBnZXQgZGlzcGxheWVkIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGdldCBzZWdtZW50cyB3aWR0aFxuICAgIGxldCBzZWdtZW50V2lkdGggPSAwO1xuICAgIGJyZWFkY3J1bWJTZWdtZW50cy5mb3JFYWNoKGJyZWFkY3J1bWJTZWdtZW50ID0+IHtcbiAgICAgIHNlZ21lbnRXaWR0aCArPSBNYXRoLmNlaWwoXG4gICAgICAgIGJyZWFkY3J1bWJTZWdtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRXaWR0aCA+PSB3cmFwcGVyV2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHZpc2libGUgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50VmlzaWJsZVNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBoaWRlIHNlZ21lbnRzIGlmIG5lZWRlZFxuICAgIC8vIHdlIGRvIG5vdCBoaWRlIHRoZSBsYXN0IHR3byBzZWdtZW50c1xuICAgIGlmIChicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFub3RoZXIgc2VnbWVudCB0byBiZSBoaWRkZW5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IGhpZGRlbiBzZWdtZW50c1xuICAgIGNvbnN0IGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cyA9IHF1ZXJ5QWxsKFxuICAgICAgc2VnbWVudEhpZGRlblNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBzaG93IHNlZ21lbnRzIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZVxuICAgIGlmIChicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzW1xuICAgICAgICBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoIC0gMVxuICAgICAgXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICAvLyBicmVhZGNydW1iIGlzIHRvbyBsYXJnZSwgd2UgaGlkZSB0aGUgbGFzdCBzZWdtZW50XG4gICAgICAgIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBzZWdtZW50IHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRFeHBhbmRDbGljayhlLCBicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGRpc3BsYXkgYWxsIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICBicmVhZGNydW1iU2VnbWVudHMuZm9yRWFjaChicmVhZGNydW1iU2VnbWVudCA9PiB7XG4gICAgICBicmVhZGNydW1iU2VnbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIGVsbGlwc2lzIG9uY2UgZXhwYW5kZWRcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHNlZ21lbnRzIHRvIGJlIGhpZGRlbiBvciBzaG93blxuICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgaGlkZVNlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIH1cbiAgICB0b2dnbGVFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGNvbnN0IGJyZWFkY3J1bWJDb250YWluZXJzID0gcXVlcnlBbGwoYnJlYWRjcnVtYlNlbGVjdG9yKTtcblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kQnJlYWRjcnVtYkV2ZW50cyhicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgY29uc3QgZXhwYW5kcyA9IHF1ZXJ5QWxsKGV4cGFuZEJ1dHRvblNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGJpbmQgY2xpY2sgZXZlbnQgZm9yIGV4cGFuZFxuICAgIGV4cGFuZHMuZm9yRWFjaChleHBhbmQgPT4ge1xuICAgICAgZXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PlxuICAgICAgICBldmVudEV4cGFuZENsaWNrKGUsIGJyZWFkY3J1bWJDb250YWluZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gYmluZCByZXNpemUgZXZlbnQgdG8gY2hlY2sgYnJlYWRjcnVtYiB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goZXZlbnRSZXNpemUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBjb25zdCBleHBhbmRzID0gcXVlcnlBbGwoZXhwYW5kQnV0dG9uU2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBjbGljayBldmVudCBmb3IgZXhwYW5kXG4gICAgZXhwYW5kcy5mb3JFYWNoKGV4cGFuZCA9PiB7XG4gICAgICBleHBhbmQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+XG4gICAgICAgIGV2ZW50RXhwYW5kQ2xpY2soZSwgYnJlYWRjcnVtYkNvbnRhaW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyB1bmJpbmQgcmVzaXplIGV2ZW50IHRvIGNoZWNrIGJyZWFkY3J1bWIgd2lkdGhcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZXNpemUnLFxuICAgICAgZGVib3VuY2UoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGV2ZW50UmVzaXplKTtcbiAgICAgICAgfSxcbiAgICAgICAgMTAwLFxuICAgICAgICB7IG1heFdhaXQ6IDMwMCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoYnJlYWRjcnVtYkNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGJyZWFkY3J1bWJDb250YWluZXIgPT4ge1xuICAgICAgICB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChicmVhZGNydW1iQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goYnJlYWRjcnVtYkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGluaXRFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgICAgYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gdHJpZ2dlciByZXNpemUgZXZlbnQgb25jZVxuICAgICAgICBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGluaXRCcmVhZGNydW1iO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgY2Fyb3VzZWxzID0gKHsgc2VsZWN0b3JJZDogc2VsZWN0b3JJZCA9ICdlY2wtY2Fyb3VzZWwnIH0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8ICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGxldCBjdXJyZW50U2xpZGUgPSAwO1xuICBjb25zdCBjYXJvdXNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9ySWQpO1xuICBjb25zdCBzbGlkZXMgPSBxdWVyeUFsbCgnLmVjbC1jYXJvdXNlbF9faXRlbScsIGNhcm91c2VsKTtcbiAgY29uc3QgbGlzdCA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3QnKTtcblxuICBmdW5jdGlvbiBnZXRMaXN0SXRlbVdpZHRoKCkge1xuICAgIHJldHVybiBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19pdGVtJykub2Zmc2V0V2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvU2xpZGUobikge1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5yZW1vdmUoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICAgIGN1cnJlbnRTbGlkZSA9IChuICsgc2xpZGVzLmxlbmd0aCkgJSBzbGlkZXMubGVuZ3RoO1xuICAgIHNsaWRlc1tjdXJyZW50U2xpZGVdLmNsYXNzTGlzdC5hZGQoJ2VjbC1jYXJvdXNlbF9faXRlbS0tc2hvd2luZycpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IGl0ZW1XaWR0aCA9IGdldExpc3RJdGVtV2lkdGgoKTtcbiAgICBjb25zdCB0ciA9IGB0cmFuc2xhdGUzZCgkey1jdXJyZW50U2xpZGUgKiBpdGVtV2lkdGh9cHgsIDAsIDApYDtcblxuICAgIGxpc3Quc3R5bGUuTW96VHJhbnNmb3JtID0gdHI7IC8qIEZGICovXG4gICAgbGlzdC5zdHlsZS5tc1RyYW5zZm9ybSA9IHRyOyAvKiBJRSAoOSspICovXG4gICAgbGlzdC5zdHlsZS5PVHJhbnNmb3JtID0gdHI7IC8qIE9wZXJhICovXG4gICAgbGlzdC5zdHlsZS5XZWJraXRUcmFuc2Zvcm0gPSB0cjsgLyogU2FmYXJpICsgQ2hyb21lICovXG4gICAgbGlzdC5zdHlsZS50cmFuc2Zvcm0gPSB0cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFubm91bmNlQ3VycmVudFNsaWRlKCkge1xuICAgIGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmVjbC1jYXJvdXNlbF9fbWV0YS1zbGlkZSdcbiAgICApLnRleHRDb250ZW50ID0gYCR7Y3VycmVudFNsaWRlICsgMX0gLyAke3NsaWRlcy5sZW5ndGh9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dJbWFnZUluZm9ybWF0aW9uKCkge1xuICAgIC8vIFJlc2V0L0hpZGUgYWxsLlxuICAgIGNvbnN0IGluZm9BcmVhcyA9IHF1ZXJ5QWxsKCdbZGF0YS1pbWFnZV0nKTtcbiAgICAvLyBJZiBhbnl0aGluZyBpcyB2aXNpYmxlLlxuICAgIGlmIChpbmZvQXJlYXMpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaW5mb0FyZWFzLmZvckVhY2goYXJlYSA9PiAoYXJlYS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKSk7XG4gICAgfVxuXG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtaW1hZ2U9XCIke2N1cnJlbnRTbGlkZX1cIl1gKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICdibG9jayc7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuU2xpZGUobikge1xuICAgIGdvVG9TbGlkZShuKTtcbiAgICBzZXRPZmZzZXQoKTtcbiAgICBhbm5vdW5jZUN1cnJlbnRTbGlkZSgpO1xuICAgIHNob3dJbWFnZUluZm9ybWF0aW9uKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2aW91c1NsaWRlKCkge1xuICAgIG9wZW5TbGlkZShjdXJyZW50U2xpZGUgLSAxKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG5leHRTbGlkZSgpIHtcbiAgICBvcGVuU2xpZGUoY3VycmVudFNsaWRlICsgMSk7XG4gIH1cblxuICAvLyBBdHRhY2ggY29udHJvbHMgdG8gYSBjYXJvdXNlbC5cbiAgZnVuY3Rpb24gYWRkQ2Fyb3VzZWxDb250cm9scygpIHtcbiAgICBjb25zdCBuYXZDb250cm9scyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG5cbiAgICBuYXZDb250cm9scy5jbGFzc05hbWUgPSAnZWNsLWNhcm91c2VsX19jb250cm9scyBlY2wtbGlzdC0tdW5zdHlsZWQnO1xuXG4gICAgbmF2Q29udHJvbHMuaW5uZXJIVE1MID0gYFxuICAgICAgPGxpPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImVjbC1pY29uIGVjbC1pY29uLS1sZWZ0IGVjbC1jYXJvdXNlbF9fYnV0dG9uIGVjbC1jYXJvdXNlbF9fYnV0dG9uLS1wcmV2aW91c1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWNsLXUtc3Itb25seVwiPlByZXZpb3VzPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgPC9saT5cbiAgICAgIDxsaT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJlY2wtaWNvbiBlY2wtaWNvbi0tcmlnaHQgZWNsLWNhcm91c2VsX19idXR0b24gZWNsLWNhcm91c2VsX19idXR0b24tLW5leHRcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImVjbC11LXNyLW9ubHlcIj5OZXh0PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvbGk+XG4gICAgYDtcblxuICAgIG5hdkNvbnRyb2xzXG4gICAgICAucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5lY2wtY2Fyb3VzZWxfX2J1dHRvbi0tcHJldmlvdXMnLFxuICAgICAgICAnLmVjbC1jYXJvdXNlbF9fY29udHJvbHMnXG4gICAgICApXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcmV2aW91c1NsaWRlKTtcblxuICAgIG5hdkNvbnRyb2xzXG4gICAgICAucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fYnV0dG9uLS1uZXh0JywgJy5lY2wtY2Fyb3VzZWxfX2NvbnRyb2xzJylcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5leHRTbGlkZSk7XG5cbiAgICBjYXJvdXNlbFxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2xpc3Qtd3JhcHBlcicpXG4gICAgICAuYXBwZW5kQ2hpbGQobmF2Q29udHJvbHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQ2Fyb3VzZWxDb250cm9scygpIHtcbiAgICBjb25zdCBjb250cm9scyA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5lY2wtY2Fyb3VzZWxfX2NvbnRyb2xzJyk7XG4gICAgY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmVjbC1jYXJvdXNlbF9fbGlzdC13cmFwcGVyJykucmVtb3ZlQ2hpbGQoY29udHJvbHMpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkTGl2ZVJlZ2lvbigpIHtcbiAgICBjb25zdCBsaXZlUmVnaW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGl2ZVJlZ2lvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsICdwb2xpdGUnKTtcbiAgICBsaXZlUmVnaW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1hdG9taWMnLCAndHJ1ZScpO1xuICAgIGxpdmVSZWdpb24uY2xhc3NMaXN0LmFkZCgnZWNsLWNhcm91c2VsX19tZXRhLXNsaWRlJyk7XG4gICAgY2Fyb3VzZWxcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXZlLXJlZ2lvbicpXG4gICAgICAuYXBwZW5kQ2hpbGQobGl2ZVJlZ2lvbik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVMaXZlUmVnaW9uKCkge1xuICAgIGNvbnN0IGxpdmVSZWdpb24gPSBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19tZXRhLXNsaWRlJyk7XG4gICAgY2Fyb3VzZWxcbiAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWNsLWNhcm91c2VsX19saXZlLXJlZ2lvbicpXG4gICAgICAucmVtb3ZlQ2hpbGQobGl2ZVJlZ2lvbik7XG4gIH1cblxuICBjb25zdCBkZWJvdW5jZUNiID0gKCkgPT5cbiAgICBkZWJvdW5jZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgc2V0T2Zmc2V0KCk7XG4gICAgICB9LFxuICAgICAgMTAwLFxuICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICkoKTtcblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgYWRkQ2Fyb3VzZWxDb250cm9scygpO1xuICAgIGFkZExpdmVSZWdpb24oKTtcbiAgICBnb1RvU2xpZGUoMCk7XG4gICAgYW5ub3VuY2VDdXJyZW50U2xpZGUoKTtcbiAgICBzaG93SW1hZ2VJbmZvcm1hdGlvbigpO1xuXG4gICAgLy8gUmUtYWxpZ24gb24gcmVzaXplLlxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZUNiKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICByZW1vdmVDYXJvdXNlbENvbnRyb2xzKCk7XG4gICAgcmVtb3ZlTGl2ZVJlZ2lvbigpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZUNiKTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBvcGVuU2xpZGUsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjYXJvdXNlbHM7XG4iLCIvKipcbiAqIENvbnRleHR1YWwgbmF2aWdhdGlvbiBzY3JpcHRzXG4gKi9cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5jb25zdCBleHBhbmRDb250ZXh0dWFsTmF2ID0gKFxuICBjb250ZXh0dWFsTmF2LFxuICBidXR0b24sXG4gIHtcbiAgICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC1jb250ZXh0LW5hdl9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghY29udGV4dHVhbE5hdikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gcXVlcnlBbGwoaGlkZGVuRWxlbWVudHNTZWxlY3RvciwgY29udGV4dCk7XG5cbiAgLy8gUmVtb3ZlIGV4dHJhIGNsYXNzXG4gIGhpZGRlbkVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzVG9SZW1vdmUpO1xuICB9KTtcblxuICAvLyBSZW1vdmUgYnV0dHRvblxuICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b24pO1xufTtcblxuLy8gSGVscGVyIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IGF0dGFjaCB0aGUgZXZlbnQgbGlzdGVuZXIgdG8gYWxsIHRoZSBleHBhbmRhYmxlcyBvbiBwYWdlIGxvYWRcbmV4cG9ydCBjb25zdCBjb250ZXh0dWFsTmF2cyA9ICh7XG4gIHNlbGVjdG9yID0gJy5lY2wtY29udGV4dC1uYXYnLFxuICBidXR0b25TZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19tb3JlJyxcbiAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLWNvbnRleHQtbmF2X19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY2xhc3NUb1JlbW92ZSA9ICdlY2wtY29udGV4dC1uYXZfX2l0ZW0tLW92ZXItbGltaXQnLFxuICBjb250ZXh0ID0gZG9jdW1lbnQsXG59ID0ge30pID0+IHtcbiAgY29uc3Qgbm9kZXNBcnJheSA9IHF1ZXJ5QWxsKHNlbGVjdG9yLCBjb250ZXh0KTtcblxuICBub2Rlc0FycmF5LmZvckVhY2gobm9kZSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gY29udGV4dC5xdWVyeVNlbGVjdG9yKGJ1dHRvblNlbGVjdG9yKTtcblxuICAgIGlmIChidXR0b24pIHtcbiAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIGV4cGFuZENvbnRleHR1YWxOYXYobm9kZSwgYnV0dG9uLCB7XG4gICAgICAgICAgY2xhc3NUb1JlbW92ZSxcbiAgICAgICAgICBoaWRkZW5FbGVtZW50c1NlbGVjdG9yLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29udGV4dHVhbE5hdnM7XG4iLCIvKipcbiAqIGBOb2RlI2NvbnRhaW5zKClgIHBvbHlmaWxsLlxuICpcbiAqIFNlZTogaHR0cDovL2NvbXBhdGliaWxpdHkuc2h3dXBzLWNtcy5jaC9lbi9wb2x5ZmlsbHMvPyZpZD0xXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlXG4gKiBAcGFyYW0ge05vZGV9IG90aGVyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNvbnRhaW5zKG5vZGUsIG90aGVyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiBub2RlID09PSBvdGhlciB8fCAhIShub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG90aGVyKSAmIDE2KTtcbn1cblxuZXhwb3J0IGNvbnN0IGRyb3Bkb3duID0gc2VsZWN0b3IgPT4ge1xuICBjb25zdCBkcm9wZG93bnNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB7XG4gICAgZHJvcGRvd25zQXJyYXkuZm9yRWFjaChkcm9wZG93blNlbGVjdGlvbiA9PiB7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGNvbnRhaW5zKGRyb3Bkb3duU2VsZWN0aW9uLCBldmVudC50YXJnZXQpO1xuXG4gICAgICBpZiAoIWlzSW5zaWRlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1leHBhbmRlZD10cnVlXWBcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZHJvcGRvd25Cb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgJHtzZWxlY3Rvcn0gPiBbYXJpYS1oaWRkZW49ZmFsc2VdYFxuICAgICAgICApO1xuICAgICAgICAvLyBJZiB0aGUgYm9keSBvZiB0aGUgZHJvcGRvd24gaXMgdmlzaWJsZSwgdGhlbiB0b2dnbGUuXG4gICAgICAgIGlmIChkcm9wZG93bkJvZHkpIHtcbiAgICAgICAgICBkcm9wZG93bkJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG4gICAgICAgICAgZHJvcGRvd25Cb2R5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRyb3Bkb3duO1xuIiwiaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqXG4gKiBBdmFpbGFibGUgb3B0aW9uczpcbiAqIC0gb3B0aW9ucy50cmlnZ2VyRWxlbWVudHNTZWxlY3RvciAtIGFueSBzZWxlY3RvciB0byB3aGljaCBldmVudCBsaXN0ZW5lcnNcbiAqIGFyZSBhdHRhY2hlZC4gV2hlbiBjbGlja2VkIG9uIGFueSBlbGVtZW50IHdpdGggc3VjaCBhIHNlbGVjdG9yLCBhIGRpYWxvZyBvcGVucy5cbiAqXG4gKiAtIG9wdGlvbnMuZGlhbG9nV2luZG93SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1kaWFsb2dgLlxuICpcbiAqIC0gb3B0aW9ucy5kaWFsb2dPdmVybGF5SWQgLSBpZCBvZiB0YXJnZXQgZGlhbG9nIHdpbmRvdy4gRGVmYXVsdHMgdG8gYGVjbC1vdmVybGF5YC5cbiAqIE92ZXJsYXkgZWxlbWVudCBpcyBjcmVhdGVkIGluIHRoZSBkb2N1bWVudCBpZiBub3QgcHJvdmlkZWQgYnkgdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjb25zdCBkaWFsb2dzID0gKHtcbiAgdHJpZ2dlckVsZW1lbnRzU2VsZWN0b3I6IHRyaWdnZXJFbGVtZW50c1NlbGVjdG9yID0gJ1tkYXRhLWVjbC1kaWFsb2ddJyxcbiAgZGlhbG9nV2luZG93SWQ6IGRpYWxvZ1dpbmRvd0lkID0gJ2VjbC1kaWFsb2cnLFxuICBkaWFsb2dPdmVybGF5SWQ6IGRpYWxvZ092ZXJsYXlJZCA9ICdlY2wtb3ZlcmxheScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKCEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fCAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyBTRVRVUFxuICBjb25zdCB0cmlnZ2VyRWxlbWVudHMgPSBxdWVyeUFsbCh0cmlnZ2VyRWxlbWVudHNTZWxlY3Rvcik7XG4gIGNvbnN0IGRpYWxvZ1dpbmRvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpYWxvZ1dpbmRvd0lkKTtcbiAgbGV0IGRpYWxvZ092ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaWFsb2dPdmVybGF5SWQpO1xuXG4gIC8vIENyZWF0ZSBhbiBvdmVybGF5IGVsZW1lbnQgaWYgdGhlIHVzZXIgZG9lcyBub3Qgc3VwcGx5IG9uZS5cbiAgaWYgKCFkaWFsb2dPdmVybGF5KSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsICdlY2wtb3ZlcmxheScpO1xuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlY2wtZGlhbG9nX19vdmVybGF5Jyk7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIGRpYWxvZ092ZXJsYXkgPSBlbGVtZW50O1xuICB9XG5cbiAgLy8gV2hhdCB3ZSBjYW4gZm9jdXMgb24gaW4gdGhlIG1vZGFsLlxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoXG4gICAgcXVlcnlBbGwoXG4gICAgICBgXG4gICAgICAgIGFbaHJlZl0sXG4gICAgICAgIGFyZWFbaHJlZl0sXG4gICAgICAgIGlucHV0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSxcbiAgICAgICAgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBidXR0b246bm90KFtkaXNhYmxlZF0pLFxuICAgICAgICBbdGFiaW5kZXg9XCIwXCJdXG4gICAgICBgLFxuICAgICAgZGlhbG9nV2luZG93XG4gICAgKVxuICApO1xuXG4gIC8vIFVzZSB0aGlzIHZhcmlhYmxlIHRvIHJldHVybiBmb2N1cyBvbiBlbGVtZW50IGFmdGVyIGRpYWxvZyBiZWluZyBjbG9zZWQuXG4gIGxldCBmb2N1c2VkRWxCZWZvcmVPcGVuID0gbnVsbDtcblxuICAvLyBTcGVjaWZpYyBlbGVtZW50cyB0byB0YWtlIGNhcmUgd2hlbiBvcGVubmluZyBhbmQgY2xvc2luZyB0aGUgZGlhbG9nLlxuICBjb25zdCBmaXJzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgY29uc3QgbGFzdEZvY3VzYWJsZUVsZW1lbnQgPSBmb2N1c2FibGVFbGVtZW50c1tmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXTtcblxuICAvLyBFVkVOVFNcbiAgLy8gSGlkZSBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIGNsb3NlKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBkaWFsb2dXaW5kb3cuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuXG4gICAgaWYgKGZvY3VzZWRFbEJlZm9yZU9wZW4pIHtcbiAgICAgIGZvY3VzZWRFbEJlZm9yZU9wZW4uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnJlbW92ZSgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gS2V5Ym9hcmQgYmVoYXZpb3JzLlxuICBmdW5jdGlvbiBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICBjb25zdCBLRVlfVEFCID0gOTtcbiAgICBjb25zdCBLRVlfRVNDID0gMjc7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVCYWNrd2FyZFRhYigpIHtcbiAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBsYXN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUZvcndhcmRUYWIoKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdEZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBmaXJzdEZvY3VzYWJsZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgLy8gS2VlcCB0YWJiaW5nIGluIHRoZSBzY29wZSBvZiB0aGUgZGlhbG9nLlxuICAgICAgY2FzZSBLRVlfVEFCOlxuICAgICAgICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgaGFuZGxlQmFja3dhcmRUYWIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoYW5kbGVGb3J3YXJkVGFiKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEtFWV9FU0M6XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gU2hvdyBkaWFsb2cgYW5kIG92ZXJsYXkgZWxlbWVudHMuXG4gIGZ1bmN0aW9uIG9wZW4oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRpYWxvZ1dpbmRvdy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgIGRpYWxvZ092ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcblxuICAgIC8vIFRoaXMgaXMgdGhlIGVsZW1lbnQgdG8gaGF2ZSB0aGUgZm9jdXMgYWZ0ZXIgY2xvc2luZyB0aGUgZGlhbG9nLlxuICAgIC8vIFVzdWFsbHkgdGhlIGVsZW1lbnQgd2hpY2ggdHJpZ2dlcmVkIHRoZSBkaWFsb2cuXG4gICAgZm9jdXNlZEVsQmVmb3JlT3BlbiA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG5cbiAgICAvLyBGb2N1cyBvbiB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgZGlhbG9nLlxuICAgIGZpcnN0Rm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgLy8gQ2xvc2UgZGlhbG9nIHdoZW4gY2xpY2tlZCBvdXQgb2YgdGhlIGRpYWxvZyB3aW5kb3cuXG4gICAgZGlhbG9nT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlKTtcblxuICAgIC8vIEhhbmRsZSB0YWJiaW5nLCBlc2MgYW5kIGtleWJvYXJkIGluIHRoZSBkaWFsb2cgd2luZG93LlxuICAgIGRpYWxvZ1dpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LmFkZCgnZWNsLXUtZGlzYWJsZXNjcm9sbCcpO1xuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZERpYWxvZ0V2ZW50cyhlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudCA9PiBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbikpO1xuXG4gICAgLy8gY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKTtcbiAgICBxdWVyeUFsbCgnLmVjbC1kaWFsb2dfX2Rpc21pc3MnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgdW5iaW5kRGlhbG9nRXZlbnRzKHRyaWdnZXJFbGVtZW50cyk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKHRyaWdnZXJFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGJpbmREaWFsb2dFdmVudHModHJpZ2dlckVsZW1lbnRzKTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBkaWFsb2dzO1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUV4cGFuZGFibGUgPSAoXG4gIHRvZ2dsZUVsZW1lbnQsXG4gIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gICAgZm9yY2VDbG9zZSA9IGZhbHNlLFxuICAgIGNsb3NlU2libGluZ3MgPSBmYWxzZSxcbiAgICBzaWJsaW5nc1NlbGVjdG9yID0gJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdG9nZ2xlRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICk7XG5cbiAgLy8gRXhpdCBpZiBubyB0YXJnZXQgZm91bmRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBzdGF0dXNcbiAgY29uc3QgaXNFeHBhbmRlZCA9XG4gICAgZm9yY2VDbG9zZSA9PT0gdHJ1ZSB8fFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcblxuICAvLyBUb2dnbGUgdGhlIGV4cGFuZGFibGUvY29sbGFwc2libGVcbiAgdG9nZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaXNFeHBhbmRlZCk7XG5cbiAgLy8gVG9nZ2xlIGxhYmVsIGlmIHBvc3NpYmxlXG4gIGlmICghaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpO1xuICB9IGVsc2UgaWYgKGlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtY29sbGFwc2VkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2RhdGEtbGFiZWwtY29sbGFwc2VkJ1xuICAgICk7XG4gIH1cblxuICAvLyBDbG9zZSBzaWJsaW5ncyBpZiByZXF1ZXN0ZWRcbiAgaWYgKGNsb3NlU2libGluZ3MgPT09IHRydWUpIHtcbiAgICBjb25zdCBzaWJsaW5nc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2libGluZ3NTZWxlY3RvcikpXG4gICAgICAuZmlsdGVyKHNpYmxpbmcgPT4gc2libGluZyAhPT0gdG9nZ2xlRWxlbWVudCk7XG5cbiAgICBzaWJsaW5nc0FycmF5LmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHNpYmxpbmcsIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IGluaXRFeHBhbmRhYmxlcyA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PiB7XG4gIC8vIEV4aXQgaWYgbm8gc2VsZWN0b3Igd2FzIHByb3ZpZGVkXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7IGNvbnRleHQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcbn07XG4iLCIvKipcbiAqIEZpbGUgdXBsb2FkcyByZWxhdGVkIGJlaGF2aW9ycy5cbiAqL1xuXG5pbXBvcnQgeyBxdWVyeUFsbCB9IGZyb20gJ0BlY2wvZWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IGZpbGVVcGxvYWRzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWQnLFxuICBpbnB1dFNlbGVjdG9yOiBpbnB1dFNlbGVjdG9yID0gJy5lY2wtZmlsZS11cGxvYWRfX2lucHV0JyxcbiAgdmFsdWVTZWxlY3RvcjogdmFsdWVTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX192YWx1ZScsXG4gIGJyb3dzZVNlbGVjdG9yOiBicm93c2VTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX19icm93c2UnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBmaWxlIHVwbG9hZCBlbGVtZW50IE5vZGVMaXN0c1xuICBjb25zdCBmaWxlVXBsb2FkQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpbGVOYW1lKGVsZW1lbnQsIGZpbGVzKSB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgbGV0IGZpbGVuYW1lID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBmaWxlID0gZmlsZXNbaV07XG4gICAgICBpZiAoJ25hbWUnIGluIGZpbGUpIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgZmlsZW5hbWUgKz0gJywgJztcbiAgICAgICAgfVxuICAgICAgICBmaWxlbmFtZSArPSBmaWxlLm5hbWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2hvdyB0aGUgc2VsZWN0ZWQgZmlsZW5hbWUgaW4gdGhlIGZpZWxkLlxuICAgIGNvbnN0IG1lc3NhZ2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICBtZXNzYWdlRWxlbWVudC5pbm5lckhUTUwgPSBmaWxlbmFtZTtcbiAgfVxuXG4gIC8vIEVWRU5UU1xuICBmdW5jdGlvbiBldmVudFZhbHVlQ2hhbmdlKGUpIHtcbiAgICBpZiAoJ2ZpbGVzJyBpbiBlLnRhcmdldCkge1xuICAgICAgY29uc3QgZmlsZVVwbG9hZEVsZW1lbnRzID0gcXVlcnlBbGwodmFsdWVTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICAgIGZpbGVVcGxvYWRFbGVtZW50cy5mb3JFYWNoKGZpbGVVcGxvYWRFbGVtZW50ID0+IHtcbiAgICAgICAgdXBkYXRlRmlsZU5hbWUoZmlsZVVwbG9hZEVsZW1lbnQsIGUudGFyZ2V0LmZpbGVzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV2ZW50QnJvd3NlS2V5ZG93bihlKSB7XG4gICAgLy8gY29sbGVjdCBoZWFkZXIgdGFyZ2V0cywgYW5kIHRoZWlyIHByZXYvbmV4dFxuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG5cbiAgICBjb25zdCBpbnB1dEVsZW1lbnRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZS50YXJnZXQucGFyZW50Tm9kZSk7XG5cbiAgICBpbnB1dEVsZW1lbnRzLmZvckVhY2goaW5wdXRFbGVtZW50ID0+IHtcbiAgICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICAgIGlmIChpc01vZGlmaWVyS2V5KSByZXR1cm47XG5cbiAgICAgIC8vIGNhdGNoIGVudGVyL3NwYWNlLCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kRmlsZVVwbG9hZEV2ZW50cyhmaWxlVXBsb2FkQ29udGFpbmVyKSB7XG4gICAgLy8gYmluZCBhbGwgZmlsZSB1cGxvYWQgY2hhbmdlIGV2ZW50c1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgY29uc3QgZmlsZVVwbG9hZEJyb3dzZXMgPSBxdWVyeUFsbChicm93c2VTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBVTkJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcikge1xuICAgIGNvbnN0IGZpbGVVcGxvYWRJbnB1dHMgPSBxdWVyeUFsbChpbnB1dFNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGZpbGUgdXBsb2FkIGNoYW5nZSBldmVudHNcbiAgICBmaWxlVXBsb2FkSW5wdXRzLmZvckVhY2goZmlsZVVwbG9hZElucHV0ID0+IHtcbiAgICAgIGZpbGVVcGxvYWRJbnB1dC5yZW1vdmVFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBldmVudFZhbHVlQ2hhbmdlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGZpbGVVcGxvYWRCcm93c2VzID0gcXVlcnlBbGwoYnJvd3NlU2VsZWN0b3IsIGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGtleWRvd24gZXZlbnRzXG4gICAgZmlsZVVwbG9hZEJyb3dzZXMuZm9yRWFjaChmaWxlVXBsb2FkQnJvd3NlID0+IHtcbiAgICAgIGZpbGVVcGxvYWRCcm93c2UucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50QnJvd3NlS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBERVNUUk9ZXG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBJTklUXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgaWYgKGZpbGVVcGxvYWRDb250YWluZXJzLmxlbmd0aCkge1xuICAgICAgZmlsZVVwbG9hZENvbnRhaW5lcnMuZm9yRWFjaChmaWxlVXBsb2FkQ29udGFpbmVyID0+IHtcbiAgICAgICAgYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpbml0KCk7XG5cbiAgLy8gUkVWRUFMIEFQSVxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgZGVzdHJveSxcbiAgfTtcbn07XG5cbi8vIG1vZHVsZSBleHBvcnRzXG5leHBvcnQgZGVmYXVsdCBmaWxlVXBsb2FkcztcbiIsImltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2guZGVib3VuY2UnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG5leHBvcnQgY29uc3QgZWNsTGFuZ1NlbGVjdFBhZ2VzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZScsXG4gIHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyA9ICdlY2wtbGFuZy1zZWxlY3QtcGFnZS0tZHJvcGRvd24nLFxuICBsaXN0U2VsZWN0b3I6IGxpc3RTZWxlY3RvciA9ICcuZWNsLWxhbmctc2VsZWN0LXBhZ2VfX2xpc3QnLFxuICBkcm9wZG93blNlbGVjdG9yOiBkcm9wZG93blNlbGVjdG9yID0gJy5lY2wtbGFuZy1zZWxlY3QtcGFnZV9fZHJvcGRvd24nLFxuICBkcm9wZG93bk9uQ2hhbmdlOiBkcm9wZG93bk9uQ2hhbmdlID0gdW5kZWZpbmVkLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGxzcCkge1xuICAgIGlmICghbHNwKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IGxpc3QgPSBxdWVyeUFsbChsaXN0U2VsZWN0b3IsIGxzcClbMF07XG5cbiAgICBpZiAoIWxzcC5jbGFzc0xpc3QuY29udGFpbnModG9nZ2xlQ2xhc3MpKSB7XG4gICAgICBpZiAobGlzdCAmJiBsaXN0Lm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoID4gbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcGRvd24gPSBxdWVyeUFsbChkcm9wZG93blNlbGVjdG9yLCBsc3ApWzBdO1xuICAgICAgaWYgKGRyb3Bkb3duLm9mZnNldExlZnQgKyBsaXN0Lm9mZnNldFdpZHRoIDwgbHNwLm9mZnNldFdpZHRoKSB7XG4gICAgICAgIGxzcC5jbGFzc0xpc3QucmVtb3ZlKHRvZ2dsZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gT24gbG9hZFxuICAgIGxhbmdTZWxlY3RQYWdlc0NvbnRhaW5lcnMuZm9yRWFjaChsc3AgPT4ge1xuICAgICAgdG9nZ2xlKGxzcCk7XG5cbiAgICAgIGlmIChkcm9wZG93bk9uQ2hhbmdlKSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gcXVlcnlBbGwoZHJvcGRvd25TZWxlY3RvciwgbHNwKVswXTtcblxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcbiAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBkcm9wZG93bk9uQ2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAncmVzaXplJyxcbiAgICAgIGRlYm91bmNlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgbGFuZ1NlbGVjdFBhZ2VzQ29udGFpbmVycy5mb3JFYWNoKHRvZ2dsZSk7XG4gICAgICAgIH0sXG4gICAgICAgIDEwMCxcbiAgICAgICAgeyBtYXhXYWl0OiAzMDAgfVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gaW5pdCgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZWNsTGFuZ1NlbGVjdFBhZ2VzO1xuIiwiLypcbiAqIE1lc3NhZ2VzIGJlaGF2aW9yXG4gKi9cblxuLy8gRGlzbWlzcyBhIHNlbGVjdGVkIG1lc3NhZ2UuXG5mdW5jdGlvbiBkaXNtaXNzTWVzc2FnZShtZXNzYWdlKSB7XG4gIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIG1lc3NhZ2UucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChtZXNzYWdlKTtcbiAgfVxufVxuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIG1lc3NhZ2VzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGZ1bmN0aW9uIGluaXRNZXNzYWdlcygpIHtcbiAgY29uc3Qgc2VsZWN0b3JDbGFzcyA9ICdlY2wtbWVzc2FnZV9fZGlzbWlzcyc7XG5cbiAgY29uc3QgbWVzc2FnZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yQ2xhc3MpXG4gICk7XG5cbiAgbWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+XG4gICAgbWVzc2FnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICBkaXNtaXNzTWVzc2FnZShtZXNzYWdlLnBhcmVudEVsZW1lbnQpXG4gICAgKVxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0TWVzc2FnZXM7XG4iLCIvKlxuICogTWVzc2FnZXMgYmVoYXZpb3JcbiAqL1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2dlbmVyaWMtY29tcG9uZW50LW1lc3NhZ2UnO1xuIiwiLyohXHJcbiAgKiBTdGlja3lmaWxsIOKAkyBgcG9zaXRpb246IHN0aWNreWAgcG9seWZpbGxcclxuICAqIHYuIDIuMS4wIHwgaHR0cHM6Ly9naXRodWIuY29tL3dpbGRkZWVyL3N0aWNreWZpbGxcclxuICAqIE1JVCBMaWNlbnNlXHJcbiAgKi9cclxuXHJcbjsoZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogMS4gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5IG9yIGlzIHRvbyBvbGQgdG8gcnVuIHRoZSBwb2x5ZmlsbC5cclxuICAgICAqICAgIElmIGVpdGhlciBvZiB0aGVzZSBpcyB0aGUgY2FzZSBzZXQgYHNlcHB1a3VgIGZsYWcuIEl0IHdpbGwgYmUgY2hlY2tlZCBsYXRlciB0byBkaXNhYmxlIGtleSBmZWF0dXJlc1xyXG4gICAgICogICAgb2YgdGhlIHBvbHlmaWxsLCBidXQgdGhlIEFQSSB3aWxsIHJlbWFpbiBmdW5jdGlvbmFsIHRvIGF2b2lkIGJyZWFraW5nIHRoaW5ncy5cclxuICAgICAqL1xyXG4gICAgXHJcbiAgICB2YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxyXG4gICAgXHJcbiAgICB2YXIgc2VwcHVrdSA9IGZhbHNlO1xyXG4gICAgXHJcbiAgICB2YXIgaXNXaW5kb3dEZWZpbmVkID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XHJcbiAgICBcclxuICAgIC8vIFRoZSBwb2x5ZmlsbCBjYW7igJl0IGZ1bmN0aW9uIHByb3Blcmx5IHdpdGhvdXQgYHdpbmRvd2Agb3IgYHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlYC5cclxuICAgIGlmICghaXNXaW5kb3dEZWZpbmVkIHx8ICF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkgc2VwcHVrdSA9IHRydWU7XHJcbiAgICAvLyBEb2504oCZdCBnZXQgaW4gYSB3YXkgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgYHBvc2l0aW9uOiBzdGlja3lgIG5hdGl2ZWx5LlxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdGVzdE5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKFsnJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXS5zb21lKGZ1bmN0aW9uIChwcmVmaXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0Tm9kZS5zdHlsZS5wb3NpdGlvbiA9IHByZWZpeCArICdzdGlja3knO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGVzdE5vZGUuc3R5bGUucG9zaXRpb24gIT0gJyc7XHJcbiAgICAgICAgICAgICAgICB9KSkgc2VwcHVrdSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAvKlxyXG4gICAgICogMi4g4oCcR2xvYmFs4oCdIHZhcnMgdXNlZCBhY3Jvc3MgdGhlIHBvbHlmaWxsXHJcbiAgICAgKi9cclxuICAgIHZhciBpc0luaXRpYWxpemVkID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIFNoYWRvdyBSb290IGNvbnN0cnVjdG9yIGV4aXN0cyB0byBtYWtlIGZ1cnRoZXIgY2hlY2tzIHNpbXBsZXJcclxuICAgIHZhciBzaGFkb3dSb290RXhpc3RzID0gdHlwZW9mIFNoYWRvd1Jvb3QgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgXHJcbiAgICAvLyBMYXN0IHNhdmVkIHNjcm9sbCBwb3NpdGlvblxyXG4gICAgdmFyIHNjcm9sbCA9IHtcclxuICAgICAgICB0b3A6IG51bGwsXHJcbiAgICAgICAgbGVmdDogbnVsbFxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLy8gQXJyYXkgb2YgY3JlYXRlZCBTdGlja3kgaW5zdGFuY2VzXHJcbiAgICB2YXIgc3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDMuIFV0aWxpdHkgZnVuY3Rpb25zXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXRPYmosIHNvdXJjZU9iamVjdCkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2VPYmplY3QpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZU9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRPYmpba2V5XSA9IHNvdXJjZU9iamVjdFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBwYXJzZU51bWVyaWModmFsKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsKSB8fCAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBnZXREb2NPZmZzZXRUb3Aobm9kZSkge1xyXG4gICAgICAgIHZhciBkb2NPZmZzZXRUb3AgPSAwO1xyXG4gICAgXHJcbiAgICAgICAgd2hpbGUgKG5vZGUpIHtcclxuICAgICAgICAgICAgZG9jT2Zmc2V0VG9wICs9IG5vZGUub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGRvY09mZnNldFRvcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDQuIFN0aWNreSBjbGFzc1xyXG4gICAgICovXHJcbiAgICBcclxuICAgIHZhciBTdGlja3kgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gU3RpY2t5KG5vZGUpIHtcclxuICAgICAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0aWNreSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIEhUTUxFbGVtZW50Jyk7XHJcbiAgICAgICAgICAgIGlmIChzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kuX25vZGUgPT09IG5vZGU7XHJcbiAgICAgICAgICAgIH0pKSB0aHJvdyBuZXcgRXJyb3IoJ1N0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoaXMgbm9kZScpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICBcclxuICAgICAgICAgICAgc3RpY2tpZXMucHVzaCh0aGlzKTtcclxuICAgIFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfY3JlYXRlQ2xhc3MoU3RpY2t5LCBbe1xyXG4gICAgICAgICAgICBrZXk6ICdyZWZyZXNoJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VwcHVrdSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB0aGlzLl9kZWFjdGl2YXRlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5fbm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDEuIFNhdmUgbm9kZSBjb21wdXRlZCBwcm9wc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZUNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGVDb21wdXRlZFByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IG5vZGVDb21wdXRlZFN0eWxlLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub2RlQ29tcHV0ZWRTdHlsZS5kaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogbm9kZUNvbXB1dGVkU3R5bGUubWFyZ2luQm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGVDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0Zsb2F0OiBub2RlQ29tcHV0ZWRTdHlsZS5jc3NGbG9hdFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDIuIENoZWNrIGlmIHRoZSBub2RlIGNhbiBiZSBhY3RpdmF0ZWRcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHBhcnNlRmxvYXQobm9kZUNvbXB1dGVkUHJvcHMudG9wKSkgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAndGFibGUtY2VsbCcgfHwgbm9kZUNvbXB1dGVkUHJvcHMuZGlzcGxheSA9PSAnbm9uZScpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDMuIENoZWNrIGlmIHRoZSBjdXJyZW50IG5vZGUgcG9zaXRpb24gaXMgYHN0aWNreWAuIElmIGl0IGlzLCBpdCBtZWFucyB0aGF0IHRoZSBicm93c2VyIHN1cHBvcnRzIHN0aWNreSBwb3NpdGlvbmluZyxcclxuICAgICAgICAgICAgICAgICAqICAgIGJ1dCB0aGUgcG9seWZpbGwgd2FzIGZvcmNlLWVuYWJsZWQuIFdlIHNldCB0aGUgbm9kZeKAmXMgcG9zaXRpb24gdG8gYHN0YXRpY2AgYmVmb3JlIGNvbnRpbnVpbmcsIHNvIHRoYXQgdGhlIG5vZGVcclxuICAgICAgICAgICAgICAgICAqICAgIGlzIGluIGl04oCZcyBpbml0aWFsIHBvc2l0aW9uIHdoZW4gd2UgZ2F0aGVyIGl0cyBwYXJhbXMuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFBvc2l0aW9uID0gbm9kZS5zdHlsZS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbiA9PSAnc3RpY2t5JyB8fCBub2RlQ29tcHV0ZWRTdHlsZS5wb3NpdGlvbiA9PSAnLXdlYmtpdC1zdGlja3knKSBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ3N0YXRpYyc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA0LiBHZXQgbmVjZXNzYXJ5IG5vZGUgcGFyYW1ldGVyc1xyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVmZXJlbmNlTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnROb2RlID0gc2hhZG93Um9vdEV4aXN0cyAmJiByZWZlcmVuY2VOb2RlIGluc3RhbmNlb2YgU2hhZG93Um9vdCA/IHJlZmVyZW5jZU5vZGUuaG9zdCA6IHJlZmVyZW5jZU5vZGU7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZVdpbk9mZnNldCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyZW50V2luT2Zmc2V0ID0gcGFyZW50Tm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShwYXJlbnROb2RlKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHBhcmVudE5vZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBwYXJlbnROb2RlLnN0eWxlLnBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRIZWlnaHQ6IHBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2Zmc2V0VG9XaW5kb3cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbm9kZVdpbk9mZnNldC5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBub2RlV2luT2Zmc2V0LnJpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2Zmc2V0VG9QYXJlbnQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBub2RlV2luT2Zmc2V0LnRvcCAtIHBhcmVudFdpbk9mZnNldC50b3AgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCksXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogbm9kZVdpbk9mZnNldC5sZWZ0IC0gcGFyZW50V2luT2Zmc2V0LmxlZnQgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpLFxyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAtbm9kZVdpbk9mZnNldC5yaWdodCArIHBhcmVudFdpbk9mZnNldC5yaWdodCAtIHBhcnNlTnVtZXJpYyhwYXJlbnRDb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGVzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBvcmlnaW5hbFBvc2l0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogbm9kZS5zdHlsZS50b3AsXHJcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBub2RlLnN0eWxlLmJvdHRvbSxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBub2RlLnN0eWxlLmxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IG5vZGUuc3R5bGUucmlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IG5vZGUuc3R5bGUud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiBub2RlLnN0eWxlLm1hcmdpblRvcCxcclxuICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiBub2RlLnN0eWxlLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGUuc3R5bGUubWFyZ2luUmlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHZhciBub2RlVG9wVmFsdWUgPSBwYXJzZU51bWVyaWMobm9kZUNvbXB1dGVkUHJvcHMudG9wKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbWl0cyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydDogbm9kZVdpbk9mZnNldC50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSBub2RlVG9wVmFsdWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBwYXJlbnRXaW5PZmZzZXQudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0ICsgcGFyZW50Tm9kZS5vZmZzZXRIZWlnaHQgLSBwYXJzZU51bWVyaWMocGFyZW50Q29tcHV0ZWRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCkgLSBub2RlLm9mZnNldEhlaWdodCAtIG5vZGVUb3BWYWx1ZSAtIHBhcnNlTnVtZXJpYyhub2RlQ29tcHV0ZWRQcm9wcy5tYXJnaW5Cb3R0b20pXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICAgICAgICogNS4gRW5zdXJlIHRoYXQgdGhlIG5vZGUgd2lsbCBiZSBwb3NpdGlvbmVkIHJlbGF0aXZlbHkgdG8gdGhlIHBhcmVudCBub2RlXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRQb3NpdGlvbiA9IHBhcmVudENvbXB1dGVkU3R5bGUucG9zaXRpb247XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRQb3NpdGlvbiAhPSAnYWJzb2x1dGUnICYmIHBhcmVudFBvc2l0aW9uICE9ICdyZWxhdGl2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgICAgICAqIDYuIFJlY2FsYyBub2RlIHBvc2l0aW9uLlxyXG4gICAgICAgICAgICAgICAgICogICAgSXTigJlzIGltcG9ydGFudCB0byBkbyB0aGlzIGJlZm9yZSBjbG9uZSBpbmplY3Rpb24gdG8gYXZvaWQgc2Nyb2xsaW5nIGJ1ZyBpbiBDaHJvbWUuXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlY2FsY1Bvc2l0aW9uKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgICAgICAgKiA3LiBDcmVhdGUgYSBjbG9uZVxyXG4gICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLl9jbG9uZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgY2xvbmUubm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBzdHlsZXMgdG8gdGhlIGNsb25lXHJcbiAgICAgICAgICAgICAgICBleHRlbmQoY2xvbmUubm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBub2RlV2luT2Zmc2V0LnJpZ2h0IC0gbm9kZVdpbk9mZnNldC5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5vZGVXaW5PZmZzZXQuYm90dG9tIC0gbm9kZVdpbk9mZnNldC50b3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luVG9wLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogbm9kZUNvbXB1dGVkUHJvcHMubWFyZ2luQm90dG9tLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpbkxlZnQsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IG5vZGVDb21wdXRlZFByb3BzLm1hcmdpblJpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgIGNzc0Zsb2F0OiBub2RlQ29tcHV0ZWRQcm9wcy5jc3NGbG9hdCxcclxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMCxcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXJTcGFjaW5nOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMWVtJyxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3N0YXRpYydcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByZWZlcmVuY2VOb2RlLmluc2VydEJlZm9yZShjbG9uZS5ub2RlLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIGNsb25lLmRvY09mZnNldFRvcCA9IGdldERvY09mZnNldFRvcChjbG9uZS5ub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX3JlY2FsY1Bvc2l0aW9uJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9yZWNhbGNQb3NpdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fYWN0aXZlIHx8IHRoaXMuX3JlbW92ZWQpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHN0aWNreU1vZGUgPSBzY3JvbGwudG9wIDw9IHRoaXMuX2xpbWl0cy5zdGFydCA/ICdzdGFydCcgOiBzY3JvbGwudG9wID49IHRoaXMuX2xpbWl0cy5lbmQgPyAnZW5kJyA6ICdtaWRkbGUnO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RpY2t5TW9kZSA9PSBzdGlja3lNb2RlKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RpY2t5TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQubGVmdCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodDogdGhpcy5fb2Zmc2V0VG9QYXJlbnQucmlnaHQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiB0aGlzLl9vZmZzZXRUb1BhcmVudC50b3AgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm90dG9tOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luVG9wOiAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pZGRsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0aGlzLl9ub2RlLnN0eWxlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRoaXMuX29mZnNldFRvV2luZG93LmxlZnQgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6IHRoaXMuX29mZnNldFRvV2luZG93LnJpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogdGhpcy5fc3R5bGVzLnRvcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogJ2F1dG8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbkxlZnQ6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdlbmQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fbm9kZS5zdHlsZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5sZWZ0ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0OiB0aGlzLl9vZmZzZXRUb1BhcmVudC5yaWdodCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICdhdXRvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5MZWZ0OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGlja3lNb2RlID0gc3RpY2t5TW9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX2Zhc3RDaGVjaycsXHJcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZmFzdENoZWNrKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9hY3RpdmUgfHwgdGhpcy5fcmVtb3ZlZCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZ2V0RG9jT2Zmc2V0VG9wKHRoaXMuX2Nsb25lLm5vZGUpIC0gdGhpcy5fY2xvbmUuZG9jT2Zmc2V0VG9wKSA+IDEgfHwgTWF0aC5hYnModGhpcy5fcGFyZW50Lm5vZGUub2Zmc2V0SGVpZ2h0IC0gdGhpcy5fcGFyZW50Lm9mZnNldEhlaWdodCkgPiAxKSB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAnX2RlYWN0aXZhdGUnLFxyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2RlYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSB8fCB0aGlzLl9yZW1vdmVkKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb25lLm5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9jbG9uZS5ub2RlKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jbG9uZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuX25vZGUuc3R5bGUsIHRoaXMuX3N0eWxlcyk7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fc3R5bGVzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGVsZW1lbnTigJlzIHBhcmVudCBub2RlIGlzIHVzZWQgYnkgb3RoZXIgc3RpY2tpZXMuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBub3QsIHJlc3RvcmUgcGFyZW50IG5vZGXigJlzIHN0eWxlcy5cclxuICAgICAgICAgICAgICAgIGlmICghc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreSAhPT0gX3RoaXMgJiYgc3RpY2t5Ll9wYXJlbnQgJiYgc3RpY2t5Ll9wYXJlbnQubm9kZSA9PT0gX3RoaXMuX3BhcmVudC5ub2RlO1xyXG4gICAgICAgICAgICAgICAgfSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5fcGFyZW50Lm5vZGUuc3R5bGUsIHRoaXMuX3BhcmVudC5zdHlsZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3BhcmVudDtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RpY2t5TW9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29mZnNldFRvV2luZG93O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29mZnNldFRvUGFyZW50O1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2xpbWl0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAga2V5OiAncmVtb3ZlJyxcclxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWFjdGl2YXRlKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSwgaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RpY2t5Ll9ub2RlID09PSBfdGhpczIuX25vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RpY2tpZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV0pO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIFN0aWNreTtcclxuICAgIH0oKTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDUuIFN0aWNreWZpbGwgQVBJXHJcbiAgICAgKi9cclxuICAgIFxyXG4gICAgXHJcbiAgICB2YXIgU3RpY2t5ZmlsbCA9IHtcclxuICAgICAgICBzdGlja2llczogc3RpY2tpZXMsXHJcbiAgICAgICAgU3RpY2t5OiBTdGlja3ksXHJcbiAgICBcclxuICAgICAgICBmb3JjZVN0aWNreTogZnVuY3Rpb24gZm9yY2VTdGlja3koKSB7XHJcbiAgICAgICAgICAgIHNlcHB1a3UgPSBmYWxzZTtcclxuICAgICAgICAgICAgaW5pdCgpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYWRkT25lOiBmdW5jdGlvbiBhZGRPbmUobm9kZSkge1xyXG4gICAgICAgICAgICAvLyBDaGVjayB3aGV0aGVyIGl04oCZcyBhIG5vZGVcclxuICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gTWF5YmUgaXTigJlzIGEgbm9kZSBsaXN0IG9mIHNvbWUgc29ydD9cclxuICAgICAgICAgICAgICAgIC8vIFRha2UgZmlyc3Qgbm9kZSBmcm9tIHRoZSBsaXN0IHRoZW5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmxlbmd0aCAmJiBub2RlWzBdKSBub2RlID0gbm9kZVswXTtlbHNlIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIFN0aWNreWZpbGwgaXMgYWxyZWFkeSBhcHBsaWVkIHRvIHRoZSBub2RlXHJcbiAgICAgICAgICAgIC8vIGFuZCByZXR1cm4gZXhpc3Rpbmcgc3RpY2t5XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RpY2tpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja2llc1tpXS5fbm9kZSA9PT0gbm9kZSkgcmV0dXJuIHN0aWNraWVzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCByZXR1cm4gbmV3IHN0aWNreVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0aWNreShub2RlKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGFkZDogZnVuY3Rpb24gYWRkKG5vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgIC8vIElmIGl04oCZcyBhIG5vZGUgbWFrZSBhbiBhcnJheSBvZiBvbmUgbm9kZVxyXG4gICAgICAgICAgICBpZiAobm9kZUxpc3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkgbm9kZUxpc3QgPSBbbm9kZUxpc3RdO1xyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgYXJndW1lbnQgaXMgYW4gaXRlcmFibGUgb2Ygc29tZSBzb3J0XHJcbiAgICAgICAgICAgIGlmICghbm9kZUxpc3QubGVuZ3RoKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICAgICAgLy8gQWRkIGV2ZXJ5IGVsZW1lbnQgYXMgYSBzdGlja3kgYW5kIHJldHVybiBhbiBhcnJheSBvZiBjcmVhdGVkIFN0aWNreSBpbnN0YW5jZXNcclxuICAgICAgICAgICAgdmFyIGFkZGVkU3RpY2tpZXMgPSBbXTtcclxuICAgIFxyXG4gICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcChpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVMaXN0W2ldO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdOKAmXMgbm90IGFuIEhUTUxFbGVtZW50IOKAkyBjcmVhdGUgYW4gZW1wdHkgZWxlbWVudCB0byBwcmVzZXJ2ZSAxLXRvLTFcclxuICAgICAgICAgICAgICAgIC8vIGNvcnJlbGF0aW9uIHdpdGggaW5wdXQgbGlzdFxyXG4gICAgICAgICAgICAgICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGVkU3RpY2tpZXMucHVzaCh2b2lkIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnY29udGludWUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBTdGlja3lmaWxsIGlzIGFscmVhZHkgYXBwbGllZCB0byB0aGUgbm9kZVxyXG4gICAgICAgICAgICAgICAgLy8gYWRkIGV4aXN0aW5nIHN0aWNreVxyXG4gICAgICAgICAgICAgICAgaWYgKHN0aWNraWVzLnNvbWUoZnVuY3Rpb24gKHN0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKHN0aWNreSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pKSByZXR1cm4gJ2NvbnRpbnVlJztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFuZCBhZGQgbmV3IHN0aWNreVxyXG4gICAgICAgICAgICAgICAgYWRkZWRTdGlja2llcy5wdXNoKG5ldyBTdGlja3kobm9kZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBfcmV0MiA9IF9sb29wKGkpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoX3JldDIgPT09ICdjb250aW51ZScpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGFkZGVkU3RpY2tpZXM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWZyZXNoQWxsOiBmdW5jdGlvbiByZWZyZXNoQWxsKCkge1xyXG4gICAgICAgICAgICBzdGlja2llcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGlja3kucmVmcmVzaCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbW92ZU9uZTogZnVuY3Rpb24gcmVtb3ZlT25lKG5vZGUpIHtcclxuICAgICAgICAgICAgLy8gQ2hlY2sgd2hldGhlciBpdOKAmXMgYSBub2RlXHJcbiAgICAgICAgICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIE1heWJlIGl04oCZcyBhIG5vZGUgbGlzdCBvZiBzb21lIHNvcnQ/XHJcbiAgICAgICAgICAgICAgICAvLyBUYWtlIGZpcnN0IG5vZGUgZnJvbSB0aGUgbGlzdCB0aGVuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5sZW5ndGggJiYgbm9kZVswXSkgbm9kZSA9IG5vZGVbMF07ZWxzZSByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHN0aWNraWVzIGJvdW5kIHRvIHRoZSBub2RlcyBpbiB0aGUgbGlzdFxyXG4gICAgICAgICAgICBzdGlja2llcy5zb21lKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGlja3kuX25vZGUgPT09IG5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGlja3kucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgLy8gSWYgaXTigJlzIGEgbm9kZSBtYWtlIGFuIGFycmF5IG9mIG9uZSBub2RlXHJcbiAgICAgICAgICAgIGlmIChub2RlTGlzdCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSBub2RlTGlzdCA9IFtub2RlTGlzdF07XHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBhcmd1bWVudCBpcyBhbiBpdGVyYWJsZSBvZiBzb21lIHNvcnRcclxuICAgICAgICAgICAgaWYgKCFub2RlTGlzdC5sZW5ndGgpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHN0aWNraWVzIGJvdW5kIHRvIHRoZSBub2RlcyBpbiB0aGUgbGlzdFxyXG4gICAgXHJcbiAgICAgICAgICAgIHZhciBfbG9vcDIgPSBmdW5jdGlvbiBfbG9vcDIoaSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBub2RlTGlzdFtpXTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuc29tZShmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0aWNreS5fbm9kZSA9PT0gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGlja3kucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZUxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIF9sb29wMihpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVtb3ZlQWxsOiBmdW5jdGlvbiByZW1vdmVBbGwoKSB7XHJcbiAgICAgICAgICAgIHdoaWxlIChzdGlja2llcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHN0aWNraWVzWzBdLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgLypcclxuICAgICAqIDYuIFNldHVwIGV2ZW50cyAodW5sZXNzIHRoZSBwb2x5ZmlsbCB3YXMgZGlzYWJsZWQpXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgaWYgKGlzSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIHNjcm9sbCBwb3NpdGlvbiBjaGFuZ2VzIGFuZCB0cmlnZ2VyIHJlY2FsYy9yZWZyZXNoIGlmIG5lZWRlZFxyXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKCkge1xyXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VYT2Zmc2V0ICE9IHNjcm9sbC5sZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIFN0aWNreWZpbGwucmVmcmVzaEFsbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5wYWdlWU9mZnNldCAhPSBzY3JvbGwudG9wKSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGwudG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsLmxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQ7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vIHJlY2FsYyBwb3NpdGlvbiBmb3IgYWxsIHN0aWNraWVzXHJcbiAgICAgICAgICAgICAgICBzdGlja2llcy5mb3JFYWNoKGZ1bmN0aW9uIChzdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RpY2t5Ll9yZWNhbGNQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjaGVja1Njcm9sbCgpO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja1Njcm9sbCk7XHJcbiAgICBcclxuICAgICAgICAvLyBXYXRjaCBmb3Igd2luZG93IHJlc2l6ZXMgYW5kIGRldmljZSBvcmllbnRhdGlvbiBjaGFuZ2VzIGFuZCB0cmlnZ2VyIHJlZnJlc2hcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgU3RpY2t5ZmlsbC5yZWZyZXNoQWxsKTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBTdGlja3lmaWxsLnJlZnJlc2hBbGwpO1xyXG4gICAgXHJcbiAgICAgICAgLy9GYXN0IGRpcnR5IGNoZWNrIGZvciBsYXlvdXQgY2hhbmdlcyBldmVyeSA1MDBtc1xyXG4gICAgICAgIHZhciBmYXN0Q2hlY2tUaW1lciA9IHZvaWQgMDtcclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0RmFzdENoZWNrVGltZXIoKSB7XHJcbiAgICAgICAgICAgIGZhc3RDaGVja1RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc3RpY2tpZXMuZm9yRWFjaChmdW5jdGlvbiAoc3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0aWNreS5fZmFzdENoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBzdG9wRmFzdENoZWNrVGltZXIoKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZmFzdENoZWNrVGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHZhciBkb2NIaWRkZW5LZXkgPSB2b2lkIDA7XHJcbiAgICAgICAgdmFyIHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUgPSB2b2lkIDA7XHJcbiAgICBcclxuICAgICAgICBpZiAoJ2hpZGRlbicgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgZG9jSGlkZGVuS2V5ID0gJ2hpZGRlbic7XHJcbiAgICAgICAgICAgIHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICgnd2Via2l0SGlkZGVuJyBpbiBkb2N1bWVudCkge1xyXG4gICAgICAgICAgICBkb2NIaWRkZW5LZXkgPSAnd2Via2l0SGlkZGVuJztcclxuICAgICAgICAgICAgdmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSA9ICd3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlJztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBpZiAodmlzaWJpbGl0eUNoYW5nZUV2ZW50TmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50W2RvY0hpZGRlbktleV0pIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHZpc2liaWxpdHlDaGFuZ2VFdmVudE5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudFtkb2NIaWRkZW5LZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcEZhc3RDaGVja1RpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHN0YXJ0RmFzdENoZWNrVGltZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCFzZXBwdWt1KSBpbml0KCk7XHJcbiAgICBcclxuICAgIC8qXHJcbiAgICAgKiA3LiBFeHBvc2UgU3RpY2t5ZmlsbFxyXG4gICAgICovXHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gU3RpY2t5ZmlsbDtcclxuICAgIH0gZWxzZSBpZiAoaXNXaW5kb3dEZWZpbmVkKSB7XHJcbiAgICAgICAgd2luZG93LlN0aWNreWZpbGwgPSBTdGlja3lmaWxsO1xyXG4gICAgfVxyXG4gICAgXHJcbn0pKHdpbmRvdywgZG9jdW1lbnQpOyIsIi8qISBndW1zaG9lanMgdjMuNS4wIHwgKGMpIDIwMTcgQ2hyaXMgRmVyZGluYW5kaSB8IE1JVCBMaWNlbnNlIHwgaHR0cDovL2dpdGh1Yi5jb20vY2ZlcmRpbmFuZGkvZ3Vtc2hvZSAqL1xuIShmdW5jdGlvbihlLHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoW10sdChlKSk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9dChlKTplLmd1bXNob2U9dChlKX0pKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOnRoaXMud2luZG93fHx0aGlzLmdsb2JhbCwoZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQsbixvLHIsYSxjLGksbD17fSxzPVwicXVlcnlTZWxlY3RvclwiaW4gZG9jdW1lbnQmJlwiYWRkRXZlbnRMaXN0ZW5lclwiaW4gZSYmXCJjbGFzc0xpc3RcImluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpLHU9W10sZj17c2VsZWN0b3I6XCJbZGF0YS1ndW1zaG9lXSBhXCIsc2VsZWN0b3JIZWFkZXI6XCJbZGF0YS1ndW1zaG9lLWhlYWRlcl1cIixjb250YWluZXI6ZSxvZmZzZXQ6MCxhY3RpdmVDbGFzczpcImFjdGl2ZVwiLHNjcm9sbERlbGF5OiExLGNhbGxiYWNrOmZ1bmN0aW9uKCl7fX0sZD1mdW5jdGlvbihlLHQsbil7aWYoXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlmb3IodmFyIG8gaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxvKSYmdC5jYWxsKG4sZVtvXSxvLGUpO2Vsc2UgZm9yKHZhciByPTAsYT1lLmxlbmd0aDtyPGE7cisrKXQuY2FsbChuLGVbcl0scixlKX0sdj1mdW5jdGlvbigpe3ZhciBlPXt9LHQ9ITEsbj0wLG89YXJndW1lbnRzLmxlbmd0aDtcIltvYmplY3QgQm9vbGVhbl1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudHNbMF0pJiYodD1hcmd1bWVudHNbMF0sbisrKTtmb3IoO248bztuKyspe3ZhciByPWFyZ3VtZW50c1tuXTshKGZ1bmN0aW9uKG4pe2Zvcih2YXIgbyBpbiBuKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLG8pJiYodCYmXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChuW29dKT9lW29dPXYoITAsZVtvXSxuW29dKTplW29dPW5bb10pfSkocil9cmV0dXJuIGV9LG09ZnVuY3Rpb24oZSl7cmV0dXJuIE1hdGgubWF4KGUuc2Nyb2xsSGVpZ2h0LGUub2Zmc2V0SGVpZ2h0LGUuY2xpZW50SGVpZ2h0KX0sZz1mdW5jdGlvbigpe3JldHVybiBNYXRoLm1heChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCl9LGg9ZnVuY3Rpb24oZSl7dmFyIG49MDtpZihlLm9mZnNldFBhcmVudClkb3tuKz1lLm9mZnNldFRvcCxlPWUub2Zmc2V0UGFyZW50fXdoaWxlKGUpO2Vsc2Ugbj1lLm9mZnNldFRvcDtyZXR1cm4gbj1uLWEtdC5vZmZzZXQsbj49MD9uOjB9LHA9ZnVuY3Rpb24odCl7dmFyIG49dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyZXR1cm4gbi50b3A+PTAmJm4ubGVmdD49MCYmbi5ib3R0b208PShlLmlubmVySGVpZ2h0fHxkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSYmbi5yaWdodDw9KGUuaW5uZXJXaWR0aHx8ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKX0seT1mdW5jdGlvbigpe3Uuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5kaXN0YW5jZT50LmRpc3RhbmNlPy0xOmUuZGlzdGFuY2U8dC5kaXN0YW5jZT8xOjB9KSl9O2wuc2V0RGlzdGFuY2VzPWZ1bmN0aW9uKCl7bz1nKCksYT1yP20ocikraChyKTowLGQodSwoZnVuY3Rpb24oZSl7ZS5kaXN0YW5jZT1oKGUudGFyZ2V0KX0pKSx5KCl9O3ZhciBiPWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0LnNlbGVjdG9yKTtkKGUsKGZ1bmN0aW9uKGUpe2lmKGUuaGFzaCl7dmFyIHQ9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlLmhhc2gpO3QmJnUucHVzaCh7bmF2OmUsdGFyZ2V0OnQscGFyZW50OlwibGlcIj09PWUucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk/ZS5wYXJlbnROb2RlOm51bGwsZGlzdGFuY2U6MH0pfX0pKX0sSD1mdW5jdGlvbigpe2MmJihjLm5hdi5jbGFzc0xpc3QucmVtb3ZlKHQuYWN0aXZlQ2xhc3MpLGMucGFyZW50JiZjLnBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKHQuYWN0aXZlQ2xhc3MpKX0sQz1mdW5jdGlvbihlKXtIKCksZS5uYXYuY2xhc3NMaXN0LmFkZCh0LmFjdGl2ZUNsYXNzKSxlLnBhcmVudCYmZS5wYXJlbnQuY2xhc3NMaXN0LmFkZCh0LmFjdGl2ZUNsYXNzKSx0LmNhbGxiYWNrKGUpLGM9e25hdjplLm5hdixwYXJlbnQ6ZS5wYXJlbnR9fTtsLmdldEN1cnJlbnROYXY9ZnVuY3Rpb24oKXt2YXIgbj1lLnBhZ2VZT2Zmc2V0O2lmKGUuaW5uZXJIZWlnaHQrbj49byYmcCh1WzBdLnRhcmdldCkpcmV0dXJuIEModVswXSksdVswXTtmb3IodmFyIHI9MCxhPXUubGVuZ3RoO3I8YTtyKyspe3ZhciBjPXVbcl07aWYoYy5kaXN0YW5jZTw9bilyZXR1cm4gQyhjKSxjfUgoKSx0LmNhbGxiYWNrKCl9O3ZhciBMPWZ1bmN0aW9uKCl7ZCh1LChmdW5jdGlvbihlKXtlLm5hdi5jbGFzc0xpc3QuY29udGFpbnModC5hY3RpdmVDbGFzcykmJihjPXtuYXY6ZS5uYXYscGFyZW50OmUucGFyZW50fSl9KSl9O2wuZGVzdHJveT1mdW5jdGlvbigpe3QmJih0LmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsaiwhMSksdC5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGosITEpLHU9W10sdD1udWxsLG49bnVsbCxvPW51bGwscj1udWxsLGE9bnVsbCxjPW51bGwsaT1udWxsKX07dmFyIEU9ZnVuY3Rpb24oZSl7d2luZG93LmNsZWFyVGltZW91dChuKSxuPXNldFRpbWVvdXQoKGZ1bmN0aW9uKCl7bC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKX0pLDY2KX0saj1mdW5jdGlvbihlKXtufHwobj1zZXRUaW1lb3V0KChmdW5jdGlvbigpe249bnVsbCxcInNjcm9sbFwiPT09ZS50eXBlJiZsLmdldEN1cnJlbnROYXYoKSxcInJlc2l6ZVwiPT09ZS50eXBlJiYobC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKSl9KSw2NikpfTtyZXR1cm4gbC5pbml0PWZ1bmN0aW9uKGUpe3MmJihsLmRlc3Ryb3koKSx0PXYoZixlfHx7fSkscj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQuc2VsZWN0b3JIZWFkZXIpLGIoKSwwIT09dS5sZW5ndGgmJihMKCksbC5zZXREaXN0YW5jZXMoKSxsLmdldEN1cnJlbnROYXYoKSx0LmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsaiwhMSksdC5zY3JvbGxEZWxheT90LmNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsRSwhMSk6dC5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLGosITEpKSl9LGx9KSk7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZUV4cGFuZGFibGUgPSAoXG4gIHRvZ2dsZUVsZW1lbnQsXG4gIHtcbiAgICBjb250ZXh0ID0gZG9jdW1lbnQsXG4gICAgZm9yY2VDbG9zZSA9IGZhbHNlLFxuICAgIGNsb3NlU2libGluZ3MgPSBmYWxzZSxcbiAgICBzaWJsaW5nc1NlbGVjdG9yID0gJ1thcmlhLWNvbnRyb2xzXVthcmlhLWV4cGFuZGVkXScsXG4gIH0gPSB7fVxuKSA9PiB7XG4gIGlmICghdG9nZ2xlRWxlbWVudCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCB0YXJnZXQgZWxlbWVudFxuICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICk7XG5cbiAgLy8gRXhpdCBpZiBubyB0YXJnZXQgZm91bmRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBHZXQgY3VycmVudCBzdGF0dXNcbiAgY29uc3QgaXNFeHBhbmRlZCA9XG4gICAgZm9yY2VDbG9zZSA9PT0gdHJ1ZSB8fFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJztcblxuICAvLyBUb2dnbGUgdGhlIGV4cGFuZGFibGUvY29sbGFwc2libGVcbiAgdG9nZ2xlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAhaXNFeHBhbmRlZCk7XG4gIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgaXNFeHBhbmRlZCk7XG5cbiAgLy8gVG9nZ2xlIGxhYmVsIGlmIHBvc3NpYmxlXG4gIGlmICghaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpKSB7XG4gICAgdG9nZ2xlRWxlbWVudC5pbm5lckhUTUwgPSB0b2dnbGVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1sYWJlbC1leHBhbmRlZCcpO1xuICB9IGVsc2UgaWYgKGlzRXhwYW5kZWQgJiYgdG9nZ2xlRWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2RhdGEtbGFiZWwtY29sbGFwc2VkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFxuICAgICAgJ2RhdGEtbGFiZWwtY29sbGFwc2VkJ1xuICAgICk7XG4gIH1cblxuICAvLyBDbG9zZSBzaWJsaW5ncyBpZiByZXF1ZXN0ZWRcbiAgaWYgKGNsb3NlU2libGluZ3MgPT09IHRydWUpIHtcbiAgICBjb25zdCBzaWJsaW5nc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG4gICAgICAuY2FsbChjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2libGluZ3NTZWxlY3RvcikpXG4gICAgICAuZmlsdGVyKHNpYmxpbmcgPT4gc2libGluZyAhPT0gdG9nZ2xlRWxlbWVudCk7XG5cbiAgICBzaWJsaW5nc0FycmF5LmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHNpYmxpbmcsIHtcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZm9yY2VDbG9zZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59O1xuXG4vLyBIZWxwZXIgbWV0aG9kIHRvIGF1dG9tYXRpY2FsbHkgYXR0YWNoIHRoZSBldmVudCBsaXN0ZW5lciB0byBhbGwgdGhlIGV4cGFuZGFibGVzIG9uIHBhZ2UgbG9hZFxuZXhwb3J0IGNvbnN0IGluaXRFeHBhbmRhYmxlcyA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PiB7XG4gIC8vIEV4aXQgaWYgbm8gc2VsZWN0b3Igd2FzIHByb3ZpZGVkXG4gIGlmICghc2VsZWN0b3IpIHJldHVybjtcblxuICBjb25zdCBub2Rlc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICApO1xuXG4gIG5vZGVzQXJyYXkuZm9yRWFjaChub2RlID0+XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgdG9nZ2xlRXhwYW5kYWJsZShub2RlLCB7IGNvbnRleHQgfSk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgKTtcbn07XG4iLCIvKipcbiAqIE5hdmlnYXRpb24gaW5wYWdlIHJlbGF0ZWQgYmVoYXZpb3JzLlxuICovXG5cbmltcG9ydCBTdGlja3lmaWxsIGZyb20gJ3N0aWNreWZpbGxqcyc7XG5pbXBvcnQgZ3Vtc2hvZSBmcm9tICdndW1zaG9lanMnO1xuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2dlbmVyaWMtYmFzZS9oZWxwZXJzL2RvbSc7XG5pbXBvcnQgeyB0b2dnbGVFeHBhbmRhYmxlIH0gZnJvbSAnQGVjbC9nZW5lcmljLWNvbXBvbmVudC1leHBhbmRhYmxlJztcblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBPYmplY3QgY29udGFpbmluZyBjb25maWd1cmF0aW9uIG92ZXJyaWRlc1xuICovXG5leHBvcnQgY29uc3QgbmF2aWdhdGlvbklucGFnZXMgPSAoe1xuICBzdGlja3lTZWxlY3Rvcjogc3RpY2t5U2VsZWN0b3IgPSAnLmVjbC1pbnBhZ2UtbmF2aWdhdGlvbicsXG4gIHNweVNlbGVjdG9yOiBzcHlTZWxlY3RvciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX19saW5rJyxcbiAgc3B5Q2xhc3M6IHNweUNsYXNzID0gJ2VjbC1pbnBhZ2UtbmF2aWdhdGlvbl9fbGluay0taXMtYWN0aXZlJyxcbiAgc3B5QWN0aXZlQ29udGFpbmVyOiBzcHlBY3RpdmVDb250YWluZXIgPSAnZWNsLWlucGFnZS1uYXZpZ2F0aW9uLS12aXNpYmxlJyxcbiAgc3B5VHJpZ2dlcjogc3B5VHJpZ2dlciA9ICcuZWNsLWlucGFnZS1uYXZpZ2F0aW9uX190cmlnZ2VyJyxcbiAgc3B5T2Zmc2V0OiBzcHlPZmZzZXQgPSAyMCxcbiAgdG9nZ2xlU2VsZWN0b3I6IHRvZ2dsZVNlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX3RyaWdnZXInLFxuICBsaW5rc1NlbGVjdG9yOiBsaW5rc1NlbGVjdG9yID0gJy5lY2wtaW5wYWdlLW5hdmlnYXRpb25fX2xpbmsnLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIGxldCBzdGlja3lJbnN0YW5jZTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGluaXRTdGlja3koZWxlbWVudCkge1xuICAgIHN0aWNreUluc3RhbmNlID0gbmV3IFN0aWNreWZpbGwuU3RpY2t5KGVsZW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveVN0aWNreSgpIHtcbiAgICBpZiAoc3RpY2t5SW5zdGFuY2UpIHtcbiAgICAgIHN0aWNreUluc3RhbmNlLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRTY3JvbGxTcHkoaW5wYWdlTmF2RWxlbWVudCkge1xuICAgIGd1bXNob2UuaW5pdCh7XG4gICAgICBzZWxlY3Rvcjogc3B5U2VsZWN0b3IsXG4gICAgICBhY3RpdmVDbGFzczogc3B5Q2xhc3MsXG4gICAgICBvZmZzZXQ6IHNweU9mZnNldCxcbiAgICAgIGNhbGxiYWNrKG5hdikge1xuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNweVRyaWdnZXIpO1xuXG4gICAgICAgIGlmICghbmF2KSB7XG4gICAgICAgICAgaW5wYWdlTmF2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNweUFjdGl2ZUNvbnRhaW5lcik7XG4gICAgICAgICAgbmF2aWdhdGlvblRpdGxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlucGFnZU5hdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChzcHlBY3RpdmVDb250YWluZXIpO1xuICAgICAgICAgIG5hdmlnYXRpb25UaXRsZS5pbm5lckhUTUwgPSBuYXYubmF2LmlubmVySFRNTDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlc3Ryb3lTY3JvbGxTcHkoKSB7XG4gICAgZ3Vtc2hvZS5kZXN0cm95KCk7XG4gIH1cblxuICAvLyBJbml0XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgaW5wYWdlTmF2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RpY2t5U2VsZWN0b3IpO1xuICAgIGNvbnN0IHRvZ2dsZUVsZW1lbnQgPSBpbnBhZ2VOYXZFbGVtZW50LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGNvbnN0IG5hdkxpbmtzID0gcXVlcnlBbGwobGlua3NTZWxlY3RvciwgaW5wYWdlTmF2RWxlbWVudCk7XG5cbiAgICBpbml0U3RpY2t5KGlucGFnZU5hdkVsZW1lbnQpO1xuICAgIGluaXRTY3JvbGxTcHkoaW5wYWdlTmF2RWxlbWVudCk7XG5cbiAgICB0b2dnbGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKHRvZ2dsZUVsZW1lbnQsIHsgY29udGV4dDogaW5wYWdlTmF2RWxlbWVudCB9KTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgIG5hdkxpbmtzLmZvckVhY2gobGluayA9PlxuICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlRXhwYW5kYWJsZSh0b2dnbGVFbGVtZW50LCB7XG4gICAgICAgICAgY29udGV4dDogaW5wYWdlTmF2RWxlbWVudCxcbiAgICAgICAgICBmb3JjZUNsb3NlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8vIERlc3Ryb3lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBkZXN0cm95U2Nyb2xsU3B5KCk7XG4gICAgZGVzdHJveVN0aWNreSgpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBuYXZpZ2F0aW9uSW5wYWdlcztcbiIsImltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuaW1wb3J0IHsgdG9nZ2xlRXhwYW5kYWJsZSB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZSc7XG5cbmNvbnN0IG9uQ2xpY2sgPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGlmIChub2RlICYmIG5vZGUuaGFzQXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJykpIHtcbiAgICBjb25zdCBoYXNQb3B1cCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJyk7XG4gICAgaWYgKGhhc1BvcHVwID09PSAnJyB8fCBoYXNQb3B1cCA9PT0gJ3RydWUnKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUobm9kZSwge1xuICAgICAgICBjb250ZXh0OiBtZW51LFxuICAgICAgICBjbG9zZVNpYmxpbmdzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBvbktleWRvd24gPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRUYWIgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IHByZXZpb3VzVGFiSXRlbSA9XG4gICAgY3VycmVudFRhYi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8XG4gICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0IG5leHRUYWJJdGVtID1cbiAgICBjdXJyZW50VGFiLm5leHRFbGVtZW50U2libGluZyB8fCBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgLy8gZG9uJ3QgY2F0Y2gga2V5IGV2ZW50cyB3aGVuIOKMmCBvciBBbHQgbW9kaWZpZXIgaXMgcHJlc2VudFxuICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgLy8gY2F0Y2ggbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gIC8vIGlmIG5ldyBuZXh0L3ByZXYgdGFiIGF2YWlsYWJsZSwgc2hvdyBpdCBieSBwYXNzaW5nIHRhYiBhbmNob3IgdG8gc2hvd1RhYiBtZXRob2RcbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAvLyBFTlRFUiBvciBTUEFDRVxuICAgIGNhc2UgMTM6XG4gICAgY2FzZSAzMjpcbiAgICAgIG9uQ2xpY2soZS5jdXJyZW50VGFyZ2V0LCBtZW51KShlKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBMRUZUIGFuZCBVUFxuICAgIGNhc2UgMzc6XG4gICAgY2FzZSAzODpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZpb3VzVGFiSXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuZm9jdXMoKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBSSUdIVCBhbmQgRE9XTlxuICAgIGNhc2UgMzk6XG4gICAgY2FzZSA0MDpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG5leHRUYWJJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5mb2N1cygpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWVnYW1lbnUgPSAoe1xuICBzZWxlY3Rvcjogc2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnUnLFxuICB0b2dnbGVTZWxlY3RvcjogdG9nZ2xlU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX3RvZ2dsZScsXG4gIGxpc3RTZWxlY3RvcjogbGlzdFNlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51X19yb290JyxcbiAgbGlua1NlbGVjdG9yOiBsaW5rU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX2xpbmsnLFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG1lZ2FtZW51c0FycmF5ID0gcXVlcnlBbGwoc2VsZWN0b3IpO1xuXG4gIG1lZ2FtZW51c0FycmF5LmZvckVhY2gobWVudSA9PiB7XG4gICAgLy8gTWFrZSB0aGUgdG9nZ2xlIGV4cGFuZGFibGVcbiAgICBjb25zdCB0b2dnbGUgPSBtZW51LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIHRvZ2dsZUV4cGFuZGFibGUodG9nZ2xlLCB7IGNvbnRleHQ6IG1lbnUgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBsaXN0IG9mIGxpbmtzXG4gICAgY29uc3QgbGlzdCA9IG1lbnUucXVlcnlTZWxlY3RvcihsaXN0U2VsZWN0b3IpO1xuXG4gICAgLy8gR2V0IGV4cGFuZGFibGVzIHdpdGhpbiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGVzQXJyYXkgPSBxdWVyeUFsbChsaW5rU2VsZWN0b3IsIGxpc3QpO1xuXG4gICAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2sobm9kZSwgbGlzdCkpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKG5vZGUsIGxpc3QpKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZWdhbWVudTtcbiIsIi8qKlxuICBzdGlja3liaXRzIC0gU3RpY2t5Yml0cyBpcyBhIGxpZ2h0d2VpZ2h0IGFsdGVybmF0aXZlIHRvIGBwb3NpdGlvbjogc3RpY2t5YCBwb2x5ZmlsbHNcbiAgQHZlcnNpb24gdjMuNi42XG4gIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9kb2xsYXJzaGF2ZWNsdWIvc3RpY2t5Yml0cyNyZWFkbWVcbiAgQGF1dGhvciBKZWZmIFdhaW53cmlnaHQgPHlvd2FpbndyaWdodEBnbWFpbC5jb20+IChodHRwczovL2plZmZyeS5pbilcbiAgQGxpY2Vuc2UgTUlUXG4qKi9cbi8qXG4gIFNUSUNLWUJJVFMg8J+SiVxuICAtLS0tLS0tLVxuICA+IGEgbGlnaHR3ZWlnaHQgYWx0ZXJuYXRpdmUgdG8gYHBvc2l0aW9uOiBzdGlja3lgIHBvbHlmaWxscyDwn42sXG4gIC0tLS0tLS0tXG4gIC0gZWFjaCBtZXRob2QgaXMgZG9jdW1lbnRlZCBhYm92ZSBpdCBvdXIgdmlldyB0aGUgcmVhZG1lXG4gIC0gU3RpY2t5Yml0cyBkb2VzIG5vdCBtYW5hZ2UgcG9seW1vcnBoaWMgZnVuY3Rpb25hbGl0eSAocG9zaXRpb24gbGlrZSBwcm9wZXJ0aWVzKVxuICAqIHBvbHltb3JwaGljIGZ1bmN0aW9uYWxpdHk6IChpbiB0aGUgY29udGV4dCBvZiBkZXNjcmliaW5nIFN0aWNreWJpdHMpXG4gICAgbWVhbnMgbWFraW5nIHRoaW5ncyBsaWtlIGBwb3NpdGlvbjogc3RpY2t5YCBiZSBsb29zZWx5IHN1cHBvcnRlZCB3aXRoIHBvc2l0aW9uIGZpeGVkLlxuICAgIEl0IGFsc28gbWVhbnMgdGhhdCBmZWF0dXJlcyBsaWtlIGB1c2VTdGlja3lDbGFzc2VzYCB0YWtlcyBvbiBzdHlsZXMgbGlrZSBgcG9zaXRpb246IGZpeGVkYC5cbiAgLS0tLS0tLS1cbiAgZGVmYXVsdHMg8J+UjFxuICAtLS0tLS0tLVxuICAtIHZlcnNpb24gPSBgcGFja2FnZS5qc29uYCB2ZXJzaW9uXG4gIC0gdXNlckFnZW50ID0gdmlld2VyIGJyb3dzZXIgYWdlbnRcbiAgLSB0YXJnZXQgPSBET00gZWxlbWVudCBzZWxlY3RvclxuICAtIG5vU3R5bGVzID0gYm9vbGVhblxuICAtIG9mZnNldCA9IG51bWJlclxuICAtIHBhcmVudENsYXNzID0gJ3N0cmluZydcbiAgLSBzY3JvbGxFbCA9IHdpbmRvdyB8fCBET00gZWxlbWVudCBzZWxlY3RvciB8fCBET00gZWxlbWVudFxuICAtIHN0aWNreUNsYXNzID0gJ3N0cmluZydcbiAgLSBzdHVja0NsYXNzID0gJ3N0cmluZydcbiAgLSB1c2VTdGlja3lDbGFzc2VzID0gYm9vbGVhblxuICAtIHVzZUZpeGVkID0gYm9vbGVhblxuICAtIHVzZUdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGJvb2xlYW5cbiAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gJ3N0cmluZydcbiAgLS0tLS0tLS1cbiAgcHJvcHPwn5SMXG4gIC0tLS0tLS0tXG4gIC0gcCA9IHByb3BzIHtvYmplY3R9XG4gIC0tLS0tLS0tXG4gIGluc3RhbmNlIG5vdGVcbiAgLS0tLS0tLS1cbiAgLSBzdGlja3liaXRzIHBhcmVudCBtZXRob2RzIHJldHVybiB0aGlzXG4gIC0gc3RpY2t5Yml0cyBpbnN0YW5jZSBtZXRob2RzIHJldHVybiBhbiBpbnN0YW5jZSBpdGVtXG4gIC0tLS0tLS0tXG4gIG5vbWVuY2xhdHVyZVxuICAtLS0tLS0tLVxuICAtIHRhcmdldCA9PiBlbCA9PiBlXG4gIC0gcHJvcHMgPT4gbyB8fCBwXG4gIC0gaW5zdGFuY2UgPT4gaXRlbSA9PiBpdFxuICAtLS0tLS0tLVxuICBtZXRob2RzXG4gIC0tLS0tLS0tXG4gIC0gLmRlZmluZVBvc2l0aW9uID0gZGVmaW5lcyBzdGlja3kgb3IgZml4ZWRcbiAgLSAuYWRkSW5zdGFuY2UgPSBhbiBhcnJheSBvZiBvYmplY3RzIGZvciBlYWNoIFN0aWNreWJpdHMgVGFyZ2V0XG4gIC0gLmdldENsb3Nlc3RQYXJlbnQgPSBnZXRzIHRoZSBwYXJlbnQgZm9yIG5vbi13aW5kb3cgc2Nyb2xsXG4gIC0gLmdldFRvcFBvc2l0aW9uID0gZ2V0cyB0aGUgZWxlbWVudCB0b3AgcGl4ZWwgcG9zaXRpb24gZnJvbSB0aGUgdmlld3BvcnRcbiAgLSAuY29tcHV0ZVNjcm9sbE9mZnNldHMgPSBjb21wdXRlcyBzY3JvbGwgcG9zaXRpb25cbiAgLSAudG9nZ2xlQ2xhc3NlcyA9IG9sZGVyIGJyb3dzZXIgdG9nZ2xlclxuICAtIC5tYW5hZ2VTdGF0ZSA9IG1hbmFnZXMgc3RpY2t5IHN0YXRlXG4gIC0gLnJlbW92ZUNsYXNzID0gb2xkZXIgYnJvd3NlciBzdXBwb3J0IGNsYXNzIHJlbW92ZXJcbiAgLSAucmVtb3ZlSW5zdGFuY2UgPSByZW1vdmVzIGFuIGluc3RhbmNlXG4gIC0gLmNsZWFudXAgPSByZW1vdmVzIGFsbCBTdGlja3liaXRzIGluc3RhbmNlcyBhbmQgY2xlYW5zIHVwIGRvbSBmcm9tIHN0aWNreWJpdHNcbiovXG52YXIgU3RpY2t5Yml0cyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0aWNreWJpdHModGFyZ2V0LCBvYmopIHtcbiAgICB2YXIgbyA9IHR5cGVvZiBvYmogIT09ICd1bmRlZmluZWQnID8gb2JqIDoge307XG4gICAgdGhpcy52ZXJzaW9uID0gJzMuNi42JztcbiAgICB0aGlzLnVzZXJBZ2VudCA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50IHx8ICdubyBgdXNlckFnZW50YCBwcm92aWRlZCBieSB0aGUgYnJvd3Nlcic7XG4gICAgdGhpcy5wcm9wcyA9IHtcbiAgICAgIGN1c3RvbVN0aWNreUNoYW5nZU51bWJlcjogby5jdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIgfHwgbnVsbCxcbiAgICAgIG5vU3R5bGVzOiBvLm5vU3R5bGVzIHx8IGZhbHNlLFxuICAgICAgc3RpY2t5Qml0U3RpY2t5T2Zmc2V0OiBvLnN0aWNreUJpdFN0aWNreU9mZnNldCB8fCAwLFxuICAgICAgcGFyZW50Q2xhc3M6IG8ucGFyZW50Q2xhc3MgfHwgJ2pzLXN0aWNreWJpdC1wYXJlbnQnLFxuICAgICAgc2Nyb2xsRWw6IHR5cGVvZiBvLnNjcm9sbEVsID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioby5zY3JvbGxFbCkgOiBvLnNjcm9sbEVsIHx8IHdpbmRvdyxcbiAgICAgIHN0aWNreUNsYXNzOiBvLnN0aWNreUNsYXNzIHx8ICdqcy1pcy1zdGlja3knLFxuICAgICAgc3R1Y2tDbGFzczogby5zdHVja0NsYXNzIHx8ICdqcy1pcy1zdHVjaycsXG4gICAgICBzdGlja3lDaGFuZ2VDbGFzczogby5zdGlja3lDaGFuZ2VDbGFzcyB8fCAnanMtaXMtc3RpY2t5LS1jaGFuZ2UnLFxuICAgICAgdXNlU3RpY2t5Q2xhc3Nlczogby51c2VTdGlja3lDbGFzc2VzIHx8IGZhbHNlLFxuICAgICAgdXNlRml4ZWQ6IG8udXNlRml4ZWQgfHwgZmFsc2UsXG4gICAgICB1c2VHZXRCb3VuZGluZ0NsaWVudFJlY3Q6IG8udXNlR2V0Qm91bmRpbmdDbGllbnRSZWN0IHx8IGZhbHNlLFxuICAgICAgdmVydGljYWxQb3NpdGlvbjogby52ZXJ0aWNhbFBvc2l0aW9uIHx8ICd0b3AnXG4gICAgICAvKlxuICAgICAgICBkZWZpbmUgcG9zaXRpb25WYWwgYWZ0ZXIgdGhlIHNldHRpbmcgb2YgcHJvcHMsIGJlY2F1c2UgZGVmaW5lUG9zaXRpb24gbG9va3MgYXQgdGhlIHByb3BzLnVzZUZpeGVkXG4gICAgICAgIC0tLS1cbiAgICAgICAgLSAgdXNlcyBhIGNvbXB1dGVkIChgLmRlZmluZVBvc2l0aW9uKClgKVxuICAgICAgICAtICBkZWZpbmVkIHRoZSBwb3NpdGlvblxuICAgICAgKi9cblxuICAgIH07XG4gICAgdGhpcy5wcm9wcy5wb3NpdGlvblZhbCA9IHRoaXMuZGVmaW5lUG9zaXRpb24oKSB8fCAnZml4ZWQnO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gICAgdmFyIF90aGlzJHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgcG9zaXRpb25WYWwgPSBfdGhpcyRwcm9wcy5wb3NpdGlvblZhbCxcbiAgICAgICAgdmVydGljYWxQb3NpdGlvbiA9IF90aGlzJHByb3BzLnZlcnRpY2FsUG9zaXRpb24sXG4gICAgICAgIG5vU3R5bGVzID0gX3RoaXMkcHJvcHMubm9TdHlsZXMsXG4gICAgICAgIHN0aWNreUJpdFN0aWNreU9mZnNldCA9IF90aGlzJHByb3BzLnN0aWNreUJpdFN0aWNreU9mZnNldDtcbiAgICB2YXIgdmVydGljYWxQb3NpdGlvblN0eWxlID0gdmVydGljYWxQb3NpdGlvbiA9PT0gJ3RvcCcgJiYgIW5vU3R5bGVzID8gc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiIDogJyc7XG4gICAgdmFyIHBvc2l0aW9uU3R5bGUgPSBwb3NpdGlvblZhbCAhPT0gJ2ZpeGVkJyA/IHBvc2l0aW9uVmFsIDogJyc7XG4gICAgdGhpcy5lbHMgPSB0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KSA6IHRhcmdldDtcbiAgICBpZiAoISgnbGVuZ3RoJyBpbiB0aGlzLmVscykpIHRoaXMuZWxzID0gW3RoaXMuZWxzXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlbCA9IHRoaXMuZWxzW2ldOyAvLyBzZXQgdmVydGljYWwgcG9zaXRpb25cblxuICAgICAgZWwuc3R5bGVbdmVydGljYWxQb3NpdGlvbl0gPSB2ZXJ0aWNhbFBvc2l0aW9uU3R5bGU7XG4gICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uU3R5bGU7IC8vIGluc3RhbmNlcyBhcmUgYW4gYXJyYXkgb2Ygb2JqZWN0c1xuXG4gICAgICB0aGlzLmluc3RhbmNlcy5wdXNoKHRoaXMuYWRkSW5zdGFuY2UoZWwsIHRoaXMucHJvcHMpKTtcbiAgICB9XG4gIH1cbiAgLypcbiAgICBzZXRTdGlja3lQb3NpdGlvbiDinJTvuI9cbiAgICAtLS0tLS0tLVxuICAgIOKAlCAgbW9zdCBiYXNpYyB0aGluZyBzdGlja3liaXRzIGRvZXNcbiAgICA9PiBjaGVja3MgdG8gc2VlIGlmIHBvc2l0aW9uIHN0aWNreSBpcyBzdXBwb3J0ZWRcbiAgICA9PiBkZWZpbmVkIHRoZSBwb3NpdGlvbiB0byBiZSB1c2VkXG4gICAgPT4gc3RpY2t5Yml0cyB3b3JrcyBhY2NvcmRpbmdseVxuICAqL1xuXG5cbiAgdmFyIF9wcm90byA9IFN0aWNreWJpdHMucHJvdG90eXBlO1xuXG4gIF9wcm90by5kZWZpbmVQb3NpdGlvbiA9IGZ1bmN0aW9uIGRlZmluZVBvc2l0aW9uKCkge1xuICAgIHZhciBzdGlja3lQcm9wO1xuXG4gICAgaWYgKHRoaXMucHJvcHMudXNlRml4ZWQpIHtcbiAgICAgIHN0aWNreVByb3AgPSAnZml4ZWQnO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gWycnLCAnLW8tJywgJy13ZWJraXQtJywgJy1tb3otJywgJy1tcy0nXTtcbiAgICAgIHZhciB0ZXN0ID0gZG9jdW1lbnQuaGVhZC5zdHlsZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGVzdC5wb3NpdGlvbiA9IHByZWZpeFtpXSArIFwic3RpY2t5XCI7XG4gICAgICB9XG5cbiAgICAgIHN0aWNreVByb3AgPSB0ZXN0LnBvc2l0aW9uID8gdGVzdC5wb3NpdGlvbiA6ICdmaXhlZCc7XG4gICAgICB0ZXN0LnBvc2l0aW9uID0gJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0aWNreVByb3A7XG4gIH1cbiAgLypcbiAgICBhZGRJbnN0YW5jZSDinJTvuI9cbiAgICAtLS0tLS0tLVxuICAgIOKAlCBtYW5hZ2VzIGluc3RhbmNlcyBvZiBpdGVtc1xuICAgIC0gdGFrZXMgaW4gYW4gZWwgYW5kIHByb3BzXG4gICAgLSByZXR1cm5zIGFuIGl0ZW0gb2JqZWN0XG4gICAgLS0tXG4gICAgLSB0YXJnZXQgPSBlbFxuICAgIC0gbyA9IHtvYmplY3R9ID0gcHJvcHNcbiAgICAgIC0gc2Nyb2xsRWwgPSAnc3RyaW5nJyB8IG9iamVjdFxuICAgICAgLSB2ZXJ0aWNhbFBvc2l0aW9uID0gbnVtYmVyXG4gICAgICAtIG9mZiA9IGJvb2xlYW5cbiAgICAgIC0gcGFyZW50Q2xhc3MgPSAnc3RyaW5nJ1xuICAgICAgLSBzdGlja3lDbGFzcyA9ICdzdHJpbmcnXG4gICAgICAtIHN0dWNrQ2xhc3MgPSAnc3RyaW5nJ1xuICAgIC0tLVxuICAgIC0gZGVmaW5lZCBsYXRlclxuICAgICAgLSBwYXJlbnQgPSBkb20gZWxlbWVudFxuICAgICAgLSBzdGF0ZSA9ICdzdHJpbmcnXG4gICAgICAtIG9mZnNldCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdGFydCA9IG51bWJlclxuICAgICAgLSBzdGlja3lTdG9wID0gbnVtYmVyXG4gICAgLSByZXR1cm5zIGFuIGluc3RhbmNlIG9iamVjdFxuICAqL1xuICA7XG5cbiAgX3Byb3RvLmFkZEluc3RhbmNlID0gZnVuY3Rpb24gYWRkSW5zdGFuY2UoZWwsIHByb3BzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWw6IGVsLFxuICAgICAgcGFyZW50OiBlbC5wYXJlbnROb2RlLFxuICAgICAgcHJvcHM6IHByb3BzXG4gICAgfTtcblxuICAgIGlmIChwcm9wcy5wb3NpdGlvblZhbCA9PT0gJ2ZpeGVkJyB8fCBwcm9wcy51c2VTdGlja3lDbGFzc2VzKSB7XG4gICAgICB0aGlzLmlzV2luID0gdGhpcy5wcm9wcy5zY3JvbGxFbCA9PT0gd2luZG93O1xuICAgICAgdmFyIHNlID0gdGhpcy5pc1dpbiA/IHdpbmRvdyA6IHRoaXMuZ2V0Q2xvc2VzdFBhcmVudChpdGVtLmVsLCBpdGVtLnByb3BzLnNjcm9sbEVsKTtcbiAgICAgIHRoaXMuY29tcHV0ZVNjcm9sbE9mZnNldHMoaXRlbSk7XG4gICAgICBpdGVtLnBhcmVudC5jbGFzc05hbWUgKz0gXCIgXCIgKyBwcm9wcy5wYXJlbnRDbGFzcztcbiAgICAgIGl0ZW0uc3RhdGUgPSAnZGVmYXVsdCc7XG5cbiAgICAgIGl0ZW0uc3RhdGVDb250YWluZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5tYW5hZ2VTdGF0ZShpdGVtKTtcbiAgICAgIH07XG5cbiAgICAgIHNlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGl0ZW0uc3RhdGVDb250YWluZXIpO1xuICAgIH1cblxuICAgIHJldHVybiBpdGVtO1xuICB9XG4gIC8qXG4gICAgLS0tLS0tLS1cbiAgICBnZXRQYXJlbnQg8J+RqOKAjVxuICAgIC0tLS0tLS0tXG4gICAgLSBhIGhlbHBlciBmdW5jdGlvbiB0aGF0IGdldHMgdGhlIHRhcmdldCBlbGVtZW50J3MgcGFyZW50IHNlbGVjdGVkIGVsXG4gICAgLSBvbmx5IHVzZWQgZm9yIG5vbiBgd2luZG93YCBzY3JvbGwgZWxlbWVudHNcbiAgICAtIHN1cHBvcnRzIG9sZGVyIGJyb3dzZXJzXG4gICovXG4gIDtcblxuICBfcHJvdG8uZ2V0Q2xvc2VzdFBhcmVudCA9IGZ1bmN0aW9uIGdldENsb3Nlc3RQYXJlbnQoZWwsIG1hdGNoKSB7XG4gICAgLy8gcCA9IHBhcmVudCBlbGVtZW50XG4gICAgdmFyIHAgPSBtYXRjaDtcbiAgICB2YXIgZSA9IGVsO1xuICAgIGlmIChlLnBhcmVudEVsZW1lbnQgPT09IHApIHJldHVybiBwOyAvLyB0cmF2ZXJzZSB1cCB0aGUgZG9tIHRyZWUgdW50aWwgd2UgZ2V0IHRvIHRoZSBwYXJlbnRcblxuICAgIHdoaWxlIChlLnBhcmVudEVsZW1lbnQgIT09IHApIHtcbiAgICAgIGUgPSBlLnBhcmVudEVsZW1lbnQ7XG4gICAgfSAvLyByZXR1cm4gcGFyZW50IGVsZW1lbnRcblxuXG4gICAgcmV0dXJuIHA7XG4gIH1cbiAgLypcbiAgICAtLS0tLS0tLVxuICAgIGdldFRvcFBvc2l0aW9uXG4gICAgLS0tLS0tLS1cbiAgICAtIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgZ2V0cyB0aGUgdG9wUG9zaXRpb24gb2YgYSBTdGlja3liaXQgZWxlbWVudFxuICAgIC0gZnJvbSB0aGUgdG9wIGxldmVsIG9mIHRoZSBET01cbiAgKi9cbiAgO1xuXG4gIF9wcm90by5nZXRUb3BQb3NpdGlvbiA9IGZ1bmN0aW9uIGdldFRvcFBvc2l0aW9uKGVsKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudXNlR2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICByZXR1cm4gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgKHRoaXMucHJvcHMuc2Nyb2xsRWwucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgfVxuXG4gICAgdmFyIHRvcFBvc2l0aW9uID0gMDtcblxuICAgIGRvIHtcbiAgICAgIHRvcFBvc2l0aW9uID0gZWwub2Zmc2V0VG9wICsgdG9wUG9zaXRpb247XG4gICAgfSB3aGlsZSAoZWwgPSBlbC5vZmZzZXRQYXJlbnQpO1xuXG4gICAgcmV0dXJuIHRvcFBvc2l0aW9uO1xuICB9XG4gIC8qXG4gICAgY29tcHV0ZVNjcm9sbE9mZnNldHMg8J+TilxuICAgIC0tLVxuICAgIGNvbXB1dGVTY3JvbGxPZmZzZXRzIGZvciBTdGlja3liaXRzXG4gICAgLSBkZWZpbmVzXG4gICAgICAtIG9mZnNldFxuICAgICAgLSBzdGFydFxuICAgICAgLSBzdG9wXG4gICovXG4gIDtcblxuICBfcHJvdG8uY29tcHV0ZVNjcm9sbE9mZnNldHMgPSBmdW5jdGlvbiBjb21wdXRlU2Nyb2xsT2Zmc2V0cyhpdGVtKSB7XG4gICAgdmFyIGl0ID0gaXRlbTtcbiAgICB2YXIgcCA9IGl0LnByb3BzO1xuICAgIHZhciBlbCA9IGl0LmVsO1xuICAgIHZhciBwYXJlbnQgPSBpdC5wYXJlbnQ7XG4gICAgdmFyIGlzQ3VzdG9tID0gIXRoaXMuaXNXaW4gJiYgcC5wb3NpdGlvblZhbCA9PT0gJ2ZpeGVkJztcbiAgICB2YXIgaXNUb3AgPSBwLnZlcnRpY2FsUG9zaXRpb24gIT09ICdib3R0b20nO1xuICAgIHZhciBzY3JvbGxFbE9mZnNldCA9IGlzQ3VzdG9tID8gdGhpcy5nZXRUb3BQb3NpdGlvbihwLnNjcm9sbEVsKSA6IDA7XG4gICAgdmFyIHN0aWNreVN0YXJ0ID0gaXNDdXN0b20gPyB0aGlzLmdldFRvcFBvc2l0aW9uKHBhcmVudCkgLSBzY3JvbGxFbE9mZnNldCA6IHRoaXMuZ2V0VG9wUG9zaXRpb24ocGFyZW50KTtcbiAgICB2YXIgc3RpY2t5Q2hhbmdlT2Zmc2V0ID0gcC5jdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIgIT09IG51bGwgPyBwLmN1c3RvbVN0aWNreUNoYW5nZU51bWJlciA6IGVsLm9mZnNldEhlaWdodDtcbiAgICB2YXIgcGFyZW50Qm90dG9tID0gc3RpY2t5U3RhcnQgKyBwYXJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgIGl0Lm9mZnNldCA9IHNjcm9sbEVsT2Zmc2V0ICsgcC5zdGlja3lCaXRTdGlja3lPZmZzZXQ7XG4gICAgaXQuc3RpY2t5U3RhcnQgPSBpc1RvcCA/IHN0aWNreVN0YXJ0IC0gaXQub2Zmc2V0IDogMDtcbiAgICBpdC5zdGlja3lDaGFuZ2UgPSBpdC5zdGlja3lTdGFydCArIHN0aWNreUNoYW5nZU9mZnNldDtcbiAgICBpdC5zdGlja3lTdG9wID0gaXNUb3AgPyBwYXJlbnRCb3R0b20gLSAoZWwub2Zmc2V0SGVpZ2h0ICsgaXQub2Zmc2V0KSA6IHBhcmVudEJvdHRvbSAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgfVxuICAvKlxuICAgIHRvZ2dsZUNsYXNzZXMg4pqW77iPXG4gICAgLS0tXG4gICAgdG9nZ2xlcyBjbGFzc2VzIChmb3Igb2xkZXIgYnJvd3NlciBzdXBwb3J0KVxuICAgIHIgPSByZW1vdmVkIGNsYXNzXG4gICAgYSA9IGFkZGVkIGNsYXNzXG4gICovXG4gIDtcblxuICBfcHJvdG8udG9nZ2xlQ2xhc3NlcyA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzZXMoZWwsIHIsIGEpIHtcbiAgICB2YXIgZSA9IGVsO1xuICAgIHZhciBjQXJyYXkgPSBlLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIGlmIChhICYmIGNBcnJheS5pbmRleE9mKGEpID09PSAtMSkgY0FycmF5LnB1c2goYSk7XG4gICAgdmFyIHJJdGVtID0gY0FycmF5LmluZGV4T2Yocik7XG4gICAgaWYgKHJJdGVtICE9PSAtMSkgY0FycmF5LnNwbGljZShySXRlbSwgMSk7XG4gICAgZS5jbGFzc05hbWUgPSBjQXJyYXkuam9pbignICcpO1xuICB9XG4gIC8qXG4gICAgbWFuYWdlU3RhdGUg8J+TnVxuICAgIC0tLVxuICAgIC0gZGVmaW5lcyB0aGUgc3RhdGVcbiAgICAgIC0gbm9ybWFsXG4gICAgICAtIHN0aWNreVxuICAgICAgLSBzdHVja1xuICAqL1xuICA7XG5cbiAgX3Byb3RvLm1hbmFnZVN0YXRlID0gZnVuY3Rpb24gbWFuYWdlU3RhdGUoaXRlbSkge1xuICAgIC8vIGNhY2hlIG9iamVjdFxuICAgIHZhciBpdCA9IGl0ZW07XG4gICAgdmFyIGUgPSBpdC5lbDtcbiAgICB2YXIgcCA9IGl0LnByb3BzO1xuICAgIHZhciBzdGF0ZSA9IGl0LnN0YXRlO1xuICAgIHZhciBzdGFydCA9IGl0LnN0aWNreVN0YXJ0O1xuICAgIHZhciBjaGFuZ2UgPSBpdC5zdGlja3lDaGFuZ2U7XG4gICAgdmFyIHN0b3AgPSBpdC5zdGlja3lTdG9wO1xuICAgIHZhciBzdGwgPSBlLnN0eWxlOyAvLyBjYWNoZSBwcm9wc1xuXG4gICAgdmFyIG5zID0gcC5ub1N0eWxlcztcbiAgICB2YXIgcHYgPSBwLnBvc2l0aW9uVmFsO1xuICAgIHZhciBzZSA9IHAuc2Nyb2xsRWw7XG4gICAgdmFyIHN0aWNreSA9IHAuc3RpY2t5Q2xhc3M7XG4gICAgdmFyIHN0aWNreUNoYW5nZSA9IHAuc3RpY2t5Q2hhbmdlQ2xhc3M7XG4gICAgdmFyIHN0dWNrID0gcC5zdHVja0NsYXNzO1xuICAgIHZhciB2cCA9IHAudmVydGljYWxQb3NpdGlvbjtcbiAgICB2YXIgaXNUb3AgPSB2cCAhPT0gJ2JvdHRvbSc7XG4gICAgLypcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgLS0tXG4gICAgICAtIHVzZSByQUZcbiAgICAgIC0gb3Igc3R1YiByQUZcbiAgICAqL1xuXG4gICAgdmFyIHJBRlN0dWIgPSBmdW5jdGlvbiByQUZEdW1teShmKSB7XG4gICAgICBmKCk7XG4gICAgfTtcblxuICAgIHZhciByQUYgPSAhdGhpcy5pc1dpbiA/IHJBRlN0dWIgOiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgckFGU3R1YjtcbiAgICAvKlxuICAgICAgZGVmaW5lIHNjcm9sbCB2YXJzXG4gICAgICAtLS1cbiAgICAgIC0gc2Nyb2xsXG4gICAgICAtIG5vdFN0aWNreVxuICAgICAgLSBpc1N0aWNreVxuICAgICAgLSBpc1N0dWNrXG4gICAgKi9cblxuICAgIHZhciB0QyA9IHRoaXMudG9nZ2xlQ2xhc3NlcztcbiAgICB2YXIgc2Nyb2xsID0gdGhpcy5pc1dpbiA/IHdpbmRvdy5zY3JvbGxZIHx8IHdpbmRvdy5wYWdlWU9mZnNldCA6IHNlLnNjcm9sbFRvcDtcbiAgICB2YXIgbm90U3RpY2t5ID0gc2Nyb2xsID4gc3RhcnQgJiYgc2Nyb2xsIDwgc3RvcCAmJiAoc3RhdGUgPT09ICdkZWZhdWx0JyB8fCBzdGF0ZSA9PT0gJ3N0dWNrJyk7XG4gICAgdmFyIGlzU3RpY2t5ID0gaXNUb3AgJiYgc2Nyb2xsIDw9IHN0YXJ0ICYmIChzdGF0ZSA9PT0gJ3N0aWNreScgfHwgc3RhdGUgPT09ICdzdHVjaycpO1xuICAgIHZhciBpc1N0dWNrID0gc2Nyb2xsID49IHN0b3AgJiYgc3RhdGUgPT09ICdzdGlja3knO1xuICAgIC8qXG4gICAgICBVbm5hbWVkIGFycm93IGZ1bmN0aW9ucyB3aXRoaW4gdGhpcyBibG9ja1xuICAgICAgLS0tXG4gICAgICAtIGhlbHAgd2FudGVkIG9yIGRpc2N1c3Npb25cbiAgICAgIC0gdmlldyB0ZXN0LnN0aWNreWJpdHMuanNcbiAgICAgICAgLSBgc3RpY2t5Yml0cyAubWFuYWdlU3RhdGUgIGBwb3NpdGlvbjogZml4ZWRgIGludGVyZmFjZWAgZm9yIG1vcmUgYXdhcmVuZXNzIPCfkYBcbiAgICAqL1xuXG4gICAgaWYgKG5vdFN0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnc3RpY2t5JztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0dWNrLCBzdGlja3kpO1xuICAgICAgICBzdGwucG9zaXRpb24gPSBwdjtcbiAgICAgICAgaWYgKG5zKSByZXR1cm47XG4gICAgICAgIHN0bC5ib3R0b20gPSAnJztcbiAgICAgICAgc3RsW3ZwXSA9IHAuc3RpY2t5Qml0U3RpY2t5T2Zmc2V0ICsgXCJweFwiO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc1N0aWNreSkge1xuICAgICAgaXQuc3RhdGUgPSAnZGVmYXVsdCc7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdGlja3kpO1xuICAgICAgICB0QyhlLCBzdHVjayk7XG4gICAgICAgIGlmIChwdiA9PT0gJ2ZpeGVkJykgc3RsLnBvc2l0aW9uID0gJyc7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3R1Y2spIHtcbiAgICAgIGl0LnN0YXRlID0gJ3N0dWNrJztcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreSwgc3R1Y2spO1xuICAgICAgICBpZiAocHYgIT09ICdmaXhlZCcgfHwgbnMpIHJldHVybjtcbiAgICAgICAgc3RsLnRvcCA9ICcnO1xuICAgICAgICBzdGwuYm90dG9tID0gJzAnO1xuICAgICAgICBzdGwucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3RpY2t5Q2hhbmdlID0gc2Nyb2xsID49IGNoYW5nZSAmJiBzY3JvbGwgPD0gc3RvcDtcbiAgICB2YXIgaXNOb3RTdGlja3lDaGFuZ2UgPSBzY3JvbGwgPCBjaGFuZ2UgLyAyIHx8IHNjcm9sbCA+IHN0b3A7XG4gICAgdmFyIHN0dWIgPSAnc3R1Yic7IC8vIGEgc3R1YiBjc3MgY2xhc3MgdG8gcmVtb3ZlXG5cbiAgICBpZiAoaXNOb3RTdGlja3lDaGFuZ2UpIHtcbiAgICAgIHJBRihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRDKGUsIHN0aWNreUNoYW5nZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzU3RpY2t5Q2hhbmdlKSB7XG4gICAgICByQUYoZnVuY3Rpb24gKCkge1xuICAgICAgICB0QyhlLCBzdHViLCBzdGlja3lDaGFuZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUodXBkYXRlZFByb3BzKSB7XG4gICAgaWYgKHVwZGF0ZWRQcm9wcyA9PT0gdm9pZCAwKSB7XG4gICAgICB1cGRhdGVkUHJvcHMgPSBudWxsO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pbnN0YW5jZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMuaW5zdGFuY2VzW2ldO1xuICAgICAgdGhpcy5jb21wdXRlU2Nyb2xsT2Zmc2V0cyhpbnN0YW5jZSk7XG5cbiAgICAgIGlmICh1cGRhdGVkUHJvcHMpIHtcbiAgICAgICAgZm9yICh2YXIgdXBkYXRlZFByb3AgaW4gdXBkYXRlZFByb3BzKSB7XG4gICAgICAgICAgaW5zdGFuY2UucHJvcHNbdXBkYXRlZFByb3BdID0gdXBkYXRlZFByb3BzW3VwZGF0ZWRQcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qXG4gICAgcmVtb3ZlcyBhbiBpbnN0YW5jZSDwn5GLXG4gICAgLS0tLS0tLS1cbiAgICAtIGNsZWFudXAgaW5zdGFuY2VcbiAgKi9cbiAgO1xuXG4gIF9wcm90by5yZW1vdmVJbnN0YW5jZSA9IGZ1bmN0aW9uIHJlbW92ZUluc3RhbmNlKGluc3RhbmNlKSB7XG4gICAgdmFyIGUgPSBpbnN0YW5jZS5lbDtcbiAgICB2YXIgcCA9IGluc3RhbmNlLnByb3BzO1xuICAgIHZhciB0QyA9IHRoaXMudG9nZ2xlQ2xhc3NlcztcbiAgICBlLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgZS5zdHlsZVtwLnZlcnRpY2FsUG9zaXRpb25dID0gJyc7XG4gICAgdEMoZSwgcC5zdGlja3lDbGFzcyk7XG4gICAgdEMoZSwgcC5zdHVja0NsYXNzKTtcbiAgICB0QyhlLnBhcmVudE5vZGUsIHAucGFyZW50Q2xhc3MpO1xuICB9XG4gIC8qXG4gICAgY2xlYW51cCDwn5uBXG4gICAgLS0tLS0tLS1cbiAgICAtIGNsZWFucyB1cCBlYWNoIGluc3RhbmNlXG4gICAgLSBjbGVhcnMgaW5zdGFuY2VcbiAgKi9cbiAgO1xuXG4gIF9wcm90by5jbGVhbnVwID0gZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaW5zdGFuY2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzLmluc3RhbmNlc1tpXTtcblxuICAgICAgaWYgKGluc3RhbmNlLnN0YXRlQ29udGFpbmVyKSB7XG4gICAgICAgIGluc3RhbmNlLnByb3BzLnNjcm9sbEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnN0YXRlQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZW1vdmVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgdGhpcy5tYW5hZ2VTdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gW107XG4gIH07XG5cbiAgcmV0dXJuIFN0aWNreWJpdHM7XG59KCk7XG4vKlxuICBleHBvcnRcbiAgLS0tLS0tLS1cbiAgZXhwb3J0cyBTdGlja0JpdHMgdG8gYmUgdXNlZCDwn4+BXG4qL1xuXG5cbmZ1bmN0aW9uIHN0aWNreWJpdHModGFyZ2V0LCBvKSB7XG4gIHJldHVybiBuZXcgU3RpY2t5Yml0cyh0YXJnZXQsIG8pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGlja3liaXRzO1xuIiwiLyoqXG4gKiBTaWRlIG5hdmlnYXRpb24gcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IHN0aWNreWJpdHMgZnJvbSAnc3RpY2t5Yml0cyc7XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgT2JqZWN0IGNvbnRhaW5pbmcgY29uZmlndXJhdGlvbiBvdmVycmlkZXNcbiAqL1xuZXhwb3J0IGNvbnN0IG5hdmlnYXRpb25TaWRlID0gKHtcbiAgc3RpY2t5U2VsZWN0b3I6IHN0aWNreVNlbGVjdG9yID0gJy5lY2wtc2lkZS1uYXZpZ2F0aW9uX190b2dnbGUnLFxuICBhY3RpdmVTZWxlY3RvcjogYWN0aXZlU2VsZWN0b3IgPSAnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmstLWFjdGl2ZScsXG59ID0ge30pID0+IHtcbiAgLy8gU1VQUE9SVFNcbiAgaWYgKFxuICAgICEoJ3F1ZXJ5U2VsZWN0b3InIGluIGRvY3VtZW50KSB8fFxuICAgICEoJ2FkZEV2ZW50TGlzdGVuZXInIGluIHdpbmRvdykgfHxcbiAgICAhZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdFxuICApXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiBpbml0U3RpY2t5KCkge1xuICAgIC8vIGluaXQgc3RpY2t5IG1lbnVcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzdGlja3liaXRzKHN0aWNreVNlbGVjdG9yLCB7IHVzZVN0aWNreUNsYXNzZXM6IHRydWUgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGxUb1RvcCgpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgc3RpY2t5U2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBpZiAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICBlLnRhcmdldC5zY3JvbGxJbnRvVmlldygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1bmZvbGRUb0FjdGl2ZSgpIHtcbiAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgYWN0aXZlU2VsZWN0b3Iuc3Vic3RyaW5nKDEpXG4gICAgKVswXTtcblxuICAgIC8vIEJyb3dzZSBwYXJlbnRzXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgbGV0IG5vZGUgPSBhY3RpdmU7XG4gICAgICBjb25zdCBlbHMgPSBbXTtcbiAgICAgIHdoaWxlIChub2RlKSB7XG4gICAgICAgIGVscy51bnNoaWZ0KG5vZGUpO1xuICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHBhcmVudCBpcyBhbiBleHBhbmRhYmxlIG1lbnUgaXRlbVxuICAgICAgICBpZiAobm9kZS5tYXRjaGVzKCcuZWNsLXNpZGUtbmF2aWdhdGlvbl9fZ3JvdXAnKSkge1xuICAgICAgICAgIGNvbnN0IGxpbmsgPSBub2RlLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgaWYgKGxpbmsubWF0Y2hlcygnLmVjbC1zaWRlLW5hdmlnYXRpb25fX2xpbmsnKSkge1xuICAgICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIG5lZWQgdG8gY2hlY2sgb3V0c2lkZSBvZiBtZW51XG4gICAgICAgIGlmIChub2RlLm1hdGNoZXMoJy5lY2wtc2lkZS1uYXZpZ2F0aW9uJykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBpbml0U3RpY2t5KCk7XG4gICAgc2Nyb2xsVG9Ub3AoKTtcbiAgICB1bmZvbGRUb0FjdGl2ZSgpO1xuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IG5hdmlnYXRpb25TaWRlO1xuIiwiLyoqXG4gKiBUYWJsZXMgcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5leHBlY3RlZC1tdWx0aWxpbmUgKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGVjbFRhYmxlcyhlbGVtZW50cyA9IG51bGwpIHtcbiAgY29uc3QgdGFibGVzID1cbiAgICBlbGVtZW50cyB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlY2wtdGFibGUtLXJlc3BvbnNpdmUnKTtcbiAgW10uZm9yRWFjaC5jYWxsKHRhYmxlcywgdGFibGUgPT4ge1xuICAgIGNvbnN0IGhlYWRlclRleHQgPSBbXTtcbiAgICBsZXQgdGV4dENvbHNwYW4gPSAnJztcbiAgICBsZXQgY2kgPSAwO1xuICAgIGxldCBjbiA9IFtdO1xuXG4gICAgLy8gVGhlIHJvd3MgaW4gYSB0YWJsZSBib2R5LlxuICAgIGNvbnN0IHRhYmxlUm93cyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IHRyJyk7XG5cbiAgICAvLyBUaGUgaGVhZGVycyBpbiBhIHRhYmxlLlxuICAgIGNvbnN0IGhlYWRlcnMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aGVhZCB0ciB0aCcpO1xuXG4gICAgLy8gVGhlIG51bWJlciBvZiBtYWluIGhlYWRlcnMuXG4gICAgY29uc3QgaGVhZEZpcnN0ID1cbiAgICAgIHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoZWFkIHRyJylbMF0ucXVlcnlTZWxlY3RvckFsbCgndGgnKS5sZW5ndGggLSAxO1xuXG4gICAgLy8gTnVtYmVyIG9mIGNlbGxzIHBlciByb3cuXG4gICAgY29uc3QgY2VsbFBlclJvdyA9IHRhYmxlXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgdHInKVswXVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJykubGVuZ3RoO1xuXG4gICAgLy8gUG9zaXRpb24gb2YgdGhlIGV2ZW50dWFsIGNvbHNwYW4gZWxlbWVudC5cbiAgICBsZXQgY29sc3BhbkluZGV4ID0gLTE7XG5cbiAgICAvLyBCdWlsZCB0aGUgYXJyYXkgd2l0aCBhbGwgdGhlIFwibGFiZWxzXCJcbiAgICAvLyBBbHNvIGdldCBwb3NpdGlvbiBvZiB0aGUgZXZlbnR1YWwgY29sc3BhbiBlbGVtZW50XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoaGVhZGVyc1tpXS5nZXRBdHRyaWJ1dGUoJ2NvbHNwYW4nKSkge1xuICAgICAgICBjb2xzcGFuSW5kZXggPSBpO1xuICAgICAgfVxuXG4gICAgICBoZWFkZXJUZXh0W2ldID0gW107XG4gICAgICBoZWFkZXJUZXh0W2ldID0gaGVhZGVyc1tpXS50ZXh0Q29udGVudDtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBoYXZlIGEgY29sc3Bhbiwgd2UgaGF2ZSB0byBwcmVwYXJlIHRoZSBkYXRhIGZvciBpdC5cbiAgICBpZiAoY29sc3BhbkluZGV4ICE9PSAtMSkge1xuICAgICAgdGV4dENvbHNwYW4gPSBoZWFkZXJUZXh0LnNwbGljZShjb2xzcGFuSW5kZXgsIDEpO1xuICAgICAgY2kgPSBjb2xzcGFuSW5kZXg7XG4gICAgICBjbiA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoW2NvbHNwYW5dJylbMF0uZ2V0QXR0cmlidXRlKCdjb2xzcGFuJyk7XG5cbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY247IGMgKz0gMSkge1xuICAgICAgICBoZWFkZXJUZXh0LnNwbGljZShjaSArIGMsIDAsIGhlYWRlclRleHRbaGVhZEZpcnN0ICsgY10pO1xuICAgICAgICBoZWFkZXJUZXh0LnNwbGljZShoZWFkRmlyc3QgKyAxICsgYywgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRm9yIGV2ZXJ5IHJvdywgc2V0IHRoZSBhdHRyaWJ1dGVzIHdlIHVzZSB0byBtYWtlIHRoaXMgaGFwcGVuLlxuICAgIFtdLmZvckVhY2guY2FsbCh0YWJsZVJvd3MsIHJvdyA9PiB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNlbGxQZXJSb3c7IGogKz0gMSkge1xuICAgICAgICBpZiAoaGVhZGVyVGV4dFtqXSA9PT0gJycgfHwgaGVhZGVyVGV4dFtqXSA9PT0gJ1xcdTAwYTAnKSB7XG4gICAgICAgICAgcm93XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgndGQnKVxuICAgICAgICAgICAgW2pdLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZWNsLXRhYmxlX19oZWFkaW5nJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcm93LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RkJylbal0uc2V0QXR0cmlidXRlKCdkYXRhLXRoJywgaGVhZGVyVGV4dFtqXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29sc3BhbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbnN0IGNlbGwgPSByb3cucXVlcnlTZWxlY3RvckFsbCgndGQnKVtjb2xzcGFuSW5kZXhdO1xuICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdlY2wtdGFibGVfX2dyb3VwLWxhYmVsJyk7XG4gICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGgtZ3JvdXAnLCB0ZXh0Q29sc3Bhbik7XG5cbiAgICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGNuOyBjICs9IDEpIHtcbiAgICAgICAgICAgIHJvd1xuICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgndGQnKVxuICAgICAgICAgICAgICBbY29sc3BhbkluZGV4ICsgY10uc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICdjbGFzcycsXG4gICAgICAgICAgICAgICAgJ2VjbC10YWJsZV9fZ3JvdXBfZWxlbWVudCdcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVjbFRhYmxlcztcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIHRhYiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCB0YWJzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtdGFicycsXG4gIHRhYmxpc3RTZWxlY3RvcjogdGFibGlzdFNlbGVjdG9yID0gJy5lY2wtdGFic19fdGFibGlzdCcsXG4gIHRhYnBhbmVsU2VsZWN0b3I6IHRhYnBhbmVsU2VsZWN0b3IgPSAnLmVjbC10YWJzX190YWJwYW5lbCcsXG4gIHRhYmVsZW1lbnRzU2VsZWN0b3I6IHRhYmVsZW1lbnRzU2VsZWN0b3IgPSBgJHt0YWJsaXN0U2VsZWN0b3J9IGxpYCxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBTRVRVUFxuICAvLyBzZXQgdGFiIGVsZW1lbnQgTm9kZUxpc3RcbiAgY29uc3QgdGFiQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHNob3dUYWIodGFyZ2V0LCBnaXZlRm9jdXMgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2libGluZ1RhYnMgPSBxdWVyeUFsbChcbiAgICAgIGAke3RhYmxpc3RTZWxlY3Rvcn0gbGlgLFxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICk7XG4gICAgY29uc3Qgc2libGluZ1RhYnBhbmVscyA9IHF1ZXJ5QWxsKFxuICAgICAgdGFicGFuZWxTZWxlY3RvcixcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICApO1xuXG4gICAgLy8gc2V0IGluYWN0aXZlc1xuICAgIHNpYmxpbmdUYWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgdGFiLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpO1xuICAgIH0pO1xuXG4gICAgc2libGluZ1RhYnBhbmVscy5mb3JFYWNoKHRhYnBhbmVsID0+IHtcbiAgICAgIHRhYnBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IGFjdGl2ZXMgYW5kIGZvY3VzXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICBpZiAoZ2l2ZUZvY3VzKSB0YXJnZXQuZm9jdXMoKTtcbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSlcbiAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRUYWJDbGljayhlKSB7XG4gICAgc2hvd1RhYihlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gbG9vayBpbnRvIHJlbW92ZSBpZC9zZXR0aW1lb3V0L3JlaW5zdGF0ZSBpZCBhcyBhbiBhbHRlcm5hdGl2ZSB0byBwcmV2ZW50RGVmYXVsdFxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRUYWJLZXlkb3duKGUpIHtcbiAgICAvLyBjb2xsZWN0IHRhYiB0YXJnZXRzLCBhbmQgdGhlaXIgcGFyZW50cycgcHJldi9uZXh0IChvciBmaXJzdC9sYXN0KVxuICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgcHJldmlvdXNUYWJJdGVtID1cbiAgICAgIGN1cnJlbnRUYWIucHJldmlvdXNFbGVtZW50U2libGluZyB8fFxuICAgICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgbmV4dFRhYkl0ZW0gPVxuICAgICAgY3VycmVudFRhYi5uZXh0RWxlbWVudFNpYmxpbmcgfHxcbiAgICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgICAvLyBjYXRjaCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAvLyBpZiBuZXcgbmV4dC9wcmV2IHRhYiBhdmFpbGFibGUsIHNob3cgaXQgYnkgcGFzc2luZyB0YWIgYW5jaG9yIHRvIHNob3dUYWIgbWV0aG9kXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICBjYXNlIDM4OlxuICAgICAgICBzaG93VGFiKHByZXZpb3VzVGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDpcbiAgICAgICAgc2hvd1RhYihuZXh0VGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBCSU5ESU5HU1xuICBmdW5jdGlvbiBiaW5kVGFic0V2ZW50cyh0YWJDb250YWluZXIpIHtcbiAgICBjb25zdCB0YWJzRWxlbWVudHMgPSBxdWVyeUFsbCh0YWJlbGVtZW50c1NlbGVjdG9yLCB0YWJDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIHRhYiBjbGljayBhbmQga2V5ZG93biBldmVudHNcbiAgICB0YWJzRWxlbWVudHMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRUYWJDbGljayk7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50VGFiS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmJpbmRUYWJzRXZlbnRzKHRhYkNvbnRhaW5lcikge1xuICAgIGNvbnN0IHRhYnNFbGVtZW50cyA9IHF1ZXJ5QWxsKHRhYmVsZW1lbnRzU2VsZWN0b3IsIHRhYkNvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGFsbCB0YWIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgdGFic0VsZW1lbnRzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50VGFiQ2xpY2spO1xuICAgICAgdGFiLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudFRhYktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRhYkNvbnRhaW5lcnMuZm9yRWFjaCh1bmJpbmRUYWJzRXZlbnRzKTtcbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2goYmluZFRhYnNFdmVudHMpO1xuICB9XG5cbiAgLy8gQXV0b21hdGljYWxseSBpbml0XG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IHRhYnM7XG4iLCIvKipcbiAqIFRpbWVsaW5lXG4gKi9cblxuY29uc3QgZXhwYW5kVGltZWxpbmUgPSAoXG4gIHRpbWVsaW5lLFxuICBidXR0b24sXG4gIHtcbiAgICBjbGFzc1RvUmVtb3ZlID0gJ2VjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gICAgaGlkZGVuRWxlbWVudHNTZWxlY3RvciA9ICcuZWNsLXRpbWVsaW5lX19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgfSA9IHt9XG4pID0+IHtcbiAgaWYgKCF0aW1lbGluZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGhpZGRlbkVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoXG4gICAgdGltZWxpbmUucXVlcnlTZWxlY3RvckFsbChoaWRkZW5FbGVtZW50c1NlbGVjdG9yKVxuICApO1xuXG4gIC8vIFJlbW92ZSBleHRyYSBjbGFzc1xuICBoaWRkZW5FbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc1RvUmVtb3ZlKTtcbiAgfSk7XG5cbiAgLy8gUmVtb3ZlIGJ1dHR0b25cbiAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYnV0dG9uKTtcbn07XG5cbi8vIEhlbHBlciBtZXRob2QgdG8gYXV0b21hdGljYWxseSBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGFsbCB0aGUgZXhwYW5kYWJsZXMgb24gcGFnZSBsb2FkXG5leHBvcnQgY29uc3QgdGltZWxpbmVzID0gKHtcbiAgc2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZScsXG4gIGJ1dHRvblNlbGVjdG9yID0gJy5lY2wtdGltZWxpbmVfX2J1dHRvbicsXG4gIGhpZGRlbkVsZW1lbnRzU2VsZWN0b3IgPSAnLmVjbC10aW1lbGluZV9faXRlbS0tb3Zlci1saW1pdCcsXG4gIGNsYXNzVG9SZW1vdmUgPSAnZWNsLXRpbWVsaW5lX19pdGVtLS1vdmVyLWxpbWl0JyxcbiAgY29udGV4dCA9IGRvY3VtZW50LFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG5vZGVzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihidXR0b25TZWxlY3Rvcik7XG5cbiAgICBpZiAoYnV0dG9uKSB7XG4gICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PlxuICAgICAgICBleHBhbmRUaW1lbGluZShub2RlLCBidXR0b24sIHsgY2xhc3NUb1JlbW92ZSwgaGlkZGVuRWxlbWVudHNTZWxlY3RvciB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdGltZWxpbmVzO1xuIiwiLyoqXG4gKiBUaW1lbGluZVxuICovXG5cbmV4cG9ydCAqIGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtdGltZWxpbmUnO1xuIiwiLy8gRXhwb3J0IGNvbXBvbmVudHNcblxuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtYWNjb3JkaW9uJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWJyZWFkY3J1bWInO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtY2Fyb3VzZWwnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtY29udGV4dC1uYXYnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZHJvcGRvd24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZGlhbG9nJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZCc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1sYW5nLXNlbGVjdC1wYWdlJztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LW1lc3NhZ2UnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtaW5wYWdlLW5hdmlnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51JztcbmV4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LXNpZGUtbmF2aWdhdGlvbic7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC10YWJsZSc7XG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC10YWInO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUnO1xuIiwiLy8gRXhwb3J0IGNvbXBvbmVudHNcblxuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1wcmVzZXQtZnVsbCc7XG4iXSwibmFtZXMiOlsicXVlcnlBbGwiLCJzZWxlY3RvciIsImNvbnRleHQiLCJkb2N1bWVudCIsInNsaWNlIiwiY2FsbCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhY2NvcmRpb25zIiwiaGVhZGVyU2VsZWN0b3IiLCJ3aW5kb3ciLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhY2NvcmRpb25Db250YWluZXJzIiwiaGlkZVBhbmVsIiwidGFyZ2V0IiwiYWN0aXZlUGFuZWwiLCJnZXRFbGVtZW50QnlJZCIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInNob3dQYW5lbCIsInRvZ2dsZVBhbmVsIiwiZ2l2ZUhlYWRlckZvY3VzIiwiaGVhZGVyU2V0IiwiaSIsImZvY3VzIiwiZXZlbnRIZWFkZXJDbGljayIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZXZlbnRIZWFkZXJLZXlkb3duIiwiY3VycmVudEhlYWRlciIsImlzTW9kaWZpZXJLZXkiLCJtZXRhS2V5IiwiYWx0S2V5IiwidGhpc0NvbnRhaW5lciIsInBhcmVudE5vZGUiLCJ0aGVzZUhlYWRlcnMiLCJjdXJyZW50SGVhZGVySW5kZXgiLCJpbmRleE9mIiwia2V5Q29kZSIsInByZXZlbnREZWZhdWx0IiwicHJldmlvdXNIZWFkZXJJbmRleCIsImxlbmd0aCIsIm5leHRIZWFkZXJJbmRleCIsImJpbmRBY2NvcmRpb25FdmVudHMiLCJhY2NvcmRpb25Db250YWluZXIiLCJhY2NvcmRpb25IZWFkZXJzIiwiZm9yRWFjaCIsImFjY29yZGlvbkhlYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ1bmJpbmRBY2NvcmRpb25FdmVudHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGVzdHJveSIsImluaXQiLCJGVU5DX0VSUk9SX1RFWFQiLCJOQU4iLCJzeW1ib2xUYWciLCJyZVRyaW0iLCJyZUlzQmFkSGV4IiwicmVJc0JpbmFyeSIsInJlSXNPY3RhbCIsImZyZWVQYXJzZUludCIsInBhcnNlSW50IiwiZnJlZUdsb2JhbCIsImJhYmVsSGVscGVycy50eXBlb2YiLCJnbG9iYWwiLCJPYmplY3QiLCJmcmVlU2VsZiIsInNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJvYmplY3RQcm90byIsInByb3RvdHlwZSIsIm9iamVjdFRvU3RyaW5nIiwidG9TdHJpbmciLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwibmF0aXZlTWluIiwibWluIiwibm93IiwiRGF0ZSIsImRlYm91bmNlIiwiZnVuYyIsIndhaXQiLCJvcHRpb25zIiwibGFzdEFyZ3MiLCJsYXN0VGhpcyIsIm1heFdhaXQiLCJyZXN1bHQiLCJ0aW1lcklkIiwibGFzdENhbGxUaW1lIiwibGFzdEludm9rZVRpbWUiLCJsZWFkaW5nIiwibWF4aW5nIiwidHJhaWxpbmciLCJUeXBlRXJyb3IiLCJ0b051bWJlciIsImlzT2JqZWN0IiwiaW52b2tlRnVuYyIsInRpbWUiLCJhcmdzIiwidGhpc0FyZyIsInVuZGVmaW5lZCIsImFwcGx5IiwibGVhZGluZ0VkZ2UiLCJzZXRUaW1lb3V0IiwidGltZXJFeHBpcmVkIiwicmVtYWluaW5nV2FpdCIsInRpbWVTaW5jZUxhc3RDYWxsIiwidGltZVNpbmNlTGFzdEludm9rZSIsInNob3VsZEludm9rZSIsInRyYWlsaW5nRWRnZSIsImNhbmNlbCIsImNsZWFyVGltZW91dCIsImZsdXNoIiwiZGVib3VuY2VkIiwiaXNJbnZva2luZyIsImFyZ3VtZW50cyIsInZhbHVlIiwidHlwZSIsImlzT2JqZWN0TGlrZSIsImlzU3ltYm9sIiwib3RoZXIiLCJ2YWx1ZU9mIiwicmVwbGFjZSIsImlzQmluYXJ5IiwidGVzdCIsImluaXRCcmVhZGNydW1iIiwiYnJlYWRjcnVtYlNlbGVjdG9yIiwiZXhwYW5kQnV0dG9uU2VsZWN0b3IiLCJzZWdtZW50U2VsZWN0b3IiLCJzZWdtZW50Rmlyc3RTZWxlY3RvciIsInNlZ21lbnRWaXNpYmxlU2VsZWN0b3IiLCJzZWdtZW50SGlkZGVuU2VsZWN0b3IiLCJlbGxpcHNpc1NlbGVjdG9yIiwiaW5pdEVsbGlwc2lzIiwiYnJlYWRjcnVtYkNvbnRhaW5lciIsImJyZWFkY3J1bWJGaXJzdCIsImVsbGlwc2lzIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImlubmVySFRNTCIsImxpc3RJdGVtIiwiYXBwZW5kQ2hpbGQiLCJzZWdtZW50IiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJ0b2dnbGVFbGxpcHNpcyIsImJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cyIsImhpZGRlbiIsImJyZWFkY3J1bWJFbGxpcHNpcyIsImJyZWFkY3J1bWJJc1Rvb0xhcmdlIiwid3JhcHBlcldpZHRoIiwiZmxvb3IiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImJyZWFkY3J1bWJTZWdtZW50cyIsInNlZ21lbnRXaWR0aCIsImNlaWwiLCJicmVhZGNydW1iU2VnbWVudCIsImhpZGVTZWdtZW50IiwiYnJlYWRjcnVtYlZpc2libGVTZWdtZW50cyIsInNob3dTZWdtZW50IiwiZXZlbnRFeHBhbmRDbGljayIsInBhcmVudEVsZW1lbnQiLCJldmVudFJlc2l6ZSIsImJyZWFkY3J1bWJDb250YWluZXJzIiwiYmluZEJyZWFkY3J1bWJFdmVudHMiLCJleHBhbmRzIiwiZXhwYW5kIiwidW5iaW5kQnJlYWRjcnVtYkV2ZW50cyIsImNhcm91c2VscyIsInNlbGVjdG9ySWQiLCJjdXJyZW50U2xpZGUiLCJjYXJvdXNlbCIsInNsaWRlcyIsImxpc3QiLCJxdWVyeVNlbGVjdG9yIiwiZ2V0TGlzdEl0ZW1XaWR0aCIsIm9mZnNldFdpZHRoIiwiZ29Ub1NsaWRlIiwibiIsInJlbW92ZSIsInNldE9mZnNldCIsIml0ZW1XaWR0aCIsInRyIiwic3R5bGUiLCJNb3pUcmFuc2Zvcm0iLCJtc1RyYW5zZm9ybSIsIk9UcmFuc2Zvcm0iLCJXZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbm5vdW5jZUN1cnJlbnRTbGlkZSIsInRleHRDb250ZW50Iiwic2hvd0ltYWdlSW5mb3JtYXRpb24iLCJpbmZvQXJlYXMiLCJhcmVhIiwiZGlzcGxheSIsIm9wZW5TbGlkZSIsInByZXZpb3VzU2xpZGUiLCJuZXh0U2xpZGUiLCJhZGRDYXJvdXNlbENvbnRyb2xzIiwibmF2Q29udHJvbHMiLCJjbGFzc05hbWUiLCJyZW1vdmVDYXJvdXNlbENvbnRyb2xzIiwiY29udHJvbHMiLCJyZW1vdmVDaGlsZCIsImFkZExpdmVSZWdpb24iLCJsaXZlUmVnaW9uIiwicmVtb3ZlTGl2ZVJlZ2lvbiIsImRlYm91bmNlQ2IiLCJleHBhbmRDb250ZXh0dWFsTmF2IiwiY29udGV4dHVhbE5hdiIsImJ1dHRvbiIsImNsYXNzVG9SZW1vdmUiLCJoaWRkZW5FbGVtZW50c1NlbGVjdG9yIiwiaGlkZGVuRWxlbWVudHMiLCJlbGVtZW50IiwiY29udGV4dHVhbE5hdnMiLCJidXR0b25TZWxlY3RvciIsIm5vZGVzQXJyYXkiLCJub2RlIiwiY29udGFpbnMiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsImRyb3Bkb3duIiwiZHJvcGRvd25zQXJyYXkiLCJBcnJheSIsImlzSW5zaWRlIiwiZHJvcGRvd25TZWxlY3Rpb24iLCJldmVudCIsImRyb3Bkb3duQnV0dG9uIiwiZHJvcGRvd25Cb2R5IiwiZGlhbG9ncyIsInRyaWdnZXJFbGVtZW50c1NlbGVjdG9yIiwiZGlhbG9nV2luZG93SWQiLCJkaWFsb2dPdmVybGF5SWQiLCJ0cmlnZ2VyRWxlbWVudHMiLCJkaWFsb2dXaW5kb3ciLCJkaWFsb2dPdmVybGF5IiwiYm9keSIsImZvY3VzYWJsZUVsZW1lbnRzIiwiZm9jdXNlZEVsQmVmb3JlT3BlbiIsImZpcnN0Rm9jdXNhYmxlRWxlbWVudCIsImxhc3RGb2N1c2FibGVFbGVtZW50IiwiY2xvc2UiLCJoYW5kbGVLZXlEb3duIiwiS0VZX1RBQiIsIktFWV9FU0MiLCJoYW5kbGVCYWNrd2FyZFRhYiIsImFjdGl2ZUVsZW1lbnQiLCJoYW5kbGVGb3J3YXJkVGFiIiwic2hpZnRLZXkiLCJvcGVuIiwiYmluZERpYWxvZ0V2ZW50cyIsImVsZW1lbnRzIiwidW5iaW5kRGlhbG9nRXZlbnRzIiwidG9nZ2xlRXhwYW5kYWJsZSIsInRvZ2dsZUVsZW1lbnQiLCJmb3JjZUNsb3NlIiwiY2xvc2VTaWJsaW5ncyIsInNpYmxpbmdzU2VsZWN0b3IiLCJpc0V4cGFuZGVkIiwiaGFzQXR0cmlidXRlIiwic2libGluZ3NBcnJheSIsImZpbHRlciIsInNpYmxpbmciLCJpbml0RXhwYW5kYWJsZXMiLCJmaWxlVXBsb2FkcyIsImlucHV0U2VsZWN0b3IiLCJ2YWx1ZVNlbGVjdG9yIiwiYnJvd3NlU2VsZWN0b3IiLCJmaWxlVXBsb2FkQ29udGFpbmVycyIsInVwZGF0ZUZpbGVOYW1lIiwiZmlsZXMiLCJmaWxlbmFtZSIsImZpbGUiLCJuYW1lIiwibWVzc2FnZUVsZW1lbnQiLCJldmVudFZhbHVlQ2hhbmdlIiwiZmlsZVVwbG9hZEVsZW1lbnRzIiwiZmlsZVVwbG9hZEVsZW1lbnQiLCJldmVudEJyb3dzZUtleWRvd24iLCJpbnB1dEVsZW1lbnRzIiwiaW5wdXRFbGVtZW50IiwiY2xpY2siLCJiaW5kRmlsZVVwbG9hZEV2ZW50cyIsImZpbGVVcGxvYWRDb250YWluZXIiLCJmaWxlVXBsb2FkSW5wdXRzIiwiZmlsZVVwbG9hZElucHV0IiwiZmlsZVVwbG9hZEJyb3dzZXMiLCJmaWxlVXBsb2FkQnJvd3NlIiwidW5iaW5kRmlsZVVwbG9hZEV2ZW50cyIsImVjbExhbmdTZWxlY3RQYWdlcyIsInRvZ2dsZUNsYXNzIiwibGlzdFNlbGVjdG9yIiwiZHJvcGRvd25TZWxlY3RvciIsImRyb3Bkb3duT25DaGFuZ2UiLCJsYW5nU2VsZWN0UGFnZXNDb250YWluZXJzIiwidG9nZ2xlIiwibHNwIiwib2Zmc2V0TGVmdCIsImRpc21pc3NNZXNzYWdlIiwibWVzc2FnZSIsImluaXRNZXNzYWdlcyIsInNlbGVjdG9yQ2xhc3MiLCJtZXNzYWdlcyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJfY3JlYXRlQ2xhc3MiLCJkZWZpbmVQcm9wZXJ0aWVzIiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJDb25zdHJ1Y3RvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwic2VwcHVrdSIsImlzV2luZG93RGVmaW5lZCIsImdldENvbXB1dGVkU3R5bGUiLCJ0ZXN0Tm9kZSIsInNvbWUiLCJwcmVmaXgiLCJwb3NpdGlvbiIsImlzSW5pdGlhbGl6ZWQiLCJzaGFkb3dSb290RXhpc3RzIiwiU2hhZG93Um9vdCIsInNjcm9sbCIsInRvcCIsImxlZnQiLCJzdGlja2llcyIsImV4dGVuZCIsInRhcmdldE9iaiIsInNvdXJjZU9iamVjdCIsImhhc093blByb3BlcnR5IiwicGFyc2VOdW1lcmljIiwidmFsIiwicGFyc2VGbG9hdCIsImdldERvY09mZnNldFRvcCIsImRvY09mZnNldFRvcCIsIm9mZnNldFRvcCIsIm9mZnNldFBhcmVudCIsIlN0aWNreSIsIkhUTUxFbGVtZW50IiwiRXJyb3IiLCJzdGlja3kiLCJfbm9kZSIsIl9zdGlja3lNb2RlIiwiX2FjdGl2ZSIsInB1c2giLCJyZWZyZXNoIiwiX3JlbW92ZWQiLCJfZGVhY3RpdmF0ZSIsIm5vZGVDb21wdXRlZFN0eWxlIiwibm9kZUNvbXB1dGVkUHJvcHMiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJjc3NGbG9hdCIsImlzTmFOIiwib3JpZ2luYWxQb3NpdGlvbiIsInJlZmVyZW5jZU5vZGUiLCJob3N0Iiwibm9kZVdpbk9mZnNldCIsInBhcmVudFdpbk9mZnNldCIsInBhcmVudENvbXB1dGVkU3R5bGUiLCJfcGFyZW50Iiwic3R5bGVzIiwib2Zmc2V0SGVpZ2h0IiwiX29mZnNldFRvV2luZG93IiwicmlnaHQiLCJjbGllbnRXaWR0aCIsIl9vZmZzZXRUb1BhcmVudCIsImJvcmRlclRvcFdpZHRoIiwiYm9yZGVyTGVmdFdpZHRoIiwiYm9yZGVyUmlnaHRXaWR0aCIsIl9zdHlsZXMiLCJib3R0b20iLCJub2RlVG9wVmFsdWUiLCJfbGltaXRzIiwic3RhcnQiLCJwYWdlWU9mZnNldCIsImVuZCIsImJvcmRlckJvdHRvbVdpZHRoIiwicGFyZW50UG9zaXRpb24iLCJfcmVjYWxjUG9zaXRpb24iLCJjbG9uZSIsIl9jbG9uZSIsImhlaWdodCIsInBhZGRpbmciLCJib3JkZXIiLCJib3JkZXJTcGFjaW5nIiwiZm9udFNpemUiLCJzdGlja3lNb2RlIiwiX2Zhc3RDaGVjayIsImFicyIsIl90aGlzIiwiX3RoaXMyIiwiaW5kZXgiLCJzcGxpY2UiLCJTdGlja3lmaWxsIiwiZm9yY2VTdGlja3kiLCJyZWZyZXNoQWxsIiwiYWRkT25lIiwibm9kZUxpc3QiLCJhZGRlZFN0aWNraWVzIiwiX2xvb3AiLCJfcmV0MiIsInJlbW92ZU9uZSIsIl9sb29wMiIsInJlbW92ZUFsbCIsImNoZWNrU2Nyb2xsIiwicGFnZVhPZmZzZXQiLCJmYXN0Q2hlY2tUaW1lciIsInN0YXJ0RmFzdENoZWNrVGltZXIiLCJzZXRJbnRlcnZhbCIsInN0b3BGYXN0Q2hlY2tUaW1lciIsImNsZWFySW50ZXJ2YWwiLCJkb2NIaWRkZW5LZXkiLCJ2aXNpYmlsaXR5Q2hhbmdlRXZlbnROYW1lIiwibW9kdWxlIiwiZXhwb3J0cyIsInQiLCJ0aGlzIiwibyIsInIiLCJhIiwiYyIsImwiLCJzIiwidSIsImYiLCJzZWxlY3RvckhlYWRlciIsImNvbnRhaW5lciIsIm9mZnNldCIsImFjdGl2ZUNsYXNzIiwic2Nyb2xsRGVsYXkiLCJjYWxsYmFjayIsImQiLCJ2IiwibSIsInNjcm9sbEhlaWdodCIsImNsaWVudEhlaWdodCIsImciLCJoIiwicCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsInkiLCJzb3J0IiwiZGlzdGFuY2UiLCJzZXREaXN0YW5jZXMiLCJiIiwiaGFzaCIsIm5hdiIsInBhcmVudCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsIkgiLCJDIiwiZ2V0Q3VycmVudE5hdiIsIkwiLCJqIiwiRSIsIm5hdmlnYXRpb25JbnBhZ2VzIiwic3RpY2t5U2VsZWN0b3IiLCJzcHlTZWxlY3RvciIsInNweUNsYXNzIiwic3B5QWN0aXZlQ29udGFpbmVyIiwic3B5VHJpZ2dlciIsInNweU9mZnNldCIsInRvZ2dsZVNlbGVjdG9yIiwibGlua3NTZWxlY3RvciIsInN0aWNreUluc3RhbmNlIiwiaW5pdFN0aWNreSIsImRlc3Ryb3lTdGlja3kiLCJpbml0U2Nyb2xsU3B5IiwiaW5wYWdlTmF2RWxlbWVudCIsImd1bXNob2UiLCJuYXZpZ2F0aW9uVGl0bGUiLCJkZXN0cm95U2Nyb2xsU3B5IiwibmF2TGlua3MiLCJsaW5rIiwib25DbGljayIsIm1lbnUiLCJoYXNQb3B1cCIsIm9uS2V5ZG93biIsImN1cnJlbnRUYWIiLCJwcmV2aW91c1RhYkl0ZW0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsIm5leHRUYWJJdGVtIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCJtZWdhbWVudSIsImxpbmtTZWxlY3RvciIsIm1lZ2FtZW51c0FycmF5IiwiU3RpY2t5Yml0cyIsIm9iaiIsInZlcnNpb24iLCJ1c2VyQWdlbnQiLCJuYXZpZ2F0b3IiLCJjdXN0b21TdGlja3lDaGFuZ2VOdW1iZXIiLCJub1N0eWxlcyIsInN0aWNreUJpdFN0aWNreU9mZnNldCIsInBhcmVudENsYXNzIiwic2Nyb2xsRWwiLCJzdGlja3lDbGFzcyIsInN0dWNrQ2xhc3MiLCJzdGlja3lDaGFuZ2VDbGFzcyIsInVzZVN0aWNreUNsYXNzZXMiLCJ1c2VGaXhlZCIsInVzZUdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInZlcnRpY2FsUG9zaXRpb24iLCJwb3NpdGlvblZhbCIsImRlZmluZVBvc2l0aW9uIiwiaW5zdGFuY2VzIiwiX3RoaXMkcHJvcHMiLCJ2ZXJ0aWNhbFBvc2l0aW9uU3R5bGUiLCJwb3NpdGlvblN0eWxlIiwiZWxzIiwiZWwiLCJhZGRJbnN0YW5jZSIsIl9wcm90byIsInN0aWNreVByb3AiLCJoZWFkIiwiaXRlbSIsImlzV2luIiwic2UiLCJnZXRDbG9zZXN0UGFyZW50IiwiY29tcHV0ZVNjcm9sbE9mZnNldHMiLCJzdGF0ZSIsInN0YXRlQ29udGFpbmVyIiwibWFuYWdlU3RhdGUiLCJtYXRjaCIsImdldFRvcFBvc2l0aW9uIiwic2Nyb2xsVG9wIiwidG9wUG9zaXRpb24iLCJpdCIsImlzQ3VzdG9tIiwiaXNUb3AiLCJzY3JvbGxFbE9mZnNldCIsInN0aWNreVN0YXJ0Iiwic3RpY2t5Q2hhbmdlT2Zmc2V0IiwicGFyZW50Qm90dG9tIiwic3RpY2t5Q2hhbmdlIiwic3RpY2t5U3RvcCIsInRvZ2dsZUNsYXNzZXMiLCJjQXJyYXkiLCJzcGxpdCIsInJJdGVtIiwiam9pbiIsImNoYW5nZSIsInN0b3AiLCJzdGwiLCJucyIsInB2Iiwic3R1Y2siLCJ2cCIsInJBRlN0dWIiLCJyQUZEdW1teSIsInJBRiIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1velJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidEMiLCJzY3JvbGxZIiwibm90U3RpY2t5IiwiaXNTdGlja3kiLCJpc1N0dWNrIiwiaXNTdGlja3lDaGFuZ2UiLCJpc05vdFN0aWNreUNoYW5nZSIsInN0dWIiLCJ1cGRhdGUiLCJ1cGRhdGVkUHJvcHMiLCJ1cGRhdGVkUHJvcCIsInJlbW92ZUluc3RhbmNlIiwiY2xlYW51cCIsInN0aWNreWJpdHMiLCJuYXZpZ2F0aW9uU2lkZSIsImFjdGl2ZVNlbGVjdG9yIiwic2Nyb2xsVG9Ub3AiLCJzdWJzdHJpbmciLCJzY3JvbGxJbnRvVmlldyIsInVuZm9sZFRvQWN0aXZlIiwiYWN0aXZlIiwibWF0Y2hlcyIsImVjbFRhYmxlcyIsInRhYmxlcyIsImhlYWRlclRleHQiLCJ0ZXh0Q29sc3BhbiIsImNpIiwiY24iLCJ0YWJsZVJvd3MiLCJ0YWJsZSIsImhlYWRlcnMiLCJoZWFkRmlyc3QiLCJjZWxsUGVyUm93IiwiY29sc3BhbkluZGV4Iiwicm93IiwiY2VsbCIsInRhYnMiLCJ0YWJsaXN0U2VsZWN0b3IiLCJ0YWJwYW5lbFNlbGVjdG9yIiwidGFiZWxlbWVudHNTZWxlY3RvciIsInRhYkNvbnRhaW5lcnMiLCJzaG93VGFiIiwiZ2l2ZUZvY3VzIiwic2libGluZ1RhYnMiLCJzaWJsaW5nVGFicGFuZWxzIiwidGFiIiwicmVtb3ZlQXR0cmlidXRlIiwidGFicGFuZWwiLCJldmVudFRhYkNsaWNrIiwiZXZlbnRUYWJLZXlkb3duIiwiYmluZFRhYnNFdmVudHMiLCJ0YWJDb250YWluZXIiLCJ0YWJzRWxlbWVudHMiLCJ1bmJpbmRUYWJzRXZlbnRzIiwiZXhwYW5kVGltZWxpbmUiLCJ0aW1lbGluZSIsInRpbWVsaW5lcyJdLCJtYXBwaW5ncyI6Ijs7O0VBQUE7QUFDQSxFQUFPLElBQU1BLFdBQVcsU0FBWEEsUUFBVyxDQUFDQyxRQUFEO0VBQUEsTUFBV0MsT0FBWCx1RUFBcUJDLFFBQXJCO0VBQUEsU0FDdEIsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQWNILFFBQVFJLGdCQUFSLENBQXlCTCxRQUF6QixDQUFkLENBRHNCO0VBQUEsQ0FBakI7O0VDRFA7O0VBSUE7OztBQUdBLE1BQWFNLGFBQWEsU0FBYkEsVUFBYSxHQUdmO0VBQUEsaUZBQVAsRUFBTztFQUFBLDJCQUZUTixRQUVTO0VBQUEsTUFGQ0EsUUFFRCxpQ0FGWSxnQkFFWjtFQUFBLGlDQURUTyxjQUNTO0VBQUEsTUFET0EsY0FDUCx1Q0FEd0Isd0JBQ3hCOztFQUNUO0VBQ0EsTUFDRSxFQUFFLG1CQUFtQkwsUUFBckIsS0FDQSxFQUFFLHNCQUFzQk0sTUFBeEIsQ0FEQSxJQUVBLENBQUNOLFNBQVNPLGVBQVQsQ0FBeUJDLFNBSDVCLEVBS0UsT0FBTyxJQUFQOztFQUVGO0VBQ0E7RUFDQSxNQUFNQyxzQkFBc0JaLFNBQVNDLFFBQVQs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
