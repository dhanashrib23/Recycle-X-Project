package com.recycleX.mapper.consumer;

import com.recycleX.entities.Consumer;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class ConsumerRowMapper implements RowMapper<Consumer> {

	@Override
	public Consumer mapRow(ResultSet rs, int rowNum) throws SQLException {
		return new Consumer(rs.getInt("consumer_id"), rs.getString("first_name"), rs.getString("last_name"),
				rs.getString("email"), rs.getString("mobile_number"), rs.getString("password"), rs.getString("state"),
				rs.getString("city"), rs.getString("imageName"), rs.getString("pincode"), rs.getString("consumer_type"),
				rs.getString("consumer_status"), rs.getTimestamp("registered_at"), rs.getTimestamp("last_modified_at"));
	}
}
