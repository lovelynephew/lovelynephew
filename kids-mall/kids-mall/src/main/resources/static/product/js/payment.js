$.ajax({
		type: 'POST',
		url : '/api/payment/call',
		data: 'text',
		dataType:'text' , 
		success: function(result){
			console.log(result);
		},
		error:function(){  
            //에러가 났을 경우 실행시킬 코드
		}
	})