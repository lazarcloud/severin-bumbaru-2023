import itertools

list1 = [1, 2, 3]
list2 = [4, 5]
list3 = [6, 7, 8]

combinations = [combo for combo in itertools.product(list1, list2, list3) if combo[0] != combo[1]]

print(combinations)