package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recycleX.entities.*;
import com.recycleX.interfaces.*;
import com.recycleX.models.consumer.*;

@Service
public class ConsumerServiceImpl implements ConsumerServiceable {

	@Autowired
	private ConsumerDaoable daoable;

	@Override
	public List<Consumer> fetchAllConsumers() {
		return daoable.findAllConsumers();
	}

	@Override
	public Consumer fetchConsumerById(int id) {
		return daoable.findConsumerById(id);
	}

	@Override
	public int deleteConsumer(int id) {
		return daoable.delete(id);
	}

	@Override
	public List<ConsumerOrder> getAllOrders(int consumerId) {
		return daoable.findAllOrders(consumerId);
	}

	@Override
	public List<ConsumerOrderItem> getOrderItemsByOrderId(int orderId) {
		return daoable.findOrderItemsByOrderId(orderId);
	}

	@Override
	public int updateOrderStatus(int orderId, String status) {
		return daoable.modifyOrderStatus(orderId, status);
	}

	@Override
	public int updatePriceBySubcategoryId(int subcategoryId, double price) {
		return daoable.modifyPriceBySubcategoryId(subcategoryId, price);
	}

	@Override
	public int addRecyclingCategory(RecyclingCategory recyclingCategory) {
		return daoable.saveRecyclingCategory(recyclingCategory);
	}

	@Override
	public int addRecyclingSubCategory(RecyclingSubCategory recyclingSubcategory) {
		return daoable.saveRecyclingSubCategory(recyclingSubcategory);
	}

	@Override
	public List<ConsumerRecyclingSummary> getMonthlyRecyclingSummary(int consumerId) {
		return daoable.findMonthlyRecyclingSummary(consumerId);
	}

	@Override
	public List<ConsumerRecyclingSummary> getYearlyRecyclingSummary(int consumerId) {
		return daoable.findYearlyRecyclingSummary(consumerId);
	}

	@Override
	public List<ConsumerRecyclingSummary> getYearlyRecyclingSummaryForAll() {
		return daoable.findYearlyRecyclingSummaryForAll();
	}

	@Override
	public List<ConsumerRecyclingSummary> getMonthlyRecyclingSummaryForAll() {
		return daoable.findMonthlyRecyclingSummaryForAll();
	}

}
