package cn.springmvc.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.SocketException;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;

public class FTPTest {

	public static void main(String[] args) throws Exception {
		//
		// // 创建ftpClient连接对象
		// FTPClient ftpClient = new FTPClient();
		// // 创建FTP链接
		// ftpClient.connect("47.104.135.225", 21);
		// // 登陆ftp服务器，使用用户名 密码
		// ftpClient.login("ftpmanager", "yhrd123456");
		// // 上传文件
		// // 读取本地文件
		// FileInputStream inputStream = new FileInputStream(new
		// File("D:\\Lighthouse.jpg"));
		// // 设置上传路径
		// ftpClient.changeWorkingDirectory("mallImg");
		// // 第一个参数：服务起端文件名
		// // 第二个参数，上传文件的inputStream
		// ftpClient.storeFile("22.jpg", inputStream);
		// // 关闭链接
		// ftpClient.logout();

		testFtp1();

	}

	public static void List(String pathName, FTPClient ftp) throws IOException {
		if (pathName.startsWith("/") && pathName.endsWith("/")) {
			String directory = pathName;
			// 更换目录到当前目录
			ftp.changeWorkingDirectory(directory);
			FTPFile[] files = ftp.listFiles();
			for (FTPFile file : files) {
				if (file.isFile()) {
					System.out.println(directory + file.getName());
				} else if (file.isDirectory()) {
					System.out.println(directory + file.getName() + "/");
				}
			}
		}
	}

	public static void testFtp1() {
		// 创建客户端对象
		FTPClient ftp = new FTPClient();
		InputStream local = null;
		try {

			ftp.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
			// 连接ftp服务器
			ftp.connect("47.104.135.225", 21);
			// 登录
			System.out.println("登录：" + ftp.login("ftpmanager", "yhrd123456"));

			//ftp.enterRemotePassiveMode();
			
			// //设置上传路径
			String path = "mallImg";
			// 检查上传路径是否存在 如果不存在返回false
			boolean flag = ftp.changeWorkingDirectory(path);
			if (!flag) {
				// 创建上传的路径 该方法只能创建一级目录，在这里如果/home/ftpuser存在则可创建image
				ftp.makeDirectory(path);
			}
			ftp.enterLocalPassiveMode();
			//ftp.enterLocalActiveMode();
			// 指定上传路径
			ftp.changeWorkingDirectory(path);
			// 指定上传文件的类型 二进制文件
			ftp.setFileType(FTP.BINARY_FILE_TYPE);
			// 读取本地文件
			File file = new File("/Lighthouse.jpg");

			local = new FileInputStream(file);

	//		ftp.appendFileStream("");
//			
//			OutputStream out = ftp.appendFileStream(new String("222.jpg"
//					.getBytes("GBK"), "iso-8859-1"));
//			byte[] bbb=ContinueFTP.input2byte(local);
//			out.write(bbb, 0, bbb.length);
//			out.flush();
//			out.close();
//			
//			OutputStream out = ftp.appendFileStream(new String("222.jpg".getBytes("GBK"), "iso-8859-1"));
//			byte[] bbb = ContinueFTP.input2byte(local);
//			out.write(bbb, 0, bbb.length);
//			out.flush();
//			out.close();

			// 第一个参数是文件名
			System.out.println(ftp.storeFile("777.jpg", local));
		} catch (SocketException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				// 关闭文件流
				local.close();
				// 退出
				ftp.logout();
				// 断开连接
				ftp.disconnect();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}