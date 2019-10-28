package com.rt.core;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * servlet
 * 
 * @author xin.fengtao
 *
 */
public class RechargeServlet extends HttpServlet {

	Logger log = Logger.getLogger(RechargeServlet.class);

	private static final long serialVersionUID = 1L;

	public RechargeServlet() {

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
//		response.addHeader("Access-Control-Allow-Origin", "*");
//		log.error("");
//		try {
//			RechargeLogic.getInstance().payCallBack(ParamUtils.getParam(request), response);
//		} catch (Exception e) {
//			ByteArrayOutputStream baos = new ByteArrayOutputStream();
//			e.printStackTrace(new PrintStream(baos));
//			String exception = baos.toString();
//			log.error(exception);
//			e.printStackTrace();
//		}
	}

}
