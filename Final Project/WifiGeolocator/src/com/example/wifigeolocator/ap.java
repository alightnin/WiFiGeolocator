package com.example.wifigeolocator;

import android.net.wifi.ScanResult;
import android.util.Log;

public class ap extends ScannerPlugin{
	public String TAG = "AP CLASS";
	
	public  String ssid;
	public  String mac;
	public  String encrypt;
	public  int freq;
	public  int signal;

	public ap(){
		ssid = "null";
		mac =  "null";
		encrypt = "null";
		freq = -999;
		signal = -999;

	}
	

	public void getfromWifi(ScanResult scanResult){
	
		ssid=scanResult.SSID;
		mac=scanResult.BSSID;
		switch (scanResult.frequency){
		case 2412: freq = 1; break;
		case 2417: freq = 2; break;
		case 2422: freq = 3; break;
		case 2427: freq = 4; break;
		case 2432: freq = 5; break;
		case 2437: freq = 6; break;
		case 2442: freq = 7; break;
		case 2447: freq = 8; break;
		case 2452: freq = 9; break;
		case 2457: freq = 10; break;
		case 2462: freq = 11; break;
		case 2467: freq = 12; break;
		case 2472: freq = 13; break;
		case 2484: freq = 10; break;
		case 5180: freq = 36; break;
		case 5200: freq = 40; break;
		case 5220: freq = 44; break;
		case 5240: freq = 48; break;
		case 5260: freq = 52; break;
		case 5280: freq = 56; break;
		case 5300: freq = 60; break;
		case 5320: freq = 64; break;
		case 5500: freq = 100; break;
		case 5520: freq = 104; break;
		case 5540: freq = 108; break;
		case 5560: freq = 112; break;
		case 5580: freq = 116; break;
		case 5600: freq = 120; break;
		case 5620: freq = 124; break;
		case 5640: freq = 128; break;
		case 5660: freq = 132; break;
		case 5680: freq = 136; break;
		case 5700: freq = 140; break;
		case 5745: freq = 149; break;
		case 5765: freq = 153; break;
		case 5785: freq = 157; break;
		case 5805: freq = 161; break;
		case 5825: freq = 165; break;
		default: freq = scanResult.frequency; break;
		}

		signal=scanResult.level;

		if(scanResult.capabilities.contains("WPA")) {
			encrypt = scanResult.capabilities;
		} else if (scanResult.capabilities.contains("WEP")) {
			encrypt = scanResult.capabilities;
		} else {
			encrypt = "[OPEN]";
		}
	}
	public  void initem()
	{
		ssid = "null";
		mac =  "null";
		encrypt = "null";
		freq = -999;
		signal = -999;
	}
}