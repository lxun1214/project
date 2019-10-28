package cn.springmvc.utils;

import java.awt.Color;
import java.awt.Component;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.MediaTracker;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.ConvolveOp;
import java.awt.image.Kernel;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;


/**
 * @ClassName: ImageSizer
 * @Description: TODO(图片压缩工具)
 * @author JWong
 * @since 2015年8月29日 下午1:18:56
 * 
 */
    
public class ImageSizer {
	
    public static final MediaTracker tracker = new MediaTracker(new Component() {
        private static final long serialVersionUID = 1234162663955668507L;} 
    );
    
    /**
     * @param originalByte 原图像byte[]
     * @param width 图像宽
     * @param format 图片格式 jpg, png, gif(非动画)
     * @throws IOException
     */
    public static byte[] resize(byte[] originalByte, int width, String format) throws IOException {
       
		if (format != null) {
			if ("gif".equals(format.toLowerCase()) || "png".equals(format.toLowerCase())) {
				return resize(originalByte, width, 1,format);
			}
		}
    	Image inputImage = Toolkit.getDefaultToolkit().createImage( originalByte );
        waitForImage( inputImage );
        int imageWidth = inputImage.getWidth( null );
        if ( imageWidth < 1 ) 
           throw new IllegalArgumentException( "image width " + imageWidth + " is out of range" );
        int imageHeight = inputImage.getHeight( null );
        if ( imageHeight < 1 ) 
           throw new IllegalArgumentException( "image height " + imageHeight + " is out of range" );
        
        // Create output image.
        int height = -1;
        double scaleW = (double) imageWidth / (double) width;
        double scaleY = (double) imageHeight / (double) height;
        if (scaleW >= 0 && scaleY >=0) {
            if (scaleW > scaleY) {
                height = -1;
            } else {
                width = -1;
            }
        }
        Image outputImage = inputImage.getScaledInstance( width, height, java.awt.Image.SCALE_DEFAULT);
        checkImage( outputImage );        
        return encode(outputImage, format);        
    }    

    private static void checkImage( Image image ) {
       waitForImage( image );
       int imageWidth = image.getWidth( null );
       if ( imageWidth < 1 ) 
          throw new IllegalArgumentException( "image width " + imageWidth + " is out of range" );
       int imageHeight = image.getHeight( null );
       if ( imageHeight < 1 ) 
          throw new IllegalArgumentException( "image height " + imageHeight + " is out of range" );
    }

    private static void waitForImage( Image image ) {
       try {
          tracker.addImage( image, 0 );
          tracker.waitForID( 0 );
          tracker.removeImage(image, 0);
       } catch( InterruptedException e ) { e.printStackTrace(); }
    } 

    private static byte[] encode(Image outputImage, String format ) 
       throws java.io.IOException {
       int outputWidth  = outputImage.getWidth( null );
       if ( outputWidth < 1 ) 
          throw new IllegalArgumentException( "output image width " + outputWidth + " is out of range" );
       int outputHeight = outputImage.getHeight( null );
       if ( outputHeight < 1 ) 
          throw new IllegalArgumentException( "output image height " + outputHeight + " is out of range" );

       // 获取image缓冲.
       BufferedImage bi = new BufferedImage( outputWidth, outputHeight, BufferedImage.TYPE_INT_RGB );                                                   
       Graphics2D biContext = bi.createGraphics();
       biContext.drawImage( outputImage, 0, 0, null );
       ByteArrayOutputStream baos = new ByteArrayOutputStream();
       ImageIO.write(bi, format, baos);
       return baos.toByteArray(); 
    } 
    
    
	/**
	 * 缩放gif图片
	 * @param originalByte 原图片
	 * @param newWidth 宽度
	 * @param quality 缩放比例 (等比例)
	 * @param format 
	 * @throws IOException
	 */
    private static byte[] resize(byte[] originalByte, int newWidth, float quality, String format) throws IOException {
    	if (quality < 0 || quality > 1) {
    		throw new IllegalArgumentException("Quality has to be between 0 and 1");
    	} 
    	ImageIcon ii = new ImageIcon(originalByte);
    	Image i = ii.getImage();
    	Image resizedImage = null; 
    	int iWidth = i.getWidth(null);
    	int iHeight = i.getHeight(null); 
    	if (iWidth > iHeight) {
    		resizedImage = i.getScaledInstance(newWidth, (newWidth * iHeight) / iWidth, Image.SCALE_SMOOTH);
    	} else {
    		resizedImage = i.getScaledInstance((newWidth * iWidth) / iHeight, newWidth, Image.SCALE_SMOOTH);
    	} 
    	// This code ensures that all the pixels in the image are loaded.
    	Image temp = new ImageIcon(resizedImage).getImage(); 
    	// Create the buffered image.
    	BufferedImage bufferedImage = new BufferedImage(temp.getWidth(null), temp.getHeight(null), BufferedImage.TYPE_INT_RGB); 
    	// Copy image to buffered image.
    	Graphics g = bufferedImage.createGraphics(); 
    	// Clear background and paint the image.
    	g.setColor(Color.white);
    	g.fillRect(0, 0, temp.getWidth(null), temp.getHeight(null));
    	g.drawImage(temp, 0, 0, null);
    	g.dispose(); 
    	// Soften.
    	float softenFactor = 0.05f;
    	float[] softenArray = {0, softenFactor, 0, softenFactor, 1-(softenFactor*4), softenFactor, 0, softenFactor, 0};
    	Kernel kernel = new Kernel(3, 3, softenArray);
    	ConvolveOp cOp = new ConvolveOp(kernel, ConvolveOp.EDGE_NO_OP, null);
    	bufferedImage = cOp.filter(bufferedImage, null); 
    	// Write the jpeg to a file.
    	ByteArrayOutputStream baos = new ByteArrayOutputStream();
    	ImageIO.write(bufferedImage, format, baos);
    	return baos.toByteArray();
    }
    
    
    
    
    /**
     * fileUpload
     * @param fileUpload
     * @param realPath
     * @param format
     * @param size
     * @param name
     * @return
     */
    public static String upData(MultipartFile fileUpload,String realPath,String format,int size,String name) {		
		String data="";		
		if (!fileUpload.isEmpty()) {
	        try {			
					String fileName = fileUpload.getOriginalFilename();					
					/**
					 * 获取文件后缀
					 */
					String[] suffixs=fileName.split("\\.");
					String suffix = "."+suffixs[suffixs.length-1];					
					/**
					 * 判断上传的文件格式是否正确
					 */
					if((format.indexOf(suffix.toLowerCase())!=-1)){
						byte[] bytes = fileUpload.getBytes();
						Integer fileSize = (int)fileUpload.getSize()/1024;						
						/**
						 * 如果文件小于10M，则上传文件，否则提示用户不能超过10M
						 */
						if(fileSize<=size){										                
			                File savedir=new File(realPath);			                
			                if(!savedir.exists()) savedir.mkdirs();										               
			                data=UUID.randomUUID().toString()+suffix;
			                if(name!=null){
			                	data=name.toString()+suffix;
			                }
			                File savefile=new File(savedir, data);							
							/**
							 * 文件开始上传到服务器上
							 */	
							FileCopyUtils.copy(bytes,savefile );
							return data;
						}else{
							data= "上传的文件太大";//资源过大
							 
						}
					}else{
						data="上传的文件格式不支持";//格式问题
					}
				} catch (IOException e) {
					data="出现异常";//出现异常
				}
	       }
		return data;
	}

    
    
    
    
}

