package com.recycleX.models.consumer;

public class ConsumerOrderItem {
	private Integer subcategoryId;
	private String subcategoryName;
	private Integer quantity;
	private String imageName;

	public ConsumerOrderItem(Integer subcategoryId, String subcategoryName, Integer quantity, String imageName) {
		this.subcategoryId = subcategoryId;
		this.subcategoryName = subcategoryName;
		this.quantity = quantity;
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

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	@Override
	public String toString() {
		return "ConsumerOrderItem [subcategoryId=" + subcategoryId + ", subcategoryName=" + subcategoryName
				+ ", quantity=" + quantity + ", imageName=" + imageName + "]";
	}
}
