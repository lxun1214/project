var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
///////////////////////////////////////////////////////////////////////////////
//
//  哈希表
//      *方便大数据量的存储和查找，比如资源，对象池等等
//      *适合任何类型的键
//      *适合任何类型的值
//      *提供查找键，查找值，删除键值，获取表长度等基础功能
//      *HashObject或是String和Number类型的键能有效提高查找效率
//
///////////////////////////////////////////////////////////////////////////////
var HashMap = (function () {
    /*
     * @keyType 键值类型
     */
    function HashMap() {
        this._keyArr = new Array();
        this._valueArr = new Array();
        this._map = new Object();
    }
    HashMap.prototype.clear = function () {
        this._keyArr.length = this._valueArr.length = 0;
        this._map = {};
    };
    /*
     * 判断是否有存储某个键值
     */
    HashMap.prototype.has = function (key) {
        if (key instanceof egret.HashObject) {
            return this._map[key.hashCode.toString()] != undefined;
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            return this._map[key.toString()] != undefined;
        }
        return this._keyArr.indexOf(key) != -1;
    };
    /*
     * 记录键值
     */
    HashMap.prototype.add = function (key, value) {
        if (this.has(key)) {
            this.delete(key);
        }
        if (key instanceof egret.HashObject) {
            if (this._map[key.hashCode] == undefined) {
                this._keyArr.push(key);
                this._map[key.hashCode] = value;
            }
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            if (this._map[key.toString()] == undefined) {
                this._keyArr.push(key);
                this._map[key.toString()] = value;
            }
        }
        else {
            if (this._keyArr.indexOf(key) == -1) {
                this._valueArr[this._keyArr.length] = value;
                this._keyArr.push(key);
            }
        }
    };
    /*
     * 获取键值
     */
    HashMap.prototype.get = function (key) {
        if (key instanceof egret.HashObject) {
            return this._map[key.hashCode];
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            return this._map[key.toString()];
        }
        else {
            var index = this._keyArr.indexOf(key);
            if (index == -1) {
                return null;
            }
            return this._valueArr[index];
        }
    };
    HashMap.prototype.startForMap = function (keyType) {
        this._tmIndex = 0;
        this._keyType = keyType;
        if (!this._getByIndex) {
            this._getByIndex = this.getByIndex;
        }
        if (keyType == egret.HashObject) {
            this.getByIndex = this.getByIndex1;
            this.deleteContext = this.deleteContext1;
        }
        else if (keyType == String || keyType == Number) {
            this.getByIndex = this.getByIndex2;
            this.deleteContext = this.deleteContext2;
        }
        else {
            this.getByIndex = this.getByIndex3;
            this.deleteContext = this.deleteContext3;
        }
    };
    HashMap.prototype.endForMap = function () {
        if (this._getByIndex) {
            this.getByIndex = this._getByIndex;
        }
    };
    HashMap.prototype.getByIndex1 = function (index) {
        var ky = this._keyArr[index];
        this._tmIndex = index;
        this._tmKey = ky;
        return { key: ky, value: this._map[ky.hashCode] };
    };
    HashMap.prototype.getByIndex2 = function (index) {
        var ky = this._keyArr[index];
        this._tmIndex = index;
        this._tmKey = ky;
        return { key: ky, value: this._map[ky.toString()] };
    };
    HashMap.prototype.getByIndex3 = function (index) {
        this._tmIndex = index;
        return { key: this._keyArr[index], value: this._valueArr[index] };
    };
    HashMap.prototype.getByIndex = function (index) {
        if (index == -1) {
            return null;
        }
        var ky = this._keyArr[index];
        if (!ky)
            return null;
        if (ky instanceof egret.HashObject) {
            return { key: ky, value: this._map[ky.hashCode] };
        }
        else if (typeof (ky) == "string" || typeof (ky) == "number") {
            return { key: ky, value: this._map[ky.toString()] };
        }
        else {
            return { key: ky, value: this._valueArr[index] };
        }
        return null;
    };
    HashMap.prototype.deleteContext1 = function () {
        this._keyArr.splice(this._tmIndex, 1);
        delete this._map[this._tmKey["hashCode"]];
    };
    HashMap.prototype.deleteContext2 = function () {
        this._keyArr.splice(this._tmIndex, 1);
        delete this._map[this._tmKey.toString()];
    };
    HashMap.prototype.deleteContext3 = function () {
        this._keyArr.splice(this._tmIndex, 1);
        this._valueArr.splice(this._tmIndex, 1);
    };
    /*
     * 获取值键
     */
    HashMap.prototype.getKey = function (value) {
        for (var k in this._map) {
            if (this._map[k] == value) {
                return k;
            }
        }
        for (var i = 0; i < this._valueArr.length; i++) {
            if (this._valueArr[i] == value) {
                return this._keyArr[i];
            }
        }
        return null;
    };
    /*
     * 删除第一个键值
     */
    HashMap.prototype.shift = function () {
        var value;
        var key = this._keyArr.shift();
        if (key instanceof egret.HashObject) {
            value = this._map[key["hashCode"]];
            delete this._map[key["hashCode"]];
            return { key: key, value: value };
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            value = this._map[key.toString()];
            delete this._map[key.toString()];
            return { key: key, value: value };
        }
        else {
            return { key: key, value: this._valueArr.shift() };
        }
    };
    /*
     * 删除最后一个键值
     */
    HashMap.prototype.pop = function () {
        var value;
        var key = this._keyArr.pop();
        if (key instanceof egret.HashObject) {
            value = this._map[key["hashCode"]];
            delete this._map[key["hashCode"]];
            return { key: key, value: value };
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            value = this._map[key.toString()];
            delete this._map[key.toString()];
            return { key: key, value: value };
        }
        else {
            return { key: key, value: this._valueArr.pop() };
        }
    };
    /*
     * 获取键值位置，无键值则返回-1
     */
    HashMap.prototype.indexOf = function (key) {
        return this._keyArr.indexOf(key);
    };
    /*
     * 删除指定键值
     */
    HashMap.prototype.delete = function (key) {
        var index = this._keyArr.indexOf(key);
        if (index == -1) {
            return;
        }
        this._keyArr.splice(index, 1);
        if (key instanceof egret.HashObject) {
            delete this._map[key["hashCode"]];
        }
        else if (typeof (key) == "string" || typeof (key) == "number") {
            delete this._map[key.toString()];
        }
        else {
            this._valueArr.splice(index, 1);
        }
    };
    Object.defineProperty(HashMap.prototype, "length", {
        /*
         * 获取表长度
         */
        get: function () {
            return this._keyArr.length;
        },
        enumerable: true,
        configurable: true
    });
    HashMap.prototype.getKeyArr = function () {
        return this._keyArr;
    };
    return HashMap;
}());
__reflect(HashMap.prototype, "HashMap");
//# sourceMappingURL=HashMap.js.map