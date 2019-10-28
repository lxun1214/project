package hjzl;

import java.net.URI;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

public class WebSocketTest extends WebSocketClient {

	public static int threadCount = 0;
	
	public WebSocketTest(URI serverURI) {
		super(serverURI);
		connect();
		while (!getReadyState().equals(READYSTATE.OPEN)) {
			try {
				Thread.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		WebSocketTest.threadCount = WebSocketTest.threadCount+1;
		System.out.println("已连接:"+WebSocketTest.threadCount);
	}

	@Override
	public void onClose(int arg0, String arg1, boolean arg2) {
		System.out.println("链接已关闭");
	}

	@Override
	public void onError(Exception arg0) {
		System.out.println("发生错误已关闭");
	}

	@Override
	public void onMessage(String arg0) {

	}

	@Override
	public void onOpen(ServerHandshake arg0) {

	}

	public static void main(String[] args) throws Exception{
		for (int i = 1; i < 5000; i++) {
			new WebSocketTest(new URI("ws://193.112.3.54:8080/game-server/websocket"));
		}
	}
}
