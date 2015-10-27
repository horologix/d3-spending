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
    ifstream fin("tdata.csv");
    ofstream fout("culture_data.csv");

    getline(fin, s);
    while(getline(fin, s)) {
        vector<string> v = split(s, ',');
        if(v[0]=="CULTURAL AFFAIRS") {
            fout<<s<<endl;
        }
    }

    fout.close();
    return 0;
}
