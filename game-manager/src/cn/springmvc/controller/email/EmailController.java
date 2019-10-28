package cn.springmvc.controller.email;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.client.ClientProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.springmvc.cache.ServerCache;
import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.entry.BaseItem;
import cn.springmvc.entry.Server;
import cn.springmvc.model.game.GameEmail;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.service.sys.GameService;
import cn.springmvc.utils.QHttpClient;
import cn.springmvc.utils.ResultPage;

@Controller
@RequestMapping("/email")
public class EmailController {

	
	static SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	
	@Autowired
	GameService gameService;
	
	
	/**
	 * 发放邮件跳转
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/toSendEmail")
	public String toSendEmail(Model model){
		List<Server> servers = ServerCache.getServerList(); 
		model.addAttribute("servers", servers);
		return "email/email_send";
	}

	
	/**
	 * 保存发送邮件
	 * @param rollNotice
	 * @return
	 */
	@RequestMapping(value = "/saveEmail")
	@ResponseBody
	public String saveEmail(GameEmail email){
		email.setCreateTime(new Date());
		//转换日期
		email.setStarTime_1(email.getStarTime_1().replace("T", " "));
		email.setEndTime_1(email.getEndTime_1().replace("T", " "));
		try {
			email.setStarTime(format.parse(email.getStarTime_1()));
			email.setEndTime(format.parse(email.getEndTime_1()));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		//转换server
		if(email.getServerArray()==null||email.getServerArray().length<1){
			return "server_error";
		}
		StringBuilder targetServerBuilder = new StringBuilder();
		for(int i=0;i<email.getServerArray().length;i++){
			String serverId = email.getServerArray()[i];
			targetServerBuilder.append(serverId);
			targetServerBuilder.append(";");
		}
		
		Admin admin = WebUtil.getSessionAdmin();
		email.setCreateAdminId(admin.getId());
		email.setCreateAdminName(admin.getName());
		email.setTargetServer(targetServerBuilder.toString());
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Map<String, String> httpMap = new HashMap<>();
		httpMap.put("emailTitle", email.getEmailTitle());
		httpMap.put("content", email.getEmailContent());
		httpMap.put("startTime", format.format(email.getStarTime()));
		httpMap.put("endTime", format.format(email.getEndTime()));
		httpMap.put("emailType", email.getUserType().toString());
		//如果是具体用户
		if(email.getUserType()==2){
			if(email.getUserIdAll()==null||email.getUserIdAll().split("#").length<1){
				return "error";
			}
			httpMap.put("playerNames", email.getUserIdAll());
		}
		if(email.getItemAll()!=null&&!email.getItemAll().equals("")){
			httpMap.put("items",email.getItemAll());
		}
		
		
		//请求发送
		String[] serverIds = email.getTargetServer().split(";");
		for(int i=0;i<serverIds.length;i++){
			String serverId = serverIds[i];
			Server server = ServerCache.getServer(serverId);
			if(server == null){
				return "error";
			}
			try {
				System.out.println(QHttpClient.submitPost(httpMap, server.getUrl()));
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return gameService.saveGameEmail(email)>0 ?"success":"error";
	}
	
	
	/**
	 * 跳转邮件列表
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/toEmailList")
	public String toEmailList(Model model){
		return "email/listEmail";
	}
	
	
	
	
	/**
	 * 邮件列表
	 * @param rollNotice
	 * @return
	 */
	@RequestMapping(value="/listExamineEmail") 
	@ResponseBody 
	public ResultPage<GameEmail> listExamineEmail(@RequestBody GameEmail email) {
		return new ResultPage<GameEmail>(gameService.listGameEmailLimit(email));
	}
	
	
	
	

	 
	/**
	 * 查看详情跳转
	 * @param modelMap
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/toDetailsEmail/{id}")
	public String toDetailsEmail(ModelMap modelMap, @PathVariable("id") int id) {
		GameEmail email = gameService.getGameEmailById(id);
		modelMap.addAttribute("email", email);
		//解析服务器
		List<String> serverNameList = new ArrayList<String>();
		String[] serverIds = email.getTargetServer().split(";");
		for(int i=0;i<serverIds.length;i++){
			String serverId = serverIds[i];
			serverNameList.add(ServerCache.getServer(serverId).getName());
		}
		modelMap.addAttribute("serverNameList", serverNameList);
		
		//解析道具
		if(email.getItemAll()!=null&&!email.getItemAll().equals("")){
			String itemds[] = email.getItemAll().split(";");
			if(itemds.length > 0){
				List<BaseItem> baseItems = new ArrayList<BaseItem>();
				BaseItem baseItem = null;
				for(int i=0;i<itemds.length;i++){
					int itemId = Integer.parseInt(itemds[i].split("_")[0]);
					int itemNum = Integer.parseInt(itemds[i].split("_")[1]);
					baseItem = new BaseItem();
					baseItem.setItemId(itemId);
                    baseItem.setItemNum(itemNum);
                    baseItems.add(baseItem);
				}
				
				modelMap.addAttribute("baseItems", baseItems);
			}
		}
		return "email/detailsEmail";
	}

}
