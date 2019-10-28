package com.rt.code;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;

/**
 * @author xin.fengtao
 *
 */
public class ByteOutputStream {
	ByteArrayOutputStream bout = new ByteArrayOutputStream();
	DataOutputStream dos = new DataOutputStream(bout);
	
	public byte[] toByteArray(){
		return bout.toByteArray();
	}


	public void writeInt(int i) throws IOException {
		dos.writeInt(i);
	}

	public void writeString(String str) throws IOException {
		dos.writeUTF(str);
	}

	public void writeShort(short s) throws IOException {
		dos.writeShort(s);
	}
	public void writeLong(Long l)throws IOException{
		dos.writeLong(l);
	}
	public void writeByte(byte b)throws IOException{
		dos.writeByte(b);
	}
	public void writeDouble(double d)throws IOException{
		dos.writeDouble(d);
	}
	public void writeBytes(byte[] b)throws IOException{
		dos.write(b);
	}

	public byte[] getbody() throws IOException {
		byte[] b = bout.toByteArray();
		dos.flush();
		dos.close();
		bout.flush();
		bout.close();
		return b;
	}

}
