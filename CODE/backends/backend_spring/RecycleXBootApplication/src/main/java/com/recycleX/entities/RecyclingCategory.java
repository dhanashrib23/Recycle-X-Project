package com.recycleX.entities;

import org.springframework.web.multipart.MultipartFile;

public class RecyclingCategory {
    private int categoryId;
    private String categoryName;
    private String categoryDescription;
    private MultipartFile categoryImage;
    
    public RecyclingCategory(int categoryId, String categoryName, String categoryDescription, MultipartFile categoryImage) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
        this.categoryImage = categoryImage;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getCategoryDescription() {
        return categoryDescription;
    }

    public MultipartFile getCategoryImage() {
        return categoryImage;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setCategoryDescription(String categoryDescription) {
        this.categoryDescription = categoryDescription;
    }

    public void setCategoryImage(MultipartFile categoryImage) {
        this.categoryImage = categoryImage;
    }

    @Override
    public String toString() {
        return "RecyclingCategory [categoryId=" + categoryId + ", categoryName=" + categoryName + ", categoryDescription="
                + categoryDescription + ", categoryImage=" + categoryImage + "]";
    }
}
