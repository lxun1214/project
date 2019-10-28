package com.rt.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * Excel工具
 *
 */
public class ExcelUtils {
	/**
	 * 读取exce (只能读取xls类型文件不支持xlsx)
	 * 
	 * @param filePath
	 * @return
	 */
	public static Workbook loadExcel(String filePath) {
		Workbook wb = null;
		File file = new File(filePath);
		try {
			if (filePath.endsWith(".xls")) {
				wb = (Workbook) new HSSFWorkbook(new POIFSFileSystem(
						new FileInputStream(file)));
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return wb;
	}
	
	/**
	 * 获取一页的标题颜色
	 * @param sheet
	 * @return
	 */
	public static Map<Integer, Integer> getSheetColor(Sheet sheet)
	{
		Map<Integer, Integer> map = new LinkedHashMap<Integer, Integer>();
		Row row1=sheet.getRow(0);
		int cellLenth = row1.getLastCellNum();
		for(int i =0;i<cellLenth;i++){
			Cell cell = row1.getCell(i);
			map.put(i, (int)cell.getCellStyle().getFillForegroundColor());
		}
		return map;
	}
	
	
	/**
	 * 获取一行中的值
	 * @param sheet
	 * @param rowNum
	 * @param rowLenth
	 * @return
	 */
	public static Map<Integer, String> getRowValues(Sheet sheet,int rowNum,int cellLenth)
	{
		Map<Integer, String> map = new LinkedHashMap<Integer, String>();
		Row row = sheet.getRow(rowNum);
		for(int i=0;i<cellLenth;i++)
		{
			map.put(i, getValuesString(row.getCell(i)));
		}
		return map;
	}
	
	
	public static String getValuesString(Cell cell)
	{
		if(cell==null)
			return "";
		int type = cell.getCellType();
		
//		type = type==Cell.CELL_TYPE_FORMULA?cell.getCachedFormulaResultType():type;
//		if(type ==Cell.CELL_TYPE_FORMULA)
//		{
//			cell.setCellType(HSSFCell.CELL_TYPE_NUMERIC);
//			double values = cell.getNumericCellValue();
//			if(values>0)
//			{
//				return String.valueOf((int)Math.ceil(values));
//			}else
//			{
//				return String.valueOf((int)Math.floor(values));
//			}
//		}
		if(type ==Cell.CELL_TYPE_NUMERIC)
		{
			double values = cell.getNumericCellValue();
			if(values>0)
			{
				return String.valueOf((int)Math.ceil(values));
			}else
			{
				return String.valueOf((int)Math.floor(values));
			}
		}
		
		if(type==Cell.CELL_TYPE_STRING)
			return cell.getStringCellValue();
		return "";
	}
}
