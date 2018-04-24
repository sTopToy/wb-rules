///
defineRule("lighting", { //название правила - "", может быть произвольным
  whenChanged: "wb-gpio/EXT1_DR1", //при изменении состояния 
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue ) { //если разомкнут
      dev["wb-gpio"]["EXT2_DIR1"] = 1; //установи Реле 1 модуля в состояние "выключено"
    } else {
      dev["wb-gpio"]["EXT2_DIR1"] = 0; //установи Реле 1 модуля в состояние "включено"
    }
  }
});
  ///
