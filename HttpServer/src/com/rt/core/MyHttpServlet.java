package com.rt.core;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.rt.gloable.GloableService;
import com.rt.gloable.ServerInfo;

/**
 * servlet
 * @author xin.fengtao
 *
 */
public class MyHttpServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MyHttpServlet() {

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if(ServerInfo.getServerState() != 1){
			return;
		}
		long start = System.currentTimeMillis();
		response.addHeader("Access-Control-Allow-Origin","*");
		GloableService.getInstance().action(request, response);
		System.out.println("总耗时：" + (System.currentTimeMillis() - start + "毫秒"));
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
