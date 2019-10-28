/**
 * 
 */
package com.rt.code;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;

/**
 * @author xin.fengtao
 *
 */
public class ByteInputStream {
	ByteArrayInputStream bais;
	DataInputStream dis;
	public ByteInputStream(byte[] b){
		bais=new ByteArrayInputStream(b);
		dis=new DataInputStream(bais);
	}
	public int readInt() throws IOException{
		return dis.readInt();
	}
	public int readByte()throws IOException{
		return dis.readByte();
	}
	public String readString()throws IOException{
		return dis.readUTF();
	}
	

}
