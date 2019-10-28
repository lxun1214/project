package cn.springmvc.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.UUID;

import org.apache.commons.net.PrintCommandListener;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;

/**
 * 支持断点续传的FTP实用类 （暂不支持中文名称， 中文路径 ）
 * 
 * @author dff
 * @version 0.1 实现基本断点上传下载
 * @version 0.2 实现上传下载进度汇报
 * @version 0.3 实现中文目录创建及中文文件创建，添加对于中文的支持
 */
public class ContinueFTP {
	public static FTPClient ftpClient = new FTPClient();

	public static final String FTP_HOSTNAME = ConfigUtil.getValue("ftp.hostname");

	public static final String FTP_PORT = ConfigUtil.getValue("ftp.port");

	public static final String FTP_USERNAME = ConfigUtil.getValue("ftp.username");

	public static final String FTP_PASSWORD = ConfigUtil.getValue("ftp.password");

	public static final String FTP_HTTP = ConfigUtil.getValue("ftp.http");

	static {
		// 设置将过程中使用到的命令输出到控制台
		ftpClient.setControlEncoding("GBK");
		ftpClient.addProtocolCommandListener(new PrintCommandListener(new PrintWriter(System.out)));
	}

	/**
	 * 连接到FTP服务器
	 * 
	 * @param hostname
	 *            主机名
	 * @param port
	 *            端口
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @return 是否连接成功
	 * @throws IOException
	 */
	public static boolean connect() throws IOException {
		ftpClient.connect(FTP_HOSTNAME, Integer.parseInt(FTP_PORT));
		ftpClient.setControlEncoding("GBK");
		if (FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
			if (ftpClient.login(FTP_USERNAME, FTP_PASSWORD)) {
				return true;
			}
		}
		disconnect();
		return false;
	}

	public boolean removeFile(String srcFname) {
		boolean flag = false;
		if (ftpClient != null) {
			try {
				flag = ftpClient.deleteFile(srcFname);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return flag;
	}

	/**
	 * 上传文件到FTP服务器，支持断点续传
	 * 
	 * @param byte[]
	 *            数组
	 * @param remote
	 *            远程文件路径，使用/home/directory1/subdirectory/file.ext
	 *            按照Linux上的路径指定方式，支持多级目录嵌套，支持递归创建不存在的目录结构
	 * @return 上传结果
	 * @throws IOException
	 */
	public static UploadStatus upload(InputStream b, String remote) throws IOException {
		// // 设置PassiveMode传输
		ftpClient.enterLocalPassiveMode();
		// // 设置以二进制流的方式传输
		ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
		ftpClient.setControlEncoding("utf-8");
		UploadStatus result;
		// 对远程目录的处理
		String remoteFileName = remote;
		if (remote.contains("/")) {
			remoteFileName = remote.substring(remote.lastIndexOf("/") + 1);
			// 创建服务器远程目录结构，创建失败直接返回
			if (CreateDirecroty(remote, ftpClient) == UploadStatus.Create_Directory_Fail) {
				return UploadStatus.Create_Directory_Fail;
			}
		}

		/*
		 * //检查远程是否存在文件 FTPFile[] files = ftpClient.listFiles(new
		 * String(remoteFileName.getBytes("GBK"),"iso-8859-1")); if(files.length
		 * == 1){ long remoteSize = files[0].getSize(); File f = new
		 * File(local); long localSize = f.length(); if(remoteSize==localSize){
		 * return UploadStatus.File_Exits; }else if(remoteSize > localSize){
		 * return UploadStatus.Remote_Bigger_Local; }
		 * 
		 * //尝试移动文件内读取指针,实现断点续传 result = uploadFile(remoteFileName, f,
		 * ftpClient, remoteSize);
		 * 
		 * //如果断点续传没有成功，则删除服务器上文件，重新上传 if(result ==
		 * UploadStatus.Upload_From_Break_Failed){
		 * if(!ftpClient.deleteFile(remoteFileName)){ return
		 * UploadStatus.Delete_Remote_Faild; } result =
		 * uploadFile(remoteFileName, f, ftpClient, 0); } }else { result =
		 * uploadFile(remoteFileName, new File(local), ftpClient, 0); }
		 */
		result = uploadFile(remoteFileName, b, ftpClient, 0);
		return result;
	}

	/**
	 * 断开与远程服务器的连接
	 * 
	 * @throws IOException
	 */
	public static void disconnect() throws IOException {
		if (ftpClient.isConnected()) {
			ftpClient.disconnect();
		}
	}

	/**
	 * 递归创建远程服务器目录
	 * 
	 * @param remote
	 *            远程服务器文件绝对路径
	 * @param ftpClient
	 *            FTPClient对象
	 * @return 目录创建是否成功
	 * @throws IOException
	 */
	public static UploadStatus CreateDirecroty(String remote, FTPClient ftpClient) throws IOException {
		UploadStatus status = UploadStatus.Create_Directory_Success;
		String directory = remote.substring(0, remote.lastIndexOf("/") + 1);
		if (!directory.equalsIgnoreCase("/")
				&& !ftpClient.changeWorkingDirectory(new String(directory.getBytes("GBK"), "iso-8859-1"))) {
			// 如果远程目录不存在，则递归创建远程服务器目录
			int start = 0;
			int end = 0;
			if (directory.startsWith("/")) {
				start = 1;
			} else {
				start = 0;
			}
			end = directory.indexOf("/", start);
			while (true) {
				String subDirectory = new String(remote.substring(start, end).getBytes("GBK"), "iso-8859-1");
				if (!ftpClient.changeWorkingDirectory(subDirectory)) {
					if (ftpClient.makeDirectory(subDirectory)) {
						ftpClient.changeWorkingDirectory(subDirectory);
					} else {
						System.out.println("创建目录失败");
						return UploadStatus.Create_Directory_Fail;
					}
				}

				start = end + 1;
				end = directory.indexOf("/", start);

				// 检查所有目录是否创建完毕
				if (end <= start) {
					break;
				}
			}
		}
		return status;
	}

	/**
	 * 上传文件到服务器,新上传和断点续传
	 * 
	 * @param remoteFile
	 *            远程文件名，在上传之前已经将服务器工作目录做了改变
	 * @param byte[]
	 *            数组
	 * @param processStep
	 *            需要显示的处理进度步进值
	 * @param ftpClient
	 *            FTPClient引用
	 * @return
	 * @throws IOException
	 */
	public static UploadStatus uploadFile(String remoteFile, InputStream b, FTPClient ftpClient, long remoteSize)
			throws IOException {
		UploadStatus status;
		boolean result = ftpClient.storeFile(remoteFile, b);
		if (remoteSize > 0) {
			status = result ? UploadStatus.Upload_From_Break_Success : UploadStatus.Upload_From_Break_Failed;
		} else {
			status = result ? UploadStatus.Upload_New_File_Success : UploadStatus.Upload_New_File_Failed;
		}
		return status;
	}

	/**
	 * 得到ftp访问地址(保存数据库)
	 * 
	 * @param ftpFild
	 * @return
	 */
	public static String getVisitFtpRemote(String ftpFild) {
		/*
		 * ResourceBundle ftp = ResourceBundle.getBundle("conf/ftp");
		 * FTP_HOSTNAME = ftp.getString("ftp.hostname"); FTP_PORT =
		 * ftp.getString("ftp.port"); FTP_USERNAME =
		 * ftp.getString("ftp.username"); FTP_PASSWORD =
		 * ftp.getString("ftp.password"); return
		 * "ftp://"+FTP_USERNAME+":"+FTP_PASSWORD
		 * +"@"+FTP_HOSTNAME+":"+FTP_PORT+ftpFild;
		 */
		return FTP_HTTP + ftpFild;
	}

	/**
	 * 得到ftp存放地址(上传ftp)
	 * 
	 * @return
	 */
	public static String getSaveFtpRemote(String filed, String prefix) {
		return filed + getUUID() + "." + prefix;
	}

	/**
	 * 统一存储文件名
	 * 
	 * @return
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	/**
	 * inputStrean 转byte[]
	 * 
	 * @param inStream
	 * @return
	 * @throws IOException
	 */
	public static final byte[] input2byte(InputStream inStream) throws IOException {
		ByteArrayOutputStream swapStream = new ByteArrayOutputStream();
		byte[] buff = new byte[100];
		int rc = 0;
		while ((rc = inStream.read(buff, 0, 100)) > 0) {
			swapStream.write(buff, 0, rc);
		}
		byte[] in2b = swapStream.toByteArray();
		return in2b;
	}

	public static void main(String[] args) {
		// ContinueFTP myFtp = new ContinueFTP();
		// try {
		// myFtp.connect();
		// File file = new File("C:/Users/Public/123.jpg");
		// FileInputStream fis = new FileInputStream(file);
		// byte[] b = input2byte(fis);
		// String filed = "/img";
		// String fileName = "/img.jpg";
		// myFtp.ftpClient.makeDirectory(new
		// String(" 电视剧".getBytes("GBK"),"iso-8859-1"));
		// myFtp.ftpClient.changeWorkingDirectory(new
		// String(" 电视剧".getBytes("GBK"),"iso-8859-1"));
		// System.out.println(myFtp.upload(b, "/mallimg/"));
		// System.out.println(myFtp.download("/ftp/img/img1/1234.jpg",
		// "D:/12345.jpg"));
		// myFtp.disconnect();
		/*
		 * } catch (IOException e) { System.out.println("连接FTP出错：" +
		 * e.getMessage()); }
		 */
	}
}