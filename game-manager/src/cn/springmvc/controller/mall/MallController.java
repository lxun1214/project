//package cn.springmvc.controller.mall;
//
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.PrintWriter;
//import java.util.ArrayList;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.UUID;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.apache.http.client.ClientProtocolException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.ModelMap;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMethod;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//
//import cn.springmvc.controller.webutil.WebUtil;
//import cn.springmvc.model.mall.Company;
//import cn.springmvc.model.mall.Mall;
//import cn.springmvc.model.sys.Dictionary;
//import cn.springmvc.model.usermodel.Admin;
//import cn.springmvc.service.sys.LogExplainService;
//import cn.springmvc.service.sys.MallService;
//import cn.springmvc.utils.ConfigUtil;
//import cn.springmvc.utils.Json;
//import cn.springmvc.utils.QHttpClient;
//import cn.springmvc.utils.ResultPage;
//
//@Controller
//@RequestMapping(value = "/sellersys/mall")
//public class MallController {
//
//	@Autowired
//	MallService mallService;
//	@Autowired
//	LogExplainService logExplainService;
//
//	/**
//	 * 编辑Dictionary表跳转
//	 * 
//	 * @param id
//	 * @param request
//	 * @return
//	 */
//	@RequestMapping(value = "/toRedit", method = RequestMethod.GET)
//	public String toDictionary(int id, HttpServletRequest request) {
//		request.setAttribute("id", id);
//		return "users/dictionary";
//	}
//
//	@RequestMapping(value = "/listTree", method = RequestMethod.GET)
//	public void listTree(int id, HttpServletResponse response) {
//		Dictionary root = mallService.getDictionaryById(id);
//		List<Dictionary> trees = new ArrayList<Dictionary>();
//		if (root != null) {
//			Dictionary rootnode = this.getNode(root);
//			rootnode.setText(rootnode.getKindname());
//			rootnode.setState("open");
//			rootnode.setChecked(true);
//			trees.add(rootnode);
//		}
//
//		ObjectMapper mapper = new ObjectMapper();
//		String str = "";
//		PrintWriter write = null;
//		try {
//			response.reset();
//			response.setCharacterEncoding("utf-8");
//			write = response.getWriter();
//			str = mapper.writeValueAsString(trees);
//			System.out.println(str);
//			write.write(str);
//		} catch (Exception e) {
//			e.printStackTrace();
//
//		} finally {
//			if (write != null) {
//				write.close();
//			}
//		}
//	}
//
//	/**
//	 * 递归
//	 */
//	private Dictionary getNode(Dictionary node) {
//		if (node == null) {
//			return null;
//		}
//		try {
//			node.setText(node.getKindname());
//			node.setParentId(node.getFid() + "");
//			node.setState("open");
//			node.setChecked(true);
//
//			List<Dictionary> children = mallService.list(node.getId());
//			if (children != null && children.size() > 0) {
//				for (Dictionary child : children) {
//					Dictionary childnode = this.getNode(child);
//					if (childnode != null) {
//						node.getChildren().add(childnode);// 递归
//					}
//				}
//			}
//			return node;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//	@RequestMapping(value = "/delete", method = RequestMethod.GET, produces = { "text/html;charset=UTF-8" })
//	@ResponseBody
//	public String deleteMenu(int id) {
//		try {
//			mallService.delete(id);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "1";
//		}
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("删除了dictionary表内容，id:" + id);
//		logExplainService.saveLogExplain(admin.getLogExplain());
//
//		sendHttpServer();
//		return "0";
//
//	}
//
//	@RequestMapping(value = "/toDictionary")
//	public String toDictionary(int id, int type, int parent_id, int toUrlType, HttpServletRequest request) {
//		if (id > 0) {
//			Dictionary result = mallService.getDictionaryById(id);
//			request.setAttribute("dictionary", result);
//		} else {
//			Dictionary result = new Dictionary();
//			result.setFid(parent_id);
//			request.setAttribute("dictionary", result);
//		}
//		request.setAttribute("type", type);
//		request.setAttribute("toUrlType", toUrlType);
//		// type==1编辑,type==2增加自节点
//		return "users/addDictionary";
//	}
//
//	@RequestMapping(value = "/insertMenu", method = RequestMethod.POST)
//	@ResponseBody
//	public String insertMenu(Dictionary menu, HttpServletRequest request, HttpServletResponse response) {
//		try {
//			mallService.insert(menu);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "1";
//		}
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("添加了dictionary表内容,:" + menu.getKindname());
//		logExplainService.saveLogExplain(admin.getLogExplain());
//
//		sendHttpServer();
//		return "0";
//
//	}
//
//	@RequestMapping(value = "/updateMenu", method = RequestMethod.POST)
//	@ResponseBody
//	public String updateMenu(Dictionary menu, HttpServletRequest request, HttpServletResponse response) {
//		try {
//			mallService.update(menu);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "1";
//		}
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("修改dictionary表内容,表id:" + menu.getId());
//		logExplainService.saveLogExplain(admin.getLogExplain());
//		sendHttpServer();
//		return "0";
//
//	}
//
//	/**
//	 * @Description: TODO jsjy_dictionary表子节点
//	 * @since 2015年11月24日 上午10:22:48
//	 */
//	@RequestMapping(value = "/getJsjyDict/{id}")
//	public @ResponseBody Json getJsjyDict(@PathVariable("id") int id) {
//		List<Dictionary> childList = mallService.list(id);
//		if (childList != null) {
//			return new Json(true, "success", childList);
//		} else {
//			return new Json(false, "fail", null);
//		}
//	}
//
//	/**
//	 * 商家列表跳转
//	 * 
//	 * @param modelMap
//	 * @return
//	 */
//	@RequestMapping(value = "/toCompanyList")
//	public String toCompanyList(ModelMap modelMap) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("查看了商家列表");
//		logExplainService.saveLogExplain(admin.getLogExplain());
//
//		List<Dictionary> childList = mallService.list(2);
//		modelMap.put("childList", childList);
//		return "mall/companyList";
//	}
//
//	/**
//	 * 商家列表
//	 * 
//	 * @param company
//	 * @return
//	 */
//	@RequestMapping(value = "/listCompany")
//	public @ResponseBody ResultPage<Company> listCompany(@RequestBody Company company) {
//		return new ResultPage<Company>(mallService.listLimitCompay(company));
//	}
//
//	/**
//	 * 添加商户
//	 * 
//	 * @param modelMap
//	 * @return
//	 */
//	@RequestMapping(value = "/toAddCompany")
//	public String toAddCompany(ModelMap modelMap) {
//		List<Dictionary> childList = mallService.list(2);
//		modelMap.put("childList", childList);
//		return "mall/addCompany";
//	}
//
//	/**
//	 * 修改商户跳转
//	 * 
//	 * @param modelMap
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping(value = "/toUpdateCompany/{id}")
//	public String toUpdateCompany(ModelMap modelMap, @PathVariable("id") int id) {
//		Company company = mallService.getCompanyById(id);
//		modelMap.put("company", company);
//		List<Dictionary> childList = mallService.list(2);
//		modelMap.put("childList", childList);
//		return "mall/addCompany";
//	}
//
//	/**
//	 * 添加，修改商户
//	 * 
//	 * @param file1
//	 * @param request
//	 * @param response
//	 * @param company
//	 * @return
//	 */
//	@RequestMapping(value = "/saveCompanyInfo", method = RequestMethod.POST)
//	@ResponseBody
//	public String saveCompanyInfo(@RequestParam("file1") MultipartFile file1, HttpServletRequest request,
//			HttpServletResponse response, Company company) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		if (file1.getOriginalFilename().length() > 0) {
//			try {
//				company.setCompanyImg(getImgPath(file1.getInputStream(), request));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		if (company.getId() == null) {
//			company.setChannel(0);
//			company.setCreateTime(new Date());
//			company.setState(0);
//			mallService.saveCompany(company);
//			admin.getLogExplain().setExplainContent("添加了新的商户，商户名称：" + company.getCompanyName());
//			return "success";
//		}
//		admin.getLogExplain().setExplainContent("修改了商户，商户名称：" + company.getCompanyName());
//		mallService.updateCompany(company);
//		return "success";
//
//	}
//
//	/**
//	 * 删除商户
//	 * 
//	 * @param request
//	 * @param id
//	 * @param value
//	 * @return
//	 */
//	@RequestMapping(value = "/delCompany")
//	@ResponseBody
//	public String delCompany(HttpServletRequest request, int id) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("删除了商户，商户ID：" + id);
//		mallService.delCompanyById(id);
//		return "success";
//	}
//
//	/**
//	 * 添加商品跳转
//	 * 
//	 * @param modelMap
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping(value = "/toAddMall/{id}")
//	public String toAddMall(ModelMap modelMap, @PathVariable("id") int id) {
//		Mall mall = new Mall();
//		mall.setCompanyId(id);
//		modelMap.put("mall", mall);
//		return "mall/addMall";
//	}
//
//	/**
//	 * 添加，修改商品
//	 * 
//	 * @param file1
//	 * @param request
//	 * @param response
//	 * @param mall
//	 * @return
//	 */
//	@RequestMapping(value = "/saveMallInfo", method = RequestMethod.POST)
//	@ResponseBody
//	public String saveMallInfo(@RequestParam("file1") MultipartFile file1, HttpServletRequest request,
//			HttpServletResponse response, Mall mall) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		if (file1.getOriginalFilename().length() > 0) {
//			try {
//				mall.setMallImg(getImgPath(file1.getInputStream(), request));
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
//		if (mall.getId() == null) {
//			Company company = mallService.getCompanyById(mall.getCompanyId());
//			mall.setCompanyName(company.getCompanyName());
//			mall.setState(0);
//			mallService.saveMall(mall);
//			admin.getLogExplain().setExplainContent("给商户：" + company.getCompanyName() + "添加了新的商品");
//			return "success";
//		}
//		admin.getLogExplain().setExplainContent("修改了商户：" + mall.getCompanyName() + "的商品");
//		mallService.updateMall(mall);
//		return "success";
//
//	}
//
//	/**
//	 * 跳转商品列表
//	 * 
//	 * @param modelMap
//	 * @return
//	 */
//	@RequestMapping(value = "/toMallList")
//	public String toMallList(ModelMap modelMap) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("查看了商品列表");
//		logExplainService.saveLogExplain(admin.getLogExplain());
//		return "mall/mallList";
//	}
//
//	/**
//	 * 商品列表
//	 * 
//	 * @param mall
//	 * @return
//	 */
//	@RequestMapping(value = "/listMall")
//	public @ResponseBody ResultPage<Mall> listMall(@RequestBody Mall mall) {
//		return new ResultPage<Mall>(mallService.listLimitMall(mall));
//	}
//
//	/**
//	 * 删除商品
//	 * 
//	 * @param request
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping(value = "/delMall")
//	@ResponseBody
//	public String delMall(HttpServletRequest request, int id) {
//		Admin admin = WebUtil.getSessionAdmin();
//		if (admin == null) {
//			return null;
//		}
//		admin.getLogExplain().setExplainContent("删除了商品，商品ID：" + id);
//		mallService.delMallById(id);
//		return "success";
//	}
//
//	/**
//	 * 修改商品跳转
//	 * 
//	 * @param modelMap
//	 * @param id
//	 * @return
//	 */
//	@RequestMapping(value = "/toUpdateMall/{id}")
//	public String toUpdateMall(ModelMap modelMap, @PathVariable("id") int id) {
//		Mall mall = mallService.getMallById(id);
//		modelMap.put("mall", mall);
//		return "mall/addMall";
//	}
//
////	public String getImgPath(InputStream is, HttpServletRequest request) {
////		UUID uuid = UUID.randomUUID();
////		String randomUrl = uuid + ".jpg";
////		try {
////			String path = request.getServletContext().getRealPath("/img_data") + "/" + randomUrl;
////			System.out.println(path);
////			FileOutputStream fos = new FileOutputStream(path);
////			byte[] b = new byte[1024];
////			while ((is.read(b)) != -1) {
////				fos.write(b);
////			}
////			is.close();
////			fos.close();
////		} catch (Exception e) {
////			e.printStackTrace();
////			return "-1";
////		}
////		return ConfigUtil.getValue("img_url") + randomUrl;
////	}
//	
//	
//	public void sendHttpServer(){
////		new Thread(new Runnable() {
////			public void run() {
////				// 通知APP服务器，更新地址
////				Map<String, Object> map = new HashMap<>();
////				map.put("cmd", "5004");
////				try {
////					 QHttpClient.submitPost(map, ConfigUtil.getValue("httpServer"));
////				} catch (ClientProtocolException e) {
////					e.printStackTrace();
////				} catch (IOException e) {
////					e.printStackTrace();
////				}
////				
////			}
////		}).start();
//	}
//}
