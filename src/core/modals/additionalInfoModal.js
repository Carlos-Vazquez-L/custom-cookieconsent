import { globalObj } from '../global';
import {
    createNode,
    addClass,
    addClassPm,
    setAttribute,
    removeClass,
    addEvent,
    appendChild,
    getKeys,
    hasClass,
    elContains,
    getModalFocusableData,
    isString,
    isObject,
    fireEvent,
    getSvgIcon,
    handleFocusTrap,
    debug
} from '../../utils/general';

import { guiManager } from '../../utils/gui-manager';
import {
    ADDITIONAL_INFO_MODAL_NAME,
    SCRIPT_TAG_SELECTOR,
    DIV_TAG,
    ARIA_HIDDEN,
    BUTTON_TAG,
    BTN_GROUP_CLASS,
    CLICK_EVENT,
    DATA_ROLE,
} from '../../utils/constants';

/**
 * @callback CreateMainContainer
 */

/**
 * Generates preferences modal and appends it to "cc-main" el.
 * @param {import("../global").Api} api
 * @param {CreateMainContainer} createMainContainer
 */
export const createAdditionalInfoModal = (api, createMainContainer) => {
    const state = globalObj._state;
    const dom = globalObj._dom;
    const {hide, hideAdditionalInfo, acceptCategory} = api;

    /**
     * @param {string|string[]} [categories]
     */
    const acceptHelper = (categories) => {
        acceptCategory(categories);
        hideAdditionalInfo();
        hide();
    };

    /**
     * @type {import("../global").AdditionalInfoModalOptions}
     */
    const modalData = state._currentTranslation && state._currentTranslation.additionalInfoModal;

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

    if (!dom._aimContainer) {
        dom._aimContainer = createNode(DIV_TAG);
        addClass(dom._aimContainer, 'pm-wrapper');

        const pmOverlay = createNode('div');
        addClass(pmOverlay, 'pm-overlay');
        appendChild(dom._aimContainer, pmOverlay);

        /**
         * Hide modal when overlay is clicked
         */
        addEvent(pmOverlay, CLICK_EVENT, hideAdditionalInfo);

        // Additional Info modal
        dom._aim = createNode(DIV_TAG);

        addClass(dom._aim, 'pm');
        setAttribute(dom._aim, 'role', 'dialog');
        setAttribute(dom._aim, ARIA_HIDDEN, true);
        setAttribute(dom._aim, 'aria-modal', true);
        setAttribute(dom._aim, 'aria-labelledby', 'pm__title');

        // Hide additional info on 'esc' key press
        addEvent(dom._htmlDom, 'keydown', (event) => {
            if (event.keyCode === 27)
                hideAdditionalInfo();
        }, true);

        dom._aimHeader = createNode(DIV_TAG);
        addClassPm(dom._aimHeader, 'header');

        dom._aimTitle = createNode('h2');
        addClassPm(dom._aimTitle, 'title');
        dom._aimTitle.id = 'pm__title';

        dom._aimCloseBtn = createNode(BUTTON_TAG);
        addClassPm(dom._aimCloseBtn, 'close-btn');
        setAttribute(dom._aimCloseBtn, 'aria-label', modalData.closeIconLabel || '');
        addEvent(dom._aimCloseBtn, CLICK_EVENT, hideAdditionalInfo);

        dom._aimFocusSpan = createNode('span');
        dom._aimFocusSpan.innerHTML = getSvgIcon();
        appendChild(dom._aimCloseBtn, dom._aimFocusSpan);

        dom._aimBody = createNode(DIV_TAG);
        addClassPm(dom._aimBody, 'body');

        dom._aimFooter = createNode(DIV_TAG);
        addClassPm(dom._aimFooter, 'footer');

        var _aimBtnContainer = createNode(DIV_TAG);
        addClass(_aimBtnContainer, 'btns');

        var _aimBtnGroup1 = createNode(DIV_TAG);
        var _aimBtnGroup2 = createNode(DIV_TAG);
        addClassPm(_aimBtnGroup1, BTN_GROUP_CLASS);
        addClassPm(_aimBtnGroup2, BTN_GROUP_CLASS);

        appendChild(dom._aimFooter, _aimBtnGroup1);
        appendChild(dom._aimFooter, _aimBtnGroup2);

        appendChild(dom._aimHeader, dom._aimTitle);
        appendChild(dom._aimHeader, dom._aimCloseBtn);

        dom._aimDivTabindex = createNode(DIV_TAG);
        setAttribute(dom._aimDivTabindex, 'tabIndex', -1);
        appendChild(dom._aim, dom._aimDivTabindex);

        appendChild(dom._aim, dom._aimHeader);
        appendChild(dom._aim, dom._aimBody);

        createFooter && appendChild(dom._aim, dom._aimFooter);

        appendChild(dom._aimContainer, dom._aim);
    } else {
        dom._aimNewBody = createNode(DIV_TAG);
        addClassPm(dom._aimNewBody, 'body');
    }

    if (titleData) {
        dom._aimTitle.innerHTML = titleData;
        closeIconLabelData && setAttribute(dom._aimCloseBtn, 'aria-label', closeIconLabelData);
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

        const currentBody = dom._aimNewBody || dom._aimBody;

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

    if (acceptAllBtnData && acceptAllBtnData !== '') {
        if (!dom._aimAcceptAllBtn) {
            dom._aimAcceptAllBtn = createNode(BUTTON_TAG);
            addClassPm(dom._aimAcceptAllBtn, 'btn');
            setAttribute(dom._aimAcceptAllBtn, DATA_ROLE, 'all');
            appendChild(_aimBtnGroup1, dom._aimAcceptAllBtn);
            addEvent(dom._aimAcceptAllBtn, CLICK_EVENT, () =>
                acceptHelper('all')
            );
        }

        dom._aimAcceptAllBtn.innerHTML = acceptAllBtnData;
    }

    if (acceptNecessaryBtnData && acceptNecessaryBtnData !== '') {
        if (!dom._aimAcceptNecessaryBtn) {
            dom._aimAcceptNecessaryBtn = createNode(BUTTON_TAG);
            addClassPm(dom._aimAcceptNecessaryBtn, 'btn');
            setAttribute(dom._aimAcceptNecessaryBtn, DATA_ROLE, 'necessary');
            appendChild(_aimBtnGroup1, dom._aimAcceptNecessaryBtn);
            addEvent(dom._aimAcceptNecessaryBtn, CLICK_EVENT, () =>
                acceptHelper([])
            );
        }

        dom._aimAcceptNecessaryBtn.innerHTML = acceptNecessaryBtnData;
    }

    if (savePreferencesBtnData && savePreferencesBtnData !== '') {
        if (!dom._aimSavePreferencesBtn) {
            dom._aimSavePreferencesBtn = createNode(BUTTON_TAG);
            addClassPm(dom._aimSavePreferencesBtn, 'btn');
            addClassPm(dom._aimSavePreferencesBtn, 'btn--secondary');
            setAttribute(dom._aimSavePreferencesBtn, DATA_ROLE, 'save');
            appendChild(_aimBtnGroup2, dom._aimSavePreferencesBtn);

            addEvent(dom._aimSavePreferencesBtn, CLICK_EVENT, () =>
                acceptHelper()
            );
        }

        dom._aimSavePreferencesBtn.innerHTML = savePreferencesBtnData;
    }

    if (dom._aimNewBody) {
        dom._aim.replaceChild(dom._aimNewBody, dom._aimBody);
        dom._aimBody = dom._aimNewBody;
    }

    guiManager(1);

    if (!state._additionalInfoModalExists) {
        state._additionalInfoModalExists = true;

        debug('CookieConsent [HTML] created', ADDITIONAL_INFO_MODAL_NAME);

        fireEvent(globalObj._customEvents._onModalReady, ADDITIONAL_INFO_MODAL_NAME, dom._aim);
        createMainContainer(api);
        appendChild(dom._ccMain, dom._aimContainer);
        handleFocusTrap(dom._aim);

        /**
         * Enable transition
         */
        setTimeout(() => addClass(dom._aimContainer, 'cc--anim'), 100);
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