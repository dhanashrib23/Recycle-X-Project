package com.recycleX.mapper.supplier;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.recycleX.models.supplier.SupplierTrashSummary;

@Component
public class SupplierTrashSummaryRowMapper implements RowMapper<SupplierTrashSummary> {
	@Override
	public SupplierTrashSummary mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new SupplierTrashSummary(rs.getInt("category_id"), rs.getString("category_name"),
				rs.getDouble("total_quantity_kg"), rs.getString("period"));
	}
}
