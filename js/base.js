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

  var onClick = function onClick(node, menu) {
    return function (e) {
      if (node && node.hasAttribute('aria-haspopup')) {
        var hasPopup = node.getAttribute('aria-haspopup');
        if (hasPopup === '' || hasPopup === 'true') {
          e.preventDefault();

          toggleExpandable(node, {
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
          return toggleExpandable(toggle, { context: menu });
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

  // Export components
  //export * from '@ecl/ec-component-timeline';

  exports.accordions = accordions;
  exports.initBreadcrumb = initBreadcrumb;
  exports.fileUploads = fileUploads;
  exports.megamenu = megamenu;
  exports.tabs = tabs;

  return exports;

}({}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1iYXNlL2hlbHBlcnMvZG9tLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZWMtY29tcG9uZW50LWFjY29yZGlvbi9lYy1jb21wb25lbnQtYWNjb3JkaW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5kZWJvdW5jZS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2dlbmVyaWMtY29tcG9uZW50LWJyZWFkY3J1bWIvZ2VuZXJpYy1jb21wb25lbnQtYnJlYWRjcnVtYi5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC1mb3JtLWZpbGUtdXBsb2FkL2VjLWNvbXBvbmVudC1mb3JtLWZpbGUtdXBsb2FkLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZS9nZW5lcmljLWNvbXBvbmVudC1leHBhbmRhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51L2dlbmVyaWMtY29tcG9uZW50LW5hdmlnYXRpb24tbWVudS5qcyIsIi4uL25vZGVfbW9kdWxlcy9AZWNsL2VjLWNvbXBvbmVudC10YWIvZWMtY29tcG9uZW50LXRhYi5qcyIsIi4uL3Nhc3MvZWMtY3VzdG9tLXByZXNldC9lYy1wcmVzZXQtZnVsbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBRdWVyeSBoZWxwZXJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSA9PlxuICBbXS5zbGljZS5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVyeUFsbDtcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIGFjY29yZGlvbiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBhY2NvcmRpb25zID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uJyxcbiAgaGVhZGVyU2VsZWN0b3I6IGhlYWRlclNlbGVjdG9yID0gJy5lY2wtYWNjb3JkaW9uX19oZWFkZXInLFxufSA9IHt9KSA9PiB7XG4gIC8vIFNVUFBPUlRTXG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIFNFVFVQXG4gIC8vIHNldCBhY2NvcmRpb24gZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgYWNjb3JkaW9uQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIGhpZGVQYW5lbCh0YXJnZXQpIHtcbiAgICAvLyBnZXQgcGFuZWxcbiAgICBjb25zdCBhY3RpdmVQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgdGFyZ2V0LmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpXG4gICAgKTtcblxuICAgIHRhcmdldC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlblxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvd1BhbmVsKHRhcmdldCkge1xuICAgIC8vIGdldCBwYW5lbFxuICAgIGNvbnN0IGFjdGl2ZVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICAgICB0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgICApO1xuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXMgb24gaGVhZGVyXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcblxuICAgIC8vIHRvZ2dsZSBhcmlhLWhpZGRlbiBhbmQgc2V0IGhlaWdodCBvbiBwYW5lbFxuICAgIGFjdGl2ZVBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZVBhbmVsKHRhcmdldCkge1xuICAgIC8vIGNsb3NlIHRhcmdldCBwYW5lbCBpZiBhbHJlYWR5IGFjdGl2ZVxuICAgIGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykgPT09ICd0cnVlJykge1xuICAgICAgaGlkZVBhbmVsKHRhcmdldCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvd1BhbmVsKHRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBnaXZlSGVhZGVyRm9jdXMoaGVhZGVyU2V0LCBpKSB7XG4gICAgLy8gc2V0IGFjdGl2ZSBmb2N1c1xuICAgIGhlYWRlclNldFtpXS5mb2N1cygpO1xuICB9XG5cbiAgLy8gRVZFTlRTXG4gIGZ1bmN0aW9uIGV2ZW50SGVhZGVyQ2xpY2soZSkge1xuICAgIHRvZ2dsZVBhbmVsKGUuY3VycmVudFRhcmdldCk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEhlYWRlcktleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBjdXJyZW50SGVhZGVyID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IGlzTW9kaWZpZXJLZXkgPSBlLm1ldGFLZXkgfHwgZS5hbHRLZXk7XG4gICAgLy8gZ2V0IGNvbnRleHQgb2YgYWNjb3JkaW9uIGNvbnRhaW5lciBhbmQgaXRzIGNoaWxkcmVuXG4gICAgY29uc3QgdGhpc0NvbnRhaW5lciA9IGN1cnJlbnRIZWFkZXIucGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHRoZXNlSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCB0aGlzQ29udGFpbmVyKTtcbiAgICBjb25zdCBjdXJyZW50SGVhZGVySW5kZXggPSBbXS5pbmRleE9mLmNhbGwodGhlc2VIZWFkZXJzLCBjdXJyZW50SGVhZGVyKTtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgLy8gY2F0Y2ggZW50ZXIvc3BhY2UsIGxlZnQvcmlnaHQgYW5kIHVwL2Rvd24gYXJyb3cga2V5IGV2ZW50c1xuICAgIC8vIGlmIG5ldyBwYW5lbCBzaG93IGl0LCBpZiBuZXh0L3ByZXYgbW92ZSBmb2N1c1xuICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICBjYXNlIDEzOlxuICAgICAgY2FzZSAzMjpcbiAgICAgICAgdG9nZ2xlUGFuZWwoY3VycmVudEhlYWRlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM3OlxuICAgICAgY2FzZSAzODoge1xuICAgICAgICBjb25zdCBwcmV2aW91c0hlYWRlckluZGV4ID1cbiAgICAgICAgICBjdXJyZW50SGVhZGVySW5kZXggPT09IDBcbiAgICAgICAgICAgID8gdGhlc2VIZWFkZXJzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogY3VycmVudEhlYWRlckluZGV4IC0gMTtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgcHJldmlvdXNIZWFkZXJJbmRleCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDoge1xuICAgICAgICBjb25zdCBuZXh0SGVhZGVySW5kZXggPVxuICAgICAgICAgIGN1cnJlbnRIZWFkZXJJbmRleCA8IHRoZXNlSGVhZGVycy5sZW5ndGggLSAxXG4gICAgICAgICAgICA/IGN1cnJlbnRIZWFkZXJJbmRleCArIDFcbiAgICAgICAgICAgIDogMDtcbiAgICAgICAgZ2l2ZUhlYWRlckZvY3VzKHRoZXNlSGVhZGVycywgbmV4dEhlYWRlckluZGV4KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIEJJTkQgRVZFTlRTXG4gIGZ1bmN0aW9uIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKSB7XG4gICAgY29uc3QgYWNjb3JkaW9uSGVhZGVycyA9IHF1ZXJ5QWxsKGhlYWRlclNlbGVjdG9yLCBhY2NvcmRpb25Db250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFVOQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gdW5iaW5kQWNjb3JkaW9uRXZlbnRzKGFjY29yZGlvbkNvbnRhaW5lcikge1xuICAgIGNvbnN0IGFjY29yZGlvbkhlYWRlcnMgPSBxdWVyeUFsbChoZWFkZXJTZWxlY3RvciwgYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAvLyB1bmJpbmQgYWxsIGFjY29yZGlvbiBoZWFkZXIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgYWNjb3JkaW9uSGVhZGVycy5mb3JFYWNoKGFjY29yZGlvbkhlYWRlciA9PiB7XG4gICAgICBhY2NvcmRpb25IZWFkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudEhlYWRlckNsaWNrKTtcbiAgICAgIGFjY29yZGlvbkhlYWRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRIZWFkZXJLZXlkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBhY2NvcmRpb25Db250YWluZXJzLmZvckVhY2goYWNjb3JkaW9uQ29udGFpbmVyID0+IHtcbiAgICAgIHVuYmluZEFjY29yZGlvbkV2ZW50cyhhY2NvcmRpb25Db250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChhY2NvcmRpb25Db250YWluZXJzLmxlbmd0aCkge1xuICAgICAgYWNjb3JkaW9uQ29udGFpbmVycy5mb3JFYWNoKGFjY29yZGlvbkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRBY2NvcmRpb25FdmVudHMoYWNjb3JkaW9uQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGFjY29yZGlvbnM7XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJpbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLmRlYm91bmNlJztcbmltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0QnJlYWRjcnVtYiA9ICh7XG4gIGJyZWFkY3J1bWJTZWxlY3RvcjogYnJlYWRjcnVtYlNlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYicsXG4gIGV4cGFuZEJ1dHRvblNlbGVjdG9yOiBleHBhbmRCdXR0b25TZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX2V4cGFuZC1idG4nLFxuICBzZWdtZW50U2VsZWN0b3I6IHNlZ21lbnRTZWxlY3RvciA9ICcuZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQnLFxuICBzZWdtZW50Rmlyc3RTZWxlY3Rvcjogc2VnbWVudEZpcnN0U2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1maXJzdCcsXG4gIHNlZ21lbnRWaXNpYmxlU2VsZWN0b3I6IHNlZ21lbnRWaXNpYmxlU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50Om5vdCguZWNsLWJyZWFkY3J1bWJfX3NlZ21lbnQtLWZpcnN0KTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyk6bm90KC5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tbGFzdCk6bm90KFthcmlhLWhpZGRlbj1cInRydWVcIl0pJyxcbiAgc2VnbWVudEhpZGRlblNlbGVjdG9yOiBzZWdtZW50SGlkZGVuU2VsZWN0b3IgPSAnLmVjbC1icmVhZGNydW1iX19zZWdtZW50W2FyaWEtaGlkZGVuPVwidHJ1ZVwiXTpub3QoLmVjbC1icmVhZGNydW1iX19zZWdtZW50LS1lbGxpcHNpcyknLFxuICBlbGxpcHNpc1NlbGVjdG9yOiBlbGxpcHNpc1NlbGVjdG9yID0gJy5lY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnLFxufSA9IHt9KSA9PiB7XG4gIGlmIChcbiAgICAhKCdxdWVyeVNlbGVjdG9yJyBpbiBkb2N1bWVudCkgfHxcbiAgICAhKCdhZGRFdmVudExpc3RlbmVyJyBpbiB3aW5kb3cpIHx8XG4gICAgIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3RcbiAgKVxuICAgIHJldHVybiBudWxsO1xuXG4gIC8vIEFDVElPTlNcbiAgZnVuY3Rpb24gaW5pdEVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBhZGQgZWxsaXBzaXMgdG8gRE9NXG4gICAgY29uc3QgYnJlYWRjcnVtYkZpcnN0ID0gcXVlcnlBbGwoc2VnbWVudEZpcnN0U2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIGJyZWFkY3J1bWJGaXJzdC5mb3JFYWNoKHNlZ21lbnQgPT4ge1xuICAgICAgY29uc3QgZWxsaXBzaXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAvLyB3ZSBjYW4ndCBhZGQgbXVsdGlwbHMgY2xhc3NlcyBhdCBvbmNlLCBiZWNhdXNlLi4uIElFXG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluaycpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWxpbmstLWludmVydGVkJyk7XG4gICAgICBlbGxpcHNpcy5jbGFzc0xpc3QuYWRkKCdlY2wtbGluay0tc3RhbmRhbG9uZScpO1xuICAgICAgZWxsaXBzaXMuY2xhc3NMaXN0LmFkZCgnZWNsLWJyZWFkY3J1bWJfX2xpbmsnKTtcbiAgICAgIGVsbGlwc2lzLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19leHBhbmQtYnRuJyk7XG4gICAgICBlbGxpcHNpcy5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnIycpO1xuICAgICAgZWxsaXBzaXMuaW5uZXJIVE1MID0gJ+KApic7XG5cbiAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC1icmVhZGNydW1iX19zZWdtZW50Jyk7XG4gICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdlY2wtYnJlYWRjcnVtYl9fc2VnbWVudC0tZWxsaXBzaXMnKTtcbiAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2VjbC11LWFyaWEnKTtcbiAgICAgIGxpc3RJdGVtLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICBsaXN0SXRlbS5hcHBlbmRDaGlsZChlbGxpcHNpcyk7XG4gICAgICBzZWdtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBzZWdtZW50Lm5leHRTaWJsaW5nKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZUVsbGlwc2lzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICAvLyBnZXQgaGlkZGVuIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50SGlkZGVuU2VsZWN0b3IsXG4gICAgICBicmVhZGNydW1iQ29udGFpbmVyXG4gICAgKTtcbiAgICBjb25zdCBoaWRkZW4gPSBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCA/ICdmYWxzZScgOiAndHJ1ZSc7XG5cbiAgICAvLyBkaXNwbGF5IGVsbGlwc2lzIHdoZW4gbmVlZGVkXG4gICAgY29uc3QgYnJlYWRjcnVtYkVsbGlwc2lzID0gcXVlcnlBbGwoZWxsaXBzaXNTZWxlY3RvciwgYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgYnJlYWRjcnVtYkVsbGlwc2lzLmZvckVhY2goZWxsaXBzaXMgPT4ge1xuICAgICAgZWxsaXBzaXMuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGhpZGRlbik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHdyYXBwZXIgd2lkdGhcbiAgICBjb25zdCB3cmFwcGVyV2lkdGggPSBNYXRoLmZsb29yKFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICk7XG5cbiAgICAvLyBnZXQgZGlzcGxheWVkIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGdldCBzZWdtZW50cyB3aWR0aFxuICAgIGxldCBzZWdtZW50V2lkdGggPSAwO1xuICAgIGJyZWFkY3J1bWJTZWdtZW50cy5mb3JFYWNoKGJyZWFkY3J1bWJTZWdtZW50ID0+IHtcbiAgICAgIHNlZ21lbnRXaWR0aCArPSBNYXRoLmNlaWwoXG4gICAgICAgIGJyZWFkY3J1bWJTZWdtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRXaWR0aCA+PSB3cmFwcGVyV2lkdGg7XG4gIH1cblxuICBmdW5jdGlvbiBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IHZpc2libGUgc2VnbWVudHNcbiAgICBjb25zdCBicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzID0gcXVlcnlBbGwoXG4gICAgICBzZWdtZW50VmlzaWJsZVNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBoaWRlIHNlZ21lbnRzIGlmIG5lZWRlZFxuICAgIC8vIHdlIGRvIG5vdCBoaWRlIHRoZSBsYXN0IHR3byBzZWdtZW50c1xuICAgIGlmIChicmVhZGNydW1iVmlzaWJsZVNlZ21lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHNbMF0uc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIGlzIGFub3RoZXIgc2VnbWVudCB0byBiZSBoaWRkZW5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICBoaWRlU2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gZ2V0IGhpZGRlbiBzZWdtZW50c1xuICAgIGNvbnN0IGJyZWFkY3J1bWJIaWRkZW5TZWdtZW50cyA9IHF1ZXJ5QWxsKFxuICAgICAgc2VnbWVudEhpZGRlblNlbGVjdG9yLFxuICAgICAgYnJlYWRjcnVtYkNvbnRhaW5lclxuICAgICk7XG5cbiAgICAvLyBzaG93IHNlZ21lbnRzIGlmIHRoZXJlIGlzIGVub3VnaCBzcGFjZVxuICAgIGlmIChicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgYnJlYWRjcnVtYkhpZGRlblNlZ21lbnRzW1xuICAgICAgICBicmVhZGNydW1iSGlkZGVuU2VnbWVudHMubGVuZ3RoIC0gMVxuICAgICAgXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgICAvLyBicmVhZGNydW1iIGlzIHRvbyBsYXJnZSwgd2UgaGlkZSB0aGUgbGFzdCBzZWdtZW50XG4gICAgICAgIGhpZGVTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBzZWdtZW50IHRvIGJlIGRpc3BsYXllZFxuICAgICAgICBzaG93U2VnbWVudChicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRFeHBhbmRDbGljayhlLCBicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGRpc3BsYXkgYWxsIHNlZ21lbnRzXG4gICAgY29uc3QgYnJlYWRjcnVtYlNlZ21lbnRzID0gcXVlcnlBbGwoc2VnbWVudFNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICBicmVhZGNydW1iU2VnbWVudHMuZm9yRWFjaChicmVhZGNydW1iU2VnbWVudCA9PiB7XG4gICAgICBicmVhZGNydW1iU2VnbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgfSk7XG5cbiAgICAvLyBoaWRlIGVsbGlwc2lzIG9uY2UgZXhwYW5kZWRcbiAgICBjb25zdCB0YXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgLy8gY2hlY2sgaWYgdGhlcmUgYXJlIHNlZ21lbnRzIHRvIGJlIGhpZGRlbiBvciBzaG93blxuICAgIGlmIChicmVhZGNydW1iSXNUb29MYXJnZShicmVhZGNydW1iQ29udGFpbmVyKSkge1xuICAgICAgaGlkZVNlZ21lbnQoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dTZWdtZW50KGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIH1cbiAgICB0b2dnbGVFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgfVxuXG4gIC8vIFNFVFVQXG4gIGNvbnN0IGJyZWFkY3J1bWJDb250YWluZXJzID0gcXVlcnlBbGwoYnJlYWRjcnVtYlNlbGVjdG9yKTtcblxuICAvLyBCSU5EIEVWRU5UU1xuICBmdW5jdGlvbiBiaW5kQnJlYWRjcnVtYkV2ZW50cyhicmVhZGNydW1iQ29udGFpbmVyKSB7XG4gICAgY29uc3QgZXhwYW5kcyA9IHF1ZXJ5QWxsKGV4cGFuZEJ1dHRvblNlbGVjdG9yLCBicmVhZGNydW1iQ29udGFpbmVyKTtcblxuICAgIC8vIGJpbmQgY2xpY2sgZXZlbnQgZm9yIGV4cGFuZFxuICAgIGV4cGFuZHMuZm9yRWFjaChleHBhbmQgPT4ge1xuICAgICAgZXhwYW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PlxuICAgICAgICBldmVudEV4cGFuZENsaWNrKGUsIGJyZWFkY3J1bWJDb250YWluZXIpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gYmluZCByZXNpemUgZXZlbnQgdG8gY2hlY2sgYnJlYWRjcnVtYiB3aWR0aFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgJ3Jlc2l6ZScsXG4gICAgICBkZWJvdW5jZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goZXZlbnRSZXNpemUpO1xuICAgICAgICB9LFxuICAgICAgICAxMDAsXG4gICAgICAgIHsgbWF4V2FpdDogMzAwIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpIHtcbiAgICBjb25zdCBleHBhbmRzID0gcXVlcnlBbGwoZXhwYW5kQnV0dG9uU2VsZWN0b3IsIGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgIC8vIHVuYmluZCBjbGljayBldmVudCBmb3IgZXhwYW5kXG4gICAgZXhwYW5kcy5mb3JFYWNoKGV4cGFuZCA9PiB7XG4gICAgICBleHBhbmQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+XG4gICAgICAgIGV2ZW50RXhwYW5kQ2xpY2soZSwgYnJlYWRjcnVtYkNvbnRhaW5lcilcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyB1bmJpbmQgcmVzaXplIGV2ZW50IHRvIGNoZWNrIGJyZWFkY3J1bWIgd2lkdGhcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICdyZXNpemUnLFxuICAgICAgZGVib3VuY2UoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGV2ZW50UmVzaXplKTtcbiAgICAgICAgfSxcbiAgICAgICAgMTAwLFxuICAgICAgICB7IG1heFdhaXQ6IDMwMCB9XG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIERFU1RST1lcbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAoYnJlYWRjcnVtYkNvbnRhaW5lcnMubGVuZ3RoKSB7XG4gICAgICBicmVhZGNydW1iQ29udGFpbmVycy5mb3JFYWNoKGJyZWFkY3J1bWJDb250YWluZXIgPT4ge1xuICAgICAgICB1bmJpbmRCcmVhZGNydW1iRXZlbnRzKGJyZWFkY3J1bWJDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChicmVhZGNydW1iQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGJyZWFkY3J1bWJDb250YWluZXJzLmZvckVhY2goYnJlYWRjcnVtYkNvbnRhaW5lciA9PiB7XG4gICAgICAgIGluaXRFbGxpcHNpcyhicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgICAgYmluZEJyZWFkY3J1bWJFdmVudHMoYnJlYWRjcnVtYkNvbnRhaW5lcik7XG5cbiAgICAgICAgLy8gdHJpZ2dlciByZXNpemUgZXZlbnQgb25jZVxuICAgICAgICBldmVudFJlc2l6ZShicmVhZGNydW1iQ29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGluaXRCcmVhZGNydW1iO1xuIiwiLyoqXG4gKiBGaWxlIHVwbG9hZHMgcmVsYXRlZCBiZWhhdmlvcnMuXG4gKi9cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCBmaWxlVXBsb2FkcyA9ICh7XG4gIHNlbGVjdG9yOiBzZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkJyxcbiAgaW5wdXRTZWxlY3RvcjogaW5wdXRTZWxlY3RvciA9ICcuZWNsLWZpbGUtdXBsb2FkX19pbnB1dCcsXG4gIHZhbHVlU2VsZWN0b3I6IHZhbHVlU2VsZWN0b3IgPSAnLmVjbC1maWxlLXVwbG9hZF9fdmFsdWUnLFxuICBicm93c2VTZWxlY3RvcjogYnJvd3NlU2VsZWN0b3IgPSAnLmVjbC1maWxlLXVwbG9hZF9fYnJvd3NlJyxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBTRVRVUFxuICAvLyBzZXQgZmlsZSB1cGxvYWQgZWxlbWVudCBOb2RlTGlzdHNcbiAgY29uc3QgZmlsZVVwbG9hZENvbnRhaW5lcnMgPSBxdWVyeUFsbChzZWxlY3Rvcik7XG5cbiAgLy8gQUNUSU9OU1xuICBmdW5jdGlvbiB1cGRhdGVGaWxlTmFtZShlbGVtZW50LCBmaWxlcykge1xuICAgIGlmIChmaWxlcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGxldCBmaWxlbmFtZSA9ICcnO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZmlsZSA9IGZpbGVzW2ldO1xuICAgICAgaWYgKCduYW1lJyBpbiBmaWxlKSB7XG4gICAgICAgIGlmIChpID4gMCkge1xuICAgICAgICAgIGZpbGVuYW1lICs9ICcsICc7XG4gICAgICAgIH1cbiAgICAgICAgZmlsZW5hbWUgKz0gZmlsZS5uYW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNob3cgdGhlIHNlbGVjdGVkIGZpbGVuYW1lIGluIHRoZSBmaWVsZC5cbiAgICBjb25zdCBtZXNzYWdlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgbWVzc2FnZUVsZW1lbnQuaW5uZXJIVE1MID0gZmlsZW5hbWU7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRWYWx1ZUNoYW5nZShlKSB7XG4gICAgaWYgKCdmaWxlcycgaW4gZS50YXJnZXQpIHtcbiAgICAgIGNvbnN0IGZpbGVVcGxvYWRFbGVtZW50cyA9IHF1ZXJ5QWxsKHZhbHVlU2VsZWN0b3IsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXG4gICAgICBmaWxlVXBsb2FkRWxlbWVudHMuZm9yRWFjaChmaWxlVXBsb2FkRWxlbWVudCA9PiB7XG4gICAgICAgIHVwZGF0ZUZpbGVOYW1lKGZpbGVVcGxvYWRFbGVtZW50LCBlLnRhcmdldC5maWxlcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBldmVudEJyb3dzZUtleWRvd24oZSkge1xuICAgIC8vIGNvbGxlY3QgaGVhZGVyIHRhcmdldHMsIGFuZCB0aGVpciBwcmV2L25leHRcbiAgICBjb25zdCBpc01vZGlmaWVyS2V5ID0gZS5tZXRhS2V5IHx8IGUuYWx0S2V5O1xuXG4gICAgY29uc3QgaW5wdXRFbGVtZW50cyA9IHF1ZXJ5QWxsKGlucHV0U2VsZWN0b3IsIGUudGFyZ2V0LnBhcmVudE5vZGUpO1xuXG4gICAgaW5wdXRFbGVtZW50cy5mb3JFYWNoKGlucHV0RWxlbWVudCA9PiB7XG4gICAgICAvLyBkb24ndCBjYXRjaCBrZXkgZXZlbnRzIHdoZW4g4oyYIG9yIEFsdCBtb2RpZmllciBpcyBwcmVzZW50XG4gICAgICBpZiAoaXNNb2RpZmllcktleSkgcmV0dXJuO1xuXG4gICAgICAvLyBjYXRjaCBlbnRlci9zcGFjZSwgbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gICAgICAvLyBpZiBuZXcgcGFuZWwgc2hvdyBpdCwgaWYgbmV4dC9wcmV2IG1vdmUgZm9jdXNcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgMTM6XG4gICAgICAgIGNhc2UgMzI6XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQklORCBFVkVOVFNcbiAgZnVuY3Rpb24gYmluZEZpbGVVcGxvYWRFdmVudHMoZmlsZVVwbG9hZENvbnRhaW5lcikge1xuICAgIC8vIGJpbmQgYWxsIGZpbGUgdXBsb2FkIGNoYW5nZSBldmVudHNcbiAgICBjb25zdCBmaWxlVXBsb2FkSW5wdXRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgZmlsZVVwbG9hZElucHV0cy5mb3JFYWNoKGZpbGVVcGxvYWRJbnB1dCA9PiB7XG4gICAgICBmaWxlVXBsb2FkSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZXZlbnRWYWx1ZUNoYW5nZSk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIGFsbCBmaWxlIHVwbG9hZCBrZXlkb3duIGV2ZW50c1xuICAgIGNvbnN0IGZpbGVVcGxvYWRCcm93c2VzID0gcXVlcnlBbGwoYnJvd3NlU2VsZWN0b3IsIGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIGZpbGVVcGxvYWRCcm93c2VzLmZvckVhY2goZmlsZVVwbG9hZEJyb3dzZSA9PiB7XG4gICAgICBmaWxlVXBsb2FkQnJvd3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEJyb3dzZUtleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gVU5CSU5EIEVWRU5UU1xuICBmdW5jdGlvbiB1bmJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpIHtcbiAgICBjb25zdCBmaWxlVXBsb2FkSW5wdXRzID0gcXVlcnlBbGwoaW5wdXRTZWxlY3RvciwgZmlsZVVwbG9hZENvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGFsbCBmaWxlIHVwbG9hZCBjaGFuZ2UgZXZlbnRzXG4gICAgZmlsZVVwbG9hZElucHV0cy5mb3JFYWNoKGZpbGVVcGxvYWRJbnB1dCA9PiB7XG4gICAgICBmaWxlVXBsb2FkSW5wdXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZXZlbnRWYWx1ZUNoYW5nZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBmaWxlVXBsb2FkQnJvd3NlcyA9IHF1ZXJ5QWxsKGJyb3dzZVNlbGVjdG9yLCBmaWxlVXBsb2FkQ29udGFpbmVyKTtcbiAgICAvLyBiaW5kIGFsbCBmaWxlIHVwbG9hZCBrZXlkb3duIGV2ZW50c1xuICAgIGZpbGVVcGxvYWRCcm93c2VzLmZvckVhY2goZmlsZVVwbG9hZEJyb3dzZSA9PiB7XG4gICAgICBmaWxlVXBsb2FkQnJvd3NlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudEJyb3dzZUtleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZpbGVVcGxvYWRDb250YWluZXJzLmZvckVhY2goZmlsZVVwbG9hZENvbnRhaW5lciA9PiB7XG4gICAgICB1bmJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gSU5JVFxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGlmIChmaWxlVXBsb2FkQ29udGFpbmVycy5sZW5ndGgpIHtcbiAgICAgIGZpbGVVcGxvYWRDb250YWluZXJzLmZvckVhY2goZmlsZVVwbG9hZENvbnRhaW5lciA9PiB7XG4gICAgICAgIGJpbmRGaWxlVXBsb2FkRXZlbnRzKGZpbGVVcGxvYWRDb250YWluZXIpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgpO1xuXG4gIC8vIFJFVkVBTCBBUElcbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIGRlc3Ryb3ksXG4gIH07XG59O1xuXG4vLyBtb2R1bGUgZXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgZmlsZVVwbG9hZHM7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5leHBvcnQgY29uc3QgdG9nZ2xlRXhwYW5kYWJsZSA9IChcbiAgdG9nZ2xlRWxlbWVudCxcbiAge1xuICAgIGNvbnRleHQgPSBkb2N1bWVudCxcbiAgICBmb3JjZUNsb3NlID0gZmFsc2UsXG4gICAgY2xvc2VTaWJsaW5ncyA9IGZhbHNlLFxuICAgIHNpYmxpbmdzU2VsZWN0b3IgPSAnW2FyaWEtY29udHJvbHNdW2FyaWEtZXhwYW5kZWRdJyxcbiAgfSA9IHt9XG4pID0+IHtcbiAgaWYgKCF0b2dnbGVFbGVtZW50KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gR2V0IHRhcmdldCBlbGVtZW50XG4gIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgIHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJylcbiAgKTtcblxuICAvLyBFeGl0IGlmIG5vIHRhcmdldCBmb3VuZFxuICBpZiAoIXRhcmdldCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEdldCBjdXJyZW50IHN0YXR1c1xuICBjb25zdCBpc0V4cGFuZGVkID1cbiAgICBmb3JjZUNsb3NlID09PSB0cnVlIHx8XG4gICAgdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSA9PT0gJ3RydWUnO1xuXG4gIC8vIFRvZ2dsZSB0aGUgZXhwYW5kYWJsZS9jb2xsYXBzaWJsZVxuICB0b2dnbGVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICFpc0V4cGFuZGVkKTtcbiAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBpc0V4cGFuZGVkKTtcblxuICAvLyBUb2dnbGUgbGFiZWwgaWYgcG9zc2libGVcbiAgaWYgKCFpc0V4cGFuZGVkICYmIHRvZ2dsZUVsZW1lbnQuaGFzQXR0cmlidXRlKCdkYXRhLWxhYmVsLWV4cGFuZGVkJykpIHtcbiAgICB0b2dnbGVFbGVtZW50LmlubmVySFRNTCA9IHRvZ2dsZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsLWV4cGFuZGVkJyk7XG4gIH0gZWxzZSBpZiAoaXNFeHBhbmRlZCAmJiB0b2dnbGVFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGF0YS1sYWJlbC1jb2xsYXBzZWQnKSkge1xuICAgIHRvZ2dsZUVsZW1lbnQuaW5uZXJIVE1MID0gdG9nZ2xlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXG4gICAgICAnZGF0YS1sYWJlbC1jb2xsYXBzZWQnXG4gICAgKTtcbiAgfVxuXG4gIC8vIENsb3NlIHNpYmxpbmdzIGlmIHJlcXVlc3RlZFxuICBpZiAoY2xvc2VTaWJsaW5ncyA9PT0gdHJ1ZSkge1xuICAgIGNvbnN0IHNpYmxpbmdzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcbiAgICAgIC5jYWxsKGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzaWJsaW5nc1NlbGVjdG9yKSlcbiAgICAgIC5maWx0ZXIoc2libGluZyA9PiBzaWJsaW5nICE9PSB0b2dnbGVFbGVtZW50KTtcblxuICAgIHNpYmxpbmdzQXJyYXkuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUoc2libGluZywge1xuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmb3JjZUNsb3NlOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbi8vIEhlbHBlciBtZXRob2QgdG8gYXV0b21hdGljYWxseSBhdHRhY2ggdGhlIGV2ZW50IGxpc3RlbmVyIHRvIGFsbCB0aGUgZXhwYW5kYWJsZXMgb24gcGFnZSBsb2FkXG5leHBvcnQgY29uc3QgaW5pdEV4cGFuZGFibGVzID0gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpID0+IHtcbiAgLy8gRXhpdCBpZiBubyBzZWxlY3RvciB3YXMgcHJvdmlkZWRcbiAgaWYgKCFzZWxlY3RvcikgcmV0dXJuO1xuXG4gIGNvbnN0IG5vZGVzQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChcbiAgICBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICk7XG5cbiAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICB0b2dnbGVFeHBhbmRhYmxlKG5vZGUsIHsgY29udGV4dCB9KTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICApO1xufTtcbiIsImltcG9ydCB7IHF1ZXJ5QWxsIH0gZnJvbSAnQGVjbC9nZW5lcmljLWJhc2UvaGVscGVycy9kb20nO1xuaW1wb3J0IHsgdG9nZ2xlRXhwYW5kYWJsZSB9IGZyb20gJ0BlY2wvZ2VuZXJpYy1jb21wb25lbnQtZXhwYW5kYWJsZSc7XG5cbmNvbnN0IG9uQ2xpY2sgPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGlmIChub2RlICYmIG5vZGUuaGFzQXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJykpIHtcbiAgICBjb25zdCBoYXNQb3B1cCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJyk7XG4gICAgaWYgKGhhc1BvcHVwID09PSAnJyB8fCBoYXNQb3B1cCA9PT0gJ3RydWUnKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHRvZ2dsZUV4cGFuZGFibGUobm9kZSwge1xuICAgICAgICBjb250ZXh0OiBtZW51LFxuICAgICAgICBjbG9zZVNpYmxpbmdzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBvbktleWRvd24gPSAobm9kZSwgbWVudSkgPT4gZSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRUYWIgPSBub2RlLnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IHByZXZpb3VzVGFiSXRlbSA9XG4gICAgY3VycmVudFRhYi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nIHx8XG4gICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0IG5leHRUYWJJdGVtID1cbiAgICBjdXJyZW50VGFiLm5leHRFbGVtZW50U2libGluZyB8fCBjdXJyZW50VGFiLnBhcmVudEVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgLy8gZG9uJ3QgY2F0Y2gga2V5IGV2ZW50cyB3aGVuIOKMmCBvciBBbHQgbW9kaWZpZXIgaXMgcHJlc2VudFxuICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgLy8gY2F0Y2ggbGVmdC9yaWdodCBhbmQgdXAvZG93biBhcnJvdyBrZXkgZXZlbnRzXG4gIC8vIGlmIG5ldyBuZXh0L3ByZXYgdGFiIGF2YWlsYWJsZSwgc2hvdyBpdCBieSBwYXNzaW5nIHRhYiBhbmNob3IgdG8gc2hvd1RhYiBtZXRob2RcbiAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAvLyBFTlRFUiBvciBTUEFDRVxuICAgIGNhc2UgMTM6XG4gICAgY2FzZSAzMjpcbiAgICAgIG9uQ2xpY2soZS5jdXJyZW50VGFyZ2V0LCBtZW51KShlKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBMRUZUIGFuZCBVUFxuICAgIGNhc2UgMzc6XG4gICAgY2FzZSAzODpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHByZXZpb3VzVGFiSXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuZm9jdXMoKTtcbiAgICAgIGJyZWFrO1xuICAgIC8vIEFSUk9XUyBSSUdIVCBhbmQgRE9XTlxuICAgIGNhc2UgMzk6XG4gICAgY2FzZSA0MDpcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG5leHRUYWJJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5mb2N1cygpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWVnYW1lbnUgPSAoe1xuICBzZWxlY3Rvcjogc2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnUnLFxuICB0b2dnbGVTZWxlY3RvcjogdG9nZ2xlU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX3RvZ2dsZScsXG4gIGxpc3RTZWxlY3RvcjogbGlzdFNlbGVjdG9yID0gJy5lY2wtbmF2aWdhdGlvbi1tZW51X19yb290JyxcbiAgbGlua1NlbGVjdG9yOiBsaW5rU2VsZWN0b3IgPSAnLmVjbC1uYXZpZ2F0aW9uLW1lbnVfX2xpbmsnLFxufSA9IHt9KSA9PiB7XG4gIGNvbnN0IG1lZ2FtZW51c0FycmF5ID0gcXVlcnlBbGwoc2VsZWN0b3IpO1xuXG4gIG1lZ2FtZW51c0FycmF5LmZvckVhY2gobWVudSA9PiB7XG4gICAgLy8gTWFrZSB0aGUgdG9nZ2xlIGV4cGFuZGFibGVcbiAgICBjb25zdCB0b2dnbGUgPSBtZW51LnF1ZXJ5U2VsZWN0b3IodG9nZ2xlU2VsZWN0b3IpO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+XG4gICAgICAgIHRvZ2dsZUV4cGFuZGFibGUodG9nZ2xlLCB7IGNvbnRleHQ6IG1lbnUgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBsaXN0IG9mIGxpbmtzXG4gICAgY29uc3QgbGlzdCA9IG1lbnUucXVlcnlTZWxlY3RvcihsaXN0U2VsZWN0b3IpO1xuXG4gICAgLy8gR2V0IGV4cGFuZGFibGVzIHdpdGhpbiB0aGUgbGlzdFxuICAgIGNvbnN0IG5vZGVzQXJyYXkgPSBxdWVyeUFsbChsaW5rU2VsZWN0b3IsIGxpc3QpO1xuXG4gICAgbm9kZXNBcnJheS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2sobm9kZSwgbGlzdCkpO1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlkb3duKG5vZGUsIGxpc3QpKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBtZWdhbWVudTtcbiIsIi8vIEhlYXZpbHkgaW5zcGlyZWQgYnkgdGhlIHRhYiBjb21wb25lbnQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnJlbmQvZnJlbmQuY29cblxuaW1wb3J0IHsgcXVlcnlBbGwgfSBmcm9tICdAZWNsL2VjLWJhc2UvaGVscGVycy9kb20nO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIE9iamVjdCBjb250YWluaW5nIGNvbmZpZ3VyYXRpb24gb3ZlcnJpZGVzXG4gKi9cbmV4cG9ydCBjb25zdCB0YWJzID0gKHtcbiAgc2VsZWN0b3I6IHNlbGVjdG9yID0gJy5lY2wtdGFicycsXG4gIHRhYmxpc3RTZWxlY3RvcjogdGFibGlzdFNlbGVjdG9yID0gJy5lY2wtdGFic19fdGFibGlzdCcsXG4gIHRhYnBhbmVsU2VsZWN0b3I6IHRhYnBhbmVsU2VsZWN0b3IgPSAnLmVjbC10YWJzX190YWJwYW5lbCcsXG4gIHRhYmVsZW1lbnRzU2VsZWN0b3I6IHRhYmVsZW1lbnRzU2VsZWN0b3IgPSBgJHt0YWJsaXN0U2VsZWN0b3J9IGxpYCxcbn0gPSB7fSkgPT4ge1xuICAvLyBTVVBQT1JUU1xuICBpZiAoXG4gICAgISgncXVlcnlTZWxlY3RvcicgaW4gZG9jdW1lbnQpIHx8XG4gICAgISgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gd2luZG93KSB8fFxuICAgICFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0XG4gIClcbiAgICByZXR1cm4gbnVsbDtcblxuICAvLyBTRVRVUFxuICAvLyBzZXQgdGFiIGVsZW1lbnQgTm9kZUxpc3RcbiAgY29uc3QgdGFiQ29udGFpbmVycyA9IHF1ZXJ5QWxsKHNlbGVjdG9yKTtcblxuICAvLyBBQ1RJT05TXG4gIGZ1bmN0aW9uIHNob3dUYWIodGFyZ2V0LCBnaXZlRm9jdXMgPSB0cnVlKSB7XG4gICAgY29uc3Qgc2libGluZ1RhYnMgPSBxdWVyeUFsbChcbiAgICAgIGAke3RhYmxpc3RTZWxlY3Rvcn0gbGlgLFxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICk7XG4gICAgY29uc3Qgc2libGluZ1RhYnBhbmVscyA9IHF1ZXJ5QWxsKFxuICAgICAgdGFicGFuZWxTZWxlY3RvcixcbiAgICAgIHRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnRcbiAgICApO1xuXG4gICAgLy8gc2V0IGluYWN0aXZlc1xuICAgIHNpYmxpbmdUYWJzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICAgICAgdGFiLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpO1xuICAgIH0pO1xuXG4gICAgc2libGluZ1RhYnBhbmVscy5mb3JFYWNoKHRhYnBhbmVsID0+IHtcbiAgICAgIHRhYnBhbmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IGFjdGl2ZXMgYW5kIGZvY3VzXG4gICAgdGFyZ2V0LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgJ3RydWUnKTtcbiAgICBpZiAoZ2l2ZUZvY3VzKSB0YXJnZXQuZm9jdXMoKTtcbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSlcbiAgICAgIC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gIH1cblxuICAvLyBFVkVOVFNcbiAgZnVuY3Rpb24gZXZlbnRUYWJDbGljayhlKSB7XG4gICAgc2hvd1RhYihlLmN1cnJlbnRUYXJnZXQpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gbG9vayBpbnRvIHJlbW92ZSBpZC9zZXR0aW1lb3V0L3JlaW5zdGF0ZSBpZCBhcyBhbiBhbHRlcm5hdGl2ZSB0byBwcmV2ZW50RGVmYXVsdFxuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRUYWJLZXlkb3duKGUpIHtcbiAgICAvLyBjb2xsZWN0IHRhYiB0YXJnZXRzLCBhbmQgdGhlaXIgcGFyZW50cycgcHJldi9uZXh0IChvciBmaXJzdC9sYXN0KVxuICAgIGNvbnN0IGN1cnJlbnRUYWIgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgcHJldmlvdXNUYWJJdGVtID1cbiAgICAgIGN1cnJlbnRUYWIucHJldmlvdXNFbGVtZW50U2libGluZyB8fFxuICAgICAgY3VycmVudFRhYi5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgbmV4dFRhYkl0ZW0gPVxuICAgICAgY3VycmVudFRhYi5uZXh0RWxlbWVudFNpYmxpbmcgfHxcbiAgICAgIGN1cnJlbnRUYWIucGFyZW50RWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIC8vIGRvbid0IGNhdGNoIGtleSBldmVudHMgd2hlbiDijJggb3IgQWx0IG1vZGlmaWVyIGlzIHByZXNlbnRcbiAgICBpZiAoZS5tZXRhS2V5IHx8IGUuYWx0S2V5KSByZXR1cm47XG5cbiAgICAvLyBjYXRjaCBsZWZ0L3JpZ2h0IGFuZCB1cC9kb3duIGFycm93IGtleSBldmVudHNcbiAgICAvLyBpZiBuZXcgbmV4dC9wcmV2IHRhYiBhdmFpbGFibGUsIHNob3cgaXQgYnkgcGFzc2luZyB0YWIgYW5jaG9yIHRvIHNob3dUYWIgbWV0aG9kXG4gICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgIGNhc2UgMzc6XG4gICAgICBjYXNlIDM4OlxuICAgICAgICBzaG93VGFiKHByZXZpb3VzVGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM5OlxuICAgICAgY2FzZSA0MDpcbiAgICAgICAgc2hvd1RhYihuZXh0VGFiSXRlbSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBCSU5ESU5HU1xuICBmdW5jdGlvbiBiaW5kVGFic0V2ZW50cyh0YWJDb250YWluZXIpIHtcbiAgICBjb25zdCB0YWJzRWxlbWVudHMgPSBxdWVyeUFsbCh0YWJlbGVtZW50c1NlbGVjdG9yLCB0YWJDb250YWluZXIpO1xuICAgIC8vIGJpbmQgYWxsIHRhYiBjbGljayBhbmQga2V5ZG93biBldmVudHNcbiAgICB0YWJzRWxlbWVudHMuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRUYWJDbGljayk7XG4gICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50VGFiS2V5ZG93bik7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiB1bmJpbmRUYWJzRXZlbnRzKHRhYkNvbnRhaW5lcikge1xuICAgIGNvbnN0IHRhYnNFbGVtZW50cyA9IHF1ZXJ5QWxsKHRhYmVsZW1lbnRzU2VsZWN0b3IsIHRhYkNvbnRhaW5lcik7XG4gICAgLy8gdW5iaW5kIGFsbCB0YWIgY2xpY2sgYW5kIGtleWRvd24gZXZlbnRzXG4gICAgdGFic0VsZW1lbnRzLmZvckVhY2godGFiID0+IHtcbiAgICAgIHRhYi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50VGFiQ2xpY2spO1xuICAgICAgdGFiLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBldmVudFRhYktleWRvd24pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gREVTVFJPWVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHRhYkNvbnRhaW5lcnMuZm9yRWFjaCh1bmJpbmRUYWJzRXZlbnRzKTtcbiAgfVxuXG4gIC8vIElOSVRcbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB0YWJDb250YWluZXJzLmZvckVhY2goYmluZFRhYnNFdmVudHMpO1xuICB9XG5cbiAgLy8gQXV0b21hdGljYWxseSBpbml0XG4gIGluaXQoKTtcblxuICAvLyBSRVZFQUwgQVBJXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBkZXN0cm95LFxuICB9O1xufTtcblxuLy8gbW9kdWxlIGV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IHRhYnM7XG4iLCIvLyBFeHBvcnQgY29tcG9uZW50c1xuXG5leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1hY2NvcmRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtYnJlYWRjcnVtYic7XG4vL2V4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWNhcm91c2VsJztcbi8vZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtY29udGV4dC1uYXYnO1xuLy9leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1kcm9wZG93bic7XG4vL2V4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWRpYWxvZyc7XG4vL2V4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWV4cGFuZGFibGUnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtZm9ybS1maWxlLXVwbG9hZCc7XG4vL2V4cG9ydCAqIGZyb20gJ0BlY2wvZWMtY29tcG9uZW50LWxhbmctc2VsZWN0LXBhZ2UnO1xuLy9leHBvcnQgKiBmcm9tICdAZWNsL2VjLWNvbXBvbmVudC1tZXNzYWdlJztcbi8vZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtaW5wYWdlLW5hdmlnYXRpb24nO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtbmF2aWdhdGlvbi1tZW51Jztcbi8vZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtc2lkZS1uYXZpZ2F0aW9uJztcbi8vZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGFibGUnO1xuZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGFiJztcbi8vZXhwb3J0ICogZnJvbSAnQGVjbC9lYy1jb21wb25lbnQtdGltZWxpbmUnO1xuIl0sIm5hbWVzIjpbInF1ZXJ5QWxsIiwic2VsZWN0b3IiLCJjb250ZXh0IiwiZG9jdW1lbnQiLCJzbGljZSIsImNhbGwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWNjb3JkaW9ucyIsImhlYWRlclNlbGVjdG9yIiwid2luZG93IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWNjb3JkaW9uQ29udGFpbmVycyIsImhpZGVQYW5lbCIsInRhcmdldCIsImFjdGl2ZVBhbmVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJzaG93UGFuZWwiLCJ0b2dnbGVQYW5lbCIsImdpdmVIZWFkZXJGb2N1cyIsImhlYWRlclNldCIsImkiLCJmb2N1cyIsImV2ZW50SGVhZGVyQ2xpY2siLCJlIiwiY3VycmVudFRhcmdldCIsImV2ZW50SGVhZGVyS2V5ZG93biIsImN1cnJlbnRIZWFkZXIiLCJpc01vZGlmaWVyS2V5IiwibWV0YUtleSIsImFsdEtleSIsInRoaXNDb250YWluZXIiLCJwYXJlbnROb2RlIiwidGhlc2VIZWFkZXJzIiwiY3VycmVudEhlYWRlckluZGV4IiwiaW5kZXhPZiIsImtleUNvZGUiLCJwcmV2ZW50RGVmYXVsdCIsInByZXZpb3VzSGVhZGVySW5kZXgiLCJsZW5ndGgiLCJuZXh0SGVhZGVySW5kZXgiLCJiaW5kQWNjb3JkaW9uRXZlbnRzIiwiYWNjb3JkaW9uQ29udGFpbmVyIiwiYWNjb3JkaW9uSGVhZGVycyIsImZvckVhY2giLCJhY2NvcmRpb25IZWFkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwidW5iaW5kQWNjb3JkaW9uRXZlbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImRlc3Ryb3kiLCJpbml0IiwiRlVOQ19FUlJPUl9URVhUIiwiTkFOIiwic3ltYm9sVGFnIiwicmVUcmltIiwicmVJc0JhZEhleCIsInJlSXNCaW5hcnkiLCJyZUlzT2N0YWwiLCJmcmVlUGFyc2VJbnQiLCJwYXJzZUludCIsImZyZWVHbG9iYWwiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiZ2xvYmFsIiwiT2JqZWN0IiwiZnJlZVNlbGYiLCJzZWxmIiwicm9vdCIsIkZ1bmN0aW9uIiwib2JqZWN0UHJvdG8iLCJwcm90b3R5cGUiLCJvYmplY3RUb1N0cmluZyIsInRvU3RyaW5nIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsIm5hdGl2ZU1pbiIsIm1pbiIsIm5vdyIsIkRhdGUiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Iiwib3B0aW9ucyIsImxhc3RBcmdzIiwibGFzdFRoaXMiLCJtYXhXYWl0IiwicmVzdWx0IiwidGltZXJJZCIsImxhc3RDYWxsVGltZSIsImxhc3RJbnZva2VUaW1lIiwibGVhZGluZyIsIm1heGluZyIsInRyYWlsaW5nIiwiVHlwZUVycm9yIiwidG9OdW1iZXIiLCJpc09iamVjdCIsImludm9rZUZ1bmMiLCJ0aW1lIiwiYXJncyIsInRoaXNBcmciLCJ1bmRlZmluZWQiLCJhcHBseSIsImxlYWRpbmdFZGdlIiwic2V0VGltZW91dCIsInRpbWVyRXhwaXJlZCIsInJlbWFpbmluZ1dhaXQiLCJ0aW1lU2luY2VMYXN0Q2FsbCIsInRpbWVTaW5jZUxhc3RJbnZva2UiLCJzaG91bGRJbnZva2UiLCJ0cmFpbGluZ0VkZ2UiLCJjYW5jZWwiLCJjbGVhclRpbWVvdXQiLCJmbHVzaCIsImRlYm91bmNlZCIsImlzSW52b2tpbmciLCJhcmd1bWVudHMiLCJ2YWx1ZSIsInR5cGUiLCJpc09iamVjdExpa2UiLCJpc1N5bWJvbCIsIm90aGVyIiwidmFsdWVPZiIsInJlcGxhY2UiLCJpc0JpbmFyeSIsInRlc3QiLCJpbml0QnJlYWRjcnVtYiIsImJyZWFkY3J1bWJTZWxlY3RvciIsImV4cGFuZEJ1dHRvblNlbGVjdG9yIiwic2VnbWVudFNlbGVjdG9yIiwic2VnbWVudEZpcnN0U2VsZWN0b3IiLCJzZWdtZW50VmlzaWJsZVNlbGVjdG9yIiwic2VnbWVudEhpZGRlblNlbGVjdG9yIiwiZWxsaXBzaXNTZWxlY3RvciIsImluaXRFbGxpcHNpcyIsImJyZWFkY3J1bWJDb250YWluZXIiLCJicmVhZGNydW1iRmlyc3QiLCJlbGxpcHNpcyIsImNyZWF0ZUVsZW1lbnQiLCJhZGQiLCJpbm5lckhUTUwiLCJsaXN0SXRlbSIsImFwcGVuZENoaWxkIiwic2VnbWVudCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwidG9nZ2xlRWxsaXBzaXMiLCJicmVhZGNydW1iSGlkZGVuU2VnbWVudHMiLCJoaWRkZW4iLCJicmVhZGNydW1iRWxsaXBzaXMiLCJicmVhZGNydW1iSXNUb29MYXJnZSIsIndyYXBwZXJXaWR0aCIsImZsb29yIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJicmVhZGNydW1iU2VnbWVudHMiLCJzZWdtZW50V2lkdGgiLCJjZWlsIiwiYnJlYWRjcnVtYlNlZ21lbnQiLCJoaWRlU2VnbWVudCIsImJyZWFkY3J1bWJWaXNpYmxlU2VnbWVudHMiLCJzaG93U2VnbWVudCIsImV2ZW50RXhwYW5kQ2xpY2siLCJwYXJlbnRFbGVtZW50IiwiZXZlbnRSZXNpemUiLCJicmVhZGNydW1iQ29udGFpbmVycyIsImJpbmRCcmVhZGNydW1iRXZlbnRzIiwiZXhwYW5kcyIsImV4cGFuZCIsInVuYmluZEJyZWFkY3J1bWJFdmVudHMiLCJmaWxlVXBsb2FkcyIsImlucHV0U2VsZWN0b3IiLCJ2YWx1ZVNlbGVjdG9yIiwiYnJvd3NlU2VsZWN0b3IiLCJmaWxlVXBsb2FkQ29udGFpbmVycyIsInVwZGF0ZUZpbGVOYW1lIiwiZWxlbWVudCIsImZpbGVzIiwiZmlsZW5hbWUiLCJmaWxlIiwibmFtZSIsIm1lc3NhZ2VFbGVtZW50IiwiZXZlbnRWYWx1ZUNoYW5nZSIsImZpbGVVcGxvYWRFbGVtZW50cyIsImZpbGVVcGxvYWRFbGVtZW50IiwiZXZlbnRCcm93c2VLZXlkb3duIiwiaW5wdXRFbGVtZW50cyIsImlucHV0RWxlbWVudCIsImNsaWNrIiwiYmluZEZpbGVVcGxvYWRFdmVudHMiLCJmaWxlVXBsb2FkQ29udGFpbmVyIiwiZmlsZVVwbG9hZElucHV0cyIsImZpbGVVcGxvYWRJbnB1dCIsImZpbGVVcGxvYWRCcm93c2VzIiwiZmlsZVVwbG9hZEJyb3dzZSIsInVuYmluZEZpbGVVcGxvYWRFdmVudHMiLCJ0b2dnbGVFeHBhbmRhYmxlIiwidG9nZ2xlRWxlbWVudCIsImZvcmNlQ2xvc2UiLCJjbG9zZVNpYmxpbmdzIiwic2libGluZ3NTZWxlY3RvciIsImlzRXhwYW5kZWQiLCJoYXNBdHRyaWJ1dGUiLCJzaWJsaW5nc0FycmF5IiwiQXJyYXkiLCJmaWx0ZXIiLCJzaWJsaW5nIiwib25DbGljayIsIm5vZGUiLCJtZW51IiwiaGFzUG9wdXAiLCJvbktleWRvd24iLCJjdXJyZW50VGFiIiwicHJldmlvdXNUYWJJdGVtIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJuZXh0VGFiSXRlbSIsIm5leHRFbGVtZW50U2libGluZyIsImZpcnN0RWxlbWVudENoaWxkIiwicXVlcnlTZWxlY3RvciIsIm1lZ2FtZW51IiwidG9nZ2xlU2VsZWN0b3IiLCJsaXN0U2VsZWN0b3IiLCJsaW5rU2VsZWN0b3IiLCJtZWdhbWVudXNBcnJheSIsInRvZ2dsZSIsImxpc3QiLCJub2Rlc0FycmF5IiwidGFicyIsInRhYmxpc3RTZWxlY3RvciIsInRhYnBhbmVsU2VsZWN0b3IiLCJ0YWJlbGVtZW50c1NlbGVjdG9yIiwidGFiQ29udGFpbmVycyIsInNob3dUYWIiLCJnaXZlRm9jdXMiLCJzaWJsaW5nVGFicyIsInNpYmxpbmdUYWJwYW5lbHMiLCJ0YWIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJ0YWJwYW5lbCIsImV2ZW50VGFiQ2xpY2siLCJldmVudFRhYktleWRvd24iLCJiaW5kVGFic0V2ZW50cyIsInRhYkNvbnRhaW5lciIsInRhYnNFbGVtZW50cyIsInVuYmluZFRhYnNFdmVudHMiXSwibWFwcGluZ3MiOiI7OztFQUFBO0FBQ0EsRUFBTyxJQUFNQSxXQUFXLFNBQVhBLFFBQVcsQ0FBQ0MsUUFBRDtFQUFBLE1BQVdDLE9BQVgsdUVBQXFCQyxRQUFyQjtFQUFBLFNBQ3RCLEdBQUdDLEtBQUgsQ0FBU0MsSUFBVCxDQUFjSCxRQUFRSSxnQkFBUixDQUF5QkwsUUFBekIsQ0FBZCxDQURzQjtFQUFBLENBQWpCOztFQ0RQOztFQUlBOzs7QUFHQSxNQUFhTSxhQUFhLFNBQWJBLFVBQWEsR0FH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
