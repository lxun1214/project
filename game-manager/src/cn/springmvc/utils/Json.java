package cn.springmvc.utils;

import java.io.Serializable;

@SuppressWarnings("serial")
public class Json implements Serializable {

    private boolean status;
    private String msg;
    private Object obj;

    public Json() {
        super();
    }

    public Json(boolean status, String msg, Object obj) {
        super();
        this.status = status;
        this.msg = msg;
        this.obj = obj;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }
}