package team.lovelynephew.kidsmall.service.s3file;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3UploadServiceImpl implements S3UploadService {
	
	private final S3Uploader s3Uploader;
	
    @Override
    public String uploadProfile(MultipartFile multipartFile) throws IOException {
        String url = s3Uploader.upload(multipartFile, "static/profile");
        System.out.println(url);
        return url;
    }

    @Override
    public List<String> uploadActiceImages(List<MultipartFile> MultipartFile) throws IOException {
        List<String> urlList = s3Uploader.upload(MultipartFile, "static/active");
        for (int i=0; i< urlList.size(); i++) {
            System.out.println(urlList);
        }
        return urlList;
    }
}
