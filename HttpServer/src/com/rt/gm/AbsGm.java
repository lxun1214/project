package com.rt.gm;

import com.rt.gloable.Response;
import com.rt.logic.player.IPlayer;

public abstract class AbsGm {
	
	public abstract void executor(IPlayer player,String parameter,Response response);
	
}