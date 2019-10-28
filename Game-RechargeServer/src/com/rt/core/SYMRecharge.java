package com.rt.core;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintStream;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

import com.rt.logic.RechargeLogic;
import com.rt.utils.ParamUtils;

/**
 * 手游迷充值回调地址
 * Servlet implementation class SYMRecharge
 */
@WebServlet("/SYMRecharge")
public class SYMRecharge extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	Logger log = Logger.getLogger(SYMRecharge.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SYMRecharge() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Content-Type", "application/json; charset=utf-8");
		response.setCharacterEncoding("UTF-8");
		try {
			RechargeLogic.getInstance().symPayCallBack(ParamUtils.getParam(request), response);
		} catch (Exception e) {
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			e.printStackTrace(new PrintStream(baos));
			String exception = baos.toString();
			log.error(exception);
			e.printStackTrace();
		}
	}

}
