(function() { //don't touch this line
  
  var suffix = "1"; // must be different in different JS files
 
  var relay_up_device = "lc103_4";
  var relay_up_control = "Relay 1";

  var relay_down_device = "lc103_4";
  var relay_down_control = "Relay 2";

  var timeout_s = 15;
  
  // End of settings
  
  
  var relay_up_timer_id = null;
  var relay_down_timer_id = null;
  
  defineRule( "roller_shutter_up_on" + suffix, {
   asSoonAs: function() {
     return dev["wb-gpio"]["EXT2_DIR2"];
   },
    then: function () {
      if (relay_up_timer_id) {
        relay_up_timer_id = clearTimeout(relay_up_timer_id); 
      };

      relay_up_timer_id = setTimeout(function() {
        return dev["wb-gpio"]["EXT2_DIR2"] = 0;
      }, timeout_s * 1000);
    }
  });

  defineRule("roller_shutter_down_on" + suffix, {
    asSoonAs: function() {
      return dev["wb-gpio"]["EXT2_DIR3"];
    },
    then: function () {
      if (relay_down_timer_id) {
        relay_down_timer_id = clearTimeout(relay_down_timer_id); 
      };
      
      relay_down_timer_id = setTimeout(function() {
        dev["wb-gpio"]["EXT2_DIR3"] = 0;
      }, timeout_s * 1000);
    }
  });

  defineRule("roller_shutter_both_on" + suffix, {
    asSoonAs: function() {
      return dev["wb-gpio"]["EXT2_DIR2"] && dev["wb-gpio"]["EXT2_DIR3"];
    },
    then: function () {
      if (relay_up_timer_id) {
        relay_up_timer_id = clearTimeout(relay_up_timer_id); 
      };

      if (relay_down_timer_id) {
        relay_down_timer_id = clearTimeout(relay_down_timer_id); 
      };

      
      dev["wb-gpio"]["EXT2_DIR2"] = 0;
      dev["wb-gpio"]["EXT2_DIR3"] = 0;
      log("Both roller shutter relays on, switching them off");
    }
  });
})();
