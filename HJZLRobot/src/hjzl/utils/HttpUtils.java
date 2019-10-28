package hjzl.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;



public class HttpUtils {
	public void testGet() throws Exception{
		String url="http://gameproxy.xinmei365.com/game_agent/checkLogin?productCode=123&channel=456&userId=789&token=012";
		@SuppressWarnings("unused")
		String re=HttpUtils.getDoGetURL(url, "UTF-8");
//		System.out.println(re);
	}
	
	public static void request(PostMethod method, URL url) throws Exception {
		HttpClient httpClient = new HttpClient();
		httpClient.executeMethod(method);
	}

	@SuppressWarnings("deprecation")
	public static void set(byte[] b, String p) throws Exception {
		PostMethod pm = new PostMethod();
		ByteArrayInputStream bis = new ByteArrayInputStream(b);
		pm.setRequestBody(bis);
		URL url = new URL(p);
		request(pm, url);
	}

	public static String getDoGetURL(String url, String charset)
			throws Exception {

		HttpClient client = new HttpClient();
		GetMethod method1 = new GetMethod(url);

		if (null == url || !url.startsWith("http")) {
			throw new Exception("请求地址格式不对");
		}

		// 设置请求的编码方式
		if (null != charset) {
			method1.addRequestHeader("Content-Type",
					"application/x-www-form-urlencoded; charset=" + charset);
		} else {
			method1.addRequestHeader("Content-Type",
					"application/x-www-form-urlencoded; charset=" + "utf-8");
		}
		@SuppressWarnings("unused")
		int statusCode = client.executeMethod(method1);

		// 返回响应消息
		byte[] responseBody = method1.getResponseBodyAsString().getBytes(
				method1.getResponseCharSet());
		// 在返回响应消息使用编码(utf-8或gb2312)
		String response = new String(responseBody, "utf-8");
		System.out.println("------------------response:" + response);
		// 释放连接
		method1.releaseConnection();
		return response;
	}

	public static ByteArrayOutputStream sendPost(byte[] b, String urlStr) {
		URL url = null;
		HttpURLConnection httpConnection = null;
		InputStream httpIS = null;
		java.io.BufferedReader http_reader = null;
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
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
				//ByteUtils.byteToString_1(httpIS);
				copy(httpIS, bout);
			} else {
				System.out.println(HttpURLConnection.HTTP_OK+"/错误");
				bout=null;
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
		return bout;
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
