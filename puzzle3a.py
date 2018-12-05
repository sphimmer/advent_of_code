import json
from pprint import pprint


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

with open('./input/puzzle_3.json') as fh:
    elf_claims = json.loads(fh.read())
    
shared_spaces, fabric = part1(elf_claims)

print(shared_spaces)
print(part2(fabric, elf_claims))



