package cn.springmvc.controller.game;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.springmvc.cache.ConfigCache;
import cn.springmvc.cache.ServerCache;
import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.entry.GiftCodeModel;
import cn.springmvc.entry.Server;
import cn.springmvc.model.game.GameCodeKey;
import cn.springmvc.model.game.GiftCode;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.redis.RedisClient;
import cn.springmvc.service.sys.GameService;
import cn.springmvc.utils.FastJsonUtils;
import cn.springmvc.utils.RedisKeyUtils;
import cn.springmvc.utils.ResultPage;
import cn.springmvc.utils.StringUtil;



/**
 * 礼包
 * 
 * @author MaHaiDong 2018年6月11日
 *
 */
@Controller
@RequestMapping("/gift")
public class GiftController {

	static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");

	@Autowired
	GameService gameService;
	
	

	/**
	 * 跳转生产礼包码页面
	 * 
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/toCreateGift")
	public String toCreateGift(Model model) {
		List<Server> servers = ServerCache.getServerList();
		model.addAttribute("servers", servers);
		return "gift/createGift";
	}

	/**
	 * 生产礼包激活码
	 * 
	 * @param code
	 * @return
	 */
	@RequestMapping(value = "/createGift")
	@ResponseBody
	public String createGift(GiftCode code) {
		Admin admin = WebUtil.getSessionAdmin();
		if (admin == null) {
			return "error";
		}
		// 转换日期
		code.setStarTime_1(code.getStarTime_1().replace("T", " "));
		code.setEndTime_1(code.getEndTime_1().replace("T", " "));
		try {
			code.setStarTime(format.parse(code.getStarTime_1()));
			code.setEndTime(format.parse(code.getEndTime_1()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		code.setAdminId(admin.getId());
		code.setAdminName(admin.getName());
		code.setCreateTime(new Date());
		Server server = ServerCache.getServer(code.getServerId());
		code.setServerName(server.getName());
		if (code.getCodeCount() > 10000 || code.getCodeCount() < 1) {
			return "count_error";
		}
		Set<String> sets = new HashSet<>();
		String str = "";
		while (sets.size() < code.getCodeCount()) {
			str = StringUtil.genRandomString(8);
			if (sets.contains(str)) {
				continue;
			}
			sets.add(str);
		}
		// 获取当前最大组
		Integer maxId = gameService.getMaxGiftGroupId();
		code.setId(maxId + 1);
		int result = gameService.saveGiftCode(code);
		if (result < 1) {
			return "error";
		}
		
		// 链接服务器数据库，加入礼包码
		result = saveGiftCodeKey(code.getServerId(), code.getId(), code.getItemId(),
				code.getStarTime().getTime(), code.getEndTime().getTime(), code.getCreateTime().getTime(), sets,String.valueOf(code.getId()));
		if(result>0){
			return "success";
		}
		gameService.delGiftCodeById(code.getId());
		return "error";
	}
	
	
	
	/**
	 * 每一个激活码保存数据库，redis
	 * @param serverId
	 * @param type
	 * @param groupId
	 * @param presentItemID
	 * @param starTime
	 * @param endTime
	 * @param createTime
	 * @param codeSets
	 * @param firstCode
	 * @return
	 */
	public  int saveGiftCodeKey(String serverId,int groupId,String presentItemID,long starTime,long endTime,long createTime,Set<String> codeSets,String firstCode){
		for(String code:codeSets){
			code=firstCode+code;
			
			GiftCodeModel model = new GiftCodeModel();
			model.setCode(code);
			model.setState(0);
			model.setStartTime(starTime);
			model.setEndTime(endTime);
			model.setGroupId(groupId);
			
			String itemds[] = presentItemID.split(":");
			if(itemds.length > 0){
				for(int i=0;i<itemds.length;i++){
					int itemId = Integer.parseInt(itemds[i].split(";")[0]);
					int itemNum = Integer.parseInt(itemds[i].split(";")[1]);
					model.getItemMap().put(itemId, itemNum);
				}
			}
			String key = RedisKeyUtils.getGiftCodeKey(code);
			//存redis
			RedisClient client = ConfigCache.redisMap.get(serverId);
			client.setvalue(key, FastJsonUtils.toJSONString(model), 0);
			
			//存数据库
			GameCodeKey codeKey = new GameCodeKey();
			codeKey.setCode(code);
			codeKey.setState(0);
			codeKey.setStartTime(starTime);
			codeKey.setEndTime(endTime);
			codeKey.setGroupId(groupId);
			codeKey.setItem(presentItemID);
			gameService.saveGameCodeKey(codeKey);
		}
		return 1;
	}
	
	

	@RequestMapping(value = "/toGiftCodeList")
	public String toGiftCodeList(Model model){
		List<Server> servers = ServerCache.getServerList(); 
		model.addAttribute("servers", servers);
		return "gift/listGiftCode";
	}
	

	
	@RequestMapping(value="/listGiftCode") 
	@ResponseBody 
	public ResultPage<GiftCode> listGiftCode(@RequestBody GiftCode code) {
		return new ResultPage<GiftCode>(gameService.listGiftCodeLimit(code));
	}
	
}
