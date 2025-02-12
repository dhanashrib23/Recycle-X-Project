package com.recycleX.mapper.supplier;

import com.recycleX.entities.Supplier;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class SupplierRowMapper implements RowMapper<Supplier> {

	@Override
	public Supplier mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Supplier(rs.getInt("supplier_id"), rs.getString("first_name"), rs.getString("last_name"),
				rs.getString("mobile_number"), rs.getString("password"), rs.getString("state"), rs.getString("city"),
				rs.getString("imageName"), rs.getString("pincode"), rs.getString("supplier_type"),
				rs.getString("supplier_status"), rs.getTimestamp("registered_at"), rs.getTimestamp("last_modified_at"));
	}
}
