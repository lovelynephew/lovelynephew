package team.lovelynephew.kidsmall.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import net.nurigo.sdk.message.service.DefaultMessageService;

@Configuration
public class MessageServiceConfig {
	@Value("${coolsms.api.key}")
    private String apiKey;

    @Value("${coolsms.api.secret}")
    private String apiSecret;

    @Value("${coolsms.api.url}")
    private String apiUrl;

    @Bean
    public DefaultMessageService defaultMessageService() {
        return new DefaultMessageService(apiKey, apiSecret, apiUrl);
    }
}

