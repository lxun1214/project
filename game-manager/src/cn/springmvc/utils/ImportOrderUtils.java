package cn.springmvc.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class ImportOrderUtils {
	
	public static  List<String> getListString(InputStream stream)throws Exception{
		InputStreamReader reader = new InputStreamReader(stream,"gbk"); // 建立一个输入流对象reader
		List<String> list=new ArrayList<>();
		BufferedReader br = new BufferedReader(reader);
		String line = "";
		line = br.readLine();
		while (line != null) {
			String orderString=line.replace("||", "#=#");
			list.add(orderString);
			line = br.readLine(); // 一次读入一行数据
		}
		return list;
	}
	
}
