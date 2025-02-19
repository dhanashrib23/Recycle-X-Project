package com.recycleX.entities;

public class ServiceZone {
    private String pincode;
    private String state;
    private String city;
    private String district;
    private String serviceType;
    
	public ServiceZone(String pincode, String state, String city, String district, String serviceType) {
		this.pincode = pincode;
		this.state = state;
		this.city = city;
		this.district = district;
		this.serviceType = serviceType;
	}

	public String getPincode() {
		return pincode;
	}

	public String getState() {
		return state;
	}

	public String getCity() {
		return city;
	}

	public String getDistrict() {
		return district;
	}

	public String getServiceType() {
		return serviceType;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	@Override
	public String toString() {
		return "ServiceZones [pincode=" + pincode + ", state=" + state + ", city=" + city + ", district=" + district
				+ ", serviceType=" + serviceType + "]";
	}
    
	
    
}
