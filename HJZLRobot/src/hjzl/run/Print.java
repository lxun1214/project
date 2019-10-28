package hjzl.run;

import hjzl.Robot;

public class Print  implements Runnable{

	@Override
	public void run() {
		for(int i=0;i<10000;i++){
			System.err.println("当前线程数量："+Robot.threadCount+"-------------------------------------");
			System.err.println("当前已登入数量："+Robot.loginCount+"-------------------------------------");
			//睡眠2秒
			try {
				Thread.sleep(2000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
