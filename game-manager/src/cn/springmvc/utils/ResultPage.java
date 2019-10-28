package cn.springmvc.utils;

import java.util.List;

import com.github.pagehelper.PageInfo;


/**
 * ResultPage
 * @author MaHaiDong
 * @param <E>
 */
public class ResultPage<E> extends PageInfo<E> {

	/** *@Fields serialVersionUID : TODO（用一句话描述这个变量表示什么） */
	private static final long serialVersionUID = 1L;

	private String pageInfo;
	
	public ResultPage(List<E> list) {
		super(list);
		setPageInfo();
	}

	public String getPageInfo() {
		return pageInfo;
	}

	public void setPageInfo() {
		int pagesBefore = 0;
		int pagesAfter = 0;
		StringBuilder sb = new StringBuilder();
		sb.append("<ul>");
		if (this.isIsFirstPage()) {
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"return false;\"><i class=\"icon-fast-backward\"></i></a></li>");
			sb.append("<li class=\"disabled\"><a href=\"javascript:void(0);\" onclick=\"return false;\">上页</a></li>");
		} else {
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"page(1," + this.getPageSize() + ");\"><i class=\"icon-fast-backward\"></i></a></li>");
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"page(" + (this.getPageNum() - 1) + "," + this.getPageSize() + ");\">上页</a></li>");
		}
		// 计算当前页前后的页码
		if (this.getPageNum() <= 3) {
			pagesBefore = 1;
		} else {
			pagesBefore = this.getPageNum() - 3;
		}
		if (this.getPages() - this.getPageNum() <= 3) {
			pagesAfter = this.getPages();
		} else {
			pagesAfter = this.getPageNum() + 3;
		}
		for (; pagesBefore <= pagesAfter; pagesBefore++) {
			if (pagesBefore <= this.getPages()) {
				if (this.getPageNum() == pagesBefore) {
					sb.append("<li><a href=\"javascript:void(0);\" onclick=\"return false;\" style=\"background-color: #428bca;color: #ffffff;border-color: #428bca;\">" 
				    + pagesBefore + "</a></li>");
				} else {
					sb.append("<li><a href=\"javascript:void(0);\" onclick=\"page(" + pagesBefore + "," + this.getPageSize() + ");\" >" + pagesBefore + "</a></li>");
				}
			}
		}
		if (this.isIsLastPage()) {
			sb.append("<li class=\"disabled\"><a href=\"javascript:void(0);\" onclick=\"return false;\">下页</a></li>");
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"return false;\"><i class=\"icon-fast-forward\"></i></a></li>");
		} else {
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"page(" + (this.getPageNum() + 1) + "," + this.getPageSize() + ");\">下页</a></li>");
			sb.append("<li><a href=\"javascript:void(0);\" onclick=\"page(" + this.getPages() + "," + this.getPageSize() 
					+ ");\"><i class=\"icon-fast-forward\"></i></a></li>");
		}
		sb.append("<li><input type=\"text\" class=\"input\" id=\"inputPage\"></li>");
		sb.append("<li><a href=\"javascript:void();\" onclick=\"page($('#inputPage').val()=='' ? " + this.getPageNum() + " : $('#inputPage').val(), "
				+ this.getPageSize() + ");\">Go</a></li>");
		sb.append("</ul>");
		this.pageInfo = sb.toString();
	}

}
