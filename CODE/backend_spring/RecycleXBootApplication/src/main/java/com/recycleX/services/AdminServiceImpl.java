package com.recycleX.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.recycleX.entities.*;
import com.recycleX.interfaces.*;

@Service
public class AdminServiceImpl implements AdminServiceable {

	@Autowired
	private AdminDaoable daoable;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public Admin verifyAdmin(String email, String rawPasswd) {
		Admin admin = daoable.findAdminByEmail(email);
		if (admin != null && passwordEncoder.matches(rawPasswd, admin.getPassword())) {
			return admin;
		} else {
			throw new RuntimeException("Invalid email or password");
		}
	}

	@Override
	public int saveAdmin(Admin admin) {
		return daoable.save(admin);
	}

	@Override
	public int updateAdmin(int adminId, Admin admin) {
		return daoable.update(adminId, admin);
	}

	@Override
	public List<Admin> fetchAllAdmins() {
		return daoable.findAllAdmins();
	}

	@Override
	public int deleteAdmin(int adminId) {
		return daoable.delete(adminId);
	}

	@Override
	public int addService(ServiceZone zone) {
		return daoable.saveServiceZone(zone);
	}

	@Override
	public int deleteService(int pincode) {
		return daoable.removeServiceZone(pincode);
	}

	@Override
	public int updateService(int pincode, ServiceZone zone) {
		return daoable.modifyService(pincode, zone);
	}

	@Override
	public List<ServiceZone> fetchAllServiceZone() {
		return daoable.findAllServiceZone();
	}
}
