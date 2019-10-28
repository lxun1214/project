package hjzl.init;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * mybatis
 * @author xin.fengtao
 *
 */
public class DbManager {
	
	private static SqlSessionFactory factory;
	
	public static void init() {
		//初始化mybatis factory
		String resource = "hjzl/db/config/DbConfig.xml";
        Reader reader = null;
        try {
			reader = Resources.getResourceAsReader(resource);
			factory = new SqlSessionFactoryBuilder().build(reader);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static SqlSession getSession(){
		return factory.openSession();
	}
	
}
