package com.rt.chat;

import com.rt.cache.GameCache;
import com.rt.common.Message;
import com.rt.common.ResponseMsg;
import com.rt.common.S2CMessageNum;
import com.rt.gloable.impl.IHandler;
import com.rt.logic.player.IPlayer;
import com.rt.pb.PbPlayer.chatMessageResponse_40000;
import com.rt.pb.PbPlayer.sendChat_30000;

public class ChatHandler implements IHandler {
	@Override
	public void handler(Message msg) throws Throwable {
		IPlayer player = GameCache.playerMap.get(msg.getPlayerId());
		if (player == null) {
			return;
		}
		sendChat_30000 req = msg.getBody();
		int t = req.getType();
		String s = req.getContent();
		
		ChatHandler.SEND_CHAT_MESSAGE(player,t,s);
	}

	//转发在线所有玩家...
	public static void SEND_CHAT_MESSAGE(IPlayer player,int t,String s)
	{
		chatMessageResponse_40000.Builder builder = chatMessageResponse_40000.newBuilder();
		builder.setContent(s);
		builder.setType(t);
		if(player != null)
		{
			builder.setPlayName(player.getPlayerName());
			builder.setId(player.getPlayerId()+"");
			builder.setVipLevel(player.getVipLevel());
			builder.setSex(player.getSex());
		}
		Message msg = new Message();
		msg.setCmd(S2CMessageNum.CHAT);
		msg.setBody(builder);
        for(Long playerId:GameCache.playerWsMap.keySet()){
        	ResponseMsg.sendMsg(playerId, msg);
        }
	}
	
	@Override
	public Object initBodyClass() {
		return sendChat_30000.class;
	}
}
