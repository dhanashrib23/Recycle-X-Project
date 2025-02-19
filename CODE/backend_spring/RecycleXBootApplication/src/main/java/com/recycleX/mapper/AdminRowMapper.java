package com.recycleX.mapper;

import com.recycleX.entities.Admin;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class AdminRowMapper implements RowMapper<Admin> {

	@Override
	public Admin mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Admin(rs.getInt("admin_id"), rs.getString("first_name"), rs.getString("last_name"),
				rs.getString("email"), rs.getString("password"), rs.getInt("is_active"), rs.getTimestamp("created_at"),
				rs.getTimestamp("updated_at"));
	}
}
