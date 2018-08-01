# Component D

This component contains all the attached pages "ใบแนบ"

## Structure

```
||| [A] | [B] | [C] || [D] | [E] | [F] | [G] | [H] | [I] | [J] | [K]
```

| Label | Length | Type | Functionality | Notes |
| ----- | ------ | ---- | ------------- | ----- |
|A|4|num, char|Denotes which tab the row is in<sup>1</sup>|
|B|1|num|Denotes the number of current row within the tab|
|C|13|num|Tax filer ID<sup>2</sup>|
|D|*|text|Name prefix|TIS-620|
|E|*|text|First name|TIS-620|
|F|*|text|Last name|TIS-620|
|G|10|date|Date of payment|ISO-8601|
|H|*|num|Amount paid|
|I|*|num|Tax deducted and delivered|
|J|1|num|Conditions<sup>3</sup>|
|K|1|*|Unknown|

<sup>[1]</sup> This is a concatenation of:
- The decree number (**always** 40 for PND 1)
- Extension number of the decree inside a bracket
- A single identifier character

Please refer to the following table:

| Tab | Content for Label A |
| --- | ------------------- |
|1|401N|
|2|401S|
|3|4012|
|4|402I|
|5|402E|

<sup>[2]</sup> Tax filer ID is the National ID for Thai citizens

<sup>[3]</sup> Three values have been determined:

| Condition | Content for Label J |
| --------- | ------------------- |
| Deducted on site | 1 |
| Indefinite payment | 2 |
| One-time payment | 3 |