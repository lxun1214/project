//package cn.springmvc.utils;
//
//import java.io.File;
//import java.io.FileInputStream;
//import java.util.Map;
//
//import org.apache.poi.hssf.usermodel.HSSFCell;
//import org.apache.poi.hssf.usermodel.HSSFRow;
//import org.apache.poi.hssf.usermodel.HSSFSheet;
//import org.apache.poi.hssf.usermodel.HSSFWorkbook;
//
//public class excelTool {
//    private Map<String,Object> readExcel(String astrFile){
//
//        File file = new File(astrFile);
//        if(!file.exists()){
//             return null;
//        }
//
//
//        try{
//            HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(file));
//
//            HSSFSheet sheet = wb.getSheetAt(0);
//
//            for(int j=0;j<sheet.getLastRowNum()+1;j++) {
//                HSSFRow row = sheet.getRow(j);
//                for(int i1=0; i1<row.getLastCellNum(); i1++) {
//                    HSSFCell cell = row.getCell(i1);
//                    System.out.println(cell.getRichStringCellValue());
//                }
//            }
//        }catch (Exception e){
//
//        }
//       return null;
//
//    }
//    public static void excel2Excel(String astrFile,int aiTarType){
//        //1 读取原始数据表
//
//        //2 创建目标数据表
//
//        //3
//    }
//
//    public static void excel2Object(){
//
//    }
//}
