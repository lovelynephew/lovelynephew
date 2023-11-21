<%@page import="com.google.gson.Gson"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.parser.ParseException" %>
<%@ page import="java.io.*" %>
<%@ page import="java.util.*" %>
<%@ page import="java.net.HttpURLConnection" %>
<%@ page import="java.net.URL" %>
<%@ page import="java.security.PrivateKey" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%@ page import="java.security.Signature" %>
<%@ page import="java.security.SignatureException" %>
<%@ page import="java.security.NoSuchAlgorithmException" %>
<%@ page import="java.security.InvalidKeyException" %>
<%@ page import="java.nio.file.Files" %>
<%@ page import="java.nio.file.Path" %>
<%@ page import="java.nio.file.Paths" %>
<%@ page import="java.util.stream.Collectors" %>
<%@ page import="org.bouncycastle.asn1.ASN1Sequence" %>
<%@ page import="org.bouncycastle.asn1.pkcs.PrivateKeyInfo" %>
<%@ page import="org.bouncycastle.pkcs.PKCS8EncryptedPrivateKeyInfo" %>
<%@ page import="org.bouncycastle.pkcs.PKCSException" %>
<%@ page import="org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter" %>
<%@ page import="org.bouncycastle.openssl.jcajce.JceOpenSSLPKCS8DecryptorProviderBuilder" %>
<%@ page import="org.bouncycastle.operator.InputDecryptorProvider" %>
<%@ page import="org.bouncycastle.operator.OperatorCreationException" %>
<%!
    /* 
    ==========================================================================
    null 값을 처리하는 메소드                                                               
    --------------------------------------------------------------------------
    */
    public String f_get_parm( String val )
    {
        if ( val == null ) val = "";
        return  val;
    }

    /* 
    ==========================================================================
    서명데이터 생성 관련 메소드 (결제 취소시 필요)                                                               
    --------------------------------------------------------------------------
    */  
    // 개인키 파일을 읽어 PrivateKey 객체 리턴
    public static PrivateKey loadSplMctPrivateKeyPKCS8()
    {
        PrivateKey priKey = null;
        
        // 개인키 인증서 경로 및 비밀번호(테스트용)
        String filePath = "C:\\...\\certificate\\splPrikeyPKCS8.pem";
        String privateKeyPassword = "changeit";
    
        try
        {
            Path path = Paths.get( filePath );
    
            /*********************************
             * PKCS#8 foramt 에서 header & footer 제거
             *********************************/
            String strPriKeyData = Files.readAllLines( path )
                    .stream()
                    .filter( line -> !line.startsWith( "-----BEGIN" ) && !line.startsWith( "-----END" ) )
                    .collect( Collectors.joining() );
    
            // Base64 decoding
            byte[] btArrPriKey   = Base64.getDecoder().decode( strPriKeyData );
    
            /*********************************
             * PEMParser 적용 항목 선언
             *********************************/
            ASN1Sequence derSeq = ASN1Sequence.getInstance( btArrPriKey );
            PKCS8EncryptedPrivateKeyInfo encPkcs8PriKeyInfo = new PKCS8EncryptedPrivateKeyInfo( org.bouncycastle.asn1.pkcs.EncryptedPrivateKeyInfo.getInstance( derSeq ) );
    
            /*********************************
             * 복호화 & Key 변환
             *********************************/
            JcaPEMKeyConverter pemKeyConverter = new JcaPEMKeyConverter();
            InputDecryptorProvider decProvider = new JceOpenSSLPKCS8DecryptorProviderBuilder().build( privateKeyPassword.toCharArray() );
    
            PrivateKeyInfo priKeyInfo          = encPkcs8PriKeyInfo.decryptPrivateKeyInfo( decProvider );
            priKey                             = pemKeyConverter.getPrivateKey( priKeyInfo );
    
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
        catch (OperatorCreationException e)
        {
            e.printStackTrace();
        }
        catch (PKCSException e)
        {
            e.printStackTrace();
        }
    
        return priKey;
    }

    //Signature 데이터 생성 
    public static String makeSignatureData(String targetData)
    {
        
        String signData = null;
        PrivateKey priKey = null;
        priKey = loadSplMctPrivateKeyPKCS8();
    
        byte[] btArrTargetData = targetData.getBytes( StandardCharsets.UTF_8 );
    
        try {
            Signature sign = Signature.getInstance( "SHA256WithRSA" );
            sign.initSign( priKey );
            sign.update( btArrTargetData );
    
            byte[] btArrSignData = sign.sign();
    
            signData = Base64.getEncoder().encodeToString( btArrSignData );
    
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (SignatureException e) {
            e.printStackTrace();
        }
    
        return signData;
    }


%>

<%
    /* 
    ==========================================================================
         결제 API URL                                                                 
    --------------------------------------------------------------------------
    */
    String target_URL = "https://stg-spl.kcp.co.kr/gw/enc/v1/payment";  // 개발서버
    //String target_URL = "https://spl.kcp.co.kr/gw/enc/v1/payment";    // 운영서버
    /* 
    ==========================================================================
         요청정보                                                                
    --------------------------------------------------------------------------
    */
    String tran_cd              = f_get_parm( request.getParameter( "tran_cd"  )); // 요청타입
    String site_cd              = f_get_parm( request.getParameter( "site_cd"  )); // 사이트코드
    // 인증서정보(직렬화)
    String kcp_cert_info        = "-----BEGIN CERTIFICATE-----MIIDgTCCAmmgAwIBAgIHBy4lYNG7ojANBgkqhkiG9w0BAQsFADBzMQswCQYDVQQGEwJLUjEOMAwGA1UECAwFU2VvdWwxEDAOBgNVBAcMB0d1cm8tZ3UxFTATBgNVBAoMDE5ITktDUCBDb3JwLjETMBEGA1UECwwKSVQgQ2VudGVyLjEWMBQGA1UEAwwNc3BsLmtjcC5jby5rcjAeFw0yMTA2MjkwMDM0MzdaFw0yNjA2MjgwMDM0MzdaMHAxCzAJBgNVBAYTAktSMQ4wDAYDVQQIDAVTZW91bDEQMA4GA1UEBwwHR3Vyby1ndTERMA8GA1UECgwITG9jYWxXZWIxETAPBgNVBAsMCERFVlBHV0VCMRkwFwYDVQQDDBAyMDIxMDYyOTEwMDAwMDI0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAppkVQkU4SwNTYbIUaNDVhu2w1uvG4qip0U7h9n90cLfKymIRKDiebLhLIVFctuhTmgY7tkE7yQTNkD+jXHYufQ/qj06ukwf1BtqUVru9mqa7ysU298B6l9v0Fv8h3ztTYvfHEBmpB6AoZDBChMEua7Or/L3C2vYtU/6lWLjBT1xwXVLvNN/7XpQokuWq0rnjSRThcXrDpWMbqYYUt/CL7YHosfBazAXLoN5JvTd1O9C3FPxLxwcIAI9H8SbWIQKhap7JeA/IUP1Vk4K/o3Yiytl6Aqh3U1egHfEdWNqwpaiHPuM/jsDkVzuS9FV4RCdcBEsRPnAWHz10w8CX7e7zdwIDAQABox0wGzAOBgNVHQ8BAf8EBAMCB4AwCQYDVR0TBAIwADANBgkqhkiG9w0BAQsFAAOCAQEAg9lYy+dM/8Dnz4COc+XIjEwr4FeC9ExnWaaxH6GlWjJbB94O2L26arrjT2hGl9jUzwd+BdvTGdNCpEjOz3KEq8yJhcu5mFxMskLnHNo1lg5qtydIID6eSgew3vm6d7b3O6pYd+NHdHQsuMw5S5z1m+0TbBQkb6A9RKE1md5/Yw+NymDy+c4NaKsbxepw+HtSOnma/R7TErQ/8qVioIthEpwbqyjgIoGzgOdEFsF9mfkt/5k6rR0WX8xzcro5XSB3T+oecMS54j0+nHyoS96/llRLqFDBUfWn5Cay7pJNWXCnw4jIiBsTBa3q95RVRyMEcDgPwugMXPXGBwNoMOOpuQ==-----END CERTIFICATE-----";
    String enc_data             = f_get_parm( request.getParameter( "enc_data" )); // 암호화 인증데이터
    String enc_info             = f_get_parm( request.getParameter( "enc_info" )); // 암호화 인증데이터
    String ordr_mony            = f_get_parm( request.getParameter( "good_mny"  )); ; // 결제요청금액   ** 1 원은 실제로 업체에서 결제하셔야 될 원 금액을 넣어주셔야 합니다. 결제금액 유효성 검증 **
    /* = -------------------------------------------------------------------------- = */
    String use_pay_method       = f_get_parm( request.getParameter( "use_pay_method" )); // 결제 방법
    String ordr_idxx            = f_get_parm( request.getParameter( "ordr_idxx" )); // 주문번호

    JSONObject json_req = new JSONObject();

    json_req.put("tran_cd", tran_cd);
    json_req.put("site_cd", site_cd);
    json_req.put("kcp_cert_info", kcp_cert_info);
    json_req.put("enc_data", enc_data);
    json_req.put("enc_info", enc_info);
    json_req.put("ordr_mony",ordr_mony);

    String temp_req_data = json_req.toString();
    String req_data = temp_req_data.replace(",",",\r\n");

    String inputLine = null;
    StringBuffer outResult = new StringBuffer();

    try 
    {
        // API REQ
        URL url = new URL(target_URL);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();
        conn.setDoOutput(true);
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept-Charset", "UTF-8");

        OutputStream os = conn.getOutputStream();
        os.write(req_data.getBytes("UTF-8"));
        os.flush();
        
        // API RES
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        while ((inputLine = in.readLine()) != null) 
        {
            outResult.append(inputLine);
        }
        conn.disconnect();
    }
    catch(Exception e)
    {
        e.printStackTrace();
    }

    String temp_result = outResult.toString();
    String res_data = temp_result.replace(",",",\r\n");
   
    
    /* 
    ==========================================================================
    응답정보                                                               
    --------------------------------------------------------------------------
    */
    // 공통
    String res_cd         = "";
    String res_msg        = "";
    String res_en_msg     = "";
    String tno            = "";
    String amount         = "";
    String app_time       = ""; // 공통(카드:승인시간,계좌이체:계좌이체시간,가상계좌:가상계좌 채번시간)
    // 카드
    String card_cd     = ""; // 카드코드
    String card_name   = ""; // 카드사
    String app_no      = ""; // 승인번호
    String quota       = ""; // 할부개월
    String noinf       = ""; // 무이자여부
    // 포인트
    String pnt_issue        = ""; // 포인트 서비스사
    String add_pnt          = ""; // 발생 포인트
    String use_pnt          = ""; // 사용가능 포인트
    String rsv_pnt          = ""; // 적립 포인트
    String pnt_app_time     = ""; // 승인시간
    String pnt_app_no       = ""; // 승인번호
    String pnt_amount       = ""; // 적립금액 or 사용금액
    // 계좌이체
    String bank_name        = ""; // 은행명
    String bank_code        = ""; // 은행코드
    // 가상계좌
    String bankname         = ""; // 입금할 은행
    String bankcode         = ""; // 입금할 은행코드
    String depositor        = ""; // 입금할 계좌 예금주
    String account          = ""; // 입금할 계좌 번호
    String va_date          = ""; // 가상계좌 입금마감시간
    // 휴대폰
    String commid           = ""; // 통신사 코드
    String mobile_no        = ""; // 휴대폰 번호
    // 상품권
    String tk_van_code      = ""; // 발급사 코드
    String tk_app_no        = ""; // 승인 번호
    String tk_app_time      = ""; // 상품권 승인시간
    // 현금 영수증
    String cash_yn        = f_get_parm( request.getParameter( "cash_yn"        ) ); // 현금 영수증 등록 여부
    String cash_tr_code   = f_get_parm( request.getParameter( "cash_tr_code"   ) ); // 현금 영수증 발행 구분
    String cash_id_info   = f_get_parm( request.getParameter( "cash_id_info"   ) ); // 현금 영수증 등록 번호
    String cash_authno    = ""; // 현금 영수증 승인 번호
    String cash_no        = ""; // 현금 영수증 거래 번호    

    // RES JSON DATA Parsing
    JSONParser parser = new JSONParser();
    JSONObject json_res = (JSONObject)parser.parse(temp_result);
    
    res_cd  = f_get_parm((String)json_res.get("res_cd"));
    res_msg = f_get_parm((String)json_res.get("res_msg"));
    
    if ( "0000".equals(res_cd) )
    {
        tno       = f_get_parm((String)json_res.get("tno"));
        res_cd    = f_get_parm((String)json_res.get("res_cd"));
        res_msg   = f_get_parm((String)json_res.get("res_msg"));
        amount    = f_get_parm((String)json_res.get("amount"));
       
        // 카드
        if ( use_pay_method.equals("100000000000") )
        {
            card_cd   = f_get_parm((String)json_res.get("card_cd"));
            card_name = f_get_parm((String)json_res.get("card_name"));
            app_no    = f_get_parm((String)json_res.get("app_no"));
            app_time  = f_get_parm((String)json_res.get("app_time"));
            noinf     = f_get_parm((String)json_res.get("noinf"));
            quota     = f_get_parm((String)json_res.get("quota"));
            // 포인트 복합결제
            pnt_issue = f_get_parm((String) json_res.get("pnt_issue"));
            if ( pnt_issue.equals("SCSK") || pnt_issue.equals( "SCWB" ) )
            {
                pnt_issue    = f_get_parm((String)json_res.get("pnt_issue"));
                add_pnt      = f_get_parm((String)json_res.get("add_pnt"));
                use_pnt      = f_get_parm((String)json_res.get("use_pnt"));
                rsv_pnt      = f_get_parm((String)json_res.get("rsv_pnt"));
                pnt_app_time = f_get_parm((String)json_res.get("pnt_app_time"));
                pnt_app_no   = f_get_parm((String)json_res.get("pnt_app_no"));
                pnt_amount   = f_get_parm((String)json_res.get("pnt_amount"));
                // 현금영수증 발급시 
                if ( cash_yn.equals("Y") ) 
                {
                    cash_authno = f_get_parm((String)json_res.get("cash_authno"));
                    cash_no     = f_get_parm((String)json_res.get("cash_no"));
                }
            }
        }
        // 계좌이체
        else if ( use_pay_method.equals("010000000000") )
        {
            bank_name = f_get_parm((String)json_res.get("bank_name"));
            bank_code = f_get_parm((String)json_res.get("bank_code"));
            app_time  = f_get_parm((String)json_res.get("app_time"));
            
            // 현금영수증 발급시 
            if ( cash_yn.equals("Y") ) 
            {
                cash_authno = f_get_parm((String)json_res.get("cash_authno"));
                cash_no     = f_get_parm((String)json_res.get("cash_no"));
            }
        }
        // 가상계좌
        else if ( use_pay_method.equals("001000000000") )
        {
            bankname  = f_get_parm((String)json_res.get("bankname"));
            bankcode  = f_get_parm((String)json_res.get("bankcode"));
            depositor = f_get_parm((String)json_res.get("depositor"));
            account   = f_get_parm((String)json_res.get("account"));
            va_date   = f_get_parm((String)json_res.get("va_date"));
            app_time  = f_get_parm((String)json_res.get("app_time"));
            
            // 현금영수증 발급시 
            if ( cash_yn.equals("Y") ) 
            {
            	// 현금영수증 발급 후 처리
                //cash_authno = f_get_parm((String)json_res.get("cash_authno"));
                //cash_no     = f_get_parm((String)json_res.get("cash_no"));
            }
        }
        // 포인트
        else if ( use_pay_method.equals("000100000000") )
        {
            pnt_issue    = f_get_parm((String)json_res.get("pnt_issue"));
            add_pnt      = f_get_parm((String)json_res.get("add_pnt"));
            use_pnt      = f_get_parm((String)json_res.get("use_pnt"));
            rsv_pnt      = f_get_parm((String)json_res.get("rsv_pnt"));
            pnt_app_time = f_get_parm((String)json_res.get("pnt_app_time"));
            pnt_app_no   = f_get_parm((String)json_res.get("pnt_app_no"));
            pnt_amount   = f_get_parm((String)json_res.get("pnt_amount"));
            // 현금영수증 발급시 
            if ( cash_yn.equals("Y") ) 
            {
                cash_authno = f_get_parm((String)json_res.get("cash_authno"));
                cash_no     = f_get_parm((String)json_res.get("cash_no"));
            }
        }
        // 휴대폰
        else if ( use_pay_method.equals("000010000000") )
        {
            app_time    = f_get_parm((String)json_res.get("app_time"));
            commid      = f_get_parm((String)json_res.get("commid"));
            mobile_no   = f_get_parm((String)json_res.get("mobile_no"));
        }
        // 상품권
        else if ( use_pay_method.equals("000000001000") )
        {
            tk_van_code  = f_get_parm((String)json_res.get("tk_van_code"));
            tk_app_no    = f_get_parm((String)json_res.get("tk_app_no"));
            tk_app_time  = f_get_parm((String)json_res.get("tk_app_time"));
        }
        
    }
    
    /* 
    ==========================================================================
         승인 결과 DB 처리 실패시 : 자동취소
    --------------------------------------------------------------------------
         승인 결과를 DB 작업 하는 과정에서 정상적으로 승인된 건에 대해
    DB 작업을 실패하여 DB update 가 완료되지 않은 경우, 자동으로
         승인 취소 요청을 하는 프로세스가 구성되어 있습니다.

    DB 작업이 실패 한 경우, bSucc 라는 변수(String)의 값을 "false"
         로 설정해 주시기 바랍니다. (DB 작업 성공의 경우에는 "false" 이외의
         값을 설정하시면 됩니다.)
    --------------------------------------------------------------------------
    */
    String bSucc = "";
    
    if ( "0000".equals(res_cd) )
    {
        if ( "false".equals(bSucc))
        {
            
            temp_req_data = "";
            temp_result    = "";
            /* 
            ==========================================================================
                            취소 API 요청                                                               
            --------------------------------------------------------------------------
            */
            target_URL = "https://stg-spl.kcp.co.kr/gw/mod/v1/cancel";  // 개발서버
            //target_URL = "https://spl.kcp.co.kr/gw/mod/v1/cancel";    // 운영서버
            
            // 서명데이터
            // site_cd + "^" + tno + "^" + mod_type
            // NHN KCP로부터 발급받은 개인키(PRIVATE KEY)로 SHA256withRSA 알고리즘을 사용한 문자열 인코딩 값
            String cancel_target_data = site_cd + "^" + tno + "^" + "STSC";
            String kcp_sign_data = makeSignatureData(cancel_target_data);
            
            json_req = new JSONObject();
            json_req.put("site_cd", site_cd);
            json_req.put("kcp_cert_info", kcp_cert_info);
            json_req.put("kcp_sign_data", kcp_sign_data);
            json_req.put("tno", tno);
            json_req.put("mod_type", "STSC");
            json_req.put("mod_desc", "가맹점 DB 처리 실패(자동취소)");
            
            temp_req_data = json_req.toString();
            req_data = temp_req_data.replace(",",",\r\n");
            inputLine = null;
            outResult = new StringBuffer();

            try 
            {
                // API REQ
                URL url = new URL(target_URL);
                HttpURLConnection conn = (HttpURLConnection)url.openConnection();
                conn.setDoOutput(true);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept-Charset", "UTF-8");

                OutputStream os = conn.getOutputStream();
                os.write(req_data.getBytes("UTF-8"));
                os.flush();
                
                // API RES
                BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
                while ((inputLine = in.readLine()) != null) 
                {
                    outResult.append(inputLine);
                }
                conn.disconnect();
            }
            catch(Exception e)
            {
                e.printStackTrace();
            }

            temp_result = outResult.toString();
            res_data = temp_result.replace(",",",\r\n");
            // RES JSON DATA Parsing
            parser = new JSONParser();
            json_res = (JSONObject)parser.parse(temp_result);
            
            res_cd  = f_get_parm((String)json_res.get("res_cd"));
            res_msg = f_get_parm((String)json_res.get("res_msg"));
            
            
        }
    }
    

%>
<!DOCTYPE html>
<html>
<head>
    <title>*** NHN KCP API SAMPLE ***</title>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=yes, target-densitydpi=medium-dpi">
    <link href="static/css/style.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="/resources/static/user/css/order-detail.css">
    <link rel="stylesheet" href="/static/user/css/order-detail.css">
    <script type="text/javascript">
        /* 신용카드 영수증 */ 
        /* 실결제시 : "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=" */ 
        /* 테스트시 : "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=" */ 
         function receiptView( tno, ordr_idxx, amount ) 
        {
            receiptWin = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=card_bill&tno=";
            receiptWin += tno + "&";
            receiptWin += "order_no=" + ordr_idxx + "&"; 
            receiptWin += "trade_mony=" + amount ;
    
            window.open(receiptWin, "", "width=455, height=815"); 
        }
    
        /* 현금 영수증 */ 
        /* 실결제시 : "https://admin8.kcp.co.kr/assist/bill.BillActionNew.do" */ 
        /* 테스트시 : "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do" */   
        function receiptView2( cash_no, ordr_idxx, amount ) 
        {
            receiptWin2 = "https://testadmin8.kcp.co.kr/assist/bill.BillActionNew.do?cmd=cash_bill&cash_no=";
            receiptWin2 += cash_no + "&";             
            receiptWin2 += "order_id="     + ordr_idxx + "&";
            receiptWin2 += "trade_mony="  + amount ;
    
            window.open(receiptWin2, "", "width=370, height=625"); 
        }
    
        /* 가상 계좌 모의입금 페이지 호출 */
        /* 테스트시에만 사용가능 */
        /* 실결제시 해당 스크립트 주석처리 */
        function receiptView3() 
        {
            receiptWin3 = "http://devadmin.kcp.co.kr/Modules/Noti/TEST_Vcnt_Noti.jsp"; 
            window.open(receiptWin3, "", "width=520, height=300"); 
        }
        
        
    </script>
</head>
<body oncontextmenu="return false;">
    <header>
		<nav class="head-nav">
			<div class="divbtn-back">
				<button type="button" class="btn-back" onclick="location.href='/mypage'">
					<svg width="32" height="32" fill="none" viewBox="0 0 32 32" color="#242729" class="svg-back">
						<path stroke="currentColor" stroke-width="2" d="m20 7-9 9 9 9"></path>
					</svg>
				</button>
			</div>
			<div class="div-mypage1">
				<div class="body_17 div-mypage2">주문상세</div>
			</div>
			<div class="div-mypage0"></div>
		</nav>
	</header>

    <main>
        <div class="main-container">
			<div class="main-top">
				<div class="order-number">
					<p id="orderCode">No. <%= ordr_idxx %></p>
					(<span>
						 <% String paymentDate= ordr_idxx.substring(0, 4)+"."+
								 				ordr_idxx.substring(4, 6)+"."+
								 				ordr_idxx.substring(6, 8);%>
						<%= paymentDate %> 
					</span>) 
				</div>
				<button class="delete-history-button">내역삭제</button>
			</div>
			<div class="gap-color"></div>
			<div class="main-middle">
				<div class="product-detail-box">
					<div class="product-box-top">
						<p id="prdName" >기차놀이세트</p>
					</div>
					<div class="product-box-middle">
						<span>구매확정</span>
						<div class="product-data">
							<img src="/static/images/jpg/babyshark.jpeg">
							<div class="product-desc">
								<p id="paidPrdName">기차놀이세트</p>
								<div class="price-box">
									<span id="regPrice">15,000원</span>
								</div>
							</div>
						</div>
						<div class="other-service">
							<p>배송현황</p>
							<p>문의하기</p>
						</div>
					</div>
				</div>
			</div>
			<div class="gap-color"></div>
			<div class="delivery-address-info">
				<div class="delivery-box-top">
					<h4>배송지 정보</h4>
					<div class="delivery-info">
						<p>수령인</p>
						<span>고준호</span>
					</div>
					<div class="delivery-info">
						<p>휴대폰</p>
						<span>010-9926-0864</span>
					</div>
					<div class="delivery-info">
						<p>주소</p>
						<span>경남 창원시 진해구 안청북로 39, 111동 111호</span>
					</div>
					<div class="delivery-info">
						<p >배송메모</p>
						<span id="deleveryRequest">집 앞에 놔주세요.</span>
					</div>
				</div>
			</div>
			<div class="gap-color"></div>
			<div class="payment-amount">
				<div class="payment-box">
					<h4>결제금액</h4>
					<div class="payment-info">
						<p>상품금액</p>
						<span id="prdPrice">15,000</span>
					</div>
					<div class="payment-info division">
						<p>할인금액</p>
						<span id="prdDisPrice">(-)1,500</span>
					</div>
					<div class="payment-info division">
						<p>배송비</p>
						<span id="prdDisPrice">3,000</span>
					</div>
					<div class="payment-info final-price">
						<strong>최초결제금액</strong>
						<span><%=amount %>원</span>
					</div>
					<div class="payment-info">
						<% String payMethod = "";%>
					   <%
						if(use_pay_method.equals("100000000000")){
							payMethod = "신용/체크카드/카카오페이";}
						else if(use_pay_method.equals("000010000000")){
							payMethod = "휴대폰 결제";
						}else if(use_pay_method.equals("001000000000")){
							payMethod = "무통장 입금";
						}
						%>
						<p id="payMethod"> <%= payMethod%></p>
						<span><%=amount %>원</span>
					</div>
					
					<% if (use_pay_method.equals("001000000000")) { %>
					    <div style="font-size:14px; padding-bottom:50px">
					        <% String formatted_va_date = va_date.substring(0, 4) + "년"
					            + va_date.substring(4, 6) + "월" 
					            + va_date.substring(6, 8) + "일" 
					            + va_date.substring(8, 10) + ":" 
					            + va_date.substring(10, 12) + ":" 
					            + va_date.substring(12, 14); %>
					            
					        <p style="color: #666666;"> 
					            예금주 : <%=depositor %> <br>
					            <%=bankname%>(<%=account %>) <br>
					            마감기한 <%= formatted_va_date %> 까지
					        </p>
					    </div>
					<% } %>
					
					<% if (use_pay_method.equals("100000000000")) { %>
					    <div style="font-size:14px; padding-bottom:50px">
					        <p style="color: #666666;"> 
					            카드사 : <%=card_name %>(<%=card_cd %>) <br>
					            승인번호 :  <%=app_no %> <br>
					            할부개월 :  <%=quota %> <br>
					            무이자 여부:  <%=noinf %> 
					        </p>
					    </div>
					<% } %>
					<% if (use_pay_method.equals("000010000000")) { %>
					    <div style="font-size:14px; padding-bottom:50px">
					        <p style="color: #666666;"> 
					            통신사 코드 : <%=commid %>(<br>
					            휴대폰 번호 :  <%=mobile_no %> <br>
					        </p>
					    </div>
					<% } %>
				</div>
			</div>
        </div>
    </main>   
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="/static/product/js/kcp_api_page.js"></script>
</body>
</html>