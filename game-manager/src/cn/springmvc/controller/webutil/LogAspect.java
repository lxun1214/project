package cn.springmvc.controller.webutil;

import org.aspectj.lang.annotation.Aspect;

@Aspect
public class LogAspect {
	
	
//	/**
//	 * @Description: TODO(标注该方法体为后置通知，当目标方法执行成功后执行该方法体)
//	 * @since 2015年9月21日 上午9:04:20
//	 */
//	@AfterReturning("within(cn.springmvc.service..*) && @annotation(rp)")   
//	public void addLogSuccess(JoinPoint joinPoint, rmpfLog rp) {
//		String parames = parseParames(joinPoint.getArgs());//获取目标方法体参数   
//		String sign = joinPoint.getSignature().toString();
//		String className = joinPoint.getTarget().getClass().toString();//获取目标类名   
//        className = className.substring(className.indexOf("cn"));   
//        String signature = joinPoint.getSignature().toString();//获取目标方法签名   
//        String methodName = signature.substring(signature.lastIndexOf(".")+1, signature.indexOf("("));   
//        String modelName = getModelName(className); //根据类名获取所属的模块   
//        String ip = getIpAddr();
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        request.getSession().getAttribute("warp");    
//		System.out.println("哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈");
//	}  
//	
//	
//	 private String parseParames(Object[] parames) {   
//	        StringBuffer sb = new StringBuffer();   
//	        for(int i=0; i<parames.length; i++){   
//	            if(parames[i] instanceof Object[] || parames[i] instanceof Collection){   
//	                JSONArray json = JSONArray.fromObject(parames[i]);   
//	                if(i==parames.length-1){   
//	                    sb.append(json.toString());   
//	                }else{   
//	                    sb.append(json.toString() + ",");   
//	                }   
//	            }else{   
//	                JSONObject json = JSONObject.fromObject(parames[i]);   
//	                if(i==parames.length-1){   
//	                    sb.append(json.toString());   
//	                }else{   
//	                    sb.append(json.toString() + ",");   
//	                }   
//	            }   
//	        }   
//	        String params = sb.toString();   
//	        params = params.replaceAll("(\"\\w+\":\"\",)", "");   
//	        params = params.replaceAll("(,\"\\w+\":\"\")", "");   
//	        return params;   
//	    }
//	 
//	    private String getModelName(String packageName){   
//	        String modelName = "";   
//	        SAXReader reader = new SAXReader();   
//	        try {   
//	            //读取project.xml模块信息描述xml文档   
//	            File proj = ResourceUtils.getFile("classpath:project.xml");   
//	            Document doc = reader.read(proj);   
//	            //获取文档根节点   
//	            Element root = doc.getRootElement();   
//	            //查询模块名称   
//	            modelName = searchModelName(root, packageName);   
//	        } catch (Exception e) {   
//	            e.printStackTrace();   
//	        }   
//	        return modelName;   
//	    } 
//	    
//	    private String searchModelName(Element element, String packageName){   
//	        String modelName = searchModelNodes(element, packageName);   
//	        //若将包名解析到最后的根目录后仍未检索到模块名称，则返回空   
//	        if(packageName.lastIndexOf(".")==-1){   
//	            return modelName;   
//	        }   
//	        //逐级检索模块名称   
//	        if(modelName.equals("")){   
//	            packageName = packageName.substring(0, packageName.lastIndexOf("."));   
//	            modelName = searchModelName(element, packageName);   
//	        }   
//	        return modelName;   
//	    } 
//	    
//	    private String searchModelNodes(Element element, String packageName){   
//	           
//	        String modelName = "";   
//	        Element modules = element.element("modules");   
//	        @SuppressWarnings("rawtypes")
//			Iterator it = modules.elementIterator();   
//	        if(!it.hasNext()){   
//	            return modelName;   
//	        }   
//	        while (it.hasNext()) {   
//	            Element model = (Element) it.next();   
//	            String pack = model.attributeValue("packageName");   
//	            String name = model.elementText("moduleCHPath");   
//	            if(packageName.equals(pack)){   
//	                modelName = name;   
//	                return modelName;   
//	            }   
//	            if(modelName!=null && !modelName.equals("")){   
//	                break;   
//	            }   
//	            modelName = searchModelNodes(model, packageName);   
//	        }   
//	           
//	        return modelName;   
//	    }
//	    
//	    private String getIpAddr() {   
//	        String ipAddress = null;   
//	        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//	        //ipAddress = this.getRequest().getRemoteAddr();   
//	        ipAddress = request.getHeader("x-forwarded-for");   
//	        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {   
//	         ipAddress = request.getHeader("Proxy-Client-IP");   
//	        }   
//	        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {   
//	            ipAddress = request.getHeader("WL-Proxy-Client-IP");   
//	        }   
//	        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {   
//	         ipAddress = request.getRemoteAddr();   
//	         if(ipAddress.equals("127.0.0.1")){   
//	          //根据网卡取本机配置的IP   
//	          InetAddress inet=null;   
//	       try {   
//	        inet = InetAddress.getLocalHost();   
//	       } catch (UnknownHostException e) {   
//	        e.printStackTrace();   
//	       }   
//	       ipAddress= inet.getHostAddress();   
//	        }   
//	               
//	        }   
//	        //对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割   
//	        if(ipAddress!=null && ipAddress.length()>15){ //"***.***.***.***".length() = 15   
//	            if(ipAddress.indexOf(",")>0){   
//	                ipAddress = ipAddress.substring(0,ipAddress.indexOf(","));   
//	            }   
//	        }   
//	        return ipAddress;    
//	     } 
//	  
}
