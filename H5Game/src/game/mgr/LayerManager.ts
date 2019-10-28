/**
 * 游戏层级类
 */
class LayerManager {
	public static mapLayer:eui.UILayer = new eui.UILayer();
	/**
	 * UI主界面
	 * @type{BaseEuiLayer}
	 */
	public static UI_Main:BaseEuiLayer = new BaseEuiLayer();
	/**
	 * UI界面
	 * @type{BaseEuiLayer}
	 */
	public static UI_MainUI:BaseEuiLayer = new BaseEuiLayer();
	/**
	 * UI弹出层
	 * @type{BaseEuiLayer}
	 */
	public static UI_Popup:BaseEuiLayer = new BaseEuiLayer();
	/**
	 * UI弹出框层
	 * @type{BaseEuiLayer}
	 */
	public static UI_Tips:BaseEuiLayer = new BaseEuiLayer();

	public static guideLayer:eui.UILayer = new eui.UILayer();
}