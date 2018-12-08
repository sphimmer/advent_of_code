import json
from pprint import pprint
from datetime import datetime


def map_claim(claim, fabric):
    left_edge = claim['coord'][0]
    top_edge = claim['coord'][1]
    
    for r in range(top_edge, claim['height']+top_edge):
        for c in range(left_edge, claim['width']+left_edge):
            if 0 == fabric[r][c]:
                fabric[r][c] = claim['id']
            else:
                fabric[r][c] = 'x'

def count_shared_spaces(fabric):
    shared_space = 0
    for r in range(0, len(fabric)):
        for c in range(0, len(fabric[r])):
            shared_space += 1 if 'x' == fabric[r][c] else 0
    return shared_space


def part1(elf_claims):
    # initialize fabric map
    fabric = [[0 for n in range(1000)] for i in range(0,1000)]
    # import input
    
    for claim in elf_claims:
        map_claim(claim, fabric)
    # print(count_shared_spaces(fabric))
    return (count_shared_spaces(fabric), fabric)

def has_shared_space(fabric, claim):
    left_edge = claim['coord'][0]
    top_edge = claim['coord'][1]
    
    for r in range(top_edge, claim['height']+top_edge):
        for c in range(left_edge, claim['width']+left_edge):
            if 'x' == fabric[r][c]:
                return True
    return False

def part2(fabric, elf_claims):
    for claim in elf_claims:
        if not has_shared_space(fabric, claim):
            return claim

start = datetime.now()
with open('./input/puzzle_3.json') as fh:
    elf_claims = json.loads(fh.read())
shared_spaces, fabric = part1(elf_claims)
part1_time = datetime.now()
split1 = part1_time - start
print(split1.microseconds/1000)
# print(shared_spaces)
part2(fabric, elf_claims)
part2_time = datetime.now()
split2 = part2_time - part1_time
print(split2.microseconds/1000)

# with open('./input/puzzle_3.json') as fh:
#         elf_claims = json.loads(fh.read())
# fabric = [[0 for n in range(8)] for i in range(0,8)]

# map_claim({"id": 1, "coord": [1,3], "width": 4, "height": 4}, fabric)
# map_claim({"id": 2, "coord": [3,1], "width": 4, "height": 4}, fabric)
# map_claim({"id": 3, "coord": [5,5], "width": 2, "height": 2}, fabric)
# pprint(fabric)
# print(count_shared_spaces(fabric))


