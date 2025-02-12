package com.recycleX.controllers;

import com.recycleX.entities.*;
import com.recycleX.interfaces.AdminServiceable;
import com.recycleX.models.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private AdminServiceable serviceable;

	@GetMapping(value = "/", produces = "application/json")
	public ResponseStructure getAllAdmin() {
		List<Admin> admins = serviceable.fetchAllAdmins();
		return ResponseStructure.onSuccess(200, admins, "Admins fetched successfully.");
	}

	@PostMapping(value = "/signin", produces = "application/json")
	public ResponseStructure adminLogin(@RequestBody Credentials cred) {
		Admin admin = serviceable.verifyAdmin(cred.getEmail(), cred.getPassword());
		return ResponseStructure.onLoginSuccess(201, admin, "LoggedIn Successfully..!");
	}

	@PostMapping(value = "/signup", produces = "application/json")
	public ResponseStructure adminRegister(@RequestBody Admin admin) {
		int status = serviceable.saveAdmin(admin);
		return ResponseStructure.onSuccess(201, status, "Admin added successfully..!");
	}

	@PutMapping("/{adminId}")
	public ResponseStructure adminUpdate(@PathVariable int adminId, @RequestBody Admin admin) {
		int status = serviceable.updateAdmin(adminId, admin);
		return ResponseStructure.onSuccess(202, status, "Admin updated successfully");
	}

	@DeleteMapping("/{adminId}")
	public ResponseStructure adminDelete(@PathVariable int adminId) {
		int status = serviceable.deleteAdmin(adminId);
		return ResponseStructure.onSuccess(204, status, "Admin deleted successfully");
	}

	@GetMapping(value = "/servicezone", produces = "application/json")
	public ResponseStructure getAllServiceZone() {
		List<ServiceZone> servicezone = serviceable.fetchAllServiceZone();
		return ResponseStructure.onSuccess(200, servicezone, "ServiceZones fetched successfully.");
	}

	@PostMapping(value = "/servicezone", produces = "application/json")
	public ResponseStructure addServiceZone(@RequestBody ServiceZone zone) {
		int status = serviceable.addService(zone);
		return ResponseStructure.onLoginSuccess(201, status, "Zone added successfully..!");
	}

	@PutMapping("/servicezone/{pincode}")
	public ResponseStructure updateServiceZone(@PathVariable int pincode, @RequestBody ServiceZone zone) {
		int status = serviceable.updateService(pincode, zone);
		return ResponseStructure.onSuccess(202, status, "Zone updated successfully..!");
	}

	@DeleteMapping("/servicezone/{pincode}")
	public ResponseStructure deleteServiceZone(@PathVariable int pincode) {
		int status = serviceable.deleteService(pincode);
		return ResponseStructure.onSuccess(204, status, "Zone deleted successfully..!");
	}

}
