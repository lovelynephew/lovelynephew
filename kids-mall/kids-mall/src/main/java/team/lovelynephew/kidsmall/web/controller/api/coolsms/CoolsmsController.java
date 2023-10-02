package team.lovelynephew.kidsmall.web.controller.api.coolsms;

import java.util.Random;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import team.lovelynephew.kidsmall.web.dto.user.SendSmsReqDto;

@RestController
@RequiredArgsConstructor
public class CoolsmsController {
	
    private final DefaultMessageService messageService;

    /**
     * 단일 메시지 발송 예제
     */
    @PostMapping("/sendone")
    public String sendOne(@RequestBody SendSmsReqDto sendSmsReqDto) {
        Message message = new Message();
        
		Random rand  = new Random();
	    String numStr = "";
	    for(int i = 0; i < 4; i++) {
	       String ran = Integer.toString(rand.nextInt(10));
	       numStr += ran;
	    } 
        
	    String setNum = sendSmsReqDto.getPhoneNum().replaceAll("-", "");
        System.out.println(setNum);
        // 발신번호 및 수신번호는 반드시 01012345678 형태로 입력되어야 합니다.
        message.setFrom("01033004698");
        message.setTo(setNum);
        message.setText("인증번호는 [" + numStr + "] 입니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        System.out.println(response);

        return numStr;
    }

}
