package com.recycleX.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.recycleX.entities.*;
import com.recycleX.interfaces.ConsumerServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.models.consumer.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin/consumer")
public class ConsumerAdminController {

	@Autowired
	private ConsumerServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllConsumers() {
		List<Consumer> consumers = serviceable.fetchAllConsumers();
		return ResponseStructure.onSuccess(200, consumers, "Consumers fetched successfully.");
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure getConsumerById(@PathVariable int id) {
		Consumer consumer = serviceable.fetchConsumerById(id);
		return ResponseStructure.onSuccess(200, consumer, "Consumer retrieved successfully.");
	}

	@DeleteMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure consumerDelete(@PathVariable("id") int id) {
		int status = serviceable.deleteConsumer(id);
		return ResponseStructure.onSuccess(204, status, "Consumer deleted successfully.");

	}

	@GetMapping(value = "/orders/{consumerId}", produces = "application/json")
	public ResponseStructure consumerAllOrders(@PathVariable int consumerId) {
		List<ConsumerOrder> consumerOrders = serviceable.getAllOrders(consumerId);
		return ResponseStructure.onSuccess(200, consumerOrders, "Consumer Orders fetched successfully");
	}

	@GetMapping(value = "/orderItems/{orderId}", produces = "application/json")
	public ResponseStructure consumerOrderItems(@PathVariable int orderId) {
		List<ConsumerOrderItem> orderItems = serviceable.getOrderItemsByOrderId(orderId);
		return ResponseStructure.onSuccess(200, orderItems, "Consumer order items fetched successfully");
	}

	@PatchMapping("/updateOrderStatus/{orderId}")
	public ResponseStructure consumerOrderStatus(@PathVariable int orderId, @RequestParam String status) {
		int result = serviceable.updateOrderStatus(orderId, status);
		return ResponseStructure.onSuccess(202, result, "Order status updated successfully.");
	}

	@PutMapping("/updatePrice/{subcategoryId}")
	public ResponseStructure updatePrice(@PathVariable int subcategoryId, @RequestParam double price) {
		int result = serviceable.updatePriceBySubcategoryId(subcategoryId, price);
		return ResponseStructure.onSuccess(202, result, "Price updated successfully.");
	}

	@PostMapping(value = "/addRecyclingCategory", produces = "application/json")
	public ResponseStructure addRecyclingCategory(@RequestParam("categoryName") String categoryName,
			@RequestParam("categoryDescription") String categoryDescription,
			@RequestParam("categoryImage") MultipartFile categoryImage) {
		RecyclingCategory recyclingCategory = new RecyclingCategory(0, categoryName, categoryDescription,
				categoryImage);
		int status = serviceable.addRecyclingCategory(recyclingCategory);
		return ResponseStructure.onSuccess(201, status, "Recycling Category added successfully.");
	}

	@PostMapping(value = "/addRecyclingSubcategory", produces = "application/json")
	public ResponseStructure addRecyclingSubCategory(@RequestParam("categoryId") int categoryId,
			@RequestParam("subcategoryName") String subcategoryName, @RequestParam("pricePerKg") float pricePerKg,
			@RequestParam("subcategoryImage") MultipartFile subcategoryImage) {
		RecyclingSubCategory recyclingSubcategory = new RecyclingSubCategory(0, categoryId, subcategoryName, pricePerKg,
				subcategoryImage);
		int status = serviceable.addRecyclingSubCategory(recyclingSubcategory);
		return ResponseStructure.onSuccess(201, status, "Recycling Subcategory added successfully.");
	}

	@GetMapping("/monthlyRecycling/{consumerId}")
	public ResponseStructure getMonthlyRecycling(@PathVariable int consumerId) {
		List<ConsumerRecyclingSummary> data = serviceable.getMonthlyRecyclingSummary(consumerId);
		return ResponseStructure.onSuccess(200, data, "Monthly recycling summary fetched successfully.");
	}

	@GetMapping("/yearlyRecycling/{consumerId}")
	public ResponseStructure getYearlyRecycling(@PathVariable int consumerId) {
		List<ConsumerRecyclingSummary> data = serviceable.getYearlyRecyclingSummary(consumerId);
		return ResponseStructure.onSuccess(200, data, "Yearly recycling summary fetched successfully.");
	}

	@GetMapping("/monthlyRecyclingAll")
	public ResponseStructure getMonthlyRecyclingForAll() {
		List<ConsumerRecyclingSummary> data = serviceable.getMonthlyRecyclingSummaryForAll();
		return ResponseStructure.onSuccess(200, data,
				"Monthly recycling summary for all consumers fetched successfully.");
	}

	@GetMapping("/yearlyRecyclingAll")
	public ResponseStructure getYearlyRecyclingForAll() {
		List<ConsumerRecyclingSummary> data = serviceable.getYearlyRecyclingSummaryForAll();

		return ResponseStructure.onSuccess(200, data,
				"Yearly recycling summary for all consumers fetched successfully.");
	}
}
