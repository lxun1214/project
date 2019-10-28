package com.rt.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpUtils {
	

	public static String sendPost(byte[] b, String urlStr) {
		URL url = null;
		HttpURLConnection httpConnection = null;
		InputStream httpIS = null;
		java.io.BufferedReader http_reader = null;
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		String commands = "500";

		try {
			url = new URL(urlStr);
			httpConnection = (HttpURLConnection) url.openConnection();
			httpConnection.setRequestMethod("POST"); // POST方式提交数据
			httpConnection.setDoOutput(true);
			OutputStream out = null;
			out = httpConnection.getOutputStream();

			// 发送请求包
			out.write(b);
			out.flush();
			out.close();
			int responseCode = httpConnection.getResponseCode();
			if (responseCode == HttpURLConnection.HTTP_OK) {
				// 读取数据
				httpIS = httpConnection.getInputStream();
				http_reader = new java.io.BufferedReader(new java.io.InputStreamReader(httpIS));
				commands = FastJsonUtils.is2String(httpIS);
				copy(httpIS, bout);
			} else {
				// System.out.println("[URL][response][failure][code : " +
				// responseCode + " ]");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (http_reader != null)
					http_reader.close();
				if (httpIS != null)
					httpIS.close();
				if (httpConnection != null)
					httpConnection.disconnect();
			} catch (IOException e) {
				e.printStackTrace();
				// System.out.println("[HttpUtil]finally error"+e);
			}
		}

		return commands;
	}

	private static void copy(InputStream is, ByteArrayOutputStream bout)
			throws IOException {
		byte[] b = new byte[1024];
		int len = 0;
		len = is.read(b);
		while (len != -1) {
			bout.write(b, 0, len);
			len = is.read(b);
		}
	}


}
