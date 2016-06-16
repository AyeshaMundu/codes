jQuery(function($){

	var socket=io.connect();
	var $messageform=$("#send-message");
	var $messagebox=$('#message');
	var $chat=$('#chat');
	

	$messageform.submit(function(e){
	e.preventDefault();
	socket.emit('send message',$messagebox.val());
	$messagebox.val('');
	});

	socket.on('new ,message',function(data){

	$chat.append(data +"<br/>" );

	});

});
