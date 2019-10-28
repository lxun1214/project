package testClient.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;

import com.alibaba.fastjson.JSON;

public class FastJsonUtils {

	public static <T> T parseObject(Object text, Class<T> clazz) {
		if (text == null) {
			return null;
		}
		if (text.toString().length() == 0) {
			return null;
		}
		return JSON.parseObject(text.toString(), clazz);
	}
	
	public static String toJSONString(Object object) {
		return JSON.toJSONString(object);
	}
	
	public static String is2String(InputStream is) throws IOException{
	    BufferedReader in = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
	    StringBuffer buffer = new StringBuffer();
	    String line = "";
	    while ((line = in.readLine()) != null){
	      buffer.append(line);
	    }
	    return buffer.toString();
	}
	
//	public static void main(String[] args) {
//		
//		ProtocolMessage msg1 = new ProtocolMessage();
//		msg1.setC("para1");
//		msg1.setP(new HashMap<>());
//		
//		ProtocolMessage msg2 = new ProtocolMessage();
//		msg2.setC("para1");
//		msg2.setP(new HashMap<>());
//		
//		
//		List<ProtocolMessage> lstMsg = new ArrayList<>();
//		lstMsg.add(msg1);
//		lstMsg.add(msg2);
//		
//		Map<String, Object> responseMap = new HashMap<>();
//		responseMap.put("postList", lstMsg);
//		
//		
//		ProtocolMessage msg = new ProtocolMessage();
//		msg.setC("1013");
//		msg.setP(responseMap);
//		
//		System.out.println(FastJsonUtils.toJSONString(msg));
//		
//		
//	}

}
