package team.lovelynephew.kidsmall.service.user;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.domain.user.RegisterEntity;
import team.lovelynephew.kidsmall.domain.user.RegisterRepository;
import team.lovelynephew.kidsmall.web.dto.user.SendMailDto;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

	private final RegisterRepository registerRepository;
	private final JavaMailSender sender;

	@Override
	public void sendRegisterEmail(SendMailDto sendMailDto) throws Exception {
        sendMailDto.setSubject("조카바보 회원가입을 축하드립니다.");
        sendMailDto.setContent(createRegisterContent(sendMailDto.getEmail()));
        sendEmail(sendMailDto);
		
	}
	
	@Override
	public void sendPasswordEmail(SendMailDto sendMailDto) throws Exception {
    	RegisterEntity registerEntity = registerRepository.findUserByUsername(sendMailDto.getEmail());
    	sendMailDto.setEmail(registerEntity.getUser_email());
        sendMailDto.setSubject("조카바보 비밀번호 설정 메일입니다.");
        sendMailDto.setContent(passwordContent(sendMailDto.getEmail()));
        sendEmail(sendMailDto);
		
	}
	
	@Override
	public void sendEmail(SendMailDto sendMailDto) throws MessagingException {
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        try {
            helper.setTo(sendMailDto.getEmail());
            helper.setSubject(sendMailDto.getSubject());
            helper.setText(sendMailDto.getContent(), true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        sender.send(message);
	}
	
	
    private String createRegisterContent(String email) throws Exception {
    	
    	RegisterEntity registerEntity = registerRepository.findUserByEmail(email);
    	
        String content = "<div>\n" +
                "        <header style=\"width: 100%; height: 80px; font-size: 30px; display: flex; align-items: center;\">\n" +
                "            <h3 style=\"margin-left: 10px;\">조카바보 홈페이지에 오신걸 환영합니다.</h3>\n" +
                "        </header>\n" +
                "        <main>\n" +
                "            <div style=\"font-size: 16px; margin-top: 30px;\">\n" +
                "                <p>  " + registerEntity.getUser_name() +" 님, 회원가입을 축하드립니다.</p>\n" +
                "            </div>\n" +
                "        </main>\n" +
                "    </div>";
        return content;
    }

    private String passwordContent(String email) throws Exception {
        System.out.println(email);
    	RegisterEntity registerEntity = registerRepository.findUserByEmail(email);
    	System.out.println(registerEntity);

        String content = "<div>\n" +
                "        <header style=\"width: 100%; height: 80px; font-size: 30px; display: flex; align-items: center;\">\n" +
                "            <h3 style=\"margin-left: 10px;\">조카바보 비밀번호 찾기 메일입니다.</h3>\n" +
                "        </header>\n" +
                "        <main>\n" +
                "            <div style=\"font-size: 16px; margin-top: 30px;\">\n" +
                "                <p>  " + registerEntity.getUser_name() +" 님, 비밀번호 찾기 메일입니다.</p>\n" +
                "                <p>아래의 버튼을 클릭하여 비밀번호 변경 페이지로 들어가주세요.</p>\n" +
                "            </div>\n" +
                "            <div>\n" +
                "                <a href=\"http://localhost:8888/changePassword\"><button style=\"width: 200px; height:60px; margin-top: 30px; cursor: pointer; font-size: 16px; font-weight: 500; background-color: #dbdbdb; border: none;\">비밀번호 변경</button></a>\n" +
                "            </div>\n" +
                "        </main>\n" +
                "    </div>";

        return content;
    }
	
	
	

}
