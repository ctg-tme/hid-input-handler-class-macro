# HID Input Handler Class
 A Class Object to handle HID input presses coming into a Cisco Video Device.

 Some HID Devices like Keyboards and Mice may not need to leverage this, as they provide a simple output, but many other HID Devices like **Presentation Clickers** can spam an array of automated key presses, which may be difficult to handle in a Macro.

 The ```HIDInputHandler``` Class object provided in this Macro helps debounce those messages, so you can have a clean output trigger for your project.

 This was written for the Macro Editor, but can be adapted for the jsxapi Node Module.

 [![HID Device Cover Image](/images/HID-Device_CoverImage.png)](#)

 NOTE: This is NOT a full Macro Solution, it's a piece of code to help developers build a solution

 ## Features
 - Auto-Configures codec for HID Device Use
 - Handles multi-output HID sequences
 - Enables simple setup for HID devices for use within your script
 - Use Discovery Mode to easily discover HID sequences, and add them to your project
 - Robust Logging

 ## Note to Developers

 - This Class can not uniquely identify button sequences across multiple HID devices
 - If you're working with multiple HID Devices, make sure they have unique key sequences, else they could trigger other automations in your workflow
 - If using Identical HID hardware, assume each will trigger the same automation you've programmed into your Macro

## Device Compatibility

Any Cisco Video Conferencing Codec that supports the following xAPI

- [xConfiguration Peripherals InputDevice Mode](https://roomos.cisco.com/xapi/Configuration.Peripherals.InputDevice.Mode/)
- [xEvent UserInterface InputDevice Key Action](https://roomos.cisco.com/xapi/Event.UserInterface.InputDevice.Key.Action/)

Be sure to levarage the Software, Product and MTR Filters on the [RoomOS Site](https://roomos.cisco.com/xapi) to determine if these xAPI are available for use on your Device

[![RoomOS Site Filter Options](/images/RoomOS-Filter_Options.png)](#)

## Import into Project

### Using Import Syntax (recommended)

 - Save the ```HID_Input_Handler_Class.js``` to your video endpoints Macro Editor
 - Do NOT activate, as it's not necessary

 Add the following line of code to your macro below ```import xapi from 'xapi';```

 ```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';
 ```

### Merging into your Main Script

 - Copy the HIDInputHandler Class Object from the ```HID_Input_Handler_Class.js``` file and paste it into your main script. It's between lines 3 and 111

 - DO NOT copy the entire script, you only need to copy the HIDInputHandler Class Object over.
  - Copying the whole script may lead to errors

## How to use the HIDInputHandler Class


### <ins>Instantiating the HIDInputHandler Class</ins>

The ```HIDInputHandler``` Class accepts 2 parameters when it's instantiated, Name and Sequence Delay,

<details>
  <summary><strong>Name</strong></summary>
  <br>
    <blockquote>Description: Assign a name for the HID Device your working with</blockquote>
    <ul>
      <li>Default Value: undefined</li>
      <li>DataType: String</li>
      <li>Required: Yes</li>
    </ul>
</details>

<details>
  <summary><strong>SequenceDelay</strong></summary>
  <br>
    <blockquote>Description: Set a delay, in milliseconds to handle rapid fire HID messages</blockquote>
    <ul>
      <li>Default Value: 75</li>
      <li>DataType: Integer</li>
      <li>Required: No</li>
    </ul>
</details>

<br>

<details>
  <summary><strong>Code Example</strong></summary>
  <br>

```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';

// Instantiate with tje Name parameter
const myObject = new HIDInputHandler('DeviceName');

// Instantiate with the Name and a modified SequenceDelay parameters
const myOtherObject = new HIDInputHandler('OtherDevice', 200);
```
</details><hr>

### <ins>HIDInputHandler Class Methods</ins>

<details>
  <summary><strong>.addButton(keyName, type, sequence)</strong></summary>
  <br>
    <blockquote>Description: Assign a name for the HID Device your working with</blockquote>
    <h4>Parameters:</h4>
    <details>
      <summary>keyName</summary>
      <blockquote>Description: Assign the name of the Key/Button for the HID input. This is used to provide the developer context on which key/button they are interacting with on their HID device</blockquote>
      <ul>
        <li>Default Value: undefined</li>
        <li>DataType: String</li>
        <li>Required: Yes</li>
      </ul>
    </details>
    <details>
      <summary>type</summary>
      <blockquote>Description: Assign a Type of the Key/Button for the HID input. This is used to define a type of action the HID device is performing. Examples include short-press, long-press, etc.</blockquote>
      <ul>
        <li>Default Value: undefined</li>
        <li>DataType: String</li>
        <li>Required: Yes</li>
      </ul>
    </details>
    <details>
      <summary>sequence</summary>
      <blockquote>Description: The sequence of key(s) emitted from the HID device. This could be 1 or more values. Some HID devices emit a sequence of keys, while others only emit 1</blockquote>
      <ul>
        <li>Default Value: undefined</li>
        <li>DataType: Array of JSON</li>
        <li>Required: Yes</li>
      </ul>
    </details>
    <br>
    <details>
    <summary>Code Example</summary>
    <br>

```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';

// Instantiate with tje Name parameter
const myObject = new HIDInputHandler('DeviceName');

// 1 Key Sequence example
myObject.addButton('Center-Button', 'short-press', [
  { "Code": "1", "Key": "KEY_ESC", "Type": "Pressed", "id": "1" }
])

// 2 Key Sequence Example
myObject.addButton('Left-Arrow', 'long-press', [
  { "Code": "1", "Key": "KEY_ESC", "Type": "Pressed", "id": "1" },
  { "Code": "1", "Key": "KEY_ESC", "Type": "Released", "id": "1" }
])

// Multi-Key Sequence Example
myObject.addButton('Left-Arrow', 'short-press', [
  { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Pressed", "id": "1" },
  { "Code": "28", "Key": "KEY_ENTER", "Type": "Pressed", "id": "1" },
  { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Released", "id": "1" },
  { "Code": "28", "Key": "KEY_ENTER", "Type": "Released", "id": "1" },
  { "Code": "56", "Key": "KEY_LEFTALT", "Type": "Pressed", "id": "1" },
  { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Pressed", "id": "1" },
  { "Code": "25", "Key": "KEY_P", "Type": "Pressed", "id": "1" },
  { "Code": "56", "Key": "KEY_LEFTALT", "Type": "Released", "id": "1" },
  { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Released", "id": "1" },
  { "Code": "25", "Key": "KEY_P", "Type": "Released", "id": "1" }
])
```
  </details><hr>
</details>
</details>

<details>
  <summary><strong>.handlePress(data, callBack)</strong></summary>
  <br>
    <blockquote>Description: Assign a name for the HID Device your working with</blockquote>
    <h4>Parameters:</h4>
    <details>
      <summary>data</summary>
      <blockquote>Description: Assign the name of the Key/Button for the HID input. This is used to provide the developer context on which key/button they are interacting with on their HID device</blockquote>
      <ul>
        <li>Default Value: undefined</li>
        <li>DataType: String</li>
        <li>Required: Yes</li>
      </ul>
    </details>
    <details>
      <summary>callBack</summary>
      <blockquote>Description: Assign the name of the Key/Button for the HID input. This is used to provide the developer context on which key/button they are interacting with on their HID device</blockquote>
      <ul>
        <li>Default Value: undefined</li>
        <li>DataType: String</li>
        <li>Required: Yes</li>
      </ul>
    </details>
    <br>
    <details>
    <summary>Code Example</summary>
    <br>

```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';

const myObject = new HIDInputHandler('DeviceName');

myObject.addButton('Center-Button', 'short-press', [
  { "Code": "1", "Key": "KEY_ESC", "Type": "Pressed", "id": "1" }
])

//Subscribe to the UserInterface InputDevice Key Action Event
xapi.Event.UserInterface.InputDevice.Key.Action.on(event => {

  //Pass the InputDevice Key Action (event) into the handlePress method
  myObject.handlePress(event, press => {

    //The handlePress method will process the payload, including multi-key sequences and provides a clean output
    console.log(press)

    /*
    Example Press Log Output
      { 
        DeviceName: 'myObject', 
        KeyName: 'Center-Button', 
        Type: 'short-press', 
        Id: 1 
      }
    */
  })
})
```
  </details><hr>
</details>

<details>
  <summary><strong>.setDiscoveryMode(boolean)</strong></summary>
  <br>
    <blockquote>Description: Discovery Mode will print to the console any unidentified Key/Button sequences for you. It's meant to help guide a developer find sequence for the HID button they are working with. This API is dependent on the .handlePres() method to print to the console.</blockquote>
    <h4>Parameters:</h4>
    <details>
      <summary>boolean</summary>
      <blockquote>Description: enable/disable Discovery Mode.</blockquote>
      <ul>
        <li>Default Value: false</li>
        <li>DataType: Boolean</li>
        <li>Required: No</li>
      </ul>
    </details>
    <br>
    <details>
    <summary>Code and Example Output</summary>
    <br>

```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';

// Instantiate with tje Name parameter
const myObject = new HIDInputHandler('DeviceName');

//Be default, this is set to false, to enable add the following line to your script
myObject.setDiscoveryMode(true);

//Subscribe to the UserInterface InputDevice Key Action Event
xapi.Event.UserInterface.InputDevice.Key.Action.on(event => {

  //The handlePress method will now print to console Discovered Key Sequences
  myObject.handlePress(event, press => {
    // Your Code
  })
});

/*
  Example Discovery Log Output
  {
    HIDInputHandler_Log: `New Key Sequence Discovered, use the following sequence information and the addButton(keyName, type, sequence) method add this to your solution`,
    Sequence: [
      { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Pressed", "id": "1" },
      { "Code": "28", "Key": "KEY_ENTER", "Type": "Pressed", "id": "1" },
      { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Released", "id": "1" },
      { "Code": "28", "Key": "KEY_ENTER", "Type": "Released", "id": "1" },
      { "Code": "56", "Key": "KEY_LEFTALT", "Type": "Pressed", "id": "1" },
      { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Pressed", "id": "1" },
      { "Code": "25", "Key": "KEY_P", "Type": "Pressed", "id": "1" },
      { "Code": "56", "Key": "KEY_LEFTALT", "Type": "Released", "id": "1" },
      { "Code": "125", "Key": "KEY_LEFTMETA", "Type": "Released", "id": "1" },
      { "Code": "25", "Key": "KEY_P", "Type": "Released", "id": "1" }
    ]
  }

*/
```
  </details><hr>
</details>
