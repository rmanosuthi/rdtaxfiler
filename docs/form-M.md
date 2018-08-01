# Component M

This component describes the Summary page

## Structure

```
||| [A] ||| [B] | [C] | [D] | [E] | [F] | [G] | [H] | [I] | [J] | [K] | [L] || [M] | [N] || [O] ||||||||||||| [P] | [Q] ||||| [R] | [S] || [T] | [U] | [V] | [W]
```

| Label | Length | Type | Functionality | Notes |
| ----- | ------ | ---- | ------------- | ----- |
|A|5|text, num|PND version|
|B|13|num|Tax filer ID<sup>1</sup>|
|C|1|char|Form variant<sup>2</sup>|
|D|5|num|Branch|
|E|1|num|Unknown|
|F|1|month|Month|
|G|4|year|Year|
|H|*|*|Book name|
|I|10|date|Date the book is filed|ISO-8601|
|J|*|num|Total count of transactions|
|K|*|num|Total income|
|L|*|num|Total tax due|
|M|*|num|Total tax due|Duplicate of L|
|N|*|num|Total tax due|Duplicate of L|
|O|*|num|Unknown|
|P|2|num|Unknown|
|Q|1|num|Unknown|
|R|1|num|Unknown|
|S|1|num|Unknown|
|T|1|char|Unknown|
|U|1|num|Unknown|
|V|1|num|Unknown|
|W|1|*|Unknown|