package com.recycleX.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.recycleX.entities.*;
import com.recycleX.interfaces.SupplierServiceable;
import com.recycleX.models.ResponseStructure;
import com.recycleX.models.supplier.*;

@RestController
@CrossOrigin
@RequestMapping("/admin/supplier")
public class SupplierAdminController {

	@Autowired
	private SupplierServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllSuppliers() {
		List<Supplier> suppliers = serviceable.fetchAllSuppliers();
		return ResponseStructure.onSuccess(200, suppliers, "Suppliers fetched successfully");
	}

	@GetMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure getSupplierById(@PathVariable("id") int id) {
		Supplier supplier = serviceable.fetchSupplierById(id);
		return ResponseStructure.onSuccess(200, supplier, "Supplier fetched successfully");
	}

	@DeleteMapping(value = "/{id}", produces = "application/json")
	public ResponseStructure supplierDelete(@PathVariable int id) {
		int status = serviceable.deleteSupplier(id);
		return ResponseStructure.onSuccess(200, status, "Supplier deleted successfully");
	}

	@GetMapping(value = "/orders/{supplierId}", produces = "application/json")
	public ResponseStructure supplierAllOrders(@PathVariable int supplierId) {
		List<SupplierOrder> supplierOrders = serviceable.getAllOrders(supplierId);
		return ResponseStructure.onSuccess(200, supplierOrders, "Suppliers Orders fetched successfully");
	}

	@GetMapping(value = "/orderItems/{orderId}", produces = "application/json")
	public ResponseStructure supplierOrderItems(@PathVariable int orderId) {
		List<SupplierOrderItem> orderItems = serviceable.getOrderItemsByOrderId(orderId);
		return ResponseStructure.onSuccess(200, orderItems, "Supplier order items fetched successfully");
	}

	@PatchMapping("/updateOrderStatus/{orderId}")
	public ResponseStructure supplierOrderStatus(@PathVariable int orderId, @RequestParam String status) {
		int result = serviceable.updateOrderStatus(orderId, status);
		return ResponseStructure.onSuccess(200, result, "Order status updated successfully.");
	}

	@PutMapping("/updatePrice/{subcategoryId}")
	public ResponseStructure updatePrice(@PathVariable int subcategoryId, @RequestParam double price) {
		int result = serviceable.updatePriceBySubcategoryId(subcategoryId, price);
		return ResponseStructure.onSuccess(202, result, "Price updated successfully.");
	}

	@PostMapping(value = "/addTrashCategory", produces = "application/json")
	public ResponseStructure addTrashCategory(@RequestParam("categoryName") String categoryName,
			@RequestParam("categoryDescription") String categoryDescription,
			@RequestParam("categoryImage") MultipartFile categoryImage) {
		TrashCategory trashCategory = new TrashCategory(0, categoryName, categoryDescription, categoryImage);
		int status = serviceable.addTrashCategory(trashCategory);
		return ResponseStructure.onSuccess(200, status, "Trash Category added successfully.");
	}

	@PostMapping(value = "/addTrashSubcategory", produces = "application/json")
	public ResponseStructure addTrashSubcategory(@RequestParam("categoryId") int categoryId,
			@RequestParam("subcategoryName") String subcategoryName, @RequestParam("pricePerKg") float pricePerKg,
			@RequestParam("subcategoryImage") MultipartFile subcategoryImage) {
		TrashSubCategory trashSubCategory = new TrashSubCategory(0, categoryId, subcategoryName, pricePerKg,
				subcategoryImage);
		int status = serviceable.addTrashSubCategory(trashSubCategory);
		return ResponseStructure.onSuccess(200, status, "Trash Subcategory added successfully.");
	}

	@GetMapping("/monthlyTrash/{supplierId}")
	public ResponseStructure getMonthlyTrash(@PathVariable int supplierId) {
		List<SupplierTrashSummary> data = serviceable.getMonthlyTrashSummary(supplierId);
		return ResponseStructure.onSuccess(200, data, "Monthly trash summary fetched successfully.");
	}

	@GetMapping("/yearlyTrash/{supplierId}")
	public ResponseStructure getYearlyTrash(@PathVariable int supplierId) {
		List<SupplierTrashSummary> data = serviceable.getYearlyTrashSummary(supplierId);
		return ResponseStructure.onSuccess(200, data, "Yearly trash summary fetched successfully.");
	}

	@GetMapping("/monthlyTrashAll")
	public ResponseStructure getMonthlyTrashForAll() {
		List<SupplierTrashSummary> data = serviceable.getMonthlyTrashSummaryForAll();
		return ResponseStructure.onSuccess(200, data, "Monthly trash summary for all suppliers fetched successfully.");
	}

	@GetMapping("/yearlyTrashAll")
	public ResponseStructure getYearlyTrashForAll() {
		List<SupplierTrashSummary> data = serviceable.getYearlyTrashSummaryForAll();
		return ResponseStructure.onSuccess(200, data, "Yearly trash summary for all suppliers fetched successfully.");
	}

}
