package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.*;
import com.recycleX.models.consumer.*;

public interface ConsumerServiceable {
	public List<Consumer> fetchAllConsumers();

	public Consumer fetchConsumerById(int id);

	public int deleteConsumer(int id);

	public List<ConsumerOrder> getAllOrders(int consumerId);

	public List<ConsumerOrderItem> getOrderItemsByOrderId(int orderId);

	public int updateOrderStatus(int orderId, String status);

	public int updatePriceBySubcategoryId(int subcategoryId, double price);

	public int addRecyclingCategory(RecyclingCategory recyclingCategory);

	public int addRecyclingSubCategory(RecyclingSubCategory recyclingSubcategory);

	// Analysis
	public List<ConsumerRecyclingSummary> getMonthlyRecyclingSummary(int consumerId);

	public List<ConsumerRecyclingSummary> getYearlyRecyclingSummary(int consumerId);

	public List<ConsumerRecyclingSummary> getYearlyRecyclingSummaryForAll();

	public List<ConsumerRecyclingSummary> getMonthlyRecyclingSummaryForAll();

}
