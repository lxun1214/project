package com.rt.utils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.rt.common.ahocorasick.trie.Emit;
import com.rt.common.ahocorasick.trie.Trie;
import com.rt.logic.player.config.loader.WordshieldConfigLoadler;

/**
 * 屏蔽字库
 */
public class FilterUtil {

	public static Trie unicodeTrie = new Trie(false);

	public static Set<String> sets = new HashSet<>();

	public static boolean isFilter(String text) {
		if (unicodeTrie.parseText(text).size() > 0) {
			return true;
		}
		return false;
	}

	static String replace = "*";

	public static String contentReplace(String content) {
		List<Emit> list = (List<Emit>) unicodeTrie.parseText(content);
		if (list.size() > 0) {
			StringBuilder sb = new StringBuilder(content);
			for (int i = 0; i < list.size(); i++) {
				Emit e = list.get(i);
				int start = e.getStart();
				int end = e.getEnd();
				for (int j = start; j <= end; j++) {
					sb.replace(j, j + 1, replace);
				}
			}
			content = sb.toString();
		}
		return content;
	}

	public static void main(String[] args) {
		new WordshieldConfigLoadler().load();

		// 1
		String str = "傻逼傻逼傻逼傻逼傻逼草泥马逼撒的卡拉法基看klasjfkldasjfkjsdaklsdkl阿萨德了开房间啊是懒得看降幅多少啦";
		
		long start = System.currentTimeMillis();
		for(int i = 0;i < 100000;i++){
			System.out.println(contentReplace(str));
		}
		System.out.println(System.currentTimeMillis() - start);
	}
}
