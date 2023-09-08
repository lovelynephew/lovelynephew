package team.lovelynephew.kidsmall.web.controller.api.s3file;

import java.io.IOException;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import team.lovelynephew.kidsmall.service.s3file.S3UploadService;

@RestController
@RequiredArgsConstructor
public class S3FileController {
	
	private final S3UploadService s3UploadService;
	
    @PostMapping("file/profile")
    public String uploadProfileImage(@RequestParam("image")MultipartFile multipartFile) throws IOException {
        System.out.println("test");
        return s3UploadService.uploadProfile(multipartFile);
    }
    
    @PostMapping("file/active")
    public List<String> uploadActiveImages(@RequestParam("images") List<MultipartFile> multipartFiles) throws IOException {
        return s3UploadService.uploadActiceImages(multipartFiles);
    }
}
