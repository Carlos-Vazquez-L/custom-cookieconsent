/*!
* CookieConsent 3.0.1
* https://github.com/orestbida/cookieconsent
* Author Orest Bida
* Released under the MIT License
*/

const COOKIE_NAME = 'cc_cookie';

const OPT_IN_MODE = 'opt-in';
const OPT_OUT_MODE = 'opt-out';

const TOGGLE_CONSENT_MODAL_CLASS = 'show--consent';
const TOGGLE_PREFERENCES_MODAL_CLASS = 'show--preferences';
const TOGGLE_DISABLE_INTERACTION_CLASS = 'disable--interaction';

const SCRIPT_TAG_SELECTOR = 'data-category';

const DIV_TAG = 'div';
const BUTTON_TAG = 'button';

const ARIA_HIDDEN = 'aria-hidden';
const BTN_GROUP_CLASS = 'btn-group';
const CLICK_EVENT = 'click';
const DATA_ROLE = 'data-role';

const CONSENT_MODAL_NAME = 'consentModal';
const PREFERENCES_MODAL_NAME = 'preferencesModal';

/**
 * @typedef {import('../../types')} CookieConsent
 *
 * @typedef {CookieConsent} Api
 * @typedef {CookieConsent.CookieConsentConfig} UserConfig
 * @typedef {CookieConsent.Category} Category
 * @typedef {CookieConsent.Service} Service
 * @typedef {Object.<string, Service>} Services
 * @typedef {CookieConsent.AutoClear} AutoClear
 * @typedef {CookieConsent.GuiOptions} GuiOptions
 * @typedef {GuiOptions['consentModal']} GuiModalOption
 * @typedef {CookieConsent.CookieConsentConfig['language']} Language
 * @typedef {CookieConsent.Translation} Translation
 * @typedef {CookieConsent.ConsentModalOptions} ConsentModalOptions
 * @typedef {CookieConsent.PreferencesModalOptions} PreferencesModalOptions
 * @typedef {CookieConsent.CookieTable} CookieTable
 * @typedef {CookieConsent.Section} Section
 * @typedef {CookieConsent.CookieValue} CookieValue
 * @typedef {CookieConsent.UserPreferences} UserPreferences
 */

/**
 * Internal state for each script tag
 * @typedef {Object} ScriptInfo
 * @property {HTMLScriptElement} _script
 * @property {string} _categoryName
 * @property {string} [_serviceName]
 * @property {boolean} _executed
 * @property {boolean} _runOnDisable
 */

/**
 * Pointers to main dom elements
 * @typedef {Object} DomElements
 * @property {Document} _document
 * @property {HTMLElement} _htmlDom
 *
 * @property {HTMLElement} _ccMain
 * @property {HTMLElement} _cmContainer
 * @property {HTMLElement} _pmContainer
 *
 * @property {HTMLElement} _cm
 * @property {HTMLElement} _cmBody
 * @property {HTMLElement} _cmTexts
 * @property {HTMLElement} _cmTitle
 * @property {HTMLElement} _cmDescription
 * @property {HTMLElement} _cmBtns
 * @property {HTMLElement} _cmBtnGroup
 * @property {HTMLElement} _cmBtnGroup2
 * @property {HTMLElement} _cmAcceptAllBtn
 * @property {HTMLElement} _cmAcceptNecessaryBtn
 * @property {HTMLElement} _cmShowPreferencesBtn
 * @property {HTMLElement} _cmFooterLinksGroup
 * @property {HTMLElement} _cmCloseIconBtn
 *
 * @property {HTMLElement} _pm
 * @property {HTMLElement} _pmHeader
 * @property {HTMLElement} _pmTitle
 * @property {HTMLElement} _pmCloseBtn
 * @property {HTMLElement} _pmBody
 * @property {HTMLElement} _pmNewBody
 * @property {HTMLElement} _pmSections
 * @property {HTMLElement} _pmFooter
 * @property {HTMLElement} _pmAcceptAllBtn
 * @property {HTMLElement} _pmAcceptNecessaryBtn
 * @property {HTMLElement} _pmSavePreferencesBtn
 *
 * @property {Object.<string, HTMLInputElement>} _categoryCheckboxInputs
 * @property {Object.<string, ServiceToggle>} _serviceCheckboxInputs
 *
 * // Used to properly restore focus when modal is closed
 * @property {HTMLSpanElement} _focusSpan
 * @property {HTMLSpanElement} _pmFocusSpan
 */

/**
 * @typedef {Object} CustomCallbacks
 * @property {Function} _onFirstConsent
 * @property {Function} _onConsent
 * @property {Function} _onChange
 * @property {Function} _onModalShow
 * @property {Function} _onModalHide
 * @property {Function} _onModalReady
 */

/**
 * Pointers to all services toggles relative to a category
 * @typedef {Object.<string, HTMLInputElement>} ServiceToggle
 */

class GlobalState {
    constructor() {

        /**
         * Default config. options
         * @type {CookieConsent.CookieConsentConfig}
         */
        this._config = {
            mode: OPT_IN_MODE,
            revision: 0,

            //{{START: GUI}}
            autoShow: true,
            lazyHtmlGeneration: true,
            //{{END: GUI}}

            autoClearCookies: true,
            manageScriptTags: true,
            hideFromBots: true,

            cookie: {
                name: COOKIE_NAME,
                expiresAfterDays: 182,
                domain: '',
                path: '/',
                sameSite: 'Lax'
            }
        };

        this._state = {
            /**
            * @type {UserConfig}
            */
            _userConfig: {},

            _currentLanguageCode: '',

            /**
            * @type {Object.<string, Translation>}
            */
            _allTranslations: {},

            /**
            * @type {Translation}
            */
            _currentTranslation: {},

            /**
            * Internal state variables
            * @type {CookieValue}
            */
            _savedCookieContent : {},

            /**
             * Store all event data-cc event listeners
             * (so that they can be removed on .reset())
             *
             * @type {{
             *  _element: HTMLElement,
             *  _event: string,
             *  _listener: Function
             * }[]}
             */
            _dataEventListeners: [],

            _disablePageInteraction: false,

            /**
            * @type {any}
            */
            _cookieData : null,

            /**
            * @type {Date}
            */
            _consentTimestamp: null,

            /**
            * @type {Date}
            */
            _lastConsentTimestamp: null,

            /**
            * @type {string}
            */
            _consentId: '',

            _invalidConsent : true,

            //{{START: GUI}}
            _consentModalExists : false,
            _consentModalVisible : false,

            _preferencesModalVisible : false,
            _preferencesModalExists: false,

            /**
            * @type {HTMLElement[]}
            */
            _currentModalFocusableElements: [],
            //{{END: GUI}}

            _revisionEnabled : false,
            _validRevision : true,

            /**
            * Array containing the last changed categories (enabled/disabled)
            * @type {string[]}
            */
            _lastChangedCategoryNames : [],

            _reloadPage : false,

            /**
            * @type {CookieConsent.AcceptType}
            */
            _acceptType: '',

            /**
            * Object containing all user's defined categories
            * @type {Object.<string, Category>}
            */
            _allDefinedCategories: false,

            /**
            * Stores all available categories
            * @type {string[]}
            */
            _allCategoryNames: [],

            /**
            * Contains all accepted categories
            * @type {string[]}
            */
            _acceptedCategories : [],

            /**
            * Keep track of readonly toggles
            * @type {string[]}
            */
            _readOnlyCategories : [],

            /**
            * Contains all categories enabled by default
            * @type {string[]}
            */
            _defaultEnabledCategories : [],

            /**
            * Don't run plugin if bot detected
            * (to avoid indexing its text content)
            */
            _botAgentDetected : false,

            /**
            * Save reference to the last focused element on the page
            * (used later to restore focus when both modals are closed)
            */

            //{{START: GUI}}

            /** @type {HTMLElement} **/_lastFocusedElemBeforeModal: false,
            /** @type {HTMLElement} **/_lastFocusedModalElement: false,

            /**
            * Both of the arrays below have the same structure:
            * [0]: first focusable element inside modal
            * [1]: last focusable element inside modal
            */

            /** @type {HTMLElement[]} **/ _cmFocusableElements : [],
            /** @type {HTMLElement[]} **/ _pmFocusableElements : [],

            /**
            * Keep track of enabled/disabled categories
            * @type {boolean[]}
            */
            _allToggleStates : [],

            //{{END: GUI}}

            /**
            * @type {Object.<string, Services>}
            */
            _allDefinedServices: {},

            /**
            * @type {Object.<string, string[]>}
            */
            _acceptedServices: {},

            /**
             * Keep track of the current state of the services
             * (may not be the same as enabledServices)
             *
             * @type {Object.<string, string[]>}
             */
            _enabledServices: {},

            /**
            * @type {Object.<string, string[]>}
            */
            _lastChangedServices: {},

            /**
            * @type {Object.<string, string[]>}
            */
            _lastEnabledServices: {},

            /**
            * @type {ScriptInfo[]}
            */
            _allScriptTags: []
        };

        //{{START: GUI}}

        /**
         * Pointers to main dom elements
         * @type {DomElements}
         */
        this._dom = {
            _categoryCheckboxInputs: {},
            _serviceCheckboxInputs: {}
        };

        //{{END: GUI}}

        /**
         * Callback functions
         * @type {CustomCallbacks}
         */
        this._callbacks = {};

        this._customEvents = {
            _onFirstConsent: 'cc:onFirstConsent',
            _onConsent: 'cc:onConsent',
            _onChange: 'cc:onChange',
            //{{START: GUI}}
            _onModalShow: 'cc:onModalShow',
            _onModalHide: 'cc:onModalHide',
            _onModalReady: 'cc:onModalReady'
            //{{END: GUI}}
        };
    }
}

const globalObj = new GlobalState();

/**
 * Helper console.log function
 * @param {any} [params]
 */
const debug = (...params) => {
    console.log(...params);
};

/**
 * Helper indexOf
 * @param {any[]|string} el
 * @param {any} value
 */
const indexOf = (el, value) => el.indexOf(value);

/**
 * Returns true if el. (array or string) contains the specified value
 * @param {any[]|string} el
 */
const elContains = (el, value) => indexOf(el, value) !== -1;

const isArray = el => Array.isArray(el);

const isString = el => typeof el === 'string';

const isObject = el => !!el && typeof el === 'object' && !isArray(el);

const isFunction = el => typeof el === 'function';

const getKeys = obj => Object.keys(obj);

/**
 * Return array without duplicates
 * @param {any[]} arr
 */
const unique = (arr) => Array.from(new Set(arr));

const getActiveElement = () => document.activeElement;

/**
 * @param {Event} e
 */
const preventDefault = (e) => e.preventDefault();

/**
 * @param {Element} el
 * @param {string} selector
 */
const querySelectorAll = (el, selector) => el.querySelectorAll(selector);

/**
 * @param {HTMLInputElement} input
 */
const dispatchInputChangeEvent = (input) => input.dispatchEvent(new Event('change'));

/**
 * @param {keyof HTMLElementTagNameMap} type
 */
const createNode = (type) => {
    const el = document.createElement(type);

    if (type === BUTTON_TAG) {
        el.type = type;
    }

    return el;
};

/**
 * @param {HTMLElement} el
 * @param {string} attribute
 * @param {string} value
 */
const setAttribute = (el, attribute, value) => el.setAttribute(attribute, value);

/**
 * @param {HTMLElement} el
 * @param {string} attribute
 * @param {boolean} [prependData]
 */
const removeAttribute = (el, attribute, prependData) => {
    el.removeAttribute(prependData
        ? 'data-' + attribute
        : attribute
    );
};

/**
 * @param {HTMLElement} el
 * @param {string} attribute
 * @param {boolean} [prependData]
 * @returns {string}
 */
const getAttribute = (el, attribute, prependData) => {
    return el.getAttribute(prependData
        ? 'data-' + attribute
        : attribute
    );
};

/**
 * @param {Node} parent
 * @param {Node} child
 */
const appendChild = (parent, child) => parent.appendChild(child);

/**
 * @param {HTMLElement} elem
 * @param {string} className
 */
const addClass = (elem, className) => elem.classList.add(className);

/**
 * @param {HTMLElement} elem
 * @param {string} className
 */
const addClassCm = (elem, className) => addClass(elem, 'cm__' + className);
/**
 * @param {HTMLElement} elem
 * @param {string} className
 */
const addClassPm = (elem, className) => addClass(elem, 'pm__' + className);

/**
 * @param {HTMLElement} elem
 * @param {string} className
 */
const removeClass = (el, className) => el.classList.remove(className);

/**
 * @param {HTMLElement} el
 * @param {string} className
 */
const hasClass = (el, className) => el.classList.contains(className);

const deepCopy = (el) => {
    if (typeof el !== 'object' )
        return el;

    if (el instanceof Date)
        return new Date(el.getTime());

    let clone = Array.isArray(el) ? [] : {};

    for (let key in el) {
        let value = el[key];
        clone[key] = deepCopy(value);
    }

    return clone;
};

/**
 * Store categories and services' config. details
 * @param {string[]} allCategoryNames
 */
const fetchCategoriesAndServices = (allCategoryNames) => {
    const {
        _allDefinedCategories,
        _allDefinedServices,
        _acceptedServices,
        _enabledServices,
        _readOnlyCategories
    } = globalObj._state;

    for (let categoryName of allCategoryNames) {

        const currCategory = _allDefinedCategories[categoryName];
        const services = currCategory.services || {};
        const serviceNames = isObject(services) && getKeys(services) || [];

        _allDefinedServices[categoryName] = {};
        _acceptedServices[categoryName] = [];
        _enabledServices[categoryName] = [];

        /**
         * Keep track of readOnly categories
         */
        if (currCategory.readOnly) {
            _readOnlyCategories.push(categoryName);
            _acceptedServices[categoryName] = serviceNames;
        }

        globalObj._dom._serviceCheckboxInputs[categoryName] = {};

        for (let serviceName of serviceNames) {
            const service = services[serviceName];
            service._enabled = false;
            _allDefinedServices[categoryName][serviceName] = service;
        }
    }
};

/**
 * Retrieves all script elements with 'data-category' attribute
 * and save the following attributes: category-name and service
 */
const retrieveScriptElements = () => {
    if (!globalObj._config.manageScriptTags)
        return;

    const state = globalObj._state;

    /**
     * @type {NodeListOf<HTMLScriptElement>}
     */
    const scripts = querySelectorAll(document, 'script[' + SCRIPT_TAG_SELECTOR +']');

    for (const scriptTag of scripts) {
        let scriptCategoryName = getAttribute(scriptTag, SCRIPT_TAG_SELECTOR);
        let scriptServiceName = scriptTag.dataset.service || '';
        let runOnDisable = false;

        /**
         * Remove the '!' char if it is present
         */
        if (scriptCategoryName && scriptCategoryName.charAt(0) === '!') {
            scriptCategoryName = scriptCategoryName.slice(1);
            runOnDisable = true;
        }

        if (scriptServiceName.charAt(0) === '!') {
            scriptServiceName = scriptServiceName.slice(1);
            runOnDisable = true;
        }

        if (elContains(state._allCategoryNames, scriptCategoryName)) {
            state._allScriptTags.push({
                _script: scriptTag,
                _executed: false,
                _runOnDisable: runOnDisable,
                _categoryName: scriptCategoryName,
                _serviceName: scriptServiceName
            });

            if (scriptServiceName) {
                const categoryServices = state._allDefinedServices[scriptCategoryName];
                if (!categoryServices[scriptServiceName]) {
                    categoryServices[scriptServiceName] = {
                        _enabled: false
                    };
                }
            }
        }
    }
};

/**
 * Calculate rejected services (all services - enabled services)
 * @returns {Object.<string, string[]>}
 */
const retrieveRejectedServices = () => {
    const rejectedServices = {};

    const {
        _allCategoryNames,
        _allDefinedServices,
        _acceptedServices
    } = globalObj._state;

    for (const categoryName of _allCategoryNames) {
        rejectedServices[categoryName] = arrayDiff(
            _acceptedServices[categoryName],
            getKeys(_allDefinedServices[categoryName])
        );
    }

    return rejectedServices;
};

const retrieveCategoriesFromModal = () => {
    const toggles = globalObj._dom._categoryCheckboxInputs;

    if (!toggles)
        return [];

    let enabledCategories = [];

    for (let categoryName in toggles) {
        if (toggles[categoryName].checked) {
            enabledCategories.push(categoryName);
        }
    }

    return enabledCategories;
};

/**
 * @param {string[]|string} categories - Categories to accept
 * @param {string[]} [excludedCategories]
 */
const resolveEnabledCategories = (categories, excludedCategories) => {
    const {
        _allCategoryNames,
        _acceptedCategories,
        _readOnlyCategories,
        _preferencesModalExists,
        _enabledServices,
        _defaultEnabledCategories,
        _allDefinedServices
    } = globalObj._state;

    /**
     * @type {string[]}
     */
    let enabledCategories = [];

    if (!categories) {
        enabledCategories = [..._acceptedCategories, ..._defaultEnabledCategories];
        //{{START: GUI}}
        if (_preferencesModalExists) {
            enabledCategories = retrieveCategoriesFromModal();
        }
        //{{END: GUI}}
    } else {
        if (isArray(categories)) {
            enabledCategories.push(...categories);
        } else if (isString(categories)) {
            enabledCategories = categories === 'all'
                ? _allCategoryNames
                : [categories];
        }

        /**
         * If there are services, turn them all on or off
         */
        for (const categoryName of _allCategoryNames) {
            _enabledServices[categoryName] = elContains(enabledCategories, categoryName)
                ? getKeys(_allDefinedServices[categoryName])
                : [];
        }
    }

    // Remove invalid and excluded categories
    enabledCategories = enabledCategories.filter(category =>
        !elContains(_allCategoryNames, category) ||
        !elContains(excludedCategories, category)
    );

    // Add back all the categories set as "readonly/required"
    enabledCategories.push(..._readOnlyCategories);

    setAcceptedCategories(enabledCategories);
};

/**
 * @param {string} [relativeCategory]
 */
const resolveEnabledServices = (relativeCategory) => {
    const state = globalObj._state;

    const {
        _enabledServices,
        _readOnlyCategories,
        _acceptedServices,
        _allDefinedServices,
        _allCategoryNames
    } = state;

    const categoriesToConsider = relativeCategory
        ? [relativeCategory]
        : _allCategoryNames;

    /**
     * Save previously enabled services to calculate later on which of them was changed
     */
    state._lastEnabledServices = deepCopy(_acceptedServices);

    for (const categoryName of categoriesToConsider) {
        const services = _allDefinedServices[categoryName];
        const serviceNames = getKeys(services);
        const customServicesSelection = _enabledServices[categoryName] && _enabledServices[categoryName].length > 0;
        const readOnlyCategory = elContains(_readOnlyCategories, categoryName);

        /**
         * Stop here if there are no services
         */
        if (serviceNames.length === 0)
            continue;

        // Empty (previously) enabled services
        _acceptedServices[categoryName] = [];

        // If category is marked as readOnly enable all its services
        if (readOnlyCategory) {
            _acceptedServices[categoryName].push(...serviceNames);
        } else {
            if (customServicesSelection) {
                const selectedServices = _enabledServices[categoryName];
                _acceptedServices[categoryName].push(...selectedServices);
            } else {
                _acceptedServices[categoryName] = state._enabledServices[categoryName];
            }
        }

        /**
         * Make sure there are no duplicates inside array
         */
        _acceptedServices[categoryName] = unique(_acceptedServices[categoryName]);
    }
};

/**
 * @param {string} eventName
 */
const dispatchPluginEvent = (eventName, data) => dispatchEvent(new CustomEvent(eventName, {detail: data}));

/**
 * Update services state internally and tick/untick checkboxes
 * @param {string|string[]} service
 * @param {string} category
 */
const updateModalToggles = (service, category) => {
    const state = globalObj._state;
    const {
        _allDefinedServices,
        _enabledServices,
        _preferencesModalExists
    } = state;

    const servicesInputs = globalObj._dom._serviceCheckboxInputs[category] || {};
    const categoryInput = globalObj._dom._categoryCheckboxInputs[category] || {};
    const allServiceNames = getKeys(_allDefinedServices[category]);

    // Clear previously enabled services
    _enabledServices[category] = [];

    if (isString(service)) {
        if (service === 'all') {

            // Enable all services
            _enabledServices[category].push(...allServiceNames);

            if (_preferencesModalExists) {
                for (let serviceName in servicesInputs) {
                    servicesInputs[serviceName].checked = true;
                    dispatchInputChangeEvent(servicesInputs[serviceName]);
                }
            }

        } else {

            // Enable only one service (if valid) and disable all the others
            if (elContains(allServiceNames, service))
                _enabledServices[category].push(service);

            if (_preferencesModalExists) {
                for (let serviceName in servicesInputs) {
                    servicesInputs[serviceName].checked = service === serviceName;
                    dispatchInputChangeEvent(servicesInputs[serviceName]);
                }
            }
        }
    } else if (isArray(service)) {
        for (let serviceName of allServiceNames) {
            const validService = elContains(service, serviceName);
            validService && _enabledServices[category].push(serviceName);

            if (_preferencesModalExists) {
                servicesInputs[serviceName].checked = validService;
                dispatchInputChangeEvent(servicesInputs[serviceName]);
            }
        }
    }

    const uncheckCategory = _enabledServices[category].length === 0;

    /**
     * Remove/add the category from acceptedCategories
     */
    state._acceptedCategories = uncheckCategory
        ? state._acceptedCategories.filter(cat => cat !== category)
        : unique([...state._acceptedCategories, category]);

    /**
     * If there are no services enabled in the
     * current category, uncheck the category
     */
    if (_preferencesModalExists) {
        categoryInput.checked = !uncheckCategory;
        dispatchInputChangeEvent(categoryInput);
    }
};

/**
 * Generate RFC4122-compliant UUIDs.
 * https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid?page=1&tab=votes#tab-top
 * @returns {string} unique uuid string
 */
const uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) => {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
};

/**
 * Add event listener to dom object (cross browser function)
 * @param {Element} elem
 * @param {keyof WindowEventMap} event
 * @param {EventListener} fn
 * @param {boolean} [saveListener]
 */
const addEvent = (elem, event, fn, saveListener) => {
    elem.addEventListener(event, fn);

    /**
     * Keep track of specific event listeners
     * that must be removed on `.reset()`
     */
    if (saveListener) {
        globalObj._state._dataEventListeners.push({
            _element: elem,
            _event: event,
            _listener: fn
        });
    }
};

/**
 * Calculate the existing cookie's remaining time until expiration (in milliseconds)
 */
const getRemainingExpirationTimeMS = () => {
    const lastTimestamp = globalObj._state._lastConsentTimestamp;

    const elapsedTimeMilliseconds = lastTimestamp
        ? new Date() - lastTimestamp
        : 0;

    return getExpiresAfterDaysValue()*86400000 - elapsedTimeMilliseconds;
};

/**
 * Used to fetch external language files (.json)
 * @param {string} url
 * @returns {Promise<import('../core/global').Translation | boolean>}
 */
const fetchJson = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e) {
        console.error(e);
        return false;
    }
};

/**
 * Helper function to retrieve cookie duration
 * @returns {number}
 */
const getExpiresAfterDaysValue = () => {
    const expiresAfterDays = globalObj._config.cookie.expiresAfterDays;

    return isFunction(expiresAfterDays)
        ? expiresAfterDays(globalObj._state._acceptType)
        : expiresAfterDays;
};

/**
 * Symmetric difference between 2 arrays
 * @param {any[]} arr1
 * @param {any[]} arr2
 */
const arrayDiff = (arr1, arr2) => {
    const a = arr1 || [];
    const b = arr2 || [];

    return a
        .filter(x => !elContains(b, x))
        .concat(b.filter(x => !elContains(a, x)));
};

/**
 * Calculate "accept type"
 * @returns {'all'|'custom'|'necessary'} accept type
 */
const resolveAcceptType = () => {
    let type = 'custom';

    const { _acceptedCategories, _allCategoryNames, _readOnlyCategories } = globalObj._state;
    const nAcceptedCategories = _acceptedCategories.length;

    if (nAcceptedCategories === _allCategoryNames.length)
        type = 'all';
    else if (nAcceptedCategories === _readOnlyCategories.length)
        type = 'necessary';

    return type;
};

/**
 * Note: getUserPreferences() depends on "acceptType"
 * @param {string[]} acceptedCategories
 */
const setAcceptedCategories = (acceptedCategories) => {
    globalObj._state._acceptedCategories = unique(acceptedCategories);
    globalObj._state._acceptType = resolveAcceptType();
};

/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback createModal
 * @param {import('../core/global').Api} api
 */

/**
 * Add an onClick listeners to all html elements with data-cc attribute
 * @param {HTMLElement} [elem]
 * @param {import('../core/global').Api} api
 * @param {createModal} [createPreferencesModal]
 */
const addDataButtonListeners = (elem, api, createPreferencesModal, createMainContainer) => {
    const ACCEPT_PREFIX = 'accept-';

    const {
        show,
        showPreferences,
        hide,
        hidePreferences,
        acceptCategory
    } = api;

    const rootEl = elem || document;
    const getElements = dataRole => querySelectorAll(rootEl, `[data-cc="${dataRole}"]`);

    /**
     * Helper function: accept and then hide modals
     * @param {Event} event source event
     * @param {string|string[]} [acceptType]
     */
    const acceptAction = (event, acceptType) => {
        preventDefault(event);
        acceptCategory(acceptType);
        hidePreferences();
        hide();
    };

    const
        showPreferencesModalElements = getElements('show-preferencesModal'),
        showConsentModalElements = getElements('show-consentModal'),
        acceptAllElements = getElements(ACCEPT_PREFIX + 'all'),
        acceptNecessaryElements = getElements(ACCEPT_PREFIX + 'necessary'),
        acceptCustomElements = getElements(ACCEPT_PREFIX + 'custom'),
        createPreferencesModalOnHover = globalObj._config.lazyHtmlGeneration;

    //{{START: GUI}}
    for (const el of showPreferencesModalElements) {
        setAttribute(el, 'aria-haspopup', 'dialog');
        addEvent(el, CLICK_EVENT, (event) => {
            preventDefault(event);
            showPreferences();
        });

        if (createPreferencesModalOnHover) {
            addEvent(el, 'mouseenter', (event) => {
                preventDefault(event);
                if (!globalObj._state._preferencesModalExists)
                    createPreferencesModal(api, createMainContainer);
            }, true);

            addEvent(el, 'focus', () => {
                if (!globalObj._state._preferencesModalExists)
                    createPreferencesModal(api, createMainContainer);
            });
        }
    }

    for (let el of showConsentModalElements) {
        setAttribute(el, 'aria-haspopup', 'dialog');
        addEvent(el, CLICK_EVENT, (event) => {
            preventDefault(event);
            show(true);
        }, true);
    }
    //{{END: GUI}}

    for (let el of acceptAllElements) {
        addEvent(el, CLICK_EVENT, (event) => {
            acceptAction(event, 'all');
        }, true);
    }

    for (let el of acceptCustomElements) {
        addEvent(el, CLICK_EVENT, (event) => {
            acceptAction(event);
        }, true);
    }

    for (let el of acceptNecessaryElements) {
        addEvent(el, CLICK_EVENT, (event) => {
            acceptAction(event, []);
        }, true);
    }
};

/**
 * @param {HTMLElement} el
 * @param {boolean} [toggleTabIndex]
 */
const focus = (el, toggleTabIndex) => {
    if (!el) return;

    /**
     * Momentarily add the `tabindex` attribute to fix
     * a bug with focus restoration in chrome
     */
    toggleTabIndex && (el.tabIndex = -1);

    el.focus();

    /**
     * Remove the `tabindex` attribute so
     * that the html markup is valid again
     */
    toggleTabIndex && el.removeAttribute('tabindex');
};

/**
 * @param {HTMLDivElement} element
 * @param {1 | 2} modalId
 */
const focusAfterTransition = (element, modalId) => {
    const getVisibleDiv = (modalId) => modalId === 1
        ? globalObj._dom._cmDivTabindex
        : globalObj._dom._pmDivTabindex;

    const setFocus = (event) => {
        event.target.removeEventListener('transitionend', setFocus);
        if (event.propertyName === 'opacity' && getComputedStyle(element).opacity === '1') {
            focus(getVisibleDiv(modalId));
        }
    };

    addEvent(element, 'transitionend', setFocus);
};

/**
 * Obtain accepted and rejected categories
 * @returns {{accepted: string[], rejected: string[]}}
 */
const getCurrentCategoriesState = () => {
    const {
        _invalidConsent,
        _acceptedCategories,
        _allCategoryNames
    } = globalObj._state;

    return {
        accepted: _acceptedCategories,
        rejected: _invalidConsent
            ? []
            : _allCategoryNames.filter(category =>
                !elContains(_acceptedCategories, category)
            )
    };
};

let disableInteractionTimeout;

/**
 * @param {boolean} [enable]
 */
const toggleDisableInteraction = (enable) => {
    clearTimeout(disableInteractionTimeout);

    if (enable) {
        addClass(globalObj._dom._htmlDom, TOGGLE_DISABLE_INTERACTION_CLASS);
    }else {
        disableInteractionTimeout = setTimeout(() => {
            removeClass(globalObj._dom._htmlDom, TOGGLE_DISABLE_INTERACTION_CLASS);
        }, 500);
    }
};

const iconStrokes = [
    'M 19.5 4.5 L 4.5 19.5 M 4.5 4.501 L 19.5 19.5',    // X
    'M 3.572 13.406 L 8.281 18.115 L 20.428 5.885',     // TICK
    'M 21.999 6.94 L 11.639 17.18 L 2.001 6.82 '        // ARROW
];

/**
 * [0: x, 1: tick, 2: arrow]
 * @param {0 | 1 | 2} [iconIndex]
 * @param {number} [strokeWidth]
 */
const getSvgIcon = (iconIndex = 0, strokeWidth = 1.5) => {
    return `<svg viewBox="0 0 24 24" stroke-width="${strokeWidth}"><path d="${iconStrokes[iconIndex]}"/></svg>`;
};

/**
 * Trap focus inside modal and focus the first
 * focusable element of current active modal
 * @param {HTMLDivElement} modal
 */
const handleFocusTrap = (modal) => {
    const dom = globalObj._dom;
    const state = globalObj._state;

    /**
     * @param {HTMLDivElement} modal
     * @param {HTMLElement[]} focusableElements
     */
    const trapFocus = (modal) => {
        const isConsentModal = modal === dom._cm;

        const scope = state._userConfig.disablePageInteraction
            ? dom._htmlDom
            : isConsentModal
                ? dom._ccMain
                : dom._htmlDom;

        const getFocusableElements = () => isConsentModal
            ? state._cmFocusableElements
            : state._pmFocusableElements;

        const isModalVisible = () => isConsentModal
            ? state._consentModalVisible && !state._preferencesModalVisible
            : state._preferencesModalVisible;

        addEvent(scope, 'keydown', (e) => {
            if (e.key !== 'Tab' || !isModalVisible())
                return;

            const currentActiveElement = getActiveElement();
            const focusableElements = getFocusableElements();

            if (focusableElements.length === 0)
                return;

            /**
             * If reached natural end of the tab sequence => restart
             * If current focused element is not inside modal => focus modal
             */
            if (e.shiftKey) {
                if (currentActiveElement === focusableElements[0] || !modal.contains(currentActiveElement)) {
                    preventDefault(e);
                    focus(focusableElements[1]);
                }
            } else {
                if (currentActiveElement === focusableElements[1] || !modal.contains(currentActiveElement)) {
                    preventDefault(e);
                    focus(focusableElements[0]);
                }
            }
        }, true);
    };

    trapFocus(modal);
};

/**
 * Note: any of the below focusable elements, which has the attribute tabindex="-1" AND is either
 * the first or last element of the modal, won't receive focus during "open/close" modal
 */
const focusableTypesSelector = ['[href]', BUTTON_TAG, 'input', 'details', '[tabindex]']
    .map(selector => selector+':not([tabindex="-1"])').join(',');

const getFocusableElements = (root) => querySelectorAll(root, focusableTypesSelector);

/**
 * Save reference to first and last focusable elements inside each modal
 * to prevent losing focus while navigating with TAB
 * @param {1 | 2} [modalId]
 */
const getModalFocusableData = (modalId) => {
    const { _state, _dom } = globalObj;

    /**
     * Saves all focusable elements inside modal, into the array
     * @param {HTMLElement} modal
     * @param {Element[]} array
     */
    const saveAllFocusableElements = (modal, array) => {
        const focusableElements = getFocusableElements(modal);

        /**
         * Save first and last elements (trap focus inside modal)
         */
        array[0] = focusableElements[0];
        array[1] = focusableElements[focusableElements.length - 1];
    };

    if (modalId === 1 && _state._consentModalExists)
        saveAllFocusableElements(_dom._cm, _state._cmFocusableElements);

    if (modalId === 2 && _state._preferencesModalExists)
        saveAllFocusableElements(_dom._pm, _state._pmFocusableElements);
};

/**
 * Fire custom event
 * @param {string} eventName
 * @param {string} [modalName]
 * @param {HTMLElement} [modal]
 */
const fireEvent = (eventName, modalName, modal) => {
    const {
        _onChange,
        _onConsent,
        _onFirstConsent,
        _onModalHide,
        _onModalReady,
        _onModalShow
    } = globalObj._callbacks;

    const events = globalObj._customEvents;

    //{{START: GUI}}
    if (modalName) {
        const modalParams = { modalName };

        if (eventName === events._onModalShow) {
            isFunction(_onModalShow) && _onModalShow(modalParams);
        } else if (eventName === events._onModalHide) {
            isFunction(_onModalHide) && _onModalHide(modalParams);
        } else {
            modalParams.modal = modal;
            isFunction(_onModalReady) && _onModalReady(modalParams);
        }

        return dispatchPluginEvent(eventName, modalParams);
    }
    //{{END: GUI}}

    const params = {
        cookie: globalObj._state._savedCookieContent
    };

    if (eventName === events._onFirstConsent) {
        isFunction(_onFirstConsent) && _onFirstConsent(deepCopy(params));
    } else if (eventName === events._onConsent) {
        isFunction(_onConsent) && _onConsent(deepCopy(params));
    } else {
        params.changedCategories = globalObj._state._lastChangedCategoryNames;
        params.changedServices = globalObj._state._lastChangedServices;
        isFunction(_onChange) && _onChange(deepCopy(params));
    }

    dispatchPluginEvent(eventName, deepCopy(params));
};

/**
 * @param {CallableFunction} fn
 */
const safeRun = (fn, hideError) => {
    try {
        return fn();
    } catch (e) {
        !hideError && console.warn('CookieConsent:', e);
        return false;
    }
};

/**
 * @param {string} type
 */
const validMimeType = type => ['text/javascript', 'module'].includes(type);

/**
 * This function handles the loading/activation logic of the already
 * existing scripts based on the current accepted cookie categories
 *
 * @param {string[]} [defaultEnabledCategories]
 */
const manageExistingScripts = (defaultEnabledCategories) => {
    const {
        _acceptedServices,
        _lastChangedServices,
        _allCategoryNames,
        _allDefinedServices,
        _allScriptTags,
        _savedCookieContent,
        _lastChangedCategoryNames,
    } = globalObj._state;

    /**
     * Automatically Enable/Disable internal services
     */
    for (const categoryName of _allCategoryNames) {
        const lastChangedServices = _lastChangedServices[categoryName]
            || _acceptedServices[categoryName]
            || [];

        for (const serviceName of lastChangedServices) {
            const service = _allDefinedServices[categoryName][serviceName];

            if (!service)
                continue;

            const { onAccept, onReject } = service;

            if (
                !service._enabled
                && elContains(_acceptedServices[categoryName], serviceName)
            ) {
                service._enabled = true;
                isFunction(onAccept) && onAccept();
            }

            else if (
                service._enabled
                && !elContains(_acceptedServices[categoryName], serviceName)
            ) {
                service._enabled = false;
                isFunction(onReject) && onReject();
            }
        }
    }

    if (!globalObj._config.manageScriptTags)
        return;

    const scripts = _allScriptTags;
    const acceptedCategories = defaultEnabledCategories
        || _savedCookieContent.categories
        || [];

    /**
     * Load scripts (sequentially), using a recursive function
     * which loops through the scripts array
     * @param {import('../core/global').ScriptInfo[]} scripts scripts to load
     * @param {number} index current script to load
     */
    const loadScriptsHelper = (scripts, index) => {
        if (index >= scripts.length)
            return;

        const currScriptInfo = _allScriptTags[index];

        /**
         * Skip script if it was already executed
         */
        if (currScriptInfo._executed)
            return loadScriptsHelper(scripts, index+1);

        const currScript = currScriptInfo._script;
        const currScriptCategory = currScriptInfo._categoryName;
        const currScriptService = currScriptInfo._serviceName;
        const categoryAccepted = elContains(acceptedCategories, currScriptCategory);
        const serviceAccepted = currScriptService
            ? elContains(_acceptedServices[currScriptCategory], currScriptService)
            : false;

        const categoryWasJustEnabled = () => !currScriptService
            && !currScriptInfo._runOnDisable
            && categoryAccepted;

        const serviceWasJustEnabled = () => currScriptService
            && !currScriptInfo._runOnDisable
            && serviceAccepted;

        const categoryWasJustDisabled = () => !currScriptService
            && currScriptInfo._runOnDisable
            && !categoryAccepted
            && elContains(_lastChangedCategoryNames, currScriptCategory);

        const serviceWasJustDisabled = () => currScriptService
            && currScriptInfo._runOnDisable
            && !serviceAccepted
            && elContains(_lastChangedServices[currScriptCategory] || [], currScriptService);

        const shouldRunScript =
            categoryWasJustEnabled()
            || categoryWasJustDisabled()
            || serviceWasJustEnabled()
            || serviceWasJustDisabled();

        if (shouldRunScript) {
            currScriptInfo._executed = true;
            const dataType = getAttribute(currScript, 'type', true);

            removeAttribute(currScript, 'type', !!dataType);
            removeAttribute(currScript, SCRIPT_TAG_SELECTOR);

            // Get current script data-src (if there is one)
            let src = getAttribute(currScript, 'src', true);

            // Some scripts (like ga) might throw warning if data-src is present
            src && removeAttribute(currScript, 'src', true);

            /**
             * Fresh script
             * @type {HTMLScriptElement}
             */
            const freshScript = createNode('script');

            freshScript.textContent = currScript.innerHTML;

            //Copy attributes over to the new "revived" script
            for (const {nodeName} of currScript.attributes) {
                setAttribute(
                    freshScript,
                    nodeName,
                    currScript[nodeName] || getAttribute(currScript, nodeName)
                );
            }

            /**
             * Set custom type
             */
            dataType && (freshScript.type = dataType);

            // Set src (if data-src found)
            src
                ? (freshScript.src = src)
                : (src = currScript.src);

            const externalScript = !!src && (dataType ? validMimeType(dataType) : true);

            // If script has valid "src" attribute
            // try loading it sequentially
            if (externalScript) {
                // load script sequentially => the next script will not be loaded
                // until the current's script onload event triggers
                freshScript.onload = freshScript.onerror = () => {
                    loadScriptsHelper(scripts, ++index);
                };
            }

            // Replace current "sleeping" script with the new "revived" one
            currScript.replaceWith(freshScript);

            /**
             * If we managed to get here and src is still set, it means that
             * the script is loading/loaded sequentially so don't go any further
             */
            if (externalScript)
                return;
        }


        // Go to next script right away
        loadScriptsHelper(scripts, ++index);
    };

    loadScriptsHelper(scripts, 0);
};

/**
 * Keep track of categories enabled by default (useful when mode==OPT_OUT_MODE)
 */
const retrieveEnabledCategoriesAndServices = () => {
    const state = globalObj._state;

    for (const categoryName of state._allCategoryNames) {
        const category = state._allDefinedCategories[categoryName];

        if (category.readOnly || category.enabled) {
            state._defaultEnabledCategories.push(categoryName);
            const services = state._allDefinedServices[categoryName] || {};

            for (let serviceName in services) {
                state._enabledServices[categoryName].push(serviceName);
                if (state._userConfig.mode === OPT_OUT_MODE) {
                    state._acceptedServices[categoryName].push(serviceName);
                }
            }
        }
    }
};

/**
 * @typedef {Object} Layout
 * @property {string[]} _variants
 * @property {string[]} _alignV
 * @property {string[]} _alignH
 * @property {string} _defaultAlignV
 * @property {string} _defaultAlignH
 */

/**
 * @typedef {Object.<string, Layout>} Layouts
 */

const CLASS_CONSTANTS = {
    _top: 'top',
    _middle: 'middle',
    _bottom: 'bottom',
    _left: 'left',
    _center: 'center',
    _right: 'right',
    _inline: 'inline',
    _wide: 'wide',
    _pmPrefix: 'pm--',
    _cmPrefix: 'cm--',
    _box: 'box'
};

const alignV = [
    CLASS_CONSTANTS._middle,
    CLASS_CONSTANTS._top,
    CLASS_CONSTANTS._bottom
];

const alignH = [
    CLASS_CONSTANTS._left,
    CLASS_CONSTANTS._center,
    CLASS_CONSTANTS._right
];

const ALL_CM_LAYOUTS = {
    box: {
        _variants: [CLASS_CONSTANTS._wide, CLASS_CONSTANTS._inline],
        _alignV: alignV,
        _alignH: alignH,
        _defaultAlignV: CLASS_CONSTANTS._bottom,
        _defaultAlignH: CLASS_CONSTANTS._right
    },
    cloud: {
        _variants: [CLASS_CONSTANTS._inline],
        _alignV: alignV,
        _alignH: alignH,
        _defaultAlignV: CLASS_CONSTANTS._bottom,
        _defaultAlignH: CLASS_CONSTANTS._center
    },
    bar: {
        _variants: [CLASS_CONSTANTS._inline],
        _alignV: alignV.slice(1),   //remove the first "middle" option
        _alignH: [],
        _defaultAlignV: CLASS_CONSTANTS._bottom,
        _defaultAlignH: ''
    }
};

const ALL_PM_LAYOUTS = {
    box: {
        _variants: [],
        _alignV: [],
        _alignH: [],
        _defaultAlignV: '',
        _defaultAlignH: ''
    },
    bar: {
        _variants: [CLASS_CONSTANTS._wide],
        _alignV: [],
        _alignH: [CLASS_CONSTANTS._left, CLASS_CONSTANTS._right],
        _defaultAlignV: '',
        _defaultAlignH: CLASS_CONSTANTS._left
    }
};

/**
 * Add appropriate classes to modals and buttons
 * @param {0 | 1} applyToModal
 */
const guiManager = (applyToModal) => {
    const guiOptions = globalObj._state._userConfig.guiOptions;
    const consentModalOptions = guiOptions && guiOptions.consentModal;
    const preferencesModalOptions = guiOptions && guiOptions.preferencesModal;

    if (applyToModal === 0) {
        setLayout(
            globalObj._dom._cm,
            ALL_CM_LAYOUTS,
            consentModalOptions,
            CLASS_CONSTANTS._cmPrefix,
            CLASS_CONSTANTS._box,
            'cm'
        );
    }

    if (applyToModal === 1) {
        setLayout(
            globalObj._dom._pm,
            ALL_PM_LAYOUTS,
            preferencesModalOptions,
            CLASS_CONSTANTS._pmPrefix,
            CLASS_CONSTANTS._box,
            'pm'
        );
    }
};

/**
 * Helper function to set the proper layout classes
 * @param {HTMLElement} modal
 * @param {Layouts} allowedLayoutsObj
 * @param {import("../core/global").GuiModalOption} userGuiOptions
 * @param {'cm--' | 'pm--'} modalClassPrefix
 * @param {string} defaultLayoutName
 * @param {'cm' | 'pm'} modalClassName
 */
const setLayout = (modal, allowedLayoutsObj, userGuiOptions, modalClassPrefix, defaultLayoutName, modalClassName) => {
    /**
     * Reset modal classes to default
     */
    modal.className = modalClassName;

    const layout = userGuiOptions && userGuiOptions.layout;
    const position = userGuiOptions && userGuiOptions.position;
    const flipButtons = userGuiOptions && userGuiOptions.flipButtons;
    const equalWeightButtons = !userGuiOptions || userGuiOptions.equalWeightButtons !== false;

    const layoutSplit = layout && layout.split(' ') || [];

    const layoutName = layoutSplit[0];
    const layoutVariant = layoutSplit[1];

    const currentLayoutName = layoutName in allowedLayoutsObj
        ? layoutName
        : defaultLayoutName;

    const currentLayout = allowedLayoutsObj[currentLayoutName];
    const currentLayoutVariant = elContains(currentLayout._variants, layoutVariant) && layoutVariant;

    const positionSplit = position && position.split(' ') || [];
    const positionV = positionSplit[0];

    const positionH = modalClassPrefix === CLASS_CONSTANTS._pmPrefix
        ? positionSplit[0]
        : positionSplit[1];

    const currentPositionV = elContains(currentLayout._alignV, positionV)
        ? positionV
        : currentLayout._defaultAlignV;

    const currentPositionH = elContains(currentLayout._alignH, positionH)
        ? positionH
        : currentLayout._defaultAlignH;

    const addModalClass = className => {
        className && addClass(modal, modalClassPrefix + className);
    };

    addModalClass(currentLayoutName);
    addModalClass(currentLayoutVariant);
    addModalClass(currentPositionV);
    addModalClass(currentPositionH);
    flipButtons && addModalClass('flip');

    const secondaryBtnClass = 'btn--secondary';
    const btnClassPrefix = modalClassName + '__';
    const btnClass = btnClassPrefix + secondaryBtnClass;

    /**
     * Add classes to buttons
     */
    if (modalClassName === 'cm') {
        const {_cmAcceptNecessaryBtn, _cmCloseIconBtn} = globalObj._dom;

        if (_cmAcceptNecessaryBtn) {
            equalWeightButtons
                ? removeClass(_cmAcceptNecessaryBtn, btnClass)
                : addClass(_cmAcceptNecessaryBtn, btnClass);
        }

        if (_cmCloseIconBtn) {
            equalWeightButtons
                ? removeClass(_cmCloseIconBtn, btnClass)
                : addClass(_cmCloseIconBtn, btnClass);
        }
    } else {
        const { _pmAcceptNecessaryBtn } =  globalObj._dom;

        if (_pmAcceptNecessaryBtn) {
            equalWeightButtons
                ? removeClass(_pmAcceptNecessaryBtn, btnClass)
                : addClass(_pmAcceptNecessaryBtn, btnClass);
        }
    }
};

/**
 * @callback CreateMainContainer
 */

/**
 * Generates preferences modal and appends it to "cc-main" el.
 * @param {import("../global").Api} api
 * @param {CreateMainContainer} createMainContainer
 */
const createPreferencesModal = (api, createMainContainer) => {
    const state = globalObj._state;
    const dom = globalObj._dom;
    const {hide, hidePreferences, acceptCategory} = api;

    /**
     * @param {string|string[]} [categories]
     */
    const acceptHelper = (categories) => {
        acceptCategory(categories);
        hidePreferences();
        hide();
    };

    /**
     * @type {import("../global").PreferencesModalOptions}
     */
    const modalData = state._currentTranslation && state._currentTranslation.preferencesModal;

    if (!modalData)
        return;

    const
        titleData = modalData.title,
        closeIconLabelData = modalData.closeIconLabel,
        acceptAllBtnData = modalData.acceptAllBtn,
        acceptNecessaryBtnData = modalData.acceptNecessaryBtn,
        savePreferencesBtnData = modalData.savePreferencesBtn,
        sectionsData = modalData.sections || [],
        createFooter = acceptAllBtnData
            || acceptNecessaryBtnData
            || savePreferencesBtnData;

    if (!dom._pmContainer) {
        dom._pmContainer = createNode(DIV_TAG);
        addClass(dom._pmContainer, 'pm-wrapper');

        const pmOverlay = createNode('div');
        addClass(pmOverlay, 'pm-overlay');
        appendChild(dom._pmContainer, pmOverlay);

        /**
         * Hide modal when overlay is clicked
         */
        addEvent(pmOverlay, CLICK_EVENT, hidePreferences);

        // Preferences modal
        dom._pm = createNode(DIV_TAG);

        addClass(dom._pm, 'pm');
        setAttribute(dom._pm, 'role', 'dialog');
        setAttribute(dom._pm, ARIA_HIDDEN, true);
        setAttribute(dom._pm, 'aria-modal', true);
        setAttribute(dom._pm, 'aria-labelledby', 'pm__title');

        // Hide preferences on 'esc' key press
        addEvent(dom._htmlDom, 'keydown', (event) => {
            if (event.keyCode === 27)
                hidePreferences();
        }, true);

        dom._pmHeader = createNode(DIV_TAG);
        addClassPm(dom._pmHeader, 'header');

        dom._pmTitle = createNode('h2');
        addClassPm(dom._pmTitle, 'title');
        dom._pmTitle.id = 'pm__title';

        dom._pmCloseBtn = createNode(BUTTON_TAG);
        addClassPm(dom._pmCloseBtn, 'close-btn');
        setAttribute(dom._pmCloseBtn, 'aria-label', modalData.closeIconLabel || '');
        addEvent(dom._pmCloseBtn, CLICK_EVENT, hidePreferences);

        dom._pmFocusSpan = createNode('span');
        dom._pmFocusSpan.innerHTML = getSvgIcon();
        appendChild(dom._pmCloseBtn, dom._pmFocusSpan);

        dom._pmBody = createNode(DIV_TAG);
        addClassPm(dom._pmBody, 'body');

        dom._pmFooter = createNode(DIV_TAG);
        addClassPm(dom._pmFooter, 'footer');

        var _pmBtnContainer = createNode(DIV_TAG);
        addClass(_pmBtnContainer, 'btns');

        var _pmBtnGroup1 = createNode(DIV_TAG);
        var _pmBtnGroup2 = createNode(DIV_TAG);
        addClassPm(_pmBtnGroup1, BTN_GROUP_CLASS);
        addClassPm(_pmBtnGroup2, BTN_GROUP_CLASS);

        appendChild(dom._pmFooter, _pmBtnGroup1);
        appendChild(dom._pmFooter, _pmBtnGroup2);

        appendChild(dom._pmHeader, dom._pmTitle);
        appendChild(dom._pmHeader, dom._pmCloseBtn);

        dom._pmDivTabindex = createNode(DIV_TAG);
        setAttribute(dom._pmDivTabindex, 'tabIndex', -1);
        appendChild(dom._pm, dom._pmDivTabindex);

        appendChild(dom._pm, dom._pmHeader);
        appendChild(dom._pm, dom._pmBody);

        createFooter && appendChild(dom._pm, dom._pmFooter);

        appendChild(dom._pmContainer, dom._pm);
    } else {
        dom._pmNewBody = createNode(DIV_TAG);
        addClassPm(dom._pmNewBody, 'body');
    }

    if (titleData) {
        dom._pmTitle.innerHTML = titleData;
        closeIconLabelData && setAttribute(dom._pmCloseBtn, 'aria-label', closeIconLabelData);
    }

    let sectionToggleContainer;

    sectionsData.forEach((section, sectionIndex) => {
        const
            sTitleData = section.title,
            sDescriptionData = section.description,
            sLinkedCategory = section.linkedCategory,
            sCurrentCategoryObject = sLinkedCategory && state._allDefinedCategories[sLinkedCategory],
            sCookieTableData = section.cookieTable,
            sCookieTableBody = sCookieTableData && sCookieTableData.body,
            sCookieTableCaption = sCookieTableData && sCookieTableData.caption,
            sCreateCookieTable = sCookieTableBody && sCookieTableBody.length > 0,
            hasToggle = !!sCurrentCategoryObject,

            /**
             * @type {Object.<string, import('../global').Service>}
             */
            sServices = hasToggle && state._allDefinedServices[sLinkedCategory],
            sServiceNames = isObject(sServices) && getKeys(sServices) || [],
            sIsExpandableToggle = hasToggle && (!!sDescriptionData || !!sCreateCookieTable || getKeys(sServices).length>0);


        // section
        var s = createNode(DIV_TAG);
        addClassPm(s, 'section');

        if (sIsExpandableToggle || sDescriptionData) {
            var sDescContainer = createNode(DIV_TAG);
            addClassPm(sDescContainer, 'section-desc-wrapper');
        }

        let nServices = sServiceNames.length;

        if (sIsExpandableToggle) {
            if (nServices > 0) {

                const servicesContainer = createNode(DIV_TAG);
                addClassPm(servicesContainer, 'section-services');

                for (const serviceName of sServiceNames) {
                    const service = sServices[serviceName];
                    const serviceLabel = service && service.label || serviceName;
                    const serviceDiv = createNode(DIV_TAG);
                    const serviceHeader = createNode(DIV_TAG);
                    const serviceIconContainer = createNode(DIV_TAG);
                    const serviceTitle = createNode(DIV_TAG);

                    addClassPm(serviceDiv, 'service');
                    addClassPm(serviceTitle, 'service-title');
                    addClassPm(serviceHeader, 'service-header');
                    addClassPm(serviceIconContainer, 'service-icon');

                    const toggleLabel = createToggleLabel(serviceLabel, serviceName, sCurrentCategoryObject, true, sLinkedCategory);

                    serviceTitle.innerHTML = serviceLabel;

                    appendChild(serviceHeader, serviceIconContainer);
                    appendChild(serviceHeader, serviceTitle);
                    appendChild(serviceDiv, serviceHeader);
                    appendChild(serviceDiv, toggleLabel);
                    appendChild(servicesContainer, serviceDiv);
                }

                appendChild(sDescContainer, servicesContainer);
            }
        }

        if (sTitleData) {
            var sTitleContainer = createNode(DIV_TAG);

            var sTitle = hasToggle
                ? createNode(BUTTON_TAG)
                : createNode(DIV_TAG);

            addClassPm(sTitleContainer, 'section-title-wrapper');
            addClassPm(sTitle, 'section-title');

            sTitle.innerHTML = sTitleData;
            appendChild(sTitleContainer, sTitle);

            if (hasToggle) {

                /**
                 * Arrow icon span
                 */
                const sTitleIcon = createNode('span');
                sTitleIcon.innerHTML = getSvgIcon(2, 3.5);
                addClassPm(sTitleIcon, 'section-arrow');
                appendChild(sTitleContainer, sTitleIcon);

                s.className += '--toggle';

                const toggleLabel = createToggleLabel(sTitleData, sLinkedCategory, sCurrentCategoryObject);

                let serviceCounterLabel = modalData.serviceCounterLabel;

                if (nServices > 0 && isString(serviceCounterLabel)) {
                    let serviceCounter = createNode('span');

                    addClassPm(serviceCounter, 'badge');
                    addClassPm(serviceCounter, 'service-counter');
                    setAttribute(serviceCounter, ARIA_HIDDEN, true);
                    setAttribute(serviceCounter, 'data-servicecounter', nServices);

                    if (serviceCounterLabel) {
                        serviceCounterLabel = serviceCounterLabel.split('|');

                        if (serviceCounterLabel.length > 1 && nServices > 1)
                            serviceCounterLabel = serviceCounterLabel[1];
                        else
                            serviceCounterLabel = serviceCounterLabel[0];

                        setAttribute(serviceCounter, 'data-counterlabel', serviceCounterLabel);
                    }

                    serviceCounter.innerHTML = nServices + (serviceCounterLabel
                        ? ' ' + serviceCounterLabel
                        : '');

                    appendChild(sTitle, serviceCounter);
                }

                if (sIsExpandableToggle) {
                    addClassPm(s, 'section--expandable');
                    var expandableDivId = sLinkedCategory + '-desc';
                    setAttribute(sTitle, 'aria-expanded', false);
                    setAttribute(sTitle, 'aria-controls', expandableDivId);
                }

                appendChild(sTitleContainer, toggleLabel);

            } else {
                setAttribute(sTitle, 'role', 'heading');
                setAttribute(sTitle, 'aria-level', '3');
            }

            appendChild(s, sTitleContainer);
        }

        if (sDescriptionData) {
            var sDesc = createNode('p');
            addClassPm(sDesc, 'section-desc');
            sDesc.innerHTML = sDescriptionData;
            appendChild(sDescContainer, sDesc);
        }

        if (sIsExpandableToggle) {
            setAttribute(sDescContainer, ARIA_HIDDEN, 'true');
            sDescContainer.id = expandableDivId;

            /**
             * On button click handle the following :=> aria-expanded, aria-hidden and act class for current section
             */
            ((accordion, section, btn) => {
                addEvent(sTitle, CLICK_EVENT, () => {
                    if (!hasClass(section, 'is-expanded')) {
                        addClass(section, 'is-expanded');
                        setAttribute(btn, 'aria-expanded', 'true');
                        setAttribute(accordion, ARIA_HIDDEN, 'false');
                    } else {
                        removeClass(section, 'is-expanded');
                        setAttribute(btn, 'aria-expanded', 'false');
                        setAttribute(accordion, ARIA_HIDDEN, 'true');
                    }
                });
            })(sDescContainer, s, sTitle);


            if (sCreateCookieTable) {
                const table = createNode('table');
                const thead = createNode('thead');
                const tbody = createNode('tbody');

                if (sCookieTableCaption) {
                    const caption = createNode('caption');
                    addClassPm(caption, 'table-caption');
                    caption.innerHTML = sCookieTableCaption;
                    table.appendChild(caption);
                }

                addClassPm(table, 'section-table');
                addClassPm(thead, 'table-head');
                addClassPm(tbody, 'table-body');

                const headerData = sCookieTableData.headers;
                const tableHeadersKeys = getKeys(headerData);

                /**
                 * Create table headers
                 */
                const trHeadFragment = dom._document.createDocumentFragment();
                const trHead = createNode('tr');

                for (const headerKey of tableHeadersKeys) {
                    const headerValue = headerData[headerKey];
                    const th = createNode('th');

                    th.id = 'cc__row-' + headerValue + sectionIndex;
                    setAttribute(th, 'scope', 'col');
                    addClassPm(th, 'table-th');

                    th.innerHTML = headerValue;
                    appendChild(trHeadFragment, th);
                }

                appendChild(trHead, trHeadFragment);
                appendChild(thead, trHead);

                /**
                 * Create table body
                 */
                const bodyFragment = dom._document.createDocumentFragment();

                for (const bodyItem of sCookieTableBody) {
                    const tr = createNode('tr');
                    addClassPm(tr, 'table-tr');

                    for (const tdKey of tableHeadersKeys) {
                        const tdHeader = headerData[tdKey];
                        const tdValue = bodyItem[tdKey];

                        const td = createNode('td');
                        const tdInner = createNode(DIV_TAG);

                        addClassPm(td, 'table-td');
                        setAttribute(td, 'data-column', tdHeader);
                        setAttribute(td, 'headers', 'cc__row-' + tdHeader + sectionIndex);

                        tdInner.insertAdjacentHTML('beforeend', tdValue);

                        appendChild(td, tdInner);
                        appendChild(tr, td);
                    }

                    appendChild(bodyFragment, tr);
                }

                appendChild(tbody, bodyFragment);
                appendChild(table, thead);
                appendChild(table, tbody);
                appendChild(sDescContainer, table);
            }
        }

        if (sIsExpandableToggle || sDescriptionData)
            appendChild(s, sDescContainer);

        const currentBody = dom._pmNewBody || dom._pmBody;

        if (hasToggle) {
            if (!sectionToggleContainer) {
                sectionToggleContainer = createNode(DIV_TAG);
                addClassPm(sectionToggleContainer, 'section-toggles');
            }
            sectionToggleContainer.appendChild(s);
        } else {
            sectionToggleContainer = null;
        }

        appendChild(currentBody, sectionToggleContainer || s);

    });

    if (acceptAllBtnData) {
        if (!dom._pmAcceptAllBtn) {
            dom._pmAcceptAllBtn = createNode(BUTTON_TAG);
            addClassPm(dom._pmAcceptAllBtn, 'btn');
            setAttribute(dom._pmAcceptAllBtn, DATA_ROLE, 'all');
            appendChild(_pmBtnGroup1, dom._pmAcceptAllBtn);
            addEvent(dom._pmAcceptAllBtn, CLICK_EVENT, () =>
                acceptHelper('all')
            );
        }

        dom._pmAcceptAllBtn.innerHTML = acceptAllBtnData;
    }

    if (acceptNecessaryBtnData) {
        if (!dom._pmAcceptNecessaryBtn) {
            dom._pmAcceptNecessaryBtn = createNode(BUTTON_TAG);
            addClassPm(dom._pmAcceptNecessaryBtn, 'btn');
            setAttribute(dom._pmAcceptNecessaryBtn, DATA_ROLE, 'necessary');
            appendChild(_pmBtnGroup1, dom._pmAcceptNecessaryBtn);
            addEvent(dom._pmAcceptNecessaryBtn, CLICK_EVENT, () =>
                acceptHelper([])
            );
        }

        dom._pmAcceptNecessaryBtn.innerHTML = acceptNecessaryBtnData;
    }

    if (savePreferencesBtnData) {
        if (!dom._pmSavePreferencesBtn) {
            dom._pmSavePreferencesBtn = createNode(BUTTON_TAG);
            addClassPm(dom._pmSavePreferencesBtn, 'btn');
            addClassPm(dom._pmSavePreferencesBtn, 'btn--secondary');
            setAttribute(dom._pmSavePreferencesBtn, DATA_ROLE, 'save');
            appendChild(_pmBtnGroup2, dom._pmSavePreferencesBtn);

            addEvent(dom._pmSavePreferencesBtn, CLICK_EVENT, () =>
                acceptHelper()
            );
        }

        dom._pmSavePreferencesBtn.innerHTML = savePreferencesBtnData;
    }

    if (dom._pmNewBody) {
        dom._pm.replaceChild(dom._pmNewBody, dom._pmBody);
        dom._pmBody = dom._pmNewBody;
    }

    guiManager(1);

    if (!state._preferencesModalExists) {
        state._preferencesModalExists = true;

        debug('CookieConsent [HTML] created', PREFERENCES_MODAL_NAME);

        fireEvent(globalObj._customEvents._onModalReady, PREFERENCES_MODAL_NAME, dom._pm);
        createMainContainer(api);
        appendChild(dom._ccMain, dom._pmContainer);
        handleFocusTrap(dom._pm);

        /**
         * Enable transition
         */
        setTimeout(() => addClass(dom._pmContainer, 'cc--anim'), 100);
    }

    getModalFocusableData(2);
};

/**
 * Generate toggle
 * @param {string} label block title
 * @param {string} value category/service
 * @param {import('../global').Category} sCurrentCategoryObject
 * @param {boolean} [isService]
 * @param {string} categoryName
 */
function createToggleLabel(label, value, sCurrentCategoryObject, isService, categoryName) {
    const state = globalObj._state;
    const dom = globalObj._dom;

    /** @type {HTMLLabelElement} */ const toggleLabel = createNode('label');
    /** @type {HTMLInputElement} */ const toggle = createNode('input');
    /** @type {HTMLSpanElement} */  const toggleIcon = createNode('span');
    /** @type {HTMLSpanElement} */  const toggleIconCircle = createNode('span');
    /** @type {HTMLSpanElement} */  const toggleLabelSpan = createNode('span');

    // each will contain 2 pseudo-elements to generate 'tick' and 'x' icons
    /** @type {HTMLSpanElement} */  const toggleOnIcon = createNode('span');
    /** @type {HTMLSpanElement} */  const toggleOffIcon = createNode('span');

    toggleOnIcon.innerHTML = getSvgIcon(1, 3);
    toggleOffIcon.innerHTML = getSvgIcon(0, 3);

    toggle.type = 'checkbox';

    addClass(toggleLabel, 'section__toggle-wrapper');
    addClass(toggle, 'section__toggle');
    addClass(toggleOnIcon, 'toggle__icon-on');
    addClass(toggleOffIcon, 'toggle__icon-off');
    addClass(toggleIcon, 'toggle__icon');
    addClass(toggleIconCircle, 'toggle__icon-circle');
    addClass(toggleLabelSpan, 'toggle__label');

    setAttribute(toggleIcon, ARIA_HIDDEN, 'true');

    if (isService) {
        addClass(toggleLabel, 'toggle-service');
        setAttribute(toggle, SCRIPT_TAG_SELECTOR, categoryName);

        // Save reference to toggles to avoid using document.querySelector later on
        dom._serviceCheckboxInputs[categoryName][value] = toggle;
    } else {
        dom._categoryCheckboxInputs[value] = toggle;
    }

    if (!isService) {
        ((value)=> {
            addEvent(toggle, CLICK_EVENT, () => {
                const categoryServicesToggles = dom._serviceCheckboxInputs[value];
                const checked = toggle.checked;
                state._enabledServices[value] = [];

                /**
                 * Enable/disable all services
                 */
                for (let serviceName in categoryServicesToggles) {
                    categoryServicesToggles[serviceName].checked = checked;
                    checked && state._enabledServices[value].push(serviceName);
                }
            });
        })(value);
    } else {
        ((categoryName) => {
            addEvent(toggle, 'change', () => {
                const categoryServicesToggles = dom._serviceCheckboxInputs[categoryName];
                const categoryToggle = dom._categoryCheckboxInputs[categoryName];

                state._enabledServices[categoryName] = [];

                for (let serviceName in categoryServicesToggles) {
                    const serviceInput = categoryServicesToggles[serviceName];

                    if (serviceInput.checked) {
                        state._enabledServices[categoryName].push(serviceInput.value);
                    }
                }

                categoryToggle.checked = state._enabledServices[categoryName].length > 0;
            });
        })(categoryName);

    }

    toggle.value = value;
    toggleLabelSpan.textContent = label.replace(/<.*>.*<\/.*>/gm, '');

    appendChild(toggleIconCircle, toggleOffIcon);
    appendChild(toggleIconCircle, toggleOnIcon);
    appendChild(toggleIcon, toggleIconCircle);

    /**
     * If consent is valid => retrieve category states from cookie
     * Otherwise use states defined in the userConfig. object
     */
    if (!state._invalidConsent) {
        if (isService) {
            const enabledServices = state._acceptedServices[categoryName];
            toggle.checked = sCurrentCategoryObject.readOnly || elContains(enabledServices, value);
        } else if (elContains(state._acceptedCategories, value)) {
            toggle.checked = true;
        }
    } else if (sCurrentCategoryObject.readOnly || sCurrentCategoryObject.enabled) {
        toggle.checked = true;
    }

    /**
     * Set toggle as readonly if true (disable checkbox)
     */
    if (sCurrentCategoryObject.readOnly) {
        toggle.disabled = true;
    }

    appendChild(toggleLabel, toggle);
    appendChild(toggleLabel, toggleIcon);
    appendChild(toggleLabel, toggleLabelSpan);

    return toggleLabel;
}

/**
 * @callback CreateMainContainer
 */

/**
 * @returns {HTMLSpanElement}
 */
const createFocusSpan = () => {
    const span = createNode('span');

    if (!globalObj._dom._focusSpan)
        globalObj._dom._focusSpan = span;

    return span;
};

/**
 * Create consent modal and append it to "cc-main" el.
 * @param {import("../global").Api} api
 * @param {CreateMainContainer} createMainContainer
 */
const createConsentModal = (api, createMainContainer) => {
    const state = globalObj._state;
    const dom = globalObj._dom;
    const {hide, showPreferences, acceptCategory} = api;

    /**
     * @type {import("../global").ConsentModalOptions}
     */
    const consentModalData = state._currentTranslation && state._currentTranslation.consentModal;

    if (!consentModalData)
        return;

    const acceptAllBtnData = consentModalData.acceptAllBtn,
        acceptNecessaryBtnData = consentModalData.acceptNecessaryBtn,
        showPreferencesBtnData = consentModalData.showPreferencesBtn,
        closeIconLabelData = consentModalData.closeIconLabel,
        footerData = consentModalData.footer,
        consentModalLabelValue = consentModalData.label,
        consentModalTitleValue = consentModalData.title;

    /**
     * @param {string|string[]} [categories]
     */
    const acceptAndHide = (categories) => {
        hide();
        acceptCategory(categories);
    };

    // Create modal if it doesn't exist
    if (!dom._cmContainer) {
        dom._cmContainer = createNode(DIV_TAG);
        dom._cm = createNode(DIV_TAG);
        dom._cmBody = createNode(DIV_TAG);
        dom._cmTexts = createNode(DIV_TAG);
        dom._cmBtns = createNode(DIV_TAG);

        addClass(dom._cmContainer, 'cm-wrapper');
        addClass(dom._cm, 'cm');
        addClassCm(dom._cmBody, 'body');
        addClassCm(dom._cmTexts, 'texts');
        addClassCm(dom._cmBtns, 'btns');

        setAttribute(dom._cm, 'role', 'dialog');
        setAttribute(dom._cm, 'aria-modal', 'true');
        setAttribute(dom._cm, ARIA_HIDDEN, 'false');
        setAttribute(dom._cm, 'aria-describedby', 'cm__desc');

        if (consentModalLabelValue)
            setAttribute(dom._cm, 'aria-label', consentModalLabelValue);
        else if (consentModalTitleValue)
            setAttribute(dom._cm, 'aria-labelledby', 'cm__title');

        const
            boxLayout = 'box',
            guiOptions = state._userConfig.guiOptions,
            consentModalOptions = guiOptions && guiOptions.consentModal,
            consentModalLayout = consentModalOptions && consentModalOptions.layout || boxLayout,
            isBoxLayout = consentModalLayout.split(' ')[0] === boxLayout;

        /**
         * Close icon-button (visible only in the 'box' layout)
         */
        if (consentModalTitleValue && closeIconLabelData && isBoxLayout) {
            if (!dom._cmCloseIconBtn) {
                dom._cmCloseIconBtn = createNode(BUTTON_TAG);
                dom._cmCloseIconBtn.innerHTML = getSvgIcon();
                addClassCm(dom._cmCloseIconBtn, 'btn');
                addClassCm(dom._cmCloseIconBtn, 'btn--close');
                addEvent(dom._cmCloseIconBtn, CLICK_EVENT, () => {
                    debug('CookieConsent [ACCEPT]: necessary');
                    acceptAndHide([]);
                });
                appendChild(dom._cmBody, dom._cmCloseIconBtn);
            }

            setAttribute(dom._cmCloseIconBtn, 'aria-label', closeIconLabelData);
        }

        appendChild(dom._cmBody, dom._cmTexts);

        if (acceptAllBtnData || acceptNecessaryBtnData || showPreferencesBtnData)
            appendChild(dom._cmBody, dom._cmBtns);

        dom._cmDivTabindex = createNode(DIV_TAG);
        setAttribute(dom._cmDivTabindex, 'tabIndex', -1);
        appendChild(dom._cm, dom._cmDivTabindex);

        appendChild(dom._cm, dom._cmBody);
        appendChild(dom._cmContainer, dom._cm);
    }

    if (consentModalTitleValue) {
        if (!dom._cmTitle) {
            dom._cmTitle = createNode('h2');
            dom._cmTitle.className = dom._cmTitle.id = 'cm__title';
            appendChild(dom._cmTexts, dom._cmTitle);
        }

        dom._cmTitle.innerHTML = consentModalTitleValue;
    }

    let description = consentModalData.description;

    if (description) {
        if (state._revisionEnabled) {
            description = description.replace(
                '{{revisionMessage}}',
                state._validRevision
                    ? ''
                    : consentModalData.revisionMessage || ''
            );
        }

        if (!dom._cmDescription) {
            dom._cmDescription = createNode('p');
            dom._cmDescription.className = dom._cmDescription.id = 'cm__desc';
            appendChild(dom._cmTexts, dom._cmDescription);
        }

        dom._cmDescription.innerHTML = description;
    }

    if (acceptAllBtnData) {
        if (!dom._cmAcceptAllBtn) {
            dom._cmAcceptAllBtn = createNode(BUTTON_TAG);
            appendChild(dom._cmAcceptAllBtn, createFocusSpan());
            addClassCm(dom._cmAcceptAllBtn, 'btn');
            setAttribute(dom._cmAcceptAllBtn, DATA_ROLE, 'all');

            addEvent(dom._cmAcceptAllBtn, CLICK_EVENT, () => {
                debug('CookieConsent [ACCEPT]: all');
                acceptAndHide('all');
            });
        }

        dom._cmAcceptAllBtn.firstElementChild.innerHTML = acceptAllBtnData;
    }

    if (acceptNecessaryBtnData) {
        if (!dom._cmAcceptNecessaryBtn) {
            dom._cmAcceptNecessaryBtn = createNode(BUTTON_TAG);
            appendChild(dom._cmAcceptNecessaryBtn, createFocusSpan());
            addClassCm(dom._cmAcceptNecessaryBtn, 'btn');
            setAttribute(dom._cmAcceptNecessaryBtn, DATA_ROLE, 'necessary');

            addEvent(dom._cmAcceptNecessaryBtn, CLICK_EVENT, () => {
                debug('CookieConsent [ACCEPT]: necessary');
                acceptAndHide([]);
            });
        }

        dom._cmAcceptNecessaryBtn.firstElementChild.innerHTML = acceptNecessaryBtnData;
    }

    if (showPreferencesBtnData) {
        if (!dom._cmShowPreferencesBtn) {
            dom._cmShowPreferencesBtn = createNode(BUTTON_TAG);
            appendChild(dom._cmShowPreferencesBtn, createFocusSpan());
            addClassCm(dom._cmShowPreferencesBtn, 'btn');
            addClassCm(dom._cmShowPreferencesBtn, 'btn--secondary');
            setAttribute(dom._cmShowPreferencesBtn, DATA_ROLE, 'show');

            addEvent(dom._cmShowPreferencesBtn, 'mouseenter', () => {
                if (!state._preferencesModalExists)
                    createPreferencesModal(api, createMainContainer);
            });
            addEvent(dom._cmShowPreferencesBtn, CLICK_EVENT, showPreferences);
        }

        dom._cmShowPreferencesBtn.firstElementChild.innerHTML = showPreferencesBtnData;
    }

    if (!dom._cmBtnGroup) {
        dom._cmBtnGroup = createNode(DIV_TAG);
        addClassCm(dom._cmBtnGroup, BTN_GROUP_CLASS);

        acceptAllBtnData && appendChild(dom._cmBtnGroup, dom._cmAcceptAllBtn);
        acceptNecessaryBtnData && appendChild(dom._cmBtnGroup, dom._cmAcceptNecessaryBtn);

        (acceptAllBtnData || acceptNecessaryBtnData) && appendChild(dom._cmBody, dom._cmBtnGroup);
        appendChild(dom._cmBtns, dom._cmBtnGroup);
    }

    if (dom._cmShowPreferencesBtn && !dom._cmBtnGroup2) {
        dom._cmBtnGroup2 = createNode(DIV_TAG);

        if ((!dom._cmAcceptNecessaryBtn || !dom._cmAcceptAllBtn)) {
            appendChild(dom._cmBtnGroup, dom._cmShowPreferencesBtn);
            addClassCm(dom._cmBtnGroup, BTN_GROUP_CLASS + '--uneven');
        }else {
            addClassCm(dom._cmBtnGroup2, BTN_GROUP_CLASS);
            appendChild(dom._cmBtnGroup2, dom._cmShowPreferencesBtn);
            appendChild(dom._cmBtns, dom._cmBtnGroup2);
        }
    }

    if (footerData) {
        if (!dom._cmFooterLinksGroup) {
            let _consentModalFooter = createNode(DIV_TAG);
            let _consentModalFooterLinks = createNode(DIV_TAG);
            dom._cmFooterLinksGroup = createNode(DIV_TAG);

            addClassCm(_consentModalFooter, 'footer');
            addClassCm(_consentModalFooterLinks, 'links');
            addClassCm(dom._cmFooterLinksGroup, 'link-group');

            appendChild(_consentModalFooterLinks, dom._cmFooterLinksGroup);
            appendChild(_consentModalFooter, _consentModalFooterLinks);
            appendChild(dom._cm, _consentModalFooter);
        }

        dom._cmFooterLinksGroup.innerHTML = footerData;
    }

    guiManager(0);

    if (!state._consentModalExists) {
        state._consentModalExists = true;

        debug('CookieConsent [HTML] created', CONSENT_MODAL_NAME);

        fireEvent(globalObj._customEvents._onModalReady, CONSENT_MODAL_NAME, dom._cm);
        createMainContainer(api);
        appendChild(dom._ccMain, dom._cmContainer);
        handleFocusTrap(dom._cm);

        /**
         * Enable transition
         */
        setTimeout(() => addClass(dom._cmContainer, 'cc--anim'), 100);
    }

    getModalFocusableData(1);

    addDataButtonListeners(dom._cmBody, api, createPreferencesModal, createMainContainer);
};

/**
 * Detect the available language. The language autodetection process prioritizes finding translations
 * for the complete language code. If translations for the complete code are unavailable, the detection
 * mechanism then resorts to searching for the language-only version.
 * Works with 'en', 'en_US' and 'en-US'.
 *
 * @param {string} languageCode - The language code to be detected.
 * @returns {?string} The detected language code, or null if not detected.
 */
const getAvailableLanguage = (languageCode) => {
    if (!isString(languageCode))
        return null;

    if (languageCode in globalObj._state._allTranslations)
        return languageCode;

    /**
     * @type {string}
     */
    let language = languageCode.slice(0, 2);

    if (language in globalObj._state._allTranslations)
        return language;

    return null;
};

/**
 * Returns the current language code
 * @returns {string}
 */
const getCurrentLanguageCode = () => {
    return globalObj._state._currentLanguageCode || globalObj._state._userConfig.language.default;
};

/**
 * Set language code
 * @param {string} newLanguageCode
 */
const setCurrentLanguageCode = (newLanguageCode) => {
    newLanguageCode && (globalObj._state._currentLanguageCode = newLanguageCode);
};

/**
 * Get current client's browser language
 * returns only the first 2 chars: en-US => en
 * @returns {string} language
 */
const getBrowserLanguageCode = () => navigator.language;

/**
 * Get the lang attribute
 * @returns lang attribute
 */
const getDocumentLanguageCode = () => document.documentElement.lang;

/**
 * Resolve the language to use.
 * @returns {string} language code
 */
const resolveCurrentLanguageCode = () =>  {
    const autoDetect = globalObj._state._userConfig.language.autoDetect;

    if (autoDetect) {
        debug('CookieConsent [LANG]: autoDetect strategy: "' + autoDetect + '"');

        const detectionStrategies = {
            browser: getBrowserLanguageCode(),
            document: getDocumentLanguageCode()
        };

        /**
         * @type {string}
         */
        const newLanguageCode = getAvailableLanguage(detectionStrategies[autoDetect]);

        if (newLanguageCode)
            return newLanguageCode;
    }

    /**
     * Use current language
     */
    return getCurrentLanguageCode();
};

/**
 * Load translation
 * @param {string | null} [desiredLanguageCode]
 */
const loadTranslationData = async (desiredLanguageCode) => {
    const state = globalObj._state;

    /**
     * @type {string}
     */
    let currentLanguageCode = getAvailableLanguage(desiredLanguageCode)
        ? desiredLanguageCode
        : getCurrentLanguageCode();

    let translationData = state._allTranslations[currentLanguageCode];

    /**
     * Fetch translation if a string or function is provided
     */
    if (isString(translationData)) {
        translationData = await fetchJson(translationData);
    } else if (isFunction(translationData)) {
        translationData = await translationData();
    }

    if (!translationData) {
        return false;
    }

    state._currentTranslation = translationData;
    setCurrentLanguageCode(currentLanguageCode);

    debug('CookieConsent [LANG]: set language: "' + currentLanguageCode + '"');

    return true;
};

/**
 * Toggle RTL class on/off based on current language
 */
const handleRtlLanguage = () => {
    let rtlLanguages = globalObj._state._userConfig.language.rtl;
    let ccMain = globalObj._dom._ccMain;

    if (rtlLanguages && ccMain) {
        if (!isArray(rtlLanguages))
            rtlLanguages = [rtlLanguages];

        elContains(rtlLanguages, globalObj._state._currentLanguageCode)
            ? addClass(ccMain, 'cc--rtl')
            : removeClass(ccMain, 'cc--rtl');
    }
};

const createMainContainer = () => {
    const dom = globalObj._dom;

    if (dom._ccMain) return;

    dom._ccMain = createNode(DIV_TAG);
    dom._ccMain.id = 'cc-main';
    dom._ccMain.setAttribute('data-nosnippet', '');

    handleRtlLanguage();

    let root = globalObj._state._userConfig.root;

    if (root && isString(root))
        root = document.querySelector(root);

    // Append main container to dom
    (root || dom._document.body).appendChild(dom._ccMain);
};

/**
 * @param {import('../global').Api} api
 */
const generateHtml = (api) => {
    addDataButtonListeners(null, api, createPreferencesModal, createMainContainer);

    if (globalObj._state._invalidConsent)
        createConsentModal(api, createMainContainer);

    if (!globalObj._config.lazyHtmlGeneration)
        createPreferencesModal(api, createMainContainer);
};

const localStorageManager = {
    /**
     * @param {string} key
     * @param {string} value
     */
    _setItem: (key, value) => {
        safeRun(() => localStorage.setItem(key, value));
    },

    /**
     * @param {string} key
     */
    _getItem: (key) => safeRun(() => localStorage.getItem(key)) || '',

    /**
     * @param {string} key
     */
    _removeItem: (key) => safeRun(() => localStorage.removeItem(key))
};

/**
 * @param {boolean} [isFirstConsent]
 */
const getCategoriesWithCookies = (isFirstConsent) => {
    const state = globalObj._state;

    const categoriesToFilter = isFirstConsent
        ? state._allCategoryNames
        : state._lastChangedCategoryNames;

    /**
     * Filter out categories with readOnly=true or don't have an autoClear object
     */
    return categoriesToFilter.filter(categoryName => {
        const currentCategoryObject = state._allDefinedCategories[categoryName];

        return !!currentCategoryObject
            && !currentCategoryObject.readOnly
            && !!currentCategoryObject.autoClear;
    });
};

/**
 * @param {string[]} allCookies
 * @param {string} cookieName
 */
const findMatchingCookies = (allCookies, cookieName) => {
    if (cookieName instanceof RegExp) {
        return allCookies.filter(cookie => cookieName.test(cookie));
    } else {
        const cookieIndex = indexOf(allCookies, cookieName);
        return cookieIndex > -1
            ? [allCookies[cookieIndex]]
            : [];
    }
};

/**
 * Delete all unused cookies
 * @param {boolean} [isFirstConsent]
 */
const autoclearCookiesHelper = (isFirstConsent) => {
    const state = globalObj._state;
    const allCookiesArray = getAllCookies();
    const categoriesToClear = getCategoriesWithCookies(isFirstConsent);

    /**
     * Clear cookies for each disabled service
     */
    for (const categoryName in state._lastChangedServices) {
        for (const serviceName of state._lastChangedServices[categoryName]) {
            const serviceCookies = state._allDefinedServices[categoryName][serviceName].cookies;
            const serviceIsDisabled = !elContains(state._acceptedServices[categoryName], serviceName);

            if (!serviceIsDisabled || !serviceCookies)
                continue;

            for (const cookieItem of serviceCookies) {
                const foundCookies = findMatchingCookies(allCookiesArray, cookieItem.name);
                eraseCookiesHelper(foundCookies, cookieItem.path, cookieItem.domain);
            }
        }
    }

    for (const currentCategoryName of categoriesToClear) {
        const category = state._allDefinedCategories[currentCategoryName];
        const autoClear = category.autoClear;
        const autoClearCookies = autoClear && autoClear.cookies || [];

        const categoryWasJustChanged = elContains(state._lastChangedCategoryNames, currentCategoryName);
        const categoryIsDisabled = !elContains(state._acceptedCategories, currentCategoryName);
        const categoryWasJustDisabled = categoryWasJustChanged && categoryIsDisabled;

        const shouldClearCookies = isFirstConsent
            ? categoryIsDisabled
            : categoryWasJustDisabled;

        if (!shouldClearCookies)
            continue;

        if (autoClear.reloadPage && categoryWasJustDisabled)
            state._reloadPage = true;

        for (const cookieItem of autoClearCookies) {
            const foundCookies = findMatchingCookies(allCookiesArray, cookieItem.name);
            eraseCookiesHelper(foundCookies, cookieItem.path, cookieItem.domain);
        }
    }
};

const saveCookiePreferences = () => {
    const state = globalObj._state;

    /**
     * Determine if categories were changed from last state (saved in the cookie)
     */
    state._lastChangedCategoryNames = globalObj._config.mode === OPT_OUT_MODE && state._invalidConsent
        ? arrayDiff(state._defaultEnabledCategories, state._acceptedCategories)
        : arrayDiff(state._acceptedCategories, state._savedCookieContent.categories);

    let categoriesWereChanged = state._lastChangedCategoryNames.length > 0;
    let servicesWereChanged = false;

    /**
     * Determine if services were changed from last state
     */
    for (const categoryName of state._allCategoryNames) {
        state._lastChangedServices[categoryName] = arrayDiff(
            state._acceptedServices[categoryName],
            state._lastEnabledServices[categoryName]
        );

        if (state._lastChangedServices[categoryName].length > 0)
            servicesWereChanged = true;
    }

    //{{START: GUI}}
    const categoryToggles = globalObj._dom._categoryCheckboxInputs;

    /**
     * If the category is accepted check checkbox,
     * otherwise uncheck it
     */
    for (const categoryName in categoryToggles) {
        categoryToggles[categoryName].checked = elContains(state._acceptedCategories, categoryName);
    }

    for (const categoryName of state._allCategoryNames) {
        const servicesToggles = globalObj._dom._serviceCheckboxInputs[categoryName];
        const enabledServices = state._acceptedServices[categoryName];

        for (const serviceName in servicesToggles) {
            const serviceInput = servicesToggles[serviceName];
            serviceInput.checked = elContains(enabledServices, serviceName);
        }
    }
    //{{END: GUI}}

    if (!state._consentTimestamp)
        state._consentTimestamp = new Date();

    if (!state._consentId)
        state._consentId = uuidv4();

    state._savedCookieContent = {
        categories: deepCopy(state._acceptedCategories),
        revision: globalObj._config.revision,
        data: state._cookieData,
        consentTimestamp: state._consentTimestamp.toISOString(),
        consentId: state._consentId,
        services: deepCopy(state._acceptedServices)
    };

    let isFirstConsent = false;
    const stateChanged = categoriesWereChanged || servicesWereChanged;

    if (state._invalidConsent || stateChanged) {
        /**
         * Set consent as valid
         */
        if (state._invalidConsent) {
            state._invalidConsent = false;
            isFirstConsent = true;
        }

        state._lastConsentTimestamp = !state._lastConsentTimestamp
            ? state._consentTimestamp
            : new Date();

        state._savedCookieContent.lastConsentTimestamp = state._lastConsentTimestamp.toISOString();

        setCookie();

        const isAutoClearEnabled = globalObj._config.autoClearCookies;
        const shouldClearCookies = isFirstConsent || stateChanged;

        if (isAutoClearEnabled && shouldClearCookies)
            autoclearCookiesHelper(isFirstConsent);

        manageExistingScripts();
    }

    if (isFirstConsent) {
        fireEvent(globalObj._customEvents._onFirstConsent);
        fireEvent(globalObj._customEvents._onConsent);

        if (globalObj._config.mode === OPT_IN_MODE)
            return;
    }

    if (stateChanged)
        fireEvent(globalObj._customEvents._onChange);

    /**
     * Reload page if needed
     */
    if (state._reloadPage) {
        state._reloadPage = false;
        location.reload();
    }
};

/**
 * Set plugin's cookie
 * @param {boolean} [useRemainingExpirationTime]
 */
const setCookie = (useRemainingExpirationTime) => {
    const { hostname, protocol } = location;
    const { name, path, domain, sameSite, useLocalStorage } = globalObj._config.cookie;

    const expiresAfterMs = useRemainingExpirationTime
        ? getRemainingExpirationTimeMS()
        : getExpiresAfterDaysValue()*86400000;

    /**
     * Expiration date
     */
    const date = new Date();
    date.setTime(date.getTime() + expiresAfterMs);

    /**
     * Store the expiration date in the cookie (in case localstorage is used)
     */

    globalObj._state._savedCookieContent.expirationTime = date.getTime();

    const value = JSON.stringify(globalObj._state._savedCookieContent);

    /**
     * Encode value (RFC compliant)
     */
    const cookieValue = encodeURIComponent(value);

    let cookieStr = name + '='
        + cookieValue
        + (expiresAfterMs !== 0 ? '; expires=' + date.toUTCString() : '')
        + '; Path=' + path
        + '; SameSite=' + sameSite;

    /**
     * Set "domain" only if hostname contains a dot (e.g domain.com)
     * to ensure that cookie works with 'localhost'
     */
    if (elContains(hostname, '.'))
        cookieStr += '; Domain=' + domain;

    if (protocol === 'https:')
        cookieStr += '; Secure';

    useLocalStorage
        ? localStorageManager._setItem(name, value)
        : document.cookie = cookieStr;

    debug('CookieConsent [SET_COOKIE]: ' + name + ':', globalObj._state._savedCookieContent);
};

/**
 * Parse cookie value using JSON.parse
 * @param {string} value
 */
const parseCookie = (value, skipDecode) => {
    /**
     * @type {import('../../types').CookieValue}
     */
    let parsedValue;

    parsedValue = safeRun(() => JSON.parse(skipDecode
        ? value
        : decodeURIComponent(value)
    ), true) || {};

    return parsedValue;
};

/**
 * Delete cookie by name & path
 * @param {string[]} cookies Array of cookie names
 * @param {string} [customPath]
 * @param {string} [customDomain]
 */
const eraseCookiesHelper = (cookies, customPath, customDomain) => {
    if (cookies.length === 0)
        return;

    const domain = customDomain || globalObj._config.cookie.domain;
    const path = customPath || globalObj._config.cookie.path;
    const isWwwSubdomain = domain.slice(0, 4) === 'www.';
    const mainDomain = isWwwSubdomain && domain.substring(4);

    /**
     * Helper function to erase cookie
     * @param {string} cookie
     * @param {string} [domain]
     */
    const erase = (cookie, domain) => {
        document.cookie = cookie + '='
            + '; path=' + path
            + (domain ? '; domain=.' + domain : '')
            + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };

    for (const cookieName of cookies) {

        /**
         * 2 attempts to erase the cookie:
         * - without domain
         * - with domain
         */
        erase(cookieName);
        erase(cookieName, domain);

        /**
         * If domain starts with 'www.',
         * also erase the cookie for the
         * main domain (without www)
         */
        if (isWwwSubdomain)
            erase(cookieName, mainDomain);

        debug('CookieConsent [AUTOCLEAR]: deleting cookie: "' + cookieName + '" path: "' + path + '" domain:', domain);
    }
};

/**
 * Get plugin cookie
 * @param {string} [customName]
 */
const getPluginCookie = (customName) => {
    const name = customName || globalObj._config.cookie.name;
    const useLocalStorage = globalObj._config.cookie.useLocalStorage;
    const valueStr = useLocalStorage
        ? localStorageManager._getItem(name)
        : getSingleCookie(name, true);
    return parseCookie(valueStr, useLocalStorage);
};

/**
 * Returns the cookie name/value, if it exists
 * @param {string} name
 * @param {boolean} getValue
 * @returns {string}
 */
const getSingleCookie = (name, getValue) => {
    const found = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');

    return found
        ? (getValue ? found.pop() : name)
        : '';
};

/**
 * Returns array with all the cookie names
 * @param {RegExp} regex
 * @returns {string[]}
 */
const getAllCookies = (regex) => {
    const allCookies = document.cookie.split(/;\s*/);

    /**
     * @type {string[]}
     */
    const cookieNames = [];

    /**
     * Save only the cookie names
     */
    for (const cookie of allCookies) {
        let name = cookie.split('=')[0];

        if (regex) {
            safeRun(() => {
                regex.test(name) && cookieNames.push(name);
            });
        } else {
            cookieNames.push(name);
        }
    }

    return cookieNames;
};

/**
 * Configure CookieConsent
 * @param {import("./global").UserConfig} userConfig
 */
const setConfig = (userConfig) => {
    const { _dom, _config, _state } = globalObj;

    const
        config = _config,
        state = _state,
        { cookie } = config,
        callbacks = globalObj._callbacks,
        userCookieConfig = userConfig.cookie,
        userCategories = userConfig.categories,
        allCategoryNames = getKeys(userCategories) || [],
        nav = navigator,
        doc = document;

    /**
     * Access the 'window' and 'document' objects
     * during execution, rather than on import
     * (avoid window/document is not defined error)
     */
    _dom._document = doc;
    //{{START: GUI}}
    _dom._htmlDom = doc.documentElement;
    //{{END: GUI}}
    cookie.domain = location.hostname;

    /**
     * Make user configuration globally available
     */
    state._userConfig = userConfig;
    state._allDefinedCategories = userCategories;
    state._allCategoryNames = allCategoryNames;

    //{{START: GUI}}
    state._allTranslations = userConfig.language.translations;
    state._disablePageInteraction = !!userConfig.disablePageInteraction;
    //{{END: GUI}}

    /**
     * Save references to callback functions
     */
    callbacks._onFirstConsent = userConfig.onFirstConsent;
    callbacks._onConsent = userConfig.onConsent;
    callbacks._onChange = userConfig.onChange;

    //{{START: GUI}}
    callbacks._onModalHide = userConfig.onModalHide;
    callbacks._onModalShow = userConfig.onModalShow;
    callbacks._onModalReady = userConfig.onModalReady;
    //{{END: GUI}}

    const {
        mode,
        //{{START: GUI}}
        autoShow,
        lazyHtmlGeneration,
        //{{END: GUI}}
        autoClearCookies,
        revision,
        manageScriptTags,
        hideFromBots,
    } = userConfig;

    if (mode === OPT_OUT_MODE)
        config.mode = mode;

    if (typeof autoClearCookies === 'boolean')
        config.autoClearCookies = autoClearCookies;

    if (typeof manageScriptTags === 'boolean')
        config.manageScriptTags = manageScriptTags;

    if (typeof revision === 'number' && revision >= 0) {
        config.revision = revision;
        state._revisionEnabled = true;
    }

    //{{START: GUI}}

    if (typeof autoShow === 'boolean')
        config.autoShow = autoShow;

    if (typeof lazyHtmlGeneration === 'boolean')
        config.lazyHtmlGeneration = lazyHtmlGeneration;

    //{{END: GUI}}

    if (hideFromBots === false)
        config.hideFromBots = false;

    if (config.hideFromBots === true && nav)
        state._botAgentDetected = (nav.userAgent && /bot|crawl|spider|slurp|teoma/i.test(nav.userAgent)) || nav.webdriver;

    if (isObject(userCookieConfig))
        config.cookie = {...cookie, ...userCookieConfig};

    debug('CookieConsent [CONFIG]: configuration:', userConfig);
    debug('CookieConsent [CONFIG]: autoClearCookies:', config.autoClearCookies);
    debug('CookieConsent [CONFIG]: revision enabled:', state._revisionEnabled);
    debug('CookieConsent [CONFIG]: manageScriptTags:', config.manageScriptTags);

    fetchCategoriesAndServices(allCategoryNames);
    retrieveScriptElements();

    //{{START: GUI}}
    setCurrentLanguageCode(resolveCurrentLanguageCode());
    //{{END: GUI}}
};

/**
 * Accept API
 * @param {string[]|string} categories - Categories to accept
 * @param {string[]} [excludedCategories]
 */
const acceptCategory = (categories, excludedCategories = []) => {
    resolveEnabledCategories(categories, excludedCategories);
    resolveEnabledServices();
    saveCookiePreferences();
};

/**
 * Returns true if cookie category is accepted
 * @param {string} category
 */
const acceptedCategory = (category) => {

    const acceptedCategories = !globalObj._state._invalidConsent
        ? globalObj._state._acceptedCategories
        : [];

    return elContains(acceptedCategories, category);
};

/**
 * Accept one or multiple services under a specific category
 * @param {string|string[]} service
 * @param {string} category
 */
const acceptService = (service, category) => {
    const { _allCategoryNames, _allDefinedServices,  } = globalObj._state;

    if (
        !service
        || !category
        || !isString(category)
        || !elContains(_allCategoryNames, category)
        || getKeys(_allDefinedServices[category]).length === 0
    ) {
        return false;
    }

    //{{START: GUI}}
    updateModalToggles(service, category);
    //{{END: GUI}}

    acceptCategory();
};

/**
 * Returns true if the service in the specified
 * category is accepted/enabled
 * @param {string} service
 * @param {string} category
 */
const acceptedService = (service, category) => {
    const acceptedServices = !globalObj._state._invalidConsent
        ? (globalObj._state._acceptedServices[category] || [])
        : [];

    return elContains(acceptedServices, service);
};

/**
 * Returns true if cookie was found and has valid value (not an empty string)
 * @param {string} cookieName
 */
const validCookie = (cookieName) => getSingleCookie(cookieName, true) !== '';

/**
 * Erase cookies API
 * @param {(string|RegExp|(string|RegExp)[])} cookies
 * @param {string} [path]
 * @param {string} [domain]
 */
const eraseCookies = (cookies, path, domain) => {
    let allCookies = [];

    /**
     * Add cookie to allCookies array if it exists
     * @param {string | RegExp} cookieName
     */
    const addCookieIfExists = (cookieName) => {
        if (isString(cookieName)) {
            let name = getSingleCookie(cookieName);
            name !== '' && allCookies.push(name);
        } else {
            allCookies.push(...getAllCookies(cookieName));
        }
    };

    if (isArray(cookies)) {
        for (let cookie of cookies) {
            addCookieIfExists(cookie);
        }
    } else {
        addCookieIfExists(cookies);
    }

    eraseCookiesHelper(allCookies, path, domain);
};

//{{START: GUI}}

/**
 * Show cookie consent modal
 * @param {boolean} [createModal] create modal if it doesn't exist
 */
const show = (createModal) => {
    const { _dom, _state } = globalObj;

    if (_state._consentModalVisible)
        return;

    if (!_state._consentModalExists) {
        if (createModal) {
            createConsentModal(miniAPI, createMainContainer);
        } else {
            return;
        }
    }

    _state._consentModalVisible = true;
    _state._lastFocusedElemBeforeModal = getActiveElement();

    if (_state._disablePageInteraction)
        toggleDisableInteraction(true);

    focusAfterTransition(_dom._cm, 1);

    addClass(_dom._htmlDom, TOGGLE_CONSENT_MODAL_CLASS);
    setAttribute(_dom._cm, ARIA_HIDDEN, 'false');

    /**
     * Set focus to consentModal
     */
    setTimeout(() => {
        focus(globalObj._dom._cmDivTabindex);
    }, 100);

    debug('CookieConsent [TOGGLE]: show consentModal');

    fireEvent(globalObj._customEvents._onModalShow, CONSENT_MODAL_NAME);
};

/**
 * Hide consent modal
 */
const hide = () => {
    const { _dom, _state, _customEvents } = globalObj;

    if (!_state._consentModalVisible)
        return;

    _state._consentModalVisible = false;

    if (_state._disablePageInteraction)
        toggleDisableInteraction();

    /**
     * Fix focus restoration to body with Chrome
     */
    focus(_dom._focusSpan, true);

    removeClass(_dom._htmlDom, TOGGLE_CONSENT_MODAL_CLASS);
    setAttribute(_dom._cm, ARIA_HIDDEN, 'true');

    /**
     * Restore focus to last focused element
     */
    focus(_state._lastFocusedElemBeforeModal);
    _state._lastFocusedElemBeforeModal = null;

    debug('CookieConsent [TOGGLE]: hide consentModal');

    fireEvent(_customEvents._onModalHide, CONSENT_MODAL_NAME);
};

/**
 * Show preferences modal
 */
const showPreferences = () => {
    const state = globalObj._state;

    if (state._preferencesModalVisible)
        return;

    if (!state._preferencesModalExists)
        createPreferencesModal(miniAPI, createMainContainer);

    state._preferencesModalVisible = true;

    // If there is no consent-modal, keep track of the last focused elem.
    if (!state._consentModalVisible) {
        state._lastFocusedElemBeforeModal = getActiveElement();
    } else {
        state._lastFocusedModalElement = getActiveElement();
    }

    focusAfterTransition(globalObj._dom._pm, 2);

    addClass(globalObj._dom._htmlDom, TOGGLE_PREFERENCES_MODAL_CLASS);
    setAttribute(globalObj._dom._pm, ARIA_HIDDEN, 'false');

    /**
     * Set focus to preferencesModal
     */
    setTimeout(() => {
        focus(globalObj._dom._pmDivTabindex);
    }, 100);

    debug('CookieConsent [TOGGLE]: show preferencesModal');

    fireEvent(globalObj._customEvents._onModalShow, PREFERENCES_MODAL_NAME);
};

/**
 * https://github.com/orestbida/cookieconsent/issues/481
 */
const discardUnsavedPreferences = () => {
    const consentIsValid = validConsent();
    const allDefinedCategories = globalObj._state._allDefinedCategories;
    const categoryInputs = globalObj._dom._categoryCheckboxInputs;
    const serviceInputs = globalObj._dom._serviceCheckboxInputs;

    /**
     * @param {string} category
     */
    const categoryEnabledByDefault = (category) => elContains(globalObj._state._defaultEnabledCategories, category);

    for (const category in categoryInputs) {
        const isReadOnly = !!allDefinedCategories[category].readOnly;

        categoryInputs[category].checked = isReadOnly || (consentIsValid
            ? acceptedCategory(category)
            : categoryEnabledByDefault(category)
        );

        for (const service in serviceInputs[category]) {
            serviceInputs[category][service].checked = isReadOnly || (consentIsValid
                ? acceptedService(service, category)
                : categoryEnabledByDefault(category)
            );
        }
    }
};

/**
 * Hide preferences modal
 */
const hidePreferences = () => {
    const state = globalObj._state;

    if (!state._preferencesModalVisible)
        return;

    state._preferencesModalVisible = false;

    discardUnsavedPreferences();

    /**
     * Fix focus restoration to body with Chrome
     */
    focus(globalObj._dom._pmFocusSpan, true);

    removeClass(globalObj._dom._htmlDom, TOGGLE_PREFERENCES_MODAL_CLASS);
    setAttribute(globalObj._dom._pm, ARIA_HIDDEN, 'true');

    /**
     * If consent modal is visible, focus him (instead of page document)
     */
    if (state._consentModalVisible) {
        focus(state._lastFocusedModalElement);
        state._lastFocusedModalElement = null;
    } else {
        /**
         * Restore focus to last page element which had focus before modal opening
         */
        focus(state._lastFocusedElemBeforeModal);
        state._lastFocusedElemBeforeModal = null;
    }

    debug('CookieConsent [TOGGLE]: hide preferencesModal');

    fireEvent(globalObj._customEvents._onModalHide, PREFERENCES_MODAL_NAME);
};

var miniAPI = {
    show,
    hide,
    showPreferences,
    hidePreferences,
    acceptCategory
};

/**
 * Update/change modal's language
 * @param {string} lang new language
 * @param {boolean} [forceUpdate] update language fields forcefully
 * @returns {Promise<boolean>}
 */
const setLanguage = async (newLanguageCode, forceUpdate) => {
    if (!getAvailableLanguage(newLanguageCode))
        return false;

    const state = globalObj._state;

    /**
     * Set language only if it differs from current
     */
    if (newLanguageCode !== getCurrentLanguageCode() || forceUpdate === true) {

        const loaded = await loadTranslationData(newLanguageCode);

        if (!loaded)
            return false;

        setCurrentLanguageCode(newLanguageCode);

        if (state._consentModalExists)
            createConsentModal(miniAPI, createMainContainer);

        if (state._preferencesModalExists)
            createPreferencesModal(miniAPI, createMainContainer);

        handleRtlLanguage();

        return true;
    }

    return false;
};

//{{END: GUI}}

/**
 * Retrieve current user preferences (summary)
 * @returns {import("./global").UserPreferences}
 */
const getUserPreferences = () => {
    const { _acceptType, _acceptedServices } = globalObj._state;
    const { accepted, rejected } = getCurrentCategoriesState();

    return deepCopy({
        acceptType: _acceptType,
        acceptedCategories: accepted,
        rejectedCategories: rejected,
        acceptedServices: _acceptedServices,
        rejectedServices: retrieveRejectedServices()
    });
};

/**
 * Dynamically load script (append to head)
 * @param {string} src
 * @param {{[key: string]: string}} [attrs] Custom attributes
 * @returns {Promise<boolean>} promise
 */
const loadScript = (src, attrs) => {
    /**
     * @type {HTMLScriptElement}
     */
    let script = document.querySelector('script[src="' + src + '"]');

    return new Promise((resolve) => {
        if (script)
            return resolve(true);

        script = createNode('script');

        /**
         * Add custom attributes
         */
        if (isObject(attrs)) {
            for (const key in attrs) {
                setAttribute(script, key, attrs[key]);
            }
        }

        script.onload = () => resolve(true);
        script.onerror = () => {
            /**
             * Remove script from dom if error is thrown
             */
            script.remove();
            resolve(false);
        };

        script.src = src;

        appendChild(document.head, script);
    });
};

/**
 * Save custom data inside cookie
 * @param {{
 *  value: any,
 *  mode: string
 * }} props
 * @returns {boolean}
 */
const setCookieData = (props) => {
    let newData = props.value,
        mode = props.mode,
        set = false,
        cookieData;

    const state = globalObj._state;

    /**
     * If mode is 'update':
     * add/update only the specified props.
     */
    if (mode === 'update') {
        state._cookieData = cookieData = getCookie('data');
        const sameType = typeof cookieData === typeof newData;

        if (sameType && typeof cookieData === 'object') {
            !cookieData && (cookieData = {});

            for (let prop in newData) {
                if (cookieData[prop] !== newData[prop]) {
                    cookieData[prop] = newData[prop];
                    set = true;
                }
            }
        } else if ((sameType || !cookieData) && cookieData !== newData) {
            cookieData = newData;
            set = true;
        }
    } else {
        cookieData = newData;
        set = true;
    }

    if (set) {
        state._cookieData = cookieData;
        state._savedCookieContent.data = cookieData;
        setCookie(true);
    }

    return set;
};

/**
 * Retrieve data from existing cookie
 * @param {string} field
 * @param {string} [cookieName]
 * @returns {any}
 */
const getCookie = (field, cookieName) => {
    const cookie = getPluginCookie(cookieName);

    return field
        ? cookie[field]
        : cookie;
};

/**
 * Return configuration object or just one of its fields.
 * @param {string} field
 * @returns {any}
 */
const getConfig = (field) => {
    const config = globalObj._config;
    const userConfig = globalObj._state._userConfig;

    return field
        ? config[field] || userConfig[field]
        : {...config, ...userConfig, cookie:{...config.cookie}};
};

/**
 * Returns true if consent is valid
 * @returns {boolean}
 */
const validConsent = () => !globalObj._state._invalidConsent;

const retrieveState = () => {
    const state = globalObj._state;
    const config = globalObj._config;

    const cookieValue = getPluginCookie();

    const {
        categories,
        services,
        consentId,
        consentTimestamp,
        lastConsentTimestamp,
        data,
        revision
    } = cookieValue;

    const validCategories = isArray(categories);

    state._savedCookieContent = cookieValue;
    state._consentId = consentId;

    // If "_consentId" is present => assume that consent was previously given
    const validConsentId = !!consentId && isString(consentId);

    // Retrieve "_consentTimestamp"
    state._consentTimestamp = consentTimestamp;
    state._consentTimestamp && (state._consentTimestamp = new Date(consentTimestamp));

    // Retrieve "_lastConsentTimestamp"
    state._lastConsentTimestamp = lastConsentTimestamp;
    state._lastConsentTimestamp && (state._lastConsentTimestamp = new Date(lastConsentTimestamp));

    // Retrieve "data"
    state._cookieData = typeof data !== 'undefined'
        ? data
        : null;

    // If revision is enabled and current value !== saved value inside the cookie => revision is not valid
    if (state._revisionEnabled && validConsentId && revision !== config.revision)
        state._validRevision = false;

    state._invalidConsent = !validConsentId
        || !state._validRevision
        || !state._consentTimestamp
        || !state._lastConsentTimestamp
        || !validCategories;

    /**
     * If localStorage is enabled, also check the stored `expirationTime`
     */
    if (config.cookie.useLocalStorage && !state._invalidConsent) {
        state._invalidConsent = new Date().getTime() > (cookieValue.expirationTime || 0);
        state._invalidConsent && (localStorageManager._removeItem(config.cookie.name));
    }

    debug('CookieConsent [STATUS] valid consent:', !state._invalidConsent);
    retrieveEnabledCategoriesAndServices();

    /**
     * Retrieve last accepted categories from cookie
     * and calculate acceptType
     */
    if (!state._invalidConsent) {
        state._enabledServices = {...state._acceptedServices};

        state._acceptedServices = {
            ...state._acceptedServices,
            ...services
        };

        setAcceptedCategories([
            ...state._readOnlyCategories,
            ...categories
        ]);
    } else {
        if (config.mode === OPT_OUT_MODE) {
            state._acceptedCategories = [
                ...state._defaultEnabledCategories
            ];
        }
    }
};

/**
 * Will run once and only if modals do not exist.
 * @param {import("./global").UserConfig} userConfig
 */
const run = async (userConfig) => {
    const {
        _state,
        _config,
        _customEvents
    } = globalObj;

    const win = window;

    if (!win._ccRun) {
        win._ccRun = true;

        setConfig(userConfig);

        if (_state._botAgentDetected)
            return;

        retrieveState();

        const consentIsValid = validConsent();

        //{{START: GUI}}
        const translationLoaded = await loadTranslationData();

        if (!translationLoaded)
            return false;

        generateHtml(miniAPI);

        if (_config.autoShow && !consentIsValid)
            show(true);
        //{{END: GUI}}

        if (consentIsValid) {
            manageExistingScripts();
            return fireEvent(_customEvents._onConsent);
        }

        if (_config.mode === OPT_OUT_MODE)
            manageExistingScripts(_state._defaultEnabledCategories);
    }
};

/**
 * Reset cookieconsent.
 * @param {boolean} [deleteCookie] Delete plugin's cookie
 */
const reset = (deleteCookie) => {
    //{{START: GUI}}
    const { _ccMain, _htmlDom } = globalObj._dom;
    //{{END: GUI}}

    const { name, path, domain, useLocalStorage } = globalObj._config.cookie;

    if (deleteCookie) {
        useLocalStorage
            ? localStorageManager._removeItem(name)
            : eraseCookies(name, path, domain);
    }

    /**
     * Remove data-cc event listeners
     */
    for (const {_element, _event, _listener} of globalObj._state._dataEventListeners) {
        _element.removeEventListener(_event, _listener);
    }

    //{{START: GUI}}
    /**
     * Remove main container from DOM
     */
    _ccMain && _ccMain.remove();

    /**
     * Remove any remaining classes
     */
    _htmlDom && _htmlDom.classList.remove(
        TOGGLE_DISABLE_INTERACTION_CLASS,
        TOGGLE_PREFERENCES_MODAL_CLASS,
        TOGGLE_CONSENT_MODAL_CLASS
    );
    //{{END: GUI}}

    const newGlobal = new GlobalState();

    /**
     * Reset all global state props.
     */
    for (const key in globalObj) {
        globalObj[key] = newGlobal[key];
    }

    window._ccRun = false;
};

export { acceptCategory, acceptService, acceptedCategory, acceptedService, eraseCookies, getConfig, getCookie, getUserPreferences, hide, hidePreferences, loadScript, reset, run, setCookieData, setLanguage, show, showPreferences, validConsent, validCookie };
