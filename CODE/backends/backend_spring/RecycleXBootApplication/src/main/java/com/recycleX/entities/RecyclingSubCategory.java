package com.recycleX.entities;

import org.springframework.web.multipart.MultipartFile;

public class RecyclingSubCategory {
    private int subcategoryId;
    private int categoryId;
    private String subcategoryName;
    private float pricePerKg;
    private MultipartFile subcategoryImage;

    public RecyclingSubCategory(int subcategoryId, int categoryId, String subcategoryName, float pricePerKg, MultipartFile subcategoryImage) {
        this.subcategoryId = subcategoryId;
        this.categoryId = categoryId;
        this.subcategoryName = subcategoryName;
        this.pricePerKg = pricePerKg;
        this.subcategoryImage = subcategoryImage;
    }

    public int getSubcategoryId() {
        return subcategoryId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getSubcategoryName() {
        return subcategoryName;
    }

    public float getPricePerKg() {
        return pricePerKg;
    }

    public MultipartFile getSubcategoryImage() {
        return subcategoryImage;
    }

    public void setSubcategoryId(int subcategoryId) {
        this.subcategoryId = subcategoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public void setSubcategoryName(String subcategoryName) {
        this.subcategoryName = subcategoryName;
    }

    public void setPricePerKg(float pricePerKg) {
        this.pricePerKg = pricePerKg;
    }

    public void setSubcategoryImage(MultipartFile subcategoryImage) {
        this.subcategoryImage = subcategoryImage;
    }

    @Override
    public String toString() {
        return "RecyclingSubCategory [subcategoryId=" + subcategoryId + ", categoryId=" + categoryId + ", subcategoryName="
                + subcategoryName + ", pricePerKg=" + pricePerKg + ", subcategoryImage=" + subcategoryImage + "]";
    }
}
