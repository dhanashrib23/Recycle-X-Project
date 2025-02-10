package com.recycleX.models.supplier;

public class SupplierOrderItem {
	private Integer subcategoryId;
	private String subcategoryName;
	private Integer quantity;
	private Double totalPrice;
	private String imageName;

	public SupplierOrderItem(Integer subcategoryId, String subcategoryName, Integer quantity, Double totalPrice,
			String imageName) {
		this.subcategoryId = subcategoryId;
		this.subcategoryName = subcategoryName;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.imageName = imageName;
	}

	public Integer getSubcategoryId() {
		return subcategoryId;
	}

	public String getSubcategoryName() {
		return subcategoryName;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public Double getTotalPrice() {
		return totalPrice;
	}

	public String getImageName() {
		return imageName;
	}

	public void setSubcategoryId(Integer subcategoryId) {
		this.subcategoryId = subcategoryId;
	}

	public void setSubcategoryName(String subcategoryName) {
		this.subcategoryName = subcategoryName;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	@Override
	public String toString() {
		return "SupplierOrderItem [subcategoryId=" + subcategoryId + ", subcategoryName=" + subcategoryName
				+ ", quantity=" + quantity + ", totalPrice=" + totalPrice + ", imageName=" + imageName + "]";
	}

}