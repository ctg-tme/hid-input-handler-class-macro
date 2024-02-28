import xapi from 'xapi';

class HIDInputHandler {
  constructor(deviceName, sequenceCaptureDelay = 75) {
    this._DeviceName = deviceName;
    this._Buttons = [];
    this._DiscoveryMode = false;
    this._SequenceCaptureTimeout = '';
    this._SequenceCaptureDelay = sequenceCaptureDelay;
    this._SequenceCaptureBin = [];
    this._SequenceRepeating = false;
    console.info({ HIDInputHandler_Info: `Discovery Mode for [${this._DeviceName}] is [${this._DiscoveryMode == true ? 'On' : 'Off'}]` });
    xapi.Config.Peripherals.InputDevice.Mode.set('On').then(() => {
      console.info({ HIDInputHandler_Info: `xConfiguration Peripherals InputDevice Mode set to [On]` })
    }).catch(e => {
      e.Context = 'HIDInputHandler_Error: Unable to execute [xapi.Config.Peripherals.InputDevice.Mode.set(\'On\')], check for Errors with the Macro Syntax or to see if you\'re codec supports this xAPI';
      console.error(e)
    });
  }
  addButton(keyName, type, sequence) {
    if (type.toLowerCase() != 'short-press' && type.toLowerCase() != 'long-press') {
      const errorMessage = { message: `HIDInputHandler_Error: Invalid Type entered [${type}] for [${keyName}]`, ValidTypes: ['short-press', 'long-press'] };
      throw new Error(errorMessage);
    }
    this._Buttons.push({ DeviceName: this._DeviceName, KeyName: keyName, Type: type.toLowerCase(), Sequence: sequence, Id: this._Buttons.length + 1 });

    const sequenceMap = {};

    for (const item of this._Buttons) {
      const sequenceKey = JSON.stringify(item.Sequence);

      if (sequenceMap[sequenceKey]) {
        const matchingItem = sequenceMap[sequenceKey];
        const errorMessage = {
          message: `HIDInputHandler_Error: Duplicate Clicker Sequences found on [${this._DeviceName}]`,
          Entry1: { KeyName: matchingItem.KeyName, Type: matchingItem.Type, Id: matchingItem.Id },
          Entry2: { KeyName: item.KeyName, Type: item.Type, Id: item.Id }
        };
        throw new Error(errorMessage);
      } else {
        sequenceMap[sequenceKey] = item;
      }
    }
    console.log({ HIDInputHandler_Log: `New HID Button Added to [${this._DeviceName}]`, KeyName: keyName, Type: type });
  }
  setDiscoveryMode(boolean) {
    let formattedBool = boolean.toString().toLowerCase();
    if (formattedBool === 'true' || formattedBool === 'on') { formattedBool = true };
    if (formattedBool === 'false' || formattedBool === 'off') { formattedBool = false };
    if (typeof formattedBool !== 'boolean') {
      throw new Error({ message: `Invalid Parameter [${boolean}]. setDiscoveryMode(boolean) only accepts true, on, false or off values` });
    }
    this._DiscoveryMode = formattedBool;
    console.info({ HIDInputHandler_Info: `Discovery Mode for [${this._DeviceName}] is [${formattedBool == true ? 'On' : 'Off'}]` });
    return this
  }
  checkForRepetitiveSequence(array, targetArray) {
    const occurrences = [];
    let currentSet = [];

    for (const item of array) {
      currentSet.push(item);

      if (currentSet.length === targetArray.length) {
        const isMatch = currentSet.every((value, index) =>
          JSON.stringify(value) === JSON.stringify(targetArray[index])
        );

        if (isMatch) {
          currentSet = [];
          occurrences.push([...currentSet]);
        }
      }
    }
    if (occurrences.length >= 4) { return true; };
    return false;
  }
  handlePress(data, callBack) {
    clearTimeout(this._SequenceCaptureTimeout);
    this._SequenceCaptureBin.push(data);

    for (const item of this._Buttons) {
      let isRepeating = this.checkForRepetitiveSequence(this._SequenceCaptureBin, item.Sequence);
      if (isRepeating) {
        this._SequenceRepeating = true;
        callBack({ DeviceName: item.DeviceName, KeyName: item.KeyName, Type: item.Type, Id: item.Id });
        this._SequenceCaptureBin = [];
        return;
      }
    }
    this._SequenceCaptureTimeout = setTimeout(() => {

      for (const item of this._Buttons) {
        if (JSON.stringify(item.Sequence) === JSON.stringify(this._SequenceCaptureBin)) {
          callBack({ DeviceName: item.DeviceName, KeyName: item.KeyName, Type: item.Type, Id: item.Id });
          this._SequenceCaptureBin = [];
          this._SequenceRepeating = false;
          return;
        }
      }
      if (this._DiscoveryMode && !this._SequenceRepeating) {
        console.log({
          HIDInputHandler_Log: `New Key Sequence Discovered, use the following sequence information and the addButton(keyName, type, sequence) method add this to your solution`,
          Sequence: this._SequenceCaptureBin
        });
      };
      this._SequenceCaptureBin = [];
      return;
    }, this._SequenceCaptureDelay);
  }
}

export { HIDInputHandler };