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
class HashMap {

    private _keyArr: Array<Object>;  //键表，用于记录键
    private _valueArr: Array<Object>;//值表，用于记录值
    private _map: Object;            //键值映射表，用于快速查找值

    /*
     * @keyType 键值类型
     */
    public constructor() {
        this._keyArr = new Array<Object>();
        this._valueArr = new Array<Object>();
        this._map = new Object();
    }

    public clear(): void {
        this._keyArr.length = this._valueArr.length = 0;
        this._map = {};
    }
    /*
     * 判断是否有存储某个键值
     */
    public has(key: Object): Boolean {
        if (key instanceof egret.HashObject) {
            return this._map[(<egret.HashObject>key).hashCode.toString()] != undefined;
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            return this._map[key.toString()] != undefined;
        }
        return this._keyArr.indexOf(key) != -1;
    }

    /*
     * 记录键值
     */
    public add(key: Object, value?: Object): void {
        if (this.has(key)) {
            this.delete(key);
        }
        if (key instanceof egret.HashObject) {
            if (this._map[key.hashCode] == undefined) {
                this._keyArr.push(key);
                this._map[key.hashCode] = value;
            }
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            if (this._map[key.toString()] == undefined) {
                this._keyArr.push(key);
                this._map[key.toString()] = value;
            }
        } else {
            if (this._keyArr.indexOf(key) == -1) {
                this._valueArr[this._keyArr.length] = value;
                this._keyArr.push(key);
            }
        }
    }

    /*
     * 获取键值
     */
    public get(key: Object): Object {
        if (key instanceof egret.HashObject) {
            return this._map[key.hashCode];
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            return this._map[key.toString()];
        } else {
            var index: number = this._keyArr.indexOf(key);
            if (index == -1) {
                return null;
            }
            return this._valueArr[index];
        }
    }

    /*
     * 支持上下文操作呼应的遍历
     * ～为了祢补效率上的不足特别指定一个类型的键值进行遍历
     * ～使用上下文逻辑进行数据的删除操作以减少数据定位次数
     */

    private _keyType: any;
    private _tmIndex: number;
    private _tmKey: Object;
    private _getByIndex: any;
    public deleteContext: Function;
    public startForMap(keyType: any) {
        this._tmIndex = 0;
        this._keyType = keyType;
        if (!this._getByIndex) {
            this._getByIndex = this.getByIndex;
        }
        if (keyType == egret.HashObject) {
            this.getByIndex = this.getByIndex1;
            this.deleteContext = this.deleteContext1;
        } else if (keyType == String || keyType == Number) {
            this.getByIndex = this.getByIndex2;
            this.deleteContext = this.deleteContext2;
        } else {
            this.getByIndex = this.getByIndex3;
            this.deleteContext = this.deleteContext3;
        }
    }
    public endForMap(): void {
        if (this._getByIndex) {
            this.getByIndex = this._getByIndex;
        }
    }

    private getByIndex1(index: number): Object {
        var ky: egret.HashObject = <egret.HashObject>this._keyArr[index];
        this._tmIndex = index;
        this._tmKey = ky;
        return { key: ky, value: this._map[ky.hashCode] };
    }
    private getByIndex2(index: number): Object {
        var ky: Object = this._keyArr[index];
        this._tmIndex = index;
        this._tmKey = ky;
        return { key: ky, value: this._map[ky.toString()] };
    }
    private getByIndex3(index: number): Object {
        this._tmIndex = index;
        return { key: this._keyArr[index], value: this._valueArr[index] };
    }
    public getByIndex(index: number): any {
        if (index == -1) {
            return null;
        }
        var ky: Object = this._keyArr[index];
        if (!ky)
            return null;
        if (ky instanceof egret.HashObject) {
            return { key: ky, value: this._map[ky.hashCode] };
        } else if (typeof (ky) == "string" || typeof (ky) == "number") {
            return { key: ky, value: this._map[ky.toString()] };
        } else {
            return { key: ky, value: this._valueArr[index] };
        }
        return null;
    }

    private deleteContext1(): void {
        this._keyArr.splice(this._tmIndex, 1);
        delete this._map[this._tmKey["hashCode"]];
    }
    private deleteContext2(): void {
        this._keyArr.splice(this._tmIndex, 1);
        delete this._map[this._tmKey.toString()];
    }
    private deleteContext3(): void {
        this._keyArr.splice(this._tmIndex, 1);
        this._valueArr.splice(this._tmIndex, 1);
    }

    /*
     * 获取值键
     */
    public getKey(value: Object): Object {
        for (var k in this._map) {
            if (this._map[k] == value) {
                return k;
            }
        }
        for (var i: number = 0; i < this._valueArr.length; i++) {
            if (this._valueArr[i] == value) {
                return this._keyArr[i];
            }
        }
        return null;
    }

    /*
     * 删除第一个键值
     */
    public shift(): Object {
        var value: Object;
        var key: Object = this._keyArr.shift();
        if (key instanceof egret.HashObject) {
            value = this._map[key["hashCode"]];
            delete this._map[key["hashCode"]];
            return { key: key, value: value };
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            value = this._map[key.toString()];
            delete this._map[key.toString()];
            return { key: key, value: value };
        } else {
            return { key: key, value: this._valueArr.shift() };
        }
    }

    /*
     * 删除最后一个键值
     */
    public pop(): Object {
        var value: Object;
        var key: Object = this._keyArr.pop();
        if (key instanceof egret.HashObject) {
            value = this._map[key["hashCode"]];
            delete this._map[key["hashCode"]];
            return { key: key, value: value };
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            value = this._map[key.toString()];
            delete this._map[key.toString()];
            return { key: key, value: value };
        } else {
            return { key: key, value: this._valueArr.pop() };
        }
    }

    /*
     * 获取键值位置，无键值则返回-1
     */
    public indexOf(key: Object): number {
        return this._keyArr.indexOf(key);
    }

    /*
     * 删除指定键值
     */
    public delete(key: Object): void {
        var index: number = this._keyArr.indexOf(key);

        if (index == -1) {
            return;
        }
        this._keyArr.splice(index, 1);
        if (key instanceof egret.HashObject) {
            delete this._map[key["hashCode"]];
        } else if (typeof (key) == "string" || typeof (key) == "number") {
            delete this._map[key.toString()];
        } else {
            this._valueArr.splice(index, 1);
        }
    }

    /*
     * 获取表长度
     */
    public get length(): number {
        return this._keyArr.length;
    }

    public getKeyArr(): Array<Object> {
        return this._keyArr;
    }
}