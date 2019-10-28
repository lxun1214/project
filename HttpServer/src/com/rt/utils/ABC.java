package com.rt.utils;

public class ABC<A, B,C> {
	private A a;

	private B b;
	
	private C c;

	public static <A, B,C> ABC<A, B,C> create() {
		return new ABC<A, B,C>();
	}

	public void setKV(A a, B b,C c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	public ABC() {

	}

	public ABC(A a, B b,C c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	public A getA() {
		return a;
	}

	public void setA(A a) {
		this.a = a;
	}

	public B getB() {
		return b;
	}

	public void setB(B b) {
		this.b = b;
	}

	public C getC() {
		return c;
	}

	public void setC(C c) {
		this.c = c;
	}

}
