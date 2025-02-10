package com.recycleX.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.recycleX.entities.ServiceZone;

@Component
public class ServiceZoneRowMapper implements RowMapper<ServiceZone> {
	@Override
	public ServiceZone mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new ServiceZone(rs.getString("pincode"), rs.getString("state"), rs.getString("city"),
				rs.getString("district"), rs.getString("service_type"));
	}
}
