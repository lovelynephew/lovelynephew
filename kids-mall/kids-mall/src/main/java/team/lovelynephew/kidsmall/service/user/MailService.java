package team.lovelynephew.kidsmall.service.user;

import javax.mail.MessagingException;

import team.lovelynephew.kidsmall.web.dto.user.SendMailDto;

public interface MailService {

	public void sendEmail(SendMailDto sendMailDto) throws MessagingException;
	
	public void sendRegisterEmail(SendMailDto sendMailDto) throws Exception;
	
	public void sendPasswordEmail(SendMailDto sendMailDto) throws Exception;
}
