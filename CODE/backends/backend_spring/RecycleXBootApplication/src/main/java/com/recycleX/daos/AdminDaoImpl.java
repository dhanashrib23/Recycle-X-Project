package com.recycleX.daos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.recycleX.entities.*;
import com.recycleX.interfaces.AdminDaoable;
import java.util.*;
import com.recycleX.mapper.*;

@Repository
public class AdminDaoImpl implements AdminDaoable {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private AdminRowMapper mapper;
	
	@Autowired
	private ServiceZoneRowMapper zoneMapper;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public Admin findAdminByEmail(String email) {
		String sql = "SELECT admin_id, first_name, last_name, email, password, is_active, created_at, updated_at "
				+ "FROM admin WHERE email = ? and is_active = 1";

		return jdbcTemplate.queryForObject(sql, mapper, email);
	}

	@Override
	public int save(Admin admin) {
		String encodedPassword = passwordEncoder.encode(admin.getPassword());
		admin.setPassword(encodedPassword);

		String sql = "INSERT INTO admin (first_name, last_name, email, password, is_active) VALUES (?, ?, ?, ?, ?)";
		return jdbcTemplate.update(sql, admin.getFirstName(), admin.getLastName(), admin.getEmail(),
				admin.getPassword(), admin.getIsActive());
	}

	@Override
	public int update(int adminId, Admin admin) {
		admin.setAdminId(adminId);
		String encodedPassword = passwordEncoder.encode(admin.getPassword());
		admin.setPassword(encodedPassword);

		String sql = "UPDATE admin SET first_name = ?, last_name = ?, email = ?, password = ?, is_active = ? WHERE admin_id = ?";
		return jdbcTemplate.update(sql, admin.getFirstName(), admin.getLastName(), admin.getEmail(),
				admin.getPassword(), admin.getIsActive(), admin.getAdminId());
	}

	@Override
	public List<Admin> findAllAdmins() {
		String sql = "SELECT admin_id, first_name, last_name, email, password, is_active, created_at, updated_at FROM admin WHERE is_active = 1";
		return jdbcTemplate.query(sql, mapper);
	}

	@Override
	public int delete(int adminId) {
		String sql = "UPDATE admin SET is_active = 0 WHERE admin_id = ?";
		return jdbcTemplate.update(sql, adminId);
	}

	@Override
	public int saveServiceZone(ServiceZone zone) {
		String sql = "INSERT INTO servicezones_v (pincode, state, city, district, service_type) VALUES (?, ?, ?, ?, ?)";
		return jdbcTemplate.update(sql, zone.getPincode(), zone.getState(), zone.getCity(), zone.getDistrict(),
				zone.getServiceType());
	}

	@Override
	public int removeServiceZone(int pincode) {
		String sql = "DELETE FROM servicezones_v WHERE pincode = ?";
		return jdbcTemplate.update(sql, pincode);
	}

	@Override
	public int modifyService(int pincode, ServiceZone zone) {
		String sql = "UPDATE servicezones_v SET state = ?, city = ?, district = ?, service_type = ? WHERE pincode = ?";
		return jdbcTemplate.update(sql, zone.getState(), zone.getCity(), zone.getDistrict(), zone.getServiceType(),
				pincode);
	}

	@Override
	public List<ServiceZone> findAllServiceZone() {
		String sql = "SELECT pincode, state, city, district, service_type FROM servicezones_v";
		return jdbcTemplate.query(sql, zoneMapper);
	}
}
