package team.lovelynephew.kidsmall.web.dto.user;

import lombok.Data;

@Data
public class SendMailDto {
    private String email;
    private String subject;
    private String content;
}
