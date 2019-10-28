//package testClient;
//
//import java.io.IOException;
//import java.io.PrintWriter;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.servlet.http.HttpServletResponse;
//
//import testClient.util.FastJsonUtils;
//
//public class HttpResponse {
////	private final static Logger LOG = Logger.getLogger(HttpResponse.class);
//	private PrintWriter _out;
//	private Map<String, Object> _reponseParameters = new HashMap<>();
//	private ProtocolMessage _message = new ProtocolMessage();
//
//	private HttpServletResponse _response;
//	private boolean _isClose = false;
//	
//	public HttpResponse() {
//		_message.setP(_reponseParameters);
//	}
//
//	public HttpResponse(HttpServletResponse response) throws IOException {
//		_response = response;
//		_out = _response.getWriter();
//		_message.setP(_reponseParameters);
//	}
//
//	public void writeParameter(String name, Object value) {
//		_message.getP().put(name, value);
//	}
//
//	public void writeParameter(String name, Date value) {
//		_message.getP().put(name, value);
//	}
//	
//	public void endWrite(String name) {
//		_message.setC(name);
//	}
//
//	public void print(String str) {
//		System.out.println(str);
//		_out.print(str);
//		_out.close();
//		_isClose = true;
//	}
//
//	public void close() throws IOException {
//		if (!_isClose) {
//			String str = toString();
////			if (LOG.isDebugEnabled()) {
////				LOG.debug("<<<<<<<<<<<返回消息<<<<<<<<<<");
////				LOG.debug(str);
////				LOG.debug("<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
////			}
//			_out.print(str);
//			_out.close();
//		}
//	}
//
//	public String toString() {
//		return FastJsonUtils.toJSONString(_message);
//	}
//}
