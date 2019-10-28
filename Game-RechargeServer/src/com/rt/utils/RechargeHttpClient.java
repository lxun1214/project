package com.rt.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class RechargeHttpClient {
	
	

	public static String submit(Map<String, Object> objMap, String url)
			throws ClientProtocolException, IOException {
		HttpClientBuilder httpClientBuilder = HttpClientBuilder.create();
		CloseableHttpClient closeableHttpClient = httpClientBuilder.build();
		StringBuilder sb = new StringBuilder(url);
		for (String key : objMap.keySet()) {
			sb.append(key).append("=").append(objMap.get(key)).append("&");
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
		//System.out.println(result);
		return result;
	}
	
	
	
	public static String submitPost(Map<String,Object> treeMap, String url)
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
	
	

	public static void main(String[] args)throws Exception {
		
		Map<String, Object> objMap = new TreeMap<String, Object>();
		objMap.put("orderid", "50001545505");
		objMap.put("money",100);
		objMap.put("pay_stat","success");
		objMap.put("roleid","100119131121270784");
		objMap.put("serverid","1001");
		objMap.put("attach","1");
		
		Map<String, String> signMap = new HashMap<>();
		for(String key:objMap.keySet()){
			signMap.put(key, String.valueOf(objMap.get(key)));
		}
		signMap.put("appId", "86e224f185bbcb536c9567c0fccc0eed");
		signMap.put("appKey", "7002568415863fd467a2c3c72fe244ed7a3e5297");
		objMap.put("sign",SignUtils.symCreateSign(signMap));
		System.out.println(FastJsonUtils.toJSONString(objMap));
		
		
		System.out.println(submit(objMap, "http://193.112.3.54:8080/Game-RechargeServer/SYMRecharge?"));
	}
	
	public static String encryptToBase64(String filePath) {  
	    if (filePath == null) {  
	        return null;  
	    }  
	    try {  
	        byte[] b = Files.readAllBytes(Paths.get(filePath));  
	        return Base64.getEncoder().encodeToString(b);  
	    } catch (IOException e) {  
	        e.printStackTrace();  
	    }  
	  
	    return null;  
	}  

	
	
//	
//	public static void main(String args[])
//	{
//	
//		System.setProperty("java.net.useSystemProxies","true");
//
//		System.setProperty("http.proxyHost", "47.75.158.68");
//		System.setProperty("http.proxyPort", 9001 +"");
//		
//	 StringBuffer sb = new StringBuffer();
//	 //创建HttpClient实例
//	 HttpClient client = getHttpClient();
//	 //创建httpGet
//	 HttpGet httpGet = new HttpGet("https://accounts.google.com/o/oauth2/token");
//	 //执行
//	 try {
//	  HttpResponse response = client.execute(httpGet);
//	  
//	  HttpEntity entry = response.getEntity();
//	  
//	  if(entry != null)
//	  {
//	   InputStreamReader is = new InputStreamReader(entry.getContent());
//	   BufferedReader br = new BufferedReader(is);
//	   String str = null;
//	   while((str = br.readLine()) != null)
//	   {
//	    sb.append(str.trim());
//	   }
//	   br.close();
//	  }
//	  
//	 } catch (ClientProtocolException e) {
//	  // TODO Auto-generated catch block
//	  e.printStackTrace();
//	 } catch (IOException e) {
//	  // TODO Auto-generated catch block
//	  e.printStackTrace();
//	 }
//	 System.out.println(sb.toString());
//	}
//	 
//	//设置代理
//	 
//	public static HttpClient getHttpClient() {
//		 DefaultHttpClient httpClient = new DefaultHttpClient();
//		
//		 
////		 httpClient.getCredentialsProvider().setCredentials(
////				   new AuthScope("47.75.158.68", 9001),
////				   new UsernamePasswordCredentials("", "ft123456"));
////
////		 HttpHost proxy = new HttpHost("47.75.158.68", 9001);
////		 httpClient.getParams().setParameter(ConnRouteParams.DEFAULT_PROXY, proxy);
//	 
//	 return httpClient;
//	}

	
	
	
}

class MaH implements Runnable{

	@Override
	public void run() {
		Map<String, Object> objMap = new TreeMap<String, Object>();
		try {
			while(true){
				long a = System.currentTimeMillis();
				RechargeHttpClient.submit(objMap, "https://mp.weixin.qq.com/s/0m3hrvGntKjUDbEsbBRV0A");
				System.out.println("耗时："+(System.currentTimeMillis() - a));
				try {
					Thread.sleep(10);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
}