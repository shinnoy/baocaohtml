/*
 *
 */
/* file: cwc-Extjs-Init-Common.js */
var topCwc = top.cwc;
Ext.BLANK_IMAGE_URL = topCwc.frameworkContext + "/js/" + topCwc.appResourceVersion + "/extjs/resources/images/default/s.gif";
Ext.SSL_SECURE_URL = Ext.BLANK_IMAGE_URL;
Ext.useShims = true;
Ext.MessageBox.buttonText = {
    cancel: topCwc.EXT_MESSAGEBOX_BUTTONTEXT_CANCEL,
    no: topCwc.EXT_MESSAGEBOX_BUTTONTEXT_NO,
    ok: topCwc.EXT_MESSAGEBOX_BUTTONTEXT_OK,
    yes: topCwc.EXT_MESSAGEBOX_BUTTONTEXT_YES
};
Ext.lib.Dom.getViewportHeight = function() {
    return Ext.isStrict ? document.documentElement.clientHeight : document.body.clientHeight;
};
Ext.lib.Dom.getViewportWidth = function() {
    return Ext.isStrict ? document.documentElement.clientWidth : document.body.clientWidth;
};
Ext.override(Ext.Element, function() {
    var opacityRe = /alpha\(opacity=(.*)\)/i,
        trimRe = /^\s+|\s+$/g;
    return {
        setOpacity: function(opacity, animate) {
            var me = this,
                s = me.dom.style;
            if (!animate || !me.anim) {
                if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
                    var opac = opacity < 1 ? "alpha(opacity=" + opacity * 100 + ")" : "",
                        val = s.filter.replace(opacityRe, "").replace(trimRe, "");
                    s.zoom = 1;
                    s.filter = val + (val.length > 0 ? " " : "") + opac;
                } else {
                    s.opacity = opacity;
                }
            } else {
                me.anim({
                    opacity: {
                        to: opacity
                    }
                }, me.preanim(arguments, 1), null, 0.35, "easeIn");
            }
            return me;
        },
        clearOpacity: function() {
            var style = this.dom.style;
            if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
                if (!Ext.isEmpty(style.filter)) {
                    style.filter = style.filter.replace(opacityRe, "").replace(trimRe, "");
                }
            } else {
                style.opacity = style["-moz-opacity"] = style["-khtml-opacity"] = "";
            }
            return this;
        },
        createShim: function() {
            var el = document.createElement("iframe"),
                shim;
            el.frameBorder = "0";
            el.className = "ext-shim";
            el.src = Ext.SSL_SECURE_URL;
            el.title = topCwc.MSG_EMPTY;
            el.lang = topCwc.userLanguage;
            shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
            shim.autoBoxAdjust = false;
            return shim;
        }
    };
}());
if (Ext.isIE && !Array.indexOf) {
    Array.prototype.indexOf = function(obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    };
}
Ext.Layer.prototype.hideAction = function() {
    this.visible = false;
    if (this.useDisplay === true) {
        this.setDisplayed(false);
    } else {
        this.setLeftTop(0, -10000);
    }
};
Ext.Button.prototype.onDisableOrig = Ext.Button.prototype.onDisable;
Ext.Button.prototype.onEnableOrig = Ext.Button.prototype.onEnable;
Ext.override(Ext.Button.prototype, {
    onDisable: function() {
        Ext.Button.prototype.onDisableOrig.call(this);
        this.btnEl.dom.setAttribute("disabled", "disabled");
        this.btnEl.dom.setAttribute("aria-disabled", "true");
    },
    onEnable: function() {
        Ext.Button.prototype.onEnableOrig.call(this);
        this.btnEl.dom.removeAttribute("disabled");
        this.btnEl.dom.setAttribute("aria-disabled", "false");
    }
});
Ext.Button.buttonTemplate = new Ext.Template('<table id="{4}" cellspacing="0" class="x-btn ltr {3}"><tbody class="{1}">', '<tr><td class="x-btn-tl"><span>&#160;</span></td><td class="x-btn-tc"></td><td class="x-btn-tr"><span>&#160;</span></td></tr>', '<tr><td class="x-btn-ml"><span>&#160;</span></td><td class="x-btn-mc ' + (topCwc.getDirectionClass ? topCwc.getDirectionClass() : topCwc.directionClass) + '"><em class="{2} x-unselectable" unselectable="on"><button type="{0}"></button></em></td><td class="x-btn-mr"><span>&#160;</span></td></tr>', '<tr><td class="x-btn-bl"><span>&#160;</span></td><td class="x-btn-bc"></td><td class="x-btn-br"><span>&#160;</span></td></tr>', "</tbody></table>");
Ext.Button.buttonTemplate.compile();
Ext.override(Ext.util.ClickRepeater, {
    enable: function() {
        if (this.disabled) {
            this.el.on("mousedown", this.handleMouseDown, this);
            if (Ext.isIE && !(Ext.isIE10p || (Ext.isStrict && Ext.isIE9))) {
                this.el.on("dblclick", this.handleDblClick, this);
            }
            if (this.preventDefault || this.stopDefault) {
                this.el.on("click", this.eventOptions, this);
            }
        }
        this.disabled = false;
    }
});
Ext.override(Ext.ToolTip, {
    initTarget: function(target) {
        var t;
        if ((t = Ext.get(target))) {
            if (this.target) {
                var tg = Ext.get(this.target);
                this.mun(tg, "keydown", this.onEscDown, this);
                this.mun(tg, "mouseover", this.onTargetOver, this);
                this.mun(tg, "mouseout", this.onTargetOut, this);
                this.mun(tg, "mousemove", this.onMouseMove, this);
            }
            this.mon(t, {
                keydown: this.onEscDown,
                mouseover: this.onTargetOver,
                mouseout: this.onTargetOut,
                mousemove: this.onMouseMove,
                scope: this
            });
            this.target = t;
        }
        if (this.anchor) {
            this.anchorTarget = this.target;
        }
    },
    onEscDown: function(e) {
        if (e.getKey() === e.ESC) {
            this.hide();
        }
    }
});
if (topCwc.isRTL) {
    Ext.override(Ext.menu.Menu, {
        subMenuAlign: "tr-tl?",
        cls: "rtl"
    });
    Ext.override(Ext.Button, {
        menuAlign: "tr-br?"
    });
    ! function() {
        var collapseMenu = Ext.menu.MenuNav.prototype.left,
            expandMenu = Ext.menu.MenuNav.prototype.right;
        Ext.override(Ext.menu.MenuNav, {
            left: function(e, m) {
                expandMenu.call(this, e, m);
            },
            right: function(e, m) {
                collapseMenu.call(this, e, m);
            }
        });
    }();
}
if (topCwc.isLegacyEdge) {
    Ext.onReady(function() {
        Ext.getBody().addClass("legacy-edge");
    });
    /* file: cwc-Extjs-Init.js */
}
if (!top.cwc.ux.NavBranch) {
    top.cwc.ux.NavBranch = Ext.data.Record.create([{
        name: "aggregatedNode",
        mapping: "@aggregatedNode"
    }, {
        name: "canExpand",
        mapping: "@canExpand"
    }, {
        name: "class",
        mapping: "@class"
    }, {
        name: "context",
        mapping: "@context"
    }, {
        name: "expandOnLoad",
        mapping: "@expandOnLoad"
    }, {
        name: "id",
        mapping: "@id"
    }, {
        name: "genUrl",
        mapping: "@genUrl"
    }, {
        name: "label",
        mapping: "@label"
    }, {
        name: "canDelete",
        mapping: "@canDelete"
    }, {
        name: "canPaste",
        mapping: "@canPaste"
    }, {
        name: "editurl",
        mapping: "@editurl"
    }, {
        name: "evalClientUrl",
        mapping: "@evalClientUrl"
    }, {
        name: "loadChildren",
        mapping: "@loadChildren"
    }, {
        name: "tip",
        mapping: "@tip"
    }, {
        name: "url",
        mapping: "@url"
    }]);
}

function hackExtIdPrefix(scope, prefix) {
    var ext = scope.Ext;
    if (ext && ext.id && !ext.id.modified) {
        var defaultIdGen = ext.id;
        ext.id = function(el, idPrefix) {
            return defaultIdGen(el, idPrefix || prefix);
        };
        ext.id.modified = true;
    }
}
hackExtIdPrefix(window, "ext-gen-top");
Ext.Panel.prototype.toggleClosable = function() {
    if (this.tabEl) {
        this.closable = (!this.closable || this.closable == false);
        Ext.get(this.tabEl).toggleClass("x-tab-strip-closable");
    }
};
Ext.Panel.prototype.isClosable = function() {
    return this.closable;
};
Ext.Component.AUTO_ID = Ext.Component.AUTO_ID + Math.floor(Math.random() * 1000001);
Ext.tree.TreeEventModel.prototype.delegateClick = function(e, t) {
    if (this.beforeEvent(e)) {
        if (e.getTarget("input[type=checkbox]", 1) || e.getTarget("label", 1)) {
            this.onCheckboxClick(e, this.getNode(e));
        } else {
            if (e.getTarget(".x-tree-ec-icon", 1) || e.getTarget("span.x-tree-node-indent", 1)) {
                this.onIconClick(e, this.getNode(e));
            } else {
                if (this.getNodeTarget(e)) {
                    this.onNodeClick(e, this.getNode(e));
                }
            }
        }
    } else {
        this.checkContainerEvent(e, "click");
    }
};
Ext.tree.TreeEventModel.prototype.delegateOver = function(e, t) {
    if (!this.beforeEvent(e)) {
        return;
    }
    if (Ext.isGecko && !this.trackingDoc) {
        Ext.getBody().on("mouseover", this.trackExit, this);
        this.trackingDoc = true;
    }
    if (this.lastEcOver) {
        this.onIconOut(e, this.lastEcOver);
        delete this.lastEcOver;
    }
    if (e.getTarget(".x-tree-ec-icon", 1) || e.getTarget("span.x-tree-node-indent", 1)) {
        this.lastEcOver = this.getNode(e);
        this.onIconOver(e, this.lastEcOver);
    }
    if (t = this.getNodeTarget(e)) {
        this.onNodeOver(e, this.getNode(e));
    }
};
if (cwc.isRTL) {
    Ext.override(Ext.tree.DefaultSelectionModel, {
        onKeyDown: function(e) {
            var s = this.selNode || this.lastSelNode;
            var sm = this;
            if (!s) {
                return;
            }
            var k = e.getKey();
            switch (k) {
                case e.DOWN:
                    e.stopEvent();
                    this.selectNext();
                    break;
                case e.UP:
                    e.stopEvent();
                    this.selectPrevious();
                    break;
                case e.LEFT:
                    e.preventDefault();
                    if (s.hasChildNodes()) {
                        if (!s.isExpanded()) {
                            s.expand();
                        } else {
                            if (s.firstChild) {
                                this.select(s.firstChild, e);
                            }
                        }
                    }
                    break;
                case e.RIGHT:
                    e.preventDefault();
                    if (s.hasChildNodes() && s.isExpanded()) {
                        s.collapse();
                    } else {
                        if (s.parentNode && (this.tree.rootVisible || s.parentNode != this.tree.getRootNode())) {
                            this.select(s.parentNode, e);
                        }
                    }
                    break;
            }
        }
    });
    /* file: cwc-base.js */
}
if (!window.Ext) {
    alert("ExtJS is missing.");
}
if (window.Ext && (!Ext.elCache || parseInt(Ext.version.replace(/\./g, ""), 10) < 311)) {
    alert("ExtJS version " + Ext.version + " is not supported.");
}
if (!window.cwc) {
    window.cwc = {};
}
Ext.apply(window.cwc, {
    isFrameworkRoot: true,
    windows: [],
    sysWndws: {}
});
if (!cwc.beepAudioElement) {
    try {
        cwc.beepAudioElement = document.createElement("audio");
        cwc.beepAudioElement.setAttribute("id", "tpz_beep");
        cwc.beepAudioElement.setAttribute("preload", "none");
        cwc.beepAudioElement.innerHTML = '<source src="ext/audios/beep.mp3" type="audio/mpeg"/>';
    } catch (e) {
        console.log('Browser does not support "Audio Element"!');
    }
}
cwc.initConstants = function(scope) {
    Ext.apply(scope, {
        isStrict: Ext.isStrict,
        isSecure: Ext.isSecure,
        isOpera: Ext.isOpera,
        isChrome: Ext.isChrome,
        isSafari: Ext.isSafari,
        isSafari3: Ext.isSafari3,
        isSafari2: Ext.isSafari && !Ext.isSafari3,
        isIE: Ext.isIE,
        isIE6: Ext.isIE && !Ext.isIE7 && !Ext.isIE8,
        isIE7: Ext.isIE7,
        isIE8: Ext.isIE8,
        isIE9: navigator.userAgent.indexOf("Trident/5") > -1,
        isIE10: navigator.userAgent.indexOf("Trident/6") > -1,
        isIE11: navigator.userAgent.indexOf("Trident/7") > -1,
        isLegacyEdge: navigator.userAgent.indexOf("Edge/") > -1,
        isEdge: navigator.userAgent.indexOf("Edg/") > -1,
        isGecko: Ext.isGecko,
        isGecko2: Ext.isGecko && !Ext.isGecko3,
        isGecko3: Ext.isGecko3,
        isBorderBox: Ext.isBorderBox,
        isLinux: Ext.isLinux,
        isWindows: Ext.isWindows,
        isMac: Ext.isMac,
        isAir: Ext.isAir,
        blockKeyCodeArr: [],
        blockKeyCodesDuringMask: [13, 16, 17, 18],
        mastHeadId: "cwcMastHead",
        centerPanelId: "cwcCenterPanel",
        rightPanelId: "cwcRightPanel",
        gsMainSearchWinId: "gsMainSearchWin",
        gsQuickSearchPanelId: "gsQuickSearchPanel",
        smartSearchContainerId: "smartSearchContainer",
        chatWinContainerId: "chatWinContainer",
        detailFrameId: "cwcDetailFrame",
        northPanelId: "north-panel",
        westPanelId: "west-panel",
        listFrameId: "cwcListFrame",
        navId: "cwcAccordionNav",
        favMgrId: "cwcFavMgrPanel",
        navPanelId: "cwcNavPanel",
        navToolBarId: "cwcNavToolBar",
        favMgrTreeId: "cwcFavMgrTreeId",
        favAddFolderChartId: "cwcAddFolderChart",
        favManage: "cwcFavManage",
        favRefresh: "cwcFavRefresh",
        btnFavShowFavorites: "cwcBtnFavShowFavorites",
        btnFavSep: "cwcBtnFavSep",
        btnFavMore: "cwcBtnFavMore",
        btnFavMoveTo: "cwcBtnFavMoveTo",
        btnFavCopyTo: "cwcBtnFavCopyTo",
        btnFavDelete: "cwcBtnFavDelete",
        btnFavNewFolder: "cwcBtnFavNewFolder",
        btnFavNewChart: "cwcBtnFavNewChart",
        btnToggleRecordList: "cwcBtnToggleRecordList",
        btnExpand: "cwcBtnExpand",
        allowHideTabCloseBtn: false,
        maskCloserId: "x-cwcMaskCloseBtn",
        showMaskCloseButtonOnErrorDelay: 15,
        maskStartTime: null,
        lastErrorTimeDuringMask: null,
        isLoadingList: false,
        isLoadingDetail: false,
        messageBoxShown: false,
        maskMessageShadow: null,
        maskForever: false,
        debugMask: false,
        specialTabPages: ["dashboard.do", "report.do", "reportViewer.jsp", "diagram.jsp", "fullCalendar.jsp", "chMTaskEditor.jsp", "workflowEditor.jsp", "workflowList.jsp", "scorecard.do"],
        onePx: cwc.isAccessibleMode ? 1 / 16 : 1,
        sizeUnit: cwc.isAccessibleMode ? "em" : "px"
    });
};
cwc.initDebug = function(scope) {
    if (!scope) {
        scope = window;
    }
    if (scope.console && !scope.console.debug && scope.console.log) {
        scope.console.debug = scope.console.log;
    }
    scope.cwc.jsDebug = (this.jsDebug == true) && (scope.console != undefined);
    if (scope != window) {
        scope.cwc.debugMask = this.debugMask;
    }
    if (scope.cwc.jsDebug == true && !scope.console.debug) {
        scope.console.debug = function() {};
        scope.console.error = scope.console.debug;
        scope.console.warn = scope.console.debug;
        scope.console.info = scope.console.debug;
    }
};
cwc.initConstants(cwc);
cwc.initDebug(window);
cwc.getTopCwc = function() {
    return cwc;
};
cwc.saveFavoritesDisplayMode = function() {
    var flag = cwc.store.local.getItem("FavoritesMgr_showPrivateFavoritesOnly_" + cwc.userName);
    if (!flag) {
        flag = false;
    }
    cwc.store.local.setItem("FavoritesMgr_showPrivateFavoritesOnly_" + cwc.userName, !flag);
};
cwc.isShowPrivateFavoritesOnly = function() {
    return cwc.store.local.getItem("FavoritesMgr_showPrivateFavoritesOnly_" + cwc.userName) === true;
};
cwc.updateFavoritesBtnCls = function() {
    var btnel = Ext.getCmp("cwcBtnFavShowFavorites").btnEl;
    if (cwc.isShowPrivateFavoritesOnly()) {
        btnel.replaceClass("icon-all-favorites", "icon-private-favorites");
        btnel.replaceClass("cwc-toolbar-all-favorites", "cwc-toolbar-private-favorites");
        btnel.dom.setAttribute("aria-pressed", true);
    } else {
        btnel.replaceClass("icon-private-favorites", "icon-all-favorites");
        btnel.replaceClass("cwc-toolbar-private-favorites", "cwc-toolbar-all-favorites");
        btnel.dom.setAttribute("aria-pressed", false);
    }
};
cwc.showFavoritesBtn = function() {
    return isEssUser;
};
cwc.onError = function(errorMessage, url, line) {
    if (Ext.getBody().isMasked() && cwc.lastErrorTimeDuringMask == null) {
        cwc.lastErrorTimeDuringMask = new Date().getTime();
    }
    if (cwc.jsDebug == true) {
        var isMifError = url.indexOf("ux/mif/miframe") != -1;
        if (!isMifError || (cwc.showMifError && isMifError)) {
            window.console && console.error(errorMessage + ", URL: " + url + ", line: " + line);
        }
    }
    if (!cwc.maskCloser && cwc.maskId) {
        cwc.createMaskCloser(cwc.maskId);
    }
};
window.onerror = function(message, url, line) {
    cwc.onError(message, url, line);
};
cwc.changeMsgButtonStyle = function(dlg) {
    var allButtons = dlg.buttons;
    var btn;
    var btnIDs = ["o", "y", "n", "c"];
    for (var i = 0; i < allButtons.length; i++) {
        btn = allButtons[i];
        if (!btn.btnEl.hasClass("messageBoxButton")) {
            btn.btnEl.addClass("messageBoxButton");
        }
        if (btn.btnEl != btnIDs[i]) {
            btn.btnEl.set({
                id: btnIDs[i]
            });
        }
    }
    if (cwc.isIE8) {
        dlg.getEl().removeClass("x-show");
        dlg.getEl().addClass("x-show");
    }
    cwc.util.setToolbarARIA({
        "toolbar": dlg.getFooterToolbar(),
        "label": cwc.TOOLBAR_POSITION_BOTTOM
    });
};
cwc.changeMsgButtonStyleExtjs4 = function(dlg) {
    for (var i = 0; i < dlg.msgButtons.length; i++) {
        var button = dlg.msgButtons[i];
        var buttonSpan = button.btnEl.dom.firstChild;
        if (buttonSpan.className.indexOf("messageBoxButton") < 0) {
            buttonSpan.className += " messageBoxButton";
        }
        if (button.itemId == "ok") {
            buttonSpan.id = "o";
        } else {
            if (button.itemId == "yes") {
                buttonSpan.id = "y";
            } else {
                if (button.itemId == "no") {
                    buttonSpan.id = "n";
                } else {
                    if (button.itemId == "cancel") {
                        buttonSpan.id = "c";
                    }
                }
            }
        }
    }
    var toolbar = dlg.getFooterToolbar && dlg.getFooterToolbar() || dlg.bottomTb;
    cwc.util.setToolbarARIA({
        "toolbar": toolbar,
        "label": cwc.TOOLBAR_POSITION_BOTTOM
    });
};
cwc.setWorkflowAppletVisible = function(visible) {
    if (cwc.isChrome && !cwc.isLegacyEdge) {
        var activeTabPanel = cwc.getActiveTab();
        var frame = activeTabPanel.hasListDetail() ? activeTabPanel.getDetailFrame().getFrame() : activeTabPanel.getFrame();
        var workflowDiv = frame.getFrameDocument() && frame.getFrameDocument().getElementById("WorkflowTemplate_Border");
        if (!workflowDiv) {
            return;
        }
        if (visible) {
            workflowDiv.style.visibility = "visible";
        } else {
            workflowDiv.style.visibility = "hidden";
        }
    }
};
cwc.enhanceArrays = function(arrayObjType, win) {
    if (!win || !!!win.__ignoreEnhanceArrays) {
        Ext.applyIf(arrayObjType.prototype, {
            indexOf: function(o, from) {
                var len = this.length;
                from = from || 0;
                from += (from < 0) ? len : 0;
                for (; from < len; ++from) {
                    if (this[from] === o) {
                        return from;
                    }
                }
                return -1;
            },
            remove: function(o) {
                var index = this.indexOf(o);
                if (index != -1) {
                    this.splice(index, 1);
                }
                return this;
            }
        });
    }
};
cwc.getDirectionClass = function() {
    return cwc.directionClass;
};
cwc.getFrameworkWindow = function() {
    return window;
};
cwc.cancelFileDragEvent = function(e) {
    var df = e.dataTransfer,
        items = df.items,
        kind = items && items.length > 0 && items[0].kind,
        types = df.types,
        type = types && types.length > 0 && types[0];
    if (kind == "file" || type == "Files") {
        e.preventDefault();
    }
};
cwc.preventDragAndDrop = function(scope) {
    scope.addEventListener("dragover", cwc.cancelFileDragEvent, false);
    scope.addEventListener("dragleave", cwc.cancelFileDragEvent, false);
    scope.addEventListener("drop", cwc.cancelFileDragEvent, false);
};
cwc.eventPreventDefault = function(e) {
    e.preventDefault();
};
cwc.addContextmenuEvent = function(menu) {
    if (typeof(menu) == "undefined") {
        return;
    }
    var currentMenu = menu;
    currentMenu.mon(currentMenu, "afterRender", function(menu) {
        menu.el.dom.addEventListener("contextmenu", cwc.eventPreventDefault);
    });
    for (var i = 0; i < currentMenu.items.length; i++) {
        var iMenu = currentMenu.items.get(i).menu;
        if (iMenu) {
            cwc.addContextmenuEvent(iMenu);
        }
    }
};
window.addEventListener("load", function() {
    cwc.preventDragAndDrop(document);
});
cwc.checkHighContrastMode = function() {
    if (this.hcMode == undefined) {
        var hc = Ext.getBody().insertHtml("beforeEnd", '<div style="width:0px;height:0px;position:absolute;left:-10000px;' + 'border: 1px solid;border-color: red blue;"></div>', true);
        var hcBorderTopColor = cwc.getComputedStyle(hc.dom, "border-top-color");
        this.hcMode = hcBorderTopColor == cwc.getComputedStyle(hc.dom, "border-right-color");
        this.hcBlackMode = hcBorderTopColor === "rgb(255, 255, 255)";
        hc.remove();
    }
};
cwc.isHighContrastMode = function() {
    cwc.checkHighContrastMode();
    return cwc.hcMode;
};
cwc.isHighContrastBlackMode = function() {
    cwc.checkHighContrastMode();
    return cwc.hcBlackMode;
};
cwc.getComputedStyle = function(element, propKey) {
    if (window.getComputedStyle) {
        var cs = window.getComputedStyle(element, null);
        return cs.getPropertyValue(propKey);
    }
    if (element.currentStyle) {
        return element.currentStyle[propKey.replace(/-(\w)/gi, function(word, letter) {
            return letter.toUpperCase();
        })];
    }
};
cwc.setAppMode = function(body) {
    body = Ext.get(body) || Ext.getBody();
    if (this.isAccessibleMode) {
        body.addClass("accessible-mode");
    }
    if (cwc.isHighContrastMode()) {
        body.addClass("hc-mode");
        if (cwc.isHighContrastBlackMode()) {
            body.addClass("hc-black-mode");
        }
    }
};
cwc.getRightPanel = function() {
    if (cwc.isRightPanelUsed) {
        return Ext.getCmp(cwc.rightPanelId);
    }
    return null;
};
cwc.getChatWinContainer = function() {
    if (cwc.isRightPanelUsed) {
        return Ext.getCmp(cwc.chatWinContainerId);
    }
    return null;
};
cwc.getQuickSearchPanel = function() {
    if (cwc.isRightPanelUsed) {
        return Ext.getCmp(cwc.gsQuickSearchPanelId);
    }
    return null;
};
cwc.getMainSmartSearchPanel = function() {
    if (cwc.isRightPanelUsed) {
        return Ext.getCmp(cwc.gsMainSearchWinId);
    }
    return null;
};
cwc.getActiveTab = function() {
    return Ext.getCmp(cwc.centerPanelId).getActiveTab();
};
cwc.getCurrentTab = function(obj) {
    if (!obj) {
        return null;
    }
    var tabPanel = Ext.getCmp(cwc.centerPanelId);
    var tab = tabPanel.findTabByWindow(obj);
    if (tab) {
        return tab;
    } else {
        if ((obj.isHover && cwc.isWindowObj(obj)) || obj.name === cwc.telephonyiframename || (cwc.activePopup && cwc.activePopup.getWindow() == obj)) {
            return cwc.getActiveTab();
        }
    }
    var parentObj = obj;
    while (parentObj) {
        if (parentObj.xtype === "cwcDetailTab") {
            return parentObj;
        }
        if (parentObj.xtype === "iframepanel" || parentObj.xtype === "hpsm-ux-iframepanel") {
            return cwc.getCurrentTab(parentObj.getFrameWindow());
        }
        if (parentObj.xtype === "cwcTabPanel") {
            break;
        }
        parentObj = parentObj.ownerCt;
    }
    return null;
};
cwc.getTabPanelCount = function() {
    return Ext.getCmp(cwc.centerPanelId).items.keys.length;
};
cwc.getTabPanelIndex = function(panel) {
    return Ext.getCmp(cwc.centerPanelId).items.indexOfKey(panel.id);
};
cwc.setListLoadingStatus = function(isLoading) {
    cwc.isLoadingList = isLoading;
};
cwc.setDetailLoadingStatus = function(isLoading) {
    cwc.isLoadingDetail = isLoading;
};
cwc.resetPageLoadingStatus = function() {
    cwc.isLoadingList = false;
    cwc.isLoadingDetail = false;
};
cwc.isCurrentTabLoaded = function() {
    return !(cwc.isLoadingList || cwc.isLoadingDetail);
};
cwc.param2attributes = function(param) {
    return (!param) ? {} : {
        label: param.label || param.title || null,
        url: (typeof(param) == "string") ? param : (param.url || null),
        html: param.html || null,
        lazyLoad: param.lazyLoad,
        closable: param.closable,
        staticTabId: param.staticTabId,
        hideCloseBtn: param.hideCloseBtn,
        showConfirmMsg: param.showConfirmMsg,
        focusToHeader: param.focusToHeader,
        isDashboard: param.generator === "com.hp.ov.sm.client.webtier.report.LinkGenerator"
    };
};
cwc.openNewTabPanel = function(param, node, preventHappyClick) {
    var centerTabPanel = Ext.getCmp(cwc.centerPanelId);
    var isMasked = Ext.getBody().isMasked() || cwc.messageBoxShown;
    if (preventHappyClick && (isMasked || !centerTabPanel.isValidTabSwitch(true))) {
        if (cwc.jsDebug) {
            window.console && console.debug("Open new tab page failed, the center panel is not ready for adding new active page.");
            if (isMasked && preventHappyClick) {
                window.console && console.warn("The window has been masked, please check if cwc.openNewTabPanel is correctly called!!!");
            }
        }
        return null;
    }
    cwc.maskWindow();
    var attributes = cwc.param2attributes(param);
    var nullNode = node || null;
    var tab;
    if (attributes.staticTabId) {
        tab = Ext.getCmp(attributes.staticTabId);
        if (tab == null) {
            delete attributes.title;
            delete attributes.label;
            tab = centerTabPanel.addTab(nullNode, attributes);
        } else {
            cwc.setActiveTab(tab);
            if (attributes.showConfirmMsg && !confirm(attributes.showConfirmMsg)) {
                cwc.unmaskWindow();
                return tab;
            }
            tab.setTitle(cwc.LOADING);
            cwc.updateActiveTab(attributes.url);
        }
    } else {
        tab = centerTabPanel.addTab(nullNode, attributes);
    }
    if (attributes.hideCloseBtn) {
        var index = cwc.getTabPanelIndex(tab);
        centerTabPanel.hideCloseBtn({
            index: index
        });
    }
    return tab;
};
cwc.openNewTabBefore = function(param) {
    cwc.maskWindow();
    var attributes = cwc.param2attributes(param);
    var nullNode = null;
    var activeTab = cwc.getActiveTab();
    var index = cwc.getTabPanelIndex(activeTab);
    if (index < 0) {
        index = 0;
    }
    var tabPanel = Ext.getCmp(cwc.centerPanelId);
    var tab = tabPanel.insertTab(index, nullNode, attributes);
    tab.ownerCt.stack.next();
    tab.ownerCt.stack.add(tab);
    tab.ownerCt.stack.add(activeTab);
    activeTab.fireEvent("activate", activeTab);
    if (attributes && attributes.hideCloseBtn) {
        tabPanel.hideCloseBtn({
            index: index
        });
    }
    return tab;
};
cwc.getElementById = function(id) {
    var obj = Ext.get(id);
    return (obj) ? obj.dom : null;
};
cwc.clearMessages = function() {};
cwc.addMessages = function() {};
cwc.refresh = function(tab) {
    if (!tab) {
        if (cwc.jsDebug) {
            window.console && console.error("The tab object is null !!!");
        }
        return;
    }
    if (tab.initialConfig.lazyLoad) {
        cwc.setActiveTab(tab);
    } else {
        if (tab.hasListDetail()) {
            tab.getListFrame().setSrc(null);
            tab.getDetailFrame().setSrc(null);
        } else {
            var url = tab.getMIF().getFrame().getDocumentURI();
            tab.setSrc(cwc.toCSRFSafe(url));
        }
    }
};
cwc.updateClientSideState = function(isAuthenticated) {
    cwc.isUserAuthenticated = isAuthenticated;
    var logout = Ext.get("cwc_logoutButton");
    if (logout != null) {
        var username = Ext.get("cwc_masthead_username");
        if (userAuthenticated) {
            username.show();
            logout.show();
        } else {
            username.hide();
            logout.hide();
        }
    }
};
cwc.logoutDialog = function() {
    var result = confirm(cwc.LOGOUT_MESSAGE);
    if (result) {
        window.stopHeartBeat();
        if (!isEssUser) {
            hpsmc.xmpp.disconnect();
        }
        cwc.exitConfirmRequired = false;
        try {
            top.location = cwc.logoutCleanupJsp;
        } catch (e) {
            if (window.console) {
                console.error("Closing application failed");
            }
        }
    }
};
cwc.setCursor = function(sCursor) {
    document.body.style.cursor = sCursor;
};
cwc.toggleToolButtonVisible = function(buttonId, visible) {
    var button = cwc.getToolbarButtonById(buttonId);
    if (button) {
        button.setVisible(visible);
    }
};
cwc.toggleLeadingToolSeparator = function(buttonId, visible) {
    var tab = cwc.getActiveTab();
    try {
        var toolbar = tab.hasListDetail() ? tab.getListFrame().getTopToolbar() : tab.getMIF().getTopToolbar();
        var leadingSeparator = toolbar.findLeadingSeparator(buttonId);
        if (leadingSeparator) {
            leadingSeparator.setVisible(visible);
        }
    } catch (e) {}
};
cwc.getToolbarButtonById = function(btnId) {
    var tab = cwc.getActiveTab();
    try {
        var toolbar = tab.hasListDetail() ? tab.getListFrame().getTopToolbar() : tab.getMIF().getTopToolbar();
        var button = toolbar.getButtonByBtnId(btnId);
        if (button) {
            return button;
        }
    } catch (e) {}
};
cwc.printJspForm = function(scope) {
    var jspPages = [{
        obj: "DASHBOARD",
        fn: "printDashboard"
    }, {
        obj: "branding",
        fn: "print"
    }, {
        obj: "ERD",
        fn: "print"
    }];
    var jsp;
    for (var i in jspPages) {
        jsp = jspPages[i];
        if (jsp && scope[jsp.obj]) {
            scope[jsp.obj][jsp.fn]();
            return true;
        }
    }
    return false;
};
cwc.print = function(frame, all) {
    var tab = cwc.getActiveTab();
    var detailFrame = (frame) ? frame : (tab.hasListDetail() ? tab.getDetailFrame() : tab.getFrame());
    detailFrame = (detailFrame.xtype == "iframepanel" || detailFrame.xtype == "hpsm-ux-iframepanel") ? detailFrame.getFrame() : detailFrame;
    if (cwc.usePrintPreview == false) {
        detailFrame.print();
        return;
    }
    var wndw = detailFrame.getWindow();
    try {
        if (wndw.printThisView) {
            cwc.sysWndws.wndwPrintPrev = wndw.printThisView();
        } else {
            if (!all && wndw.printListCurrent) {
                cwc.sysWndws.wndwPrintPrev = wndw.printListCurrent();
            } else {
                if (all && wndw.printListAll) {
                    cwc.sysWndws.wndwPrintPrev = wndw.printListAll();
                } else {
                    if (cwc.printJspForm(wndw)) {} else {
                        cwc.sysWndws.wndwPrintPrev = cwc.openPrintPreview(wndw.document, detailFrame);
                    }
                }
            }
        }
        if (cwc.sysWndws.wndwPrintPrev != null) {
            cwc.sysWndws.wndwPrintPrev.focus();
        }
    } catch (e) {
        if (window.console) {
            console.error("printThisView callback function failed.");
        }
    }
    cwc.unmaskWindow();
};
cwc.openPrintPreview = function(previewPage, frame) {
    var printPreviewPage = previewPage ? previewPage.location : null;
    var sRef;
    var frameName = (frame != null) ? frame.name : null;
    if (frameName == null) {
        frameName = frame.id;
    }
    var rootPath = cwc.frameworkContext || (!top.opener ? "" : (top.opener.frameworkContext || top.opener.cwc.frameworkContext));
    if (frame && frame.cwc && frame.cwc.printableDetailURI && frame.cwc.printableDetailURI != "" && frame.cwc.printableDetailURI != "null") {
        sRef = frame.cwc.printableDetailURI;
    } else {
        if (top.printableDetailURI && top.printableDetailURI != "" && top.printableDetailURI != "null") {
            sRef = top.printableDetailURI;
        } else {
            if (printPreviewPage) {
                sRef = printPreviewPage.href;
            } else {
                sRef = rootPath + "/cwc/printable.jsp";
            }
        }
    }
    var i = sRef.lastIndexOf("printable");
    if (i < 0) {
        var sParam = "";
        i = sRef.lastIndexOf("?", sRef.length);
        if (i >= 0) {
            var sRefString = sRef.substring(i + 1, sRef.length);
            if (sRefString.indexOf("decorator=") < 0) {
                sParam = "&" + sRef.substring(i + 1, sRef.length);
            }
        }
        var j = sRef.indexOf("?");
        if (j > 0) {
            sRef = sRef.substring(0, j);
        }
        var frameParam = "";
        if (frameName && frameName != "null") {
            frameParam = "&cwcPrintSrc=" + frameName;
        }
        var baseLoc = cwc._getBaseLoc(previewPage);
        sRef = baseLoc ? baseLoc : sRef;
        printPreviewPage = rootPath + "/cwc/printable.jsp?printable=true&cwcPrint=currentView" + frameParam + "&cwcLoc=" + encodeURIComponent(sRef) + sParam;
    }
    var scrollbars = (document.all) ? "0" : "1";
    var options = "width=850,height=550,resizable=1,scrollbars=" + scrollbars + ",location=0,menubar=1,status=0,toolbar=0,fullscreen=0,hotkeys=0,directories=0";
    cwc.sysWndws.wndwPrintPrev = window.open(printPreviewPage, "PrintPrev", options);
    cwc.sysWndws.wndwPrintPrev.focus();
};
cwc._getBaseLoc = function(doc) {
    var bases;
    var baseLoc;
    var mydoc = doc.document || doc;
    if (mydoc.getElementById("cwcPrintSrcFrame") && mydoc.getElementById("cwcPrintSrcFrame") != "") {
        frame = mydoc.getElementById("cwcPrintSrcFrame").value;
        mydoc = cwc.getFrameDocument(mydoc, frame);
        bases = mydoc.document.getElementsByTagName("base");
        baseLoc = (bases && bases.length > 0) ? bases.item(0).href : mydoc.location.href;
    } else {
        bases = mydoc.getElementsByTagName("base");
        baseLoc = (bases && bases.length > 0) ? bases.item(0).href : null;
    }
    return baseLoc;
};
cwc.blockInput = function() {
    if (window.console) {
        console.warn("DEPRECATED: use cwc.maskWindow");
    }
};
cwc.allowInput = function() {
    if (window.console) {
        console.warn("DEPRECATED: use cwc.unmaskWindow");
    }
};
cwc.toggleSmcNotification = function() {
    var notificationBtn = Ext.getCmp("smcNotificationButtonId");
    if (notificationBtn && !notificationBtn.disabled) {
        cwc.toggleNotificationPanel();
    }
};
cwc.toggleAlertWidnow = function() {
    var btn = Ext.getCmp("topAlertButtonId");
    if (btn && !btn.disabled) {
        hpalert.Utils.toggleAlertWindow();
    }
};
cwc.popUpWindow = function(filename, windowName, windowHeight, windowWidth, scroll, params, resizable, persist, addContext, yourWindowOptions, yourPageDecorator) {
    var strParams = "";
    var decoratorSpec = "decorator=";
    var popupDecorator = "popup";
    var ctxPath = "";
    var features = "";
    var winOpt = new Array();
    var win = null;
    winOpt["location"] = 0;
    winOpt["menubar"] = 0;
    winOpt["status"] = 0;
    winOpt["toolbar"] = 0;
    winOpt["alwaysRaised"] = 1;
    winOpt["resizable"] = "yes";
    winOpt["scrollbars"] = 0;
    winOpt["directories"] = 0;
    winOpt["height"] = 585;
    winOpt["width"] = 550;
    if (yourPageDecorator === undefined) {
        decoratorSpec += popupDecorator;
    } else {
        if (yourPageDecorator && yourPageDecorator.length > 0) {
            decoratorSpec += yourPageDecorator;
        } else {
            decoratorSpec = "";
        }
    }
    if (yourWindowOptions) {
        var pairs = yourWindowOptions.split(",");
        var values, i;
        for (i = 0; i < pairs.length; i++) {
            values = pairs[i].split("=");
            winOpt[values[0]] = values[1];
        }
    }
    if (scroll == "yes" || scroll == "Yes") {
        winOpt["scrollbars"] = 1;
    }
    if (resizable) {
        if (resizable == "no" || resizable == "No") {
            winOpt["resizable"] = (Ext.isIE) ? 0 : "no";
        } else {
            winOpt["resizable"] = (Ext.isIE) ? 1 : "yes";
        }
    }
    if (windowHeight && windowHeight > 0) {
        winOpt["height"] = windowHeight;
    }
    if (windowWidth && windowWidth > 0) {
        winOpt["width"] = windowWidth;
    }
    if (addContext && cwc.frameworkContext) {
        ctxPath = cwc.frameworkContext;
        if (filename.indexOf("/") != 0) {
            ctxPath += "/";
        }
    }
    var needParamDelim = filename.indexOf("?") < 0;
    var paramDelim = (needParamDelim) ? "?" : "";
    if (params && params != " ") {
        var strChopList = params.split(",");
        for (var count = 0; count < strChopList.length; count++) {
            if (count == 0) {
                if (decoratorSpec.length > 0) {
                    strParams = paramDelim + decoratorSpec + "&" + strChopList[count];
                } else {
                    strParams = paramDelim + strChopList[count];
                }
            } else {
                strParams = strParams + "&" + strChopList[count];
            }
        }
    } else {
        if (decoratorSpec.length > 0) {
            strParams = paramDelim + decoratorSpec;
        }
    }
    win = cwc.WindowList.get(windowName);
    if (win) {
        if (!win.closed && win.document) {
            var b = cwc.isStrict ? win.document.documentElement : win.document.body;
            winOpt["height"] = win.outerHeight || b.clientHeight;
            winOpt["width"] = win.outerWidth || b.clientWidth;
        }
        cwc.WindowList.close(windowName);
        win = null;
    }
    for (var index in winOpt) {
        features = features + index + "=" + winOpt[index] + ",";
    }
    features = features.substr(0, features.length - 1);
    var newWin = window.open(ctxPath + filename + strParams, windowName, features);
    if (newWin) {
        cwc.WindowList.add(newWin);
        newWin.focus();
    }
    return newWin;
};
cwc.loadAbout = function() {
    if (cwc.sysWndws.wndwAbout && cwc.sysWndws.wndwAbout.isVisible()) {
        cwc.sysWndws.wndwAbout.close();
        return true;
    }
    cwc.sysWndws.wndwAbout = new Ext.Window({
        id: "aboutPage",
        modal: true,
        header: false,
        bodyBorder: false,
        border: false,
        bodyPadding: 0,
        resizable: false,
        constrain: true,
        shadow: false,
        baseCls: "x-aboutpage",
        html: '<div class="AboutBody">' + '    <div class="x-tool x-tool-close" id="close_button"  tabindex="0" role="button" aria-label="' + top.cwc.CWC_EXT_CLOSE + '">&nbsp;</div>' + '    <div id="cwc_main_view" >' + '      <div id="about_left">' + '        <img id="about_image"  src="' + top.cwc.aboutImg + '">' + '        <div class="ProductVersion">' + top.cwc.ABOUT_PAGE_VERSION + "&nbsp;" + top.cwc.appVersion + "</div>" + "      </div>" + '      <div id="about_right" tabindex="0" role="article" aria-label="' + top.cwc.ABOUT_PAGE_TITLE + '">' + '        <div class="AboutLabel x-window-header-text"></div>' + '        <div class="AboutProductVersion">' + top.cwc.ABOUT_PAGE_VERSION + "&nbsp;" + top.cwc.appVersion + "</div>" + '        <div class="AboutInfo">' + top.cwc.aboutInfo + "</div>" + '        <div id="cwc_copyright" class="AboutProductCopyright">' + "&copy; Copyright " + top.cwc.APP_COPYRIGHT_YEAR + " " + top.cwc.ABOUT_PAGE_COPYRIGHT + "</div>" + "      </div>" + "    </div>" + "</div>",
        listeners: {
            afterrender: function(win) {
                win.center();
                win.addClass(cwc.getDirectionClass());
                var closeBtn = Ext.get("close_button");
                var aboutRight = Ext.get("about_right");
                cwc.util.setDialogARIA(win, top.cwc.ABOUT_PAGE_ABOUT, top.cwc.smTitle);
                win.focusEl = aboutRight;
                closeBtn.on("keydown", function(e) {
                    if (e.getKey() === e.TAB && e.shiftKey) {
                        e.stopEvent();
                        aboutRight.focus();
                    }
                });
                aboutRight.on("keydown", function(e) {
                    if (e.getKey() === e.TAB) {
                        e.stopEvent();
                        closeBtn.focus();
                    }
                });
                closeBtn.on("mouseout", function(e) {
                    this.removeClass("x-tool-close-over");
                });
                closeBtn.on("mouseover", function(e) {
                    this.addClass("x-tool-close-over");
                });
                closeBtn.on("click", function(e) {
                    win.close();
                });
                new Ext.KeyMap(closeBtn, {
                    key: [13, 32],
                    fn: function() {
                        win.close();
                    }
                });
            },
            close: function() {
                var mastheadBtn = Ext.get("cwc_masthead_title_link");
                mastheadBtn.focus(100);
            }
        }
    });
    cwc.sysWndws.wndwAbout.show();
    return true;
};
cwc.openDialogBox = function(title, url, modal, height, width) {
    url = cwc.toCSRFSafe(url);
    if (!cwc.dialogBox) {
        cwc.dialogBox = new Ext.Window({
            title: title,
            layout: "fit",
            height: height || 300,
            width: width || 500,
            closeAction: "hide",
            plain: true,
            items: [{
                xtype: "hpsm-ux-iframepanel",
                defaultSrc: url,
                loadMask: {
                    msg: cwc.WAIT
                },
                border: false
            }],
            tools: [{
                id: "maximize",
                handler: function(event, toolEl, panel) {
                    panel.maximize();
                    panel.tools["maximize"].hide();
                    panel.tools["restore"].show();
                }
            }, {
                id: "restore",
                hidden: true,
                handler: function(event, toolEl, panel) {
                    panel.restore();
                    panel.tools["restore"].hide();
                    panel.tools["maximize"].show();
                }
            }],
            setUrl: function(url) {
                this.items.items[0].getFrame().setSrc(url);
            }
        });
    } else {
        cwc.dialogBox.setUrl(url);
    }
    cwc.dialogBox.restore();
    cwc.dialogBox.show();
};
cwc.bodyInjectJsFile = function(url, target) {
    var targetDocument = (!target) ? document : target.document;
    var se = targetDocument.createElement("script");
    se.src = url;
    targetDocument.body.appendChild(se);
};
cwc.headInjectJsFile = function(url, target) {
    var targetDocument = (!target) ? document : target.document;
    var se = targetDocument.createElement("script");
    se.src = url;
    targetDocument.getElementsByTagName("head")[0].appendChild(se);
};
cwc.headInjectCss = function(doc, cssFile) {
    var css = doc.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = cssFile;
    doc.getElementsByTagName("head")[0].appendChild(css);
};
cwc.loadResourceBundle = function(bundleName) {
    var res;
    if (!cwc.resources) {
        cwc.resources = [];
    } else {
        if (bundleName) {
            res = cwc.resources[bundleName];
        }
    }
    if (!res) {
        Ext.Ajax.request({
            method: "GET",
            disableCaching: true,
            url: cwc.frameworkContext + "/rbundle?id=" + bundleName,
            success: function(response, options) {
                var sResp = response.responseText;
                try {
                    res = Ext.util.JSON.decode(sResp);
                    cwc.resources[bundleName] = res;
                } catch (e) {
                    if (window.console) {
                        console.error("Unable to parse resource bundle " + bundleName);
                    }
                }
            },
            failure: function() {
                if (window.console) {
                    console.error("Resource bundle " + bundleName + " not found.");
                }
            }
        });
    }
};
cwc.addResourceBundle = function(bundleName, jsonBundle) {
    if (!cwc.resources) {
        cwc.resources = [];
    }
    if (!cwc.resources[bundleName]) {
        var strBundle = Ext.util.JSON.encode(jsonBundle);
        var myJsonBundle = Ext.util.JSON.decode(strBundle);
        jsonBundle = null;
        cwc.resources[bundleName] = myJsonBundle;
    }
};
cwc.getResourceString = function(bundleName, key) {
    return (cwc.resources[bundleName] && cwc.resources[bundleName][key]) ? cwc.resources[bundleName][key] : ("???" + key + "???");
};
cwc.xmlRequest = function(target, sParams) {
    var result = null;
    Ext.Ajax.request({
        url: target,
        method: "GET",
        params: sParams,
        success: function(response, options) {
            if (window.ActiveXObject) {
                result = new ActiveXObject("Microsoft.XMLDOM");
                result.loadXML(response.responseText);
                if (!result.documentElement || result.documentElement == null) {
                    result = response.status;
                }
            } else {
                if (sResp && sResp.length > 0) {
                    result = cwc.createXMLFromString(response.responseText);
                    if (result.firstChild.tagName == "parsererror") {
                        result = response.status;
                    }
                }
            }
        },
        failure: function(response, options) {
            result = cwc.xhrFailure(response.status, response.getResponseHeader("isSessionConnected") == "true");
        }
    });
    return result;
};
cwc.findObj = function(n, d) {
    var p, i, x;
    if (!d) {
        d = document;
    }
    if (!d.getElementById && d.document) {
        d = d.document;
    }
    if (n) {
        if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
            d = parent.frames[n.substring(p + 1)].document;
            n = n.substring(0, p);
        }
        if (n != "") {
            for (i = 0; !x && i < d.forms.length; i++) {
                x = d.forms[n];
            }
            if (!x && d.getElementById) {
                x = d.getElementById(n);
            }
        }
    }
    return x;
};
cwc.createXMLFromString = function(string) {
    var xmlParser, xmlDocument;
    try {
        xmlParser = new DOMParser();
        xmlDocument = xmlParser.parseFromString(string, "text/xml");
        return xmlDocument;
    } catch (e) {
        alert("Can't create XML document.");
    }
    return null;
};
cwc.getScopedPopupName = function(windowName) {
    if (!windowName) {
        windowName = "popupWindow";
    }
    if (sessionHash != "null") {
        windowName += "_" + sessionHash;
    }
    return windowName;
};
cwc.logMessage = function(level, classname, message) {
    if (window.console) {
        console.error(message);
    }
    var parts = document.location.pathname.split("/");
    var url = "/" + parts[1] + "/cwc/logMessage.jsp?level=" + level + "&class=" + classname + "&message=" + encodeURIComponent(message);
    var xhrFailure = function(response, options) {};
    cwc.XhrRequest(url, false, xhrFailure, "GET");
};
cwc.setBeforeUnloadHandler = function(handler) {
    window.onbeforeunload = handler;
};
cwc.setUnloadHandler = function(handler) {
    window.onunload = handler;
};
cwc.confirmExit = function(e) {
    var message = cwc.EXIT_CONFIRM_MESSAGE;
    if (cwc.exitConfirmRequired) {
        e = e || window.event;
        if (e) {
            e.returnValue = message;
        }
        return message;
    }
};
cwc.syncRequest = function(url, method) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open(method, url, false);
    xmlhttp.send();
};
cwc.shortenSessionTimeout = function() {
    var url = cwc.frameworkContext + "/cwc/shortenSessionTimeout.jsp";
    cwc.syncRequest(url, "GET");
};
cwc.addLoadEvent = function(func) {
    if (window.onload != cwc.processAjaxLoadEvents) {
        if (window.onload) {
            cwc.addAjaxLoadEvent(window.onload);
        }
        window.onload = cwc.processAjaxLoadEvents;
    }
    cwc.addAjaxLoadEvent(func);
};
cwc.processAjaxLoadEvents = function(e) {
    for (var i = 0, lgt = cwc.ajaxLoadEvents.length; i < lgt; i++) {
        cwc.ajaxLoadEvents[i](e);
    }
    cwc.resetAjaxLoadEvents();
};
cwc.ajaxLoadEvents = [];
cwc.addAjaxLoadEvent = function(func) {
    cwc.ajaxLoadEvents[cwc.ajaxLoadEvents.length] = func;
};
cwc.resetAjaxLoadEvents = function() {
    cwc.ajaxLoadEvents = [];
};
cwc.bindTooltips = function(frame) {
    cwc.cleanupElCache(frame.getWindow());
    var elems = Ext.select("*[tooltipurl]", false, frame.getFrameDocument());
    var tips = [];
    for (var i = 0, maxi = elems.elements.length; i < maxi; i++) {
        tips.push(cwc.newTooltip(frame, elems.elements[i]));
    }
    return tips;
};
cwc.createTooltipTarget = function(frame, elem, name) {
    if (frame && elem && !frame.get(elem.id + "_" + name)) {
        var innerDiv = elem.parentNode;
        while (innerDiv && (!innerDiv.className || innerDiv.className.indexOf("xEditInner") < 0)) {
            innerDiv = innerDiv.parentNode;
        }
        if (!innerDiv) {
            return;
        }
        var outterDiv = innerDiv.parentNode;
        while (outterDiv && (!outterDiv.className || outterDiv.className.indexOf("xEditOutter") < 0)) {
            outterDiv = outterDiv.parentNode;
        }
        if (!outterDiv) {
            return;
        }
        var id = elem.id;
        if (name == "InfoIconArea") {
            id = frame.id + "_" + id;
        }
        var iconId = id + "_" + name;
        var iconAreaHtml = '<div id="' + iconId + '" class="popupIconDiv"></div>';
        innerDiv.insertAdjacentHTML("beforeEnd", iconAreaHtml);
        var areaDiv = innerDiv.lastChild;
        if (name == "InfoIconArea") {
            areaDiv.setAttribute("inputId", elem.id);
            areaDiv.setAttribute("tooltipWidth", elem.getAttribute("tooltipWidth"));
            areaDiv.setAttribute("tooltipHeight", elem.getAttribute("tooltipHeight"));
        }
        return areaDiv;
    }
};
cwc.newTooltip = function(frame, elem) {
    var target = cwc.createTooltipTarget(frame, elem, "InfoIconArea");
    var tip = new cwc.ux.Tooltip({
        target: target,
        frame: frame
    });
    if (Ext.isEmpty(elem.getAttribute("value"))) {
        tip.setDisabled(true);
    }
    return tip;
};
cwc.destroyTooltips = function(ttips) {
    Ext.each(ttips, function(item) {
        try {
            var id = item.target.id;
            Ext.destroy(item);
            delete Ext.elCache[id];
        } catch (e) {}
    });
};
cwc.switchNavDisplay = function() {
    var navSearchInput = Ext.getCmp("navSearchInput");
    var navPanel = Ext.getCmp(cwc.navPanelId);
    var active = (navPanel.layout.activeItem.id == cwc.navId) ? 1 : 0;
    navPanel.layout.setActiveItem(active);
    navPanel.el.removeClass("animation");
    var applyAnimation = function(dir) {
        navPanel.el.addClass(dir);
        setTimeout(function() {
            navPanel.el.addClass("animation");
            navPanel.el.removeClass(dir);
            Ext.getCmp(cwc.favManage).btnEl.blur();
        }, 100);
        Ext.getCmp(cwc.favManage).btnEl.focus(200);
    };
    if (active === 1) {
        navSearchInput.disableSearchScopeButton();
        navSearchInput.switchToSearchFavStyle();
        var favTree = Ext.getCmp(cwc.favMgrTreeId);
        if (!favTree) {
            cwc.createFavTree("", "");
            favTree = Ext.getCmp(cwc.favMgrTreeId);
        }
        favTree.pendingAnimation = true;
        applyAnimation("previous-rotate");
        navPanel.el.on("transitionend", function() {
            if (favTree.pendingAnimation) {
                favTree.pendingAnimation = false;
                setTimeout(function() {
                    cwc.util.setTreeNodeMaxWidth(favTree.root, favTree.root.ui.wrap.clientWidth);
                }, 300);
            }
        });
    } else {
        navSearchInput.enableSearchScopeButton();
        navSearchInput.resetSearchScopeButtonStyle();
        applyAnimation("back-rotate");
    }
};
cwc.createFavTree = function(searchValue, data) {
    var searchFlag = false;
    if (searchValue) {
        Ext.getCmp(cwc.navPanelId).favTreeIsFiltered = true;
        searchFlag = true;
    } else {
        Ext.getCmp(cwc.navPanelId).favTreeIsFiltered = false;
    }
    var favPanel = Ext.getCmp(cwc.favMgrId);
    var treeLoader = new cwc.ux.FavLoader({
        requestMethod: "GET",
        nodeParameter: "id",
        baseParams: {
            name: "navGenerate"
        },
        dataUrl: cwc.toCSRFSafe(cwc.frameworkContext + "/cwc/nav.menu")
    });
    var treePanel = new Ext.tree.TreePanel({
        id: cwc.favMgrTreeId,
        animate: true,
        collapsible: false,
        animCollapse: false,
        useArrows: true,
        enableDD: false,
        rootVisible: false,
        lines: false,
        border: false,
        bodyStyle: "overflow-y: auto",
        pathSeparator: "|",
        loader: treeLoader,
        searchFlag: true,
        renderRoot: function() {
            this.root.render();
            if (!this.rootVisible) {
                if (!this.searchFlag) {
                    this.root.renderChildren();
                } else {
                    if (this.root && this.root.renderAllChildren) {
                        this.root.renderAllChildren();
                    }
                }
            }
        },
        listeners: {
            "checkchange": function(node, checked) {
                if (checked) {
                    node.getUI().addClass("checked");
                } else {
                    node.getUI().removeClass("checked");
                }
                treePanel.adjustPositionX();
            },
            afterlayout: function(panel) {
                if (!panel.pendingAnimation) {
                    cwc.util.setTreeNodeMaxWidth(panel.root, panel.root.ui.wrap.clientWidth);
                }
                if (!isEssUser) {
                    Ext.getCmp("navSearchInput").setSearchInputWidth(panel.getWidth() - 15);
                }
            }
        },
        adjustPositionX: function(byLeft) {
            var rootDiv = this.getTreeEl();
            var rootUL = Ext.get(rootDiv.dom.firstChild);
            if (rootDiv.getX() != rootUL.getX()) {
                if (byLeft) {
                    rootUL.setLeft(0);
                } else {
                    if (cwc.isRTL) {
                        rootUL.setRight(0);
                    } else {
                        rootUL.setX(rootDiv.getX());
                    }
                }
            }
        }
    });
    var root = new cwc.ux.TreeNode({
        text: "root",
        draggable: false,
        id: cwc.favoriteRootId
    });
    favPanel.add(treePanel);
    treePanel.setRootNode(root);
    favPanel.doLayout();
    if (data) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");
        var rootNode = xmlDoc.documentElement.firstElementChild;
        rootNode = cwc.util.filterBySearchValue(rootNode, searchValue);
        if (rootNode && rootNode.childElementCount > 0) {
            root.attributes.searchFlag = searchFlag;
            treeLoader.renderTree(root, rootNode, searchValue);
        }
    } else {
        treeLoader.load(root);
    }
    cwc.util.setTreeNodeMaxWidth(root, root.ui.wrap.clientWidth);
    cwc.favMgr.clearLoadCopyMoveMenu();
};
cwc.createNavTree = function(searchValue, data) {
    var searchFlag = false;
    if (searchValue) {
        Ext.getCmp(cwc.navPanelId).navTreeIsFiltered = true;
        searchFlag = true;
    } else {
        Ext.getCmp(cwc.navPanelId).navTreeIsFiltered = false;
    }
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(data, "text/xml");
    var root = searchFlag ? cwc.util.filterBySearchValue(xmlDoc.documentElement, searchValue, true) : xmlDoc.documentElement;
    if (root && root.childElementCount > 0) {
        Ext.getCmp(cwc.navId).xml.renderTree(root, cwc.frameworkContext, searchValue);
    }
    cwc.favMgr.clearLoadCopyMoveMenu();
};
cwc.currentTreePanel = function() {
    var navPanel = Ext.getCmp(cwc.navPanelId);
    var active = (navPanel.layout.activeItem.id == cwc.navId) ? 0 : 1;
    return active;
};
cwc.storeSearchTreeCache = function(data) {
    cwc.store.session.setItem("searchnavigatorTree_" + cwc.userName, data);
};
cwc.clearSearchTreeCache = function() {
    cwc.store.session.setItem("searchnavigatorTree_" + cwc.userName, "");
};
cwc.getSearchTreeCache = function() {
    return cwc.store.session.getItem("searchnavigatorTree_" + cwc.userName);
};
cwc.storeSearchFavStyle = function(data) {
    cwc.store.session.setItem("searchFavStyle_" + cwc.userName, data);
};
cwc.getSearchFavStyle = function() {
    return cwc.store.session.getItem("searchFavStyle_" + cwc.userName);
};
cwc.initResultCount = function() {
    cwc.resultCount = 0;
};
cwc.increaseResultCount = function() {
    cwc.resultCount = cwc.resultCount + 1;
};
cwc.getResultCount = function() {
    return cwc.resultCount;
};
cwc.searchTreeHasExpanded = function() {
    var currentTime = new Date().getTime();
    var updateInterval = currentTime - cwc.resetTreeTime;
    return updateInterval > 500 ? true : false;
};
cwc.generateResetTreeTime = function(searchFlag) {
    cwc.resetTreeTime = new Date().getTime();
};
cwc.resetTreeTime = 0;
cwc.updateNavTreeFinished = true;
cwc.updateFavMgrFinished = true;
cwc.lastUpdateTime = 0;
cwc.updateNavFavorites = function(callback) {
    var currentTime = new Date().getTime();
    var updateInterval = currentTime - cwc.lastUpdateTime;
    cwc.lastUpdateTime = currentTime;
    if (updateInterval < 3000) {
        if (!(cwc.updateNavTreeFinished && cwc.updateFavMgrFinished)) {
            return;
        }
    }
    cwc.reloadFavMgr();
    var treeCt = Ext.getCmp(cwc.navId);
    var favTree = Ext.getCmp(cwc.favoriteRootId);
    if (favTree.el.contains(treeCt.lastFocusedNode)) {
        treeCt.lastFocusedNode = favTree.header;
        favTree.header.set({
            "tabindex": "0"
        });
    }
    Ext.getCmp(cwc.favoriteRootId).getLoader().baseParams.refresh = "true";
    cwc.reloadNavFavs();
    delete(Ext.getCmp(cwc.favoriteRootId).getLoader().baseParams.refresh);
};
cwc.updateFavoriteIcon = function(type, isRevert) {
    var tab = cwc.getActiveTab();
    var addFavoriteBtnClass = function(toolbar) {
        var favBtn = toolbar.getFavoriteButton();
        if (favBtn) {
            if (isRevert) {
                favBtn.setIconClass("cwc-toolbar-favAdd");
            } else {
                favBtn.setIconClass("cwc-toolbar-favAdded");
            }
        }
    };
    if (tab.hasListDetail()) {
        if (type === "list") {
            var toolbar = tab.getListFrame().getTopToolbar();
            addFavoriteBtnClass(toolbar);
        } else {
            var toolbar = tab.getDetailFrame().getTopToolbar();
            addFavoriteBtnClass(toolbar);
        }
    } else {
        var toolbar = tab.getMIF().getTopToolbar();
        if (toolbar) {
            addFavoriteBtnClass(toolbar);
        }
    }
};
cwc.reloadFavMgr = function() {
    Ext.getCmp("navSearchInput").el.child("input").dom.value = "";
    var tree = Ext.getCmp(cwc.favMgrTreeId);
    if (tree) {
        cwc.updateFavMgrFinished = false;
        tree.root.attributes["searchFlag"] = false;
        var loader = tree.getLoader();
        loader.load(tree.root);
    }
};
cwc.reloadNavFavs = function(callback) {
    Ext.getCmp("navSearchInput").el.child("input").dom.value = "";
    cwc.updateNavTreeFinished = false;
    var tree = Ext.getCmp(cwc.favoriteRootId);
    tree.root.attributes["searchFlag"] = false;
    var loader = tree.getLoader();
    loader.load(tree.root, callback);
    cwc.gtrigger("cwc:favorite:updated");
};
cwc.enableNavMenu = function(enableNavMenu) {
    if (typeof enableNavMenu != "boolean") {
        enableNavMenu = true;
    }
    if (enableNavMenu) {
        Ext.getCmp(cwc.navPanelId).enable();
    } else {
        Ext.getCmp(cwc.navPanelId).disable();
    }
};
cwc.isNavMenuDisabled = function() {
    return Ext.getCmp(cwc.navPanelId).disabled;
};
cwc.tryCall = function(fn, scope, args) {
    if (Ext.isEmpty(fn)) {
        return null;
    }
    if (Ext.isString(fn)) {
        fn = cwc.getObjectByAttributePath(fn, scope);
    }
    if (!Ext.isFunction) {
        return null;
    }
    try {
        return fn.apply(scope || window, args || []);
    } catch (e) {
        window.console && console.log(e.message);
        return null;
    }
};
! function() {
    function getScWindowWidth() {
        if (Ext.isIE8) {
            window.innerWidth = document.documentElement.clientWidth || document.body.clientWidth;
        }
        return isNaN(window.innerWidth) ? window.clientWidth * 0.27 : window.innerWidth * 0.27;
    }

    function getScWindowHeight() {
        if (Ext.isIE8) {
            window.innerHeight = document.documentElement.clientHeight || document.body.clientHeight;
        }
        return isNaN(window.innerHeight) ? window.clientHeight * 0.89 : window.innerHeight * 0.89;
    }

    function reset(win, minWidth) {
        if (win) {
            var width = getScWindowWidth();
            if (width < minWidth) {
                width = minWidth;
            }
            var height = getScWindowHeight();
            if (Ext.isIE9) {
                var box = win.getBox();
                win.beforeResize();
                win.handleResize({
                    x: box.x,
                    y: box.y,
                    width: width,
                    height: height
                });
            } else {
                win.setWidth(width);
                win.setHeight(height);
            }
            win.alignTo(Ext.getBody(), cwc.isRTL ? "bl-bl" : "br-br");
        }
    }
    cwc.showKeyboardShortcutList = function(targetButton) {
        if (!targetButton) {
            targetButton = Ext.getCmp("toolbarHelpButtonId");
        }
        var minWidth = 270;
        var scComp = Ext.getCmp("keyboardShortcutList");
        if (scComp != null) {
            if (scComp.isVisible()) {
                scComp.destroy();
                return;
            } else {
                scComp.setVisible(true);
                reset(scComp, minWidth);
                return;
            }
        }
        var w = new Ext.Window({
            id: "keyboardShortcutList",
            layout: "fit",
            minWidth: minWidth,
            modal: true,
            plain: true,
            cls: "keyboard-shortcut-list",
            bodyBorder: false,
            border: false,
            shim: false,
            shadow: false,
            constrain: true,
            closeCalled: false,
            items: [{
                autoLoad: {
                    scripts: true,
                    text: " ",
                    url: "keyboardShortcutList.jsp"
                },
                autoScroll: true,
                region: "center"
            }],
            listeners: {
                afterrender: function(win) {
                    win.addClass(cwc.getDirectionClass());
                    var helpBody = win.body.child(".x-panel-bwrap");
                    helpBody = Ext.get(helpBody.dom.firstChild);
                    helpBody.set({
                        "role": "article",
                        "tabindex": "0",
                        "aria-label": top.cwc.HELP_SHORTCUT
                    });
                    var closeBtn = win.getTool("close");
                    closeBtn.set({
                        tabindex: 0,
                        "role": "button",
                        "aria-label": top.cwc.CLOSE
                    });
                    cwc.util.setDialogARIA(win, cwc.HELP_SHORTCUT);
                    win.focusEl = helpBody;
                    setTimeout(function() {
                        var newWidth = parseInt(helpBody.getStyle("width")) - 2;
                        var newHeight = parseInt(helpBody.getStyle("height")) - 2;
                        helpBody.setStyle("width", newWidth + "px");
                        helpBody.setStyle("height", newHeight + "px");
                    }, 300);
                    closeBtn.on("keydown", function(e) {
                        if (e.getKey() === e.TAB && e.shiftKey) {
                            e.stopEvent();
                            helpBody.focus();
                        }
                    });
                    helpBody.on("keydown", function(e) {
                        if (e.getKey() === e.TAB) {
                            e.stopEvent();
                            closeBtn.focus();
                        }
                    });
                    new Ext.KeyMap(closeBtn, {
                        key: [13, 32],
                        fn: function() {
                            win.close();
                        }
                    });
                    cwc.setWorkflowAppletVisible(false);
                    win.originalWinSize = {
                        height: window.innerHeight,
                        width: window.innerWidth
                    };
                },
                close: function() {
                    if (targetButton) {
                        targetButton.setToInactive();
                    }
                    var helpEl = Ext.get("search-help-userinfo");
                    if (helpEl) {
                        var helpBtn = helpEl.child(".cwc-toolbar-help");
                        helpBtn.focus(100);
                    }
                    cwc.setWorkflowAppletVisible(true);
                    this.closeCalled = true;
                },
                destroy: function() {
                    if (targetButton) {
                        targetButton.setToInactive();
                        if (!this.closeCalled) {
                            targetButton.switchStyle("enable");
                        }
                    }
                },
                show: function() {
                    if (targetButton) {
                        targetButton.setToActive();
                    }
                }
            }
        });
        window.onresize = function() {
            var shortcutWindow = Ext.getCmp("keyboardShortcutList");
            if (shortcutWindow) {
                if ((Ext.isIE9 && shortcutWindow.originalWinSize && (window.innerHeight != shortcutWindow.originalWinSize.height || window.innerWidth != shortcutWindow.originalWinSize.width)) || !Ext.isIE9) {
                    reset(shortcutWindow, minWidth);
                    shortcutWindow.originalWinSize = {
                        height: window.innerHeight,
                        width: window.innerWidth
                    };
                }
            }
        };
        w.show();
        reset(w, minWidth);
        cwc.popup = w;
    };
}();
cwc.storeValuesInTab = function(tab, data) {
    if (tab) {
        tab.storeData(data);
    }
};
cwc.storeValueInSession = function(tab, key, value) {
    if (tab) {
        tab.storeDataValueToSession(key, value);
    }
};
cwc.getValueFromSession = function(tab, key, value) {
    if (tab) {
        return tab.getDataValueFromSession(key);
    }
};
cwc.getValueFromTab = function(tab, key) {
    if (tab) {
        return tab.getDataValue(key);
    }
};
cwc.removeValueFromTab = function(tab, key) {
    if (tab) {
        return tab.removeDataValue(key);
    }
};
cwc.bindSessionStateIdToTab = function(tab, stateId) {
    if (tab) {
        tab.setSessionStateId(stateId);
    }
};
cwc.getTabPageBriefInfo = function(tabPage) {
    if (tabPage) {
        var tabInfo = {
            id: tabPage.id,
            title: tabPage.title,
            lazyLoad: tabPage.initialConfig.lazyLoad ? true : false
        };
        return Ext.util.JSON.encode(tabInfo);
    }
    return null;
};
cwc.closeTab = function(tabPanel, targetNextActivePage) {
    var centerPanel = Ext.getCmp(cwc.centerPanelId);
    var nextActiveTab = centerPanel.getNextActiveTab(tabPanel, targetNextActivePage);
    var lazyLoad = false;
    if (nextActiveTab) {
        lazyLoad = nextActiveTab.initialConfig.lazyLoad ? true : false;
    }
    if (cwc.jsDebug == true) {
        window.console && console.debug("Closing tab page " + cwc.getTabPageBriefInfo(tabPanel));
        window.console && console.debug("The next active tab page is " + cwc.getTabPageBriefInfo(nextActiveTab));
    }
    cwc.resetPageLoadingStatus();
    centerPanel.enableFastTabSwitch();
    centerPanel.remove(tabPanel);
    if (lazyLoad == false) {
        cwc.forceUnmaskWindow.defer(200);
    }
    cwc.showPendingMessage();
};
cwc.deferCloseTab = function(tabPanel, deferTimeMillis, nextActiveTabPanel) {
    if (!deferTimeMillis) {
        deferTimeMillis = -1;
    }
    cwc.closeTab.defer(deferTimeMillis, null, [tabPanel, nextActiveTabPanel]);
};
cwc.getValuesFromAllTabs = function(key) {
    var panel = Ext.getCmp(cwc.centerPanelId);
    return panel.getValuesFromAllTabs(key);
};
cwc.showMessages = function(url, beforeShowMsgs, duringOp) {
    if (Ext.isEmpty(url)) {
        cwc.messageManager.showMessageHistory();
    } else {
        Ext.Ajax.request({
            url: url,
            success: function(response, options) {
                var resp = response.responseText;
                var messages = Ext.util.JSON.decode(resp);
                if (duringOp) {
                    if (messages.connected === false) {
                        cwc.xhrFailure(401);
                    } else {
                        if (!messages.busy && cwc.HtmlLoader && cwc.HtmlLoader.getStatus() == cwc.HtmlLoader.STATUS_PAGE_LOADING) {
                            cwc.HtmlLoader.retry();
                        }
                    }
                }
                if (messages.errorCode) {
                    cwc.xhrFailure(messages.errorCode);
                    return;
                }
                if (messages.lwssoKey && cwc.smcEnabled) {
                    hpsmc.xmpp.setLwssoKey(messages.lwssoKey);
                    delete messages.lwssoKey;
                }
                try {
                    if (beforeShowMsgs) {
                        messages = beforeShowMsgs(messages);
                    }
                } catch (e) {
                    messages = null;
                }
                if (messages != null && messages.items && messages.items.length > 0) {
                    cwc.messageManager.showMessageBar(messages, null, duringOp);
                    if (cwc.maskStartTime && Ext.getBody().isMasked()) {
                        cwc.maskStartTime = new Date().getTime();
                    }
                }
            },
            failure: function(response, options) {
                cwc.xhrFailure(response.status, response.getResponseHeader("isSessionConnected") == "true");
            }
        });
    }
};
cwc.checkSecurityQuestion = function() {
    var checked = cwc.store.session.getItem("checkSecurityQuestion");
    if (checked) {
        return;
    }
    var url = "service.do?name=checkSecurityQuestion";
    cwc.XhrRequest(url, function(response) {
        cwc.store.session.setItem("checkSecurityQuestion", true);
        var message = JSON.parse(response.responseText);
        if (message.items.length > 0) {
            cwc.messageManager.showMessageBar(message);
        }
    }, function(response) {
        window.console && console.error("Failed to check security question");
    }, "GET");
};
cwc.addNavContextMenuHandler = function(func) {
    if (!cwc.navContextMenuHandler) {
        cwc.navContextMenuHandler = [];
    }
    cwc.navContextMenuHandler.push(func);
};
cwc.maskWindow = function(message, msgCls) {
    if (cwc.getFrameworkWindow().stopHeartBeat) {
        cwc.getFrameworkWindow().stopHeartBeat();
    }
    message = message || cwc.LOADING;
    msgCls = msgCls || "x-mask-loading";
    if (this.jsDebug == true) {
        if (cwc.maskWindow.caller == null) {
            window.console && console.debug("maskWindow..." + Date.now());
            window.console && console.debug("[Top Cwc.maskWindow] - called from window");
        } else {
            window.console && console.debug("[TopCwc.maskWindow] - called by " + (cwc.debugMask ? cwc.maskWindow.caller : cwc.maskWindow.caller.name));
        }
    }
    var origMaskDiv = Ext.get(cwc.maskId);
    if (!origMaskDiv || !origMaskDiv.isVisible()) {
        cwc.maskStartTime = (new Date()).getTime();
        cwc.lastErrorTimeDuringMask = null;
    }
    cwc.blockKeyCodesForMask();
    if (cwc.messageBoxShown == true) {
        var maskEl = Ext.getBody().mask();
        cwc.maskId = maskEl.id;
    } else {
        if (!Ext.getBody().isMasked()) {
            cwc.maskId = Ext.getBody().mask(message, msgCls).id;
        }
    }
    if (!cwc.maskMessageShadow) {
        cwc.maskMessageShadow = new Ext.Shadow({
            mode: "drop",
            offset: 4
        });
    }
    if (cwc.showMaskCloseButtonDelay != -1) {
        cwc.createMaskCloser(cwc.maskId);
    }
    Ext.fly(cwc.maskId).setStyle("cursor", "wait");
    cwc.initializeMaskDetector();
};
cwc.initializeMaskDetector = function() {
    if (!cwc.maskDetector) {
        cwc.maskDetector = window.setInterval(function() {
            var now = new Date().getTime();
            if (cwc.maskStartTime && Ext.getBody().isMasked()) {
                if (cwc.maskCloser && ((cwc.showMaskCloseButtonDelay > 0 && (now - cwc.maskStartTime >= cwc.showMaskCloseButtonDelay * 1000)) || (cwc.lastErrorTimeDuringMask && (now - cwc.lastErrorTimeDuringMask) >= cwc.showMaskCloseButtonOnErrorDelay * 1000))) {
                    if (Ext.fly(cwc.maskId)) {
                        cwc.showMaskMessage(0.3);
                        var zindex = Ext.fly(cwc.maskId).getStyle("z-index");
                        cwc.maskCloser.setStyle("z-index", (parseInt(zindex, 10) + 1));
                        cwc.maskCloser.setVisible(true);
                    }
                }
                var elapsedTime = now - cwc.maskStartTime;
                if (elapsedTime >= cwc.maskMessageDelay * 1000 && !cwc.messageBoxShown) {
                    cwc.showMaskMessage();
                }
                if (elapsedTime >= cwc.autoCloseMaskDelay * 1000) {
                    cwc.forceUnmaskWindow();
                }
            }
        }, 1000);
    }
};
cwc.createMaskCloser = function(maskId) {
    if (maskId && !cwc.maskCloser) {
        var closerEl = Ext.DomHelper.insertAfter(maskId, {
            "tag": "div",
            "id": cwc.maskCloserId,
            "class": "x-mask-close-btn"
        });
        var maskCloser = Ext.get(closerEl.id);
        maskCloser.setVisible(false);
        new Ext.ToolTip({
            target: cwc.maskCloserId,
            html: cwc.REMOVE_MASK_TIP,
            closable: false,
            autoHide: true,
            draggable: false
        });
        maskCloser.on({
            "click": function() {
                cwc.forceUnmaskWindow();
            }
        });
        cwc.maskCloser = maskCloser;
    }
};
cwc.forceUnmaskWindow = function() {
    cwc.jsDebug && window.console && console.debug("forceUnmaskWindow..." + Date.now());
    if (cwc.maskForever) {
        window.clearInterval(cwc.maskDetector);
        return;
    }
    if (cwc.maskId) {
        Ext.fly(cwc.maskId).setStyle("cursor", "default");
        Ext.fly(cwc.maskId).moveTo(1, 1);
    }
    cwc.maskId = null;
    clearInterval(cwc.maskDetector);
    cwc.maskDetector = null;
    cwc.lastErrorTimeDuringMask = null;
    cwc.maskStartTime = null;
    if (cwc.maskCloser) {
        cwc.maskCloser.hide();
    }
    cwc.resetPageLoadingStatus();
    if (cwc.maskMessageShadow) {
        cwc.maskMessageShadow.hide();
    }
    Ext.getBody().unmask();
    cwc.unblockKeyCodesForMask.defer(200);
    if (cwc.getFrameworkWindow().startHeartBeat) {
        cwc.getFrameworkWindow().startHeartBeat();
    }
};
cwc.unmaskWindow = function() {
    if (cwc.maskWindowLock) {
        return;
    }
    if (!cwc.maskId) {
        return;
    }
    if (cwc.isReadyForUnmask()) {
        delete cwc.unmaskPlooing;
        if (cwc.unmaskDeferMillis > 0) {
            cwc.forceUnmaskWindow.defer(cwc.unmaskDeferMillis);
        } else {
            cwc.forceUnmaskWindow();
        }
    } else {
        if (cwc.unmaskPlooing) {
            window.clearTimeout(cwc.unmaskPlooing);
        }
        cwc.unmaskPlooing = window.setTimeout(cwc.unmaskWindow, 100);
    }
};
cwc.isReadyForUnmask = function() {
    if (cwc.HtmlLoader && cwc.HtmlLoader.getStatus() != cwc.HtmlLoader.STATUS_READY) {
        return false;
    }
    if (!cwc.isCurrentTabLoaded()) {
        cwc.jsDebug && window.console && console.debug("TopCwc.unmaskWindow - unmask failed. isLoadingList:" + cwc.isLoadingList + ", isLoadingDetail:" + cwc.isLoadingDetail);
        return false;
    }
    return true;
};
cwc.hideMaskMessage = function() {
    if (Ext.fly(cwc.maskId) && Ext.getBody().isMasked()) {
        var maskMessage = Ext.select("div#" + cwc.maskId + " ~ div.ext-el-mask-msg").first();
        if (maskMessage) {
            maskMessage.hide();
            cwc.maskMessageShadow.hide();
        }
    }
};
cwc.showMaskMessage = function(maskOpacity) {
    if (Ext.fly(cwc.maskId) && Ext.getBody().isMasked()) {
        var maskMessage = Ext.select("div#" + cwc.maskId + " ~ div.ext-el-mask-msg").first();
        if (!maskMessage) {
            cwc.maskId = Ext.getBody().mask(cwc.LOADING, "x-mask-loading").id;
            maskMessage = Ext.select("div#" + cwc.maskId + " ~ div.ext-el-mask-msg").first();
        }
        if (maskMessage) {
            if (maskOpacity) {
                var maskElement = Ext.get(cwc.maskId);
                maskElement.setOpacity(maskOpacity, false);
            }
            maskMessage.setVisible(true);
            if (!cwc.maskMessageShadow.isVisible()) {
                cwc.maskMessageShadow.show(maskMessage);
            }
        }
    }
};
cwc.focusBack = function() {
    var activeTab = cwc.getActiveTab(),
        wndw = activeTab.getDetailMIF().getFrameWindow();
    if (wndw && wndw.hpsm && wndw.hpsm.Table && wndw.hpsm.Table.isMagnified()) {
        wndw.hpsm.Table.restoreFocus();
    }
    if (cwc.isIE) {
        cwc.tryCall("focusOnFirstFocusableField", wndw);
    }
    cwc.tryCall("tpzInitFocus", wndw);
    var listFrame = activeTab.hasListDetail() ? activeTab.getListFrameWindow() : activeTab.getFrameWindow();
    if (listFrame && listFrame.hpsm && listFrame.hpsm.local && listFrame.hpsm.local.recordsList) {
        var grid = listFrame.hpsm.local.recordsList;
        if (grid) {
            grid.selectDefaultRow();
        }
    }
};
cwc.lockWindow = function() {
    cwc.exitConfirmRequired = false;
    cwc.maskForever = true;
    cwc.maskWindow(cwc.CLIENT_EXPIRED_MSG, "x-mask-lock");
    cwc.showMaskMessage(0.3);
};
cwc.unblockKeyCodesForMask = function() {
    if (!(cwc.messageBoxShown || Ext.getBody().isMasked())) {
        for (var i = 0, len = cwc.blockKeyCodesDuringMask.length; i < len; i++) {
            cwc.unBlockKeycode(cwc.blockKeyCodesDuringMask[i]);
        }
    }
};
cwc.blockKeyCodesForMask = function() {
    for (var i = 0, len = cwc.blockKeyCodesDuringMask.length; i < len; i++) {
        cwc.blockKeycode(cwc.blockKeyCodesDuringMask[i]);
    }
};
cwc.XhrRequest = function(url, success, failure, method) {
    Ext.Ajax.request({
        url: url,
        method: method,
        success: function(response, options) {
            if (success) {
                success(response, options);
            }
        },
        failure: function(response, options) {
            if (failure) {
                failure(response, options);
            }
        }
    });
};
cwc.XhrRequestWithParams = function(url, success, failure, params, method) {
    Ext.Ajax.request({
        url: url,
        method: method,
        params: params,
        success: function(response, options) {
            if (success) {
                success(response, options);
            }
        },
        failure: function(response, options) {
            if (failure) {
                failure(response, options);
            }
        }
    });
};
cwc.serializeForm = function(form) {
    return Ext.Ajax.serializeForm(form);
};
cwc.setHelpPage = function(helpUrl) {
    if (helpUrl != null && helpUrl.length > 0) {
        cwc.helpUrl = helpUrl;
    }
};
cwc.help = function(param) {
    if (cwc.helpUrl) {
        var helpurl = cwc.helpUrl;
        var clearHelpHistoryParam = "clearHelpHistory=true";
        var addContext = true;
        var protocolIndex = helpurl.indexOf("://");
        if (protocolIndex >= 0) {
            if (helpurl.indexOf("url=") == -1 || (helpurl.indexOf("url=") != -1 && (protocolIndex < helpurl.indexOf("url=")))) {
                addContext = false;
            }
        }
        if (helpurl.indexOf("url=") > 0) {
            var lastIndex = (helpurl.indexOf("&") > 0) ? helpurl.indexOf("&") : helpurl.length;
            var urlParam = helpurl.substring(helpurl.indexOf("url=") + 4, lastIndex);
            var encodedUrlParam = encodeURIComponent(urlParam);
            helpurl.replace(urlParam, encodedUrlParam);
        }
        if (addContext) {
            helpurl = cwc.frameworkContext + "/" + helpurl;
        }
        var options = "width=700,height=500,resizable=1,scrollbars=0,location=0,menubar=0,status=1,toolbar=0,fullscreen=0,hotkeys=0,directories=0,dialog=1";
        cwc.sysWndws.wndwHelp = window.open(helpurl, "CWC_Help", options);
        cwc.sysWndws.wndwHelp.focus();
        return true;
    }
    return false;
};
cwc.updateActiveTab = function(url) {
    cwc.maskWindow();
    cwc.getActiveTab().getMIF().getFrame().setSrc(cwc.toCSRFSafe(url));
};
cwc.setActiveTab = function(tabPanel) {
    if (tabPanel) {
        Ext.getCmp(cwc.centerPanelId).activate(tabPanel);
    }
};
cwc.updateActiveThread = function(threadId) {
    var url = cwc.frameworkContext + "/service.do";
    url = cwc.toCSRFSafe(url);
    Ext.Ajax.request({
        url: url,
        headers: {
            "Accept": "application/json"
        },
        params: {
            name: "updateActiveThread",
            thread: threadId
        },
        success: function(opts) {
            var thread = Ext.decode(opts.responseText);
            cwc.gtrigger("cwc:threadactived", threadId);
            if (cwc.jsDebug) {
                console.info(String.format("Update active thread to thread (id: {0}) is successful.", thread.thread));
            }
        },
        failure: function(opts) {
            if (window.console) {
                console.error(String.format("Update active thread to thread (id: {0}) is failed.", threadId));
            }
        }
    });
};
cwc.getTabsByValue = function(key, value) {
    return Ext.getCmp(cwc.centerPanelId).getTabsByValue(key, value);
};
cwc.getTabByThreadId = function(threadId) {
    var tabs = cwc.getTabsByValue("threadId", threadId);
    if (tabs && tabs.length == 1) {
        return tabs[0];
    }
    return null;
};
cwc.isPageReloaded = function() {
    return cwc.pageReloaded;
};
cwc.setPageReloaded = function(param) {
    cwc.pageReloaded = param;
};
cwc.uniAddFavorite = function(isForList, addFavBtn) {
    var tab = cwc.getActiveTab();
    var addFav = function(type, goHead) {
        if (tab.hasListDetail()) {
            cwc.addFavorite(type, type === "list" ? tab.getListFrameDocument() : tab.getDetailFrameDocument(), null, addFavBtn);
        } else {
            if (goHead) {
                var detailFrame = tab.getFrame();
                detailFrame = (detailFrame.xtype == "iframepanel" || detailFrame.xtype == "hpsm-ux-iframepanel") ? detailFrame.getFrame() : detailFrame;
                var wnd = detailFrame.getWindow();
                if (wnd.DASHBOARD) {
                    wnd.DASHBOARD.addDashboardToFavorite();
                } else {
                    cwc.addFavorite(type, null, null, addFavBtn);
                }
            }
        }
    };
    if (isForList) {
        addFav("list", tab.getMIF().hasListOnly());
    } else {
        addFav("record", !tab.getMIF().hasListOnly());
    }
};
cwc.addFavorite = function(type, frameDoc, callbackFn, addFavBtn) {
    type = type || "record";
    var doc = (frameDoc) ? frameDoc : cwc.getActiveTab().getFrameDocument();
    var elem = doc.getElementById("favorites_add");
    if (!elem) {
        cwc.createFavError();
        return;
    }
    var elemValue = elem.value;
    var urlValue = elemValue.replace(/amp;/g, "");
    var params = Ext.urlDecode(urlValue);
    if (params.ctx == "dashboard" || params.ctx == "report" || params.ctx == "chart") {
        type = params.ctx;
    } else {
        var file = (params.file) ? params.file : "";
        var query = (params.query) ? params.query : "";
        if (file == "" || file == "environment" || query.substring(0, 4) == "null" || file == "typecheck") {
            cwc.createFavError();
            return;
        }
    }
    var title = (params.title) ? decodeURIComponent(params.title) : "";
    title = title.replace(/\+/g, " ");
    var dialog = Ext.Msg.getDialog();
    cwc.util.setDialogARIA(dialog);
    Ext.MessageBox.show({
        title: cwc.FAV_TITLE_PROMPT,
        msg: "",
        width: 400,
        prompt: true,
        buttons: Ext.MessageBox.OKCANCEL,
        value: title,
        fn: function(btn, text) {
            if (btn == "ok") {
                cwc.doAddFavorite(type, urlValue, text, callbackFn);
            }
            addFavBtn.focus();
        }
    });
    cwc.changeMsgButtonStyle(dialog);
};
cwc.doAddFavorite = function(type, urlValue, text, callbackFn) {
    var result = text;
    if (result == null) {
        return;
    } else {
        if (result.length == 0) {
            result = title;
        }
    }
    if (result.length > 0) {
        var urlParams = Ext.urlEncode({
            "class": type,
            "id": cwc.favoriteRootId,
            "name": "navAddNode",
            "usertitle": result
        });
        var url = cwc.menuService + "?" + urlValue + "&" + urlParams;
        Ext.Ajax.request({
            url: url,
            method: "POST",
            success: function(response, options) {
                Ext.getCmp("navSearchInput").resetTree();
                cwc.updateNavFavorites(function() {
                    var favTree = Ext.getCmp(cwc.navId).items.items[0];
                    favTree.expand(false);
                    favTree.collapsible = false;
                    var childNodes = favTree.root.childNodes;
                    var homonyms = [];
                    var count = 0;
                    for (var i = 0, maxi = childNodes.length; i < maxi; i++) {
                        var child = childNodes[i];
                        var ctext = child.text;
                        if (ctext.indexOf(result) == 0) {
                            if (ctext.length == result.length || (ctext.substr(result.length + 1, 1) == "(" && ctext.substr(ctext.length - 1) == ")")) {
                                var suffix = (ctext.substr(ctext.length - 1) != ")") ? (" (" + count + ")") : "";
                                homonyms[encodeURIComponent(ctext + suffix)] = child;
                                count++;
                            }
                        }
                    }
                    var childKey = encodeURIComponent(result + " (" + (count - 1) + ")");
                    var cnode = homonyms[childKey];
                    var scrollNode = function(cnode) {
                        var a = cnode.getUI().getEl();
                        a.scrollIntoView(false);
                        var el = Ext.get(cnode.ui.elNode);
                        var cfg = {
                            duration: 0.6
                        };
                        var color = "C3DAF9";
                        el.highlight(color, cfg).highlight(color, cfg).highlight(color, cfg);
                    };
                    if (cnode) {
                        setTimeout(scrollNode(cnode), 600);
                    }
                });
                if (callbackFn) {
                    callbackFn.call();
                } else {
                    cwc.updateFavoriteIcon(type, false);
                }
                cwc.clearSearchTreeCache();
            },
            failure: function(response, options) {
                cwc.xhrFailure(response.status, response.getResponseHeader("isSessionConnected") == "true");
            }
        });
    }
};
cwc.createFavError = function() {
    var activeTab = cwc.getActiveTab();
    var wndw = activeTab.hasListDetail() ? activeTab.getDetailFrameWindow() : activeTab.getFrameWindow();
    if (wndw.generateFavError) {
        wndw.generateFavError();
    } else {
        alert(cwc.FAV_ERROR_CREATE);
    }
};
cwc.xhrFailure = function(errorCode, isSessionConnected) {
    switch (errorCode) {
        case 400:
            cwc.logMessage("error", "cwc-base.js", "Error " + errorCode + " - Request for non-existent tree node");
            break;
        case 401:
            cwc.exitConfirmRequired = false;
            if (cwc.isPreAuthenticated) {
                window.location = isSessionConnected ? cwc.logoutCleanupJsp : cwc.ssoTimeoutUrl;
            } else {
                var loginRedirectURL = (Ext.isEmpty(cwc.loginRedirect)) ? cwc.srcOrigDetail : cwc.loginRedirect;
                var urlParams = Ext.urlEncode({
                    "login_error": "1",
                    "login_error_message": cwc.SESSION_TIMEOUT,
                    "lang": cwc.getCookie("lang")
                });
                window.location = loginRedirectURL + (loginRedirectURL.indexOf("?") != -1 ? "&" : "?") + urlParams;
            }
            break;
        case 403:
            cwc.openDialogBox("403", cwc.frameworkContext + "/cwc/accessDenied.jsp", true, 400, 500);
            break;
        case 1000:
            var frameworkWin = cwc.getFrameworkWindow();
            if (frameworkWin.invalidateClient) {
                frameworkWin.invalidateClient();
            }
            break;
        default:
            cwc.logMessage("error", "cwc-base.js", "Error " + errorCode + " received from Nav Menu Servlet");
            return errorCode;
    }
};
cwc.blockKeycode = function(elem) {
    if (cwc.blockKeyCodeArr.indexOf(elem) < 0) {
        cwc.blockKeyCodeArr.push(elem);
    }
};
cwc.unBlockKeycode = function(elem) {
    do {
        cwc.blockKeyCodeArr.remove(elem);
    } while (cwc.blockKeyCodeArr.indexOf(elem) > -1);
};
cwc.isBlockedKeycode = function(elem) {
    return cwc.maskId || (cwc.blockKeyCodeArr.indexOf(elem) > -1);
};
cwc.syncViewRecordListWithTab = function(activeTab) {
    if (cwc.toggleRecordListEnabled) {
        activeTab = activeTab || cwc.getActiveTab();
        if (activeTab) {
            var threadViewRecordList = activeTab.getDataValue("viewRecordList");
            if (threadViewRecordList != undefined && cwc.viewRecordList !== threadViewRecordList) {
                cwc.toggleRecordList({
                    viewRecordList: threadViewRecordList,
                    mask: false,
                    unmask: false
                });
            }
        }
    }
};
cwc.updateToggleRecordListStatus = function(status) {
    var toggleRecordListButton = Ext.getCmp(cwc.btnToggleRecordList);
    toggleRecordListButton.toggle(status, true);
    var toggleButtonTip = status ? cwc.NAVMENU_TOGGLE_RECORDLIST_OFF : cwc.NAVMENU_TOGGLE_RECORDLIST_ON;
    toggleRecordListButton.setTooltip(toggleButtonTip);
};
cwc.toggleRecordList = function(toggleOptions) {
    if (!toggleOptions || toggleOptions.mask) {
        cwc.maskWindow();
    }
    var url = cwc.frameworkContext + "/service.do";
    var params = "name=toggleRecordlist";
    if (toggleOptions) {
        if (toggleOptions.viewRecordList !== undefined) {
            if (toggleOptions.viewRecordList) {
                params += "&viewrecordlist=true";
            } else {
                params += "&viewrecordlist=false";
            }
        }
        if (toggleOptions.updateAsPreferred) {
            params += "&updateAsPreferred=true";
        }
    }
    var successHandler = function(opt) {
        var myOptions = opt;
        return function(response, options) {
            var resp = response.responseText;
            var result = Ext.util.JSON.decode(resp);
            cwc.viewRecordList = result.viewRecordList;
            cwc.preferredViewRecordList = result.preferredViewRecordList;
            cwc.updateToggleRecordListStatus(cwc.preferredViewRecordList);
            if (myOptions && myOptions.callback && (typeof myOptions.callback === "function")) {
                myOptions.callback.call(myOptions);
            }
            if (!myOptions || myOptions.unmask) {
                cwc.unmaskWindow();
            }
        };
    }(toggleOptions);
    var failureHandler = function(response, options) {
        cwc.unmaskWindow();
        cwc.xhrFailure(response.status, response.getResponseHeader("isSessionConnected") == "true");
    };
    cwc.XhrRequestWithParams(url, successHandler, failureHandler, params, "POST");
};
cwc.toggleStyle = function(elem, className, isAdded) {
    if (isAdded === undefined) {
        cwc.toggleClass(elem, className);
    } else {
        if (isAdded) {
            cwc.addStyle(elem, className);
        } else {
            cwc.removeStyle(elem, className);
        }
    }
};
cwc.addStyle = cwc.addStyleClass = function(elem, className) {
    var cmp = Ext.fly(elem);
    if (!cmp.hasClass(className)) {
        cmp.addClass(className);
    }
};
cwc.removeStyle = cwc.removeStyleClass = function(elem, className) {
    var cmp = Ext.fly(elem);
    if (cmp.hasClass(className)) {
        cmp.removeClass(className);
    }
};
cwc.toggleClass = cwc.toggleStyleClass = function(elem, className) {
    var cmp = Ext.fly(elem);
    if (cmp.hasClass(className)) {
        cmp.removeClass(className);
    } else {
        cmp.addClass(className);
    }
};
cwc.scrollNodeIntoView = function(node) {
    if (node) {
        var treePanel = node.getOwnerTree();
        var accordion = Ext.getCmp(cwc.navId);
        accordion.setActiveItem(treePanel.id);
        treePanel.expandPath(node.getPath(), "", function(success, lastNode) {
            if (success) {
                treePanel.getSelectionModel().select(node);
                var elem = accordion.el.dom.firstChild.firstChild;
                (function(elem) {
                    Ext.get(this.ui.elNode).scrollIntoView(elem, false);
                }).defer(500, node, [elem]);
            }
        });
    }
};
cwc.closeAllSysPopups = function() {
    var c = cwc.sysWndws;
    if (c.wndwPrintPrev && !c.wndwPrintPrev.closed) {
        c.wndwPrintPrev.close();
    }
    if (c.wndwAbout && !c.wndwAbout.closed) {
        c.wndwAbout.close();
    }
    if (c.wndwMessages && !c.wndwMessages.closed) {
        c.wndwMessages.close();
    }
    if (c.wndwHelp && !c.wndwHelp.closed) {
        c.wndwHelp.close();
    }
};
cwc.disableToolBar = function(pageType) {
    var activeTab = cwc.getActiveTab();
    if (activeTab.hasListDetail()) {
        ("list" == pageType) ? activeTab.getListFrame().getTopToolbar().disable(): activeTab.getDetailFrame().getTopToolbar().disable();
    } else {
        activeTab.getMIF().getTopToolbar().disable();
    }
};
cwc.enableToolBar = function(pageType) {
    var activeTab = cwc.getActiveTab();
    if (activeTab.hasListDetail()) {
        ("list" == pageType) ? activeTab.getListFrame().getTopToolbar().enable(): activeTab.getDetailFrame().getTopToolbar().enable();
    } else {
        cwc.getActiveTab().getMIF().getTopToolbar().enable();
    }
};
cwc.disableToolBarButton = function(button) {
    var toolbar, btn;
    var activeTab = cwc.getActiveTab();
    if (activeTab.hasListDetail()) {
        toolbar = activeTab.getListFrame().getTopToolbar();
        btn = toolbar.getButtonByIcon(button);
        if (btn) {
            btn.disable();
        } else {
            toolbar = activeTab.getDetailFrame().getTopToolbar();
            btn = toolbar.getButtonByIcon(button);
            if (btn) {
                btn.disable();
            }
        }
    } else {
        toolbar = activeTab.getMIF().getTopToolbar();
        btn = toolbar.getButtonByIcon(button);
        if (btn) {
            btn.disable();
        }
    }
};
cwc.enableToolBarButton = function(button) {
    var toolbar, btn;
    var activeTab = cwc.getActiveTab();
    if (activeTab.hasListDetail()) {
        toolbar = activeTab.getListFrame().getTopToolbar();
        btn = toolbar.getButtonByIcon(button);
        if (btn) {
            btn.enable();
        } else {
            toolbar = activeTab.getDetailFrame().getTopToolbar();
            btn = toolbar.getButtonByIcon(button);
            if (btn) {
                btn.enable();
            }
        }
    } else {
        toolbar = activeTab.getMIF().getTopToolbar();
        btn = toolbar.getButtonByIcon(button);
        if (btn) {
            btn.enable();
        }
    }
};
cwc.setManualPageInit = function(value) {
    this.isManualPageInit = value;
};
cwc.setCookie = function(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path = /";
};
cwc.getCookie = function(name) {
    var nameEQ = name + "=";
    var cookieIndex = document.cookie.indexOf(name);
    if (cookieIndex >= 0) {
        var cookieValue = document.cookie.substring(cookieIndex + nameEQ.length);
        var cookieValueEnd = cookieValue.indexOf(";");
        if (cookieValueEnd >= 0) {
            cookieValue = cookieValue.substring(0, cookieValueEnd);
        }
        return cookieValue;
    }
    return null;
};
cwc.isWindowObj = function(obj) {
    try {
        return obj && obj.navigator && obj.navigator.userAgent && obj.location && top.toString() == obj.toString();
    } catch (e) {
        return false;
    }
};
cwc.WindowList = function() {
    function JSWindow(name, win) {
        this.name = name;
        this.wndw = win;
    }
    return {
        add: function(name, win) {
            var newWindow = new JSWindow(name, win);
            cwc.windows.push(newWindow);
        },
        get: function(name) {
            var returnVal = null;
            if (cwc.windows != null && cwc.windows.length > 0) {
                for (var i = 0; i < cwc.windows.length; i++) {
                    if (cwc.windows[i].name == name) {
                        returnVal = cwc.windows[i].wndw;
                        break;
                    }
                }
            }
            return returnVal;
        },
        close: function(name) {
            if (cwc.windows != null && cwc.windows.length > 0) {
                for (var i = 0; i < cwc.windows.length; i++) {
                    if (cwc.windows[i].name == name) {
                        cwc.windows[i].wndw.close();
                        cwc.windows.splice(i, 1);
                    }
                }
            }
        },
        closeAll: function() {
            if (cwc.windows != null && cwc.windows.length > 0) {
                for (var i = 0; i < cwc.windows.length; i++) {
                    cwc.windows[i].wndw.close();
                }
                cwc.windows = null;
                cwc.windows = [];
            }
        }
    };
}();
cwc.getURLBuilder = function() {
    return hpsm.URLBuilder.getURLBuilder();
};
cwc.getDetailURLBuilder = function() {
    return hpsm.URLBuilder.getDetailURLBuilder();
};
cwc.getListDetailURLBuilder = function() {
    return hpsm.URLBuilder.getListDetailURLBuilder();
};
cwc.getListURLBuilder = function() {
    return hpsm.URLBuilder.getListURLBuilder();
};
cwc.getServiceURLBuilder = function() {
    return hpsm.URLBuilder.getServiceURLBuilder();
};
cwc.getNavMenuURLBuilder = function() {
    return hpsm.URLBuilder.getNavMenuURLBuilder();
};
cwc.getWorkflowURLBuilder = function() {
    return hpsm.URLBuilder.getWorkflowURLBuilder();
};
cwc.addChildElement = function(parent, tag, type, id_name, value) {
    var elem = parent.ownerDocument.createElement(tag);
    if (type) {
        elem.setAttribute("type", type);
    }
    if (id_name) {
        elem.setAttribute("id", id_name);
        elem.setAttribute("name", id_name);
    }
    if (value) {
        elem.setAttribute("value", value);
    }
    parent.appendChild(elem);
};
cwc.scrollIntoView = function(elem) {
    var activeTab = cwc.getActiveTab();
    if (activeTab.hasListDetail()) {
        var theHiddenPanelId = cwc.isVerticalLayout() ? cwc.northPanelId : cwc.westPanelId;
        var theHiddenPanel = activeTab.getFrameWindow().Ext.getCmp(theHiddenPanelId);
        var theHiddenSplit = activeTab.getFrameWindow().Ext.fly(theHiddenPanelId + "-xsplit");
        var needRestorePanel = false;
        if (theHiddenPanel.hideMode == "visibility") {
            theHiddenPanel.addClass("x-hide-display");
            needRestorePanel = true;
        }
        theHiddenSplit.addClass("x-hide-display");
        elem.scrollIntoView(true);
        if (needRestorePanel) {
            theHiddenPanel.removeClass("x-hide-display");
        }
        theHiddenSplit.removeClass("x-hide-display");
    } else {
        elem.scrollIntoView(true);
    }
};
(function() {
    cwc.cleanupElCache = function(wnd) {
        var el, elem, docCache, needClean, doc = wnd.document,
            docId = doc.id;
        if (Ext._documents) {
            docCache = Ext._documents[docId];
        }
        for (var i in Ext.elCache) {
            el = Ext.elCache[i].el;
            elem = el.dom;
            needClean = false;
            try {
                if (elem == null) {
                    needClean = true;
                } else {
                    if (cwc.isWindowObj(elem) && elem === wnd) {
                        needClean = true;
                    } else {
                        if (isDocumentObj(elem) && elem === doc) {
                            needClean = true;
                        } else {
                            if (el instanceof Ext.Element && elem.ownerDocument === doc) {
                                needClean = true;
                            }
                        }
                    }
                }
            } catch (e) {
                needClean = true;
            }
            if (needClean) {
                cleanupObjectInCache(el, docCache);
            }
        }
    };

    function isDocumentObj(obj) {
        return obj && obj.nodeType === 9;
    }

    function cleanupObjectInCache(el, docCache) {
        if (cwc.jsDebug && window.console) {
            console.log("clean el:" + el.id);
        }
        var dom = el.dom;
        var eid = el.id;
        var cache = Ext.elCache;
        if (Ext.enableListenerCollection) {
            Ext.EventManager.removeAll(dom);
        }
        delete cache[eid];
        if (docCache) {
            delete docCache[eid];
        }
    }
})();
cwc.setProperty = function(target, properties) {
    if (target && Ext.isObject(target) && target.set) {
        target.set(properties);
    }
};
cwc.toJSON = function(o) {
    if (window.JSON && JSON.stringify) {
        return JSON.stringify(o);
    }
};
cwc.fromJSON = function(s) {
    if (window.JSON && JSON.parse) {
        return JSON.parse(s);
    }
};
cwc.getObjectByAttributePath = function(attrPath, scope) {
    var o = cwc.getObjectWithScope(attrPath, scope);
    return o == null ? null : o.obj;
};
cwc.getObjectWithScope = function(attrPath, scope) {
    scope = scope || window;
    var paths = Ext.isArray(attrPath) ? attrPath : attrPath.split(".");
    var current = scope[paths[0]];
    if (current == null) {
        return null;
    } else {
        var sub = paths.slice(1);
        if (sub.length == 0) {
            return {
                obj: current,
                scope: scope
            };
        } else {
            return cwc.getObjectWithScope(sub, current);
        }
    }
};
cwc.callFunctionInContext = function(func, args, context) {
    if (!func) {
        return;
    }
    if (Ext.isFunction(func)) {
        return func.apply(window, args);
    } else {
        if (Ext.isFunction(func.fn)) {
            return func.fn.apply(func.scope || window, args);
        } else {
            if (typeof func == "string") {
                context = context || window;
                var o = cwc.getObjectWithScope(func, context);
                if (o && Ext.isFunction(o.obj)) {
                    return o.obj.apply(o.scope || context, args);
                } else {
                    window.console && console.debug("cannot call no-function value with " + func);
                    return;
                }
            }
        }
    }
    window.console && console.debug("invalid parameter in callFunctionInContext");
};
cwc.lookupComponentByElement = function(element, context) {
    context = context || window;
    element = context.Ext.get(element);
    try {
        while (element) {
            var id = element.id;
            if (id.startsWith("ext-comp-") || id.startsWith("mif-comp-")) {
                return context.Ext.getCmp(id);
            }
            element = element.parent();
        }
    } catch (e) {}
    return null;
};
cwc.getActivePopup = function() {
    return cwc.activePopup;
};
cwc.getUserName = function() {
    return this.userName;
};
! function() {
    cwc.ORIENTAL_HORIZONTAL = "h";
    cwc.ORIENTAL_VERTICAL = "v";
    var ORIENTAL_KEY = "listdetail-oriental";
    cwc.setListDetailOriental = function(ori) {
        ori = ori || cwc.ORIENTAL_HORIZONTAL;
        cwc.store.local.setItem(cwc.getUserName() + "_" + ORIENTAL_KEY, ori);
    };
    cwc.getListDetailOriental = function() {
        return cwc.store.local.getItem(cwc.getUserName() + "_" + ORIENTAL_KEY) || cwc.ORIENTAL_HORIZONTAL;
    };
    cwc.isHorizontalLayout = function() {
        return this.getListDetailOriental() == cwc.ORIENTAL_HORIZONTAL;
    };
    cwc.isVerticalLayout = function() {
        return this.getListDetailOriental() == cwc.ORIENTAL_VERTICAL;
    };
    cwc.isGridHoverEnabled = function(tab) {
        tab = tab || cwc.getActiveTab();
        return !cwc.getActivePopup() && tab && tab.hasListDetail();
    };
    cwc.isGridHoverShown = false;
}();
cwc.setMenuAria = function(menu) {
    if (menu.ul) {
        cwc.setProperty(menu.ul, {
            "role": "menu",
            "tabindex": "-1"
        });
    }
    if (menu.ul && menu.ownerCt) {
        cwc.setProperty(menu.ul, {
            "aria-labelledby": menu.ownerCt.btnEl.id
        });
        cwc.setProperty(menu.ownerCt.btnEl, {
            "aria-controls": menu.ul.id,
            "aria-expanded": "true"
        });
    }
    if (menu.items && menu.items.length > 0) {
        for (var i = 0, len = menu.items.length; i < len; i++) {
            var item = menu.items.items[i];
            if (Ext.isIE10) {
                cwc.setProperty(item.positionEl, {
                    "role": "menuitem"
                });
                cwc.setProperty(item.el, {
                    "role": "presentation",
                    "tabindex": "-1"
                });
            } else {
                cwc.setProperty(item.positionEl, {
                    "role": "none"
                });
                cwc.setProperty(item.el, {
                    "role": "menuitem",
                    "tabindex": "-1"
                });
            }
            if (item.menu) {
                cwc.setProperty(item.el, {
                    "aria-haspopup": "true"
                });
                item.menu.on("show", function(sbuMenu) {
                    cwc.setMenuAria(sbuMenu);
                }, this);
                item.menu.on("hide", function(sbuMenu) {
                    if (sbuMenu.ul) {
                        cwc.setProperty(sbuMenu.ul, {
                            "aria-expanded": "false",
                            "aria-hidden": "true"
                        });
                    }
                }, this);
            }
            var spanElem = item.el.child("span.x-menu-item-text");
            if (spanElem) {
                var tooltip = spanElem.dom.firstChild.nodeValue;
                var isEmptySpanContent = tooltip.length == 0 || tooltip.length == 1 && tooltip.charCodeAt(0) == 160;
                if (isEmptySpanContent && cwc.isAccessibleMode && !item.disabled) {
                    spanElem.dom.firstChild.nodeValue = item.tooltip ? item.tooltip : tooltip;
                    spanElem.set({
                        "style": "visibility: hidden"
                    });
                }
            }
        }
    }
};
if (window.Ext) {
    Ext.getBody().on("unload", function() {
        cwc.closeAllSysPopups();
        cwc.WindowList.closeAll();
    });
}
cwc.playSound = function(soundURL) {
    var soundTag;
    if (cwc.isIE7 || cwc.isIE8) {
        soundTag = document.createElement("bgsound");
    } else {
        soundTag = document.createElement("audio");
        soundTag.setAttribute("style", "height:0px;width:0px");
        soundTag.setAttribute("autoplay", "true");
    }
    soundTag.setAttribute("src", soundURL);
    document.body.appendChild(soundTag);
    window.setTimeout(function() {
        document.body.removeChild(soundTag);
    }, 5000);
};
cwc.playBeep = function() {
    cwc.beepAudioElement.play();
};
cwc.removeNavMoreBtn = function() {
    var navToolBarLayout = Ext.getCmp(cwc.navToolBarId).layout;
    navToolBarLayout.clearMenu();
    navToolBarLayout.hiddenItems = [];
    var items = navToolBarLayout.container.items.items;
    for (var i = 0; i < items.length; i++) {
        item = items[i];
        item.xtbHidden = false;
    }
    if (navToolBarLayout.more) {
        navToolBarLayout.more.destroy();
        delete navToolBarLayout.more;
    }
};
cwc.resizeNavToolBar = function() {
    Ext.getCmp(cwc.navToolBarId).layout.fitToSize(Ext.get(cwc.navToolBarId));
};
(function() {
    var oriTitle, btask, blinking, msg;
    cwc.startBlinkTitle = function(message) {
        if (blinking) {
            return;
        }
        cwc.documentTitle = document.title;
        blinking = true;
        if (!oriTitle) {
            oriTitle = document.title;
        }
        msg = message;
        btask = setInterval(switchTitle, 800);
    };
    cwc.stopBlinkTitle = function() {
        if (!blinking) {
            return;
        }
        window.clearInterval(btask);
        document.title = oriTitle;
        oriTitle = null;
        btask = null;
        blinking = false;
        msg = null;
        delete cwc.documentTitle;
    };

    function switchTitle() {
        if (document.title === oriTitle) {
            document.title = msg;
        } else {
            document.title = oriTitle;
        }
    }
})();
(function() {
    var CLPS_SECTION_CNT = "sm-clpsSectionCnt";
    var CLPS_SECTION_CAP = ".sm-clpsSection-cap";
    var isSubGroup = function(group) {
        var parent = group.parentElement;
        var ret = true;
        while (parent.className.indexOf(CLPS_SECTION_CNT) == -1) {
            if (!parent || parent.id == "topaz") {
                ret = false;
                break;
            }
            parent = parent.parentElement;
        }
        return ret;
    };
    var isVisible = function(group) {
        var parent = group.parentElement;
        if (parent.style.visibility == "hidden" && parent.style.display == "none") {
            return false;
        } else {
            return true;
        }
    };
    var getStore = function() {
        var isListDetail = cwc.getActiveTab().hasListDetail();
        var groups;
        if (isListDetail) {
            groups = Ext.query(CLPS_SECTION_CAP, cwc.getActiveTab().getDetailFrameDocument());
        } else {
            groups = Ext.query(CLPS_SECTION_CAP, cwc.getActiveTab().getFrameDocument());
        }
        var storeData = [];
        Ext.each(groups, function(group) {
            if (!isSubGroup(group) && isVisible(group)) {
                storeData.push([group.lastChild.textContent || group.lastChild.innerText, group.parentNode.id, group.parentElement]);
            }
        });
        var newStore = new Ext.data.ArrayStore({
            fields: ["name", "value", "focusElem"],
            data: storeData
        });
        return newStore;
    };
    cwc.getSections = function() {
        return getStore().collect("value");
    };
    cwc.InitJAStore = new top.Ext.data.ArrayStore({
        fields: ["name", "value", "focusElem"],
        data: []
    });
    cwc.updateJAStore = function(combo) {
        if (combo.isExpanded()) {
            return;
        }
        var newStore = getStore();
        combo.bindStore(newStore);
    };
    cwc.setLastMessage = function(lastMessage) {
        if (lastMessage) {
            if (Ext.isObject(lastMessage)) {
                this.lastMessageStr = Ext.encode(lastMessage);
            } else {
                if (Ext.isString(lastMessage)) {
                    this.lastMessageStr = lastMessage;
                }
            }
        } else {
            this.lastMessageStr = null;
        }
    };
    cwc.getLastMessage = function() {
        if (this.lastMessageStr) {
            return Ext.decode(this.lastMessageStr);
        }
        return null;
    };
    cwc.isSpecialTabPage = function(config) {
        if (config) {
            if (config.attributes && config.attributes.isDashboard) {
                return true;
            } else {
                var pageLink = config.defaultSrc;
                if (pageLink) {
                    for (var i = 0, len = cwc.specialTabPages.length; i < len; i++) {
                        if (pageLink.indexOf(cwc.specialTabPages[i]) >= 0) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    cwc.isListDetail = function() {
        var tab = cwc.getActiveTab();
        return tab.hasListDetail();
    };
    cwc.initNotificationPanel = function(targetElement) {
        if (!cwc.notificationPanel) {
            cwc.notificationPanel = new hpsmc.ui.NotificationPanel({
                hidden: true,
                target: targetElement,
                arrowPosition: "",
                relativeOffset: [0, 6],
                renderTo: Ext.DomHelper.append(Ext.getBody(), {
                    "id": Ext.id(),
                    "tag": "div"
                }, true),
                relativePosition: "tr-br",
                listeners: {
                    "show": function() {
                        Ext.getCmp(targetElement.id).setToActive();
                    },
                    "hide": function() {
                        Ext.getCmp(targetElement.id).setToInactive();
                    }
                }
            });
        }
    };
    cwc.notifyNotificationPanel = function() {
        cwc.initNotificationPanel();
        if (cwc.notificationPanel) {
            cwc.notificationPanel.fireEvent.apply(cwc.notificationPanel, arguments);
        }
    };
    cwc.toggleNotificationPanel = function(targetElement) {
        if (!targetElement) {
            targetElement = Ext.select(".icon-launch-chat-has-content").first();
        }
        cwc.initNotificationPanel(targetElement);
        if (cwc.notificationPanel.isVisible()) {
            cwc.notificationPanel.hide();
        } else {
            if (cwc.notificationPanel.getNotificationItemCount() > 0) {
                cwc.notificationPanel.show();
                cwc.notificationPanel.focus();
                cwc.notificationPanel.focusFirstItem();
            } else {
                var chatWin = hpsmc.conversationWindow;
                if (!chatWin) {
                    var historyConversations = hpsmc.Utils.getAllConversationsFromLocalStorage();
                    if (historyConversations && historyConversations.length > 0) {
                        var activeIndex = 0;
                        Ext.each(historyConversations, function(conversation, index) {
                            if (conversation.context && conversation.context.fileName === "sdchat") {
                                activeIndex = index;
                                return false;
                            }
                        });
                        var configStr = JSON.stringify(historyConversations[activeIndex]["context"]);
                        hpsmc.Utils.openConversationWindow(configStr, false);
                    }
                } else {
                    if (chatWin.isDocked()) {
                        chatWin.fireEvent("dockedwinshow", chatWin);
                    }
                    if (!chatWin.isVisible()) {
                        chatWin.show();
                    }
                }
            }
        }
    };
    cwc.initChatRequestPanel = function(targetElement) {
        if (!cwc.chatRequestPanel) {
            cwc.chatRequestPanel = new hpsmc.ui.ChatRequestPanel({
                hidden: true,
                target: targetElement,
                arrowPosition: "",
                relativeOffset: [0, 6],
                renderTo: Ext.DomHelper.append(Ext.getBody(), {
                    "id": Ext.id(),
                    "tag": "div"
                }, true),
                relativePosition: "tr-br",
                listeners: {
                    "show": function() {
                        Ext.getCmp(targetElement.id).setToActive();
                    },
                    "hide": function() {
                        Ext.getCmp(targetElement.id).setToInactive();
                    }
                }
            });
        }
    };
    cwc.toggleChatRequestPanel = function(targetElement) {
        if (!targetElement) {
            targetElement = Ext.getCmp("smcChatRequestButtonId").el;
        }
        cwc.initChatRequestPanel(targetElement);
        if (!Ext.getCmp(targetElement.id).disabled) {
            if (cwc.chatRequestPanel.isVisible()) {
                cwc.chatRequestPanel.hide();
            } else {
                cwc.chatRequestPanel.show();
            }
        }
    };
    cwc.toggleUserInfoPanel = function(targetElement) {
        if (!cwc.calloutUserInfoPanel) {
            cwc.calloutUserInfoPanel = new hpsmc.ui.UserCalloutPanel({
                userId: cwc.userName,
                target: targetElement,
                arrowPosition: cwc.isRTL ? "top-left" : "top-right",
                relativeOffset: [0, 1],
                renderTo: Ext.DomHelper.append(Ext.getBody(), {
                    "id": Ext.id(),
                    "tag": "div"
                }, true),
                relativePosition: cwc.isRTL ? "tl-bl" : "tr-br"
            });
            cwc.calloutUserInfoPanel.show();
        } else {
            if (cwc.calloutUserInfoPanel.isVisible()) {
                cwc.calloutUserInfoPanel.hide();
            } else {
                cwc.calloutUserInfoPanel.show();
            }
        }
    };
    cwc.getSmcSupportConfig = function(fileName) {
        return hpsmc.Utils.getSmcSupportConfig(fileName);
    };
    cwc.openConversation = function(config) {
        var configObj = Ext.isString(config) ? JSON.parse(config) : config;
        hpsmc.Utils.openConversationWindow(configObj);
    };
    cwc.isConversationWinOpen = function() {
        return hpsmc.Utils.isConversationWinOpen();
    };
    cwc.hasActiveConversation = function(config) {
        var configObj = Ext.isString(config) ? JSON.parse(config) : config;
        return hpsmc.Utils.hasActiveConversation(configObj);
    };
    cwc.startXmppConnectListener = function() {
        if (!cwc.xmppConnectListenerStarted) {
            if (hpsmc.xmpp) {
                cwc.xmppConnectListenerStarted = true;
                hpsmc.xmpp.addConnectingStatusListener(function(scope, status) {
                    if (status === Strophe.Status.CONNECTED) {
                        hpsmc.Utils.toggleChatLaunchButton();
                    } else {
                        hpsmc.Utils.toggleChatLaunchButton(false);
                    }
                }, window);
            }
        }
    };
    var evt = new Ext.util.Observable({});
    cwc.gon = function(eventName, handler, scope, options) {
        return evt.on(eventName, handler, scope, options);
    };
    cwc.gun = function(eventName, handler, scope) {
        return evt.un(eventName, handler, scope);
    };
    cwc.gmon = function(comp, eventName, handler, scope, options) {
        return comp.mon(evt, eventName, handler, scope, options);
    };
    cwc.gtrigger = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        return evt.fireEvent.apply(evt, args);
    };
    var _settings = Object.create(cwc.smartAnalyticsConfig || {});
    cwc.getSmartSearchConfig = function(key) {
        return key ? _settings[key] : _settings;
    };
    cwc.setSmartSearchConfig = function(key, value) {
        _settings[key] = value;
    };
    cwc.registerApplicationHandler = function(name, fn) {
        if (!cwc.applicationHandler) {
            cwc.applicationHandler = {};
        }
        cwc.applicationHandler[name] = fn;
    };
    cwc.removeApplicationHandler = function(name) {
        if (cwc.applicationHandler[name]) {
            delete cwc.applicationHandler[name];
        }
    };
    cwc.tryRefreshDetailWin = function() {
        var tab = cwc.getActiveTab();
        var win = tab.hasListDetail() ? tab.getDetailFrameWindow() : tab.getFrameWindow();
        if (win && win.tpzExecute) {
            win.tpzExecute("0");
        }
    };
})();
! function() {
    function onMouseDown() {
        cwc.dispatchEvent("mousedown", "top");
    }

    function dispatchEventTo(wndw, eventName, source) {
        var cwcApi = wndw.cwc;
        if (cwcApi) {
            cwcApi.fireOuterEvent(eventName, source);
        }
    }
    Ext.getDoc().on("mousedown", onMouseDown);
    Ext.EventManager.on(window, "unload", function() {
        Ext.getDoc().un("mousedown", onMouseDown);
    });
    cwc.dispatchEvent = function(eventName, source) {
        var tab = cwc.getActiveTab();
        if (source == "top" || source == "unknown") {
            dispatchEventTo(tab.getFrameWindow(), eventName, source);
            if (tab.hasListDetail()) {
                dispatchEventTo(tab.getListFrameWindow(), eventName, source);
                dispatchEventTo(tab.getDetailFrameWindow(), eventName, source);
            }
        } else {
            if (source == "center") {
                if (tab.hasListDetail()) {
                    dispatchEventTo(tab.getListFrameWindow(), eventName, source);
                    dispatchEventTo(tab.getDetailFrameWindow(), eventName, source);
                }
            } else {
                if (source == "list") {
                    dispatchEventTo(tab.getFrameWindow(), eventName, source);
                    dispatchEventTo(tab.getDetailFrameWindow(), eventName, source);
                } else {
                    if (source == "detail") {
                        dispatchEventTo(tab.getFrameWindow(), eventName, source);
                        dispatchEventTo(tab.getListFrameWindow(), eventName, source);
                    }
                }
            }
        }
    };
}();
cwc.getAllSystemEvents = function() {
    cwc.jsDebug && window.console && console.debug("cwc.getAllSystemEvents...");
    var request = new XMLHttpRequest();
    request.open("POST", "service.do", false);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hpsm.addTokenForPostRequest(request);
    request.send("name=getSystemEvents");
    var sResp = request.responseText;
    var xmlParser, xmlDocument;
    try {
        xmlParser = new DOMParser();
        xmlDocument = xmlParser.parseFromString(sResp, "text/xml");
    } catch (e) {
        cwc.jsDebug && window.console && console.debug("Can not create XML document.");
        xmlDocument = null;
    }
    var eventNames = [];
    if (xmlDocument) {
        var i = 0;
        var sysEvents = xmlDocument.firstChild;
        for (var m = sysEvents.firstChild; m != null; m = m.nextSibling) {
            eventNames[i] = m.firstChild.nodeValue;
            i++;
        }
    }
    return eventNames;
};
! function() {
    var isFocus = false;
    window.addEventListener("load", function() {
        isFocus = true;
    });
    window.addEventListener("focus", function() {
        isFocus = true;
    });
    window.addEventListener("blur", function() {
        isFocus = false;
    });
    cwc.isWindowFocus = function() {
        return isFocus;
    };
}();
! function() {
    var LIFETIME = 120000,
        cache = {};

    function getHashtagHints(threadId, filename) {
        var item = cache[filename];
        if (item && Date.now() - item.timestamp < LIFETIME) {
            return Promise.resolve(item.hints);
        }
        return new Promise(function(resolve, reject) {
            var url = cwc.frameworkContext + "/service.do?name=getHashtagHints&thread=" + threadId;
            cwc.XhrRequest(url, function(response) {
                var hints = window.JSON.parse(response.responseText);
                hints = hints.map(function(hint) {
                    return {
                        v: hint.tag,
                        d: hint.tag,
                        c: hint.tag,
                        count: hint.count
                    };
                });
                cache[filename] = {
                    timestamp: Date.now(),
                    hints: hints
                };
                resolve(hints);
            }, function(response) {
                reject(response.status);
            }, "GET");
        });
    }
    cwc.getHashtagHints = getHashtagHints;
}();
(function() {
    var KEY_PREFIX = "com_hp_ov_sm_";
    var KEY_PREFIX_LEN = KEY_PREFIX.length;
    var KEY_METADATA_SESSION_HASH = "__metadata__session_hash";
    if (!window.cwc) {
        window.cwc = {};
    }
    if (!window.JSON || !JSON.stringify || !JSON.parse) {
        if (!window.Ext && !Ext.util && !Ext.util.JSON) {
            window.alert("The JSON encoding/decoding support is missing!");
            return;
        }
        var ExtJSON = Ext.util.JSON;
        window.JSON = {
            stringify: function(value, replacer, space) {
                return ExtJSON.encode(value);
            },
            parse: function(text, reviver) {
                return ExtJSON.decode(text);
            }
        };
    }
    var _wrapKey = function(key) {
        return KEY_PREFIX + key;
    };
    var _unwrapKey = function(key) {
        return key.substring(KEY_PREFIX_LEN);
    };
    var _isWrappedKey = function(key) {
        return key && key.substring(0, KEY_PREFIX_LEN) == KEY_PREFIX;
    };
    var _unwrapData = function(data) {
        var key, ret = {};
        for (key in data) {
            if (_isWrappedKey(key)) {
                ret[_unwrapKey(key)] = data[key];
            }
        }
        return ret;
    };
    var StoreDelegate = function(store) {
        this.store = store;
    };
    StoreDelegate.prototype = {
        data: function(key, value, options) {
            if (!key) {
                return _unwrapData(this.store());
            } else {
                return this.store(_wrapKey(key), value, options);
            }
        },
        clear: function() {
            var key, data = this.store();
            for (key in data) {
                if (_isWrappedKey(key)) {
                    this.store(key, null);
                }
            }
        }
    };
    var _localStore = new StoreDelegate(window.amplify.store);
    var _sessionStore = (function() {
        var KEY_SESSION_DATA = _wrapKey("sessionData");
        var store = window.amplify.store;
        return {
            data: function(key, value, options) {
                var item, items = store(KEY_SESSION_DATA) || {};
                var ret = {},
                    now = (new Date()).getTime();
                if (!key) {
                    for (key in items) {
                        item = items[key];
                        if (item.expires && item.expires <= now) {
                            delete items[key];
                        } else {
                            ret[key] = item.data;
                        }
                    }
                    return ret;
                }
                if (value === undefined) {
                    item = items[key];
                    if (item && item.expires && item.expires <= now) {
                        delete items[key];
                        store(KEY_SESSION_DATA, items);
                    } else {
                        return item ? item.data : undefined;
                    }
                } else {
                    if (value === null) {
                        if (key in items) {
                            delete items[key];
                            store(KEY_SESSION_DATA, items);
                        }
                    } else {
                        items[key] = {
                            data: value,
                            expires: options && options.expires ? now + options.expires : null
                        };
                        store(KEY_SESSION_DATA, items);
                    }
                }
            },
            clear: function() {
                store(KEY_SESSION_DATA, null);
            }
        };
    })();
    var _memoryStore = new StoreDelegate(window.amplify.store.memory);
    (function() {
        if (cwc.sessionHash) {
            var newHash = cwc.sessionHash;
            var oldHash = _sessionStore.data(KEY_METADATA_SESSION_HASH);
            if (oldHash && newHash != oldHash) {
                _sessionStore.clear();
            }
            _sessionStore.data(KEY_METADATA_SESSION_HASH, newHash);
        }
    })();
    var _getStore = function(delegate) {
        return {
            setItem: function(key, value, expires) {
                var options = expires ? {
                    expires: expires
                } : {};
                delegate.data(key, value, options);
            },
            getItem: function(key) {
                return delegate.data(key);
            },
            removeItem: function(key) {
                delegate.data(key, null);
            },
            items: function() {
                return delegate.data();
            },
            clear: function() {
                delegate.clear();
            }
        };
    };
    cwc.store = {
        local: _getStore(_localStore),
        session: _getStore(_sessionStore),
        memory: _getStore(_memoryStore)
    };
})();
! function() {
    var popupWindow;
    var POPUP_WINDOW_ID = "xPopupDialog";
    var POPUP_FRAME_ID = "popupFrame";
    var POPUP_MIN_WIDTH = 400;
    var POPUP_MIN_HEIGHT = 300;
    var POPUP_DEFAULT_WIDTH = 1000;
    var POPUP_DEFAULT_HEIGHT = 600;
    var DIALOG_CLOSE_OPTION = "3";
    var POPUP_PANEL_ID = "cwc-popup";
    cwc.showPopup = function(cfg) {
        if (!cwc.modalPopup) {
            return createPopup(cfg);
        } else {
            cwc.activePopup = cwc.modalPopup;
            cwc.activePopup.show();
            if (Ext.isFunction(cfg.onPopupReady)) {
                cfg.onPopupReady(cwc.activePopup.getWindow());
            }
            return cwc.activePopup;
        }
    };

    function createPopup(popupCfg) {
        var onPopupReady = popupCfg.onPopupReady;
        var cfg = {
            cls: cwc.isRTL ? "rtl" : "",
            id: POPUP_WINDOW_ID,
            minWidth: POPUP_MIN_WIDTH,
            minHeight: POPUP_MIN_HEIGHT,
            width: POPUP_DEFAULT_WIDTH,
            height: POPUP_DEFAULT_HEIGHT,
            closable: true,
            constrain: true,
            modal: true,
            layout: "fit",
            initComponent: function() {
                Ext.Window.prototype.initComponent.call(this);
                cwc.modalPopup = this;
                cwc.activePopup = this;
            },
            lockFocus: function(event) {
                var popupWindow = this;
                if (!event.within(popupWindow.getEl())) {
                    setTimeout(function() {
                        popupWindow.getWindow().focusOnFirstFocusableField();
                    }, 10);
                }
            }
        };
        Ext.apply(cfg, popupCfg);
        popupWindow = new Ext.Window(cfg);
        popupWindow.on("hide", function() {
            cwc.activePopup = null;
            Ext.EventManager.un(document, "click", this.lockFocus, this);
            Ext.EventManager.un(document, "keydown", this.lockFocus, this);
        });
        popupWindow.on("show", function() {
            Ext.EventManager.on(document, "click", this.lockFocus, this);
            Ext.EventManager.on(document, "keydown", this.lockFocus, this);
        });
        popupWindow.on("move", function(self, x, y) {
            y = y < 0 ? 0 : y;
            var currPosition = self.getPosition();
            if (!(currPosition[0] == x && currPosition[1] == y)) {
                self.setPosition(x, y);
            }
        });
        popupWindow.on("beforeclose", function() {
            cwc.callFunctionInContext("tpzExecute", [DIALOG_CLOSE_OPTION], popupPanel.getFrameWindow());
            return false;
        });
        popupWindow.on("afterrender", function() {
            var popup = this;
            var frameWindow = popup.framePanel.getFrameWindow();
            frameWindow.addEventListener("load", function() {
                window.console && console.debug("dialog window on load..." + cwc.HtmlLoader.getSpentTime());
                if (Ext.isFunction(onPopupReady)) {
                    onPopupReady(frameWindow);
                }
            });
            cwc.util.setDialogARIA(popup);
            forceFocusIn(popup.framePanel.el.dom, focusTop, focusBottom);
            if (Ext.isGecko) {
                addFocusJumpHandlerForFF();
            }
        });
        popupWindow.on("resize", function() {
            if (popupPanel.rendered) {
                var localStorage = cwc.store.local;
                var key = getPopupKey(popupWindow);
                localStorage.setItem(key, popupWindow.getSize());
            }
        });
        var popupPanel = createPopupPanel(popupWindow, cfg.showButtons);
        popupWindow.add(popupPanel);
        popupWindow.framePanel = popupPanel;
        cwc.activePopup = popupWindow;
        Ext.apply(popupWindow, {
            getBody: function() {
                if (popupPanel.rendered) {
                    return popupPanel.getFrameBody();
                } else {
                    return null;
                }
            },
            getWindow: function() {
                if (popupPanel.rendered) {
                    return popupPanel.getFrameWindow();
                } else {
                    return null;
                }
            },
            setPreferSize: function() {
                if (popupPanel.rendered) {
                    setPreferSize(popupWindow);
                }
            }
        });
        popupWindow.show();
        window.console && console.debug("dialog window show..." + cwc.HtmlLoader.getSpentTime());
        return popupWindow;
    }

    function createPopupPanel(popupWindow, showButtons) {
        var cfg = {
            id: POPUP_PANEL_ID,
            xtype: "hpsm-ux-iframepanel",
            frameConfig: {
                autoCreate: {
                    id: POPUP_FRAME_ID
                }
            },
            loadMask: false,
            border: false,
            domReady: false,
            defaultSrc: "tpz_container.jsp",
            activateOnReady: function() {
                window.console && console.debug("popup activateOnReady...");
            },
            initPageContent: function() {
                if (showButtons !== false) {
                    addButtons2Frame(popupWindow);
                }
                popupWindow.framePanel.syncSize();
                popupWindow.doLayout();
                cwc.util.setToolbarARIA({
                    "toolbar": popupWindow.framePanel.getBottomToolbar()
                });
                this.domReady = true;
                this.getFrame().dom.lang = cwc.userLanguage;
            },
            destroyPageContent: function() {
                this.domReady = false;
                var frame = this.getFrame();
                if (frame.ttips) {
                    for (var i = 0, maxi = frame.ttips.length; i < maxi; i++) {
                        try {
                            Ext.destroy(frame.ttips[i]);
                        } catch (e) {}
                        frame.ttips[i] = null;
                    }
                }
                frame.ttips = null;
            }
        };
        if (showButtons !== false) {
            cfg.bbar = new cwc.ux.Toolbar({
                buttonAlign: "right"
            });
        }
        return Ext.create(cfg);
    }

    function addButtons2Frame(popWindow) {
        var framePanel = popWindow.framePanel;
        var toolbar = framePanel.getBottomToolbar();
        toolbar.setHeight(32);
        var win = framePanel.getFrameWindow();
        var myToolbarCfg, cfg = (win.cwc && win.cwc.getToolbarCfgLite) ? win.cwc.getToolbarCfgLite() : null;
        if (cfg) {
            try {
                myToolbarCfg = Ext.encode(cfg);
                myToolbarCfg = Ext.decode(myToolbarCfg);
            } catch (ex) {
                myToolbarCfg = (win.getToolbarCfg) ? win.getToolbarCfg() : null;
            } finally {
                cfg = null;
            }
        }
        if (Ext.isIE) {
            for (var i = 0; i < toolbar.items.length; i++) {
                if (toolbar.items.items[i].xtype == "cwc_jumpaddress_combox") {
                    toolbar.items.items[i].mons = null;
                }
            }
        }
        toolbar.removeAll();
        if (toolbar.addComponents(myToolbarCfg)) {
            toolbar.show();
        } else {
            toolbar.hide();
        }
    }

    function getPopupKey(popupWindow) {
        var contentWindow = popupWindow.getWindow();
        var formName = contentWindow.document.getElementById("formname").value;
        var screenName = contentWindow.tpz_screenName;
        return formName + "..." + screenName;
    }

    function setPreferSize(popupWindow) {
        var localStorage = cwc.store.local;
        var key = getPopupKey(popupWindow);
        var storedSize = localStorage.getItem(key);
        if (storedSize) {
            popupWindow.setSize(storedSize);
        }
        autoFit(popupWindow);
    }

    function autoFit(popupWindow) {
        var screenWidth = top.innerWidth;
        var screenHeight = top.innerHeight;
        var maxWidth = screenWidth * 0.9;
        var maxHeight = screenHeight * 0.9;
        var contentWindow = popupWindow.getWindow();
        var body = contentWindow.document.body;
        var fitWidth = popupWindow.getWidth();
        var fitHeight = popupWindow.getHeight();
        if (body.scrollWidth > 0 && contentWindow.innerWidth < body.scrollWidth) {
            fitWidth = body.scrollWidth + 100;
        }
        if (fitWidth > maxWidth) {
            fitWidth = maxWidth;
        }
        popupWindow.setWidth(fitWidth);
        if (body.scrollHeight > 0 && contentWindow.innerHeight < body.scrollHeight) {
            fitHeight = body.scrollHeight + 150;
        }
        if (fitHeight > maxHeight) {
            fitHeight = maxHeight;
        }
        popupWindow.setHeight(fitHeight);
        popupWindow.doConstrain();
        var localStorage = cwc.store.local;
        var key = getPopupKey(popupWindow);
        localStorage.setItem(key, popupWindow.getSize());
    }

    function forceFocusIn(elem, focusFirstFunc, focusLastFunc) {
        var firstAnchor = document.createElement("a");
        firstAnchor.setAttribute("href", "#");
        firstAnchor.setAttribute("style", "height:1px;width:1px;position:absolute;top:0;left:0;overflow:hidden");
        var lastAnchor = firstAnchor.cloneNode(false);
        elem.insertBefore(firstAnchor, elem.firstChild);
        elem.appendChild(lastAnchor);
        Ext.fly(firstAnchor).on("keydown", function(e) {
            if (e.getKey() == e.TAB && e.shiftKey) {
                lastAnchor.focus();
            }
        });
        Ext.fly(lastAnchor).on("keydown", function(e) {
            if (e.getKey() == e.TAB && !e.shiftKey) {
                firstAnchor.focus();
            }
        });
        if (Ext.isFunction(focusLastFunc)) {
            Ext.fly(firstAnchor).on("focus", function() {
                focusLastFunc();
            });
        }
        if (Ext.isFunction(focusFirstFunc)) {
            Ext.fly(lastAnchor).on("focus", function() {
                focusFirstFunc();
            });
        }
    }

    function focusTop() {
        var framePanel = cwc.getActivePopup().framePanel;
        var frameWindow = framePanel.getFrameWindow();
        cwc.tryCall(function() {
            var el = cwc.tryCall("findFirstFocusableField", frameWindow);
            el.focus();
            el = null;
        });
    }

    function focusBottom() {
        var framePanel = cwc.getActivePopup().framePanel;
        cwc.tryCall(function() {
            framePanel.getBottomToolbar().items.last().focus();
        });
    }

    function addFocusJumpHandlerForFF() {
        var framePanel = cwc.getActivePopup().framePanel;
        var frameWindow = framePanel.getFrameWindow();
        var frameDoc = frameWindow.document;
        if (cwc.HtmlLoader.getStatus() == cwc.HtmlLoader.STATUS_READY) {
            frameWindow.addEventListener("keyup", function() {
                if (frameDoc.activeElement.parentNode == frameDoc) {
                    focusBottom();
                }
            });
        } else {
            setTimeout(addFocusJumpHandlerForFF, 200);
        }
    }
}();
if (!window.cwc) {
    window.cwc = {};
}
cwc.util = {
    encodeHtml: function(s) {
        return s && typeof(s) == "string" ? s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;") : s;
    },
    decodeHtml: function(s) {
        return s && typeof(s) == "string" ? s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&") : s;
    },
    encodeHtmlWhiteList: [{
        rex: /&lt;\s*br\s*&gt;/g,
        replace: "<br>"
    }, {
        rex: /&lt;\s*\/\s*br\s*&gt;/g,
        replace: "</br>"
    }, {
        rex: /&lt;\s*br\s*\/\s*&gt;/g,
        replace: "<br/>"
    }],
    encodeHtmlExceptWhiteList: function(s) {
        var encodedHtml = this.encodeHtml(s);
        var wl = this.util.encodeHtmlWhiteList;
        for (var w in wl) {
            encodedHtml = encodedHtml.replace(wl[w].rex, wl[w].replace);
        }
        return encodedHtml;
    },
    setUnFocusable: function(node, hasCheckbox) {
        if (this.hasFocus && !node.clicked) {
            node.set({
                "tabindex": "-1"
            });
            if (!hasCheckbox) {
                node.set({
                    "aria-selected": "false"
                });
            }
        }
        node.clicked = false;
    },
    changeFocus: function(newNode) {
        var elem = newNode;
        if (newNode.ownerTree instanceof cwc.ux.NavTree || newNode.ownerTree && newNode.ownerTree.id == "cwcFavMgrTreeId") {
            elem = Ext.get(newNode.ui.anchor);
            elem.addClass("focused");
        }
        elem.focus();
        elem.scrollIntoView();
    },
    setFocusByFirstChar: function(node, firstChar) {
        function findInNode(node, firstChar, includeCurrent) {
            if (includeCurrent && node.text.toLowerCase().indexOf(firstChar) == 0) {
                return node;
            }
            if (node.expanded) {
                var target = null;
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].text.toLowerCase().indexOf(firstChar) == 0) {
                        target = node.childNodes[i];
                    } else {
                        if (node.childNodes[i].expanded) {
                            target = findInNode(node.childNodes[i], firstChar);
                        }
                    }
                    if (target) {
                        return target;
                    }
                }
            }
            return null;
        }

        function findInSameLevel(node, firstChar, includeCurrent) {
            var currentNode = includeCurrent ? node : node.nextSibling;
            var target = null;
            while (currentNode && !target) {
                target = findInNode(currentNode, firstChar, true);
                currentNode = currentNode.nextSibling;
            }
            return target;
        }

        function findInAncestor(node, firstChar) {
            var currentNode = node.parentNode;
            if (currentNode.isRoot) {
                if (node.ownerTree.nextSibling()) {
                    currentNode = node.ownerTree.nextSibling();
                    return findInAccordion(currentNode, firstChar, true);
                } else {
                    return null;
                }
            } else {
                return findInSameLevel(currentNode, firstChar) || findInAncestor(currentNode, firstChar);
            }
        }

        function findInOwnerTree(node, firstChar) {
            var currentNode = node;
            return findInNode(currentNode, firstChar) || findInSameLevel(currentNode, firstChar) || findInAncestor(currentNode, firstChar);
        }

        function findInAccordion(panel, firstChar, includeCurrent) {
            if (!panel) {
                return null;
            }
            if (includeCurrent && panel.title.toLowerCase().indexOf(firstChar) == 0) {
                return panel.header;
            }
            var nextPanel = panel.nextSibling();
            if (panel.collapsed) {
                return findInAccordion(nextPanel, firstChar, true);
            } else {
                return findInSameLevel(panel.root.firstChild, firstChar, true) || findInAccordion(nextPanel, firstChar, true);
            }
        }
        var target = null;
        if (node instanceof cwc.ux.NavTree) {
            target = findInAccordion(node, firstChar);
        } else {
            target = findInOwnerTree(node, firstChar);
        }
        target && cwc.util.changeFocus(target);
    },
    setToolbarARIA: function(toolbarObj) {
        if (!toolbarObj || !toolbarObj.toolbar) {
            return;
        }
        var label = toolbarObj.label,
            toolbar = toolbarObj.toolbar;
        if (!label) {
            label = cwc.getTopCwc().TOOLBAR_POSITION_TOP;
        }
        var processLinkInPagingbar = function(links, buttons) {
            for (var i = 0; i < links.length; i++) {
                if (links[i].className.indexOf("currentPageIndex") < 0) {
                    buttons.push(Ext.get(links[i]));
                }
            }
        };
        var processCombo = function(combo, buttons) {
            combo.isCombo = true;
            buttons.push(combo);
        };
        var processErdCombo = function(combo, buttons) {
            combo.isCombo = true;
            buttons.push(combo.inputEl);
        };
        var isErdFocusTrapBtn = function(btn) {
            return "btnFocusTrap" == btn.id;
        };
        var isCheckbox = function(btn) {
            return "checkbox" == btn.btnEl.getAttribute("role");
        };
        var processDashboard = function(items, buttons) {
            buttons.push(Ext.get(items[0].inputId));
            var homeBtn = Ext.get(items[1].btnEl);
            if (homeBtn.dom.clientHeight > 0 && homeBtn.dom.clientWidth > 0) {
                buttons.push(homeBtn);
            }
        };
        var processCalendarViewToolbar = function(items, buttons) {
            for (var i = 0; i < items.length; i++) {
                var button = items[i];
                if (button.btnEl && !button.hidden && !isErdFocusTrapBtn(button)) {
                    button.btnEl.disabled = button.disabled;
                    buttons.push(button.btnEl);
                }
            }
        };
        var getMastheadButtons = function(items, buttons) {
            for (var i = 0; i < items.length; i++) {
                var btn = items[i];
                var btnEl = Ext.get(btn);
                btnEl.disabled = btn.disabled;
                if (!(btn.hidden || btn.classList.contains("mode") && !btn.parentElement.classList.contains("active"))) {
                    buttons.push(btnEl);
                }
            }
        };
        var getDatepickerButtons = function(items, buttons) {
            for (var i = 0; i < items.length; i++) {
                buttons.push(Ext.get(items[i]));
            }
        };
        var getGadgetButtons = function(items, buttons) {
            for (var i = 0; i < items.length; i++) {
                var btn = Ext.get(items[i]);
                if (btn.dom.parentElement.style.display != "none") {
                    buttons.push(btn);
                }
            }
        };
        var getButtons = function(items) {
            var buttons = [];
            for (var i = 0; i < items.length; i++) {
                var button = items[i];
                if (button.btnEl && !button.hidden && !isErdFocusTrapBtn(button) && !isCheckbox(button)) {
                    button.btnEl.disabled = button.disabled;
                    buttons.push(button.btnEl);
                } else {
                    if (button.initialConfig.cls && button.initialConfig.cls.indexOf("x-tbar-page-pagetext") > -1) {
                        processLinkInPagingbar(button.el.dom.children, buttons);
                    } else {
                        if ("rl-recs-page-combo" == button.initialConfig.cls) {
                            processCombo(button, buttons);
                        } else {
                            if ("cwc_jumpaddress_combox" == button.initialConfig.xtype) {
                                processCombo(button, buttons);
                            } else {
                                if ("filterCombo" == button.id) {
                                    processErdCombo(button, buttons);
                                } else {
                                    if ("fieldcontainer" == button.initialConfig.xtype) {
                                        processDashboard(button.items.items, buttons);
                                    } else {
                                        if ("calendarViewToolBar" == button.id) {
                                            processCalendarViewToolbar(button.items.items, buttons);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return buttons;
        };
        var focusNextBtn = function(opt) {
            var index = opt.index;
            if (index == opt.total - 1) {
                index = -1;
            }
            for (var i = index + 1; i < opt.total; i++) {
                if (!buttons[i].disabled) {
                    buttons[i].focus();
                    break;
                } else {
                    if (i == opt.total - 1) {
                        i = -1;
                    }
                }
            }
        };
        var focusPreviousBtn = function(opt) {
            var index = opt.index;
            if (index == 0) {
                index = opt.total;
            }
            for (var i = index - 1; i >= 0; i--) {
                if (!buttons[i].disabled) {
                    buttons[i].focus();
                    break;
                } else {
                    if (i == 0) {
                        i = opt.total;
                    }
                }
            }
        };
        var focusFirstBtn = function(opt) {
            var index = opt.index;
            for (var i = 0; i < index; i++) {
                if (!buttons[i].disabled) {
                    buttons[i].focus();
                    break;
                }
            }
        };
        var focusLastBtn = function(opt) {
            var index = opt.index;
            for (var i = opt.total - 1; i > index; i--) {
                if (!buttons[i].disabled) {
                    buttons[i].focus();
                    break;
                }
            }
        };
        var handleKeyDown = function(e, btn, opt) {
            if (!e.keyCode || "combobox" == btn.getAttribute("role") && "true" == btn.getAttribute("aria-expanded")) {
                return;
            }
            var index = opt.index;
            switch (e.keyCode) {
                case e.RIGHT:
                    focusNextBtn(opt);
                    break;
                case e.LEFT:
                    focusPreviousBtn(opt);
                    break;
                case e.HOME:
                    focusFirstBtn(opt);
                    break;
                case e.END:
                    focusLastBtn(opt);
                    break;
            }
        };
        var isAvailable = function(buttons, button) {
            return button && buttons.indexOf(button) > -1 && !(button.hidden || button.disabled);
        };
        var isComboAvailable = function(buttons, button) {
            return button && button.dom && "combobox" == button.getAttribute("role") && isAvailable(buttons, Ext.getCmp(button.id));
        };
        var buttons = [];
        if (toolbar.items) {
            var cfgItems = toolbar.items.items;
            if (toolbarObj.additionalButtons) {
                cfgItems = cfgItems.concat(toolbarObj.additionalButtons);
            }
            buttons = getButtons(cfgItems);
        } else {
            if (toolbar.id == "cwc_masthead_toolbar") {
                var items = toolbar.query("button");
                getMastheadButtons(items, buttons);
            } else {
                if (toolbar.id == "x-date-mp-toolbar") {
                    var items = toolbar.query("button");
                    getDatepickerButtons(items, buttons);
                } else {
                    var items = toolbar.query("img");
                    getGadgetButtons(items, buttons);
                }
            }
        }
        var firstValidBtn = null;
        for (var i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            var btn = button;
            var isCombo = button.isCombo;
            if (isCombo) {
                btn = Ext.get(btn.id);
            }
            var tabindex = firstValidBtn && firstValidBtn.id == btn.id ? 0 : -1;
            btn.set({
                "tabindex": tabindex
            });
            if (!btn.getAttribute("role")) {
                btn.set({
                    "role": "button"
                });
            }
            if (btn.disabled) {
                btn.set({
                    "disabled": "disabled"
                });
            } else {
                btn.set({
                    "disabled": null
                }, false);
                if (!firstValidBtn) {
                    if (isAvailable(buttons, toolbar.focusedBtn) || isComboAvailable(buttons, toolbar.focusedBtn)) {
                        toolbar.focusedBtn.set({
                            "tabindex": "0"
                        });
                        firstValidBtn = toolbar.focusedBtn;
                    } else {
                        firstValidBtn = btn;
                        firstValidBtn.set({
                            "tabindex": "0"
                        });
                        toolbar.focusedBtn = firstValidBtn;
                    }
                }
                var timeoutHandle = null;
                if (!btn.keyDownListener) {
                    btn.on("focus", function(e, btn) {
                        toolbar.hasFocus = true;
                        if (btn.id == toolbar.focusedBtn.id) {
                            clearTimeout(timeoutHandle);
                        } else {
                            Ext.fly(toolbar.focusedBtn).set({
                                "tabindex": "-1"
                            });
                            toolbar.focusedBtn = Ext.get(btn);
                            toolbar.focusedBtn.set({
                                "tabindex": "0"
                            });
                        }
                    });
                    btn.on("blur", function(e, btn) {
                        toolbar.hasFocus = false;
                        timeoutHandle = setTimeout(cwc.util.setUnFocusable.bind(toolbar, Ext.get(btn), 300));
                    });
                } else {
                    btn.un("keydown", btn.keyDownListener, isCombo ? button : btn);
                }
                btn.on("keydown", handleKeyDown, isCombo ? button : btn, {
                    "index": i,
                    "total": buttons.length
                });
                btn.keyDownListener = handleKeyDown;
            }
        }
        if (toolbar.el) {
            var tbEl = toolbar.el;
            if (["dashboard-tbar", "scorecard-tbar"].indexOf(toolbar.initialCls) > -1) {
                tbEl = toolbar.el.first("div");
            }
            if (tbEl.dom.getAttribute("role") != "toolbar") {
                tbEl.set({
                    "role": "toolbar",
                    "aria-label": label
                });
            }
        } else {
            if (toolbar.dom.getAttribute("role") != "toolbar") {
                toolbar.dom.setAttribute("role", "toolbar");
                toolbar.dom.setAttribute("aria-label", label);
            }
        }
    },
    setDialogARIA: function(dlg, headerText, audibleText) {
        if (dlg.ariaDone) {
            return;
        }
        var toolbar = dlg.getFooterToolbar && dlg.getFooterToolbar() || Ext.getCmp(dlg.id + "-toolbar");
        var headerTextEl = dlg.el.child(".x-window-header-text") || dlg.el.down(".x-window-header-text");
        var msgTextEl = dlg.el.child(".ext-mb-text") || dlg.el.down("td > div.x-form-display-field");
        var isCwcPopup = dlg.id === "xPopupDialog";
        var isCustomizedDialog = ["aboutPage", "keyboardShortcutList", "cwc_message_box", "xPopupDialog"].indexOf(dlg.id) > -1;
        var focusAnchor = dlg.el.child("a.x-dlg-focus");
        if (focusAnchor) {
            focusAnchor.set({
                "role": "presentation",
                "aria-hidden": true,
                "tabindex": isCustomizedDialog ? -1 : 0
            });
            focusAnchor.on("focus", function() {
                dlg.focusEl && dlg.focusEl.focus(10);
            });
        }
        dlg.el.set({
            "aria-labelledby": headerTextEl.id
        });
        if (msgTextEl) {
            dlg.el.set({
                "aria-describedby": msgTextEl.id
            });
        }

        function isAlertDialog() {
            var visibleParent = Ext.versions && dlg.el.down && dlg.el.down('table:not([style*="display: none"])');
            var inputChild = dlg.el.child(".ext-mb-input") || visibleParent && visibleParent.down(".x-form-field");
            var textareaChild = dlg.el.child(".ext-mb-textarea");
            var isPrompt = inputChild && inputChild.isVisible() || textareaChild && textareaChild.isVisible();
            return !(isPrompt || isCustomizedDialog);
        }

        function setDialogRole(isAlertDialog) {
            var ROLE_ALERT_DIALOG = "alertdialog";
            var ROLE_DIALOG = "dialog";
            var role = isAlertDialog ? ROLE_DIALOG : ROLE_DIALOG;
            if (dlg.el.getAttribute("role") != role) {
                dlg.el.set({
                    "role": role,
                    "aria-modal": true
                });
            }
        }

        function setHeaderText(bIsAlertDialog) {
            var text = headerText ? headerText : headerTextEl.dom.innerHTML;
            text = audibleText ? text + ' <span class="audible-text">' + audibleText + "</span>" : text;
            headerTextEl.dom.innerHTML = '<h2 class="x-window-header-text">' + text + "</h2>";
            if (bIsAlertDialog) {
                Ext.DomHelper.insertAfter(headerTextEl.child("h2"), {
                    tag: "span",
                    cls: "audible-text",
                    html: cwc.STRING_ALERT
                });
            }
        }
        dlg.on("beforeshow", function() {
            if (isCwcPopup) {
                dlg.focusEl = Ext.get(document.activeElement);
            }
        });
        dlg.on("show", function() {
            var bIsAlertDialog = isAlertDialog();
            setDialogRole(bIsAlertDialog);
            setHeaderText(bIsAlertDialog);
            if (!isCwcPopup) {
                Ext.defer(function() {
                    dlg.focusEl.focus();
                }, 300);
            }
        });
        toolbar && toolbar.items.each(function(btn) {
            btn.on("show", function(btn) {
                btn.btnEl.set({
                    "aria-hidden": false
                });
            });
            btn.on("hide", function(btn) {
                btn.btnEl.set({
                    "aria-hidden": true
                });
                btn.setText("");
            });
            btn.on("close", function(btn) {
                btn.btnEl.set({
                    "aria-hidden": true
                });
                btn.setText("");
            });
        });
        dlg.ariaDone = true;
    },
    showFocusTip: function(target, tip) {
        var qt = Ext.QuickTips.getQuickTip();
        if (!qt) {
            return;
        }
        var targetEl, span, adjustment = 1;
        switch (target.getAttribute("role")) {
            case "treeitem":
                span = target.querySelector("span");
                targetEl = span;
                break;
            case "tab":
                span = target.querySelector("span.x-tab-strip-text");
                targetEl = span;
                break;
            case "columnheader":
                span = target.querySelector("span");
                if (target.className.indexOf("x-grid3-hd-inner") > -1) {
                    targetEl = target;
                    adjustment = -1;
                } else {
                    targetEl = span;
                    adjustment = cwc.isAccessibleMode ? -2 : -1;
                }
                break;
            case "gridcell":
                if (target.className.search(/(x-grid-cell-inner|x-grid3-cell-inner)/) > -1) {
                    span = target;
                    adjustment = -1;
                } else {
                    span = target.querySelector("div > span");
                    adjustment = cwc.isAccessibleMode ? -2 : -1;
                }
                targetEl = span;
                break;
            default:
                if (["BUTTON", "A"].indexOf(target.tagName) > -1) {
                    span = targetEl = target;
                } else {
                    return;
                }
        }
        qt.targetXY = Ext.fly(target).getXY();
        qt.activeTarget = {
            el: span,
            text: span.innerText
        };
        var ele = Ext.fly(targetEl);
        if (!Ext.isEmpty(Ext.util.Format.trim(span.innerText)) && ele && (ele.getTextWidth() - ele.getStyleSize().width > adjustment)) {
            tip && tip.hide();
            qt.showBy(target, "tl-b");
        }
    },
    hideFocusTip: function() {
        var qt = Ext.QuickTips.getQuickTip();
        if (qt) {
            qt.hide();
        }
    },
    resizeMasthead: function(resizeContainer) {
        var getLinkTableWidth = function(masthead) {
            var headTable = masthead.child("table#cwc_Masthead"),
                logo = masthead.child("table.masthead-sm-logo"),
                toolbar = masthead.child("tr#cwc_masthead_toolbar");
            var tableWidth = window.innerWidth - logo.getStyleSize().width;
            return {
                tableWidth: tableWidth,
                linksWidth: tableWidth - toolbar.getStyleSize().width
            };
        };
        var setLinkWidth = function(link, width) {
            link && link.setStyle("max-width", width + "px");
            link && link.parent().setStyle("max-width", width + "px");
        };
        var masthead = Ext.get("cwc_header");
        var headTable = masthead.child("table#cwc_Masthead"),
            aboutLink = masthead.child("button#cwc_masthead_title_link"),
            skipLink = masthead.child("a#cwc_masthead_skip_link");
        var linkTableWidth = getLinkTableWidth(masthead);
        var isVisible = function(skipLink) {
            return skipLink.getStyle("z-index") > 0;
        };
        var aboutLinkWidth = skipLinkWidth = 1;
        var aboutLinkMargin = 14;
        if (isVisible(skipLink)) {
            if (linkTableWidth.linksWidth / 2 > aboutLinkMargin * 2) {
                aboutLinkWidth = linkTableWidth.linksWidth / 2 - aboutLinkMargin * 2;
                skipLinkWidth = linkTableWidth.linksWidth / 2;
            } else {
                skipLinkWidth = linkTableWidth.linksWidth / 2;
            }
        } else {
            if (linkTableWidth.linksWidth > aboutLinkMargin * 2) {
                aboutLinkWidth = linkTableWidth.linksWidth;
            }
            skipLinkWidth = 0;
        }
        resizeContainer && headTable.setStyle("max-width", linkTableWidth.tableWidth + "px");
        setLinkWidth(aboutLink, aboutLinkWidth);
        setLinkWidth(skipLink, skipLinkWidth);
    },
    filterBySearchValue: function(root, searchValue, createNavTreeFlag) {
        for (var i = root.childNodes.length - 1; i >= 0; i--) {
            var node = root.childNodes[i];
            var nodeAttr = {};
            Ext.each(node.attributes, function(a) {
                nodeAttr[a.nodeName] = a.nodeValue;
            });
            if (createNavTreeFlag && searchValue && !cwc.getSearchFavStyle() && nodeAttr["class"] == "favoritesmainfolder") {
                root.removeChild(node);
                continue;
            }
            if (searchValue && nodeAttr["class"] == "classRecord") {
                root.removeChild(node);
                continue;
            }
            if (cwc.isShowPrivateFavoritesOnly()) {
                if (nodeAttr["public"] && nodeAttr["public"] === "true") {
                    root.removeChild(node);
                    continue;
                }
            }
            if (node.childNodes.length > 0) {
                var newNode = this.filterBySearchValue(node, searchValue);
                if (newNode.childNodes.length == 0 && !this.matchNode(searchValue, nodeAttr)) {
                    root.removeChild(newNode);
                }
            } else {
                if (!this.matchNode(searchValue, nodeAttr)) {
                    root.removeChild(node);
                }
            }
        }
        return root;
    },
    createAccordionNode: function(createNode) {
        var data = cwc.getSearchTreeCache();
        var createNodeAttr = {};
        Ext.each(createNode.attributes, function(a) {
            createNodeAttr[a.nodeName] = a.nodeValue;
        });
        var parser = new DOMParser();
        var xmlNode = parser.parseFromString(data, "text/xml");
        var root = xmlNode.childNodes[0];
        for (var i = root.childNodes.length - 1; i >= 0; i--) {
            var node = root.childNodes[i];
            var nodeAttr = {};
            Ext.each(node.attributes, function(a) {
                nodeAttr[a.nodeName] = a.nodeValue;
            });
            if (cwc.util.decodeHtml(nodeAttr["label"]).toUpperCase() == cwc.util.decodeHtml(createNodeAttr["label"]).toUpperCase()) {
                this.copyNode(createNode, node);
            }
        }
    },
    createMiscNode: function(leafNodes) {
        var data = cwc.getSearchTreeCache();
        var parser = new DOMParser();
        var xmlNode = parser.parseFromString(data, "text/xml");
        var root = xmlNode.childNodes[0];
        for (var i = root.childNodes.length - 1; i >= 0; i--) {
            var node = root.childNodes[i];
            if (node.tagName === "leaf") {
                leafNodes.push(node);
            }
        }
    },
    matchNode: function(searchValue, attr) {
        var matchFlag = false;
        if (cwc.util.decodeHtml(attr["label"]).toUpperCase().indexOf(searchValue.toUpperCase()) != -1) {
            matchFlag = true;
        }
        return matchFlag;
    },
    copyNode: function(copyNode, sourceNode) {
        for (var i = 0; i < sourceNode.childNodes.length; i++) {
            var node = sourceNode.childNodes[i].cloneNode();
            copyNode.appendChild(node);
        }
    },
    getLastNode: function(childTreeNode) {
        var lastNode = childTreeNode[childTreeNode.length - 1];
        if (lastNode.childNodes.length == 0) {
            return lastNode;
        }
        return this.getLastNode(lastNode.childNodes);
    },
    getRootNode: function(node) {
        if (!node.parentNode) {
            return node;
        }
        return this.getRootNode(node.parentNode);
    },
    setTreeNodeMaxWidth: function(node, parentNodeWidth) {
        if (node.rendered && node.hasChildNodes() && node.childrenRendered) {
            node.childNodes.forEach(function(treenode) {
                treenode.getUI().setAnchorMaxWidth(parentNodeWidth);
            });
        }
    },
    highlightQuery: function(text, searchValue) {
        text = cwc.decodeHtml(text);
        var noMatch = (!text || !searchValue || typeof searchValue != "string" || searchValue == "" || text.toUpperCase().indexOf(searchValue.toUpperCase()) == -1);
        if (!noMatch) {
            var beginIndex = text.toUpperCase().indexOf(searchValue.toUpperCase());
            var length = searchValue.length;
            var beginStr = text.substring(-1, beginIndex);
            var middleStr = text.substring(beginIndex, beginIndex + length);
            var endStr = text.substring(beginIndex + length);
            text = cwc.encodeHtml(beginStr) + "<b>" + cwc.encodeHtml(middleStr) + "</b>" + cwc.encodeHtml(endStr);
            cwc.increaseResultCount();
            return text;
        } else {
            return cwc.encodeHtml(text);
        }
    }
};
cwc.encodeHtml = cwc.util.encodeHtml;
cwc.decodeHtml = cwc.util.decodeHtml;
cwc.encodeHtmlExceptWhiteList = cwc.util.encodeHtmlExceptWhiteList;
! function() {
    var FOCUS_CONVENTION = {
        LAST_FOCUSED: 0,
        SELECTED: 1,
        FIRST: 2
    };

    function initTabsKeyNav(container, selector) {
        initKeyNav(container, selector, [Ext.EventObject.LEFT, Ext.EventObject.RIGHT, Ext.EventObject.HOME, Ext.EventObject.END], FOCUS_CONVENTION.SELECTED);
    }

    function initGridKeyNav(container, selector) {
        initKeyNav(container, selector, [Ext.EventObject.LEFT, Ext.EventObject.RIGHT, Ext.EventObject.UP, Ext.EventObject.DOWN, , Ext.EventObject.PAGE_UP, Ext.EventObject.PAGE_DOWN, Ext.EventObject.HOME, Ext.EventObject.END], FOCUS_CONVENTION.LAST_FOCUSED);
    }

    function initAccordionKeyNav(container, selector) {
        initKeyNav(container, selector, [Ext.EventObject.UP, Ext.EventObject.DOWN, Ext.EventObject.HOME, Ext.EventObject.END]);
    }

    function getCellElement(targetCell) {
        if (targetCell.hasCls("x-column-header-text")) {
            return targetCell.parent();
        } else {
            var focusLinkChild = targetCell.child("a");
            return focusLinkChild ? focusLinkChild : targetCell;
        }
    }

    function focusCell(rows, rowPos, colPos) {
        var targetRow = rows.elements[rowPos];
        var targetCell = Ext.get(Ext.get(targetRow).gridcells.elements[colPos]);
        getCellElement(targetCell).focus();
    }

    function addFocusCls(cell) {
        var target = cell;
        if (cell.dom.nodeName === "A") {
            target = Ext.fly(cell.parent());
        }
        target.addCls("xFocus");
    }

    function removeFocusCls(cell) {
        var target = cell;
        if (cell.dom.nodeName === "A") {
            target = Ext.fly(cell.parent());
        }
        target.removeCls("xFocus");
    }

    function onCellFocus(container, targetCell, rowPos, colPos) {
        cwc.setProperty(container.focusedEl, {
            "tabindex": -1
        });
        container.focusedRowPos = rowPos;
        container.focusedColPos = colPos;
        targetCell = Ext.get(targetCell);
        container.focusedEl = getCellElement(targetCell);
        cwc.setProperty(container.focusedEl, {
            "tabindex": 0
        });
        addFocusCls(container.focusedEl);
    }

    function onElementFocus(container, element, index) {
        container.focusedIndex = index;
        container.focusedEl = Ext.get(element);
    }

    function moveLeft(elements, focusConvention) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            var colPos = container.focusedColPos;
            if (colPos > 0) {
                colPos--;
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, container.focusedRowPos, colPos);
            }
        } else {
            var position = elements.container.focusedIndex;
            if (position > 0) {
                var targetEl = elements.elements[--position];
                elements.container.focusedIndex = position;
                elements.container.focusedEl = targetEl;
                targetEl.focus();
            }
        }
    }

    function moveRight(elements, focusConvention) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            var colPos = container.focusedColPos;
            var row = rows.elements[container.focusedRowPos];
            if (colPos < Ext.get(row).gridcells.elements.length - 1) {
                colPos++;
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, container.focusedRowPos, colPos);
            }
        } else {
            var position = elements.container.focusedIndex;
            if (position < elements.elements.length - 1) {
                var targetEl = elements.elements[++position];
                elements.container.focusedIndex = position;
                elements.container.focusedEl = targetEl;
                targetEl.focus();
            }
        }
    }

    function moveFirst(elements, focusConvention) {
        var container = elements.container;
        var rowPos = container.hasSortableColumn ? 0 : 1;
        if (container.focusedRowPos === rowPos && container.focusedColPos === 0) {
            return;
        }
        cwc.setProperty(container.focusedEl, {
            "tabindex": -1
        });
        focusCell(elements, rowPos, 0);
    }

    function moveLast(elements, focusConvention) {
        var rows = elements;
        var container = rows.container;
        var row = rows.elements[container.focusedRowPos];
        var lastRowIndex = rows.elements.length - 1;
        var gridcells = Ext.get(rows.elements[lastRowIndex]).gridcells.elements;
        var colPos = gridcells.length - 1;
        if (container.focusedRowPos === lastRowIndex && container.focusedColPos === colPos) {
            return;
        }
        cwc.setProperty(container.focusedEl, {
            "tabindex": -1
        });
        focusCell(elements, lastRowIndex, colPos);
    }

    function moveHome(elements, focusConvention) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            if (container.focusedColPos !== 0) {
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, container.focusedRowPos, 0);
            }
        } else {
            var targetEl = elements.elements[0];
            elements.container.focusedEl = targetEl;
            targetEl.focus();
        }
    }

    function moveEnd(elements, focusConvention) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            var row = rows.elements[container.focusedRowPos];
            var gridcells = Ext.get(row).gridcells.elements;
            var colPos = gridcells.length - 1;
            if (container.focusedColPos !== colPos) {
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, container.focusedRowPos, colPos);
            }
        } else {
            var targetEl = elements.elements[elements.elements.length - 1];
            elements.container.focusedEl = targetEl;
            targetEl.focus();
        }
    }

    function moveUp(elements, focusConvention, step) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            var rowPos = container.focusedRowPos;
            if (rowPos > 0) {
                rowPos -= (step ? step : 1);
                rowPos = rowPos >= 0 ? rowPos : 0;
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, rowPos, container.focusedColPos);
            }
        } else {
            moveLeft(elements, focusConvention);
        }
    }

    function moveDown(elements, focusConvention, step) {
        if (isGrid(focusConvention)) {
            var rows = elements;
            var container = rows.container;
            var lastIndex = rows.elements.length - 1;
            var rowPos = container.focusedRowPos;
            if (rowPos < lastIndex) {
                rowPos += (step ? step : 1);
                rowPos = rowPos <= lastIndex ? rowPos : lastIndex;
                cwc.setProperty(container.focusedEl, {
                    "tabindex": -1
                });
                focusCell(rows, rowPos, container.focusedColPos);
            }
        } else {
            moveRight(elements, focusConvention);
        }
    }

    function moveFocus(option, direction, ctrlKey) {
        var elements = option.elements,
            focusConvention = option.focusConvention;
        switch (direction) {
            case Ext.EventObject.LEFT:
                moveLeft(elements, focusConvention);
                break;
            case Ext.EventObject.RIGHT:
                moveRight(elements, focusConvention);
                break;
            case Ext.EventObject.UP:
                moveUp(elements, focusConvention);
                break;
            case Ext.EventObject.DOWN:
                moveDown(elements, focusConvention);
                break;
            case Ext.EventObject.PAGE_UP:
                moveUp(elements, focusConvention, elements.container.rowsVisible);
                break;
            case Ext.EventObject.PAGE_DOWN:
                moveDown(elements, focusConvention, elements.container.rowsVisible);
                break;
            case Ext.EventObject.HOME:
                if (ctrlKey && isGrid(focusConvention)) {
                    moveFirst(elements, focusConvention);
                } else {
                    moveHome(elements, focusConvention);
                }
                break;
            case Ext.EventObject.END:
                if (ctrlKey && isGrid(focusConvention)) {
                    moveLast(elements, focusConvention);
                } else {
                    moveEnd(elements, focusConvention);
                }
                break;
            default:
                break;
        }
    }

    function keyDownHandler(e, t, o) {
        if (e.keyCode === e.ESC) {
            cwc.util.hideFocusTip();
        } else {
            if (o.option.directions.indexOf(e.keyCode) > -1) {
                e.stopEvent();
                moveFocus(o.option, e.keyCode, e.ctrlKey);
            }
        }
    }

    function handleFocus(e, t, o) {
        onCellFocus(o.container, e.target, o.rowPos, o.colPos);
    }

    function handleBlur(e, t, o) {
        removeFocusCls(o.container.focusedEl);
    }

    function isGrid(focusConvention) {
        return focusConvention === FOCUS_CONVENTION.LAST_FOCUSED;
    }

    function isTabList(focusConvention) {
        return focusConvention === FOCUS_CONVENTION.SELECTED;
    }

    function initKeyNav(container, selector, directions, focusConvention) {
        var option = {
            directions: directions,
            focusConvention: focusConvention
        };
        var elements = null;
        var rows = null;
        if (isGrid(focusConvention) && selector.rowSelector) {
            var columnHeader = container.child(selector.headerSelector);
            var columns = columnHeader.select(selector.columnSelector);
            columnHeader.gridcells = columns;
            rows = container.select(selector.rowSelector);
            rows.each(function(row, array, index) {
                var cells = row.select(selector.cellSelector);
                Ext.get(array.elements[index]).gridcells = cells;
            });
            rows.elements.unshift(columnHeader);
            if (rows.elements.length > 0 && !container.sortChanged) {
                var initRowIndex = container.hasSortableColumn ? 0 : rows.elements.length > 1 ? 1 : 0;
                container.focusedRowPos = initRowIndex;
                container.focusedColPos = 0;
                container.focusedEl = Ext.get(Ext.get(rows.elements[initRowIndex]).gridcells.elements[0]);
                cwc.setProperty(container.focusedEl, {
                    "tabindex": 0
                });
            }
            rows.container = container;
            Ext.apply(option, {
                elements: rows
            });
            elements = rows;
        } else {
            elements = container.select(selector);
            container.focusedIndex = 0;
            container.focusedEl = Ext.get(elements.elements[0]);
            elements.container = container;
            Ext.apply(option, {
                elements: elements
            });
            if (focusConvention != undefined) {
                elements.each(function(element, array, index) {
                    cwc.setProperty(element, {
                        "tabindex": index === 0 ? 0 : -1
                    });
                });
            }
        }
        if (rows) {
            var container = rows.container;
            rows.each(function(row, array, i) {
                var gridcells = Ext.get(array.elements[i]).gridcells;
                gridcells.each(function(cell, cells, j) {
                    var handlers = {
                        "focus": {
                            fn: handleFocus,
                            rowPos: i,
                            colPos: j,
                            container: container
                        },
                        "blur": {
                            fn: handleBlur,
                            container: container
                        },
                        "keydown": {
                            fn: keyDownHandler,
                            option: option
                        }
                    };
                    var linkChild = cell.child("a");
                    var target = linkChild ? linkChild : cell;
                    target.un(handlers);
                    target.on(handlers);
                });
            });
        } else {
            var container = elements.container;
            elements.each(function(element, array, index) {
                element.on({
                    "focus": {
                        fn: function(e, t, o) {
                            onElementFocus(container, e.target, o.index);
                        },
                        index: index
                    },
                    "keydown": {
                        fn: keyDownHandler,
                        option: option
                    }
                });
            });
        }
    }
    cwc.util.initTabsKeyNav = initTabsKeyNav;
    cwc.util.initAccordionKeyNav = initAccordionKeyNav;
    cwc.util.initGridKeyNav = initGridKeyNav;
}();
! function() {
    const NATIVE_CURVE_NAME = "P-256",
        ECCLIB_CURVE_NAME = "p256",
        KEY_GEN_ALG = "ECDH",
        CIPHER_ALG = "AES-CBC",
        HASH_ALG = "SHA-256";
    var inited, ecc, crypto = (window.crypto || window.msCrypto).subtle,
        supported = !!crypto;

    function init() {
        if (cwc.encryptPassword && (cwc.isIE11 || cwc.isLegacyEdge) && !inited) {
            inited = true;
            if (!window.elliptic) {
                var script = document.createElement("script");
                script.onload = function() {
                    window.setTimeout(function() {
                        ecc = new elliptic.ec(ECCLIB_CURVE_NAME);
                    }, 50);
                };
                script.src = ["js", cwc.appResourceVersion, "elliptic", cwc.jsDebug ? "elliptic.js" : "elliptic.min.js"].join("/");
                document.head.appendChild(script);
            } else {
                window.setTimeout(function() {
                    ecc = new elliptic.ec(ECCLIB_CURVE_NAME);
                }, 50);
            }
        }
    }

    function genKeyPair() {
        var keyPair;
        if (ecc) {
            keyPair = ecc.genKeyPair();
            return Promise.resolve({
                keyPair: keyPair,
                pubKey: keyPair.getPublic("hex").toUpperCase()
            });
        } else {
            return crypto.generateKey({
                name: KEY_GEN_ALG,
                namedCurve: NATIVE_CURVE_NAME
            }, true, ["deriveKey", "deriveBits"]).then(function(key) {
                keyPair = key;
                return crypto.exportKey("raw", key.publicKey);
            }).then(function(keyData) {
                return {
                    keyPair: keyPair,
                    pubKey: bufToHex(keyData)
                };
            });
        }
    }

    function genSecret(keyPair, peerPubKey) {
        if (ecc) {
            var keyData = ecc.keyFromPublic(peerPubKey, "hex").getPublic();
            var bytes = keyPair.derive(keyData).toArray();
            return deriveKey(new Uint8Array(bytes));
        } else {
            var keyData = hexToBuf(peerPubKey);
            return crypto.importKey("raw", keyData, {
                name: KEY_GEN_ALG,
                namedCurve: NATIVE_CURVE_NAME
            }, false, []).then(function(key) {
                return crypto.deriveBits({
                    name: KEY_GEN_ALG,
                    namedCurve: NATIVE_CURVE_NAME,
                    "public": key
                }, keyPair.privateKey, 256);
            }).then(function(bits) {
                return deriveKey(bits);
            });
        }
    }

    function deriveKey(bits) {
        if (cwc.isIE11) {
            return new Promise(function(resolve, reject) {
                var digestOp = crypto.digest(HASH_ALG, bits);
                digestOp.oncomplete = function(e) {
                    var hash = new Uint8Array(e.target.result);
                    Array.prototype.forEach.call(hash, function(b, i, a) {
                        if (b == 0) {
                            a[i] = 1;
                        }
                    });
                    var keyOp = crypto.importKey("raw", hash, {
                        name: CIPHER_ALG
                    }, false, ["encrypt", "decrypt"]);
                    keyOp.oncomplete = function(evt) {
                        resolve(evt.target.result);
                    };
                };
            });
        } else {
            return crypto.digest(HASH_ALG, bits).then(function(hash) {
                hash = new Uint8Array(hash);
                hash.forEach(function(b, i, a) {
                    if (b == 0) {
                        a[i] = 1;
                    }
                });
                return crypto.importKey("raw", hash, {
                    name: CIPHER_ALG
                }, false, ["encrypt", "decrypt"]);
            });
        }
    }

    function encrypt(text, key) {
        var data = strToUtf8Buf(text);
        if (cwc.isIE11) {
            return new Promise(function(resolve, reject) {
                var op = crypto.encrypt({
                    name: CIPHER_ALG,
                    iv: new Uint8Array(16)
                }, key, data);
                op.oncomplete = function(e) {
                    resolve(wrapEncryptedText(bufToHex(e.target.result)));
                };
            });
        } else {
            return crypto.encrypt({
                name: CIPHER_ALG,
                iv: new Uint8Array(16)
            }, key, data).then(function(encrypted) {
                return wrapEncryptedText(bufToHex(encrypted));
            });
        }
    }

    function wrapEncryptedText(text) {
        return "FEFE" + text + "EFEF";
    }

    function bufToHex(buf) {
        return Array.prototype.map.call(new Uint8Array(buf), function(n) {
            return ("0" + n.toString(16)).slice(-2).toUpperCase();
        }).join("");
    }

    function hexToBuf(hex) {
        return new Uint8Array(hex.match(/.{2}/g).map(function(s) {
            return parseInt(s, 16);
        }));
    }

    function utf8BufToStr(buf) {
        var utf8 = Array.prototype.reduce.call(new Uint8Array(buf), function(p, c) {
            return p + String.fromCharCode(c);
        }, "");
        return decodeURIComponent(escape(utf8));
    }

    function strToUtf8Buf(str) {
        var utf8 = unescape(encodeURIComponent(str)),
            buf = new Uint8Array(utf8.length);
        for (var i = 0; i < utf8.length; i++) {
            buf[i] = utf8.charCodeAt(i);
        }
        return buf;
    }

    function updatePubKey(form, pubKey) {
        var pubKeyEl = form.elements["__pubKey"];
        if (!pubKeyEl) {
            pubKeyEl = document.createElement("input");
            pubKeyEl.name = "__pubKey";
            pubKeyEl.type = "hidden";
            form.appendChild(pubKeyEl);
        }
        pubKeyEl.value = pubKey;
    }

    function encryptPassword(form, peerPubKey, pwdEls) {
        if (!supported) {
            return Promise.resolve(false);
        }
        if (!pwdEls) {
            pwdEls = form.querySelectorAll("input[type=password]");
        }
        pwdEls = Array.prototype.filter.call(pwdEls, function(el) {
            return el.value != "" && !/FEFE\w+EFEF/.test(el.value);
        });
        if (pwdEls.length == 0) {
            return Promise.resolve(false);
        }
        return genKeyPair().then(function(keys) {
            updatePubKey(form, keys.pubKey);
            return keys.keyPair;
        }).then(function(keyPair) {
            return genSecret(keyPair, peerPubKey);
        }).then(function(aesKey) {
            return Promise.all(Array.prototype.map.call(pwdEls, function(el) {
                return encrypt(el.value, aesKey).then(function(encryptedValue) {
                    el.value = encryptedValue;
                });
            }));
        }).then(function() {
            return true;
        });
    }
    window.cwc = window.cwc || {};
    cwc.crypto = {
        supported: supported,
        init: init,
        encryptPassword: encryptPassword
    };
}();
var cwc = window.cwc || {};
! function() {
    var HtmlLoader = {
        loadHtml: loadHtml,
        retry: retry,
        setRenderTo: setRenderTo,
        getSourceContext: function() {
            return context ? context.sourceContext : null;
        },
        getTargetContext: function() {
            return context ? context.targetContext : null;
        },
        getStatus: function() {
            return status;
        },
        getRequestQueue: function() {
            return requestQueue;
        },
        getCachedJs: function() {
            return jsCache;
        },
        getSpentTime: getSpentTime,
        STATUS_READY: 0,
        STATUS_NEXT_REQUEST: 1,
        STATUS_PAGE_LOADING: 11,
        STATUS_PAGE_ONRESPONSE: 12,
        STATUS_PAGE_ONBEFORERENDER: 20,
        STATUS_PAGE_RENDERING: 21,
        STATUS_PAGE_ONRENDER: 22,
        STATUS_JS_LOADING: 31,
        STATUS_JS_EXECUTING: 32,
        STATUS_JS_ONLOAD: 40,
        CALLBACK_FLAG_STOP: 0,
        CALLBACK_FLAG_CONTINUE: 1,
        CALLBACK_FLAG_WAIT: 2
    };
    var LOADING_STATUS_ID = "CWC-HTML-LOADER-STATUS";
    var LOADER_SCRIPT_TAG_ID = "cwc_JsLoader_script";
    var requestQueue = [];
    var scriptQueue = [];
    var jsCache = {};
    var status = HtmlLoader.STATUS_READY;
    var statusElement;
    var context;

    function loadHtml(cfg) {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.loadHtml..." + window.location.href);
        if (status != HtmlLoader.STATUS_READY && status != HtmlLoader.STATUS_NEXT_REQUEST) {
            requestQueue.push(cfg);
            cwc.jsDebug && window.console && console.debug("htmlLoader is busy...queue the request");
            return;
        }
        context = copyObj(cfg);
        context.startTime = Date.now();
        statusChange(HtmlLoader.STATUS_PAGE_LOADING);
        this.setRenderTo(cfg.renderTo || document.body);
        try {
            var method = context.method || "POST";
            sendRequest(context.url, method, context.params, function(responseText, responseHeader) {
                context.responseText = responseText;
                context.responseHeader = responseHeader;
                runNextStage();
            }, cfg.headerParams);
        } catch (e) {
            cwc.jsDebug && window.console && console.error(e.message);
            throw e;
        }
    }

    function onPageResponse() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.onPageResponse at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_PAGE_ONRESPONSE);
        var responseHTML = context.responseText;
        var responseHeader = context.responseHeader;
        var ret = cwc.callFunctionInContext(context.onResponse, [responseHTML, responseHeader, runNextStage], context.sourceContext);
        if (ret === HtmlLoader.CALLBACK_FLAG_STOP) {
            finish();
        } else {
            if (ret !== HtmlLoader.CALLBACK_FLAG_WAIT) {
                runNextStage();
            }
        }
    }

    function onBeforeRender() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.onBeforeRender at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_PAGE_ONBEFORERENDER);
        var ret = cwc.callFunctionInContext(context.onBeforeRender, [context.renderTo, context.targetContext, runNextStage], context.targetContext);
        if (ret === HtmlLoader.CALLBACK_FLAG_STOP) {
            finish();
        } else {
            if (ret !== HtmlLoader.CALLBACK_FLAG_WAIT) {
                runNextStage();
            }
        }
    }

    function updateViewType() {
        var displaymode = context.responseHeader.displayMode;
        var displaytype = context.responseHeader.displayType;
        var classlist = context.targetContext.document.documentElement.classList;
        var reg = new RegExp("(^|\\s)(((dm-)|(vt-)))");
        if (displaymode && displaytype) {
            for (var i = 0; i < classlist.length; i++) {
                if (reg.test(classlist[i])) {
                    classlist.remove(classlist[i]);
                    i--;
                }
            }
            classlist.add("dm-" + displaymode);
            classlist.add("vt-" + displaytype);
        }
    }

    function render() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.render at " + getSpentTime() + "...");
        updateViewType();
        statusChange(HtmlLoader.STATUS_PAGE_RENDERING);
        scanLoadedJs();
        try {
            context.renderTo.innerHTML = context.responseText;
            runNextStage();
        } catch (e) {
            console.error("HtmlLoader.render failed..." + e.message);
            finish();
        }
    }

    function onRender() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.onRender at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_PAGE_ONRENDER);
        var ret = cwc.callFunctionInContext(context.onRender, [context.renderTo, context.targetContext, runNextStage], context.targetContext);
        if (ret === HtmlLoader.CALLBACK_FLAG_STOP) {
            finish();
        } else {
            if (ret !== HtmlLoader.CALLBACK_FLAG_WAIT) {
                runNextStage();
            }
        }
    }

    function loadJs() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.loadJs at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_JS_LOADING);
        var container = context.renderTo;
        var scriptTags = container.querySelectorAll("script");
        Array.prototype.forEach.call(scriptTags, function(scriptElem) {
            queueScriptElement(scriptElem);
        });
        scriptQueue.forEach(function(scriptObj) {
            if (!scriptObj.readyForExecute) {
                if (!scriptObj.script && scriptObj.url) {
                    loadScript(scriptObj);
                } else {
                    scriptObj.readyForExecute = true;
                }
            }
        });
        if (isAllScriptLoaded()) {
            runNextStage();
        }
    }

    function executeJs() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.executeJs at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_JS_EXECUTING);
        cwc.jsDebug && window.console && console.debug("js execute start...");
        scriptQueue.forEach(function(scriptObj) {
            executeOneJs(scriptObj);
        });
        cwc.jsDebug && window.console && console.debug("js execute end...");
        scriptQueue = [];
        runNextStage();
    }

    function onLoad() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.onLoad at " + getSpentTime() + "...");
        statusChange(HtmlLoader.STATUS_JS_ONLOAD);
        try {
            var ret = cwc.callFunctionInContext(context.onLoad, [context.renderTo, context.targetContext, runNextStage], context.targetContext);
        } catch (e) {
            cwc.jsDebug && window.console && console.debug(e);
        }
        if (ret === HtmlLoader.CALLBACK_FLAG_STOP) {
            finish();
        } else {
            if (ret !== HtmlLoader.CALLBACK_FLAG_WAIT) {
                runNextStage();
            }
        }
    }

    function finish() {
        cwc.jsDebug && window.console && console.debug("------ HtmlLoader.finish at " + getSpentTime() + "...");
        try {
            var doc = context.renderTo.ownerDocument;
            var scriptTag = doc.getElementById(LOADER_SCRIPT_TAG_ID);
            if (scriptTag) {
                doc.body.removeChild(scriptTag);
            }
        } catch (e) {
            cwc.jsDebug && window.console && console.debug(e);
        }
        if (requestQueue.length > 0) {
            var cfg = requestQueue.shift();
            cwc.jsDebug && window.console && console.debug("----- HtmlLoader run next request in the queue");
            statusChange(HtmlLoader.STATUS_NEXT_REQUEST);
            context = null;
            setTimeout(loadHtml.bind(HtmlLoader, cfg), 1);
        } else {
            statusChange(HtmlLoader.STATUS_READY);
            context = null;
        }
    }

    function runNextStage() {
        switch (status) {
            case HtmlLoader.STATUS_PAGE_LOADING:
                onPageResponse();
                break;
            case HtmlLoader.STATUS_PAGE_ONRESPONSE:
                onBeforeRender();
                break;
            case HtmlLoader.STATUS_PAGE_ONBEFORERENDER:
                render();
                break;
            case HtmlLoader.STATUS_PAGE_RENDERING:
                onRender();
                break;
            case HtmlLoader.STATUS_PAGE_ONRENDER:
                loadJs();
                break;
            case HtmlLoader.STATUS_JS_LOADING:
                executeJs();
                break;
            case HtmlLoader.STATUS_JS_EXECUTING:
                onLoad();
                break;
            case HtmlLoader.STATUS_JS_ONLOAD:
                finish();
                break;
        }
    }

    function retry() {
        if (status != cwc.HtmlLoader.STATUS_PAGE_LOADING || !context.preservedRequestParams) {
            cwc.jsDebug && window.console && console.log("HtmlLoader is not loading status, no need retry...");
            return;
        }
        cwc.jsDebug && window.console && console.log("Previous request is not handled in backend, retry with previous params...");
        sendRequest.apply(window, context.preservedRequestParams);
    }

    function scanLoadedJs() {
        var targetWnd = getWindow(context.renderTo);
        var scriptTags = targetWnd.document.querySelectorAll("script[src][load-once]");
        Array.prototype.forEach.call(scriptTags, function(scriptElem) {
            saveLoadOnceJs(scriptElem.getAttribute("src"));
        });
    }

    function setRenderTo(target) {
        context.renderTo = target;
        context.targetContext = getWindow(target);
    }

    function setParameter(param, value) {
        context[param] = value;
    }

    function queueScriptElement(scriptElem) {
        var url = scriptElem.getAttribute("src");
        var scriptObj = {};
        if (url) {
            if (isLoadOnceJs(url)) {
                return true;
            }
            if (scriptElem.getAttribute("load-once") == 1) {
                saveLoadOnceJs(url);
            }
            if (jsCache[url]) {
                scriptObj.script = jsCache[url];
            } else {
                scriptObj.url = url;
            }
        } else {
            scriptObj.script = scriptElem.innerHTML;
        }
        scriptQueue.push(scriptObj);
        return true;
    }

    function isAllScriptLoaded() {
        return scriptQueue.every(function(scriptObj) {
            return scriptObj.readyForExecute;
        });
    }

    function loadScript(scriptObj) {
        if (scriptObj.url) {
            sendRequest(scriptObj.url, "GET", "", function(scriptContent) {
                scriptObj.script = scriptContent;
                jsCache[scriptObj.url] = scriptContent;
                scriptObj.readyForExecute = true;
                if (isAllScriptLoaded()) {
                    runNextStage();
                }
            });
        }
    }

    function executeOneJs(scriptObj) {
        var doc = context.renderTo.ownerDocument;
        var scriptTag = doc.getElementById(LOADER_SCRIPT_TAG_ID);
        if (scriptTag) {
            doc.body.removeChild(scriptTag);
        }
        scriptTag = doc.createElement("script");
        scriptTag.id = LOADER_SCRIPT_TAG_ID;
        scriptTag.setAttribute("class", "ajax-load");
        scriptTag.innerHTML = ["<!--", scriptObj.script, "//-->"].join("\n\r");
        try {
            doc.body.appendChild(scriptTag);
        } catch (e) {
            cwc.jsDebug && window.console && console.error("execute js file error..." + scriptObj.url + "..." + e.message);
        }
        scriptObj.url && scriptTag.setAttribute("src", scriptObj.url);
    }

    function statusChange(toStatus) {
        status = toStatus;
        if (!statusElement) {
            statusElement = document.createElement("DIV");
            statusElement.setAttribute("id", LOADING_STATUS_ID);
            statusElement.setAttribute("style", "display:none");
            document.body.appendChild(statusElement);
        }
        statusElement.setAttribute("value", toStatus);
    }

    function sendRequest(url, method, sParams, callback, headerParams) {
        cwc.jsDebug && window.console && console.debug("loadURL..." + url);
        context.preservedRequestParams = arguments;
        method = method || "GET";
        var request = new XMLHttpRequest();
        request[request.onload === null ? "onload" : "onreadystatechange"] = ajaxCallback;
        request.open(method, url, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        if (headerParams) {
            Object.keys(headerParams).forEach(function(prop) {
                request.setRequestHeader(prop, headerParams[prop]);
            });
        }
        if (method != "GET") {
            hpsm.addTokenForPostRequest(request);
        }
        request.send(sParams);

        function ajaxCallback() {
            if (request.readyState != 4) {
                return;
            }
            delete context.preservedRequestParams;
            if (request.status == 401) {
                window.console && console.log("Failed to load %s, error 401", url);
                cwc.getTopCwc().xhrFailure(401, request.getResponseHeader("isSessionConnected") == "true");
                return;
            } else {
                if (request.status != 200 && request.getResponseHeader("isErrorPage") != "true") {
                    throw new Error("unable to load " + url + " (" + request.status + " " + request.statusText + ")");
                }
            }
            var responseHeader = buildResponseHeader(request);
            callback(request.responseText, responseHeader);
        }
    }

    function buildResponseHeader(request) {
        var responseHeader = {};
        ["threadId", "displayType", "style", "refreshList", "threadUrl", "listUrl", "detailUrl", "transactions", "displayMode", "listDataOnly", "fromList", "processMessage"].forEach(function(key) {
            responseHeader[key] = request.getResponseHeader(key);
        });
        try {
            if (responseHeader.transactions) {
                responseHeader.transactionStatus = JSON.parse(responseHeader.transactions);
                responseHeader.currentTransaction = responseHeader.transactionStatus[responseHeader.threadId];
            }
        } catch (e) {
            cwc.jsDebug && window.console && console.debug("parse transactions failed..." + responseHeader.transactions);
        }
        return responseHeader;
    }

    function saveLoadOnceJs(jsPath) {
        var tgtWindow = getWindow(context.renderTo);
        if (!tgtWindow._loadOnceJs) {
            tgtWindow._loadOnceJs = [];
        }
        tgtWindow._loadOnceJs[jsPath] = true;
    }

    function isLoadOnceJs(jsPath) {
        var tgtWindow = getWindow(context.renderTo);
        var loadOnceJs = tgtWindow._loadOnceJs;
        if (!loadOnceJs) {
            return false;
        } else {
            return loadOnceJs[jsPath] === true;
        }
    }

    function getWindow(element) {
        var doc = element.ownerDocument;
        return doc.defaultView || doc.parentWindow;
    }

    function getSpentTime() {
        return Date.now() - context.startTime;
    }

    function copyObj(src) {
        var tgt = {};
        Object.keys(src).forEach(function(key) {
            tgt[key] = src[key];
        });
        return tgt;
    }
    cwc.HtmlLoader = HtmlLoader;
}();
cwc.messageManager = (function() {
    if (Ext.isDefined(cwc.store.session)) {
        if (!Ext.isDefined(cwc.store.session.getItem("historyMessages"))) {
            cwc.store.session.setItem("historyMessages", []);
        }
    } else {
        if (window.console) {
            console.error("cwc-Extjs-Messager.js should be loaded after cwc-store.js");
        }
        return;
    }
    if (cwc.needClearMessageHistory) {
        cwc.needClearMessageHistory = false;
        cwc.store.session.setItem("historyMessages", []);
    }
    var historyMessages = cwc.store.session.getItem("historyMessages");
    var unreviewedIcon = null;
    var msgBtn = null;
    var resetUnreviewedNumber = function() {
        var unreviewedMsg = 0;
        for (var i = 0; i < historyMessages.length; i++) {
            var m = historyMessages[i];
            if (!m.reviewed) {
                unreviewedMsg++;
            }
        }
        if (unreviewedIcon) {
            unreviewedIcon.removeClass("cwc-message-icon-tip-more");
            unreviewedIcon.applyStyles({
                "font-size": ""
            });
            var suffix = unreviewedMsg == 0 ? "" : " - " + unreviewedMsg + " " + cwc.MESSAGEBOX_UNREAD;
            var newMsgTip = msgBtn.originalTooltip.replace("</span>", suffix + "</span>");
            var ariaLabel = msgBtn.ariaLabel + suffix;
            msgBtn.setTooltip(newMsgTip);
            if (msgBtn.el.child("button").dom.attributes["aria-label"]) {
                msgBtn.el.child("button").dom.attributes["aria-label"].value = ariaLabel;
            }
            msgBtn.setText(ariaLabel);
        }
        return unreviewedMsg;
    };
    return {
        isMessageHistoryShown: false,
        addMessages: function(messages) {
            if (!Ext.isArray(messages)) {
                if (messages && messages.msg) {
                    messages = [msg];
                } else {
                    var tmp = [];
                    for (var prop in msg) {
                        if (typeof(prop) === "function") {
                            continue;
                        } else {
                            tmp.push(prop + ":" + msg[prop]);
                        }
                    }
                    if (window.console) {
                        console.error("Error, messages must have msg property: " + tmp.join(","));
                    }
                    return;
                }
            }
            for (var i = 0; i < messages.length; i++) {
                var m = messages[i];
                if (!m.reviewed) {
                    m.reviewed = false;
                }
            }
            historyMessages = messages.concat(historyMessages);
            if (historyMessages.length > this.maxMessageNumber) {
                historyMessages.length = this.maxMessageNumber;
            }
            var unreviewedMsg = resetUnreviewedNumber();
            if (unreviewedIcon && unreviewedMsg > 0) {
                unreviewedIcon.setVisible(true);
                if (cwc.isHighContrastMode()) {
                    if (unreviewedMsg > 9) {
                        unreviewedIcon.addClass("x-show-big");
                    } else {
                        unreviewedIcon.addClass("x-show");
                    }
                }
            }
            cwc.store.session.setItem("historyMessages", historyMessages);
        },
        clearAllMessages: function() {
            var keepedMessages = [];
            for (var i = 0; i < historyMessages.length; i++) {
                if (!historyMessages[i].reviewed) {
                    keepedMessages.push(historyMessages[i]);
                }
            }
            historyMessages = keepedMessages;
            cwc.store.session.setItem("historyMessages", historyMessages);
            var messageBox = Ext.getCmp("cwc_message_box");
            if (messageBox) {
                messageBox.update("<div id='message_div' role='list' aria-label='" + cwc.MESSAGEBOX_TITLE + "'></div>", false);
            }
            this.hideMessageBar();
        },
        getMessages: function(offset, size) {
            historyMessages = cwc.store.session.getItem("historyMessages");
            var maxLen = historyMessages.length;
            if (offset > maxLen) {
                return [];
            } else {
                if ((offset + size) > maxLen) {
                    return historyMessages.slice(offset, maxLen);
                } else {
                    return historyMessages.slice(offset, offset + size);
                }
            }
        },
        setAllMessagesReviewed: function() {
            for (var i = 0; i < historyMessages.length; i++) {
                historyMessages[i].reviewed = true;
            }
            cwc.store.session.setItem("historyMessages", historyMessages);
            if (unreviewedIcon) {
                unreviewedIcon.setVisible(false);
                if (cwc.isHighContrastMode()) {
                    unreviewedIcon.removeClass("x-show");
                    unreviewedIcon.removeClass("x-show-big");
                }
                msgBtn.setTooltip(msgBtn.originalTooltip);
                if (msgBtn.el.child("button").dom.attributes["aria-label"]) {
                    msgBtn.el.child("button").dom.attributes["aria-label"].value = msgBtn.ariaLabel;
                }
                msgBtn.setText(cwc.MESSAGEBOX_TITLE);
            }
        },
        showMessageBar: function(messages, checkTabCount, duringOp) {
            var showTabCountMsg = false;
            if (checkTabCount) {
                if (cwc.getTabPanelCount() > cwc.openTabsSoftLimit) {
                    showTabCountMsg = true;
                }
            }
            var showCommonMsg = true;
            if (messages && typeof messages === "string") {
                messages = Ext.decode(messages);
            }
            if (messages == null || messages.items == null || messages.items.length == 0) {
                showCommonMsg = false;
            }
            if (!showCommonMsg && !showTabCountMsg) {
                return;
            }
            var currentTab = cwc.getActiveTab();
            var me = this;
            var _displayAndSave = function() {
                me.hideMessageBar();
                currentTab.setMessage(messages, showCommonMsg, showTabCountMsg);
                if (showCommonMsg) {
                    me.addMessages(messages.items);
                }
            };
            if (currentTab) {
                if (!duringOp && currentTab.messagebar && currentTab.messagebar.isVisible()) {
                    setTimeout(_displayAndSave, 1000);
                } else {
                    _displayAndSave();
                }
            } else {
                if (showCommonMsg) {
                    me.addMessages(messages.items);
                }
            }
        },
        hideMessageBar: function() {
            var currentTab = cwc.getActiveTab();
            if (currentTab) {
                currentTab.clearMessage();
            }
        },
        showMessageHistory: function() {
            var messageBox = Ext.getCmp("cwc_message_box");
            if (messageBox) {
                messageBox.showMessageBox();
            }
            this.isMessageHistoryShown = true;
        },
        hideMessageHistory: function() {
            var messageBox = Ext.getCmp("cwc_message_box");
            if (messageBox) {
                messageBox.setVisible(false);
            }
            this.isMessageHistoryShown = false;
            this.updateImageFontState();
            var msgEl = Ext.get("toolbarMessageButtonId");
            if (msgEl) {
                var msgBtn = msgEl.child("button.cwc-toolbar-messages");
                msgBtn.focus(100);
            }
        },
        updateImageFontState: function() {
            var msgBox = Ext.get("cwc_message_box");
            var elements = msgBox.select("img").elements;
            for (var i = 0; i < elements.length; i++) {
                var img = elements[i];
                img.className = "greyMessageIcon";
            }
            elements = msgBox.select("p").elements;
            for (var i = 0; i < elements.length; i++) {
                var p = elements[i];
                p.style.fontWeight = "normal";
            }
        },
        toggleMessageHistory: function() {
            var messageBox = Ext.getCmp("cwc_message_box");
            if (!messageBox) {
                return;
            }
            if (this.isMessageHistoryShown) {
                this.hideMessageHistory();
                this.setAllMessagesReviewed();
            } else {
                this.showMessageHistory();
            }
        },
        setIconCmp: function(iconCmp) {
            unreviewedIcon = iconCmp;
        },
        setMessageBtn: function(msgbtn) {
            msgBtn = msgbtn;
        }
    };
})();
cwc.messageManager.maxMessageNumber = cwc.maxMessageNumber;
cwc.ux.MessagerBox = Ext.extend(Ext.Window, {
    layout: "fit",
    closable: false,
    shadow: false,
    shim: false,
    modal: true,
    constrain: true,
    autoScroll: true,
    title: "",
    onEsc: function() {
        cwc.messageManager.hideMessageHistory();
    },
    keys: [{
        key: 27,
        fn: cwc.messageManager.hideMessageHistory,
        scope: cwc.messageManager
    }],
    listeners: {
        afterrender: function(me) {
            me.header.on("click", function() {
                cwc.setWorkflowAppletVisible(false);
            });
            me.body.on("click", function() {
                cwc.setWorkflowAppletVisible(false);
            });
            me.body.on("keydown", function(e) {
                var key = e.getKey();
                if (key == e.TAB) {
                    e.stopEvent();
                    toolbar.focusedBtn.focus();
                }
            });
            var toolbar = me.getBottomToolbar();
            cwc.util.setToolbarARIA({
                "toolbar": toolbar,
                "label": cwc.TOOLBAR_POSITION_BOTTOM
            });
            cwc.util.setDialogARIA(this);
        },
        hide: function(me) {
            me.el.set({
                "aria-hidden": true
            });
            cwc.setWorkflowAppletVisible(true);
        },
        show: function(me) {
            me.el.set({
                "aria-hidden": false
            });
            me.addClass(cwc.getDirectionClass());
            var nextFocusElem = Ext.get("message_div");
            if (nextFocusElem) {
                nextFocusElem.parent().scroll("t", 100000);
            }
            var toolbar = me.getBottomToolbar();
            Ext.EventManager.addListener(toolbar.el, "keydown", function(e) {
                var key = e.getKey();
                if (key == e.TAB) {
                    e.stopEvent();
                    me.body.focus();
                }
            });
        }
    },
    bbar: {
        buttonAlign: "right",
        items: [{
            text: cwc.MESSAGEBOX_CLEARMESSAGES,
            id: "msgClearButton",
            cls: "message-popup-button",
            handler: function() {
                cwc.messageManager.clearAllMessages();
                cwc.messageManager.hideMessageHistory();
            }
        }, {
            text: cwc.MESSAGEBOX_CLOSE,
            id: "msgCloseButton",
            cls: "message-popup-button",
            handler: function() {
                cwc.messageManager.hideMessageHistory();
            }
        }]
    },
    footerCfg: {},
    cssSet: {
        1: "messageBox infoMsg",
        2: "messageBox warningMsg",
        3: "messageBox errorMsg",
        4: "messageBox alertMsg"
    },
    showMessageBox: function() {
        var messages = cwc.messageManager.getMessages(0, cwc.messageManager.maxMessageNumber);
        var tmpl = new Ext.Template('<div role="listitem" aria-setsize="{setSize}" aria-posinset="{posInSet}" aria-labelledby="message-text-{id}" class="messageBox" style="display:block;">' + '<div id="message-img-{id}" style="display: inline-block;width:10%;vertical-align:top;"><img class="{imgCls}" title="{title}" aria-hidden="true" src="{img}" style="display: inline-block; "></div>' + '<div id="message-text-{id}" style="-webkit-user-select:all;display: inline-block;padding-left: 4px;width:85%"><span class="audible-text">{unreadText}{title}, </span><span style="color: grey;padding-top:3px;">{time}, </span><span style="font-weight: {fontWeight}; padding: 5px 0px 5px;word-wrap: break-word">{msg}</span></div></div>');
        tmpl.compile();
        var html = [];
        var imageVersionPath = top.cwc.imagePath;
        this.allMessages = "";
        var msgIcon = {
            1: imageVersionPath + "/msg_info.png",
            2: imageVersionPath + "/msg_warning.png",
            3: imageVersionPath + "/msg_error.png",
            4: imageVersionPath + "/msg_info.png"
        };
        var unreviewedMsgCount = messages.length;
        for (var i = 0, maxi = messages.length; i < maxi; i++) {
            var item = messages[i];
            if (!item.time) {
                item.time = new Date().format("Y-m-d H:i:s");
            }
            if (item.severity && item.msg) {
                var greyCss = "";
                var vFontWeight = "bold";
                var unreadText = cwc.MESSAGEBOX_UNREAD + ", ";
                if (item.reviewed) {
                    greyCss = "greyMessageIcon";
                    vFontWeight = "normal";
                    unreadText = "";
                    unreviewedMsgCount--;
                }
                var fragment = tmpl.applyTemplate({
                    id: i,
                    setSize: messages.length,
                    posInSet: i + 1,
                    unreadText: unreadText,
                    fontWeight: vFontWeight,
                    imgCls: greyCss,
                    img: msgIcon[item.severity],
                    msg: Ext.util.Format.htmlEncode(item.msg),
                    title: Ext.util.Format.htmlEncode(item.alt),
                    time: item.time
                });
                html.push(fragment);
                this.allMessages += Ext.util.Format.htmlEncode(item.alt) + " " + item.time + " " + Ext.util.Format.htmlEncode(item.msg) + " ";
            }
        }
        cwc.messageManager.setAllMessagesReviewed();
        var title = unreviewedMsgCount == 0 ? cwc.MESSAGEBOX_TITLE : cwc.MESSAGEBOX_TITLE + " - " + unreviewedMsgCount + " " + cwc.MESSAGEBOX_UNREAD;
        this.setTitle(title);
        this.show();
        this.center();
        var msgDialog = Ext.getCmp("cwc_message_box");
        var msgBody = msgDialog.el.child(".x-window-body");
        if (cwc.isAccessibleMode) {
            var newWidth = parseInt(msgBody.getStyle("width")) - 1;
            var newHeight = parseInt(msgBody.getStyle("height")) - 1;
            msgBody.setStyle("width", newWidth + "px");
            msgBody.setStyle("height", newHeight + "px");
        }
        var msgBodyEl = Ext.get(msgBody);
        msgBodyEl.set({
            "role": "article",
            "tabindex": "0",
            "aria-label": cwc.MESSAGEBOX_TITLE
        });
        this.update("<div id='message_div' role='list' aria-label='" + cwc.MESSAGEBOX_TITLE + "'>" + html.join("") + "</div>", false);
        msgDialog.focusEl = msgBodyEl;
    },
    clear: function() {
        cwc.messageManager.clearAllMessages();
    }
});
Ext.reg("cwc_message_box", cwc.ux.MessagerBox);
! function() {
    var messageIcons = {
        "information": Ext.MessageBox.INFO,
        "warning": Ext.MessageBox.WARNING,
        "error": Ext.MessageBox.ERROR,
        "question": Ext.MessageBox.QUESTION
    };
    var pendingMessageArgs;
    cwc.showMessage = function(style, message, delayMillis, title, msgCfg, showAfterTabChange) {
        if (cwc.jsDebug && window.console) {
            console.log("cwc.showMessage:style=" + style + " message=" + message + " delay=" + delayMillis + " title=" + title + " messageShown=" + cwc.messageBoxShown + " queue=" + (cwc.popupQueue ? cwc.popupQueue.length : 0) + (showAfterTabChange == undefined ? "" : " showAfterTabChange=" + showAfterTabChange));
        }
        if (showAfterTabChange) {
            pendingMessageArgs = Array.prototype.slice.call(arguments);
            pendingMessageArgs.pop();
            cwc.messageBoxShown = true;
            return;
        }
        var cfg = {
            title: title,
            msg: message,
            buttons: Ext.Msg.OK,
            icon: messageIcons[style],
            minWidth: 320,
            maxWidth: 500,
            cls: (cwc.getDirectionClass() == "rtl" ? "rtl" : "") + " message-title-" + style,
            needFocusBack: true
        };
        Ext.apply(cfg, msgCfg);
        if (msgCfg && msgCfg.fn) {
            cfg.fn = function(buttonId, source) {
                msgCfg.fn(buttonId, source);
                afterCloseMessageDialog(cfg.needFocusBack);
            };
        } else {
            cfg.fn = afterCloseMessageDialog;
        }
        if (cwc.messageBoxShown && !pendingMessageArgs) {
            cwc.popupQueue = cwc.popupQueue || [];
            cwc.popupQueue.push({
                delayMillis: delayMillis,
                msgCfg: cfg
            });
            if (cwc.jsDebug && window.console) {
                console.log("cwc.popupQueue:" + cwc.popupQueue.length);
            }
        } else {
            deferShowMessage(delayMillis, cfg);
        }
    };
    cwc.showPendingMessage = function() {
        if (pendingMessageArgs) {
            cwc.showMessage.apply(cwc, pendingMessageArgs);
            pendingMessageArgs = null;
        }
    };

    function deferShowMessage(delayMillis, cfg) {
        if (!delayMillis || delayMillis < 0) {
            delayMillis = 0;
        }
        cwc.messageBoxShown = true;
        Ext.defer(openExtMessageBox, delayMillis, window, [cfg]);
    }

    function openExtMessageBox(msgCfg) {
        if (Ext.isEmpty(msgCfg.title)) {
            msgCfg.title = cwc.documentTitle || cwc.getFrameworkWindow().document.title;
        }
        cwc.hideMaskMessage();
        cwc.blockKeyCodesForMask();
        var dlg = Ext.Msg.getDialog();
        cwc.util.setDialogARIA(dlg);
        cwc.messageDialog = Ext.Msg.show(msgCfg);
        cwc.changeMsgButtonStyle(dlg);
        cwc.messageDialog.fn = msgCfg.fn;
    }

    function afterCloseMessageDialog(needFocusBack) {
        cwc.messageBoxShown = false;
        cwc.unblockKeyCodesForMask.defer(200);
        cwc.messageDialog = null;
        if (cwc.popupQueue && cwc.popupQueue.length > 0) {
            var args = cwc.popupQueue.splice(0, 1)[0];
            var delayMillis = args.delayMillis;
            var msgCfg = args.msgCfg;
            deferShowMessage(delayMillis, msgCfg);
        }
        cwc.showMaskMessage();
        if (needFocusBack) {
            cwc.focusBack();
        }
        if (cwc.isIE8) {
            Ext.Msg.getDialog().getEl().removeClass("x-show");
        }
    }
}();
/* file: cwc-Extjs-NavPanel.js */
cwc.ux.NavPanel = Ext.extend(Ext.Panel, {
    sidebarContainerEl: null,
    sidebarCls: "sidebar-mode",
    transaction: false,
    isTriggering: false,
    onRender: function(ct, position) {
        cwc.ux.NavPanel.superclass.onRender.call(this, ct, position);
        if (cwc.isRTL) {
            this.el.set({
                dir: "rtl"
            });
        }
    },
    toggleCollapse: function(animate) {
        if (this.transaction) {
            return;
        }
        return cwc.ux.NavTree.superclass.toggleCollapse.call(this, animate);
    },
    getMiniCollapseDivEl: function() {
        if (!this.miniCollapseDivEl) {
            var miniCollaps = Ext.get("cwcNavPanel-xcollapsed");
            if (!miniCollaps) {
                return;
            }
            this.miniCollapseDivEl = miniCollaps && miniCollaps.first();
            cwc.setProperty(this.miniCollapseDivEl, {
                "ext:qtip": cwc.NAVMENU_EXPAND,
                "role": "button",
                "aria-label": cwc.NAVMENU_EXPAND,
                "aria-expanded": "false",
                "tabIndex": 0
            });
            this.miniCollapseDivEl.on("keypress", function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode == e.ENTER || keyCode == e.SPACE) {
                    this.expand(true);
                }
            }, this, {
                stopEvent: true
            });
            this.miniCollapseDivEl.set({
                tabindex: 0
            });
        }
        return this.miniCollapseDivEl;
    },
    collapse: function(animate) {
        this.startTransaction();
        this.isTriggering = true;
        cwc.ux.NavPanel.superclass.collapse.call(this, animate);
    },
    afterCollapse: function(anim) {
        cwc.ux.NavPanel.superclass.afterCollapse.call(this, anim);
        if (!cwc.isAccessibleMode) {
            this.installSidebarPopupMenu();
            var self = this;
            setTimeout(function() {
                var sidebarContainer = self.id == cwc.navPanelId && self.sidebar ? self.sidebar.container : Ext.fly("cwcNavPanel-sidebar");
                if (!sidebarContainer.dom.previousSibling || sidebarContainer.dom.previousSibling.id != self.el.id) {
                    sidebarContainer.insertAfter(self.el);
                }
            }, 200);
        } else {
            this.collapsedManually = false;
            var parentCt = this.miniCollapseDivEl.parent();
            if (!parentCt.dom.previousSibling || parentCt.dom.previousSibling.id != this.el.id) {
                parentCt.insertAfter(this.el);
            }
        }
        this.isTriggering = false;
        this.endTransaction();
    },
    expand: function(anim) {
        var me = this;
        me.startTransaction();
        this.isTriggering = true;
        if (!cwc.isAccessibleMode) {
            me.uninstallSidebarPopupMenu();
            setTimeout(function() {
                cwc.ux.NavPanel.superclass.expand.call(me, anim);
            }, 300);
        } else {
            cwc.ux.NavPanel.superclass.expand.call(me, anim);
            this.collapsedManually = true;
        }
    },
    afterExpand: function(anim) {
        cwc.ux.NavPanel.superclass.afterExpand.call(this, anim);
        this.isTriggering = false;
        this.endTransaction();
    },
    startTransaction: function() {
        this.transaction = true;
        cwc.maskWindow();
    },
    endTransaction: function() {
        var me = this;
        setTimeout(function() {
            me.transaction = false;
            cwc.unmaskWindow();
        }, 1000);
    },
    createSidebar: function(sidebarDom, isDefaultMode) {
        var me = this;
        me.sidebar = new cwc.ux.SidebarPanel({
            renderTo: sidebarDom,
            navTree: me.get(0),
            navTreeContainer: me,
            isDefaultMode: isDefaultMode
        });
    },
    installSidebarPopupMenu: function() {
        this.addClass(this.sidebarCls);
        if (this.sidebar) {
            this.sidebar.setInitStatus();
            this.sidebar.showNavigateButtons();
            this.sidebar.setMiddleContainerHeight();
            this.isInSidebarMode = true;
        }
    },
    uninstallSidebarPopupMenu: function() {
        this.removeClass(this.sidebarCls);
        if (this.sidebar) {
            this.isInSidebarMode = false;
            this.sidebar.revertStatusChanges();
        }
    },
    needFocusExpand: function() {
        if (this.sidebar) {
            return isFocusCollapsDivPrevious = (this.sidebar.topContainer.get(0).btnEl.id == this.previousFocus || this.sidebar.topContainer.get(0).id == this.previousFocus);
        } else {
            if (this.getMiniCollapseDivEl() && this.collapsedManually) {
                return isFocusCollapsDivPrevious = this.miniCollapseDivEl.dom.id == this.previousFocus;
            }
        }
    },
    needFocusCollapse: function() {
        var expandFocusCmp = Ext.getCmp(cwc.btnExpand);
        return isFocusExpendBtnBefore = expandFocusCmp && expandFocusCmp.btnEl && expandFocusCmp.btnEl.dom.id == this.previousFocus;
    },
    getPreviousFocus: function() {
        if (document.activeElement && document.activeElement.id) {
            this.previousFocus = document.activeElement.id;
        }
    },
    listeners: {
        afterrender: function(btn) {
            var favMngBtn = Ext.getCmp(cwc.favManage);
            favMngBtn && favMngBtn.btnEl.set({
                "aria-pressed": false,
                "aria-expanded": false
            });
            cwc.util.setToolbarARIA({
                "toolbar": this.getTopToolbar(),
                "label": cwc.NAVMENU_TITLE
            });
        },
        beforestaterestore: function(stateFul, state, obj) {
            if (cwc.isAccessibleMode) {
                this.savedCollapsed = state.collapsed;
                if (!state.collapsed) {
                    state.collapsed = true;
                }
            }
        },
        beforeexpand: function(panel) {
            this.getPreviousFocus();
        },
        beforecollapse: function(panel) {
            if (this.items && this.items.itemAt(0) && this.items.itemAt(0).items && this.items.itemAt(0).items.itemAt(0)) {
                var curSelNode = this.items.itemAt(0).items.itemAt(0).getSelectedNode();
                if (curSelNode) {
                    Ext.get(curSelNode.ui.anchor).removeClass("focused");
                    var expandFocusCmp = Ext.getCmp(cwc.btnExpand);
                    this.previousFocus = expandFocusCmp && expandFocusCmp.btnEl && expandFocusCmp.btnEl.dom.id;
                    return;
                }
            }
            this.getPreviousFocus();
        },
        expand: function(panel) {
            if (this.needFocusExpand()) {
                Ext.getCmp(cwc.btnExpand).btnEl.focus(false, false);
            }
            if (this.items && this.items.itemAt(0) && this.items.itemAt(0).items && this.items.itemAt(0).items.itemAt(0)) {
                this.items.itemAt(0).items.itemAt(0).adjustPositionX(true);
            }
        },
        collapse: function(panel) {
            if (panel.sidebar) {
                if (this.needFocusCollapse()) {
                    setTimeout(function() {
                        panel.sidebar.focusExpendButton();
                    }, 100);
                }
            } else {
                if (panel.getMiniCollapseDivEl() && panel.collapsedManually && this.needFocusCollapse()) {
                    panel.miniCollapseDivEl.focus(500);
                }
            }
        }
    }
});
Ext.reg("cwc_navPanel", cwc.ux.NavPanel);
Ext.ns("hpsm.ux");
! function() {
    var IframeComponent = Ext.extend(Ext.BoxComponent, {
        onRender: function(ct, position) {
            var mifName = this.autoCreate ? this.autoCreate.id : "mif-comp-" + Ext.id() + "-" + Math.floor(Math.random() * 1000001);
            this.autoEl = {
                "tag": "iframe",
                "frameborder": 0,
                "id": mifName,
                "name": mifName
            };
            if (this.src) {
                this.autoEl.src = cwc.toCSRFSafe(this.src);
            }
            IframeComponent.superclass.onRender.apply(this, arguments);
        },
        afterRender: function() {
            var self = this;
            IframeComponent.superclass.afterRender.call(self, arguments);
            addFrameElMethods(self);
            if (hpsm.ux.IframePanel.ShimManager) {
                hpsm.ux.IframePanel.ShimManager.registerShim(this.ownerCt);
            }
        },
        destroy: function() {
            this.el && this.el.dom && (this.el.dom.src = "about:blank");
            IframeComponent.superclass.destroy.call(this);
            this.el = null;
        }
    });

    function addFrameElMethods(frameCmp) {
        var frameEl = frameCmp.el;
        Ext.apply(frameEl, {
            getFrameDocument: function() {
                try {
                    return frameEl && frameEl.dom && frameEl.dom.contentDocument.body ? frameEl.dom.contentDocument : null;
                } catch (e) {
                    return null;
                }
            },
            getWindow: function() {
                return frameEl ? frameEl.dom ? frameEl.dom.contentWindow : null : null;
            },
            setSrc: function(url) {
                url = cwc.toCSRFSafe(url || frameCmp.src);
                if (frameEl && frameEl.dom) {
                    frameEl.dom.src = url;
                }
                frameCmp.src = url;
            },
            getDocumentURI: function() {
                var URI, d;
                try {
                    URI = this.dom.src && (d = this.getFrameDocument()) ? d.location.href : null;
                } catch (ex) {}
                return URI || (Ext.isFunction(this.src) ? this.src() : this.src);
            },
            "get": function() {
                var frameExt = cwc.getObjectByAttributePath("Ext", this.getWindow());
                if (frameExt) {
                    return frameExt.get.apply(frameExt, arguments);
                }
                throw new Error("frame window does not support Extjs");
            },
            query: function() {
                var frameExt = cwc.getObjectByAttributePath("Ext", this.getWindow());
                if (frameExt) {
                    return frameExt.query.apply(frameExt, arguments);
                }
                throw new Error("frame window does not support Extjs");
            },
            ownerCt: frameCmp.ownerCt
        });
    }
    Ext.reg("hpsm-ux-iframecomponent", IframeComponent);
}();
! function() {
    var IframePanel = hpsm.ux.IframePanel = Ext.extend(Ext.Panel, {
        frameEl: null,
        defaultSrc: null,
        autoScroll: true,
        autoLoad: null,
        layout: "fit",
        constructor: function(config) {
            Ext.apply(config, {
                items: {
                    xtype: "hpsm-ux-iframecomponent",
                    src: config.defaultSrc,
                    autoCreate: config.frameConfig ? config.frameConfig.autoCreate : null
                }
            });
            IframePanel.superclass.constructor.call(this, config);
        },
        destroy: function() {
            IframePanel.superclass.destroy.call(this);
            if (hpsm.ux.IframePanel.ShimManager) {
                hpsm.ux.IframePanel.ShimManager.deRegisterShim(this);
            }
            this.frameEl = null;
        },
        initComponent: function() {
            var self = this;
            IframePanel.superclass.initComponent.call(self);
        },
        getFrameEl: function() {
            if (!this.frameEl) {
                this.frameEl = this.items.get(0).el;
            }
            return this.frameEl;
        },
        getFrame: function() {
            return this.getFrameEl();
        },
        getFrameWindow: function() {
            var frameEl = this.getFrameEl();
            return frameEl.getWindow();
        },
        getFrameDocument: function() {
            var frameEl = this.getFrameEl();
            return frameEl.getFrameDocument();
        },
        getFrameBody: function() {
            var doc = this.getFrameDocument();
            return doc ? doc.body : null;
        },
        setAutoScroll: function(auto) {},
        setSrc: function(url) {
            if (!this.rendered) {
                this.items.items[0].src = url;
            } else {
                var frameEl = this.getFrameEl();
                frameEl.setSrc(url);
            }
        }
    });
    Ext.reg("hpsm-ux-iframepanel", IframePanel);
}();
Ext.ns("cwc");
! function() {
    var _framePanels = [];
    var _shims = [];
    var shimClass = "ux-mif-shim";

    function registerShim(framePanel) {
        if (_framePanels.indexOf(framePanel) == -1) {
            _framePanels.push(framePanel);
            var shim = createShim(framePanel);
            _shims.push(shim);
        }
    }

    function deRegisterShim(framePanel) {
        var idx = _framePanels.indexOf(framePanel);
        if (idx != -1) {
            var shim = _shims[idx];
            Ext.destroy(shim);
            _framePanels.splice(idx, 1);
            _shims.splice(idx, 1);
        }
    }

    function createShim(framePanel) {
        var frameEl = framePanel.getFrameEl();
        var shim = Ext.DomHelper.append(frameEl.parent(), {
            tag: "img",
            src: Ext.BLANK_IMAGE_URL,
            cls: shimClass + " " + "x-shim",
            galleryimg: "no"
        }, true);
        shim.setSize(frameEl.getSize());
        framePanel.on("resize", function() {
            shim.setSize(frameEl.getSize());
        });
        return shim;
    }

    function toggleShims(show) {
        _shims.forEach(function(shim) {
            if (!shim.dom) {
                return;
            }
            if (show) {
                shim.addClass(shimClass + "-on");
            } else {
                shim.removeClass(shimClass + "-on");
            }
        });
    }

    function showShims() {
        toggleShims(true);
    }

    function hideShims() {
        toggleShims(false);
    }
    hpsm.ux.IframePanel.ShimManager = {
        registerShim: registerShim,
        deRegisterShim: deRegisterShim,
        showShims: showShims,
        hideShims: hideShims
    };
}();
! function() {
    var shimManager = hpsm.ux.IframePanel.ShimManager;
    cwc.showShims = function() {
        shimManager.showShims();
    };
    cwc.hideShims = function() {
        shimManager.hideShims();
    };
}();
/* file: SimpleDetailTabFrame.js */
Ext.ns("hpsm.ux");
hpsm.ux.SimpleDetailTabFrame = Ext.extend(hpsm.ux.IframePanel, {
    header: false,
    border: false,
    domReady: false,
    loadMask: false,
    cls: "simple-detail-frame",
    eventsFollowFrameLinks: true,
    initPageContent: function(frameEl, doc) {
        if (!frameEl) {
            frameEl = this.getFrame();
        }
        var toolbar = this.getTopToolbar();
        if (!doc) {
            doc = frameEl.getDocument();
        }
        this.domReady = true;
        var title = frameEl.getWindow().tpz_formTitle || this.ownerCt.titleLabel || doc.title;
        this.tab = this.ownerCt;
        this.tab.setTitle(title);
        this.tab.lang = cwc.userLanguage;
        this.tab.updateHeading();
        this.tab.ownerCt.delegateUpdates();
        if (this.hasListDetail()) {
            toolbar.hide();
        } else {
            var myToolbarCfg, cfg = (frameEl.getWindow().cwc && frameEl.getWindow().cwc.getToolbarCfgLite) ? frameEl.getWindow().cwc.getToolbarCfgLite() : null;
            if (cfg) {
                try {
                    myToolbarCfg = Ext.encode(cfg);
                    myToolbarCfg = Ext.decode(myToolbarCfg);
                } catch (ex) {
                    myToolbarCfg = (frameWin.getToolbarCfg) ? frameWin.getToolbarCfg() : null;
                } finally {
                    cfg = null;
                }
            }
            toolbar.removeAll();
            if (myToolbarCfg != null && toolbar.addComponents(myToolbarCfg)) {
                toolbar.show();
                this.tab.doLayout();
                cwc.util.setToolbarARIA({
                    "toolbar": toolbar
                });
            } else {
                toolbar.hide();
            }
        }
        if (this.doActivateOnReady) {
            delete this.doActivateOnReady;
            this.activateOnReady();
        }
        this.tab.fireEvent("tabready", this.tab);
    },
    destroyPageContent: function(frameEl, doc) {
        if (!frameEl) {
            frameEl = this.getFrame();
        }
        this.domReady = false;
        if (frameEl.ttips) {
            cwc.getTopCwc().destroyTooltips(frameEl.ttips);
            frameEl.ttips = null;
        }
        this.tab.saveOldTitle();
        this.tab.clearMessage();
        this.tab = null;
        var toolbar = this.getTopToolbar();
        toolbar.items.each(function(item) {
            toolbar.clearBtnHandler(item);
        });
    },
    isDomReady: function() {
        return this.domReady;
    },
    activateOnReady: function() {
        if (this.domReady) {
            var wndw = this.getFrameWindow();
            if (wndw && this.isFrameDocumentsReady() && wndw.onTabActivate) {
                wndw.onTabActivate();
            }
        } else {
            this.doActivateOnReady = true;
        }
    },
    hideToolbar: function() {
        if (this.getTopToolbar()) {
            this.getTopToolbar().hide();
        }
        this.ownerCt.doLayout();
    },
    isFrameDocumentsReady: function() {
        if (this.getFrame()) {
            var frameDoc = this.getFrame().getFrameDocument();
            if (frameDoc) {
                if (this.hasListDetail()) {
                    return this.getListFrameDocument() != null && this.getDetailFrameDocument() != null;
                }
                return true;
            }
        }
        return false;
    },
    hasListDetail: function() {
        if (this.getFrame()) {
            var frameDoc = this.getFrame().getFrameDocument();
            if (frameDoc) {
                var pathname = frameDoc.location.pathname;
                return (pathname.indexOf("cwc_listdetail.jsp") > -1);
            }
        }
        return undefined;
    },
    hasListOnly: function() {
        return this.getFrameWindow().listConfig ? true : false;
    },
    getFrameName: function() {
        return this.getFrame().dom.name;
    },
    getNorthListPanel: function() {
        var wndw = this.getFrameWindow();
        return (wndw && wndw.Ext && wndw.Ext.getCmp) ? wndw.Ext.getCmp(cwc.northPanelId) : null;
    },
    getWestListPanel: function() {
        var wndw = this.getFrameWindow();
        return (wndw && wndw.Ext && wndw.Ext.getCmp) ? wndw.Ext.getCmp(cwc.westPanelId) : null;
    },
    getListFrame: function() {
        var wndw = this.getFrameWindow();
        return (wndw && wndw.Ext && wndw.Ext.getCmp) ? wndw.Ext.getCmp(cwc.listFrameId) : null;
    },
    getListContainerPanel: function() {
        if (cwc.isHorizontalLayout()) {
            return this.getNorthListPanel();
        } else {
            return this.getWestListPanel();
        }
    },
    getListFrameDocument: function() {
        var frame = this.getListFrame();
        return (frame) ? frame.getFrameDocument() : null;
    },
    getListFrameWindow: function() {
        var frame = this.getListFrame();
        return (frame) ? frame.getFrameWindow() : null;
    },
    getListFrameId: function() {
        var frame = this.getListFrame();
        return (frame) ? frame.getFrame().id : null;
    },
    getListFrameName: function() {
        var frame = this.getListFrame();
        return (frame) ? frame.getFrame().dom.name : null;
    },
    getDetailFrame: function() {
        return (this.getFrameWindow().Ext) ? this.getFrameWindow().Ext.getCmp(cwc.detailFrameId) : null;
    },
    getDetailFrameDocument: function() {
        var frame = this.getDetailFrame();
        return (frame) ? frame.getFrameDocument() : null;
    },
    getDetailFrameWindow: function() {
        var frame = this.getDetailFrame();
        return (frame) ? frame.getFrameWindow() : null;
    },
    getDetailFrameId: function() {
        var frame = this.getDetailFrame();
        return (frame) ? frame.getFrame().id : null;
    },
    getDetailFrameName: function() {
        var frame = this.getDetailFrame();
        return (frame) ? frame.getFrame().dom.name : null;
    }
});
Ext.reg("simpleDetailTabFrame", hpsm.ux.SimpleDetailTabFrame);
/* file: cwc-Extjs-DetailTab.js */
cwc.ux.DetailTab = function(config) {
    if (config.attributes) {
        config.titleLabel = config.tabTip = config.attributes.label || config.attributes.title;
        config.defaultSrc = config.attributes.url;
        config.lazyLoad = config.attributes.lazyLoad;
        config.focusToHeader = config.attributes.focusToHeader;
        if (config.defaultSrc !== undefined && config.defaultSrc !== null) {
            config.defaultSrc = cwc.toCSRFSafe(config.defaultSrc);
        }
    }
    this.isSpecialJSP = cwc.isSpecialTabPage(config);
    var cfg = {
        xtype: "simpleDetailTabFrame",
        region: "center",
        itemId: "mif",
        tbar: new cwc.ux.Toolbar()
    };
    var placeholders = [{
        xtype: "container",
        region: "north",
        itemId: "north-placeholder"
    }, {
        xtype: "container",
        region: "west",
        layout: "fit",
        itemId: "west-placeholder"
    }, {
        xtype: "container",
        region: "east",
        layout: "fit",
        itemId: "east-placeholder"
    }, {
        xtype: "container",
        region: "south",
        itemId: "south-placeholder"
    }];
    if (config.defaultSrc != null) {
        cfg.defaultSrc = config.defaultSrc;
    } else {
        if (config.attributes.html) {
            cfg.content = [config.attributes.html, true];
            delete config.attributes.html;
        }
    }
    if (config.lazyLoad) {
        config.title = config.titleLabel;
        config.lazyLoad = cfg;
        placeholders.push({
            xtype: "container",
            region: "center",
            itemId: "center-placeholder"
        });
        config.items = placeholders;
    } else {
        placeholders.push(cfg);
        config.items = placeholders;
    }
    cwc.ux.DetailTab.superclass.constructor.call(this, config);
};
Ext.extend(cwc.ux.DetailTab, Ext.Panel, {
    title: cwc.LOADING,
    closable: true,
    layout: "border",
    domReady: false,
    messagebar: null,
    isSpecialJSP: false,
    hideMode: Ext.isIE ? "display" : "nosize",
    setSessionStateId: function(stateId) {
        if (stateId) {
            this.stateId = "thread-" + stateId;
            this.sessionStore = cwc.store.session;
        }
    },
    initComponent: function() {
        cwc.ux.DetailTab.superclass.initComponent.call(this);
        this.addEvents("tabready");
    },
    updateDocTitle: function(title) {
        document.title = title + " | " + cwc.smTitle;
    },
    setTitle: function(title) {
        cwc.ux.DetailTab.superclass.setTitle.call(this, title);
        this.updateDocTitle(title);
        if (this.tabEl) {
            Ext.get(this.tabEl).child("span.x-tab-strip-text", true).qtip = title;
        }
    },
    listeners: {
        activate: function(panel) {
            this.updateDocTitle(panel.getTitle());
            panel.ownerCt.showCloseBtn({
                panel: panel
            });
            if (panel.initialConfig.lazyLoad) {
                panel.onLazyLoad();
            } else {
                if (!this.isSpecialJSP) {
                    panel.getMIF().activateOnReady();
                }
                var thread = this.getDataValue("threadId");
                if (!Ext.isEmpty(thread)) {
                    cwc.updateActiveThread(thread);
                }
            }
            panel.updateHeading();
            panel.doLayout();
            var tabHeaderLink = Ext.get(panel.tabEl).child("a.x-tab-right");
            cwc.setProperty(tabHeaderLink, {
                "tabindex": "0",
                "aria-selected": true
            });
            if (!cwc.messageBoxShown && panel.initialConfig.focusToHeader !== false) {
                tabHeaderLink.focus();
            }
            panel.initialConfig.focusToHeader = true;
            var lastView = this.getDataValue("view");
            var index = this.getDataValue("index");
            if ((lastView != null) && (lastView.xtype == "gridview")) {
                lastView.select(index);
                lastView.focus(index);
            }
            cwc.getFrameworkWindow().showLastMessage();
            var refreshTaskPlan = function() {
                var taskPlan;
                if (this.isSpecialJSP) {
                    taskPlan = Ext.DomQuery.selectNode('iframe[src^="chM/chMTaskEditor.jsp?embeded=false"]', cwc.getFrameworkWindow().document);
                } else {
                    var currentWindow = this.hasListDetail() ? this.getDetailFrameWindow() : this.getFrameWindow();
                    taskPlan = Ext.DomQuery.selectNode('iframe[type="taskplanner"]', currentWindow.document);
                }
                if (taskPlan && taskPlan.contentWindow && taskPlan.contentWindow.refreshTaskPlanGraph) {
                    taskPlan.contentWindow.refreshTaskPlanGraph();
                }
            };
            if (this.haveTaskPlanner) {
                refreshTaskPlan.call(this);
            }
        },
        deactivate: function(panel) {
            if (panel.attributes && panel.attributes.hideCloseBtn) {
                panel.ownerCt.hideCloseBtn({
                    panel: panel
                });
            }
            panel.resetHeading();
            var tabHeaderLink = Ext.get(panel.tabEl).child("a.x-tab-right");
            cwc.setProperty(tabHeaderLink, {
                "tabindex": "-1",
                "aria-selected": false
            });
        },
        beforehide: function(panel) {
            if (cwc.isIE10 || cwc.isIE11) {
                var scollPosition = {};
                var el = panel.hasListDetail() ? panel.getDetailFrameDocument().documentElement : panel.getFrameDocument().documentElement;
                scollPosition.detailX = el.scrollLeft;
                scollPosition.detailY = el.scrollTop;
                panel.storeDataValueToSession("Scoll", scollPosition);
            }
        },
        show: function(panel) {
            if (cwc.isIE10 || cwc.isIE11) {
                var scollPosition = panel.getDataValueFromSession("Scoll");
                if (scollPosition) {
                    if (panel.hasListDetail()) {
                        var el = panel.getDetailFrameDocument().documentElement;
                        el.scrollLeft = scollPosition.detailX;
                        el.scrollTop = scollPosition.detailY;
                    } else {
                        var el = panel.getFrameDocument().documentElement;
                        el.scrollLeft = scollPosition.detailX;
                        el.scrollTop = scollPosition.detailY;
                    }
                    panel.removeDataValue("Scoll");
                }
            }
        },
        tabready: function(activePanel) {
            activePanel.ownerCt.processTab(activePanel);
            this.doLayout();
            var title = this.getFrameWindow().tpz_formTitle || this.titleLabel || this.getFrameDocument().title;
            if (title) {
                this.setTitle(title);
                this.updateHeading();
                this.getFrame().dom.title = cwc.decodeHtml(title);
                this.getFrame().dom.lang = cwc.userLanguage;
            }
        },
        destroy: function(panel) {
            if (this.stateId && !this.duplicate) {
                this.sessionStore.removeItem(this.stateId);
            }
            if (this.dataStore) {
                for (var p in this.dataStore) {
                    this.dataStore[p] = null;
                }
                this.dataStore = null;
            }
            Ext.destroy(this.messagebar);
            this.messagebar = null;
            this.dvdSelectCache = null;
            try {
                this.layout.destroy();
                this.layout.container = null;
            } catch (e) {}
        },
        afterrender: function(panel) {
            this.applyFocusStyle();
            var elem = this.getEl();
            this.messagebar = elem.insertHtml("beforeEnd", "<div id='" + this.id + "_messageBar' style='z-index:9100;top:32px;left:15%;right:15%;position:absolute;visibility:hidden;overflow:hidden;'></div>", true);
            var tabHeaderLink = Ext.get(panel.tabEl).child("a.x-tab-right");
            cwc.setProperty(panel.el, {
                "role": "tabpanel",
                "aria-labelledby": panel.tabEl.id
            });
            cwc.setProperty(tabHeaderLink, {
                "aria-controls": panel.id
            });
        },
        resize: function() {
            if (this.messagebar != null && this.messagebar.originalMsg != null) {
                this.adjustMessageHeight();
            }
        }
    },
    onLazyLoad: function(panel) {
        cwc.maskWindow();
        var comp = this.remove("center-placeholder");
        if (comp) {
            comp.destroy();
        }
        var layout = this.getLayout();
        layout.destroy();
        this.add(this.initialConfig.lazyLoad);
        this.setLayout(new Ext.layout.BorderLayout());
        delete this.initialConfig.lazyLoad;
        this.doLayout();
    },
    storeData: function(data) {
        if (typeof data == "object") {
            if (!this.dataStore) {
                this.dataStore = {};
            }
            Ext.apply(this.dataStore, data);
        }
    },
    storeDataValueToSession: function(key, value) {
        if (this.stateId) {
            var stateData = this.sessionStore.getItem(this.stateId) || {};
            stateData[key] = value;
            this.sessionStore.setItem(this.stateId, stateData);
            return;
        }
        if (!this.dataStore) {
            this.dataStore = {};
        }
        this.dataStore[key] = value;
    },
    getDataValueFromSession: function(key) {
        if (this.stateId) {
            var stateData = this.sessionStore.getItem(this.stateId) || {};
            return stateData[key];
        }
        if (!this.dataStore) {
            this.dataStore = {};
        }
        return this.dataStore[key];
    },
    getDataValue: function(key) {
        if (!this.dataStore) {
            this.dataStore = {};
        }
        return this.dataStore[key];
    },
    removeDataValue: function(key) {
        if (this.stateId) {
            var stateData = this.sessionStore.getItem(this.stateId) || {};
            delete stateData[key];
            this.sessionStore.setItem(this.stateId, stateData);
        }
        if (this.dataStore) {
            delete this.dataStore[key];
        }
    },
    saveOldLocation: function(location) {
        this.documentLocation = location.pathname + location.search;
    },
    getOldLocation: function() {
        return this.documentLocation;
    },
    getOldTitle: function() {
        return this.oldTitle;
    },
    getTitle: function() {
        var sTitle;
        if (!this.tabEl) {
            sTitle = this.title;
        } else {
            sTitle = ((Ext.isIE) ? this.tabEl.innerText : this.tabEl.textContent);
        }
        return cwc.util.encodeHtml(sTitle);
    },
    saveOldTitle: function() {
        this.oldTitle = this.getTitle();
    },
    updateHeading: function() {
        var activeTab = cwc.getActiveTab();
        if (activeTab.id == this.id) {
            var title = this.getTitle();
            var header = Ext.get("currentActiveTabHeader");
            if (header) {
                header.update(title);
            }
        }
    },
    resetHeading: function() {
        var header = Ext.get("currentActiveTabHeader");
        if (header) {
            header.update("");
        }
    },
    isDomReady: function() {
        if (this.isSpecialJSP) {
            return true;
        }
        var mif = this.getMIF();
        return mif ? mif.isDomReady() : false;
    },
    setSrc: function(url) {
        var mif = this.getMIF();
        if (mif) {
            mif.setSrc(cwc.toCSRFSafe(url));
        } else {
            if (cwc.jsDebug === true) {
                window.console && console.error("Set src fail, the managed iframe is null");
            }
        }
    },
    setMessage: function(messages, showCommonMsg, showTabCountMsg) {
        var html = "";
        var item = null;
        var callFun = "cwc.messageManager.showMessageHistory();";
        var tabCountDisplay = showTabCountMsg ? "block" : "none";
        var commonMsgDisplay = "block";
        if (!showCommonMsg) {
            commonMsgDisplay = "none";
        } else {
            for (var i = 0; i < messages.items.length; i++) {
                if (this.needShowMessage(messages.items[i].severity)) {
                    item = messages.items[i];
                    break;
                }
            }
            if (!item) {
                commonMsgDisplay = "none";
            } else {
                if (item.severity == "4") {
                    callFun = "hpalert.Utils.openAlertWindow();";
                }
            }
        }
        var tmpl = new Ext.Template('<div class="{class}" style="display:{display};text-align:left;"><div style="cursor:pointer;float:left;width:100%;" onclick="cwc.messageManager.hideMessageBar();' + callFun + '">' + '<img src="{img}" alt="{alt}" title="{alt}" /><p id="commonImg" style="display:none;">{alt}</p><p id="commonMsg">{msg}</p></div>' + '<img style="position:absolute;right:0px; padding-right:10px; display:{commonDeleteDisplay}" onClick="javascript: cwc.messageManager.hideMessageBar()" src="{deleteimg}" /></div>' + '<div class="{tabCountClass}" style="display:{tabCountDisplay};text-align:left;margin-top:{marginTop};"><div style="cursor:pointer;float:left;width:100%;padding-top:2px;height:40px;" onclick="javascript:cwc.messageManager.hideMessageBar();{callFunc}">' + '<img src="{tabCountImg}" alt="{tabCountAlt}" title="{tabCountAlt}" /><p id="tabcountImg" style="display:none;">{tabCountAlt}</p><p id="tabcountMsg">{tabCountMsg}</p></div>' + '<img style="position:absolute;right:0px; padding-right:10px; display:{tabCountDeleteDisplay}" onClick="javascript: cwc.messageManager.hideMessageBar()" src="{deleteimg}" /></div>');
        tmpl.compile();
        if (commonMsgDisplay == "none" && tabCountDisplay == "none") {
            return;
        }
        var imageVersionPath = top.cwc.imagePath;
        var cssSet = {
            1: "messageTrayElement infoMsg",
            2: "messageTrayElement warningMsg",
            3: "messageTrayElement errorMsg",
            4: "messageTrayElement alertMsg"
        };
        var msgIcon = {
            1: imageVersionPath + "/msg_info.png",
            2: imageVersionPath + "/msg_warning.png",
            3: imageVersionPath + "/msg_error.png",
            4: imageVersionPath + "/nothing.png"
        };
        var msgDeleteIcon = {
            1: imageVersionPath + "/msg_delete_info.png",
            2: imageVersionPath + "/msg_delete_warning.png",
            3: imageVersionPath + "/msg_delete_error.png",
            4: imageVersionPath + "/nodePalette_delete_16.png"
        };
        var severity;
        var fragment;
        if (commonMsgDisplay == "block" && tabCountDisplay == "block") {
            fragment = tmpl.applyTemplate({
                commonDeleteDisplay: "block",
                display: commonMsgDisplay,
                "class": cssSet[item.severity],
                img: msgIcon[item.severity],
                msg: Ext.util.Format.htmlEncode(item.msg),
                alt: Ext.util.Format.htmlEncode(item.alt),
                deleteimg: msgDeleteIcon[item.severity],
                marginTop: "1px",
                tabCountClass: cssSet[2],
                tabCountDeleteDisplay: "none",
                tabCountDisplay: tabCountDisplay,
                tabCountImg: msgIcon[2],
                tabCountAlt: "",
                tabCountMsg: cwc.OPEN_TABS_SOFT_LIMIT_MSG
            });
            item.reviewed = true;
            this.messagebar.originalMsg = item.msg;
            severity = Math.max(item.severity, 2);
        } else {
            if (commonMsgDisplay == "block") {
                fragment = tmpl.applyTemplate({
                    commonDeleteDisplay: "block",
                    display: commonMsgDisplay,
                    "class": cssSet[item.severity],
                    img: msgIcon[item.severity],
                    msg: Ext.util.Format.htmlEncode(item.msg),
                    alt: Ext.util.Format.htmlEncode(item.alt),
                    deleteimg: msgDeleteIcon[item.severity],
                    tabCountDeleteDisplay: "none",
                    tabCountDisplay: tabCountDisplay
                });
                item.reviewed = true;
                this.messagebar.originalMsg = item.msg;
                severity = item.severity;
            } else {
                fragment = tmpl.applyTemplate({
                    commonDeleteDisplay: "none",
                    display: commonMsgDisplay,
                    deleteimg: msgDeleteIcon[2],
                    tabCountClass: cssSet[2],
                    tabCountDeleteDisplay: "block",
                    tabCountDisplay: tabCountDisplay,
                    tabCountImg: msgIcon[2],
                    tabCountAlt: "",
                    tabCountMsg: cwc.OPEN_TABS_SOFT_LIMIT_MSG
                });
                severity = 2;
            }
        }
        html = fragment;
        this.messagebar.update(html);
        var that = this;

        function slideUpFn() {
            if (!that.needAutoHideMessage(severity)) {
                return;
            }
            var duration = that.timeToHideMessage(severity);
            that.messageSlideUpId = setTimeout(function() {
                setTimeout(function() {
                    if (that.messagebar) {
                        that.messagebar.setVisible(false);
                    }
                }, 1000);
            }, duration * 1000);
        }
        slideUpFn();
        this.messagebar.first().on("mouseenter", function() {
            if (that.messageSlideUpId) {
                clearTimeout(that.messageSlideUpId);
                that.messageSlideUpId = null;
            }
        });
        this.messagebar.first().on("mouseleave", slideUpFn);
        this.adjustMessageHeight();
        this.enableJAWS();
    },
    enableJAWS: function() {
        if (this.messagebar) {
            cwc.setProperty(this.messagebar, {
                "role": "alertdialog"
            });
            var that = this;
            setTimeout(function() {
                if (that.messagebar) {
                    that.messagebar.dom.style.top = that.hasListDetail() ? (that.getListFrame().toolbarHeight - 6) + "px" : that.getMIF().toolbarHeight + "px";
                    that.messagebar.setVisible(true);
                }
            }, 1000);
        }
    },
    disableJAWS: function() {
        if (this.messagebar) {
            this.messagebar.dom.removeAttribute("role");
        }
    },
    adjustMessageHeight: function() {
        this.messagebar = this.getEl().child("#" + this.id + "_messageBar");
        var p = this.messagebar.dom.querySelector("p#commonMsg");
        this.doAdjustMessageHeight(p, this.messagebar.originalMsg);
        p = this.messagebar.dom.querySelector("p#tabcountMsg");
        this.doAdjustMessageHeight(p, cwc.OPEN_TABS_SOFT_LIMIT_MSG);
    },
    doAdjustMessageHeight: function(p, originalMsg) {
        if (p.parentNode.parentNode.style.display == "block") {
            var text = cwc.encodeHtmlExceptWhiteList(originalMsg);
            p.innerHTML = text;
            var maxHeight = 65;
            if (p.offsetHeight <= maxHeight) {
                p.parentNode.style.height = p.offsetHeight < 25 ? "28px" : p.offsetHeight + 8 + "px";
            } else {
                p.parentNode.style.height = maxHeight + "px";
                while (p.offsetHeight > maxHeight) {
                    text = text.substring(0, text.length - 20) + "...";
                    p.innerHTML = text;
                }
            }
        }
    },
    clearMessage: function() {
        if (this.messagebar) {
            this.messagebar.setVisible(false);
            this.disableJAWS();
            if (this.messageSlideUpId) {
                clearTimeout(this.messageSlideUpId);
                this.messageSlideUpId = null;
            }
        }
    },
    needShowMessage: function(severity) {
        try {
            return cwc.messageBarParam.split(";")[severity - 1].split(":")[0] == "true";
        } catch (e) {
            return true;
        }
    },
    needAutoHideMessage: function(severity) {
        try {
            return cwc.messageBarParam.split(";")[severity - 1].split(":")[1] == "true";
        } catch (e) {
            return true;
        }
    },
    timeToHideMessage: function(severity) {
        var time;
        try {
            time = parseInt(cwc.messageBarParam.split(";")[severity - 1].split(":")[2]);
            if (isNaN(time)) {
                return 6;
            }
        } catch (e) {
            return 6;
        }
        return time;
    },
    isFrameDocumentsReady: function() {
        if (this.isSpecialJSP) {
            return true;
        }
        var mif = this.getMIF();
        if (mif) {
            return mif.isFrameDocumentsReady();
        }
        return false;
    },
    getMIF: function() {
        var mif = null;
        if (this.items) {
            mif = this.getComponent("mif");
        }
        if (cwc.jsDebug === true && !mif) {
            console.warn("The managed iframe has not initialized.");
        }
        return mif;
    },
    getRegion: function(dir) {
        var name = dir + "-placeholder";
        return this.getComponent(name);
    },
    getDetailMIF: function() {
        if (this.hasListDetail()) {
            return this.getDetailFrame();
        } else {
            return this.getMIF();
        }
    },
    findDetailFrame: function() {
        return this.hasListDetail() ? this.getDetailFrame() : this.getMIF();
    },
    hasListDetail: function() {
        if (this.isSpecialJSP) {
            return false;
        }
        var mif = this.getMIF();
        return mif ? mif.hasListDetail() : undefined;
    },
    getFrame: function() {
        var mif = this.getMIF();
        return mif ? mif.getFrame() : null;
    },
    getFrameWindow: function() {
        var mif = this.getMIF();
        return mif ? mif.getFrameWindow() : null;
    },
    getFrameDocument: function() {
        var mif = this.getMIF();
        return mif ? mif.getFrameDocument() : null;
    },
    getFrameName: function() {
        var mif = this.getMIF();
        return mif ? mif.getFrameName() : null;
    },
    containWindow: function(parentWnd, win) {
        if (parentWnd && win) {
            if (parentWnd == win) {
                return true;
            } else {
                var frameNum = parentWnd.frames.length;
                for (var i = 0; i < frameNum; i++) {
                    var frameWin = null;
                    try {
                        frameWin = parentWnd.frames[i].window;
                    } catch (e) {
                        continue;
                    }
                    if (frameWin && this.containWindow(frameWin, win)) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    hasWindow: function(win) {
        var hasWin = false;
        if (win && !this.initialConfig.lazyLoad) {
            var frameWindow = this.getFrameWindow();
            hasWin = this.containWindow(frameWindow, win);
        }
        return hasWin;
    },
    getListFrame: function() {
        var mif = this.getMIF();
        return mif ? mif.getListFrame() : null;
    },
    getListContainerPanel: function() {
        var mif = this.getMIF();
        return mif ? mif.getListContainerPanel() : null;
    },
    getListFrameWindow: function() {
        var mif = this.getMIF();
        return mif ? mif.getListFrameWindow() : null;
    },
    getListFrameDocument: function() {
        var mif = this.getMIF();
        return mif ? mif.getListFrameDocument() : null;
    },
    getListFrameId: function() {
        var mif = this.getMIF();
        return mif ? mif.getListFrameId() : null;
    },
    getListFrameName: function() {
        var mif = this.getMIF();
        return mif ? mif.getListFrameName() : null;
    },
    getDetailFrame: function() {
        var mif = this.getMIF();
        return mif ? mif.getDetailFrame() : null;
    },
    getDetailFrameWindow: function() {
        var mif = this.getMIF();
        return mif ? mif.getDetailFrameWindow() : null;
    },
    getDetailFrameDocument: function() {
        var mif = this.getMIF();
        return mif ? mif.getDetailFrameDocument() : null;
    },
    getDetailFrameId: function() {
        var mif = this.getMIF();
        return mif ? mif.getDetailFrameId() : null;
    },
    getDetailFrameName: function() {
        var mif = this.getMIF();
        return mif ? mif.getDetailFrameName() : null;
    },
    getListDetailWindows: function() {
        var list = this.getListFrameWindow();
        var detail = this.getDetailFrameWindow();
        return (list && detail) ? {
            "list": list,
            "detail": detail
        } : null;
    },
    getListDetailDocument: function() {
        var list = this.getListFrameDocument();
        var detail = this.getDetailFrameDocument();
        return (list && detail) ? {
            "list": list,
            "detail": detail
        } : null;
    },
    isActive: function() {
        return cwc.getActiveTab() === this;
    },
    applyFocusStyle: function() {
        var tabEl = Ext.get(this.ownerCt.getTabEl(this));
        var aEl = tabEl.down(".x-tab-right");
        aEl.on("focus", function() {
            tabEl.addClass("xFocus");
        });
        aEl.on("blur", function() {
            tabEl.removeClass("xFocus");
        });
    }
});
Ext.reg("cwcDetailTab", cwc.ux.DetailTab);
/* file: cwc-Extjs-TabPanel.js */
cwc.ux.TabPanel = function(config) {
    Ext.apply(config, {
        plain: true,
        cls: "cwc-centerPanel",
        margins: "0 0 0 0",
        activeTab: 0,
        minTabWidth: cwc.isAccessibleMode ? 80 : 76,
        maxTabWidth: 500,
        resizeTabs: true,
        enableTabScroll: true,
        allowTabChange: true,
        lastTabSwitchTime: 0,
        minTabSwitchTime: 350,
        allowTabChangeDelayTime: 1000,
        enableAlertOnFastTabSwitch: true,
        alertOnFastTabSwitchInterval: 180,
        maxFastTabSwitchTimes: 30,
        invalidTabSwitchCounter: 0,
        lastinvalidTabSwitchCounterClearTime: (new Date()).getTime()
    });
    cwc.ux.TabPanel.superclass.constructor.call(this, config);
};
Ext.extend(cwc.ux.TabPanel, Ext.TabPanel, {
    listeners: {
        beforeremove: function(tabPanel, tab) {
            if (tab.isFrameDocumentsReady()) {
                var wndw = tab.hasListDetail() ? tab.getDetailFrameWindow() : tab.getFrameWindow();
                if (wndw.beforeTabRemove) {
                    var result = wndw.beforeTabRemove(tabPanel, tab);
                    return (typeof result == "boolean") ? result : true;
                }
            }
            return true;
        },
        remove: function(tabPanel, tab) {
            if (!(tabPanel instanceof cwc.ux.TabPanel)) {
                return;
            }
            tabPanel.items.items.forEach(function(detailTab, index, array) {
                var tabHeaderLink = Ext.get(detailTab.tabEl).child("a.x-tab-right");
                cwc.setProperty(tabHeaderLink, {
                    "aria-posinset": index + 1,
                    "aria-setsize": array.length
                });
            });
        },
        beforetabchange: function(tabPanel, newTab, currentTab) {
            if (!tabPanel.isValidTabSwitch()) {
                return false;
            }
            if (currentTab) {
                var fameDocsReady = currentTab.isFrameDocumentsReady();
                if (fameDocsReady && currentTab && currentTab.getFrameWindow && tabPanel.allowTabChange == true) {
                    var wndw = currentTab.getFrameWindow();
                    if (wndw && wndw.onTabDeactivate) {
                        wndw.onTabDeactivate();
                    }
                }
                if (!fameDocsReady) {
                    tabPanel.allowTabChange = true;
                }
            } else {
                tabPanel.allowTabChange = true;
            }
            if (tabPanel.allowTabChange) {
                cwc.hideHoverPanel();
            }
            return tabPanel.allowTabChange;
        },
        tabchange: function(tabPanel, activePanel) {
            tabPanel.processTab(activePanel);
        }
    },
    initTab: function(item, index) {
        item.iconCls = cwc.getDirectionClass();
        cwc.ux.TabPanel.superclass.initTab.call(this, item, index);
        item.on({
            scope: this,
            beforeclose: this.onBeforeClose
        });
        item.tabEl.setAttribute("role", "presentation");
        var tabPanel = this;
        var getTab = function(targetTabIndex) {
            return tabPanel.items.item(targetTabIndex);
        };
        var getTabHeader = function(tab) {
            return Ext.get(tab.tabEl).child("a.x-tab-right");
        };
        var focusTabHeader = function(targetTabIndex, currentTabIndex) {
            var targetTabHeader = getTabHeader(getTab(targetTabIndex));
            if (currentTabIndex != targetTabIndex) {
                targetTabHeader.focus();
            }
        };
        var tabHeaderLink = getTabHeader(item);
        cwc.setProperty(tabHeaderLink, {
            "role": "tab",
            "tabindex": "-1"
        });
        tabPanel.items.items.forEach(function(detailTab, index, array) {
            var tabHeader = getTabHeader(detailTab);
            cwc.setProperty(tabHeader, {
                "aria-posinset": index + 1,
                "aria-setsize": array.length
            });
        });
        tabHeaderLink.on("blur", function(e, t) {
            cwc.util.hideFocusTip();
        });
        tabHeaderLink.on("focus", function(e, t) {
            cwc.util.showFocusTip(t);
        });
        tabHeaderLink.on("keydown", function(e, t) {
            if (Ext.getBody().isMasked()) {
                return;
            }
            var currentTabIndex = cwc.getTabPanelIndex(Ext.getCmp(t.getAttribute("aria-controls")));
            switch (e.getKey()) {
                case e.RIGHT:
                    e.preventDefault();
                    focusTabHeader(currentTabIndex < cwc.getTabPanelCount() - 1 ? currentTabIndex + 1 : currentTabIndex);
                    break;
                case e.LEFT:
                    e.preventDefault();
                    focusTabHeader(currentTabIndex > 0 ? currentTabIndex - 1 : currentTabIndex);
                    break;
                case e.HOME:
                    e.preventDefault();
                    focusTabHeader(0);
                    break;
                case e.END:
                    e.preventDefault();
                    focusTabHeader(cwc.getTabPanelCount() - 1);
                    break;
                case e.ENTER:
                case e.SPACE:
                    e.preventDefault();
                    tabPanel.setActiveTab(item);
                    break;
            }
        });
    },
    setMinTabSwitchTime: function(millis) {
        this.minTabSwitchTime = millis;
    },
    setAllowTabChangeDelayTime: function(delay) {
        this.allowTabChangeDelayTime = delay;
    },
    enableFastTabSwitch: function() {
        this.lastTabSwitchTime = 0;
        this.allowTabChange = true;
    },
    isValidTabSwitch: function(verifyOnly) {
        if (!verifyOnly) {
            verifyOnly = false;
        }
        var now = (new Date()).getTime();
        if ((this.lastTabSwitchTime == 0 || (now - this.lastTabSwitchTime) > this.minTabSwitchTime) && this.allowTabChange == true) {
            if (!verifyOnly) {
                this.lastTabSwitchTime = now;
            }
            return true;
        }
        if (!verifyOnly) {
            this.invalidTabSwitchCounter++;
            if (this.invalidTabSwitchCounter > this.maxFastTabSwitchTimes) {
                if (this.enableAlertOnFastTabSwitch == true && (now - this.lastinvalidTabSwitchCounterClearTime < this.alertOnFastTabSwitchInterval * 1000)) {
                    Ext.Msg.show({
                        title: top.document.title,
                        msg: cwc.TAB_SWITCH_TOO_FAST_MSG,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                this.lastinvalidTabSwitchCounterClearTime = now;
                this.invalidTabSwitchCounter = 0;
            }
        }
        return false;
    },
    onBeforeClose: function(tab) {
        if (tab.forceRemove) {
            return true;
        }
        if (tab.isFrameDocumentsReady()) {
            var wndw = tab.hasListDetail() ? tab.getDetailFrameWindow() : tab.getFrameWindow();
            if (wndw.beforeTabClose) {
                var result = wndw.beforeTabClose(tab);
                return (typeof result == "boolean") ? result : true;
            } else {
                if (top.forceCloseTab) {
                    top.forceCloseTab(tab);
                }
            }
            return true;
        } else {
            if (tab.initialConfig.lazyLoad) {
                if (cwc.getValueFromTab(tab, "displayType") == "messagebox") {
                    this.setActiveTab(tab);
                    return false;
                }
                top.closeTab(tab);
                return false;
            } else {
                cwc.refresh(tab);
            }
        }
        return false;
    },
    processTab: function(activePanel) {
        if (cwc.showAddFavBtn && activePanel.isDomReady()) {
            var navPanel = Ext.getCmp(cwc.navPanelId);
            var active = (navPanel.layout.activeItem.id == cwc.navId) ? 1 : 0;
        }
        cwc.syncViewRecordListWithTab(activePanel);
    },
    movePanelToDefaultPosition: function(panel) {
        panel.toggleClosable();
        this.moveTabDom(panel.tabEl, 0);
        this.move(panel, 0);
    },
    moveTabDom: function(tabEl, toIdx) {
        var strip = this.strip.dom;
        strip.insertBefore(tabEl, strip.children[toIdx]);
    },
    move: function(detailTab, toIdx) {
        var items = this.items;
        items.remove(detailTab);
        if (detailTab === false) {
            return false;
        }
        items.insert(toIdx, detailTab);
        this.doLayout();
        return detailTab;
    },
    addTab: function(node, attributes, index) {
        if (attributes.lazyLoad) {
            this.allowTabChange = false;
        }
        var cfg = {
            xtype: "cwcDetailTab",
            node: node,
            closable: (typeof attributes.closable != "undefined") ? attributes.closable : true,
            attributes: attributes,
            id: attributes.staticTabId
        };
        var newTab = (typeof index != "undefined") ? this.insert(index, cfg) : this.add(cfg);
        newTab.show();
        (function(panel) {
            panel.allowTabChange = true;
        }).defer(this.allowTabChangeDelayTime, null, [this]);
        return newTab;
    },
    insertTab: function(index, node, attributes) {
        var tab = this.addTab(node, attributes, index);
        return tab;
    },
    getValuesFromAllTabs: function(key) {
        var result = [];
        var tabIds = this.items.keys;
        for (var i = 0, maxi = tabIds.length; i < maxi; i++) {
            result.push(this.getItem(tabIds[i]).getDataValue(key));
        }
        return result;
    },
    getTabsByValue: function(key, value) {
        var result = [];
        var tabIds = this.items.keys;
        for (var i = 0, maxi = tabIds.length; i < maxi; i++) {
            if (this.getItem(tabIds[i]).getDataValue(key) == value) {
                result.push(this.getItem(tabIds[i]));
            }
        }
        return result;
    },
    hideCloseBtn: function(cfg) {
        if (cfg.panel) {
            if (!cfg.panel.closable || !cwc.allowHideTabCloseBtn) {
                return;
            }
        }
        var index = (cfg.panel) ? cwc.getTabPanelIndex(cfg.panel) : cfg.index;
        var domItem = this.strip.dom.childNodes[index];
        var el = Ext.get(domItem).first();
        if (el) {
            el.addClass("x-hide-display");
        }
    },
    showCloseBtn: function(cfg) {
        if (cfg.panel) {
            if (!cfg.panel.closable || !cwc.allowHideTabCloseBtn) {
                return;
            }
        }(function(cfg) {
            var index = (cfg.panel) ? cwc.getTabPanelIndex(cfg.panel) : cfg.index;
            var panel = (cfg.panel) ? cfg.panel : this.items.get(index);
            if (panel && panel.isVisible()) {
                var domItem = this.strip.dom.childNodes[index];
                var el = Ext.get(domItem);
                if (el) {
                    el = el.first();
                    if (el) {
                        el.removeClass("x-hide-display");
                    }
                }
            }
        }).defer(300, this, [cfg]);
    },
    findTabByWindow: function(win) {
        var activeTab = this.getActiveTab();
        if (!activeTab) {
            return null;
        }
        if (activeTab.hasWindow(win)) {
            return activeTab;
        }
        for (var i = this.items.length - 1; i >= 0; i--) {
            var tab = this.getItem(i);
            if (tab != activeTab && tab.hasWindow(win)) {
                return tab;
            }
        }
        return null;
    },
    getNextActiveTab: function(closingTab, targetNextActiveTab) {
        var fixedNextActiveTab = null;
        if (!closingTab || this.getItem(closingTab.getId()) === undefined) {
            closingTab = this.getActiveTab();
            if (!closingTab || this.getItem(closingTab.getId()) === undefined) {
                if (cwc.jsDebug == true) {
                    window.console && console.error("Application error - failed to get the right closing tab, the TabPanel may be not yet rendered");
                }
                if (this.items.length > 0) {
                    fixedNextActiveTab = this.getItem(0);
                }
            }
        }
        var historyTab = null;
        var historyTabs = [];
        var nextTabPage = null;
        var lastHistoryTab = null;
        while (historyTab = this.stack.next()) {
            if (this.getItem(historyTab.getId()) !== undefined) {
                if (!lastHistoryTab || (historyTab != lastHistoryTab)) {
                    historyTabs.push(historyTab);
                }
                if (historyTab != closingTab && !nextTabPage) {
                    nextTabPage = historyTab;
                }
                lastHistoryTab = historyTab;
            }
        }
        if (targetNextActiveTab && this.getItem(targetNextActiveTab.getId()) !== undefined) {
            nextTabPage = targetNextActiveTab;
            var len = historyTabs.length;
            if (len == 0 || (len > 0 && historyTabs[len - 1] != targetNextActiveTab)) {
                historyTabs.push(targetNextActiveTab);
            }
        }
        for (var i = historyTabs.length - 1; i >= 0; i--) {
            this.stack.add(historyTabs[i]);
        }
        if (fixedNextActiveTab && historyTabs[historyTabs.length - 1] != fixedNextActiveTab) {
            this.stack.add(fixedNextActiveTab);
            nextTabPage = fixedNextActiveTab;
        }
        if (!nextTabPage && this.items.length > 0) {
            nextTabPage = this.getItem(0);
            this.stack.add(nextTabPage);
        }
        this.stack.add(closingTab);
        return nextTabPage;
    },
    autoSizeTabs: function() {
        var count = this.items.length,
            ce = this.tabPosition != "bottom" ? "header" : "footer",
            ow = this[ce].dom.offsetWidth,
            aw = this[ce].dom.clientWidth;
        if (!this.resizeTabs || count < 1 || !aw) {
            return;
        }
        var each = Math.max(Math.min(Math.floor((aw - 4) / count) - this.tabMargin, this.maxTabWidth), this.minTabWidth);
        this.lastTabWidth = each;
        var lis = this.strip.query("li:not(.x-tab-edge)");
        for (var i = 0, len = lis.length; i < len; i++) {
            var li = lis[i],
                inner = Ext.fly(li).child(".x-tab-strip-inner", true),
                tw = li.offsetWidth,
                iw = inner.offsetWidth;
            inner.style.maxWidth = (each - (tw - iw)) + "px";
        }
    },
    autoScrollTabs: function() {
        cwc.ux.TabPanel.superclass.autoScrollTabs.call(this);
        if (cwc.isChrome) {
            var wrap = this.stripWrap,
                tw = this.pos.dom.clientWidth,
                pos = this.getScrollPos(),
                l = this.edge.getOffsetsTo(this.stripWrap)[0] + pos;
            if (l > tw) {
                var marginLeft = wrap.getMargins("l");
                var marginRight = wrap.getMargins("r");
                if (marginLeft > 0 && marginRight == 0) {
                    var tw = wrap.getWidth() - marginLeft;
                    wrap.setWidth(tw > 20 ? tw : 20);
                    this.scrollToTab(this.activeTab, false);
                }
            }
        }
    }
});
Ext.reg("cwcTabPanel", cwc.ux.TabPanel);
/* file: cwc-Extjs-NavTreeNodeUI.js */
cwc.ux.NavTreeNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    setAnchorMaxWidth: function(parentNodeWidth) {
        var treeWidth = parentNodeWidth;
        if (treeWidth <= 0) {
            return;
        }
        var depth = this.node.getDepth();
        var fontSize = cwc.isAccessibleMode ? parseFloat(cwc.getComputedStyle(this.anchor, "font-size")) : 16;
        var aBorderPadding = 0.25 * fontSize + 2;
        var liBorder = fontSize * (cwc.isAccessibleMode ? 0.125 : 0.0625);
        var liPadding = fontSize * 0.75;
        var occupiedSpace = 0;
        var depthOffset = cwc.isAccessibleMode ? Math.ceil(fontSize / 4) : 2;
        var currentNodeWidth = treeWidth - depthOffset;
        if (this.checkbox) {
            var anchorParent = Ext.get(this.anchor.parentElement);
            var cbX = cwc.isRTL ? window.innerWidth - anchorParent.getRight() : anchorParent.getLeft();
            var cbBorderMargin = fontSize * (cwc.isAccessibleMode ? 1.5725 : 1.1875);
            var cbAdjustment = (depth - 1) * liBorder;
            occupiedSpace = cbX + cbBorderMargin + aBorderPadding - cbAdjustment;
        } else {
            var indent = (depth - 1) * 18;
            liPadding = fontSize * (cwc.isAccessibleMode ? 0.75 : 1.25);
            var elbow = fontSize * (cwc.isAccessibleMode ? 1.125 : 1);
            var elbowMargin = 5;
            occupiedSpace = liBorder + indent + liPadding + aBorderPadding + elbow + elbowMargin;
        }
        var maxWidth = treeWidth - occupiedSpace - depthOffset;
        maxWidth = maxWidth > 0 ? maxWidth : 1;
        var anchorSpan = Ext.get(this.anchor).first();
        anchorSpan.setStyle("maxWidth", maxWidth + "px");
        cwc.util.setTreeNodeMaxWidth(this.node, currentNodeWidth);
    },
    renderElements: function(n, a, targetNode, bulkRender) {
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : "";
        var cb = typeof a.checked == "boolean";
        var href = a.href ? a.href : (cwc.isGecko || cwc.isChrome) ? "" : "#";
        var escapedId = cwc.util.encodeHtml(n.id);
        var treeItemLink = ['<a hidefocus="on" role="treeitem" aria-selected="false" class="x-tree-node-anchor" href="', href, '" tabIndex="-1" ', a.hrefTarget ? ' target="' + a.hrefTarget + '"' : "", (cb ? ' aria-checked="' + a.checked + '"' : ""), ">"].join("");
        var normalItem = [treeItemLink, '<span unselectable="on">' + cwc.util.highlightQuery(n.text, a.searchValue) + "</span>", "</a>"].join("");
        var checkboxItem = ['<span class="CheckBox" id="', escapedId, 'OuterSpan"><label for="', escapedId, 'CheckBox" id="', escapedId, 'Label" class="xCheckboxIcon"><input id="', escapedId, 'CheckBox" tabindex="-1" aria-hidden="true" class="x-tree-node-cb hiddenCheckbox" type="checkbox" ', (a.checked ? 'checked="checked" />' : "/>"), "</label>", normalItem, "</span>"].join("");
        var buf = ['<li class="x-tree-node" role="none presentation"><div id="', escapedId, '" ext:tree-node-id="', escapedId, '" class="x-tree-node-el x-tree-node-leaf x-unselectable ', a.cls, '" unselectable="on">', '<span class="x-tree-node-indent">', this.indentMarkup, "</span>", '<img alt="" src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow" />', '<img alt="" src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " " + a.iconCls : ""), '" unselectable="on" />', cb ? checkboxItem : normalItem, "</div>", '<ul class="x-tree-node-ct" role="none presentation"></ul>', "</li>"].join("");
        var nel;
        if (bulkRender !== true && n.nextSibling && (nel = n.nextSibling.ui.getEl())) {
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", nel, buf);
        } else {
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf);
        }
        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var cbspan = cs[3];
        if (cb) {
            this.checkboxLabel = cbspan.childNodes[0];
            this.checkbox = this.checkboxLabel.firstChild;
            this.anchor = cbspan.childNodes[1];
            this.checkbox.defaultChecked = this.checkbox.checked;
            this.textNode = this.anchor.firstChild;
        } else {
            this.anchor = cbspan;
            this.textNode = cbspan.firstChild;
        }
        var node = this.node;
        var indentEl = Ext.get(this.indentNode);
        var iconEl = Ext.get(this.ecNode);
        var anchorEl = Ext.get(this.anchor);
        var timeoutHandle = null;
        var selectNode = function(node) {
            if (node.ownerTree instanceof cwc.ux.NavTree) {
                node.ownerTree.clearSelection();
            }
            node.ownerTree.selModel.select(node);
            Ext.fly(node.ui.anchor).addClass("focused");
        };
        anchorEl.on("keyup", function(e, t) {
            var targetNode = null;
            var isSideMode = node.ownerTree.getNavPanel && node.ownerTree.getNavPanel().isInSidebarMode;
            if (node.shouldFocusUp && !isSideMode) {
                node.shouldFocusUp = false;
                if (node.ownerTree.header) {
                    cwc.util.changeFocus(node.ownerTree.header);
                }
            } else {
                if (node.shouldFocusDown && node.ownerTree.nextSibling()) {
                    node.shouldFocusDown = false;
                    cwc.util.changeFocus(node.ownerTree.nextSibling().header);
                } else {
                    switch (e.getKey()) {
                        case e.SPACE:
                            if (node.ownerTree.id == cwc.favMgrTreeId) {
                                node.ui.checkbox.click();
                            } else {
                                node.toggle();
                            }
                            break;
                        case e.HOME:
                            if (!isSideMode) {
                                if (node.ownerTree.id == cwc.favMgrTreeId) {
                                    targetNode = node.ownerTree.firstNode;
                                } else {
                                    targetNode = node.ownerTree.ownerCt.firstNode.header;
                                }
                                cwc.util.changeFocus(targetNode);
                            }
                            break;
                        case e.END:
                            if (!isSideMode) {
                                if (node.ownerTree.id == cwc.favMgrTreeId) {
                                    targetNode = node.ownerTree.lastNode;
                                } else {
                                    targetNode = node.ownerTree.ownerCt.lastNode;
                                    if (targetNode.collapsed) {
                                        targetNode = targetNode.header;
                                    } else {
                                        targetNode = targetNode.lastNode;
                                    }
                                }
                                cwc.util.changeFocus(targetNode);
                            }
                            break;
                        default:
                            if (hpsm.StringUtils.isPrintableCharacter(e.browserEvent.key)) {
                                cwc.util.setFocusByFirstChar(node, e.browserEvent.key.toLowerCase());
                            }
                            break;
                    }
                }
            }
        });
        anchorEl.on("keydown", function(e, t) {
            var keyValue = e.getKey();
            var shouldFocusUp = (keyValue === e.LEFT && !cwc.isRTL || keyValue === e.RIGHT && cwc.isRTL) && !node.expanded && (node.ownerTree.id == node.parentNode.id || node.ownerTree.cwcAttr && node.ownerTree.cwcAttr.isMiscPanel) || keyValue === e.UP && node.ownerTree.root.firstChild.id == node.id;
            if ([e.SPACE, e.HOME, e.END].indexOf(keyValue) > -1) {
                e.stopEvent();
            } else {
                if (shouldFocusUp) {
                    node.shouldFocusUp = true;
                } else {
                    if (keyValue === e.DOWN && !node.expanded && node.isLastNode) {
                        node.shouldFocusDown = true;
                    }
                }
            }
        });
        anchorEl.on("focus", function(e, t) {
            selectNode(node);
            var topCt = node.ownerTree;
            if (topCt instanceof cwc.ux.NavTree) {
                topCt = node.ownerTree.ownerCt;
                anchorEl.set({
                    "aria-selected": "true"
                });
            }
            topCt.hasFocus = true;
            if (anchorEl == topCt.lastFocusedNode) {
                clearTimeout(timeoutHandle);
            } else {
                topCt.lastFocusedNode.set({
                    "tabindex": "-1"
                });
                anchorEl.set({
                    "tabindex": "0"
                });
                topCt.lastFocusedNode = anchorEl;
            }
            node.ownerTree.adjustPositionX();
            if (cb) {
                Ext.fly(cbspan).addClass("xFocus");
            }
            cwc.util.showFocusTip(t);
        });
        anchorEl.on("blur", function(e, t) {
            var topCt = node.ownerTree;
            topCt.selModel.unselect(node);
            this.removeClass("focused");
            if (topCt instanceof cwc.ux.NavTree) {
                topCt = node.ownerTree.ownerCt;
            }
            topCt.hasFocus = false;
            timeoutHandle = setTimeout(cwc.util.setUnFocusable.bind(topCt, anchorEl, cb), 300);
            if (cb) {
                Ext.fly(cbspan).removeClass("xFocus");
            }
            cwc.util.hideFocusTip();
        });
        anchorEl.on("click", function(e, t) {
            if (node.attributes.url) {
                anchorEl.clicked = true;
            }
        });
        if (cb) {
            var cbInput = Ext.get(this.checkbox);
            cbInput.on("change", function(e, t) {
                anchorEl.set({
                    "aria-selected": node.ui.checkbox.checked,
                    "aria-checked": node.ui.checkbox.checked
                });
            });
            cbInput.on("click", function(e, t) {
                anchorEl.focus();
            });
        }
        iconEl.on("click", function(e, t) {
            if (Ext.isIE && anchorEl.hasClass("focused")) {
                node.ownerTree.adjustPositionX();
                return;
            }
            anchorEl.focus();
        });
        indentEl.on("click", function(e, t) {
            node.toggle();
            anchorEl.focus();
        });

        function makeCopyMoveMenuReload() {
            var copyToBtn = Ext.getCmp(cwc.btnFavCopyTo);
            if (copyToBtn && copyToBtn.menu) {
                copyToBtn.menu.loaded = false;
            }
            var moveToBtn = Ext.getCmp(cwc.btnFavMoveTo);
            if (moveToBtn && moveToBtn.menu) {
                moveToBtn.menu.loaded = false;
            }
        }
        node.on("checkchange", function(e, t) {
            makeCopyMoveMenuReload();
        });
        node.on("expand", function(e, t) {
            var topCt = node.ownerTree;
            if (topCt instanceof cwc.ux.NavTree) {
                topCt = node.ownerTree.ownerCt;
            }
            cwc.util.setTreeNodeMaxWidth(node, node.ui.wrap.clientWidth);
            topCt.lastFocusedNode.focus();
            node.ownerTree.adjustPositionX();
            if (node.hasChildNodes()) {
                anchorEl.set({
                    "aria-expanded": true
                });
                makeCopyMoveMenuReload();
                if (node.isLastNode) {
                    node.ownerTree.lastNode = node.lastChild;
                }
            } else {
                anchorEl.dom.removeAttribute("aria-expanded");
            }
        });
        node.on("collapse", function(e, t) {
            if (node.hasChildNodes()) {
                anchorEl.set({
                    "aria-expanded": false
                });
            } else {
                anchorEl.dom.removeAttribute("aria-expanded");
            }
        });
        if (node.hasChildNodes()) {
            var expanded = node.attributes.searchFlag ? (node.childNodes.length > 0 ? true : false) : node.expanded;
            anchorEl.set({
                "aria-expanded": expanded
            });
            Ext.fly(this.ctNode).set({
                "role": "group"
            });
            anchorEl.set({
                "aria-owns": Ext.id(this.ctNode)
            });
        }
    },
    updateExpandIcon: function() {
        if (this.rendered) {
            var n = this.node,
                c1, c2, cls = n.isLast() ? "x-tree-elbow-end" : "x-tree-elbow",
                hasChild = n.hasChildNodes();
            if (hasChild || n.attributes.expandable) {
                if (n.attributes.searchFlag && !n.attributes.hasClicked) {
                    if (hasChild && n.childNodes.length > 0) {
                        cls += "-minus";
                        c1 = "x-tree-node-collapsed";
                        c2 = "x-tree-node-expanded";
                    } else {
                        cls += "-plus";
                        c1 = "x-tree-node-expanded";
                        c2 = "x-tree-node-collapsed";
                    }
                    n.attributes.hasClicked = true;
                } else {
                    if (n.expanded) {
                        cls += "-minus";
                        c1 = "x-tree-node-collapsed";
                        c2 = "x-tree-node-expanded";
                    } else {
                        cls += "-plus";
                        c1 = "x-tree-node-expanded";
                        c2 = "x-tree-node-collapsed";
                    }
                }
                if (this.wasLeaf) {
                    this.removeClass("x-tree-node-leaf");
                    this.wasLeaf = false;
                }
                if (this.c1 != c1 || this.c2 != c2) {
                    Ext.fly(this.elNode).replaceClass(c1, c2);
                    this.c1 = c1;
                    this.c2 = c2;
                }
            } else {
                if (!this.wasLeaf) {
                    Ext.fly(this.elNode).replaceClass("x-tree-node-expanded", "x-tree-node-collapsed");
                    delete this.c1;
                    delete this.c2;
                    this.wasLeaf = true;
                }
            }
            var ecc = "x-tree-ec-icon " + cls;
            if (this.ecc != ecc) {
                this.ecNode.className = ecc;
                this.ecc = ecc;
            }
        }
    }
});
if (!cwc.showNavSelected) {
    Ext.override(cwc.ux.NavTreeNodeUI, {
        onSelectedChange: function(state) {
            if (state) {
                this.focus();
            }
        }
    });
    /* file: cwc-Extjs-NavTreeNode.js */
}
cwc.ux.TreeNode = Ext.extend(Ext.tree.TreeNode, {
    renderAllChildren: function(suppressEvent) {
        if (suppressEvent !== false) {
            this.fireEvent("beforechildrenrendered", this);
        }
        var cs = this.childNodes;
        for (var i = 0, len = cs.length; i < len; i++) {
            if (cs[i] && cs[i].render) {
                cs[i].render(true);
            }
            if (cs[i].childNodes && cs[i].childNodes.length > 0) {
                cs[i].renderAllChildren(suppressEvent);
            }
        }
        this.childrenRendered = true;
    },
    endUpdate: function() {
        if (this.expanded && this.rendered) {
            if (this.attributes.searchFlag) {
                this.renderAllChildren();
            } else {
                this.renderChildren();
            }
        }
    }
});
cwc.ux.AsyncTreeNode = Ext.extend(Ext.tree.AsyncTreeNode, {
    renderAllChildren: function(suppressEvent) {
        if (suppressEvent !== false) {
            this.fireEvent("beforechildrenrendered", this);
        }
        var cs = this.childNodes;
        if (cs.length > 0) {
            this.expanded = true;
            this.loaded = true;
        }
        for (var i = 0, len = cs.length; i < len; i++) {
            if (cs[i] && cs[i].render) {
                cs[i].render(true);
            }
            if (cs[i].childNodes && cs[i].childNodes.length > 0) {
                cs[i].renderAllChildren(suppressEvent);
            }
        }
        this.childrenRendered = true;
    },
    endUpdate: function() {
        if (this.expanded && this.rendered) {
            if (this.attributes.searchFlag) {
                this.renderAllChildren();
            } else {
                this.renderChildren();
            }
        }
    }
});
/* file: cwc-Extjs-XmlTreeLoader.js */
Ext.ux.XmlTreeLoader = Ext.extend(Ext.tree.TreeLoader, {
    XML_NODE_ELEMENT: 1,
    XML_NODE_TEXT: 3,
    processResponse: function(response, node, callback, scope) {
        var xmlData = response.responseXML;
        var root = xmlData.documentElement || xmlData;
        try {
            node.beginUpdate();
            node.appendChild(this.parseXml(root, node.isLastNode));
            node.endUpdate();
            this.runCallback(callback, scope || node, [node]);
        } catch (e) {
            this.handleFailure(response);
        }
    },
    parseXml: function(node, isLastNode, searchValue) {
        var nodes = [];
        Ext.each(node.childNodes, function(n) {
            if (n.nodeType == this.XML_NODE_ELEMENT) {
                var treeNode = this.createNode(n, searchValue);
                if (isLastNode && !n.nextSibling) {
                    treeNode.isLastNode = true;
                }
                if (n.childNodes.length > 0) {
                    var child = this.parseXml(n, isLastNode, searchValue);
                    if (typeof child == "string") {
                        treeNode.attributes.innerText = child;
                    } else {
                        treeNode.appendChild(child);
                    }
                }
                if (cwc.isShowPrivateFavoritesOnly()) {
                    if (treeNode.attributes["public"] === "false") {
                        nodes.push(treeNode);
                    }
                } else {
                    nodes.push(treeNode);
                }
            } else {
                if (n.nodeType == this.XML_NODE_TEXT) {
                    var text = n.nodeValue.trim();
                    if (text.length > 0) {
                        return nodes = text;
                    }
                }
            }
        }, this);
        return nodes;
    },
    createNode: function(node, searchValue) {
        var attr = {
            uiProvider: cwc.ux.NavTreeNodeUI,
            tagName: node.tagName
        };
        if (searchValue) {
            attr.searchValue = searchValue;
            attr.searchFlag = true;
            attr.hasClicked = false;
        }
        Ext.each(node.attributes, function(a) {
            attr[a.nodeName] = a.nodeValue;
        });
        attr["idParam"] = attr.id;
        if (attr.id == "root") {
            attr.id = attr.id + "_" + attr.context;
        }
        this.processAttributes(attr);
        if (this.baseAttrs) {
            Ext.applyIf(attr, this.baseAttrs);
        }
        if (this.applyLoader !== false && !attr.loader) {
            attr.loader = this;
        }
        if (Ext.isString(attr.uiProvider)) {
            attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        if (attr.nodeType) {
            return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
        } else {
            return attr.leaf ? new cwc.ux.TreeNode(attr) : new cwc.ux.AsyncTreeNode(attr);
        }
    },
    processAttributes: Ext.emptyFn
});
/* file: cwc-Extjs-NavTreeLoader.js */
cwc.ux.NavTreeLoader = Ext.extend(Ext.ux.XmlTreeLoader, {
    xmlReader: new Ext.data.XmlReader({
        record: "branch",
        id: "@context"
    }, cwc.ux.NavBranch),
    processResponse: function(response, node, callback) {
        var xmlData = response.responseXML;
        var root = xmlData.documentElement || xmlData;
        if (root.nodeType == this.XML_NODE_ELEMENT) {
            if (root.tagName === "view") {
                this.processView(response, node, callback);
            } else {
                if (root.getAttribute("id") === "root") {
                    cwc.ux.NavTreeLoader.superclass.processResponse.call(this, response, node, callback);
                } else {
                    cwc.ux.NavTreeLoader.superclass.processResponse.call(this, response, node, callback);
                }
            }
        }
        cwc.updateNavTreeFinished = true;
    },
    processView: function(response, node, callback) {
        var xmlData = this.xmlReader.read(response);
        var maxi = xmlData.records.length;
        for (var i = 0; i < maxi; i++) {
            var record = xmlData.records[i];
            if (record.id == "local") {
                var url = this.contextPath + this.query + "&id=" + record.data.id;
                Ext.Ajax.request({
                    url: url,
                    method: "GET",
                    scope: this,
                    success: function(response, options) {
                        cwc.ux.NavTreeLoader.superclass.processResponse.call(this, response, node, callback);
                    },
                    failure: function() {
                        if (window.console) {
                            console.log("/" + record.id + this.query + "&id=" + record.data.id);
                        }
                    }
                });
            } else {
                if (window.console) {
                    console.log("/" + record.id + this.query + "&id=" + record.data.id);
                }
            }
        }
    },
    processAttributes: function(attr) {
        if (cwc.showNavIcon === true) {
            attr.icon = attr.image;
        } else {
            if (!attr.iconCls) {
                attr.iconCls = "cwc-tree-noIcon-node";
            }
        }
        attr.text = attr.name;
        attr.qtip = attr.name;
        attr.expanded = attr.expandOnLoad || false;
        if (attr["class"] == "menugroup" || attr["class"] == "menufolder" || attr["class"] == "classMore" || attr["class"] == "favoritesfolder") {
            attr.singleClickExpand = true;
        }
        if (attr.context && attr.context != "local") {
            var href = "/" + attr.context + "/cwc/nav.menu";
            href = cwc.toCSRFSafe(href);
            attr.href = href;
        }
        if (attr.url && attr.genUrl && attr.genUrl === "false") {
            if (attr.url.substr(0, 1) !== "/") {
                attr.url = "/" + attr.url;
            }
            var url = this.contextPath + attr.url;
            url = cwc.toCSRFSafe(url);
            attr.url = url;
        } else {
            if (attr.tagName === "leaf" || attr.genUrl === "true") {
                var url = this.contextPath + "/cwc/nav.menu?name=navStart&id=" + encodeURIComponent(attr.id);
                url = cwc.toCSRFSafe(url);
                attr.url = url;
            } else {
                delete attr.url;
            }
        }
        attr.leaf = (attr.tagName == "leaf" || attr["class"] == "classRecord");
    },
    createNode: function(node, searchValue) {
        var result = cwc.ux.NavTreeLoader.superclass.createNode.call(this, node, searchValue);
        result.treePanel = this.treePanel;
        if (cwc.showNavSelected && result.attributes.noselect == "true") {
            result.on("beforeclick", function(m, e) {
                return false;
            });
        }
        if (result.attributes.url) {
            result.clickHandler = function(node, evtObj) {
                if (node.attributes.target == "managedPopup") {
                    cwc.maskWindow();
                    cwc.popUpWindow(node.attributes.url);
                    cwc.unmaskWindow();
                } else {
                    if (node.attributes.target == "popup") {
                        cwc.maskWindow();
                        window.open(cwc.toCSRFSafe(node.attributes.url));
                        cwc.unmaskWindow();
                    } else {
                        if (top.navigationHandler) {
                            top.navigationHandler(node.attributes, node);
                        } else {
                            if (cwc.noTabsLayout) {
                                cwc.updateActiveTab(node.attributes.url);
                            } else {
                                cwc.openNewTabPanel(node.attributes, node, true);
                            }
                        }
                    }
                }
            };
            result.on("click", function(node, evtObj) {
                cwc.tabSectionController.update();
                this.clickHandler(node, evtObj);
            });
        }
        return result;
    }
});
/* file: cwc-Extjs-NavTree.js */
cwc.ux.NavTree = Ext.extend(Ext.tree.TreePanel, {
    animate: true,
    autoScroll: false,
    useArrows: true,
    enableDD: false,
    rootVisible: false,
    containerScroll: true,
    lines: false,
    border: false,
    pathSeparator: "|",
    autoHeight: true,
    collapsible: true,
    collapsed: true,
    iconFontCls: false,
    searchFlag: false,
    toggleCollapse: function(animate) {
        if (this.getNavPanel().isInSidebarMode) {
            return;
        }
        this.collapsible = !this.collapsible;
        return cwc.ux.NavTree.superclass.toggleCollapse.call(this, animate);
    },
    collapse: function(animate) {
        if (!this.collapsible) {
            return;
        }
        return cwc.ux.NavTree.superclass.collapse.call(this, animate);
    },
    clearSelection: function(node, e) {
        this.ownerCt.items.each(function() {
            if (this instanceof Ext.tree.TreePanel) {
                var selmod = this.getSelectionModel();
                selmod.unselect(selmod.getSelectedNode());
            }
        });
    },
    getSelectedNode: function() {
        var currentSelNode = null;
        var items = this.ownerCt.items;
        var length = items.length;
        for (var i = 0; i < length; i++) {
            var item = items.item(i);
            if (item instanceof Ext.tree.TreePanel) {
                var selNode = item.getSelectionModel().getSelectedNode();
                if (selNode) {
                    currentSelNode = selNode;
                    break;
                }
            }
        }
        return currentSelNode;
    },
    adjustPositionX: function(byLeft) {
        var rootDiv = this.getTreeEl();
        var rootUL = Ext.get(rootDiv.dom.firstChild);
        if (rootDiv.getX() != rootUL.getX()) {
            if (byLeft) {
                rootUL.setLeft(0);
            } else {
                rootUL.setX(rootDiv.getX());
            }
        }
    },
    getNavPanel: function() {
        return this.ownerCt.ownerCt;
    },
    renderRoot: function() {
        this.root.render();
        if (!this.rootVisible) {
            if (!this.searchFlag) {
                this.root.renderChildren();
            } else {
                if (this.root && this.root.renderAllChildren) {
                    this.root.renderAllChildren();
                }
            }
        }
    },
    afterExpand: function(anim) {
        cwc.generateResetTreeTime(this.searchFlag);
        cwc.ux.NavTree.superclass.afterExpand.call(this, anim);
    },
    listeners: {
        expand: function(panel) {
            if (panel.cwcAttr.url) {
                panel.clearSelection();
                if (cwc.noTabsLayout) {
                    cwc.updateActiveTab(panel.cwcAttr.url);
                } else {
                    cwc.openNewTabPanel(panel.cwcAttr);
                }
            }
            panel.header.set({
                "aria-expanded": true
            });
            panel.adjustPositionX();
        },
        collapse: function(panel) {
            panel.clearSelection();
            panel.header.set({
                "aria-expanded": false
            });
            panel.adjustPositionX();
        },
        render: function(panel) {
            if (panel.cwcAttr) {
                Ext.getCmp("cwcNavPanel").collapse(true);
            }
            if (panel.cwcAttr.expandOnLoad) {
                panel.toggleCollapse();
            }
            panel.body.first().set({
                "role": "group"
            });
            if (panel.header) {
                if (!cwc.isAccessibleMode && cwc.enableSidebarMenu !== "false") {
                    panel.addClass("sidebar-enable");
                    if (this.iconFontCls) {
                        panel.header.addClass(this.iconFontCls);
                    }
                }
                panel.header.set({
                    "tabindex": "-1",
                    "role": "treeitem",
                    "aria-selected": "false",
                    "aria-owns": panel.body.first().id
                });
                panel.header.on("focus", function(e, target) {
                    if (panel.getNavPanel().navLoadCompleted) {
                        panel.ownerCt.hasFocus = true;
                        panel.ownerCt.lastFocusedNode.set({
                            "tabindex": "-1"
                        });
                        cwc.util.changeFocus(panel.header);
                        panel.header.set({
                            "tabindex": "0",
                            "aria-selected": "true"
                        });
                        panel.ownerCt.lastFocusedNode = panel.header;
                    }
                });
                panel.header.on("blur", function(e, target) {
                    panel.ownerCt.hasFocus = false;
                    setTimeout(cwc.util.setUnFocusable.bind(panel.ownerCt, panel.header), 300);
                });
                panel.header.on("keyup", function(e, target) {
                    var needToggle = e.keyCode == e.SPACE || e.keyCode == e.ENTER || (e.keyCode == e.LEFT && !cwc.isRTL || e.keyCode == e.RIGHT && cwc.isRTL) && !panel.collapsed || (e.keyCode == e.RIGHT && !cwc.isRTL || e.keyCode == e.LEFT && cwc.isRTL) && panel.collapsed;
                    var needGotoFirstChild = (e.keyCode == e.RIGHT && !cwc.isRTL || e.keyCode == e.LEFT && cwc.isRTL) && !panel.collapsed;
                    var nextPanel = panel.nextSibling();
                    var previousPanel = panel.previousSibling();
                    if (needToggle) {
                        panel.toggleCollapse();
                    } else {
                        if (needGotoFirstChild) {
                            cwc.util.changeFocus(panel.root.firstChild);
                        } else {
                            switch (e.keyCode) {
                                case e.DOWN:
                                    if (nextPanel && panel.collapsed) {
                                        cwc.util.changeFocus(nextPanel.header);
                                    } else {
                                        cwc.util.changeFocus(panel.root.firstChild);
                                    }
                                    break;
                                case e.UP:
                                    if (previousPanel) {
                                        if (previousPanel.collapsed) {
                                            cwc.util.changeFocus(previousPanel.header);
                                        } else {
                                            cwc.util.changeFocus(previousPanel.lastNode);
                                        }
                                    }
                                    break;
                                case e.HOME:
                                    cwc.util.changeFocus(panel.ownerCt.firstNode.header);
                                    break;
                                case e.END:
                                    if (panel.ownerCt.lastNode.collapsed) {
                                        cwc.util.changeFocus(panel.ownerCt.lastNode.header);
                                    } else {
                                        cwc.util.changeFocus(panel.ownerCt.lastNode.lastNode);
                                    }
                                    break;
                                default:
                                    if (hpsm.StringUtils.isPrintableCharacter(e.browserEvent.key)) {
                                        cwc.util.setFocusByFirstChar(panel, e.browserEvent.key.toLowerCase());
                                    }
                                    break;
                            }
                        }
                    }
                });
                panel.header.on("keydown", function(e, t) {
                    if ([e.SPACE, e.ENTER, e.HOME, e.END, e.UP, e.DOWN].indexOf(e.keyCode) > -1) {
                        e.stopEvent();
                    }
                });
            }
        },
        afterlayout: function(panel) {
            if (panel.getWidth() === 0) {
                return;
            }
            cwc.util.setTreeNodeMaxWidth(panel.root, panel.root.ui.wrap.clientWidth);
        }
    }
});
Ext.reg("cwcNavTree", cwc.ux.NavTree);
/* file: cwc-Extjs-XmlAccordionLoader.js */
cwc.ux.XmlAccordionLoader = function(config) {
    this.accordion = null;
    Ext.apply(this, config);
    this.addEvents("beforeload", "load", "loadexception");
    cwc.ux.XmlAccordionLoader.superclass.constructor.call(this);
};
Ext.extend(cwc.ux.XmlAccordionLoader, Ext.util.Observable, {
    XML_NODE_ELEMENT: 1,
    XML_NODE_TEXT: 3,
    xmlReader: new Ext.data.XmlReader({
        record: "branch",
        id: "@context"
    }, cwc.ux.NavBranch),
    load: function(callback) {
        this.requestData(callback);
    },
    requestData: function(callback) {
        if (this.fireEvent("beforeload", this, callback) !== false) {
            this.transId = Ext.Ajax.request({
                method: this.requestMethod,
                url: this.dataUrl || this.url,
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {
                    callback: callback
                },
                params: this.getParams(),
                timeout: 2 * 60 * 60 * 1000
            });
        } else {
            if (typeof callback == "function") {
                callback();
            }
        }
    },
    handleResponse: function(response) {
        this.transId = false;
        var a = response.argument;
        this.processResponse(response, a.callback);
        this.fireEvent("load", this, a.node, response);
    },
    handleFailure: function(response) {
        this.transId = false;
        var a = response.argument;
        this.fireEvent("loadexception", this, a.node, response);
        if (typeof a.callback == "function") {
            a.callback(this, a.node);
        }
    },
    getParams: function() {
        var buf = [],
            bp = this.baseParams;
        for (var key in bp) {
            if (typeof bp[key] != "function") {
                buf.push(encodeURIComponent(key), "=", encodeURIComponent(bp[key]), "&");
            }
        }
        return buf.join("");
    },
    processResponse: function(response, callback) {
        var xmlData = response.responseXML;
        var root = xmlData.documentElement || xmlData;
        if (root.nodeType == this.XML_NODE_ELEMENT) {
            if (root.tagName === "view") {
                this.processView(response, callback);
            } else {
                if (root.getAttribute("id") === "root") {
                    this.parseAccordionXml(response, cwc.frameworkContext);
                }
            }
        }
        if (typeof callback == "function") {
            callback(this);
        }
    },
    processView: function(response) {
        var xmlData = this.xmlReader.read(response);
        var maxi = xmlData.records.length;
        for (var i = 0; i < maxi; i++) {
            var record = xmlData.records[i];
            var url = "";
            if (record.data.context == "local") {
                url = cwc.frameworkContext + this.query + "&id=" + record.data.id;
            } else {
                var loc = top.document.location;
                url = loc.protocol + "//" + loc.host + "/" + record.data.context + this.query + "&id=" + record.data.id;
            }
            Ext.Ajax.request({
                url: url,
                method: "GET",
                scope: this,
                success: function(response, options) {
                    var appUrl;
                    var parts = options.url.split("/");
                    if ("http" == parts[0].toLowerCase().substr(0, 4)) {
                        appUrl = "/" + parts[3];
                    } else {
                        var iend = options.url.indexOf("/", 1);
                        appUrl = options.url.substring(0, iend);
                    }
                    this.parseAccordionXml(response, appUrl);
                },
                failure: function() {
                    if (window.console) {
                        console.warn("request failed : /" + record.id + this.query + "&id=" + record.data.id);
                    }
                }
            });
        }
        setAccordionAttribute();
    },
    setAccordionAttribute: function() {
        if (!this.accordion.ownerCt.navLoadCompleted) {
            this.accordion.ownerCt.navLoadCompleted = true;
            var sidebar = Ext.query("#" + cwc.navPanelId + "-sidebar")[0];
            if (sidebar) {
                this.accordion.ownerCt.createSidebar(sidebar, true);
            }
        }
        this.accordion.ownerCt.el.insertFirst({
            tag: "h2",
            cls: "audible-text",
            id: "cwcNavPanel-h2",
            html: cwc.NAVMENU_TITLE
        });
        this.accordion.ownerCt.el.set({
            "role": "navigation",
            "aria-labelledby": "cwcNavPanel-h2"
        });
        this.accordion.body.set({
            "role": "tree",
            "aria-label": cwc.NAVMENU_FRAME_TITLE
        });
        this.accordion.firstNode.header.set({
            "tabindex": "0"
        });
        this.accordion.lastFocusedNode = this.accordion.firstNode.header;
    },
    parseAccordionXml: function(response, appUrl) {
        var xmlData = response.responseXML;
        var root = xmlData.documentElement || xmlData;
        this.renderTree(root, appUrl, "");
    },
    renderTree: function(root, appUrl, searchValue) {
        var maxi = root.childNodes.length;
        var leafNodes = [];
        for (var i = 0; i < maxi; i++) {
            var node = root.childNodes[i];
            if (node.nodeType == this.XML_NODE_ELEMENT) {
                if (node.tagName === "branch") {
                    this.createAccordionPanel(node, appUrl, searchValue);
                } else {
                    if (node.tagName === "leaf") {
                        leafNodes.push(node);
                    }
                }
            }
        }
        var accMiscPanelExpand = true;
        if (leafNodes.length <= 0 && searchValue && cwc.decodeHtml(cwc.MISC_SECTION).toUpperCase().indexOf(searchValue.toUpperCase()) != -1) {
            cwc.util.createMiscNode(leafNodes);
            accMiscPanelExpand = false;
        }
        if (leafNodes.length > 0) {
            var accTree = this.createAccMisc(leafNodes, appUrl, searchValue, accMiscPanelExpand);
        }
        this.accordion.doLayout();
        this.accordion.firstNode = this.accordion.items.items[0];
        this.accordion.lastNode = this.accordion.items.items[this.accordion.items.length - 1];
        this.setAccordionAttribute();
    },
    createAccordionPanel: function(node, appUrl, searchValue) {
        var attributes = {
            tagName: node.tagName
        };
        var maxi = node.attributes.length;
        for (var i = 0; i < maxi; i++) {
            var attr = node.attributes[i];
            attributes[attr.nodeName] = attr.nodeValue;
        }
        if (attributes["class"] == "favoritesmainfolder") {
            cwc.favoriteRootId = attributes["id"];
            attributes["menuIcon"] = "icon-favorite-dashboard";
        }
        if (searchValue && node.childElementCount > 0) {
            attributes.expandOnLoad = true;
        }
        if (node.childElementCount <= 0 && searchValue) {
            cwc.util.createAccordionNode(node);
        }
        var rootNode = (node.childNodes.length > 0) ? node : null;
        var accTree = this.createAccTree(attributes, rootNode, appUrl, searchValue);
        this.accordion.add(accTree);
    },
    createAccMisc: function(leafNodes, appUrl, searchValue, accMiscPanelExpand) {
        var treeLoader = new cwc.ux.NavTreeLoader({
            accordion: this.accordion,
            contextPath: appUrl
        });
        var treePanel = Ext.getCmp("defaultTreePanelID");
        if (!treePanel) {
            treePanel = new cwc.ux.NavTree({
                id: "defaultTreePanelID",
                title: cwc.util.highlightQuery(cwc.MISC_SECTION, searchValue),
                iconFontCls: "icon-micellaneous",
                cwcAttr: {
                    expandOnLoad: accMiscPanelExpand,
                    isMiscPanel: true
                },
                loader: treeLoader
            });
            var root = new cwc.ux.TreeNode({
                text: "root",
                draggable: false,
                id: "MiscTreeRootID"
            });
            treePanel.setRootNode(root);
            this.accordion.add(treePanel);
        }
        var navRoot = treePanel.getRootNode();
        for (var index = 0; index < leafNodes.length; index++) {
            var treeNode = treeLoader.createNode(leafNodes[index], searchValue);
            navRoot.appendChild(treeNode);
            if (index == leafNodes.length - 1) {
                navRoot.ownerTree.lastNode = treeNode;
            }
        }
        return treePanel;
    },
    createAccTree: function(attr, node, appUrl, searchValue) {
        var treeLoader = new cwc.ux.NavTreeLoader({
            accordion: this.accordion,
            contextPath: appUrl,
            dataUrl: cwc.toCSRFSafe(appUrl + "/cwc/nav.menu?name=navGenerate"),
            requestMethod: "GET",
            listeners: {
                beforeload: function(treeLoader, node) {
                    this.baseParams.id = node.attributes.id;
                }
            }
        });
        var treePanel = new cwc.ux.NavTree({
            id: attr.id,
            title: cwc.util.highlightQuery(attr.label, searchValue),
            cwcAttr: attr,
            loader: treeLoader,
            searchFlag: attr.expandOnLoad,
            iconFontCls: attr.menuIcon + " icon-hp"
        });
        var navRoot = new cwc.ux.TreeNode({
            text: "root",
            draggable: false,
            id: attr.id
        });
        treePanel.setRootNode(navRoot);
        if (cwc.showNavSelected) {
            treePanel.on("beforeclick", treePanel.clearSelection);
        }
        if (node != null && node.childNodes.length > 0) {
            this.appendAccTreeChildren(navRoot, node, treeLoader, searchValue);
        } else {
            treeLoader.load(navRoot);
        }
        return treePanel;
    },
    appendAccTreeChildren: function(accNode, node, treeLoader, searchValue) {
        var childTreeNode = treeLoader.parseXml(node, node.isLastNode, searchValue);
        accNode.appendChild(childTreeNode);
        var lastNode = cwc.util.getLastNode(childTreeNode);
        lastNode.isLastNode = true;
        accNode.ownerTree.lastNode = lastNode;
    },
    processAttributes: Ext.emptyFn
});
/* file: cwc-Extjs-AccordionNav.js */
cwc.ux.AccordionNav = Ext.extend(Ext.Panel, {
    layout: "accordion",
    border: false,
    autoScroll: true,
    layoutConfig: {
        hideCollapseTool: cwc.hideNavPanelCollapseTool,
        animate: true,
        titleCollapse: true
    },
    initComponent: function() {
        cwc.ux.AccordionNav.superclass.initComponent.call(this);
        this.xml = new cwc.ux.XmlAccordionLoader({
            accordion: this,
            contextPath: this.frameworkContext,
            query: this.query,
            dataUrl: cwc.toCSRFSafe(this.dataUrl),
            requestMethod: "GET",
            listeners: {
                beforeload: function(treeLoader, node) {
                    if (node && node.attributes.idParam && node.attributes.idParam != "source") {
                        this.baseParams.id = node.attributes.idParam;
                    }
                }
            }
        });
    },
    onRender: function(container, position) {
        cwc.ux.AccordionNav.superclass.onRender.call(this, container, position);
        this.xml.load();
    },
    setActiveItem: function(item) {
        this.layout.setActiveItem(item);
    },
    listeners: {
        afterlayout: function(panel) {
            if (panel.getWidth() === 0) {
                return;
            }
            if (!isEssUser) {
                Ext.getCmp("navSearchInput").setSearchInputWidth(panel.getWidth() - 15);
            }
        }
    }
});
Ext.reg("cwc_navaccordion", cwc.ux.AccordionNav);
/* file: cwc-Extjs-SidebarButton.js */
cwc.ux.SidebarButton = Ext.extend(Ext.Button, {
    popupMenu: false,
    btnTimer: false,
    sidebar: false,
    initComponent: function() {
        cwc.ux.SidebarButton.superclass.initComponent.call(this);
    },
    initButtonEl: function(btn, btnEl) {
        cwc.ux.SidebarButton.superclass.initButtonEl.call(this, btn, btnEl);
        if (this.handleMouseEvents) {
            this.mon(btn, {
                scope: this,
                mousemove: this.onMouseMove,
                mouseenter: this.onMouseEnter
            });
        }
        btnEl.update("");
        btnEl.set({
            tabindex: -1
        });
        btn.set({
            "role": "menuitem",
            "aria-labelledby": "sidebarHelp"
        });
    },
    afterRender: function() {
        cwc.ux.SidebarButton.superclass.afterRender.call(this);
        this.sidebar = this.ownerCt.ownerCt.ownerCt;
        this.sidebar.firstNode = Ext.get(this.container.dom.firstChild);
        this.sidebar.lastNode = Ext.get(this.container.dom.lastChild);
        this.sidebar.lastFocusedNode = this.sidebar.firstNode;
        if (this.el.dom.isEqualNode(this.container.dom.firstChild)) {
            this.el.set({
                tabindex: 0
            });
        } else {
            this.el.set({
                tabindex: -1
            });
        }
        this.mon(this.el, {
            scope: this,
            keyup: this.onKeyup,
            keydown: this.onKeydown,
            focus: this.onFocus
        });
    },
    onMouseEnter: function(e) {
        if (this.sidebar.bottomContainer.isVisible()) {
            var btnTableTop = this.el.getTop();
            var btnTableHeight = this.el.getHeight();
            var downBtnTop = this.sidebar.bottomContainer.getPosition()[1];
            var middleContainerTop = this.sidebar.middleContainer.getPosition()[1];
            if ((downBtnTop > btnTableTop && downBtnTop < btnTableTop + 15) || (middleContainerTop > btnTableTop + btnTableHeight - 15 && middleContainerTop < btnTableTop + btnTableHeight)) {
                return;
            }
            this.showCoveredIcon();
        }
        this.switchPopupMenu(e);
        this.recordPathPoint(e);
    },
    onFocus: function(e) {
        var prevIcon = this.previousSibling();
        if (!prevIcon) {
            this.sidebar.navigateToTop();
        }
        this.el.focus();
        this.sidebar.lastFocusedNode.set({
            "tabindex": "-1"
        });
        this.el.set({
            "tabindex": "0"
        });
        this.sidebar.lastFocusedNode = this.el;
    },
    switchPopupMenu: function(e) {
        var me = this;
        if (me.sidebar.gotoPopupMenu(e)) {
            me.sidebar.setHoveringButton(me);
            me.btnTimer = setTimeout(function() {
                var btn = me.sidebar.getHoveringButton();
                clearTimeout(me.btnTimer);
                me.btnTimer = false;
                if (btn !== false && btn === me) {
                    me.sidebar.popupMenu.show(me);
                }
            }, 300);
            return;
        }
        me.sidebar.popupMenu.show(me);
    },
    onMouseMove: function(e) {
        this.recordPathPoint(e);
    },
    onKeydown: function(e) {
        switch (e.keyCode || e.which) {
            case 9:
                if (e.shiftKey) {
                    var prevIcon = this.previousSibling();
                    if (prevIcon) {
                        prevIcon.showCoveredIcon();
                    }
                } else {
                    var nextIcon = this.nextSibling();
                    if (nextIcon) {
                        nextIcon.showCoveredIcon();
                    }
                }
                break;
            case 38:
                var prevIcon = this.previousSibling();
                if (prevIcon) {
                    prevIcon.showCoveredIcon();
                    prevIcon.el.focus();
                }
                break;
            case 40:
                var nextIcon = this.nextSibling();
                if (nextIcon) {
                    nextIcon.showCoveredIcon();
                    nextIcon.el.focus();
                }
                break;
        }
    },
    onKeyup: function(e) {
        if (e.keyCode === 13 || e.keyCode === 32) {
            this.sidebar.popupMenu.show(this, true);
        }
    },
    showCoveredIcon: function() {
        if (this.sidebar.bottomContainer.isVisible()) {
            var btnTop = this.el.getTop();
            var btnHeight = this.el.getHeight();
            var downBtnTop = this.sidebar.bottomContainer.getPosition()[1];
            var containerTop = this.sidebar.middleContainer.getPosition()[1];
            if ((downBtnTop < btnTop + btnHeight)) {
                this.sidebar.navigateToNext();
            } else {
                if (btnTop < containerTop) {
                    this.sidebar.navigateToPrevious();
                }
            }
        }
    },
    setActive: function() {
        this.addClass("sidebar-active-btn");
    },
    setInActive: function() {
        this.removeClass("sidebar-active-btn");
    },
    recordPathPoint: function(e) {
        this.sidebar.mousePath.push({
            x: e.getPageX(),
            y: e.getPageY()
        });
        if (this.sidebar.mousePath.length > 3) {
            this.sidebar.mousePath.shift();
        }
    },
    destroy: function() {
        Ext.destroy(this.popupMenu);
        cwc.ux.SidebarButton.superclass.destroy.call(this, e);
    }
});
/* file: cwc-Extjs-SidebarPopupMenu.js */
(function() {
    cwc.ux.SidebarPopupMenu = Ext.extend(Ext.util.Observable, {
        ShowCls: "show",
        activePopupMenu: false,
        cntEl: false,
        activeIcon: false,
        constructor: function(config) {
            this.addEvents("beforehide", "beforeshow", "beforeleave", "enter", "hide", "show");
            Ext.apply(this, config);
            cwc.ux.SidebarPopupMenu.superclass.constructor.call(this, config);
            this.cntElLeft = this.cntEl.getStyle("left");
            this.cntElTop = this.cntEl.getStyle("top");
            this.indicator = Ext.getBody().createChild(Ext.apply({
                cls: "sidebar-popup-menu-indicator",
                id: "sidebarindicator"
            }, cwc.isRTL ? {
                dir: "rtl"
            } : null));
            this.startReverting = false;
            this.shimEl = Ext.select("#" + cwc.centerPanelId, true).elements[0];
        },
        init: function() {
            if (!this.inited) {
                this.cntEl.on("mousedown", this.onMouseDown, this);
                this.cntEl.on("click", this.onClick, this);
                this.cntEl.on("keydown", this.onKeydown, this);
                this.cntEl.on("mouseleave", this.onMouseLeave, this);
                this.cntEl.on("mouseenter", this.onMouseEnter, this);
                this.shimEl.on("mousedown", this.hide, this);
                this.inited = true;
            }
            this.startReverting = false;
        },
        revert: function() {
            if (this.inited) {
                this.hide();
                this.cntEl.setStyle("left", this.cntElLeft);
                this.cntEl.setStyle("top", this.cntElTop);
                this.cntEl.un("mousedown", this.onMouseDown, this);
                this.cntEl.un("click", this.onClick, this);
                this.cntEl.un("keydown", this.onKeydown, this);
                this.cntEl.un("mouseleave", this.onMouseLeave, this);
                this.cntEl.un("mouseenter", this.onMouseEnter, this);
                this.shimEl.un("mousedown", this.hide, this);
                this.inited = false;
                this.activePopupMenu = false;
            }
            this.startReverting = true;
        },
        onMouseLeave: function(e) {
            this.fireEvent("beforeleave", this, e, this.indicator);
            this.delayHide(e);
            this.isOnPopupMenu = false;
        },
        onMouseDown: function(e) {
            e.stopEvent();
        },
        onMouseEnter: function(e) {
            this.fireEvent("enter", this);
            this.isOnPopupMenu = true;
        },
        onClick: function(e) {
            var me = this;
            setTimeout(function() {
                if (cwc.maskId) {
                    me.hide();
                }
            }, 300);
        },
        onKeydown: function(e) {
            var me = this;
            switch (e.keyCode || e.which) {
                case 9:
                    e.preventDefault();
                    if (e.shiftKey) {
                        topCwc.keys.focusNavigator();
                    } else {
                        topCwc.keys.focusTabHeader();
                    }
                    me.hide(e);
                    break;
                case 27:
                    var preActiveIcon = me.activeIcon;
                    me.hide();
                    preActiveIcon.el.focus();
                    break;
                default:
                    break;
            }
        },
        delayHide: function(e, after) {
            var me = this;
            setTimeout(function() {
                if (!me.keepShowing(e)) {
                    me.hide();
                }
            }, after || 500);
        },
        tryHide: function(e) {
            if (e && !this.keepShowing(e)) {
                this.hide();
            }
        },
        forceHide: function(popupMenu) {
            this.setVisibility(popupMenu, false);
        },
        hide: function() {
            if (this.activePopupMenu) {
                cwc.hideShims();
                this.forceHide(this.activePopupMenu);
                this.activePopupMenu = false;
                this.removeActiveIcon();
            }
        },
        show: function(btn, byKB) {
            if (this.startReverting) {
                return;
            }
            cwc.showShims();
            var pMenu = btn.popupMenu;
            if (!this.activeIcon) {
                this.activeIcon = btn;
                this.activeIcon.setActive();
            } else {
                if (this.activeIcon && btn.id !== this.activeIcon.id) {
                    this.activeIcon.setInActive();
                    this.activeIcon = btn;
                    this.activeIcon.setActive();
                }
            }
            this.fireEvent("beforeshow", this, pMenu);
            this.activePopupMenu = pMenu;
            this.setVisibility(pMenu, true);
            pMenu.adjustPositionX();
            this.firstMenuItemEl = this.getFirstMenuItemEl();
            if (byKB) {
                this.firstMenuItemEl.focus();
            }
            this.fireEvent("show", this, pMenu);
        },
        removeActiveIcon: function() {
            if (this.activeIcon) {
                this.activeIcon.setInActive();
                this.activeIcon = false;
            }
        },
        setVisibility: function(tp, visible) {
            var me = this;
            me.cntEl.setStyle("display", visible ? "block" : "none");
            cwc.setWorkflowAppletVisible(!visible);
            if (visible) {
                tp.addClass(me.ShowCls);
                me.indicator.addClass(me.ShowCls);
                me.setHeight(tp.bwrap);
                me.setPostion();
                cwc.util.setTreeNodeMaxWidth(tp.root, tp.root.ui.wrap.clientWidth);
            } else {
                me.indicator.removeClass(me.ShowCls);
                tp.removeClass(me.ShowCls);
                me.revertHeight(tp.bwrap);
            }
        },
        setHeight: function(popupMenu) {
            var totalHeight = Ext.getBody().getViewSize().height;
            this.popupMenuHeight = totalHeight * 0.5;
            popupMenu.setStyle("height", this.popupMenuHeight + "px");
        },
        revertHeight: function(popupMenu) {
            popupMenu.setStyle("height", "auto");
        },
        setPostion: function() {
            var menuBottom = 26;
            var topMenuItemHeight = 60;
            var totalHeight = Ext.getBody().getViewSize().height;
            var menuHeight = this.popupMenuHeight + topMenuItemHeight;
            var y = this.activeIcon.getPosition()[1];
            var posY = totalHeight - y < menuHeight ? totalHeight - menuHeight - menuBottom : y;
            var pos = cwc.isRTL ? {
                left: "auto",
                right: this.showX + "px",
                top: posY + "px"
            } : {
                left: this.showX + "px",
                top: posY + "px"
            };
            this.cntEl.setStyle(pos);
            posY = y + this.activeIcon.getHeight() / 2 - 7;
            pos = cwc.isRTL ? {
                right: (this.showX - 12) + "px",
                top: posY + "px"
            } : {
                left: (this.showX - 12) + "px",
                top: posY + "px"
            };
            this.indicator.setStyle(pos);
        },
        getFirstMenuItemEl: function() {
            if (this.activePopupMenu) {
                return this.activePopupMenu.el.child(".x-tree-node .x-tree-node-anchor");
            }
        },
        getLastMenuItemEl: function() {
            if (this.activePopupMenu) {
                var targetArray = this.activePopupMenu.el.query(".x-tree-node:last-of-type");
                var target;
                for (var i = targetArray.length - 1; i >= 0; i--) {
                    if (targetArray[i].offsetWidth !== 0) {
                        target = targetArray[i];
                        break;
                    }
                }
                return target ? Ext.fly(target).child(".x-tree-node-anchor") : undefined;
            }
        },
        isOn: function(e, target) {
            if (!target) {
                return false;
            }
            var mousePos = e.getXY();
            var targetPos = target.getXY();
            var targetHeight = target.getHeight();
            var targetWidth = target.getWidth();
            if (mousePos[0] <= targetPos[0] + targetWidth && mousePos[0] >= targetPos[0] && mousePos[1] >= targetPos[1] && mousePos[1] < (targetPos[1] + targetHeight)) {
                return true;
            } else {
                return false;
            }
        },
        keepShowing: function(e) {
            return this.isOnPopupMenu || this.isOn(e, this.cntEl) || this.isOn(e, this.indicator) || this.isOn(e, this.activeIcon.el);
        }
    });
})();
/* file: cwc-Extjs-SidebarPanel.js */
cwc.ux.SidebarPanel = Ext.extend(Ext.Panel, {
    navTree: false,
    navTreeContainer: false,
    isDefaultMode: true,
    hoveringButton: false,
    topContainer: false,
    bottomContainer: false,
    iconsContainer: false,
    initComponent: function() {
        var me = this;
        cwc.ux.SidebarPanel.superclass.initComponent.call(me);
        me.initVariables();
        me.createMenuIcons();
    },
    onRender: function(ct, position) {
        cwc.ux.SidebarPanel.superclass.onRender.call(this, ct, position);
        if (cwc.isRTL) {
            this.el.set({
                dir: "rtl"
            });
        }
    },
    createMenuIcons: function() {
        var me = this;
        var iconStyle = " icon-38 icon-color";
        if (me.navTree) {
            var btn, item;
            this.topContainer = new Ext.Container({
                cls: "sidebar-top-container",
                items: [{
                    xtype: "button",
                    iconCls: "icon-16 icon-color icon-expand-right-no-circle",
                    cls: "sidebar-expand-btn",
                    hidden: true,
                    handler: function() {
                        me.navTreeContainer.expand(true);
                    },
                    listeners: {
                        afterrender: function(btn) {
                            btn.el.set({
                                tabindex: 0
                            });
                            btn.btnEl.set({
                                tabindex: -1
                            });
                            btn.btnEl.update("");
                            btn.mon(btn.el, "keydown", function(e) {
                                var kc = e.keyCode || e.which;
                                if (kc === 13 || kc === 32) {
                                    me.navTreeContainer.expand(true);
                                }
                            }, btn);
                        }
                    }
                }, {
                    xtype: "label",
                    cls: "sidebar-separator"
                }, {
                    id: "sidebar-up-btn",
                    xtype: "button",
                    tabIndex: -1,
                    iconCls: "icon-triangle-up-small icon-16 icon-color",
                    cls: "sidebar-navigate-btn",
                    hidden: true,
                    handler: function() {
                        if (!this.disabled) {
                            me.navigateToPrevious();
                        }
                    }
                }]
            });
            this.bottomContainer = new Ext.Container({
                cls: "sidebar-bottom-container",
                hidden: true,
                items: [{
                    id: "sidebar-down-btn",
                    xtype: "button",
                    tabIndex: -1,
                    iconCls: "icon-triangle-down-small icon-16 icon-color",
                    cls: "sidebar-navigate-btn",
                    handler: function() {
                        if (!this.disabled) {
                            me.navigateToNext();
                        }
                    }
                }]
            });
            this.middleContainer = new Ext.Container({
                cls: "sidebar-middle-container"
            });
            this.iconsContainer = new Ext.Container({
                cls: "sidebar-icons-container",
                listeners: {
                    move: function() {
                        me.checkNavigationButtons(me);
                    }
                }
            });
            this.middleContainer.add(this.iconsContainer);
            me.add(this.topContainer);
            me.add(this.middleContainer);
            me.add(this.bottomContainer);
            for (var i = 0; i < me.navTree.items.length; i++) {
                item = me.navTree.get(i);
                btn = new cwc.ux.SidebarButton({
                    popupMenu: item,
                    iconCls: item.iconFontCls + iconStyle,
                    id: "sidebar/" + item.title,
                    cls: "sidebar-icon"
                });
                if (me.isDefaultMode && item.collapsible) {
                    item.collapse(false);
                    item.toggleCollapse();
                    me.expandedMenus.push(item);
                }
                this.iconsContainer.add(btn);
            }
            if (me.isDefaultMode) {
                me.navTreeContainer.isInSidebarMode = true;
            }
        }
        Ext.EventManager.onWindowResize(function(w, h) {
            var toHeight = h - me.getEl().getTop();
            me.setHeight(toHeight);
        });
    },
    initVariables: function() {
        this.mousePath = [];
        this.expandedMenus = [];
    },
    listeners: {
        afterlayout: function() {
            if (this.isVisible()) {
                this.showNavigateButtons();
                this.setMiddleContainerHeight();
                if (this.bottomContainer.get("sidebar-down-btn").disabled) {
                    var iconPanel = this.iconsContainer;
                    var pos = iconPanel.getPosition(true);
                    var newTop = iconPanel.getHeight() - this.middleContainer.getHeight();
                    iconPanel.setPosition(pos[0], -newTop);
                }
            }
        }
    },
    afterRender: function() {
        var me = this;
        cwc.ux.SidebarPanel.superclass.afterRender.call(me);
        me.sidebarX = me.getPosition()[0] + me.getWidth();
        me.mon(me.iconsContainer.getEl(), {
            scope: me,
            mouseleave: me.onMouseLeaveSidebar
        });
        me.mon(me.topContainer.getEl(), {
            scope: me,
            mouseenter: me.onMouseEnterExpand
        });
        me.mon(me.bottomContainer.getEl(), {
            scope: me,
            mouseenter: me.onMouseEnterExpand
        });
        me.popupMenu = new cwc.ux.SidebarPopupMenu({
            cntEl: me.navTreeContainer.getEl(),
            showX: me.getWidth(),
            listeners: {
                enter: function() {
                    me.setHoveringButton(false);
                },
                beforeshow: function(pMenu, activeMenu) {
                    me.hidePopupMenusExcept(activeMenu.id);
                },
                show: function() {
                    me.setHoveringButton(false);
                }
            }
        });
        me.popupMenu.init();
        var sidebarExpandBtn = me.topContainer.get(0).el;
        cwc.setProperty(sidebarExpandBtn, {
            "ext:qtip": cwc.NAVMENU_EXPAND,
            "role": "button",
            "aria-label": cwc.NAVMENU_EXPAND,
            "aria-expanded": "false"
        });
        me.iconHeight = me.iconsContainer.items.length == 0 ? 0 : me.iconsContainer.get(0).getHeight() + this.iconsContainer.get(0).el.getMargins("b");
        me.container.createChild({
            cls: "sidebar-help",
            id: "sidebarHelp",
            html: cwc.NAVMENU_EXPAND_HELP
        });
        me.topContainer.get("sidebar-up-btn").btnEl.update("");
        me.bottomContainer.get("sidebar-down-btn").btnEl.update("");
    },
    setHoveringButton: function(btn) {
        this.hoveringButton = btn;
    },
    getHoveringButton: function() {
        return this.hoveringButton;
    },
    revertStatusChanges: function() {
        var lastFocusNode = this.navTree.lastFocusedNode;
        Ext.each(this.expandedMenus, function(item) {
            if (!item.collapsed && !item.el.contains(lastFocusNode)) {
                item.toggleCollapse();
            }
        });
        this.expandedMenus.length = 0;
        this.mousePath.length = 0;
        this.popupMenu.revert();
    },
    setInitStatus: function() {
        this.expandedMenus.length = 0;
        var item;
        for (var i = 0; i < this.navTree.items.length; i++) {
            item = this.navTree.get(i);
            this.expandSpecificMenu(item);
        }
        this.popupMenu.init();
    },
    expandSpecificMenu: function(item) {
        if (item.collapsed) {
            item.toggleCollapse();
            this.expandedMenus.push(item);
        }
    },
    gotoPopupMenu: function(e) {
        var me = this;
        var start = me.mousePath[0];
        if (!start || !me.popupMenu.activePopupMenu) {
            return;
        }
        var end = {
            x: e.getPageX(),
            y: e.getPageY()
        };
        var isUp = (end.y - start.y) < 0;
        var popupMenuPos = me.popupMenu.activePopupMenu.getPosition();
        var x = cwc.isRTL ? (popupMenuPos[0] + me.popupMenu.activePopupMenu.getWidth()) : popupMenuPos[0];
        var popupMenuTop = {
            x: x,
            y: popupMenuPos[1]
        };
        var popupMenuBottom = {
            x: x,
            y: popupMenuPos[1] + me.popupMenu.activePopupMenu.getHeight()
        };
        var getSinValue = function(s, e) {
            var againstSideLength = cwc.isRTL ? (s.x - e.x) : (e.x - s.x);
            var neighbourSideLength = Math.abs(e.y - s.y);
            return againstSideLength / Math.sqrt(againstSideLength * againstSideLength + neighbourSideLength * neighbourSideLength);
        };
        var minSinValueToVertical = getSinValue(start, isUp ? popupMenuTop : popupMenuBottom);
        var curSinValue = getSinValue(start, end);
        if (curSinValue > minSinValueToVertical) {
            me.mousePath.length = 0;
        }
        return curSinValue > minSinValueToVertical;
    },
    onMouseLeaveSidebar: function(e) {
        var me = this;
        var goingPopup = me.gotoPopupMenu(e);
        if (goingPopup) {
            setTimeout(function() {
                me.popupMenu.tryHide(e);
            }, 300);
        } else {
            me.popupMenu.tryHide(e);
        }
    },
    onMouseEnterExpand: function() {
        this.popupMenu.hide();
    },
    hidePopupMenusExcept: function(pId) {
        var item;
        for (var i = 0; i < this.navTree.items.length; i++) {
            item = this.navTree.get(i);
            if (item.id === pId) {
                continue;
            }
            this.popupMenu.forceHide(item);
        }
    },
    checkNavigationButtons: function(sidebar) {
        if (sidebar.iconsContainer.items.length == 0) {
            return;
        }
        var upBtn = sidebar.topContainer.get("sidebar-up-btn");
        var downBtn = sidebar.bottomContainer.get("sidebar-down-btn");
        var firstIcon = sidebar.iconsContainer.items.items[0].getEl();
        var btnBottomPos = upBtn.getPosition()[1] + upBtn.getHeight();
        if (btnBottomPos <= firstIcon.getTop()) {
            upBtn.disable();
        } else {
            upBtn.enable();
        }
        var length = sidebar.iconsContainer.items.items.length;
        var lastIcon = sidebar.iconsContainer.items.items[length - 1].getEl();
        var iconBottomPos = lastIcon.getHeight() + lastIcon.getTop();
        if (iconBottomPos <= sidebar.bottomContainer.getPosition()[1]) {
            downBtn.disable();
        } else {
            downBtn.enable();
        }
    },
    showNavigateButtons: function() {
        var reservedHeight = 26;
        var height = this.iconsContainer.getHeight();
        var sidebarHeight = this.container.getHeight();
        var expandBtnHeight = this.topContainer.get(0).getHeight();
        var show = height > sidebarHeight - expandBtnHeight - reservedHeight ? true : false;
        if (show) {
            this.topContainer.addClass("sidebar-navigate-up");
            this.topContainer.get("sidebar-up-btn").show();
            this.bottomContainer.show();
        } else {
            this.topContainer.removeClass("sidebar-navigate-up");
            this.topContainer.get("sidebar-up-btn").hide();
            this.bottomContainer.hide();
            this.iconsContainer.getEl().setTop(0);
        }
        this.checkNavigationButtons(this);
    },
    setMiddleContainerHeight: function() {
        this.middleContainer.setHeight(this.getHeight() - this.topContainer.getHeight() - this.bottomContainer.getHeight());
    },
    focusExpendButton: function() {
        this.topContainer.get(0).el.focus(500);
    },
    getIconPanelOverHeight: function() {
        var pos = this.iconsContainer.getPosition(true);
        var overHeight = 0;
        if (pos[1] < 0) {
            overHeight = 0 - pos[1];
        }
        return overHeight;
    },
    getHeightToLastVisibleIcon: function() {
        var visibleHeight = this.middleContainer.getHeight() + this.getIconPanelOverHeight();
        return visibleHeight;
    },
    navigateToPrevious: function() {
        var iconPanel = this.iconsContainer;
        var pos = iconPanel.getPosition(true);
        var overHeight = this.getIconPanelOverHeight();
        if (overHeight == 0) {
            return;
        }
        var iconNumber = overHeight % this.iconHeight == 0 ? overHeight / this.iconHeight - 1 : Math.floor(overHeight / this.iconHeight);
        iconPanel.setPosition(pos[0], -(iconNumber * this.iconHeight));
    },
    navigateToNext: function() {
        var iconPanel = this.iconsContainer;
        var pos = iconPanel.getPosition(true);
        var visibleHeight = this.getHeightToLastVisibleIcon();
        var middleHeight = this.middleContainer.getHeight();
        var iconNumber = visibleHeight % this.iconHeight == 0 ? visibleHeight / this.iconHeight + 1 : Math.ceil(visibleHeight / this.iconHeight);
        iconPanel.setPosition(pos[0], middleHeight - iconNumber * this.iconHeight - 2);
    },
    navigateToTop: function() {
        var iconPanel = this.iconsContainer;
        var pos = iconPanel.getPosition(true);
        iconPanel.setPosition(pos[0], 0);
    },
    destroy: function() {
        Ext.destroy(this.popupMenu);
        cwc.ux.SidebarPanel.superclass.destroy.call(this);
        Ext.EventManager.removeResizeListener();
    }
});
Ext.reg("cwc_sidebar", cwc.ux.SidebarPanel);
Ext.define("cwc.override.Menu", {
    override: "Ext.menu.Menu",
    onRender: function(ct, position) {
        if (!ct) {
            ct = Ext.getBody();
        }
        var dh = {
            id: this.getId(),
            cls: "x-menu " + ((this.floating) ? "x-menu-floating x-layer " : "") + (this.cls || "") + (this.plain ? " x-menu-plain" : "") + (this.showSeparator ? "" : " x-menu-nosep"),
            style: this.style,
            cn: [{
                tag: "ul",
                cls: "x-menu-list"
            }]
        };
        if (this.floating) {
            this.el = new Ext.Layer({
                shadow: this.shadow,
                dh: dh,
                constrain: false,
                parentEl: ct,
                zindex: this.zIndex
            });
        } else {
            this.el = ct.createChild(dh);
        }
        Ext.menu.Menu.superclass.onRender.call(this, ct, position);
        if (!this.keyNav) {
            this.keyNav = new Ext.menu.MenuNav(this);
        }
        this.ul = this.el.child("ul.x-menu-list");
        this.mon(this.ul, {
            scope: this,
            click: this.onClick,
            mouseover: this.onMouseOver,
            mouseout: this.onMouseOut
        });
        if (this.enableScrolling) {
            this.mon(this.el, {
                scope: this,
                delegate: ".x-menu-scroller",
                click: this.onScroll,
                mouseover: this.deactivateActive
            });
        }
    },
    showAt: function(xy, parentMenu) {
        if (this.fireEvent("beforeshow", this) !== false) {
            this.parentMenu = parentMenu;
            if (!this.el) {
                this.render();
            }
            if (this.enableScrolling) {
                this.el.setXY(xy);
                xy[1] = this.constrainScroll(xy[1]);
                xy = [this.el.adjustForConstraints(xy)[0], xy[1]];
            } else {
                xy = this.el.adjustForConstraints(xy);
            }
            this.el.setXY(xy);
            this.el.show();
            Ext.menu.Menu.superclass.onShow.call(this);
            this.hidden = false;
            this.fireEvent("show", this);
        }
    },
    onDestroy: function() {
        Ext.EventManager.removeResizeListener(this.hide, this);
        var pm = this.parentMenu;
        if (pm && pm.activeChild == this) {
            delete pm.activeChild;
        }
        delete this.parentMenu;
        Ext.menu.Menu.superclass.onDestroy.call(this);
        Ext.menu.MenuMgr.unregister(this);
        if (this.keyNav) {
            this.keyNav.disable();
        }
        var s = this.scroller;
        if (s) {
            Ext.destroy(s.topRepeater, s.bottomRepeater, s.top, s.bottom);
        }
        Ext.destroy(this.el, this.ul);
    }
});
/* file: cwc-Extjs-Toolbar.js */
cwc.ux.Toolbar = function(cfg) {
    cwc.ux.Toolbar.superclass.constructor.call(this, cfg);
};
Ext.extend(cwc.ux.Toolbar, Ext.Toolbar, {
    enableOverflow: true,
    getSecureUrlForIE: function(url) {
        if (!Ext.isSecure || /:\/\//.test(url) || /^\/\//.test(url)) {
            return url;
        }
        if (!this.baseDir) {
            var loc = this.el ? this.el.dom.ownerDocument.location.href : document.location.href;
            if (url.charAt(0) === "/") {
                this.baseDir = loc.substring(0, loc.indexOf("/", 8));
            } else {
                this.baseDir = loc.substring(0, loc.replace(/\?.*/g, "").lastIndexOf("/") + 1);
            }
        }
        return this.baseDir + url;
    },
    removeAll: function(autoDestroy) {
        this.layout.hiddenItems = [];
        if (this.rendered && this.items) {
            this.items.each(function(item) {
                try {
                    Ext.destroy(item);
                } catch (e) {}
            });
            this.items.clear();
        }
    },
    addComponents: function(cfgArray, keepOrder) {
        var result = (cfgArray != null && cfgArray.length > 0);
        if (result) {
            if (cwc.getDirectionClass() === "rtl") {
                if (!keepOrder) {
                    cfgArray.reverse();
                }
                var foundCwcToolButton = false;
                for (var i = 0, maxi = cfgArray.length; i < maxi; i++) {
                    var obj = cfgArray[i];
                    if (obj.xtype === "cwcToolButtons") {
                        obj.buttons.reverse();
                        foundCwcToolButton = true;
                    }
                }
                if (!keepOrder) {
                    if (foundCwcToolButton) {
                        cfgArray.splice(1, 0, "->");
                    } else {
                        cfgArray.splice(0, 0, "->");
                    }
                }
            }
            for (var i = 0, maxi = cfgArray.length; i < maxi; i++) {
                var obj = cfgArray[i];
                if (obj === "->") {
                    this.addFill();
                } else {
                    if (obj === "-") {
                        this.addSeparator();
                    } else {
                        if (obj.xtype === "cmdLineInput") {
                            this.addCmdlineComp(obj);
                        } else {
                            if (obj.xtype === "textfield") {
                                this.addField(new Ext.form.TextField(obj));
                            } else {
                                if (obj.xtype === "cwcToolButtons") {
                                    // this.addCwcTools(obj);
                                } else {
                                    if (obj.xtype === "cwcMastHeadButtons") {
                                        this.addCwcMastHeadButtons(obj);
                                    } else {
                                        if (obj.xtype === "menu") {
                                            obj.cls = cwc.getDirectionClass();
                                            this.addMenu(obj);
                                        } else {
                                            if (obj.xtype === "cwc_jumpaddress_combox") {
                                                if (top.cwc.disableJumpAddress !== true) {
                                                    this.addSeparator();
                                                    cwc.ux.Toolbar.superclass.addButton.call(this, obj);
                                                }
                                            } else {
                                                if (obj.xtype === "toolbarCombo") {
                                                    cwc.ux.Toolbar.superclass.addButton.call(this, obj);
                                                } else {
                                                    if (obj.icon) {
                                                        if (obj.cls) {
                                                            obj.cls = obj.cls + " x-btn-text-icon";
                                                        } else {
                                                            obj.cls = "x-btn-text-icon";
                                                        }
                                                    }
                                                    obj.tooltip = obj.qtip;
                                                    obj.text = this.stripAmpersand(obj.text);
                                                    this.addButton(obj);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;
    },
    getButtonHandler: function(handlerKey) {
        var toolbar = this;
        return function() {
            var frameWin = toolbar.ownerCt.getFrameWindow();
            if (frameWin && frameWin.cwc && frameWin.cwc.getToolActionHandler && typeof frameWin.cwc.getToolActionHandler === "function") {
                var handler = frameWin.cwc.getToolActionHandler(handlerKey);
                if (handler) {
                    handler.apply(frameWin, arguments);
                }
            }
        };
    },
    addMenuItemHandler: function(menu) {
        var me = this;
        if (menu && menu.items) {
            for (var i = 0, len = menu.items.length; i < len; i++) {
                var menuItem = menu.items[i];
                if (Ext.isObject(menuItem)) {
                    if (menuItem.menu) {
                        this.addMenuItemHandler(menuItem.menu);
                    } else {
                        if (menuItem.xtype === "menuitem" || !menuItem.xtype) {
                            if (menuItem.handlerKey && !menuItem.handler) {
                                menuItem.handler = me.getButtonHandler(menuItem.handlerKey);
                            }
                        }
                    }
                }
            }
        }
    },
    addButton: function(config) {
        var me = this;
        var addListener = function(btnCfg) {
            if (Ext.isObject(btnCfg)) {
                if (btnCfg.handlerKey && !btnCfg.handler) {
                    btnCfg.handler = me.getButtonHandler(btnCfg.handlerKey);
                }
                btnCfg.listeners = {};
                if (btnCfg.selectHandlerKey) {
                    btnCfg.listeners.select = me.getButtonHandler(btnCfg.selectHandlerKey);
                }
                if (!btnCfg.text && !config.menu) {
                    btnCfg.listeners.afterrender = function(btn) {
                        if (btn.cmdLineField) {
                            cwc.setProperty(btn.cmdLineField.el, {
                                "aria-label": btn.lineField
                            });
                        } else {
                            if (btn.tooltip) {
                                cwc.setProperty(btn.btnEl, {
                                    "aria-label": btn.tooltip
                                });
                                if (btn.shortcut) {
                                    cwc.setProperty(btn.btnEl, {
                                        "aria-keyshortcuts": btn.shortcut
                                    });
                                }
                            }
                        }
                    };
                } else {
                    if (config.menu) {
                        btnCfg.listeners.afterrender = function(btn) {
                            if (btn && btn.btnEl) {
                                cwc.setProperty(btn.btnEl, {
                                    "role": "button",
                                    "aria-haspopup": "true"
                                });
                            }
                        };
                        btnCfg.listeners.menushow = function(btn, menu) {
                            cwc.setMenuAria(menu);
                            menu.setActiveItem(menu.items.get(0), false);
                        };
                        btnCfg.listeners.menuhide = function(btn, menu) {
                            if (menu.ul) {
                                cwc.setProperty(btn.btnEl, {
                                    "aria-expanded": "false"
                                });
                            }
                            btn.btnEl.focus();
                        };
                    } else {
                        Ext.apply(btnCfg.listeners, {
                            afterrender: function(btn) {
                                if (btn && btn.btnEl) {
                                    cwc.setProperty(btn.btnEl, {
                                        "aria-label": btn.tooltip
                                    });
                                    if (btn.shortcut) {
                                        cwc.setProperty(btn.btnEl, {
                                            "aria-keyshortcuts": btn.shortcut
                                        });
                                    }
                                    btn.btnEl.on({
                                        "focus": function(e, t) {
                                            if (config.tooltip != config.text) {
                                                var qt = Ext.QuickTips.getQuickTip();
                                                if (!qt.origGetTargetXY) {
                                                    qt.origGetTargetXY = qt.getTargetXY;
                                                }
                                                qt.getTargetXY = function() {
                                                    var xy = qt.el.getAlignToXY(Ext.get(t), "tl-l");
                                                    var mouseOffset = qt.getMouseOffset();
                                                    return [xy[0] + mouseOffset[0], xy[1] + mouseOffset[1]];
                                                };
                                                qt.on("show", function() {
                                                    if (qt.origGetTargetXY) {
                                                        qt.getTargetXY = qt.origGetTargetXY;
                                                    }
                                                });
                                                qt.onTargetOver(e);
                                            }
                                        },
                                        "blur": function(e, t) {
                                            var qt = Ext.QuickTips.getQuickTip();
                                            qt.hide();
                                            qt.lastActive = new Date(0);
                                            if (qt.origGetTargetXY) {
                                                qt.getTargetXY = qt.origGetTargetXY;
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
        };
        if (Ext.isArray(config)) {
            for (var i = 0, len = config.length; i < len; i++) {
                addListener(config[i]);
            }
        } else {
            addListener(config);
            if (config.items && Ext.isArray(config.items)) {
                for (var i = 0, len = config.items.length; i < len; i++) {
                    addListener(config.items[i]);
                }
            }
        }
        if (Ext.isIE && config.icon) {
            config.icon = this.getSecureUrlForIE(config.icon);
        }
        config.cls = config.cls + " cwc-toolbar-button";
        return cwc.ux.Toolbar.superclass.addButton.call(this, config);
    },
    addMenu: function(obj) {
        if (obj.items.length > 0) {
            obj.ignoreParentClicks = true;
            Ext.apply(obj, {
                onOuterMouseDown: function() {
                    this.hide();
                },
                listeners: {
                    beforeshow: function(menu) {
                        cwc.showShims();
                        cwc.addOuterListener && cwc.addOuterListener("mousedown", menu.onOuterMouseDown, menu);
                    },
                    beforehide: function(menu) {
                        cwc.hideShims();
                        cwc.removeOuterListener && cwc.removeOuterListener("mousedown", menu.onOuterMouseDown, menu);
                    },
                    beforedestroy: function() {
                        cwc.hideShims();
                    },
                    hide: function(target) {
                        if (target && target.ownerCt && target.ownerCt.btnEl) {
                            target.ownerCt.btnEl.focus();
                        }
                        cwc.setWorkflowAppletVisible(true);
                    },
                    show: function(target) {
                        cwc.setWorkflowAppletVisible(false);
                    },
                    scope: cwc
                }
            });
            for (var len = 0; len < obj.items.length; len++) {
                obj.items[len].text = this.stripAmpersand(obj.items[len].text);
            }
            if (!cwc.isRTL) {
                this.addSeparator();
            }
            this.addMenuItemHandler(obj);
            this.addButton({
                cls: "x-btn-more-noicon",
                text: top.cwc.MORE_BTN_TEXT,
                tooltip: top.cwc.MORE_BTN_TOOLTIP,
                menu: obj
            });
            if (cwc.isRTL) {
                this.addSeparator();
            }
        }
    },
    stripAmpersand: function(menuText) {
        var resultString = "";
        if (menuText != undefined && menuText != null) {
            var mySplitString = menuText.split(" ");
            if (mySplitString.length > 0) {
                for (var len = 0; len < mySplitString.length; len++) {
                    if (mySplitString[len].length > 1) {
                        mySplitString[len] = mySplitString[len].replace("&", "");
                    }
                    resultString += mySplitString[len] + " ";
                }
                resultString = resultString.substring(0, resultString.length - 1);
            } else {
                resultString = mySplitString[0].replace("&", "");
            }
        }
        if (resultString === "Back") {
            resultString = "Quay láº¡i"
        }
        if (resultString === "Save") {
            resultString = "LÆ°u"
        }
        if (resultString === "Add") {
            resultString = "ThÃªm má»›i"
        }
        if (resultString === "Search") {
            resultString = "TÃ¬m Kiáº¿m"
        }
        if (resultString === "Cancel") {
            resultString = "Bá» qua"
        }
        if (resultString === "Next") {
            resultString = "Tiáº¿p theo"
        }
        if (resultString === "New") {
            resultString = "Táº¡o má»›i"
        }
        if (resultString === "Refresh") {
            resultString = "LÃ m má»›i"
        }
        if (resultString === "Revise") {
            resultString = "ÄÃ¡nh giÃ¡ láº¡i"
        }
        return resultString;
    },
    addCwcTools: function(obj) {
        if (obj.viewtype !== "xdashboard" && cwc.getDirectionClass() !== "rtl") {
            this.addFill();
        }
        var btns = obj.buttons;
        for (var i = 0, maxi = btns.length; i < maxi; i++) {
            var btn = btns[i];
            if (btn.xtype === "print") {
                this.addPrintBtn(obj.viewtype, btn);
            } else {
                if (btn.xtype === "favorite" && cwc.getTopCwc().hasUserFavorites) {
                    this.addFavoriteBtn(obj.viewtype, btn);
                } else {
                    if (btn.xtype === "gear") {
                        this.addGearBtn(obj.viewtype, btn);
                    }
                }
            }
        }
    },
    addCwcMastHeadButtons: function(obj) {
        this.addFill();
        var btns = obj.buttons;
        for (var i = 0, maxi = btns.length; i < maxi; i++) {
            var btn = btns[i];
            if (btn.xtype === "help") {
                var helpBtn = null;
                var popupType = "dialog";
                if (cwc.isHelpVisible) {
                    popupType = "menu";
                    helpBtn = this.addButton({
                        iconCls: "icon-help cwc-toolbar-help",
                        cls: "x-btn-icon",
                        tooltip: top.cwc.HELP,
                        menu: {
                            items: [{
                                text: cwc.HELP_ONLINE,
                                handler: function() {
                                    cwc.help();
                                }
                            }, {
                                text: cwc.HELP_SHORTCUT,
                                handler: function() {
                                    cwc.showKeyboardShortcutList();
                                }
                            }]
                        }
                    });
                } else {
                    helpBtn = this.addButton({
                        iconCls: "icon-help cwc-toolbar-help",
                        cls: "x-btn-icon",
                        tooltip: top.cwc.HELP,
                        handler: function() {
                            cwc.showKeyboardShortcutList();
                            // window.open('../../../../sm/huongdansudung.htm');
                        }
                    });
                }
                helpBtn.on("afterrender", function() {
                    helpBtn.setText(top.cwc.HELP);
                    cwc.setProperty(helpBtn.btnEl, {
                        "aria-haspopup": popupType
                    });
                });
            } else {
                if (btn.xtype == "messages") {
                    this.addButton(Ext.create({
                        xtype: "toolbarMessageButton"
                    }));
                } else {
                    if (btn.xtype == "notification") {
                        this.addButton(Ext.create({
                            xtype: "smcNotificationButton"
                        }));
                    } else {
                        if (btn.xtype == "chatRequest") {
                            this.addButton(Ext.create({
                                xtype: "smcChatRequestButton",
                                hidden: btn.hidden
                            }));
                        } else {
                            if (btn.xtype == "topalert" && !cwc.isAccessibleMode) {
                                this.addButton(Ext.create({
                                    xtype: "topAlert"
                                }));
                            } else {
                                if (btn.xtype == "userinfo") {
                                    this.addButton(Ext.create({
                                        xtype: "toolbarUserInfoButton"
                                    }));
                                } else {
                                    if (btn.xtype === "refresh") {
                                        this.addButton({
                                            iconCls: "cwc-toolbar-refresh",
                                            cls: "x-btn-icon",
                                            tooltip: top.cwc.REFRESH,
                                            handler: function() {
                                                top.cwc.refresh(cwc.getActiveTab());
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    applyCwcToolButtonEx: function(target, config) {
        if (target && config && typeof config == "object") {
            for (var p in config) {
                if (p != "xtype") {
                    target[p] = config[p];
                }
            }
        }
        return target;
    },
    addGearBtn: function(viewtype, buttonCfg) {
        var me = this,
            gearHandler = null,
            currentTab = top.cwc.getCurrentTab(me);
        if (viewtype === "xdashboard") {
            gearHandler = function() {
                var dashboard = currentTab.getFrameWindow().DASHBOARD;
                if (dashboard) {
                    dashboard.openSetting();
                }
            };
        }
        var cfg = {
            iconCls: "cwc-toolbar-gear",
            cls: "x-btn-icon x-btn-gear cwc-toolbar-icononly-button",
            handler: gearHandler
        };
        me.applyCwcToolButtonEx(cfg, buttonCfg);
        me.addButton(cfg);
    },
    addPrintBtn: function(viewtype, buttonCfg) {
        var pMenu, pHandler;
        var currentTab = top.cwc.getCurrentTab(this);
        if (viewtype == "list") {
            var frame = currentTab.getListFrame();
            var detailFrame = (frame) ? frame : (currentTab.hasListDetail() ? currentTab.getDetailFrame() : currentTab.getFrame());
            detailFrame = (detailFrame.xtype == "iframepanel" || detailFrame.xtype == "hpsm-ux-iframepanel") ? detailFrame.getFrame() : detailFrame;
            var wndw = detailFrame.getWindow(),
                showDualPrintList = (wndw.showDualPrintListMenu) ? wndw.showDualPrintListMenu() : false,
                isDualPrintList = showDualPrintList && (wndw.printListCurrent || wndw.printListAll),
                printListMenuItems;
            if (isDualPrintList) {
                printListMenuItems = [{
                    text: top.cwc.PRINT_LIST_ALL,
                    handler: function() {
                        top.cwc.print(currentTab.getListFrame(), true);
                    }
                }, {
                    text: top.cwc.PRINT_LIST_CURRENT,
                    handler: function() {
                        top.cwc.print(currentTab.getListFrame(), false);
                    }
                }];
                pMenu = new Ext.menu.Menu({
                    onOuterMouseDown: function() {
                        this.hide();
                    },
                    listeners: {
                        beforeshow: function(menu) {
                            cwc.showShims();
                            cwc.addOuterListener && cwc.addOuterListener("mousedown", menu.onOuterMouseDown, menu);
                        },
                        beforehide: function(menu) {
                            cwc.hideShims();
                            cwc.removeOuterListener && cwc.removeOuterListener("mousedown", menu.onOuterMouseDown, menu);
                        },
                        scope: cwc
                    },
                    items: printListMenuItems
                });
            } else {
                pHandler = function() {
                    top.cwc.print(currentTab.getListFrame());
                };
            }
        } else {
            if (viewtype == "detail") {
                pHandler = function() {
                    top.cwc.print(currentTab.getDetailFrame());
                };
            } else {
                if (viewtype === "xdashboard") {
                    pHandler = function() {
                        var dashboard = currentTab.getFrameWindow().DASHBOARD;
                        if (dashboard) {
                            dashboard.printDashboard();
                        }
                    };
                } else {
                    pHandler = function() {
                        top.cwc.print(currentTab.getFrame());
                    };
                }
            }
        }
        var iconCls = "cwc-toolbar-print";
        if (cwc.isHighContrastMode()) {
            iconCls = "";
        }
        var cfg = {
            iconCls: iconCls,
            cls: "x-btn-icon x-btn-print cwc-toolbar-icononly-button cwc-toolbar-print-button",
            tooltip: top.cwc.PRINT,
            menu: pMenu,
            handler: pHandler
        };
        this.applyCwcToolButtonEx(cfg, buttonCfg);
        var printBtn = this.addButton(cfg);
        printBtn.on("afterrender", function() {
            printBtn.overflowText = top.cwc.PRINT;
        });
    },
    addFavoriteBtn: function(viewtype, buttonCfg) {
        var tab = top.cwc.getActiveTab();
        var addFavHandler = null;
        if (viewtype === "xdashboard") {
            addFavHandler = function() {
                var currentTab = top.cwc.getCurrentTab(this);
                var dashboard = currentTab.getFrameWindow().DASHBOARD;
                if (dashboard) {
                    dashboard.addDashboardToFavorite();
                }
            };
        } else {
            addFavHandler = function() {
                top.cwc.uniAddFavorite(viewtype === "list", this);
            };
        }
        var cfg = {
            iconCls: "cwc-toolbar-favAdd",
            cls: "x-btn-icon cwc-toolbar-icononly-button",
            tooltip: top.cwc.NAVMENU_ADD_SHORTCUT,
            hidden: !top.cwc.showAddFavBtn,
            isFavoriteBtn: true,
            handler: addFavHandler
        };
        this.applyCwcToolButtonEx(cfg, buttonCfg);
        var favBtn = this.addButton(cfg);
        favBtn.on("afterrender", function() {
            favBtn.overflowText = top.cwc.NAVMENU_ADD_SHORTCUT;
        });
    },
    switchBtn: function(target, opts) {
        target.btnEl.removeClass(opts.removeCls);
        target.btnEl.addClass(opts.addCls);
        target.setTooltip(opts.switchToolTip);
        cwc.setProperty(target.btnEl, {
            "aria-label": opts.switchBtnLabel
        });
        this.cmdBtn.cmdLineField.setValue(opts.cmdFieldValue);
        this.cmdBtn.cmdLineField.addClass("cwc-line-feild-font");
        cwc.setProperty(this.cmdBtn.cmdLineField.el, {
            "aria-label": opts.cmdFieldLabel
        });
        this.cmdBtn.setTooltip(opts.cmdBtnToolTip);
        cwc.setProperty(this.cmdBtn.btnEl, {
            "aria-label": opts.cmdBtnLabel
        });
    },
    initCmdStatus: function() {
        var isSearchFromSession = cwc.store.session.getItem("tbar_cmd_isSearch");
        if (isSearchFromSession == undefined) {
            cwc.store.session.setItem("tbar_cmd_isSearch", false);
        }
    },
    addSwitchBtn: function() {
        var self = this;
        this.switchBtnEl = this.addButton({
            iconCls: cwc.store.session.getItem("tbar_cmd_isSearch") == true ? "cwc-toolbar-switch-search switchSearchInactive" : "cwc-toolbar-switch-command switchCommandInactive",
            cls: "x-btn-icon",
            tooltip: cwc.store.session.getItem("tbar_cmd_isSearch") == true ? top.cwc.SWITCH_COMMAND_BTN : top.cwc.SWITCH_SEARCH_BTN,
            handler: function(target, evt) {
                if (!cwc.store.session.getItem("tbar_cmd_isSearch")) {
                    cwc.store.session.setItem("tbar_cmd_isSearch", true);
                    self.switchBtn(target, {
                        removeCls: "cwc-toolbar-switch-command",
                        addCls: "cwc-toolbar-switch-search",
                        switchToolTip: top.cwc.SWITCH_COMMAND_BTN,
                        switchBtnLabel: top.cwc.SWITCH_COMMAND_BTN,
                        cmdFieldValue: top.cwc.SEARCH_LINE_FIELD,
                        cmdFieldLabel: top.cwc.SEARCH_LINE_FIELD,
                        cmdBtnToolTip: top.cwc.SEARCH_LINE_BTN,
                        cmdBtnLabel: top.cwc.SEARCH_LINE_BTN
                    });
                } else {
                    cwc.store.session.setItem("tbar_cmd_isSearch", false);
                    self.switchBtn(target, {
                        removeCls: "cwc-toolbar-switch-search",
                        addCls: "cwc-toolbar-switch-command",
                        switchToolTip: top.cwc.SWITCH_SEARCH_BTN,
                        switchBtnLabel: top.cwc.SWITCH_SEARCH_BTN,
                        cmdFieldValue: top.cwc.COMMAND_LINE_FIELD,
                        cmdFieldLabel: top.cwc.COMMAND_LINE_FIELD,
                        cmdBtnToolTip: top.cwc.COMMAND_LINE_BTN,
                        cmdBtnLabel: top.cwc.COMMAND_LINE_BTN
                    });
                }
            }
        });
        this.switchBtnEl.onFocus = function(e) {
            self.commandLineOnFocus();
        };
        this.switchBtnEl.onBlur = function(e) {
            self.commandLineOnBlur();
        };
    },
    addCmdlineComp: function(obj) {
        var isUniSearchActive = obj.isUniSearchActive;
        var isCommandActive = obj.isCmdActive;
        var uniSearchBtn = obj.uniSearchBtn;
        var commandBtn = obj.commandBtn,
            btn;
        delete obj.commandBtn;
        delete obj.uniSearchBtn;
        if (isUniSearchActive == "1" && isCommandActive == "1") {
            this.initCmdStatus();
            this.addSwitchBtn();
        }
        if (isUniSearchActive == "1" || isCommandActive == "1") {
            var buttonClass;
            if (isUniSearchActive == "1" && isCommandActive != "1") {
                btn = uniSearchBtn;
                buttonClass = "cwc-toolbar-search";
                cwc.store.session.setItem("tbar_cmd_isSearch", true);
            } else {
                if (isCommandActive == "1") {
                    btn = commandBtn;
                    buttonClass = "cwc-toolbar-command";
                }
            }
            Ext.apply(obj, {
                xtype: "textfield",
                cls: "cwc-toolbar-command-field commandFieldInactive",
                hideLabel: true,
                enableKeyEvents: true,
                getCommandUrl: function() {
                    var commandUrl = null;
                    var fieldValue = Ext.util.Format.trim(this.getValue());
                    if (!Ext.isEmpty(fieldValue) && top.cwc.COMMAND_LINE_FIELD != fieldValue && top.cwc.SEARCH_LINE_FIELD != fieldValue) {
                        if (this.url.match(/[\w-$%]+\?[\w-$]+=/g)) {
                            commandUrl = this.url + "&";
                        } else {
                            if (this.url.match(/\?$/)) {
                                commandUrl = this.url;
                            } else {
                                commandUrl = this.url + "?";
                            }
                        }
                        if ((isUniSearchActive == "1" && isCommandActive != "1") || (cwc.store.session.getItem("tbar_cmd_isSearch") == true)) {
                            fieldValue = "=" + fieldValue;
                        }
                        commandUrl += this.valueParamName + "=" + encodeURIComponent(fieldValue);
                    }
                    return commandUrl;
                },
                listeners: {
                    focus: function(field) {
                        field.setValue("");
                        top.cwc.blockKeycode(13);
                        field.ownerCt.commandLineOnFocus();
                    },
                    blur: function(field) {
                        field.ownerCt.commandLineOnBlur();
                        top.cwc.unBlockKeycode(13);
                        if (field.getValue() == "") {
                            if (cwc.store.session.getItem("tbar_cmd_isSearch")) {
                                field.setValue(top.cwc.SEARCH_LINE_FIELD);
                            } else {
                                field.setValue(top.cwc.COMMAND_LINE_FIELD);
                            }
                        }
                    },
                    render: function(field) {
                        var commandDiv = field.ownerCt.el.parent("#head-button-command");
                        commandDiv.setVisible(true);
                        commandDiv.addClass("commandDivInactive");
                    },
                    specialkey: function(field, evtObj) {
                        if (evtObj.getKey() === 13) {
                            var commandUrl = field.getCommandUrl();
                            field.setValue("");
                            if (commandUrl !== null) {
                                top.cwc.openNewTabPanel({
                                    url: commandUrl,
                                    focusToHeader: false
                                });
                            }
                        }
                    }
                }
            });
            var field = new Ext.form.TextField(obj);
            if (!cwc.store.session.getItem("tbar_cmd_isSearch")) {
                field.setValue(top.cwc.COMMAND_LINE_FIELD);
            } else {
                field.setValue(top.cwc.SEARCH_LINE_FIELD);
                btn.lineField = top.cwc.SEARCH_LINE_FIELD;
                btn.tooltip = top.cwc.SEARCH_LINE_BTN;
            }
            field.addClass("cwc-line-feild-font");
            Ext.apply(btn, {
                cmdLineField: field,
                iconCls: buttonClass + " commandInactive",
                cls: "x-btn-icon",
                handler: function(btn, evt) {
                    var commandUrl = btn.cmdLineField.getCommandUrl();
                    if (cwc.store.session.getItem("tbar_cmd_isSearch")) {
                        btn.cmdLineField.setValue(top.cwc.SEARCH_LINE_FIELD);
                    } else {
                        btn.cmdLineField.setValue(top.cwc.COMMAND_LINE_FIELD);
                    }
                    if (commandUrl !== null) {
                        top.cwc.openNewTabPanel({
                            url: commandUrl,
                            focusToHeader: false
                        });
                    }
                }
            });
            this.cmdField = this.addField(field);
            this.cmdBtn = this.addButton(btn);
            var toolbarEl = this;
            this.cmdBtn.onFocus = function(e) {
                toolbarEl.commandLineOnFocus();
            };
            this.cmdBtn.onBlur = function(e) {
                toolbarEl.commandLineOnBlur();
            };
        }
    },
    commandLineOnFocus: function() {
        this.cmdBtn.btnEl.removeClass("commandInactive");
        if (this.switchBtnEl) {
            if (cwc.store.session.getItem("tbar_cmd_isSearch")) {
                this.switchBtnEl.btnEl.removeClass("switchSearchInactive");
            } else {
                this.switchBtnEl.btnEl.removeClass("switchCommandInactive");
            }
        }
        this.cmdField.removeClass("commandFieldInactive");
        this.cmdBtn.btnEl.parent("#head-button-command").removeClass("commandDivInactive");
    },
    commandLineOnBlur: function() {
        this.cmdBtn.btnEl.addClass("commandInactive");
        if (this.switchBtnEl) {
            if (cwc.store.session.getItem("tbar_cmd_isSearch")) {
                this.switchBtnEl.btnEl.addClass("switchSearchInactive");
            } else {
                this.switchBtnEl.btnEl.addClass("switchCommandInactive");
            }
        }
        this.cmdField.addClass("commandFieldInactive");
        this.cmdBtn.btnEl.parent("#head-button-command").addClass("commandDivInactive");
    },
    getFavoriteButton: function() {
        var result = null;
        for (var i = 0, len = this.items.items.length; i < len; i++) {
            if (this.items.items[i].isFavoriteBtn) {
                result = this.items.items[i];
                break;
            }
        }
        return result;
    },
    getButtonByText: function(bText) {
        var result = null;
        for (var i = 0, len = this.items.items.length; i < len; i++) {
            if (this.items.items[i].text == bText) {
                result = this.items.items[i];
                break;
            } else {
                if (this.items.items[i].xtype === "compositefield") {
                    var subItems = this.items.items[i].innerCt.items.items;
                    for (var j = 0; j < subItems.length; j++) {
                        if (subItems[j].text == bText) {
                            return subItems[j];
                        }
                    }
                }
            }
        }
        return result;
    },
    findLeadingSeparator: function(btnId) {
        var result = null,
            buttonInfo = {};
        for (var i = 0, len = this.items.items.length; i < len; i++) {
            if (this.items.items[i].btnId == btnId) {
                buttonInfo.button = this.items.items[i];
                buttonInfo.index = i;
                break;
            }
        }
        if (buttonInfo.index > 0) {
            var sep = this.items.items[buttonInfo.index - 1];
            if (!sep.xtype) {
                var sepEl = sep.el;
                if (sepEl && sepEl.hasClass("xtb-sep")) {
                    result = sep;
                }
            } else {
                if (sep.xtype === "tbseparator") {
                    result = sep;
                }
            }
        }
        return result;
    },
    getButtonByIcon: function(bIcon) {
        var result = null;
        for (var i = 0, len = this.items.items.length; i < len; i++) {
            var icon = this.items.items[i].icon;
            if (icon && icon.indexOf(bIcon) != -1) {
                result = this.items.items[i];
                break;
            } else {
                if (this.items.items[i].xtype === "compositefield") {
                    var subItems = this.items.items[i].innerCt.items.items;
                    for (var j = 0; j < subItems.length; j++) {
                        if (subItems[j].icon && subItems[j].icon.indexOf(bIcon) !== -1) {
                            return subItems[j];
                        }
                    }
                }
            }
        }
        return result;
    },
    getButtonByBtnId: function(value) {
        var result = null;
        for (var i = 0, len = this.items.items.length; i < len; i++) {
            if (this.items.items[i].btnId == value) {
                result = this.items.items[i];
                break;
            } else {
                if (this.items.items[i].xtype === "compositefield") {
                    var subItems = this.items.items[i].innerCt.items.items;
                    for (var j = 0; j < subItems.length; j++) {
                        if (subItems[j].btnId == value) {
                            return subItems[j];
                        }
                    }
                }
            }
        }
        return result;
    },
    clearBtnHandler: function(btn) {
        if (btn) {
            if (btn.handler) {
                btn.handler = null;
            }
            if (btn.initialConfig) {
                btn.initialConfig.handler = null;
            }
            var toolbar = this;
            if (btn.items) {
                btn.items.each(function(item) {
                    toolbar.clearBtnHandler(item);
                });
            }
        }
    }
});
Ext.reg("cwcToolbar", cwc.ux.Toolbar);
cwc.ux.ToolbarLayout = Ext.extend(Ext.layout.ToolbarLayout, {
    QJSpaceEnough: false,
    resizeQJButton: function(item) {
        this.QJSpaceEnough = false;
        var maxWidth = item.width,
            minWidth = 40;
        var resizeWidth = this.leaveSpaceForQJButton(minWidth);
        resizeWidth = resizeWidth > maxWidth ? maxWidth : resizeWidth;
        item.setWidth(resizeWidth);
    },
    leaveSpaceForQJButton: function(minWidth) {
        var items = this.container.items.items;
        var visibleItemsBeforeQJ = [];
        var item;
        var rightArea = this.container.el.query(".x-toolbar-right");
        var width = this.container.el.dom.clientWidth,
            clipWidth = width - this.triggerWidth,
            loopWidth = 0,
            rightAreaWidth = (rightArea && rightArea.length > 0) ? rightArea[0].offsetWidth : 0;
        for (var i = 0; i < items.length; i++) {
            item = items[i];
            if (item.isXType("cwc_jumpaddress_combox")) {
                break;
            }
            if (!item.isFill && !(item.hidden || item.xtbHidden)) {
                loopWidth += this.getItemWidth(item);
                visibleItemsBeforeQJ.push(item);
            }
        }
        var leftWidth = clipWidth - loopWidth - rightAreaWidth;
        if (minWidth < leftWidth) {
            this.QJSpaceEnough = true;
            return leftWidth;
        }
        var len = visibleItemsBeforeQJ.length;
        for (var i = 0; i < len - 1; i++) {
            if (this.QJSpaceEnough) {
                return leftWidth;
            }
            item = visibleItemsBeforeQJ[len - 1 - i];
            this.hideItem(item);
            leftWidth = this.leaveSpaceForQJButton(minWidth);
        }
        return this.QJSpaceEnough ? leftWidth : minWidth;
    },
    fitToSize: function(target) {
        if (this.moreMenu && this.moreMenu.focusTimerId) {
            window.clearTimeout(this.moreMenu.focusTimerId);
        }
        if (this.container.enableOverflow === false) {
            return;
        }
        var width = target.dom.clientWidth,
            tableWidth = target.dom.firstChild.offsetWidth,
            clipWidth = width - this.triggerWidth,
            lastWidth = this.lastWidth || 0,
            hiddenItems = this.hiddenItems,
            hasHiddens = hiddenItems.length != 0,
            isLarger = width >= lastWidth;
        this.lastWidth = width;
        if (tableWidth > width || (hasHiddens && isLarger)) {
            var items = this.container.items.items,
                len = items.length,
                loopWidth = 0,
                item;
            for (var i = 0; i < len; i++) {
                item = items[i];
                if (!item.isFill) {
                    loopWidth += this.getItemWidth(item);
                    if (loopWidth > clipWidth) {
                        if (!(item.hidden || item.xtbHidden) && !item.isXType("cwc_jumpaddress_combox")) {
                            this.hideItem(item);
                        }
                    } else {
                        if (item.xtbHidden) {
                            this.unhideItem(item);
                        }
                    }
                }
            }
        }
        if (this.moreMenu && this.moreMenu.focusTimerId && this.more) {
            this.moreMenu.focusTimerId = null;
            this.more.focus();
        }
        var currentTab = top.cwc.getActiveTab();
        if (currentTab) {
            var qjItem = this.container.getComponent(currentTab.getId() + "_jumpaddress");
            qjItem && this.resizeQJButton(qjItem);
        }
        hasHiddens = hiddenItems.length != 0;
        if (hasHiddens) {
            this.initMore();
            if (!this.lastOverflow) {
                this.container.fireEvent("overflowchange", this.container, true);
                this.lastOverflow = true;
            }
            cwc.util.setToolbarARIA({
                "toolbar": this.container,
                "additionalButtons": [this.more]
            });
        } else {
            if (this.more) {
                this.clearMenu();
                this.more.destroy();
                delete this.more;
                if (this.lastOverflow) {
                    this.container.fireEvent("overflowchange", this.container, false);
                    this.lastOverflow = false;
                }
                cwc.util.setToolbarARIA({
                    "toolbar": this.container
                });
            }
        }
    },
    initMore: function() {
        if (!this.more) {
            var me = this;
            this.moreMenu = new Ext.menu.Menu({
                ownerCt: this.container,
                listeners: {
                    beforeshow: function(menu) {
                        cwc.showShims();
                        me.prepareMoreMenu(menu);
                    },
                    show: function(menu) {
                        menu.setActiveItem(menu.items.get(0), false);
                    },
                    beforehide: function(menu) {
                        cwc.hideShims();
                        if (menu.ul) {
                            cwc.setProperty(menu.ul, {
                                "aria-expanded": "false",
                                "aria-hidden": "true"
                            });
                        }
                        if (menu.rendered && !menu.hidden) {
                            menu.focusTimerId = window.setTimeout(function() {
                                me.more.focus();
                            }, 300);
                        }
                    },
                    hide: function(menu) {
                        if (menu && menu.ul && menu.ownerCt) {
                            cwc.setProperty(menu.ownerCt.btnEl, {
                                "aria-expanded": "false"
                            });
                        }
                    },
                    beforedestroy: function() {
                        cwc.hideShims();
                    },
                    scope: this
                }
            });
            this.more = new Ext.Button({
                iconCls: "x-toolbar-more-icon",
                cls: "x-toolbar-more",
                menu: this.moreMenu,
                ownerCt: this.container
            });
            var td = this.insertCell(this.more, this.extrasTr, 100);
            this.more.render(td);
            cwc.setProperty(this.more.btnEl, {
                "aria-haspopup": "true",
                "aria-label": topCwc.EXT_TOOLBAR_SHOW_HIDDEN_MENU,
                "title": topCwc.EXT_TOOLBAR_SHOW_HIDDEN_MENU_LONG
            });
        }
    },
    prepareMoreMenu: function(menu) {
        this.beforeMoreShow(menu);
        if (menu.items.length >= 1) {
            cwc.setMenuAria(menu);
        }
    },
    createMenuConfig: function(component, hideOnClick) {
        var config = Ext.apply({}, component.initialConfig),
            group = component.toggleGroup;
        if (this.isHiddenNavBtn(component) && cwc.currentTreePanel() == 1) {
            config.hidden = false;
        }
        Ext.copyTo(config, component, ["iconCls", "icon", "itemId", "disabled", "handler", "scope", "menu"]);
        Ext.apply(config, {
            text: component.overflowText || component.text,
            hideOnClick: hideOnClick
        });
        if (group || component.enableToggle) {
            Ext.apply(config, {
                group: group,
                checked: component.pressed,
                listeners: {
                    checkchange: function(item, checked) {
                        component.toggle(checked);
                    }
                }
            });
        }
        delete config.ownerCt;
        delete config.xtype;
        delete config.id;
        return config;
    },
    isHiddenNavBtn: function(component) {
        var buttonIdList = [cwc.favManage, cwc.btnFavShowFavorites, cwc.favAddFolderChartId, cwc.btnFavSep, cwc.btnFavCopyTo, cwc.btnFavDelete];
        for (var i = 0; i < buttonIdList.length; i++) {
            if (buttonIdList[i].indexOf(component.id) > -1) {
                return true;
            }
        }
        return false;
    }
});
Ext.Container.LAYOUTS.toolbar = cwc.ux.ToolbarLayout;
(function() {
    Ext.ns("cwc.ux");
    cwc.ux.ToolbarButtonBase = Ext.extend(Ext.Button, {
        targetPanelOpened: false,
        setToInactiveCalled: false,
        setToActiveCalled: false,
        onFocus: function() {
            var me = this;
            if (!me.setToActiveCalled || (me.setToActiveCalled && !me.setToInactiveCalled)) {
                me.switchStyle("enable");
            }
            me.setToInactiveCalled = false;
            me.setToActiveCalled = false;
        },
        onBlur: function() {
            var me = this;
            if (!me.targetPanelOpened) {
                me.switchStyle("disable");
            }
        },
        setToActive: function() {
            var me = this;
            me.targetPanelOpened = true;
            me.switchStyle("enable");
            me.setToActiveCalled = true;
        },
        setToInactive: function() {
            var me = this;
            me.targetPanelOpened = false;
            me.switchStyle("disable");
            me.setToInactiveCalled = true;
        },
        switchStyle: function(status) {
            var me = this;
            var enableStyle = function(element) {
                if (element) {
                    element.removeClass("cwc-toolbar-inactive-background");
                    element.addClass("cwc-toolbar-active-background");
                }
            };
            var disableStyle = function(element) {
                if (element) {
                    element.removeClass("cwc-toolbar-active-background");
                    element.addClass("cwc-toolbar-inactive-background");
                }
            };
            if (status == "enable") {
                if (me.canEnable()) {
                    enableStyle(me);
                    enableStyle(me.el.select("button"));
                }
            } else {
                disableStyle(me);
                disableStyle(me.el.select("button"));
            }
        },
        deferAnchorCounter: function(anchorElementConfig) {
            var me = this;
            me.anchorCounter.defer(350, me, [anchorElementConfig]);
        },
        anchorCounter: function(anchorElementConfig) {
            var me = this;
            if (!anchorElementConfig || typeof anchorElementConfig !== "object") {
                anchorElementConfig = {
                    direction: "tr-tl",
                    offset: [43, 5],
                    initialVal: me.msgCount ? me.msgCount : 0
                };
            }
            if (me.counter) {
                me.counter.anchorTo(me.el, anchorElementConfig.direction, anchorElementConfig.offset);
                me.setCounter(anchorElementConfig.initialVal);
                cwc.util.setToolbarARIA({
                    "toolbar": Ext.get("cwc_masthead_toolbar")
                });
            }
        },
        initCounter: function(componentType, anchorElementConfig) {
            var me = this;
            var buttonCntEl = me.btnEl.parent();
            var counterEl = Ext.DomHelper.append(buttonCntEl, {
                "tag": "div",
                "id": Ext.id(),
                "class": componentType + "-counter"
            });
            me.counter = new Ext.Element(counterEl);
            me.counter.on("click", function() {
                if (!me.disabled) {
                    me.switchStyle("enable");
                }
            });
            me.counter.addListener("mouseover", function() {
                me.switchStyle("enable");
            });
            me.counter.addListener("mouseout", function() {
                if (!me.targetPanelOpened) {
                    me.switchStyle("disable");
                }
            });
            var counterHiddenEl = Ext.DomHelper.append(buttonCntEl, {
                "tag": "div",
                "role": "alert",
                "style": "visibility:visible;position:absolute;left:-10000px;"
            });
            me.counterHiddenEl = new Ext.Element(counterHiddenEl);
            me.deferAnchorCounter(anchorElementConfig);
        },
        setCounter: function(count) {
            var me = this;
            if (count != 0 && count != me.msgCount) {
                me.startIconShake();
            }
            me.msgCount = count;
        },
        afterRender: function() {
            var me = this;
            cwc.ux.ToolbarButtonBase.superclass.afterRender.call(me);
            me.mon(me.el, {
                "mouseover": function() {
                    me.switchStyle("enable");
                },
                "mouseout": function() {
                    if (!me.targetPanelOpened) {
                        me.switchStyle("disable");
                    }
                },
                scope: me
            });
        },
        startIconShake: function() {
            var counter = this.counter;
            counter.removeClass("shake");
            setTimeout(function() {
                try {
                    counter.addClass("shake");
                } catch (e) {}
            }, 100);
        },
        stopIconShake: function() {
            this.counter.removeClass("shake");
        },
        enable: function() {
            if (this.btnEl.dom.disabled) {
                cwc.ux.ToolbarButtonBase.superclass.enable.call(this);
                cwc.util.setToolbarARIA({
                    "toolbar": Ext.get("cwc_masthead_toolbar")
                });
            }
            return this;
        },
        disable: function() {
            if (!this.btnEl.dom.disabled) {
                cwc.ux.ToolbarButtonBase.superclass.disable.call(this);
                cwc.util.setToolbarARIA({
                    "toolbar": Ext.get("cwc_masthead_toolbar")
                });
            }
            return this;
        }
    });
    Ext.reg("toolbarButtonBase", cwc.ux.ToolbarButtonBase);
})();
(function() {
    Ext.ns("cwc.ux");
    cwc.ux.ToolbarHelpButton = Ext.extend(cwc.ux.ToolbarButtonBase, {
        iconCls: "icon-help cwc-toolbar-help",
        cls: "x-btn-icon",
        xtype: "toolbarHelpButton",
        id: "toolbarHelpButtonId",
        tooltip: top.cwc.HELP,
        initComponent: function() {
            var me = this;
            cwc.ux.ToolbarHelpButton.superclass.initComponent.call(me);
            if (cwc.isHelpVisible) {
                me.menu = {
                    items: [{
                        text: cwc.HELP_ONLINE,
                        handler: function() {
                            cwc.help();
                        }
                    }, {
                        text: cwc.HELP_SHORTCUT,
                        handler: function() {
                            cwc.showKeyboardShortcutList();
                        }
                    }]
                };
            } else {
                me.handler = function() {
                    cwc.showKeyboardShortcutList();
                };
            }
        },
        onDestroy: function() {
            var me = this;
            cwc.ux.ToolbarHelpButton.superclass.onDestroy.call(me);
        },
        afterRender: function(btn) {
            var me = this;
            cwc.ux.ToolbarHelpButton.superclass.afterRender.call(me);
            if (!cwc.isHelpVisible) {
                me.setText(top.cwc.HELP);
            }
        },
        canEnable: function() {
            return true;
        }
    });
    Ext.reg("toolbarHelpButton", cwc.ux.ToolbarHelpButton);
})();
(function() {
    Ext.ns("cwc.ux");
    cwc.ux.ToolbarMessageButton = Ext.extend(cwc.ux.ToolbarButtonBase, {
        iconCls: "icon-message cwc-toolbar-messages",
        cls: "x-btn-icon",
        xtype: "toolbarMessageButton",
        id: "toolbarMessageButtonId",
        tooltip: '<span style="direction:' + cwc.getDirectionClass() + ';unicode-bidi:embed">' + top.cwc.MESSAGEBOX_TITLE + "</span>",
        handler: function() {
            top.cwc.messageManager.hideMessageBar();
            top.cwc.messageManager.showMessageHistory();
        },
        initComponent: function() {
            var me = this;
            cwc.ux.ToolbarMessageButton.superclass.initComponent.call(me);
        },
        onDestroy: function() {
            var me = this;
            cwc.ux.ToolbarMessageButton.superclass.onDestroy.call(me);
        },
        afterRender: function() {
            var me = this;
            cwc.ux.ToolbarMessageButton.superclass.afterRender.call(me);
            var parentElm = me.getEl();
            parentElm.setStyle("position", "relative");
            var tr = parentElm.first().insertHtml("beforeEnd", "<tr><td><div style='visibility:hidden' class='cwc-message-icon-tip'></div></td></tr>", true);
            top.cwc.messageManager.setIconCmp(tr.first().first());
            top.cwc.messageManager.setMessageBtn(me);
            me.originalTooltip = me.tooltip;
            me.ariaLabel = top.cwc.MESSAGEBOX_TITLE;
            if (me.el.child("button").dom.attributes["aria-label"]) {
                me.el.child("button").dom.attributes["aria-label"].value = me.ariaLabel;
            }
            me.setText(me.ariaLabel);
            Ext.fly(me.el.child("button")).set({
                "aria-haspopup": "dialog"
            });
        },
        canEnable: function() {
            return true;
        }
    });
    Ext.reg("toolbarMessageButton", cwc.ux.ToolbarMessageButton);
})();
(function() {
    Ext.ns("cwc.ux");
    cwc.ux.ToolbarUserInfoButton = Ext.extend(cwc.ux.ToolbarButtonBase, {
        iconCls: "icon-user-avatar cwc-toolbar-userinfo",
        cls: "x-btn-icon",
        xtype: "toolbarUserInfoButton",
        id: "toolbarUserInfoButtonId",
        tooltip: '<span style="direction:' + cwc.getDirectionClass() + ';unicode-bidi:embed">' + top.cwc.USER_INFO + "</span>",
        handler: function(userBtn) {
            cwc.toggleUserInfoPanel(userBtn.el);
        },
        initComponent: function() {
            var me = this;
            cwc.ux.ToolbarUserInfoButton.superclass.initComponent.call(me);
        },
        onDestroy: function() {
            var me = this;
            cwc.ux.ToolbarUserInfoButton.superclass.onDestroy.call(me);
        },
        afterRender: function() {
            var me = this;
            cwc.ux.ToolbarUserInfoButton.superclass.afterRender.call(me);
            hpsmc.DataLoader.getUserInfo(cwc.userName, me, function(userInfo) {
                if (userInfo.portrait) {
                    hpsmc.Utils.changeToolbarOperatorHeadIcon(userInfo.portrait);
                }
            });
            if (me.el.child("button").dom.attributes["aria-label"]) {
                me.el.child("button").dom.attributes["aria-label"].value = top.cwc.USER_INFO;
            }
            me.setText(top.cwc.USER_INFO);
            me.btnEl.set({
                "aria-haspopup": "dialog"
            });
        },
        canEnable: function() {
            return true;
        }
    });
    Ext.reg("toolbarUserInfoButton", cwc.ux.ToolbarUserInfoButton);
})();
/* file: cwc-Extjs-Tooltip.js */
cwc.ux.Tooltip = function(cfg) {
    cfg.width = parseInt(cfg.target.getAttribute("tooltipWidth")) || 450;
    cfg.height = parseInt(cfg.target.getAttribute("tooltipHeight")) || 350;
    var widthAdjust = Ext.getScrollBarWidth();
    cfg.width += widthAdjust;
    if (cfg.frame.getWidth() < cfg.width) {
        cfg.width = cfg.frame.getWidth() - widthAdjust;
    }
    if (cfg.frame.getHeight() < cfg.height) {
        cfg.height = cfg.frame.getHeight();
    }
    cfg.items = [{
        xtype: "hpsm-ux-iframepanel",
        loadMask: {
            msg: top.cwc.LOADING
        },
        height: parseInt(cfg.height) + 20,
        listeners: {
            domready: function(frame) {
                frame.setStyle("overflow", "auto");
            }
        },
        border: true
    }];
    cwc.ux.Tooltip.superclass.constructor.call(this, cfg);
};
Ext.extend(cwc.ux.Tooltip, Ext.ToolTip, {
    showDelay: 500,
    hideDelay: 200,
    dismissDelay: 0,
    html: null,
    autoHide: true,
    closable: false,
    trackMouse: false,
    minWidth: 210,
    maxWidth: 500,
    initTarget: function(target) {
        cwc.ux.Tooltip.superclass.initTarget.call(this, target);
        this.centerPanel = Ext.get(cwc.centerPanelId);
        this.isListDetail = cwc.getActiveTab().hasListDetail();
    },
    isTooltipVisible: function(el) {
        var p = el.dom.parentNode,
            bodyRE = /^body/i;
        while (p && !bodyRE.test(p.tagName)) {
            if (!Ext.fly(p, "_isVisible").isVisible()) {
                return false;
            }
            p = p.parentNode;
        }
        return true;
    },
    onTargetOver: function(e) {
        this.overTarget = e.getTarget(this.delegate);
        var inputEle = this.getTargetInput();
        var popupsubformenabled = inputEle.getAttribute("popupsubformenabled");
        var value = inputEle.getValue();
        var hasError = inputEle.getAttribute("hasError");
        if (popupsubformenabled == "false" || popupsubformenabled == "0" || Ext.isEmpty(value) || hasError) {
            this.disabled = true;
        } else {
            this.disabled = false;
        }
        cwc.ux.Tooltip.superclass.onTargetOver.call(this, e);
    },
    listeners: {
        beforedestroy: function(comp) {
            if (comp.isVisible()) {
                comp.hide();
            }
            this.frame = null;
            this.overTarget = null;
            Ext.destroy(this.items.items[0]);
        },
        beforeShow: function(comp) {
            if (!cwc.ux.lastPopupId) {
                cwc.ux.lastPopupId = comp.items.items[0].id;
            }
            var pid = cwc.ux.lastPopupId;
            if (pid != comp.items.items[0].id && Ext.fly(pid) && this.isTooltipVisible(Ext.fly(pid))) {
                return false;
            }
            cwc.ux.lastPopupId = comp.items.items[0].id;
            var tooltipUrl = this.getTooltipUrl();
            if (tooltipUrl != this.initialConfig.url && (cwc.frameworkContext + "/" + tooltipUrl) != this.initialConfig.url) {
                comp.items.items[0].setSrc(tooltipUrl);
                this.initialConfig.url = tooltipUrl;
            }
            return true;
        },
        show: function(comp) {
            if (comp.items.items[0].frameEl.getWidth() == 0) {
                comp.items.items[0].frameEl.setWidth(comp.getWidth() - 12);
            }
        }
    },
    getTargetInput: function() {
        return this.frame.query("#" + this.overTarget.getAttribute("inputId"))[0];
    },
    getOffset: function() {
        var offset = [0, 0];
        if (this.frame) {
            offset[0] = this.frame.getLeft();
            offset[1] = this.frame.getTop();
            if (this.isListDetail) {
                offset[1] += this.centerPanel.getTop() + this.overTarget.offsetHeight;
                offset[0] += this.centerPanel.getLeft();
            }
        }
        return offset;
    },
    afterRender: function() {
        cwc.ux.Tooltip.superclass.afterRender.call(this);
        this.items.items[0].frameEl.dom.setAttribute("title", cwc.MSG_EMPTY);
        if (!this.isCwcMouseEventInit) {
            this.isCwcMouseEventInit = true;
            this.mon(this.el, "mouseover", function() {
                this.clearTimer("hide");
                this.clearTimer("dismiss");
            }, this);
            this.mon(this.el, "mouseout", function() {
                this.clearTimer("show");
                if (this.autoHide !== false) {
                    this.delayHide();
                }
            }, this);
        }
    },
    getTargetXY: function() {
        this.targetXY[1] = Ext.lib.Dom.getXY(this.overTarget)[1] + this.overTarget.offsetHeight / 2;
        if (topCwc.isAccessibleMode) {
            this.targetXY[0] = Ext.lib.Dom.getXY(this.overTarget)[0] + this.overTarget.offsetWidth / 2;
        }
        var XY = cwc.ux.Tooltip.superclass.getTargetXY.call(this);
        this.offset = this.getOffset();
        var maxX = this.frame.getWidth() - parseInt(this.width) - Ext.getScrollBarWidth();
        if (XY[0] > maxX) {
            XY[0] = maxX;
        }
        var maxY = this.frame.getHeight() - parseInt(this.height) - this.overTarget.offsetHeight * 2;
        if (XY[1] > maxY) {
            XY[1] = maxY;
        }
        var X = XY[0] + this.offset[0];
        var Y = XY[1] + this.offset[1];
        return [X, Y];
    },
    getTooltipUrl: function() {
        var inputEle = this.getTargetInput();
        var value = inputEle.value;
        if (inputEle.getAttribute("referenceValue") != null) {
            value = inputEle.getAttribute("referenceValue");
        } else {
            if (inputEle.getValue) {
                value = inputEle.getValue();
            }
        }
        return inputEle.getAttribute("tooltipUrl") + "&hfvalue=" + encodeURIComponent(value);
    }
});
Ext.reg("cwcTooltip", cwc.ux.Tooltip);
/* file: cwc-Extjs-Keymap.js */
! function() {
    if (Ext.getVersion && typeof Ext.getVersion === "function") {
        var majorVersion = Ext.getVersion().major;
        if (majorVersion >= 4) {
            var syncModeEnabled = Ext.Loader.syncModeEnabled;
            Ext.Loader.syncModeEnabled = true;
            Ext.require("Ext.util.KeyMap");
            Ext.Loader.syncModeEnabled = syncModeEnabled;
        }
    }
}();
cwc.ux.KeyMap = function(el, config, eventName) {
    this.el = Ext.getDom(el);
    this.eventName = eventName || "keydown";
    this.bindings = [];
    if (config) {
        this.addBinding(config);
    }
    this.el.cwcKeyMap = this;
    this.specialKeys = [];
    this.enable();
};
Ext.extend(cwc.ux.KeyMap, Ext.KeyMap, {
    destroy: function() {
        this.disable();
        this.el.cwcKeyMap = null;
        this.el = null;
        this.eventName = null;
        this.bindings = null;
        this.specialKeys = null;
    },
    addBinding: function(config) {
        if (Ext.isArray(config)) {
            for (var i = 0, maxi = config.length; i < maxi; i++) {
                this.addBinding(config[i]);
            }
            return;
        }
        var keyCode = config.key,
            shift = config.shift,
            ctrl = config.ctrl,
            alt = config.alt,
            fn = config.fn || config.handler,
            scope = config.scope;
        if (config.stopEvent) {
            this.stopEvent = config.stopEvent;
        }
        if (typeof keyCode == "string") {
            var ks = [];
            var keyString = keyCode.toUpperCase();
            for (var j = 0, len = keyString.length; j < len; j++) {
                ks.push(keyString.charCodeAt(j));
            }
            keyCode = ks;
        }
        var keyArray = Ext.isArray(keyCode);
        var handler = function(e) {
            var keyMap = this;
            if (((shift && e.shiftKey) || (!shift && !e.shiftKey)) && ((ctrl && e.ctrlKey) || (!ctrl && !e.ctrlKey)) && ((alt && e.altKey) || (!alt && !e.altKey))) {
                var k = e.keyCode || e.which;
                if (keyArray) {
                    for (var i = 0, len = keyCode.length; i < len; i++) {
                        if (keyCode[i] == k) {
                            if (keyMap.stopEvent) {
                                e.stopEvent();
                            }
                            fn.call(scope || window, k, e);
                            return;
                        }
                    }
                } else {
                    if (k == keyCode) {
                        if (keyMap.stopEvent) {
                            e.stopEvent();
                        }
                        fn.call(scope || window, k, e);
                    }
                }
            }
        };
        this.bindings.push(handler);
    },
    handleKey: function(e) {
        var sourceControl = e.target || e.srcElement;
        if (sourceControl && sourceControl.stopFurtherKeyHandle === true) {
            sourceControl.stopFurtherKeyHandle = false;
            return;
        }
        if (sourceControl.menu && sourceControl.menu.isVisible()) {
            if (sourceControl.menu.handleCalendar) {
                sourceControl.menu.handleCalendar(null, sourceControl, e);
            }
            return;
        }
        var inputElem = Ext.isIE ? e.srcElement : e.target;
        if (inputElem && inputElem.id.indexOf("-datepicker-timefield") >= 0) {
            return;
        }
        var keyMap = (Ext.isIE8) ? this.document.cwcKeyMap : this.cwcKeyMap;
        if (keyMap && keyMap.enabled) {
            if (!(Ext.getBody().isMasked() || cwc.messageBoxShown)) {
                var b = keyMap.bindings;
                for (var i = 0, len = b.length; i < len; i++) {
                    b[i].call(keyMap, e);
                }
            } else {
                keyMap.cancelEvent(e);
            }
        }
    },
    cancelEvent: function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        if (e.stopEvent) {
            e.stopEvent();
        }
        if (e.preventDefault) {
            e.preventDefault();
        }
        if (Ext.isIE) {
            e.cancelBubble = true;
            e.returnValue = false;
            if (!e.altKey) {
                try {
                    e.keyCode = 0;
                } catch (e) {}
            }
        }
    },
    handleSpecialKey: function(e) {
        var keyMap = (Ext.isIE8) ? this.document.cwcKeyMap : this.cwcKeyMap;
        if (keyMap && keyMap.enabled) {
            if (Ext.getBody().isMasked() || cwc.messageBoxShown) {
                var keyCode = e.keyCode || e.which;
                if (cwc.messageBoxShown && keyCode == 9) {
                    return true;
                }
                keyMap.cancelEvent(e);
                if (cwc.messageBoxShown && (keyCode === 32 || keyCode === 13)) {
                    var targetButton = e.srcElement || e.target;
                    targetButton.click();
                }
                return false;
            }
            for (var i = 0; i < keyMap.specialKeys.length; i++) {
                if (keyMap.specialKeys[i] && keyMap.specialKeys[i].needDisable(e)) {
                    keyMap.cancelEvent(e);
                    return false;
                }
            }
        }
        return true;
    },
    registerSpecialKeys: function() {
        var f1 = {
            key: 112,
            needDisable: function(e) {
                return this.key == (e.keyCode || e.which);
            }
        };
        var f5 = {
            key: 116,
            needDisable: function(e) {
                return this.key == (e.keyCode || e.which);
            }
        };
        var backspace = {
            key: 8,
            needDisable: function(e) {
                var source = e.srcElement || e.target;
                if (!source) {
                    return this.key == (e.keyCode || e.which);
                }
                var tagName = source.tagName.toLowerCase();
                if (tagName == "svg") {
                    source = source.parentNode;
                    tagName = source.tagName.toLowerCase();
                }
                var className = source.className && source.className.toLowerCase();
                var isValidWidget = ("input" == tagName && (source.type == "text" || source.type == "password" || source.type === "search")) || "textarea" == tagName || "body" == tagName && className && className.indexOf("cke_") > -1;
                var isReadonly = ((className && className.indexOf("readonly") > 0) || source.readOnly);
                return this.key == (e.keyCode || e.which) && (!isValidWidget || isReadonly);
            }
        };
        var leftKey = {
            key: 37,
            needDisable: function(e) {
                return this.key == (e.keyCode || e.which) && e.altKey;
            }
        };
        var rightKey = {
            key: 39,
            needDisable: function(e) {
                return this.key == (e.keyCode || e.which) && e.altKey;
            }
        };
        this.specialKeys.push(f1, f5, backspace, leftKey, rightKey);
    },
    enable: function() {
        if (!this.enabled) {
            this.enabled = true;
            var dom = this.el;
            if (!dom) {
                return;
            }
            var phase = true;
            if (dom.addEventListener) {
                dom.addEventListener("keydown", this.handleSpecialKey, false);
                dom.addEventListener(this.eventName, this.handleKey, phase);
            } else {
                if (dom.attachEvent) {
                    dom.attachEvent("onkeydown", this.handleSpecialKey);
                    dom.attachEvent("on" + this.eventName, this.handleKey);
                }
            }
        }
        this.registerSpecialKeys();
    },
    disable: function() {
        var dom = this.el;
        var phase = true;
        if (dom.addEventListener) {
            dom.removeEventListener("keydown", this.handleSpecialKey, false);
            dom.removeEventListener(this.eventName, this.handleKey, phase);
        } else {
            if (dom.attachEvent) {
                dom.detachEvent("onkeydown", this.handleSpecialKey);
                dom.detachEvent("on" + this.eventName, this.handleKey);
            }
        }
    }
});
/* file: cwc-Extjs-FavMgrLoader.js */
cwc.ux.FavLoader = Ext.extend(Ext.tree.TreeLoader, {
    XML_NODE_ELEMENT: 1,
    XML_NODE_TEXT: 3,
    processResponse: function(response, node, callback) {
        var xmlData = response.responseXML;
        var root = xmlData.documentElement || xmlData;
        this.renderTree(node, root, "", response, callback);
    },
    renderTree: function(node, root, searchValue, response, callback) {
        try {
            node.beginUpdate();
            node.appendChild(this.parseXml(root, searchValue));
            node.endUpdate();
            var root = cwc.util.getRootNode(node);
            var lastFocusNode;
            if (root.id !== node.id) {
                lastFocusNode = Ext.get(node.ui.anchor);
                node = root;
            }
            node.ownerTree.firstNode = node.firstChild;
            var lastNode = cwc.util.getLastNode(node.childNodes);
            node.ownerTree.lastNode = lastNode;
            var firstChild = Ext.get(node.ownerTree.firstNode.ui.anchor);
            firstChild.set({
                "tabindex": "0"
            });
            node.ownerTree.lastFocusedNode = lastFocusNode ? lastFocusNode : firstChild;
            node.ownerTree.body.set({
                "role": "tree",
                "aria-label": cwc.FAVMGR_TITLE,
                "aria-multiselectable": "true"
            });
            if (callback) {
                this.runCallback(callback, scope || node, [node]);
            }
        } catch (e) {
            this.handleFailure(response);
        }
        cwc.updateFavMgrFinished = true;
    },
    parseXml: function(node, searchValue) {
        var nodes = [];
        for (var i = 0, maxi = node.childNodes.length; i < maxi; i++) {
            var n = node.childNodes[i];
            if (n.nodeType == this.XML_NODE_ELEMENT) {
                var treeNode = this.createNode(n, searchValue);
                if (n.childNodes.length > 0) {
                    var child = this.parseXml(n, searchValue);
                    if (typeof child == "string") {
                        treeNode.attributes.innerText = child;
                    } else {
                        treeNode.appendChild(child);
                    }
                }
                if (cwc.isShowPrivateFavoritesOnly()) {
                    if (treeNode.attributes["public"] === "false") {
                        nodes.push(treeNode);
                    }
                } else {
                    nodes.push(treeNode);
                }
            } else {
                if (n.nodeType == this.XML_NODE_TEXT) {
                    var text = n.nodeValue.trim();
                    if (text.length > 0) {
                        return nodes = text;
                    }
                }
            }
        }
        return nodes;
    },
    createNode: function(xmlNode, searchValue) {
        var attr = {
            uiProvider: cwc.ux.NavTreeNodeUI,
            tagName: xmlNode.tagName
        };
        if (searchValue) {
            attr.searchValue = searchValue;
            attr.searchFlag = true;
        }
        for (var i = 0, maxi = xmlNode.attributes.length; i < maxi; i++) {
            var a = xmlNode.attributes[i];
            attr[a.nodeName] = a.nodeValue;
        }
        this.processAttributes(attr);
        if (this.baseAttrs) {
            Ext.applyIf(attr, this.baseAttrs);
        }
        if (this.applyLoader !== false && !attr.loader) {
            attr.loader = this;
        }
        if (Ext.isString(attr.uiProvider)) {
            attr.uiProvider = this.uiProviders[attr.uiProvider] || eval(attr.uiProvider);
        }
        var result;
        if (attr.nodeType) {
            result = new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);
        } else {
            result = attr.leaf ? new cwc.ux.TreeNode(attr) : new cwc.ux.AsyncTreeNode(attr);
        }
        result.clickHandler = function(node, evtObj) {
            if (top.navigationHandler) {
                top.navigationHandler(node.attributes, node);
            } else {
                if (cwc.noTabsLayout) {
                    cwc.updateActiveTab(node.attributes.url);
                } else {
                    cwc.openNewTabPanel(node.attributes, node, true);
                }
            }
        };
        result.on("click", function(node, evtObj) {
            this.clickHandler(node, evtObj);
        });
        result.on("dblclick", function(node, evtObj) {
            this.clickHandler(node, evtObj);
        });
        return result;
    },
    listeners: {
        beforeload: function(treeLoader, node) {
            this.baseParams.id = node.attributes.id;
        }
    },
    processAttributes: function(attr) {
        attr["idParam"] = attr.id;
        if (cwc.showNavIcon === true) {
            attr.icon = attr.image;
        } else {
            if (!attr.iconCls) {
                attr.iconCls = "cwc-tree-noIcon-node";
            }
        }
        attr.text = attr.name;
        attr.qtip = attr.name;
        attr.leaf = (attr.tagName == "leaf" || attr["class"] == "classList" || attr["class"] == "classRecord");
        attr.checked = false;
        attr.loader = this;
        var builder = cwc.getURLBuilder();
        builder.setPath(this.dataUrl);
        builder.addParam("name", "navEdit");
        builder.addParam("id", encodeURIComponent(attr.id));
        attr.url = builder.toURL();
    }
});
/* file: cwc-Extjs-NavToolbar.js */
Ext.namespace("cwc.favMgr");
cwc.favMgr.copyMoveHandler = function(item, evt) {
    var tree = Ext.getCmp(cwc.favMgrTreeId);
    var root = tree.getRootNode();
    var destNode = root.findChild("id", item.nodeId);
    var msg = "",
        msgCount = 0,
        checkedNodes = tree.getChecked(),
        selectedNodes = [],
        labels = {};
    if (item.moveItem) {
        labels.title = cwc.MOVE_FAVORITES;
        labels.confirm = cwc.MOVE_FAVORITES_CONFIRM;
        labels.mgs1 = cwc.MOVE_FAVORITES_MSG1;
        labels.msg2 = cwc.MOVE_FAVORITES_MSG2;
    } else {
        labels.title = cwc.COPY_FAVORITES;
        labels.confirm = cwc.COPY_FAVORITES_CONFIRM;
        labels.mgs1 = cwc.COPY_FAVORITES_MSG1;
        labels.msg2 = cwc.COPY_FAVORITES_MSG2;
    }
    if (checkedNodes.length == 0) {
        cwc.favMgr.warnSelectOneItem(labels.title);
        return;
    }
    selectedNodes = checkedNodes;
    var dialog = Ext.Msg.getDialog();
    cwc.util.setDialogARIA(dialog);
    if (msgCount > 0) {
        var listBoxStyle = (msgCount < 11) ? "" : "overflow-y:auto; overflow-x:hidden; height:145px; border:1px solid #8DB2E3;";
        msg = "<div>" + labels.mgs1 + "<br>&#160;</div>" + '<div style="padding-left:16px;' + listBoxStyle + '"><ul style="list-style-type:disc;">' + msg + "</ul></div>" + "<div>&#160;<br>" + labels.mgs2 + "</div>";
        Ext.MessageBox.show({
            title: labels.title,
            msg: msg,
            width: 400,
            buttons: Ext.MessageBox.OK,
            animEl: cwc.btnFavMore,
            icon: Ext.MessageBox.INFO,
            fn: function() {
                if (cwc.isIE8) {
                    dialog.getEl().removeClass("x-show");
                }
            }
        });
    } else {
        Ext.MessageBox.confirm(labels.title, labels.confirm, function(btnId) {
            if (btnId === "yes") {
                var action = (item.moveItem) ? "navMoveNode" : "navCopyNode";
                var url = cwc.frameworkContext + "/cwc/nav.menu?name=" + action;
                url += "&id=" + encodeURIComponent(item.nodeId);
                for (var i = 0, maxi = selectedNodes.length; i < maxi; i++) {
                    var node = selectedNodes[i];
                    if (item.nodeId !== node.id) {
                        url += "&selected=" + encodeURIComponent(node.id);
                    }
                }
                Ext.Ajax.request({
                    method: "POST",
                    url: url,
                    success: function() {
                        cwc.clearSearchTreeCache();
                        cwc.updateNavFavorites();
                    },
                    failure: function(response) {
                        if (response.responseText) {
                            var message = cwc[response.responseText];
                            cwc.showMessage("error", message, 0, labels.title);
                        }
                        cwc.clearSearchTreeCache();
                        cwc.updateNavFavorites();
                    }
                });
            }
            if (cwc.MOVE_FAVORITES == labels.title) {
                Ext.getCmp(cwc.btnFavMoveTo).focus();
            } else {
                if (cwc.COPY_FAVORITES == labels.title) {
                    Ext.getCmp(cwc.btnFavCopyTo).focus();
                }
            }
            if (cwc.isIE8) {
                dialog.getEl().removeClass("x-show");
            }
        });
    }
    cwc.changeMsgButtonStyle(dialog);
    Ext.getCmp(cwc.btnFavMoveTo).menu.loaded = false;
    Ext.getCmp(cwc.btnFavCopyTo).menu.loaded = false;
};
cwc.favMgr.deleteHandler = function(item, evt) {
    var tree = Ext.getCmp(cwc.favMgrTreeId);
    var msg = "",
        msgCount = 0,
        checkedNodes = tree.getChecked(),
        selectedNodes = [];
    if (checkedNodes.length == 0) {
        cwc.favMgr.warnSelectOneItem(cwc.DELETE_FAVORITES);
        return;
    }
    for (var i = 0, maxi = checkedNodes.length; i < maxi; i++) {
        var node = checkedNodes[i];
        if (node.attributes.canDelete === "true") {
            selectedNodes.push(node);
        } else {
            node.getUI().toggleCheck();
            msg += ("<li>" + node.text + "</li>");
            msgCount++;
        }
    }
    var dialog = Ext.Msg.getDialog();
    cwc.util.setDialogARIA(dialog);
    if (msgCount > 0) {
        var listBoxStyle = (msgCount < 11) ? "" : "overflow-y:auto; overflow-x:hidden; height:145px; border:1px solid #8DB2E3;";
        msg = "<div>" + cwc.DELETE_FAVORITES_MSG1 + "<br>&#160;</div>" + '<div style="padding-left:16px;' + listBoxStyle + '"><ul style="list-style-type:disc;">' + msg + "</ul></div>" + "<div>&#160;<br>" + cwc.DELETE_FAVORITES_MSG2 + "</div>";
        Ext.MessageBox.show({
            title: cwc.DELETE_FAVORITES,
            msg: msg,
            width: 400,
            buttons: Ext.MessageBox.OK,
            animEl: cwc.btnFavMore,
            fn: function() {
                Ext.getCmp(cwc.btnFavDelete).focus();
                if (cwc.isIE8) {
                    dialog.getEl().removeClass("x-show");
                }
            },
            icon: Ext.MessageBox.INFO
        });
    } else {
        Ext.MessageBox.confirm(cwc.DELETE_FAVORITES, cwc.DELETE_FAVORITES_CONFIRM, function(btnId) {
            if (btnId === "yes") {
                var node = (checkedNodes.length == 1) ? checkedNodes[0] : tree.getRootNode();
                var url = cwc.frameworkContext + "/cwc/nav.menu?name=navDelNode&id=" + encodeURIComponent(node.id);
                for (var i = 0, maxi = selectedNodes.length; i < maxi; i++) {
                    var node = selectedNodes[i];
                    url += "&selected=" + encodeURIComponent(node.id);
                    node.remove(true);
                }
                Ext.Ajax.request({
                    method: "POST",
                    url: url,
                    success: function() {
                        cwc.updateNavFavorites();
                        cwc.clearSearchTreeCache();
                    },
                    failure: function() {
                        cwc.updateNavFavorites();
                        cwc.clearSearchTreeCache();
                    }
                });
            }
            Ext.getCmp(cwc.btnFavDelete).focus();
            if (cwc.isIE8) {
                dialog.getEl().removeClass("x-show");
            }
        });
        Ext.getCmp(cwc.btnFavMoveTo).menu.loaded = false;
        Ext.getCmp(cwc.btnFavCopyTo).menu.loaded = false;
    }
    cwc.changeMsgButtonStyle(dialog);
};
cwc.favMgr.warnSelectOneItem = function(title) {
    var dialog = Ext.Msg.getDialog();
    cwc.util.setDialogARIA(dialog);
    Ext.MessageBox.show({
        title: title,
        msg: cwc.FAVMGR_SELECT_AN_ITEM,
        width: 400,
        buttons: Ext.MessageBox.OK,
        animEl: cwc.btnFavMore,
        fn: function(btnValue, text, target) {
            switch (target.title) {
                case cwc.DELETE_FAVORITES:
                    Ext.getCmp(cwc.btnFavDelete).focus();
                    break;
                case cwc.MOVE_FAVORITES:
                    Ext.getCmp(cwc.btnFavMoveTo).focus();
                    break;
                case cwc.COPY_FAVORITES:
                    Ext.getCmp(cwc.btnFavCopyTo).focus();
                    break;
            }
            if (cwc.isIE8) {
                dialog.getEl().removeClass("x-show");
            }
        },
        icon: Ext.MessageBox.WARNING
    });
    cwc.changeMsgButtonStyle(dialog);
};
cwc.favMgr.loadCopyMoveMenu = function() {
    var favMoveToMenu = Ext.getCmp(cwc.btnFavMoveTo).menu;
    var favCopyToMenu = Ext.getCmp(cwc.btnFavCopyTo).menu;
    if (favMoveToMenu.items && favMoveToMenu.items.getCount() > 0) {
        favMoveToMenu.removeAll();
    }
    if (favCopyToMenu.items && favCopyToMenu.items.getCount() > 0) {
        favCopyToMenu.removeAll();
    }
    var nodes = Ext.getCmp(cwc.favMgrTreeId).getRootNode().childNodes;
    cwc.favMgr.genCopyMoveMenu(nodes, favCopyToMenu, favMoveToMenu);
    favCopyToMenu.loaded = true;
    favMoveToMenu.loaded = true;
};
cwc.favMgr.clearLoadCopyMoveMenu = function() {
    var favMoveToMenu = Ext.getCmp(cwc.btnFavMoveTo).menu;
    var favCopyToMenu = Ext.getCmp(cwc.btnFavCopyTo).menu;
    favCopyToMenu.loaded = false;
    favMoveToMenu.loaded = false;
};
cwc.favMgr.genCopyMoveMenu = function(nodes, favCopyToMenu, favMoveToMenu) {
    if (nodes) {
        for (var i = 0, maxi = nodes.length; i < maxi; i++) {
            var node = nodes[i];
            if (!node.attributes.checked) {
                if (cwc.favMgr.hasValidNodeInChildNodes(node)) {
                    var cfg = cwc.favMgr.getCfg(node);
                    cfg.menu = {
                        items: []
                    };
                    favCopyToMenu.add(cfg);
                    cfg.moveItem = true;
                    favMoveToMenu.add(cfg);
                    cwc.favMgr.addSubMenu(node, favCopyToMenu, favMoveToMenu);
                } else {
                    cwc.favMgr.addMainMenu(node, favCopyToMenu, favMoveToMenu);
                }
            }
        }
    }
};
cwc.favMgr.addMainMenu = function(node, favCopyToMenu, favMoveToMenu) {
    if (cwc.favMgr.isFolderOrDashboard(node)) {
        var cfg = cwc.favMgr.getCfg(node);
        favCopyToMenu.add(cfg);
        cfg.moveItem = true;
        favMoveToMenu.add(cfg);
    }
};
cwc.favMgr.addSubMenu = function(node, favCopyToMenu, favMoveToMenu) {
    if (cwc.favMgr.isFolderOrDashboard(node)) {
        var childNodes = node.childNodes;
        if (childNodes) {
            for (var j = 0, maxi = childNodes.length; j < maxi; j++) {
                var childNode = childNodes[j];
                if (cwc.favMgr.isFolderOrDashboard(childNode) && !childNode.attributes.checked) {
                    var cfg = cwc.favMgr.getCfg(childNode);
                    var nodeAttrId = node.attributes.id;
                    var childCopyMenu = favCopyToMenu.find("nodeId", nodeAttrId)[0].menu;
                    var childMoveMenu = favMoveToMenu.find("nodeId", nodeAttrId)[0].menu;
                    if (cwc.favMgr.hasValidNodeInChildNodes(childNode)) {
                        cfg.menu = {
                            items: []
                        };
                        childCopyMenu.add(cfg);
                        cfg.moveItem = true;
                        childMoveMenu.add(cfg);
                        cwc.favMgr.addSubMenu(childNode, childCopyMenu, childMoveMenu);
                    } else {
                        childCopyMenu.add(cfg);
                        cfg.moveItem = true;
                        childMoveMenu.add(cfg);
                    }
                }
            }
        }
    }
};
cwc.favMgr.getCfg = function(node) {
    return cfg = {
        text: node.attributes.text,
        nodeId: node.attributes.id,
        moveItem: false,
        handler: function(item, evt) {
            cwc.favMgr.copyMoveHandler(item, evt);
        }
    };
};
cwc.favMgr.isFolderOrDashboard = function(node) {
    var isFolderOrDashboard = false;
    if (node) {
        var nodeClass = node.attributes["class"];
        if (nodeClass == "favoritesfolder" || nodeClass == "dashboard") {
            isFolderOrDashboard = true;
        }
    }
    return isFolderOrDashboard;
};
cwc.favMgr.hasValidNodeInChildNodes = function(node) {
    var hasValidNodeInChildNodes = false;
    if (node) {
        var childNodes = node.childNodes;
        if (childNodes && childNodes.length > 0) {
            for (var i = 0; i < childNodes.length; i++) {
                if (cwc.favMgr.isFolderOrDashboard(childNodes[i]) && !childNodes[i].attributes.checked) {
                    hasValidNodeInChildNodes = true;
                    break;
                }
            }
        }
    }
    return hasValidNodeInChildNodes;
};
cwc.favMgr.newFolderChart = function(type, title, msg) {
    var tree = Ext.getCmp(cwc.favMgrTreeId);
    var checkedNodes = tree.getChecked();
    var warnMsg;
    if (checkedNodes.length > 1) {
        warnMsg = cwc.FAVMGR_SELECT_ONE_FOLDER;
    } else {
        if (checkedNodes && (checkedNodes.length == 1) && (checkedNodes[0].leaf || checkedNodes[0].attributes["class"] == "dashboard") && checkedNodes[0].attributes["class"] != "favoritesfolder") {
            warnMsg = cwc.FAVMGR_SELECT_TARGET_FOLDER;
        }
    }
    var dialog = Ext.Msg.getDialog();
    if (warnMsg) {
        cwc.util.setDialogARIA(dialog);
        Ext.MessageBox.show({
            title: title,
            msg: warnMsg,
            buttons: Ext.MessageBox.OK,
            fn: function() {
                Ext.getCmp(cwc.favAddFolderChartId).focus();
                if (cwc.isIE8) {
                    dialog.getEl().removeClass("x-show");
                }
            },
            icon: Ext.MessageBox.INFO
        });
        cwc.changeMsgButtonStyle(dialog);
        return;
    }
    cwc.util.setDialogARIA(dialog);
    Ext.MessageBox.prompt(title, msg, function(btn, label) {
        if (btn == "ok" && label != null) {
            var node = (checkedNodes.length == 1) ? checkedNodes[0] : tree.getRootNode();
            var url = cwc.frameworkContext + "/cwc/nav.menu?name=navAddNode&id=" + encodeURIComponent(node.id) + "&class=" + type + "&label=" + encodeURIComponent(label);
            Ext.Ajax.request({
                method: "POST",
                url: url,
                success: function() {
                    cwc.updateNavFavorites();
                    cwc.clearSearchTreeCache();
                },
                failure: function() {
                    cwc.updateNavFavorites();
                    cwc.clearSearchTreeCache();
                }
            });
        }
        Ext.getCmp(cwc.favAddFolderChartId).focus();
        if (cwc.isIE8) {
            dialog.getEl().removeClass("x-show");
        }
    });
    cwc.changeMsgButtonStyle(dialog);
    Ext.getCmp(cwc.btnFavMoveTo).menu.loaded = false;
    Ext.getCmp(cwc.btnFavCopyTo).menu.loaded = false;
};
cwc.favMgr.navToolbarFocus = function(target) {
    if (target && target.ownerCt && target.ownerCt.btnEl) {
        target.ownerCt.btnEl.focus();
    }
};
cwc.ux.NavToolbar = function(config) {
    config.id = cwc.navToolBarId;
    config.height = cwc.isAccessibleMode ? 30 : 28;
    var privateOnly = cwc.isShowPrivateFavoritesOnly();
    if (cwc.hasUserFavorites) {
        config.items = [{
            id: cwc.favManage,
            iconCls: "icon-settings cwc-toolbar-favManage",
            cls: "x-btn-icon",
            tooltip: cwc.NAVMENU_SHORTCUT_MANAGE,
            enableToggle: true,
            hidden: !cwc.showFavMgrBtn,
            handler: function() {
                if (cwc.searchTreeHasExpanded()) {
                    Ext.getCmp("navSearchInput").resetTree();
                    cwc.switchNavDisplay();
                }
            },
            listeners: {
                "render": function() {
                    this.setText(cwc.NAVMENU_SHORTCUT_MANAGE);
                }
            }
        }, {
            id: cwc.btnFavShowFavorites,
            iconCls: privateOnly ? "icon-private-favorites cwc-toolbar-private-favorites" : "icon-all-favorites cwc-toolbar-all-favorites",
            cls: "x-btn-icon",
            tooltip: cwc.FAVMGR_SHOW_PRIVATE_FAVORITES_ONLY,
            hidden: cwc.showFavoritesBtn(),
            handler: function() {
                if (cwc.searchTreeHasExpanded()) {
                    Ext.getCmp("navSearchInput").resetTree();
                    cwc.saveFavoritesDisplayMode();
                    cwc.updateFavoritesBtnCls();
                    cwc.updateNavFavorites();
                }
            },
            listeners: {
                "render": function(btn) {
                    this.setText(top.cwc.FAVMGR_SHOW_PRIVATE_FAVORITES_ONLY);
                    if (privateOnly) {
                        btn.btnEl.dom.setAttribute("aria-pressed", true);
                    } else {
                        btn.btnEl.dom.setAttribute("aria-pressed", false);
                    }
                }
            }
        }, {
            id: cwc.favRefresh,
            iconCls: "icon-refresh cwc-toolbar-refresh",
            cls: "x-btn-icon",
            tooltip: cwc.REFRESH,
            hidden: !cwc.showReloadNavBtn,
            handler: function() {
                if (cwc.searchTreeHasExpanded()) {
                    Ext.getCmp("navSearchInput").resetTree();
                    cwc.clearSearchTreeCache();
                    cwc.updateNavFavorites();
                }
            },
            listeners: {
                "render": function() {
                    this.setText(cwc.REFRESH);
                }
            }
        }, {
            id: cwc.favAddFolderChartId,
            hidden: true,
            iconCls: "icon-new-folder cwc-toolbar-favAddFolder",
            cls: "x-btn-icon",
            tooltip: cwc.NAVMENU_ADD_FOLDERCHART,
            listeners: {
                "render": function() {
                    this.setText(cwc.NAVMENU_ADD_FOLDERCHART);
                }
            },
            menu: {
                listeners: {
                    beforeshow: function() {
                        cwc.showShims();
                    },
                    beforehide: function() {
                        cwc.hideShims();
                    },
                    hide: function(target) {
                        cwc.favMgr.navToolbarFocus(target);
                    },
                    scope: cwc
                },
                items: [{
                    iconCls: "cwc-toolbar-favNewFolder",
                    text: cwc.FAVMGR_BTN_NEWFOLDER,
                    handler: function() {
                        cwc.favMgr.newFolderChart("folder", cwc.FAVMGR_NEWFOLDER, cwc.FAVMGR_PROMT_FOLDERNAME);
                    }
                }, {
                    iconCls: "cwc-toolbar-favNewChart",
                    text: cwc.FAVMGR_BTN_NEWDASHBOARD,
                    handler: function() {
                        cwc.favMgr.newFolderChart("dashboard", cwc.FAVMGR_NEWCHART, cwc.FAVMGR_PROMT_CHARTNAME);
                    }
                }]
            }
        }, {
            id: cwc.btnFavSep,
            xtype: "tbseparator",
            hidden: true
        }, {
            id: cwc.btnFavMoveTo,
            cls: "x-btn-icon",
            iconCls: "icon-move-to cwc-toolbar-favMoveTo",
            tooltip: cwc.FAVMGR_BTN_MOVETO_TIP,
            hidden: true,
            listeners: {
                "render": function() {
                    this.setText(cwc.FAVMGR_BTN_MOVETO_TIP);
                }
            },
            menu: {
                enableScrolling: true,
                listeners: {
                    beforerender: function(menu) {
                        if (!menu.loaded) {
                            cwc.favMgr.loadCopyMoveMenu();
                        }
                    },
                    beforeshow: function(menu) {
                        cwc.showShims();
                        if (!menu.loaded) {
                            cwc.favMgr.loadCopyMoveMenu();
                        }
                        return true;
                    },
                    beforehide: function() {
                        cwc.hideShims();
                    },
                    hide: function(target) {
                        cwc.favMgr.navToolbarFocus(target);
                    },
                    scope: cwc
                }
            }
        }, {
            id: cwc.btnFavCopyTo,
            cls: "x-btn-icon",
            iconCls: "icon-copy-more cwc-toolbar-favCopyTo",
            tooltip: cwc.FAVMGR_BTN_COPYTO_TIP,
            hidden: true,
            listeners: {
                "render": function() {
                    this.setText(cwc.FAVMGR_BTN_COPYTO_TIP);
                }
            },
            menu: {
                enableScrolling: true,
                listeners: {
                    beforerender: function(menu) {
                        if (!menu.loaded) {
                            cwc.favMgr.loadCopyMoveMenu();
                        }
                    },
                    beforeshow: function(menu) {
                        cwc.showShims();
                        if (!menu.loaded) {
                            cwc.favMgr.loadCopyMoveMenu();
                        }
                        return true;
                    },
                    beforehide: function() {
                        cwc.hideShims();
                    },
                    hide: function(target) {
                        cwc.favMgr.navToolbarFocus(target);
                    },
                    scope: cwc
                }
            }
        }, {
            id: cwc.btnFavDelete,
            cls: "x-btn-icon",
            iconCls: "icon-delete cwc-toolbar-favDelete",
            tooltip: cwc.FAVMGR_BTN_DELETE_TIP,
            hidden: true,
            listeners: {
                "render": function() {
                    this.setText(cwc.FAVMGR_BTN_DELETE_TIP);
                }
            },
            handler: function() {
                cwc.favMgr.deleteHandler();
            }
        }];
    } else {
        config.items = [{
            id: cwc.favRefresh,
            iconCls: "icon-refresh cwc-toolbar-refresh",
            cls: "x-btn-icon",
            tooltip: cwc.REFRESH,
            hidden: !cwc.showReloadNavBtn,
            handler: function() {
                if (cwc.searchTreeHasExpanded()) {
                    Ext.getCmp("navSearchInput").resetTree();
                    cwc.clearSearchTreeCache();
                    cwc.updateNavFavorites();
                }
            },
            listeners: {
                "render": function() {
                    this.setText(cwc.REFRESH);
                }
            }
        }];
    }
    if (cwc.toggleRecordListEnabled) {
        var needSeparator = false;
        for (var i = 0, len = config.items.length; i < len; i++) {
            if (config.items[i].xtype != "tbseparator" && config.items[i].hidden === false) {
                needSeparator = true;
                break;
            }
        }
        if (needSeparator) {
            config.items.push("-");
        }
        config.items.push({
            id: cwc.btnToggleRecordList,
            iconCls: cwc.preferredViewRecordList ? "icon-record-list cwc-toolbar-recordlist" : "icon-list-detail cwc-toolbar-recordlist",
            cls: "x-btn-icon",
            tooltip: cwc.preferredViewRecordList ? cwc.NAVMENU_TOGGLE_RECORDLIST_OFF : cwc.NAVMENU_TOGGLE_RECORDLIST_ON,
            enableToggle: true,
            pressed: cwc.preferredViewRecordList,
            handler: function() {
                if (!this.pressed) {
                    this.setIconClass("icon-list-detail cwc-toolbar-recordlist");
                } else {
                    this.setIconClass("icon-record-list cwc-toolbar-recordlist");
                }
                cwc.toggleRecordList();
            }
        });
    }
    config.items.push(["->", {
        id: cwc.btnExpand,
        iconCls: "icon-expand-left-no-circle cwc-toolbar-chevron-left",
        cls: "x-btn-icon",
        tooltip: cwc.NAVMENU_COLLAPSE,
        listeners: {
            "render": function() {
                this.setText(cwc.NAVMENU_COLLAPSE);
            }
        },
        handler: function() {
            Ext.getCmp("cwcNavPanel").collapse(true);
        }
    }]);
    var addListener = function(btnCfg) {
        if (!Ext.isObject(btnCfg)) {
            return;
        }
        if (!btnCfg.listeners) {
            btnCfg.listeners = {};
        }
        btnCfg.listeners.afterrender = function(btn) {
            if (btn.btnEl) {
                cwc.setProperty(btn.btnEl, {
                    "aria-label": btn.tooltip
                });
                if (btnCfg.menu) {
                    cwc.setProperty(btn.btnEl, {
                        "role": "button",
                        "aria-haspopup": "true",
                        "aria-label": btn.tooltip
                    });
                    btn.btnEl.parent().removeClass("x-btn-arrow");
                }
            }
        };
        if (btnCfg.menu) {
            btnCfg.listeners.menushow = function(btn, menu) {
                cwc.setMenuAria(menu);
                menu.setActiveItem(menu.items.get(0), false);
            };
            btnCfg.listeners.menuhide = function(btn, menu) {
                if (menu.ul) {
                    cwc.setProperty(btn.btnEl, {
                        "aria-expanded": "false"
                    });
                }
                btn.btnEl.focus();
            };
        }
    };
    for (var i = 0, itemsLen = config.items.length; i < itemsLen; i++) {
        if (Ext.isArray(config.items[i])) {
            for (var j = 0, itemsArrayLen = config.items[i].length; j < itemsArrayLen; j++) {
                addListener(config.items[i][j]);
            }
        } else {
            addListener(config.items[i]);
        }
    }
    cwc.ux.NavToolbar.superclass.constructor.call(this, config);
};
Ext.extend(cwc.ux.NavToolbar, Ext.Toolbar);
/* file: cwc-Extjs-StateProvider.js */
cwc.ux.StateProvider = Ext.extend(Ext.state.Provider, {
    KEY_PREFIX: "cwc_ux_",
    constructor: function(config) {
        cwc.ux.StateProvider.superclass.constructor.call(this);
        Ext.apply(this, config);
        this.state = this.readStorage();
    },
    set: function(name, value) {
        if (typeof value == "undefined" || value === null) {
            this.clear(name);
            return;
        }
        this.setStorage(name, value);
        cwc.ux.StateProvider.superclass.set.call(this, name, value);
    },
    clear: function(name) {
        this.clearStorage(name);
        cwc.ux.StateProvider.superclass.clear.call(this, name);
    },
    readStorage: function() {
        var storage = {};
        var items = this.store.items();
        for (var p in items) {
            if (p && p.substring(0, this.KEY_PREFIX.length) === this.KEY_PREFIX) {
                storage[p.substring(this.KEY_PREFIX.length)] = this.store.getItem(p);
            }
        }
        return storage;
    },
    setStorage: function(name, value) {
        this.store.setItem(this.wrapKey(name), value);
    },
    clearStorage: function(name) {
        this.store.removeItem(this.wrapKey(name));
    },
    wrapKey: function(key) {
        return this.KEY_PREFIX + key;
    }
});
Ext.namespace("cwc.ux");
cwc.ux.ToolbarComboBox = function(cfg) {
    if (cfg.storeConfig) {
        cfg.store = new Ext.data.JsonStore(cfg.storeConfig);
        cfg.store.loadEncodedJsonData = function(encodedData, append) {
            var data = Ext.decode(encodedData);
            cfg.store.loadData(data, append);
        };
    }
    cwc.ux.ToolbarComboBox.superclass.constructor.call(this, cfg);
};
Ext.extend(cwc.ux.ToolbarComboBox, Ext.form.ComboBox, {
    lazyInit: false,
    typeAhead: true,
    triggerAction: "all",
    mode: "local",
    listClass: cwc.getDirectionClass(),
    initList: function() {
        if (!this.tpl) {
            this.tpl = '<tpl for="."><div class="x-combo-list-item">{[fm.htmlEncode(values.' + this.displayField + ")]}</div></tpl>";
        }
        this.syncFont = false;
        cwc.ux.ToolbarComboBox.superclass.initList.call(this);
        if (this.resizer) {
            Ext.apply(this.resizer, {
                minWidth: this.minListWidth,
                minHeight: this.minHeight
            });
        }
    },
    onTriggerClick: function() {
        this.fireEvent("beforetriggerclick", this);
        window.focus();
        cwc.ux.ToolbarComboBox.superclass.onTriggerClick.call(this);
    },
    onResize: function(w, h) {
        Ext.form.ComboBox.superclass.onResize.call(this, w, h);
        this.el.setWidth(this.wrap.getWidth() - this.getTriggerWidth() - this.wrap.getPadding("lr"));
    },
    onRender: function(ct, position) {
        if (cwc.isHighContrastMode()) {
            this.triggerConfig = {
                tag: "img",
                src: "./images/" + top.cwc.appResourceVersion + "/comboup.png",
                alt: "",
                cls: "x-form-trigger x-form-arrow-trigger"
            };
        }
        cwc.ux.ToolbarComboBox.superclass.onRender.call(this, ct, position);
        this.el.dom.setAttribute(top.cwc.SKIP_GLOBAL_ENTER_EVENT_ATTR, "true");
        cwc.setProperty(this.el, {
            "role": "combobox",
            "aria-activedescendant": this.list.id,
            "aria-expanded": false,
            "aria-haspopup": true,
            "aria-owns": this.list.id,
            "aria-label": this.ariaLabel,
            "aria-autocomplete": "list"
        });
        cwc.setProperty(Ext.get(this.list), {
            "role": "listbox"
        });
        if (!cwc.isIE8) {
            this.el.insertHtml("afterBegin", '<span class="FormatTextInvisible">&nbsp;</span>');
        }
        this.addHpsmStyle();
    },
    addHpsmStyle: function() {
        var input = this.el;
        var div = input.parent();
        var td = div.parent();
        cwc.addStyleClass(div, "xEdit");
        cwc.addStyleClass(td, "toolbarCombo");
        var inputObj = Ext.get(input);
        inputObj.on("focus", function() {
            cwc.addStyleClass(div, "xFocus");
        });
        inputObj.on("blur", function() {
            cwc.removeStyleClass(div, "xFocus");
        });
    },
    getState: function() {
        var w = Math.max(this.list.getWidth(), this.minListWidth);
        return {
            listWidth: w
        };
    },
    onViewClick: function(doFocus) {
        cwc.ux.ToolbarComboBox.superclass.onViewClick.call(this, false);
        this.clearValue();
    },
    findCurrentRecord: function() {
        var record;
        if (this.store.getCount() > 0) {
            record = this.store.getAt(this.selectedIndex);
        }
        return record;
    },
    expand: function() {
        if (this.isExpanded() || !this.hasFocus) {
            return;
        }
        cwc.showShims();
        cwc.ux.ToolbarComboBox.superclass.expand.call(this);
        this.alignToXEdit();
        Ext.get(this.innerList).select("div.x-combo-list-item").each(function(item) {
            cwc.setProperty(item, {
                "role": "option"
            });
        });
        cwc.setProperty(this.el, {
            "aria-expanded": true
        });
        cwc.addOuterListener && cwc.addOuterListener("mousedown", this.onOuterMouseDown, this);
    },
    afterExpand: function() {},
    collapse: function() {
        cwc.hideShims();
        cwc.ux.ToolbarComboBox.superclass.collapse.call(this);
        cwc.setProperty(this.el, {
            "aria-expanded": false
        });
        this.el.dom.removeAttribute("aria-activedescendant");
        cwc.removeOuterListener && cwc.removeOuterListener("mousedown", this.onOuterMouseDown, this);
    },
    onOuterMouseDown: function() {
        this.collapse();
    },
    select: function(index, scrollIntoView) {
        cwc.ux.ToolbarComboBox.superclass.select.call(this, index, scrollIntoView);
        cwc.setProperty(this.el, {
            "aria-activedescendant": Ext.id(this.innerList.select("div.x-combo-list-item").elements[index])
        });
    },
    onKeyUp: function(e) {
        var k = e.getKey();
        if (k == 144) {
            return;
        }
        cwc.ux.ToolbarComboBox.superclass.onKeyUp.call(this, e);
    },
    restrictHeight: function() {
        cwc.ux.ToolbarComboBox.superclass.restrictHeight.call(this);
        this.alignToXEdit();
    },
    alignToXEdit: function() {
        this.list.alignTo.apply(this.list, [this.el.parent()].concat(this.listAlign));
    },
    postBlur: function() {
        this.el.set({
            "role": "presentation"
        });
        cwc.ux.ToolbarComboBox.superclass.postBlur.call(this);
        this.el.set({
            "role": "combobox"
        });
    },
    checkTab: function(me, e) {
        if ([e.TAB, e.LEFT, e.RIGHT, e.HOME, e.END].indexOf(e.getKey()) > -1) {
            this.triggerBlur();
        }
    },
    destroy: function() {
        if (this.initialConfig) {
            this.initialConfig = null;
        }
        cwc.ux.ToolbarComboBox.superclass.destroy.call(this);
    }
});
Ext.reg("toolbarCombo", cwc.ux.ToolbarComboBox);
Ext.namespace("cwc.ux");
cwc.ux.JumpAddressCombox = Ext.extend(cwc.ux.ToolbarComboBox, {
    store: cwc.InitJAStore || (cwc.getTopCwc() ? cwc.getTopCwc().InitJAStore : null),
    ariaLabel: cwc.getTopCwc().JUMP_ADDR_LABEL,
    listeners: {
        beforerender: function() {
            var tab = cwc.getCurrentTab(this);
            this.collapseDoc = tab.hasListDetail() ? tab.getDetailFrameDocument() : tab.getFrameDocument();
            this.collapseWin = tab.hasListDetail() ? tab.getDetailFrameWindow() : tab.getFrameWindow();
        },
        afterrender: function() {
            this.keyNav.enter = null;
            this.keyNav.tab = function(e) {
                this.inKeyMode = true;
                if (e.shiftKey) {
                    this.selectPrev();
                } else {
                    this.selectNext();
                }
            };
            this.mon(this, {
                resize: this.collapse,
                scope: this
            });
        },
        expand: function() {
            this.adjustListWidth();
        },
        beforequery: function(eq) {
            if (this.needUpdateStore(eq.query)) {
                cwc.getTopCwc().updateJAStore(this);
            }
        },
        beforetriggerclick: function() {
            cwc.getTopCwc().updateJAStore(this);
        },
        select: function(combo, record) {
            this.collapseWin.hpsm.clpsSections.toggleSectionFromJumpAddress(record.data.focusElem, record.data.value);
        },
        change: function(combo, newValue, oldValue) {
            combo.performJump();
        }
    },
    expandAllButtonName: "EXPANDALL",
    collapseAllButtonName: "COLLAPSEALL",
    backtoTopButtonName: "BACKTOTOP",
    addToolbarButtons: function() {
        if (this.list.query(".button").length > 0) {
            return;
        }
        var buttons = [this.expandAllButtonName, this.collapseAllButtonName, this.backtoTopButtonName];
        var buttonsHtml = "";
        var id = this.id;
        for (var i = 0; i < buttons.length; i++) {
            var buttonText = top.cwc["QUICKJUMP_BUTTONTEXT_" + buttons[i]];
            buttonsHtml += '<div class="x-combo-list-item button ' + buttons[i] + '" tabindex="0" role="option" id="' + Ext.id() + '" title="' + buttonText + '">' + buttonText + "</div>";
        }
        buttonsHtml = '<div class="toolbar-buttons">' + buttonsHtml + "<hr/></div>";
        this.list.insertHtml("afterBegin", buttonsHtml);
        this.mon(this.list.child("." + this.expandAllButtonName), {
            click: this.onExpandAll,
            mouseover: function() {
                this.select(-4);
            },
            scope: this
        });
        this.mon(this.list.child("." + this.collapseAllButtonName), {
            click: this.onCollapseAll,
            mouseover: function() {
                this.select(-3);
            },
            scope: this
        });
        this.mon(this.list.child("." + this.backtoTopButtonName), {
            click: this.onBacktoTop,
            mouseover: function() {
                this.select(-2);
            },
            scope: this
        });
    },
    needUpdateStore: function(query) {
        if (query.length === 0) {
            return false;
        }
        if (query.length === 1 && !this.storeUpdated) {
            this.storeUpdated = true;
            return true;
        } else {
            this.storeUpdated = false;
            return true;
        }
    },
    initList: function() {
        if (!this.list) {
            this.tpl = new Ext.XTemplate('<tpl for=".">', '<div id="{[Ext.id()]}" class="x-combo-list-item group" tabindex="0" role="option" title="{' + this.displayField + '}">{' + this.displayField + ":htmlEncode}</div>", "</tpl>");
            cwc.ux.JumpAddressCombox.superclass.initList.call(this);
            this.addToolbarButtons();
            this.addNoticeSpan();
        }
    },
    addNoticeSpan: function() {
        var noticeHtml = top.cwc.QUICKJUMP_NOTICE_TEXT;
        noticeHtml = noticeHtml.replace(/\(/g, "<span>( ").replace(/\)/g, " )</span>");
        this.list.createChild({
            html: noticeHtml,
            cls: "jumpAddrNotice"
        });
    },
    onExpandAll: function() {
        var self = this;
        self.clearValue();
        self.collapseWin.hpsm.clpsSections.expandAll();
        self.collapse();
        var focid = self.collapseDoc.getElementById("focusId");
        if (focid && focid.value) {
            var elFocus = self.collapseDoc.getElementById(focid.value);
            if (elFocus) {
                elFocus.focus();
                return;
            }
        }
        self.focusToTop();
    },
    onCollapseAll: function() {
        var self = this;
        self.clearValue();
        self.collapseWin.hpsm.clpsSections.collapseAll();
        self.collapse();
        self.focusToTop();
    },
    onBacktoTop: function() {
        var self = this;
        self.clearValue();
        self.collapse();
        self.focusToTop();
    },
    focusToTop: function() {
        this.collapseWin.scrollTo("top", 0);
        this.collapseWin.focus();
        var topEle = this.collapseDoc.getElementById("view");
        if (!topEle) {
            topEle = this.collapseDoc.body;
        }
        topEle.focus();
    },
    executeButton: function() {
        switch (this.selectedIndex) {
            case -2:
                this.onBacktoTop();
                return true;
            case -3:
                this.onCollapseAll();
                return true;
            case -4:
                this.onExpandAll();
                return true;
            default:
                return false;
        }
    },
    selectPrev: function() {
        if (this.selectedIndex == -1) {
            this.select(0);
        } else {
            if (this.selectedIndex == 0) {
                this.select(-2);
            } else {
                if (this.selectedIndex <= -4) {
                    this.select(-4);
                } else {
                    this.select(this.selectedIndex - 1);
                }
            }
        }
    },
    selectNext: function() {
        var ct = this.store.getCount();
        if (ct > 0) {
            if (this.selectedIndex == -1 || this.selectedIndex == -2) {
                this.select(0);
            } else {
                if (this.selectedIndex < ct - 1) {
                    this.select(this.selectedIndex + 1);
                }
            }
        }
    },
    select: function(index, scrollIntoView) {
        this.clearButtonSelections();
        if (index == -1) {
            return;
        }
        this.selectedIndex = index;
        switch (index) {
            case -2:
                this.selectButton(this.backtoTopButtonName);
                break;
            case -3:
                this.selectButton(this.collapseAllButtonName);
                break;
            case -4:
                this.selectButton(this.expandAllButtonName);
                break;
            default:
                this.view.select(index);
                cwc.setProperty(this.el, {
                    "aria-activedescendant": this.innerList.select(".x-combo-list-item.group").elements[index].id
                });
        }
        if (scrollIntoView !== false && index > -1) {
            var el = this.view.getNode(index);
            if (el) {
                this.innerList.scrollChildIntoView(el, false);
            }
        }
    },
    selectButton: function(name) {
        this.view.clearSelections(true);
        var buttonEl = this.list.child("." + name);
        buttonEl.addClass("selected");
        cwc.setProperty(this.el, {
            "aria-activedescendant": buttonEl.id
        });
    },
    clearButtonSelections: function() {
        var id = this.id;
        this.list.child("." + this.backtoTopButtonName).removeClass("selected");
        this.list.child("." + this.collapseAllButtonName).removeClass("selected");
        this.list.child("." + this.expandAllButtonName).removeClass("selected");
    },
    doQuery: function(q, forceAll) {
        var previousQuery = this.lastQuery;
        cwc.ux.JumpAddressCombox.superclass.doQuery.call(this, q, forceAll);
        if (this.store.getCount() == 0) {
            var newQuery = this.getRawValue().substring(0, hpsm.StringUtils.getCaretPosition(this.el.dom));
            this.setValue(newQuery);
            this.lastQuery = newQuery;
            cwc.ux.JumpAddressCombox.superclass.doQuery.call(this, newQuery, forceAll);
        }
        if (this.store.getCount() == 0) {
            this.setValue(previousQuery);
            this.lastQuery = previousQuery;
            cwc.ux.JumpAddressCombox.superclass.doQuery.call(this, previousQuery, forceAll);
        }
    },
    onKeyUp: function(e) {
        var k = e.getKey();
        if (e.altKey && k == top.cwc.keyJumpAddress) {
            return;
        }
        if (k == e.ENTER) {
            e.stopEvent();
            if (this.executeButton()) {
                return;
            }
            var record = this.findCurrentRecord();
            if (record) {
                this.collapseWin.hpsm.clpsSections.toggleSectionFromJumpAddress(record.data.focusElem, record.data.value);
            }
            this.collapse();
            this.clearValue();
        }
        var lastMatched = "";
        if (this.lastQuery != "" && this.store.data.items.length > 0) {
            lastMatched = this.store.data.items[0].data.name;
        }
        if (hpsm.StringUtils.skipMatchingInput(this.el.dom, k, this.getRawValue(), lastMatched)) {
            return;
        }
        cwc.ux.JumpAddressCombox.superclass.onKeyUp.call(this, e);
    },
    onViewClick: function(doFocus) {
        cwc.ux.ToolbarComboBox.superclass.onViewClick.call(this, false);
        this.clearValue();
    },
    restrictHeight: function() {
        cwc.ux.JumpAddressCombox.superclass.restrictHeight.call(this);
        this.list.setHeight("auto");
        this.innerList.setHeight("auto");
        this.alignToXEdit();
    },
    adjustListWidth: function() {
        var buttons = this.list.query(".button");
        var buttonsTotalWidth = 0;
        var buttonsWidth = [];
        for (var i = 0; i < buttons.length; i++) {
            var bWidth = buttons[i].offsetWidth;
            buttonsTotalWidth += bWidth;
            buttonsWidth[i] = bWidth;
        }
        var listWidth = buttonsTotalWidth + 20;
        var widthChanged = false;
        if (listWidth < this.minListWidth) {
            listWidth = this.minListWidth;
            widthChanged = true;
        } else {
            if (listWidth > this.maxListWidth) {
                listWidth = this.maxListWidth;
                widthChanged = true;
            }
        }
        this.list.setWidth(listWidth);
        this.innerList.setWidth(listWidth - 10);
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.width = (buttonsWidth[i] / buttonsTotalWidth) * (listWidth - 10) - 33 - 2 + "px";
            buttons[i].style.overflow = "hidden";
        }
    },
    updateEditState: function() {
        if (this.rendered) {
            this.el.dom.readOnly = false;
            this.el.removeClass("x-trigger-noedit");
            this.mon(this.el, "click", this.onTriggerClick, this);
            this.trigger.setDisplayed(!this.hideTrigger);
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    performJump: function() {
        var self = this;
        var record = self.findCurrentRecord();
        if (record) {
            self.collapseWin.hpsm.clpsSections.toggleSectionFromJumpAddress(record.data.focusElem, record.data.value);
            self.clearValue();
        }
        self.collapse();
    },
    addHpsmStyle: function() {
        cwc.ux.JumpAddressCombox.superclass.addHpsmStyle.call(this);
        this.list.addClass("jumpAddrComboList");
    },
    destroy: function() {
        if (this.collapseDoc) {
            this.collapseDoc = null;
        }
        if (this.collapseWin) {
            this.collapseWin = null;
        }
        cwc.ux.JumpAddressCombox.superclass.destroy.call(this);
    }
});
Ext.reg("cwc_jumpaddress_combox", cwc.ux.JumpAddressCombox);
(function() {
    cwc.hoverPanelDismissTimer = false;
    cwc.hoverPanelShowTimer = false;
    cwc.showHoverPanel = function(labels, rowData, columnsVisibleStates, pos) {
        cwc.hoverPanelDismissTimer && clearTimeout(cwc.hoverPanelDismissTimer);
        cwc.hideHoverPanel();
        var hoverPanel = Ext.getCmp("gridHoverPanel");
        if (!hoverPanel) {
            hoverPanel = new cwc.ux.GridHoverPanel({
                labels: labels,
                rowData: rowData,
                columnsVisibleStates: columnsVisibleStates,
                pos: [pos[0], pos[1] - 52],
                maxPanelWidth: 400
            });
        } else {
            hoverPanel.labels = labels;
            hoverPanel.rowData = rowData;
            hoverPanel.columnsVisibleStates = columnsVisibleStates;
            hoverPanel.pos = [pos[0], pos[1] - 52];
        }
        hoverPanel.show();
        addHoverPanelIndicator(pos);
        cwc.isGridHoverShown = true;
    };
    cwc.showHoverPanelWithDelay = function(labels, rowData, columnsVisibleStates, pos) {
        cwc.hoverPanelDismissTimer && clearTimeout(cwc.hoverPanelDismissTimer);
        cwc.hoverPanelShowTimer = setTimeout(function() {
            cwc.showHoverPanel(labels, rowData, columnsVisibleStates, pos);
        }, 500);
    };

    function addHoverPanelIndicator(pos) {
        var hoverPanelIndicator = Ext.fly("gridHoverPanelIndicator");
        if (!hoverPanelIndicator) {
            hoverPanelIndicator = Ext.getBody().createChild({
                cls: "gridHoverPanel-indicator",
                id: "gridHoverPanelIndicator"
            });
        } else {
            hoverPanelIndicator.show();
        }
        hoverPanelIndicator.setStyle("left", pos[0] + "px");
        var idcY = pos[1] - 17;
        if (cwc.getDirectionClass() == "rtl") {
            idcY = idcY - 5;
        }
        hoverPanelIndicator.setStyle("top", idcY + "px");
    }
    cwc.hideHoverPanelWithDelay = function() {
        cwc.hoverPanelShowTimer && clearTimeout(cwc.hoverPanelShowTimer);
        var hoverPanel = Ext.getCmp("gridHoverPanel");
        if (hoverPanel) {
            cwc.hoverPanelDismissTimer = setTimeout(function() {
                if (hoverPanel.mouseInPanel) {
                    return;
                }
                cwc.hideHoverPanel();
            }, 500);
        }
    };
    cwc.hideHoverPanel = function() {
        cwc.hoverPanelShowTimer && clearTimeout(cwc.hoverPanelShowTimer);
        if (!cwc.isGridHoverShown) {
            return;
        }
        var hoverPanel = Ext.getCmp("gridHoverPanel");
        if (hoverPanel) {
            hoverPanel.hide();
        }
        var hoverPanelIndicator = Ext.fly("gridHoverPanelIndicator");
        if (hoverPanelIndicator) {
            hoverPanelIndicator.hide();
        }
        cwc.isGridHoverShown = false;
    };

    function removeHoverPanel() {
        cwc.hoverPanelShowTimer && clearTimeout(cwc.hoverPanelShowTimer);
        hoverPanel && hoverPanel.destroy();
        hoverPanelIndicator && hoverPanelIndicator.remove();
        cwc.isGridHoverShown = false;
    }
    cwc.getElementPosition = function(obj, win) {
        var ep = {};
        ep.x = obj.getBoundingClientRect().right;
        ep.y = obj.getBoundingClientRect().bottom;
        var framePos = getFramePosition(win);
        ep.x += framePos.x;
        ep.y += framePos.y;
        return ep;
    };

    function getFramePosition(win, fp) {
        if (typeof fp === "undefined") {
            var fp = {
                x: 0,
                y: 0
            };
        }
        var frames = win.parent.document.getElementsByTagName("iframe");
        var frame;
        var found = false;
        for (var i = 0, len = frames.length; i < len; i++) {
            frame = frames[i];
            if (frame.contentWindow == win) {
                found = true;
                break;
            }
        }
        if (found) {
            var rect = frame.getBoundingClientRect();
            fp.x += rect.left;
            fp.y += rect.top;
            if (win !== top) {
                getFramePosition(win.parent, fp);
            }
        }
        return fp;
    }
})();
cwc.ux.GridHoverPanel = Ext.extend(Ext.form.FormPanel, {
    id: "gridHoverPanel",
    labelAlign: "top",
    bodyCssClass: "gridHoverFormBody",
    xtype: "fieldset",
    defaultType: "label",
    autoHeight: true,
    autoWidth: true,
    autoScroll: false,
    hidden: true,
    renderTo: Ext.getBody(),
    mouseInPanel: false,
    baseCls: cwc.getDirectionClass(),
    setFormItems: function() {
        var formItems = [];
        var columns = this.rowData.fields;
        var j = 0;
        var columnsCount = columns.getCount();
        var visibleCount = 0,
            invisibleCount = 0;
        for (var i = 0; i < columnsCount; i++) {
            if (columns.get(i).mapping.indexOf("___") != 0 && columns.get(i).name.indexOf("___") != 0) {
                var cls = "";
                var colName = columns.get(i).name;
                var isColHidden = this.columnsVisibleStates.hasOwnProperty(colName);
                var value = this.rowData.data[colName];
                var disval = value.indexOf("_{_VALUE_}_") >= 0 ? value.split("_{_VALUE_}_") : value.split("_{_value_}_");
                var display = disval[0];
                var index = display.indexOf("___img:");
                if (index != -1) {
                    display = display.substring("___img:".length);
                    if (display.indexOf(".gif") == -1 || display.indexOf(".png") == -1) {
                        display = display + ".png";
                    }
                    display = top.cwc.imagePath + "/obj16/" + display;
                    cls = "x-form-element-image";
                }
                if (Ext.util.Format.trim(display) == "") {
                    display = cwc.GRIDHOVERPANEL_EMPTY_TEXT;
                    cls = "x-form-element-empty";
                }
                if (!isColHidden) {
                    this.insert(j - invisibleCount, {
                        fieldLabel: this.labels[j],
                        text: cwc.decodeHtml(display),
                        cls: cls
                    });
                    visibleCount++;
                } else {
                    this.insert(j, {
                        fieldLabel: this.labels[j],
                        text: cwc.decodeHtml(display),
                        cls: cls
                    });
                    invisibleCount++;
                }
                j++;
            }
        }
        if (invisibleCount > 0) {
            this.insert(visibleCount, {
                xtype: "box",
                autoEl: {
                    tag: "hr"
                }
            });
        }
        this.labels = null;
        this.rowData = null;
        this.columnsVisibleStates = null;
    },
    show: function() {
        this.setFormItems();
        this.doLayout();
        cwc.ux.GridHoverPanel.superclass.show.call(this);
        this.renderImages();
        this.adjustPanelWidth();
        this.adjustPanelHeight();
        this.adjustPanelPosition();
    },
    renderImages: function() {
        var images = this.el.query("label.x-form-element-image");
        for (var i = 0; i < images.length; i++) {
            images[i].innerHTML = "<img src='" + images[i].innerHTML + "'/>";
        }
    },
    adjustPanelWidth: function() {
        var fieldEles = this.el.query("label");
        var maxFieldEleWidth = 0;
        for (var i = 0; i < fieldEles.length; i++) {
            var fieldEleWidth = fieldEles[i].offsetWidth;
            if (maxFieldEleWidth < fieldEleWidth) {
                maxFieldEleWidth = fieldEleWidth;
            }
        }
        if ((maxFieldEleWidth + 20) > (this.maxPanelWidth)) {
            this.autoWidth = false;
            this.setWidth(this.maxPanelWidth);
        }
    },
    adjustPanelHeight: function() {
        var currentHeight = this.getHeight();
        var suggestedHeight = (Ext.getBody().getViewSize().height) * 0.6;
        if (currentHeight > suggestedHeight) {
            this.autoHeight = false;
            this.setHeight(suggestedHeight);
        }
        this.setAutoScroll(true);
        this.body.scrollTo("top", 0);
    },
    adjustPanelPosition: function() {
        var totalHeight = Ext.getBody().getViewSize().height;
        var height = this.getHeight();
        var posX = this.pos[0] + 13;
        var posY = totalHeight - this.pos[1] < height ? totalHeight - height : this.pos[1];
        posY -= 25;
        this.setPagePosition(posX, posY);
    },
    afterRender: function() {
        cwc.ux.GridHoverPanel.superclass.afterRender.call(this);
        this.mon(this.el, {
            scope: this,
            mouseleave: this.mouseLeavePanel,
            mouseenter: this.mouseEnterPanel
        });
    },
    mouseLeavePanel: function(e) {
        this.mouseInPanel = false;
        cwc.hideHoverPanelWithDelay();
    },
    mouseEnterPanel: function(e) {
        this.mouseInPanel = true;
    },
    hide: function() {
        this.removeAll();
        cwc.ux.GridHoverPanel.superclass.hide.call(this);
        this.setWidth("auto");
        this.setHeight("auto");
        this.setAutoScroll(false);
    }
});
!(function() {
    var regionsCandidates = ["center", "south", "north"];

    function calculateBorderLayoutRegion() {
        return regionsCandidates.shift();
    }
    Ext.define("cwc.ux.RightPanel", {
        extend: "Ext.Panel",
        xtype: "cwcRightPanel",
        region: cwc.isRTL ? "west" : "east",
        border: false,
        split: true,
        minSize: 300,
        width: 350,
        layout: "border",
        cls: "cwc-right-panel",
        collapsible: true,
        hideCollapseTool: true,
        hidden: true,
        initComponent: function() {
            var me = this;
            me.items = me.items || [];
            if (cwc.getSmartSearchConfig("hasLicense")) {
                var smartSearchRegion = calculateBorderLayoutRegion();
                me.smartSearchContainer = Ext.create({
                    id: cwc.smartSearchContainerId,
                    xtype: "cwcDockWinContainer",
                    region: smartSearchRegion,
                    border: false,
                    split: true,
                    layout: "card",
                    hidden: true,
                    activeItem: 0,
                    collapsed: true,
                    collapsible: true,
                    hideCollapseTool: true,
                    items: [],
                    runWithoutRecursive: function(callback) {
                        if (this._inRecursive) {
                            return;
                        }
                        try {
                            this._inRecursive = true;
                            callback.call(this);
                        } finally {
                            this._inRecursive = false;
                        }
                    },
                    switchActiveItem: function(comp) {
                        this.runWithoutRecursive(function() {
                            var opposite = this.items.find(function(c) {
                                return c !== comp && c._status !== "closed" && c._status !== "inactive";
                            });
                            if (opposite) {
                                this.layout.setActiveItem(opposite);
                            } else {
                                this.fireEvent("dockedwinclose", comp, this);
                            }
                        });
                    },
                    hideWhenNoActiveItem: function(comp) {
                        this.switchActiveItem(comp);
                    },
                    listeners: {
                        "gs:close:sidebar": function(comp) {
                            comp._status = "closed";
                            this.switchActiveItem(comp);
                        },
                        "gs:show:sidebar": function(comp) {
                            comp._status = "visible";
                            this.layout.setActiveItem(comp);
                            this.fireEvent("dockedwinshow", this, comp);
                        },
                        "gs:hide:sidebar": function(comp) {
                            if (comp._status === "visible") {
                                comp._status = "hidden";
                                this.switchActiveItem(comp);
                            }
                        },
                        "gs:inactive:sidebar": function(comp) {
                            comp._status = "inactive";
                        }
                    }
                });
                me.items.push(me.smartSearchContainer);
            }
            if (cwc.smcEnabled) {
                var chatRegion = calculateBorderLayoutRegion();
                me.chatContainer = Ext.create({
                    id: cwc.chatWinContainerId,
                    xtype: "cwcDockWinContainer",
                    region: chatRegion,
                    border: false,
                    split: true,
                    height: 350,
                    collapsed: true,
                    hidden: true,
                    layout: "fit",
                    collapsible: true,
                    collapseMode: "mini",
                    hideCollapseTool: true,
                    items: []
                });
                me.items.push(me.chatContainer);
            }
            me.callParent(arguments);
            me.mon(me, "resize", me.onSelfResize, me);
        },
        onSelfResize: function(p, adjWidth, adjHeight, rawWidth, rawHeight) {
            if (this.isVisible()) {
                if (this.smartSearchContainer && !this.smartSearchContainer.isVisible() && this.chatContainer && this.chatContainer.isVisible()) {
                    this.chatContainer.setHeight(adjHeight);
                    this.doLayout();
                }
                if (Ext.isIE && this.smartSearchContainer && this.smartSearchContainer.isVisible()) {
                    var searchWin = this.smartSearchContainer.layout.activeItem;
                    if (searchWin) {
                        Ext.defer(function() {
                            if (this.isDocked && this.isDocked()) {
                                var left = this.el.getStyle("left");
                                if (left && left.indexOf("px") > 0) {
                                    var iLeft = parseInt(left.replace("px", ""));
                                    if (iLeft > 0) {
                                        this.setPosition(0, 0);
                                        if (cwc.jsDebug && window.console) {
                                            window.console.log("Adjust dock win position for IE!!!");
                                        }
                                    }
                                }
                            }
                        }, 500, searchWin);
                    }
                }
            }
        },
        getChatWin: function() {
            var chatWin = this.chatContainer.items.get(0);
            return chatWin;
        },
        handleChildClose: function(win, ct) {
            var needHide = true;
            for (var i = 0; i < this.items.getCount(); i++) {
                var item = this.items.get(i);
                if (item && item.isVisible()) {
                    needHide = false;
                    break;
                }
            }
            if (needHide) {
                this.collapse();
            } else {
                if (this.chatContainer && this.chatContainer.isVisible()) {
                    var chatWin = this.getChatWin();
                    if (chatWin) {
                        this.chatContainer.setHeight(this.getHeight());
                        this.doLayout();
                        if (chatWin.el && chatWin.el.shim) {
                            chatWin.el.shim.hide();
                        }
                    }
                }
                if ((this.smartSearchContainer && this.smartSearchContainer.isVisible()) && (!this.chatContainer || !this.chatContainer.isVisible())) {
                    this.smartSearchContainer.setHeight(this.getHeight());
                    this.doLayout();
                }
            }
        },
        sendChildWinToBack: function(ct) {
            for (var i = 0; i < ct.items.getCount(); i++) {
                var item = this.items.get(i);
                if (item && item.isXType("window")) {
                    Ext.WindowMgr.sendToBack(item);
                }
            }
        },
        handleChildShow: function(win) {
            if (!this.isVisible()) {
                this.show();
            }
            if (this.collapsed) {
                this.expand(false);
            }
            var ct = win.dockContainer || this.smartSearchContainer,
                totalHeight = this.getHeight();
            var dockHeight, dockState = ct.getDockState();
            if (dockState && dockState.height > 0 && dockState.height < totalHeight - 100) {
                dockHeight = dockState.height;
            } else {
                dockHeight = totalHeight / 2;
            }
            if (ct == this.chatContainer) {
                var delta = Math.abs(ct.getHeight() - totalHeight),
                    targetHeight;
                if (this.smartSearchContainer && this.smartSearchContainer.isVisible() && !this.smartSearchContainer.collapsed) {
                    if (delta < 10) {
                        targetHeight = dockHeight;
                    } else {
                        if (this.smartSearchContainer.getHeight() == totalHeight && ct.getHeight() == 0) {
                            this.smartSearchContainer.setHeight(totalHeight - dockHeight);
                            this.chatContainer.show();
                            this.chatContainer.expand(false);
                            this.chatContainer.setHeight(dockHeight);
                            this.chatContainer.doLayout();
                        }
                    }
                } else {
                    if (delta > 10) {
                        targetHeight = totalHeight;
                    }
                }
                if (targetHeight) {
                    ct.expand(false);
                    ct.setHeight(targetHeight);
                }
            } else {
                if (this.chatContainer && this.chatContainer.isVisible() && !this.chatContainer.collapsed) {
                    var delta = Math.abs(this.chatContainer.getHeight() - totalHeight);
                    if (delta < 10) {
                        ct.expand(false);
                        ct.setHeight(dockHeight);
                        this.chatContainer.setHeight(totalHeight - dockHeight);
                    }
                }
            }
            this.ownerCt.doLayout();
        },
        listeners: {
            "collapse": function(p) {
                this.hide();
                this.ownerCt.doLayout();
            },
            "beforechilddock": function(win, ct) {
                this.handleChildShow(win);
            },
            "beforewinundock": function(win, ct) {
                var otherCt = ct == this.chatContainer ? this.smartSearchContainer : this.chatContainer;
                if (otherCt) {
                    this.sendChildWinToBack(otherCt);
                }
            },
            "afterchildundock": function(win, ct) {
                this.handleChildClose(win, ct);
            },
            "dockedwinshow": function(win, ct) {
                this.handleChildShow(win);
            },
            "dockedwinclose": function(win) {
                this.handleChildClose(win);
            }
        }
    });
})();
!(function() {
    Ext.define("cwc.ux.DockWindowContainer", {
        extend: "Ext.Panel",
        xtype: "cwcDockWinContainer",
        tryActivateItem: function(item) {},
        tryShow: function(win) {
            this.tryActivateItem(win);
            if (!this.isVisible()) {
                this.show();
            }
            if (this.collapsed) {
                this.expand(false);
            }
        },
        tryHide: function(win) {
            var me = this;
            me.collapse(false);
            me.hide();
        },
        getStateId: function(feature) {
            return [this.xtype, this.getId(), feature].join("-");
        },
        getDockStateId: function() {
            return this.getStateId("dock");
        },
        getDockState: function() {
            return Ext.state.Manager.get(this.getDockStateId());
        },
        saveDockState: function() {
            Ext.state.Manager.set(this.getDockStateId(), {
                height: this.getHeight()
            });
        },
        initComponent: function() {
            var me = this;
            me.callParent(arguments);
            me.addEvents("childdock", "beforechilddock", "afterchildundock", "dockedwinshow", "dockedwinclose");
            me.enableBubble("beforechilddock", "afterchildundock", "dockedwinshow", "dockedwinclose");
            me.mon(me, "beforewinundock", function(dockWin, p) {
                me.saveDockState();
            }, me);
            me.mon(me, "childdock", function(dockWin, p) {
                me.tryShow();
            }, me);
            me.mon(me, "afterchildundock", this.hideWhenNoActiveItem, me);
            me.mon(me, "afterwindock", function(dockWin, p) {
                me.tryActivateItem(dockWin);
            }, me);
            me.mon(me, "dockedwinshow", function(dockWin) {
                me.tryShow(dockWin);
            }, me);
            me.mon(me, "dockedwinclose", function(dockWin) {
                me.tryHide(dockWin);
            }, me);
        },
        hideWhenNoActiveItem: function(dockWin, p) {
            this.tryHide(dockWin);
        },
        onBeforeChildDock: function(win) {
            var me = this;
            me.fireEvent("beforechilddock", win, this);
            me.fireEvent("childdock", win, this);
        },
        onAfterChildUndock: function(win) {
            var me = this;
            me.fireEvent("afterchildundock", win, this);
        }
    });
    Ext.define("cwc.ux.DockWindow", {
        extend: "Ext.Window",
        xtype: "cwcDockWindow",
        dockTarget: null,
        dockContainer: null,
        allowDomMove: true,
        isDocking: false,
        isUndocking: false,
        undockStateId: null,
        undockBox: null,
        defaultUndockSize: null,
        dockCls: "dock-win",
        undockCls: "undock-win",
        initDocked: false,
        toolTemplate: new Ext.Template('<div class="x-tool x-tool-{id} icon-win-{id}">&#160;</div>'),
        minUndockSize: {
            width: 390,
            height: 240
        },
        initComponent: function() {
            var me = this;
            me.callParent(arguments);
            if (me.dockTarget && typeof me.dockTarget == "string") {
                var targetPanel = Ext.getCmp(me.dockTarget);
                if (targetPanel && ((targetPanel.xtype == "cwcDockWinContainer") || ((typeof targetPanel.isXType) == "function" && targetPanel.isXType("cwcDockWinContainer")))) {
                    me.dockContainer = targetPanel;
                }
            }
            me.addEvents("beforewindock", "afterwindock", "beforewinundock", "afterwinundock", "dockedwinclose", "dockedwinclose");
            me.enableBubble("dockedwinshow", "dockedwinclose", "afterwindock", "beforewinundock");
            me.mon(me, "afterrender", function(win) {
                me.initDockTools();
                if (me.resizable && me.resizer && me.isDocked()) {
                    me.resizer.enabled = false;
                }
                if (me.draggable && me.dd && me.isDocked()) {
                    me.dd.lock();
                }
                if (me.maximizable && me.initDocked) {
                    me.getTool("maximize").hide();
                    me.getTool("restore").hide();
                }
                me.mon(me, "resize", function(win) {
                    if (me.isDocked() && me.el.shim) {
                        me.el.shim.hide();
                    }
                }, me);
                if (me.isDocked()) {
                    me.addClass(me.dockCls);
                } else {
                    if (me.isDockable()) {
                        me.addClass(me.undockCls);
                    }
                }
            }, me);
            me.mon(me, "show", function(win) {
                if (me.modal && me.isDocked() && me.mask && me.mask.isVisible()) {
                    me.mask.hide();
                }
                if (me.initDocked && me.isDocked()) {
                    me.saveUndockZindex();
                    Ext.WindowMgr.sendToBack(me);
                    me.el.setStyle({
                        position: "relative",
                        left: 0,
                        top: 0
                    });
                    me.initDocked = false;
                }
            }, me);
            me.mon(me, "beforeshow", function(win) {
                if (me.isDocked() && !me.isDocking && !me.isUndocking) {
                    me.fireEvent("dockedwinshow", me);
                }
            }, me);
            me.mon(me, "beforehide", function(win) {
                if (me.isDocked()) {
                    Ext.WindowMgr.sendToBack(me);
                }
                return true;
            }, me);
        },
        toFront: function(e) {
            if (this.isDocked()) {
                return this;
            }
            return this.callParent(arguments);
        },
        initTools: function() {
            this.closeAction = "hideAndNotify";
            this.addTool({
                id: "unpin",
                qtip: cwc.UNPIN_FROM_RIGHT_PANEL,
                hidden: true,
                handler: this.undock.createDelegate(this, [])
            });
            this.addTool({
                id: "pin",
                qtip: cwc.PIN_TO_RIGHT_PANEL,
                hidden: true,
                handler: this.dockToTarget.createDelegate(this, [])
            });
            this.callParent();
        },
        toggleMaximize: function() {
            if (!this.isDocked()) {
                return this.callParent();
            }
            return false;
        },
        hideAndNotify: function() {
            this.hide();
            this.fireEvent("dockedwinclose", this, this.dockContainer);
        },
        initDockTools: function(forceHide) {
            var me = this;
            var unpinTool = me.getTool("unpin");
            var pinTool = me.getTool("pin");
            if (forceHide || !me.dockTarget) {
                unpinTool.hide();
                pinTool.hide();
                return;
            }
            if (me.isDocked()) {
                unpinTool.show();
                pinTool.hide();
            } else {
                pinTool.show();
                unpinTool.hide();
            }
        },
        isDockable: function() {
            return !this.isDocked() && this.dockContainer;
        },
        isDocked: function() {
            var me = this;
            return me.dockContainer && me.ownerCt == me.dockContainer;
        },
        getStateId: function(feature) {
            return [this.xtype, this.getId(), feature].join("-");
        },
        getUndockStateId: function() {
            var me = this;
            if (!me.undockStateId) {
                if (cwc.jsDebug && console) {
                    console.log("No undockStateId set for this dock window. Use xtype plus id as the undock state id.");
                }
                me.undockStateId = me.getStateId("undock");
            }
            return me.undockStateId;
        },
        saveUndockZindex: function() {
            var zindex = this.el.getStyle("zIndex");
            if (zindex !== "auto") {
                zindex = parseInt(zindex);
            }
            this.undockZindex = zindex;
        },
        saveUndockState: function() {
            var me = this;
            me.undockBox = me.getBox(true);
            var undockStateId = me.getUndockStateId();
            if (me.isValidUndockBox(me.undockBox)) {
                Ext.state.Manager.set(undockStateId, me.undockBox);
            }
            me.saveUndockZindex();
        },
        isValidUndockBox: function(box) {
            var minWidth = this.minUndockSize.width,
                minHeight = this.minUndockSize.height;
            if (box.width < minWidth || box.height < minHeight || box.x < 0 || box.y < 0) {
                return false;
            }
            var viewSize = Ext.getBody().getViewSize();
            if ((box.x + box.width + 10) > viewSize.width || (box.y + box.height + 10) > viewSize.height) {
                return false;
            }
            return true;
        },
        getUndockBox: function() {
            var me = this;
            if (!me.undockBox || !me.isValidUndockBox(me.undockBox)) {
                var undockStateId = me.getUndockStateId();
                me.undockBox = Ext.state.Manager.get(undockStateId);
                if (!me.undockBox) {
                    var xy, box;
                    if (me.defaultUndockSize) {
                        var bodySize = Ext.getBody().getSize();
                        xy = [(bodySize.width - me.defaultUndockSize.width) / 2, (bodySize.height - me.defaultUndockSize.height) / 2];
                        box = me.defaultUndockSize;
                    } else {
                        var xy = me.el.getCenterXY();
                        box = me.getSize();
                    }
                    if (box.height < me.minUndockSize.height) {
                        box.height = me.minUndockSize.height;
                    }
                    if (box.width < this.minUndockSize.width) {
                        box.width = this.minUndockSize.width;
                    }
                    me.undockBox = Ext.apply(box, {
                        x: xy[0],
                        y: xy[1]
                    });
                }
            }
            return me.undockBox;
        },
        dockToTarget: function() {
            var me = this;
            if (me.isDockable()) {
                me.isDocking = true;
                me.dockContainer.onBeforeChildDock(me);
                me.fireEvent("beforewindock", me, me.dockContainer);
                me.initDockTools(true);
                if (me.resizer) {
                    me.resizer.enabled = false;
                }
                var dockContainer = me.dockContainer;
                me.saveUndockState();
                var position = dockContainer.getPosition();
                var origPosition = me.getPosition();
                var size = dockContainer.getSize();
                var origSize = me.getSize();
                me.el.animate({
                    left: {
                        from: origPosition[0],
                        to: position[0]
                    },
                    top: {
                        from: origPosition[1],
                        to: position[1]
                    },
                    width: {
                        from: origSize.width,
                        to: size.width
                    },
                    height: {
                        from: origSize.height,
                        to: size.height
                    }
                }, 0.35, function() {
                    dockContainer.add(me);
                    dockContainer.body.appendChild(me.el);
                    me.setSize(size.width, size.height);
                    me.el.setStyle({
                        position: "relative",
                        left: 0,
                        top: 0
                    });
                    me.removeClass(me.undockCls);
                    me.addClass(me.dockCls);
                    if (me.maximizable) {
                        me.getTool("maximize").hide();
                        me.getTool("restore").hide();
                    }
                    me.setPosition(0, 0);
                    me.dd.lock();
                    me.isDocking = false;
                    me.initDockTools();
                    if (me.modal && me.mask && me.mask.isVisible()) {
                        me.mask.hide();
                    }
                    me.fireEvent("afterwindock", me, me.dockContainer);
                    dockContainer.doLayout();
                    if (me.el.shim) {
                        me.el.shim.hide();
                    }
                    Ext.WindowMgr.sendToBack(me);
                }, "easeIn", "run");
            }
        },
        undock: function() {
            var me = this;
            if (me.isDocked()) {
                var dockContainer = me.dockContainer;
                me.isUndocking = true;
                me.fireEvent("beforewinundock", me, me.dockContainer);
                dockContainer.remove(me, false);
                me.container = Ext.getBody();
                Ext.getBody().appendChild(me.el);
                var position = dockContainer.getPosition();
                me.setPosition(position[0], position[1]);
                me.el.setStyle({
                    position: "absolute"
                });
                var origBox = me.getBox(true);
                var targetBox = me.getUndockBox();
                me.setSize(targetBox.width, targetBox.height);
                me.el.animate({
                    left: {
                        from: origBox.x,
                        to: targetBox.x
                    },
                    top: {
                        from: origBox.y,
                        to: targetBox.y
                    },
                    width: {
                        from: origBox.width,
                        to: targetBox.width
                    },
                    height: {
                        from: origBox.height,
                        to: targetBox.height
                    }
                }, 0.35, function() {
                    me.setPosition(targetBox.x, targetBox.y);
                    me.doLayout();
                    me.fireEvent("afterwinundock", me, me.dockContainer);
                    me.dockContainer.onAfterChildUndock(me);
                    me.removeClass(me.dockCls);
                    me.addClass(me.undockCls);
                    if (me.maximizable) {
                        if (me.maximized) {
                            me.restore();
                        } else {
                            me.getTool("maximize").show();
                            me.getTool("restore").hide();
                        }
                    }
                }, "easeIn", "run");
                me.dd.unlock();
                if (me.resizer) {
                    me.resizer.enabled = true;
                }
                if (me.modal && me.mask && !me.mask.isVisible()) {
                    me.mask.show();
                }
                me.deferHeight = false;
                me.initDockTools();
                me.isUndocking = false;
                me.toFront();
            }
        }
    });
})();
/* file: cwc-Extjs.js */
Ext.onReady(function() {
    cwc.maskWindow();
    cwc.setAppMode();
    cwc.navToolbar = new cwc.ux.NavToolbar({
        cls: "x-toolbar",
        height: 36,
        enableOverflow: true
    });
    Ext.state.Manager.setProvider(new cwc.ux.StateProvider({
        store: cwc.store.local
    }));
    var north = {
        id: cwc.mastHeadId,
        region: "north",
        xtype: "box",
        el: "cwc_header",
        cls: "masthead",
        border: false,
        margins: "0 0 0 0",
        height: 55
    };
    var searchTbar = new Ext.Toolbar({
        items: [{
            id: "navSearchInput",
            xtype: "navSearchInput",
            width: 225
        }]
    });
    var west = function() {
        var ret = {
            id: cwc.navPanelId,
            region: cwc.isRTL ? "east" : "west",
            xtype: "cwc_navPanel",
            header: cwc.showNavTitle,
            collapsed: cwc.isAccessibleMode,
            collapsible: true,
            floatable: false,
            disabled: cwc.initNavMenuDisabled || false,
            split: true,
            width: 240,
            minSize: 240,
            maxSize: 400,
            cls: "cwc-navPanel",
            title: "",
            margins: "0 0 0 0",
            cmargins: "5 5 0 0",
            tbar: cwc.showNavToolbar ? cwc.navToolbar : undefined,
            layout: "card",
            activeItem: 0,
            items: [{
                id: cwc.navId,
                xtype: "cwc_navaccordion",
                border: false,
                contextPath: cwc.frameworkContext,
                query: cwc.toCSRFSafe("/cwc/nav.menu?name=navGenerate"),
                dataUrl: cwc.toCSRFSafe(cwc.frameworkContext + "/cwc/nav.menu?name=navGenerate"),
                cls: cwc.getDirectionClass(),
                listeners: {
                    activate: function() {
                        if (!Ext.getCmp(cwc.centerPanelId).rendered) {
                            return;
                        }
                        if (cwc.showReloadNavBtn) {
                            Ext.getCmp(cwc.favRefresh).show();
                        }
                        Ext.getCmp(cwc.btnFavDelete).hide();
                        Ext.getCmp(cwc.btnFavCopyTo).hide();
                        Ext.getCmp(cwc.btnFavMoveTo).hide();
                        Ext.getCmp(cwc.btnFavSep).hide();
                        Ext.getCmp(cwc.favAddFolderChartId).hide();
                        Ext.getCmp(cwc.favManage).btnEl.set({
                            "aria-pressed": false,
                            "aria-expanded": false
                        });
                        Ext.getCmp(cwc.favManage).btnEl.addClass("icon-settings");
                        Ext.getCmp(cwc.favManage).btnEl.removeClass("icon-settings-favManage");
                        cwc.util.setToolbarARIA({
                            "toolbar": this.ownerCt.getTopToolbar()
                        });
                        cwc.removeNavMoreBtn();
                        Ext.getCmp(cwc.btnExpand).show();
                    }
                }
            }, {
                id: cwc.favMgrId,
                cls: cwc.getDirectionClass(),
                layout: "fit",
                border: false,
                loaded: false,
                listeners: {
                    activate: function() {
                        Ext.getCmp(cwc.favRefresh).hide();
                        Ext.getCmp(cwc.favAddFolderChartId).show();
                        Ext.getCmp(cwc.btnFavSep).show();
                        Ext.getCmp(cwc.btnFavDelete).show();
                        Ext.getCmp(cwc.btnFavCopyTo).show();
                        Ext.getCmp(cwc.btnFavMoveTo).show();
                        Ext.getCmp(cwc.favManage).btnEl.set({
                            "aria-pressed": true,
                            "aria-expanded": true
                        });
                        Ext.getCmp(cwc.favManage).btnEl.addClass("icon-settings-favManage");
                        Ext.getCmp(cwc.favManage).btnEl.removeClass("icon-settings");
                        cwc.util.setToolbarARIA({
                            "toolbar": this.ownerCt.getTopToolbar()
                        });
                        cwc.resizeNavToolBar();
                    }
                }
            }],
            listeners: {
                render: function() {
                    if (!isEssUser) {
                        searchTbar.render(this.tbar);
                    }
                }
            }
        };
        var sidebarConfig = {
            getCollapsedEl: function() {
                if (!this.collapsedEl || !document.getElementById("cwcNavPanel-sidebar")) {
                    this.collapsedEl = this.targetEl.createChild({
                        cls: "sidebar x-layout-collapsed x-layout-collapsed-" + this.position,
                        id: this.panel.id + "-sidebar"
                    });
                    if (this.panel.navLoadCompleted) {
                        this.panel.createSidebar(this.collapsedEl.dom);
                    }
                }
                return this.collapsedEl;
            },
            cmargins: cwc.isRTL ? "0 0 0 5" : "0 5 0 0"
        };
        if (!cwc.isAccessibleMode && cwc.enableSidebarMenu !== "false") {
            Ext.apply(ret, sidebarConfig);
        }
        return ret;
    };
    var center = {
        region: "center",
        id: cwc.centerPanelId,
        xtype: (cwc.noTabsLayout) ? "cwcCenterPanel" : "cwcTabPanel",
        listeners: {
            afterrender: function(panel) {
                cwc.setProperty(panel.el, {
                    "role": "main"
                });
                Ext.DomHelper.insertFirst(cwc.centerPanelId, {
                    id: "mainContent",
                    tag: "a"
                });
                var tabUL = panel.el.child("ul.x-tab-strip");
                cwc.setProperty(tabUL, {
                    "role": "tablist"
                });
                Ext.DomHelper.insertFirst(panel.header, {
                    tag: "h2",
                    cls: "audible-text",
                    html: cwc.TAB_GROUP_HEADING
                });
                Ext.DomHelper.append(panel.header, {
                    id: "currentActiveTabHeader",
                    tag: "h1",
                    cls: "audible-text"
                });
            }
        },
        items: [{
            xtype: "cwcDetailTab",
            defaultSrc: cwc.srcOrigDetail,
            closable: false
        }]
    };
    var viewportItems = [north, west(), center];
    if (cwc.isRightPanelUsed) {
        var rightPanel = Ext.create({
            id: cwc.rightPanelId,
            xtype: "cwcRightPanel"
        });
        viewportItems.push(rightPanel);
    }
    var viewport = new Ext.Viewport({
        layout: "border",
        border: false,
        cls: "cwc-view",
        items: viewportItems
    });
    window.cwcMsgBox = Ext.create({
        id: "cwc_message_box",
        xtype: "cwc_message_box",
        width: 400,
        height: 400
    });
    cwc.mapKeys();
    var aboutLink = Ext.get("cwc_masthead_title_link");
    aboutLink.on({
        "focus": function(e, t) {
            cwc.util.showFocusTip(t);
        },
        "blur": function(e, t) {
            cwc.util.hideFocusTip();
        }
    });
    var skipLink = Ext.get("cwc_masthead_skip_link");
    skipLink.addClassOnFocus("focus");
    skipLink.on({
        "focus": function(e, t) {
            cwc.util.resizeMasthead(false);
            cwc.util.showFocusTip(t);
        },
        "blur": function(e, t) {
            cwc.util.resizeMasthead(false);
            cwc.util.hideFocusTip();
        }
    });
    document.getElementById("cwc_header").style.visibility = "visible";
    if (cwc.isAccessibleMode) {
        var panel = Ext.getCmp(cwc.navPanelId);
        if (!panel.savedCollapsed) {
            panel.expand();
        }
        var miniCollaps = Ext.get("cwcNavPanel-xcollapsed");
        if (miniCollaps && miniCollaps.dom) {
            var miniPanelDom = miniCollaps.dom;
            if (miniPanelDom.childElementCount > 0) {
                var iconDom = miniPanelDom.children[0];
                cwc.addStyleClass(iconDom, "icon-expand-right-no-circle");
            }
        }
    }
    cwc.forgotPassword && window.setTimeout(cwc.checkSecurityQuestion, 8000);
});
(function() {
    hpsm.notification = {};
    hpsm.notification.config = {};
    var types = ["smcReceiveChatRequest", "smcChatMessage"];
    hpsm.configDesktopNotification = function(type, durationValue) {
        if (types.indexOf(type) != -1) {
            if (!hpsm.notification.config[type]) {
                hpsm.notification.config[type] = {
                    duration: durationValue
                };
            }
        }
    };
    hpsm.showDesktopNotification = function(type, title, msg, icon) {
        var config = hpsm.notification.config[type];
        if (!config) {
            config = {};
        } else {
            var duration = config["duration"];
            var lastUpdateTime = config["lastUpdateTime"];
            var currentTime = new Date().getTime();
            if (duration && lastUpdateTime) {
                if (currentTime - lastUpdateTime < duration * 1000) {
                    return;
                }
            }
        }
        showNotificationForNonIE(title, msg, icon);
        config["lastUpdateTime"] = currentTime;
        hpsm.notification.config[type] = config;
    };

    function showNotificationForNonIE(title, msg, icon) {
        if (Notification.permission === "granted") {
            doShowNotification(title, msg, icon);
        } else {
            if (Notification.permission !== "denied") {
                Notification.requestPermission(function(permission) {
                    if (permission === "granted") {
                        doShowNotification(title, msg, icon);
                    }
                });
            }
        }
    }

    function doShowNotification(title, msg, icon) {
        cwc.playBeep();
        var options = {
            dir: "ltr",
            lang: "utf-8",
            icon: icon,
            body: msg
        };
        var notification = new Notification(title, options);
        notification.onshow = function() {};
        notification.onclick = function() {
            window.parent.focus();
        };
        notification.onclose = function() {};
        notification.onerror = function() {};
        setTimeout(notification.close.bind(notification), 15000);
    }
})();
if (!window.hpsm) {
    window.hpsm = {};
}
KEY = {
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    HOME: 36,
    END: 35,
    BACKSPACE: 8,
    DELETE: 46,
    COMMA: 188
};
hpsm.StringUtils = (function() {
    function startWith(str1, str2) {
        return str1.substring(0, str2.length) == str2;
    }

    function startWithNoCase(str1, str2) {
        return startWith(str1.toUpperCase(), str2.toUpperCase());
    }

    function isAlphaNumeric(key) {
        return (key >= 48 && key <= 90);
    }

    function isPrintableCharacter(str) {
        return str && str.length === 1 && str.match(/\S/);
    }

    function skipMatchingInput(widget, keyCode, value, oldValue) {
        var IME_SPACE = " ";
        var caretPosition = getCaretPosition(widget);
        var isInIME = cwc.isIE10 ? value.charAt(caretPosition - 1) == IME_SPACE : value.charAt(caretPosition) == IME_SPACE;
        var isSameLeftChar = value.charAt(caretPosition - 1) == oldValue.charAt(caretPosition - 1);
        if (isInIME && cwc.isIE10) {
            if (caretPosition == 1) {
                isSameLeftChar = true;
            } else {
                isSameLeftChar = value.charAt(caretPosition - 2) == oldValue.charAt(caretPosition - 2);
            }
        }
        return keyCode != KEY.SPACE && keyCode != KEY.BACKSPACE && (value == oldValue || isInIME && isSameLeftChar);
    }

    function getCaretPosition(widget) {
        if (document.selection) {
            var r = document.selection.createRange().duplicate();
            r.moveEnd("character", widget.value.length);
            if (r.text == "") {
                return widget.value.length;
            }
            return widget.value.lastIndexOf(r.text);
        } else {
            return widget.selectionStart;
        }
    }
    return {
        isEmpty: function(str) {
            return str === undefined || str === null || str === "";
        },
        isNotEmpty: function(str) {
            return !hpsm.StringUtils.isEmpty(str);
        },
        startWith: startWith,
        startWithNoCase: startWithNoCase,
        isAlphaNumeric: isAlphaNumeric,
        skipMatchingInput: skipMatchingInput,
        getCaretPosition: getCaretPosition,
        isPrintableCharacter: isPrintableCharacter
    };
})();
if (!window.hpsm) {
    window.hpsm = {};
}
hpsm.URLBuilder = function() {
    this.protocol = null;
    this.contextComponents = [];
    this.params = {};
};
hpsm.URLBuilder.getURLBuilder = function() {
    var builder = new hpsm.URLBuilder();
    builder.setCSRFToken(cwc.getCSRFTokenName(), cwc.getCSRFTokenValue());
    return builder;
};
hpsm.URLBuilder.getDetailURLBuilder = function() {
    var builder = hpsm.URLBuilder.getURLBuilder();
    builder.setAction(cwc.detailAction);
    return builder;
};
hpsm.URLBuilder.getListDetailURLBuilder = function() {
    return hpsm.URLBuilder.getDetailURLBuilder();
};
hpsm.URLBuilder.getListURLBuilder = function() {
    var builder = hpsm.URLBuilder.getURLBuilder();
    builder.setAction(cwc.listAction);
    return builder;
};
hpsm.URLBuilder.getServiceURLBuilder = function() {
    var builder = hpsm.URLBuilder.getURLBuilder();
    builder.setAction("service.do");
    return builder;
};
hpsm.URLBuilder.getNavMenuURLBuilder = function() {
    var builder = hpsm.URLBuilder.getURLBuilder();
    builder.setAction("cwc/nav.menu");
    return builder;
};
hpsm.URLBuilder.getWorkflowURLBuilder = function() {
    var builder = hpsm.URLBuilder.getURLBuilder();
    builder.setAction("wf");
    return builder;
};
hpsm.URLBuilder.prototype.setContext = function(context) {
    if (hpsm.StringUtils.isEmpty(context)) {
        context = "/";
    }
    this.contextComponents = [];
    if (hpsm.StringUtils.isNotEmpty(context)) {
        if ("/" === context) {
            this.contextComponents.push("/");
        } else {
            if (context.charAt(0) === "/") {
                this.contextComponents.push("/");
                context = context.substring(1);
            }
            var components = context.split("/");
            for (var inx = 0, len = components.length; inx < len; ++inx) {
                var component = components[inx];
                if (hpsm.StringUtils.isNotEmpty(component)) {
                    this.contextComponents.push(component);
                }
            }
        }
    }
    return this;
};
hpsm.URLBuilder.prototype.addContextComponent = function(contextComponent) {
    if (hpsm.StringUtils.isNotEmpty(contextComponent)) {
        this.contextComponents.push(contextComponent);
    }
    return this;
};
hpsm.URLBuilder.prototype.addFirstContextComponent = function(contextComponent) {
    if (hpsm.StringUtils.isNotEmpty(contextComponent)) {
        this.contextComponents.unshift(contextComponent);
    }
    return this;
};
hpsm.URLBuilder.prototype.setAction = function(action) {
    this.action = action;
    return this;
};
hpsm.URLBuilder.prototype.setCSRFToken = function(tokenName, tokenValue) {
    this.csrfTokenName = tokenName;
    this.csrfTokenValue = tokenValue;
    return this;
};
hpsm.URLBuilder.prototype.addParam = function(paramName, paramValue) {
    this.params[paramName] = paramValue;
    return this;
};
hpsm.URLBuilder.prototype.addParams = function(paramsToAdd) {
    for (var key in paramsToAdd) {
        this.params[key] = paramsToAdd[key];
    }
    return this;
};
hpsm.URLBuilder.prototype.setPath = function(path) {
    if (hpsm.StringUtils.isEmpty(path)) {
        return this;
    }
    var protocolToken = path.match(/^(http|https)\:\/\//g);
    if (protocolToken && protocolToken.length > 0) {
        this.protocol = protocolToken[0];
        path = path.substring(this.protocol.length);
    }
    var slashInx = path.lastIndexOf("/");
    if (slashInx != -1) {
        this.setContext(path.substring(0, slashInx));
        path = path.substring(slashInx + 1);
    }
    setActionAndQuery.call(this, path);
    return this;

    function setActionAndQuery(actionAndQuery) {
        var queryPrefixInx = actionAndQuery.indexOf("?");
        if (queryPrefixInx == -1) {
            this.setAction(actionAndQuery);
        } else {
            this.setAction(actionAndQuery.substring(0, queryPrefixInx));
            var query = actionAndQuery.substring(queryPrefixInx + 1);
            this.setQuery(query);
        }
    }
};
hpsm.URLBuilder.prototype.setQuery = function(query) {
    return this.addQuery(query);
};
hpsm.URLBuilder.prototype.addQuery = function(query) {
    if (hpsm.StringUtils.isEmpty(query)) {
        return this;
    }
    var arrParams = query.split(/\&/);
    for (var inx = 0, len = arrParams.length; inx < len; ++inx) {
        var paramStr = arrParams[inx];
        if (hpsm.StringUtils.isNotEmpty(paramStr)) {
            var eqIdx = paramStr.indexOf("=");
            if (eqIdx == -1) {
                this.params[paramStr] = null;
            } else {
                this.params[paramStr.substring(0, eqIdx)] = paramStr.substring(eqIdx + 1);
            }
        }
    }
    return this;
};
hpsm.URLBuilder.prototype.toURL = function(isCSRFEnabledFree, isQueryHashFree) {
    var strs = [];
    if (this.protocol) {
        strs.push(this.protocol);
    }
    for (var inx = 0, len = this.contextComponents.length; inx < len; ++inx) {
        var component = this.contextComponents[inx];
        strs.push(component);
        if (component.charAt(component.length - 1) !== "/") {
            strs.push("/");
        }
    }
    strs.push(this.action);
    var isFirstParam = true;
    if (isQueryHashFree) {
        this.params["hash_free_tk"] = this.csrfTokenValue;
    }
    for (var key in this.params) {
        appendParam(strs, key, this.params[key], isFirstParam);
        isFirstParam = false;
    }
    return strs.join("");

    function appendParam(strs, paramName, paramValue, isFirstParam) {
        if (isFirstParam) {
            strs.push("?");
        } else {
            strs.push("&");
        }
        strs.push(paramName);
        if (paramValue !== null) {
            strs.push("=");
            strs.push(paramValue);
        }
    }
};
! function() {
    var topCwc = cwc.getTopCwc();

    function processFunctionKeys(keyCode, e) {
        if (topCwc.isBlockedKeycode(keyCode)) {
            return null;
        }
        var tgt = (cwc.isListDetail() && !cwc.getActivePopup()) ? "listdetail" : "detail";
        return cwc.tryCall(topCwc.keyCallback, window, [e, tgt]);
    }
    var tabSectionController = {
        focus: function() {
            var activeElem = cwc._keyLastActiveElem;
            if (activeElem) {
                activeElem.focus();
            } else {
                var framePanel = cwc.getCurrentFramePanel();
                if (framePanel) {
                    topCwc.keys.focusFrameToolbar(framePanel);
                }
            }
        },
        blur: function() {
            var activeElem = tabSectionController.update();
            if (activeElem) {
                activeElem.blur();
            }
        },
        update: function() {
            var activeElem = document.activeElement;
            if (activeElem && activeElem.tagName != "BODY") {
                cwc._keyLastActiveElem = activeElem;
            }
            return activeElem;
        }
    };
    var F1Key = function(alt, shift, ctrl) {
        this.alt = alt;
        this.shift = shift;
        this.ctrl = ctrl;
    };
    Ext.apply(F1Key.prototype, {
        key: topCwc.keyHelp,
        fn: function(keyCode, e) {
            if (topCwc.disabledKeyHelp) {
                return;
            }
            cwc.tryCall(topCwc.keyHelpCallback, window, [e]);
        }
    });
    var F2Key = function(alt, shift, ctrl) {
        this.alt = alt;
        this.shift = shift;
        this.ctrl = ctrl;
    };
    Ext.apply(F2Key.prototype, {
        key: topCwc.keyMagnify,
        fn: processFunctionKeys
    });

    function mapKeysForPopup() {
        var cfg = [new F1Key(false, false), new F1Key(false, true), new F2Key(false, false), new F2Key(true, false), new F2Key(false, true), new F2Key(false, true, true), {
            key: Ext.EventObject.ENTER,
            fn: processFunctionKeys
        }, {
            key: Ext.EventObject.F4,
            ctrl: true,
            shift: true,
            fn: processFunctionKeys
        }, {
            key: Ext.EventObject.F6,
            ctrl: true,
            shift: true,
            fn: processFunctionKeys
        }, {
            key: [Ext.EventObject.F1, Ext.EventObject.F3, Ext.EventObject.F5, Ext.EventObject.F7, Ext.EventObject.F8, Ext.EventObject.F9, Ext.EventObject.F10, Ext.EventObject.F11, Ext.EventObject.F12],
            alt: true,
            fn: processFunctionKeys
        }, {
            key: [Ext.EventObject.C, Ext.EventObject.D],
            ctrl: true,
            alt: true,
            fn: processFunctionKeys
        }];
        return new cwc.ux.KeyMap(cwc.getActivePopup().getWindow().document, cfg, "keyup");
    }

    function mapKeys(scope) {
        if (cwc.getActivePopup()) {
            return mapKeysForPopup();
        }
        var base_config = [new F1Key(false, false), new F1Key(false, true), new F2Key(false, false), new F2Key(true, false), new F2Key(false, true), new F2Key(false, true, true), {
            key: 13,
            fn: processFunctionKeys
        }];
        var fn_config = [{
            key: 115,
            ctrl: true,
            shift: true,
            fn: processFunctionKeys
        }, {
            key: 117,
            ctrl: true,
            shift: true,
            fn: processFunctionKeys
        }, {
            key: [112, 114, 116, 118, 119, 120, 121, 122, 123],
            alt: true,
            fn: processFunctionKeys
        }, {
            key: [67, 68],
            ctrl: true,
            alt: true,
            fn: processFunctionKeys
        }];
        var modifier_alt_config = [{
            key: topCwc.keyMessages,
            alt: true,
            fn: function() {
                topCwc.messageManager.toggleMessageHistory();
            }
        }, {
            key: topCwc.keyMessages,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.messageManager.hideMessageBar();
            }
        }, {
            key: topCwc.keyAddBookmark,
            alt: true,
            fn: function(keyCode, e) {}
        }, {
            key: topCwc.keyLogout,
            alt: true,
            fn: function() {
                topCwc.logoutDialog();
            }
        }, {
            key: topCwc.keyCollapseExpandNav,
            alt: true,
            fn: function() {
                topCwc.keys.toggleNavPanelCollapse();
            }
        }, {
            key: topCwc.keyAbout,
            alt: true,
            fn: function() {
                topCwc.loadAbout();
            }
        }, {
            key: topCwc.keyPrint,
            alt: true,
            fn: function() {
                topCwc.print();
            }
        }, {
            key: topCwc.keyRefresh,
            alt: true,
            fn: function(keyCode, e) {
                topCwc.refresh(cwc.getActiveTab ? cwc.getActiveTab() : cwc.getCurrentTab());
            }
        }, {
            key: topCwc.keySyncTree,
            alt: true,
            fn: function(keyCode, e) {}
        }, {
            key: topCwc.keyTabSections,
            alt: true,
            fn: function() {
                topCwc.keys.tabSection();
            }
        }, {
            key: topCwc.keyToggleList,
            alt: true,
            ctrl: false,
            fn: function() {
                topCwc.keys.toggleList();
            }
        }, {
            key: topCwc.keyJumpAddress,
            alt: true,
            ctrl: false,
            fn: function() {
                topCwc.keys.jumpAddress();
            }
        }];
        var modifier_ctrlalt_config = [{
            key: topCwc.keyNavigator,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusNavigator();
            }
        }, {
            key: topCwc.keyMainContent,
            alt: true,
            ctrl: true,
            fn: function() {
                if (window.focusMainContent && Ext.isFunction(window.focusMainContent)) {
                    focusMainContent();
                } else {
                    topCwc.keys.focusMainContent();
                }
            }
        }, {
            key: topCwc.keyList,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusList();
            }
        }, {
            key: topCwc.keyDetail,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusDetail();
            }
        }, {
            key: topCwc.keyCloseActiveTab,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.closeActiveTab();
            }
        }, {
            key: topCwc.keyFocusTabHeader,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusTabHeader();
            }
        }, {
            key: topCwc.keyboardShortcutList,
            ctrl: true,
            alt: true,
            fn: function() {
                topCwc.showKeyboardShortcutList();
            }
        }, {
            key: topCwc.keyPrintList,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.printList();
            }
        }, {
            key: topCwc.keyOpenSmartSearch,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.keyOpenSmartSearch();
            }
        }, {
            key: topCwc.keyOpenQuickSearch,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.openQuickSearch();
            }
        }, {
            key: topCwc.keySmartSearchMainTopRegion,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusSmartSearchMainTop();
            }
        }, {
            key: topCwc.keySmartSearchMainLeftRegion,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusSmartSearchMainLeft();
            }
        }, {
            key: topCwc.keySmartSearchMainCenterRegion,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.keys.focusSmartSearchMainCenter();
            }
        }, {
            key: topCwc.keySmcChatRequest,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.toggleChatRequestPanel();
            }
        }, {
            key: topCwc.keySmcNotification,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.toggleSmcNotification();
            }
        }, {
            key: topCwc.keyAlertWindow,
            alt: true,
            ctrl: true,
            fn: function() {
                topCwc.toggleAlertWidnow();
            }
        }];
        var favoriteKeyMaps = [{
            key: topCwc.keyManageFav,
            alt: true,
            fn: function() {
                topCwc.switchNavDisplay();
            }
        }, {
            key: topCwc.keyAddListFav,
            alt: true,
            fn: function(keyCode, e) {
                topCwc.uniAddFavorite(true);
            }
        }, {
            key: topCwc.keyAddDetailFav,
            alt: true,
            fn: function(keyCode, e) {
                topCwc.uniAddFavorite(false);
            }
        }];
        if (topCwc.hasUserFavorites) {
            Array.prototype.push.apply(modifier_ctrlalt_config, favoriteKeyMaps);
        }
        if (topCwc.isMac) {
            var i, keyConfig;
            for (i = 0; i < fn_config.length; i++) {
                keyConfig = fn_config[i];
                if (keyConfig.ctrl) {
                    delete keyConfig.ctrl;
                }
                if (keyConfig.shift) {
                    delete keyConfig.shift;
                }
                keyConfig.alt = true;
            }
            for (i = 0; i < modifier_alt_config.length; i += 1) {
                keyConfig = modifier_alt_config[i];
                if (keyConfig.shift) {
                    delete keyConfig.shift;
                }
                keyConfig.ctrl = true;
                keyConfig.alt = true;
            }
            for (i = 0; i < modifier_ctrlalt_config.length; i += 1) {
                keyConfig = modifier_ctrlalt_config[i];
                if (keyConfig.alt) {
                    delete keyConfig.alt;
                }
                keyConfig.ctrl = true;
                keyConfig.shift = true;
            }
        }
        Ext.apply(config, {
            listeners: {
                destroy: function() {
                    window.console && console.log("destroy keymap for " + location.href);
                }
            }
        });
        var config = base_config.concat(fn_config).concat(modifier_alt_config).concat(modifier_ctrlalt_config);
        return new cwc.ux.KeyMap(scope || document, config, "keyup");
    }
    Ext.apply(cwc, {
        tabSectionController: tabSectionController,
        mapKeys: mapKeys
    });
}();
Ext.ns("cwc.keys");
! function() {
    function focusFrame(frame) {
        var frameWindow = frame.getFrameWindow();
        if (frameWindow.focusMainContent) {
            frameWindow.focusMainContent();
            return;
        }
        if (!focusFrameToolbar(frame)) {
            frame.getFrame().focus();
        }
    }

    function focusFrameToolbar(frame) {
        var topToolbar = frame.getTopToolbar();
        if (topToolbar.focusedBtn) {
            topToolbar.focusedBtn.focus();
            return true;
        }
        return false;
    }

    function toggleNavPanelCollapse() {
        Ext.getCmp("cwcNavPanel").toggleCollapse(true);
    }
    var SECTION_NAV = 0;
    var SECTION_MAIN = 1;
    var SECTION_LIST = 2;
    var SECTION_DETAIL = 3;
    var currentSectionId = SECTION_NAV;

    function getFocusedSection() {
        switch (currentSectionId) {
            case SECTION_NAV:
                return top;
            case SECTION_MAIN:
                return cwc.getActiveTab().getFrameWindow();
            case SECTION_LIST:
                return cwc.getActiveTab().getListFrameWindow();
            case SECTION_DETAIL:
                return cwc.getActiveTab().getDetailFrameWindow();
            default:
                return top;
        }
    }

    function getNextSection() {
        var tab = cwc.getActiveTab();
        if (tab.hasListDetail()) {
            currentSectionId = (currentSectionId + 1) % 4;
            if (currentSectionId == 1) {
                currentSectionId = currentSectionId + 1;
            }
        } else {
            currentSectionId = (currentSectionId + 1) % 2;
        }
        return getFocusedSection();
    }
    Ext.apply(cwc.tabSectionController, {
        focus: function() {
            var activeElem = cwc._keyLastActiveElem;
            if (activeElem) {
                activeElem.focus();
            } else {
                focusNavigator();
            }
        },
        update: function() {
            var activeElem = document.activeElement;
            if (activeElem) {
                if (Ext.fly(activeElem).hasClass("x-tree-node-anchor") || Ext.fly(activeElem).hasClass("x-panel-header")) {
                    cwc._keyLastActiveElem = activeElem;
                }
            }
            return activeElem;
        }
    });

    function tabSection() {
        var lastSection = getFocusedSection();
        cwc.tryCall("cwc.tabSectionController.blur", lastSection);
        var nextSection = getNextSection();
        cwc.tryCall("cwc.tabSectionController.focus", nextSection);
    }

    function toggleList() {
        var tab = cwc.getActiveTab();
        if (tab.hasListDetail()) {
            var listPanel = tab.getListContainerPanel();
            if (listPanel.collapsed) {
                listPanel.expand();
            } else {
                listPanel.collapse();
            }
            if (cwc.isMac) {
                var frame = tab.getListFrameWindow();
                if (frame && frame.hpsm) {
                    var state = frame.hpsm.local.recordsList.isVisible();
                    frame.hpsm.local.recordsList.setVisible(!state);
                }
            }
        }
    }

    function jumpAddress() {
        var tab = cwc.getActiveTab();
        var tbar = tab.findDetailFrame().getTopToolbar();
        var bnts = tbar.items.items;
        var jumpAddr = null;
        if (!bnts || bnts.length <= 0) {
            return;
        }
        Ext.each(bnts, function(bnt) {
            if (bnt.xtype && bnt.xtype == "cwc_jumpaddress_combox") {
                jumpAddr = bnt;
            }
        });
        if (jumpAddr) {
            jumpAddr.onTriggerClick();
        }
    }

    function focusNavigator() {
        var navPanel = Ext.getCmp("cwcNavPanel");
        if (!navPanel.collapsed) {
            navPanel.toolbars[0].focusedBtn.focus();
        } else {
            if (navPanel.isInSidebarMode) {
                navPanel.sidebar.focusExpendButton();
            } else {
                if (navPanel.miniCollapseDivEl) {
                    navPanel.miniCollapseDivEl.focus();
                }
            }
        }
    }

    function getActiveFrame() {
        if (cwc.getActivePopup()) {
            return cwc.getActivePopup().getWindow();
        }
        var activeTab = cwc.getActiveTab();
        if (activeTab.hasListDetail()) {
            return activeTab.getDetailFrameWindow();
        } else {
            return activeTab.getFrameWindow();
        }
    }

    function focusMainContent() {
        var activeTab = cwc.getActiveTab();
        var centerFrame = activeTab.getMIF();
        if (activeTab.hasListDetail()) {
            var listFrame = activeTab.getListFrame();
            focusFrame(listFrame);
        } else {
            focusFrame(centerFrame);
        }
    }

    function focusList() {
        var tab = cwc.getActiveTab();
        if (tab.hasListDetail()) {
            var listFrame = tab.getListFrame();
            focusFrame(listFrame);
        }
    }

    function focusDetail() {
        var tab = cwc.getActiveTab();
        if (tab.hasListDetail()) {
            var detailFrame = tab.getDetailFrame();
            focusFrame(detailFrame);
        }
    }

    function closeActiveTab() {
        var tab = cwc.getActiveTab();
        if (tab.closable && tab.isDomReady()) {
            if (tab.fireEvent("beforeclose", tab) !== false) {
                tab.fireEvent("close", tab);
                cwc.deferCloseTab(tab, 200);
            }
        }
    }

    function focusTabHeader() {
        if (cwc.isChrome) {
            cwc.getActiveTab().getFrame().focus();
        }
        Ext.get(cwc.getActiveTab().tabEl).child("a.x-tab-right").focus();
    }

    function print() {
        var tab = cwc.getActiveTab();
        if (cwc.hasListDetail()) {
            cwc.print(tab.getDetailFrame());
        } else {
            cwc.print(tab.getFrame());
        }
    }

    function printList() {
        var tab = cwc.getActiveTab();
        if (tab.hasListDetail()) {
            cwc.print(tab.getListFrame());
        } else {
            cwc.print(tab.getFrame());
        }
    }

    function openSmartSearchWindow() {
        cwc.gtrigger("gs:smart-search");
    }

    function openQuickSearch() {
        var suggestedSolutionDiv = getActiveFrame().document.querySelector("#gsSuggestedSolutionButtonId");
        if (suggestedSolutionDiv) {
            suggestedSolutionDiv.querySelector("button").click();
        }
    }

    function focusSmartSearchMainTop() {
        var mainDiv = document.querySelector(".gs.main");
        if (mainDiv && mainDiv.style.Visibility != "hidden") {
            var searchinput = mainDiv.querySelector(".search-input").querySelector("input");
            searchinput.focus();
        }
    }

    function focusSmartSearchMainLeft() {
        var mainDiv = document.querySelector(".gs.main");
        if (mainDiv && mainDiv.style.Visibility != "hidden") {
            var allLibDiv = mainDiv.querySelector(".libraries.all");
            if (allLibDiv) {
                var allCheckbox = allLibDiv.querySelector("input");
                allCheckbox.focus();
            }
        }
    }

    function focusSmartSearchMainCenter() {
        var mainDiv = document.querySelector(".gs.main");
        if (mainDiv && mainDiv.style.Visibility != "hidden") {
            var recordDiv = mainDiv.querySelector(".results .record");
            if (recordDiv) {
                recordDiv.focus();
            }
        }
    }
    window.smKeyHandler = function(evt, docTarget) {
        var activeFrame = getActiveFrame();
        var tgtHandler = cwc.getObjectByAttributePath("smKeyHandler", activeFrame);
        if (tgtHandler && Ext.isFunction(tgtHandler)) {
            tgtHandler.call(activeFrame, evt, docTarget);
        }
    };
    Ext.apply(cwc.keys, {
        toggleNavPanelCollapse: toggleNavPanelCollapse,
        tabSection: tabSection,
        toggleList: toggleList,
        jumpAddress: jumpAddress,
        focusNavigator: focusNavigator,
        focusMainContent: focusMainContent,
        focusFrameToolbar: focusFrameToolbar,
        focusList: focusList,
        focusDetail: focusDetail,
        closeActiveTab: closeActiveTab,
        focusTabHeader: focusTabHeader,
        print: print,
        printList: printList,
        keyOpenSmartSearch: openSmartSearchWindow,
        openQuickSearch: openQuickSearch,
        focusSmartSearchMainTop: focusSmartSearchMainTop,
        focusSmartSearchMainLeft: focusSmartSearchMainLeft,
        focusSmartSearchMainCenter: focusSmartSearchMainCenter
    });
}();
var hpsm = window.hpsm || {};
(function() {
    var POST = "POST",
        GET = "GET",
        overridden = false,
        csrfHeader = {},
        fn;

    function prepareToAntiCSRF() {
        if (overridden || !(window.cwc && cwc.antiCSRFEnabled)) {
            return;
        }
        overridden = true;
        csrfHeader["X-CSRF-Token"] = cwc.getCSRFTokenName() + "=" + cwc.getCSRFTokenValue();
        var prototype = Ext.data.Connection.prototype;
        fn = prototype.request;
        Ext.override(Ext.data.Connection, {
            request: function(o) {
                o = o || {};
                var me = this,
                    data = o.rawData || o.xmlData || o.jsonData || null,
                    method = (o.method || me.method || ((o.params || data) ? POST : GET)).toUpperCase();
                if (method !== GET) {
                    o.headers = Ext.apply(o.headers || {}, csrfHeader);
                }
                fn.call(me, o);
            }
        });
    }
    hpsm.addTokenForPostRequest = function(req) {
        req.setRequestHeader("X-CSRF-Token", cwc.getCSRFTokenName() + "=" + cwc.getCSRFTokenValue());
    };
    if (!(Ext.data && Ext.data.Connection) && Ext.syncRequire) {
        Ext.syncRequire("Ext.data.Connection");
    }
    prepareToAntiCSRF();
    Ext.onReady(function() {
        prepareToAntiCSRF();
    });
})();
(function(Ext, cwc) {
    var ux = Ext.namespace("hpsm.ux");
    var tpl = new Ext.XTemplate('<tpl if="hasSwitcher">', '<button class="mode {mode} disable-autosubmit" ext:qtip="{modetip}" aria-label="{modetip}"></button>', "</tpl>", '<div class="group">', '<input id="gs-trigger-cmdcombined" type="text" placeholder="{placeholder}" aria-label="{tooltip}" ext:qtip="{tooltip}" maxlength="4096">', '<button aria-expanded={expanded} class="{iconCls} disable-autosubmit cwc-toolbar-button js-trigger" ext:qtip="{tooltip}" aria-label="{tooltip}"></button>', "</div>").compile();
    var MODE_SWITCHER = {
        "search": "command",
        "command": "search"
    };
    var ToggleState = Ext.extend(Ext.util.Observable, {
        constructor: function(config) {
            var isCmdActive = config.isCmdActive,
                isUniSearchActive = config.isUniSearchActive;
            if (isCmdActive && isUniSearchActive) {
                this.mode = cwc.store.session.getItem("tbar_cmd_isSearch") ? "search" : "command";
                this._switable = true;
            } else {
                if (isCmdActive) {
                    this.mode = "command";
                } else {
                    if (isUniSearchActive) {
                        this.mode = "search";
                    } else {
                        this.mode = null;
                    }
                }
            }
            this.activeItem = null;
            cwc.gon("smartsearch:query", this.onQuery, this);
            Ext.apply(this, config);
            ToggleState.superclass.constructor.call(this, config);
        },
        isSwitchable: function() {
            return this._switable;
        },
        getMode: function() {
            return this.mode;
        },
        isCommandBoxVisible: function() {
            return !this.isUsingClassicStyle() && (this.isCmdActive || this.isUniSearchActive);
        },
        isSearchBoxVisible: function() {
            return !this.isUsingClassicStyle() && this.isSaEnabled;
        },
        isUsingClassicStyle: function() {
            return !this.isCommandSearchStyle;
        },
        getSwitcherToolTip: function() {
            var mode = this.getMode();
            return mode == "search" ? top.cwc.SWITCH_COMMAND_BTN : top.cwc.SWITCH_SEARCH_BTN;
        },
        getSwitchPlaceHolder: function() {
            var mode = this.getMode();
            return mode === "search" ? top.cwc.SEARCH_LINE_FIELD : top.cwc.COMMAND_LINE_FIELD;
        },
        switchMode: function() {
            var oldMode = this.mode;
            this.mode = MODE_SWITCHER[oldMode];
            cwc.store.session.setItem("tbar_cmd_isSearch", this.mode === "search");
            this.fireEvent("mode:switched", oldMode, this.mode);
        },
        onQuery: function(query) {
            this.queryText = query;
            this.fireEvent("smartsearch:query", query);
        },
        select: function(item) {
            this.activeItem = (this.activeItem === item) ? null : item;
            this.fireEvent("select", this.activeItem);
        }
    });
    ux.ToggleState = ToggleState;
    var CommandSearchInput = Ext.define("Command.Search.Input", {
        extend: "Ext.BoxComponent",
        cls: "commandsearch",
        constructor: function(cfg) {
            if (!cfg.state) {
                throw new Error("Toggle State is required");
            }
            this.callParent(arguments);
        },
        initComponent: function() {
            this.callParent(arguments);
            this.on("render", this.renderUI, this);
            this.relayEvents(this.state, ["smartsearch:query", "mode:switched"]);
            this.expanded = this.state.widgetType === "commandSearch" ? top.cwc.expandCommandLine : false;
        },
        renderUI: function() {
            tpl.overwrite(this.el, {
                placeholder: this.placeholder,
                iconCls: this.iconCls,
                hasSwitcher: !!this.hasSwitcher,
                mode: this.state.mode,
                modetip: this.modetip || "",
                tooltip: this.tooltip,
                expanded: this.expanded
            });
            this.mon(this.el, "click", this.state.switchMode, this.state, {
                delegate: ".mode"
            });
            this.mon(this.el, "click", this.onTriggerClick, this, {
                delegate: ".js-trigger"
            });
            this.mon(this.el, "keydown", this.onExecute, this, {
                delegate: "input"
            });
            this.mon(this.state, "select", function(activeItem) {
                if (this.expanded) {
                    this.collapse(activeItem);
                } else {
                    this.expand();
                }
            }, this);
        },
        getText: function() {
            return this.el.child("input").getValue();
        },
        setText: function(value) {
            this.el.child("input").dom.value = value;
        },
        onExecute: function(e) {
            if (e.getKey() === e.ENTER) {
                e.preventDefault();
                e.stopPropagation();
                var text = this.getText(),
                    mode = this.state.mode;
                if (!Ext.isEmpty(text)) {
                    this.execute(text, mode);
                }
            }
        },
        onTriggerClick: function(e, btn) {
            this.state.select(this);
        },
        expand: function() {
            this.expanded = true;
            this.el.child(".group").on("transitionend", function() {
                var btn = this.el.child("button.icon");
                btn.set({
                    "aria-expanded": true
                });
                if (this.el.hasClass("active")) {
                    this.el.addClass("editable");
                }
                var input = this.el.child("input");
                input.focus(10);
                input.dom.select();
                var toolbar = Ext.get("cwc_masthead_toolbar");
                if (this.hasSwitcher && this.container.id == "cmd-input") {
                    cwc.util.setToolbarARIA({
                        "toolbar": toolbar
                    });
                }
                if (btn.getAttribute("tabindex") < 0) {
                    toolbar.focusedBtn.set({
                        "tabindex": "-1"
                    });
                    btn.set({
                        "tabindex": "0"
                    });
                    toolbar.focusedBtn = btn;
                }
            }, this, {
                single: true
            });
            this.el.addClass("active");
            setTimeout(function() {
                cwc.util.resizeMasthead(true);
            }, 300);
        },
        collapse: function(activeItem) {
            this.expanded = false;
            var btn = this.el.child("button.icon");
            btn.set({
                "aria-expanded": false
            });
            this.el.removeClass("active");
            this.el.removeClass("editable");
            if (this.hasSwitcher && this.container.id == "cmd-input") {
                cwc.util.setToolbarARIA({
                    "toolbar": Ext.get("cwc_masthead_toolbar")
                });
            }
            if (activeItem == null) {
                this.el.child(".group").on("transitionend", function() {
                    btn.blur();
                    btn.focus();
                }, this, {
                    single: true
                });
            }
            setTimeout(function() {
                cwc.util.resizeMasthead(true);
            }, 300);
        }
    });

    function initializeSearchBox(context) {
        return new CommandSearchInput({
            renderTo: context.searchEl,
            state: context,
            placeholder: cwc.getResourceString("globalSearchBundle", "Search.PlaceHolder"),
            tooltip: cwc.getResourceString("globalSearchBundle", "Search.ToolTip"),
            iconCls: "icon icon-search icon-20 inverted cwc",
            listeners: {
                "smartsearch:query": function(query) {
                    this.setText(query);
                }
            },
            execute: function(keyword) {
                cwc.gtrigger("gs:smart-search");
                cwc.gtrigger("gs:smc:search", keyword);
            }
        });
    }

    function initializeCommandBox(context) {
        return new CommandSearchInput({
            renderTo: context.cmdEl,
            cls: "commandsearch" + (top.cwc.expandCommandLine ? " active editable" : ""),
            tooltip: context.getSwitchPlaceHolder(),
            placeholder: context.getSwitchPlaceHolder(),
            modetip: context.getSwitcherToolTip(),
            iconCls: "icon icon-20 inverted cwc icon-command",
            state: context,
            hasSwitcher: context.isSwitchable(),
            listeners: {
                afterrender: function() {
                    if (this.hasSwitcher) {
                        this.mon(this.state, "mode:switched", function() {
                            var tooltip = context.getSwitcherToolTip();
                            var placeholder = context.getSwitchPlaceHolder();
                            this.el.child(".mode").dom.setAttribute("ext:qtip", tooltip);
                            this.el.child(".mode").dom.setAttribute("aria-label", tooltip);
                            this.el.child("input").dom.setAttribute("placeholder", placeholder);
                            this.el.child("input").dom.setAttribute("ext:qtip", placeholder);
                            this.el.child("input").dom.setAttribute("aria-label", placeholder);
                            this.el.child(".js-trigger").dom.setAttribute("ext:qtip", placeholder);
                            this.el.child(".js-trigger").dom.setAttribute("aria-label", placeholder);
                            this.el.child(".mode").blur();
                            this.el.child(".mode").focus(10);
                        }, this);
                    }
                },
                "mode:switched": function(oldMode, newMode) {
                    this.el.child(".mode").removeClass(oldMode).addClass(newMode);
                }
            },
            execute: function(keyword, mode) {
                this.setText("");
                keyword = keyword.trim();
                var commandUrl = "detail.do?thread=0&",
                    command = (mode === "search") ? "=" + keyword : keyword;
                commandUrl += "commandLine=" + encodeURIComponent(command);
                top.cwc.openNewTabPanel({
                    url: commandUrl,
                    focusToHeader: false
                });
            }
        });
    }
    ux.initialize = function(context) {
        var stateToggle = new ux.ToggleState(context);
        if (stateToggle.isCommandBoxVisible()) {
            context.widgetType = "commandSearch";
            initializeCommandBox(new ux.ToggleState(context));
        }
        if (stateToggle.isSearchBoxVisible()) {
            context.widgetType = "smartSearch";
            initializeSearchBox(new ux.ToggleState(context));
        }
        if (context.isSaEnabled) {
            var gs = Ext.namespace("hpsm.gs");
            gs.initialize(null, context.isPowerMode);
            if (stateToggle.isUsingClassicStyle()) {
                Ext.get(context.legacySearchEl).on("click", function() {
                    cwc.gtrigger("gs:smart-search");
                });
            }
        }
    };
})(Ext, cwc);
cwc.ux.navSearchInput = Ext.define("Nav.Search.Input", {
    extend: "Ext.BoxComponent",
    html: '<div class="searchGroup">' + '<button type="button" class="searchFavbtn x-btn-text cwc-toolbar-search-favorites icon-search-exclude-favorites"></button>' + '<div class="searchBox">' + '<input id="searchInput" class="searchInput" />' + "</div>" + "</div>" + '<div class="audible-text" id="searchResultDiv" aria-live="polite">' + '<div id="searchResult">' + "</div>" + "</div>",
    afterRender: function() {
        cwc.ux.navSearchInput.superclass.afterRender.call(this);
        this.searchInput = this.el.child("input");
        this.searchScopeButton = this.el.child("button");
        this.mon(this.searchInput, {
            scope: this,
            input: this.searchInputInputHandler,
            focus: this.searchInputFocusHandler,
            drop: this.searchInputDropHandler,
            blur: this.searchInputBlurHandler
        });
        this.mon(this.searchScopeButton, {
            scope: this,
            click: this.searchScopeButtonClickHandler
        });
        this.searchToolTip = new cwc.searchTooltip({
            target: this.searchScopeButton,
            title: cwc.NAVTREE_SEARCH_BUTTON_TIP_INCLUDE_FAV
        });
        this.resetSearchScopeButtonStyle();
        this.searchInput.dom.setAttribute("title", cwc.NAVTREE_SEARCH_LABEL);
        this.searchInput.dom.setAttribute("aria-label", cwc.NAVTREE_SEARCH_PLACE_HOLDER);
        this.searchInput.dom.setAttribute("placeholder", cwc.NAVTREE_SEARCH_PLACE_HOLDER);
        this.searchScopeButton.dom.setAttribute("aria-label", cwc.NAVTREE_SEARCH_BUTTON_LABEL);
        this.setSearchInputFontSize();
    },
    searchInputFocusHandler: function(event, target) {
        this.el.child("div .searchGroup").addClass("xFocus");
        this.searchInputDropHandler(event, target);
    },
    searchInputDropHandler: function(event, target) {
        var data = cwc.getSearchTreeCache();
        if (!data) {
            Ext.Ajax.request({
                url: cwc.toCSRFSafe(cwc.frameworkContext + "/cwc/nav.menu?name=navSearch"),
                method: "GET",
                scope: this,
                success: function(response, options) {
                    var xmlData = response.responseXML;
                    var root = xmlData.documentElement || xmlData;
                    var data = root.outerHTML || new XMLSerializer().serializeToString(root);
                    cwc.storeSearchTreeCache(data);
                    this.renderTree();
                },
                failure: function() {
                    Ext.getCmp(cwc.navPanelId).getEl().unmask();
                    if (window.console) {
                        console.warn("search tree request failed");
                    }
                }
            });
        }
    },
    searchInputBlurHandler: function(event, target) {
        this.el.child("div .searchGroup").removeClass("xFocus");
    },
    searchInputInputHandler: function(event, target) {
        if ((cwc.currentTreePanel() == 0 && !Ext.getCmp(cwc.navPanelId).navTreeIsFiltered && !target.value) || (cwc.currentTreePanel() == 1 && !Ext.getCmp(cwc.navPanelId).favTreeIsFiltered && !target.value)) {
            return;
        }
        var searchValue = this.searchInput.dom.value;
        if (searchValue.length < cwc.searchMinChars) {
            searchValue = "";
        }
        if (!this.lastSearchValue) {
            this.lastSearchValue = "";
        }
        if (searchValue === this.lastSearchValue) {
            return;
        }
        if (this.el.timeoutId) {
            clearTimeout(this.el.timeoutId);
        }
        var that = this;
        this.el.timeoutId = setTimeout(function() {
            that.renderTree();
        }, 500);
        var searchValue = this.searchInput.dom.value;
        if (searchValue && Ext.query("#cwcNavPanel .x-mask-loading").length <= 0) {
            Ext.getCmp(cwc.navPanelId).getEl().mask(cwc.LOADING, "x-mask-loading");
            var top = Ext.query("#cwcNavPanel .x-mask-loading")[0].style.top.replace("px", "");
            var newTop = Math.round(parseInt(top) / 2);
            Ext.query("#cwcNavPanel .x-mask-loading")[0].style.top = newTop + "px";
            Ext.query("#cwcNavPanel .x-mask-loading")[0].style.visibility = "visible";
        }
    },
    searchScopeButtonClickHandler: function(event, target) {
        if (cwc.currentTreePanel() == 1) {
            return;
        }
        if (cwc.searchTreeHasExpanded()) {
            this.switchSearchScopeButtonStyle();
            this.resetTree();
        }
    },
    renderTree: function() {
        var searchValue = this.searchInput.dom.value;
        if (searchValue.length < cwc.searchMinChars) {
            searchValue = "";
        }
        if (searchValue === this.lastSearchValue) {
            Ext.getCmp(cwc.navPanelId).getEl().unmask();
            return;
        }
        var data = cwc.getSearchTreeCache();
        if (!data) {
            return;
        }
        cwc.initResultCount();
        if (!this.el.child("div[id=searchResultDiv]").hasClass("audible-text")) {
            this.el.child("div[id=searchResultDiv]").addClass("audible-text");
        }
        if (cwc.currentTreePanel() == 0) {
            if (!Ext.getCmp(cwc.navPanelId).navTreeIsFiltered && !this.searchInput.dom.value) {
                Ext.getCmp(cwc.navPanelId).getEl().unmask();
                return;
            }
            if (document.getElementById("cwcNavPanel-sidebar")) {
                document.getElementById("cwcNavPanel-sidebar").parentNode.removeChild(document.getElementById("cwcNavPanel-sidebar"));
            }
            this.lastSearchValue = searchValue;
            Ext.getCmp(cwc.navId).removeAll();
            cwc.createNavTree(searchValue, data);
        } else {
            if (!Ext.getCmp(cwc.navPanelId).favTreeIsFiltered && !this.searchInput.dom.value) {
                Ext.getCmp(cwc.navPanelId).getEl().unmask();
                return;
            }
            this.lastSearchValue = searchValue;
            Ext.getCmp(cwc.favMgrId).removeAll();
            cwc.createFavTree(searchValue, data);
        }
        if (searchValue) {
            this.changeResultHtml();
        }
        Ext.getCmp(cwc.navPanelId).getEl().unmask();
    },
    switchSearchScopeButtonStyle: function() {
        if (cwc.getSearchFavStyle()) {
            this.switchToSearchExcludeFavStyle();
            cwc.storeSearchFavStyle(false);
        } else {
            this.switchToSearchFavStyle();
            cwc.storeSearchFavStyle(true);
        }
    },
    resetSearchScopeButtonStyle: function() {
        if (cwc.getSearchFavStyle()) {
            this.switchToSearchFavStyle();
        } else {
            this.switchToSearchExcludeFavStyle();
        }
    },
    switchToSearchFavStyle: function() {
        this.searchScopeButton.replaceClass("icon-search-exclude-favorites", "icon-search-favorites");
        this.searchScopeButton.dom.setAttribute("aria-pressed", true);
        this.searchToolTip.setTitle(cwc.NAVTREE_SEARCH_BUTTON_TIP_INCLUDE_FAV);
    },
    switchToSearchExcludeFavStyle: function() {
        this.searchScopeButton.replaceClass("icon-search-favorites", "icon-search-exclude-favorites");
        this.searchScopeButton.dom.setAttribute("aria-pressed", false);
        this.searchToolTip.setTitle(cwc.NAVTREE_SEARCH_BUTTON_TIP_EXCLUDE_FAV);
    },
    disableSearchScopeButton: function() {
        this.searchScopeButton.addClass("disabled");
        this.searchScopeButton.dom.setAttribute("tabindex", -1);
        this.searchScopeButton.dom.setAttribute("disabled", "disabled");
    },
    enableSearchScopeButton: function() {
        this.searchScopeButton.removeClass("disabled");
        this.searchScopeButton.dom.setAttribute("tabindex", 0);
        this.searchScopeButton.dom.removeAttribute("disabled");
    },
    resetTree: function() {
        this.el.child("input").dom.value = "";
        this.renderTree();
    },
    setSearchInputWidth: function(width) {
        this.el.dom.style.width = width + "px";
    },
    setSearchInputFontSize: function() {
        var toolbarDiv = Ext.fly("navSearchInput").findParent("div .x-toolbar-layout-ct");
        if (toolbarDiv && !Ext.fly(toolbarDiv).hasClass("search")) {
            Ext.fly(toolbarDiv).addClass("search");
        }
    },
    changeResultHtml: function() {
        var resultCount = cwc.getResultCount();
        var resultString = "";
        if (!resultCount || resultCount <= 0) {
            this.el.child("div[id=searchResultDiv]").removeClass("audible-text");
            resultString = cwc.NAVTREE_SEARCH_NO_RESULT;
        } else {
            if (resultCount == 1) {
                resultString = String.format(cwc.NAVTREE_SEARCH_ONE_RESULT, resultCount);
            } else {
                resultString = String.format(cwc.NAVTREE_SEARCH_RESULTS, resultCount);
            }
        }
        this.el.child("[id=searchResult]").dom.innerHTML = resultString;
    }
});
cwc.searchTooltip = Ext.extend(Ext.ToolTip, {
    showAt: function(xy) {
        Ext.Tip.superclass.show.call(this);
        if (this.measureWidth !== false && (!this.initialConfig || typeof this.initialConfig.width != "number")) {
            this.doAutoWidth(5);
        }
        if (this.constrainPosition) {
            xy = this.el.adjustForConstraints(xy);
        }
        if (topCwc.isRTL) {
            xy[0] = xy[0] - this.getWidth();
        }
        this.setPagePosition(xy[0], xy[1]);
    }
});
Ext.reg("navSearchInput", cwc.ux.navSearchInput);
