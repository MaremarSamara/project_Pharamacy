"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isTrue(name, filter_name) {
    //console.log(name);
    if (name != null) {
        name = name.toLowerCase();
        filter_name = filter_name.toLowerCase();
        if (name.includes(filter_name))
            return true;
    }
    return false;
}
exports.default = isTrue;
