package com.rt.utils;





import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringReader;

import org.jdom.Attribute;
import org.jdom.DataConversionException;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;

/**
 * @author jin 使用jdom的xml工具类
 */
public class XmlUtil
{
	/** 初始化 xml document 的 initXmlSource 方法 */
	public static Document initXmlSource(String xmlSource)
	{
		SAXBuilder builder = new SAXBuilder();
		Document doc = null;
		try
		{
			doc = builder.build(new File(xmlSource));
		}
		catch (JDOMException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			try
			{
				doc = builder.build(ClassLoader
						.getSystemResourceAsStream(xmlSource));
			}
			catch (JDOMException e1)
			{
				e1.printStackTrace();
			}
			catch (IOException e1)
			{
				e1.printStackTrace();
			}
		}
		return doc;
	}
	
	/**
	 * 读取一组xml文件，将文件解析成Document
	 * 
	 * @param configPath
	 * @return
	 * @throws Exception
	 */
//	public List<Document> loadXmls(String dir) throws Exception
//	{
//		List<String> files = FileUtils.listDirAllFiles(dir);
//		List<Document> res = new ArrayList<Document>();
//		for (String fileName : files)
//		{
//			String path = dir + File.separator + fileName + ".xml";
//			Document doc = initXmlSource(path);
//			res.add(doc);
//		}
//		return res;
//	}

	/** 保存 Document 对象到 XML 文件的 saveToXmlFile 方法 */
	public static void saveToXmlFile(Document doc, String xmlFilePath)
	{
		XMLOutputter outputter = new XMLOutputter();
		try
		{
			outputter.output(doc, new FileOutputStream(xmlFilePath));
		}
		catch (FileNotFoundException e)
		{
			e.printStackTrace();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
	}

	/** 获得xml的根节点 */
	public static Element getRootElement(String xmlFilePath)
	{
		Document doc = initXmlSource(xmlFilePath);
		return doc.getRootElement();
	}

	/** 获得int值,封装try catch */
	public static int getIntValue(Attribute attr)
	{
		try
		{
			return attr.getIntValue();
		}
		catch (DataConversionException e)
		{
			e.printStackTrace();
			return 0;
		}
	}

	/** 获得boolean值,封装try catch */
	public static boolean getBooleanValue(Attribute attr)
	{
		try
		{
			return attr.getBooleanValue();
		}
		catch (DataConversionException e)
		{
			e.printStackTrace();
			return false;
		}
	}

	/** 获得float值,封装try catch */
	public static float getFloatValue(Attribute attr)
	{
		try
		{
			return attr.getFloatValue();
		}
		catch (DataConversionException e)
		{
			e.printStackTrace();
			return 0;
		}
	}

	/** 获得long值,封装try catch */
	public static long getLongValue(Attribute attr)
	{
		try
		{
			return attr.getLongValue();
		}
		catch (DataConversionException e)
		{
			e.printStackTrace();
			return 0;
		}
	}

	/** 获得double值,封装try catch */
	public static double getDoubleValue(Attribute attr)
	{
		try
		{
			return attr.getDoubleValue();
		}
		catch (DataConversionException e)
		{
			e.printStackTrace();
			return 0;
		}
	}
	
	
	public static Element doXMLParse(String strxml) throws JDOMException, IOException {
		if(null == strxml || "".equals(strxml)) {
			return null;
		}
		SAXBuilder builder = new SAXBuilder();
		Document doc = builder.build(new StringReader(strxml));
		Element root = doc.getRootElement();
		return root;
	}
}
