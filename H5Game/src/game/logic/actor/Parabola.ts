/**
 *
 * @author 
 *
 */
class Parabola {
	public constructor() {
	}
	
	public static g: number = 9.8; //重力加速度
		
		/**
		 * 抛物线采样点计算函数
		 * 通过给出起点XY，落点XY，按一定时间周期进行采样，算出每个采样时间的XY 
		 * @param cX 起点X
		 * @param cY 起点Y
		 * @param dX 落点X
		 * @param dY 落点Y
		 * @param nTime 抛物线持续的时间
		 * @param accY  手动指定的重力加速度
		 * @param nSamplingCount 采样点数量
		 * @return 返回一个采样点XY坐标数组
		 * 
		 * ★★注意★★
		 * 本函数计算的坐标象限依据为：Y向6点方向递增，X向3点方向递增。这与几何学中的坐标方向中Y轴的方向相反！
		 */
    public static MakeParabolaPoints(cX: number,cY: number,dX: number,dY: number,nTime: number,nSamplingCount: number,accY: number = 0): Array<egret.Point>
		{
			//这里增加一个可控的Y轴加速度,如果设置为0,就用重力加速度
			if(accY == 0)
                accY = Parabola.g;
            var Result: Array<egret.Point> = new Array<egret.Point>(nSamplingCount);
            var sh: number = (dX - cX) / nTime;
            var sv: number = ((cY - dY) + accY * (nTime * nTime) / 2) / nTime;
			
            var t: number = 0;
            var sSampling: number = nTime/nSamplingCount;//采样速度
            for(var i: number = 0; i<nSamplingCount; ++i)
			{
				t += sSampling;
				Result[i] = new egret.Point(cX + sh * t, cY - ((sv * t) - (accY * (t * t) / 2)));
			}
			return Result;
		}
}
