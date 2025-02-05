package com.recycleX.models.supplier;

public class SupplierTrashSummary {
	private int categoryId;
	private String categoryName;
	private double totalQuantityKg;
	private String period;

	public SupplierTrashSummary(int categoryId, String categoryName, double totalQuantityKg, String period) {
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.totalQuantityKg = totalQuantityKg;
		this.period = period;
	}

	public int getCategoryId() {
		return categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public double getTotalQuantityKg() {
		return totalQuantityKg;
	}

	public String getPeriod() {
		return period;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public void setTotalQuantityKg(double totalQuantityKg) {
		this.totalQuantityKg = totalQuantityKg;
	}

	public void setPeriod(String period) {
		this.period = period;
	}

	@Override
	public String toString() {
		return "SupplierTrashSummary [categoryId=" + categoryId + ", categoryName=" + categoryName
				+ ", totalQuantityKg=" + totalQuantityKg + ", period=" + period + "]";
	}

}
