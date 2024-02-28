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

### Instantiating the HIDInputHandler Class

### HIDInputHandler Class Methods
