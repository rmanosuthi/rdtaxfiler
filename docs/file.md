# How it works

PND exports the data as a zip file containing three text files, with the archive itself having an extension of `.txt`

## File structure

```
1234567890123OZZZZZP0125590200.txt (zip)
|- 1234567890123OZZZZZP0125590200D.txt
|- 1234567890123OZZZZZP0125590200M.txt
|- 1234567890123OZZZZZP0125590200S.txt
```

## File naming
```
[0000000000000] [O/V] [xxxxx] [Pxx] [YYYY] [MM] [00].txt
```
| Length | Functionality |
| ------ | ------------- |
|13|Tax filing number|
|1|Form variant|
|5|Branch (HQ is ZZZZZ)|
|3|PND type|
|4|Numerical year (Buddhist calendar = AD + 543)|
|2|Numerical month|
|2|`00`|


| Form | Type |
| ---- | ---- |
| O | Unspecified |
| V | VAT? |

### Example

`1234567890123OZZZZZP0125590200.txt`

| Info | Value |
| ---- | ----- |
|Tax filing number|1234567890123|
|Form type|O|
|Branch|Headquarters|
|PND type|PND1|
|Year|2559 (2016)|
|Month|February|

## Encoding

Unicode encoded as decimal (will be referred to as UD in this project) with TIS-620 for names