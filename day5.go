
package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "path/filepath"
    // "strconv"
    "strings"
    // "time"
)

var print = fmt.Println

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func parseFile(path string) string {
    filename, _ := filepath.Abs(path)
    content, err := ioutil.ReadFile(filename)
    if err != nil {
        log.Fatalf("error reading input file: %v", err)
    }
    c := string(content)
    return c
}

func reactPolymer(polymer string) string {
    shrunk_polymer := polymer
    for pos, char := range polymer {
        if pos > 0 {
            ascii_val := int(rune(char))
            prev_ascii_val := int(rune(polymer[pos-1]))
            difference := Abs(ascii_val - prev_ascii_val)
            // 32 is the ascii value difference of the lower case letter and its upper case counterpart
            if 32 == difference {
                // print(difference)
                // print(string(polymer[pos-1])+string(char))
                // remove the two characters. they are opposite polarity
                shrunk_polymer = reactPolymer(strings.Replace(polymer, string(polymer[pos-1])+string(char), "", 1))
                return shrunk_polymer
            }
        }
        
    }
    return shrunk_polymer
    
}

func main() {
    polymer_string := parseFile("./input/day5.txt")
    print(len(polymer_string))
    shrunk_polymer := reactPolymer(polymer_string)
    print(len(shrunk_polymer))
}