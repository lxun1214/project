package cn.springmvc.entry;

public class Server {

	
	private String serverId;
	
	private String name;
	
	private String url;
	
	private String logJdbc;
	
	public Server() {
		// TODO Auto-generated constructor stub
	}
	
	
	

	public Server(String serverId, String name, String url,String logJdbc) {
		super();
		this.serverId = serverId;
		this.name = name;
		this.url = url;
		this.logJdbc = logJdbc;
	}


	

	public String getLogJdbc() {
		return logJdbc;
	}



	public void setLogJdbc(String logJdbc) {
		this.logJdbc = logJdbc;
	}




	public String getServerId() {
		return serverId;
	}

	public void setServerId(String serverId) {
		this.serverId = serverId;
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
	
	
	
}
