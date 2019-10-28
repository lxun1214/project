class AttributeUtlis {
	public constructor() {
	}

	//基础属性（power力量;intellect智力alacrity敏捷physique体力）
	public static BaseAttribute:Array<string> = ["power","intellect","alacrity","physique"];
	public static BaseAttributeII:Array<string> = ["powerQuality","intellectQuality","alacrityQuality","physiqueQuality"];

	//衍生  物理攻击	物理防御	魔法攻击	魔法防御	生命值
	public static DeriveAttribute:Array<string> = ["attackInit","armorInit","magicAttack","magicArmorInit","blood"];

	//添加删除属性
	public static attributeMgr(propertys:any,add:boolean=true,info?:PbPlayerAttrInfo,job?:number):void
	{
		info = info?info:UserVo.ins.playerAttrInfo;
		job = job?job:UserVo.ins.jobId;
		var dx:number;
		var lv:number;
		for(var k in propertys)
		{
			lv = -1;
			if(info[k] == undefined)
				continue;
			dx = AttributeUtlis.BaseAttribute.indexOf(k);
			if(dx == -1)
			{
				dx = AttributeUtlis.BaseAttributeII.indexOf(k);
				lv = dx;
			}
			if(add)
				info[k] += propertys[k];
			else
				info[k] -= propertys[k];
			if(dx != -1)
			{
				let config:Array<any> = ConfigMgr.gameConfig["propertyConversion"];
				for(var j:number=0;j<AttributeUtlis.DeriveAttribute.length;j++)
				{
					if(add)
					{
						info[AttributeUtlis.DeriveAttribute[j]] += propertys[k] * config[(job-1)*4+dx][AttributeUtlis.DeriveAttribute[j]];
					}
					else
					{
						info[AttributeUtlis.DeriveAttribute[j]] -= propertys[k] * config[(job-1)*4+dx][AttributeUtlis.DeriveAttribute[j]];
					}
				}
			}
			if(lv >= 0)
			{
				if(add)
					info[AttributeUtlis.BaseAttribute[lv]] += propertys[k];
				else
					info[AttributeUtlis.BaseAttribute[lv]] -= propertys[k];
			}

		}
		if(info == UserVo.ins.playerAttrInfo && Human.ins)
			Human.ins.upSpeed();
	}


	//buff属性添加或者减去从目标身上
	public static BuffAttributeByTarge(buff:BuffVo,vo:UserVo,add:boolean):void
	{
		if(!vo)
			return;
		var info:PbPlayerAttrInfo = vo.playerAttrInfo;
		if(!info)
			return;
 		var config:any = ConfigMgr.gameConfig["attributeName"];
        var obj:any = config[buff.type+""];


		switch(buff.type)
		{
			case ComAttribute.intellectHurt:
			if(add)
				info["bonusDamage"] += info["intellect"] * buff.value /100
			else
				info["bonusDamage"] -= info["intellect"] * buff.value /100;
				break;
			case ComAttribute.thornsPCT:
			case ComAttribute.leechPCT:
			case ComAttribute.invincible:
			case ComAttribute.hurtPCT:
				return;
			default:
				 if(buff.hurtType == -1)
				 	return;
				 if(buff.hurtType == 0)
				 {
					var v:Object = {};
					v[obj.value] = buff.value;
					AttributeUtlis.attributeMgr(v,add,info,vo.jobId);
				 }else
				 {
					var v:Object = {};
					if(add)
						v[obj.value] = buff.value/100 * info[obj.value];
					else
						v[obj.value] = (info[obj.value] * buff.value/(100+buff.value));
					AttributeUtlis.attributeMgr(v,add,info,vo.jobId);
				}
			break;
		}
	}
}