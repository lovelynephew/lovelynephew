package team.lovelynephew.kidsmall.web.controller.api.smartEditor;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

@RestController
@RequestMapping("/file")
public class SmartEditorUpload {

	@PostMapping("/file_uploader_html5")
	public void smarteditorMultiImageUpload(HttpServletRequest request, HttpServletResponse response){
		try {
			//파일정보
			String sFileInfo = "";
			//파일명을 받는다 - 일반 원본파일명
			String sFilename = request.getHeader("file-name");
			//파일 확장자
			String sFilenameExt = sFilename.substring(sFilename.lastIndexOf(".")+1);
			//확장자를소문자로 변경
			sFilenameExt = sFilenameExt.toLowerCase();
				
			//이미지 검증 배열변수
			String[] allowFileArr = {"jpg","png","bmp","gif","jpeg"};

			//확장자 체크
			int nCnt = 0;
			for(int i=0; i<allowFileArr.length; i++) {
				if(sFilenameExt.equals(allowFileArr[i])){
					nCnt++;
				}
			}

			//이미지가 아니라면
			if(nCnt == 0) {
				PrintWriter print = response.getWriter();
				print.print("NOTALLOW_"+sFilename);
				print.flush();
				print.close();
			} else {
				//디렉토리 설정 및 업로드	
				
				//파일 기본경로
				String defaultPath = request.getServletContext().getRealPath("/");
				System.out.println("defaultPath"+defaultPath);
				//파일 기본경로 _ 상세경로
				String filePath = defaultPath + "upload" + File.separator;
				System.out.println("filePath"+filePath);
				File file = new File(filePath);
				
				if(!file.exists()) {
					file.mkdirs();
				}
				
				String sRealFileNm = "";
				sRealFileNm = UUID.randomUUID().toString() + "_" +sFilename;
				String rlFileNm = filePath + sRealFileNm;
				
				///////////////// 서버에 파일쓰기 ///////////////// 
				InputStream inputStream = request.getInputStream();
				OutputStream outputStream=new FileOutputStream(rlFileNm);
				int numRead;
				byte bytes[] = new byte[Integer.parseInt(request.getHeader("file-size"))];
				while((numRead = inputStream.read(bytes,0,bytes.length)) != -1){
					outputStream.write(bytes,0,numRead);
				}
				if(inputStream != null) {
					inputStream.close();
				}
				outputStream.flush();
				outputStream.close();
				
				
				
                // Firebase 스토리지에 이미지 업로드
                String firebaseBucketName = "lovelynephew-mall.appspot.com";
                Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.fromStream(new FileInputStream("src/main/resources/serviceAccountKey.json"))).build().getService();

                // 파일을 바이트 배열로 읽기
                byte[] fileBytes = Files.readAllBytes(Paths.get(filePath + sRealFileNm)); // 업로드할 이미지 파일 경로

                // 이미지를 Firebase 스토리지에 업로드
                String sRealFileNms = UUID.randomUUID().toString() + "." + sFilenameExt;
                BlobId blobId = BlobId.of(firebaseBucketName, "upload/" + sRealFileNm);
                System.out.println("blobId : "+blobId);
                System.out.println("sRealFileNm : "+sRealFileNm);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();
                Blob blob = storage.create(blobInfo, fileBytes);
                System.out.println("blobInfo : "+blobInfo);
                System.out.println("blob : "+blob);

                // Firebase 스토리지에서 이미지 URL 가져오기
                String firebaseImageUrl = blob.getMediaLink();
                // Firebase 스토리지에서 이미지 퍼블릭 URL 가져오기
                String publicImageUrl = "https://firebasestorage.googleapis.com/v0/b/"+blob.getBucket()+"/o/upload%2F"+sRealFileNm+"?alt=media";

                // 이미지 정보 출력
                sFileInfo += "&bNewLine=true";
                // img 태그의 title 속성을 원본파일명으로 적용시켜주기 위함
                sFileInfo += "&sFileName=" + sFilename;
//                sFileInfo += "&sFileURL=" + "../upload/" + sRealFileNm;
                sFileInfo += "&sFileURL=" + publicImageUrl;
				PrintWriter printWriter = response.getWriter();
				printWriter.print(sFileInfo);

			}	
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
