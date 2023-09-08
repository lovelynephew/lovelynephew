package team.lovelynephew.kidsmall.service.s3file;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface S3UploadService {
    public String uploadProfile(MultipartFile multipartFile) throws IOException;
    
    public List<String> uploadActiceImages(List<MultipartFile> MultipartFile) throws IOException;
}
