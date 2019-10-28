var BOSH_SERVICE = 'http://192.168.11.110:8009/http-bind/';
var host_name = '@60.216.3.178/AndroidChatClient';
var connection = null;
var toId=null;
var fromId=null;

function rawInput(data)
{
    log('RECV: ' + data);
}

function rawOutput(data)
{
    log('SENT: ' + data);
}


function log(msg)
{
    $('#log').append('<div></div>').append(document.createTextNode(msg));
}

function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
		log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
		log('Strophe failed to connect.');
		$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
		log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
		log('Strophe is disconnected.');
		$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
		log('Strophe is connected.');
		connection.addHandler(onMessage, null, 'message', null, null,  null);
		connection.send($pres().tree());
    }
}

function onMessage(msg) {
    to = msg.getAttribute('from');
    var from = msg.getAttribute('from');
    var type = msg.getAttribute('type');
	var name = msg.getAttribute('name');
    var elems = msg.getElementsByTagName('body');

    if (type == "chat" && elems.length > 0) {
	    var body = elems[0];
    	appendToHis("<div class='ymsg'>"+new Date().toLocaleTimeString() + "  " + name + " : </div><div class='ycontent content'><span class='triangle right'></span><div class='article'>" + Strophe.getText(body)+"</div></div>");
    }

    // we must return true to keep the handler alive.
    // returning false would remove it after it finishes.
    return true;
}

function appendToHis(msg){
    $('#his').append('<div class="msgStyle">' + msg + '</div>');
    $('#his').attr("scrollTop", $('#his').attr("scrollHeight"));
}

$(document).ready(function () {
    connection = new Strophe.Connection(BOSH_SERVICE);

    connection.rawInput = rawInput;
    connection.rawOutput = rawOutput;

    Strophe.log = function (level, msg) { log('LOG: ' + msg); };
    var fid = $('#jid').val()+host_name;
    var tid = $('#tojid').val()+host_name;
    
//    $('#connect').bind('click', function () {
//		var button = $('#connect').get(0);
//		if (button.value == 'connect') {
//		    button.value = 'disconnect';
	
	        fromId = $('#jid').val()+host_name;
	        toId = $('#tojid').val()+host_name;
	        log(fromId);
	        log(toId);
		    connection.connect(fid,
				       $('#pass').get(0).value,
				       onConnect);
//		} else {
//		    button.value = 'connect';
//		    connection.disconnect();
//		}
//    }).click();

    $('#send').bind('click', function () {
        msg=$('#msg').val();
        if(msg!=''){
        	toId = tid;
    	    var reply = $msg({to: toId, from: fromId ,name:$("#fname").val(), type: 'chat'}).cnode(Strophe.xmlElement('body', '' ,msg));
    	    connection.send(reply.tree());

    	    appendToHis("<div class='imsg'>"+new Date().toLocaleTimeString() + "  我: </div><div class='icontent content'><span class='triangle'></span><div class='article'>"  + msg+"</div></div>");
    	    $('#msg').val('');
        }
        
    });


    $('#msg').keypress(function(e){
        if(e.which==13){
            $('#send').click();
        }
    });
    
    $("#his").height($("#home").height()-117);
    
});
