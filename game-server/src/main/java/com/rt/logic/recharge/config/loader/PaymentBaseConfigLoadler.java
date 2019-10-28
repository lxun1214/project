package com.rt.logic.recharge.config.loader;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Workbook;

import com.rt.cache.ConfigCache;
import com.rt.common.AbsLoader;
import com.rt.common.GameModel;
import com.rt.logic.recharge.config.data.PaymentBaseConfig;
import com.rt.utils.AppFile;
import com.rt.utils.ExcelUtils;

public class PaymentBaseConfigLoadler extends AbsLoader{

	String path="paymentBase.xls";
	
	@Override
	public void load() {
		ConfigCache.paymentBaseConfigMap.clear();
		Workbook wb = ExcelUtils.loadExcel(AppFile.excelUrl(path));
		List<PaymentBaseConfig> list = new ArrayList<PaymentBaseConfig>();
		GameModel.initModels(wb.getSheetAt(0), PaymentBaseConfig.class, list);
		for (PaymentBaseConfig config : list) {
			ConfigCache.paymentBaseConfigMap.put(config.id, config);
		}
	}

}
