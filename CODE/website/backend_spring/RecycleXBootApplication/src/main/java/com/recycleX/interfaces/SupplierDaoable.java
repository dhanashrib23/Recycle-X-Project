package com.recycleX.interfaces;

import java.util.List;

import com.recycleX.entities.*;
import com.recycleX.models.supplier.*;

public interface SupplierDaoable {
	public List<Supplier> findAllSuppliers();

	public Supplier findSupplierById(int id);

	public int delete(int id);

	public List<SupplierOrder> findAllSupplierOrders(int supplierId);

	public List<SupplierOrderItem> findOrderItemsByOrderId(int orderId);

	public int modifyOrderStatus(int orderId, String status);

	public int modifyPriceBySubcategoryId(int subcategoryId, double newPrice);

	public int saveTrashCategory(TrashCategory trashCategory);

	public int saveTrashSubCategory(TrashSubCategory trashSubCategory);

	// Analysis
	public List<SupplierTrashSummary> findMonthlyTrashSummary(int supplierId);

	public List<SupplierTrashSummary> findYearlyTrashSummary(int supplierId);

	public List<SupplierTrashSummary> findMonthlyTrashSummaryForAll();

	public List<SupplierTrashSummary> findYearlyTrashSummaryForAll();

}
