package com.rt.utils;

public class KV<K, V> {
	private K k;

	private V v;

	public static <K, V> KV<K, V> create() {
		return new KV<K, V>();
	}

	public void setKV(K k, V v) {
		this.k = k;
		this.v = v;
	}

	public KV() {

	}

	public KV(K k, V v) {
		this.k = k;
		this.v = v;
	}

	public K getK() {
		return k;
	}

	public void setK(K k) {
		this.k = k;
	}

	public V getV() {
		return v;
	}

	public void setV(V v) {
		this.v = v;
	}

}
