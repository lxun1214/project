package cn.springmvc.utils;

import java.io.IOException;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class QHttpClient {

	public static String submit(Map<String, String> treeMap, String url)
			throws ClientProtocolException, IOException {
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		StringBuilder sb = new StringBuilder(url);
		for (String key : treeMap.keySet()) {
			sb.append(key).append("=").append(treeMap.get(key)).append("&");
		}
		if (sb.toString().endsWith("&"))
			sb.deleteCharAt(sb.lastIndexOf("&"));
		String st=sb.toString();
		st = st.replaceAll(" ", "%20");
		HttpPost httpPost = new HttpPost(st);
		HttpResponse httpResponse;
		// post请求
		httpResponse = closeableHttpClient.execute(httpPost);
		HttpEntity httpEntity = httpResponse.getEntity();
		String result = new String();
		if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			result = EntityUtils.toString(httpEntity, "UTF-8");
		}
		closeableHttpClient.close();
		System.out.println(result);
		return result;
	}
	
	
	
	public static String submitPost(Map<String,String> treeMap, String url)
			throws ClientProtocolException, IOException {
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		String jsonString=FastJsonUtils.toJSONString(treeMap);
		System.out.println(jsonString);
		System.out.println(url);
		HttpPost httpPost = new HttpPost(url);
		httpPost.addHeader("Content-Type","application/json; charset=utf-8");
		
		httpPost.setEntity(new StringEntity(jsonString, "UTF-8"));
		HttpResponse httpResponse;
		// post请求
		httpResponse = closeableHttpClient.execute(httpPost);
		HttpEntity httpEntity = httpResponse.getEntity();
		String result = new String();
		System.out.println(httpResponse.getStatusLine().getStatusCode());
		if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
			result = EntityUtils.toString(httpEntity, "UTF-8");
			System.out.println(result);
		}
		closeableHttpClient.close();
		return result;
	}
	
	
//
//	public static void main(String[] args) {
//		try {
//
//			Map<String, Object> objMap = new TreeMap<String, Object>();
//			
//			Map<String, Object> headMap = new TreeMap<String, Object>();
//			headMap.put("transType","302");
//			headMap.put("transMessageId",OrderUtil.GetOrderNumber(""));
//			
//			objMap.put("head", headMap);
//			//objMap.put("body", new TreeMap<>());
//			
//			QHttpClient.submitPost(objMap, "https://api.wangwangloan.com/v2/sendFindVerify");
//
//		} catch (Exception e) {
//			e.printStackTrace();
//
//		}
//	}

}
