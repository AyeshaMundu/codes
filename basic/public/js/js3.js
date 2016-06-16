
jQuery(function($){
	var socket=io.connect();
	var $nickError=$('#nickError');
	var $nickForm=$('#setNick');
	var $users=$('#users');
	var $nickBox=$('#nickname');
	var $messageForm=$('#send-message');
	var $messageBox=$('#message');
	var $chat=$('#chat');

	$nickForm.submit(function(e){
		e.preventDefault();
		socket.emit('new user', $nickBox.val(),function(data){
			if(data){
				$('#nickWrap').hide();
				$('#contentWrap').show();
			}else{
				$nickError.html('User name already exists!!');
			}
		});
		$nickBox.val('');
	});

	socket.on('usernames',function(data){
		var html='';
		for(i=0;i<data.length;i++){
			html+=data[i]+'<br/>'
		}
		$users.html(html);
	})

	$messageForm.submit(function(e){
		e.preventDefault();
		socket.emit('send message',$messageBox.val(),function(data){
			$chat.append('<span class="error"><b>'+data+'</span><br/>');
		});
		$messageBox.val('');
	})
	socket.on('new message',function(data)
	{
		$chat.append('<b>'+data.nick+':</b>'+data.msg+'<br/>');
	})
	socket.on('whisper',function(data){
		$chat.append('<span class="whisper"><b>'+data.nick+':</b>'+data.msg+'</span><br/>');
	})
	socket.on('last msgs',function(data){
		console.log(data);
		for(var i=2;i>=0;i--)
		$chat.append('<span><b>'+data[i].nick+':</b>'+data[i].message+'</span><br/>');
	})
});

