package testClient;

import java.util.Random;

import com.rt.code.ByteOutputStream;
import com.rt.pb.BasePack.BaseMessage;
import com.rt.pb.PbUser.UserLoginRequest_1002;

import junit.framework.TestCase;
import testClient.io.HttpUtils;

public class TestAction extends TestCase {

	public void testRequest() throws Exception {
//		String url = "http://localhost:8080/LoginServer/a.login";
		String url = "http://106.12.117.205:8080/LoginServer/a.login";
		// HttpResponse response = new HttpResponse();

		// 请求商品信息
		// response.writeParameter("goodsId", "1");
		// response.endWrite("2004");

		// 发送图片
		// String ssss = "E:/test.png";
		// BufferedImage image;
		// try {
		// image = ImageIO.read(new FileInputStream(ssss));
		// ByteArrayOutputStream bos = new ByteArrayOutputStream();
		// // 字节输出流
		// ImageIO.write(image, "jpg", bos);
		// // 将图片信息写入到字节输出流中
		// byte[] b = bos.toByteArray();// generate
		// BASE64Encoder encoder = new BASE64Encoder();
		// response.writeParameter("headImg", encoder.encode(b));
		// response.writeParameter("userId","1");
		// response.writeParameter("nickname", "sdffds");
		// response.writeParameter("province", "aaaaaa");
		// response.writeParameter("city", "kkkkk");
		// response.writeParameter("area", "http://www.baidu.com");
		// response.writeParameter("sex", "1");
		// response.writeParameter("birthday", "asdfasdhgt");
		// response.writeParameter("job", "1");
		// response.endWrite("1003");
		// } catch (IOException e) {
		// e.printStackTrace();
		// }

		// for (int i = 0; i < 100; i++) {
		BaseMessage.Builder baseBuilder = BaseMessage.newBuilder();
		baseBuilder.setCmd(1002);

		UserLoginRequest_1002.Builder builder = UserLoginRequest_1002.newBuilder();
		builder.setAccountName("test01");
		builder.setPassWord("test01");
		baseBuilder.setBody(builder.build().toByteString());
		ByteOutputStream bos = new ByteOutputStream();
		byte[] body = baseBuilder.build().toByteArray();
		bos.writeBytes(body);
		String str = HttpUtils.sendPost(bos.toByteArray(), url);
		System.out.println(str);
		// }

		// Message msg = new Message();
		// msg.setReserved(100);
		// ProtoLoginRequest.Builder builder = ProtoLoginRequest.newBuilder();
		// builder.setAccName("damowang");
		// msg.setBody(builder.build());
		//
		// ByteOutputStream bos = new ByteOutputStream();
		//
		// int length = 4;
		// byte[] bytes = null;
		// if (msg.getBody() != null) {
		// MessageLite body = msg.getBody();
		// bytes = body.toByteArray();
		// length += bytes.length;
		// }
		// msg.setCmd(100);
		// bos.writeInt(msg.getReserved());
		// bos.writeInt(length);
		// bos.writeInt(msg.getCmd());
		// if (bytes != null) {
		// try {
		// bos.writeBytes(bytes);
		// bytes = null;
		// msg = null;
		// } catch (IOException e) {
		// e.printStackTrace();
		// }
		// }
		// String str = HttpUtils.sendPost(bos.toByteArray(), url);
		// System.out.println(str);

	}

	int createRandom(int min, int max) {
		Random random = new Random();
		return random.nextInt(max - min + 1) + min;
	}
}
