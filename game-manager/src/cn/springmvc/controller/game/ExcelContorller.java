package cn.springmvc.controller.game;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.springmvc.controller.webutil.WebUtil;
import cn.springmvc.model.game.GameCodeKey;
import cn.springmvc.model.game.GiftCode;
import cn.springmvc.model.usermodel.Admin;
import cn.springmvc.service.sys.GameService;
import cn.springmvc.utils.ExportExcelUtil;
import cn.springmvc.utils.TimeUtil;
import cn.springmvc.utils.UicodeString;





@Controller
@RequestMapping("/excel")
public class ExcelContorller {

	@Autowired
	GameService gameService;
	

	@RequestMapping(value = "/createExcelGiftCode")
	public void createExcel(Integer giftCodeId, 
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setHeader("Content-type", "text/html;charset=UTF-8"); 
		Admin admin = WebUtil.getSessionAdmin();
		if(admin==null){
			PrintWriter printWriter = response.getWriter();
			printWriter.print("非法操作！");
			return;
		}
		OutputStream out = null;
		try {
			if(giftCodeId!=null){
				GiftCode code = gameService.getGiftCodeById(giftCodeId);
				if(code == null){
					return;
				}
				if(code.getDownloadLastTime()!=null&&code.getDownloadLastTime()==TimeUtil.getToday()){
					PrintWriter printWriter = response.getWriter();
					printWriter.print("今日已经下载过了，无法下载");
					return;
				}
				code.setDownloadLastTime(TimeUtil.getToday());
				gameService.updateGiftCode(code);
				
				List<GameCodeKey> listString = gameService.listCodeKeyByGroupId(code.getId());
				ExportExcelUtil ex = new ExportExcelUtil();
				String title = code.getGiftName()+"_" + code.getId();
				String[] headers = { "KEY"};
				List<String[]> dataset = new ArrayList<String[]>();
				StringBuilder sb = new StringBuilder();
				GameCodeKey dbCode = null;
				while(listString.size() > 0){
					dbCode = listString.get(0);
					String [] valueArray = new String[1];
					valueArray[0] = dbCode.getCode();
					
					listString.remove(0);
					
					dataset.add(valueArray);
				}
				out = response.getOutputStream();
				String agent = request.getHeader("user-agent").toLowerCase();
				String fname = title + System.currentTimeMillis() + ".xls";
				if (agent.indexOf("firefox") > 0) {
					String filename = new String(fname.getBytes("UTF-8"), "ISO8859-1");
					response.addHeader("Content-Disposition", "attachment; filename=" + filename);
				} else {
					response.addHeader("Content-Disposition", "attachment; filename=" + UicodeString.toUtf8String(fname));
				}
				response.setContentType("application/msexcel;charset=UTF-8");
				response.setHeader("Pragma", "No-cache");
				response.setHeader("Cache-Control", "no-cache");
				response.setDateHeader("Expires", 0);
				ex.exportExcel(title, headers, dataset, out);
				out.flush();
				out.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
