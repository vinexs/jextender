# jExtender
This project depend on jQuery. It added some useful object prototype and extended object of jQuery. Nice for web application development.

## Feature
###### Javascript extended
- Support console logging on old version IE.
- Support JSON stringify on old version browser.
- New prototype function for Number, String, Boolean, Date and Array.

###### jQuery extended
- Use :appeared to check element visable in screen.
- Quick add file droppable event to element.
- Simlate a[href] effect in any element.
- Detect browser information.

### Open a new window with post data.
```js
void post(url, data[, name])
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| **url** | String |Website url to open. |
| **data** | Object | Post parameters in object form. |
| **name** | String | Window name of new windows, could be '_blank', '_self' or any other name. |

### Check object has already defined
```js
bool isset(Object obj)
// Alias: isSet
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***obj*** | Any | Any variable, function, object wanted to check. |

### Number Prototype
```js
string numberFormat(afterDecimal, splitPoint)
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***afterDecimal*** | int | Keep number which after decimal. |
| ***splitPoint*** | string | A char to split the number every 3 char. Default is ",". |

```js
int round(length)
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***length*** | int | Round the number after decimal. |

```js
bool isInteger()
```
```js
bool isEmpty()
```

### String Prototype
```js
int parseNumber()
```
```js
bool parseBoolean()
```
```js
object parseParam()
```
```js
string trim(pos)
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***pos*** | char | 'L' will trim the space in the start of the string, otherwise will trim the end of the string. |
```js
bool isInteger()
```
```js
bool isNumber()
```
```js
bool isHtml()
```
```js
bool isEmail()
```
```js
bool isURL()
```
```js
bool isSecureURL() 
```
```js
bool leftPad(len, word) 
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***len*** | int | The minimum string length of the result. |
| ***word*** | string | The string will add to the left while not reach the minimum string length. |
```js
bool rightPad(len, word) 
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***len*** | int | The minimum string length of the result. |
| ***word*** | string | The string will add to the right while not reach the minimum string length. |
```js
string replaceAll(target, replacement);
// Alias: supplant
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***target*** | RegEx | Matched pattern in string. |
| ***replacement*** | string | String to replace matched pattern. |
```js
string stripTags()
```
```js
bool contains(str)
// Alias: includes
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***str*** | string | Check the string contain this part. |
```js
bool startsWith(str)
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***str*** | string | Check the string is start with this part. |
```js
bool endsWith(str)
```
Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***str*** | string | Check the string is end with this part. |
```js
bool codeToStatement()
```





























