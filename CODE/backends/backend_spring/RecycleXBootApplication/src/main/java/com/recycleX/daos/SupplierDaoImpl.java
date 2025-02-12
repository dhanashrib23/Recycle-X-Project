package com.recycleX.daos;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.*;
import com.recycleX.mapper.supplier.*;
import com.recycleX.models.supplier.*;

import com.recycleX.interfaces.SupplierDaoable;
import com.recycleX.services.FileUploadUtils;

@Repository
public class SupplierDaoImpl implements SupplierDaoable {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private SupplierRowMapper mapper;

	@Autowired
	private SupplierOrderRowMapper orderMapper;

	@Autowired
	private SupplierOrderItemRowMapper itemRowMapper;

	@Autowired
	private SupplierTrashSummaryRowMapper summaryRowMapper;

	@Override
	public List<Supplier> findAllSuppliers() {
		String sql = "SELECT supplier_id, first_name, last_name, mobile_number, password, state, city, imageName, pincode, supplier_type, supplier_status, registered_at, last_modified_at "
				+ "FROM supplier WHERE supplier_status ='Active'";
		return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public Supplier findSupplierById(int id) {
		String sql = "SELECT supplier_id, first_name, last_name, mobile_number, password, state, city, imageName, pincode, supplier_type, supplier_status, registered_at, last_modified_at "
				+ "FROM supplier WHERE supplier_id = ? AND supplier_status ='Active'";
		return jdbcTemplate.queryForObject(sql, mapper, id);
	}

	@Override
	public int delete(int id) {
		String sql = "UPDATE supplier SET supplier_status = 'InActive' WHERE supplier_id = ? ";
		return jdbcTemplate.update(sql, id);
	}

	@Override
	public List<SupplierOrder> findAllSupplierOrders(int supplierId) {
		String sql = "SELECT " + "so.order_id, "
				+ "DATE_FORMAT(so.order_date, '%W, %M %d, %Y') AS formatted_order_date, "
				+ "DATE_FORMAT(so.order_time, '%h:%i %p') AS formatted_order_time, " + "so.pickup_id, "
				+ "so.order_status, "
				+ "CONCAT(pa.state, ', ', pa.city, ', ', pa.pincode, IFNULL(CONCAT(', ', pa.landmark), '')) AS address "
				+ "FROM supplierOrders_v so " + "LEFT JOIN pickupaddress_v pa ON so.pickup_id = pa.pickup_id "
				+ "WHERE so.supplier_id = ?";

		return jdbcTemplate.query(sql, orderMapper, supplierId);
	}

	@Override
	public List<SupplierOrderItem> findOrderItemsByOrderId(int orderId) {
		String sql = "SELECT " + "    soi.subcategory_id, " + "    ts.subcategory_name, " + "    soi.quantity_kg, "
				+ "    (soi.quantity_kg * ts.price_per_kg) AS total_price, " + "    ts.subcategory_image AS imageName "
				+ "FROM supplierorderitems_v soi "
				+ "JOIN trashsubcategories ts ON soi.subcategory_id = ts.subcategory_id " + "WHERE soi.order_id = ?";

		return jdbcTemplate.query(sql, itemRowMapper, orderId);
	}

	@Override
	public List<SupplierTrashSummary> findMonthlyTrashSummary(int supplierId) {
		String sql = "SELECT tc.category_id, tc.category_name, SUM(soi.quantity_kg) AS total_quantity_kg, "
				+ "DATE_FORMAT(so.order_date, '%Y-%m') AS period " + "FROM supplierorderitems_v soi "
				+ "JOIN supplierorders_v so ON soi.order_id = so.order_id "
				+ "JOIN trashsubcategories_v ts ON soi.subcategory_id = ts.subcategory_id "
				+ "JOIN trashcategories_v tc ON ts.category_id = tc.category_id "
				+ "WHERE so.supplier_id = ? AND so.order_status = 'completed' "
				+ "GROUP BY tc.category_id, tc.category_name, period " + "ORDER BY period DESC";

		return jdbcTemplate.query(sql, summaryRowMapper, supplierId);
	}

	@Override
	public List<SupplierTrashSummary> findYearlyTrashSummary(int supplierId) {
		String sql = "SELECT tc.category_id, tc.category_name, SUM(soi.quantity_kg) AS total_quantity_kg, "
				+ "YEAR(so.order_date) AS period " + "FROM supplierorderitems_v soi "
				+ "JOIN supplierorders_v so ON soi.order_id = so.order_id "
				+ "JOIN trashsubcategories_v ts ON soi.subcategory_id = ts.subcategory_id "
				+ "JOIN trashcategories_v tc ON ts.category_id = tc.category_id "
				+ "WHERE so.supplier_id = ? AND so.order_status = 'completed' "
				+ "GROUP BY tc.category_id, tc.category_name, period " + "ORDER BY period DESC";

		return jdbcTemplate.query(sql, summaryRowMapper, supplierId);
	}

	@Override
	public List<SupplierTrashSummary> findMonthlyTrashSummaryForAll() {
		String sql = "SELECT tc.category_id, tc.category_name, SUM(soi.quantity_kg) AS total_quantity_kg, 'monthly' AS period " +
                "FROM supplierorderitems_v soi " +
                "JOIN trashsubcategories_v ts ON soi.subcategory_id = ts.subcategory_id " +
                "JOIN trashcategories_v tc ON ts.category_id = tc.category_id " +  // Corrected Join
                "JOIN supplierorders_v so ON soi.order_id = so.order_id " +
                "WHERE so.order_status = 'completed' " +
                "AND YEAR(so.order_date) = YEAR(CURDATE()) " +
                "AND MONTH(so.order_date) = MONTH(CURDATE()) " +
                "GROUP BY tc.category_id, tc.category_name";

		return jdbcTemplate.query(sql, summaryRowMapper);
	}

	@Override
	public List<SupplierTrashSummary> findYearlyTrashSummaryForAll() {
		String sql = "SELECT tc.category_id, tc.category_name, SUM(soi.quantity_kg) AS total_quantity_kg, 'yearly' AS period "
	            + "FROM supplierorderitems_v soi "
	            + "JOIN trashsubcategories_v ts ON soi.subcategory_id = ts.subcategory_id "
	            + "JOIN trashcategories_v tc ON ts.category_id = tc.category_id "
	            + "JOIN supplierorders_v so ON soi.order_id = so.order_id "
	            + "WHERE so.order_status = 'completed' AND YEAR(so.order_date) = YEAR(CURDATE()) "
	            + "GROUP BY tc.category_id, tc.category_name";

		return jdbcTemplate.query(sql, summaryRowMapper);
	}

	@Override
	public int modifyOrderStatus(int orderId, String status) {
		String sql = "UPDATE supplierorders_v SET order_status = ? WHERE order_id = ? AND order_status = 'pending'";
		return jdbcTemplate.update(sql, status, orderId);
	}

	@Override
	public int modifyPriceBySubcategoryId(int subcategoryId, double newPrice) {
		String sql = "UPDATE trashsubcategories SET price_per_kg = ? WHERE subcategory_id = ?";
		return jdbcTemplate.update(sql, newPrice, subcategoryId);
	}

	@Override
	public int saveTrashCategory(TrashCategory trashCategory) {
		try {
			String imageName = FileUploadUtils.saveImage(trashCategory.getCategoryImage(),
					"supplierImages/categories/");
			// SQL to insert trash category data into the database
			String sql = "INSERT INTO trashcategories_v (category_name, category_description, category_image) "
					+ "VALUES (?, ?, ?)";

			// Use JDBC template to insert the data into the database
			return jdbcTemplate.update(sql, trashCategory.getCategoryName(), trashCategory.getCategoryDescription(),
					imageName);
		} catch (IOException e) {
			e.printStackTrace();
			return -1;
		}
	}

	@Override
	public int saveTrashSubCategory(TrashSubCategory trashSubcategory) {
		try {
			String imageName = FileUploadUtils.saveImage(trashSubcategory.getSubcategoryImage(),
					"supplierImages/subcategories/");
			String sql = "INSERT INTO trashsubcategories_v (category_id, subcategory_name, price_per_kg, subcategory_image) "
					+ "VALUES (?, ?, ?, ?)";
			return jdbcTemplate.update(sql, trashSubcategory.getCategoryId(), trashSubcategory.getSubcategoryName(),
					trashSubcategory.getPricePerKg(), imageName);
		} catch (IOException e) {
			e.printStackTrace();
			return -1;
		}
	}

}
