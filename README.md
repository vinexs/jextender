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
######Description
```js
void post(url, data[, name])
```
######Parameters
| Param | Type | Description |
| --- | --- | --- |
| **url** | String |Website url to open. |
| **data** | Object | Post parameters in object form. |
| **name** | String | Window name of new windows, could be '_blank', '_self' or any other name. |

### Check object has already defined
######Description
```js
bool isset(Object obj)
// isSet == isset
```
######Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***obj*** | Any | Any variable, function, object wanted to check. |

### Number Prototype
```js
string numberFormat(afterDecimal, splitPoint)
```
######Parameters
| Param | Type | Description |
| --- | --- | --- |
| ***afterDecimal*** | int | Keep number which after decimal. |
| ***splitPoint*** | string | A char to split the number every 3 char. Default is ",". |

```js
int round(length)
```
######Parameters
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
