var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MessageMgr = (function () {
    function MessageMgr() {
    }
    MessageMgr.messageHandler = function (cmd, data) {
        switch (cmd) {
            case ServerPacket.C_20006:
                SkillMgr.ins.upSkillLvl(data);
                DataEventDispatcher.dispatchEventWith(GameEvent.SKILL_UP_LVL);
                break;
            case ServerPacket.C_30003:
                TaskMgr.ins().upTask(data.changeTaskInfos);
                break;
            case ServerPacket.C_20027:
                TaskMgr.ins().finishTask(data);
                break;
            case ServerPacket.C_30007:
                UserVo.ins.storeInfos = data.storeInfos;
                break;
            case ServerPacket.C_20009:
                ForgeVo.ins().strengthenBack(data);
                break;
            case ServerPacket.C_20010:
                ForgeVo.ins().advanceBack(data);
                break;
            case ServerPacket.C_30008:
                EmailMgr.ins().addEmail(data.playerEmailInfo);
                break;
            case ServerPacket.C_20041:
                EmailMgr.ins().removeEmail(data.delEmailIdList);
                break;
            case ServerPacket.C_20039:
                EmailMgr.ins().readEmail(data.receiveEmailIdList);
                EmailMgr.ins().getAward(data.receiveEmailIdList);
                break;
            case ServerPacket.C_20037:
                EmailMgr.ins().readEmail(data.emailId);
                break;
            case ServerPacket.C_30009:
                UserVo.ins.upUserVo({ vipExp: data.vipExp, vipLevel: data.vipLevel });
                UserVo.ins.upUserVo({ isRecharge: data.vipExp > 0 || data.vipLevel > 0 });
                break;
            case ServerPacket.C_40000:
                ChatMgr.ins().addChatMessage(data);
                break;
            default:
                DataEventDispatcher.dispatchEventWith(cmd, data);
                break;
        }
    };
    return MessageMgr;
}());
__reflect(MessageMgr.prototype, "MessageMgr");
//# sourceMappingURL=MessageMgr.js.map