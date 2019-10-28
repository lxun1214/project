package cn.springmvc.service.sys;

import java.util.List;

import cn.springmvc.model.game.GameCodeKey;
import cn.springmvc.model.game.GameEmail;
import cn.springmvc.model.game.GiftCode;

public interface GameService {

	/**
	 * 保存邮件
	 * 
	 * @param email
	 * @return
	 */
	public int saveGameEmail(GameEmail email);

	/**
	 * 获取邮件
	 * 
	 * @param id
	 * @return
	 */
	public GameEmail getGameEmailById(int id);

	/**
	 * 更新邮件
	 * 
	 * @param email
	 * @return
	 */
	public int updateGameEmailById(GameEmail email);

	/**
	 * 邮件列表
	 * 
	 * @param email
	 * @return
	 */
	public List<GameEmail> listGameEmailLimit(GameEmail email);

	/////////////////////礼包///////////////////////
	public int getMaxGiftGroupId();

	public int saveGiftCode(GiftCode code);

	public int delGiftCodeById(int id);

	public List<GiftCode> listGiftCodeLimit(GiftCode code);

	public GiftCode getGiftCodeById(int id);

	public void updateGiftCode(GiftCode code);

	public boolean checkGiftId(int groupId);
	
	
	
	public void saveGameCodeKey(GameCodeKey codeKey);
	
	public List<GameCodeKey> listCodeKeyByGroupId(int id);
	
	public void updateCodeKey(GameCodeKey codeKey);

}
