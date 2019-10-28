package com.rt.gm.execute;

import java.util.ArrayList;
import java.util.List;

import com.rt.gm.AbsGm;
import com.rt.logic.bag.BagMsg;
import com.rt.logic.bag.ItemConst;
import com.rt.logic.player.IPlayer;
import com.rt.utils.KV;

/**
 * 加道具
 * 
 * @author Administrator
 *
 */
public class AddItemGm extends AbsGm {

	@Override
	public void executor(IPlayer player, String parameter) {
		List<KV<Integer, Integer>> list = new ArrayList<>();
		String[] str = parameter.split(",");
		for (int i = 0; i < str.length; i++) {
			String[] items = str[i].split(":");
			int itemId = Integer.parseInt(items[0]);
			int itemNum = Integer.parseInt(items[1]);
			KV<Integer, Integer> kv = new KV<Integer, Integer>(itemId, itemNum);
			list.add(kv);
		}
		BagMsg.sendItemChangeMsg(player.getPlayerId(), player.getBag().addItem(list,ItemConst.ITEM_GET_GM));
	}

}
