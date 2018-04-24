///
defineRule("lighting", { //название правила - "", может быть произвольным
  whenChanged: "wb-gpio/EXT1_DR2", //при изменении состояния 
  then: function (newValue, devName, cellName) { //выполняй следующие действия
    if ( newValue ) { //если разомкнут
      dev["buzzer"]["enabled"] = 1; //установи Реле 1 модуля в состояние "выключено"
    } else {
      dev["buzzer"]["enabled"] = 0; //установи Реле 1 модуля в состояние "включено"
    }
  }
});
  ///
