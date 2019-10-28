package cn.springmvc.utils;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Collection;
import java.util.Iterator;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFComment;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;

public class ExportExcelUtil {

	public void exportExcel(Collection<String[]> dataset, OutputStream out) {
		exportExcel( "测试POI导出EXCEL文档", null, dataset, out, "yyyy-MM-dd");
	}

	public void exportExcel(String title, String[] headers, Collection<String[]> dataset,
			OutputStream out) {
		exportExcel(title, headers, dataset, out, "yyyy-MM-dd");
	}

	public void exportExcel(String[] headers, Collection<String[]> dataset, OutputStream out, String pattern) {
		exportExcel("测试POI导出EXCEL文档", headers, dataset, out, pattern);
	}

	/**
	 * 这是一个通用的方法，可以将放置在JAVA集合中并且符号一定条件的数据以EXCEL 的形式输出到指定IO设备上
	 * 
	 * @param title
	 *            表格标题名
	 * @param headers
	 *            表格属性列名数组
	 * @param dataset
	 *            需要显示的数据集合
	 * @param out
	 *            与输出设备关联的流对象，可以将EXCEL文档导出到本地文件或者网络中
	 * @param pattern
	 *            如果有时间数据，设定输出格式。默认为"yyy-MM-dd"
	 */
	@SuppressWarnings("deprecation")
	public void exportExcel(String title, String[] headers, Collection<String[]> dataset,
			OutputStream out, String pattern) {
		// 声明一个工作薄
		HSSFWorkbook workbook = new HSSFWorkbook();
		// 生成一个表格
		HSSFSheet sheet = workbook.createSheet(title);
		// 设置表格默认列宽度
		//sheet.setDefaultColumnWidth(100*228);
	//	sheet.setColumnWidth(headers.length-1, 100*228);
		// 生成一个样式
		HSSFCellStyle style = workbook.createCellStyle();
		// 设置这些样式
		//style.setFillForegroundColor(HSSFColor.SKY_BLUE.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		style.setLocked(true);
		// 生成一个字体
		HSSFFont font = workbook.createFont();
		font.setColor(HSSFColor.VIOLET.index);
		font.setFontHeightInPoints((short) 12);
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		// 把字体应用到当前的样式
		style.setFont(font);
		// 生成并设置另一个样式
		HSSFCellStyle style2 = workbook.createCellStyle();
		//style2.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);
		style2.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		style2.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style2.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style2.setBorderRight(HSSFCellStyle.BORDER_THIN);
		style2.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style2.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style2.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
		style2.setLocked(true);
		// 生成另一个字体
		HSSFFont font2 = workbook.createFont();
		font2.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 把字体应用到当前的样式
		style2.setFont(font2);

		// 声明一个画图的顶级管理器
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		// 定义注释的大小和位置,详见文档
		HSSFComment comment = patriarch.createComment(new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 2, (short) 6, 5));
		// 设置注释内容
		comment.setString(new HSSFRichTextString("订单号禁止修改"));
		// 设置注释作者，当鼠标移动到单元格上是可以在状态栏中看到该内容.
		comment.setAuthor("leno");

		// 产生表格标题行
		HSSFRow row = sheet.createRow(0);
		for (short i = 0; i < headers.length; i++) {
			sheet.setColumnWidth(i, 30*228);
			HSSFCell cell = row.createCell(i);
			cell.setCellStyle(style);
			HSSFRichTextString text = new HSSFRichTextString(headers[i]);
			cell.setCellValue(text);
		}

		// 遍历集合数据，产生数据行
		Iterator<String[]> it = dataset.iterator();
		int index = 0;
		while (it.hasNext()) {
			index++;
			row = sheet.createRow(index);
			row.setHeight((short) (25 * 20));  
			String[] t = (String[]) it.next();
			for (short i = 0; i < t.length; i++) {
				HSSFCell cell = row.createCell(i);
				cell.setCellStyle(style2);
				// 判断值的类型后进行强制类型转换
				if (i == 2) {
					style2.setLocked(false);
				}
				if (i == 3) {
					style2.setLocked(false);
				}
				String textValue = t[i];
				if (textValue == null) {
					textValue = "空";
				}

				// if(textValue.startsWith("http://image.pdl.jsy86.com")) //
				// 生产环境 ReadConfig.getFtpValue("ftp.http");
				// {
				// // 有图片时，设置行高为50px;
				// row.setHeightInPoints(50);
				// // 设置图片所在列宽度为80px,注意这里单位的一个换算
				// sheet.setColumnWidth(i, (short) (35.7 * 85)); //
				// //sheet.autoSizeColumn(i);
				// try {
				// HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0,
				// 1023,255, (short) i, index, (short) i, index);
				// anchor.setAnchorType(2);
				// byte[] image =
				// imageNetToLocal("http://192.168.0.151/company/00240161ec10406884e6c512c639265c.jpg");
				// patriarch.createPicture(anchor,workbook.addPicture(image,
				// HSSFWorkbook.PICTURE_TYPE_JPEG));
				// } catch (Exception e) {
				// e.printStackTrace();
				// }
				//
				// } else {
				HSSFRichTextString richString = new HSSFRichTextString(textValue);
				HSSFFont font3 = workbook.createFont();
				//font3.setColor(HSSFColor.BLUE.index);
				richString.applyFont(font3);
				cell.setCellValue(richString);
				// ? }

				/*
				 * else if (value instanceof byte[]) { // 有图片时，设置行高为60px;
				 * row.setHeightInPoints(60); // 设置图片所在列宽度为80px,注意这里单位的一个换算
				 * sheet.setColumnWidth(i, (short) (35.7 * 80)); //
				 * sheet.autoSizeColumn(i); byte[] bsValue = (byte[]) value;
				 * HSSFClientAnchor anchor = new HSSFClientAnchor(0, 0, 1023,
				 * 255, (short) 6, index, (short) 6, index);
				 * anchor.setAnchorType(2); patriarch.createPicture(anchor,
				 * workbook.addPicture( bsValue,
				 * HSSFWorkbook.PICTURE_TYPE_JPEG)); } else{ //其它数据类型都当作字符串简单处理
				 * textValue = value.toString(); }
				 */

			}
		}
		try {
			workbook.write(out);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static byte[] imageNetToLocal(String imgUrl) throws Exception {
		URL url = new URL(imgUrl);
		// 打开链接
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		// 设置请求方式为"GET"
		conn.setRequestMethod("GET");
		// 超时响应时间为5秒
		conn.setConnectTimeout(5 * 1000);
		// 通过输入流获取图片数据
		InputStream inStream = conn.getInputStream();
		// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
		byte[] data = readInputStream(inStream);
		return data;
	}

	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		// 创建一个Buffer字符串
		byte[] buffer = new byte[1024];
		// 每次读取的字符串长度，如果为-1，代表全部读取完毕
		int len = 0;
		// 使用一个输入流从buffer里把数据读取出来
		while ((len = inStream.read(buffer)) != -1) {
			// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
			outStream.write(buffer, 0, len);
		}
		// 关闭输入流
		inStream.close();
		// 把outStream里的数据写入内存
		return outStream.toByteArray();
	}

	public  ByteArrayInputStream parse(OutputStream out) throws Exception {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		baos = (ByteArrayOutputStream) out;
		ByteArrayInputStream swapStream = new ByteArrayInputStream(baos.toByteArray());
		return swapStream;
	}

}
