import collections, json
from pprint import pprint
from datetime import datetime

class Guard(object):
    g_id = None
    g_events = None
    minutes_asleep = 0

    def __init__(self, g_id):
        self.g_id = g_id
        self.g_events = collections.OrderedDict()

    def add_event(self, time, description):
        self.g_events[time] = description
        
    
    def get_events(self):
        return self.g_events

    def count_minutes_asleep(self):
        sleep_start = None
        self.minutes = {}
        for k, v in self.g_events.iteritems():
            if v == "falls asleep":
                sleep_start = k
            if v == "wakes up":
                start = datetime.strptime(sleep_start, '%Y-%m-%d %H:%M')
                end = datetime.strptime(k, '%Y-%m-%d %H:%M')
                for m in range(start.minute, end.minute):
                    if m in self.minutes:
                        self.minutes[m] += 1
                    else:
                        self.minutes[m] = 1
                sleep_time = end - start
                self.minutes_asleep += sleep_time.seconds/60

    def find_frequent_minute(self):
        m = 0
        for k in self.minutes:
            if m in self.minutes:
                m = k if self.minutes[k] > self.minutes[m] else m
        return m





def parse_input():
    events = {}
    with open("./input/day4.txt") as input_file:
        for line in input_file:
            line = line.rstrip()
            event = line.split("] ")
            event[0] = event[0][1:]
            events[event[0]] = event[1]
    ordered_events = collections.OrderedDict(sorted(events.items()))
    # pprint(ordered_events)
    return ordered_events

def sort_events_by_guards(events):
    
    guards = {}
    g_id = ""
    for k, v in events.iteritems():
        # print(g_id)

        if "Guard #" in v:
            # guard change
            g_id = int(v.split('#')[1].split(' ')[0])
            # print(g_id)
            if g_id not in guards:
                # new guard
                new_guard = Guard(g_id)
                new_guard.add_event(k, 'begins shift')
                guards[g_id] = new_guard
            if g_id in guards:
                guards[g_id].add_event(k, 'begins shift')
            
            
        else:
            guards[g_id].add_event(k,v)

    return guards

def part1():
    events = parse_input()
    guards = sort_events_by_guards(events)

    greatest_sleep_time = 0
    guard_id = None
    for g in guards:
        guards[g].count_minutes_asleep()
        if guards[g].minutes_asleep > greatest_sleep_time:
            greatest_sleep_time = guards[g].minutes_asleep
            guard_id = guards[g].g_id

    print("Guard: ")
    print(guard_id)
    # print(greatest_sleep_time)
    print(guards[guard_id].find_frequent_minute() * guard_id)

    

part1()
