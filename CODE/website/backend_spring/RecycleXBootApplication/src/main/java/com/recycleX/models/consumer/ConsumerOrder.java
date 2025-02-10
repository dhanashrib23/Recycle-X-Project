package com.recycleX.models.consumer;

public class ConsumerOrder {
	private Integer orderId;
	private Integer consumerId;
	private String orderDate;
	private String orderTime;
	private Integer deliveryId;
	private String orderStatus;

	public ConsumerOrder(Integer orderId, Integer consumerId, String orderDate, String orderTime, Integer deliveryId,
			String orderStatus) {
		this.orderId = orderId;
		this.consumerId = consumerId;
		this.orderDate = orderDate;
		this.orderTime = orderTime;
		this.deliveryId = deliveryId;
		this.orderStatus = orderStatus;
	}

	public Integer getOrderId() {
		return orderId;
	}

	public Integer getConsumerId() {
		return consumerId;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public String getOrderTime() {
		return orderTime;
	}

	public Integer getDeliveryId() {
		return deliveryId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public void setConsumerId(Integer consumerId) {
		this.consumerId = consumerId;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}

	public void setDeliveryId(Integer deliveryId) {
		this.deliveryId = deliveryId;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "ConsumerOrder [orderId=" + orderId + ", consumerId=" + consumerId + ", orderDate=" + orderDate
				+ ", orderTime=" + orderTime + ", deliveryId=" + deliveryId + ", orderStatus=" + orderStatus + "]";
	}
}
