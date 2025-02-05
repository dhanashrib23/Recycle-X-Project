package com.recycleX.mapper.supplier;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.recycleX.models.supplier.SupplierOrder;

@Component
public class SupplierOrderRowMapper implements RowMapper<SupplierOrder> {
	@Override
	public SupplierOrder mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new SupplierOrder(rs.getInt("order_id"), rs.getString("formatted_order_date"),
				rs.getString("formatted_order_time"), rs.getInt("pickup_id"), rs.getString("order_status"),
				rs.getString("address"));
	}
}
