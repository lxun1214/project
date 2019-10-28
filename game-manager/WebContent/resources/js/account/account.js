$(function(){
	//$("#tradeTimeBegin").datepicker(); 
	//$("#tradeTimeEnd").datepicker(); 
	
	$("#_addBankCardBtn").click(function(){

	
	});
	

	
	

	
	//$("#txBtn").click(function(){

	//});
	

	
});


function showDialog(establishBankName,accountName,bankCard,id){
	$("#establishBankName_0").val(establishBankName);
	$("#establishBankName").val(establishBankName);
	$("#id").val(id);
	$("#accountName").val(accountName);
	$("#accountName_0").val(accountName);
	$("#bankCard").val(bankCard);
	$("#bankCard_0").val(bankCard);
	$('#release').dialog('open');
}

function changCheck(obj){
	$.ajax({
		type : "POST",
		url : "account/changCheck.do?id="+obj.value,
		datatype : "json",
		success : function(data) {
			var values = $("#cardValues_"+obj.value).val();
			var valarr = values.split("-");
			$("#acname").text(valarr[0]);
			$("#accard").text(valarr[1]);
			$("#acebname").text(valarr[2]);
			$("#userId").val(valarr[3]);
			$("#bankId").val(obj.value);
		},
		error : function() {
		}
	});
}




