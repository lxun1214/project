package cn.springmvc.model.sys;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Privilege {

	private Integer id;
	private String name; // 权限名称
	private String url;
	private Privilege parent; // 上级权限
	private List<Privilege> children = new ArrayList<Privilege>(); // 下级权限
	private Integer order_da;
	
	
	public Integer getOrder_da() {
		return order_da;
	}
	public void setOrder_da(Integer order_da) {
		this.order_da = order_da;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public String getUrl() {
		return url;
	}
	
	public void setUrl(String url) {
		this.url = url;
	}
	public Privilege getParent() {
		return parent;
	}
	public void setParent(Privilege parent) {
		this.parent = parent;
	}
	public List<Privilege> getChildren() {
		Collections.sort(children,new Comparator<Privilege>(){
			@Override
			public int compare(Privilege o1, Privilege o2) {
				return o1.getOrder_da().compareTo(o2.getOrder_da());
			}
		});
		return children;
	}
	public void setChildren(List<Privilege> children) {
		this.children = children;
	}
}
