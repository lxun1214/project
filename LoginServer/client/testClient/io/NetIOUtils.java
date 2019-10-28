package testClient.io;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;


/**
 * 仅仅适用于 Java 与 C++ 通讯中，网络流解析与生成使用
 */
public abstract class NetIOUtils {
    public static final String CHARSET = "UTF-8";

    /**
     * 从流中读出一个定长度字节数组
     *
     * @param is
     * @param s
     * @return
     * @throws IOException
     */
    public static byte[] readBytes(DataInputStream is, int i)
        throws IOException {
        byte[] data = new byte[i];
        is.readFully(data);

        return data;
    }
    

    /**
     * 从流中读出一个长整型
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static long readLong(DataInputStream is) throws IOException {
        long l = is.readLong();

        return Long.reverseBytes(l);
    }
    
    /**
     * 从流中读出一个长整型
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static long readLong(InputStream is) throws IOException {
       return readLong(new DataInputStream(is));
    }

    /**
     * 从流中读出一个整型
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static int readInt(DataInputStream is) throws IOException {
        int i = is.readInt();
        return Integer.reverseBytes(i);
    }
    
    /**
     * 从流中读出一个整型
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static int readInt(InputStream is) throws IOException {
    	DataInputStream dis=new DataInputStream(is);
    	return readInt(dis);
    }



    /**
     * 从流中读出一个短整型
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static short readShort(DataInputStream is) throws IOException {
        short s = is.readShort();
        return s;
    }



    /**
     * 从流中读出一个指定长度的字符串 <br>
     * <em>字符串 结构 为 一个指定字符串字节长度的短整型+实际字符串</em>
     *
     * @param is
     * @param s
     * @return
     * @throws IOException
     */
    public static String readString(DataInputStream is, short s)
        throws IOException {
        byte[] str = new byte[s];

        is.readFully(str);

        return new String(str, CHARSET);
    }

    /**
     * 从输入流中读字符串 <br>
     * <em>字符串 结构 为 一个指定字符串字节长度的短整型+实际字符串</em>
     *
     * @param is
     * @return
     * @throws IOException
     */
    public static String readUTF(DataInputStream is) throws IOException {
        short s = readShort(is);

        return readString(is, s);
    }



    /**
     * 向输出流中写字节数组
     *
     * @param os
     * @param data
     * @throws IOException
     */
    public static void writeBytes(DataOutputStream os, byte[] data)
        throws IOException {
        os.write(data);
    }

    /**
     * 向输出流中 写长整型
     *
     * @param os
     * @param l
     * @throws IOException
     */
    public static void writeLong(DataOutputStream os, long l)
        throws IOException {
        os.writeLong(Long.reverseBytes(l));
    }

    /**
     * 向输出流中 写整型
     *
     * @param os
     * @param i
     * @throws IOException
     */
    public static void writeInt(DataOutputStream os, int i)
        throws IOException {
        os.writeInt(Integer.reverseBytes(i));
    }

    /**
     * 向输出流中 写短整型
     *
     * @param os
     * @param s
     * @throws IOException
     */
    public static void writeShort(DataOutputStream os, short s)
        throws IOException {
        os.writeShort(Short.reverseBytes(s));
    }

    /**
     * 向输出流中 写字符串 <br>
     * <em>字符串 结构 为 一个指定字符串字节长度的短整型+实际字符串</em>
     *
     * @param os
     * @param str
     * @throws IOException
     */
    public static void writeString(DataOutputStream os, String str)
        throws IOException {
        os.write(str.getBytes(CHARSET));
    }

    /**
     * 向输出流中 写字符串<br>
     * <em>字符串 结构 为 一个指定字符串字节长度的短整型+实际字符串</em>
     *
     * @param os
     * @param str
     * @throws IOException
     */
    public static void writeUTF(DataOutputStream os, String str)
        throws IOException {
        byte[] data = str.getBytes(CHARSET);
        short s = (short) data.length;
        writeShort(os, s);
        os.write(data);
    }

    /**
     * 读拷贝
     *
     * @param target
     * @param src
     * @param start
     * @param end
     * @throws IOException
     */
    public static void readCopyBytes(byte[] target, byte[] src, int start,
        int end) throws IOException {
        ByteArrayInputStream bais = new ByteArrayInputStream(src);
        bais.read(target, start, end - start + 1);
        bais.close();
    }

    /**
     * 写拷贝
     *
     * @param src
     * @param start
     * @param end
     * @return
     * @throws IOException
     */
    public static byte[] writeCopyBytes(byte[] src, int start, int end)
        throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        baos.write(src, start, end - start + 1);

        byte[] target = baos.toByteArray();
        baos.flush();
        baos.close();

        return target;
    }
    /**
     * Writes an <code>int</code> to the underlying output stream as four
     * bytes, high byte first. If no exception is thrown, the counter
     * <code>written</code> is incremented by <code>4</code>.
     *
     * @param      v   an <code>int</code> to be written.
     * @exception  IOException  if an I/O error occurs.
     * @see        java.io.FilterOutputStream#out
     */
    public final static void writeInt(OutputStream out,int v) throws IOException {
        out.write((v >>> 24) & 0xFF);
        out.write((v >>> 16) & 0xFF);
        out.write((v >>>  8) & 0xFF);
        out.write((v >>>  0) & 0xFF);
    }
}
