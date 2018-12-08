package main

import (
    "fmt"
    "io/ioutil"
    "log"
    "path/filepath"
    // "strconv"
    "strings"
    "time"
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

func selectivePolymerReaction(polymer string, char1 string, char2 string) string {
	shrunk_polymer := strings.Replace(polymer, char1, "", -1)
	return strings.Replace(shrunk_polymer, char2, "", -1)
}

func fullReactPolymer(polymer string) string {
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
                shrunk_polymer = fullReactPolymer(strings.Replace(polymer, string(polymer[pos-1])+string(char), "", -1))
                return shrunk_polymer
            }
        }
        
    }
    return shrunk_polymer
    
}

func main() {
    start := time.Now()
	polymer_string := parseFile("./input/day5.txt")
	print(len(polymer_string))

	var letter string;
	length := len(polymer_string);

	for i := 65; i <= 90; i++ {
		polymer1 := selectivePolymerReaction(polymer_string, string(rune(i)), string(rune(i+32)) )
		polymer2 := fullReactPolymer(polymer1)
		if len(polymer2) < length {
			letter = string(rune(i))
			length = len(polymer2)
		}
	}
	print(length)
	print(letter)
    fmt.Printf("Runtime took %s\n", time.Since(start))
}