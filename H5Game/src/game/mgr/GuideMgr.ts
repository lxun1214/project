
/**
 * 指引的触发类型定义
 */
enum tigger {
    rebirthNum,			//转生
	points,				//关卡
    level,              //等级
    guideEndId,         //某指引完成的时候
    sceneType,          //游戏场景类型
    closeUid,           //关闭某ui时
    openUid,            //当某ui打开的时候
}

/**
 * 指引ui的枚举定义
 */
enum uid {
	fubenType,      //进入到场景
    skill0,
    skill1,

    bag,
    equipBtn,
    bagItem,
    itemcd,
    itemParent,

    mainUiBtn,
    roleBtn,
    forgeBtn0,
    forgeBtn1,
    forgeEquip,
    forgeBtn2,
    forgeBtn3,

    forgeBtn4,
    forgeBtn5,

    bossBtn,

    af0,
    af1,
    af2,
    af3,
    afParent,

    fb0,
    fb1,
    fb2,
    fb11,
    fb111,

    rw0,
    rw1,
    rwParent,

    jn0,
    jn1,
    jn2,
    jn3,
    jn4,
    jnP0,
    jnP1,
    jnP2,

    bs0,
    bs1,
    bs2,
    bs3,
    bs4,
    bsParent,

    p0,
    p1,

    rl0,
    rl1,


    cj0,
    cj1,
    cjParent,

    back0,
    back1,
    back2,

    beginGame,
    beginGameP,

    cs0,
    cs1,
}

/**
 * 指引的状态定义
 */
enum guideStep {
    init,       //已经初始化，但未启动
    onTigger,   //正在侦听触发
    onReady,    //已经开始
    onAction,   //正在运行
    End,        //已经结束
}

/**
 * 指引数据结构
 */
class TiggerStruct {
    private id: number;
    private min: number;
    private max: number;
    private value: number;
    public constructor(data: any) {
        this.id = data.id;
        this.min = data.min;
        this.max = data.max;
        this.value = data.value;
    }

    /**
     * 检测数据是否符合
     */
    public check(data: number): boolean {
        if (data == undefined) {
            return true;
        } else if (this.min != undefined && this.max != undefined) {
            return Boolean(data >= this.min && data <= this.max);
        } else if (this.min != undefined) {
            return Boolean(data >= this.min);
        } else if (this.max != undefined) {
            return Boolean(data <= this.max);
        } else if (this.value != undefined) {
            return Boolean(data == this.value);
        } else {
            return true;
        }
    }

    public get data(): number {
        return this.value;
    }

    /**
     * 获取触发类型
     */
    public get type(): number {
        return this.id;
    }
}

/**
 *指引对象
 * @author 
 *  侦听指引的触发
 *  触发完成后自动添加到指引队列
 *  实现指引的动作
 *
 */
class Guide {
    //指引配置，json格式
    public static guideCfg: any[] =[
		 {
            id: 1,//自动战斗 
            tiggers:    //此字段子项皆为与逻辑
            [
                //{ id: tigger.points ,min:1}
            ],
            actions:
            [
                { uid:uid.beginGame, des:"点击开始游戏",dir:0},    //指向导航栏装备按钮
            ],
            hideTiggers:
            [
                { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des:[
                
            ]
        },
        {
            id: 4,//引导装配技能并释放
            tiggers:    //此字段子项皆为与逻辑
            [
                //{ id: tigger.points ,min:1}
            ],
            actions:
            [
                { uid:uid.mainUiBtn,des:"点击主页",dir:3},
                { uid:uid.jn0,des:"打开技能界面",dir:2},
                { uid:uid.jn1,des:"选择第一个技能",dir:2},
                { uid:uid.jn3,des:"直接装配技能",dir:2},
                { uid:uid.back0,des:"返回主页",dir:1},
                { uid:uid.back1,des:"返回战斗界面",dir:2},
                { uid:uid.skill0,des:"释放技能",dir:2},
            ],
            hideTiggers:
            [
                { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des:[
                
            ]
        },
        // {
        //     id: 3,//引导装配更换技能并释放
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.jn0,des:"打开技能界面",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.jn4,des:"选择第二个技能",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.jn3,des:"直接装配技能",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.back0,des:"返回主页",dir:1,xy:[1,0,0,-125]},
        //         { uid:uid.back1,des:"返回战斗界面",dir:2,xy:[0,0,0,-125]},
        //         { uid:uid.skill0,des:"释放技能",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        {
            id: 3,//装备
            tiggers:    //此字段子项皆为与逻辑
            [
                //{ id: tigger.points ,min:1}
            ],
            actions:
            [
                 { uid:uid.mainUiBtn,des:"点击主页",dir:3,},
                { uid:uid.bag,des:"进入背包",dir:2},
                { uid:uid.equipBtn,des:"打开装备背包",dir:2,},
                { uid:uid.bagItem,parent:uid.itemParent,des:"点击装备物品",dir:0,},
                { uid:uid.itemcd,des:"点击穿戴装备",dir:0,},
                { uid:uid.back0,des:"关闭界面返回",dir:1,},
                { uid:uid.back1,des:"回到关卡",dir:2},
            ],
            hideTiggers:
            [
                { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des:[
                
            ]
        },
        // {
        //     id: 5,//强化
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.forgeBtn0,des:"点击锻造\n进入强化界面",dir:2,xy:[0,0,0,100]},
        //         { uid:uid.forgeBtn1,des:"选择强化的装备",dir:3,xy:[0,0,0,70]},
        //         { uid:uid.forgeBtn2,des:"选择强化功能",dir:2,xy:[0,0,70,70]},
        //         { uid:uid.forgeBtn3,des:"点击强化装备",dir:2,xy:[0,0,-120,80]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-150,-125]},
        //         // { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
         {
            id: 2,//boss挑战
            tiggers:    //此字段子项皆为与逻辑
            [
                //{ id: tigger.points ,min:1}
            ],
            actions:
            [
                { uid:uid.bossBtn,des:"进入关卡BOSS",dir:2},
            ],
            hideTiggers:
            [
                { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des:[
                
            ]
        },
         {
            id: 5,//重生
            tiggers:    //此字段子项皆为与逻辑
            [
                //{ id: tigger.points ,min:1}
            ],
            actions:
            [
                { uid:uid.cs0,des:"点击重生",dir:1},
                { uid:uid.cs1,des:"点击重生",dir:2},
            ],
            hideTiggers:
            [
                { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
            ],
            des:[
                
            ]
        },
        // {
        //     id: 8,//副本
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         // { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.fb0,des:"进入副本",dir:3,xy:[0,0,-100,100]},
        //         { uid:uid.fb1,des:"进入副本",dir:2,xy:[0,0,-100,100]},
        //         { uid:uid.fb2,des:"进入副本",dir:2,xy:[0,0,-100,100]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 9,//任务
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1},
        //         //{ id: tigger.guideEndId, value: 7 }
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.rw0,des:"点击任务",dir:1,xy:[0,0,0,60]},
        //         { uid:uid.rw1,parent:uid.rwParent,des:"领取任务奖励",dir:2,xy:[0,0,-150,70]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-50,-125]},
        //         { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 10,//神器激活
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.af0,des:"点击神器",dir:0,xy:[0,0,-70,70]},
        //          { uid:uid.af1,parent:uid.afParent,des:"点击第一把神器",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.af2,des:"激活神器",dir:2,xy:[0,0,-100,80]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-165,-140]},
        //         // { uid:uid.back2,des:"关闭界面返回",dir:0,xy:[0,0,-165,-140]},
        //         // { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 11,//神器强化
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.guideEndId, value: 10 }
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.af0,des:"点击神器",dir:0,xy:[0,0,-70,70]},
        //         { uid:uid.af1,parent:uid.afParent,des:"点击第一把神器",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.af3,des:"升级神器",dir:2,xy:[0,0,-100,80]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-165,-140]},
        //         // { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 12,//升阶
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.forgeBtn0,des:"点击锻造\n进入升阶界面",dir:0,xy:[0,0,0,100]},
        //         { uid:uid.forgeBtn1,des:"选择升阶的装备",dir:3,xy:[0,0,0,70]},
        //         { uid:uid.forgeBtn4,des:"选择升阶功能",dir:2,xy:[0,0,70,70]},
        //         { uid:uid.forgeBtn5,des:"点击升阶装备",dir:1,xy:[0,0,-200,80]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-150,-125]},
        //         // { uid:uid.back1,des:"回到关卡",dir:4,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 13,//宝石镶嵌
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.bs0,des:"进入宝石",dir:2,xy:[0,0,0,70]},
        //         { uid:uid.bs1,parent:uid.bsParent,des:"点击镶嵌宝石",dir:2,xy:[0,0,0,70]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-165,-140]},
        //         // { uid:uid.back1,des:"回到关卡",dir:4,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 14,//宝石升级
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.bs0,des:"进入宝石",dir:2,xy:[0,0,-70,70]},
        //         { uid:uid.bs2,des:"点击需要升级的宝石",dir:1,xy:[0,0,-200,70]},
        //         { uid:uid.bs3,des:"点击升级宝石",dir:2,xy:[0,0,-200,70]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-165,-140]},
        //         // { uid:uid.back1,des:"回到关卡",dir:4,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 15,//宝石卸下
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.roleBtn,des:"点击角色",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.bs0,des:"进入宝石",dir:2,xy:[0,0,-70,70]},
        //         { uid:uid.bs2,des:"点击需要卸下的宝石",dir:1,xy:[0,0,-200,70]},
        //         { uid:uid.bs4,des:"点击卸下宝石",dir:2,xy:[0,0,-200,70]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-165,-140]},
        //         // { uid:uid.back1,des:"回到关卡",dir:4,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 16,//pvp
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.p0,des:"进入竞技场",dir:0,xy:[0,0,-200,90]},
        //         { uid:uid.p1,des:"挑战对手",dir:3,xy:[80,-120,-100,-150]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 17,//熔炼
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.bag,des:"进入背包",dir:2,xy:[0,0,0,-100]},
        //         { uid:uid.rl0,des:"打开熔炼界面",dir:1,xy:[0,0,-70,70]},
        //         {uid:uid.rl1,des:"熔炼装备",dir:3,xy:[0,0,-70,70]},
        //         { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,50,-125]},
        //         // { uid:uid.back2,des:"关闭界面返回",dir:1,xy:[0,0,-50,-125]},
        //         // { uid:uid.back1,des:"回到关卡",dir:4,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 18,//装备
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //          { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.bag,des:"进入背包",dir:2,xy:[0,0,0,-100]},
        //          { uid:uid.equipBtn,des:"打开装备背包",dir:2,xy:[0,0,0,100]},
        //         { uid:uid.bagItem,parent:uid.itemParent,des:"点击装备物品",dir:0,xy:[0,0,80,50]},
        //          { uid:uid.itemcd,des:"点击穿戴装备",dir:0,xy:[0,0,60,80]},
        //          { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-50,-125]},
        //          { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 19,//成就
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.cj0,des:"进入成就界面",dir:2,xy:[0,0,-220,-125]},
        //         { uid:uid.cj1,parent:uid.cjParent,des:"领取成就奖励",dir:1,xy:[0,0,-200,70]},
        //          { uid:uid.back0,des:"关闭界面返回",dir:1,xy:[0,0,-50,-125]},
        //          { uid:uid.back1,des:"回到关卡",dir:2,xy:[0,0,0,-125]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 20,//副本
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.fb0,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //         { uid:uid.fb11,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //         { uid:uid.fb2,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
        // {
        //     id: 21,//副本
        //     tiggers:    //此字段子项皆为与逻辑
        //     [
        //         //{ id: tigger.points ,min:1}
        //     ],
        //     actions:
        //     [
        //         { uid:uid.mainUiBtn,des:"点击主页",dir:3,xy:[0,0,100,0]},
        //         { uid:uid.fb0,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //         { uid:uid.fb111,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //         { uid:uid.fb2,des:"进入副本",dir:1,xy:[0,0,-100,100]},
        //     ],
        //     hideTiggers:
        //     [
        //         { id: tigger.sceneType, value:MapType.TYPE_0 } //只有在普通场景才指引
        //     ],
        //     des:[
                
        //     ]
        // },
	];

    private static pointer: Pointer;

    private _id: number = 0;
    private _status: number = 0;

    private tiggerNum: number = 0;
    private tiggerVal: Object = new Object();       //触发开始
    private hideVal: Object = new Object();         //触发隐藏
    private endActions: Object = new Object();      //触发关闭
    public actions: Array<any> = new Array<any>();

    public constructor(cfg: any, index: number) {
        if (!Guide.pointer) {
            Guide.pointer = new Pointer();
        }
        if (!cfg) {
            throw (new Error("无效的指引配置！" + index));
        }
        this._id = cfg.id;

        //初始触发事件
        var tiggers: any[] = cfg.tiggers;
        this.tiggerNum = tiggers.length;
        tiggers.sort(function (a: any, b: any): number {
            if (a["id"] > b["id"]) {
                return 1;
            } else {
                return 0;
            }
        });
        for (var i: number = 0; i < tiggers.length; i++) {
            this.tiggerVal[String(tiggers[i].id)] = new TiggerStruct(tiggers[i]);
            GuideMgr.addTiggerEventListener(tiggers[i].id, this.tiggerFunc, this);
        }

        //初始隐藏事件
        var hidetgrs: any[] = cfg.hideTiggers;
        if (hidetgrs) {
            for (i = 0; i < hidetgrs.length; i++) {
                this.hideVal[String(hidetgrs[i].id)] = new TiggerStruct(hidetgrs[i]);
            }
        }

        //初始关闭事件
        var endacts: any[] = cfg.breakOff;
        if (endacts) {
            for (i = 0; i < endacts.length; i++) {
                this.endActions[String(endacts[i].id)] = new TiggerStruct(endacts[i]);
                GuideMgr.addTiggerEventListener(endacts[i].id, this.breakOff, this);
            }
        }

        //初始动作列表
        var acts: any[] = cfg.actions;
        for (i = 0; i < acts.length; i++) {
            this.actions.push(acts[i]);
        }

        this._status = guideStep.onTigger;
    }

    /**
     * 是否已经结束
     */
    public get status(): number {
        return this._status;
    }

    /**
     * 是否已经结束
     */
    public set status(s:number) {
       this._status = s;
    }

    /**
     * 获取指引id
     */
    public get id(): number {
        return this._id;
    }

    /**
     * 触发计数
     */
    private tiggerFunc(evt: egret.Event): void {
        if (this._status != guideStep.onTigger) {
            return;
        }
        var data: TiggerStruct = <TiggerStruct>this.tiggerVal[evt.type];
        if (!data || data.check(evt.data)) {
            GuideMgr.removeTiggerEventListener(evt.type, this.tiggerFunc, this);
            if (Number(evt.type) == tigger.guideEndId) {
                this.tiggerNum = 0;
                for (var k in this.tiggerVal) {
                    data = <TiggerStruct>this.tiggerVal[k];
                    if (data && Number(k) != tigger.guideEndId) {
                        this.tiggerNum++;
                        GuideMgr.addTiggerEventListener(Number(k), this.tiggerFunc, this);
                    }
                }
                if (this.tiggerNum != 0) {
                    return;
                }
            }
            this.tiggerNum--;
            if (this.tiggerNum <= 0) {
                this._status = guideStep.onReady;
                GuideMgr.addGuide(this);
            }
        }
    }

    /**
     * 触发关闭
     */
    private breakOff(evt: egret.Event): void {
        if (this._status != guideStep.onAction) {
            return;
        }
        var tigger: TiggerStruct = <TiggerStruct>this.endActions[evt.type];
        if (!tigger || tigger.check(evt.data)) {
            for (var k in this.breakOff) {
                GuideMgr.removeTiggerEventListener(k.toString(), this.breakOff, this);
            }
            this.end();
        }
    }

    /**
     * 开始指引
     */
    public start(): void {
        this._status = guideStep.onAction;

        var i: number, act: any;
        for (i = this.actions.length - 1; i >= 0; i--) {
            act = this.actions[i];
            GuideMgr.addUidEventListener(Number(act.uid), this.actFunc, this);
        }
    }

    /**
     * 更新指引,用于定位指引箭头
     */
    public update(): void {
        if (this._status == guideStep.End) {
            return;
        }
        var i: number, act: any, disObj: egret.DisplayObject;
        var show: Boolean = false;
        if(this.actions.length == 0)
            this.end();
        for (i = this.actions.length - 1; i >= 0; i--) {
            act = this.actions[i];
            if(this.currUid < i)
                continue;
            //引导切换功能页-是否跳过
            if(act.uid == uid.mainUiBtn)
            {
                var view:MainUIWin = ViewManager.ins().getView(MainUIWin) as MainUIWin;
                if(view.g0.visible)
                {
                    this.currUid ++;
                    act = this.actions[i+1];
                }
            }
            disObj = UIDmgr.getUIByUID(Number(act.uid));
            if (disObj && SystemInstance.checkDisplayVisibled(disObj)) {
                Guide.pointer.pointerTo(disObj, act.parent,act);
                show = true;
                //trace("指引ui",act.uid).toChannel(chl.guide);
                break;
            }
        }

        Guide.pointer.visible = (this.checkHide() && show)?true:false;
    }

    /**
     * 检测是否隐藏
     */
    private checkHide(): boolean {
        var k, data: TiggerStruct, val: any;
        for (k in this.hideVal) {
            data = <TiggerStruct>this.hideVal[k];
            switch (data.type) {
                case tigger.openUid:
                    var dis: egret.DisplayObject = UIDmgr.getUIByUID(data.data);
                    if (dis && SystemInstance.checkDisplayVisibled(dis)) {
                        return true;
                    }
                    break;

                case tigger.closeUid:
                    var dis: egret.DisplayObject = UIDmgr.getUIByUID(data.data);
                    if (!dis || !SystemInstance.checkDisplayVisibled(dis)) {
                        return true;
                    }
                    break;

                case tigger.sceneType:
                    //暂时不处理
                    // if (data.check(GameMap.ins().mapType)) {
                        return true;
                    // }
                    break;
            }
        }
        return false;
    }

    /**
     * 点击动作
     */
    private currUid:number = 0;
    private actFunc(evt: egret.Event): void {
        if (evt.data) {
            var uid: number = Number(evt.data);
            var act: any = this.actions[this.actions.length - 1];
            if (Number(act.uid) == uid) {
                this.end();
            }
            for(var i:number=0;i<this.actions.length;i++)
            {
                if (this.actions[i].uid == uid) {
                    this.currUid = i+1;
                    break;
                }
            }
        }
    }

    /**
     * 结束
     */
    private end(): void {
        for (var i: number = 0; i < this.actions.length; i++) {
            GuideMgr.removeUidEventListener(String(this.actions[i].uid), this.actFunc, this);
        }
        this._status = guideStep.End;
        if (Guide.pointer) {
            Guide.pointer.hide();
        }
        GuideMgr.dispatchTiggerEvent(tigger.guideEndId, this._id);
    }

}

/**
 *指引管理器
 * @author 
 *  控制符合触发条件的指引按触发的时间顺序运行
 *  提供的触发事件的派发接口
 *  提供触发事件的侦听接口
 *  提供指引操作的事件派发接口
 *  提供指引操作事件侦听接口
 *
 */
class GuideMgr {
    public static _instance: GuideMgr;

    public static recordSize: number = 1;
    private records: Array<number>;//指引记录

    public guides: Array<Guide> = new Array<Guide>();
    private tiggerDispatcher: egret.EventDispatcher = new egret.EventDispatcher();
    private uidDispatcher: egret.EventDispatcher = new egret.EventDispatcher();
    private guideQueues: Array<Guide>;//指引队列
    public static currentGuide: Guide;

    public constructor() {

        this.guideQueues = new Array<Guide>();

        SystemInstance.addTimeHandle(this.update, 100, this);
    }

    public static isGuidIng(id: number): boolean {
        return (GuideMgr.currentGuide && GuideMgr.currentGuide.id == id);
    }

	/**
	 * 初始化
	 */
    openFistGuide:boolean = false;
    public static createAndInit(records: Array<number>): void {
        GuideMgr._instance = new GuideMgr();

        var i: number, bit: number, record: number;
        var index: number = 0;
        var hasDonels: Array<number> = new Array<number>();

        var cfgs: Array<any> = new Array<any>();
        for (i = 0; i < Guide.guideCfg.length; i++) {
            if (cfgs[Guide.guideCfg[i].id] != undefined) {
                throw (new Error("指引编号定义重复！" + Guide.guideCfg[i].id));
            }
            cfgs[Guide.guideCfg[i].id] = Guide.guideCfg[i];
        }

        GuideMgr._instance.records = new Array<number>();
        for (i = 0; i < records.length; i++) {
            record = records[i];
            GuideMgr._instance.records.push(record);
            for (bit = 0; bit < 32; bit++) {
                if (cfgs[index]) {
                    if ((record & (1 << bit)) == 0 && !UserVo.NO_GUIDE) {
                        GuideMgr._instance.guides.push(new Guide(cfgs[index], index));
                        if(index == 1)
                            GuideMgr._instance.openFistGuide = true;
                    } else {
                        hasDonels.push(index);
                    }
                }
                index++;
            }
        }
        for (i = 0; i < hasDonels.length; i++) {
            GuideMgr.dispatchTiggerEvent(tigger.guideEndId, hasDonels[i]);
        }
    }

    /**
     * 返回指定的指引是否已完成
     */
    public static checkGuideHasDone(guideId: number): boolean {
        var index: number = Math.floor(guideId / 32);
        var record: number = GuideMgr._instance.records[index];
        if (record != undefined) {
            return Boolean(record & Math.pow(2, guideId % 32));
        } else {
            return false;
        }
    }

    public setRecords(value: Array<number>): void {
        this.records = value;
    }

    public haveGuide(id: number): boolean {
        var index: number = Math.floor(id / 32);
        var record: number = this.records[index];
        if (record == undefined) {
            record = 0;
        }
        var bit: number = id % 32;
        var res = record & (1 << bit);
        return res > 0;
    }

    /**
     * 保存
     */
    public save(id: number): void {
		var index: number = Math.floor(id / 32);
        var record: number = this.records[index];
        if (record == undefined) {
            record = 0;
        }
        var bit: number = id % 32;
        record |= (1 << bit);
        this.records[index] = record;
        HttpMgr.ins.sendMessage(ClientPacket.S_10036,{guideStep:record},ServerPacket.LOGIC_URL,true);
    }
	/**
	 * 更新指引
	 */
    private update(): void {
        // if (GlobalData.rolelst[0].nLevel >= 40) {
        //     return;
        // }
        if (this.guideQueues.length <= 0) {
            return;
        }
        var guide: Guide = this.guideQueues[0];
        if (guide.status == guideStep.onReady)//如果第一个指引正在准备状态则可以开始指引
        {
            guide.start();
            GuideMgr.currentGuide = guide;
        } else if (guide.status == guideStep.End)//如果第一个指引已经结束则保存并且删除
        {
            this.save(guide.id);
            this.guideQueues.shift();
            GuideMgr.currentGuide = null;
        } else//如果第一个指引未完成则继续指引
        {
            guide.update();
        }
    }

	/**
	 * 添加指引到队列里
	 */
    public static addGuide(guide: Guide): void {
        GuideMgr._instance.guideQueues.push(guide);
    }

	/**
	 * 派发触发事件
	 */
    public static dispatchTiggerEvent(tiggerId: number, data?: number): void {
        GuideMgr._instance.tiggerDispatcher.dispatchEventWith(tiggerId.toString(), undefined, data);
    }
	/**
	 * 派发uid事件
	 */
    public static dispatchUidEvent(uid: number): void {
        if (GuideMgr._instance && GuideMgr._instance.uidDispatcher) {
            GuideMgr._instance.uidDispatcher.dispatchEventWith(uid.toString(), undefined, uid);
        }
    }

    /**
     * 侦听触发事件
     */
    public static addTiggerEventListener(tiggerId: number, func: Function, thisObject: any): void {
        GuideMgr._instance.tiggerDispatcher.addEventListener(tiggerId.toString(), func, thisObject);
    }
    public static removeTiggerEventListener(tiggerId: string, func: Function, thisObject: any): void {
        GuideMgr._instance.tiggerDispatcher.removeEventListener(tiggerId, func, thisObject);
    }

    /**
     * 侦听触发事件
     */
    public static addUidEventListener(uId: number, func: Function, thisObject: any): void {
        GuideMgr._instance.uidDispatcher.addEventListener(uId.toString(), func, thisObject);
    }
    public static removeUidEventListener(tiggerId: string, func: Function, thisObject: any): void {
        GuideMgr._instance.uidDispatcher.removeEventListener(tiggerId, func, thisObject);
    }
}

/**
 *ui元素管理器
 * @author 
 *  将目标ui绑定到指引系统里，通过事件驱动指引的触发和运行
 *  为全局提供直接访问各个容器子ui的接口
 *
 */
class UIDmgr {
    private static uilst: Array<egret.DisplayObject> = new Array<egret.DisplayObject>();
    private static idlst: Object = new Object();

    public constructor() {

    }

    /**
     * 获取uid对象
     */
    public static getUIByUID(uid: number): egret.DisplayObject {
        return UIDmgr.uilst[uid];
    }

    /**
     * 返回指定ui是否被绑定
     */
    public static hasBinding(disObj: egret.DisplayObject, uikey: number): Boolean {
        var obj: egret.DisplayObject = UIDmgr.uilst[uikey];
        if (obj) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 接触绑定
     */
    public static releaseUID(disObj: egret.DisplayObject): void {
        var uikey: any = UIDmgr.idlst[disObj.hashCode.toString()];
        if (uikey != undefined) {
            disObj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            disObj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
            UIDmgr.uilst[Number(uikey)] = undefined;
            delete UIDmgr.idlst[disObj.hashCode.toString()];
        }
    }

    /**
     * 设置唯一的UID
     */
    public static bindingUID(disObj: egret.DisplayObject, uikey: number): void {
        var obj: egret.DisplayObject = UIDmgr.uilst[uikey];
        if (obj) {
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
            UIDmgr.uilst[Number(uikey)] = undefined;
            delete UIDmgr.idlst[obj.hashCode.toString()]; 
            // if (obj != disObj) {
            //     throw (new Error("指引ui编号定义重复！" + uikey));
            // }
        } //else {
            UIDmgr.uilst[uikey] = disObj;
            UIDmgr.idlst[disObj.hashCode.toString()] = uikey;
            disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        //}
    }

    /**
     * 占有UID
     */
    public static changeUID(disObj: egret.DisplayObject, uikey: number): void {
        var obj: egret.DisplayObject = UIDmgr.uilst[uikey];

        if (obj) {
            delete UIDmgr.idlst[obj.hashCode.toString()];
            obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
            obj.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        }
        UIDmgr.uilst[uikey] = disObj;
        UIDmgr.idlst[disObj.hashCode.toString()] = uikey;
        disObj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        disObj.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
    }

    /**
     * 点击绑定ui事件
     */
    private static onTouch(evt: egret.TouchEvent): void {
        var target: egret.DisplayObject = <egret.DisplayObject>evt.currentTarget;
        if (target) {
            var id: number = Number(UIDmgr.idlst[target.hashCode.toString()]);
            if (id == undefined || id === NaN) {
                throw (new Error("指引uid触发错误!"));
            }
            GuideMgr.dispatchUidEvent(id);
        }
    }

    public static forceTouch(t:egret.DisplayObject):void
    {
        var target: egret.DisplayObject = t;
        if (target) {
            var id: number = Number(UIDmgr.idlst[target.hashCode.toString()]);
            if (id == undefined || id === NaN) {
                throw (new Error("指引uid触发错误!"));
            }
            GuideMgr.dispatchUidEvent(id);
        }    
    }

    /**
     * 移除事件
     */
    private static onRemovedUIDToStage(evt: egret.Event): void {
        evt.currentTarget.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        evt.currentTarget.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedUIDToStage, this);
        var target: egret.DisplayObject = <egret.DisplayObject>evt.currentTarget;
        if (target) {
            UIDmgr.releaseUID(target);
        }
    }
}

/**
 * 指引动画
 */
class Pointer extends egret.Sprite{
    private _uid: number;
    private bounds: egret.Rectangle;
    private pointer: egret.MovieClip;
    private pointerJson: any;

	private pointerURL:string;
    public constructor() {
        super();
		let obj:any = ConfigMgr.gameConfig["globalConfig"];
		this.pointerURL = ParamMgr.gameSynRes + "/assets/model/other/10019.json?v=" +  obj.otherVer;
        RES.getResByUrl(this.pointerURL, this.onJson, this, RES.ResourceItem.TYPE_JSON);
    }
    /**
     * 加载完json
     */
    private onJson(data: any, url: string): void {
        if (url == this.pointerURL) {
            this.pointerJson = data;
            RES.getResByUrl(this.pointerURL.replace("json","png"), this.onPng, this, RES.ResourceItem.TYPE_IMAGE);
        }
    }

    /**
     * 加载完Png
     */
    private onPng(data: any, url: string): void {
        var mcDataFactory: egret.MovieClipDataFactory;
        // if (url.indexOf("pointer") != -1) {
            mcDataFactory = new egret.MovieClipDataFactory(this.pointerJson, <egret.Texture>data);
            this.pointer = new egret.MovieClip(mcDataFactory.generateMovieClipData());
            this.addChild(this.pointer);
            this.pointer.frameRate = 6;
             this.pointer.play(-1);
        // }
        if (this.pointer && this.obj.call)
            this.pointerTo(this.obj.target, this.obj.parent,this.act);
    }

    /**
     * 指向
     */
    private obj: any = {};
    private act:any;
    public pointerTo(target: egret.DisplayObject, parent: number,ac:any): void {
        this.act = ac;
        if (!target.stage || !this.pointer) {
            this.obj.target = target;
            this.obj.parent = parent;
            return;
        }
        var container: egret.DisplayObjectContainer;
        var tx:number;
        var ty:number;
        if (parent) {
        {
            container = <egret.DisplayObjectContainer>UIDmgr.getUIByUID(parent);
            tx = target.x; 
            ty = target.y;
        }
        }else
        {
            container = target.stage;
            var p:egret.Point = target.parent.localToGlobal(target.x,target.y)
            tx = p.x;
            ty = p.y;
        }
        container.addChild(this);

        this.bounds = target.getTransformedBounds(container, this.bounds);
        this.bounds.width *= target.scaleX;
        this.bounds.height *= target.scaleY;

        if(this.act.dir == 0)
        {
            this.pointer.rotation = 0;
            this.pointer.y = ty + this.bounds.height;
            this.pointer.x = tx + this.bounds.width/2;
        }
        else if(this.act.dir == 1)
        {
            this.pointer.rotation = 90;
            this.pointer.x = tx;
            this.pointer.y = ty + this.bounds.height/2;
        }else if(this.act.dir == 2)
        {
            this.pointer.rotation = 180;
            this.pointer.y = ty;
            this.pointer.x = tx + this.bounds.width/2;
        }else
        {
            this.pointer.rotation = 270;
            this.pointer.y = ty + this.bounds.height/2;;
            this.pointer.x = tx + this.bounds.width;;
        }
        if(!this.pointer.isPlaying)
             this.pointer.play(-1);
    }

    public hide():void
    {
        this.pointer.stop();
        if(this.parent)
            this.parent.removeChild(this);
    }
}
