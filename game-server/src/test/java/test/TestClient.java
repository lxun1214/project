package test;

import java.net.URI;
import java.nio.ByteBuffer;

import javax.websocket.ClientEndpoint;
import javax.websocket.ContainerProvider;
import javax.websocket.Session;
import javax.websocket.WebSocketContainer;

import com.rt.code.PBMessageToBytesEncode;
import com.rt.common.Message;
import com.rt.pb.PbPlayer.GmRequest_100;

@ClientEndpoint
public class TestClient {

	private String deviceId;

	private Session session;

	public TestClient() {

	}

	public TestClient(String deviceId) {
		this.deviceId = deviceId;
	}

	protected boolean start() {
		WebSocketContainer Container = ContainerProvider.getWebSocketContainer();
		String uri = "ws://106.12.117.205:8080/game-server/websocket";
		System.out.println("Connecting to " + uri);
		try {
			session = Container.connectToServer(TestClient.class, URI.create(uri));
			System.out.println("count: " + deviceId);
			Thread.sleep(10000);
			for(int i = 0;i < 1;i++) {
				session.getAsyncRemote().sendBinary(createBuf());
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public ByteBuffer createBuf() {
		GmRequest_100.Builder builder = GmRequest_100.newBuilder();
		builder.setCommand("test");
		builder.setParameter("test");

		Message msg = new Message();
		msg.setCmd(100);
		msg.setBody(builder);

		return PBMessageToBytesEncode.encode(msg);
	}

	public static void main(String[] args) throws InterruptedException {
		for (int i = 0; i < 1; i++) {
			TestClient wSocketTest = new TestClient(String.valueOf(i + 1));
			if (!wSocketTest.start()) {
				System.out.println("=============");
				break;
			}
		}
		Thread.sleep(1000000000);
	}
}
