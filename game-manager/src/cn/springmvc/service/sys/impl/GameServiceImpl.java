package cn.springmvc.service.sys.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;

import cn.springmvc.controller.webutil.Constant;
import cn.springmvc.dao.game.GameCodeKeyMapper;
import cn.springmvc.dao.game.GameEmailMapper;
import cn.springmvc.dao.game.GiftCodeMapper;
import cn.springmvc.model.game.GameCodeKey;
import cn.springmvc.model.game.GameCodeKeyExample;
import cn.springmvc.model.game.GameEmail;
import cn.springmvc.model.game.GameEmailExample;
import cn.springmvc.model.game.GiftCode;
import cn.springmvc.model.game.GiftCodeExample;
import cn.springmvc.service.sys.GameService;

@Service
public class GameServiceImpl implements GameService{
	
	@Autowired
	GameEmailMapper gameEmailMapper;
	@Autowired
	GiftCodeMapper giftCodeMapper;
	@Autowired
	GameCodeKeyMapper gameCodeKeyMapper;
	
	@Override
	public int saveGameEmail(GameEmail email) {
		return gameEmailMapper.insert(email);
	}

	@Override
	public GameEmail getGameEmailById(int id) {
		return gameEmailMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateGameEmailById(GameEmail email) {
		return gameEmailMapper.updateByPrimaryKeySelective(email);
	}

	@Override
	public List<GameEmail> listGameEmailLimit(GameEmail email) {
		GameEmailExample example = new GameEmailExample();
		example.createCriteria();
		example.setOrderByClause(" create_time desc");
		PageHelper.startPage( email.getPageNo() !=null ? email.getPageNo() : 1,email.getPageSize() !=null ? email.getPageSize() : Constant.pageSize);
		return gameEmailMapper.selectByExample(example);
	}
	
	
	
	@Override
	public int getMaxGiftGroupId() {
		Integer maxId = giftCodeMapper.maxId();
		if(maxId == null||maxId<1001){
			return 1001;
		}
		return maxId;
		
	}

	@Override
	public int saveGiftCode(GiftCode code) {
		return giftCodeMapper.insert(code);
	}

	@Override
	public int delGiftCodeById(int id) {
         return giftCodeMapper.deleteByPrimaryKey(id);
	}

	@Override
	public List<GiftCode> listGiftCodeLimit(GiftCode code) {
		GiftCodeExample example = new GiftCodeExample();
		if(code.getServerId()!=null&&code.getServerId().equals("-1")){
			example.createCriteria();
		}else{
			example.createCriteria().andServerIdEqualTo(code.getServerId());
		}
		example.setOrderByClause(" create_time desc");
		PageHelper.startPage( code.getPageNo() !=null ? code.getPageNo() : 1,code.getPageSize() !=null ? code.getPageSize() : Constant.pageSize);
		return giftCodeMapper.selectByExample(example);
	}

	@Override
	public GiftCode getGiftCodeById(int id) {
		return giftCodeMapper.selectByPrimaryKey(id);
	}

	@Override
	public void updateGiftCode(GiftCode code) {
		giftCodeMapper.updateByPrimaryKeySelective(code);
		
	}

	@Override
	public boolean checkGiftId(int groupId) {
		GiftCode giftCode = giftCodeMapper.selectByPrimaryKey(groupId);
		if(giftCode != null){
			return true;
		}
		return false;
	}

	@Override
	public void saveGameCodeKey(GameCodeKey codeKey) {
		gameCodeKeyMapper.insert(codeKey);
	}

	@Override
	public List<GameCodeKey> listCodeKeyByGroupId(int id) {
		GameCodeKeyExample example = new GameCodeKeyExample();
		example.createCriteria().andGroupIdEqualTo(id);
		return gameCodeKeyMapper.selectByExample(example);
	}

	@Override
	public void updateCodeKey(GameCodeKey codeKey) {
		// TODO Auto-generated method stub
		
	}
}
