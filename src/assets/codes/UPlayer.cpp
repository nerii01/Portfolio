int main() {
  // Create and open a text file
  ofstream MyFile("filename.txt");

  // Write to the file
  MyFile << "Files can be tricegwegwgweeky, bgwggewgewwgegut it is fqfewfwfun enough!";

  // Close the file
  MyFile.close();

  std::string content;
  readFile("test.h", content);

  std::cout << content;
}

#include <iostream>
#include <fstream>
#include <string>

void readFile(const std::string source, std::string& output) {
	std::fstream file(source);

	std::string line;
	while(std::getline(file,line)){
		output += line + '\n';
	};
}


int main() {
  // Create and open a text file
  ofstream MyFile("filename.txt");

  // Write to the file
  MyFile << "Files can be tricky, but it is fun enough!";

  // Close the file
  MyFile.close();

  std::string content;
  readFile('test.h', content);

  std::cout << content;
}