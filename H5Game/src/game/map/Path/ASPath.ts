/**
 *
 * @author 
 *
 */
class ASPath {
     	private static  RMOVECOST: number =	14;//倾斜方向的移动耗费
        private static DMOVECOST: number =	10;//直线方向的移动耗费
        private static AS_MOVECOST: Array<any> = [ASPath.DMOVECOST, ASPath.RMOVECOST ];
 		private static NEIGHBORPOS_X_VALUES: Array<any> = [0, 1, 1, 1, 0, -1, -1, -1];//用于快速计算临近坐标值的优化数据
 		private static NEIGHBORPOS_Y_VALUES: Array<any> = [-1, -1, 0, 1, 1, 1, 0, -1];//用于快速计算临近坐标值的优化数据
 		 		/**
 		 * 类成员定义
 		 * 
 		 */
 		private m_LastOpenCell: ASMapCell;//最后一个开启的格子
 		private m_ASMapCells:Array<ASMapCell>;//网格地图格子列表，格子的访问索引为：y * Width + x
 		private m_nMarkTag: number = 0;//寻路优化成员，免去循环初始化所有节点的开销
 		private m_nWidth: number;//地图宽度
 		private m_nHeight: number;//地图高度
	public constructor() {
	}
	/**
		 * 从地图中初始化 
		 * @param map
		 * 
		 */
		public initFromMap(): void
		{
			var vo:MapVo = MapVo.ins;
			this.m_nWidth = vo.gridCols;
            this.m_nHeight = vo.gridRows;
			
// 			//如果现有数组的格子数量少于新数量则扩展数组
			var nNewCount: number = this.m_nWidth * this.m_nHeight;
			this.m_ASMapCells = [];
//			if (nNewCount > m_ASMapCells.length)
//				m_ASMapCells.length = nNewCount;
			for (var i: number = 0; i<nNewCount; i++)
			{
				this.m_ASMapCells[i] = new ASMapCell();
			}

			
			//初始化每个坐标格子
			var x: number, y: number, idx: number;
			var cell: ASMapCell;
			idx = 0;
			for (y = 0; y<this.m_nHeight; y++)
			{
				for (x = 0; x<this.m_nWidth; x++)
				{
					cell = this.m_ASMapCells[idx];
					cell.X = x;
					cell.Y = y;
					cell.CanNotMove = !vo.moveable(x, y);
					idx++;
				}
			}
		}
		
		/**
		 * 寻路 
		 * @param fromX 起始坐标X
		 * @param fromY 起始坐标Y
		 * @param targetX 目的地坐标X
		 * @param targetY 目的地坐标Y
		 * @return 路径点数组
		 * 
		 */
		public getPatch(fromX: number, fromY: number, targetX: number, targetY: number): Array<any>
		{
			if (fromX == targetX && fromY == targetY)
				return null;
			if ( fromX < 0 || fromX >= this.m_nWidth || fromY < 0 || fromY >= this.m_nHeight)
				return null;
            if(targetX < 0 || targetX >= this.m_nWidth || targetY < 0 || targetY >= this.m_nHeight)
				return null;
            if(this.m_ASMapCells[targetY * this.m_nWidth + targetX].CanNotMove)
				return null;
				
            this.reset(fromX, fromY);
			
			var boPathFound:Boolean = false;
			var nCurX: number = fromX;
			var nCurY: number = fromY;
            var curCell: ASMapCell = this.m_ASMapCells[nCurY * this.m_nWidth + nCurX];
			
			curCell.GCost = 0;
			curCell.LastX = -1;
			curCell.LastY = -1;
			curCell.X = nCurX;
			curCell.Y = nCurY;
            curCell.MarkTag = this.m_nMarkTag;
			curCell.HCost = Math.abs(targetX - fromX) + Math.abs(targetY - fromY) * 10;
			
			var i: number;
			var nX: number, nY: number;
			var cell: ASMapCell;
			
			while ( true )
			{
				if ( nCurX == targetX && nCurY == targetY )
				{
					boPathFound = true;
					break;
				}
				
				if ( curCell.State != ASMapCell.CSCLOSE )
				{
					this.closeCell( curCell );
				}
				
				//遍历当前位置周围的8个格子
				for (i=0; i<8; ++i)
				{
					nX = nCurX + ASPath.NEIGHBORPOS_X_VALUES[i];
                    nY = nCurY + ASPath.NEIGHBORPOS_Y_VALUES[i];
                    if(nX < 0 || nX >= this.m_nWidth  || nY < 0|| nY >= this.m_nHeight )
						continue;
                    cell = this.m_ASMapCells[nY * this.m_nWidth + nX];
					if (cell.CanNotMove)
						continue;
					//cell.MarkTag与当前的m_nMarkTag不同，也视为是未开启状态
					if ( cell.MarkTag != this.m_nMarkTag || cell.State == ASMapCell.CSNONE )
					{
//						with (cell)
//						{
							cell.MarkTag = this.m_nMarkTag;
							cell.LastX = nCurX;
                            cell.LastY = nCurY;
                            cell.btDir = i;
                            cell.GCost = curCell.GCost + ASPath.AS_MOVECOST[i & 1];
                            cell.HCost = Math.abs(targetX - nX) + Math.abs(targetY - nY) * 10;
//						}
						this.openCell(cell);
					}
					else if ( cell.State == ASMapCell.CSOPEN )
					{
                        if(cell.GCost > curCell.GCost + ASPath.AS_MOVECOST[i & 1] )
						{
//							with (cell)
//							{
								cell.LastX = nCurX;
								cell.LastY = nCurY;
								cell.btDir = i;
                                cell.GCost = curCell.GCost + ASPath.AS_MOVECOST[i & 1];
//							}
                            this.reopenCell(cell);
						}
					}
				}
				curCell = this.m_LastOpenCell;
				if ( curCell == null )
					break;

				nCurX = curCell.X;
				nCurY = curCell.Y;
			}
			if ( boPathFound )//12 4   10 3  9  2
			{
				var Result: Array<any> = []
				while (true)
				{
					Result.push(new ASPathNode(curCell.X, curCell.Y, curCell.btDir));
					curCell = this.m_ASMapCells[curCell.LastY * this.m_nWidth + curCell.LastX];
					if (curCell.LastX < 0 || curCell.MarkTag != this.m_nMarkTag)
						break;
				}
				return Result;
			}
			return null;
		}
		
	    private reset(cX: number, cY: number):void
	    {
	    	var cell:ASMapCell = this.m_ASMapCells[cY * this.m_nWidth + cX];
	    	cell.LastX = -1;
	    	cell.LastY = -1;
	    	cell.HCost = 0;
	    	cell.GCost = 0;
	    	cell.FValue = 0;
	    	cell.State = 0;
	    	cell.Prev = null;
	    	cell.Next = null;
	    	cell.btDir = 0;
	    	
	    	this.m_LastOpenCell = null;
			this.m_nMarkTag = this.m_nMarkTag + 1;
	    	/**
	    	 * 如果地图尺寸较大，会在此产生过多的时间开销，造成卡的显现。
	    	 * 已经使用MarkTag优化，在寻路的期间进行检测和重新初始化。
	    	 * 
	    	//将每个格子的状态设为空闲
	    	for (var i: number = m_nWidth * m_nHeight - 1; i>-1; --i)
	    	{
	    		cell = m_ASMapCells[i];
	    		cell.LastX = -1;
	    		cell.State = ASMapCell.CSNONE;
	    	}**/
	    }
	    /**
	     * 关闭指定的格子
	     * @param cell
	     * 
	     */
	    private closeCell(cell: ASMapCell): void
	    {
	    	//如果格子已经开启则进行路径链表的移除操作
	    	if (cell.State == ASMapCell.CSOPEN)
	    	{
	    		if (cell.Prev)
	    			cell.Prev.Next = cell.Next;
	    		if (cell.Next)
	    			cell.Next.Prev = cell.Prev;
	    		if (cell == this.m_LastOpenCell)
	    			this.m_LastOpenCell = cell.Prev;
	    	}
	    	cell.State = ASMapCell.CSCLOSE;
	    }
	    /**
	     * 开启指定的格子 
	     * @param cell
	     * 
	     */
	    private openCell(cell: ASMapCell): void
	    {
	    	cell.State = ASMapCell.CSOPEN;
	    	var nFValue: number = cell.HCost + cell.GCost;
	    	cell.FValue = nFValue;
	    	
	    	var lastCell: ASMapCell = this.m_LastOpenCell;
			if ( !lastCell )
			{
				this.m_LastOpenCell = cell;
				cell.Prev = null;
				cell.Next = null;
			}
		  	else
		  	{
		  		//开启格子的时候在已开启的格子链表中按移动估价值进行排序
		  		while (lastCell.FValue < nFValue)
		  		{
		  			if (lastCell.Prev == null)
		  			{
		  				lastCell.Prev = cell;
		  				cell.Prev = null;
		  				cell.Next = lastCell;
		  				return;
		  			}
		  			lastCell = lastCell.Prev;
		  		}
				
				//添加到当前开启格子链表的末尾
				cell.Prev = lastCell;
				if (lastCell.Next)
				{
					cell.Next = lastCell.Next;
					lastCell.Next.Prev = cell;
					lastCell.Next = cell;
				}
			    else
			    {
			    	cell.Next = null;
			    	lastCell.Next = cell;
			    	this.m_LastOpenCell = cell;
			    }
		  	}
	    }
	    /**
	     * 重新开启指定的格子更新移动估价值并重新再已开启格子链表中排序
	     * @param cell
	     * 
	     */
	    private reopenCell(cell: ASMapCell): void
	    {
			var nFValue: number = cell.HCost + cell.GCost;
			cell.FValue = nFValue;
			
			var nextCell: ASMapCell = cell.Next;
			if (nextCell && nextCell.FValue > nFValue)
			{
				do
				{
					nextCell = nextCell.Next;
				}
				while (nextCell && nextCell.FValue > nFValue);
			
				if (cell.Prev)
					cell.Prev.Next = cell.Next;
				if (cell.Next)
					cell.Next.Prev = cell.Prev;
			
				if (nextCell)
				{
					cell.Next = nextCell;
					if (nextCell.Prev)
					{
						cell.Prev = nextCell.Prev;
						nextCell.Prev.Next = cell;
					}
					else cell.Prev = null;
					nextCell.Prev = cell;
				}
				else
				{
					cell.Prev = this.m_LastOpenCell;
					cell.Next = null;
					this.m_LastOpenCell.Next = cell;
					this.m_LastOpenCell = cell;
				}
			}
	    }
}
