package com.rt.common;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.poi.ss.usermodel.Sheet;

import com.rt.utils.ExcelUtils;

/**
 * 数据对象 文件配置文件与类对象文件之间的转换
 * 
 */
public class GameModel implements Cloneable {

	/** 策划批注 */
	public static final int PLAN_GREEN = 17;

	/** 红色，都读取 */
	public static final int BOTH_RED = 10;

	/** 黄色，前端读取 */
	public static final int FRONT_YELLOW = 13;

	/** 白色，后端读取 */
	public static final int BACK_WHITE = 9;

	/** 无色，后端读取 */
	public static final int BACK_NULL = 64;

	public static List<Integer> colorList = new ArrayList<>();

	static {
		colorList.add(BOTH_RED);
		colorList.add(FRONT_YELLOW);
		colorList.add(BACK_WHITE);
		colorList.add(BACK_NULL);
		colorList.add(PLAN_GREEN);
	}

	/**
	 * 设置对象的值
	 * 
	 * @param key
	 * @param value
	 * @return
	 */
	public boolean setValue(String key, String value) {
		try {
			Field field = getClass().getField(key);
			Class<?> class1 = field.getType();
			if (class1 == Integer.TYPE)
				field.setInt(this, Integer.parseInt(value));
			else if (class1 == Integer.class)
				field.set(this, new Integer(value));
			else if (class1 == Long.TYPE)
				field.setLong(this, Long.parseLong(value));
			else if (class1 == Long.class)
				field.set(this, Long.valueOf(value));
			else if (class1 == Boolean.TYPE)
				field.setBoolean(this, Boolean.getBoolean(value));
			else if (class1 == Boolean.class)
				field.set(this, Boolean.valueOf(value));
			else if (class1 == Float.TYPE)
				field.setFloat(this, Float.valueOf(value).floatValue());
			else if (class1 == Float.class)
				field.set(this, Float.valueOf(value));
			else if (class1 == Double.TYPE)
				field.setDouble(this, Double.valueOf(value).doubleValue());
			else if (class1 == Double.class)
				field.set(this, Double.valueOf(value));
			else if (class1 == (java.lang.String.class))
				field.set(this, value);
			else if (class1 == Date.class) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
				field.set(this, sdf.parse(value));
			}
			return true;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 初始化model
	 * 
	 * @param sheet
	 * @param GameModelClass
	 * @param arraylist
	 */
	public static final <T extends GameModel> void initModels(Sheet sheet, Class<T> GameModelClass, List<T> arraylist) {
		int cellLenth = sheet.getRow(0).getLastCellNum();
		int rowLenth = sheet.getLastRowNum();
		Map<Integer, Integer> colorMap = ExcelUtils.getSheetColor(sheet);
		Map<Integer, String> titleMap = ExcelUtils.getRowValues(sheet, 0, cellLenth);

		for (int i = 3; i <= rowLenth; i++) {
			Map<Integer, String> valuesMap = ExcelUtils.getRowValues(sheet, i, cellLenth);
			T gameModel = null;
			try {
				gameModel = GameModelClass.newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
				return;
			} catch (IllegalAccessException e) {
				e.printStackTrace();
				return;
			}
			for (int index : colorMap.keySet()) {
				String title = titleMap.get(index);
				int color = colorMap.get(index);
				if (!colorList.contains(color)) {
					throw new RuntimeException("发现未知颜色,表:"+GameModelClass.getName()+",字段名称："+title);
				}
				if (color != BOTH_RED && color != BACK_WHITE && color != BACK_NULL)
					continue;
				String values = valuesMap.get(index);
				if (values == null || values.equals(""))
					continue;
				values = values.replaceAll(" ", "");
				values = values.replaceAll("，", ",");
				values = values.replaceAll("：", ":");
				title = title.trim();
				values = values.trim();
				gameModel.setValue(title, values);
			}
			arraylist.add(gameModel);
		}
	}

	/**
	 * 初始化model
	 * 
	 * @param sheet
	 * @param GameModelClass
	 * @param arraylist
	 */
	public static final <T extends GameModel> void initModels(Sheet sheet, Class<T> GameModelClass, Set<T> arraylist) {
		int cellLenth = sheet.getRow(1).getLastCellNum();
		int rowLenth = sheet.getLastRowNum();
		Map<Integer, Integer> colorMap = ExcelUtils.getSheetColor(sheet);
		Map<Integer, String> titleMap = ExcelUtils.getRowValues(sheet, 1, cellLenth);

		for (int i = 3; i <= rowLenth; i++) {
			Map<Integer, String> valuesMap = ExcelUtils.getRowValues(sheet, i, cellLenth);
			T gameModel = null;
			try {
				gameModel = GameModelClass.newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
				return;
			} catch (IllegalAccessException e) {
				e.printStackTrace();
				return;
			}
			for (int index : colorMap.keySet()) {
				int color = colorMap.get(index);
				if (color != BOTH_RED && color != BACK_WHITE)
					continue;
				String title = titleMap.get(index);
				String values = valuesMap.get(index);
				if (values == null || values.equals(""))
					continue;
				values = values.replaceAll(" ", "");
				values = values.replaceAll("，", ",");
				values = values.replaceAll("：", ":");
				title = title.trim();
				values = values.trim();
				gameModel.setValue(title, values);
			}
			arraylist.add(gameModel);
		}
	}

	/**
	 * list 转换成map
	 * 
	 * @param list
	 * @param map
	 * @param key
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static final <T extends GameModel> void listToMap(List<T> list, Map map, String key) {
		try {
			for (T config : list) {
				Field field = config.getClass().getField(key);
				Object obj = field.get(config);
				map.put(obj, config);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 赋值子对象
	 * 
	 * @param itemModel
	 */
	public void init(GameModel itemModel) {
		Field[] fields = itemModel.getClass().getFields();
		for (int i = 0; i < fields.length; i++) {
			try {
				String name = fields[i].getName();
				if ("class".equals(name))
					continue;
				if ("BOTH_RED".equals(name))
					continue;
				if ("FRONT_YELLOW".equals(name))
					continue;
				if ("BACK_WHITE".equals(name))
					continue;
				Field field = getClass().getField(name);
				field.set(this, fields[i].get(itemModel));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 复制对象
	 * 
	 */
	public Object clone() {
		GameModel gameModel = null;
		try {
			gameModel = (GameModel) super.clone();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return gameModel;
	}
}