package com.recycleX.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class FileUploadUtils {

	public static String saveImage(MultipartFile image, String targetDirectory) throws IOException {
		// Ensure the directory exists
		File directory = new File(targetDirectory);
		if (!directory.exists()) {
			directory.mkdirs();
		}

		String originalFileName = image.getOriginalFilename();

		// Define the path to save the image
		File fileToSave = new File(targetDirectory + originalFileName);

		// Save the image to the directory
		image.transferTo(fileToSave);

		return originalFileName;
	}
}
