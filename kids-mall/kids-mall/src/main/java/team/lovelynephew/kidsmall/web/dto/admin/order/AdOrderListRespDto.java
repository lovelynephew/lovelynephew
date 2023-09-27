package team.lovelynephew.kidsmall.web.dto.admin.order;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdOrderListRespDto {
	private String orderCode;
	private int userCode;
	private String userId;
	private String userName;
	private String userRoles;
	private int prdCode;
	private String prdName;
	private int eventCode;
	private int paymentStatus;
	private int orderStatus;
	private int csStatus;
	private String paymentMethod;
	private int paymentAmount;
	private LocalDate createDate;
	
    private int totalCount;
    private int totalPrice;
    
    private int todaySaleCount;
    private int todaySalePrice;
    
    private int thisMonthSaleCount;
    private int thisMonthSalePrice;
    
}
