package cn.springmvc.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

public class MailUtil {

    public static boolean send(Mail mail) {  
        // 发送email  
        HtmlEmail email = new HtmlEmail();  
        try {  
            // 这里是SMTP发送服务器的名字：163的如下："smtp.163.com"  
            email.setHostName(mail.getHost());  
            // 字符编码集的设置  
            email.setCharset(Mail.ENCODEING);  
            // 收件人的邮箱  
            email.addTo(mail.getReceiver());  
            // 发送人的邮箱  
            email.setFrom(mail.getSender(), mail.getName());  
            // 如果需要认证信息的话，设置认证：用户名-密码。分别为发件人在邮件服务器上的注册名称和密码  
            email.setAuthentication(mail.getUsername(), mail.getPassword());  
            // 要发送的邮件主题  
            email.setSubject(mail.getSubject());  
            // 要发送的信息，由于使用了HtmlEmail，可以在邮件内容中使用HTML标签  
            email.setMsg(mail.getMessage());  
            
            email.setTextMsg(mail.getMessage());
            // 发送  
            email.send();  
            System.out.println(mail.getSender() + " 发送邮件到 " + mail.getReceiver()); 
            return true;  
        } catch (EmailException e) {  
            e.printStackTrace();  
            return false;  
        }  
    }  
    
    
    
    public static void sendCode(String email,String code){
    	  Mail mail = new Mail();  
          mail.setHost("smtp.163.com"); // 设置邮件服务器,如果不用163的,自己找找看相关的  
          mail.setSender("aniehaidonga@163.com");  
          mail.setReceiver(email); // 接收人  
          mail.setName("ttly");
          mail.setUsername("aniehaidonga@163.com"); // 登录账号,一般都是和邮箱名一样吧  
          mail.setPassword("a199218a"); // 发件人邮箱的登录密码  
          mail.setSubject("伊杭优品-验证码发送通知");  
          SimpleDateFormat sFormat=new SimpleDateFormat("yyyy年MM月dd");
          String string="<p style=\"margin:0;padding:0;font-size:14px;line-height:30px;color:#333;font-family:arial,sans-serif;font-weight:bold\">亲爱的管理员：</p>"
          		+"<p style=\"margin:0;padding:0;line-height:30px;font-size:14px;color:#333;font-family:'宋体',arial,sans-serif\">您好！感谢您使用伊杭瑞达管理后台，您正在进行邮箱验证，本次请求的验证码为："+code+"</p></br>"
          		+"<p style=\"margin:0;padding:0;line-height:30px;font-size:14px;color:#333;font-family:'宋体',arial,sans-serif\">伊杭瑞达开发团队</p>"
          		+"<p style=\"margin:0;padding:0;line-height:30px;font-size:14px;color:#333;font-family:'宋体',arial,sans-serif\"><span style=\"border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); position: relative;\" t=\"5\"  isout=\"0\">"+sFormat.format(new Date())+"</span></p>";
          mail.setMessage(string);  
          send(mail);  
    }
    
    
    public static void main(String[] args) {  
        Mail mail = new Mail();  
        mail.setHost("smtp.163.com"); // 设置邮件服务器,如果不用163的,自己找找看相关的  
        mail.setSender("yihangyoupin@163.com");  
        mail.setReceiver("386958956@qq.com"); // 接收人  
        mail.setName("伊杭优品");
        mail.setUsername("yihangyoupin@163.com"); // 登录账号,一般都是和邮箱名一样吧  
        mail.setPassword("yihangyoupin2017"); // 发件人邮箱的登录密码  
        mail.setSubject("企业审核通知");  
        String string="<p style=\"margin:0;padding:0;font-size:14px;line-height:30px;color:#333;font-family:arial,sans-serif;font-weight:bold\">亲爱的管理员：</p>"
        		+"<p style=\"margin:0;padding:0;line-height:30px;font-size:14px;color:#333;font-family:'宋体',arial,sans-serif\">您好，有企业提交信息申请，不要忘记审核哟</p>"
        		+"<p style=\"margin:0;padding:0;line-height:30px;font-size:14px;color:#333;font-family:'宋体',arial,sans-serif\"><span style=\"border-bottom-width: 1px; border-bottom-style: dashed; border-bottom-color: rgb(204, 204, 204); position: relative;\" t=\"5\"  isout=\"0\">2017年1月5日</span></p>";
        mail.setMessage(string);  
       MailUtil.send(mail);  
    }  
}
