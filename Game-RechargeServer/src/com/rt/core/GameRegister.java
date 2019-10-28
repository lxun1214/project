package com.rt.core;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.rt.cache.ConfigCache;
import com.rt.cache.data.GameServer;
import com.rt.utils.FastJsonUtils;


/**
 * 游戏服向充值服注册
 * @author MaHaiDong
 * 2018年7月24日
 *
 */
@WebServlet("/GameRegister")
public class GameRegister extends HttpServlet {
	Logger log = Logger.getLogger(GameRegister.class);
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GameRegister() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin","*");
		response.setHeader("Content-Type", "application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		InputStream inStream = request.getInputStream();
		ByteArrayOutputStream outSteam = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while ((len = inStream.read(buffer)) != -1) {
			outSteam.write(buffer, 0, len);
		}
		outSteam.close();
		inStream.close();
		String result = new String(outSteam.toByteArray(), "utf-8");
		log.debug("收到游戏服注册:" + result);
		@SuppressWarnings("unchecked")
		Map<String, String> map = FastJsonUtils.parseObject(result, Map.class);
		String serverId = map.get("serverId");
		String httpUrl = map.get("httpUrl");
		//这里不验证服务器是否已存在，直接替换，防止以后游戏服务器改地址
		GameServer server = new GameServer(serverId, httpUrl);
		ConfigCache.serverMap.put(serverId, server);
		out.print("SUCCESS");
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
