package com.recycleX.mapper.supplier;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.recycleX.models.supplier.SupplierOrderItem;

@Component
public class SupplierOrderItemRowMapper implements RowMapper<SupplierOrderItem> {

	@Override
	public SupplierOrderItem mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new SupplierOrderItem(rs.getInt("subcategory_id"), rs.getString("subcategory_name"),
				rs.getInt("quantity_kg"), rs.getDouble("total_price"), rs.getString("imageName"));
	}
}
