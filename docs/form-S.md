# Component S

This component lists all entries in the Summary page

## Structure

```
||| [A] | [B] | [C] | [D] | [E]
```

| Label | Length | Type | Functionality | Notes |
| ----- | ------ | ---- | ------------- | ----- |
|A|4|num, char|Denotes which tab the row is in<sup>1</sup>|
|B|1|num|Amount of entries within the tab|
|C|*|num|Total income|
|D|*|num|Total tax due|
|E|1|*|Sum of all previous labels' decimal values|

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