$(function(){
	 $("#alipaySubmit").submit(function(){
		 $(this).attr("action","alipay/gateWay.do");
	 });
})