package hjzl;

import java.net.URI;
import java.net.URISyntaxException;

import hjzl.db.domain.UserBean;
import hjzl.run.Http;
import hjzl.run.Print;

public class Robot {
	// 线程数量
	public static int threadCount = 0;
	
	public static int loginCount = 0;

	public static void main(String[] args) {
		start();
	}

	public static void start() {
		//打印
		new Thread(new Print()).start();
		//1000个线程
		for (long i = 201802310000L; i < 201802311000L; i++) {
			new Thread(new Ma(i)).start();
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}



}
class Ma implements Runnable {
	
	private long userId;

	public Ma(long userId){
		this.userId = userId;
	}
	
	@Override
	public void run() {
		UserBean ub = new UserBean();
		ub.setUserId(userId);
		try {
			new Http(new URI("ws://193.112.3.54:8080/game-server/websocket"), ub);
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
	}
	
}
