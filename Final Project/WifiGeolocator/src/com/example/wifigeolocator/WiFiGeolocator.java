package com.example.wifigeolocator;

import android.os.Bundle;
import android.view.Menu;
import org.apache.cordova.*;

public class WiFiGeolocator extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("loadUrlTimeoutValue", 60000); 
        super.loadUrl("file:///android_asset/www/pages.html");
//        super.loadUrl("file:///android_asset/www/testPost.html");

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
}
