# hid-input-handler-class
 A Class Object to handle HID input presses coming into a Cisco Video Device.

 This was written for the Macro Editor, but can be adapted for the JsXAPI Node Module

 NOTE: This is NOT a full Macro Solution, it's a piece of code to help developers build a solution


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

```javascript
import xapi from 'xapi';
import { HIDInputHandler } from './HID_Input_Handler_Class';

// Instantiate with tje Name parameter
const myObject = new HIDInputHandler('DeviceName');

// Instantiate with the Name and a modified SequenceDelay parameters
const myOtherObject = new HIDInputHandler('OtherDevice', 200);
```

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


    */
  })
})
```
  </details><hr>
</details>

<details>
  <summary><strong>.setDiscoveryMode(boolean)</strong></summary>
  <br>
    <blockquote>Description: Assign a name for the HID Device your working with</blockquote>
    <h4>Parameters:</h4>
    <details>
      <summary>boolean</summary>
      <blockquote>Description: enable/disable Discovery Mode. Discovery mode will print the Key Sequence to the console, for you to discover your key presses.</blockquote>
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


*/
```
  </details><hr>
</details>
