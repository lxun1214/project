/**
 *
 * @author 
 *
 */
class ASMapCell {
    	/**
	 * 格子状态值定义
	 * 
	 */
	public static CSNONE: number = 0;//未处理的格子
    public static CSOPEN: number = 1;//格子已经开启
    public static CSCLOSE: number = 2;//格子已经关闭
	
    public X         : number = 0;//格子的X坐标
    public Y: number = 0;//格子的Y坐标
    public CanNotMove: boolean = false;//是否不可移动
    public MarkTag: number = 0;//用于优化寻路算法效率，免去循环初始化所有节点的开销
    /**
    * 寻路计算过程中的相关参数
    */
    public LastX: number = -1;//上一个格子的X坐标
    public LastY: number = -1;//下一个格子的Y坐标
    public HCost: number = 0;
    public GCost: number = 0;
    public FValue: number = 0;//距离目标格子的估价值
    public State: number = 0;//状态，表示空闲、开启或关闭
    public Prev      : ASMapCell; //上一个格子
    public Next      : ASMapCell; //下一个格子
    public btDir: number = 0;
	public constructor() {
	}
}
