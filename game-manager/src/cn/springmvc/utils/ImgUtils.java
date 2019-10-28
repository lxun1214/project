package cn.springmvc.utils;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;

public class ImgUtils {

	public static String getImgPath(InputStream is, HttpServletRequest request) {
		try {
			String filed = "/mallImg/";
			ContinueFTP.connect();
			String prefix ="png";
			String ftpFild = ContinueFTP
					.getSaveFtpRemote(filed, prefix);
			//byte[] b = ContinueFTP.input2byte(is);
			ContinueFTP.upload(is, ftpFild);
			ContinueFTP.disconnect();
			return ContinueFTP.getVisitFtpRemote(ftpFild);
		} catch (Exception e) {
			e.printStackTrace();
			return "-1";
		}
//		
//		
//		UUID uuid = UUID.randomUUID();
//		String randomUrl = uuid + ".jpg";
//		try {
//			String path = request.getServletContext().getRealPath("/dataImg") + "/" + randomUrl;
//			FileOutputStream fos = new FileOutputStream(path);
//			byte[] b = new byte[1024];
//			while ((is.read(b)) != -1) {
//				fos.write(b);
//			}
//			is.close();
//			fos.close();
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "-1";
//		}
//		return ConfigUtil.getValue("img_http_url") + randomUrl;
	}
}
