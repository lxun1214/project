package cn.springmvc.controller.webutil;

import java.math.BigDecimal;
import java.util.Date;

import cn.springmvc.service.sys.PrivilegeService;

/**
 * jstl调用方法，权限限制类
 * @author MaHaiDong
 *
 */
public class ELFunc  {
	
	private static PrivilegeService privilegeService; 

	public static void setPrivilegeService(PrivilegeService privilegeService) {
		ELFunc.privilegeService = privilegeService;
	}

	public static boolean hasPrivilege(String adminId,String id) {
		return privilegeService.is_yn(Integer.parseInt(adminId), Integer.parseInt(id));
	}
	public static boolean eqs(String str, String lon) {
		return str.equals(String.valueOf(lon));
	}
	
	public static int getdayCanTask(BigDecimal money, int posterPrice, Date aDate, Date bDate) {
		return (money.divide(new BigDecimal(posterPrice)).divide(new BigDecimal(distanceDays(aDate, bDate)))).intValue();
	} 
	
    public static long distanceDays(Date aDate, Date bDate) {  
        long days=0;  
        try {  
            long time1 = aDate.getTime();  
            long time2 = bDate.getTime();  
            long diff ;  
            if(time1<time2) {  
                diff = time2 - time1;  
            } else {  
                diff = time1 - time2;  
            }  
            days = diff / (1000 * 60 * 60 * 24);  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
        return days;  
    }
    
    public static void main(String[] args) throws InterruptedException {
		Date one = new Date();
		Thread.sleep(100);
		Date tow = new Date();
		System.out.println(distanceDays(one, tow));
	}
	
	
	
	
	
}
