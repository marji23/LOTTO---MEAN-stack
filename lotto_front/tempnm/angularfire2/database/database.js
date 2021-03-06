import { Inject, Injectable } from '@angular/core';
import { FirebaseApp, FirebaseConfig } from '../tokens';
import { FirebaseListFactory } from './index';
import * as utils from '../utils';
import { FirebaseObjectFactory } from './index';
export var AngularFireDatabase = (function () {
    function AngularFireDatabase(fbConfig, fbApp) {
        this.fbConfig = fbConfig;
        this.fbApp = fbApp;
    }
    AngularFireDatabase.prototype.list = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return FirebaseListFactory(_this.fbApp.database().refFromURL(getAbsUrl(_this.fbConfig, urlOrRef)), opts); },
            isRef: function () { return FirebaseListFactory(urlOrRef); }
        });
    };
    AngularFireDatabase.prototype.object = function (urlOrRef, opts) {
        var _this = this;
        return utils.checkForUrlOrFirebaseRef(urlOrRef, {
            isUrl: function () { return FirebaseObjectFactory(_this.fbApp.database().refFromURL(getAbsUrl(_this.fbConfig, urlOrRef)), opts); },
            isRef: function () { return FirebaseObjectFactory(urlOrRef); }
        });
    };
    AngularFireDatabase.decorators = [
        { type: Injectable },
    ];
    AngularFireDatabase.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseConfig,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [FirebaseApp,] },] },
    ]; };
    return AngularFireDatabase;
}());
function getAbsUrl(root, url) {
    if (!(/^[a-z]+:\/\/.*/.test(url))) {
        url = root.databaseURL + '/' + utils.stripLeadingSlash(url);
    }
    return url;
}
//# sourceMappingURL=database.js.map