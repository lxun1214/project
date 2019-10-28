package com.rt.gloable.managerGM;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.rt.cache.ConfigCache;
import com.rt.gloable.managerGM.task.SendEmailTask;
import com.rt.logic.email.EmailConst;
import com.rt.logic.email.SystemEmail;
import com.rt.utils.FastJsonUtils;
import com.rt.utils.IdFactory;

/**
 * 后台发送邮件
 * Servlet implementation class SendEmail
 */
@WebServlet("/sendEmail")
public class SendEmail extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	Logger log = Logger.getLogger(SendEmail.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SendEmail() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin","*");
		response.setHeader("Content-Type", "application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter _out = response.getWriter();
		String text = FastJsonUtils.is2String(request.getInputStream());
		log.debug("GM  REQUEST:"+text);
		@SuppressWarnings("unchecked")
		Map<String, String> map = FastJsonUtils.parseObject(text, Map.class);
		if(!map.containsKey("emailTitle")){
			_out.print("FAIL");
			return;
		}
		if(!map.containsKey("content")){
			_out.print("FAIL");
			return;
		}
		if(!map.containsKey("startTime")){
			_out.print("FAIL");
			return;
		}
		if(!map.containsKey("endTime")){
			_out.print("FAIL");
			return;
		}
	    
		if(!map.containsKey("emailType")){
			_out.print("FAIL");
			return;
		}
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		int emailType = Integer.parseInt(map.get("emailType"));
		String playerNames = null;
		if(emailType == EmailConst.PALERY_LIMIT){
			//如果是具体用户判断
			if(!map.containsKey("playerNames")){
				_out.print("FAIL");
				return;
			}
			playerNames = map.get("playerNames");
		}
		long id = IdFactory.createId();
		SystemEmail email = new SystemEmail();
		email.setEmailId(id);
		email.setEmailTitle(map.get("emailTitle"));
		email.setContent(map.get("content"));
		email.setEmailType(emailType);
		try {
			email.setStartTime(format.parse(map.get("startTime")));
			email.setEndTime(format.parse(map.get("endTime")));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		if(emailType == EmailConst.PALERY_LIMIT){
			String[] names = playerNames.split("#");
			for(int i=0;i<names.length;i++){
				email.getPlayerNameList().add(names[i]);
			}
		}
		//检测是否有奖励
		if(map.containsKey("items")){
			String items = map.get("items");
			items.trim();
			String[] arr = items.split(";");
			for(int i=0;i<arr.length;i++){
				String istr = arr[i];
				String[] idnum = istr.split("_");
				int itemId = Integer.parseInt(idnum[0]);
				//判断ID是否正确
				if(ConfigCache.itemConfigMap.containsKey(itemId)){
					int itemNum = Integer.parseInt(idnum[1]);
					email.getItems().put(itemId, itemNum);
				}
			}
		}
		//这里异步出去，玩家在线就推送
		ConfigCache.emailExecuter.execute(new SendEmailTask(email));
		_out.print("SUCCESS");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
