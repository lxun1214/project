package com.rt.gloable;

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

import com.rt.cache.GameCache;
import com.rt.logic.player.IPlayer;
import com.rt.logic.recharge.RechargeLogic;
import com.rt.utils.FastJsonUtils;

/**
 * 接收充值服务器消息
 * @author MaHaiDong
 * 2018年7月24日
 *
 */
@WebServlet("/RechargeNotify")
public class RechargeNotify extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
	Logger log = Logger.getLogger(RechargeNotify.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RechargeNotify() {
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
		log.debug("收到充值服务器通知:" + result);
		@SuppressWarnings("unchecked")
		Map<String, String> map = FastJsonUtils.parseObject(result, Map.class);
		int payId = Integer.parseInt(map.get("payId"));
		long playerId = Long.parseLong(map.get("playerId"));
		IPlayer player = GameCache.playerMap.get(playerId);
		if (player == null) {
			//TODO 如果不在线，处理不在线逻辑
			return;
		}
		//处理充值
		RechargeLogic.getInstance().payCallback(player, payId);
		out.print("success");
		return;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
