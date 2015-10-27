#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
#include <vector>

using namespace std;

vector<string> split(const string &s, char delim) {
    vector<string> v;
    stringstream ss(s);
    string item;
    while(getline(ss, item, delim)) {
        v.push_back(item);
    }
    return v;
}

int main() {
    string s;
    ifstream file("data.csv");
    getline(file, s);
    vector<string> v = split(s, ',');
    
    int c=0;
    for(vector<string>::iterator i=v.begin(); i<v.end(); i++) {
        cout<<c++<<" "<<*i<<endl;
    }

    return 0;
}
