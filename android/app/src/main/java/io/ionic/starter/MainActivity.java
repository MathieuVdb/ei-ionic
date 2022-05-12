package io.ionic.starter;

import android.os.Bundle;

import com.epicshaggy.biometric.NativeBiometric;
import com.getcapacitor.BridgeActivity;

import java.util.Collections;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    registerPlugins(
      Collections.singletonList(NativeBiometric.class)
    );
  }

}
