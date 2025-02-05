package com.recycleX.models.supplier;

public class SupplierOrder {
	private Integer orderId;
	private String orderDate;
	private String orderTime;
	private Integer pickupId;
	private String orderStatus;
	private String address;

	public SupplierOrder(Integer orderId, String orderDate, String orderTime, Integer pickupId, String orderStatus,
			String address) {
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.orderTime = orderTime;
		this.pickupId = pickupId;
		this.orderStatus = orderStatus;
		this.address = address;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public Integer getPickupId() {
		return pickupId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public String getAddress() {
		return address;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public void setPickupId(Integer pickupId) {
		this.pickupId = pickupId;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "SupplierOrder [orderId=" + orderId + ", orderDate=" + orderDate + ", orderTime=" + orderTime
				+ ", pickupId=" + pickupId + ", orderStatus=" + orderStatus + ", address=" + address + "]";
	}

}
